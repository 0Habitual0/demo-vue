<template>
  <div class="container">
    <div class="filter-box">
      <el-form ref="queryForm" :model="params" label-width="100px" class="clearfix">
        <el-row>
          <el-col :span="8">
            <el-form-item label="登录账号">
              <el-input v-model="params.username" placeholder="请输入登录账号" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户名">
              <el-input v-model="params.nickName" placeholder="请输入昵称" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别">
              <el-select v-model="params.sex" clearable placeholder="请选择性别">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="电话号">
              <el-input v-model="params.tel" placeholder="请输入电话号" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱">
              <el-input v-model="params.email" placeholder="请输入邮箱地址" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select v-model="params.status" clearable placeholder="请选择状态">
                <el-option label="启用" :value="1" />
                <el-option label="禁用" :value="0" />
              </el-select>
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
              <label>用户列表</label>
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
          prop="username"
          label="登录名"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="nickName"
          label="用户名"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="sex"
          label="性别"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="age"
          label="年龄"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="email"
          label="邮箱"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="tel"
          label="电话号"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="status"
          label="状态"
          show-overflow-tooltip
          align="center"
        >
          <template v-slot="scope">
            <span :class="scope.row.status === 1 ? 'status-enabled' : 'status-disabled'"> {{ scope.row.status === 1 ? '启用' : '禁用' }} </span>
          </template>
        </el-table-column>
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
    <!--用户新增页组件-->
    <UserAdd
      :visible.sync="showAddDialog"
      @onSubmit="onSubmit"
    />
    <!--用户详情页组件-->
    <UserDetail
      :visible.sync="showDetailDialog"
      :data="data"
    />
    <!--用户编辑页组件-->
    <UserEdit
      :visible.sync="showEditDialog"
      :data="data"
      @onSubmit="onSubmit"
    />
  </div>
</template>

<script>
import service from '@/utils/request'
import UserAdd from '@/views/user/components/userAdd.vue'
import UserDetail from '@/views/user/components/userDetail.vue'
import UserEdit from '@/views/user/components/userEdit.vue'

export default {
  components: { UserDetail, UserAdd, UserEdit },
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
      service.post('/user/selectByPage', this.params).then(res => {
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
        service.get('/user/delete?id=' + userData.id).then(res => {
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
