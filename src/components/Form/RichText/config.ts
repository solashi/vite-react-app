import { IAllProps } from '@tinymce/tinymce-react'
import { uploadApi } from 'lib/api'

export const init: IAllProps['init'] = {
  height: 500,
  menubar: true,
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media paste table help wordcount'
  ],
  toolbar:
    'newdocument | removeformat | undo redo | formatselect | copy paste cut | ' +
    'bold italic backcolor forecolor | alignleft aligncenter ' +
    'alignright alignjustify |  bullist numlist outdent indent | fontselect fontsizeselect | link openlink unlink | image media table | code |' +
    'help | preview',
  file_picker_types: 'image media',
  file_picker_callback: function (cb) {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.onchange = async function (event: Event) {
      const target = event.target as HTMLInputElement
      const file = (target.files as FileList)[0]

      try {
        const res = await uploadApi(file)
        cb(res.data.link, { title: file.name })
      } catch (error) {
        cb()
      }
    }

    input.click()
  },
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
}

export const apiKey = 'ihjb5jxslfupjdzsd7mio3x45rpf6dqijitursswe99oqg7v'
