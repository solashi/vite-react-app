export const sleep = (delay: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(undefined), delay)
  })

export const formatFileSize = (sizeInBytes: number) => {
  const thresh = 1000
  if (Math.abs(sizeInBytes) < thresh) {
    return sizeInBytes + ' B'
  }
  const units = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let u = -1
  do {
    sizeInBytes /= thresh
    ++u
  } while (Math.abs(sizeInBytes) >= thresh && u < units.length - 1)
  return sizeInBytes.toFixed(1) + ' ' + units[u]
}

export const addZero = (num: number) => ('0' + num).slice(-2)

export const snakeToCamel = (str: string) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''))
