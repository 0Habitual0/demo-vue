<template>
  <el-dialog
    title="用户详情"
    :visible.sync="localVisible"
    destroy-on-close
  >
    <div slot="title">
      <span>用户详情</span>
    </div>
    <el-form ref="form" :model="data" label-width="80px">
      <el-form-item label="登录账号">
        <el-input v-model="data.username" disabled />
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="data.nickName" disabled />
      </el-form-item>
      <el-form-item prop="sex" label="性别">
        <el-select v-model="data.sex">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input-number v-model="data.age" disabled />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="data.email" disabled />
      </el-form-item>
      <el-form-item label="电话号">
        <el-input v-model="data.tel" disabled />
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="data.role" disabled>
          <el-option label="管理员" value="管理员" />
          <el-option label="普通用户" value="普通用户" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch
          v-model="data.status"
          :active-value="1"
          :inactive-value="0"
          active-text="启用"
          inactive-text="禁用"
          active-color="#2ECC71"
          inactive-color="#E74C3C"
          disabled
        />
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
    data: {
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
