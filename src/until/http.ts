import axios from 'axios'
axios.defaults.baseURL = process.env.REACT_APP_SERVER_BASE_URL as string
axios.defaults.timeout = 100000

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    return config
}, function (error) {
    return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    if (response.status === 200) {
        return response.data
    } else {
        throw Error(response.data.msg || '服务异常')
    }
}, function (error) {
    return Promise.reject(error)
})

export default axios