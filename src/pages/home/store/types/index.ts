// state接口
export interface helloData {
    languageName: string;
    enthusiasmLevel?: number;
    data: string
}
export interface homeData {
    data: string
}

//  hello 组件使用
export interface helloState {
    helloData: helloData
}
// 公共home页面使用
export interface homeState {
    homeData: homeData
}
// 默认二者聚合,用于页面公共 reducers
export default interface defaultState {
    helloData: helloData;
    homeData: homeData
}