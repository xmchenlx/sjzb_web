<!-----------------This is lx's Project Named BRPS!^_^-----------------------------------
  lx的小天地下属项目 版权所有(c) 2018 - 2020
  文  件：addModal.vue
  中文名：新增账单表单
  作  者：chenlx | 邮箱：me@chenlx.top
  时  间：2020年07月20日 17:23:29
  描  述： 用于新增一条消费或者收益数据的表单，适配于PC或者手机端;
---------------------------------------------------------------------------------->
<template>
  <div id="addmodal">
    <el-dialog :title="titleName" :visible.sync="isAddModalShow" :width="ModalWidth">
      <el-form
        ref="newRecord"
        :rules="rule"
        :model="newRecord"
        label-position="right"
        label-width="100px"
      >
        <el-form-item label="类型：">
          <el-radio-group v-model="billType" size="medium">
            <el-radio border v-model="billType" label="0">支出</el-radio>
            <el-radio border v-model="billType" label="1">收入</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="变动日期:" prop="bill_date">
          <el-date-picker
            v-model="newRecord.bill_date"
            align="right"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            style="width:80%"
            @change="dateChange"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="变动内容:" prop="content">
          <el-input v-model="newRecord.content" style="width:80%" />
        </el-form-item>
        <el-form-item label="变动金额:" prop="money">
          <!-- <el-input type="money" v-model.number="newRecord.money" style="width:80%" placeholder="【+】正数表示收入，【-】负数表示支出"/> -->
          <el-tooltip class="item" effect="dark" content="请输入金额，不论正负。" placement="top">
            <el-input-number
              v-model="tempRecordMoney"
              :precision="2"
              :step="0.5"
              :min="0"
              :max="99999"
              style="width:80%"
              @keyup.enter.native="insertOneBillInfo"
            ></el-input-number>
          </el-tooltip>
        </el-form-item>

        <el-form-item label="一级类目:">
          <el-select
            v-model="newRecord.type1st"
            filterable
            placeholder="请选择"
            style="width:80%"
            @change="type1stIsChange"
          >
            <el-option
              v-for="item in type1stOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级类目:" prop="type2nd">
          <el-select
            v-model="newRecord.type2nd"
            filterable
            placeholder="请选择"
            style="width:80%"
            @change="type2ndIsChange"
          >
            <el-option
              v-for="item in type2ndOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="多次消费:">
          <el-switch v-model="isAAMoney"></el-switch>
          <el-popover
            title="什么是多次消费？"
            width="150px"
            trigger="hover"
            content="是指相同类型与价格的账单不同的日期进行批量导入。如：每天的公交开销相同，则只需要导入1次公交。将本月的公交次数与单价录入即可完成本月的公交批量导入。"
          >
            <el-link slot="reference" :underline="false">
              <i class="el-icon-question"></i>
            </el-link>
          </el-popover>
        </el-form-item>
        <div id="aaMoney" v-if="isAAMoney===true">
          <el-form-item label="消费次数:">
            <el-input v-model="AACount" style="width:80%" />
          </el-form-item>
          <el-form-item label="递进类型:">
            <el-radio-group v-model="moreStep" size="medium">
              <el-radio-button label="0">1天</el-radio-button>
              <el-radio-button label="1">1个月</el-radio-button>
              <el-radio-button label="2">1年</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </div>
        <el-form-item label="是否优惠:">
          <!-- <el-tooltip content="该选项仅供用户方便计算而设置，提交时优惠的详细数据不会被系统记录，只会收录最后的价格。"> -->
          <el-switch v-model="isDiscount"></el-switch>
          <el-popover
            title="操作提示"
            width="150px"
            trigger="click"
            content="该选项仅供用户方便计算而设置，提交时优惠的详细数据不会被系统记录，只会收录最后的价格。"
          >
            <el-link slot="reference" :underline="false">
              <i class="el-icon-question"></i>
            </el-link>
          </el-popover>
          <!-- </el-tooltip> -->
        </el-form-item>

        <div id="DiscountCalcu" v-if="isDiscount==true">
          <el-form-item label="原总价:">
            <el-input v-model="originPrice" style="width:80%" />
          </el-form-item>
          <el-form-item label="实付价:">
            <el-input v-model="payPrice" style="width:80%" />
          </el-form-item>
          <el-form-item label="优惠比例:">
            <span style="color:red;font-weight:bold">节省整单价格的{{100-fixxiaoshu(disCountPercent*100)}}%</span>
          </el-form-item>
        </div>
        <el-form-item label="额外备注:">
          <el-input v-model="newRecord.note" clearable style="width:80%" />
        </el-form-item>
        <el-form-item style="text-align:right">
          <el-button @click="isAddModalShow = false">取 消</el-button>
          <el-button
            type="primary"
            @click="insertOneBillInfo"
            :loading="isProcess"
            v-if="isEditStatus == false"
            :disabled="isProcessClick"
          >确 定</el-button>
          <el-button
            type="warning"
            @click="updateOneBillInfo"
            :loading="isProcess"
            v-else-if="isEditStatus == true"
            :disabled="isProcessClick"
          >提交更改</el-button>
        </el-form-item>
        <el-form-item label="实际波动:">
          <span style="color:red;font-weight:bold;font-size:27px" v-if="billType == 0">
            <span
              style="font-size:19px;border:1px red solid;border-radius:5px;padding:0 2px 3px 2px;"
            >花</span>
            ￥{{fixxiaoshu(newRecord.money)}}元
          </span>
          <span style="color:green;font-weight:bold;font-size:27px" v-else>
            <span
              style="font-size:19px;border:1px green solid;border-radius:5px;padding:0 2px 3px 2px;"
            >赚</span>
            ￥{{fixxiaoshu(newRecord.money)}}元
          </span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getAllType } from '@/api/type1st'
import { getTypeListByFid } from '@/api/type2nd'
import {
  insertOneRecord,
  searchOneBillInfo,
  updateOneRecord,
  insertMoreRecord
} from '@/api/BillInfo'
import moment from 'moment'
import Bus from '@/bus'
export default {
  data () {
    return {
      isAddModalShow: false,
      newRecord: {
        bill_date: moment(new Date()).format('YYYY-MM-DD'),
        type2nd: '',
        content: '',
        billDate: '',
        money: 0,
        type1st: '',
        note: ''
      },
      ModalWidth: '95%',
      billType: '0', // 类型为支出或收入
      moreStep: 0, // 多条账单插入时他的递进类型，0:按日递进，1：按月递进，2:按年递进
      isDiscount: false, // 如果是直售商品为false，如用优惠券为true
      isAAMoney: false,
      isEditStatus: false, // 模态框是否编辑，否为新增，是为编辑
      payPrice: '',
      originPrice: '',
      isProcess: false,
      disCountPercent: 100,
      isProcessClick: false,
      type1stOptions: [],
      type2ndOptions: [],
      tempRecordMoney: 0,
      titleName: '记录单次新变动',
      AACount: 1,
      rule: {
        bill_date: [{ required: true, message: '请输入日期', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        money: [
          { required: true, message: '请输入金额', trigger: 'blur' }
          // eslint-disable-next-line standard/object-curly-even-spacing
        ],
        type2nd: [{ required: true, message: '请选择类目', trigger: 'change' }]
      },
      pickerOptions: {
        // disabledDate (time) {
        //   return time.getTime() > Date.now()
        // },
        shortcuts: [
          {
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }
        ]
      }
    }
  },
  created: function () {
    this.getType1stList()
    // this.getType2ndList()
  },
  methods: {
    getType1stList () {
      getAllType().then(res => {
        let _this = this
        res.data.data.forEach(function (item, index) {
          _this.type1stOptions.push({
            label: item.type1stName,
            value: item.type1stId
          })
        })
      })
    },
    processType2ndList (t2Id) {
      let _this = this
      getTypeListByFid(t2Id).then(res => {
        _this.type2ndOptions = []
        res.data.data.forEach(function (item, index) {
          _this.type2ndOptions.push({
            label: item.type2ndName,
            value: item.type2ndId
          })
        })
      })
    },
    getType2ndList () {
      let thefid = 0
      this.newRecord.type2nd = ''
      // eslint-disable-next-line eqeqeq
      if (this.newRecord.type1st != '' && this.newRecord.type1st != 0) {
        thefid = this.newRecord.type1st
      }
      this.processType2ndList(thefid)
    },
    fixxiaoshu (n) {
      return n.toFixed(2)
    },
    type1stIsChange () {
      this.getType2ndList()
    },
    type2ndIsChange () {
      // //console.log(this.newRecord.type2nd)
    },
    updateOneBillInfo () {
      if (this.validateIsFilled() === false) {
        this.$message.error('请填写完整信息！')
        return false
      }
      if (this.billType === '0') {
        this.newRecord.money = this.newRecord.money * -1
      }
      this.newRecord.billDate = moment(this.newRecord.bill_date).valueOf()
      updateOneRecord(this.newRecord).then(res => {
        if (res.data.data > 0) {
          this.$message.success('更新成功！')
          this.isAddModalShow = false
        } else {
          this.$message.error('更新异常，请尝试重新提交...')
        }
      })
    },
    validateIsFilled () {
      let status = true
      this.$refs['newRecord'].validate(valid => {
        if (!valid) {
          status = false
        }
      })
      // console.log(status)
      return status
    },
    insertOneBillInfo () {
      // this.newRecord.bill_date = null
      let _this = this
      this.isProcess = true
      if (this.validateIsFilled() === false) {
        this.$message.error('请填写完整信息！')
        this.isProcess = false
        return false
      }
      this.isProcess = true
      this.isProcessClick = true
      // 如果是支出，需要添加负号，收入则维持正数状态

      this.newRecord.money =
        this.billType === '0'
          ? this.newRecord.money * -1
          : this.newRecord.money
      if (this.newRecord.money !== 0) {
        this.newRecord.money = _this.newRecord.money.toFixed(3)
      }

      this.newRecord.billDate = moment(this.newRecord.bill_date).valueOf()
      this.newRecord.userId = parseInt(localStorage.getItem('userId'))
      if (this.isAAMoney === true) {
        insertMoreRecord(_this.newRecord, _this.AACount, _this.moreStep).then(
          res => {
            if (res.data.data > 0) {
              this.$message.success(
                '添加成功。变动项目：' + this.newRecord.content
              )
              let lastDate = this.newRecord.bill_date
              // this.$refs.newRecord.resetFields()
              this.newRecord.content = ''

              this.tempRecordMoney = 0
              // this.newRecord.type1st = ''
              // this.$refs.newRecord.content.focus()
              this.newRecord.bill_date = lastDate
              Bus.$emit('addNewRec', 'success')
            } else {
              this.$message.error('添加异常')
            }
            this.isAddModalShow = false
            this.isProcess = false
            this.isProcessClick = false
            this.$nextTick(() => {
              this.isAddModalShow = true
            })
          }
        )
      } else {
        insertOneRecord(this.newRecord).then(res => {
          if (res.data.data > 0) {
            this.$message.success(
              '添加成功。变动项目：' + this.newRecord.content
            )
            let lastDate = this.newRecord.bill_date
            // this.$refs.newRecord.resetFields()
            this.newRecord.content = ''

            this.tempRecordMoney = 0
            // this.newRecord.type1st = ''
            // this.$refs.newRecord.content.focus()
            this.newRecord.bill_date = lastDate
            Bus.$emit('addNewRec', 'success')
          } else {
            this.$message.error('添加异常')
          }
          this.isAddModalShow = false
          this.isProcess = false
          this.isProcessClick = false
          this.$nextTick(() => {
            this.isAddModalShow = true
          })
        })
      }
    },
    processOptionLabel (typeindex, id) {
      let _this = this
      if (typeindex === '1') {
        for (let i = 0; i < this.type1stOptions.length; i++) {
          if (_this.type1stOptions[i].value === id) {
            _this.newRecord.type1st = _this.type1stOptions[i].label
            break
          }
        }
      } else if (typeindex === '2') {
      }
      return 'finish'
    },
    dateChange (val) {
      console.log(val)
      this.newRecord.bill_date = val
    },
    editBillInfo (bid, isUsePC) {
      let _this = this
      this.isEditStatus = true
      // console.log(this.ModalWidth)
      searchOneBillInfo(bid).then(res => {
        _this.newRecord = res.data.data
        // 填充记录的日期
        // _this.newRecord.bill_date = new Date(res.data.data.billDate)
        _this.$set(_this.newRecord, 'bill_date', res.data.data.billDate)
        // select识别key=>value必须为数值型，需要对传过来的数据进行数值化转义
        _this.newRecord.type1st = Number(_this.newRecord.type1st)
        _this.newRecord.type2nd = Number(_this.newRecord.type2nd)
        // //console.log(_this.newRecord.type1st)
        _this.processType2ndList(_this.newRecord.type1st)

        let money = res.data.data.money
        _this.tempRecordMoney = money > 0 ? money : money * -1
        _this.billType = money > 0 ? '1' : '0'
        _this.titleName = '编辑已有记录'
        // _this.processOptionLabel(1, res.data.data.type1st)
        // _this.type2nd = _this.processOptionLabel(2, res.data.data.type2nd)
        _this.show(isUsePC)
        _this.$forceUpdate()
      })
    },
    show (isUsePC) {
      this.ModalWidth = isUsePC === true ? '30%' : '95%'
      this.isAddModalShow = true
    },
    computedDiscount () {
      if (this.payPrice !== 0 && this.payPrice !== '') {
        this.disCountPercent = this.payPrice / this.originPrice
      } else {
        this.disCountPercent = 1
      }
    },
    computedLastPrice () {
      if (this.isDiscount === false) this.disCountPercent = 1
      else this.computedDiscount()
      this.newRecord.money = this.disCountPercent * this.tempRecordMoney
    }
  },
  watch: {
    originPrice: function () {
      this.computedDiscount()
    },
    payPrice: function () {
      this.computedDiscount()
    },
    disCountPercent: function () {
      this.computedLastPrice()
    },
    tempRecordMoney: function () {
      this.computedLastPrice()
    },
    newRecord: function () {
      this.computedLastPrice()
    },
    isDiscount: function () {
      this.computedLastPrice()
    },
    billType: function () {
      this.newRecord.type2nd = ''

      if (this.billType === '1') {
        this.type2ndOptions = ''
        this.newRecord.type1st = 9
        this.processType2ndList(9)
      } else {
        this.newRecord.type1st = ''
        this.type2ndOptions = ''
      }
    }
  }
}
</script>

<style>
#addmodal {
  width: 100%;
}
</style>
