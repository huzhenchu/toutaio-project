<template>
<div>
  <el-card>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>发布文章</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="publishForm" ref="ruleForm" label-width="100px">
      <el-form-item label="标题" class="margin_top">
        <el-input v-model="publishForm.title"></el-input>
      </el-form-item>

      <el-form-item label="内容">
        <el-input type="textarea" v-model="publishForm.content"></el-input>
      </el-form-item>

      <el-form-item label="封面">
        <el-radio-group v-model="publishForm.cover">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="频道">
        <el-select v-model="publishForm.channel_id" placeholder="请选择频道">
          <el-option v-for='item in channelsList' :key='item.id' :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="OnPublish(false)">发表</el-button>
        <el-button @click="OnPublish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</div>
</template>

<script>
import {
  getUserChannels,
  addArticle
} from '@/api/article.js'
import {
  log
} from 'util';
export default {
  name: 'publish',
  data() {
    return {
      publishForm: {
        title: '',
        content: '',
        cover: {
          type: 0, //封面的类型
          images: [] // 封面图片的地址  必须是个数组
        },
        channel_id: ""
      },
      channelsList: [],
    }
  },
  created() {
    this.getChannels()
  },
  methods: {
    OnPublish(dreft = false) {
      addArticle(this.publishForm, dreft).then(res => {
        console.log(res);
        this.$message({
          type: "success",
          message: "发布成功"
        })
      })
    },
    resetForm() {},

    //获取频道数据
    getChannels() {
      getUserChannels().then(res => {
        console.log(res.data.data.channels);
        this.channelsList = res.data.data.channels;
      })
    }
  }
}
</script>

<style lang="less" scoped>
.margin_top {
  margin-top: 12px;
}
</style>
