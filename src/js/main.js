import Cookies from 'js-cookie'

import Slideshow from './module/Slideshow'

import '../css/main.scss'

const slideshow = new Slideshow()

let selectedLanguage = null

async function selectLanguage(language) {
  if (language === selectedLanguage) {
    return
  }
  let source
  if (process.env.NODE_ENV !== 'production') {
    ({ default: source } = await import(`../../markdown/${language}.md`))
  } else {
    source = await window.fetch(`markdown/${language}.md`).then(response => {
      return response.text()
    })
  }
  slideshow.load(source)
  Cookies.set('language', language)
}

function main() {
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

if (module.hot) {
  module.hot.accept('../../markdown/english.md', async () => {
    const { default: source } = await import('../../markdown/english.md')
    slideshow.load(source)
  })
}
