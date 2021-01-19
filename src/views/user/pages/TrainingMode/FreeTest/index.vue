<!--
 * @Author      : 钟焯权
 * @Date        : 2020-11-16 17:34:06
 * @LastEditTime: 2020-12-29 13:36:38
 * @Description : 
-->
<template>
  <div id="free-app">
    <div id="free-image">
      <div id="free-logo">
        <img
          class="free-logo"
          :src="require('@/assets/image/logo.jpg')"
          alt=""
        />
      </div>

      <img class="free-img" :src="require('@/assets/image/free.jpg')" alt="" />
      <div id="free-font">
        请在治疗师地指导下，针对某种盆底肌收缩模式进行针对性训练
      </div>
    </div>

    <div id="free-bottom">
      <router-link to="/home/trainingmode/freetest/pages/index"
        ><el-button id="free-btn">开始校验</el-button></router-link
      >
    </div>
  </div>
</template>
<style lang="scss">
#free-app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
#free-font {
  text-align: center;
  width: 100%;
  height: 15%;
  font-size: 20px;
  margin-top: 5%;
}
#free-logo {
  margin-top: 10px;
  text-align: right;
  width: 100%;
  height: 50px;
}
.free-logo {
  width: 250px;
  height: 50px;
}
#free-image {
  width: 100%;
  height: 95%;
}
.free-img {
  width: 65%;
  height: 60%;
  margin-top: 5%;
}
#free-bottom {
  text-align: center;
  width: 100%;
  height: 10%;
}
#free-btn {
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
