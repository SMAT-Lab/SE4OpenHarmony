## javascript-natural-sort单元测试用例

该测试用例基于OpenHarmony系统下，参照[原库测试用例](https://github.com/scottcorgan/tiny-emitter/blob/master/test/index.js)进行单元测试

### 单元测试用例覆盖情况

|                        接口名                         |    是否通过	     |备注|
|:--------------------------------------------------:|:------------:|:---:|
| on(event: string, callback: Function, ctx?: any)   |     pass     |       |
| once(event: string, callback: Function, ctx?: any) |     pass     |       |
|      off(event: string, callback?: Function)       |     pass     |       |
|        emit(event: string, ...args: any[])         |     pass     |       |