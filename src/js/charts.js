import { observeSlideVisibility } from './remark'

import bossData from '../data/boss.json'
import stereotypeData from '../data/stereotype.json'
import surveyData from '../data/survey.json'

// Provides for promisifying google.charts.load() function.
export function loadChartData({ version, packages }) {
  return new Promise((resolve, reject) => {
    google.charts.load(version, {
      packages,
      callback: resolve,
    })
  })
}

export function drawChart() {
  const data = google.visualization.arrayToDataTable(stereotypeData)
  const options = {
    wordtree: {
      format: 'implicit',
      word: 'Stereotype/',
    },
  }
  const element = document.getElementById('wordtree_basic')
  observeSlideVisibility(element, () => {
    const chart = new google.visualization.WordTree(element)
    chart.draw(data, options)
  })
}

export function drawChart2() {
  const data = google.visualization.arrayToDataTable(bossData)
  const options = {
    wordtree: {
      format: 'implicit',
      word: 'Hey-Boss',
    },
  }
  const element = document.getElementById('wordtree_basic2')
  observeSlideVisibility(element, () => {
    const chart = new google.visualization.WordTree(element)
    chart.draw(data, options)
  })
}

export function drawChart3() {
  const data = google.visualization.arrayToDataTable(surveyData)
  const options = {
    legend: {
      position: 'bottom',
      alignment: 'start',
    },
    colors: ['#dddee0', '#6918f9'],
    chart: {
      title: 'Leah Buley Co. State of UX 2016 Survey',
      subtitle: 'To what extent has your organization found UX to be a driver of the following measures?',
    },
  }
  const element = document.getElementById('columnchart_material')
  observeSlideVisibility(element, () => {
    const chart = new google.charts.Bar(element)
    chart.draw(data, google.charts.Bar.convertOptions(options))
  })
}
