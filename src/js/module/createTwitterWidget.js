/* global twttr */

import loadScript from './loadScript'

const script = loadScript('https://platform.twitter.com/widgets.js')

export default async function createTwitterWidget (tweetId, element) {
  if (!tweetId) {
    throw new Error('Tweet id must be supplied.')
  }
  await script
  return twttr.widgets.createTweet(tweetId, element)
}
