<template>
  <div id="footCopy" class="CopyInfo" style>
    <span style="text-align:center;">
      COPYRIGHT 2018-2019 |
      <a href="http://www.miitbeian.gov.cn">备案号：闽ICP备18027684号-1</a> |
    </span>
    <img style="width:12px;" src="../../img/beianIcon.png" />
    <a
      target="_blank"
      href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=35020602001332"
      style="display:inline-block;text-decoration:none;height:20px;line-height:15px;"
    >
      <img src style="float:left;" />
      <p
        style="float:left;height:20px;line-height:25px;margin: 0px 0px 0px 5px; color:#939393;"
      >闽公网安备 35020602001332号</p>
    </a>
    <br />
    <span style="font-size:10px;">本网站仅用于分享个人生活和经验用途，并不用于任何商业目的.</span>
    <br />
    <span style="font-size:10px;">ALL RIGHTS RESERVED. DESIGNED BY chenlx in 2019</span>
  </div>
</template>

<script>
export default {
  name: "footCopy"
};
</script>

<style>
.CopyInfo {
  position: absolute;
  bottom: 0;
  background-color: rgb(244, 245, 249);
  margin-left: 0px;
  margin-right: 0px;
  padding-left: 0px;
  padding-right: 0px;
  width: 100%;
  margin: 0 auto;
  margin-top: 10%;
  text-align: center;
  font-size: 10px;
}
</style>