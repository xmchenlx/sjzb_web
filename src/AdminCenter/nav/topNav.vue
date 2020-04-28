<template>
  <div id="topmain" class="topmain">
    <div class="logo" @click="toHome()">
      <img src="../../img/websitelogo.png" width="230px" />
      <!-- <span class="logofont">疲惫租房</span> -->
    </div>
    <div id="personalMenu" class="personalMenu">
      <el-menu default-active="0"  mode="horizontal" active-text-color="#0084ff">
        <el-submenu index="0">
          <template slot="title"><i class="el-icon-user"/>{{username}}</template>
          <el-menu-item index="0-1"><i class="el-icon-edit"/>个人信息编辑</el-menu-item>
          <el-menu-item index="0-2" @click="logout()"><i class="el-icon-switch-button"/>注销登录</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import Bus from "../bus";
export default {
  name: "topmain",
  data(){
    return{
      username:sessionStorage.getItem("adminname")
    }
  },
  methods: {
    logout(){
      console.log("logout!")
      sessionStorage.clear();
      this.$router.push(({name:'login'}))
    },
    toHome(){
      this.$router.push({name:"homePage"});
    }
  },
  mounted:function(){
    // 接收更改的新昵称并且同步显示到顶栏实现更新
    let _this = this;
    Bus.$on("changeUsername",function(name){
      _this.username = name;
    })
  }
};
</script>

<style scoped>


html,
body {
  margin: 0;
  padding: 0;
  border: 0;
}
.topmain {
  background-color: white;
  height: 70px;
  margin: 0;
  width: 100%;
  /* box-shadow: 0px 1px 0px rgba(59, 59, 59, 0.2); */
}
.logo {
  width: 40%;
  float: left;
  margin-left: 3.5%;
  font-family: "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑,
    STHeiti, MingLiu;
}
.personalMenu{
  float:right;
  margin-top: 0.75%;
  margin-right: 9%;
}
</style>