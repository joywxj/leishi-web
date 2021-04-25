import request from '@/utils/request'

/**
 * 字典
 */
/**
 * 查询
 * @param param
 */
export function queryDictList (param) {
  return request({
    url: '/kernel/dictionary/list',
    method: 'post',
    params: param
  })
}
