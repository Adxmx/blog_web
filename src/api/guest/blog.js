import request from '@/utils/request'

export const getBlogDetailByIdAPI = id => {
  return request({
    url: `/blog/${id}`,
    method: 'GET'
  })
}

export const getBlogItemAPI = params => {
  return request({
    url: '/blog/item',
    method: 'GET',
    params
  })
}

export const getBlogListAPI = params => {
  return request({
    url: '/blog/list',
    method: 'GET',
    params
  })
}

export const giveThumbAPI = id => {
  return request({
    url: `/blog/thumb/${id}`,
    method: 'GET'
  })
}