<template>
  <div id="editArticleModal">
    <el-input v-model="title" placeholder="文章标题" style="width:85%" />
    <el-button type="primary" style="margin-bottom:10px;width:11%">提交更改</el-button>
    <el-tiptap
      v-model="content"
      :extensions="extensions"
      style="min-height:400px"
      placeholder="快来秀一秀你的文采！"
    />
  </div>
</template>

<script>
import { getArticleInfo } from '@/api/article'
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
    loadArticle (aid) {
      getArticleInfo(aid).then(res => {
        this.content = res.data.art.a_content
        this.title = res.data.art.a_title
      })
    }
  }
}
</script>

<style lang="less" scoped>
#editArticleModal {
  width: 100%;
  min-height: 500px;
}
</style>
