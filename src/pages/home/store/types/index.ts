// state接口
export interface demo {
    languageName: string;
    enthusiasmLevel?: number;
}
// 汇集
export interface StoreState {
    demo: demo;
}