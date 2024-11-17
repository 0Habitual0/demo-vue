<template>
  <div class="container">
    <div class="filter-box">
      <el-form ref="queryForm" :model="params" label-width="100px" class="clearfix">
        <el-row>
          <el-col :span="8">
            <el-form-item label="标题">
              <el-input v-model="params.title" placeholder="请输入标题" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建人">
              <el-input v-model="params.createBy" placeholder="请输入创建人" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="更新人">
              <el-input v-model="params.updateBy" placeholder="请输入更新人" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item class="flex-right">
              <el-button type="primary" @click="onSubmit()">查询</el-button>
              <el-button @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="pagination-box">
      <div>
        <el-row type="flex" justify="space-between" align="middle">
          <el-col>
            <div>
              <label>运动资讯列表</label>
              <p>共有<span>{{ page.totalCount }}</span>条查询结果</p>
            </div>
          </el-col>
          <el-col>
            <div class="button-group">
              <el-button @click="showUserAdd()">新增</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <!--表格数据-->
      <el-table
        v-loading="loading"
        element-loading-text="表格数据加载中..."
        :data="dataList"
        border="border"
        row-key="id"
        default-expand-all
      >
        <el-table-column
          min-width="10%"
          prop="titleImage"
          label="标题图片"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="title"
          label="标题"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="createBy"
          label="创建人"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="createTime"
          label="创建时间"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="updateBy"
          label="更新人"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="updateTime"
          label="更新时间"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="15%"
          show-overflow-tooltip
          align="center"
          label="操作"
        >
          <template v-slot="scope">
            <el-button
              type="text"
              style=" margin-left: 8px"
              @click="showUserDetails(scope.row)"
            >查看</el-button>
            <el-button
              type="text"
              style=" margin-left: 8px"
              @click="showUserEdits(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              style=" margin-left: 8px"
              @click="onDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页条-->
      <el-pagination
        popper-class="mod-pagination-select"
        layout="slot, total, sizes, prev, pager, next, jumper"
        :current-page="page.current"
        :page-sizes="[5, 10, 20, 50, 100, 200]"
        :page-size="page.size"
        :total="page.totalCount"
        @size-change="handlePageSizeChange"
        @current-change="handlePageCurrentChange"
      >
        <span key="1">
          当前第 {{ page.current }}/{{ page.pages }} 页
        </span>
      </el-pagination>
    </div>
    <!--新增页组件-->
    <HealthInfoAdd
      :visible.sync="showAddDialog"
      type="运动资讯"
      @onSubmit="onSubmit"
    />
    <!--详情页组件-->
    <UserDetail
      :visible.sync="showDetailDialog"
      :data="data"
    />
    <!--编辑页组件-->
    <UserEdit
      :visible.sync="showEditDialog"
      :data="data"
      @onSubmit="onSubmit"
    />
  </div>
</template>

<script>
import service from '@/utils/request'
import HealthInfoAdd from '@/views/healthInfo/components/healthInfoAdd.vue'

import UserDetail from '@/views/user/components/userDetail.vue'
import UserEdit from '@/views/user/components/userEdit.vue'

export default {
  components: { HealthInfoAdd, UserDetail, UserEdit },
  data() {
    return {
      params: {},
      loading: false,
      dataList: [],
      page: {
        current: 1,
        size: 5,
        totalCount: 1,
        pages: 0
      },
      data: {},
      showAddDialog: false,
      showDetailDialog: false,
      showEditDialog: false
    }
  },
  computed: {
  },
  created() {
    this.query()
  },
  methods: {
    onSubmit() {
      this.page.current = 1
      this.query()
    },
    resetQuery() {
      this.params = {}
    },
    query() {
      this.loading = true
      this.params.pageNum = this.page.current
      this.params.pageSize = this.page.size
      service.post('/healthInfo/selectByPage', this.params).then(res => {
        console.log(res)
        this.dataList = res.data.content
        this.page.pages = res.data.page.totalPages
        this.page.totalCount = res.data.page.totalElements
        this.loading = false
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
    },
    handlePageSizeChange(val) {
      this.page.size = val
      this.query()
    },
    handlePageCurrentChange(val) {
      this.page.current = val
      this.query()
    },
    showUserAdd() {
      this.showAddDialog = true
    },
    showUserDetails(userData) {
      this.data = userData
      this.showDetailDialog = true
    },
    showUserEdits(userData) {
      this.data = userData
      this.showEditDialog = true
    },
    onDelete(userData) {
      this.$confirm('此操作将删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        service.get('/healthInfo/delete?id=' + userData.id).then(res => {
          this.onSubmit()
        }).catch(error => {
          console.log(error)
          this.loading = false
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
