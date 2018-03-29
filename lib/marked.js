const marked = require('remarked')

const { image } = marked.Renderer.prototype

marked.Renderer.prototype.image = function (...args) {
  const output = image.apply(this, args)
  return output.replace(/^<img src/, '<img data-src')
}

module.exports = marked
