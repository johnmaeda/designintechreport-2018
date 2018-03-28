export default class Slide {
  constructor(element) {
    this.element = element
    this.init()
  }

  async init() {
    this.slideDidMount()
    await this.waitForElementToAppear()
    this.slideDidAppear()
    await this.waitForElementToUnmount()
    this.slideDidUnmount()
  }

  waitForElementToAppear() {
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
        attributes: true,
      })
    })
  }

  waitForElementToUnmount() {
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
        childList: true,
      })
    })
  }

  slideDidMount() {}

  slideDidAppear() {
    Array.from(this.element.querySelectorAll('a'))
      .forEach(element => {
        const href = element.getAttribute('href')
        if (/^https?:/.test(href)) {
          element.setAttribute('target', '_blank')
        }
      })
    Array.from(this.element.querySelectorAll('img'))
      .forEach(element => {
        const src = element.getAttribute('data-src')
        element.setAttribute('src', src)
        element.removeAttribute('data-src')
      })

    twttr.widgets.load(this.element)
  }

  slideDidUnmount() {}
}
