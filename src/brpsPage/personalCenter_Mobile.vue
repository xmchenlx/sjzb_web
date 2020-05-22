<template>
  <div id="personalCenter_Mobile">
    <!-- <div id="greetingsArea">你好啊{{username}},今天是{{fullDate}},{{weekName}}。访问系统的时间为{{fullTime}}</div> -->
    <el-tabs
      type="border-card"
      @tab-click="refreshCharts"
      tab-position="top"
      style="height:100%;width:100%;"
    >
      <el-tab-pane label="账单表格">
        <billlist style="width:100%;" />
        <br />
        <el-button type="primary" @click="addNewRec">记新账</el-button>

        <el-popover placement="top-start" width="250" trigger="click">
          <el-button slot="reference" type="primary" icon="el-icon-search">我要搜索</el-button>

          <div>
            <p style="text-align:center;color:gray;font-size:10px;line-height:0;">点击其他任意位置隐藏搜索框</p>
            <el-date-picker
              v-model="searchBillRange"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              style="width:250px;margin-bottom:5px;"
              :picker-options="pickerOptions"
            ></el-date-picker>
            <el-cascader
              v-model="typeid"
              :options="type1stOptions"
              style="width:250px;margin-bottom:5px;"
              placeholder="筛选目录标签"
              :show-all-levels="false"
              filterable
              clearable
            ></el-cascader>
            <el-input
              placeholder="账单内容关键词检索"
              v-model="contentKeyWord"
              style="width:250px;margin-bottom:5px;"
              prefix-icon="el-icon-search"
            ></el-input>
            <el-button type="primary" @click="searchSpecifiedBillList" icon="el-icon-search">搜索</el-button>
          </div>
        </el-popover>
      </el-tab-pane>
      <el-tab-pane label="记账图表">
        <el-divider content-position="left">过去7天消费收入统计图</el-divider>
        <charts ref="charts" style="width:100%" />
      </el-tab-pane>
      <el-tab-pane label="其他选项">
        <!-- 这里想做成跟微信一样的“我”界面，因为父级的padding受限制，先放着。 -->
        <div style="">
          <el-row :gutter="15">
            <el-col :span="10">
              <div class="block" style="text-align:right;">
                <el-avatar :size="100" :src="touxiangURL"></el-avatar>
              </div>
            </el-col>
            <el-col :span="14">
              <h2>{{uName}}</h2>
              <h4>这里显示一句个性签名</h4>
            </el-col>
          </el-row>
        </div>

        <el-row>
          <el-col :span="24">
            <el-button type="danger" class="longButton" @click="routerPush(0)">退出登录</el-button>
            <br />
            <el-button class="longButton" @click="routerPush(1)">前往文章列表</el-button>
            <br />
            <el-button class="longButton" @click="routerPush(2)">前往接单查询</el-button>
            <br />
            <el-button class="longButton" @click="routerPush(3)" type="primary">前往chenlx小天地首页</el-button>
            <br/>
            <div v-if="username === 'chenlx'">
              <el-button  class="longButton" @click="routerPush(4)" type="primary">进入管理中心</el-button>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <addModal ref="addModal" style="width:90%" />
  </div>
</template>

<script>
/* eslint-disable */
import billlist from "./nav/billlist_Mobile";
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
      username: "测试",
      fullDate: "",
      contentKeyWord: "",
      weekName: "",
      fullTime: "",
      touxiangURL:'http://sbcfc.chenlx.top/jmqDefault.png',
      PayOfMonth: 660,
      IncomeOfMonth: 550,
      minusNumber: 0,
      BillEval: "",
      typeid: "",
      searchBillRange: "",
      uName: localStorage.getItem("uName"),
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
    //弹出手机端操作的提示框
    // this.mobileUITips();
  },
  methods: {
    routerPush(index){
      if(index===0){
        this.$router.push({"name":'LoginPage'})
      }else if(index===1){
        this.$router.push({"name":'articleList'})
      }else if(index===2){
        this.$router.push({"name":'wmList'})
      }else if(index===3){
        // this.$router.push({"name":''})
      }else if(index === 4){
        if(sessionStorage.getItem("userName") === 'chenlx'){
          this.$router.push({'path':'/adminCenter/welcome'})
        }else{
          this.$message.error('账号不符合')
        }
      }
    },
    refreshCharts() {
      //console.log("refreshchart");
      this.$refs.charts.getPayData();
    },
    mobileUITips() {
      let tipsText =
        "为啥呢？在手机Web访问时，为了界面简洁，表格不会展示全部的数据。点击【>】箭头符号时，会为您下拉出账单的详细数据方便您操作。";
      this.$alert(tipsText, "界面优化说明", {
        confirmButtonText: "好的，我晓得了"
      });
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
      //show的参数（isUsePC），这里是否
      this.$refs.addModal.show(false);
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
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
#personalCenter_Mobile {
  width: 100%;
}
#incomeNumber {
  color: green;
  font-weight: bold;
}
#payNumber {
  color: red;
  font-weight: bold;
}
.longButton {
  width: 100%;
  margin: 10px 0px;
  height: 50px;
}
</style>
