<template>
  <el-form ref="form" :model="data" label-width="80px">
    <el-form-item prop="titleImage" label="标题图片">
      <el-image
        v-if="data.titleImage"
        :src="data.titleImage"
        style="margin-top: 10px; width: 100px; height: 100px;"
      />
    </el-form-item>
    <el-form-item label="标题">
      <el-input v-model="data.title" disabled />
    </el-form-item>
    <el-form-item label="内容">
      <el-input
        v-model="data.content"
        type="textarea"
        :rows="10"
        disabled
      />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">

</style>
