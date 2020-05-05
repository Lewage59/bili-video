import axios from 'axios'

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
