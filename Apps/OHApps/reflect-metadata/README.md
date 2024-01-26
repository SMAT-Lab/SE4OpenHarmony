# reflect_metadata

## 简介

reflect_metadata用于在TypeScript中操作类的元数据，允许在声明类和属性时添加和读取元数据。

## 效果展示
<img height="400" src="./screenshot/效果展示.gif"/>

## 下载安装

````
ohpm install reflect_metadata@0.1.13
````

OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

## 使用说明

```typescript
//引入reflect-metadata
import("reflect-metadata").then((reflectMetadata) => {
  @Reflect.metadata(METADATA_KEY, 'John Doe')
  class Person {
    name: string = 'John Doe';
  }
  //接口调用
  Reflect.hasMetadata(METADATA_KEY, Person);
  Reflect.hasOwnMetadata(METADATA_KEY, Person);
  Reflect.getMetadata(METADATA_KEY, Person);
  Reflect.getOwnMetadata(METADATA_KEY, Person);
  Reflect.getMetadataKeys(Person);
  Reflect.getOwnMetadataKeys(Person);
  Reflect.deleteMetadata(METADATA_KEY, Person);
})
```

## 接口说明

1. 检查原型链上是否存在元数据键: Reflect.hasMetadata
2. 检查是否存在自己的元数据键: Reflect.hasOwnMetadata
3. 获取原型链上元数据键的元数据值: Reflect.getMetadata
4. 获取自己的元数据键的元数据值: Reflect.getOwnMetadata
5. 获取原型链上的所有元数据键: Reflect.getMetadataKeys
6. 获取所有自己的元数据键: Reflect.getOwnMetadataKeys
7. 删除元数据: Reflect.deleteMetadata

## 约束与限制

在下述版本验证通过：

- DevEco Studio 版本： 4.1 Canary(4.1.3.317)

- OpenHarmony SDK:API11 (4.1.0.36)

## 目录结构

````
|---- reflect-metadata 
|     |---- entry  # 示例代码文件夹
|     |---- README.md  # 安装使用方法      
````

## 贡献代码
使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议
本项目基于 [Apache License 2.0](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/tree/master/reflect-metadata/blob/master/LICENSE) ，请自由地享受和参与开源。
