import axios from 'axios'
import store from '@/store'
import {
  Toast
} from 'mint-ui'
import {
  getToken
} from '@/utils/auth'

/*
  如果需要屏蔽请求弹窗， 请在请求时传一个 msgFlag: true 键值对
*/
var isLog = false // eslint-disable-line no-unused-vars
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API + '/apiv1/gyl',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})
// request interceptor
service.interceptors.request.use(config => {
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  // Do something before request is sent  msg
  if (config.url.includes('/account')) { // 登录特定接口不需要/apiv1前缀
    config.baseURL = config.baseURL.replace('/apiv1', '')
  }
  if (JSON.parse(localStorage.getItem('accessToken')) || store.getters.token) {
    if (getToken()) {
      config.headers['accessToken'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    } else {
      config.headers['accessToken'] = JSON.parse(localStorage.getItem('accessToken'))
    }
  }
  // 所有get请求都携带公司和任务id
  if (config.method === 'get' || config.method === 'post') {
    config.params = {
      taskId: JSON.parse(localStorage.getItem('taskId')),
      companyId: JSON.parse(localStorage.getItem('companyId')),
      teamId: 1,
      ...config.params
    }
  }
  isLog = (config.params && config.params.msgFlag) || (config.data && config.data.msgFlag)

  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    // 判断服务器当前token是否有效
    const res = response.data
    if (!isLog) {
      if (res.code === 401) {
        store.dispatch('LogOut').then(() => {
          location.reload() // In order to re-instantiate the vue-router object to avoid bugs
        })
      } else if (res.code === 400 && res.msg) {
        Toast({
          message: res.msg,
          position: 'bottom'
        })
      } else if (res.code === 500 && res.msg) {
        Toast({
          message: res.msg,
          position: 'bottom'
        })
      } else if (res.msg) {
        Toast({
          message: res.msg,
          position: 'bottom'
        })
      }
    }
    return response
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  })

export default service
