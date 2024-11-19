<template>
  <div v-loading="loading">
    <el-form ref="form" :model="data" :rules="rules" label-width="80px">
      <el-form-item prop="titleImage" label="标题图片">
        <UploadSingleImage
          v-model="data.titleImage"
          @updateTitleImage="updateTitleImage"
        />
      </el-form-item>
      <el-form-item prop="title" label="标题">
        <el-input v-model="data.title" />
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <el-input
          v-model="data.content"
          type="textarea"
          :rows="10"
        />
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
import UploadSingleImage from '@/components/Upload/UploadSingleImage.vue'

export default {
  components: { UploadSingleImage },
  props: {
    type: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    const validateTitleImage = (rule, value, callback) => {
      if (this.data.titleImage === null || this.data.titleImage === undefined) {
        callback(new Error('图片不能为空'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      rules: {
        titleImage: [{ required: true, validator: validateTitleImage, trigger: 'blur' }],
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      }
    }
  },
  methods: {
    updateTitleImage(titleImage) {
      this.data.titleImage = titleImage
      this.$refs.form.validateField('titleImage')
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.data.type = this.type
          service.post('/healthInfo/save', this.data).then(res => {
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
      this.data = {}
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped lang="scss">

</style>
