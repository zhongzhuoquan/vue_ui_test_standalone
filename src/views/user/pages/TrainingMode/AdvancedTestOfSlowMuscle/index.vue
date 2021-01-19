<!--
 * @Author      : 钟焯权
 * @Date        : 2020-11-16 17:34:06
 * @LastEditTime: 2020-12-29 11:49:35
 * @Description : 
-->
<template>
  <div id="advancedTestOfSlowMuscle-app">
    <div id="advancedTestOfSlowMuscle-image">
      <div id="advancedTestOfSlowMuscle-logo">
        <img
          class="advancedTestOfSlowMuscle-logo"
          :src="require('@/assets/image/logo.jpg')"
          alt=""
        />
      </div>
      <img
        class="advancedTestOfSlowMuscle-img"
        :src="require('@/assets/image/advancedTestOfSlowMuscle.jpg')"
        alt=""
      />
      <div id="advancedTestOfSlowMuscle-font">
        结合三种收缩模式，并综合两种收缩强度，提高慢肌的协调控制能力<br />
        推荐训练组数：每组3-5个轮次，2-3组
      </div>
    </div>

    <div id="advancedTestOfSlowMuscle-bottom">
      <router-link to="/home/trainingmode/advancedTestOfSlowMuscle/pages/index"
        ><el-button id="advancedTestOfSlowMuscle-btn"
          >开始校验</el-button
        ></router-link
      >
    </div>
  </div>
</template>
<style lang="scss">
#advancedTestOfSlowMuscle-app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
#advancedTestOfSlowMuscle-font {
  text-align: center;
  width: 100%;
  height: 15%;
  font-size: 20px;
  margin-top: 5%;
}
#advancedTestOfSlowMuscle-logo {
  margin-top: 10px;
  text-align: right;
  width: 100%;
  height: 50px;
}
.advancedTestOfSlowMuscle-logo {
  width: 250px;
  height: 50px;
}
#advancedTestOfSlowMuscle-image {
  width: 100%;
  height: 95%;
}
.advancedTestOfSlowMuscle-img {
  width: 65%;
  height: 60%;
  margin-top: 5%;
}
#advancedTestOfSlowMuscle-bottom {
  text-align: center;
  width: 100%;
  height: 10%;
}
#advancedTestOfSlowMuscle-btn {
  width: 20%;
  font-size: 15px;
}
</style>
<script>
export default {
  name: 'advancedTestOfSlowMuscle-index',
  methods: {}
}
</script>
