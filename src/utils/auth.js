// js-cookie插件操作cookie
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const Name = 'User-Name'
const User = 'User'
const UserId = 'User-Id'
const ThisUserId = 'ThisUser-Id'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey) || Cookies.remove(Name) || Cookies.remove(User) || Cookies.remove(UserId) || Cookies.remove(ThisUserId)
}
export function getName () {
  return Cookies.get(Name)
}
export function setName (username) {
  return Cookies.set(Name, username)
}
export function setUser (data) {
  return Cookies.set(User, data)
}
export function getUser () {
  return Cookies.get(User)
}
export function setUserId (data) {
  return Cookies.set(UserId, data)
}
export function getUserId () {
  return Cookies.get(UserId)
}
export function setThisUserId (data) {
  return Cookies.set(ThisUserId, data)
}
export function getThisUserId () {
  return Cookies.get(ThisUserId)
}
