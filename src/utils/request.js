/**
 * 封装axios网络请求
 * 
 * **/

import axios from 'axios'  // 1. 

// 创建一个axios 实例对象  2.
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

export default request  //3.