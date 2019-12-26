export function handleResponse(res) {
  if (res.statusCode === 200) {
    const data = res.data
    if (data.code === 'S_OK') {
      return data
    }
    else return Promise.reject(data)
  } else {
    return Promise.reject(res)
  }
}

export function handleRequest(params) {
  return params
}