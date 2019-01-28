import * as React from 'react'
// 引入antd组件模块
import {Button} from 'antd'
// 样式模块化处理方案
import * as styles from './index.less'

// 定义props接口, 父组件传入
interface IHelloProps {
  name: string
  rangeLevel?: number
  onIncrement?: () => void
  onDecrement?: () => void
  onGetInitList?: (data: number) => void
  // TOTO: ... 自行拓展
}
// 定义state接口
// interface IHelloState {
//   // TOTO: ... 自行拓展
// }

// 导出基础组件类
export default class Hello extends React.Component<IHelloProps, {}> {
  public readonly state: {}
  constructor(props: IHelloProps) {
    super(props)
    this.state = {}
  }

  public render() {
    const {
      name,
      rangeLevel = 1,
      onIncrement,
      onDecrement
    } = this.props

    if (rangeLevel <= 0) {
      throw new Error('You could be a little more enthusiastic. :D')
    }
    return (
      <div className={styles['hello']}>
        <div className="greeting">
          {name + getExclamationMarks(rangeLevel)}
        </div>
        <div>
          <Button className={styles['button']} type="primary" onClick={onDecrement}>减少</Button>
          <Button className={styles['button']} type="primary" onClick={onIncrement}>增加</Button>
        </div>
      </div>
    )
  }

  public componentDidMount() {
    // 组件内触发 saga 调用式例
    // const { onGetInitList } = this.props;
    // !处理TypeScript 报错问题
    // onGetInitList!(1012003);
  }
}

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!')
}