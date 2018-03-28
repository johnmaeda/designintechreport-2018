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
    <img style={{ height }} data-src={src} />
  )
}

export function iframe(height, src) {
  return render(
    <iframe style={{ height }} src={src} />
  )
}
