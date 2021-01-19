/*
 * @Author      : 钟焯权
 * @Date        : 2020-12-16 10:49:43
 * @LastEditTime: 2021-01-12 16:01:26
 * @Description : 
 */
import axios from 'axios';
export async function getAdministratorsApi(data, url) {
    let post = () => {
        return new Promise(resolve => {
            axios({
                method: 'post',
                url: url,
                data: data ? JSON.stringify(data) : '',
                transformRequest: [
                    function(data) {
                        var oMyForm = new FormData();
                        oMyForm.append('data', data);
                        return oMyForm;
                    }
                ],
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    alert('网络请求错误');
                });
        });
    };
    let result = await post();
    return result;
}