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