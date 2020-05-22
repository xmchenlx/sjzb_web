<template>
  <div id="billReport">
    <div>
      <el-row>
        <el-col :span="3">
          <p>
            当月支出
            <br />
            <span class="price_large redColor">999</span>元
          </p>
        </el-col>

        <el-col :span="3">
          <p>
            当月收入
            <br />
            <span class="price_large greenColor">5639</span>元
          </p>
        </el-col>

        <el-col :span="3">
          <p>
            开销评价
            <br />
            <span class="price_large redColor">败家</span>
          </p>
        </el-col>
      </el-row>
      <el-row>
          <el-col :span="6">

          </el-col>
      </el-row>
        <el-divider />

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoad: false
    }
  }
}
</script>

<style lang="less" scoped>
#title_medium {
  font-size: 20px;
}
.price_large {
  font-size: 45px;
  font-weight: bolder;
}
.redColor {
  color: red;
}
.greenColor {
  color: green;
}
</style>
