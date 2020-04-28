<template>
  <div id="seeHouseApplicateProcess">
    <el-dialog title="预约看房详情" :visible.sync="isSHFormShow" v-loading="isModalLoad">
      <!-- <router-link target="_blank" :to="{name:'contractDetail'}"> -->
      <!-- <el-button size="big" @click="">查看详细合同书</el-button> -->
      <!-- </router-link> -->
      <h3>预约相关信息：</h3>
      <div class="content">
        <p>
          预约人：
          <span class="importantInfomation">{{SHAInfo.tenantsName}}</span>
        </p>
        <p>
          预约时间：
          <span class="importantInfomation">{{datetimeFormat(SHAInfo.shSeeHouseTime)}}</span>
        </p>
        <p>
          预约人手机：
          <span class="importantInfomation">{{SHAInfo.teantsTel}}</span>
        </p>
        <p>
          预约人留言：
          <span class="importantInfomation">
            <span v-if="SHAInfo.shTenantsMessage != null && SHAInfo.shTenantsMessage != ''">
              {{SHAInfo.shTenantsMessage}}
            </span>
            <span v-else>
              无
            </span>
          </span>
        </p>
        <p>
          看房房屋名：
          <span class="importantInfomation">{{SHAInfo.houseName}}</span>
        </p>
        <p>
          房屋详细地址：
          <span class="importantInfomation">{{SHAInfo.houseDetailAddress}}</span>
        </p>
      </div>

      <h3>房东处理</h3>
      <div class="content">
        <el-form
          ref="MasterProcessForm"
          :model="MasterProcessForm"
          label-position="right"
          label-width="150px"
        >
          <el-form-item label="预约状态处理：" style="width:80%">
            <div v-if="nowProcessState ==0">
              <el-select v-model="MasterProcessForm.shState" placeholder="请选择">
                <el-option
                  v-for="item in seeHouseProcessMap"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div v-else>{{contractStateConvert(MasterProcessForm.shState)}}</div>
          </el-form-item>

          <el-form-item label="房东回执：">
            <el-input
              v-if="nowProcessState ==0"
              type="textarea"
              :rows="4"
              style="width:80%;"
              placeholder="【选填】您可以在处理预约状态时给租客留言，例如：「带上身份证」、「这个时间点我不方便，换其他时间可以吗？」等等"
              v-model="MasterProcessForm.shMasterMessage"
            ></el-input>
            <div v-else>
              <span v-if="MasterProcessForm.shMasterMessage!='' && MasterProcessForm.shMasterMessage!=null">
                {{MasterProcessForm.shMasterMessage}}
              </span>
              <span v-else>无</span>
            </div>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="isSHFormShow = false">关 闭</el-button>
        <el-button type="primary" @click="postSHAProcess" v-if="nowProcessState ==0">提交处理</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getHouseByHid } from "../../../api/house";
import { getUserAuthInfomation } from "../../../api/userVerify";
import { getUserTelephone } from "../../../api/users";
import { convertContractState } from "@/publicFunc/contractInfoConvertProcess";
import {
  getContractList,
  getContractBaseInfo
} from "../../../api/rentContract";
import {
  selectSeeHouseApplicate,
  selectSHADetail,
  MasterAuditSHA,
  sendAppSuccessNotifySMS
} from "../../../api/seeHouseApplication";

import moment from "moment";
import Bus from "../../bus";

export default {
  name: "seeHouseApplicateProcess",
  data() {
    return {
      isSHFormShow: false,
      nowProcessState:0,
      isModalLoad:true,
      seeHouseProcessMap: [
        {
          value: 0,
          label: "待处理"
        },
        {
          value: 1,
          label: "退回预约"
        },
        {
          value: 2,
          label: "通过预约"
        },
        {
          value: 3,
          label: "拒绝预约"
        }
        //   {
        //       value:4,
        //       label:'异常退回'
        //   }
      ],
      SHAInfo: {
        hId: "",
        oMasterId: "",
        oTenantsId: "",
        shId: "",
        shMasterMessage: "",
        shSeeHouseTime: "",
        shState: "",
        shTenantsMessage: "",
        teantsTel: "",
        tenantsName: "",
        houseName: "",
        houseDetailAddress: ""
      },
      MasterProcessForm: {
        shMasterMessage: "",
        shState: "待处理"
      }
    };
  },
  methods: {
    postSHAProcess() {
      let processForm = {
        shId: this.SHAInfo.shId,
        shState: this.MasterProcessForm.shState,
        shMasterMessage: this.MasterProcessForm.shMasterMessage
      };
      MasterAuditSHA(processForm).then(res => {
        if (res.data.success == true) {
          let df={
            // userTel:this.SHAInfo.teantsTel,
            userTel:'13600972872',
            appdate:this.datetimeFormat(this.SHAInfo.shSeeHouseTime)
          }
          sendAppSuccessNotifySMS(df).then( res=>{
            if(res.data.success == true)
              this.$message.success("已短信通知租客");
          })
          this.$message.success("您已提交成功！");
        } else {
          this.$message("提交出现错误...");
        }
        this.isSHFormShow = false;
        Bus.$emit("masterAudit");
      });
    },

    loadContract(shId) {
      selectSHADetail(shId).then(res => {
        this.SHAInfo.hId = res.data.data.hId;
        this.SHAInfo.oMasterId = res.data.data.oMasterId;
        this.SHAInfo.oTenantsId = res.data.data.oTenantsId;
        this.SHAInfo.shId = res.data.data.shId;
        this.MasterProcessForm.shMasterMessage = res.data.data.shMasterMessage;
        this.SHAInfo.shSeeHouseTime = res.data.data.shSeeHouseTime;
        this.nowProcessState = this.MasterProcessForm.shState = res.data.data.shState;
        this.SHAInfo.shTenantsMessage = res.data.data.shTenantsMessage;
        getUserAuthInfomation({ uid: res.data.data.oTenantsId }).then(res => {
          this.SHAInfo.tenantsName = res.data.data.vRealName;
          //   this.contractInfo.teantsIdNumber = res.data.data.vIdCardNumber;
        });
        getUserTelephone(res.data.data.oTenantsId).then(res => {
          this.SHAInfo.teantsTel = res.data.data.uTelephone;
        });
        getHouseByHid({ hid: res.data.data.hId }).then(res => {
          this.SHAInfo.houseName = res.data.data.hName;
          this.SHAInfo.houseDetailAddress = res.data.data.hAddressDetial;
        });
      });
      this.$nextTick(() => {
        this.isSHFormShow = true;
        setTimeout(() => {
          this.isModalLoad = false;
        }, 300);
        
      });
    },
    contractStateConvert(id) {
      return convertContractState(id);
    },
    datetimeFormat(datetime) {
      //处理日期
      let forDatetime = moment(datetime).format("YYYY-MM-DD HH:mm:ss");
      return forDatetime;
    },
    getOneOfTheData(paramName, data) {
      let dict = {
        paramName: paramName,
        data: data
      };
    },
    show(shId) {
      this.loadContract(shId);
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  padding: 10px 10px;
  border: 1px solid gray;
}
.importantInfomation {
  font-weight: bold;
}
</style>>