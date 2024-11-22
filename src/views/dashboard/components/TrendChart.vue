<template>
  <div ref="chart" style="width: 100%; height: 400px;" />
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'TrendChart',
  props: {
    chartData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      handler(newData) {
        if (this.chart) {
          this.setOptions(newData)
        } else {
          this.initChart()
        }
      },
      deep: true
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
      this.setOptions(this.chartData)
    },
    setOptions(data) {
      const options = {
        title: {
          text: '健康趋势图(每日平均值)'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['肺活量(ml)', '血糖(mmol/L)', '血脂(mmol/L)', '血压(mmHg)', '胆固醇(mmol/L)']
        },
        xAxis: {
          type: 'category',
          data: data.map(item => item.date)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '肺活量(ml)',
            type: 'line',
            data: data.map(item => item.vitalCapacity)
          },
          {
            name: '血糖(mmol/L)',
            type: 'line',
            data: data.map(item => item.bloodSugar)
          },
          {
            name: '血脂(mmol/L)',
            type: 'line',
            data: data.map(item => item.bloodFat)
          },
          {
            name: '血压(mmHg)',
            type: 'line',
            data: data.map(item => item.bloodPressure)
          },
          {
            name: '胆固醇(mmol/L)',
            type: 'line',
            data: data.map(item => item.cholesterol)
          }
        ]
      }
      this.chart.setOption(options)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
