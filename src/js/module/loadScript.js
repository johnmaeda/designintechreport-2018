import load from 'load-script'

export default function loadScript(url, options) {
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
