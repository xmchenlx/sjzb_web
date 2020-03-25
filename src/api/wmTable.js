import axios from '../../node_modules/axios'
// axios.defaults.withCredentials = true
// 可以通过这种方式给axios设置的默认请求头
axios.defaults.headers = {
  'Content-Type': 'application/json'
}
const api = {
  getWM: 'wm/getWM'

}
export default api

export function getWM () {
  return axios({
    url: `${api.getWM}`,
    method: 'get'
    // get方法传参用params，post方法传参用data
  })
}
