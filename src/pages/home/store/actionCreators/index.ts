import * as constants from '../constants'

interface IIncrementEnthusiasm {
    readonly type: constants.INCREMENT_ENTHUSIASM
}

interface IDecrementEnthusiasm {
    readonly type: constants.DECREMENT_ENTHUSIASM
}

interface IGetInitList {
    readonly type: constants.USER_FETCH_REQUESTED
    data: number
}

interface IUserFetchSucceeded {
    readonly type: constants.USER_FETCH_SUCCEEDED
    message: string
}
interface IUserFetchFailed {
    readonly type: constants.USER_FETCH_FAILED
    message: string
}


// 可辨识联合的高级模式
// 组件级
export type EnthusiasmAction = IIncrementEnthusiasm | IDecrementEnthusiasm

// 页面级
export type homePageAction = IGetInitList | IUserFetchSucceeded | IUserFetchFailed

// 组件级 + 页面级 汇总，供reducers和复杂多变情况聚合使用
export type homePageActions = EnthusiasmAction | homePageAction


// actionCreator 导出
export function incrementEnthusiasm(): IIncrementEnthusiasm {
    return {
        type: constants.INCREMENT_ENTHUSIASM
    }
}

export function decrementEnthusiasm(): IDecrementEnthusiasm {
    return {
        type: constants.DECREMENT_ENTHUSIASM
    }
}
// redux-sage 异步调用
export function getInitList(data: number): IGetInitList {
    return {
        type: constants.USER_FETCH_REQUESTED,
        data
    }
}

export function userFetchSucceeded(message: string): IUserFetchSucceeded {
    return {
        type: constants.USER_FETCH_SUCCEEDED,
        message
    }
}
export function userFetchFailed(message: string): IUserFetchFailed {
    return {
        type: constants.USER_FETCH_FAILED,
        message
    }
}