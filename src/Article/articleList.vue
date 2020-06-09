<template>
  <div id="articlelist">
<div style="text-align:center">
  <h1>博客与BRPS在2020年6月有搬迁计划，目前博客暂停访问。还请理解。</h1>
<h2>如需记账请前往<a href="http://brps.chenlx.top">BRPS记账网</a></h2>
<h2>如需静态chenlx前页请前往<a href="http://chenlx.top">chenlx的小天地</a></h2>
</div>
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
      else if (d === 3) return '技术'
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
  // background-color: rgb(233, 233, 233);
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
