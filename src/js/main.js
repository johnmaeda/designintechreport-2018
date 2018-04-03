import Cookies from 'js-cookie'
import loadScript from './module/loadScript'

import Slideshow from './module/Slideshow'

import '../css/main.scss'

const slideshow = new Slideshow()

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
      case 'english':
        ({ default: source } = await import(`../../markdown/english.md`))
        break
      case 'japanese':
        ({ default: source } = await import(`../../markdown/japanese.md`))
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
  Cookies.set('language', language)
  selectedLanguage = language
}

function main () {
  let language = Cookies.get('language')
  if (!language) {
    const [tag] = window.navigator.language.split('-')
    switch (tag) {
      case 'ja':
        language = 'japanese'
        break
      default:
        language = 'english'
        break
    }
  }
  selectLanguage(language)
}

main()

loadScript('https://use.typekit.net/aos0mpl.js').then(() => {
  try {
    Typekit.load({ async: true })
  } catch (e) {}
})

if (module.hot) {
  const callback = async () => {
    selectLanguage(selectedLanguage, true)
  }
  // Same discussion above.
  module.hot.accept(`../../markdown/english.md`, callback)
  module.hot.accept(`../../markdown/japanese.md`, callback)
}
