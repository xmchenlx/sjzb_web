<template>
  <div id="BRPSHead" style="height:220px;overflow:hidden;">
    <!-- <div id="HeadTitle" >
            BRPS记账天地<br/>
            <span style="font-size:25px;padding:-10px;">为账本哭的感觉真难受啊</span>
    </div>-->
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="(item,index) in bgList" :key="item">
        <img :src="returnImgPath(bgList[index])" style="width:100%;height:75%;object-fit:cover;display:table-cell"/>
        <!-- <h1>{{bgList[index]}}</h1> -->
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bgList: [
        'BRPS_banner5.jpg',
        'BRPS_banner1.jpg',
        'BRPS_banner2.jpg',
        'BRPS_banner3.jpg',
        'BRPS_banner4.jpg'
      ]
    }
  },
  methods: {
    returnImgPath (p) {
      // return p
      let fp = require('@/img/banner/' + p)
      return fp
    }
  },
  created: function () {
    // console.log(this.bgList)
  }

}
</script>

<style>
#BRPSHead {
  width: 100%;
  background-color: white;
  border-bottom-style: solid;
  border-bottom-color: lightblue;
  border-bottom-width: 5px;

  /* background-image: url("../../img/BRPS_banner1.jpg"); */
  /* background-repeat: no-repeat; */
  /* background-size: 100%; */
}
#HeadTitle {
  /* text-align: left; */
  /* font-size: 50px;
  color: white;
  padding: 110px 0 0 200px;
  text-shadow: 2px 2px 5px black; */
}
</style>
