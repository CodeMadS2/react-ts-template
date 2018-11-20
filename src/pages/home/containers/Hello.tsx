// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26840
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import Hello from '../../../components/Hello'
import * as actions from '../store/actionCreators/index';
import { StoreState } from '../store/types/index';
// import { Props } from '../components/Hello/index';

export function mapStateToProps({ demo: { enthusiasmLevel, languageName } }: StoreState) {
    return {
        enthusiasmLevel,
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

// export default connect<Props>(mapStateToProps, mapDispatchToProps)(Hello);