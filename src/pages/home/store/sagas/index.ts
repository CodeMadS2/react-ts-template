// import { takeEvery, put, select } from 'redux-saga/effects';
import { takeEvery, put } from 'redux-saga/effects';
import { delay } from 'redux-saga'
import axios from 'axios';

import { USER_FETCH_REQUESTED } from '../constants';
import { userFetchSucceeded, userFetchFailed } from '../actionCreators';

// @ts-ignore
function* getInitList(actionData: Object) {
    try {
        const reqData = actionData['data'] || 1012002;
        yield delay(5000);

        const res = yield axios.get(`https://api.apiopen.top/EmailSearch?number=${reqData}`);
        const action = yield res.data.code === 200 ? userFetchSucceeded(res.data.message) : userFetchFailed(res.data.message);
        yield put(action);
    } catch (e) {
        yield put(userFetchFailed(e.message));
    }
}

export default function* () {
    // 拦截需要异步的 type
    yield takeEvery(USER_FETCH_REQUESTED, getInitList);
    // yield takeEvery('*', function* logger(action) {
    //     const state = yield select();
    //     console.log('action', action);
    //     console.log('state after', state);
    // })
}