// 将用户信息存储到localStorage中
export const setUser = (user) => {
  localStorage.setItem('id', user.id)
  localStorage.setItem('nickname', user.nickname)
  localStorage.setItem('username', user.username)
  localStorage.setItem('avatar', user.avatar)
}

// 从localStorage中返回用户信息
export const getUser = () => {
  const user = {
    id: localStorage.getItem('id'),
    token: localStorage.getItem('token'),
    nickname: localStorage.getItem('nickname'),
    username: localStorage.getItem('username'),
    avatar: localStorage.getItem('avatar')
  }
  return user
}

// 清楚localStorage用户信息内容
export const clearUser = () => {
  window.localStorage.removeItem('id')
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('nickname')
  window.localStorage.removeItem('username')
  window.localStorage.removeItem('avatar')
}