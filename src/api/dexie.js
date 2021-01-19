/*
 * @Author      : 钟焯权
 * @Date        : 2021-01-11 15:17:10
 * @LastEditTime: 2021-01-15 10:19:43
 * @Description :
 */
import dexie from 'dexie'
import { fsWrite } from './fs'
import moment from 'moment'
import store from '../store'
var db = new dexie('pd')
var date = new Date()
db.version(1).stores({
  devices: '++id,name,create_time',
  test: '++id,category',
  test_record: '++id,user_id,total_time,create_time',
  train: '++id,category,desc',
  train_record:
    '++id,user_id,train_id,*standard_data,*test_data,*score,create_time,round',
  user: '++id,name,password,sex,year,create_time,login_time,status'
})

export function addDevices(id, name, create_time) {
  db.devices
    .add({ id: id, name: name, create_time: create_time })
    .then(function() {
      console.log('addDevices is OK')
    })
    .catch(function(error) {
      fsWrite('设备ID初始化：' + error)
    })
}
export function addTest(id, category) {
  db.test
    .add({ id: id, category: category })
    .then(function() {
      console.log('addTest is OK')
    })
    .catch(function(error) {
      fsWrite('添加test训练：' + error)
    })
}
export function addTrain(id, category, desc) {
  db.train
    .add({ id: id, category: category, desc: desc })
    .then(function() {
      console.log('addTrain is OK')
    })
    .catch(function(error) {
      fsWrite('添加train训练：' + error)
    })
}
//管理员注册
export function addAdmin() {
  console.log(date.toLocaleString())
  db.user
    .add({
      name: 'energy',
      password: 'energy',
      create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
      status: 1
    })
    .then(function() {
      console.log('addAdmin is OK')
    })
    .catch(function(error) {
      fsWrite('管理员注册：' + error)
    })
}
//注册
export async function addUser(name, password, sex, year, create_time) {
  let post = () => {
    return new Promise(resolve => {
      db.user
        .add({
          name: name,
          password: password,
          sex: sex,
          year: year,
          status: 0,
          create_time: create_time
        })
        .then(function() {
          console.log('addUser is OK')
          resolve(1)
        })
        .catch(function(error) {
          fsWrite('用户注册：' + error)
        })
    })
  }
  let result = await post()
  return result
}
//注册时候查找用户名是否存在
export async function findUserName(name) {
  let post = () => {
    return new Promise(resolve => {
      db.user
        .get({ name: name })
        .then(function(res) {
          resolve(res)
        })
        .catch(function(error) {
          fsWrite('查找用户名字：' + error)
        })
    })
  }
  let result = await post()
  return result
}
export async function findUser(name, password) {
  let post = () => {
    return new Promise(resolve => {
      db.user
        .get({ name: name, password: password })
        .then(function(res) {
          if (res == null) {
            var message = { status: 0, data: res }
            resolve(message)
          } else {
            db.user.update(res['id'], {
              login_time: moment().format('YYYY-MM-DD HH:mm:ss')
            })
            var message = { status: 1, data: res }
            resolve(message)
          }
        })
        .catch(function(error) {
          fsWrite('登录：' + error)
        })
    })
  }
  let result = await post()
  return result
}
//添加test record记录
export async function addTestRecord(name, data) {
  let post = () => {
    return new Promise(resolve => {
      db.user
        .get({ name: name })
        .then(function(res) {
          db.test_record
            .add({
              user_id: res['id'],
              create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
              total_time: data
            })
            .then(function(res2) {
              if (res2 != null) {
                var message = { status: 1 }
                resolve(message)
              } else {
                var message = { status: 0 }
                resolve(message)
              }
            })
            .catch(function(error) {
              fsWrite('test添加记录：' + error)
            })
        })
        .catch(function(error) {
          fsWrite('添加记录查询用户：' + error)
        })
    })
  }
  let result = await post()
  return result
}
//添加train record记录
export async function addTrainRecord(data) {
  let post = () => {
    return new Promise(resolve => {
      db.user
        .get({ name: data['name'] })
        .then(function(res) {
          db.train
            .get({ category: data['trainName'] })
            .then(function(res2) {
              db.train_record
                .add({
                  user_id: res['id'],
                  standard_data: data['standardArray'],
                  test_data: data['testArray'],
                  score: data['score'],
                  train_id: res2['id'],
                  round: data['testArray'].length,
                  create_time: moment().format('YYYY-MM-DD HH:mm:ss')
                })
                .then(function(res3) {
                  console.log(res3)
                  if (res3 != null) {
                    store.dispatch('setTrainId', res3)
                    var message = { status: 1 }
                    resolve(message)
                  } else {
                    var message = { status: 0 }
                    resolve(message)
                  }
                })
                .catch(function(error) {
                  fsWrite('添加train记录：' + error)
                })
            })
            .catch(function(error) {
              fsWrite('添加train记录查询训练模式：' + error)
            })
        })
        .catch(function(error) {
          fsWrite('添加train记录查询用户：' + error)
        })
    })
  }
  let result = await post()
  return result
}
//查看个人信息
export async function findUserMessage(name) {
  let post = () => {
    return new Promise(resolve => {
      db.user
        .get({ name: name })
        .then(function(res) {
          if (res != null) {
            var message = { status: 1, data: res }
            resolve(message)
          } else {
            var message = { status: 0 }
            resolve(message)
          }
        })
        .catch(function(error) {
          fsWrite('查询个人信息：' + error)
        })
    })
  }
  let result = await post()
  return result
}
//修改个人信息
export async function updateUserMessage(data) {
  let post = () => {
    return new Promise(resolve => {
      db.user
        .get({ name: data['name'] })
        .then(function(res) {
          db.user
            .update(res['id'], {
              password: data.password,
              sex: data.sex,
              year: data.year
            })
            .then(function(res2) {
              if (res2 != null) {
                var message = { status: 1 }
                resolve(message)
              } else {
                var message = { status: 0 }
                resolve(message)
              }
            })
            .catch(function(error) {
              fsWrite('修改个人信息：' + error)
            })
        })
        .catch(function(error) {
          fsWrite('修改个人信息查找id：' + error)
        })
    })
  }
  let result = await post()
  return result
}
//查看train记录
export async function findTrainRecord(data) {
  let post = () => {
    return new Promise(resolve => {
      db.train_record
        .get({ id: data })
        .then(function(res) {
          if (res != null) {
            res['train_name'] = new Array()
            if (res['train_id'] == 1) {
              res['train_name'] = '慢肌基础训练'
            }
            if (res['train_id'] == 2) {
              res['train_name'] = '慢肌协调训练'
            }
            if (res['train_id'] == 3) {
              res['train_name'] = '慢肌进阶训练'
            }
            if (res['train_id'] == 4) {
              res['train_name'] = '快肌协调训练'
            }
            if (res['train_id'] == 5) {
              res['train_name'] = '快肌进阶训练'
            }
            if (res['train_id'] == 6) {
              res['train_name'] = '综合训练A'
            }
            if (res['train_id'] == 7) {
              res['train_name'] = '综合训练B'
            }

            console.log(res)
            var message = { status: 1, data: res }
            resolve(message)
          } else {
            var message = { status: 0 }
            resolve(message)
          }
        })
        .catch(function(error) {
          fsWrite('查看train记录：' + error)
        })
    })
  }
  let result = await post()
  return result
}
//查看test记录
export async function findTestRecord(data) {
  let post = () => {
    return new Promise(resolve => {
      db.user
        .get({ name: data['name'] })
        .then(function(res) {
          db.test_record
            .where('user_id')
            .equals(res['id'])
            .toArray()
            .then(function(res2) {
              if (res2) {
                var message = { status: 1, data: res2 }
                resolve(message)
              } else {
                var message = { status: 0 }
                resolve(message)
              }
            })
            .catch(function(error) {
              fsWrite('查看test记录：' + error)
            })
        })
        .catch(function(error) {
          fsWrite('查看train记录-查看用户id：' + error)
        })
    })
  }
  let result = await post()
  return result
}
//删除testrecord记录
export async function deleteTestRecord(data) {
  let post = () => {
    return new Promise(resolve => {
      db.test_record
        .delete(data['record_id'])
        .then(function(res) {
          var message = { status: 1 }
          resolve(message)
        })
        .catch(function(error) {
          var message = { status: 0 }
          resolve(message)
          fsWrite('删除test记录：' + error)
        })
    })
  }
  let result = await post()
  return result
}
//查找trainrecord记录
export async function findTrainRecordAll(data) {
  var train = data['train_id'].split(',')
  var data_train = []
  let post = () => {
    return new Promise(resolve => {
      db.user
        .get({ name: data['name'] })
        .then(function(res) {
          db.train_record
            .where({ user_id: res['id'] })
            .toArray()
            .then(function(res2) {
              for (var i = 0; i < res2.length; i++) {
                res2[i]['desc'] = new Array()
                if (res2[i]['train_id'] == 1) {
                  res2[i]['desc'].push('慢肌基础训练')
                }
                if (res2[i]['train_id'] == 2) {
                  res2[i]['desc'].push('慢肌协调训练')
                }
                if (res2[i]['train_id'] == 3) {
                  res2[i]['desc'].push('慢肌进阶训练')
                }
                if (res2[i]['train_id'] == 4) {
                  res2[i]['desc'].push('快肌协调训练')
                }
                if (res2[i]['train_id'] == 5) {
                  res2[i]['desc'].push('快肌进阶训练')
                }
                if (res2[i]['train_id'] == 6) {
                  res2[i]['desc'].push('综合训练A')
                }
                if (res2[i]['train_id'] == 7) {
                  res2[i]['desc'].push('综合训练B')
                }

                for (var n = 0; n < train.length; n++) {
                  if (res2[i].train_id == train[n]) {
                    data_train.push(res2[i])
                    break
                  }
                }
              }
              if (data_train.length > 0) {
                var message = { status: 1, data: data_train }
                resolve(message)
              } else {
                var message = { status: 0 }
                resolve(message)
              }
            })
            .catch(function(error) {
              fsWrite('查询train记录：' + error)
            })
        })
        .catch(function(error) {
          fsWrite('查询train记录：' + error)
        })
    })
  }
  let result = await post()
  return result
}
//删除trainrecord记录
export async function deleteTrainRecord(data) {
  let post = () => {
    return new Promise(resolve => {
      db.train_record
        .delete(data['record_id'])
        .then(function(res) {
          var message = { status: 1 }
          resolve(message)
        })
        .catch(function(error) {
          var message = { status: 0 }
          resolve(message)
          fsWrite('删除train记录：' + error)
        })
    })
  }
  let result = await post()
  return result
}
//查看长期训练记录
export async function findTrainRecordLong(data) {
  let post = () => {
    return new Promise(resolve => {
      var data_res = new Array()
      db.user
        .get({ name: data.name })
        .then(function(res) {
          db.train_record
            .where('user_id')
            .equals(res['id'])
            .toArray()
            .then(function(res2) {
              if (data['create_time'].length > 0) {
                for (var i = 0; i < res2.length; i++) {
                  if (data['train_id'] == res2[i]['train_id']) {
                    if (
                      data['create_time'][0] <= res2[i]['create_time'] &&
                      res2[i]['create_time'] <= data['create_time'][1]
                    ) {
                      data_res.push(res2[i])
                    }
                  }
                  console.log(data_res)
                }
                if (data_res) {
                  var message = { status: 1, data: data_res }
                  resolve(message)
                } else {
                  var message = { status: 0 }
                  resolve(message)
                }
              } else {
                for (var i = 0; i < res2.length; i++) {
                  if (data['train_id'] == res2[i]['train_id']) {
                    data_res.push(res2[i])
                  }
                }
                if (data_res) {
                  var message = { status: 1, data: data_res }
                  resolve(message)
                } else {
                  var message = { status: 0 }
                  resolve(message)
                }
              }
            })
            .catch()
        })
        .catch(function() {})
    })
  }
  let result = await post()
  return result
}
//管理员查看用户列表
export async function findAdminUser(data) {
  let post = () => {
    return new Promise(resolve => {
      if (data['user_name'] == '') {
        db.user
          .toArray()
          .then(function(res) {
            for (var i = 0; i < res.length; i++) {
              if (res[i]['status'] == 1) {
                res.splice(i, 1)
              }
            }
            if (res) {
              var message = { status: 1, data: res }
              resolve(message)
            } else {
              var message = { status: 0 }
              resolve(message)
            }
          })
          .catch(function(error) {
            fsWrite('管理员查看用户列表：' + error)
          })
      } else {
        db.user
          .where('name')
          .equals(data['user_name'])
          .toArray()
          .then(function(res) {
            for (var i = 0; i < res.length; i++) {
              if (res[i]['status'] == 1) {
                res.splice(i, 1)
              }
            }
            if (res) {
              var message = { status: 1, data: res }
              resolve(message)
            } else {
              var message = { status: 0 }
              resolve(message)
            }
          })
          .catch(function(error) {
            fsWrite('管理员查看用户列表：' + error)
          })
      }
    })
  }
  let result = await post()
  return result
}
//删除用户
export async function deleteAdminUser(data) {
  let post = () => {
    return new Promise(resolve => {
      db.user
        .delete(data)
        .then(function(res) {
          db.train_record
            .where('user_id')
            .equals(data)
            .toArray()
            .then(function(res2) {
              if (res2.length > 0) {
                for (var i = 0; i < res2.length; i++) {
                  db.train_record.delete(res2[i]['id'])
                }
              }
            })
            .catch(function(error) {})

          db.test_record
            .where('user_id')
            .equals(data)
            .toArray()
            .then(function(res3) {
              if (res3.length > 0) {
                for (var i = 0; i < res3.length; i++) {
                  db.test_record.delete(res3[i]['id'])
                }
              }
            })
            .catch(function(error) {})
          var message = { status: 1 }
          resolve(message)
        })
        .catch(function(error) {
          var message = { status: 0 }
          resolve(message)
          fsWrite('删除用户：' + error)
        })
    })
  }
  let result = await post()
  return result
}
//获取管理员信息
export async function findAdminMessage(data) {
  let post = () => {
    return new Promise(resolve => {
      db.user
        .get({ name: data['name'] })
        .then(function(res) {
          if (res) {
            var message = { status: 1, data: res }
            resolve(message)
          } else {
            var message = { status: 0 }
            resolve(message)
          }
        })
        .catch(function(error) {
          fsWrite('查看管理员信息:' + error)
        })
    })
  }
  let result = await post()
  return result
}
//修改管理员信息
export async function updateAdminMessage(data) {
  let post = () => {
    return new Promise(resolve => {
      db.user
        .get({ name: data['name'] })
        .then(function(res) {
          db.user
            .update(res['id'], {
              password: data.password
            })
            .then(function(res2) {
              if (res2 != null) {
                var message = { status: 1 }
                resolve(message)
              } else {
                var message = { status: 0 }
                resolve(message)
              }
            })
            .catch(function(error) {
              fsWrite('修改管理员信息：' + error)
            })
        })
        .catch(function(error) {
          fsWrite('修改管理员信息查找id：' + error)
        })
    })
  }
  let result = await post()
  return result
}
//查找trainrecord记录
export async function findAdminTrainRecordAll(data) {
  var train = data['train_id'].split(',')
  var data_train = []
  let post = () => {
    return new Promise(resolve => {
      if (data['name'] == '') {
        var message = { status: 1, data: [] }
        resolve(message)
      } else {
        db.user
          .get({ name: data['name'] })
          .then(function(res) {
            if (res) {
              db.train_record
                .where({ user_id: res['id'] })
                .toArray()
                .then(function(res2) {
                  for (var i = 0; i < res2.length; i++) {
                    res2[i]['desc'] = new Array()
                    if (res2[i]['train_id'] == 1) {
                      res2[i]['desc'].push('慢肌基础训练')
                    }
                    if (res2[i]['train_id'] == 2) {
                      res2[i]['desc'].push('慢肌协调训练')
                    }
                    if (res2[i]['train_id'] == 3) {
                      res2[i]['desc'].push('慢肌进阶训练')
                    }
                    if (res2[i]['train_id'] == 4) {
                      res2[i]['desc'].push('快肌协调训练')
                    }
                    if (res2[i]['train_id'] == 5) {
                      res2[i]['desc'].push('快肌进阶训练')
                    }
                    if (res2[i]['train_id'] == 6) {
                      res2[i]['desc'].push('综合训练A')
                    }
                    if (res2[i]['train_id'] == 7) {
                      res2[i]['desc'].push('综合训练B')
                    }

                    for (var n = 0; n < train.length; n++) {
                      if (res2[i].train_id == train[n]) {
                        data_train.push(res2[i])
                        break
                      }
                    }
                  }
                  if (data_train.length > 0) {
                    var message = { status: 1, data: data_train }
                    resolve(message)
                  } else {
                    var message = { status: 0 }
                    resolve(message)
                  }
                })
                .catch(function(error) {
                  fsWrite('管理员查询train记录：' + error)
                })
            } else {
              var message = { status: 0 }
              resolve(message)
            }
          })
          .catch(function(error) {
            fsWrite('管理员查询train记录：' + error)
          })
      }
    })
  }
  let result = await post()
  return result
}
//查看长期训练记录
export async function findAdminTrainRecordLong(data) {
  let post = () => {
    return new Promise(resolve => {
      var data_res = new Array()
      db.user
        .get({ name: data.name })
        .then(function(res) {
          if (res) {
            db.train_record
              .where('user_id')
              .equals(res['id'])
              .toArray()
              .then(function(res2) {
                if (data['create_time'].length > 0) {
                  for (var i = 0; i < res2.length; i++) {
                    if (data['train_id'] == res2[i]['train_id']) {
                      if (
                        data['create_time'][0] <= res2[i]['create_time'] &&
                        res2[i]['create_time'] <= data['create_time'][1]
                      ) {
                        data_res.push(res2[i])
                      }
                    }
                  }
                  if (data_res) {
                    var message = { status: 1, data: data_res }
                    resolve(message)
                  } else {
                    var message = { status: 0 }
                    resolve(message)
                  }
                } else {
                  for (var i = 0; i < res2.length; i++) {
                    if (data['train_id'] == res2[i]['train_id']) {
                      data_res.push(res2[i])
                    }
                  }
                  if (data_res) {
                    var message = { status: 1, data: data_res }
                    resolve(message)
                  } else {
                    var message = { status: 0 }
                    resolve(message)
                  }
                }
              })
              .catch(function(error) {
                fsWrite('管理员查询trainlong记录：' + error)
              })
          } else {
            var message = { status: 0 }
            resolve(message)
          }
        })
        .catch(function(error) {
          fsWrite('管理员查询trainlong记录ID：' + error)
        })
    })
  }
  let result = await post()
  return result
}
