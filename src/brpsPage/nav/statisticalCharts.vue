<!-----------------This is lx's Project Named BRPS!^_^-----------------------------------
  lx的小天地下属项目 版权所有(c) 2018 - 2020
  文  件：statisticalCharts.vue
  中文名：常见账单表格
  作  者：chenlx | 邮箱：me@chenlx.top
  时  间：2020年07月20日 17:25:26
  描  述： 用于展示常见的分析表格，目前接入了“近7天消费收益表格;
---------------------------------------------------------------------------------->
<template>
  <div id="mainCharts" v-if="showCharts">
      <ve-line :data="chartData" :extend="chartExtend" :settings="chartSettings"></ve-line>
  </div>
</template>

<script>
import { getPast7DaysPayList, getPast7DayIncomeList } from '@/api/BillInfo'
import moment from 'moment'
export default {
  data () {
    return {
      listData: [],
      showCharts: false,
      chartData: {
        columns: ['billDate', 'payMoney', 'incomeMoney'],
        rows: []
      },
      chartSettings: {
        area: true,
        labelMap: {
          incomeMoney: '累计收入',
          billDate: '日期',
          payMoney: '累计支出'
        }

      },
      chartExtend: {
        color: ['#DC2F2F', '#01BB4A']

      }
    }
  },
  methods: {
    getIncomeData () {
      let _this = this
      getPast7DayIncomeList().then(res => {
        let objmap = res.data.data

        _this.chartData.rows.forEach(function (item, index) {
          for (let i in objmap) {
            let correntDate = moment(objmap[i].billDate).format('YYYY-MM-DD')
            if (correntDate === item.billDate) {
              _this.chartData.rows[index]['incomeMoney'] = objmap[i].money
              delete objmap[i] // 删除数组某一对象
              break
            }
          }
        })
      }).then(() => { this.showCharts = true })
    },
    getPayData () {
      let _this = this
      this.chartData.rows = []
      this.showCharts = false
      getPast7DaysPayList().then(res => {
        // this.listData = res.data.data
        this.processDataToList(res.data.data)
      }).then(() => { _this.getIncomeData() })
      // console.log('强制刷新')
      this.$forceUpdate()
    },

    processDataToList (d) {
      let _this = this
      // _this.chartData.rows[index]['incomeMoney'] = objmap[i].money
      for (let i in d) {
        _this.chartData.rows.push({
          billDate: moment(d[i].billDate).format('YYYY-MM-DD'),
          payMoney: d[i].money
        })
      }
    }
  },
  mounted: function () {
    // this.getPayData()
  }

}
</script>

<style>

</style>
