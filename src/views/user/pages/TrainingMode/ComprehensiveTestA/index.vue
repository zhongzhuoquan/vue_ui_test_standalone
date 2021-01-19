<!--
 * @Author      : 钟焯权
 * @Date        : 2020-11-16 17:34:06
 * @LastEditTime: 2020-12-29 13:58:21
 * @Description : 
-->
<template>
  <div id="comprehensiveTestA-app">
    <div id="comprehensiveTestA-image">
      <div id="comprehensiveTestA-logo">
        <img
          class="comprehensiveTestA-logo"
          :src="require('@/assets/image/logo.jpg')"
          alt=""
        />
      </div>

      <img
        class="comprehensiveTestA-img"
        :src="require('@/assets/image/comprehensiveTestA.jpg')"
        alt=""
      />
      <div id="comprehensiveTestA-font">
        结合三种收缩模式，并加入快速收缩动作，提高快肌的协调控制能力<br />
        推荐训练组数：每组3-5个轮次，3-6组
      </div>
    </div>

    <div id="comprehensiveTestA-bottom">
      <router-link to="/home/trainingmode/comprehensivetesta/pages/index"
        ><el-button id="comprehensiveTestA-btn"
          >开始校验</el-button
        ></router-link
      >
    </div>
  </div>
</template>
<style lang="scss">
#comprehensiveTestA-app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
#comprehensiveTestA-font {
  text-align: center;
  width: 100%;
  height: 15%;
  font-size: 20px;
  margin-top: 5%;
}
#comprehensiveTestA-logo {
  margin-top: 10px;
  text-align: right;
  width: 100%;
  height: 50px;
}
.comprehensiveTestA-logo {
  width: 250px;
  height: 50px;
}
#comprehensiveTestA-image {
  width: 100%;
  height: 95%;
}
.comprehensiveTestA-img {
  width: 65%;
  height: 60%;
  margin-top: 5%;
}
#comprehensiveTestA-bottom {
  text-align: center;
  width: 100%;
  height: 10%;
}
#comprehensiveTestA-btn {
  width: 20%;
  font-size: 15px;
}
</style>
<script>
export default {
  name: 'comprehensiveTestA-index',
  methods: {}
}
</script>
