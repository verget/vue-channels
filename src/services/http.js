import axios from 'axios'

const successHandler = (res) => res.data
const requestHandler = async (request) => {
  if (!request.headers['Content-Type']) {
    request.headers['Content-Type'] = 'application/json'
  }
  return request
}
axios.interceptors.request.use(requestHandler)

const errorHandler = (reject) => (error) => {
  return reject(error)
}

export const http = (options, responseMapper = successHandler) => {
  return new Promise((resolve, reject) => {
    const { url, method, body, headers, queryParams, responseType, timeout } = options
    axios.request({
      url,
      method,
      data: body,
      headers,
      params: queryParams,
      responseType,
      timeout: timeout || 15000
    }).then(res => resolve(responseMapper(res)))
      .catch(errorHandler(reject))
  })
}
