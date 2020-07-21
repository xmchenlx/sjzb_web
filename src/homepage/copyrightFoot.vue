<!-----------------This is lx's Project Named BRPS!^_^-----------------------------------
  lx的小天地下属项目 版权所有(c) 2018 - 2020
  文  件：copyrightFoot.vue
  中文名：版权脚注
  作  者：chenlx | 邮箱：me@chenlx.top
  时  间：2020年07月20日 17:26:16
  描  述： 用于展示在页面底端的版权声明;
---------------------------------------------------------------------------------->
<template>
  <div id="footCopy" class="CopyInfo_homepage">
    <span style="text-align:center;">
      <!-- 04-28/18 -->
      Copyright ©2019-{{nowYear}} BRPS 版权所有 版本：V.2.1.22 | 本网站不用于任何商业用途 |
      <a class="aStyle1" style="text-decoration:none;" href="http://www.miitbeian.gov.cn">备案号：闽ICP备18027684号-1</a> |
    </span>
    <img style="width:12px;" src="@/img/beianIcon.png" />
    <a
      target="_blank"
      href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=35020602001332"
      class="aStyle1"
    >
      <img src style="float:left;" />
      <p class="aStyle1"
      >闽公网安备 35020602001332号</p>
    </a>
    <br />
    <span style="font-size:1em;">ALL RIGHTS RESERVED. MADE AND DESIGNED BY chenlx. This website is not for any commercial purposes.</span>
  </div>
</template>

<script>
export default {
  name: 'footCopy',
  data () {
    return {
      nowYear: 2000
    }
  },
  created: function () {
    this.nowYear = new Date().getUTCFullYear()
  }
}
</script>

<style lang="less" scoped>
html,body{padding:0;margin:0;border:0;}
.CopyInfo_homepage {
  color: white;
  width: 100%;
  margin: 0 auto;
  // bottom:30px;
  // position: fixed;
  // position 属性规定元素的定位类型。
  // fixed生成绝对定位的元素，相对于浏览器窗口进行定位。
  // 元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
  text-align: center;
  font-size: 1em;
}
.CopyInfo a{
  text-decoration: none;
  color:lightblue;
}

.aStyle1{
  display:inline-block;text-decoration:none;height:20px;line-height:15px;color:lightblue;
}
</style>
