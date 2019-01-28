
## 目录

- [写作背景](#写作背景)
- [写作目标](#写作目标)
- [项目安装](#项目安装)
  + [初次尝试](#初次尝试)
  + [初次回顾](#初次回顾)
  + [依赖包拓展](#依赖包拓展)
- [项目调整](#结构调整)
  + [初步思考](#初次回顾)
  + [redux-saga刨坑](#redux-saga刨坑)
  + [引入css模块机制](#引入css模块机制)
  + [TypeScript的反思](#TypeScript的反思)


## 写作背景

JavaScript 是一种轻量级的解释性脚本语言，可嵌入到 HTML 页面中，在浏览器端执行，能够实现浏览器端丰富的交互功能，为用户带来流畅多样的用户体验。JavaScript 是基于对象和事件驱动的，无需特定的语言环境，只需在支持的浏览器上就能运行。

TypeScript 是 Microsoft 开发和维护的一种面向对象的编程语言。它是 JavaScript 的超集，包含了 JavaScript 的所有元素，可以载入 JavaScript 代码运行，并扩展了 JavaScript 的语法。

TypeScript 可以使用 JavaScript 中的所有代码和编码概念，TypeScript 是为了使 JavaScript 的开发变得更加容易而创建的。尤其是类型和接口等概念描述正在使用的数据，对于弱类型语言进行了弥补，可谓使得使得编译后的javascript如鱼得水。TypeScript 引入了 JavaScript 中没有的“类”概念。TypeScript 中引入了模块的概念，可以把声明、数据、函数和类封装在模块中。我们可以通过二者结合写出更加健壮的代码，增强了生产力。

## 写作目的

- 解决部分前端同学重复构建基础模块的问题，解放部分生产力

- 结合最新的react全家桶和TypeScript，进行项目模板的构建，让模块化的得到质的提升

- 产出一个基于react脚手架通用项目架构模板，当然你可以结合自己的情况进行简单修改


## 项目安装

首先你要确保自己的电脑安装了node的稳定版本，没有安装的可以 [移步这里](https://nodejs.org/en/)，按照文档自行安装，然后执行以下命令：

```sh
npm install -g create-react-app
```

然后我们创建一个我们自己的项目

 ```sh
 create-react-app react-ts-template --scripts-version=react-scripts-ts
 ```
 
 创建成功后，项目的目录如下
 
 ```
 react-ts-template/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.tsx
    App.test.tsx
    index.css
    demo.ts
    logo.svg
  .gitignore
  images.d.ts  
  package.json
  package-lock.json
  README.md
  tsconfig.json
  tsconfig.prod.json
  tsconfig.test.json
  tslint.json
 ```
 
 如果出现报错等信息，可以先看看自己的网络是否正常，不行开个热点进行初始化，进一步排查问题，欢迎探讨。
 
 注意：
 
 - `tsconfig.json`, `tsconfig.prod.json`, `tsconfig.test.json`, `tslint.json` 包括了ts方面的东西，你可以暂时不用管它，我们扫一眼 `package.json` 里面的 `scripts`选项就可以了。

 - `public` 包含了包含了静态资源如HTML页面或图片。`src` 包含了x项目的源码。`demo.ts` 是入口文件, 当然你也可通过 `package.json` 里面的 `main` 字段进行处理。

### 初次尝试

首先通过命令将项目进行启动：

```sh
npm run start
```
此时浏览器会自动打开 `http://localhost:3000/`, 如果遇到端口占用，进行一下处理

```sh
# 首先查找端口占用的进程
lsof -i tcp:3000
# 杀死进程
kill PID
```
启动成功的话，会看到熟悉的 Logo，来，我们搞点事情，不要别他的目录吓到，记住一点，看一个前端项目，知道入口，知道路由，神马都是浮云。

把入口里面的依赖的 `css` 文件全部删除，项目建构也做了调整，如下：

```
react-ts-template/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    component/
      Hello/
        demo.ts
        index.css
    App.jsx
    demo.ts
  .gitignore
  images.d.ts  
  package.json
  package-lock.json
  README.md
  tsconfig.json
  tsconfig.prod.json
  tsconfig.test.json
  tslint.json
```

我这里简单写了个 `Hello` 组件(`src/component/Hello`)

```typescript
import * as React from 'react';
import './index.css';

export interface Props {
    name: string,
    rangeLevel?: number
}

class Index extends React.Component<Props, object> {
    getExclamationMarks(numChars: number) {
        return Array(numChars + 1).join('!');
    }
    render() {
        const { name, rangeLevel = 1 } = this.props;
        
        if (rangeLevel <= 0) {
            throw new Error('you could be a little more enthusiastic. :D');
        }
        
        return (
            <div className="hello">
                <div className="greeting">
                    { name + this.getExclamationMarks(rangeLevel)}
                </div>
            </div>
        );
    }
}

export default Index;
```
此时你可以把我初次尝试的这段代码 `clone` 下来运行

注意：当你修改后执行 `npm run start` 你可能会遇到这样的报错 

```
Compile Error: interface name must start with a capitalized
```

我目前的解决方案是进行 `tslint.json` 修改，具体如下：

```diff
{
-  "extends": ["tslint:recommended", "tslint-react", "tslint-config-prettier"],
+  "extends": [],
+  "defaultSeverity": "warning",
   "linterOptions": {
     "exclude": [
       "config/**/*.js",
       "node_modules/**/*.ts"
     ]
   }
 }

```

官网正在修复此bug，如果此时有更好的方案，欢迎探讨，共进步。

### 初次回顾

此时想了想，发现自己把自己坑了，当我后期想做到更加定制化的打包的时候，一些 `config` 或者是 `package.json` 需要进行修改，那么我在这个脚手架构建出来的项目，没看到什么哪方面的东西啊，于是我查看了下 `package.json` 里面有个特殊的命令 `eject` ，它的意义是如果想要自己修改webpack之类的配置需要执行 `npm run eject` 弹出配置文件，这个操作是不可逆的，于是我直接执行了 `npm run eject` ，然后出来了一些提示，如下图：

<img src="./docResources/error_1.jpg" width="500">

于是我把文件先一些文件先 `git stash` 了，然后继续执行 `npm run eject` ，惊喜出现了，项目目录先出现了 `config` 目录，里面包括如下文件：

<img src="./docResources/configFiles.png" width="500">

同时发现了 `package.json` 文件发生了很大的变化，项目所依赖的包都列了出来，`eject` 这个脚本命令也不存在了，重要的事情说三次，避免出现依赖覆盖的情况：

##### 如果项目需要结合 `create-react-app` 脚手架做定制化，就最开始就执行 `npm run eject`。

##### 如果项目需要结合 `create-react-app` 脚手架做定制化，就最开始就执行 `npm run eject`。

##### 如果项目需要结合 `create-react-app` 脚手架做定制化，就最开始就执行 `npm run eject`。

### 依赖包拓展

我想了想，我们的项目中可能会用到 `路由`，`数据状态`，于是我毫不犹豫的选择的生态不错的一下依赖包：

```JSON
	"react-redux": "5.0.5",
    "react-router": "3.0.5",
    "react-router-redux": "^4.0.8"
```

dev中依赖的部分ts相关包

```JSON
	"@types/react-redux": "6.0.9",
    "@types/react-router": "^3.0.5",
    "@types/react-router-redux": "^4.0.48"
```

注意此处有坑，为啥子呢，都知道前端的发展是很猛的，尤其是技术的迭代和开源工具的升级，甚至有时候几个版本，这里我选择了稳一点的 路由V3，结合我们使用的 ts版本(3.0.3) ，我翻阅了文档 查看了 ts相关包，具体见一下地址

[react-redux结合ts对应的type definitions参考版本](https://www.npmjs.com/package/@types/react-redux)

[react-router结合ts对应的type definitions参考版本](https://www.npmjs.com/package/@types/react-router)

[react-router-redux结合ts对应的type definitions参考版本](https://www.npmjs.com/package/@types/react-router-redux)

这里，我对项目骨架做了简单的初步调整，后期会继续优化，先写到这里。

## 项目调整

### 初步思考

为什么会有这一小节的存在了，我结合前端组件化的情况，深入思考了一些，在大型项目中，前端的数据状态很复杂，不同的组件拥有不同的状态，不同的页面有不同的状态，同时不同页面，公用组件也可能有不同的状态，那么问题来了，又是组件，又是状态的，如果大型项目有大大小小大几百的组件，上百的页面我是不是要疯了，当我改一个组件的时候我还需要去一个个的找我的状态奶定义的，感觉好乱，好难维护，于是我的初步思路是，我们对于一个页面 维护一套状态，这个状态呢包括组件的状态，最后通过一个公共的状态管理页面，将所有状态集中映射，是不是很完美，这样子的话我找的话我就很方便的可以在对应的页面中找到自己应该修改的状态了，即使对于不熟悉整个项目的新人来说，你只需要哪个页面也一般可以处理一些遇到的问题，那么废话不多说，开始行动。😁😁😁

我简单对项目的目录做了调整，添加了一些模块，简单看看结构，如下：

```javascript
react-ts-template/
  config           // 项目基本配置 
  docResources/    // README.md 资源目录
  node_modules/    // npm 包
  public/          // 项目根文件
  scripts/         // 项目相关脚本
  src/             // 源码目录
  	axios/          // 请求工具
    components/    // 组件目录
    config/        // 源码相关配置
    filters/       // 项目过滤器
    lib/           // 资源目录
    pages/         // 页面目录
    router/        // 路由配置目录
    statics/       // 静态资源目录
    store/         // 状态存储根目录
    styles/        // 样式库
    utils/         // 工具文件夹
    admin.tsx      // 规划后台管理系统入口
    index.ts      // 默认项目入口
  .env             // 环境配置文件
  .gitignore       // ... 后面的不必多说，我们继续
  images.d.ts      // ...
  package.json
  package-lock.json
  README.md
  tsconfig.json
  tsconfig.prod.json
  tsconfig.test.json
  tslint.json     // ...
```

说说我这样划分目录的想法，其实就是为了方便后期维护，小伙伴们一看就知道我什么东西，在什么位置，这里的重点是数据状态的管理，和组件的搭建，我们公用组件或者是拓展性高的组件(展示组件)，存在于 components 目录下，同时页面目录我简单写了2个页面的目录 home 和 detail，我重点对 home 结合组件进行了coding，我们把 展示组件 和 容器组件 进行了结合，得益于 react-redux，另外对于用到的组件，你可以选择自己的方式，直接引入使用或者是你在 home 目录下的 components 中进行二次包装，然后在使用，悄悄透漏一句，我后面会对没个组件升华一下权限的管理，检验等，总是随便你发挥。我们把数据状态的管理拆分到没个页面，同时组件有自己全面的数据状态，最后我们统一 combine到根状态管理中，是不是很清晰，感兴趣的同学可以查看源码，一目了然。

我下面谈谈我在结合 TypeScript 使用的过程中遇到的坑，谈一下我在对 Hello 组件进行 Props 检验

```typescript
import { Dispatch } from 'redux';
// import { connect, Dispatch } from 'react-redux';
import { connect } from 'react-redux';

import Hello from '../../../components/Hello'
import * as actions from '../store/actionCreators';
import { StoreState } from '../store/types';

export function mapStateToProps({ demo: { rangeLevel, languageName } }: StoreState) {
    return {
        rangeLevel,
        name: languageName,
    }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
    return {
        onIncrement: () => dispatch(actions.incrementEnthusiasm()),
        onDecrement: () => dispatch(actions.decrementEnthusiasm()),
    }
}

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Hello);

```
注意： 第 2 行代码，我最开始这样子做的，可是一直报错，说的是 `react-redux` 中不存在这个模块，不应该啊，以前我都这么用的啊，难道我的环境出了问题吗，于是我查看了 `react-redux` 的 issues，果然后面的版本就移除了这个对象，附上 [react-redux的issues地址](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26840)，另一个方式是直接从 `redux` 中导入完美使用。还有个问题是我在使用 `import { combineReducers } from 'redux';` 过程中遇到了坑，怎么说呢，自己未自己买单，2层 `combineReducers` 我是一个喜欢尝试的人，结果不断的报错，导致我们的 `Props` 没有成功挂载到组件上，一直获取不到值，`state` 有值，但是 没有 `方法`，所以以此为戒。

### redux-saga刨坑

我们都知道，异步问题复杂多变，对于大型的项目更是如此，结合我们目前使用的 redux 我进行了思考，我的目标是打造从简单到复杂的项目，随着一些业务的增加，尤其是在一些 cms 系统中更是复杂，开始第一反应想到的异步模块是 😬 `redux-thunk`，为啥子，因为它成本低，任何事不是两全的，使用简单的同时，带来了后期复杂度提升之后的维护成本的提高，于是抛弃了 `redux-thunk`，准备周末踏上😃 `redux-saga` 这个被人人称为不好用成本高的船。

可能很多人有个误解，redux-saga是react的中间件，其实不然，我们从 [官方的文档](https://www.npmjs.com/package/redux-saga) 也可以知道特其实是介于 `redux` 的中间件，对于 `redux` 的中间件太多了，包括经常用到的 `redux-logger`(项目中我会引入)，还是那句话，我们要考虑到以后项目大了后每个页面有各自的数据状态，同时每个组件级也有自己的数据状态，同时有的状态是共有的，我们如果将状态柔到一起，以后很难维护，对于后面的小伙伴是坑，当然维护和项目复杂度是一把双刃剑，我选择了易于维护的，我的每个对应组件和页面的 `redux-saga` ，数据状态对应到对应的页面层级，最后通过各数据入口，我们将 `redux` 和 `redux-saga` 进行汇聚整合，是不是很完美，那就马上开始吧。

结合官网说明，我先初试，执行以下脚本

```sh
npm install --save redux-saga
```

然后在根 `store` 目录建立 `sagas.ts` 用于汇聚所有 `sagas`，参照官网的 中间件注入方式进行了处理，如下：

```typescript
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// @ts-ignore
import {createLogger} from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from './reducer';
import rootSaga from './sagas';

const logger = createLogger();
// 创建 并绑定saga 中间件
const sagaMiddleware = createSagaMiddleware();

export default function () {
    const store = createStore(reducers, composeWithDevTools(
        applyMiddleware(logger, sagaMiddleware)
    ));
    // run 之前要把安装 sagaMiddleware，防止报错
    sagaMiddleware.run(rootSaga);
    return store;
}

```

对 `home` 页面 `store` 目录进行调整，如下

```javascript
store/
  actionCreators/
  constants/
  reducers/
  sagas/
     index.ts
  types/
  index.ts
  initState.ts      
```

我这里在代码里面在组件级和页面级都示例到 `redux-saga` ,我这里从豆瓣随便找了一个api 用来模拟异步，理解异步就行，不用纠结一些请求的结果，我们将来异步逻辑抽象到 `redux-saga` 文件，方便单元测试和异步统一管理，home页面的 `saga.ts` 如下:

```typescript
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
```

我这里将一些自我测试过的代码注释，你可以忽略，当然你放开注释也是可以执行的

我们对 constants/index.ts 进行了调整，我们把一个异步的请求，成功(`USER_FETCH_SUCCEEDED`)和失败(`USER_FETCH_FAILED`)进行了拆分，其中发起请求(`USER_FETCH_REQUESTED `)的为如下：

```typescript
// constant
export const INCREMENT_ENTHUSIASM = 'INCREMENT_ENTHUSIASM';
export type INCREMENT_ENTHUSIASM = typeof INCREMENT_ENTHUSIASM;

export const DECREMENT_ENTHUSIASM = 'DECREMENT_ENTHUSIASM';
export type DECREMENT_ENTHUSIASM = typeof DECREMENT_ENTHUSIASM;

export const USER_FETCH_REQUESTED = 'USER_FETCH_REQUESTED';
export type USER_FETCH_REQUESTED = typeof USER_FETCH_REQUESTED;


export const USER_FETCH_SUCCEEDED = 'USER_FETCH_SUCCEEDED';
export type USER_FETCH_SUCCEEDED = typeof USER_FETCH_SUCCEEDED;

export const USER_FETCH_FAILED = 'USER_FETCH_FAILED';
export type USER_FETCH_FAILED = typeof USER_FETCH_FAILED;
```

我们调整 actionCreators/index.ts，注意这里面我们需要把 组件或者页面用到的 `action` 集合下，以便用于 容器组件和页面级的 `reducer ` ，防止 `typescript ` 报错

```typescript
import * as constants from '../constants'

export interface IncrementEnthusiasm {
    type: constants.INCREMENT_ENTHUSIASM;
}

export interface DecrementEnthusiasm {
    type: constants.DECREMENT_ENTHUSIASM;
}

export interface GetInitList {
    type: constants.USER_FETCH_REQUESTED;
    data: number
}
// redux-saga 私有
// export interface InitListAction {
//     type: constants.INIT_LIST_ACTION;
//     data: number
// }


export interface UserFetchSucceeded {
    type: constants.USER_FETCH_SUCCEEDED;
    message: string
}
export interface UserFetchFailed {
    type: constants.USER_FETCH_FAILED;
    message: string
}

// 组件级
export type EnthusiasmAction = IncrementEnthusiasm | DecrementEnthusiasm | GetInitList | UserFetchSucceeded | UserFetchFailed;

// 页面级
export type homePageAction = GetInitList | UserFetchSucceeded | UserFetchFailed;

// 组件级 + 页面级 汇总
export type homePageActions = IncrementEnthusiasm | DecrementEnthusiasm | GetInitList | UserFetchSucceeded | UserFetchFailed;



export function incrementEnthusiasm(): IncrementEnthusiasm {
    return {
        type: constants.INCREMENT_ENTHUSIASM
    }
}

export function decrementEnthusiasm(): DecrementEnthusiasm {
    return {
        type: constants.DECREMENT_ENTHUSIASM
    }
}
// redux-sage 异步调用
export function getInitList(data: number):GetInitList {
    return {
        type: constants.USER_FETCH_REQUESTED,
        data: data
    }
}

export function userFetchSucceeded(message: string): UserFetchSucceeded {
    return {
        type: constants.USER_FETCH_SUCCEEDED,
        message
    }
}
export function userFetchFailed(message: string): UserFetchFailed {
    return {
        type: constants.USER_FETCH_FAILED,
        message
    }
}
```
然后开始 reducers/index.ts

```typescript
import update from 'react-addons-update';

// 导出为 当前页面action 的集合
import { homePageActions } from '../actionCreators';
import defaultState from '../types';
import initState from '../initState';
import { INCREMENT_ENTHUSIASM,
    DECREMENT_ENTHUSIASM,
    USER_FETCH_SUCCEEDED,
    USER_FETCH_FAILED
} from '../constants';

export function pageReducers(state = initState,
                             action: homePageActions): defaultState {

    switch (action.type) {
        case INCREMENT_ENTHUSIASM:
            // return { ...state, state.demo.rangeLevel: state.demo.rangeLevel! + 1 };
            return update(state, {
                helloData: {
                    rangeLevel: {
                        $set: state.helloData.rangeLevel + 1
                    }
                }
            })
        case DECREMENT_ENTHUSIASM:
            return update(state, {
                helloData: {
                    rangeLevel: {
                        $set: state.helloData.rangeLevel - 1
                    }
                }
            })
        // saga work 后续处理
        case USER_FETCH_SUCCEEDED:
            return update(state, {
                homeData: {
                    data: {
                        $set: action.message
                    }
                }
            })
        case USER_FETCH_FAILED:
            return update(state, {
                homeData: {
                    data: {
                        $set: action.message
                    }
                }
            })
    }
    return state;
}
```
这里我遇到一个坑，就是对象返回的时候，ts总是给我报错，对于返回 `newState` 有一定冲突的地方，我这里最初的处理方式是使用 `react-addons-update` 原有的方式已经不再使用，当然你也可以自己写一个自己的合并方法。

别忘记了我们的 types/index.ts 和 initState.ts 也要同步下，可以结合自己的情况进行数据树的划分。这里我就不粘贴代码了，大家可以源码看到。

我在根目录的 store/sagas.ts 进行了code，如下

```typescript
import { all, fork } from 'redux-saga/effects';

// 导入相关页面的 store
import homeStore from '../pages/home/store';

export default function* rootSaga() {
    yield all([
        fork(homeStore.sagas),
        // 其他页面 sagas，数组形式
    ])
}
```

这里说明下 `all` 可以对 saga 进行集合，以为数组的形式进行书写，fork方法可以无阻赛的异步操作，达到良好的体验。

我在组件级别进行了 `redux-saga` 使用，使用state时一定要注意自己的数据结构

```typescript
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26840
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import Hello from '../../../components/Hello'
import * as actions from '../store/actionCreators';
import { helloState } from '../store/types';
// import { Props } from '../components/Hello/index';

// 对于使用的组件所在的页面，请按照数据树的解构进行解构，此出home 代表home页面
export function mapStateToProps({ home: {
    helloData: { rangeLevel, languageName, data }
}}: { home: helloState }) {
    return {
        rangeLevel,
        name: languageName,
        data,
    }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
    return {
        onIncrement: () => dispatch(actions.incrementEnthusiasm()),
        onDecrement: () => dispatch(actions.decrementEnthusiasm()),
        onGetInitList: (data: number) => dispatch(actions.getInitList(data)),
    }
}

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Hello);

// export default connect<Props>(mapStateToProps, mapDispatchToProps)(Hello);

```
下面是我在页面级进行了使用，同样结合自己的state结构，如果感觉复杂，可以查看tools

```typescript
import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
// 引入页面相关组件 ...
import Hello from './components/Hello';
import * as actions from "./store/actionCreators";

// 页面布局样式
import * as styles from './style.less';
import { homeState } from "./store/types";

export interface Props {
    data: string;
    onGetInitList?: (data: number) => void;
}

class Home extends React.PureComponent<Props, {}> {
    render() {
      const { data } = this.props;
      return (
          <div>
              <Hello name='TypeScript' />
              <div className={styles.pageName}>{ data }</div>
          </div>
      )
    }
    componentDidMount() {
        // const { data } = this.props;
        // console.log(data);
    }
}

export function mapStateToProps({ home: {
    homeData: { data }
}}: { home: homeState }) {
    return {
        data
    }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.homePageAction>) {
    return {
        onGetInitList: (data: number) => dispatch(actions.getInitList(data)),
    }
}

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Home);

```

注意在页面级的 `reducer` 中，他所接受的state和我们认为state状态树是有差别的，他 home 这样的标识，如有以为先打印log，当然也可以和我一起探讨。😃


### 引入css模块机制

为了理解css模块化思想，我们首先了解下，什么是模块化，在百度百科上的解释是，在系统的结构中，模块是可组合、分解和更换的单元。模块化是一种处理复杂系统分解成为更好的可管理模块的方式。它可以通过在不同组件设定不同的功能，把一个问题分解成多个小的独立、互相作用的组件，来处理复杂、大型的软件。看完模块化，是不是有种拼图的即视感，可以把大图分成各个小图，然后把小图拼成大图，分与合的艺术感。那么css模块化思想，也就是在css编写环境中，用上模块化的思想，把一个大的项目，分解成独立的组件，不同的组件负责不同的功能，最后把模块组装，就成了我们要完成的项目了。

#### css模块化有什么好处

1. 提高代码重用率
2. 提高开发效率、减少沟通成本
3. 提高页面容错
4. 降低耦合
5. 降低发布风险
6. 减少Bug定位时间和Fix成本
7. 更好的实现快速迭代
8. 便于代码维护

CSS 模块化的解决方案有很多，但主要有两类。一类是彻底抛弃 CSS，使用 JS 或 JSON 来写样式。Radium，jsxstyle，react-style 属于这一类。优点是能给 CSS 提供 JS 同样强大的模块化能力；缺点是不能利用成熟的 CSS 预处理器（或后处理器） Sass/Less/PostCSS，:hover 和 :active 伪类处理起来复杂。另一类是依旧使用 CSS，但使用 JS 来管理样式依赖，代表是 CSS Modules。CSS Modules 能最大化地结合现有 CSS 生态和 JS 模块化能力，API 简洁到几乎零学习成本。发布时依旧编译出单独的 JS 和 CSS。它并不依赖于 React，只要你使用 Webpack，可以在 Vue/Angular/jQuery 中使用。是我认为目前最好的 CSS 模块化解决方案。

这里我对 `*.css` 和 `*.less` 文件进行模块化

```sh
npm install --save-dev typings-for-css-modules-loader
```

配置 webpack 文件，针对 `*.css` 这里没有用 css-loader ，用 `typings-for-css-modules-loader` 代替

```javascript
{
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              // {
              //   loader: require.resolve('css-loader'),
              //   options: {
              //     importLoaders: 1,
              //   },
              // },
              {
                loader: 'typings-for-css-modules-loader',
                options: {
                  modules: true,
                  namedExport: true
                }
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          },
```

针对 less 

```javascript
{
            test: /\.less$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  modules: true,
                  localIdentName: '[name]__[local]__[hash:base64:5]', //
                },
              },
              // {
              //   loader: 'typings-for-css-modules-loader',
              //   options: {
              //     modules: true,
              //     namedExport: true
              //   }
              // },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
              {
                loader: require.resolve('less-loader')
              }
            ],
          },
```
另外，我在项目中建了个文件 src/declaration/externals.d.ts，防止 ts 报错

```typescript
declare module '*.less'
declare module '*.css'
```
在 `tsconfig.json` 进行增加配置

```javascript
"includes": [
    "./src/declaration/externals.d.ts"
  ],
```
至此，基本操作完成，那么你可以在项目中使用模块化的写法了。

### TypeScript的反思

写着写着，我感觉自己的 `Ts` 写的有点乱，那么我停下来，将对其进行基于架构上的微调整，提供优质代码。

#### 关于ts的一些调整

前端时间一直在做项目，现在空出时间，具体调整如下：

1.ts的校验规则进行了很大的变动，具体变动我就不列举了，你可以参考 `tslint.json`，另外注意一下 `tsconfig.prod.json` 规则文件

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "sourceMap": false
  }
}
```
2.深化初始化数据规则，针对 `initState.ts` 中数据进行数据约束，如下：

```typescript
import {IHelloState, IHomeState} from './types/index'
export const helloData: IHelloState['helloData'] = {
    rangeLevel: 1,
    languageName: 'TypeScript',
    data: ''
}

export const homeData: IHomeState['homeData'] = {
    data: ''
}

export default {
    helloData,
    homeData
}
```
3.将来一些异步网络请求的逻辑进行了拆分(saga中分离)

```javascript
react-ts-template/
  src/             // 源码目录
    utils/			// 工具文件夹	
    	api.ts       // 存放请求地址
    	http.ts      // 存放网路请求的基本配置
    	index.ts.    // 存放常用工具函数
    services/	      // 请求二级设置(包括二级设置，地址，请求方式)   
```
4.考虑到一些样式的设置(有些需求需要antd的样式覆盖，或者类名设置)，我们不能完全把所有的style给模块化了，未此我将 `.less` 引入的文件我们进行初始化，而 `.css` 为我们预留的活口，灵活使用，一句话，能用 `.less` 就用 `.less` ,实在用不了再用 `.css`

5.我对示例的样式进行了调整，和文字说明，大家可以参考说明，自行 clone ，然后进行测试，使用

6.针对打包机制进行了修改，我生产环境进行了处理，对有的暂时用不到的功能和冗余的文件进行了删除，以保证更加简洁的线上代码

### 后面的话

😬写到这里，基本差不多写完了，写的不好，多多指教，后期我会出一些关于前端服务端 `node` 的一些博客，请大家持续关注。














 