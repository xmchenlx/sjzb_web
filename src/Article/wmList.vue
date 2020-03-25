<template>
  <div id="wmList">
    <headerBanner />
    <el-container direction="vertical">
      <div id="mainLayout">
        <div id="breadGuide">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <el-link href="http://www.chenlx.top" :underline="false">lx的小天地[首页]</el-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>lx接单情况表</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-header style="margin:10px 0;height:10%">
          <h1>lx的接单查询页</h1>
        </el-header>
        <el-main style="height:90%">
          <el-input
            v-model="searchKey"
            style="width:80%"
            placeholder="输入标题的关键词"
            prefix-icon="el-icon-search"
          />
          <el-button type="primary" @click="queryList">查询</el-button>
          <br />
          <br />
          <br />
          <el-row :gutter="10">
            <el-col :span="17">
               <div v-if="isload==true">
            <el-timeline>
              <el-timeline-item
                v-for="(item,index) in tableData"
                :key="index"
                placement="top"
                :timestamp="convertIsAddDate(tableData[index].mStartDate)"
              >
                <el-card style="text-align:left">
                  <h3>{{tableData[index].mTitle}}</h3>
                  <p id="title2nd">
                    <el-tag type="warning">{{convertStatus(tableData[index].mStatus)}}</el-tag>
                    <el-tag>{{tableData[index].mType}}</el-tag>
                    | 制作起讫：{{convertIsAddDate(tableData[index].mStartDate)}} ~ {{convertIsAddDate(tableData[index].mFinishDate)}}
                    | 交付：{{tableData[index].mFrom}}
                  </p>
                  <el-divider></el-divider>
                  <p id="intro">{{convertMIntro(tableData[index].mIntro)}}</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
            </el-col>
            <el-col :span="7">
              <el-card>
                <h3>接单量：666份</h3>
                <h3>制作中：15份</h3>
                <el-divider></el-divider>
                <p>这里是介绍模块。但是写什么东西我还没想好。</p>
                <p>对了，还不能查询哦</p>
                <p>数据也还不完整，以后再搬运</p>
              </el-card>
            </el-col>
          </el-row>

        </el-main>
      </div>
      <el-footer id="foo">
        <footCopy style="color:black;" />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { getWM } from '@/api/wmTable'
import moment from 'moment'
import footCopy from '@/homepage/copyrightFoot'
import headerBanner from './nav/header'

export default {
  data () {
    return {
      article: {
        aId: '',
        aContent: '',
        aPostTime: '',
        aTitle: '',
        aFilePath: '',
        aFileName: '',
        aState: '',
        aReadCount: '',
        aTag: '',
        aTitlePicPath: '',
        uName: ''
      },
      listTotal: 0,
      currentPage: 1,
      searchKey: '',
      tableData: [],
      isload: false
    }
  },
  components: {
    footCopy,
    headerBanner
  },
  methods: {
    getWmList () {
      getWM().then(res => {
        this.$nextTick(() => {
          this.tableData = res.data.data
        })
        this.$forceUpdate()
      })
      this.isload = true
    },
    convertIsAddDate (d) {
      if (d === null) return '未设置'
      return this.dateConvert(d)
    },
    convertStatus (s) {
      if (s === 1) return '策划中'
      else if (s === 2) return '制作中'
      else if (s === 3) return '已完工'
      else if (s === 4) return '√已交付'
      else if (s === 5) return '半成品'
      else if (s === 6) return '×项目放弃'
      else return '未知'
    },
    convertMIntro (p) {
      if (p === null) return '该项目还没有添加介绍'
      return p
    },
    queryList () {},
    convertArticleType (d) {
      if (d === 1) return 'lightblue'
      else if (d === 2) return 'lightgreen'
      else return 'orange'
    },
    convertArticleInfo (d) {
      if (d === 1) return '公告'
      else if (d === 2) return '文章'
      else return '其他'
    },
    datetimeConvert (d) {
      return moment(d).format('YYYY-MM-DD HH:mm:ss')
    },
    dateConvert (d) {
      return moment(d).format('YYYY-MM-DD')
    }
  },
  created: function () {
    this.$nextTick(() => {
      this.getWmList()
    })
    console.log(this.tableData)
  }
}
</script>

<style lang="less" scoped>
#BRPSHead {
  width: 100%;
  height: 350px;
  background-color: white;
  border-bottom-style: solid;
  border-bottom-color: lightblue;
  border-bottom-width: 5px;
  background-repeat: no-repeat;
  background-size: 100%;
}
#HeadTitle {
  // text-align: left;
  font-size: 50px;
  color: white;
  padding: 110px 0 0 200px;
}
#articleDetail {
  background-color: rgb(255, 212, 133);
  background-repeat: repeat;
  width: 100%;
  //   height: 100%;
  margin: 0 auto;
}
#mainLayout {
  background-color: rgb(230, 251, 255);
  width: 100%;
  height: 100%;
  margin: 0 auto;
  //   margin-bottom: 25px;
}
.mainContent {
  //   height: 100%;
  margin: 15px;
  width: 100%;
  font-size: 20px;
  text-indent: 2em;
  line-height: 1.5em;
}
h1 {
  font-size: 36px;
  text-align: center;
}
p {
  text-align: center;
}
#commitDiv {
  margin: 20px 0;
}
#foo {
  border-top-style: solid;
  border-top-color: lightblue;
  border-top-width: 5px;
  background-color: white;
  width: 100%;
  height: 120px;
  color: black;
}

#breadGuide {
  margin: 10px 0;
}

#title2nd {
  text-align: left;
  font-size: 15px;
}

#intro {
  text-align: left;
  font-size: 15px;
}
</style>
<style>
/* // 这里是适配页面文章内容的一些固定样式 */
.contentColorRed {
  color: red;
}
.alignRight {
  text-align: right;
}

.el-table__row:hover {
  color: rgb(0, 132, 255);
  cursor: pointer;
  font-weight: bold;
}
</style>
