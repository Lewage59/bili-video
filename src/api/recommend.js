import axios from 'axios'

export function getRecommend () {
  const url = '/proxyApi/recommend'
  const data = {
    'order': 'comment',
    'pagesize': 50
  }

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res)
  })
}
