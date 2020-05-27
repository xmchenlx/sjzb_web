<template>
  <div id="updateinfo">
      <h2 style="text-align:center">更新日志</h2>
      <el-timeline>
    <el-timeline-item
      v-for="(item, index) in udata"
      :key="index"
      :timestamp="item.date">
      {{item.content}}
    </el-timeline-item>
  </el-timeline>
      <el-divider >已经到底了</el-divider>
  </div>
</template>

<script>
export default {
  data () {
    return {
      udata: [
        {
          date: '2020-05-26',
          content: '新增【账单报告】模块，计划载入开销预测、开销阈值限制、报表分析等功能。'
        },
        {
          date: '2020-05-21',
          content: '更新密码传输机制，更改为对称秘钥传输。接入七牛云短信，后续将完善短信业务。'
        }, {
          date: '2020-03-18',
          content: '修复了一大堆BUG；加入SSL证书，解决浏览器提示不安全访问的问题；'
        }, {
          date: '2020-03-16',
          content: '部署centOS，准备项目上云；更改版权提示；'
        }, {
          date: '2020-03-15',
          content: '新增：社交发布功能。希望BRPS也能充当内容分享平台；新增文章模块，目前支持文章查询查阅；'
        }, {
          date: '2020-03-13',
          content: '修复了一个BUG，解决返回7天消费数据不对称的问题；修复了跨域请求失效的问题；'
        }, {
          date: '2020-03-10',
          content: '添加日志功能；对PC端和MOBILE端的页面进行了路由指引；修复了一些BUG;'
        }, {
          date: '2020-03-09',
          content: '添加SESSION功能，未被允许的数据请求会被拦截；修改了其他细节；修复了一些BUG；'
        }, {
          date: '2020-03-05',
          content: '新增：BRPS上云计划，修改数据库设计；更新增删改查功能；'
        }, {
          date: '2020-03-01',
          content: '编写后端需要的程序；前端编写API，使用axios进行前后端数据交换'
        }, {
          date: '2020-02-28',
          content: '添加Chart图表模块；'
        }, {
          date: '2020-02-26',
          content: '对需求进行了优化；简单设计前端需要的页面；'
        }, {
          content: 'PHP项目作废；',
          date: '2019-06-01'
        }, {
          content: '重新进行需求分析；创建项目，前端使用Vue.js，后端使用J2EE；',
          date: '2020-02-25'
        }, {
          content: '创建PHP项目，建立数据库；创建数据库，搬迁Excel数据至数据库；',
          date: '2019-04-25'
        }, {
          content: '创建项目，进行需求分析；',
          date: '2019-04-20'
        }, {
          content: '修复账单日期与输入不一致的问题',
          date: '2020-03-18'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
#updateinfo{
    margin:0 auto;
    height:900px;
}

</style>
<style>
.el-drawer__body{
    overflow: auto;
}</style>
