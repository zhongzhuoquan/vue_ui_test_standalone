/*
 * @Author      : 钟焯权
 * @Date        : 2020-12-01 10:56:58
 * @LastEditTime: 2020-12-29 11:37:50
 * @Description :
 */
import axios from 'axios'
import store from '../store'
axios.defaults.baseURL = 'http://106.52.43.100/pd/public/api.php/'

export async function getBasicApi(data, url) {
  let post = () => {
    return new Promise(resolve => {
      axios({
        method: 'post',
        url: url,
        data: data ? JSON.stringify(data) : '',
        transformRequest: [
          function(data) {
            var oMyForm = new FormData()
            oMyForm.append('data', data)
            return oMyForm
          }
        ],
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          alert('网络请求错误')
        })
    })
  }
  let result = await post()
  return result
}
//删除只有ID参数
export async function deleteApi(data, url) {
  let post = () => {
    return new Promise(resolve => {
      axios({
        method: 'post',
        url: url,
        data: data,
        transformRequest: [
          function(data) {
            var oMyForm = new FormData()
            oMyForm.append('id', data)
            return oMyForm
          }
        ],
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          alert('网络请求错误')
        })
    })
  }
  let result = await post()
  return result
}
//删除不只有ID
export async function deleteAnyApi(data, url) {
  let post = () => {
    return new Promise(resolve => {
      axios({
        method: 'post',
        url: url,
        data: JSON.stringify(data),
        transformRequest: [
          function(data) {
            var oMyForm = new FormData()
            oMyForm.append('data', data)
            return oMyForm
          }
        ],
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          alert('网络请求错误')
        })
    })
  }
  let result = await post()
  return result
}
export function recordSaveApi(data, url) {
  axios({
    method: 'post',
    url: url,
    data: JSON.stringify(data),
    transformRequest: [
      function(data) {
        var oMyForm = new FormData()
        oMyForm.append('data', data)
        return oMyForm
      }
    ],
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.data['status'] == 200) {
        store.dispatch('setTrainId', response.data['id'])
      } else {
        alert(response.data['message'])
      }
    })
    .catch(function(error) {
      alert('网络请求错误')
    })
}
