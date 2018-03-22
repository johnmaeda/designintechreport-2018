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

async function main() {
  const slides = createRemark(source)

  Promise.all([
    slides,
    loadChartData({
      version: 'current',
      packages: ['wordtree'],
    }),
  ]).then(() => {
    // drawChart()
    // drawChart2()
  })

  Promise.all([
    slides,
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
