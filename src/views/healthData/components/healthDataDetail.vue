<template>
  <div v-loading="loading">
    <el-form ref="form" :model="data" label-width="80px">
      <el-form-item v-if="dropDownList" label="用户">
        <el-select v-model="data.userId" placeholder="请选择用户" disabled>
          <el-option
            v-for="item in dropDownList"
            :key="item.id"
            :label="item.nickName + '(' + item.username + ')'"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="肺活量">
        <el-input-number v-model="data.vitalCapacity" placeholder="请输入肺活量" disabled />
      </el-form-item>
      <el-form-item label="血糖">
        <el-input-number v-model="data.bloodSugar" placeholder="请输入血糖" disabled />
      </el-form-item>
      <el-form-item label="血脂">
        <el-input-number v-model="data.bloodFat" placeholder="请输入血脂" disabled />
      </el-form-item>
      <el-form-item label="血压">
        <el-input-number v-model="data.bloodPressure" placeholder="请输入血压" disabled />
      </el-form-item>
      <el-form-item label="胆固醇">
        <el-input-number v-model="data.cholesterol" placeholder="请输入胆固醇" disabled />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  props: {
    dropDownList: {
      type: Array,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  watch: {},
  methods: {
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
