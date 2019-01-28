// 当前页面 constants
import * as constants from './constants'
// 当前页面 action 生成函数
import * as actionCreators from './actionCreators'
// 单前页面 saga
import sagas from './sagas'
// 当前页面 reducers
import { pageReducers } from './reducers'

export default {
    constants,
    actionCreators,
    sagas,
    pageReducers
}