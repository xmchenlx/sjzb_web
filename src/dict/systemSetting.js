/** ----------------This is lx's Project Named BRPS!^_^-----------------------------------
  lx的小天地下属项目 版权所有(c) 2018 - 2020
  文  件：systemSetting.js
  中文名：项目公共函数
  作  者：chenlx | 邮箱：me@chenlx.top
  时  间：2020年07月20日 17:19:06
  描  述： 用于存放一些大部分页面都需要用到的重复的函数;
----------------------------------------------------------------------------------> */
import moment from 'moment'
export function getTimeToMadeGreetins () {
  // 分析时间返回问候语
  let now = moment()
    .locale('zh-cn')
    .format('HH')
  now = parseInt(now)
  if (now >= 0 && now < 5) {
    return '夜深了，别一直熬夜啦'
  } else if (now >= 5 && now < 11) {
    return '早上好，今天也是满满的正能量呢'
  } else if (now >= 11 && now < 13) {
    return '中午好，午觉不要睡>30min哦'
  } else if (now >= 13 && now < 18) {
    return '下午好，精神小伙'
  } else if (now >= 18 && now < 24) {
    return '晚上好呀，'
  }
}

export function dateformat (t) {
  return moment(t).format('YYYY-MM-DD')
}
