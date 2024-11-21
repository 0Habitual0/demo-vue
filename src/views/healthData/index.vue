<template>
  <div class="container">
    <div class="filter-box">
      <el-form ref="queryForm" :model="params" label-width="100px" class="clearfix">
        <el-row>
          <el-col :span="8">
            <el-form-item label="归属人">
              <el-select v-model="params.userId" placeholder="请选择归属人">
                <el-option
                  v-for="item in dropDownList"
                  :key="item.id"
                  :label="item.nickName + '(' + item.username + ')'"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建时间大于">
              <el-date-picker
                v-model="params.createTimeAfter"
                type="datetime"
                placeholder="请选择时间"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-ddTHH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建时间小于">
              <el-date-picker
                v-model="params.createTimeBefore"
                type="datetime"
                placeholder="请选择时间"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-ddTHH:mm:ss"
              />
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
              <label>健康报告列表</label>
              <p>共有<span>{{ page.totalCount }}</span>条查询结果</p>
            </div>
          </el-col>
          <el-col>
            <div class="button-group">
              <el-button @click="showAddDialogFunction()">新增</el-button>
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
          prop="userId"
          label="归属人"
          show-overflow-tooltip
          align="center"
          :formatter="userDisplayFormatter"
        />
        <el-table-column
          min-width="10%"
          prop="vitalCapacity"
          label="肺活量(ml)"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="bloodSugar"
          label="血糖(mmol/L)"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="bloodFat"
          label="血脂(mmol/L)"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="bloodPressure"
          label="血压(mmHg)"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="cholesterol"
          label="胆固醇(mmol/L)"
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
              @click="showDetailDialogFunction(scope.row)"
            >查看</el-button>
            <el-button
              type="text"
              style=" margin-left: 8px"
              @click="showEditDialogFunction(scope.row)"
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
    <el-dialog
      v-if="showAddDialog"
      :visible.sync="showAddDialog"
      title="新增数据"
      destroy-on-close
    >
      <HealthDataAdd :drop-down-list="dropDownList" @onSubmit="closeAddDialogFunction()" />
    </el-dialog>
    <!--详情页组件-->
    <el-dialog
      v-if="showDetailDialog"
      :visible.sync="showDetailDialog"
      title="数据详情"
      destroy-on-close
    >
      <HealthDataDetail :drop-down-list="dropDownList" :data="data" @onSubmit="closeDetailDialogFunction()" />
    </el-dialog>
    <!--编辑页组件-->
    <el-dialog
      v-if="showEditDialog"
      :visible.sync="showEditDialog"
      title="编辑数据"
      destroy-on-close
    >
      <HealthDataEdit :drop-down-list="dropDownList" :data="data" @onSubmit="closeEditDialogFunction()" />
    </el-dialog>
  </div>
</template>

<script>
import service from '@/utils/request'
import HealthDataAdd from '@/views/healthData/components/healthDataAdd.vue'
import HealthDataDetail from '@/views/healthData/components/healthDataDetail.vue'
import HealthDataEdit from '@/views/healthData/components/healthDataEdit.vue'
import { Message } from 'element-ui'

export default {
  components: { HealthDataAdd, HealthDataDetail, HealthDataEdit },
  data() {
    return {
      params: {},
      loading: false,
      dataList: [],
      dropDownList: [],
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
    userMap() {
      return this.dropDownList.reduce((map, user) => {
        map[user.id] = `${user.nickName} (${user.username})`
        return map
      }, {})
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.query()
      this.getDropDownList()
    },
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
      service.post('/healthData/selectByPage', this.params).then(res => {
        this.dataList = res.data.content
        this.page.pages = res.data.page.totalPages
        this.page.totalCount = res.data.page.totalElements
        this.loading = false
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
    },
    getDropDownList() {
      this.loading = true
      service.get('/user/dropDownList', this.data).then(res => {
        this.loading = false
        this.dropDownList = res.data
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
    },
    userDisplayFormatter(row, column, cellValue) {
      return this.userMap[cellValue] || cellValue
    },
    handlePageSizeChange(val) {
      this.page.size = val
      this.query()
    },
    handlePageCurrentChange(val) {
      this.page.current = val
      this.query()
    },
    showAddDialogFunction() {
      this.showAddDialog = true
    },
    showDetailDialogFunction(row) {
      this.data = { ...row }
      this.showDetailDialog = true
    },
    showEditDialogFunction(row) {
      this.data = { ...row }
      this.showEditDialog = true
    },
    closeAddDialogFunction() {
      this.showAddDialog = false
      this.onSubmit()
    },
    closeDetailDialogFunction() {
      this.showDetailDialog = false
    },
    closeEditDialogFunction() {
      this.showEditDialog = false
      this.onSubmit()
    },
    onDelete(row) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        service.get('/healthData/delete?id=' + row.id).then(res => {
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
