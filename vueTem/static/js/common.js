// import { rootPath } from '../../src/api/apiConfig'
import axios from 'axios'
import { Message, Notification } from 'element-ui'
/**
 * post请求
 * @DateTime 2018-4-10
 * @param    {[string]}   url [地址]
 * @param    {[object]}   data   [数据]
 * @param    {{object}}  options 这个参数供扩展使用，暂时没有加
 */
export const post = (url, data, options = { }) => {
  if (!url) {
    console.log(new Error('地址是必须的'))
    return false
  }
  return axios(Object.assign({
    method: 'POST',
    url: url,
    data: data
  }, options)).then(res => {
    return Promise.resolve(res)
  }, res => {
    return Promise.reject(res)
  })
}
/**
 * get请求
 * @DateTime 2018-4-10
 * @param    {[string]}   url [地址]
 * @param    {[object]}   data   [数据]
 */
export const get = (url, data) => {
  if (!url) {
    console.log(new Error('地址是必须的'))
    return false
  }
  // const baseUrl = rootPath + url
  return axios({
    method: 'GET',
    url: url,
    data: data
  }).then(res => {
    return Promise.resolve(res)
  }, res => {
    return Promise.reject(res)
  })
}
/**
 * 中部的alert
 * @DateTime 2018-4-10
 * @param    {[string]}   msg [要提示的信息]
 */
export const msgbox = {
  success (msg) {
    Message({
      message: msg,
      type: 'success'
    })
  },
  warning (msg) {
    Message({
      message: msg,
      type: 'warning'
    })
  },
  error (msg) {
    Message({
      message: msg,
      type: 'error'
    })
  }
}
/**
 * 右上角提示框
 * @DateTime 2018-4-10
 * @param    {[string]}   msg [要提示的信息]
 */
export const notice = {
  success (msg) {
    Notification({
      title: '成功',
      message: msg,
      type: 'success'
    })
  },
  warning (msg) {
    Notification({
      title: '警告',
      message: msg,
      type: 'warning'
    })
  },
  error (msg) {
    Notification({
      title: '错误',
      message: msg,
      type: 'error'
      // duration: 0
    })
  }
}

/**
 * 时间戳转为格式化时间
 * @DateTime 2018-4-10
 * @param    {[date]}   timestamp [时间戳]
 * @param    {[string]}   formats   [时间格式]
 */
export const formatDate = (timestamp, formats) => {
  /*
  formats格式包括
  1. Y-M-D
  2. Y-M-D h:m:s
  3. Y年M月D日
  4. Y年M月D日 h时m分
  5. Y年M月D日 h时m分s秒
  示例：console.log(formatDate(1500305226034, 'Y年M月D日 h:m:s')) ==> 2017年07月17日 23:27:06
   */
  formats = formats || 'Y-M-D'
  var myDate = timestamp ? new Date(timestamp) : new Date()
  var year = myDate.getFullYear()
  var month = formatDigit(myDate.getMonth() + 1)
  var day = formatDigit(myDate.getDate())
  var hour = formatDigit(myDate.getHours())
  var minute = formatDigit(myDate.getMinutes())
  var second = formatDigit(myDate.getSeconds())
  return formats.replace(/Y|M|D|h|m|s/g, function (matches) {
    return ({
      Y: year,
      M: month,
      D: day,
      h: hour,
      m: minute,
      s: second
    })[matches]
  })
  // 小于10补0
  function formatDigit (n) {
    return n.toString().replace(/^(\d)$/, '0$1')
  }
}
