import request from '@/utils/request'

export const getBlogListAPI = params => {
  return request({
    url: '/admin/blog',
    method: 'GET',
    params
  })
}


export const getBlogDetailByIdAPI = id => {
  return request({
    url: `/admin/blog/${id}`,
    method: 'GET'
  })
}

export const addBlogAPI = data => {
  return request({
    url: `admin/blog`,
    method: 'POST',
    data
  })
}

export const updateBlogByIdAPI = (id, data) => {
  return request({
    url: `admin/blog/${id}`,
    method: 'PUT',
    data
  })
}

export const deleteBlogByIdAPI = id => {
  return request({
    url: `admin/blog/${id}`,
    method: 'DELETE',
  })
}