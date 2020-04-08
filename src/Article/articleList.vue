<template>
  <div id="articlelist">
    <el-backtop>冲</el-backtop>
    <headerBanner />
    <el-container direction="vertical">
      <!-- <el-header style="margin:0px 0;"></el-header> -->
      <el-main style="width:85%;margin:0 auto">
        <el-row :gutter="20">
          <el-col :span="18">
            <el-card>
              <el-input
                v-model="searchKey"
                style="width:80%"
                placeholder="输入标题的关键词"
                prefix-icon="el-icon-search"
              />
              <el-button type="primary" @click="queryList" :loading="searching">查询</el-button>
              <el-button type="plain" @click="futureTips">我也想发表</el-button>

              <div id="articleListDIv" v-if="isSearchFinish==true">
                <div v-for="(item) in articlelist" :key="item.aId">
                  <el-row :gutter="20">
                    <el-col :span="7">
                      <div style="width:100%;height:230px;border-radius:25px;overflow:hidden;">
                        <img
                          style="width:auto;height:115%;"
                          :src="requirePicture(item.aTitlePicPath)"
                        />
                      </div>
                    </el-col>
                    <el-col :span="15">
                      <!-- <el-button type="text" @click="openArticle(item.aId)">
                      <h2 style="line-height:0px;margin:0;padding:0;font-size:25px;margin-top:15px;">
                        {{item.aTitle}}
                      </h2>-->

                      <h2>{{item.aTitle}}</h2>
                      <p style="text-align:left;color:gray;">
                        花笙联系不上李芳非常着急。有人举报张兰兰涉嫌组织暴徒威胁、袭击远方地产，花笙急忙赶到警察局，原来这是潘晓佳联合远方地产一起诬陷张兰兰。
                        花笙决定继续查，要把远方房地产和它背后的黑公关一起找出来。戴猛合成了一段录音，
                        其内容能证明潘晓佳偷了公司设计图给远方地产总经理孙静海，孙总在拿到录音后找潘晓佳求证，
                      </p>
                      <el-tag
                        :color="convertArticleType(item.aTag)"
                      >{{convertArticleInfo(item.aTag)}}</el-tag>
                      <span>
                        <i class="el-icon-time" />
                        {{datetimeConvert(item.aPostTime)}}
                      </span>
                      <span>
                        |
                        <i class="el-icon-user" />
                        {{item.uName}}
                      </span>
                      <el-button
                        @click="openArticle(item.aId)"
                        type="primary"
                        size="small"
                        style="float:right"
                      >查看详情</el-button>
                    </el-col>
                  </el-row>
                  <el-divider />
                </div>
              </div>
              <div v-else>
                <div align="center">
                  <img
                    src="@/img/404PageIcon.gif"
                    align="middle"
                    style="margin:0 auto;width:300px;-webkit-user-drag: none;"
                  />
                </div>
                <h1 align="center">服务器可能在维护中，暂时无法提供数据。</h1>
              </div>
              <el-pagination
                background
                hide-on-single-page
                layout="prev, pager, next"
                :current-page="currentPage"
                @current-change="handleCurrentChange"
                :total="listTotal"
              ></el-pagination>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <img
                src="@/img/articleHeadImg/cute_jmq.jpg"
                style="height:100%;width:100%;overflow:hidden"
              />
              <h3 align="center">欢迎光临chenlx的博客~</h3>
              <h3 align="center">外出务必戴口罩~</h3>
            </el-card>
            <br />
            <el-card>
              <div slot="header" class="clearfix">
                <span>快捷链接</span>
              </div>
              <el-link href="http://chenlx.top">chenlx小天地主页</el-link>
              <br />
              <el-link href="https://brps.chenlx.top">BRPS记账系统</el-link>
              <br />
              <el-link href="#">（未上线）毕设项目：租房网</el-link>
              <br />
              <el-link href="https://www.sbsub.com/data/">银色子弹数据站</el-link>
              <br />
              <p>需要挂上自己的快捷链接请联系邮箱me@chenlx.top。无偿挂链！</p>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
      <el-footer id="foo">
        <footCopy style="color:black;" />
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
      listTotal: 0,
      currentPage: 1,
      articlelist: [],
      searchKey: '',
      isSearchFinish: false,
      searching: false
    }
  },
  components: {
    footCopy,
    headerBanner
  },
  methods: {
    futureTips () {
      this.$alert(
        '该功能需要基于用户模块开发完善后才能开放使用，目前处于策划阶段。在未来，登录账号后可以发表自己的博文。'
      )
    },
    handleCurrentChange (val) {
      this.getArticle(val)
    },
    requirePicture (url) {
      if (url === null || url === '') {
        return require('@/img/loadingDefaultImage.jpg')
      }
      return require('@/img/articleHeadImg/' + url)
    },
    getArticle (pagenumber) {
      let queryDict = {
        pageNum: pagenumber,
        searchKey: this.searchKey
      }
      // if (this.searchKey !== '') {
      //   this.$message.success('查询完成')
      // }
      getArticleList(queryDict).then(res => {
        if (res.data.data != null) {
          this.articlelist = res.data.data
          this.listTotal = res.data.total
          this.currentPage = res.data.pageNum
          this.$nextTick(() => {
            this.isSearchFinish = true
          })
        } else {
        }
      })
      this.$nextTick(() => {
        setTimeout(() => {
          this.searching = false
        }, 1000)
      })
    },
    queryList () {
      this.searching = true
      this.getArticle(1)
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
      // let routeData = this.$router.push({
      this.$router.push({
        name: 'articleDetail',
        query: {
          aid: row
        }
      })
      localStorage.setItem('articleId', JSON.stringify(row)) // 传参：房源hid
      // window.open(routeData.href, '_blank')
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
  background-repeat: no-repeat;
  background-size: 100%;
}
#HeadTitle {
  // text-align: left;
  font-size: 50px;
  color: white;
  padding: 110px 0 0 200px;
}

#mainLayout {
  background-color: white;
  box-shadow: 0 5px 5px black;
  width: 75%;
  // height: 100%;
  margin: 0 auto;
  padding: 50px 50px;
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
#articlelist {
  min-width: 1450px;
  background-color: rgb(233, 233, 233);
  height: auto;
}

#breadGuide {
  margin: 10px 0;
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
