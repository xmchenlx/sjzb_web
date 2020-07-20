<template>
  <div id="loginpage">
    <el-container style="height:100%">
      <el-header style="height:20%">
        <h2 style="margin:0 auto;text-align:center;">
          <img src="@/img/lx_logo_399.png" style="width:6rem;padding:0;margin:0" />
          <p style="padding:0;padding-top:-10%">欢迎访问BRPS记账系统</p>
        </h2>
      </el-header>
      <el-main style="height:70%">
        <transition v-if="wantToRegister === false" name="el-zoom-in-center">
          <el-card
            class="logincard"
            style="margin:0 auto;margin-bottom:-4%"
            v-if="pagemsgContent !== null && pagemsgContent !== ''"
          >
            <div class="notice-card-wrapper">
              <!-- 系统公告 -->
              <div class="message">
                <el-row>
                  <el-col :span="1">
                    <i class="el-icon-message-solid" style="font-size:20px" />
                  </el-col>
                  <el-col :span="23" style="overflow:hidden">
                    <div class="inner-container">
                      <span class="msgStyle">公告：{{pagemsgContent}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-card>
        </transition>
        <div id="registerdiv" v-if="wantToRegister==true">
          <registerNav />
        </div>
        <el-card class="logincard" v-else>
          <el-form
            :model="loginForm"
            :rules="rules"
            ref="loginForm"
            label-width="20%"
            :disabled="isLogining"
          >
            <br />
            <el-form-item label="手机号：" prop="uName">
              <el-input v-model="loginForm.uName" placeholder="输入账号昵称或手机号"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="uPwd">
              <el-input
                v-model="loginForm.uPwd"
                show-password
                @keyup.enter.native="loginSystem()"
                placeholder="输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :disabled="isBtnEnabled" @click="loginSystem()">
                <i :class="enterBtnIcon" />
                进入系统
              </el-button>
              <el-button type="primary">
                <el-link
                  :underline="false"
                  style="color:white;"
                  href="https://blog.chenlx.top/"
                >前往博客</el-link>
              </el-button>
              <el-button
                type="text"
                style="text-align:center;margin:0 auto"
                circle
                icon="el-icon-info"
                @click="updateDrawer=true"
              >更新日志</el-button>

              <!-- <el-button type="primary" @click="gotoArticle()">前往博客</el-button> -->
            </el-form-item>
          </el-form>
          <el-button type="text" style="float:left" @click="registerUser()">注册账号</el-button>
          <el-button type="text" style="float:right" @click="fogertPwd()">忘记密码惹</el-button>
        </el-card>
      </el-main>
      <el-footer style="height:10%;margin:0;">
        <foot />
      </el-footer>
    </el-container>
    <el-drawer :visible.sync="updateDrawer" direction="ltr">
      <updateInfo />
    </el-drawer>
  </div>
</template>

<script>
/* eslint-disable */
import Utils from "@/api/util";
import Bus from "@/bus";
import foot from "@/homepage/copyrightFoot";
import updateInfo from "./updateInfo";
import { validateUser, userReg } from "@/api/Users";
import { getOnewc } from "@/api/webConfig";
import moment from "moment";
import registerNav from "./nav_register";
export default {
  data() {
    return {
      updateDrawer: false,
      wantToRegister: false,
      enterBtnIcon: "el-icon-key",
      pagemsgContent: null,
      errorCount: 0,
      isBtnEnabled: false,
      isLogining: false,
      loginForm: {
        uName: "",
        uPwd: ""
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
    Bus,
    updateInfo,
    registerNav
  },
  methods: {
    checkValueNull(s) {
      if (s !== null && s !== "") return "ok";
      return "null";
    },
    checkLocalStroage(){
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
    gotoArticle() {
      this.$router.push({ name: "articleList" });
    },
    getTimeToMadeGreetins() {
      //分析时间返回问候语
      let now = moment()
        .locale("zh-cn")
        .format("HH");
      now = parseInt(now);
      if (now >= 0 && now < 5) {
        return "夜深了，别一直熬夜啦";
      } else if (now >= 5 && now < 11) {
        return "早上好，今天也是满满的正能量呢";
      } else if (now >= 11 && now < 13) {
        return "中午好，午觉不要睡>30min哦";
      } else if (now >= 13 && now < 18) {
        return "下午好，精神小伙";
      } else if (now >= 18 && now < 24) {
        return "晚上好呀，";
      }
    },
    stopContinue() {
      this.$message.error("该功能还在佛系编写ing...");
    },
    registerUser() {
      this.wantToRegister = true;
      // this.stopContinue()
    },

    fogertPwd() {
      this.stopContinue();
    },
    loginSystem() {
      let _this = this;

      this.$nextTick(() => {
        this.isLogining = true;
      });
      if (_this.loginForm.uName === "" || _this.loginForm.uPwd === "") {
        this.$alert("输入不能为空");
        this.$nextTick(() => {
          this.isLogining = false;
        });
        return false;
      }
      this.$forceUpdate();

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
              _this.$router.push({ name: "personalCenter" });
            } else {
              _this.errorCount++;
              if (_this.errorCount == 3) {
                this.$alert(
                  "你太过分了嘤嘤嘤。错误次数过多，本次会话已被禁止。",
                  "物理自闭已开始"
                );
                this.$nextTick(() => {
                  this.isBtnEnabled = true;
                });
              }
              this.$message.error("账号信息不正确！");
              _this.$nextTick(() => {
                this.enterBtnIcon = "el-icon-key";
              });
            }
            this.isLogining = false;
          })
          .catch(error => {
            this.$nextTick(() => {
              this.enterBtnIcon = "el-icon-key";
            });
            this.$notify.error({
              title: "访问被拒绝",
              message:
                "服务器无法访问，可能是服务器正在维护，请稍后再试。" + error
            });
            this.enterBtnIcon = "el-icon-key";
            this.isLogining = false;
          });
      } catch (e) {
        _this.$notify.error({
          title: "响应异常",
          message: "请求发送可能超时。可能是因为服务器正在维护，请您稍后再试。"
        });
        console.log(e);
        _this.enterBtnIcon = "el-icon-key";
        this.isLogining = false;
      }
      // this.$nextTick(() => {
      //   this.isLogining = false;
      // });

      this.isLogining = false;
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
    Bus.$on("unLogin", function() {
      console.log("BusOnUnlogin");
      _this.$notify({
        title: "非法访问",
        message: "没有检测到您的登录信息，此次访问已被拦截。请重新登录。"
      });
    });
  },
  created: function() {
    this.checkWebSetting();
    this.checkLocalStroage()
  },
  mounted:function(){
    let _this = this
    Bus.$on("backToLogin",function(){
      _this.wantToRegister = false
    })
  },
  watch: {
    isLogining(val) {
      if (val === true) {
      }
    }
  }
};
</script>

<style lang="less" scoped>
#msgnote {
  margin: 0 auto;
  text-align: center;
  padding: 0;
  margin: 0;
}

#loginpage {
  width: 100%;
  height: 100%;
  min-width: 1280px;
  background-image: linear-gradient(rgb(212, 244, 255), rgb(5, 117, 245));
  background-size: 100% 100%;
  overflow: hidden;
}

.msgStyle {
  font-size: 1.1rem;
  font-weight: bold;
  color: gray;
  white-space: nowrap; /*强制span不换行*/
  display: inline-block; /*将span当做块级元素对待*/
  // text-shadow: 2px 2px 3px lightblue;
}
.logincard {
  width: 35%;
  margin: 0 auto;
  margin-top: 5%;
}

.notice-card-wrapper {
  overflow-y: hidden;
  overflow-x: hidden;
  .inner-container {
    overflow-y: hidden;
    overflow-x: hidden;
    padding-left: 5%;
    margin-left: 100%; // 把文字弄出可见区域
    width: 300%;
    animation: myMove 13s linear infinite; // 重点，定义动画
    animation-fill-mode: forwards;
  }
  /*文字无缝滚动*/
  @keyframes myMove {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-180%);
    }
  }
}
</style>
