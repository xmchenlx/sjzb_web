<template>
  <div class="personalIndexMain">
    <el-container>
      <el-header style="width:100%;padding:0">
        <topNav></topNav>
      </el-header>
    </el-container>

    <el-container style="margin:0 auto;width:100%;">
      <el-aside>
        <leftNav></leftNav>
      </el-aside>

      <el-main style="width:100%;">
        <transition name="el-zoom-in-top">
          <el-card>
            <div slot="header" class="clearfix">
              <span>页面</span>
              <el-button style="float: right; padding: 3px 0" @click="closeCard" type="text">关闭</el-button>
            </div>
            <router-view style="width:100%;margin:0 auto">
            </router-view>
          </el-card>
        </transition>
      </el-main>
    </el-container>
    <el-container>
      <el-footer>
        <!-- <footNav></footNav> -->
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import leftNav from './nav/leftNav'
import topNav from './nav/topNav'
import footNav from './nav/footNav'

import defaultPage from './Right/defaultPage'

export default {
  components: {
    leftNav,
    topNav,
    footNav,
    defaultPage
  },
  data () {

  },
  methods: {
    closeCard () {
      this.$router.push({path: '/adminCenter/welcome'})
    }
  }
}
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
  border: 0;
  margin: 0;
  background-color: rgb(244, 245, 249);
  width: 100%;
  height: 100%;
}
.personalIndexMain {
  /* margin: 0 auto; */
  /* border: 3px solid red; */
}
</style>
