<template>
  <div id="loginpage">
    <el-container>
      <el-header>
        <h2 style="text-align:center;">欢迎使用个人记账系统，请登录</h2>
        <p
          style="text-align:center"
        >Welcome to use Bill Record And Process System.Please Enter your info and using it.
        </p>
        <br/>
      </el-header>
      <el-main>
        <el-card class="logincard">
          <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="20%">
            <el-form-item label="账号" prop="uName">
              <el-input v-model="loginForm.uName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="uPwd">
              <el-input v-model="loginForm.uPwd" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="loginSystem()">
                <i :class="enterBtnIcon" />
                进入系统
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-main>
      <el-footer>
        <foot />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
/* eslint-disable */
import Bus from '@/bus'
import foot from "@/homepage/copyrightFoot";
import {validateUser } from '@/api/Users'
export default {
  data() {
    return {
      enterBtnIcon: "el-icon-key",
      loginForm: {
        uName: "chenlx",
        uPwd:'123456'
      },
      rules: {
        uName: [
          { required: true, message: "请输入账户名", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        uPwd: [
          { required: true, message: "输入密码！", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    foot,
    Bus
  },
  methods: {
    loginSystem() {
      let _this = this
      let loginForm = _this.loginForm
      this.enterBtnIcon = 'el-icon-loading'
      validateUser(loginForm).then(res=>{
        if(res.data.success === true){
          // _this.$cookies.headers
          // $cookies.set('JSESSIONID',res.response.headers.cookie.JSESSIONID)
          localStorage.setItem('userId',res.data.data);
          localStorage.setItem('userName',_this.loginForm.uName);
          sessionStorage.setItem('userId',res.data.data);
          sessionStorage.setItem('userName',_this.loginForm.uName);
          _this.$router.push({ name: "personalCenter" });
          _this.$notify({
            title: '欢迎您，'+loginForm.uName,
            $message: '欢迎使用个人记账系统！'
          })
        }else{
          this.$message.error('账号信息不正确！')
        }
      })
    }
    // beforeRouteUpdate(to,from,next){
    //   let _this = this
    //   if(from.name === 'personalCenter'){
    //     _this.$notify({
    //       title: '非法访问',
    //       $message: '没有检测到您的登录信息，此次访问已被拦截。请重新登录。'
    //     })
    //   }
    //   next()
    // }
  },
  mounted:function(){
    let _this = this;
    Bus.$on("unLogin",function(){
      console.log('BusOnUnlogin')
       _this.$notify({
      title: '非法访问',
      message: '没有检测到您的登录信息，此次访问已被拦截。请重新登录。'
    })
    })
  }
};
</script>

<style lang="less" scoped>
#loginpage {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgb(212, 244, 255), rgb(5, 117, 245));
}

.logincard {
  width: 80%;
  margin: 0 auto;
  margin-top: 5%;

}
</style>
