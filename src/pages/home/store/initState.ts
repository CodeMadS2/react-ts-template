// 此处demo仅仅为为了区分模块所构建的，可以结合自身的业务划分，继续增加选项
import {IHelloState, IHomeState} from './types/index'
export const helloData: IHelloState['helloData'] = {
    rangeLevel: 1,
    languageName: 'TypeScript',
    data: ''
}

export const homeData: IHomeState['homeData'] = {
    data: ''
}

export default {
    helloData,
    homeData
}