<template>
<div id="addnewArticlt">
发布文章
<div id="addNewArticleTextArea">
    <quill-editor v-model="content"
    :options="editorOption"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @change="onEditorChange($event)">
   </quill-editor>
</div>
</div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  data () {
    return {
      content: ''
    }
  },
  methods: {
    onEditorBlur (editor) { // 失去焦点事件
    },
    onEditorFocus (editor) { // 获得焦点事件
    },
    onEditorChange ({editor, html, text}) { // 编辑器文本发生变化
      // this.content可以实时获取到当前编辑器内的文本内容
      //console.log(this.content)
    }
  }
}
</script>

<style>
.quill-editor{
    height:100%;
}
.ql-editor{
    height:100%;
}
</style>
