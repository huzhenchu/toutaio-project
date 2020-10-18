/**
 * 封装axios网络请求
 * 
 * **/

import axios from 'axios'  // 1. 
import JSONbig from 'json-bigint'

// 创建一个axios 实例对象  2.
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn',

  // 定制后端返回的原始数据的处理
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理

    // 参数data是后端返回的原始数据(未经处理的JSON格式的字符串)
    // console.log(data); return JSONBIG.parse(data);
    
    // axios 默认在内部是用JSON.parse() 来转换处理这个原始数据
    try {
      // 后端返回的数可能不是一个 JSON格式的字符串
      // 如果不是的话,那么JSONBIG.parse() 调用就会报错
      // 使用try-catch来捕获异常, 处理异常的发生
      return JSONbig.parse(data);
    } catch (err) {
      return data 
    }
  }]
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // console.log(config)
  const token = JSON.parse(window.sessionStorage.getItem('token'));

  if(token) { 
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
}); 


export default request  //3.