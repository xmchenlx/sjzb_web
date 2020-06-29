<template>
  <div id="personalInformationEdit" class="changePwdMain">
    <el-card class="box-card" style="margin:0 auto">
      <div slot="header" class="clearfix">
        <span>个人信息编辑</span>
        <router-link :to="{name : 'Masterwelcome'}">
          <el-button style="float: right; padding: 3px 0" type="text">关闭</el-button>
        </router-link>
      </div>
      <div class="text item">
        <el-form
          :model="personalInformation"
          ref="personalInformation"
          :rules="rules"
          method="post"
          action
          label-position="right"
          label-width="150px"
          v-loading="formloading"
        >
        <el-form-item prop="userHeadImg" label="头像：">
            <el-upload
              class="avatar-uploader"
              action="user/addUserHeadPortrait"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <el-avatar
                :size="200"
                :src="personalInformation.userHeadImageUrl"
                style="margin:0 auto;"
              />
            </el-upload>
          </el-form-item>

          <el-form-item prop="username" label="用户名：">
            <el-input
              class="textInput"
              v-model="personalInformation.username"
              placeholder="输入昵称，非真实姓名"
              prop="username"
            />
          </el-form-item>

          <el-form-item prop="usertel" label="电话号码：">
            <el-input
              class="textInput"
              v-model="personalInformation.usertel"
              placeholder="电话号码"
              prop="usertel"
            />
          </el-form-item>

          <el-form-item prop="usersex" label="性别：">
            <el-radio v-model="personalInformation.usersex" label="1">男</el-radio>
            <el-radio v-model="personalInformation.usersex" label="0">女</el-radio>
          </el-form-item>

          <!-- <el-form-item prop="userstate" label="用户状态：">
            <el-input
              class="textInput"
              v-model="personalInformation.userstate"
              placeholder="显示用户的状态"
              prop="userstate"
              disabled="true"
            />
          </el-form-item> -->

          <el-button
            type="primary"
            style="width: 50%;margin-left:20%"
            v-on:click="postPersonalInfomationChanged()"
          >
            <i :class="loicon"></i>保存
          </el-button>
          <br />
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getUserInfomation, updateUserInfo } from '../../api/users'
import { getCorrectImgName } from '@/publicFunc/houseImageProcess'
import Bus from '../bus'
export default {
  name: 'personalInformationEdit',
  data () {
    getUserInfomation({ uid: new Number(sessionStorage.getItem('userid')) })
      .then(res => {
        // console.log(sessionStorage.getItem("userid"))
        (this.personalInformation.usersex = res.data.data.uSex),
        (this.personalInformation.usertel = res.data.data.uTelephone),
        (this.personalInformation.username = res.data.data.uName)
        this.personalInformation.userHeadImageUrl = this.userHeadPathConvert(
          res.data.data.uHeadImage)
      })
      .then(res => {
        this.formloading = false
      })
    return {
      personalInformation: {
        usersex: '',
        usertel: '',
        userintro: '',
        username: '',
        userstate: '',
        userHeadImageUrl: null
      },
      loicon: '',
      formloading: true,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        usersex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        confirmPwd: [
          { required: true, message: '请确认新密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    postPersonalInfomationChanged () {
      this.loicon = 'el-icon-loading'
      let formInfo = {
        uId: sessionStorage.getItem('userid'),
        uTelephone: this.personalInformation.usertel,
        uName: this.personalInformation.username,
        uSex: this.personalInformation.usersex
      }
      updateUserInfo(formInfo).then(res => {
        if (res.data == true) {
          this.$message.success('信息修改成功！')
          sessionStorage.setItem('username', this.personalInformation.username)
          Bus.$emit('changeUsername', this.personalInformation.username)
          // 传递更新好的新昵称到顶栏
        } else {
          this.$message('修改失败')
        }
      }).catch(error => {
        this.$message('信息提交出现了异常：' + error)
      })
      this.$nextTick(this.loicon = '')
    },
    userstateConvert (statenum) {},
    postUserHeadImage () {
      let form = {
        uId: sessionStorage.getItem('userid'),
        uHeadImage: this.personalInformation.userHeadImageUrl
      }
      updateUserInfo(form).then(res => {
        if (res == true) {
          this.$message.success('头像更换成功！')
          // console.log("这里要删除原来的头像")
        }
        this.$forceUpdate()
      })
    },
    userHeadPathConvert (imgurl) {
      let imgstring = ''
      if (imgurl != null && imgurl != '') {
        imgstring = require('@/img/userHead/' + imgurl)
      } else {
        imgstring = require('@/img/loadingDefaultImage.jpg')
      }
      // console.log("拼接后=" + imgstring);
      return imgstring
    },
    handleAvatarSuccess (res, file) {
      // 上传头像成功后
      this.$message.success('头像更换成功！')
      Bus.$emit('changeUserHeadImage', res.data)
      this.personalInformation.userHeadImageUrl = res.data
      this.postUserHeadImage()
    }
  }
}
</script>

<style scoped>
.textInput {
  width: 90%;
}
.changePwdMain {
  margin: 0 auto;
  width: 77.5%;
}
</style>
