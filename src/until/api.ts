// 统一接口前缀，默认为'',针对不同接口不用前缀，可单独根据自己情况进行定制化配置
const prefix: string = ''

export default (config => {
    return Object.keys(config).reduce((copy, name) => {
        copy[name] = `${prefix}${config[name]}`
        return copy
    }, {})
})({
    // 获取邮箱信息
    'getEmailData': '/EmailSearch'
})

