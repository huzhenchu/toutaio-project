<template>
<div class="login-container">
  <el-form ref="form" :model="user" class="login-from">
    <div class="login-title">振楚头条</div>
    <el-form-item>
      <el-input prefix-icon="el-icon-mobile" v-model="user.mobile" placeholder="请输入手机号"></el-input>
    </el-form-item>

    <el-form-item>
      <el-input prefix-icon="el-icon-success" v-model="user.code" placeholder="请输入验证码"></el-input>
    </el-form-item>

    <el-form-item>
      <el-checkbox v-model="checked" style="font-weight:bold;">我已阅读并同意用户协议和隐私条款</el-checkbox>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :loading="loginLoading" @click="btnLogin" class="loginBtn">登录</el-button>
    </el-form-item>
  </el-form>

</div>
</template>

<script>
// import request from '../../api/request'
import {
  log
} from "util";
export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        mobile: "13911111111",
        code: "246810"
      },
      checked: false, //是否同意协议的状态
      loginLoading: false
    };
  },
  methods: {
    btnLogin() {
      const user = this.user;
      this.loginLoading = true
      this.$http({
          method: "POST",
          url: "/mp/v1_0/authorizations",
          data: user
        })
        .then(res => {
          console.log(res);

          this.$message({
            message: "登录成功",
            type: "success"
          });
          this.loginLoading = false
        })
        .catch(err => {
          this.$message.error('登录失败,手机号或验证码失败');
          this.loginLoading = false
        });
      // this.$router.push('/home')
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(106, 132, 143);

  .login-from {
    background-color: #fff;
    padding: 70px;
    min-width: 300px;
    box-sizing: border-box;

    .login-title {
      text-align: center;
      color: #409eff;
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 20px;
    }

    .loginBtn {
      width: 100%;
    }
  }
}
</style>
