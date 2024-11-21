<template>
  <div v-loading="loading">
    <el-form ref="form" :model="data" :rules="rules" label-width="80px">
      <el-form-item prop="userId" label="用户">
        <el-select v-model="data.userId" placeholder="请选择用户">
          <el-option
            v-for="item in dropDownList"
            :key="item.id"
            :label="item.nickName + '(' + item.username + ')'"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="vitalCapacity" label="肺活量">
        <el-input-number v-model="data.vitalCapacity" placeholder="请输入肺活量" />
      </el-form-item>
      <el-form-item prop="bloodSugar" label="血糖">
        <el-input-number v-model="data.bloodSugar" placeholder="请输入血糖" />
      </el-form-item>
      <el-form-item prop="bloodFat" label="血脂">
        <el-input-number v-model="data.bloodFat" placeholder="请输入血脂" />
      </el-form-item>
      <el-form-item prop="bloodPressure" label="血压">
        <el-input-number v-model="data.bloodPressure" placeholder="请输入血压" />
      </el-form-item>
      <el-form-item prop="cholesterol" label="胆固醇">
        <el-input-number v-model="data.cholesterol" placeholder="请输入胆固醇" />
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
    dropDownList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      rules: {
        userId: [{ required: true, message: '请选择用户', trigger: 'blur' }],
        vitalCapacity: [
          { required: true, message: '请输入肺活量', trigger: 'blur' },
          { type: 'number', message: '肺活量必须是数字' }
        ],
        bloodSugar: [
          { required: true, message: '请输入血糖', trigger: 'blur' },
          { type: 'number', message: '血糖必须是数字' }
        ],
        bloodFat: [
          { required: true, message: '请输入血脂', trigger: 'blur' },
          { type: 'number', message: '血脂必须是数字' }
        ],
        bloodPressure: [
          { required: true, message: '请输入血压', trigger: 'blur' },
          { type: 'number', message: '血压必须是数字' }
        ],
        cholesterol: [
          { required: true, message: '请输入胆固醇', trigger: 'blur' },
          { type: 'number', message: '胆固醇必须是数字' }
        ]
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
          service.post('/healthData/save', this.data).then(res => {
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
