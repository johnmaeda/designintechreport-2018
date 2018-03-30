import 'cross-fetch/polyfill'
import MutationObserver from 'mutation-observer'

import createTwitterWidget from './createTwitterWidget'
import drawGoogleChart from './drawGoogleChart'

export default class Slide {
  constructor (element) {
    this.element = element
    this.init()
  }

  async init () {
    await this.waitForElementToAppear()
    this.slideDidAppear()
    await this.waitForElementToUnmount()
  }

  waitForElementToAppear () {
    return new Promise((resolve, reject) => {
      if (this.element.classList.contains('remark-visible')) {
        resolve()
        return
      }
      const observer = new MutationObserver(mutations => {
        mutations.some(mutation => {
          if (mutation.attributeName !== 'class') {
            return
          }
          if (this.element.classList.contains('remark-visible')) {
            resolve()
            observer.disconnect()
            return true
          }
          return false
        })
      })
      observer.observe(this.element, {
        attributes: true
      })
    })
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

  slideDidAppear () {
    this.querySelectorAll('a').forEach(this.processAnchor)
    this.querySelectorAll('img').forEach(this.processImage)
    this.querySelectorAll('audio, video').forEach(this.processAudioVideo)
    this.querySelectorAll('.iframe').forEach(this.processFrame)
    this.querySelectorAll('.chart').forEach(this.processChart)
    this.querySelectorAll('.tweet').forEach(this.processTweet)
  }

  querySelectorAll (...args) {
    return Array.from(this.element.querySelectorAll(...args))
  }

  processAnchor (element) {
    const href = element.getAttribute('href')
    if (/^https?:/.test(href)) {
      element.setAttribute('target', '_blank')
    }
  }

  processImage (element) {
    const src = element.getAttribute('data-src')
    element.setAttribute('src', src)
    element.removeAttribute('data-src')
  }

  processFrame (element) {
    const iframe = element.firstElementChild
    const src = iframe.getAttribute('data-src')
    iframe.setAttribute('src', src)
    iframe.removeAttribute('data-src')
    const callback = event => {
      iframe.removeEventListener('load', callback, false)
      element.classList.add('loaded')
    }
    iframe.addEventListener('load', callback, false)
  }

  processAudioVideo (element) {
    const source = element.firstElementChild
    const src = source.getAttribute('data-src')
    source.setAttribute('src', src)
    source.removeAttribute('data-src')
    element.load()
  }

  processChart (element) {
    const type = element.getAttribute('data-type')
    const src = element.getAttribute('data-src')
    window.fetch(src).then(response => {
      return response.json()
    }).then(({ data, options }) => {
      drawGoogleChart(element, type, data, options)
    }).catch(error => {
      throw error
    })
  }

  processTweet (element) {
    const tweetId = element.getAttribute('data-tweet-id')
    createTwitterWidget(tweetId, element)
  }
}
