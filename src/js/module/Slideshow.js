/* global remark */

import 'remark/src/remark'

import { supportedLanguages } from '../main'
import LanguageSelector from './LanguageSelector'
import promisifyLoadEvent from './promisifyLoadEvent'
import SlideObserver from './SlideObserver'

import overlayStyles from '../../css/module/overlay.scss'

export default class Slideshow {
  constructor (options = {}) {
    this.options = options
    this.slides = new WeakMap()
  }

  async load (source) {
    if (document.readyState !== 'complete') {
      await promisifyLoadEvent(window)
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
        this.addOverlay()
      } else {
        this.remark.loadFromString(source)
      }
      this.updateSlides()
    })
  }

  updateSlides () {
    const elements = document.querySelectorAll('.remark-slide-container')
    Array.from(elements).forEach((element, index) => {
      const slide = this.slides.get(element)
      if (!slide) {
        this.slides.set(element, new SlideObserver(element, index + 1))
      }
    })
  }

  addOverlay () {
    const overlay = document.createElement('div')
    overlay.classList.add(overlayStyles.element)
    const items = [
      ...Object.entries(supportedLanguages).map(args => {
        return new LanguageSelector(...args).element
      })
    ]
    items.forEach(item => {
      item.classList.add(overlayStyles.item)
      overlay.appendChild(item)
    })
    const container = document.querySelector('.remark-slides-area')
    container.appendChild(overlay)
  }
}
