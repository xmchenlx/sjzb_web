<template>
  <div id="contract_form">
    <el-dialog title="账单详情" :visible.sync="BilldialogVisible" width="30%">
      <div>
        <!-- 账单展示界面 -->
        <div class="showBill">
          <!-- 订单信息 -->
          <el-row>
            <el-col :span="6">
              <span class="conName">创建时间</span>
            </el-col>
            <el-col :span="18" class="content">
              <span>{{datetimeFormat(billInfo.oCreateTime)}}</span>
            </el-col>
          </el-row>
          <!-- 房屋信息 -->
          <el-divider>租赁信息</el-divider>
          <el-row>
            <el-col :span="6">
              <span class="conName">承租人</span>
            </el-col>
            <el-col :span="18" class="content">
              <span>{{billInfo.vRealName}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span class="conName">房源地址</span>
            </el-col>
            <el-col :span="18" class="content">
              <span>{{billInfo.oHouseFullAddress}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span class="conName">用电读数</span>
            </el-col>
            <el-col :span="18" class="content">
              <span>{{billInfo.oLastElectricNumber}}~{{billInfo.oNowElectricNumber}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span class="conName">用水读数</span>
            </el-col>
            <el-col :span="18" class="content">
              <span>{{billInfo.oLastWaterNumber}}~{{billInfo.oNowWaterNumber}}</span>
            </el-col>
          </el-row>
          <el-divider>费用明细</el-divider>
          <!-- 费用明细 -->
          <el-row>
            <el-col :span="6">
              <span class="conName">租赁费用</span>
            </el-col>
            <el-col :span="18" class="content">
              <span>￥{{billInfo.oHouseRentPrice}}元</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span class="conName">用水费用</span>
            </el-col>
            <el-col :span="18" class="content">
              <span>￥{{(billInfo.oNowWaterNumber - billInfo.oLastWaterNumber) * billInfo.oWaterPrice}}元</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span class="conName">用电费用</span>
            </el-col>
            <el-col :span="18" class="content">
              <span>￥{{(billInfo.oNowElectricNumber - billInfo.oLastElectricNumber) * billInfo.oElectricPrice}}元</span>
            </el-col>
          </el-row>
          <!-- 其他费用 -->
          <el-row v-if="billInfo.oAdjustPrice !=0 && billInfo.oAdjustPrice != null">
            <el-col :span="6">
              <span class="conName">调节费用</span>
            </el-col>
            <el-col :span="18" class="content">
              <span>￥{{billInfo.oAdjustPrice}}元</span>
            </el-col>
          </el-row>
          <el-row v-if="billInfo.oAdjustExplain !=''   && billInfo.oAdjustExplain != null">
            <!-- v-if="billform.oAdjustFee !=0" -->
            <el-col :span="6">
              <span class="conName">调节费说明</span>
            </el-col>
            <el-col :span="18" class="content">
              <span>{{billInfo.oAdjustExplain}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span class="conName">共需缴租</span>
            </el-col>
            <el-col :span="18" class="content">
              <span
                style="font-size:20px;font-weight:600;color:rgb(64, 158, 255);"
              >￥{{billInfo.oOrderMoney}}元</span>
            </el-col>
          </el-row>
          <el-divider>租赁信息</el-divider>
          <el-row>
            <el-col :span="6">
              <span class="conName">支付状态</span>
            </el-col>
            <el-col :span="18" class="content">
              <span>{{thisPayStateConvert(billInfo.oPayState)}} | </span>
              <span v-if="billInfo.oPayMethod == 2"><i class="el-icon-wallet"/> 线下支付</span>
              <img v-else-if="billInfo.oPayMethod == 1" src="@/img/alipaystandardlogo.png" style="width:70px;display: inline-block; vertical-align: middle;"/>
            </el-col>
          </el-row>
          <el-row v-if="billInfo.oPayTime !=null && billInfo.oPayTime !=''">
            <el-col :span="6">
              <span class="conName">收款时间</span>
            </el-col>
            <el-col :span="18" class="content">
              <span>{{datetimeFormat(billInfo.oPayTime)}}</span>
            </el-col>
          </el-row>
        </div>
        <span class="conName">您已设定需要租客在{{datetimeFormat(billInfo.oPayDeadLine)}}前向您支付账单。</span>
      </div>
      <span slot="footer" class="dialog-footer" v-if="billInfo.oPayState ==0">
        <!-- 线下收到房租确认提示框 -->
        <el-popover
          placement="top"
          width="160"
          ref="popoverIsReceived"
          v-model="isReceivedRentMoneyConfirm"
        >
          <p>点击确认后，该账单随即结束。您确认已收到房租？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="isReceivedRentMoneyConfirm = false">取消</el-button>
            <el-button type="primary" size="mini" @click="updateOrderInfo()">确定</el-button>
          </div>
        </el-popover>
        <!-- 取消这份账单确认提示框 -->
        <el-popover
          placement="top"
          width="160"
          ref="popoverIsCancel"
          v-model="isCancelRentMoneyConfirm"
        >
          <p>这样会导致账单的信息清除，并且数据回退。您确认要取消这份账单吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="isCancelRentMoneyConfirm = false">取消</el-button>
            <el-button type="primary" size="mini" @click="cancelOrderInfo()">确定</el-button>
          </div>
        </el-popover>
        <!-- <el-button plain type="info">这份账单有异常</el-button> -->
        <el-button plain type="danger" v-popover:popoverIsCancel>取消这份账单</el-button>
        <el-button plain type="success" v-popover:popoverIsReceived>我已线下收到房租</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getOneOrderinfo, updateOneOrderInfo } from "@/api/order";
import { payStateConvert } from "@/publicFunc/infomationProcess";
import { getContractBaseInfo } from "@/api/rentContract";
import { MasterUpdateHouseInfo } from "@/api/house";
import moment from "moment";
import Bus from "../../bus";
export default {
  name: "contract_form",
  data() {
    return {
      billInfo: [],
      BilldialogVisible: false,
      isReceivedRentMoneyConfirm: false,
      isCancelRentMoneyConfirm: false
    };
  },
  methods: {
    show(oid) {
      getOneOrderinfo({ oid: oid }).then(res => {
        this.billInfo = res.data.data;
        console.log(this.billInfo);
      });
      this.BilldialogVisible = true;
    },
    datetimeFormat(t) {
      return moment(t).format("YYYY-MM-DD HH:mm:ss");
    },
    thisPayStateConvert(id) {
      return payStateConvert(id);
    },
    cancelOrderInfo() {
      this.isCancelRentMoneyConfirm = false;
      // 获取房源ID
      getContractBaseInfo(this.billInfo.cId).then(res => {
        console.log(res.data.data);
        // 回退房屋的水电信息
        let housedf = {
          hId: res.data.data.hId,
          hElectricityNumber: this.billInfo.oLastElectricNumber,
          hWaterNumber: this.billInfo.oLastWaterNumber
        };
        MasterUpdateHouseInfo(housedf).then(hres => {
          if (hres.data.data > 0) {
            let df = {
              oId: this.billInfo.oId,
              oPayState: 2
            };
            // 修改账单状态为取消
            updateOneOrderInfo(df).then(res => {
              if (res.data.success == true) {
                this.$message.success("您已主动取消该账单！");
                Bus.$emit("closeBillModal");
              }
              this.BilldialogVisible = false;
            });
          }
        });
      });
    },
    updateOrderInfo() {
      this.isReceivedRentMoneyConfirm = false;

      getContractBaseInfo(this.billInfo.cId).then(res => {
        console.log(res.data.data);
        // 更新房屋的水电信息
        let housedf = {
          hId: res.data.data.hId,
          hElectricityNumber: this.billInfo.oNowElectricNumber,
          hWaterNumber: this.billInfo.oNowWaterNumber
        };
        MasterUpdateHouseInfo(housedf).then(hres => {
          if (hres.data.data > 0) {
            let df = {
              oId: this.billInfo.oId,
              oPayState: 1,
              oPayTime: moment().locale("zh-cn"),
              oPayMethod: 2
            };
            // 修改账单状态为取消
            updateOneOrderInfo(df).then(res => {
              if (res.data.success == true) {
                this.$message.success("您已主动取消该账单！");
                Bus.$emit("closeBillModal");
              }
              this.BilldialogVisible = false;
            });
          }
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.showBill {
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
.conName {
  color: gray;
  font-size: 15px;
}
.content {
  text-align: right;
  padding: 5px 0;
}
</style>>