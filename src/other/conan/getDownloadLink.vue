<!-----------------This is lx's Project Named BRPS!^_^-----------------------------------
  lx的小天地下属项目 版权所有(c) 2018 - 2020
  文  件：getDownloadLink.vue
  中文名：银色子弹数据站爬虫页
  作  者：chenlx | 邮箱：me@chenlx.top
  时  间：2020年07月20日 17:27:27
  描  述： 用于获取银弹数据站的下载数据用于发布公告;
---------------------------------------------------------------------------------->
<template>
  <div id="getDwonloadLinkDiv">
    <div id="breadGuide">
      <el-breadcrumb separator="→">
        <el-breadcrumb-item>
          <el-link href="http://www.chenlx.top" :underline="false">lx的小天地[首页]</el-link>
        </el-breadcrumb-item>
        <el-breadcrumb-item >
        <el-link href="https://brps.chenlx.top" :underline="false">
        BRPS平台</el-link>
        </el-breadcrumb-item>
        <el-breadcrumb-item>银弹数据站拉取</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h1>银弹数据站信息获取·公告便捷填充</h1>
    <p>你好啊，{{username}}</p>
    <el-button type="primary" @click="getSBSUBJson" :disabled="isShow" :loading="isLoad">从数据站拉取最新数据</el-button>
    <div id="loadingTips" v-if="isLoad==true" style="margin:0 auto;text-align:center">
      <img :src="imgurlProcess()" style="width:400px;" />
      <h2>
        正在从数据站拉取数据。
        <br />因为数据较多，请耐心等待...
      </h2>
      <p>如果拉取失败会给予提示，请不要刷新页面。</p>
      <el-divider></el-divider>
    </div>
    <div v-if="finalData!=null">
      <el-table :data="finalData" style="width: 100%">
        <el-table-column prop="tvId" label="集数" width="180"></el-table-column>
        <el-table-column prop="tvDate" label="放送日期" width="180"></el-table-column>
        <el-table-column prop="tvTitle" label="标题"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="processThisNotify(scope.$index)">获取这条公告</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="20">
        <el-input
          type="textarea"
          readonly
          placeholder="选择剧集后文本框自动填充公告内容"
          v-model="finalText"
          :rows="10"
          id="previewText"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-button
          type="primary"
          class="btn"
          @click="copyText"
          data-clipboard-target="#previewText"
        >复制公告</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script src="dist/clipboard.min.js"></script>
<script>
import Clipboard from "clipboard";
import { sbsubJson } from "@/api/Users";
export default {
  data() {
    return {
      jsonUrl: "https://www.sbsub.com/data/assets/data.json",
      tableData: [],
      finalData: null,
      isLoad: false,
      img404name: "404PageIcon.gif",
      finalText: "",
      type: "TV",
      pullTimes: 0,
      isShow: false,
      username:localStorage.getItem('uName')
    };
  },
  methods: {
    imgurlProcess() {
      return require("@/img/" + this.img404name);
    },
    processLast7WeeksTV() {
      let _this = this;
      this.finalData = [];
      for (let i = 0; i < 7; i++) {
        let currentL = Object.keys(_this.tableData).length - i;
        _this.finalData.push({
          tvId: currentL,
          tvDate: _this.tableData[currentL][3],
          tvTitle: _this.tableData[currentL][1],
          tvLink: _this.tableData[currentL][7]["WEBRIP"]
        });
      }
    },
    getSBSUBJson() {
      let _this = this;

      if (++_this.pullTimes > 1) {
        _this.$alert(
          "您似乎拉取了太多次数据。为了减少对数据站和服务器的请求压力，本次刷新已被禁止。数据短时间内不会有太大的更新，请您稍后再打开页面查看数据",
          "操作被阻止"
        );
        _this.isShow = true;
        _this.isLoad = false;
        return false;
      }
      this.isLoad = true;
      sbsubJson().then(res => {
        _this.tableData = res.data.data[4];
        _this.isLoad = false;
        _this.processLast7WeeksTV();
      });
      //   this.tableData = require(this.jsonUrl)
    },
    copyText() {
      let _this = this;
      let clipboard = new Clipboard(".btn");
      this.$message.success("已复制到剪贴板");
    },
    processThisNotify(index) {
      this.finalText =
        "银色子弹字幕组·" +
        this.type +
        "第" +
        this.finalData[index].tvId +
        "集" +
        this.finalData[index].tvTitle;
      this.finalText += "\r\n放送日期：" + this.finalData[index].tvDate;
      for (let i = 0; i < this.finalData[index].tvLink.length; i++) {
        this.finalText +=
          "\r\n※※※" +
          this.finalData[index].tvLink[i][0] +
          "的" +
          this.finalData[index].tvLink[i][1] +
          "磁力链：";
        this.finalText += "\r\n" + this.finalData[index].tvLink[i][2];
        this.finalText += "\r\n";
      }
      this.finalText += "\r\n\r\n-------------------------------------\r\n";
      this.finalText +=
        "本数据来源于银色子弹数据站（https://www.sbsub.com/data/)。字幕著作权归属银色子弹©SBSUB。";
    }
  }
};
</script>

<style scoped>

#breadGuide{
    margin-left: 50px;
    margin-top: 20px;
}

#getDwonloadLinkDiv{
    margin: 0 auto;
}
</style>
