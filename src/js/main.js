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

if (module.hot) {
  module.hot.accept('../index.md', () => {
    slideshow.load(source)
  })
}
