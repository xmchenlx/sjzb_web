<template>
  <div id="billReport">
    <div>
      <el-row>
        <el-col :span="8">
          <div id="billNote">
            <div id="notecontent">
              <h3 style="text-align:center">账单评价</h3>
              <el-row>
                <el-col :span="12">
                  本月消费
                  <br />
                  <span class="price_large redColor">{{reportNote.payTotal}}</span>元
                </el-col>
                <el-col :span="12">
                  当月收入
                  <br />
                  <span class="price_large greenColor">{{reportNote.incomeTotal}}</span>元
                </el-col>
              </el-row>本月破高消费类别：
              <div style="background-color:brown;color:white;width:90%;height:100px">图表图表</div>
              <br />
              <p>
                评价：
                <span class="lineBorder redColor">{{convertEvalText(reportNote.evalIndex)}}</span>
              </p>
              <el-divider />
              提示：{{reportNote.tipText}}
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div id="billSettingdiv">
            <h3>
              关注类别
              <span style="font-size:15px;color:gray;font-weight:400">您可至多设置4项关注</span>
            </h3>
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >{{tag}}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加关注</el-button>
            <h3>阈值自定义</h3>
            <h2>
              消费≤
              <span class=" redColor">18</span>元
              <el-button type="text" icon="el-icon-edit" style="font-size:20px;"/> |

              收入≥
              <span class=" greenColor">18</span>元
              <el-button type="text" icon="el-icon-edit" style="font-size:20px;"/>

            </h2>
            <h3>趋势预估</h3>
            <div>asofSDK告诉大家开始觉得爱神的箭氨基酸开始刚到家噶几感动kg啊iOS的感觉奥斯卡的可视对讲挂科四大金刚爱空间 赶快来见到过可垃圾的看了金士顿国剧盛典飞</div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6"></el-col>
      </el-row>
      <el-divider />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoad: false,
      reportNote: {
        payTotal: 1285,
        incomeTotal: 4569,
        evalIndex: 2,
        tipText:
          '这是一段啊实打实副书记刚开始的 说东街口水电费会计师地方时代峰峻收快递费扣水电费可收到反馈就是口令大家看来是建设大街分开了是分开了是。'
      }
    }
  },
  methods: {
    convertEvalText (index) {
      if (index === 0) {
        return '败家东西'
      } else if (index === 1) {
        return '中规中矩'
      } else if (index === 2) {
        return '持家大佬'
      }
    }
  }
}
</script>

<style lang="less" scoped>
#title_medium {
  font-size: 20px;
}
.price_large {
  font-size: 45px;
  font-weight: bolder;
}
.redColor {
  color: red;
}
.greenColor {
  color: green;
}

#billNote {
  background-image: url("../../img/report_note.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 414px; //690*60%
  height: 532px; //887*60%
  // width: 100%;
  // height: 100%;
}
#notecontent {
  padding: 30px;
  width: 70%;
  margin: 0 auto;
}

.lineBorder {
  font-size: 40px;
  float: left;
  font-weight: bold;
  border: 3px dashed red;
  transform: rotate(-15deg);
  user-select: none;
  position: absolute;
  left: 10%;
  padding: 2px 5px;
  top: 58%;
}

#billSettingdiv {
  width: 90%;
  background-color: rgb(240, 240, 240);
  height: 350px;
  padding: 2px 15px;
  margin-top: 1.5%;
}
</style>
