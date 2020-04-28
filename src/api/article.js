import axios from '../../node_modules/axios'
// axios.defaults.withCredentials = true
// 可以通过这种方式给axios设置的默认请求头
axios.defaults.headers = {
  'Content-Type': 'application/json'
}
const api = {
  getArticleList: 'Article/getArticleList',
  getArticleInfo: 'Article/getArticleInfo',
  insertOneArticle: 'Article/insertOneArticle'

}
export default api

export function getArticleList (param) {
  return axios({
    url: `${api.getArticleList}`,
    method: 'get',
    params: param
    // get方法传参用params，post方法传参用data
  })
}

export function getArticleInfo (param) {
  return axios({
    url: `${api.getArticleInfo}`,
    method: 'get',
    params: param
    // get方法传参用params，post方法传参用data
  })
}

export function addNewArticle (param) {
  return axios({
    url: `${api.insertOneArticle}`,
    method: 'post',
    data: param
    // get方法传参用params，post方法传参用data
  })
}
