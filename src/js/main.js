import loadScript from './module/loadScript'
import Slideshow from './module/Slideshow'

import '../css/main.scss'

const slideshow = new Slideshow()

async function main() {
  let source
  if (process.env.NODE_ENV !== 'production') {
    ({ default: source } = await import('../index.md'))
  } else {
    source = await window.fetch('index.md').then(response => response.text())
  }
  slideshow.init(source)
}

main().catch(error => {
  console.log(error)
})

loadScript('https://use.typekit.net/aos0mpl.js').then(() => {
  try {
    Typekit.load({ async: true })
  } catch (e) {}
})

if (module.hot) {
  module.hot.accept('../index.md', () => {
    slideshow.load(source)
  })
}
