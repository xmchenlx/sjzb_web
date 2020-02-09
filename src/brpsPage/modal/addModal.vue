<template>
  <div id="addmodal">
    <el-dialog title="记录单次新变动" :visible.sync="isAddModalShow" width="30%" :before-close="handleClose">
      <el-form ref="newRecord" :rules="rule" :model="newRecord" >
        <el-form-item   label="变动日期:" prop="bill_date">
          <el-date-picker
            v-model="newRecord.bill_date"
            align="right"
            type="date"

            placeholder="选择日期"
            style="width:80%"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="变动内容:" prop="content">
          <el-input v-model="newRecord.content" style="width:80%" />
        </el-form-item>
        <el-form-item label="变动金额:" prop="money">
          <!-- <el-input type="money" v-model.number="newRecord.money" style="width:80%" placeholder="【+】正数表示收入，【-】负数表示支出"/> -->
          <el-input-number v-model="newRecord.money" :precision="2" :step="0.1" :max="99999" style="width:80%"></el-input-number>
        </el-form-item>

        <el-form-item label="一级类目:">
          <el-select v-model="newRecord.type1st" filterable  placeholder="请选择" style="width:80%" @change="type1stIsChange">
            <el-option
              v-for="item in type1stOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级类目:" prop="type2nd">
          <el-select v-model="newRecord.type2nd" filterable  placeholder="请选择" style="width:80%" @change="type2ndIsChange">
            <el-option
              v-for="item in type2ndOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="额外备注:" >
          <el-input v-model="newRecord.note" style="width:80%"/>
        </el-form-item>
        <el-form-item style="text-align:right">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertOneBillInfo" :loading="isProcess" :disabled="isProcessClick">确 定</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
import { getAllType } from '@/api/type1st'
import { getTypeListByFid } from '@/api/type2nd'
import { insertOneRecord } from '@/api/BillInfo'
import moment from 'moment'
import Bus from '@/bus'
export default {
  data () {
    return {
      isAddModalShow: false,
      newRecord: {
        bill_date: '',
        type2nd: '',
        content: '',
        money: '',
        type1st: '',
        note: ''
      },
      isProcess: false,
      isProcessClick: false,
      type1stOptions: [],
      type2ndOptions: [],

      rule: {
        bill_date: [{ required: true, message: '请输入日期', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        money: [
          { required: true, message: '请输入金额', trigger: 'blur' },
          // eslint-disable-next-line standard/object-curly-even-spacing
          { type: 'float', message: '金额必须为数字值'}
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
    getType2ndList () {
      let thefid = 0
      let _this = this
      this.newRecord.type2nd = ''
      // eslint-disable-next-line eqeqeq
      if (this.newRecord.type1st != '') thefid = this.newRecord.type1st
      getTypeListByFid(thefid).then(res => {
        _this.type2ndOptions = []
        res.data.data.forEach(function (item, index) {
          _this.type2ndOptions.push({
            label: item.type2ndName,
            value: item.type2ndId
          })
        })
      })
    },
    type1stIsChange () {
      this.getType2ndList()
    },
    type2ndIsChange () {
      // console.log(this.newRecord.type2nd)
    },
    insertOneBillInfo () {
      // this.newRecord.bill_date = null
      this.isProcess = true
      this.isProcessClick = true
      this.newRecord.billDate = moment(this.newRecord.bill_date).valueOf()
      insertOneRecord({...this.newRecord}).then(res => {
        if (res.data.data > 0) {
          this.$message.success('添加成功。变动项目：' + this.newRecord.content)
          let lastDate = this.newRecord.bill_date
          this.$refs.newRecord.resetFields()
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
    },
    show () {
      this.isAddModalShow = true
    }
  }
}
</script>

<style>
</style>
