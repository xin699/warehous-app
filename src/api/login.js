import request from '@/utils/request'
// 登录
export function loginByUsername (data) {
  return request({
    url: '/account/login',
    method: 'post',
    params: data
  })
}
// 登出
export function logout () {
  return request({
    url: '/account/logout',
    method: 'get'
  })
}
// 检出拉取用户信息
export function getUserInfo (data) {
  return request({
    url: '/account/login/success',
    method: 'post',
    params: data
  })
}
