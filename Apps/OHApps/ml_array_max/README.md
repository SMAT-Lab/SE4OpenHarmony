# ml_array_max

## 简介

> 这是一个用于获取数组中的最大值的库

## 下载安装

```shell
ohpm  install ml-array-max@1.2.4
```

OpenHarmony ohpm 环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明


```js
import max from 'ml-array-max';

const result = max([1, 5, 3, 2, 4]);
// 5

```
单元测试用例详情见[TEST.md](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/ml_array_max/TEST.md)

## 约束与限制

在下述版本验证通过：

- DevEco Studio 版本： 4.1 Canary(4.1.3.317),OpenHarmony SDK:API11 (4.1.0.36)。

## 接口说明

| **接口**                                                               | 参数                              | 功能    |
|----------------------------------------------------------------------|---------------------------------|-------|
| max(array: ArrayLike<number>, options?: mlArrayMax.ArrayMaxOptions)  | array: 数组<br/> options: 数组最大值选项 | 计算最大值 |

## 目录结构

````
|---- ml_array_max
|     |---- entry  # 示例代码文件夹
              ├── src  
                 ├── main   
                   ├── ets
                       ├── pages
                             ├── Index.ets  sample代码
|     |---- README.md  # 安装使用方法                    
````

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues)
给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [MIT License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/ml_array_max/LICENSE)
，请自由地享受和参与开源。
    