/* global remark */

import 'remark/src/remark'

import { supportedLanguages, selectLanguage } from '../main'
import SlideObserver from './SlideObserver'

export default class Slideshow {
  constructor (options = {}) {
    this.options = options
    this.slides = new WeakMap()
    this.languageSelectors = null
    this.onSelectLanguage = this.onSelectLanguage.bind(this)
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
        this.addLanguageSelector()
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

  createLanguageSelectors () {
    return Object.entries(supportedLanguages).map(([language, name]) => {
      const item = document.createElement('div')
      item.innerHTML = name
      item.setAttribute('data-lang', language)
      item.addEventListener('click', this.onSelectLanguage)
      return item
    })
  }

  addLanguageSelector () {
    const container = document.createElement('div')
    container.setAttribute('class', 'language-selector')
    this.languageSelectors = this.createLanguageSelectors()
    this.languageSelectors.forEach(selector => {
      container.appendChild(selector)
    })
    const remarkContainer = document.querySelector('.remark-slides-area')
    remarkContainer.appendChild(container)
  }

  onSelectLanguage (event) {
    const language = event.target.getAttribute('data-lang')
    selectLanguage(language)
  }
}
