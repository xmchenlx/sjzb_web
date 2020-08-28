<!-----------------This is lx's Project Named BRPS!^_^-----------------------------------
  lx的小天地下属项目 版权所有(c) 2018 - 2020
  文件：login_Mobile.vue
  作者：chenlx | 邮箱：me@chenlx.top
  时间：2020年07月20日 17:16:06
  描述：  Moble手机web的登录页面，主要有注册功能、登录功能、查看开发日志和其余页面跳转功能。;
---------------------------------------------------------------------------------->
<template>
  <div id="loginpage_mobile">
    <el-container style="height:100%;width:100%">
      <el-header style="height:20%">
         <h2 style="margin:0 auto;text-align:center;">
          <img src="@/img/lx_logo_399.png" style="width:6rem;padding:0;margin:0" />
          <p style="padding:0;padding-top:-1%">欢迎访问BRPS记账系统·Mobile</p>
        </h2>
        <br />
      </el-header>
      <el-main style="height:55%;width:100%;margin:5% 0;margin:0 auto">
         <transition name="el-zoom-in-center">
          
          <el-card
            class="logincard"
            style="margin:0 auto;margin-bottom:1%;height:3rem;padding:0;"
            v-if="pagemsgContent !== null && pagemsgContent !== ''"
          >
            <div class="notice-card-wrapper">
              <!-- 系统公告 -->
              <div style="">
                <el-row>
                  <el-col :span="2">
                    <i class="el-icon-message-solid" style="font-size:20px;" />
                  </el-col>
                  <el-col :span="22" style="overflow:hidden">
                    <div class="inner-container">
                      <span class="msgStyle">公告：{{pagemsgContent}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-card>
        </transition>
          <div id="registerdiv" v-if="wantToRegister===true">
          <registerNav style="width:100%"/>
        </div>
        <el-card class="logincard" v-else>
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
        <foot style="width:90%;height:50px;font-size:10px" />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
/* eslint-disable */
import Bus from "@/bus";
import foot from "@/homepage/copyrightFoot";
import { validateUser } from "@/api/Users";
import { getOnewc } from "@/api/webConfig";
import moment from "moment";
import registerNav from "./nav_register";
import Utils from "@/api/util";
export default {
  data() {
    return {
      pagemsgContent: null,
      enterBtnIcon: "el-icon-key",
      loginForm: {
        uName: "",
        uPwd: ""
      },
      wantToRegister:false,
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
    Bus,
    registerNav
  },mounted: function() {
    let _this = this;
    Bus.$on("backToLogin", function() {
      _this.wantToRegister = false;
    });
  },
  methods: {
    checkValueNull(s) {
      if (s !== null && s !== "") return "ok";
      return "null";
    },
    checkWebSetting() {
      let _this = this;
      getOnewc("HOME_PAGE_MSG").then(res => {
        if (
          res.data.data.configStatus != 0 &&
          this.checkValueNull(res.data.data.configMsg) === "ok"
        ) {
          _this.pagemsgContent = res.data.data.configMsg;
          console.log(_this.pagemsgContent);
        }
      });
    },
    forgetPwd() {
      this.$message.error("该功能还未上线...");
    },
    toRegister() {
      this.wantToRegister=true
      // this.$message.error("该功能目前只支持PC端使用");
    },
    getTimeToMadeGreetins() {
      //分析时间返回问候语
      let now = moment()
        .locale("zh-cn")
        .format("HH");
      now = parseInt(now);
      if (now >= 0 && now < 5) {
        return "夜深了，";
      } else if (now >= 5 && now < 11) {
        return "早上好，";
      } else if (now >= 11 && now < 13) {
        return "中午好";
      } else if (now >= 13 && now < 18) {
        return "下午好，精神小伙";
      } else if (now >= 18 && now < 24) {
        return "晚上好呀，";
      }
    } ,checkLocalStroage(){
      let s_uname = localStorage.getItem("userName")
      let _this = this 
      // console.log(s_uname)
      // console.log(localStorage.getItem("userP"))
      if(s_uname){
        _this.loginForm.uName = s_uname
        _this.loginForm.uPwd = localStorage.getItem("userP")
        _this.loginSystem()
        _this.$notify({
                title: "检测到登录记录",
                message:
                  "您此前已经登陆过BRPS啦，已尝试为您直接登录。",
                type: "success"
              });
      }
    },
    loginSystem() {
      let _this = this;
      
      this.$nextTick(() => {
        this.isLogining = true;
      });
      if(_this.loginForm.uName === '' || _this.loginForm.uPwd === ''){
        this.$alert('输入不能为空')
        this.$nextTick(() => {
        this.isLogining = false;
      });
        return false;
      }
      
      let lForm = {
        uName: Utils.encrypt(_this.loginForm.uName),
        uPwd: Utils.encrypt(_this.loginForm.uPwd)
      };
      this.enterBtnIcon = "el-icon-loading";
      try {
        validateUser(lForm)
          .then(res => {
            if (res.data.success === true) {
              // _this.$cookies.headers
              // $cookies.set('JSESSIONID',res.response.headers.cookie.JSESSIONID)
              localStorage.setItem("userId", res.data.data);
              localStorage.setItem("userName", _this.loginForm.uName);
              localStorage.setItem("userP",_this.loginForm.uPwd)

              sessionStorage.setItem("userId", res.data.data);
              sessionStorage.setItem("userName", _this.loginForm.uName);
              _this.$notify({
                title: _this.getTimeToMadeGreetins() + _this.loginForm.uName,
                message:
                  "欢迎使用个人记账系统！\r\n现在时间：" +
                  moment()
                    .locale("zh-cn")
                    .format("YYYY-MM-DD HH:mm"),
                type: "success"
              });
              _this.$router.push({ name: "personalCenter_m" });
            } else {
              this.$message.error("账号信息不正确！");
              this.$nextTick(() => {
                _this.enterBtnIcon = "";
              });
            }
          })
          .catch(error => {
            this.$notify({
              title: "访问被拒绝",
              message: "服务器没有回应。无法使用:"+error
            });
            this.$nextTick(() => {
              _this.enterBtnIcon = "";
            });
          });
      } catch (e) {
        _this.$notify.error({
          title: "响应异常",
          message: "请求发送可能超时。可能是因为服务器正在维护，请您稍后再试。"
        });
        console.log(e);
        _this.enterBtnIcon = "el-icon-key";
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
  mounted: function() {
    let _this = this;
    Bus.$on("backToLogin", function() {
      _this.wantToRegister = false;
    });
  },
  created:function(){
    this.checkWebSetting();
    this.checkLocalStroage()
  }
};
</script>

<style lang="less" scoped>
#loginpage_mobile {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgb(212, 244, 255), rgb(5, 117, 245));
  background-size: cover;
}

.logincard {
  width: 95%;
  padding: 10px 0;
  margin: 0 auto;
  // margin-top: 5%;

  #linktext {
  }


}

.msgStyle {
  font-size: 1.1rem;
  font-weight: bold;
  color: gray;
  white-space: nowrap; /*强制span不换行*/
  display: inline-block; /*将span当做块级元素对待*/
  // text-shadow: 2px 2px 3px lightblue;
}

.notice-card-wrapper {
  overflow-y: hidden;
  overflow-x: hidden;
  .inner-container {
    overflow-y: hidden;
    overflow-x: hidden;
    padding-left: 5%;
    margin-left: 100%; // 把文字弄出可见区域
    width: 800%;
    animation: myMove 22s linear infinite; // 重点，定义动画
    animation-fill-mode: forwards;
  }
  /*文字无缝滚动*/
  @keyframes myMove {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-200%);
    }
  }
}
</style>
