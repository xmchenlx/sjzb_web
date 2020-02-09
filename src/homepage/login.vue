<template>
  <div id="loginpage">
    <h2 style="text-align:center;padding:0;margin:0;">欢迎使用个人记账系统，请登录</h2>
    <p
      style="text-align:center"
    >Welcome to use Bill Record And Process System.Please Enter your info and using it.</p>
    <el-card class="logincard">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="70px">
      <el-form-item label="账号" prop="inputName">
        <el-input v-model="loginForm.inputName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="inputPwd">
        <el-input v-model="loginForm.inputPwd" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginSystem()">
          <i :class="enterBtnIcon"/>
          进入系统
          </el-button>
      </el-form-item>
    </el-form>
    </el-card>
    <foot/>
  </div>
</template>

<script>
/* eslint-disable */ 
import foot from '@/homepage/copyrightFoot'
export default {
  data () {
    return {
      enterBtnIcon:'el-icon-key',
      loginForm: {
        inputName: ''
      },
      rules: {
        inputName: [
          { required: true, message: '请输入账户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        inputPwd:[
            { required: true, message: '输入密码！', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    foot
  },
  methods:{
    loginSystem(){
      this.$router.push({name : 'personalCenter'})
    }
  }
};
</script>

<style lang="less" scoped>
#loginpage {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgb(212, 244, 255), rgb(5, 117, 245));
}

.logincard{
  width:30%;
  padding-right:2%;
  padding-left:-2%;
  margin-left: 35%;
}
</style>
