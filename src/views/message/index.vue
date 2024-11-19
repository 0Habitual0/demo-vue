<template>
  <div class="container">
    <div class="filter-box">
      <el-form ref="queryForm" :model="params" label-width="100px" class="clearfix">
        <el-row>
          <el-col :span="8">
            <el-form-item label="内容">
              <el-input v-model="params.content" placeholder="请输入标题" />
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
              <label>留言列表</label>
              <p>共有<span>{{ page.totalCount }}</span>条查询结果</p>
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
          prop="content"
          label="内容"
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
  </div>
</template>

<script>
import service from '@/utils/request'
import { Message } from 'element-ui'

export default {
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
      }
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
      this.params.type = this.type
      this.params.pageNum = this.page.current
      this.params.pageSize = this.page.size
      service.post('/message/selectByPage', this.params).then(res => {
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
    onDelete(row) {
      this.$confirm('此操作将删除该留言, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        service.get('/message/delete?id=' + row.id).then(res => {
          if (res.status === 'ok') {
            Message.success('删除成功')
          }
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
