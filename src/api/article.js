/**
 * 
 * 用户相关的模块
 * 
 * **/
import request from '@/utils/request.js'

// 获取table表格的数据
export const getUsertableInfo = params => {
  return request({
    method:'GET',
    url:'/mp/v1_0/articles',
    /**
     * post 参数的传递用data
     *  
     * query 参数使用params 设置
     * 
     * Headers  参数的使用  Headers
     * **/
    params
  })
}