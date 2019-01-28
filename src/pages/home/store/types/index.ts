// state接口

interface IHelloData {
    languageName: string
    rangeLevel: number
    data: string
}
interface IHomeData {
    data: string
}

//  hello 组件使用
export interface IHelloState {
    helloData: IHelloData
}
// 公共home页面使用
export interface IHomeState {
    homeData: IHomeData
}
// 默认二者聚合,用于页面公共 reducers，即home页用到的数据格式
// export default interface IDefaultState {
//     helloData: IHelloData;
//     homeData: IhomeData
// }

// 注意接口中类型命名
export default interface IDefaultState extends IHelloState, IHomeState {}