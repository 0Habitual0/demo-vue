<template>
  <el-dialog
    title="用户详情"
    :visible.sync="localVisible"
    destroy-on-close
  >
    <div slot="title">
      <span>用户详情</span>
    </div>
    <el-form ref="form" :model="userData" label-width="80px">
      <el-form-item label="登录账号">
        <el-input v-model="userData.username" disabled />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    userData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localVisible: this.visible
    }
  },
  watch: {
    visible(val) {
      this.localVisible = val
    },
    localVisible(val) {
      this.$emit('update:visible', val)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
