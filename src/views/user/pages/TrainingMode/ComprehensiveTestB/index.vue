<!--
 * @Author      : 钟焯权
 * @Date        : 2020-11-16 17:34:06
 * @LastEditTime: 2021-01-08 11:19:13
 * @Description : 
-->
<template>
  <div id="comprehensiveTestB-app">
    <div id="comprehensiveTestB-image">
      <div id="comprehensiveTestB-logo">
        <img
          class="comprehensiveTestB-logo"
          :src="require('@/assets/image/logo.jpg')"
          alt=""
        />
      </div>
      <img
        class="comprehensiveTestB-img"
        :src="require('@/assets/image/comprehensiveTestB.jpg')"
        alt=""
      />
      <div id="comprehensiveTestB-font">
        通过慢肌快肌交替收缩动作，综合提高盆底肌协调能力<br />
        推荐训练组数：每组3-5轮次，3-6组
      </div>
    </div>

    <div id="comprehensiveTestB-bottom">
      <router-link to="/home/trainingmode/comprehensivetestb/pages/index"
        ><el-button id="comprehensiveTestB-btn"
          >开始校验</el-button
        ></router-link
      >
    </div>
  </div>
</template>
<style lang="scss">
#comprehensiveTestB-app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
#comprehensiveTestB-font {
  text-align: center;
  width: 100%;
  height: 15%;
  font-size: 20px;
  margin-top: 5%;
}
#comprehensiveTestB-logo {
  margin-top: 10px;
  text-align: right;
  width: 100%;
  height: 50px;
}
.comprehensiveTestB-logo {
  width: 250px;
  height: 50px;
}
#comprehensiveTestB-image {
  width: 100%;
  height: 95%;
}
.comprehensiveTestB-img {
  width: 65%;
  height: 60%;
  margin-top: 5%;
}
#comprehensiveTestB-bottom {
  text-align: center;
  width: 100%;
  height: 10%;
}
#comprehensiveTestB-btn {
  width: 20%;
  font-size: 15px;
}
</style>
<script>
export default {
  name: 'comprehensiveTestB-index',
  methods: {}
}
</script>
