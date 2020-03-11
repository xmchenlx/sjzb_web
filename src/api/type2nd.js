import axios from '../../node_modules/axios'
axios.defaults.withCredentials = true
const api = {
  getAllType2Info: 'type2nd/getAllType2Info',
  getTypeListByFid: 'type2nd/getTypeListByFid'

}
export default api

export function getAllType2Info () {
  return axios({
    url: `${api.getAllType2Info}`,
    method: 'get'
    // get方法传参用params，post方法传参用data

  })
}

export function getTypeListByFid (param) {
  return axios({
    url: `${api.getTypeListByFid}?fid=` + param,
    method: 'get'
    // get方法传参用params，post方法传参用data
  })
}
