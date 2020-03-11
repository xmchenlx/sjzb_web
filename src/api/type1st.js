import axios from '../../node_modules/axios'
axios.defaults.withCredentials = true
const api = {
  getAllType: 'type1st/getAllType1Info'

}
export default api

export function getAllType () {
  return axios({
    url: `${api.getAllType}`,
    method: 'get'
    // get方法传参用params，post方法传参用data

  })
}
