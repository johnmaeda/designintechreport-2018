import 'cross-fetch/polyfill'
import MutationObserver from 'mutation-observer'

import createTwitterWidget from './createTwitterWidget'
import drawGoogleChart from './drawGoogleChart'
import promisifyLoadEvent from './promisifyLoadEvent'

export default class SlideObserver {
  constructor (element, index) {
    this.element = element
    this.index = index
    this.init()
  }

  async init () {
    this.startObservingVisibility()
    await this.waitForElementToUnmount()
    this.stopObservingVisibility()
    if (this.mounted) {
      this.slideDidUnmount()
    }
  }

  mount () {
    if (!this.mounted) {
      this.mounted = this.slideDidMount()
    }
    return this.mounted
  }

  startObservingVisibility () {
    if (this.element.classList.contains('remark-visible')) {
      this.mount()
    }
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName !== 'class') {
          return
        }
        const visible = this.element.classList.contains('remark-visible')
        if (visible && !this.mounted) {
          this.mount()
        }
      })
    })
    observer.observe(this.element, {
      attributes: true
    })
    this.visibilityObserver = observer
  }

  stopObservingVisibility () {
    this.visibilityObserver.disconnect()
  }

  waitForElementToUnmount () {
    return new Promise((resolve, reject) => {
      const observer = new MutationObserver(mutations => {
        mutations.some(mutation => {
          const removedNodes = Array.from(mutation.removedNodes)
          if (removedNodes.includes(this.element)) {
            resolve()
            return true
          }
          return false
        })
      })
      observer.observe(this.element.parentElement, {
        childList: true
      })
    })
  }

  slideDidMount () {
    this.querySelectorAll('a').forEach(this.processAnchor)
    this.querySelectorAll('audio').forEach(this.processAudio)
    return Promise.all([
      ...this.querySelectorAll('img').map(this.processImage),
      ...this.querySelectorAll('video').map(this.processVideo),
      ...this.querySelectorAll('.iframe').map(this.processIFrame),
      ...this.querySelectorAll('.chart').map(this.processChart),
      ...this.querySelectorAll('.tweet').map(this.processTweet)
    ])
  }

  slideDidUnmount () {}

  querySelectorAll (...args) {
    return Array.from(this.element.querySelectorAll(...args))
  }

  processAnchor (element) {
    const href = element.getAttribute('href')
    if (href == null) {
      return
    }
    if (/^https?:/.test(href)) {
      element.setAttribute('target', '_blank')
    }
  }

  async processImage (element) {
    const src = element.getAttribute('data-src')
    if (src == null) {
      return Promise.resolve()
    }
    element.setAttribute('src', src)
    element.removeAttribute('data-src')
    await promisifyLoadEvent(element)
  }

  processAudio (element) {
    const source = element.firstElementChild
    const src = source.getAttribute('data-src')
    if (src == null) {
      return
    }
    source.setAttribute('src', src)
    source.removeAttribute('data-src')
    element.load()
  }

  async processVideo (element) {
    const source = element.firstElementChild
    const src = source.getAttribute('data-src')
    if (src == null) {
      return
    }
    source.setAttribute('src', src)
    source.removeAttribute('data-src')
    element.load()
    await promisifyLoadEvent(source)
  }

  async processIFrame (element) {
    const iframe = element.firstElementChild
    const src = iframe.getAttribute('data-src')
    if (src == null) {
      return Promise.resolve()
    }
    iframe.setAttribute('src', src)
    iframe.removeAttribute('data-src')
    await promisifyLoadEvent(iframe)
    element.classList.add('loaded')
  }

  async processChart (element) {
    const type = element.getAttribute('data-type')
    const src = element.getAttribute('data-src')
    if (type == null || src == null) {
      return Promise.resolve()
    }
    try {
      const response = await window.fetch(src)
      const { data, options } = await response.json()
      drawGoogleChart(element, type, data, options)
    } catch (error) {
      console.error(error)
    }
  }

  async processTweet (element) {
    const tweetId = element.getAttribute('data-tweet-id')
    if (tweetId == null) {
      return Promise.resolve()
    }
    try {
      await createTwitterWidget(tweetId, element)
    } catch (error) {
      console.error(error)
    }
  }
}
