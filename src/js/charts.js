/* global google */

function loadLibraries({ version, packages }) {
  return new Promise((resolve, reject) => {
    google.charts.load(version, {
      packages,
      callback: resolve,
    })
  })
}

const libraries = new Promise((resolve, reject) => {
  google.charts.load('current', {
    packages: ['wordtree', 'bar'],
    callback: resolve,
  })
})

export async function drawWordTree(element, data, options = {}) {
  await libraries
  const dataTable = google.visualization.arrayToDataTable(data)
  const chart = new google.visualization.WordTree(element)
  chart.draw(dataTable, options)
}

export async function drawBarChart(element, data, options = {}) {
  await libraries
  const dataTable = google.visualization.arrayToDataTable(data)
  const chart = new google.charts.Bar(element)
  chart.draw(dataTable, options)
}
