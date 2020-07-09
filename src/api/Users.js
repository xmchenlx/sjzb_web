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
  conanTVList: 'conan/getConanList',
  getValidCode: 'User/userRegisterSendSMS',
  checkCode: 'User/validYZM',
  isTelRegistered: 'User/checkTelRegistered'

}
export default api
export function unlogin () {
  return axios({
    url: `${api.unlogin}`,
    method: 'get'
    // get方法传参用params，post方法传参用data
  })
}

export function checkTelRegistered (t) {
  return axios({
    url: `${api.isTelRegistered}`,
    method: 'post',
    data: t
    // get方法传参用params，post方法传参用data
  })
}

export function getValidCode (t) {
  return axios({
    url: `${api.getValidCode}`,
    method: 'get',
    params: {
      'userTel': t
    }
    // get方法传参用params，post方法传参用data
  })
}

export function checkCode (t) {
  return axios({
    url: `${api.checkCode}`,
    method: 'get',
    params: {
      'useryzm': t
    }

    // get方法传参用params，post方法传参用data
  })
}

/**
 * 用户登录
 * @param {*} u
 */
export function validateUser (u) {
  return axios({
    url: `${api.userLogin}`,
    method: 'post',
    withCredentials: true,
    data: u

    // get方法传参用params，post方法传参用data
  })
}

/**
 * 注册用户
 * @param {*} u
 */
export function userReg (u) {
  return axios({
    url: `${api.userReg}`,
    method: 'post',
    withCredentials: true,
    data: u

    // get方法传参用params，post方法传参用data
  })
}

/**
 * 获取银弹数据站json
 */
export function sbsubJson () {
  return axios({
    url: `${api.conanTVList}`,
    method: 'get',
    timeout: 100000

    // get方法传参用params，post方法传参用data
  })
}
