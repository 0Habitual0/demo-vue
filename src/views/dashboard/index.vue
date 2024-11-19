<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <div class="news-container">
      <div class="latest-news">
        <h2>最新资讯</h2>
        <ul>
          <li v-for="healthInfoItem in healthInfoList" :key="healthInfoItem.id" @click="showDetailDialogFunction(healthInfoItem)">
            <img :src="healthInfoItem.titleImage" alt="news image">
            <span>{{ healthInfoItem.title }}</span>
          </li>
        </ul>
      </div>
      <!--详情页组件-->
      <el-dialog
        :title="data.type + '详情'"
        :visible.sync="showDetailDialog"
        destroy-on-close
      >
        <HealthInfoDetail :data="data" @onSubmit="closeDetailDialogFunction()" />
      </el-dialog>
    </div>
    <div class="charts-header">
      <h2>健康指数统计</h2>
    </div>
    <!--        <div class="charts-container">-->
    <!--          <BarChart />-->
    <!--          <LineChart chart-data="" />-->
    <!--        </div>-->
    <div class="charts-footer">
      <p>@ 健康管理系统 2024</p>
    </div>
  </div>
</template>

<script>
import service from '@/utils/request'
import HealthInfoDetail from '@/views/healthInfo/components/healthInfoDetail.vue'
// import { mapGetters } from 'vuex'
// import BarChart from '@/views/dashboard/BarChart.vue'
// import LineChart from '@/views/dashboard/LineChart.vue'

export default {
  name: 'Dashboard',
  components: { HealthInfoDetail },
  // components: { BarChart, LineChart },
  data() {
    return {
      healthInfoList: [],
      showDetailDialog: false,
      data: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.selectLatestHealthInfo()
    },
    selectLatestHealthInfo() {
      service.get('/healthInfo/selectLatest', this.formData).then(res => {
        this.healthInfoList = res.data
      })
    },
    showDetailDialogFunction(row) {
      this.data = { ...row }
      console.log(this.data)
      this.showDetailDialog = true
    },
    closeDetailDialogFunction() {
      this.showDetailDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  .news-container {
    margin-bottom: 20px; /* 添加间距以分隔新闻和图表 */
  }

  .latest-news {
    background-color: #f8f9fa; /* 背景颜色 */
    padding: 10px; /* 内边距 */
    border: 1px solid #dee2e6; /* 边框 */
    border-radius: 5px; /* 圆角 */
  }

  .latest-news ul {
    list-style: none; /* 去掉默认列表样式 */
    padding: 0;
    display: flex; /* 使用flex布局 */
    flex-wrap: wrap; /* 换行显示 */
    gap: 10px; /* 增加间距 */
  }

  .latest-news li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 150px; /* 设置宽度 */
    height: 150px; /* 设置高度 */
    padding: 10px;
    cursor: pointer;
    border: 1px solid #dee2e6;
    border-radius: 5px;
  }

  .latest-news li img {
    width: 100px; /* 调整图片宽度 */
    height: 100px; /* 调整图片高度 */
    margin-bottom: 10px;
  }

  .charts-header {
    padding: 10px; /* 内边距 */
    margin-bottom: 10px;
  }

  .charts-container {
    display: flex;
    justify-content: center; /* 确保图表容器居中对齐 */
    gap: 10px; /* 添加间距 */
  }

  .charts-footer {
    text-align: center; /* 中心对齐 */
  }

  .dashboard-text, .charts-container {
    width: 100%;
  }

  BarChart, LineChart {
    width: 45%; /* 调整宽度以保持图表比例 */
  }
}
</style>
