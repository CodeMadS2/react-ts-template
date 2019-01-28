import {takeEvery, put} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {getEmailData} from '@services'

import {USER_FETCH_REQUESTED} from '../constants'
import {userFetchSucceeded, userFetchFailed} from '../actionCreators'

// @ts-ignore
function* getInitList(actionData: object) {
  try {
    const reqData = actionData['data'] || 1012002
    yield delay(5000)
    //  异步测试地址
    const res = yield getEmailData({
      number: reqData
    })
    const action = yield res.code === 200 ? userFetchSucceeded(res.message) : userFetchFailed(res.message)
    yield put(action)
  } catch (e) {
    yield put(userFetchFailed(e.message))
  }
}

export default function* () {
  // 拦截需要异步的 type,需要拦截的action，写到这里即可，不写，默认为不拦截，直接到 reducer
  yield takeEvery(USER_FETCH_REQUESTED, getInitList)
  // yield takeEvery('*', function* logger(action) {
  //     const state = yield select();
  //     console.log('action', action);
  //     console.log('state after', state);
  // })
}