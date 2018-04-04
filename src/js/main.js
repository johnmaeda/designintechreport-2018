/* global Typekit */

import AcceptLanguage from 'accept-language'
import Cookies from 'js-cookie'

import loadScript from './module/loadScript'
import Slideshow from './module/Slideshow'

import '../css/main.scss'

const slideshow = new Slideshow()

const acceptLanguage = AcceptLanguage.create()
acceptLanguage.languages(['en-US', 'ja-JP'])
let selectedLanguage = null

async function selectLanguage (language, force = false) {
  if (language === selectedLanguage && !force) {
    return
  }
  let source
  if (process.env.NODE_ENV !== 'production') {
    // We need to supply string literals in import() to make the hot module
    // replacement able to track their changes.
    switch (language) {
      case 'en-US':
        ({ default: source } = await import(`../../markdown/en-US.md`))
        break
      case 'ja-JP':
        ({ default: source } = await import(`../../markdown/ja-JP.md`))
        break
      default:
        throw new Error()
    }
  } else {
    source = await window.fetch(`markdown/${language}.md`).then(response => {
      return response.text()
    })
  }
  slideshow.load(source)
  document.documentElement.setAttribute('lang', language)
  Cookies.set('language', language)
  selectedLanguage = language
}

function main () {
  const language = Cookies.get('language') || window.navigator.language
  selectLanguage(acceptLanguage.get(language))
}

main()

loadScript('https://use.typekit.net/aos0mpl.js').then(() => {
  try {
    Typekit.load({ async: true })
  } catch (e) {}
})

if (module.hot) {
  const callback = () => {
    selectLanguage(selectedLanguage, true)
  }
  // Same discussion above.
  module.hot.accept('../../markdown/en-US.md', callback)
  module.hot.accept('../../markdown/ja-JP.md', callback)
}
