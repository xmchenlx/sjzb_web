const tagDict = {
  1: '网站公告',
  2: '普文',
  3: '编程',
  4: '通知',
  5: '笔记',
  6: '影视',
  7: '生活',
  8: '小说',
  9: '日记',
  0: '其他'
}
export default tagDict

export function readTagName (n) {
  if (n === null || n === '') { return '未知类别' }
  return tagDict[n]
}

export function returnTagDict () {
  // return tagDict
  let d = []
  // for (let i = 0; i < tagDict.size; i++) {
  //   d.push({
  //     'value': i,
  //     'label': tagDict[i]
  //   })
  // };
  for (let key in tagDict) {
    d.push({
      'value': key,
      'label': tagDict[key]
    })
  }
  console.log(d)
  return d
}
