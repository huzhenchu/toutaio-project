<template>
<el-menu router default-active="/" background-color="#002033" text-color="#fff" active-text-color="#ffd04b">
  <el-menu-item index="/">
    <i class="iconfont iconindex"></i>
    <span slot="title" style='margin-left:5px;'>首页</span>
  </el-menu-item>
  <el-menu-item index="/article">
    <i class="iconfont iconlog"></i>
    <span slot="title" style='margin-left:5px;'>内容管理</span>
  </el-menu-item>
  <el-menu-item index="/image">
    <i class="iconfont iconimage"></i>
    <span slot="title" style='margin-left:5px;'>素材管理</span>
  </el-menu-item>
  <el-menu-item index="/publish">
    <i class="iconfont iconpublish"></i>
    <span slot="title" style='margin-left:5px;'>发布文章</span>
  </el-menu-item>
  <el-menu-item index="/comment">
    <i class="iconfont iconcomment"></i>
    <span slot="title" style='margin-left:5px;'>评论管理</span>
  </el-menu-item>
  <el-menu-item index="/fans">
    <i class="iconfont iconfans"></i>
    <span slot="title" style='margin-left:5px;'>粉丝管理</span>
  </el-menu-item>
  <el-menu-item index="/settings">
    <i class="iconfont iconpersonal"></i>
    <span slot="title" style='margin-left:5px;'>个人设置</span>
  </el-menu-item>
</el-menu>
</template>

<script>
export default {
  name: "AppAside",
  methods: {}
};
</script>

<style lang="less" scoped>
.el-menu {
  height: 100%;
}
</style>
