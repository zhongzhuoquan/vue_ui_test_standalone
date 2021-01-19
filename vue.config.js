/*
 * @Author      : 钟焯权
 * @Date        : 2020-11-04 09:18:36
 * @LastEditTime: 2020-11-27 15:11:40
 * @Description :
 */
module.exports = {
  pluginOptions: {
    electronBuilder: {
      /* 开启node集成 */
      nodeIntegration: true,
      /* 加载编译原生模块 */
      externals: ['serialport']
    }
  }
}

