<template>
  <div id="personalCenter">
    <div id="greetingsArea">你好啊{{username}},今天是{{fullDate}},{{weekName}}。访问系统的时间为{{fullTime}}</div>
    <billlist style="width:100%;height:100%;"/>
    <el-date-picker
      v-model="searchBillRange"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始月份"
      end-placeholder="结束月份"
      :picker-options="pickerOptions">
    </el-date-picker>
    <el-button type="primary" @click="searchSpecifiedBillList">搜索</el-button>
    <el-button type="primary" @click="addNewRec">记新账</el-button>
    <addModal ref="addModal"/>
    <charts ref="charts" />
  </div>
</template>

<script>
/* eslint-disable */
import billlist from "./nav/billlist";
import charts from "./nav/statisticalCharts";
import addModal from "./modal/addModal"
import moment from "moment";
import {getSpecifidBillInRange } from '@/api/BillInfo'
import Bus from '@/bus'

export default {
  data() {
    return {
      username: "测试",
      fullDate: "",
      weekName: "",
      fullTime: "",
      PayOfMonth: 660,
      IncomeOfMonth: 550,
      minusNumber: 0,
      BillEval: "",
      searchBillRange:'',
      pickerOptions:{
        shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近半年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
              picker.$emit('pick', [start, end]);
            }
          }]
      }
    };
  },
  components: {
    billlist,
    addModal,
    charts
  },
  created:function() {
   this.loadingPageFun();
  },
  methods: {
    loadingPageFun() {
      let nowDate = new Date();
    //   this.fullDate =
    //     nowDate.getFullYear() +
    //     "年" +
    //     (nowDate.getMonth() + 1) +
    //     "月" +
    //     nowDate.getDate() +
    //     "日";
    this.fullDate = moment(new Date()).format('YYYY年MM月DD日');
    this.fullTime = moment(new Date()).format('HH:mm:ss');
      this.minusNumber = this.IncomeOfMonth - this.PayOfMonth;
      this.weekName  = moment(new Date()).format('dddd')
      if(this.minusNumber >0){
          this.BillEval = '本月总体情况为正常。';
      }else{
          this.BillEval = '本月总体情况为血亏。';
      }
},
addNewRec(){
  this.$refs.addModal.show();
},
searchSpecifiedBillList(){
  if(this.searchBillRange == null ||this.searchBillRange ==''){
    this.$message.error('请选择时间范围！');
    return false;
  }
  let dataRange=[
    String(moment(this.searchBillRange[0]).format('YYYY-MM-DD')),
    String(moment(this.searchBillRange[1]).format('YYYY-MM-DD'))
  ]
  getSpecifidBillInRange(dataRange).then(res=>{
    if(res.data.data!=null){
      Bus.$emit('searchSpecifiedData',res.data.data,dataRange);
      this.$message.success('查询到指定数据');
    }

  })
}
  }
};
</script>

<style lang="less" scoped>
#incomeNumber {
  color: green;
  font-weight: bold;
}
#payNumber {
  color: red;
  font-weight: bold;
}
</style>
