<!--
 * @Author      : 钟焯权
 * @Date        : 2020-11-16 17:24:29
 * @LastEditTime: 2021-01-15 10:13:28
 * @Description : 
-->
<template>
  <div class="admin-index">
    <div class="admin-menu">
      <el-button style="width: 65px;" @click="change_collapse">
        <i v-if="isCollapse == true" class="el-icon-arrow-left"></i>
        <i v-else class="el-icon-arrow-right"></i>
      </el-button>
      <div v-show="isCollapse == false">
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          router
        >
          <el-menu-item @click="change_collapse2" index="/admin/userlist">
            <i class="el-icon-user"></i>
            <span slot="title">  用户列表</span>
          </el-menu-item>
          <el-menu-item @click="change_collapse2" index="/admin/trainrecord">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">  训练记录</span>
          </el-menu-item>
          <el-menu-item @click="change_collapse2" index="/admin/adminmessage">
            <i class="el-icon-info"></i>
            <span slot="title">  修改管理员信息</span>
          </el-menu-item>
          <el-menu-item @click="logout">
            <i class="el-icon-switch-button"></i>
            <span slot="title">  退出登录</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <router-view style="text-align: center"></router-view>
  </div>
</template>
<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 210px;
  min-height: 400px;
}
.admin-index {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
<script>
export default {
  name: 'trainingRrcord-index',
  data() {
    return {
      isCollapse: false,
      name: localStorage.getItem('username')
    }
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    change_collapse() {
      if (this.isCollapse == true) {
        this.isCollapse = false
        return 'el-icon-arrow-left'
      } else {
        this.isCollapse = true
        return 'el-icon-arrow-left'
      }
    },
    change_collapse2() {
      this.isCollapse = true
      return 'el-icon-arrow-left'
    },
    logout() {
      this.$confirm('确定要退出吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          localStorage.setItem('username', '')
          localStorage.setItem('login_time', '')
          this.$router.push('/login')
        })
        .catch(() => {})
    }
  },
  mounted() {}
}
</script>
