/* global remark */

import 'remark/src/remark'

import Slide from './Slide'

export default class Slideshow {
  constructor () {
    this.slides = new WeakMap()
  }

  async init (source, options = {}) {
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
    requestAnimationFrame(() => {
      this.remark = remark.create({
        source,
        ratio: '16:9',
        navigation: {
          scroll: false,
          touch: true,
          click: false
        },
        ...options
      })
      this.updateSlides()
    })
  }

  load (source) {
    if (!this.remark) {
      throw new Error('Attempt to load before init')
    }
    this.remark.loadFromString(source)
    this.updateSlides()
  }

  updateSlides () {
    const elements = document.querySelectorAll('.remark-slide-container')
    for (let i = 0; i < elements.length; ++i) {
      const element = elements[i]
      const slide = this.slides.get(element)
      if (!slide) {
        this.slides.set(element, new Slide(element))
      }
    }
  }
}
