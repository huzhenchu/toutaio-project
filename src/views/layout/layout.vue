<template>
<el-container class="layout-container">
  <el-aside class="aside" width='40'>
    <app-aside class="app-aside" :isCollapse="isCollapse"></app-aside>
  </el-aside>
  <el-container>
    <el-header class="header">
      <div class="header-left">
        <!--<i :class="{'el-icon-s-fold':isCollapse, 'el-icon-s-unfold': !isCollapse}" @click="BtnClickTrueAndFalse"></i>-->
        <i :class="isCollapse?'el-icon-s-fold':'el-icon-s-unfold'" @click="BtnClickTrueAndFalse"></i>
        <span>直播后台系统</span>
      </div>

      <el-dropdown>
        <div class="header_right">
          <img :src="userInfo.photo">
          <span> {{ userInfo.name }} <i class="el-icon-arrow-down el-icon--right"></i></span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <i class="iconfont iconpersonal"></i>
            个人设置
          </el-dropdown-item>
          <el-dropdown-item @click.native="BtnOut">
            <i class="iconfont iconout"></i>
            退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </el-header>
    <el-main class="main">
      <!--路由出口-->
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import AppAside from "./components/aside";
import {
  getUserProfile
} from "@/api/user";
import {
  log
} from "util";

export default {
  name: "LayouIndex",
  data() {
    return {
      userInfo: {},
      isCollapse: false //侧边菜单栏的展开状态
    };
  },
  components: {
    AppAside
  },
  created() {
    this.loadUserProfile();
  },
  methods: {
    loadUserProfile() {
      getUserProfile().then(res => {
        // console.log(res)
        this.userInfo = res.data.data;
      });
    },
    BtnOut() {
      this.$confirm("确认退出？")
        .then(_ => {
          window.sessionStorage.removeItem("token");
          this.$router.push("/login");
          done();
        })
        .catch(_ => {});
    },
    BtnClickTrueAndFalse() {
      this.isCollapse = !this.isCollapse;
    }
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;

    .header-left {
      i {
        width: 24px;
      }

      span {
        margin-left: 10px;
        font-size: 16px;
        color: #000;
      }
    }
  }

  .main {
    background-color: #ccc;
    color: #000;
  }
}

.header_right {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }

  span {
    color: wheat;
    margin-left: 10px;
  }
}
</style>
