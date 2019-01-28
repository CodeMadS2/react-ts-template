// @ts-ignore
import http from '../until/http'
import apis from '../until/api'

// 获取邮箱信息
export function getEmailData(params = {}) {
    return http.get(apis['getEmailData'], {
        params
    })
}