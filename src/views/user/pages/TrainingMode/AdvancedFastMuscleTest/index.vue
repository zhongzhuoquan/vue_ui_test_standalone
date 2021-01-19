<!--
 * @Author      : 钟焯权
 * @Date        : 2020-11-16 17:34:06
 * @LastEditTime: 2020-12-29 13:57:41
 * @Description : 
-->
<template>
  <div id="advancedFastMuscleTest-app">
    <div id="advancedFastMuscleTest-image">
      <div id="advancedFastMuscleTest-logo">
        <img
          class="advancedFastMuscleTest-logo"
          :src="require('@/assets/image/logo.jpg')"
          alt=""
        />
      </div>
      <img
        class="advancedFastMuscleTest-img"
        :src="require('@/assets/image/advancedFastMuscleTest.jpg')"
        alt=""
      />
      <div id="advancedFastMuscleTest-font">
        结合三种收缩模式，并加入快速收缩动作，提高快肌的协调控制能力<br />
        推荐训练组数：每组5-10个轮次，3-6组
      </div>
    </div>

    <div id="advancedFastMuscleTest-bottom">
      <router-link to="/home/trainingmode/advancedFastMuscleTest/pages/index"
        ><el-button id="advancedFastMuscleTest-btn"
          >开始校验</el-button
        ></router-link
      >
    </div>
  </div>
</template>
<style lang="scss">
#advancedFastMuscleTest-app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
#advancedFastMuscleTest-font {
  text-align: center;
  width: 100%;
  height: 15%;
  font-size: 20px;
  margin-top: 5%;
}
#advancedFastMuscleTest-image {
  width: 100%;
  height: 95%;
}
.advancedFastMuscleTest-img {
  width: 65%;
  height: 60%;
  margin-top: 5%;
}
#advancedFastMuscleTest-logo {
  margin-top: 10px;
  text-align: right;
  width: 100%;
  height: 50px;
}
.advancedFastMuscleTest-logo {
  width: 250px;
  height: 50px;
}
#advancedFastMuscleTest-bottom {
  text-align: center;
  width: 100%;
  height: 10%;
}
#advancedFastMuscleTest-btn {
  width: 20%;
  font-size: 15px;
}
</style>
<script>
export default {
  name: 'advancedFastMuscleTest-index',
  methods: {}
}
</script>
