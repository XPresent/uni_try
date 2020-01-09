import config from '@/config'
import { handleRequest, handleResponse } from './interceptor'

const baseUrl = config.pathname + 'x/'

const headers = {
  'Accept': 'text/x-json',
  'Content-Type': 'text/x-json; charset=UTF-8;',
  'x-cm-service': 'L-WEB'
}
class Request {
  interceptor = {
    request: null,
    response: null
  }

  ajax(url, config = {}) {
    const params = {
      url: baseUrl + url,
      header: headers,
      ...config
    }
    this.interceptor.request ? this.interceptor.request(params) : params
    return uni.request(params).then(
      response => {
        const res = response[1]
        return this.interceptor.response ? this.interceptor.response(res) : res
      }
    )
  }

  post(url, data) {
    const config = { method: 'POST', data: JSON.stringify(data) }
    return this.ajax(url, config)
  }

  get(url, data) {
    const config = { method: 'GET', data }
    return this.ajax(url, config)
  }

  constructor() {
    this.interceptor.request = handleRequest
    this.interceptor.response = handleResponse
  }
}

export default new Request()