import * as React from 'react';
import Hello from './containers/Hello';
// import { connect } from 'react-redux';
// import { actionCreators } from './store';
import './style.css';

export default class DemoPage extends React.PureComponent {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <div>
                <Hello name='TypeScript' />
                {/*<Hello name={'TypeScript'} enthusiasmLevel={2} />*/}
            </div>
        );
    }
}