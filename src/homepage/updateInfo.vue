<!-----------------This is lx's Project Named BRPS!^_^-----------------------------------
  lx的小天地下属项目 版权所有(c) 2018 - 2020
  文  件：updateInfo.vue
  中文名：开发日志
  作  者：chenlx | 邮箱：me@chenlx.top
  时  间：2020年07月20日 17:18:41
  描  述： 用于更新和记录开发的信息和时间节点;
---------------------------------------------------------------------------------->
<template>
  <div id="updateinfo">
    <h2 style="text-align:center">更新日志</h2>
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in udata"
        :key="index"
        :timestamp="item.date"
      >{{item.content}}</el-timeline-item>
    </el-timeline>
    <el-divider>已经到底了</el-divider>
  </div>
</template>

<script>
export default {
  data () {
    return {
      udata: [
        {
          date: '2020-09-17',
          content: '【BRPS】修复更改账单时日期无法编辑的问题'
        },
        {
          date: '2020-09-08',
          content: '【主站】新增高辅3班教师节小礼物彩蛋页面；【博客】新增有效访问量统计功能；优化图片的显示方式（cover）；文章详情页面加入封面作为标题背景'
        },
        {
          date: '2020-07-20',
          content: '【BRPS】加入登录记录查询功能，如果有之前登录过BRPS没有退出账户，则会自动尝试登录。【整体】更换CDN加速源。【公告】7月后将前往北京出差，维护效率会比之前来的慢。'
        },
        {
          date: '2020-07-15',
          content:
            '【BRPS】在手机和PC都分别载入账单报告功能，引入图表功能进行实际测试。'
        },
        {
          date: '2020-07-10',
          content:
            '【整体】新接入短信模块；进行了其他的一些小更新；后台新增和优化了代码。【BRPS】注册功能对接短信模块实现验证码校验；优化了一些显示效果。'
        },
        {
          date: '2020-06-29',
          content:
            '【BRPS】加入网站动态设置功能，用于发布临时公告、状态设定等。使用插件更改为cdn获取，这样网站加载更快。'
        },
        {
          date: '2020-06-24',
          content: '【博客】修复分页存在的问题；发布时间由后台捕获并存储'
        },
        {
          date: '2020-06-19',
          content:
            '【主站】新增“廿廿不忘软工班毕业纪念留言墙”毕业专题，载入匿名评论模块实现留言效果。外链七牛云BGM与bilibili视频。优化显示效果。'
        },
        {
          date: '2020-06-09',
          content:
            '【整体】分割博客与记账项目，修复因为传输加密而导致空秘钥可以登录的问题。'
        },
        {
          date: '2020-05-26',
          content:
            '【BRPS】新增“账单报告”模块，计划载入开销预测、开销阈值限制、报表分析等功能。'
        },
        {
          date: '2020-05-21',
          content:
            '【整体】更新密码传输机制，更改为对称秘钥传输。接入七牛云短信，后续将完善短信业务。'
        },
        {
          date: '2020-03-18',
          content:
            '【整体】修复了一大堆BUG；加入SSL证书，解决浏览器提示不安全访问的问题；'
        },
        {
          date: '2020-03-16',
          content: '【整体】部署centOS，准备项目上云；更改版权提示；'
        },
        {
          date: '2020-03-15',
          content:
            '【BRPS】新增：社交发布功能。希望BRPS也能充当内容分享平台；新增文章模块，目前支持文章查询查阅；'
        },
        {
          date: '2020-03-13',
          content:
            '【整体】修复了一个BUG，解决返回7天消费数据不对称的问题；修复了跨域请求失效的问题；'
        },
        {
          date: '2020-03-10',
          content:
            '【整体】添加日志功能；对PC端和MOBILE端的页面进行了路由指引；修复了一些BUG;'
        },
        {
          date: '2020-03-09',
          content:
            '【整体】添加SESSION功能，未被允许的数据请求会被拦截；修改了其他细节；修复了一些BUG；'
        },
        {
          date: '2020-03-05',
          content:
            '【整体】新增：BRPS上云计划，修改数据库设计；更新增删改查功能；'
        },
        {
          date: '2020-03-01',
          content:
            '【整体】编写后端需要的程序；前端编写API，使用axios进行前后端数据交换'
        },
        {
          date: '2020-02-28',
          content: '【整体】添加Chart图表模块；'
        },
        {
          date: '2020-02-26',
          content: '【整体】对需求进行了优化；简单设计前端需要的页面；'
        },
        {
          content: '【状态】PHP项目作废；',
          date: '2019-06-01'
        },
        {
          content:
            '【整体】重新进行需求分析；创建项目，前端使用Vue.js，后端使用J2EE；',
          date: '2020-02-25'
        },
        {
          content:
            '【整体】创建PHP项目，建立数据库；创建数据库，搬迁Excel数据至数据库；',
          date: '2019-04-25'
        },
        {
          content: '【整体】创建项目，进行需求分析；',
          date: '2019-04-20'
        },
        {
          content: '【整体】修复账单日期与输入不一致的问题',
          date: '2020-03-18'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
#updateinfo {
  margin: 0 auto;
  height: 900px;
}
</style>
<style>
.el-drawer__body {
  overflow: auto;
}
</style>
