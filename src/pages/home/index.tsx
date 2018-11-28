import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
// 引入页面相关组件 ...
import Hello from './components/Hello';
import * as actions from "./store/actionCreators";

// 页面布局样式
import './style.less';
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
              <div className="pageName">{ data }</div>
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
