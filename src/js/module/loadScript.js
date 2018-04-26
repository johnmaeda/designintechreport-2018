import load from 'load-script'

import promisifyLoadEvent from './promisifyLoadEvent'

export default async function loadScript (url, options) {
  if (document.readyState !== 'complete') {
    await promisifyLoadEvent(window)
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
