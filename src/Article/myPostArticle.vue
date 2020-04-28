<template>
   <div id="myPostArticleList">
                  <div v-if="myArticleList.length === 0" v-loading="isMyArtileLoad">
                    <h1 style="text-align:center">还没有发布任何文章</h1>
                  </div>
                  <div v-else>
                    <div v-for="(item) in myArticleList" :key="item.a_id">
                      <div>
                        <h2>{{item.a_title}}</h2>
                        <p>{{filitTag(item.a_content)}}</p>
                        <span>
                          发布于{{item.a_post_time}}
                        </span>
                        <el-button
                        @click="openArticle(item.a_id)"
                        type="primary"
                        size="small"
                        style="float:right;margin:0 5px"
                      >查看详情</el-button>
                      <el-button type="warning" size="small" style="float:right" @click="updateArticle(item.a_id)">
                        编辑文章
                      </el-button>
                        <el-divider></el-divider>
                      </div>
                    </div>
                  </div>
                </div>
</template>

<script>
// import herderNav from '@/front/nav/header'
// import addArticleModal from '../Article/nav/addArticleModal'
// import collectArticle from '../Article/nav/myCollect'
// import msgBoard from '../Article/nav/MessageBoard'
// import editArticleModal from '../Article/nav/editArticleModal'
import { getMyArticle } from '@/api/article'
export default {
  data () {
    return {
      myArticleList: []

    }
  },
  methods: {
    returnCorrectImgUrl (iu) {
      return require('@/img/' + iu)
    },
    getArticleImage (img) {
      return this.returnCorrectImgUrl('/articleHeadImg/' + img)
    },
    getUserHeadImage () {
      let img = 'userHead/' + sessionStorage.getItem('uHead')
      if (img === null || img === '' || img === 'undefined') {
        img = 'loadingDefaultImage.jpg'
      }
      return this.returnCorrectImgUrl(img)
    },
    handleOpen (key, keyPath) {
      this.menuindex = parseInt(key)
      if (this.menuindex === 2) {
        this.getMyArticleList().then(() => { this.isMyArtileLoad = false })
      }
    },
    filitSP (contentstr) {
      if (contentstr == null) return ''
      return contentstr.replace('\\n', '')
    },
    filitTag (c) {
      let exp = RegExp('<.*>|<\\/.*>|\\t|\\n|\\s', 'g')
      return c.replace(exp, '')
    },
    getMyArticleList () {
      let uid = sessionStorage.getItem('uId')
      // let uid = localStorage.getItem('uid')
      if (uid !== null) {
        getMyArticle({uid: uid}).then(res => {
          this.myArticleList = res.data
        })
      } else {
        this.$message('还没有登录哦！')
        // this.$router.push({path: '/'})
      }
    },
    getPsersonalInfo () {

    },
    updateArticle (row) {
      let _this = this
      console.log(row)
      this.$refs.editArticleModal.loadArticle(row)
      this.$nextTick(() => {
        _this.isUpdateArtModalShow = true
      })
    },
    openArticle (row) {
      // let routeData = this.$router.push({
      this.$router.push({
        name: 'articleDetail',
        query: {
          aid: row
        }
      })
      localStorage.setItem('aid', JSON.stringify(row)) // 传参：房源hid
      // window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style>

</style>
