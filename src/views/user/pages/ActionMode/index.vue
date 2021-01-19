<!--
 * @Author      : 钟焯权
 * @Date        : 2020-11-16 17:34:06
 * @LastEditTime: 2020-12-29 13:42:48
 * @Description : 
-->
<template>
  <div id="action-app">
    <div id="action-head">
      <div id="action-logo">
        <img
          class="action-logo"
          :src="require('@/assets/image/logo.jpg')"
          alt=""
        />
      </div>
    </div>
    <div id="action-image">
      <img
        class="action-img"
        :src="require('@/assets/image/tryOut.jpg')"
        alt=""
      />
      <div id="action-font">
        适用于首次使用的用户，体会盆底肌收缩时曲线的变化<br />
        目标：可完成多次连续的快速收缩-放松过程
      </div>
    </div>
    <div id="action-bottom">
      <router-link to="/home/actionmode/test/index"
        ><el-button id="action-btn">开始</el-button></router-link
      >
    </div>
  </div>
</template>
<style lang="scss">
#action-app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
#action-font {
  text-align: center;
  width: 100%;
  height: 15%;
  font-size: 20px;
  margin-top: 5%;
}
#action-image {
  width: 100%;
  height: 85%;
}
.action-img {
  width: 65%;
  height: 60%;
  margin-top: 5%;
}
#action-head {
  width: 100%;
  height: 50px;
}
#action-logo {
  margin-top: 10px;
  text-align: right;
  width: 100%;
  height: 50px;
}
.action-logo {
  width: 250px;
  height: 50px;
}
#action-bottom {
  text-align: center;
  width: 100%;
  height: 10%;
}
#action-btn {
  width: 20%;
  font-size: 15px;
}
</style>
<script>
export default {
  name: 'action-index',
  methods: {}
}
</script>
