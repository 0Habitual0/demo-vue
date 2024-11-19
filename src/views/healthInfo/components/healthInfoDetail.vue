<template>
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
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">

</style>
