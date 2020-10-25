<template>
<div class="image-connation">
  <el-card>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>素材管理</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="image-connation-radio">
      <el-radio-group v-model="collect" size="mini" @change="OncollectChange">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button type="primary" plain size="mini" @click="UploadTheMaterial">上传素材</el-button>
    </div>

    <div class="image-connation-image">
      <el-row :gutter="10">
        <el-col :md='6' :xs='6' :lg='4' v-for="item in urlList" :key="item.id" style="position: relative;">
          <div class="grid-content bg-purple" style="overflow: hidden;">
            <el-image style="height: 100px; margin-top:5px" :src="item.url" fit="cover"></el-image>
            <div style='height:40px;' class="image_shoucang">
              <i :class="{'el-icon-star-on':item.is_collected,'el-icon-star-off':!item.is_collected}" @click="OnCollect(item)"></i>
              <i :class="item.is_collected?'el-icon-delete-solid':'el-icon-delete'" @click="DeleteImage(item)"></i>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>

  <!-- 对话框 -->
  <el-dialog title="上传素材" :visible.sync="dialogVisible" width="27%" center append-to-body>
    <el-upload :show-file-list='false' class="upload-demo" :on-success='OnuploadSuccess' name="image" :headers="uploadHeaders" drag action="http://ttapi.research.itcast.cn/mp/v1_0/user/images" multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </el-dialog>

  <div class="image-connation_pagination">
    <el-pagination :current-page.sync="page" :disabled='loading' :page-size="pageSize" @current-change='OncurrentChangePage' layout="prev, pager, next" :total="totalData" background />
  </div>
</div>
</template>

<script>
import {
  getImages,
  CollectImages,
  DeleteImages
} from '@/api/image.js'
export default {
  name: 'imageIndex',
  data() {
    const token = JSON.parse(window.sessionStorage.getItem('token'));
    return {
      collect: false,
      urlList: [],
      dialogVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${token}`
      },
      page: 1,
      loading: false,
      pageSize: 10,
      totalData: null
    }
  },
  created() {
    this.getList(1)
  },

  methods: {
    OncollectChange(ell) {
      // console.log(ell);
      this.getList(1)
    },

    getList(page) {
      this.page = page //重置高亮的页码
      getImages({
        collect: this.flag,
        page,
        per_page: this.pageSize
      }).then(res => {
        console.log(res);
        this.urlList = res.data.data.results
        this.totalData = res.data.data.total_count
      })
    },

    UploadTheMaterial() {
      this.dialogVisible = true
    },

    OnuploadSuccess() {
      this.dialogVisible = false
      this.getList(false);
      this.$message({
        type: "success",
        message: "上传成功"
      })
    },
    OncurrentChangePage(page) {
      this.getList(page)
    },

    OnCollect(item) {
      console.log('哈哈哈哈哈哈', item);
      //已收藏,取消收藏
      //没有收藏 添加收藏
      CollectImages(item.id, !item.is_collected)
        .then(res => {
          console.log(res);
          item.is_collected = !item.is_collected
        })
    },

    DeleteImage(item) {
      DeleteImages(item.id).then(res => {
        this.getList(this.page)

        this.$message({
          type: "success",
          message: "删除成功"
        })
      })

    }
  }
}
</script>

<style lang="less" scoped>
.image-connation {
  .image-connation-radio {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .image-connation-image {
    margin-top: 20px;

    .image_shoucang {
      background-color: #666;
      opacity: .3;
      position: absolute;
      bottom: 4px;
      left: 5px;
      right: 5px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0 40px;

      i {
        font-size: 24px;
        cursor: pointer;
        color: white;
      }
    }
  }

  .image-connation_pagination {
    margin-top: 20px;
    float: right;
  }
}
</style>
