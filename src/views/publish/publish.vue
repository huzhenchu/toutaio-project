<template>
<div>
  <el-card>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>发布文章</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="publishForm" ref="ruleForm" label-width="100px" :rules="rules">
      <el-form-item label="标题" class="margin_top" prop="title">
        <el-input v-model="publishForm.title"></el-input>
      </el-form-item>

      <el-form-item label="内容" prop="content">
        <el-tiptap height='300' placeholder="请输入内容" v-model="publishForm.content" :extensions="extensions" />
      </el-form-item>

      <el-form-item label="封面">
        <el-radio-group v-model="publishForm.cover">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="频道" prop="channel_id">
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
  addArticle,
  editArticle,
  getArticle
} from "@/api/article.js";
import {
  // 需要的 extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  Image,
  Print,
  Fullscreen,
  SelectAll,
  FontType,
  FontSize,
  TableHeader,
  TableCell,
  TableRow,
  FormatClear,
  TextColor,
  TextHighlight,
  Preview
} from 'element-tiptap';

// import {
//   uploadImage
// } from '@/api/image.js'
export default {
  name: "publish",
  data() {
    return {
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({
          level: 5
        }),
        new Bold({
          bubble: true
        }), // 在气泡菜单中渲染菜单按钮
        new Underline({
          bubble: true,
          menubar: false
        }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Image({
          //默认把图片生成BASE64 字符串和内容储存到一起了,
          //如果需要自定义图片上传

          /*   uploadRequest(file) {
              const fd = new FormData()
              fd.append('image', 'file')

              return uploadImage(fd).then(res => {
                console.log(res);
                return res.data.data.url
              })
              // return ''
            } */
        }),
        new Print(),
        new Fullscreen(),
        new SelectAll(),
        new FontType(),
        new FontSize(),
        new TableHeader(),
        new TableCell(),
        new TableRow(),
        new FormatClear(),
        new TextColor(),
        new TextHighlight(),
        new Preview(),
      ],
      publishForm: {
        title: "",
        content: "",
        cover: {
          type: 0, //封面的类型
          images: [] // 封面图片的地址  必须是个数组
        },
        channel_id: ""
      },
      channelsList: [],

      rules: {
        title: [{
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 30,
            message: '长度在 5 到 30 个字符',
            trigger: 'blur'
          }
        ],
        content: [{
            validator(rule, value, callback) {
              if (value === '<p></p>') {
                return calssback(new Error('请输入内容'))
              } else {
                callback()
              }
            }
          },
          {
            required: true,
            message: '请输入内容',
            trigger: 'blur'
          }
        ],
        channel_id: [{
          required: true,
          message: '请选择文章频道',
          trigger: 'blur'
        }]
      }
    };
  },
  created() {
    this.getChannels();
    if (this.$route.query.id) {
      this.loadArtcles();
    }
  },
  methods: {
    OnPublish(dreft = false) {
      // ruleForm
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.$route.query.id) {
            editArticle(this.$route.query.id, this.publishForm, dreft).then(res => {
              // console.log(res);
              this.$message({
                type: "success",
                message: `${dreft ? '存入草稿':'发布'}成功`
              });
            })
          } else {
            addArticle(this.publishForm, dreft).then(res => {
              // console.log(res);
              this.$message({
                type: "success",
                message: `${dreft ? '存入草稿':'发布'}成功`
              });
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    resetForm() {},
    //获取频道数据
    getChannels() {
      getUserChannels().then(res => {
        // console.log(res.data.data.channels);
        this.channelsList = res.data.data.channels;
      });
    },

    // 加载 内容文章的请求
    loadArtcles() {
      getArticle(this.$route.query.id).then(res => {
        // console.log(res);
        this.publishForm = res.data.data;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.margin_top {
  margin-top: 12px;
}
</style>
