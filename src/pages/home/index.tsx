import * as React from 'react'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'
// 引入页面相关组件 ...
import Hello from './components/Hello'
import * as actions from './store/actionCreators'

// 模块化页面样式
import * as styles from './style.less'
// 非模块化页面样式(针对一些组件库的样式处理)
import './home.css'

import {IHomeState} from './store/types'

export interface IProps {
  data: string
  onGetInitList?: (data: number) => void
}

class Home extends React.PureComponent<IProps, {}> {
  public render() {
    const {data} = this.props
    return (
      <div>
        <div className="global">全局css测试示例(自己可根据自己的元素层级进行增删改)</div>
        <div className={styles['module-style']}>模块化css测试示例(不影响全局css属性，可根据自身需求进行处理)</div>
        <div className={styles['component-wrapper']}>
          <div className={styles['component-title']}>组件使用(示例区域)</div>
          <Hello name="testData" />
        </div>
        <div className={styles.pageName}>{data ? `当前页：${data}`: ''}</div>
      </div>
    )
  }

  public componentDidMount() {
    // 组件内触发 saga 调用式例
    const { onGetInitList } = this.props
    // !处理TypeScript 报错问题
    onGetInitList!(1012003)
  }
}

export function mapStateToProps({
                                  home: {
                                    homeData: {data}
                                  }
                                }: { home: IHomeState }) {
  return {
    data
  }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.homePageAction>) {
  return {
    onGetInitList: (data: number) => dispatch(actions.getInitList(data)),
  }
}

export function mergeProps(stateProps: object, dispatchProps: object, ownProps: object) {
  return Object.assign({}, ownProps, stateProps, dispatchProps)
}


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Home)
