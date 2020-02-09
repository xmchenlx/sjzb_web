import axios from '../../node_modules/axios'

const api = {
  getAllBill: 'Bill/getAllBill',
  getAllBillInRange: 'Bill/getAllBillInRange',
  insertOneRecord: 'Bill/addOneRecord',
  getSpecifidBillInRange: '/Bill/getSpecifidBillInRange',
  getPast7DaysPayList: '/Bill/getPast7DayPayList',
  getPast7DayIncomeList: 'Bill/getPast7DayIncomeList'
}
export default api

export function getPast7DayIncomeList () {
  return axios({
    url: `${api.getPast7DayIncomeList}`,
    method: 'get'
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
    url: `${api.getSpecifidBillInRange}?a=` + p[0] + `&b=` + p[1],
    method: 'get'
    // get方法传参用params，post方法传参用data
  })
}

export function insertOneRecord (param) {
  return axios({
    url: `${api.insertOneRecord}`,
    method: 'post',
    data: param
    // get方法传参用params，post方法传参用data
  })
}
