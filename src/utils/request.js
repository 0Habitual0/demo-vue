import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // URL = 基础URL + 请求URL
  // withCredentials: true, // 跨域请求时发送 cookies
  timeout: 500000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些事情
    if (store.getters.token) {
      // 让每个请求携带 token
      // ['X-Token'] 是自定义的 headers 键
      // 请根据实际情况修改
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // 处理请求错误
    console.log(error) // 用于调试
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * 如果你想获取 HTTP 信息如头信息或状态
   * 请返回  response => response
   */

  /**
   * 通过自定义代码判断请求状态
   * 这里仅是一个示例
   * 你也可以通过 HTTP 状态码判断状态
   */
  response => {
    const res = response.data

    // 如果返回体状态码不是 ok，则判断为错误
    if (res.status !== 'ok') {
      Message({
        message: res.message || '错误',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || '错误'))
    } else {
      return res
    }
  },
  error => {
    // 如果返回状态码是401，处理自定义响应
    if (error.response && error.response.status === 401) {
      const res = error.response.data

      // 50008: 非法 token | 50012: 其他客户端已登录 | 50014: 失效 token
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 重新登录
        MessageBox.confirm(res.message, '会话状态', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  }
)

export default service
