import React from 'react'
import ReactDOMServer from 'react-dom/server'

function render (element) {
  return ReactDOMServer.renderToStaticMarkup(element)
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
  return render(
    <div className='tweet' data-tweet-id={tweetId} />
  )
}

export function block (className, children = null) {
  return render(
    <div className={className}>
      {children}
    </div>
  )
}

export function image (...args) {
  const {
    position,
    width,
    height,
    src
  } = expandInverseOptionalArgs(args, ['position', 'width', 'height', 'src'])
  return render(
    <img
      data-src={src}
      style={{
        width,
        height,
        objectPosition: position
      }}
    />
  )
}

export function video (type, src) {
  return render(
    <div className='video'>
      <video controls>
        <source type={type} data-src={src} />
      </video>
    </div>
  )
}

export function audio (type, src) {
  return render(
    <div className='audio'>
      <audio controls>
        <source type={type} data-src={src} />
      </audio>
    </div>
  )
}

export function iframe (height, src) {
  return render(
    <div className='iframe'>
      <iframe data-src={src} style={{ height }} />
    </div>
  )
}

export function chart (height, type, src) {
  return render(
    <div className='chart' data-type={type} data-src={src} style={{ height }} />
  )
}
