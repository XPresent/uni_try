import config from '@/config'

const baseOrigin = config.getKeyBy('webpack.pathname')
const baseUrl = baseOrigin + 's/json'

const getHeaders = () => {
  return {
    'Accept': 'text/x-json',
    'Content-Type': 'text/x-json; charset=UTF-8',
    'x-cm-service': 'L-WEB'
  }
}


function getBaseUrl() {
  return baseUrl
}
function _post() {
  return uni.request({
    url: getBaseUrl,
    header: getBaseUrl()
  })
}

class Request {
  constructor() {

  }
}