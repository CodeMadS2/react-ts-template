// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26840
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import Hello from '../../../components/Hello'
import * as actions from '../store/actionCreators';
import { helloState } from '../store/types';
// import { Props } from '../components/Hello/index';

// 对于使用的组件所在的页面，请按照数据树的解构进行解构，此出home 代表home页面
export function mapStateToProps({ home: {
    helloData: { enthusiasmLevel, languageName, data }
}}: { home: helloState }) {
    return {
        enthusiasmLevel,
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