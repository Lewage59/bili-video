import axios from 'axios'

export function getRegion (ps, rid) {
  const url = '/proxyApi/x/web-interface/dynamic/region'
  const data = {
    rid
  }
  if (ps >= 0) data.ps = ps
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res)
  })
}
