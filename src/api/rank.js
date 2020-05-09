import axios from 'axios'

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
