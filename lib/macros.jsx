import React from 'react'
import ReactDOMServer from 'react-dom/server'

function render(element) {
  return ReactDOMServer.renderToStaticMarkup(element)
}

export function twitter(username, id) {
  return render(
    <blockquote className="twitter-tweet" data-lang="en">
      <a href={`https://twitter.com/${username}/status/${id}`} />
    </blockquote>
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
