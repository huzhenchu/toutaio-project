import axios from 'axios'  // 1. 

// 创建一个axios 实例对象  2.
const http = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
  
})



export default http  //3.