import axios from 'axios'
import {Cookies} from 'react-cookie'
import {AUTH_TOKEN_COOKIE_NAME} from '../constants/index'

export const backend_URL = process.env.REACT_APP_BASE_URL
export const frontend_URL = process.env.REACT_APP_API_URL

console.log("URL", backend_URL)

const instance = axios.create({
  baseURL: backend_URL
})

instance.interceptors.request.use(
  function (config) {
    let cookie = new Cookies()
    const token = cookie.get(AUTH_TOKEN_COOKIE_NAME)
    console.log('Token', token)
    if (token) config.headers.Authorization = `Token ${token}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
export default instance
