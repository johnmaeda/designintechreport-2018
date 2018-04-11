/* global remark */

import 'remark/src/remark'

import SlideObserver from './SlideObserver'

export default class Slideshow {
  constructor (options = {}) {
    this.options = options
    this.slides = new WeakMap()
  }

  async load (source) {
    if (document.readyState !== 'complete') {
      await new Promise((resolve, reject) => {
        const callback = event => {
          window.removeEventListener('load', callback, false)
          resolve()
        }
        window.addEventListener('load', callback, false)
      })
    }
    // Chrome seems to need a noop frame to regard the document as fully loaded.
    window.requestAnimationFrame(() => {
      if (!this.remark) {
        this.remark = remark.create({
          source,
          ratio: '16:9',
          navigation: {
            scroll: false,
            touch: true,
            click: false
          },
          ...this.options
        })
      } else {
        this.remark.loadFromString(source)
      }
      this.updateSlides()
    })
  }

  updateSlides () {
    const elements = document.querySelectorAll('.remark-slide-container')
    for (let index = 0; index < elements.length; ++index) {
      const element = elements[index]
      const slide = this.slides.get(element)
      if (!slide) {
        this.slides.set(element, new SlideObserver(element, index + 1))
      }
    }
  }
}
