import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from './reducer';

export default function () {
    const store = createStore(reducers, composeWithDevTools(
        applyMiddleware()
    ));
    return store;
}
