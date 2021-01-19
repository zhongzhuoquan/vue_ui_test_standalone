<!--
 * @Author      : 钟焯权
 * @Date        : 2020-11-16 17:34:06
 * @LastEditTime: 2020-12-29 12:01:21
 * @Description : 
-->
<template>
  <div id="basicTestOfSlowMuscle-app">
    <div id="basicTestOfSlowMuscle-image">
      <div id="basicTestOfSlowMuscle-logo">
        <img
          class="basicTestOfSlowMuscle-logo"
          :src="require('@/assets/image/logo.jpg')"
          alt=""
        />
      </div>
      <img
        class="basicTestOfSlowMuscle-img"
        :src="require('@/assets/image/basicTestOfSlowMusle.jpg')"
        alt=""
      />
      <div id="basicTestOfSlowMuscle-font">
        通过持续低强度收缩，提高盆底肌等长收缩地能力<br />
        推荐训练组数：每组2-5个轮次，2-4组
      </div>
    </div>

    <div id="basicTestOfSlowMuscle-bottom">
      <router-link to="/home/trainingmode/basictestofslowmuscle/pages/index"
        ><el-button id="basicTestOfSlowMuscle-btn"
          >开始校验</el-button
        ></router-link
      >
    </div>
  </div>
</template>
<style lang="scss">
#basicTestOfSlowMuscle-app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
#basicTestOfSlowMuscle-font {
  text-align: center;
  width: 100%;
  height: 15%;
  font-size: 20px;
  margin-top: 5%;
}
#basicTestOfSlowMuscle-logo {
  margin-top: 10px;
  text-align: right;
  width: 100%;
  height: 50px;
}
.basicTestOfSlowMuscle-logo {
  width: 250px;
  height: 50px;
}
#basicTestOfSlowMuscle-image {
  width: 100%;
  height: 95%;
}
.basicTestOfSlowMuscle-img {
  width: 65%;
  height: 60%;
  margin-top: 5%;
}
#basicTestOfSlowMuscle-bottom {
  text-align: center;
  width: 100%;
  height: 10%;
}
#basicTestOfSlowMuscle-btn {
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
