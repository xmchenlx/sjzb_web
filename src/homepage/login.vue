<template>
  <div id="loginpage">
    <el-container style="height:100%">
      <el-header style="height:20%">
        <h2 style="text-align:center;">欢迎使用个人记账系统，请登录</h2>
        <p
          style="text-align:center"
        >Welcome to use Bill Record And Process System.Please Enter your info and using it.
        </p>
        <br/>
      </el-header>
      <el-main style="height:70%">
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
              <el-button type="primary" @click="gotoArticle()">
                浏览公告文章
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-main>
      <el-footer style="height:10%">
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
import moment from 'moment'
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
    gotoArticle(){
      this.$router.push({name:'articleList'})
    },
    getTimeToMadeGreetins(){
      //分析时间返回问候语
      let now = moment().locale('zh-cn').format('HH')
      now = parseInt(now)
      if(now >=0 && now<5){
        return '夜深了，'
      }else if(now >=5 && now<11){
        return '早上好，'
      }else if(now >=11 && now<13){
        return '中午好'
      }else if(now>=13 && now<18){
        return '下午好，精神小伙'
      }else if(now >=18 && now<24){
        return '晚上好呀，'
      }
    },
    loginSystem() {
      let _this = this
      let loginForm = _this.loginForm
      this.enterBtnIcon = 'el-icon-loading'
      try{
        validateUser(loginForm).then(res=>{
          if(res.data.success === true){
            // _this.$cookies.headers
            // $cookies.set('JSESSIONID',res.response.headers.cookie.JSESSIONID)
            localStorage.setItem('userId',res.data.data);
            localStorage.setItem('userName',_this.loginForm.uName);
            sessionStorage.setItem('userId',res.data.data);
            sessionStorage.setItem('userName',_this.loginForm.uName);
            _this.$notify({
              title: _this.getTimeToMadeGreetins()+loginForm.uName,
              message: '欢迎使用个人记账系统！\r\n现在时间：'+moment().locale('zh-cn').format('YYYY-MM-DD HH:mm'),
              type:'success'
            })
            _this.$router.push({ name: "personalCenter" });

          }else{
            this.$message.error('账号信息不正确！')
          }
        })
      }catch(e){
        _this.$notify.error({
          title:'响应异常',
          message:'请求发送可能超时。可能是因为服务器正在维护，请您稍后再试。'
        });
          console.log(e)
      _this.enterBtnIcon = 'el-icon-key'


      }
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
