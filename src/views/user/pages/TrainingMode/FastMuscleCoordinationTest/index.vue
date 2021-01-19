<!--
 * @Author      : 钟焯权
 * @Date        : 2020-11-16 17:34:06
 * @LastEditTime: 2020-12-29 13:56:17
 * @Description : 
-->
<template>
  <div id="fastMuscleCoordinationTest-app">
    <div id="fastMuscleCoordinationTest-image">
      <div id="fastMuscleCoordinationTest-logo">
        <img
          class="fastMuscleCoordinationTest-logo"
          :src="require('@/assets/image/logo.jpg')"
          alt=""
        />
      </div>
      <img
        class="fastMuscleCoordinationTest-img"
        :src="require('@/assets/image/fastMuscleCoordinationTest.jpg')"
        alt=""
      />
      <div id="fastMuscleCoordinationTest-font">
        通过有快速而规律的收缩动作，提高快肌的协调控制能力<br />
        推荐训练组数：每组2-3个轮次，3-6组
      </div>
    </div>

    <div id="fastMuscleCoordinationTest-bottom">
      <router-link
        to="/home/trainingmode/fastMuscleCoordinationTest/pages/index"
        ><el-button id="fastMuscleCoordinationTest-btn"
          >开始校验</el-button
        ></router-link
      >
    </div>
  </div>
</template>
<style lang="scss">
#fastMuscleCoordinationTest-app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
#fastMuscleCoordinationTest-font {
  text-align: center;
  width: 100%;
  height: 15%;
  font-size: 20px;
  margin-top: 5%;
}
#fastMuscleCoordinationTest-logo {
  margin-top: 10px;
  text-align: right;
  width: 100%;
  height: 50px;
}
.fastMuscleCoordinationTest-logo {
  width: 250px;
  height: 50px;
}
#fastMuscleCoordinationTest-image {
  width: 100%;
  height: 95%;
}
.fastMuscleCoordinationTest-img {
  width: 65%;
  height: 60%;
  margin-top: 5%;
}
#fastMuscleCoordinationTest-bottom {
  text-align: center;
  width: 100%;
  height: 10%;
}
#fastMuscleCoordinationTest-btn {
  width: 20%;
  font-size: 15px;
}
</style>
<script>
export default {
  name: 'fastMuscleCoordinationTest-index',
  methods: {}
}
</script>
