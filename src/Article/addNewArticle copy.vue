<template>
  <div id="addArticleModal">
    <el-input v-model="title" placeholder="文章标题" style="width:85%" />
    <el-button type="primary" @click="postMyArticle" style="margin-bottom:10px;width:11%">完成发布</el-button>
    <el-tiptap
      v-model="content"
      :extensions="extensions"
      style="min-height:400px"
      placeholder="快来秀一秀你的文采！"
    />
  </div>
</template>

<script>
import { addNewArticle } from '@/api/article'
import {
  // 需要的 extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  Image,
  BulletList,
  OrderedList,
  TextColor,
  Indent,
  CodeBlock,
  HorizontalRule,
  TextAlign
} from 'element-tiptap'
export default {
  data () {
    return {
      // 编辑器的 extensions
      // 它们将会按照你声明的顺序被添加到菜单栏和气泡菜单中
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Image(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline(),
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new TextColor(),
        new Indent(),
        new CodeBlock(),
        new HorizontalRule(),
        new TextAlign()
      ],
      // 编辑器的内容
      content: `
      
    `,
      title: ''
    }
  },
  methods: {
    postMyArticle () {
      console.log(this.content)
      let dat = {
        aTitle: this.title,
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
