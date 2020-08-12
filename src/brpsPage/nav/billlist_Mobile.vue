<!-----------------This is lx's Project Named BRPS!^_^-----------------------------------
  lx的小天地下属项目 版权所有(c) 2018 - 2020
  文  件：billlist_Mobile.vue
  中文名：账单表格-手机
  作  者：chenlx | 邮箱：me@chenlx.top
  时  间：2020年07月20日 17:24:46
  描  述： 用于展示账单表格以及操作按钮;
---------------------------------------------------------------------------------->
<template>
  <div id="billlistMobile">
    <h4 style="text-align:center;line-height:-10px">
      {{BillTitle}}消费流水账单
    </h4>

      <el-button type="text" @click="refreshTable" :underline="false" style="margin:0 auto">
        <i :class="refreshIconName" />
        {{refreshHint}}
      </el-button>
    <el-table
      :data="tableData"
      border
      style="width: 100%;height:100%"
      max-height="450px"
      v-loading="isTableLoading"
      element-loading-text="正在查询数据"
    >
    <template slot="empty">
      <img  draggable="false" src="@/img/panda_angry.png" style="padding-bottom: -50px;margin-bottom:-60px;"/>
      <p style="margin-top:25%;font-size:15px;color:gray;line-height:20px;width:100%">没有任何开销？<br/>你真的不是一位<br/>合格的肥宅！<br/>快去花钱！！</p>
    </template>
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="波动日期">
            <span>{{convertDateDetail(props.row.billDate)}} </span>
          </el-form-item>
          <el-form-item label="账单内容">
            <span>{{ props.row.content }}</span>
          </el-form-item>
          <el-form-item label="波动金额">
            <template>
          <span :class="payTypeClass(props.row.money)">
           ￥ {{props.row.money.toFixed(2)}}
            </span>
        </template>
          </el-form-item>
          <el-form-item label="隶属一级目录名称">
            <span>
              <i :class="tableTagsIconConvert(props.row.type1stName)" />
            {{props.row.type1stName}}
            </span>
          </el-form-item>
          <el-form-item label="隶属二级目录名称">
            <span>
            {{props.row.type2ndName}}
            </span>
          </el-form-item>
          <el-form-item label="操作">
            <template >

            <el-button type="text" @click="searchDetailInfo(props.row.id)">编辑</el-button>
            <el-button type="text"  @click="removeOneRecord(props.row.id,props.row.content)">删除</el-button>
            </template>

          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
      <!-- <el-table-column prop="id" label="流水" width="100"></el-table-column> -->
      <el-table-column
        prop="billDate"
        :formatter="convertDate"
        label="日期"
        sortable
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column prop="content" label="账单内容" width="100" align="center"></el-table-column>
      <el-table-column prop="money" label="波动金额" align="center" width="100">
        <template slot-scope="scope">
          <span :class="payTypeClass(scope.row.money)">
           ￥ {{scope.row.money.toFixed(2)}}
            </span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="一级目录" align="center" width="130">
        <template slot-scope="scope">
          <el-tag type="light"  size="mdeium" >
            <i :class="tableTagsIconConvert(scope.row.type1stName)" />
            {{scope.row.type1stName}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="type2ndName" label="二级目录" align="center" width="100"></el-table-column>
      <el-table-column prop="note" label="额外备注" align="center" width="210"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="searchDetailInfo(scope.row.id)">编辑详情</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="removeOneRecord(scope.row.id,scope.row.content)">假装不存在</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000">
    </el-pagination>-->

      <!-- <el-tag v-show="isTagShow" :closable="true" @close="closeTag" style="height:35px;font-size:20px;margin:10px 0">简报：{{billListReport}}</el-tag> -->
<ediaModal ref="ediaModal"/>
  </div>
</template>

<script>
/* eslint-disable */
import { getAllBill, getAllBillInRange, removeOneRecord } from "@/api/BillInfo";
import ediaModal from '../modal/addModal'
import moment from "moment";
import Bus from "@/bus";
export default {
  data() {
    return {
      tableData: [],
      isTableLoading: true,
      BillTitle: "",
      refreshHint: "刷新数据",
      refreshIconName: "el-icon-refresh-right",
      billListReport:'',
      isTagShow:false
    };
  },
  created: function() {
    this.BillTitle = moment(new Date()).format("YYYY年MM月");
    getAllBillInRange().then(res => {
      this.tableData = res.data.data;
      this.generateBillListReport(this.tableData)
      this.isTableLoading = false;
    });
  },
  components:{
    ediaModal
  },
  methods: {
    generateBillListReport(billData){
      let _this = this;
      let payCount=0;
      let incomeCount=0;
      billData.forEach(function(item){
        if(item.money<0)payCount-=item.money
        else incomeCount+=item.money
      })
      let reportText='在此期间，您累计支出￥'+payCount.toFixed(2)+'元，累计收入￥'+incomeCount.toFixed(2)+'元，差额'+(incomeCount-payCount).toFixed(2)+'元。'
      this.billListReport = reportText;
      this.isTagShow=true
    },
    removeOneRecord(bid,content){
      this.$confirm('您正在尝试删除名为【'+content+'】的记录，操作不可逆，确认删除？','删除操作确认',{
        confirmButtonText:'意已决，删除',
        cancelButtonText: '朕再考虑',
        type:'warning'
      }).then(()=>{
        removeOneRecord(bid).then(res=>{
          if(res.data.data>0){
            this.$message.success('已经删除！你真是个省钱的小天才！')
            this.refreshTable()
          }else{
            this.$message.error('删除结果未知，请尝试刷新表格')
          }
        })
      }).catch(()=>{
        this.$message('操作终止')
      })
    },
    getRangeData() {
      this.BillTitle = moment(new Date()).format("YYYY年MM月");
      getAllBillInRange().then(res => {
        this.tableData = res.data.data;
        this.isTableLoading = false;
      });
    },
    searchDetailInfo(bid){
      this.$refs.ediaModal.editBillInfo(bid)
    },
    convertDateDetail:function(dat){
      return moment(dat).format('YYYY-MM-DD')
    },
    convertDate: function(row, column) {
      let newDate = moment(row.billDate).format("YYYY-MM-DD");
      return newDate;
    },
    tableTagsColorConvert(name) {
      if (name == "生活用品") return "red";
    },
    tableTagsIconConvert(name) {
      if (name == "生活用品") return "el-icon-truck";
      else if (name == "食") return "el-icon-food";
      else if (name == "电子设备") return "el-icon-video-camera-solid";
      else if (name == "旅行") return "el-icon-bicycle";
      else if (name == "穿") return "el-icon-s-custom";
      else if (name == "住") return "el-icon-s-home";
      else if (name == "行") return "el-icon-watch";
      else if (name == "教育与材料") return "el-icon-s-check";
      else if (name == "个人缴费") return "el-icon-document";
      else if (name == "生活用品") return "el-icon-shopping-cart-full";
      else if (name == "其他") return "el-icon-potato-strips";
      else if (name == "收入") return "el-icon-bank-card";
    },
    refreshTable() {
      let _this = this;
      this.refreshHint = "拉取数据中...";
      this.refreshIconName = "el-icon-loading";
      this.isTableLoading = true;
      this.getRangeData()
      _this.$nextTick(() => {
        setTimeout(() => {
          _this.refreshIconName = "el-icon-refresh-right";
          _this.refreshHint = "数据刷新于"+ moment().format('YYYY-MM-DD hh:mm:ss');
          setTimeout(() => {
          _this.refreshHint = "刷新数据";
            
          }, 3000);
          _this.$forceUpdate();
        }, 1000);
      });
      _this.$forceUpdate();
    },
    payTypeClass(p){
      if(p<0)return 'redPay'
      return 'greenPay'
    },
    closeTag(){
      this.isTagShow=false;
    }
  },
  mounted: function() {
    let _this = this;
    Bus.$on("addNewRec", function(status) {
      if (status == "success") {
        this.refreshTable();
      }
    });
    Bus.$on("searchSpecifiedData",function(p,dataRange){
      _this.isTableLoading = true;
      _this.generateBillListReport(p);
      _this.tableData = p;
      _this.BillTitle = dataRange.a + '至' +dataRange.b +'期间'
      _this.isTableLoading = false;


    })
  }
};
</script>

<style>
#billlistMobile {
  width: 100%;
  height: 100%;
}
.redPay{
  color:red;
  font-weight: bold;

}
.greenPay{
  font-weight: bold;
  color:green;
}
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 150px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
</style>
