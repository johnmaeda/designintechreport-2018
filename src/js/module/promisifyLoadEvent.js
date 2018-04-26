export default function promisifyLoadEvent (element) {
  return new Promise((resolve, reject) => {
    const callback = event => {
      element.removeEventListener('load', callback, false)
      element.removeEventListener('error', callback, false)
      resolve()
    }
    element.addEventListener('load', callback, false)
    element.addEventListener('error', callback, false)
  })
}
