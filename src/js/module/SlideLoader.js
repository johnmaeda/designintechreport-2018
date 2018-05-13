import styles from '../../css/module/slide-loader.scss'

export default class SlideLoader {
  constructor (slideshow) {
    this.slideshow = slideshow
    this.handleClick = this.handleClick.bind(this)

    const element = document.createElement('div')
    element.classList.add(styles.element)
    element.innerHTML = 'Load all slides'
    element.addEventListener('click', this.handleClick, false)
    this.element = element
  }

  dispose () {
    this.element.removeEventListener('click', this.handleClick, false)
  }

  handleClick () {
    const elements = document.querySelectorAll('.remark-slide-container')
    const message = 'Loading all slides...'
    const total = elements.length
    this.element.classList.add(styles.selected)
    this.element.innerHTML = `${message} (0/${total})`
    let indices = []
    Promise.all(Array.from(elements).map(element => {
      const slide = this.slideshow.slides.get(element)
      if (slide) {
        indices.push(slide.index)
        return slide.mount().then(() => {
          indices.splice(indices.indexOf(slide.index), 1)
          const progress = total - indices.length
          this.element.innerHTML = `${message} (${progress}/${total})`
        })
      }
      return Promise.resolve()
    })).then(() => {
      this.element.innerHTML = 'Loaded all slides'
    })
    this.dispose() // This is one-off event handler
  }
}
