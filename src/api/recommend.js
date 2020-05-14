import axios from 'axios'

// 首页推荐视频信息
export function getRecommend () {
  const url = '/api/index/ding.json'

  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}
