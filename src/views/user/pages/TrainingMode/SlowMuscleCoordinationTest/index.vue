<!--
 * @Author      : 钟焯权
 * @Date        : 2020-11-16 17:34:06
 * @LastEditTime: 2020-12-29 13:45:34
 * @Description : 
-->
<template>
  <div id="slowMuscleCoordinationTest-app">
    <div id="slowMuscleCoordinationTest-image">
      <div id="slowMuscleCoordinationTest-logo">
        <img
          class="slowMuscleCoordinationTest-logo"
          :src="require('@/assets/image/logo.jpg')"
          alt=""
        />
      </div>

      <img
        class="slowMuscleCoordinationTest-img"
        :src="require('@/assets/image/slowMuscleCoordinationTest.jpg')"
        alt=""
      />
      <div id="slowMuscleCoordinationTest-font">
        结合三种收缩模式，提高慢肌的协调控制能力<br />
        推荐训练组数：每组3-5个轮次，2-3组
      </div>
    </div>

    <div id="slowMuscleCoordinationTest-bottom">
      <router-link
        to="/home/trainingmode/slowMuscleCoordinationTest/pages/index"
        ><el-button id="slowMuscleCoordinationTest-btn"
          >开始校验</el-button
        ></router-link
      >
    </div>
  </div>
</template>
<style lang="scss">
#slowMuscleCoordinationTest-app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
#slowMuscleCoordinationTest-font {
  text-align: center;
  width: 100%;
  height: 15%;
  font-size: 20px;
  margin-top: 5%;
}
#slowMuscleCoordinationTest-logo {
  margin-top: 10px;
  text-align: right;
  width: 100%;
  height: 50px;
}
.slowMuscleCoordinationTest-logo {
  width: 250px;
  height: 50px;
}
#slowMuscleCoordinationTest-image {
  width: 100%;
  height: 95%;
}
.slowMuscleCoordinationTest-img {
  width: 65%;
  height: 60%;
  margin-top: 5%;
}
#slowMuscleCoordinationTest-bottom {
  text-align: center;
  width: 100%;
  height: 10%;
}
#slowMuscleCoordinationTest-btn {
  width: 20%;
  font-size: 15px;
}
</style>
<script>
export default {
  name: 'free-index',
  methods: {}
}
</script>
