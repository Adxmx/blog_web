import request from '@/utils/request'

export const getTypeListAPI = params => {
  return request({
    url: '/admin/type',
    method: 'GET',
    params
  })
}

export const updateTypeByIdAPI = (id, data) => {
  return request({
    url: `admin/type/${id}`,
    method: 'PUT',
    data
  })
}

export const deleteTypeByIdAPI = id => {
  return request({
    url: `admin/type/${id}`,
    method: 'DELETE',
  })
}

export const addTypeAPI = data => {
  return request({
    url: `admin/type`,
    method: 'POST',
    data
  })
}
