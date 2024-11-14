import request from '@/utils/request'

export const getUserDetailByIdAPI = id => {
  return request({
    url: `/user/${id}`,
    method: 'GET'
  })
}