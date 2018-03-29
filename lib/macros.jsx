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

export function image(height, src) {
  return render(
    <img data-src={src} style={{ height }} />
  )
}

export function iframe(height, src) {
  return render(
    <iframe data-src={src} style={{ height }} />
  )
}

export function chart(height, type, src) {
  return render(
    <div className="chart" data-type={type} data-src={src} style={{ height }} />
  )
}
