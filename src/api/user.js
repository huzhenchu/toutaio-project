/**
 * 
 * 用户相关的模块
 * 
 * **/
import request from '@/utils/request.js'

// 登录
export const login = data => {
  return request({
    method: "POST",
    url: "/mp/v1_0/authorizations",
    data
  })
}


//获取用户信息
export const getUserProfile = () => {
  return request({
    method: "GET",
    url: "/mp/v1_0/user/profile"
  })
} 