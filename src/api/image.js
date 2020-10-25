/**
 * 
 * 素材相关的模块
 * 
 * 
 * **/ 

import request from '@/utils/request.js'

/**
 * 
 * 上传图片素材
 * 
 * **/

export const uploadImage = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/images',
    /**
     * 一般文件上传的接口都要求把请求头中的Content-Type设置为 multipart/form-data,
     * 在使用axios上传文件的话不需要手动的设置,只需要给data一个FormData对象就可以了
     * **/ 
    data
  })
}

/***
 * 
 * 获取素材列表
 * 
 * 
 * **/
export const getImages = (queryInfo) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params:queryInfo
  })
}



/***
 * 
 * 收藏素材列表
 * 
 * 
 * **/
export const CollectImages = (imageId,collect) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${imageId}`,
    data: {
      collect
    }
  })
}

/***
 * 
 * 删除素材列表
 * 
 * 
 * **/
export const DeleteImages = (imageId) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${imageId}`
  })
}