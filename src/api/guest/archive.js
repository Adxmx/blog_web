import request from '@/utils/request'

export const getTypeItemAPI = params => {
  return request({
    url: '/type/item',
    method: 'GET',
    params
  })
}

export const getTypeDetailByIdAPI = id => {
  return request({
    url: `/type/${id}`,
    method: 'GET'
  })
}
