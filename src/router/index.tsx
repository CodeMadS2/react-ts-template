import * as React from 'react'
import { Route, IndexRoute } from 'react-router'

import HomePage from '@pages/home'


export default (
    <Route path="/">
        <IndexRoute component={HomePage} />
        <Route path="/index">
            <IndexRoute component={HomePage} />
        </Route>
        {/* 自己可以结合自己的业务区拓展*/}
    </Route>
)