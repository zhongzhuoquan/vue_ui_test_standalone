/*
 * @Author      : 钟焯权
 * @Date        : 2020-11-03 17:19:57
 * @LastEditTime: 2021-01-08 09:55:01
 * @Description :
 */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: '', //传感器数据
    getDataStatus: 0, //获取数据开关
    max: '', //完成校验获取最大值
    isCollapse: false,
    name: '', //用户名
    trainId: '',
    adminSearchUsername: '' //管理员搜索
  },
  getters: {
    getData(state) {
      return state.data
    },
    getDataStatus(state) {
      return state.getDataStatus
    },
    getMax(state) {
      return state.max
    },
    getIsCollapse(state) {
      return state.isCollapse
    },
    getName(state) {
      return state.name
    },
    getTrainId(state) {
      return state.trainId
    },

    getAdminSearchUsername(state) {
      return state.adminSearchUsername
    }
  },
  mutations: {
    setData(state, data) {
      state.data = data
    },
    setDataStatus(state, getDataStatus) {
      state.getDataStatus = getDataStatus
    },
    setMax(state, max) {
      state.max = max
    },
    setIsCollapse(state, isCollapse) {
      state.isCollapse = isCollapse
    },
    setName(state, name) {
      state.name = name
    },
    setTrainId(state, trainId) {
      state.trainId = trainId
    },

    setAdminSearchUsername(state, adminSearchUsername) {
      state.adminSearchUsername = adminSearchUsername
    }
  },
  actions: {
    setData({ commit, state }, data) {
      commit('setData', data)
    },
    setDataStatus({ commit, state }, getDataStatus) {
      commit('setDataStatus', getDataStatus)
    },
    setMax({ commit, state }, max) {
      commit('setMax', max)
    },
    setIsCollapse({ commit, state }, isCollapse) {
      commit('setIsCollapse', isCollapse)
    },
    setName({ commit, state }, name) {
      commit('setName', name)
    },
    setTrainId({ commit, state }, trainId) {
      commit('setTrainId', trainId)
    },

    setAdminSearchUsername({ commit, state }, adminSearchUsername) {
      commit('setAdminSearchUsername', adminSearchUsername)
    }
  },
  modules: {}
})
