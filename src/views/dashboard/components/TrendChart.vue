<template>
  <div ref="chart" style="width: 100%; height: 400px;" />
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'TrendChart',
  data() {
    return {
      chart: null,
      chartData: [
        { date: '2024-11-01', 类型C: 820, 类型B: 620 },
        { date: '2024-11-02', 类型A: 932, 类型B: 732 },
        { date: '2024-11-03', 类型A: 901, 类型B: 701 },
        { date: '2024-11-04', 类型A: 934, 类型B: 734 },
        { date: '2024-11-05', 类型A: 1290, 类型B: 1090 }
      ]
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart)
      this.setOptions()
    },
    setOptions() {
      const options = {
        title: {
          text: '健康趋势图'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['类型A', '类型B']
        },
        xAxis: {
          type: 'category',
          data: this.chartData.map(item => item.date)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '类型A',
            type: 'line',
            data: this.chartData.map(item => item.类型A)
          },
          {
            name: '类型B',
            type: 'line',
            data: this.chartData.map(item => item.类型B)
          }
        ]
      }
      this.chart.setOption(options)
    }
  }
}
</script>

<style scoped>
</style>
