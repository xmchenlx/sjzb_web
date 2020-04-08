<template>
  <div id="personalCenter">
    <div id="greetingsArea">你好啊{{username}},今天是{{fullDate}},{{weekName}}。访问系统的时间为{{fullTime}}</div>
    <el-tabs type="border-card" tab-position="left" style="height:100%;"  @tab-click="refreshCharts">
      <el-tab-pane label="账本信息">
        <el-date-picker
          v-model="searchBillRange"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          :picker-options="pickerOptions"
        ></el-date-picker>
        <el-cascader
          v-model="typeid"
          :options="type1stOptions"
          placeholder="筛选目录标签"
          :show-all-levels="false"
          filterable
          clearable
        ></el-cascader>
        <el-input
          placeholder="该功能尚未实现 | 账单内容关键词检索"
          v-model="contentKeyWord"
          style="width:250px"
          prefix-icon="el-icon-search"
        ></el-input>
        <el-button type="primary" @click="searchSpecifiedBillList">搜索</el-button>
        <el-button type="primary" @click="addNewRec">记新账</el-button>

        <billlist style="width:100%;height:100%;" />
      </el-tab-pane>
      <el-tab-pane label="账单图表">
        <el-divider>
          <h2>近7日消费与支出汇总图表</h2>
        </el-divider>

        <charts ref="charts" />
      </el-tab-pane>
      <el-tab-pane label="固定消费扫码记账">
        <h2 style="text-align:center;color:gray;">该模块主要用于快速记录一些固定的支出或收入记录。<br>如：公交、房租、奶茶、还款等。该模块需要调用摄像头，所以主要适用于手机记账。<br>该功能还在研发当中...</h2>
          <scanModal />

      </el-tab-pane>

       <el-tab-pane label="消息通知">
         <h2 style="text-align:center;">您暂时还没收到任何通知。</h2>
       </el-tab-pane>
      <el-tab-pane label="其他设置">
        <el-button @click="routerPush(0)" type="danger">退出登录</el-button>
        <el-button @click="routerPush(1)">前往文章模块</el-button>
        <el-button @click="routerPush(2)">前往接单查询</el-button>
        <el-button @click="routerPush(3)" type="primary">前往chenlx小天地首页</el-button>
      </el-tab-pane>
    </el-tabs>

    <div id="amodal">
      <addModal ref="addModal" width="300" />
    </div>

  </div>
</template>

<script>
/* eslint-disable */
import billlist from "./nav/billlist";
import charts from "./nav/statisticalCharts";
import addModal from "./modal/addModal";
import moment from "moment";
import { getSpecifidBillInRange } from "@/api/BillInfo";
import { getAllType } from "@/api/type1st";
import { getTypeListByFid } from "@/api/type2nd";
import Bus from "@/bus";
import scanModal from "@/brpsPage/modal/scanModal";

export default {
  data() {
    return {
      username: sessionStorage.getItem("userName"),
      fullDate: "",
      weekName: "",
      fullTime: "",
      contentKeyWord: "",
      PayOfMonth: 660,
      IncomeOfMonth: 550,
      minusNumber: 0,
      BillEval: "",
      typeid: "",
      searchBillRange: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近半年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      type1stOptions: [],
      type2ndOptions: []
    };
  },
  components: {
    billlist,
    addModal,
    charts,
    scanModal
  },
  created: function() {
    this.loadingPageFun();
    this.getType1stList();
  },
  methods: {
    refreshCharts(opratelist) {
      //console.log("refreshchart");
      if(opratelist.index==="1"){
      this.$refs.charts.getPayData();
      }
    },
    routerPush(index){
      if(index===0){
        this.$router.push({"name":'LoginPage'})
      }else if(index===1){
        this.$router.push({"name":'articleList'})
      }else if(index===2){
        this.$router.push({"name":'wmList'})
      }else if(index===3){
        // this.$router.push({"name":''})
      }
    },
    processType2ndList(t1Id) {
      let _this = this;
      let tempOptionlist = [];
      getTypeListByFid(t1Id).then(res => {
        // _this.type2ndOptions = []
        res.data.data.forEach(function(item, index) {
          tempOptionlist.push({
            label: item.type2ndName,
            value: item.type2ndId
          });
        });
      });
      return tempOptionlist;
    },
    getType1stList() {
      getAllType().then(res => {
        let _this = this;
        res.data.data.forEach(function(item, index) {
          _this.type1stOptions.push({
            label: item.type1stName,
            value: item.type1stId,
            children: _this.processType2ndList(item.type1stId)
          });
        });
      });
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
      this.fullDate = moment(new Date()).format("YYYY年MM月DD日");
      this.fullTime = moment(new Date()).format("HH:mm:ss");
      this.minusNumber = this.IncomeOfMonth - this.PayOfMonth;
      this.weekName = moment(new Date()).format("dddd");
      if (this.minusNumber > 0) {
        this.BillEval = "本月总体情况为正常。";
      } else {
        this.BillEval = "本月总体情况为血亏。";
      }
    },
    addNewRec() {
      this.$refs.addModal.show(true);
    },
    searchSpecifiedBillList() {
      let _this = this;
      if (this.searchBillRange == null || this.searchBillRange == "") {
        this.$message.error("请选择时间范围！");
        return false;
      }
      let dataRange = {
        a: String(moment(this.searchBillRange[0]).format("YYYY-MM-DD")),
        b: String(moment(this.searchBillRange[1]).format("YYYY-MM-DD")),
        //typeid目录筛选是一二级数组，查询时需要提取第二级标签
        typeid: _this.typeid == "" ? "" : _this.typeid[1]
      };
      getSpecifidBillInRange(dataRange).then(res => {
        if (res.data.data != null) {
          Bus.$emit("searchSpecifiedData", res.data.data, dataRange);
          this.$message.success("查询到指定数据");
        }
      });
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
#personalCenter{
  height:100%;
  min-height: 600px;
}
</style>
<style>

</style>