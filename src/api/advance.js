import request from '@/utils/request'

/**
 * 查询
 * @param param
 */
export function list (param) {
    return request ({
      url:'/kernel/advance/query',
      method:'post',
      params: param
    })
}
