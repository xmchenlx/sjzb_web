import axios from '../../node_modules/axios'
axios.defaults.withCredentials = true
// 可以通过这种方式给axios设置的默认请求头
// axios.defaults.headers = {
//   'Content-Type': 'application/json'
// }
const api = {
  getAllBill: 'Bill/getAllBill',
  getAllBillInRange: 'Bill/getAllBillInRange',
  insertOneRecord: 'Bill/addOneRecord',
  updateOneRecord: 'Bill/updateOneRecord',
  removeOneRecord: 'Bill/removeOneRecord',
  getSpecifidBillInRange: '/Bill/getSpecifidBillInRange',
  getPast7DaysPayList: '/Bill/getPast7DayPayList',
  getPast7DayIncomeList: 'Bill/getPast7DayIncomeList',
  searchOneBillInfo: 'Bill/searchOneBillInfo',
  search0BillReportData: 'Bill/searchBillReportData',
  getDetailFromtypename: 'Bill/lookUpOneDetailType1st',
  insertMoreRecord: 'Bill/insertMoreBillRecord'

}
export default api

export function searchOneDetailType1st (u, typename) {
  return axios({
    url: `${api.getDetailFromtypename}`,
    method: 'get',
    withCredentials: true,
    params: {
      'uid': parseInt(u),
      'typename': typename
    }
    // get方法传参用params，post方法传参用data
  })
}

export function getBillReportData (u, dire) {
  return axios({
    url: `${api.search0BillReportData}`,
    method: 'get',
    withCredentials: true,
    params: {
      uid: parseInt(u),
      d: dire !== '' ? dire : 0
    }
    // get方法传参用params，post方法传参用data
  })
}

export function getPast7DayIncomeList () {
  return axios({
    url: `${api.getPast7DayIncomeList}`,
    method: 'get',
    withCredentials: true
    // get方法传参用params，post方法传参用data
  })
}

export function getPast7DaysPayList () {
  return axios({
    url: `${api.getPast7DaysPayList}`,
    method: 'get'
    // get方法传参用params，post方法传参用data
  })
}

export function getAllBill () {
  return axios({
    url: `${api.getAllBill}`,
    method: 'get'

    // get方法传参用params，post方法传参用data

  })
}

export function getAllBillInRange (param) {
  return axios({
    url: `${api.getAllBillInRange}`,
    method: 'get',
    params: param

    // get方法传参用params，post方法传参用data
  })
}

export function getSpecifidBillInRange (p) {
  return axios({
    // url: `${api.getSpecifidBillInRange}?a=` + p[0] + `&b=` + p[1],
    url: `${api.getSpecifidBillInRange}`,
    method: 'get',
    params: p

    // get方法传参用params，post方法传参用data
  })
}

export function insertOneRecord (param) {
  return axios({
    url: `${api.insertOneRecord}`,
    method: 'post',
    data: param
  })
}

/**
 * 新增多条相同类型账单
 * @param {*} param
 */
export function insertMoreRecord (param, t, s) {
  return axios({
    url: `${api.insertMoreRecord}`,
    method: 'post',
    data: {
      'times': parseInt(t),
      'bd': param,
      'step': parseInt(s)
    }
  })
}

/***
 * 更新一条账单信息
 */
export function updateOneRecord (param) {
  return axios({
    url: `${api.updateOneRecord}`,
    withCredentials: true,
    method: 'put',
    data: param
    // get方法传参用params，post方法传参用data
  })
}

/**
 * 删除一条记录
 * @param {bid} p
 */
export function removeOneRecord (p) {
  return axios({
    url: `${api.removeOneRecord}?bid=` + p,
    method: 'get'
    // get方法传参用params，post方法传参用data
  })
}

export function searchOneBillInfo (param) {
  return axios({
    url: `${api.searchOneBillInfo}?bid=` + param,
    method: 'get'
    // get方法传参用params，post方法传参用data
  })
}
