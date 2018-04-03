import Slideshow from './module/Slideshow'

import '../css/main.scss'

const slideshow = new Slideshow()

async function main() {
  let source
  if (process.env.NODE_ENV !== 'production') {
    ({ default: source } = await import('../../markdown/english.md'))
  } else {
    source = await window.fetch('markdown/english.md').then(response => {
      return response.text()
    })
  }
  slideshow.init(source)
}

main().catch(error => {
  console.log(error)
})

if (module.hot) {
  module.hot.accept('../../markdown/english.md', async () => {
    const { default: source } = await import('../../markdown/english.md')
    slideshow.load(source)
  })
}
