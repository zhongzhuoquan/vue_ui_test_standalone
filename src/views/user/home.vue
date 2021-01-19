<!--
 * @Author      : 钟焯权
 * @Date        : 2020-11-14 15:40:53
 * @LastEditTime: 2021-01-12 17:26:26
 * @Description : 
-->
<template>
  <div class="home" style="height:100%">
    <div class="menu" style="height:100%">
      <el-button style="width: 65px;" @click="change_collapse">
        <i v-if="isCollapse == true" class="el-icon-arrow-left"></i>
        <i v-else class="el-icon-arrow-right"></i>
      </el-button>
      <div
        style="width:100%;height:92% ;overflow:scroll;overflow-x: hidden"
        v-show="isCollapse == false"
      >
        <el-menu
          default-active=""
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          router
        >
          <el-menu-item>
            <i class="el-icon-user-solid"></i>
            <span slot="title">{{ '  ' + name }}</span>
          </el-menu-item>
          <el-menu-item
            @click="change_collapse2"
            index="/home/actionmode/index"
            :disabled="
              this.$store.getters.getActionModeCount <= 0 ? true : false
            "
          >
            <i class="el-icon-sunny"></i>
            <span slot="title">激活模式</span>
          </el-menu-item>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-finished"></i>
              <span slot="title">  测试模式</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                @click="change_collapse2"
                index="/home/testmode/index"
                :disabled="
                  this.$store.getters.getEnduranceMuscleCount <= 0
                    ? true
                    : false
                "
                >  肌耐力测试</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-video-play"></i>
              <span slot="title">  训练模式</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                @click="change_collapse2"
                index="/home/trainingmode/freetest/index"
                :disabled="this.$store.getters.getFreeCount <= 0 ? true : false"
                >  自由训练</el-menu-item
              >
              <el-menu-item
                @click="change_collapse2"
                index="/home/trainingmode/basictestofslowmuscle/index"
                :disabled="
                  this.$store.getters.getBasicOfSlowMuscleCount <= 0
                    ? true
                    : false
                "
                >  慢肌基础训练</el-menu-item
              >
              <el-menu-item
                @click="change_collapse2"
                index="/home/trainingmode/slowmusclecoordinationtest/index"
                :disabled="
                  this.$store.getters.getSlowMuscleCoordinationCount <= 0
                    ? true
                    : false
                "
                >  慢肌协调训练</el-menu-item
              >
              <el-menu-item
                @click="change_collapse2"
                index="/home/trainingmode/advancedtestofslowmuscle/index"
                :disabled="
                  this.$store.getters.getAdvancedSlowMuscleCount <= 0
                    ? true
                    : false
                "
                >  慢肌进阶训练</el-menu-item
              >
              <el-menu-item
                @click="change_collapse2"
                index="/home/trainingmode/fastmusclecoordinationtest/index"
                :disabled="
                  this.$store.getters.getFastMuscleCoordinationCount <= 0
                    ? true
                    : false
                "
                >  快肌协调训练</el-menu-item
              >
              <el-menu-item
                @click="change_collapse2"
                index="/home/trainingmode/advancedfastmuscletest/index"
                :disabled="
                  this.$store.getters.getAdvancedFastMuscleCount <= 0
                    ? true
                    : false
                "
                >  快肌进阶训练</el-menu-item
              >
              <el-menu-item
                @click="change_collapse2"
                index="/home/trainingmode/comprehensivetesta/index"
                :disabled="
                  this.$store.getters.getComprehensiveACount <= 0 ? true : false
                "
                >  综合训练A</el-menu-item
              >
              <el-menu-item
                @click="change_collapse2"
                index="/home/trainingmode/comprehensivetestb/index"
                :disabled="
                  this.$store.getters.getComprehensiveBCount <= 0 ? true : false
                "
                >  综合训练B</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item
            @click="change_collapse2"
            index="/home/personalinformation/index"
          >
            <i class="el-icon-info"></i>
            <span slot="title">  个人信息</span>
          </el-menu-item>

          <el-menu-item
            @click="change_collapse2"
            index="/home/testmode/testrecord/index"
          >
            <i class="el-icon-document"></i>
            <span slot="title">  测试记录</span>
          </el-menu-item>

          <el-menu-item
            @click="change_collapse2"
            index="/home/trainingmode/trainRecord/index"
          >
            <i class="el-icon-notebook-2"></i>
            <span slot="title">  训练记录</span>
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
.home {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: flex-start;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  min-height: 400px;
}
</style>
<script>
export default {
  name: 'nav-left',
  data() {
    return {
      timeOverStatus: null, //定时器状态
      timeOver_home: null, //定时器
      isCollapse: false,
      name: localStorage.getItem('username'),
      available_count: localStorage.getItem('available_count'),
      action_mode_status: false
    }
  },
  beforeDestroy() {
    clearTimeout(this.timeOver_home)
    this.timeOver_home = null
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
      // 二次退出登录
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
  }
}
</script>
