import axios from '../../node_modules/axios'
// axios.defaults.withCredentials = true
// 可以通过这种方式给axios设置的默认请求头
axios.defaults.headers = {
  'Content-Type': 'application/json'
}
const api = {
  readOneConfig: 'wc/readOneConfig'

}
export default api

export function getOnewc (param) {
  return axios({
    url: `${api.readOneConfig}`,
    method: 'get',
    params: { v: param }
    // get方法传参用params，post方法传参用data
  })
}

export function getIKJson (param) {
  return axios({
    url: `http://chenlx.top/data/IK.json`,
    method: 'get'
    // get方法传参用params，post方法传参用data
  })
}
