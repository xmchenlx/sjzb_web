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
      getPast7DaysPayList().then(res => {
        // this.listData = res.data.data
        this.processDataToList(res.data.data)
      }).then(() => { _this.getIncomeData() })
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
      // d.forEach(function (item) {
      //   _this.chartData.rows.push({
      //     billDate: moment(item.billDate).format('YYYY-MM-DD'),
      //     payMoney: item.money
      //   })
      // })
    }
  },
  created: function () {
    this.getPayData()
  }

}
</script>

<style>

</style>
