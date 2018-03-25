import { createRemark } from './remark'
import {
  loadChartData,
  drawChart,
  drawChart2,
  drawChart3,
} from './charts'

import 'normalize.css'
import '../css/main.scss'

import source from '../index.md'

let slideshow

async function main() {
  slideshow = createRemark(source)

  Promise.all([
    slideshow,
    loadChartData({
      version: 'current',
      packages: ['wordtree'],
    }),
  ]).then(() => {
    // drawChart()
    // drawChart2()
  })

  Promise.all([
    slideshow,
    loadChartData({
      version: 'current',
      packages: ['bar'],
    }),
  ]).then(() => {
    // drawChart3()
  })
}

main().catch(error => {
  console.log(error)
})

if (module.hot) {
  module.hot.accept('../index.md', async () => {
    (await slideshow).loadFromString(source)
  })
}
