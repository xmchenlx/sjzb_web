<template>
  <div id="personalCenter_Mobile">
    <div id="greetingsArea">你好啊{{username}},今天是{{fullDate}},{{weekName}}。访问系统的时间为{{fullTime}}</div>
    <billlist style="width:100%"/>
    <el-divider content-position="left">检索筛选·开始你的表演</el-divider>

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
    <el-cascader
    v-model="typeid"
    :options="type1stOptions"
    placeholder="筛选目录标签"
    :show-all-levels="false"
    filterable
    clearable
    ></el-cascader>
    <el-input placeholder="账单内容关键词检索" v-model="contentKeyWord" style="width:250px" prefix-icon="el-icon-search"></el-input>
    <el-button type="primary" @click="searchSpecifiedBillList">搜索</el-button>
    <el-button type="primary" @click="addNewRec">记新账</el-button>
    <addModal ref="addModal" style="width:90%"/>
    <el-divider content-position="left">过去7天消费收入统计图</el-divider>
    <charts ref="charts" />
  </div>
</template>

<script>
/* eslint-disable */
import billlist from "./nav/billlist_Mobile";
import charts from "./nav/statisticalCharts";
import addModal from "./modal/addModal"
import moment from "moment";
import {getSpecifidBillInRange } from '@/api/BillInfo'
import { getAllType } from '@/api/type1st'
import { getTypeListByFid } from '@/api/type2nd'
import Bus from '@/bus'
import scanModal from '@/brpsPage/modal/scanModal'
export default {
  data() {
    return {
      username: "测试",
      fullDate: "",
      contentKeyWord:'',
      weekName: "",
      fullTime: "",
      PayOfMonth: 660,
      IncomeOfMonth: 550,
      minusNumber: 0,
      BillEval: "",
      typeid:'',
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
      },
      type1stOptions:[],
      type2ndOptions:[]

    };
  },
  components: {
    billlist,
    addModal,
    charts,
    scanModal
  },
  created:function() {
   this.loadingPageFun();
   this.getType1stList();
   this.mobileUITips();
  },
  methods: {
    mobileUITips(){
      let tipsText ='为啥呢？在手机Web访问时，为了界面简洁，表格不会展示全部的数据。点击【>】箭头符号时，会为您下拉出账单的详细数据方便您操作。'
      this.$alert(tipsText,'界面优化说明',{
        confirmButtonText:'好的，我晓得了'
      });
    },
    processType2ndList (t1Id) {
      let _this = this
      let tempOptionlist=[]
      getTypeListByFid(t1Id).then(res => {
        // _this.type2ndOptions = []
        res.data.data.forEach(function (item, index) {
          tempOptionlist.push({
            label: item.type2ndName,
            value: item.type2ndId
          })
        })
      
      })
      return tempOptionlist
    },
    getType1stList () {

      getAllType().then(res => {
        let _this = this
        res.data.data.forEach(function (item, index) {
          _this.type1stOptions.push({
            label: item.type1stName,
            value: item.type1stId,
            children:_this.processType2ndList(item.type1stId)
          })
        })
      })
      // this.$forceUpdate();
    },
    
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
  //show的参数（isUsePC），这里是否
  this.$refs.addModal.show(false);
},
searchSpecifiedBillList(){
  let _this = this;
  if(this.searchBillRange == null ||this.searchBillRange ==''){
    this.$message.error('请选择时间范围！');
    return false;
  }
  let dataRange={
    a:String(moment(this.searchBillRange[0]).format('YYYY-MM-DD')),
    b:String(moment(this.searchBillRange[1]).format('YYYY-MM-DD')),
    //typeid目录筛选是一二级数组，查询时需要提取第二级标签
    typeid:_this.typeid==''?'':_this.typeid[1]
  }
  getSpecifidBillInRange(dataRange).then(res=>{
    if(res.data.data!=null){
      Bus.$emit('searchSpecifiedData',res.data.data,dataRange);
      this.$message.success('查询到指定数据');
    }

  })
}
  },mounted(){
  }
};
</script>

<style lang="less" scoped>
#personalCenter_Mobile{
  width:100%
}
#incomeNumber {
  color: green;
  font-weight: bold;
}
#payNumber {
  color: red;
  font-weight: bold;
}
</style>
