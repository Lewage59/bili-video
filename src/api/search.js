import axios from 'axios'

export function getSearchDefaultWords () {
  const url = '/proxyApi/x/web-interface/search/default'

  return axios.get(url)
    .then(res => {
      return Promise.resolve(res)
    })
}
