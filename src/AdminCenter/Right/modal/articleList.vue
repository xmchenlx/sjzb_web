<template>
  <div id="adminArticleList">
    <!-- <el-card> -->
      <el-input
        v-model="searchKey"
        style="width:80%"
        placeholder="输入标题的关键词"
        prefix-icon="el-icon-search"
      />
      <el-button type="primary" @click="queryList" :loading="searching">查询</el-button>
      <br/>
      <div id="articleListDIv" v-if="isSearchFinish==true">
        <div v-for="(item) in articlelist" :key="item.aId">
          <el-row :gutter="20">
            <el-col :span="3">
              <div style="width:100%;0border-radius:25px;overflow:hidden;">
                <img style="width:115%;height:115%;" :src="requirePicture(item.aTitlePicPath)" />
              </div>
            </el-col>
            <el-col :span="21">

              <h2>{{item.aTitle}}</h2>

              <el-tag >{{convertArticleInfo(item.aTag)}}</el-tag>
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
                icon="el-icon-edit"
              >编辑</el-button>
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
    <!-- </el-card> -->
  </div>
</template>

<script>
import { getArticleList } from '@/api/article'
import moment from 'moment'
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
      try {
        if (url === null || url === '') {
          return require('@/img/loadingDefaultImage.jpg')
        }
        return require('@/img/articleHeadImg/' + url)
      } catch (e) {
        return require('@/img/loadingDefaultImage.jpg')
      }
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
      // this.$router.push({
      //   name: 'articleDetail',
      //   query: {
      //     aid: row
      //   }
      // })
      // localStorage.setItem('articleId', JSON.stringify(row)) // 传参：房源hid
      this.$router.push({
        name: 'editArticle',
        query: {
          aid: row
        }
      })
      // window.open(routeData.href, '_blank')
    }
  },
  created: function () {
    this.getArticle(1)
  }
}
</script>

<style>
</style>
