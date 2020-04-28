<template>
  <div id="changePwd" class="changePwdMain">
    <el-card class="box-card" style="margin:0 auto">
      <div slot="header" class="clearfix">
        <span>房东修改密码</span>
        <router-link :to="{name : 'Masterwelcome'}">
          <el-button style="float: right; padding: 3px 0" type="text">关闭</el-button>
        </router-link>
      </div>
      <div class="text item">
        <el-form
          :model="changePwdForm"
          ref="changePwdForm"
          :rules="rules"
          method="post"
          action
          label-position="right"
          label-width="150px"
        >
          <el-form-item prop="orgPwd" label="输入原密码：">
            <el-input
              class="textInput"
              v-model="changePwdForm.orgPwd"
              type="password"
              placeholder="请输入原始密码"
              prop="orgPwd"
            />
          </el-form-item>

          <el-form-item prop="newPwd" label="输入新密码：">
            <el-input
              class="textInput"
              v-model="changePwdForm.newPwd"
              type="password"
              placeholder="请输入新设置的密码"
              prop="newPwd"
            />
          </el-form-item>

          <el-form-item prop="confirmPwd" label="确认密码：">
            <el-input
              class="textInput"
              v-model="changePwdForm.confirmPwd"
              type="password"
              placeholder="请再次输入新密码"
              prop="confirmPwd"
            />
          </el-form-item>

          <el-button
            type="primary"
            style="width: 50%;margin-left:20%"
            v-on:click="postAuthenticationInformation()"
          >
            <i :class="loicon"></i>提交
          </el-button>
          <br />
          <span style="text-align: center;color:gray;font-size:10px;">不记得密码了?验证码找回</span>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { compareUserPwd, updateUserPwd } from "../../api/users";
export default {
  name: "changePwd",
  data() {
    //两次密码校验是否输入一致
    var validateNewPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.changePwdForm.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      changePwdForm: {
        orgPwd: "",
        newPwd: "",
        confirmPwd: ""
      },
      loicon: "",
      rules: {
        orgPwd: [
          { required: true, message: "输入原始密码谢谢", trigger: "blur" }
        ],
        newPwd: [{ required: true, message: "输入新密码", trigger: "blur" }],
        confirmPwd: [
          { required: true, message: "请确认新密码", trigger: "blur" },
          { validator: validateNewPassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    postAuthenticationInformation() {
      //输出到console方便调试
      console.log({
        uId: sessionStorage.getItem("userid"),
        uPwd: this.changePwdForm.orgPwd
      });
      //对密码进行比较
      compareUserPwd({
        uId: sessionStorage.getItem("userid"),
        uPwd: this.changePwdForm.orgPwd
      })
        .then(isPwdRight => {
          console.log("isPwdRight=" + isPwdRight.data);
          if (isPwdRight.data == false) {
            console.log("返回结果：" + isPwdRight.data);
            console.log("原始密码错误！修改失败");
            this.$message.error("原始密码错误！修改失败");
            return false;
          }
          //修改密码
          updateUserPwd({
            uId: sessionStorage.getItem("userid"),
            uPwd: this.changePwdForm.newPwd
          })
            .then(isChange => {
              if (isChange.data == true) {
                this.$message.success("密码修改成功！需要您重新登录");
                this.$refs['changePwdForm'].resetFields();
                this.$router.push({ name:'welcome' });

                setTimeout(() => {
                  //20191011明天去公司看看logout怎么搞
                  this.$router.push({ name:'login' });
                }, 2000)
              }
            })
            .catch(error => {
              this.$message("密码修改失败，可能是网络异常");
              console.log("登录异常："+error)
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
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