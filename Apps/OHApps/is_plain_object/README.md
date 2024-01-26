# is-plain-object

## 简介

> is-plain-object。如果对象是由object构造函数或object .create(null)创建的，则返回true。

## 下载安装

```shell
ohpm  install is-plain-object@5.0.0
```

OpenHarmony ohpm 环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明


```js
import { isPlainObject } from 'is-plain-object';
```


```js
isPlainObject(Object.create({}));
//=> true
isPlainObject(Object.create(Object.prototype));
//=> true
isPlainObject({ foo: 'bar' });
//=> true
isPlainObject({});
//=> true
isPlainObject(null);
//=> true
```


```js
isPlainObject(1);
//=> false
isPlainObject(['foo', 'bar']);
//=> false
isPlainObject([]);
//=> false
isPlainObject(new Foo);
//=> false
isPlainObject(Object.create(null));
//=> false
```

## 约束与限制

在下述版本验证通过：

- DevEco Studio 版本： 4.1 Canary(4.1.3.317),OpenHarmony SDK:API11 (4.1.0.36)。

## 目录结构

````
|---- is_plain_object
|     |---- entry  # 示例代码文件夹
          ├── src  
              ├── main   
                   ├── ets
                       ├── pages
                             ├── Index.ets  sample代码
|     |---- README.md  # 安装使用方法                    
````

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/is-plain-object/issues)
给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/is-plain-object/pulls) 。

## 开源协议

本项目基于 [MIT](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/is-plain-object/blob/master/LICENSE) ，请自由地享受和参与开源。