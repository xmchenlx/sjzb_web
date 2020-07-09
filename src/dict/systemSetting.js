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
