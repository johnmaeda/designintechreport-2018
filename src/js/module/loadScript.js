import load from 'load-script'

export default async function loadScript (url, options) {
  if (document.readyState !== 'complete') {
    await new Promise((resolve, reject) => {
      const callback = event => {
        window.removeEventListener('load', callback, false)
        resolve()
      }
      window.addEventListener('load', callback, false)
    })
  }
  return new Promise((resolve, reject) => {
    load(url, options, (error, script) => {
      if (error) {
        reject(error)
        return
      }
      resolve(script)
    })
  })
}
