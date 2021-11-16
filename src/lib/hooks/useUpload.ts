import { Method } from 'axios'
import { request } from 'lib/request'
import { UnknownObj } from 'lib/types'
import { formatFileSize } from 'lib/utils'
import { useCallback, useEffect, useState } from 'react'

export interface FileBag {
  id: string | number
  file: File
  progress: number
  formattedSize: string
  status: 'initial' | 'uploading' | 'uploaded' | 'failed'
  responseData: UnknownObj
  meta?: UnknownObj // any extra data forwarded from getUploadParams()
}

export interface UploadParams {
  url: string
  method?: Method
  data?: UnknownObj
  meta?: UnknownObj // any extra data to forward to the FileBag.meta
}

export interface FileUploaderProps {
  config?: UploadParams
  getConfig?: (file: File) => Promise<UploadParams>
  onUploaded?: (fileBag: FileBag) => void
  onFailed?: (fileBag: FileBag) => void
}

export interface FileUploader {
  onDrop: (files: File[] | FileList) => void
  fileBags: FileBag[]
  retryUpload: (id: string) => void
  removeFileBag: (id: string) => void
  clearFileBags: () => void
}

function useUploader({ config, getConfig, onUploaded, onFailed }: FileUploaderProps): FileUploader {
  const [fileBags, setFileBags] = useState<FileBag[]>([])
  const [newFileBags, setNewFileBags] = useState<FileBag[]>([])

  const updateFileBag = useCallback(
    (id: string, data: Partial<FileBag>) => {
      const index = fileBags.findIndex((fileBag) => fileBag.id === id)

      if (index >= 0) {
        fileBags[index] = { ...fileBags[index], ...data }
        setFileBags([...fileBags])
        return fileBags[index]
      }

      const newFileBag: FileBag = {
        id,
        file: data.file as File,
        progress: 0,
        formattedSize: String(data.file?.size),
        status: 'initial',
        responseData: {}
      }

      setFileBags((_bag) => [..._bag, newFileBag])
      return newFileBag
    },
    [fileBags]
  )

  const uploadFile = useCallback(
    async (file: File, id = new Date().getTime()) => {
      updateFileBag(id, { file })
      const formData = new FormData()
      formData.append('file', file)

      const defaultConfig = {
        onUploadProgress: async ({ total, loaded }: ProgressEvent) => {
          const progress = Math.round((loaded / total) * 100)
          const status: FileBag['status'] = 'uploading'
          updateFileBag(id, { progress, status })
        },
        data: formData
      }
      try {
        const { url, method, meta } = (
          typeof getConfig === 'function' ? await getConfig(file) : config
        ) as UploadParams

        const res = await request({
          ...defaultConfig,
          method: method || 'POST',
          url
        })
        const status: FileBag['status'] = 'uploaded'
        const updatedFileBag = updateFileBag(id, {
          responseData: res.data,
          status,
          meta
        })

        if (updatedFileBag && onUploaded) {
          onUploaded(updatedFileBag)
        }

        return updatedFileBag
      } catch (e) {
        const status: FileBag['status'] = 'failed'
        const updatedFileBag = updateFileBag(id, {
          status,
          responseData: e && e.response && e.response.data
        })
        if (updatedFileBag && onFailed) {
          onFailed(updatedFileBag)
        }
        return updatedFileBag
      }
    },
    [config, getConfig, onFailed, onUploaded, updateFileBag]
  )

  const retryUpload = useCallback(
    (id) => {
      const fileBag = updateFileBag(id, { responseData: undefined })
      if (fileBag) {
        uploadFile(fileBag.file, id)
      }
    },
    [updateFileBag, uploadFile]
  )

  const onDrop = useCallback(
    (acceptedFiles) => {
      // return if null or undefined
      if (!acceptedFiles) {
        return
      }
      acceptedFiles = [...acceptedFiles] // converts to array if FileList
      const arr: FileBag[] = acceptedFiles.map((file: File) => {
        const timeStamp = new Date().getTime()
        return {
          id: timeStamp + file.name,
          file,
          progress: 0,
          status: 'uploading',
          formattedSize: formatFileSize(file.size)
        } as FileBag
      })
      setFileBags([...fileBags, ...arr])
      setNewFileBags(arr)
    },
    [fileBags, setFileBags]
  )

  useEffect(() => {
    // trigger upload whenever a new file is added
    newFileBags.forEach(({ file, id }) => uploadFile(file, id))
    // adding uploadFile to list of dependencies will cause infinity loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newFileBags])

  const removeFileBag = useCallback(
    (id) => {
      const index = fileBags.findIndex((fileBag) => fileBag.id === id)
      fileBags.splice(index, 1)
      setFileBags([...fileBags])
    },
    [fileBags, setFileBags]
  )

  const clearFileBags = useCallback(() => {
    setFileBags([])
  }, [setFileBags])

  return {
    onDrop,
    fileBags,
    retryUpload,
    removeFileBag,
    clearFileBags
  }
}

export { useUploader }
