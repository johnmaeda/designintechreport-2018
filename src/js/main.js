import Slideshow from './module/Slideshow'

import source from '../example.md'

import '../css/main.scss'

let slideshow = new Slideshow()

async function main() {
  await slideshow.init(source)
}

main().catch(error => {
  console.log(error)
})

if (module.hot) {
  module.hot.accept('../index.md', async () => {
    slideshow.load(source)
  })
}
