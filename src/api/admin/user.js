import request from '@/utils/request'

export const loginAPI = (data) => {
  return request({
    url: '/admin/login',
    method: 'POST',
    data
  })
}

export const getUserAPI = () => {
  return request({
    url: '/admin/user',
    method: 'GET'
  })
}

export const getCaptchaAPI = () =>{
  return request({
    url: '/admin/captcha',
    method: 'GET'
  })
}