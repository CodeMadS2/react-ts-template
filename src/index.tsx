// 前端项目入口
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/index';
import routes from './router';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store} >
        <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('root') as HTMLElement
);