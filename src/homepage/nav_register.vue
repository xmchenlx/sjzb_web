<!-----------------This is lx's Project Named BRPS!^_^-----------------------------------
  lx的小天地下属项目 版权所有(c) 2018 - 2020
  文  件：nav_register.vue
  中文名：模态框注册入口
  作  者：chenlx | 邮箱：me@chenlx.top
  时  间：2020年07月20日 17:27:01
  描  述： 模态框注册入口;
---------------------------------------------------------------------------------->
<template>
  <div id="registerNav">
    <el-card class="logincard">
      <h3 style="text-align:center">
        注册小天地通行证
        <el-popover width="200" trigger="hover" placement="top-start" title="通行证解释">
          <i slot="reference" class="el-icon-info" />
          通行证是小天地里的唯一互通账号。您可以使用通行证访问博客，也可以进行记账。未来的项目都将基于此账号通行，不再开设其他的账号注册功能。
        </el-popover>
      </h3>
      <el-form :rules="rules" :model="regform" ref="regform" label-width="7em">
        <el-form-item label="昵称：" prop="uName">
          <el-input style="width:28em;" placeholder="在小天地内对您的称呼" v-model="regform.uName"></el-input>
        </el-form-item>
        <el-form-item label="手机：" prop="uTel">
          <el-input style="width:18em;" placeholder="请输入规范的手机号码" v-model="regform.uTel"></el-input>
          <el-button style="width:9.7em" type="primary" @click="sendYZM" :disabled="isSendYzm">
            <i :class="yzmIcon" />
            {{yzmButtonText}}
          </el-button>
        </el-form-item>
        <el-form-item label="验证码：" prop="uYzm">
          <el-input style="width:28em;" v-model="regform.uYzm"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="uPwd">
          <el-input
            style="width:28em;"
            placeholder="设置一定长度的密码"
            v-model="regform.uPwd"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="finishReg">完成注册</el-button>
          <el-button type="primary" @click="backToLogin">返回登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  userReg,
  getValidCode,
  checkCode,
  checkTelRegistered
} from '@/api/Users'
import Bus from '@/bus'
import moment from 'moment'
export default {
  data () {
    return {
      regform: {
        uName: '',
        uPwd: '',
        uTel: '',
        uYzm: ''
      },
      yzmButtonText: '发送验证码',
      yzmSeconds: 60,
      isSendYzm: false,
      sendTimes: 0,
      telReg: false,
      yzmIcon: '',
      rules: {
        uName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        uPwd: [
          { required: true, message: '请输入更合适的密码！', trigger: 'blur' },
          { min: 7, max: 30, message: '长度在 7 到 30 个字符', trigger: 'blur' }
        ],
        uTel: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: '请输入合法的中国大陆手机号码'
          }
        ],
        uYzm: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    backToLogin () {
      Bus.$emit('backToLogin')
    },
    checkForm (formName) {
      let res = '-1'
      this.$refs[formName].validate(valid => {
        if (valid) {
          res = '1'
        } else {
          res = '0'
        }
      })
      return res
    },
    checkTelIsRegistered (tel) {
      checkTelRegistered(tel).then(res => {
        return res.data.success
      })
    },
    sendYZM () {
      let _this = this
      let tel = this.regform.uTel
      // 电话号码的输入校验
      var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
      if (tel === null || tel === '') {
        _this.$alert('请输入手机号码')
        return false
      }
      if (!reg.test(tel)) {
        _this.$alert('当前仅支持中国大陆区域手机号码')
        return false
      }
      _this.yzmButtonText = '请求中'
      _this.yzmIcon = 'el-icon-loading'
      // 检测手机号码是否已被注册
      checkTelRegistered(tel).then(res => {
        // eslint-disable-next-line no-unneeded-ternary
        _this.telReg = res.data.success === true ? true : false
        // _this.telReg = true   //为了测试验证码，强行绕过手机号码注册检查
        if (_this.telReg === true) {
          getValidCode(_this.regform.uTel).then(res => {
          // 发送验证码请求的效果在按钮展示
            _this.yzmIcon = ''
            _this.yzmButtonText = '已发送（' + _this.yzmSeconds + '）'
            _this.isSendYzm = true
            let clock = window.setInterval(() => {
              _this.yzmSeconds--
              _this.yzmButtonText = '已发送（' + _this.yzmSeconds + '）'
              if (this.yzmSeconds < 1) {
                window.clearInterval(clock)
                _this.yzmSeconds = 60 * (_this.sendTimes + 2)
                _this.isSendYzm = false
                _this.yzmButtonText = '再次发送'
                if (++_this.sendTimes > 2) {
                  _this.yzmButtonText = '本次禁止发送'
                  _this.isSendYzm = true
                }
              }
            }, 1000)
          })
        } else {
          setTimeout(() => {
            _this.yzmButtonText = '发送验证码'
            _this.yzmIcon = ''
            _this.$message.warning('该手机号已被注册!')
          }, 1000)
        }
      })
    },
    finishReg () {
      let _this = this
      let checkStatus = _this.checkForm('regform')
      if (checkStatus === '0') {
        return false
      }
      //   判断是否都输入完全。尽管rules做出了判断，这里还要在加一层
      if (
        _this.regform.uName === '' ||
        _this.regform.uPwd === '' ||
        _this.regform.uTel === '' ||
        _this.regform.uYzm === ''
      ) {
        this.$alert('输入不能为空')
        return false
      }
      // 判断验证码
      let userYZM = _this.regform.uYzm
      checkCode(userYZM).then(res => {
        if (res.data.success === false) {
          this.$message({message: '验证码不正确', type: 'error', showClose: true})
          return false
        } else {
          this.regform.uRegisterDate = moment()
            .locale('zh-cn')
            .format('YYYY-MM-DD')
          userReg(this.regform)
            .then(res => {
              if (res.data.data > 0) {
                _this.backToLogin()
                _this.$alert('您已注册完成。请登录。', '注册成功', {
                  confirmButtonText: '确定'
                })
              }
            })
            .catch(e => {
              this.$message('注册异常')
            })
        }
      })
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
#registerNav {
  width: 35em;
  margin: 0 auto;
}
</style>
