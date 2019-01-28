import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
// @ts-ignore
import {createLogger} from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from './reducer'
import rootSaga from './sagas'

const logger = createLogger()
// 创建 并绑定saga 中间件
const sagaMiddleware = createSagaMiddleware()

export default function () {
    const store = createStore(reducers, composeWithDevTools(
        applyMiddleware(logger, sagaMiddleware)
    ))
    // run 之前要把安装 sagaMiddleware，防止报错
    sagaMiddleware.run(rootSaga)
    return store
}
