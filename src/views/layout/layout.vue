<template>
<el-container class="layout-container">
  <el-aside class="aside" width='200px'>
    <app-aside class="app-aside"></app-aside>
  </el-aside>
  <el-container>
    <el-header class="header">Header</el-header>
    <el-main class="main">
      <!--路由出口-->
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import AppAside from './components/aside'
export default {
  name: "LayouIndex",
  components: {
    AppAside
  }
};
</script>

<style lang="less" scoped>
.layout-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  .aside {
    background-color: #ddd;
  }

  .header {
    background-color: #888;
  }

  .main {
    background-color: #ccc;
    color: #fff;
  }
}
</style>
