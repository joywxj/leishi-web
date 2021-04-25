import request from '@/utils/request'

/**
 * 查询
 * @param param
 */
export function list (param) {
  return request({
    url: '/kernel/advance/query',
    method: 'post',
    params: param
  })
}

/**
 * 添加
 */
export function add (params) {
  return request({
    url: '/kernel/advance/add',
    method: 'post',
    params: params
  })
}

/**
 * 修改
 * @param params
 */
export function modify (params) {
  return request({
    url: '/kernel/advance/modify',
    method: 'post',
    params: params
  })
}

/**
 * 获取单条信息
 * @param params
 */
export function getOne (params) {
  return request({
    url: '/kernel/advance/get',
    method: 'post',
    params: {id: params}
  })
}

/**
 * 审核
 * @param params
 */
export function audit (params) {
  return request({
    url: '/kernel/advance/audit',
    method: 'post',
    params: params
  })
}
