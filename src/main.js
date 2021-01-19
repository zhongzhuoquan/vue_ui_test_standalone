/*
 * @Author      : 钟焯权
 * @Date        : 2020-11-03 17:19:57
 * @LastEditTime: 2021-01-12 16:43:34
 * @Description :
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dexie from 'dexie'
Vue.prototype.$dexie = dexie
//导入全局样式表
import './assets/css/global.css'
//导入element-ui库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//导入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import axios from 'axios'
axios.defaults.baseURL = 'http://106.52.43.100/pd/public/api.php/'
Vue.config.productionTip = false
Vue.prototype.axios = axios
//获取当前时间
import moment from 'moment'
Vue.prototype.$moment = moment
//打印pdf
import vueToPdf from 'vue-to-pdf'
import VueEasyPrinter from 'vue-easy-printer'
Vue.use(vueToPdf)
Vue.use(VueEasyPrinter)

Vue.use(ElementUI)
Vue.config.productionTip = false
import { Notification } from 'element-ui'
Vue.prototype.$notify = Notification

//隐藏底部菜单栏

Vue.prototype.openLoading = function() {
  const loading = this.$loading({
    // 声明一个loading对象
    lock: true, // 是否锁屏
    text: '正在加载...', // 加载动画的文字
    spinner: 'el-icon-loading', // 引入的loading图标
    background: 'rgba(0, 0, 0, 0.3)', // 背景颜色
    target: '.sub-main', // 需要遮罩的区域
    body: true,
    customClass: 'mask' // 遮罩层新增类名
  })
  setTimeout(function() {
    // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
    loading.close() // 关闭遮罩层
  }, 5000)
  return loading
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
