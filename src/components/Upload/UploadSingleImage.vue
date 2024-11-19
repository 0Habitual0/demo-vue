<template>
  <el-upload
    list-type="picture-card"
    action=""
    :http-request="uploadFile"
    :limit="1"
    :file-list="imageList"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-remove="handleRemove"
    :before-upload="beforeUpload"
    :class="{ hide: hideUpload }"
  >
    <i class="el-icon-plus" />
  </el-upload>
</template>

<script>
import { Message } from 'element-ui'
import service from '@/utils/request'

export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: String
  },
  data() {
    return {
      imageList: this.value ? [{ name: 'Uploaded Image', url: this.value }] : [], // 如果有值，初始化imageList
      hideUpload: !!this.value // 如果有值，则隐藏上传按钮
    }
  },
  watch: {
    value(newVal) {
      this.imageList = newVal ? [{ name: 'Uploaded Image', url: newVal }] : []
      this.hideUpload = !!newVal
    }
  },
  methods: {
    uploadFile({ file, onSuccess, onError }) {
      const formData = new FormData()
      formData.append('file', file)
      service.post('/file/upload', formData)
        .then(res => {
          onSuccess(res)
        })
        .catch(error => {
          onError(error)
        })
    },
    handleSuccess(response, file, fileList) {
      if (response.data) {
        this.hideUpload = true
        this.$emit('updateTitleImage', response.data)
        Message.success('上传成功')
      } else {
        Message.error('上传成功但未返回URL')
      }
    },
    handleError(err, file, fileList) {
      console.log(err)
      Message.error('上传失败，请重试')
    },
    handleRemove() {
      this.$emit('updateTitleImage', null)
      this.imageList = [] // 清空imageList
      this.hideUpload = false
      this.$emit('input', null)
    },
    beforeUpload(file) {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        Message.error('上传文件必须是图片')
      }
      return isImage
    }
  }
}
</script>

<style scoped>

::v-deep.hide .el-upload--picture-card {
  display: none;
}

</style>
