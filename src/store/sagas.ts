import { all, fork } from 'redux-saga/effects';

// 导入相关页面的 store
import homeStore from '@pages/home/store';

export default function* rootSaga() {
    yield all([
        fork(homeStore.sagas),
        // 其他页面 sagas，数组形式
    ])
}