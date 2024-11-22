<template>
  <div ref="chart" style="width: 100%; height: 400px;" />
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'BarChart',
  props: {
    charData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    charData: {
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
      this.setOptions(this.charData)
    },
    setOptions(data) {
      const options = {
        title: {
          text: '健康指标柱状图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        xAxis: {
          type: 'category',
          data: ['肺活量(ml)', '血糖(mmol/L)', '血脂(mmol/L)', '血压(mmHg)', '胆固醇(mmol/L)']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '数量',
            type: 'bar',
            data: [
              this.charData.vitalCapacity,
              this.charData.bloodSugar,
              this.charData.bloodFat,
              this.charData.bloodPressure,
              this.charData.cholesterol
            ]
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
