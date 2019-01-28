/**
 * 深度合并
 * @param FirstObj
 * @param SecondObj
 */
export function deepObjectMerge(FirstObj: any, SecondObj: any) {
    for (const key in SecondObj) {
      if (SecondObj[key]) {
        FirstObj[key] = FirstObj[key] && FirstObj[key].toString() === '[object Object]' ?
          deepObjectMerge(FirstObj[key], SecondObj[key]) : FirstObj[key] = SecondObj[key]
      }
    }
    return FirstObj
}