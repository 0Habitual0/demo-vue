<template>
  <div v-loading="loading" class="container">
    <div class="filter-box">
      <el-form ref="form" :model="data" :rules="rules" class="clearfix">
        <el-row>
          <el-col :span="24" style="margin-bottom: 20px">
            <div>
              <label>留言板</label>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="content">
              <el-input v-model="data.content" type="textarea" placeholder="请输入留言" :rows="4" style="margin-bottom: 20px" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item class="flex-right">
              <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="pagination-box">
      <div class="message-board">
        <el-row>
          <el-col :span="24" class="message-board-header">
            <label>历史留言</label>
          </el-col>
        </el-row>
        <div v-for="(message, index) in messages" :key="index">
          <el-card class="message-card">
            <div slot="header" class="message-header">
              <span>{{ message.content }}</span>
              <br>
              <small>由 {{ message.createBy }} 创建于 {{ message.createTime }}</small>
            </div>
            <div v-if="message.children && message.children.length">
              <el-card
                v-for="(reply, replyIndex) in message.children"
                :key="replyIndex"
                class="reply-card"
              >
                <div slot="header" class="reply-header">
                  <span>回复: {{ reply.content }}</span>
                  <br>
                  <small>由 {{ reply.createBy }} 创建于 {{ reply.createTime }}</small>
                </div>
              </el-card>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from '@/utils/request'
import { Message } from 'element-ui'

export default {
  data() {
    return {
      loading: false,
      rules: {
        content: [{ required: true, message: '请输入留言内容', trigger: 'blur' }]
      },
      data: {},
      messages: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.selectMessage()
    },
    selectMessage() {
      this.loading = true
      service.get('/message/selectByUser').then(res => {
        this.messages = res.data
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
          service.post('/message/save', this.data).then(res => {
            this.init()
            Message.success('留言成功')
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
.message-board-header {
  margin-bottom: 20px;
}
.message-card {
  margin-bottom: 10px;
}
.reply-card {
  margin-top: 10px;
}
.message-header,
.reply-header {
  font-size: 14px;
  color: #606266;
}
</style>
