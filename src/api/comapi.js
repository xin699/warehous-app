import request from '../utils/request'
// 任务列表获取
export function task (data) {
  return request({
    url: '/get/task',
    method: 'get',
    params: data
  })
}
// 选择任务获取企业列表
export function companyQuery (data) {
  return request({
    url: '/get/company',
    method: 'get',
    params: data
  })
}
// 根据扫描信息获取货物信息-入库用
export function storMaterielInfoForIn (data) {
  return request({
    url: '/child/m/get/storMaterielInfoForIn',
    method: 'get',
    params: data
  })
}
// 获取已提交入库货物列表
export function storMaterielInOutD (data) {
  return request({
    url: '/child/m/get/storMaterielInOutD',
    method: 'get',
    params: data
  })
}
// 作业单进度获取,false未完成 true完成
export function storPlansProgress (data) {
  return request({
    url: '/child/m/get/storPlansProgress',
    method: 'get',
    params: data
  })
}
// 根据扫描信息获取货物信息-出库用
export function storMaterielInfoForOut (data) {
  return request({
    url: '/child/m/get/storMaterielInfoForOut',
    method: 'get',
    params: data
  })
}
// 获取已提交出库货物列表
export function storPickingD (data) {
  return request({
    url: '/child/m/get/storPickingD',
    method: 'get',
    params: data
  })
}
// 获取已补货货物列表
export function storMakeUpD (data) {
  return request({
    url: '/child/m/get/storMakeUpD',
    method: 'get',
    params: data
  })
}
// 根据扫描信息获取货物信息-补货
export function storMaterielInfoForMakeUp (data) {
  return request({
    url: '/child/m/get/storMaterielInfoForMakeUp',
    method: 'get',
    params: data
  })
}
// 根据扫描信息获取货物信息-移库用
export function storMaterielInfoForMove (data) {
  return request({
    url: '/child/m/get/storMaterielInfoForMove',
    method: 'get',
    params: data
  })
}
// 获取已补货货物列表-移库用
export function storMaterielMove (data) {
  return request({
    url: '/child/m/get/storMaterielMove',
    method: 'get',
    params: data
  })
}
// 作业计划列表获取
export function storPlansList (data) {
  return request({
    url: '/child/m/get/storPlansList',
    method: 'get',
    params: data
  })
}
// 根据扫描信息获取货物信息-盘点用
export function storMaterielInfoForCheck (data) {
  return request({
    url: '/child/m/get/storMaterielInfoForCheck',
    method: 'get',
    params: data
  })
}
// 对指定作业单开始作业
export function nowPlainStatus (data) {
  return request({
    url: '/child/m/update/nowPlainStatus',
    method: 'post',
    params: data
  })
}
// 对入库作业单进行相关操作
export function StorMaterielInPlain (data) {
  return request({
    url: '/child/m/update/storMaterielInPlain',
    method: 'post',
    params: data
  })
}
// 对出库作业单进行提交
export function storMaterielOutPlain (data) {
  return request({
    url: '/child/m/update/storMaterielOutPlain',
    method: 'post',
    params: data
  })
}
// 对补货作业单进行提交
export function storMakeUpPlain (data) {
  return request({
    url: '/child/m/update/storMakeUpPlain',
    method: 'post',
    params: data
  })
}
// 对补货作业单进行提交
export function storMaterielMovePlain (data) {
  return request({
    url: '/child/m/update/storMaterielMovePlain',
    method: 'post',
    params: data
  })
}
// 对盘点作业单进行提交
export function storCheckPlain (data) {
  return request({
    url: '/child/m/update/storCheckPlain',
    method: 'post',
    params: data
  })
}
