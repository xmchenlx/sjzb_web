<template>
  <div id="loginNav">
    <el-card>
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
            <el-link :underline="false" style="color:white;" href="https://blog.chenlx.top/">前往博客</el-link>
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
  </div>
</template>

<script>
import { getTimeToMadeGreetins } from '@/dict/systemSetting'
import Utils from '@/api/util'
import Bus from '@/bus'
import { validateUser } from '@/api/Users'
export default {
  data () {
    return {
      updateDrawer: false,
      wantToRegister: false,
      enterBtnIcon: 'el-icon-key',
      pagemsgContent: null,
      errorCount: 0,
      isBtnEnabled: false,
      isLogining: false,
      loginForm: {
        uName: '',
        uPwd: ''
      },

      rules: {
        uName: [
          { required: true, message: '请输入账户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        uPwd: [
          { required: true, message: '输入密码！', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    checkValueNull (s) {
      if (s !== null && s !== '') return 'ok'
      return 'null'
    },
    loginSystem () {
      let _this = this

      this.$nextTick(() => {
        this.isLogining = true
      })
      if (_this.loginForm.uName === '' || _this.loginForm.uPwd === '') {
        this.$alert('输入不能为空')
        this.$nextTick(() => {
          this.isLogining = false
        })
        return false
      }
      this.$forceUpdate()

      let lForm = {
        uName: Utils.encrypt(_this.loginForm.uName),
        uPwd: Utils.encrypt(_this.loginForm.uPwd)
      }
      this.enterBtnIcon = 'el-icon-loading'
      try {
        validateUser(lForm)
          .then(res => {
            if (res.data.success === true) {
              // _this.$cookies.headers
              // $cookies.set('JSESSIONID',res.response.headers.cookie.JSESSIONID)
              localStorage.setItem('userId', res.data.data)
              localStorage.setItem('userName', _this.loginForm.uName)
              sessionStorage.setItem('userId', res.data.data)
              sessionStorage.setItem('userName', _this.loginForm.uName)
              _this.$notify({
                title: getTimeToMadeGreetins() + _this.loginForm.uName,
                message: '欢迎使用个人记账系统！',
                type: 'success'
              })
              //   登录成功返回信息
              _this.$router.push({ name: 'personalCenter' })
            } else {
              if (++_this.errorCount > 2) {
                this.$alert(
                  '你太过分了嘤嘤嘤。错误次数过多，本次会话已被禁止。',
                  '物理自闭已开始'
                )
                this.$nextTick(() => {
                  this.isBtnEnabled = true
                })
              }
              this.$message.error('账号信息不正确！')
              _this.$nextTick(() => {
                this.enterBtnIcon = 'el-icon-key'
              })
            }
            this.isLogining = false
          })
          .catch(error => {
            this.$nextTick(() => {
              this.enterBtnIcon = 'el-icon-key'
            })
            this.$notify.error({
              title: '访问被拒绝',
              message:
                '服务器无法访问，可能是服务器正在维护，请稍后再试。' + error
            })
            this.enterBtnIcon = 'el-icon-key'
            this.isLogining = false
          })
      } catch (e) {
        _this.$notify.error({
          title: '响应异常',
          message: '请求发送可能超时。可能是因为服务器正在维护，请您稍后再试。'
        })
        console.log(e)
        _this.enterBtnIcon = 'el-icon-key'
        this.isLogining = false
      }
      // this.$nextTick(() => {
      //   this.isLogining = false;
      // });

      this.isLogining = false
    }
  }
}
</script>

<style>
</style>
<style lang="less" scoped>
.logincard {
  width: 100%;
  margin: 0 auto;
  margin-top: 2%;
}
#loginNav {
  width: 35em;
  margin: 0 auto;
}
</style>
