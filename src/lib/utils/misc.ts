export const sleep = (delay: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(undefined), delay)
  })
