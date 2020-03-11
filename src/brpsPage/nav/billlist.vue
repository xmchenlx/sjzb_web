<template>
  <div id="billlist">
    <h2 style="text-align:center">
      {{BillTitle}}消费流水账单
      <el-button type="text" @click="refreshTable" :underline="false">
        <i :class="refreshIconName" />
        {{refreshHint}}
      </el-button>
    </h2>
    <el-table
      :data="tableData"
      border
      height="500"
      style="width: 100%;"
      v-loading="isTableLoading"
      element-loading-text="正在查询数据"
    >
    <template slot="empty">
      <img  draggable="false" src="@/img/panda_angry.png" style="padding-bottom: -50px;margin-bottom:-60px;"/>
      <p style="margin-top:5%;font-size:20px;color:gray;">没有任何开销？你真的不是一位合格的肥宅！快去花钱！！</p>
    </template>
      <el-table-column prop="id" label="流水" width="100"></el-table-column>
      <el-table-column
        prop="billDate"
        :formatter="convertDate"
        label="日期"
        sortable
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column prop="content" label="账单内容" width="450" align="center"></el-table-column>
      <el-table-column prop="money" label="波动金额" align="center" width="150">
        <template slot-scope="scope">
          <span :class="payTypeClass(scope.row.money)">
           ￥ {{scope.row.money.toFixed(2)}}
            </span>
        </template>
      </el-table-column>
      <el-table-column label="一级目录" align="center" width="130">
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
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000">
    </el-pagination>-->

      <el-tag v-show="isTagShow" :closable="true" @close="closeTag" style="height:35px;font-size:20px;margin:10px 0">简报：{{billListReport}}</el-tag>
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
        console.log(this.tableData);
        this.isTableLoading = false;
      });
    },
    searchDetailInfo(bid){
      this.$refs.ediaModal.editBillInfo(bid)
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
      this.getRangeData().then(res => {
        _this.refreshIconName = "el-icon-refresh-right";
        _this.refreshHint = "已是最新数据！";
       
      })
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
      _this.BillTitle = dataRange[0] + '至' +dataRange[1] +'期间'
      _this.isTableLoading = false;


    })
  }
};
</script>

<style>
#billlist {
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
</style>
