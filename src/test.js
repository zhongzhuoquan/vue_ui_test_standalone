/*
 * @Author      : 钟焯权
 * @Date        : 2020-11-13 10:16:09
 * @LastEditTime: 2020-11-14 11:13:06
 * @Description :
 */
export default {
  data() {
    return {
      open: '点击',
      close: '关闭',
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
  methods: {
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
            console.log('Data:', '串口打开成功')
          })
          this.port.on('close', () => {
            console.log('Data:', '串口关闭成功')
          })
          this.port.on('error', function() {
            console.log('Data:', '读取失败')
          })
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
                                      // console.log(data)
                                      if (data[0] == 14) {
                                        const res = this.Getresult(data)
                                        if (res > 700 && res < 2000) {
                                          return res
                                          // console.log(res)
                                          // this.successData.push(res)
                                          // console.log(this.successData)
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
          alert('没有传感器')
        }
      })
    }
  }
}
