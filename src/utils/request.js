/**
 * 封装axios网络请求
 * 
 * **/

import axios from 'axios'  // 1. 

// 创建一个axios 实例对象  2.
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
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