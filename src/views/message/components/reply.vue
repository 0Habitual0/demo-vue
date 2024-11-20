<template>
  <div v-loading="loading">
    <el-form ref="form" :model="data" :rules="rules" label-width="80px">
      <el-form-item prop="content" label="回复内容">
        <el-input v-model="data.content" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import service from '@/utils/request'

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
        content: [{ required: true, message: '请输入回复内容', trigger: 'blur' }]
      }
    }
  },
  watch: {},
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.data.parentId = this.data.id
          delete this.data.id
          service.post('/message/save', this.data).then(res => {
            this.loading = false
            this.$emit('onSubmit')
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

<style scoped lang="scss">

</style>
