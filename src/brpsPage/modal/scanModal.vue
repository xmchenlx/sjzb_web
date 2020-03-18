<template>
  <div id="savnDiv">
    <el-dialog title="正在扫码中" :visible.sync="isScanDivShow" :before-close="handleClose">
      <span>这是一段信息</span>
     <div class="scan">
    <div id="bcid">
      <div style="height:40%"></div>
      <p class="tip">...载入中...</p>
    </div>
  </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="isScanDivShow = false">取 消</el-button>
        <el-button type="primary" @click="isScanDivShow = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
let scan = null

export default {
  data () {
    return {
      isScanDivShow: false,
      vedio: '',
      canvas: '',
      context: '',
      stopScan: null,
      errorMes: '',
      result: '',
      qrcode: '',
      fromRouter: '' // 进入扫码页面的上一个路由
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例，记录上一个页面的路由，
      vm.fromRouter = from.fullPath
    })
  },
  mounted () {
    this.startRecognize()
  },
  methods: {
    handleClose () {},

    beforeDestroy () {
      this.closeScan()
    },

    // 创建扫描控件
    startRecognize () {
      let that = this
      if (!window.plus) return
      scan = new plus.barcode.Barcode('bcid')
      scan.onmarked = onmarked
      that.startScan()

      function onmarked (type, result, file) {
        switch (type) {
          case plus.barcode.QR:
            type = 'QR'
            break
          case plus.barcode.EAN13:
            type = 'EAN13'
            break
          case plus.barcode.EAN8:
            type = 'EAN8'
            break
          default:
            type = '其它' + type
            break
        }
        // 获得code
        result = result.replace(/\n/g, '')
        if (result) {
          // alert(result)
          // alert(that.fromRouter)
          // 成功，关闭控件，带参数跳转到正常页面去
          if (result.indexOf('merchantNo=') > -1) {
            // 如果扫码结果中包含有商户ID，就截取ID拼接到商户确权路由中并跳转
            let merChantId = result.substr(result.lastIndexOf('=') + 1)
            that.$router.replace(`/home/merchantConfirm/${merChantId}`)
          } else if (result.indexOf('0x') === 0) {
            // alert('address')
            // 如果扫码结果是钱包地址，则保存该地址并返回上一个页面
            that.$store.commit('setWalletAddress', result)
            // alert('setWalletAddress---' + that.$store.state.walletAddress)
            that.$router.replace(that.fromRouter)
          } else {
            that.$router.replace(that.fromRouter)
          }
        } else {
          // 失败，关闭控件，重新扫描
          that.myUtils.showToast(that, '二维码识别失败，请重试')
          that.$router.replace(that.fromRouter)
        }
        that.closeScan()
      }
    },
    // 开始扫描
    startScan () {
      if (!window.plus) return
      scan.start()
    },
    // 关闭扫描
    cancelScan () {
      if (!window.plus) return
      scan.cancel()
    },
    // 关闭条码识别控件
    closeScan () {
      if (!window.plus) return
      scan.close()
    }
  }
}
</script>

<style lang="less" scoped>
#savnDiv {
  width: 100%;
  height: 100%;
}
</style>
