<template>
  <el-form ref="form" :model="data" :rules="rules" label-width="80px" class="fix-input-color">
    <el-form-item prop="username" label="登录账号">
      <el-input v-model="data.username" />
    </el-form-item>
    <el-form-item prop="nickName" label="用户名">
      <el-input v-model="data.nickName" />
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input v-model="data.password" />
    </el-form-item>
    <el-form-item prop="sex" label="性别">
      <el-select v-model="data.sex">
        <el-option label="男" value="男" />
        <el-option label="女" value="女" />
      </el-select>
    </el-form-item>
    <el-form-item prop="age" label="年龄">
      <el-input-number v-model="data.age" />
    </el-form-item>
    <el-form-item prop="email" label="邮箱">
      <el-input v-model="data.email" />
    </el-form-item>
    <el-form-item prop="tel" label="电话号">
      <el-input v-model="data.tel" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import service from '@/utils/request'

export default {
  props: {},
  data() {
    return {
      rules: {
        username: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
        nickName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        sex: [{ required: true, message: '请输入性别', trigger: 'blur' }],
        age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        tel: [{ required: true, message: '请输入电话号', trigger: 'blur' }]
      },
      data: {}
    }
  },
  watch: {},
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.data.role = '普通用户'
          this.data.status = 1
          service.post('/user/register', this.data).then(res => {
            this.loading = false
            this.data = {}
            this.$emit('close')
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
      this.data = {
        status: 0
      }
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss">

.fix-input-color {
  .el-input {
    input{
      color: black !important;
    }
  }
}

</style>
