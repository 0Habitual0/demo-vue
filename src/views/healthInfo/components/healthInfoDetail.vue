<template>
  <div v-loading="loading">
    <el-form label-width="80px">
      <el-form-item>
        <el-image
          v-if="data.titleImage"
          :src="data.titleImage"
          style="margin-top: 10px; width: 100px; height: 100px;"
        />
      </el-form-item>
      <el-form-item label="标题">
        <span>{{ data.title }}</span>
      </el-form-item>
      <el-form-item label="内容">
        <el-input
          v-model="data.content"
          type="textarea"
          :rows="10"
          readonly
        />
      </el-form-item>
    </el-form>
    <label>评论区</label>
    <el-card class="comment-card">
      <el-table :data="commentList" stripe>
        <el-table-column prop="createBy" label="用户名" width="120" />
        <el-table-column prop="content" label="评论内容" />
        <el-table-column prop="createTime" label="评论时间" width="180" />
      </el-table>
      <el-form ref="form" :model="params" :rules="rules" label-width="80px" style="margin-top: 10px">
        <el-form-item prop="content" label="发表评论">
          <el-input
            v-model="params.content"
            type="textarea"
            :rows="2"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import service from '@/utils/request'
import { Message } from 'element-ui'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      rules: {
        content: [{ required: true, message: '请输入评论内容', trigger: 'blur' }]
      },
      commentList: [],
      params: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.selectComment()
    },
    selectComment() {
      this.loading = true
      service.get('/healthInfoComment/selectByHealthInfo?healthInfoId=' + this.data.id).then(res => {
        this.commentList = res.data
        this.loading = false
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.params.healthInfoId = this.data.id
          service.post('/healthInfoComment/save', this.params).then(res => {
            if (res.status === 'ok') {
              this.params = {}
              Message.success('评论成功')
              this.init()
            }
            this.loading = false
          }).catch(error => {
            console.log(error)
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.comment-card {
  margin-top: 20px;
  padding: 20px;
}
</style>
