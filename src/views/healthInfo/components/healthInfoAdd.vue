<template>
  <el-dialog
    :title="'新增' + type"
    :visible.sync="localVisible"
    destroy-on-close
  >
    <el-form ref="form" :model="data" :rules="rules" label-width="80px">
      <el-form-item prop="titleImage" label="标题图片">
        <el-input v-model="data.titleImage" />
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
  </el-dialog>
</template>

<script>
import service from '@/utils/request'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
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
          service.post('/healthInfo/save', this.data).then(res => {
            this.loading = false
            this.data = {}
            this.localVisible = false
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
