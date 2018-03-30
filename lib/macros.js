function convertToInlineStyle (styles) {
  return Object.entries(styles)
    .filter(([, value]) => value != null)
    .map(([key, value]) => `${key}:${value}`)
    .join(';')
}

function expandInverseOptionalArgs (args, names) {
  const padding = Array(names.length - args.length).fill(null)
  return [...padding, ...args]
    .map(arg => arg === '' ? null : arg)
    .reduce((result, arg, index) => {
      return {
        ...result,
        [names[index]]: arg
      }
    }, {})
}

export function tweet (tweetId) {
  return (`
    <div class='tweet' data-tweet-id='${tweetId}'></div>
  `)
}

export function block (className, children = null) {
  return (`
    <div class='${className}'>
      ${children == null ? '' : children}
    </div>
  `)
}

export function image (...args) {
  const {
    position,
    width,
    height,
    src
  } = expandInverseOptionalArgs(args, ['position', 'width', 'height', 'src'])
  /* eslint-disable indent */
  return (`
    <img
      data-src='${src}'
      style='${convertToInlineStyle({
        width,
        height,
        'object-position': position
      })}'
    />
  `)
  /* eslint-enable indent */
}

export function audio (...args) {
  const {
    width,
    height,
    type,
    src
  } = expandInverseOptionalArgs(args, ['width', 'height', 'type', 'src'])
  return (`
    <div class='audio'>
      <audio controls style='${convertToInlineStyle({ width, height })}'>
        <source type='${type}' data-src='${src}' />
      </audio>
    </div>
  `)
}

export function video (...args) {
  const {
    width,
    height,
    type,
    src
  } = expandInverseOptionalArgs(args, ['width', 'height', 'type', 'src'])
  return (`
    <div class='video'>
      <video controls style='${convertToInlineStyle({ width, height })}'>
        <source type='${type}' data-src='${src}' />
      </video>
    </div>
  `)
}

export function iframe (height, src) {
  return (`
    <div class='iframe'>
      <iframe
        data-src='${src}'
        style='${convertToInlineStyle({ height })}'
      >
      </iframe>
    </div>
  `)
}

export function chart (height, type, src) {
  return (`
    <div
      class='chart'
      data-type='${type}'
      data-src='${src}'
      style='${convertToInlineStyle({ height })}'
    >
    </div>
  `)
}
