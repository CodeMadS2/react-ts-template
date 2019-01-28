// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26840
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import Hello from '@/components/Hello'
import * as actions from '../store/actionCreators'
import { IHelloState } from '../store/types'

// 涉及到saga数据 state映射到props
export function mapStateToProps({ home: {
    helloData: { rangeLevel, languageName, data }
}}: { home: IHelloState }) {
    return {
        rangeLevel,
        name: languageName,
        data,
    }
}
// 涉及到saga数据 dispatch 映射到props
export function mapDispatchToProps(dispatch: Dispatch<actions.homePageActions>) {
    return {
        onIncrement: () => dispatch(actions.incrementEnthusiasm()),
        onDecrement: () => dispatch(actions.decrementEnthusiasm())
    }
}

export function mergeProps(stateProps: object, dispatchProps: object, ownProps: object) {
    return Object.assign({}, ownProps, stateProps, dispatchProps)
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Hello)

// export default connect<Props>(mapStateToProps, mapDispatchToProps)(Hello);
