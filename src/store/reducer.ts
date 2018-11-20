import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { enthusiasm } from '../pages/home/store/index';

const reducer = combineReducers({
    demo: enthusiasm,
    routing: routerReducer
});

export default reducer;
