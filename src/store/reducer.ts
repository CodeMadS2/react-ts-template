import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// 导入页面 store 配置
import homeStore from '@pages/home/store';

// 汇聚所有页面 reducer
const reducer = combineReducers({
    home: homeStore.pageReducers,
    // 其他页面 reducers ...
    routing: routerReducer
});

export default reducer;
