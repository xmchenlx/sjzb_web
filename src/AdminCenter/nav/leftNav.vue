<template>
  <div id="mainmenu" class="menu">
    <h2>管理中心</h2>
    <el-menu
      default-active="0"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :defaultOpeneds="opends"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-chat-dot-round"></i>
          <router-link :to="{name : ''}">
            <span>个人信息</span>
          </router-link>
        </template>
        <el-menu-item-group>
          <router-link :to="{name : ''}">
            <el-menu-item index="1-2">
              <i class="el-icon-c-scale-to-original" />
              密码修改
            </el-menu-item>
          </router-link>
          <router-link :to="{name : ''}">
            <el-menu-item index="1-3">
              <i class="el-icon-edit" />
              个人信息编辑
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-shop"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <router-link :to="{name : ''}">
            <el-menu-item index="2-1">
              <i class="el-icon-coordinate" />
              用户密码强行重置
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-shop"></i>
          <span>博客文章管理</span>
        </template>
        <el-menu-item-group>
          <router-link :to="{path : '/adminCenter/articleManage'}">
            <el-menu-item index="3-1">
              <i class="el-icon-coordinate" />
              文章列表
            </el-menu-item>
          </router-link>

          <el-menu-item index="3-2">
            <i class="el-icon-coordinate" />
            lx的文章
          </el-menu-item>
          <router-link :to="{path : '/adminCenter/addNewArticle'}">
            <el-menu-item index="3-3">
              <i class="el-icon-coordinate" />
              发布新的文章
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-shop"></i>
          <span>BRPS</span>
        </template>
        <el-menu-item-group>
          <router-link :to="{name : 'brpsTypeManage'}">
            <el-menu-item index="4-1">
              <i class="el-icon-coordinate" />
              记账归类管理
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-s-shop"></i>
          <span>便捷跳转</span>
        </template>
        <el-menu-item-group>
          <router-link :to="{path : '/'}">
            <el-menu-item index="5-1">
              <i class="el-icon-coordinate" />
              跳转BRPS登录页
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'mainmenu',
  data () {
    return {
      opends: ['2', '3']
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    clickGoTo (getPath) {
      this.$router.push({ path: getPath })
    }
  }
}
</script>

<style scoped>
.menu {
  min-height: 600px;
  /* background-color: rgba(84, 92, 100, 1); */
  background-color: white;
  border-radius: 10px 10px;
  /* box-shadow: 1px 1px 50px rgba(49,49,49,0.5) */
  margin-left: 20%;
}

/* 清除router-link的默认a标签下划线效果 */
a {
  text-decoration: none;
}

h2 {
  text-align: center;
  padding-top: 5px;
}
</style>
