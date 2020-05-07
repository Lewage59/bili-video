import axios from 'axios'

export function getRecommend () {
  const url = '/api/index/ding.json'

  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}
