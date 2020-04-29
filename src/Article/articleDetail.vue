<template>
  <div id="articleDetail" >
    <el-backtop ></el-backtop>

    <headerBanner style />
    <div style="width:100%;background-color:rgb(233,233,233)">
      <div id="mainLayout">
        <el-container>
          <el-header style="margin:30px 0 80px 0;">
            <el-page-header @back="goBack" title="返回搜索页" content="文章详情页面">
              |
              <el-link href="http://www.chenlx.top" :underline="false">回到小天地首页</el-link>
            </el-page-header>

            <h1>{{article.aTitle}}</h1>
            <el-divider>
              <i class="el-icon-timer" />
              发布时间：{{datetimeConvert(article.aPostTime)}} |
              <i class="el-icon-user" />
              来源：{{article.uName}} |
              {{article.aReadCount}}次阅读
            </el-divider>
          </el-header>
          <br />
          <br />
          <el-main >
            <div v-html="article.aContent" class="mainContent" ></div>
            <br />
            <el-divider>文章已到底，请在下面开始你的表演</el-divider>
            <div id="commitDiv">
              <el-input
                type="textarea"
                :rows="2"
                :min="2"
                v-model="commitContent"
                placeholder="虽然这是记账系统的公告，但也不是法外之地。您需要了解到，您所说的评论都是需要负责任的哦"
                style="width:90%;float:left;"
              />
              <el-button type="primary" @click="submitCommit" style="height:55px;width:10%">发表评论</el-button>
            </div>
            <div id="commitL">
              <h2 style="color:gray;text-align:center">太难了，现在还没有任何评论</h2>
            </div>
          </el-main>
        </el-container>
      </div>
    </div>
    <div id="foo">
      <footCopy class="footStyle" style="color:black" />
    </div>
  </div>
</template>

<script>
import { getArticleInfo } from '@/api/article'
import moment from 'moment'
import utils from '@/api/util'
import footCopy from '@/homepage/copyrightFoot'
import headerBanner from './nav/header'

export default {
  data () {
    return {
      article: {
        aId: '',
        aContent: 'ERROR_非法访问，无法正确显示内容。',
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
      articleId: '',
      commitContent: '',
      isLoad: true,
      loading: this.$loading({
        lock: true,
        text: '正在加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(255,255,255, 0.7)'
      })
    }
  },
  components: {
    footCopy,
    headerBanner
  },
  methods: {
    getArticle (aid) {
      getArticleInfo({ aId: aid }).then(res => {
        this.article = res.data.data
        this.article.aContent = this.article.aContent.replace('data:image/jpeg;base64', '<image src="data:image/jpeg;base64')
      })
      this.loading.close()
      // this.$nextTick(() => {
      // this.isLoad = false
      // })
    },
    datetimeConvert (d) {
      return moment(d).format('YYYY-MM-DD HH:mm:ss')
    },
    goBack () {
      this.$router.push({ name: 'articleList' })
    },
    submitCommit () {
      this.$message.error('评论系统还在建设中...暂时无法发表评论哦')
    }
  },
  created: function () {
    let aid = localStorage.getItem('articleId')
    let _this = this
    if (aid == null || aid == 'null') {
      // aid = _this.$route.params.aid
      aid = utils.getUrlKey('aid')
    }
    localStorage.setItem('articleId', null)
    // if (this.$route.query.articleId) aid = this.$route.query.articleId
    this.getArticle(aid)
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
  // background-color: rgb(233, 233, 233);
  // background-repeat: repeat;
  width: 100%;
  min-width: 1500px;
  margin: 0 auto;
}
#mainLayout {
  background-color: white;
  box-shadow: 0 5px 5px black;
  width: 68%;
  margin: 0 auto;
  padding: 0 50px;
  //   margin-bottom: 25px;
}
.mainContent {
  margin: 10px;
  width: 100%;
  font-size: 18px;
  text-indent: 2em;
  line-height: 1.5em;
  letter-spacing: 1.5px;
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
.footStyle {
  color: black;
  margin-top: 2%;
}
#foo {
  border-top-style: solid;
  border-top-color: lightblue;
  border-top-width: 5px;
  background-color: white;
  width: 100%;
  padding: 10px 0;
  height: 60px;
  bottom: 0px;
}
.footStyle > #footCopy > a {
  color: black;
}
.footStyle > a :hover {
  color: blue;
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
</style>
