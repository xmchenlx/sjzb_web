<template>
  <div id="loginpage_mobile">
    <el-container style="height:100%;width:100%">
      <el-header style="height:20%">
        <h2 style="text-align:center;">
          欢迎使用个人记账<br/>
          <span style="font-size:15px">这里是Mobile端·请登录</span></h2>
        <br/>
      </el-header>
      <el-main style="height:55%;width:100%;margin:5% 0;margin:0 auto">
        <el-card class="logincard">
               <span>网站尚处于研发阶段，部分未完成的功能暂时不提供使用。<br>测试账号：yezhan,密码：6666。测试账号为公共账号，请不要输入隐私数据</span>

          <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="25%">
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
          <el-button type="text" @click="toRegister" id="linktext" style="float:left">注册账号</el-button>
          <el-button type="text" @click="forgetPwd" id="linktext" style="float:right">忘记密码惹</el-button>
        </el-card>
      </el-main>
      <el-footer style="width:100%;height:20%">
        <foot style="width:90%;height:50px;font-size:10px"/>
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
import Utils from '@/api/util'
export default {
  data() {
    return {
      enterBtnIcon: "el-icon-key",
      loginForm: {
        uName: "",
        uPwd:''
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
    forgetPwd(){
      this.$message.error('该功能还未上线...')
    },
    toRegister(){
      this.$message.error('该功能目前只支持PC端使用')
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
      let lForm = {
        
      'uName' : Utils.encrypt(_this.loginForm.uName),
      'uPwd': Utils.encrypt(_this.loginForm.uPwd)
      }
      this.enterBtnIcon = 'el-icon-loading'
      try{
        validateUser(lForm).then(res=>{
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
            _this.$router.push({ name: "personalCenter_m" });

          }else{
            this.$message.error('账号信息不正确！')
            this.$nextTick(()=>{_this.enterBtnIcon = ''})
          }
        }).catch(error=>{
          this.$notify({
            title:'访问被拒绝',
            message:'服务器没有回应。无法使用'
          })
          this.$nextTick(()=>{_this.enterBtnIcon = ''})

        
        });
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
#loginpage_mobile {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgb(212, 244, 255), rgb(5, 117, 245));
  background-size:cover;
}

.logincard {
  width: 95%;
  padding:10px 0;
  margin: 0 auto;
  // margin-top: 5%;

  #linktext{

  }

}
</style>
