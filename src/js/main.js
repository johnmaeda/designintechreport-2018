import { createRemark } from './remark'
import {
  loadChartData,
  drawChart,
  drawChart2,
  drawChart3,
} from './charts'

import source from '../index.md'

import 'normalize.css'
import '../css/main.scss'

async function main() {
  const remarkPromise = createRemark(source)

  const wordtreeDataPromise = loadChartData({
    version: 'current',
    packages: ['wordtree'],
  })
  const barDataPromise = loadChartData({
    version: 'current',
    packages: ['bar'],
  })

  Promise.all([
    remarkPromise,
    wordtreeDataPromise
  ]).then(() => {
    drawChart()
    drawChart2()
  })

  Promise.all([
    remarkPromise,
    barDataPromise
  ]).then(() => {
    drawChart3()
  })
}

main().catch(error => {
  console.log(error)
})
