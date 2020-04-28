
<template>
  <div id="myHouseDetail">
    <el-dialog title="房源详细信息编辑" :visible.sync="isHouseFormShow">
      <el-form
        ref="HouseDetailForm"
        :model="HouseDetailForm"
        label-position="right"
        label-width="150px"
        v-loading="isLoad"
        element-loading-text="数据正在骑马来的路上"
      >
        <el-steps :active="contentactive" finish-status="success" style="margin-bottom:30px;">
          <el-step title="大概信息"></el-step>
          <el-step title="详细信息"></el-step>
          <el-step title="辅助介绍"></el-step>
        </el-steps>
        <transition name="el-zoom-in-center">
          <div id="detailcontent" v-show="divshowanimate">
            <!-- div第一部分 -->
            <div id="con1" v-if="this.contentactive==0">
              <el-input style="width:80%;display:none;" v-model="HouseDetailForm.hId"></el-input>
              <el-form-item label="房源介绍标题：">
                <el-tooltip
                  content="这里将展示到搜索房源界面的标题。建议容纳更多的关键字以便让用户能更容易的搜索到您的房源。"
                  placement="right-start"
                >
                  <el-input
                    style="width:80%;"
                    placeholder="介绍的标题。建议容纳更多的关键字以便让用户能更容易的搜索到您的房源"
                    v-model="HouseDetailForm.hName"
                  ></el-input>
                </el-tooltip>
              </el-form-item>

              <el-form-item label="上架状态：">
                <el-select
                  filterable
                  v-model="HouseDetailForm.hRentState"
                  @change="getForCity"
                  placeholder="上架状态"
                  style="width:80%"
                >
                  <el-option
                    v-for="item in houseRentState"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="审核状态：">
                <el-select
                  filterable
                  v-model="HouseDetailForm.hAuditState"
                  @change="getForCity"
                  placeholder="上架状态"
                  style="width:80%"
                  disabled
                >
                  <el-option
                    v-for="item in houseAuditState"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="房源楼层：">
                房源在第
                <el-input-number
                  v-model="HouseDetailForm.hHouseFloor"
                  :min="1"
                  :max="162"
                  label="选择房源所在的楼层"
                ></el-input-number>层
              </el-form-item>

              <el-form-item label="房租定价：">
                每个月房租定价为人民币￥
                <el-input-number v-model="HouseDetailForm.hRentPrice" :min="1" label="输入月租金"></el-input-number>元整
              </el-form-item>

              <el-form-item label="房源面积：">
                <el-input-number v-model="HouseDetailForm.hAreaNumber" :min="1" label="输入房源面积"></el-input-number>m²
              </el-form-item>
            </div>

            <!-- div第一部分结束 -->

            <!-- div第二部分结束 -->
            <div id="con2" v-else-if="this.contentactive==1">
              <el-form-item label="坐落地区：" style="width:80%">
                <el-select
                  filterable
                  v-model="provincedId"
                  @change="getForCity"
                  placeholder="省或直辖市"
                  style="width:32%;padding:0 5px 0 0 ;"
                >
                  <el-option
                    v-for="item in chinaProvince"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>

                <el-select
                  filterable
                  v-model="cityId"
                  @change="getForCityArea"
                  placeholder="市/县"
                  style="width:32%;padding:0 5px 0 0 ;"
                >
                  <el-option
                    v-for="item in chinaCity"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>

                <el-select
                  filterable
                  v-model="HouseDetailForm.hAddressCity"
                  placeholder="隶属县或区"
                  style="width:33%"
                >
                  <el-option
                    v-for="item in chinaCityArea"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="详细地址：">
                <el-tooltip
                  content="此信息不会展示在网站首页，当您拉起合同时，信息才会显示在合同的内容里作为法律约束的依据。"
                  placement="right-start"
                >
                  <el-input
                    style="width:80%;"
                    content="Top Left 提示文字"
                    placeholder="请填写详细地址，涉及门牌号等。此信息不会展示在网站首页，当您拉起合同时，信息才会显示在合同的内容里作为法律约束的依据。"
                    v-model="HouseDetailForm.hAddressDetail"
                  ></el-input>
                </el-tooltip>
              </el-form-item>

              <el-form-item label="房屋户型：">
                <el-tooltip
                  content="此条数据请按照房源的房间条件如实填写，其余条件请写进房源介绍。（如客厅、浴室卫生间等）"
                  placement="right-start"
                >
                  <el-select
                    filterable
                    v-model="HouseDetailForm.hRoomType"
                    @change="getForCity"
                    placeholder="房屋户型"
                    style="width:80%"
                  >
                    <el-option
                      v-for="item in houseType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-tooltip>
              </el-form-item>

              <el-form-item label="押付类型：" prop="hPayType">
                <el-select v-model="HouseDetailForm.hPayType" placeholder="支付类型" style="width:80%">
                  <el-option
                    v-for="item in hPayTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="装修程度：">
                <el-select
                  v-model="HouseDetailForm.hDecorateSituation"
                  placeholder="装修程度："
                  style="width:80%"
                >
                  <el-option
                    v-for="item in decorationList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="房屋水表读数：">
                <el-tooltip
                  content="请核对好房间的初始水表读数。读数将用作账单生成用途。在房源被租赁期间，除了发起账单，读数无法干预修改。"
                  placement="right-start"
                >
                  <el-input-number v-model="HouseDetailForm.hWaterNumber" :min="0" label="水表读数"></el-input-number>
                </el-tooltip>
              </el-form-item>

              <el-form-item label="房屋电表读数：">
                <el-tooltip
                  content="请核对好房间的初始电表读数。读数将用作账单生成用途。在房源被租赁期间，除了发起账单，读数无法干预修改。"
                  placement="right-start"
                >
                  <el-input-number
                    v-model="HouseDetailForm.hElectricityNumber"
                    :min="0"
                    label="电表读数"
                  ></el-input-number>
                </el-tooltip>
              </el-form-item>
            </div>
            <!-- div第二部分结束 -->

            <!-- div第三部分 -->
            <div id="con3" v-else-if="this.contentactive==2">
              <el-form-item label="介绍图片：">
                <el-dialog :visible.sync="houseImageVisible">
                  <!-- 预览图片 -->
                  <img width="100%" :src="HouseDetailForm.houseImageUrl" alt />
                </el-dialog>
                <!-- 上传图片 -->
                <el-upload
                  action="house/addHouseImage"
                  list-type="picture-card"
                  :file-list="houseImageUrlList"
                  :on-preview="handleHousePictureCardPreview"
                  :on-remove="handleHousePictureRemove"
                  :on-success="handleHousePictureSuccess"
                  accept=".jpg, .jpeg, .png, .gif"
                  :limit="5"
                >
                  <!-- show-file-list="true" -->

                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label="房源介绍：">
                <el-input
                  type="textarea"
                  :rows="4"
                  style="width:80%;"
                  placeholder="用一段话来介绍自己的房源，可以包括附近的交通、商圈、房源信息优势等等。"
                  v-model="HouseDetailForm.hHoustInformation"
                ></el-input>
              </el-form-item>
            </div>
            <!-- div第三部分结束 -->
          </div>
        </transition>
      </el-form>

      <!-- </div> -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="isHouseFormShow = false">关 闭</el-button>
        <el-button @click="modalContentProcessPre" :disabled="isBtnPreEnabled">查看上一部分</el-button>
        <el-button type="primary" @click="modalContentProcessNext" :disabled="isBtnNextEnabled">
          <i :class="isPostInfo" />
          {{btnName}}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import {
  processImageList,
  getCorrectImgName,
  processCorrectImageList,
  requirePathToimg
} from "@/publicFunc/houseImageProcess";

import { getCityInfo, getCityInfoByCbid } from "@/api/city";
import { getHouseByHid, MasterUpdateHouseInfo } from "@/api/house";
import { getUserAuthInfomation } from "@/api/userVerify";
import { getUserTelephone } from "@/api/users";
import { getContractList, getContractBaseInfo } from "@/api/rentContract";
import {
  selectSeeHouseApplicate,
  selectSHADetail,
  MasterAuditSHA
} from "@/api/seeHouseApplication";

import moment from "moment";
import Bus from "../../bus";

export default {
  name: "myHouseDetail",
  data() {
    return {
      divshowanimate: false, //展示过渡动画
      isBtnPreEnabled: true, //查看上一部分的按钮是否禁用
      isBtnNextEnabled: false,
      isHouseImageBeenProcess: false,
      isPostInfo: "", //提交信息时的加载icon
      contentactive: 0, //展示第几部分的内容
      btnName: "查看下一部分", //查看下一部分内容&提交按钮的按钮显示内容
      isLoad: true,
      houseImageVisible: false,
      isHouseFormShow: false,
      HouseDetailForm: {
        hId: "",
        hName: "",
        hRentState: "", //租赁状态
        hAuditState: "", //审核状态
        hAddressCity: "", //城区代码
        hAddressDetail: "",
        hHouseFloor: 1,
        hRentPrice: "",
        hAreaNumber: "",
        hHoustInformation: "",
        hElectricityNumber: "",
        hWaterNumber: "",
        hDecorateSituation: "",
        hRoomType: "",
        hPayType: ""
      },
      houseImageUrl: "", //房源图片
      houseImageUrlList: [],
      provincedId: "", //省份ID
      cityId: "", //城市ID
      cityAreaId: "", //区级ID
      chinaProvince: [],
      chinaCity: [],
      chinaCityArea: [],
      decorationList: [
        {
          value: 0,
          label: "简装"
        },
        {
          value: 1,
          label: "普通装修"
        },
        {
          value: 2,
          label: "中档装修"
        },
        {
          value: 3,
          label: "中高档装修"
        },
        {
          value: 4,
          label: "豪华装修"
        }
      ],
      houseType: [
        {
          value: 0,
          label: "一居房"
        },
        {
          value: 1,
          label: "二居房"
        },
        {
          value: 2,
          label: "三居房"
        },
        {
          value: 3,
          label: "四居房"
        },
        {
          value: 4,
          label: "五居房及以上"
        }
      ],
      houseRentState: [
        {
          value: 0,
          label: "未租赁"
        },
        {
          value: 1,
          label: "已租赁",
          disabled: true
        },
        {
          value: 2,
          label: "装修中"
        }
      ],
      houseAuditState: [
        {
          value: 0,
          label: "待审核"
        },
        {
          value: 1,
          label: "审核通过"
        },
        {
          value: 2,
          label: "已退回"
        },
        {
          value: 3,
          label: "被下架"
        }
      ],
      hPayTypeList: [
        {
          value: 0,
          label: "押一付一"
        },
        {
          value: 1,
          label: "押一付二"
        },
        {
          value: 2,
          label: "押一付三"
        },
        {
          value: 3,
          label: "押三付三"
        },
        {
          value: 4,
          label: "私下协定"
        }
      ],
      uploadImgList: []
    };
  },
  methods: {
    postHouseEditInfo(formdata) {
      this.isPostInfo = "el-icon-loading";
      MasterUpdateHouseInfo(formdata).then(res => {
        if (res.data.success == true) {
          Bus.$emit("masterUpdate");
          this.$message.success("您已提交成功！");
        } else {
          this.$message("提交出现错误...");
        }
        this.isPostInfo = "";
        this.isHouseFormShow = false;
        // Bus.$emit("masterAudit");
      });
    },
    modalContentProcessNext() {
      //花里胡哨的部分
      if (this.contentactive != 2) {
        this.divshowanimate = false;
        setTimeout(() => {
          this.divshowanimate = true;
        }, 200);
        // this.$nextTick((this.divshowanimate = false)).then(a => {
        //   setTimeout(() => {
        //     this.$nextTick((this.divshowanimate = true));
        //   }, 200);
        // });
      }
      //切换模态框的内容（下一步）
      if (this.contentactive == 2) {
        let finalToSqlImgList = "";
        for (let i = 0; i < this.uploadImgList.length; i++) {
          finalToSqlImgList += this.uploadImgList[i];
          if (i != this.uploadImgList.length - 1) {
            finalToSqlImgList += ";";
          }
        }
        // 提交信息操作
        let putformdata = {
          hId: this.HouseDetailForm.hId,
          hName: this.HouseDetailForm.hName,
          hRentState: this.HouseDetailForm.hRentState,
          hAuditState: this.HouseDetailForm.hAuditState,
          hAddressCity: this.HouseDetailForm.hAddressCity,
          hAddressDetial: this.HouseDetailForm.hAddressDetail,
          hHouseFloor: this.HouseDetailForm.hHouseFloor,
          hHoustInformation: this.HouseDetailForm.hHoustInformation,
          hRentPrice: this.HouseDetailForm.hRentPrice,
          hImage: finalToSqlImgList,
          hWaterNumber: this.HouseDetailForm.hWaterNumber,
          hElectricityNumber: this.HouseDetailForm.hElectricityNumber,
          hAreaNumber: this.HouseDetailForm.hAreaNumber,
          hRoomType: this.HouseDetailForm.hRoomType,
          hPayType: this.HouseDetailForm.hPayType,
          hDecorateSituation: this.HouseDetailForm.hDecorateSituation
        };
        // if (this.isHouseImageBeenProcess == false) {
        //   console.log("图片没有更改");
        //   putformdata.hImage = processCorrectImageList(this.houseImageUrlList);
        // }
        this.postHouseEditInfo(putformdata);

        // this.$message("提交成功。active=" + this.contentactive);
        return false;
      }
      if (++this.contentactive == 2) {
        if (this.HouseDetailForm.hRentState == 1) {
          this.isBtnNextEnabled = true;
          this.btnName = "租赁期间无法编辑房源信息";
        } else {
          this.btnName = "提交房源信息编辑";
        }

        return false;
      } else {
        this.btnName = "查看下一部分";

        this.isBtnPreEnabled = false;
      }
    },
    modalContentProcessPre() {
      //花里胡哨的部分
      this.isBtnNextEnabled = false;
      this.divshowanimate = false;
      setTimeout(() => {
        this.divshowanimate = true;
      }, 200);
      //切换模态框的内容（下一步）
      if (--this.contentactive == 0) {
        this.isBtnPreEnabled = true;
        return false;
      } else {
        this.btnName = "查看下一部分";
        this.isBtnPreEnabled = false;
      }
    },
    loadCityforSel(id) {
      //加载城市的下拉菜单内容（通过parentI进行寻找）
      let templist = [];
      getCityInfo(id).then(res => {
        for (let i = 0; i < res.data.data.length; i++) {
          let info = {
            label: res.data.data[i].cbName,
            value: res.data.data[i].cbId
          };
          templist.push(info);
        }
      });
      return templist;
    },
    loadCityforISSel(cbId) {
      // 区级变量
      let parentIdOfCityAreaId;
      let cbNameOfCityAreaId;
      // 市级变量
      let parentIdOfCityId;
      let cbNameOfCityId;
      // 省级变量
      let parentIdOfProvincedId;
      let cbNameOfProvinced;

      // 查询已选择的省市区并显示在下拉框input中
      getCityInfoByCbid(cbId).then(res => {
        //查询ID的城市信息，获取parentid
        parentIdOfCityAreaId = res.data.data.cbParentId;
        cbNameOfCityAreaId = res.data.data.cbName;
        this.cityAreaId = cbNameOfCityAreaId;
        // 同时加载【区域】下拉列表
        this.chinaCityArea = this.loadCityforSel(parentIdOfCityAreaId);
        this.HouseDetailForm.hAddressCity = cbId;
        // console.log("cbid=" + this.HouseDetailForm.hAddressCity);

        //根据区变量，查城市变量
        // this.$nextTick(() => {
        getCityInfoByCbid(parentIdOfCityAreaId).then(res => {
          //查询ID的城市信息，获取parentid
          parentIdOfCityId = res.data.data.cbParentId;
          cbNameOfCityId = res.data.data.cbName;
          this.cityId = cbNameOfCityId;
          // 同时加载【城市】下拉列表
          this.chinaCity = this.loadCityforSel(parentIdOfCityId);

          // 根据城市变量，查询省变量
          this.$nextTick(() => {
            getCityInfoByCbid(parentIdOfCityId).then(res => {
              //查询ID的城市信息，获取parentid
              parentIdOfProvincedId = res.data.data.cbParentId;
              cbNameOfProvinced = res.data.data.cbName;
              this.provincedId = cbNameOfProvinced;
              this.isLoad = false;
            });
          });
        });
        // });
      });
    },
    loadContract(hId) {
      this.chinaProvince = this.loadCityforSel(0);
      // 加载房源的详情信息
      getHouseByHid({ hid: hId }).then(res => {
        this.HouseDetailForm.hId = res.data.data.hId;
        this.HouseDetailForm.hName = res.data.data.hName;
        this.HouseDetailForm.hRentState = res.data.data.hRentState;
        this.HouseDetailForm.hAuditState = res.data.data.hAuditState;
        // this.cityAreaId = res.data.data.hAddressCity;
        this.HouseDetailForm.hAddressDetail = res.data.data.hAddressDetial;
        this.HouseDetailForm.hHouseFloor = res.data.data.hHouseFloor;
        this.HouseDetailForm.hRentPrice = res.data.data.hRentPrice;
        this.HouseDetailForm.hAreaNumber = res.data.data.hAreaNumber;
        this.HouseDetailForm.hRoomType = res.data.data.hRoomType;
        this.HouseDetailForm.hPayType = res.data.data.hPayType;
        this.HouseDetailForm.hDecorateSituation =
          res.data.data.hDecorateSituation;
        this.HouseDetailForm.hHoustInformation =
          res.data.data.hHoustInformation;
        this.HouseDetailForm.hWaterNumber = res.data.data.hWaterNumber;
        this.HouseDetailForm.hElectricityNumber =
          res.data.data.hElectricityNumber;

        // 加载省市区下拉框的数据
        this.loadCityforISSel(res.data.data.hAddressCity);
        // 处理房源图片并加载
        let tempImgList = [];
        if (res.data.data.hImage != null && res.data.data.hImage != "") {
          tempImgList = processImageList(res.data.data.hImage); //数据库的图片字段还原成数组并拼接成完整的相对路径
          console.log(tempImgList);
          let tempImagelist = res.data.data.hImage.split(";");
          for (let i = 0; i < tempImgList.length; i++) {
            //循环组成组件可接受的变量类型（字段名称，图片地址）
            tempImgList[i] = { name: i, url: tempImgList[i] };
            this.uploadImgList.push(tempImagelist[i]);
          }
        }
        //传递给组件
        this.houseImageUrlList = tempImgList;
        console.log("加载的图片列表");
        console.log(tempImgList);
      });
      // this.$nextTick(() => {
      // getContractBaseInfo(cid).then
      this.isHouseFormShow = true;
      this.divshowanimate = true;
      // });
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
    getForCity() {
      //选择省后，获取所属市的信息
      this.chinaCity = this.loadCityforSel(this.provincedId);
      this.cityId = "";
      this.cityAreaId = "";
      this.HouseDetailForm.hAddressCity = "";
    },
    getForCityArea() {
      //选择市后，获取所属的区信息
      this.chinaCityArea = this.loadCityforSel(this.cityId);
      this.cityAreaId = "";
      this.HouseDetailForm.hAddressCity = "";
    },
    handleHousePictureCardPreview(file) {
      // 预览图片
      this.HouseDetailForm.houseImageUrl = file.url;
      this.houseImageVisible = true;
    },
    handleHousePictureRemove(file, fileList) {
      // 移除图片
      console.log(file);
      console.log(fileList);
      //  this.isHouseImageBeenProcess=true;
      for (let i = 0; i < this.uploadImgList.length; i++) {
        if (getCorrectImgName(file.url) === this.uploadImgList[i]) {
          this.uploadImgList.splice(i, 1);
          break;
        }
      }
      console.log("现在图片列表：");
      console.log(this.uploadImgList);
    },
    handleHousePictureError(err, file, fileList) {
      console.log(err);
    },
    handleHousePictureSuccess(res, file) {
      console.log("res=a")
      console.log(res);
      // setTimeout(() => {
      //   this.$nextTick(() => {
      //     this.isHouseFormShow = true;
      //     let n = new Object();
      //     let tempurl = require("../../../img/houseInfo/" + file.response.data);
      //     n = {
      //       name: this.uploadImgList.length,
      //       url: file.response.data,
      //       status:"success",
      //       uid:file.uid
      //     };
          this.houseImageUrlList.push({name:this.uploadImgList.length, url: requirePathToimg(res.data)});
      //     //   console.log("file=");
      //     // console.log(response);
      //     // console.log("加载新图片前list:");
          console.log(this.houseImageUrlList);
      //     // console.log("加载后")
      //     // let a=requirePathToimg(file.response.data);
      //     // this.houseImageUrlList.push(
      //     //   {
      //     //     uid:file.uid,
      //     //     name: this.uploadImgList.length,
      //     //     status:'success',
      //     //     url:requirePathToimg(file.response.data )
      //     //     }
      //     //   // file
      //     // let  st = require("@/img/houseInfo/" + file.response.data);
      //     //   console.log(st);
      //     //   let nst = new Object();
      //     //   nst.name = this.uploadImgList.length;
      //     //   nst.url = st;
      //     // this.houseImageUrlList.push(nst);
      //     //    this.$forceUpdate();
      //     //   );

      //     console.log(this.houseImageUrlList);
      //   });
      // }, 1000);
      // console.log(requirePathToimg(file.response.data));
      // this.uploadImgList.push(file.response.data);
      // console.log("现在图片列表：");
      // // console.log(this.uploadImgList);
      // console.log(this.houseImageUrlList);
      // // console.log(file);
    },
    show(hId) {
      this.isLoad = true;
      this.contentactive = 0;
      this.btnName = "查看下一部分";
      this.isBtnPreEnabled = true;
      this.isBtnNextEnabled = false;
      this.loadContract(hId);
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
</style>