/* global twttr */

import loadScript from './loadScript'

const script = loadScript('https://platform.twitter.com/widgets.js')

export default async function createTwitterWidget(tweetId, element) {
  await script
  return twttr.widgets.createTweet(tweetId, element)
}
