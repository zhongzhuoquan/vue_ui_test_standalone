/*
 * @Author      : 钟焯权
 * @Date        : 2020-11-03 17:19:57
 * @LastEditTime: 2021-01-19 16:29:43
 * @Description :
 */
import { Notification } from 'element-ui'

/* 定义全局变量 */
const dbName = 'Release_Squat_System_V1' // 数据库名称（大改就改数据库名，不兼容旧数据库了）
const dbVersion = 1 // 数据库版本号（添加表的话可以通过改版本号，这样还能兼容旧数据库）
const indexedDB = window.indexedDB

/**
 * @description: 初始化global_configuration表
 * @return: Promise
 */
function initGlobalConfiguration() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion)
    request.onsuccess = event => {
      const db = event.target.result
      const objectStore = db
        .transaction(['global_configuration'], 'readwrite')
        .objectStore('global_configuration')
      const clearRequest = objectStore.clear() // 先删除配置项，再插入配置项
      clearRequest.onsuccess = event => {
        const addRequest = objectStore.add({
          configuration: 'configuration',
          trainActionArray: []
        })
        addRequest.onsuccess = event => {
          return resolve()
        }
        addRequest.onerror = event => {
          Notification({
            title: 'global_configuration表初始化失败，请刷新页面或重启设备',
            type: 'error',
            position: 'bottom-left'
          })
          return reject()
        }
      }
      clearRequest.onerror = event => {
        Notification({
          title: '清空global_configuration表失败，请刷新页面或重启设备',
          type: 'error',
          position: 'bottom-left'
        })
        return reject()
      }
    }
    request.onerror = event => {
      Notification({
        title: '打开数据库失败，请刷新页面或重启设备',
        type: 'error',
        position: 'bottom-left'
      })
      return reject()
    }
  })
}

/**
 * @description: 打开数据库
 * @return: Promise
 */
export function openIndexedDB() {
  return new Promise((resolve, reject) => {
    /*
     * 如果数据库名已存在，则默认打开当前版本数据库，如果不存在则会新建一个
     * 返回一个当前数据库的 IDBOpenDBRequest 对象，主要有3种回调：onerror、onsuccess、onupgradeneeded
     * 如果是新建数据库，由于数据库的从无到有属于版本升级，所以会先触发 onupgradeneeded 回调，然后再触发 onsuccess 或 onerror 回调
     * 版本号不能降低，否则报错
     */
    const request = indexedDB.open(dbName, dbVersion)

    /* 成功时回调 */
    request.onsuccess = event => {
      const db = event.target.result
      return resolve(db) // 返回db数据库实例
    }

    /* 失败时回调 */
    request.onerror = event => {
      Notification({
        title: '打开数据库失败，请刷新页面或重启设备',
        type: 'error',
        position: 'bottom-left'
      })
      return reject()
    }
    /* 新创建数据库 或 数据库版本号升级时触发 */
    request.onupgradeneeded = event => {
      // event.target.result 拿到数据库实例对象，其中包含了对数据库表的的创建编辑等功能
      const db = event.target.result
      let objectStore
      /*
       * 判断我们要创建的表是否已经存在，数据库实例的 objectStoreNames 中放的是我们的所有表的集合
       * contains 方法查看表集合中是否存在某个表
       */

      /* 创建user表：记录用户信息 */
      if (!db.objectStoreNames.contains('user')) {
        /**
         * @description: createObjectStore 方法创建表
         * @param {String} 表名
         * @param {Object} 配置项(可选)：自定义主键 keyPath、自增主键 autoIncrement 等；
         *                一般来说，keyPath和autoIncrement属性只要使用一个就够了，如果两个同时使用，表示键名为递增的整数，且对象不得缺少指定属性。
         */
        objectStore = db.createObjectStore('user', { keyPath: 'userId' })
        /**
         * @description: 使用 createIndex 为这个数据表添加索引，否则只能通过主键检索
         * @param {String} 索引名称（建议：属性名+Index后缀）
         * @param {String} 属性名
         * @param {Object} 配置项：unique表示这个索引值在仓库对象中是否唯一。（false-不唯一；true-唯一）
         *                 unique设为true，则当有相同索引值插入时，会失败。
         */
        objectStore.createIndex('userIdIndex', 'userId', { unique: true })
        objectStore.createIndex('devicesIdIndex', 'devicesId', {
          unique: false
        }) // 设备ID
        objectStore.createIndex('userNameIndex', 'userName', { unique: true }) // 用户名
        objectStore.createIndex('passwordIndex', 'password', { unique: false }) // 用户名
        objectStore.createIndex('sexIndex', 'sex', { unique: false }) // 用户名
        objectStore.createIndex('yearIndex', 'year', { unique: false }) // 用户名
        objectStore.createIndex('createTimeIndex', 'createTime', {
          unique: false
        }) // 创建时间
        objectStore.createIndex('loginTimeIndex', 'loginTime', {
          unique: false
        }) // 创建时间
        objectStore.createIndex('statusIndex', 'status', { unique: false }) // 创建时间
      }

      /* 创建devices表：记录设备信息 */
      if (!db.objectStoreNames.contains('devices')) {
        objectStore = db.createObjectStore('devices', {
          keyPath: 'devicesID'
        })
        objectStore.createIndex('devicesIdIndex', 'devicesId', { unique: true })
        objectStore.createIndex('devicesNameIndex', 'devicesName', {
          unique: false
        })
        objectStore.createIndex('createTimeIndex', 'createTime', {
          unique: false
        })
      }

      /* 创建test表：记录训练模式 */
      if (!db.objectStoreNames.contains('test')) {
        objectStore = db.createObjectStore('test', {
          keyPath: 'Id'
        })
        objectStore.createIndex('idIndex', 'id', { unique: true })
        objectStore.createIndex('categoryIndex', 'category', { unique: false })
      }

      /* 创建testRecord表：记录测试模式记录 */
      if (!db.objectStoreNames.contains('testRecord')) {
        objectStore = db.createObjectStore('testRecord', {
          keyPath: 'Id'
        })
        objectStore.createIndex('idIndex', 'id', { unique: true })
        objectStore.createIndex('userIdIndex', 'userId', { unique: false })
        objectStore.createIndex('totalTimeIndex', 'totalTime', {
          unique: false
        })
        objectStore.createIndex('createTimeIndex', 'createTime', {
          unique: false
        })
      }

      /* 创建train表：记录训练模式 */
      if (!db.objectStoreNames.contains('train')) {
        objectStore = db.createObjectStore('train', {
          keyPath: 'Id'
        })
        objectStore.createIndex('idIndex', 'id', { unique: true })
        objectStore.createIndex('categoryIndex', 'category', { unique: false })
        objectStore.createIndex('descIndex', 'desc', {
          unique: false
        })
      }

      /* 创建trainRecord表：记录训练模式记录 */
      if (!db.objectStoreNames.contains('trainRecord')) {
        objectStore = db.createObjectStore('trainRecord', {
          keyPath: 'Id'
        })
        objectStore.createIndex('idIndex', 'id', { unique: true })
        objectStore.createIndex('userIdIndex', 'userId', { unique: false })
        objectStore.createIndex('trainIdIndex', 'trainIdIndex', {
          unique: false
        })
        objectStore.createIndex('standDataIndex', 'standData', {
          unique: false
        })
        objectStore.createIndex('testDataIndex', 'testData', {
          unique: false
        })
        objectStore.createIndex('scoreIndex', 'score', {
          unique: false
        })
        objectStore.createIndex('roundIndex', 'round', {
          unique: false
        })
        objectStore.createIndex('createTimeIndex', 'createTime', {
          unique: false
        })
      }

      Notification({
        title: '数据库创建或升级成功',
        type: 'success',
        position: 'bottom-left'
      })

      /* 初始化global_configuration表 */
      initGlobalConfiguration().then(() => {
        Notification({
          title: 'global_configuration表初始化成功',
          type: 'success',
          position: 'bottom-left'
        })
      })
    }
  })
}

/**
 * @description: 新增单条数据
 * @param {Object} db 数据库实例
 * @param {String} tableName 表名
 * @param {Object} value 值
 */
export function addData(db, tableName, value) {
  return new Promise((resolve, reject) => {
    const addRequest = db
      .transaction([tableName], 'readwrite')
      .objectStore(tableName)
      .add(value)
    addRequest.onsuccess = event => {
      return resolve()
    }
    addRequest.onerror = event => {
      Notification({
        title: '该条数据保存失败，请刷新页面或重启设备',
        type: 'error',
        position: 'bottom-left'
      })
      return reject()
    }
  })
}
