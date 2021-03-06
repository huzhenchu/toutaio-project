/**
 * 
 * 用户相关的模块
 * 
 * **/
import request from '@/utils/request.js'


/**
 * 
 * 获取文章频道
 * 
 * **/
export const getUserChannels = () => {
  return request({
    method:'GET',
    url:'/mp/v1_0/channels',
  })
}

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


/**
 * 删除接口的封装
 * 
 * 
 * **/
export const deleteArticle = id => {
  return request({
    method:'DELETE',
    url:`/mp/v1_0/articles/${id}`
  })
}


/**
 * 添加文章
 * 
 * 
 * ***/
export const addArticle = (data,draft=false) => {
  return request({
    method:'POST',
    url:`/mp/v1_0/articles`,
    //POST请求要传递的参数
    data:data,
    params: {
      draft
    }
    
  })
}
/**
 * 
 * 修改文章
 * 
 * **/ 
export const editArticle = (articlesId, data, draft = false) => {
  return request({
    method:'PUT',
    url:`/mp/v1_0/articles/${articlesId}`,
    //POST请求要传递的参数
    data:data,
    params: {
      draft
    }
  })
}

/**
 * 
 * 获取指定文章
 * 
 * **/ 
export const getArticle = (articlesId) => {
  return request({
    method:'GET',
    url:`/mp/v1_0/articles/${articlesId}`
  })
}