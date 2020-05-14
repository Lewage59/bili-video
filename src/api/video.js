import axios from 'axios'

// 视频信息
export function getVideoInfo (bvid) {
  const url = '/proxyApi/x/web-interface/view'
  const data = {
    'bvid': bvid
  }

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res)
  })
}

// 单个视频推荐信息
export function getRecommend (bvid) {
  const url = '/proxyApi/x/web-interface/archive/related'
  const data = {
    'bvid': bvid
  }

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res)
  })
}

// 视频评论
export function getComment (aid) {
  const url = '/proxyApi/x/v2/reply/main'
  const data = {
    'oid': aid,
    'type': 1
  }

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res)
  })
}

// 视频标签
export function getTags (aid) {
  const url = '/proxyApi/x/tag/archive/tags'
  const data = {
    'aid': aid
  }

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res)
  })
}
