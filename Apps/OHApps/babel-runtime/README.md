# @babel/runtime

## 简介
> 本软件是参照开源软件 [@babel/runtime](https://babeljs.io/docs/babel-runtime) 源码并用 TypeScript 语言实现了相关功能，在OpenHarmony上支持一个 Babel 运行时的辅助库，用于在转换 ES6+ 代码时提供必要的运行时支持。

## 下载安装
```shell
ohpm install @babel/runtime@7.22.6
```
OpenHarmony ohpm环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明
1. 引入文件及代码依赖
 ```
import _createRawReactElement from '@babel/runtime/helpers/esm/jsx';
import _iterableToArrayLimit from '@babel/runtime/helpers/esm/iterableToArrayLimit';
import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread2";
import _typeof from '@babel/runtime/helpers/esm/typeof';
import _get from '@babel/runtime/helpers/esm/get';
 ```

## 接口说明
* classCallCheck -用于在类的构造函数中检查是否使用了 new 关键字来实例化类。
* defineProperties -用于定义对象的多个属性。
* defineProperty -用于定义对象的单个属性。
* extends -用于实现类之间的继承。
* get -用于获取对象的属性值。
* inherits -用于实现原型链继承。
* instanceof -用于检查对象是否是某个类的实例。
* interopRequireDefault -用于处理模块导入时的默认导出。
* interopRequireWildcard  -用于处理模块导入时的通配符导出。
* newArrowCheck  -用于在箭头函数中检查是否使用了 new 关键字。
* objectDestructuringEmpty  -用于处理对象解构时的空对象。
* objectWithoutPropertiesLoose  -用于从对象中排除指定的属性。
* possibleConstructorReturn  -用于在构造函数中返回实例。
* set  -用于设置对象的属性值。
* slicedToArray  -用于将类数组对象转换为数组。
* slicedToArrayLoose  -与 slicedToArray 类似，但对于非数组对象也能正常工作。
* superPropBase  -用于在子类中调用父类的属性。
* toArray  -用于将类数组对象转换为数组。
* toConsumableArray  -用于将可迭代对象转换为数组。
* typeof  -用于获取变量的类型。
* unsupportedIterableToArray  -用于将不可迭代对象转换为数组。
* wrapNativeSuper  -用于包装原生的 JavaScript 类。
* asyncGeneratorDelegate  -用于生成异步迭代器的委托。
* asyncIterator  -用于创建异步迭代器。
* asyncToGenerator  -用于将异步函数转换为生成器函数。
* classPrivateFieldGet  -用于获取类的私有字段。
* classPrivateFieldSet  -用于设置类的私有字段。
* createSuper  -用于创建类的超类。
* getPrototypeOf  -用于获取对象的原型。
* inheritsLoose  -与 inherits 类似，但对于非函数对象也能正常工作。

## 约束与限制

在下述版本验证通过  -

- DevEco Studio 版本  - 4.1 Canary(4.1.3.317),OpenHarmony SDK:API11 (4.1.0.36)

## 目录结构
````
|---- babel-runtime
|     |---- entry  # 示例代码文件夹
              ├── src  
                 ├── main   
                   ├── ets
                       ├── pages
                             ├── Index.ets  sample代码
|     |---- README.md  # 安装使用方法                
````

## 贡献代码
使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议
本项目基于 [MIT License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/babel-runtime/LICENSE) ，请自由地享受和参与开源。
