<template>
  <div id="addArticleModal"  v-loading="loading" element-loading-text="正在上传">

    <el-row :gutter="10">
    <el-col :span="3" >
      <el-select v-model="tagVal" placeholder="文章类别"  style="position:relative;z-index:20000"
      >
    <el-option
      v-for="item in aTag"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      style="position:relative;z-index:20000px"
      >
    </el-option>
  </el-select>
    </el-col>
    <el-col :span="17">
    <el-input v-model="title" placeholder="文章标题,不宜过长" :maxlength="100" style="width:100%" />

    </el-col>
    <el-col :span="4">
    <el-button type="primary" @click="postMyArticle" style="margin-bottom:10px;width:100%">完成发布</el-button>

    </el-col>
    </el-row>
    <br/>
    <wTextArea ref="wTextArea" style="position:relative;z-index:1000"/>

    <!-- <el-button type="primary" @click="test" style="margin-bottom:10px;width:11%">test</el-button> -->
  </div>
</template>

<script>
import { returnTagDict } from '@/dict/articleInfo'
import { addNewArticle } from '@/api/article'
import wTextArea from './nav/wangEditor'
export default {
  data () {
    return {
      title: '',
      aTag: [],
      tagVal: '',
      loading: false
    }
  },
  components: {
    wTextArea
  },
  created: function () {
    this.loadArticleTag()
  },
  methods: {
    test () {
      let a = this.$refs.wTextArea.editorContent
      console.log(a)
    },
    loadArticleTag () {
      this.aTag = returnTagDict()
    },
    postMyArticle () {
      // console.log(this.content)
      let _this = this
      this.loading = true
      this.content = this.$refs.wTextArea.editorContent
      let dat = {
        aTitle: this.title,
        aTag: this.tagVal,
        aContent: this.content.replace('<image src="data:image/jpeg;base64', 'data:image/jpeg;base64'),
        aPostTime: new Date().toLocaleDateString().replace('/', '-').replace('/', '-'),
        uId: sessionStorage.getItem('userId')
      }
      addNewArticle(dat).then(res => {
        if (res.data !== '0') {
          this.$message.success('发布成功！')
          this.content = ''
          this.title = ''
          this.closeCard()
        } else {
          this.$message('有点奇怪诶..等下再尝试发布吧')
        }
        _this.$nextTick(() => {
          _this.loading = false
        })
      })
    },
    closeCard () {
      this.$router.push({path: '/adminCenter/welcome'})
    }
  }
}
</script>

<style lang="less" scoped>
#addArticleModal {
  width: 100%;
  min-height: 500px;
}
</style>
