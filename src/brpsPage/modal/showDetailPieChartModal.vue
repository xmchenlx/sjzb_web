<template>
  <div id="showDetailPieChartModal">
    <el-dialog
      :title="typename"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <ve-pie
      :data="chartDataOfPie"
      :loading="chargLoad"
      :settings="chartSettings"
      >
    </ve-pie>
    <div id="tablelist">
        <el-table
    :data="tableList"
    height="250"
    border
    style="width: 100%">
    <el-table-column
      prop="billDate"
      :formatter="dateFormat"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="content"
      label="开销名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="money"
      label="金额">
    </el-table-column>
       <el-table-column
      prop="note"
      label="备注">
    </el-table-column>
  </el-table>
    </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { searchOneDetailType1st } from '@/api/BillInfo'
import { dateformat } from '@/dict/systemSetting'
export default {
  data () {
    return {
      dialogVisible: false,
      typename: '',
      chargLoad: true,
      chartDataOfPie: {
        columns: ['名称', '金额'],
        rows: [

        ]
      },
      tableList: [],
      chartSettings: {
        dimension: ['名称'],
        metrics: ['金额'],
        legend: {show: false}
      }
    }
  },
  methods: {
    dateFormat (t) {
      return dateformat(t)
    },
    handleClose () {
      this.chartDataOfPie.rows = []
      this.dialogVisible = false
    },
    showDialog (tn) {
      this.dialogVisible = true
      this.typename = '关于' + tn + '的详细信息'
      this.getDataFromType1st(tn)
    },
    getDataFromType1st (typename) {
      let uid = sessionStorage.getItem('userId')
      let _this = this
      searchOneDetailType1st(uid, typename).then(res => {
        // console.log(res.data.data)
        _this.loadChartData(res.data.data)
        _this.loadTableData(res.data.data)
      }).then(() => { _this.chargLoad = false })
    },
    loadTableData (tlist) {
      this.tableList = tlist.tableData
      console.log(this.tableList)
    },
    loadChartData (dlist) {
      let _this = this
      dlist = dlist.chartData // 在这里只需要图表数据
      for (let i = 0; i < dlist.length; i++) {
        let tempres = dlist[i]
        // console.log('dlist[i]=' + dlist[i])
        _this.chartDataOfPie.rows.push({
          '名称': tempres.tName,
          '金额': tempres.tTotal
        })
      }
    //   console.log(this.chartDataOfPie)
    }

  }
}
</script>

<style>
</style>
