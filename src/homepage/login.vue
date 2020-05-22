<template>
  <div id="loginpage">
    <el-container style="height:100%">
      <el-header style="height:20%">
        <h2 style="text-align:center;">欢迎使用个人记账系统，请登录
        </h2>

        <p
          style="text-align:center"
        >Welcome to use Bill Record And Process System. Please Enter your info and using it.</p>
        <br />
      </el-header>
      <el-main style="height:70%">
        <el-card class="logincard" v-if="wantToRegister==true">
          <h3 style="text-align:center">注册账号</h3>
          <el-form :model="regform">
            <el-form-item label="昵称：">
              <el-input style="width:80%;" v-model="regform.uName"></el-input>
            </el-form-item>
            <el-form-item label="手机：">
              <el-input style="width:80%;" v-model="regform.uTel"></el-input>
              <p style="font-size:10px;padding:5px;margin:0;color:red;">提示：日后手机号码将作为登录、找回密码、短信通知的凭证。目前可以选填</p>
            </el-form-item>
            <el-form-item label="密码：">
              <el-input style="width:80%;" v-model="regform.uPwd" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="finishReg">完成注册</el-button>
              <el-button type="primary" @click="wantToRegister=false">返回登录</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card class="logincard" v-else>
          <!-- <span>
            网站尚处于研发阶段，部分未完成的功能暂时不提供使用。
            <br />测试账号：yezhan,密码：6666。测试账号为公共账号，请不要输入隐私数据
          </span> -->

          <el-form
            :model="loginForm"
            :rules="rules"
            ref="loginForm"
            label-width="20%"
            :disabled="isLogining"
          >
          <h2 style="margin:0 auto;padding:5px;text-align:center;">这里是LOGO
           <el-button type="text" circle icon="el-icon-info" @click="updateDrawer=true">更新说明</el-button>

          </h2>
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
              <el-button type="primary" @click="gotoArticle()">前往博客</el-button>
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
    <el-drawer
  :visible.sync="updateDrawer"
  direction="ltr"
  >
<updateInfo/>
</el-drawer>
  </div>
</template>

<script>
/* eslint-disable */
import Utils from '@/api/util'
import Bus from "@/bus";
import foot from "@/homepage/copyrightFoot";
import updateInfo from './updateInfo'
import { validateUser, userReg, vuephp } from "@/api/Users";
import moment from "moment";
export default {
  data() {
    return {
      updateDrawer:false,
      wantToRegister: false,
      enterBtnIcon: "el-icon-key",
      errorCount: 0,
      isBtnEnabled: false,
      isLogining: false,
      loginForm: {
        uName: "",
        uPwd: ""
      },
      regform: {
        uName: "",
        uPwd: "",
        uTel:''
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
    updateInfo
  },
  methods: {
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
    finishReg() {
      let _this = this;
      this.regform.uRegisterDate = moment()
        .locale("zh-cn")
        .format("YYYY-MM-DD");
      userReg(this.regform).then(res => {
        if (res.data.data > 0) {
          _this.wantToRegister = false;
          _this.$alert("您已注册完成。请登录。", "注册成功", {
            confirmButtonText: "确定"
          });
        }
      }).catch(e=>{
          this.$message('注册异常')});
    },
    fogertPwd() {
      this.stopContinue();
    },
    loginSystem() {
      this.$nextTick(() => {
        this.isLogining = true;
      });
      let _this = this;
      this.$forceUpdate();
      let lForm = {
        
      'uName' : Utils.encrypt(_this.loginForm.uName),
      'uPwd': Utils.encrypt(_this.loginForm.uPwd)
      }
      this.enterBtnIcon = "el-icon-loading";
      try {
        validateUser(lForm)
          .then(res => {
            if (res.data.success === true) {
              // _this.$cookies.headers
              // $cookies.set('JSESSIONID',res.response.headers.cookie.JSESSIONID)
              localStorage.setItem("userId", res.data.data);
              localStorage.setItem("userName", _this.loginForm.uName);
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
              message: "服务器无法访问，可能是服务器正在维护，请稍后再试。"+error
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
  watch: {
    isLogining(val) {
      if (val === true) {
      }
    }
  }
};
</script>

<style lang="less" scoped>
#loginpage {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgb(212, 244, 255), rgb(5, 117, 245));
  background-size: 100% 100%;
  overflow: hidden;
}

.logincard {
  width: 35%;
  margin: 0 auto;
  margin-top: 5%;
}
</style>
