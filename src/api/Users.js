import axios from '../../node_modules/axios'
axios.defaults.withCredentials = true
// 可以通过这种方式给axios设置的默认请求头
// axios.defaults.headers = {
//   'Content-Type': 'application/x-www-form-urlencoded'
// }
const api = {
  unlogin: 'User/unlogin',
  userLogin: 'User/validateUser'

}
export default api
export function unlogin () {
  return axios({
    url: `${api.unlogin}`,
    method: 'get'
    // get方法传参用params，post方法传参用data
  })
}

export function validateUser (u) {
  return axios({
    url: `${api.userLogin}`,
    method: 'post',
    withCredentials: true,
    data: u

    // get方法传参用params，post方法传参用data
  })
}
