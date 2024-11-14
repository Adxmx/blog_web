import request from '@/utils/request'

export const getConfListAPI = params => {
  return request({
    url: '/admin/conf',
    method: 'GET',
    params
  })
}

export const getConfDetailByIdAPI = id => {
  return request({
    url: `/admin/conf/${id}`,
    method: 'GET'
  })
}

export const getConfDetailByCodeAPI = code => {
  return request({
    url: `/admin/conf/${code}`,
    method: 'GET'
  })
}

export const addConfAPI = data => {
  return request({
    url: '/admin/conf',
    method: 'POST',
    data
  })
}

export const updateConfByIdAPI = (id, data) => {
  return request({
    url: `admin/conf/${id}`,
    method: 'PUT',
    data
  })
}

export const deleteConfByIdAPI = id => {
  return request({
    url: `admin/conf/${id}`,
    method: 'DELETE',
  })
}
