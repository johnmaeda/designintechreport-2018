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
    this.slideDidMount()
    await this.waitForElementToAppear()
    this.slideDidAppear()
    await this.waitForElementToUnmount()
    this.slideDidUnmount()
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

  slideDidMount () {}

  slideDidAppear () {
    Array.from(this.element.querySelectorAll('a'))
      .forEach(element => {
        const href = element.getAttribute('href')
        if (/^https?:/.test(href)) {
          element.setAttribute('target', '_blank')
        }
      })

    Array.from(this.element.querySelectorAll('img, iframe'))
      .forEach(element => {
        const src = element.getAttribute('data-src')
        element.setAttribute('src', src)
        element.removeAttribute('data-src')
      })

    Array.from(this.element.querySelectorAll('video, audio'))
      .forEach(element => {
        const source = element.firstElementChild
        const src = source.getAttribute('data-src')
        source.setAttribute('src', src)
        source.removeAttribute('data-src')
        element.load()
      })

    Array.from(this.element.querySelectorAll('.chart'))
      .forEach(element => {
        const type = element.getAttribute('data-type')
        const src = element.getAttribute('data-src')
        window.fetch(src).then(response => {
          return response.json()
        }).then(({ data, options }) => {
          drawGoogleChart(element, type, data, options)
        })
      })

    Array.from(this.element.querySelectorAll('.tweet'))
      .forEach(element => {
        const tweetId = element.getAttribute('data-tweet-id')
        createTwitterWidget(tweetId, element)
      })
  }

  slideDidUnmount () {}
}
