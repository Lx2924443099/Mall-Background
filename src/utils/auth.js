import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
/**
 * 获取token
 */
export function getToken() {
  return Cookies.get(TokenKey)
}
/** 
 * 
 * @param {*} token 
 * 设置token
 */
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
/**
 * 删除token
 */
export function removeToken() {
  return Cookies.remove(TokenKey)
}
