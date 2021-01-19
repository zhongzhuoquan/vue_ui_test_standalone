<!--
 * @Author      : 钟焯权
 * @Date        : 2020-11-03 17:19:57
 * @LastEditTime: 2021-01-15 10:40:07
 * @Description : 
-->
<template>
  <div id="app">
    <router-view></router-view>
    <div class="footer">
      <span class="devicesId">{{ devicesId ? devicesId : '无设备ID' }}</span>
      <span class="pa" v-if="data && show_status == true"
        >{{ data + 'mbar' }}
      </span>
      <span class="pa" v-else>
        <button @click="reInit2" :disabled="disable_status">
          无数据请拔掉传感器再插入点击尝试
        </button></span
      >
    </div>
    <!-- 模态框 -->
    <el-dialog
      append-to-body
      title="设置设备ID"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-form label-width="0px">
        <el-form-item label="设备ID" :label-width="formLabelWidth">
          <el-input
            v-model="dialogForm.devicesId"
            prefix-icon="el-icon-s-platform"
            placeholder="请输入设备ID"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="initDevicesId">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss">
#app {
  height: 100%;
  width: 100%;
}
body,
html {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.footer {
  position: fixed;
  bottom: 0%;
  height: 20px;
  width: 100%;
}
.devicesId {
  position: fixed;
  left: 0%;
}
.pa {
  position: fixed;
  right: 0%;
}
</style>
<script>
import SerialPort from 'serialport'
import ByteLength from '@serialport/parser-byte-length'
import { getAdministratorsApi } from '@/api/adminstratorsGetApi.js'
import { fsWrite } from '@/api/fs.js'
//调用indexedDB数据库
import { addDevices, addTest, addTrain, addAdmin } from '@/api/dexie.js'
export default {
  name: 'app',
  data() {
    return {
      timeOut: null,
      timer: null, // 定时器名称
      data: '',
      open: '点击',
      close: '关闭',
      status: true,
      show_status: true,
      disable_status: false,
      dialogFormVisible: false,
      dialogForm: {
        devicesId: 'KHY-PD-'
      },
      formLabelWidth: '120px',
      devicesId: localStorage.getItem('devicesId'),
      successData: [],
      isOpen: 1, //串口开关 1为开 0为关
      senddata1: [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
      senddata2: [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
      senddata3: [0x80, 0x06, 0x01, 0x0b, 0x15, 0x1f, 0x29, 0x48],
      senddata4: [0x81, 0x01, 0x00, 0x00, 0x00, 0x00, 0x01, 0xc3],
      senddata5: [0x81, 0x03, 0x00, 0x00, 0x00, 0x00, 0x01, 0xf3],
      senddata6: [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
      senddata7: [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
      senddata8: [0x81, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xaa],
      senddata9: [0x8e, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x12] //初始化发送传感器数据
    }
  },
  // watch: {
  //   status: {
  //     handler(newValue, oldValue) {
  //       if (newValue == false) {
  //         SerialPort.list().then(ports => {
  //           let comPath = ''
  //           console.log(ports)
  //           for (const port of ports) {
  //             if (port.pnpId.substring(0, 7) == 'FTDIBUS') {
  //               comPath = port.path
  //               break
  //             }
  //           }
  //           if (comPath) {
  //             this.port = new SerialPort(comPath, {
  //               baudRate: 9600,
  //               autoOpen: false
  //             })
  //             this.port.on('open', () => {
  //               this.$message({ message: '串口打开', center: true })
  //               this.status = true
  //               console.log(this.status)
  //             })
  //             this.port.on('close', () => {
  //               this.$message({ message: '串口关闭，请刷新', center: true })
  //               this.status = false
  //               console.log(this.status)
  //             })
  //             this.port.on('error', () => {
  //               this.$message({ message: '读取失败', center: true })
  //             })
  //             this.port.open()
  //             // 发送数据初始化接口
  //             this.port.write(this.senddata1, () => {
  //               this.port.write(this.senddata2, () => {
  //                 this.port.write(
  //                   this.senddata3,
  //                   setTimeout(() => {
  //                     this.port.write(
  //                       this.senddata4,
  //                       setTimeout(() => {
  //                         this.port.write(
  //                           this.senddata5,
  //                           setTimeout(() => {
  //                             this.port.write(this.senddata6, () => {
  //                               this.port.write(this.senddata7, () => {
  //                                 this.port.write(
  //                                   this.senddata8,
  //                                   setTimeout(() => {
  //                                     this.port.write(this.senddata9, () => {
  //                                       this.parser = this.port.pipe(
  //                                         new ByteLength({ length: 8 })
  //                                       )
  //                                       this.parser.on('data', data => {
  //                                         if (data[0] == 14) {
  //                                           let res = this.Getresult(data)
  //                                           res = (res - 1000).toFixed(1)
  //                                           if (res >= -100 && res <= 450) {
  //                                             this.data = res
  //                                             this.successData.push(res)
  //                                             this.$store.dispatch(
  //                                               'setData',
  //                                               res
  //                                             )
  //                                           }
  //                                         }
  //                                       })
  //                                     })
  //                                   }, 100)
  //                                 )
  //                               })
  //                             })
  //                           }, 100)
  //                         )
  //                       }, 100)
  //                     )
  //                   }, 100)
  //                 )
  //               })
  //             })

  //             // this.port.write(this.senddata9)
  //             // // 处理数据
  //             // this.parser = this.port.pipe(new ByteLength({ length: 8 }))
  //             // this.parser.on('data', data => {
  //             //   if (data[0] != 14) {
  //             //     this.port.write(this.senddata9)
  //             //      console.log(data)
  //             //   } else {
  //             //     console.log(data)
  //             //     const res = this.Getresult(data)
  //             //     console.log(res)
  //             //   }
  //             // })
  //           } else {
  //             this.$alert(
  //               '没有检测到传感器！！！请检查传感器，点击【确认】重新初始化',
  //               '',
  //               {
  //                 showClose: false,
  //                 confirmButtonText: '确定',
  //                 callback: action => {
  //                   this.init()
  //                 }
  //               }
  //             )
  //             // this.$message({ message: '没有传感器', center: true })
  //           }
  //         })
  //       }
  //     }
  //   }
  // },
  created() {
    this.init()
  },
  mounted() {
    // this.reInit()
    this.initDialogFormVisible()
  },
  computed: {
    getDataStatus() {
      console.log(this.$store.getters.getDataStatus)
      return this.$store.getters.getDataStatus
    }
  },
  methods: {
    //设置模态框显示
    initDialogFormVisible() {
      if (localStorage.getItem('devicesId') == null) {
        this.dialogFormVisible = true
      }
    },
    //设置设备id
    async initDevicesId() {
      const rLoading = this.openLoading()
      if (this.dialogForm.devicesId.length != 15) {
        this.$message.error({ message: '设备编号长度不符合', center: true })
        rLoading.close()
        return
      }
      if (this.dialogForm.devicesId.substring(0, 6) != 'KHY-PD') {
        this.$message.error({ message: '设备编号有错', center: true })
        rLoading.close()
        return
      }

      try {
        addDevices(
          1,
          this.dialogForm.devicesId,
          this.$moment().format('YYYY-MM-DD HH:mm:ss')
        )
        addTest(1, 'EnduranceMuscleTest')
        addTrain(1, 'BasicTestOfSlowMuscle', '慢肌基础训练')
        addTrain(2, 'SlowMuscleCoordinationTest', '慢肌协调训练')
        addTrain(3, 'AdvancedTestOfSlowMuscle', '慢肌进阶训练')
        addTrain(4, 'FastMuscleCoordinationTest', '快肌协调训练')
        addTrain(5, 'AdvancedFastMuscleTest', '快肌进阶训练')
        addTrain(6, 'ComprehensiveTestA', '综合训练A')
        addTrain(7, 'ComprehensiveTestB', '综合训练B')
        addAdmin()
        rLoading.close()
        localStorage.setItem('devicesId', this.dialogForm.devicesId)
        this.dialogFormVisible == false
        this.$message({ message: '设备设置成功', center: true })
        location.reload()
      } catch (error) {
        fsWrite('设备设置ID：' + error)
        this.$message.error({ message: '设置ID初始化失败！', center: true })
        rLoading.close()
      }

      // this.axios({
      //   method: 'post',
      //   url: 'devices/devices_register_api',
      //   data: this.dialogForm,
      //   transformRequest: [
      //     function(data) {
      //       var oMyForm = new FormData()
      //       oMyForm.append('name', data.devicesId)
      //       return oMyForm
      //     }
      //   ],
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // })
      //   .then(response => {
      //     if (response.data['status'] == 200) {
      //       rLoading.close()
      //       localStorage.setItem('devicesId', this.dialogForm.devicesId)
      //       this.dialogFormVisible == false
      //       this.$message({ message: response.data['message'], center: true })
      //       location.reload()
      //     } else {
      //       this.$message({ message: response.data['message'], center: true })
      //       rLoading.close()
      //     }
      //   })
      //   .catch(function(error) {
      //     fsWrite('设备设置ID：' + error)
      //     this.$message.error({ message: '网络请求错误', center: true })
      //     location.reload()
      //   })
    },
    //转化位2进制
    Tobin(data) {
      var res = ''
      if (data == 0) {
        return '00000000'
      } else {
        while (data != 0) {
          res = (data % 2) + res
          data = parseInt(data / 2)
        }
        return this.PrefixInteger(res, 8)
      }
    },
    //补充0 到8位
    PrefixInteger(num, m) {
      return (Array(m).join(0) + num).slice(-m)
    },
    //得出压力值
    Getresult(data) {
      var result = ''
      result =
        this.Tobin(parseInt(data[4])).toString() +
        this.Tobin(parseInt(data[3])).toString()
      return parseInt(result, 2) / 10
    },
    init() {
      SerialPort.list().then(ports => {
        let comPath = ''
        console.log(ports)
        for (const port of ports) {
          if (port.pnpId.substring(0, 7) == 'FTDIBUS') {
            comPath = port.path
            break
          }
        }
        if (comPath) {
          this.port = new SerialPort(comPath, {
            baudRate: 9600,
            autoOpen: false
          })
          this.port.on('open', () => {
            this.$message.success({ message: '串口打开', center: true })
          })
          this.port.on('close', () => {
            this.show_status = false
            console.log(this.show_status)
            this.$message.error({
              message: '串口关闭，请拔掉传感器再插入点击尝试',
              center: true
            })
          })
          this.port.on('error', () => {
            this.show_statis = true
            this.$message.error({ message: '读取失败', center: true })
          })
          this.port.open()
          // 发送数据初始化接口
          this.port.write(this.senddata1, () => {
            this.port.write(this.senddata2, () => {
              this.port.write(
                this.senddata3,
                setTimeout(() => {
                  this.port.write(
                    this.senddata4,
                    setTimeout(() => {
                      this.port.write(
                        this.senddata5,
                        setTimeout(() => {
                          this.port.write(this.senddata6, () => {
                            this.port.write(this.senddata7, () => {
                              this.port.write(
                                this.senddata8,
                                setTimeout(() => {
                                  this.port.write(this.senddata9, () => {
                                    this.parser = this.port.pipe(
                                      new ByteLength({ length: 8 })
                                    )
                                    this.parser.on('data', data => {
                                      if (data[0] == 14) {
                                        let res = this.Getresult(data)
                                        res = (res - 1000).toFixed(1)
                                        if (res >= -100 && res <= 450) {
                                          this.data = res
                                          this.successData.push(res)
                                          this.$store.dispatch('setData', res)
                                        }
                                      }
                                    })
                                  })
                                }, 100)
                              )
                            })
                          })
                        }, 100)
                      )
                    }, 100)
                  )
                }, 100)
              )
            })
          })

          // this.port.write(this.senddata9)
          // // 处理数据
          // this.parser = this.port.pipe(new ByteLength({ length: 8 }))
          // this.parser.on('data', data => {
          //   if (data[0] != 14) {
          //     this.port.write(this.senddata9)
          //      console.log(data)
          //   } else {
          //     console.log(data)
          //     const res = this.Getresult(data)
          //     console.log(res)
          //   }
          // })
        } else {
          this.$alert(
            '没有检测到传感器！！！请检查传感器，点击【确认】重新初始化',
            '',
            {
              showClose: false,
              confirmButtonText: '确定',
              callback: action => {
                this.init()
              }
            }
          )
          // this.$message({ message: '没有传感器', center: true })
        }
      })
    },
    reInit() {
      this.timeOut = setTimeout(() => {
        if (this.data == '') {
          this.$alert('传感器初始化失败！！！点击【确认】重新初始化', '', {
            showClose: false,
            confirmButtonText: '确定',
            callback: action => {
              location.reload()
            }
          })
        }
      }, 3000)
    },
    reInit2() {
      this.disable_status = true
      SerialPort.list().then(ports => {
        let comPath = ''
        console.log(ports)
        for (const port of ports) {
          if (port.pnpId.substring(0, 7) == 'FTDIBUS') {
            comPath = port.path
            break
          }
        }
        if (comPath) {
          this.port = new SerialPort(comPath, {
            baudRate: 9600,
            autoOpen: false
          })
          this.port.on('open', () => {
            this.$message.success({ message: '串口打开', center: true })
            this.disable_status = false
            this.show_status = true
          })
          this.port.on('close', () => {
            this.$message.error({ message: '串口关闭，请刷新', center: true })
            this.disable_status = false
            this.show_status = false
          })
          this.port.on('error', () => {
            this.$message({
              message: '请拔掉传感器再插入点击尝试',
              center: true
            })
            this.disable_status = false
          })
          this.port.open()
          // 发送数据初始化接口
          this.port.write(this.senddata1, () => {
            this.port.write(this.senddata2, () => {
              this.port.write(
                this.senddata3,
                setTimeout(() => {
                  this.port.write(
                    this.senddata4,
                    setTimeout(() => {
                      this.port.write(
                        this.senddata5,
                        setTimeout(() => {
                          this.port.write(this.senddata6, () => {
                            this.port.write(this.senddata7, () => {
                              this.port.write(
                                this.senddata8,
                                setTimeout(() => {
                                  this.port.write(this.senddata9, () => {
                                    this.parser = this.port.pipe(
                                      new ByteLength({ length: 8 })
                                    )
                                    this.parser.on('data', data => {
                                      if (data[0] == 14) {
                                        let res = this.Getresult(data)
                                        res = (res - 1000).toFixed(1)
                                        if (res >= -100 && res <= 450) {
                                          this.data = res
                                          this.successData.push(res)
                                          this.$store.dispatch('setData', res)
                                        }
                                      }
                                    })
                                  })
                                }, 100)
                              )
                            })
                          })
                        }, 100)
                      )
                    }, 100)
                  )
                }, 100)
              )
            })
          })
        } else {
          this.$message({ message: '没有检测到传感器', center: true })
        }
      })
    }
  }
}
</script>
<style scoped>
#app {
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>
