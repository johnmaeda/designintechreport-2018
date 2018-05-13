import { selectLanguage } from '../main'

import styles from '../../css/module/language-selector.scss'

export default class LanguageSelector {
  constructor (language, title) {
    this.language = language
    this.title = title
    this.handleClick = this.handleClick.bind(this)

    const element = document.createElement('div')
    element.classList.add(styles.element)
    element.innerHTML = title
    element.addEventListener('click', this.handleClick, false)
    this.element = element

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'lang') {
          this.handleChange()
        }
      })
    })
    observer.observe(document.documentElement, {
      attributes: true
    })
    this.attributeObserver = observer
    this.handleChange()
  }

  dispose () {
    this.attributeObserver.disconnect()
    this.element.removeEventListener('click', this.handleClick, false)
  }

  handleClick () {
    selectLanguage(this.language)
  }

  handleChange () {
    const language = document.documentElement.getAttribute('lang')
    if (language === this.language) {
      this.element.classList.add(styles.selected)
    } else {
      this.element.classList.remove(styles.selected)
    }
  }
}
