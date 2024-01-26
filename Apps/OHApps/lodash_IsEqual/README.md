# lodash.isequal

## 简介

lodash.isequal库用于比较2个对象是否相同

## 下载安装:

```bash
ohpm install lodash.isequal@4.5.0
```

## 使用说明

```bash
import isEqual from 'lodash.isequal';
let a = 1
    let b = 1
    let res: boolean = isEqual(a, b)
```

## 接口说明


| **接口**                                                      | 功能             |
| ------------------------------------------------------------ | ---------------- |
| isEqual(a: ESObject,b:ESObject): boolean | 比较2个对象是否相等 |

## 约束与限制

在下述版本验证通过：适配DevEco Studio:4.1 Canary(4.1.3.317)，OpenHarmony SDK:API version 11 (4.1.0.36).

## 目录结构

````
|---- lodash_isEqual  
|     |---- entry  # 示例代码文件夹
|           |---- src  
|                   |---- main  #sample示例代码
|                   |---- ohosTest  #xts示例代码
|     |---- README.md  # 安装使用方法                    
````

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues)
给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [MIT LICENSE](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/lodash_isEqual/LICENSE)
，请自由地享受和参与开源。