function padLeftZero (str) {
  str = str + ''
  return ('00' + str).substr(str.length)
}

// 格式化数量，超过1万则转换单位
export function formatNumber (num) {
  if (num >= 10000) {
    num = parseInt(num / 1000)
    num = parseFloat(num / 10)
    return num + '万'
  } else {
    return num
  }
}

// 格式化日期
export function formatDate (timestamp, fmt) {
  var date = new Date(timestamp * 1000)
  var nowYear = new Date().getFullYear()

  // 如果需要年份，则格式化年份；如果不需要，则只有当前年没有年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  } else if (date.getFullYear() < nowYear) {
    fmt = date.getFullYear() + '-' + fmt
  }

  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }

  return fmt
}

// 格式化时间
export function formatTime (time) {
  let h = parseInt(time / 3600)
  let m = parseInt(time % 3600 / 60)
  let s = time % 60
  m = h ? padLeftZero(m) : m
  let res = (h ? h + ':' : '') + m + ':' + (padLeftZero(s) || '00')
  return res
}

// 防抖
export function debounce (func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
