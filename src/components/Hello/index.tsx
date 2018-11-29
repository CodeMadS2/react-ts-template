import * as React from 'react';

// css 模块化处理方案
import * as styles from './index.css';

export interface Props {
    name: string;
    enthusiasmLevel?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
    onGetInitList?: (data: number) => void;
}

export default class Hello extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        const { name, enthusiasmLevel = 1, onIncrement, onDecrement } = this.props;

        if (enthusiasmLevel <= 0) {
            throw new Error('You could be a little more enthusiastic. :D');
        }
        return (
            <div className={styles['hello']}>
                <div className="greeting">
                    Hello {name + getExclamationMarks(enthusiasmLevel)}
                </div>
                <div>
                    <button onClick={onDecrement}>-</button>
                    <button onClick={onIncrement}>+</button>
                </div>
            </div>
        )
    }
    componentDidMount() {
        // 组件内触发 saga 调用式例
        // const { onGetInitList } = this.props;
        // !处理TypeScript 报错问题
        // onGetInitList!(1012003);
    }
}

function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}