<template>
  <el-dialog
    title="找回密码"
    :visible.sync="localVisible"
    destroy-on-close
  >
    <el-form ref="form" :model="data" :rules="rules" label-width="80px">
      <el-form-item prop="username" label="登录账号">
        <el-input v-model="data.username" />
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="data.email" />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="data.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import service from '@/utils/request'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      rules: {
        username: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      localVisible: this.visible,
      data: {}
    }
  },
  watch: {
    visible(val) {
      this.localVisible = val
    },
    localVisible(val) {
      this.$emit('update:visible', val)
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          service.post('/user/recoverPassword', this.data).then(res => {
            this.loading = false
            this.data = {}
            this.localVisible = false
            if (res.status === 'ok') {
              this.$message({
                message: res.data,
                type: 'success'
              })
            }
          }).catch(error => {
            console.log(error)
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.data = {}
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped lang="scss">

</style>
