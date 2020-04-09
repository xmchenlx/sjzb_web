import axios from '../../node_modules/axios'
axios.defaults.withCredentials = true
// 可以通过这种方式给axios设置的默认请求头
// axios.defaults.headers = {
//   'Content-Type': 'application/x-www-form-urlencoded'
// }
const api = {
  unlogin: 'User/unlogin',
  userLogin: 'User/validateUser',
  userReg: 'User/userReg',
  conanTVList: 'conan/getConanList'

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

export function userReg (u) {
  return axios({
    url: `${api.userReg}`,
    method: 'post',
    withCredentials: true,
    data: u

    // get方法传参用params，post方法传参用data
  })
}

export function vuephp () {
  return axios({
    url: 'http://localhost:666/fruitsale/vuetest.php',
    method: 'get'
    // get方法传参用params，post方法传参用data
  })
}

export function sbsubJson () {
  return axios({
    url: `${api.conanTVList}`,
    method: 'get',
    timeout: 100000

    // get方法传参用params，post方法传参用data
  })
}
