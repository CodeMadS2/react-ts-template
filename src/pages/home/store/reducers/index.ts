import update from 'react-addons-update'

// 导出为 当前页面action 的集合
import {homePageActions} from '../actionCreators'
import defaultState from '../types'
import initState from '../initState'
import {
  INCREMENT_ENTHUSIASM,
  DECREMENT_ENTHUSIASM,
  USER_FETCH_SUCCEEDED,
  USER_FETCH_FAILED
} from '../constants'

export function pageReducers(state = initState,
                             action: homePageActions): defaultState {

  switch (action.type) {
    case INCREMENT_ENTHUSIASM:
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
    default:
      return state
  }
}