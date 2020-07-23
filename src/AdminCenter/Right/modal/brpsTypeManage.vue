<!-----------------This is lx's Project! ^_^--------------------------------------
    lx的小天地下属项目 版权所有(c) 2018 - 2020
    文  件：brpsTypeManage.vue
    中文名：BRPS账单类别管理
    作  者：chenlx | 邮箱：me@chenlx.top
    时  间：2020年07月23日 12:57:29
    描  述： 管理账单的类目信息;
---------------------------------------------------------------------------------->
<template>
  <div id="typemanage" v-loading="isDivLoad" element-loading-text="正在加载">
    <el-row>
      <el-col :span="6" style="height:30rem;overflow:scroll">
        <el-tree
          :data="type1stList"
          show-checkbox
          node-key="id"
          ref="tree"
          :load="loadNode"
          lazy
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
          highlight-current
          @node-click="handleNodeClick"
          :props="defaultProps"
        ></el-tree>
      </el-col>
      <el-col :span="16">
        <div  v-if="isLoadCurrect===true">
          <el-form :model="type2nd" ref="type2nd" :label-position="right" label-width="20%">
            <el-form-item label="选择一级：" prop="typefatherid">
              <el-select placeholder="请选择活动区域" v-model="type2nd.typefatherid">
                <el-option v-for="item in type1stList"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="二级名：" prop="typename">
              <el-input placeholder="输入二级类目的名称" v-model="type2nd.typename"></el-input>
            </el-form-item>
            <el-form-item label="注释："  v-model="type2nd.typecommit">
              <el-input placeholder="对于类目的解释" disabled></el-input>
            </el-form-item>
            <el-form-item size="large">
                <el-button @click="submitChange" type="primary" icon="el-icon-check">保存更改</el-button>
                <el-button @click="cureChange" type="warning" icon="el-icon-brush">清 空</el-button>
                <el-button @click="cureChange" type="danger" icon="el-icon-close">删除类目</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-else>
            <h2 style="text-align:center;color:gray;vertical-align:middle">请从左侧选择...</h2>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getAllType } from '@/api/type1st'
import { getTypeListByFid, updateType2Info } from '@/api/type2nd'

export default {
  data () {
    return {
      type1stList: [],
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'leaf'
      },
      type2nd: {
        typecommit: '',
        typefatherid: '',
        typeid: '',
        typename: ''
      },
      isLoadCurrect: false,
      isDivLoad: true

    }
  },
  methods: {
    getType1stInfo () {
      let _this = this
      _this.isDivLoad = true
      getAllType().then(res => {
        // this.type1stList = res.data.data
        res.data.data.forEach((item, index) => {
          _this.type1stList.push({
            label: item.type1stName,
            value: item.type1stId,
            children: [],
            t1Id: item.type1stId,
            isLeaf: false
          })
        })
      })
      this.$nextTick(() => {
        _this.isDivLoad = false
      })
    },
    handleNodeClick (data) {
      this.type2nd.typefatherid = data.fatherId
      this.type2nd.typeid = data.t2Id
      this.type2nd.typename = data.label
      //   console.log(data)
      let _this = this
      if (data.isLeaf === false) {
        _this.isLoadCurrect = false
      } else {
        _this.isLoadCurrect = true
      }
    },
    allowDrop (draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    submitChange () {
      let _this = this
      let di = {
        type2ndId: this.type2nd.typeid,
        type2ndName: this.type2nd.typename,
        type2ndFatherId: this.type2nd.typefatherid
      }
      updateType2Info(di).then(res => {
        if (res.data.data > 0) {
          this.$message.success('成功了。更改为：' + di.type2ndName)
          this.$router.push({'name': 'welcome'})
          setTimeout(() => {
            this.$router.push({'name': 'brpsTypeManage'})
          }, 150)
        } else {
          this.$message.error('失败了。')
        }
        _this.cureChange()
      })
    //   console.log(di)
    },
    allowDrag (draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1
    },
    loadNode (node, resolve) {
      let _this = this
      var type2Info = []
      this.processType2ndList(node.data.t1Id).then(res => {
        // console.log(res)
        type2Info = res
        // console.log(type2Info)

        resolve(type2Info)
        // _this.isLoadCurrect = true
      }).catch(e => {
        _this.isLoadCurrect = false
        console.log('加载错误')
      })
    },
    cureChange () {
      this.$refs['type2nd'].resetFields()
      this.isLoadCurrect = false
    },
    processType2ndList (t2Id) {
      var tempList = []
      return new Promise((resolve, reject) => {
        getTypeListByFid(t2Id).then(res => {
          res.data.data.forEach(function (item, index) {
            tempList.push({
              label: item.type2ndName,
              t2Id: item.type2ndId,
              fatherId: item.type2ndFatherId,
              leaf: true
            })
          })
          resolve(tempList)
        })
      })
    },
    loadType2ndInfo () {}
  },
  created: function () {
    this.getType1stInfo()
  }
}
</script>

<style>
</style>
