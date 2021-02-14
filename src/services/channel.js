import { http } from './http'
const url = 'mock.data.json'
// can be easy changed to api url later

export const loadChannelsList = () => {
  return http({
    url,
    method: 'get'
  })
}
