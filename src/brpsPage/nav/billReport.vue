<template>
  <div id="billReport"  v-if="isReportLoad === false">
    <div>
      <el-tag closable>当前只显示支出的部分，收益部分暂时不纳入报告里。</el-tag>
      <el-row :gutter="0">
        <el-col :xs="12"   :span="11">
          <div id="billNote">
            <div id="notecontent">
              <h3 style="text-align:center">账单报告</h3>
              <el-row>
                <el-col :span="12">
                  本月消费
                  <br />
                  <span class="price_large redColor">{{reportNote.payTotal}}</span>元
                </el-col>
                <el-col :span="12">
                  当月收入
                  <br />
                  <span class="price_large greenColor">{{reportNote.incomeTotal}}</span>元
                </el-col>
              </el-row>
              本月最高消费类别：
              <div style="color:white;width:90%;height:13rem">
                 <ve-bar width="105%"  height="100%" :data="chartsDataGroupByPay" :loading="chartloading" :settings="chartSettings"></ve-bar>
                </div>
              <p>
                <span class="lineBorder redColor">{{convertEvalText(reportNote.evalIndex)}}</span>
              </p>
             <span style="padding:0;margin:0"> 提示：{{reportNote.tipText}}</span>
            </div>
          </div>
        </el-col>
        <el-col :xs="13"  :span="13">
           <div id="pieChartsDiv">
          <h3 style="text-align:center">当月消费二级类目占比饼图</h3>
               <ve-pie :events="pieChartEvents" :settings="chartSettings"  :data="chartDataOfPie"></ve-pie>
               <!-- <ve-funnel :settings="chartSettings" :data="chartDataOfPie"></ve-funnel> -->
           </div>

        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
            <div id="billSettingdiv">
            <h3>
              关注类别
              <span style="font-size:15px;color:gray;font-weight:400">您可至多设置4项关注</span>
            </h3>
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >{{tag}}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加关注</el-button>
            <h3>阈值自定义</h3>
            <h2>
              消费≤
              <span class=" redColor">18</span>元
              <el-button type="text" icon="el-icon-edit" style="font-size:20px;"/> |

              收入≥
              <span class=" greenColor">18</span>元
              <el-button type="text" icon="el-icon-edit" style="font-size:20px;"/>

            </h2>
            <h3>趋势预估</h3>
            <div>asofSDK告诉大家开始觉得爱神的箭氨基酸开始刚到家噶几感动kg啊iOS的感觉奥斯卡的可视对讲挂科四大金刚爱空间 赶快来见到过可垃圾的看了金士顿国剧盛典飞</div>
          </div>
        </el-col>
      </el-row>
      <el-divider />
    </div>
    <showDetailPie ref="showDetailPie"/>
  </div>
  <div v-else>
    <h1>大哥稍等片刻，小的这就为您呈上...</h1>
  </div>
</template>

<script>
import { getBillReportData } from '@/api/BillInfo'
import showDetailPie from '../modal/showDetailPieChartModal'
export default {
  data () {
    let _this = this
    this.pieChartEvents = {

      click: function (e) {
        // console.log(e)
        _this.$refs.showDetailPie.showDialog(e.data.name)
      }
    }
    return {
      isReportLoad: true,
      reportData: {},
      sumOfPay: 0,
      sumOfIncome: 0,
      chartloading: true,
      reportNote: {
        payTotal: 0,
        incomeTotal: 0,
        evalIndex: 2,
        tipText:
          '这个月的开销目前看来很稳定，消费时请时常记住到底真的需不需要哦。'
      },
      chartSettings: {
        dimension: ['名称'],
        metrics: ['金额']
      },
      chartDataOfPie: {
        columns: ['名称', '金额'],
        rows: [

        ]
      },
      chartsDataGroupByPay: {
        columns: ['名称', '金额'],
        rows: [

        ]
      }
    }
  },
  methods: {
    calcuSum (list) {
      // var p = 0
      // var i = 0
      let _this = this
      for (let i = 0; i < list.length; i++) {
        let t = list[i].tTotal
        if (t < 0) { _this.reportNote.payTotal += t } else { _this.reportNote.incomeTotal += t }
      }
      // console.log('out' + i)
      this.reportNote.payTotal = this.reportNote.payTotal.toFixed(2)
      this.reportNote.incomeTotal = this.reportNote.incomeTotal.toFixed(2)
    },
    loadVCharts () {
      var _this = this
      var count = 0
      for (let i = 0; i < _this.reportData.type2ndData.length; i++) {
        // let len = _this.reportData.type2ndData.length - 1
        let tempres = _this.reportData.type2ndData[i]
        if (++count < 4) {
          _this.chartsDataGroupByPay.rows.push({
            '名称': tempres.tName,
            '金额': tempres.tTotal
          })
        } else {
          break
        }
      }

      for (let i = 0; i < _this.reportData.type1stData.length; i++) {
        let tempres = _this.reportData.type1stData[i]

        _this.chartDataOfPie.rows.push({
          '名称': tempres.tName,
          '金额': tempres.tTotal
        })
      }

      _this.$nextTick(() => {
        _this.chartloading = false
        _this.isReportLoad = false
      })
    },
    loadBillReport () {
      let uid = sessionStorage.getItem('userId')
      let _this = this
      getBillReportData(uid, -1).then(res => {
        _this.reportData = res.data.data
        this.$nextTick(() => {
          _this.calcuSum(_this.reportData.type1stData)
          _this.loadVCharts()
          _this.$forceUpdate()
        })
      })
    },
    convertEvalText (index) {
      if (index === 0) {
        return '败家东西'
      } else if (index === 1) {
        return '中规中矩'
      } else if (index === 2) {
        return '持家大佬'
      }
    }

  },
  created: function () {
    this.loadBillReport()
  },
  components: {
    showDetailPie
  }
}
</script>

<style lang="less" scoped>
#title_medium {
  font-size: 20px;
}
.price_large {
  font-size: 1.7rem;
  font-weight: bolder;
}
.redColor {
  color: red;
}
.greenColor {
  color: green;
}

#billNote {
  background-image: url("../../img/report_note.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 27rem; //690*60%
  height: 32rem; //887*60%
  // width: 100%;
  // height: 100%;
}
#notecontent {
  padding: 30px;
  width: 70%;
  margin: 0 auto;
}

.lineBorder {
  font-size: 2rem;
  float: left;
  font-weight: bold;
  border: 3px dashed red;
  transform: rotate(-15deg);
  user-select: none;
  position: absolute;
  left: 13vw;
  padding: 2px 5px;
  top: 28vw;
}

#billSettingdiv {
  width: 90%;
  background-color: rgb(240, 240, 240);
  height: 350px;
  padding: 2px 15px;
  margin-top: 1.5%;
}

#pieChartsDiv {
  min-width: 23.5rem;
  width:70%;
  background-color: rgb(240, 240, 240);
  // height: 31vw;
  height:auto;
  // margin-left: 2rem;
  margin-top: 1.5%;
}
</style>
