import 'remark/src/remark'

// Create remark with the given source string after the document is fully
// loaded, and returns a promise that resolves when remark is created.
export function createRemark(source) {
  new Promise((resolve, reject) => {
    window.addEventListener('load', event => {
      remark.create({
        source,
        ratio: '16:9',
        navigation: {
          scroll: false,
          touch: true,
          click: false,
        },
      })
      resolve()
    })
  })
}

// Returns the slide container element for the given element.
export function getSlideContainer(element) {
  while (element.parentNode) {
    element = element.parentNode
    if (element.classList.contains('remark-slide-container')) {
      return element
    }
  }
  return null
}

// Calls the given callback just after the slide container of the given element
// becomes visible.
export function observeSlideVisibility(element, callback) {
  const container = getSlideContainer(element)
  if (container.classList.contains('remark-visible')) {
    callback()
    return
  }
  const observer = new MutationObserver(mutations => {
    mutations.some(mutation => {
      if (mutation.attributeName === 'class' &&
          mutation.target.classList.contains('remark-visible')) {
        callback()
        observer.disconnect()
        return true
      }
    })
  })
  observer.observe(container, {
    attributes: true,
  })
}
