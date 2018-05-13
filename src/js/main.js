/* global Typekit */

import 'cross-fetch/polyfill'
import AcceptLanguage from 'accept-language'
import loadScript from './module/loadScript'
import queryString from 'query-string'
import Slideshow from './module/Slideshow'

import '../css/main.scss'

export const supportedLanguages = {
  'en': 'English',
  'ja': 'Japanese'
}

const acceptLanguage = AcceptLanguage.create()
acceptLanguage.languages(Object.keys(supportedLanguages))

let selectedLanguage

const slideshow = new Slideshow()

async function loadSource (language) {
  let source
  if (process.env.NODE_ENV !== 'production') {
    // We need to supply string literals in import() to make the hot module
    // replacement able to track their changes.
    switch (language) {
      case 'en':
        ({ default: source } = await import('../../markdown/en.md'))
        break
      case 'ja':
        ({ default: source } = await import('../../markdown/ja.md'))
        break
      default:
        throw new Error(`Unsupported language: ${language}`)
    }
  } else {
    source = await window.fetch(`markdown/${language}.md`).then(response => {
      return response.text()
    })
  }
  slideshow.load(source)
}

export async function selectLanguage (locale) {
  const language = acceptLanguage.get(locale)
  if (language === selectedLanguage) {
    return
  }
  await loadSource(language)
  selectedLanguage = language
  document.documentElement.setAttribute('lang', language)
}

function main () {
  const query = queryString.parse(window.location.search)
  selectLanguage(query.lang || window.navigator.language)
}

main()

loadScript('https://use.typekit.net/aos0mpl.js').then(() => {
  try {
    Typekit.load({ async: true })
  } catch (e) {}
})

if (module.hot) {
  const callback = () => {
    loadSource(selectedLanguage)
  }
  // Same discussion above
  module.hot.accept('../../markdown/en.md', callback)
  module.hot.accept('../../markdown/ja.md', callback)
}
