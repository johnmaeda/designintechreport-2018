import React from 'react'
import ReactDOMServer from 'react-dom/server'

function render(element) {
  return ReactDOMServer.renderToStaticMarkup(element)
}

export function tweet(tweetId) {
  return render(
    <div className="tweet" data-tweet-id={tweetId} />
  )
}

export function block(className, children = null) {
  return render(
    <div className={className}>
      {children}
    </div>
  )
}

export function image(...args) {
  let src
  let width = null
  let height = null
  switch (args.length) {
    case 1:
      [src] = args
      break
    case 2:
      [height, src] = args
      break
    case 3:
      [width, height, src] = args
      break
    default:
      throw new Error('Invalid number of parameters')
  }
  const style = {}
  if (width != null) {
    style.width = width
  }
  if (height != null) {
    style.height = height
  }
  return render(
    <img data-src={src} style={style} />
  )
}

export function video(type, src) {
  return render(
    <div className="video">
      <video controls>
        <source type={type} data-src={src} />
      </video>
    </div>
  )
}

export function audio(type, src) {
  return render(
    <div className="audio">
      <audio controls>
        <source type={type} data-src={src} />
      </audio>
    </div>
  )
}

export function iframe(height, src) {
  return render(
    <div className="iframe">
      <iframe data-src={src} style={{ height }} />
    </div>
  )
}

export function chart(height, type, src) {
  return render(
    <div className="chart" data-type={type} data-src={src} style={{ height }} />
  )
}
