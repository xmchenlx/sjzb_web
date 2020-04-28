<template>
  <div id="defaultMain" class="defaultMain">
    <img src="../../img/websitelogo.png" draggable="false" width="800px" />
<!-- draggable="false" 禁止拖动图片 -->
    <h2>欢迎进入管理中心！</h2>
  </div>
</template>

<script>
export default {
  name: "defaultMain"
};
</script>

<style scoped>
.defaultMain {
  margin: 0 auto;
  /* border: 2px solid red; */
  /* width: 100%; */
  text-align: center;
  opacity: 0.1;
  margin-top: 10%;
  user-select: none;
}
</style>