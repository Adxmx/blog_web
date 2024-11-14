import request from '@/utils/request'

export const getConfDetailByCodeAPI = code => {
  return request({
    url: `/conf/${code}`,
    method: 'GET'
  })
}
