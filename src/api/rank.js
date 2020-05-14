import axios from 'axios'

// 视频排行榜
export function getRank (rid, day) {
  const url = '/proxyApi/x/web-interface/ranking'
  const data = {
    rid,
    day
  }

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res)
  })
}
