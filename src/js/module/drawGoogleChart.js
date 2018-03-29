/* global google */

import loadScript from './loadScript'

const libraries = loadScript('https://www.gstatic.com/charts/loader.js')
  .then(() => {
    return new Promise((resolve, reject) => {
      google.charts.load('current', {
        packages: ['wordtree', 'bar'],
        callback: resolve,
      })
    })
})

async function drawWordTree(element, data, options = {}) {
  await libraries
  const dataTable = google.visualization.arrayToDataTable(data)
  const chart = new google.visualization.WordTree(element)
  chart.draw(dataTable, options)
}

async function drawBarChart(element, data, options = {}) {
  await libraries
  const dataTable = google.visualization.arrayToDataTable(data)
  const chart = new google.charts.Bar(element)
  chart.draw(dataTable, options)
}

export default function drawGoogleChart(element, type, data, options = {}) {
  switch (type) {
    case 'bar':
      return drawBarChart(element, data, options)
    case 'wordtree':
      return drawWordTree(element, data, options)
  }
}
