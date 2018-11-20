import * as React from 'react';
import './index.less';

export interface Props {
    name: string;
    enthusiasmLevel?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
}

export default class Hello extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        const { name, enthusiasmLevel = 1, onIncrement, onDecrement } = this.props;
        console.log(this.props);
        if (enthusiasmLevel <= 0) {
            throw new Error('You could be a little more enthusiastic. :D');
        }
        console.log(enthusiasmLevel);
        return (
            <div className="hello">
                <div className="greeting">
                    Hello {name + getExclamationMarks(enthusiasmLevel)}
                </div>
                <div>
                    <button onClick={onDecrement}>-</button>
                    <button onClick={onIncrement}>+</button>
                </div>
            </div>
        );
    }
    componentDidUpdate(data: any) {
        console.log(data);
    }
}

function getExclamationMarks(numChars: number) {
    console.log(Array(numChars + 1).join('!'))
    return Array(numChars + 1).join('!');
}