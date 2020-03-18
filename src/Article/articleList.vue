<template>
  <div id="articlelist">
    <headerBanner/>
      <el-container style="height:100%" direction="vertical">
    <div id="mainLayout">
      <div id="breadGuide">
        <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">BRPS登录页</el-breadcrumb-item>
  <el-breadcrumb-item>社区中心</a></el-breadcrumb-item>
</el-breadcrumb>
      </div>
        <el-header style="margin:10px 0;height:30%">
          <h1>社区文章公告墙</h1>
        </el-header>
        <el-main style="height:70%">
          <el-table
            :data="articlelist"
            stripe
            @row-click="openArticle"
            style="width: 100%">
            <el-table-column
              :formatter="convertArticleType"
              prop="aTag"
              label="类型"
              width="70">
              <template slot-scope="scope">
                <el-tag
                  :color="convertArticleType(scope.row.aTag)"
                >{{convertArticleInfo(scope.row.aTag)}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="aTitle"
              label="标题"
              width="550">
            </el-table-column>
            <el-table-column
              prop="aPostTime"
              label="发布时间"
              width="180">
              <template slot-scope="scope">
            {{datetimeConvert(scope.row.aPostTime)}}
            </template>

            </el-table-column>

            <el-table-column
              prop="uName"
              label="发布人">
            </el-table-column>
          </el-table>
          <div v-html="article.aContent" class="mainContent"></div>
          <el-pagination
          background
          hide-on-single-page
          layout="prev, pager, next"
          :current-page="currentPage"
          :total="listTotal">
        </el-pagination>
        </el-main>
    </div>
    <el-footer id="foo">
      <footCopy style="color:black;"/>
    </el-footer>
      </el-container>
  </div>

</template>

<script>
import { getArticleList } from '@/api/article'
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
      listTotal: '',
      currentPage: '',
      articlelist: [],
      serachKey: ''
    }
  },
  components: {
    footCopy,
    headerBanner
  },
  methods: {
    getArticle (pagenumber) {
      let queryDict = {
        pageNum: pagenumber,
        serachKey: this.serachKey
      }
      getArticleList(queryDict).then(res => {
        this.articlelist = res.data.data
        this.listTotal = res.data.total
        this.currentPage = res.data.pageNum
      })
    },
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
    submitCommit () {
      this.$message.error('评论系统还在建设中...暂时无法发表评论哦')
    },
    // convertArticleType (t) {
    //   if (t === 1) return '[公告]'
    //   else if (t === 2) return '[活动]'
    //   else return '[未知]'
    // },
    openArticle (row) {
      let routeData = this.$router.resolve({
        name: 'articleDetail'
      })
      localStorage.setItem('articleId', JSON.stringify(row.aId)) // 传参：房源hid
      window.open(routeData.href, '_blank')
    }
  },
  created: function () {
    this.getArticle(1)
  }
}
</script>

<style lang="less" scoped>
// * {
//   margin: 0;
//   padding: 0;
//   border: 0;
//   height: 100%;
// }
#BRPSHead {
  width: 100%;
  height: 350px;
  background-color: white;
  border-bottom-style: solid;
  border-bottom-color: lightblue;
  border-bottom-width: 5px;
  background-image: url("../img/BRPS_banner.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
}
#HeadTitle{
    // text-align: left;
    font-size:50px;
    color:white;
    padding: 110px 0 0 200px;
}
#articleDetail {
  background-color: rgb(233, 233, 233);
  background-repeat: repeat;
  width: 100%;
  //   height: 100%;
  margin: 0 auto;
}
#mainLayout {
    background-color: white;
    box-shadow: 0 5px 5px black;
  width: 60%;
  height: 100%;
  margin: 0 auto;
  padding: 0 100px;
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
  height:120px;
  color:black;
}

#breadGuide{
  margin:10px 0;
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

.el-table__row:hover{
  color:rgb(0, 132, 255);
  cursor: pointer;
  font-weight: bold;
}
</style>
