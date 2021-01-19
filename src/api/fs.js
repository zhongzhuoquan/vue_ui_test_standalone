/*
 * @Author      : 钟焯权
 * @Date        : 2020-12-23 10:13:07
 * @LastEditTime: 2021-01-05 16:39:20
 * @Description :
 */
export function fsWrite(data) {
  let fs = require('fs')
  var date = new Date()
  fs.writeFile('data.txt', '\n'+date+'\n'+data, { 'flag': 'a+' }, function(err) {
    if (err) {
      return console.error(err)
    }
  })
  // fs.writeFileSync('data.txt', date, 'a+')
}
