# jsonschema

## 简介
jsonschema是一个轻便易用的JSON模式验证器，它全量支持到draft-07以及之前版本的所有规则。

## 下载安装
```shell
ohpm install @ohos/jsonschema 
```
OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

## 使用说明
安装jsonschema之后，在需要使用的界面先导入jsonschema并初始化

 ```typescript
import { Validator, ValidatorResult, ValidationError, SchemaError, validate } from '@ohos/jsonschema'
let v = new Validator();
 ```

### 简单对象验证

```typescript
  let instance = 4;
  let schema = { "type": "number" }; // 设置规则
  let result = v.validate(instance, schema).valid;  // 启动验证并获取结果
```

将提供的路径参数转换为正则表达式，返回一个RegExp对象，里面包含了正则表达式的相关信息，用于验证或者路径拼接转换。

### 复杂验证---带有自规则和规则引用

```typescript
      // Address, to be embedded on Person
 let addressSchema = {
        "id": "/SimpleAddress",
        "type": "object",
        "properties": {
          "lines": {
            "type": "array",
            "items": {"type": "string"}
          },
          "zip": {"type": "string"},
          "city": {"type": "string"},
          "country": {"type": "string"}
        },
        "required": ["country"]
  };

  // Person
  let schema = {
        "id": "/SimplePerson",
        "type": "object",
        "properties": {
          "name": {"type": "string"},
          "address": {"$ref": "/SimpleAddress"},
          "votes": {"type": "integer", "minimum": 1}
        }
   };

  let p = {
        "name": "Barack Obama",
        "address": {
          "lines": [ "1600 Pennsylvania Avenue Northwest" ],
          "zip": "DC 20500",
          "city": "Washington",
          "country": "USA"
        },
        "votes": "lots"
   };

  v.addSchema(addressSchema, '/SimpleAddress');

  let result = v.validate(p, schema).valid;
```

### 支持自定义格式

```typescript
// 添加自定义的格式函数 
Validator.prototype.customFormats.myFormat = function (input) {
  return input === 'myFormat';
};

let v1 = new Validator();

// 验证格式名myFormat 结果为true
let result1 = v1.validate('myFormat', { type: 'string', format: 'myFormat' }).valid;
// 验证格式名foo 结果为false
let result2 = v1.validate('foo', { type: 'string', format: 'myFormat' }).valid;
```

设置的Validator.prototype.customFormats只会影响当前实例化的验证器，所以可以创建多个验证器来处理程序中具有不同格式的多个模式。

### 嵌套错误

```typescript
   let schema = {
     oneOf: [
       { type: 'string', minLength: 32, maxLength: 32 },
       { type: 'string', maxLength: 16 },
       { type: 'number' },
     ]
   };
 let result = v.validate('This string is 28 chars long', schema, { nestedErrors: true });
// result.toString()的值如下：
// 0: instance does not meet minimum length of 32
// 1: instance does not meet maximum length of 16
// 2: instance is not of a type(s) number
// 3: instance is not exactly one from [subschema 0],[subschema 1],[subschema 2]
```

设置多种验证项并且nestedErrors设置为true之后，当有多个属性验证未通过的时候，result里面会包含美格未通过验证的错误信息。整个校验过程不会在第一个校验项未通过验证的时候就返回错误信息结束验证。

### 自定义关键词

```typescript
v.attributes.contains = function validateContains(instance, schema, options, ctx) {
  if(typeof instance !== 'string') return;
  // @ts-ignore   自定义关键字类型判断
  if(typeof schema.contains !== 'string'){
     throw new SchemaError('"contains" expects a string', schema);
  }
  // @ts-ignore  判断是否包含自定义关键字
  if(instance.indexOf(schema.contains)<0){
     // @ts-ignore
     return 'does not contain the string ' + JSON.stringify(schema.contains);
   }
   // @ts-ignore  自定义关键字长度判断
   if (schema.contains.length < 2) {
     return '"contains" length must more than 2 ' ;
   }
}

// @ts-ignore
let result = v.validate("I am an instance", { type:"string", contains: "I am" }).valid;
```

可以在配置里面通过contains来设置自定义关键字(例如：I am)，并为该关键字设置验证规则(例如：function validateContains())。

### 移除校验规则

初始化数据

```typescript
  schemaArr: object[] = [
    {
      "type": "number"
    },
    {
      "id": "/simplePerson",
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "address": { "$ref": "/SimpleAddress" },
        "votes": { "type": "integer", "minimum": 1 }
      }
    },
    {
      "type": "array",
      "items": {
        "properties": {
          "name": { "type": "string" },
          "lastname": { "type": "string" }
        },
        "required": ["name", "lastname"]
      }
    },
  ]
  @State cacheSchemaNum: number = 0;
  @State isFinish: boolean = false;
```

开始添加/移除规则

```typescript
  let initSchema = {
        "id": "/SimplePerson",
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "address": { "$ref": "/SimpleAddress" },
          "votes": { "type": "integer", "minimum": 1 }
        }
      }
  v.addSchema(initSchema); // 添加初始化规则
  this.importNextSchema(v); // 启动递归方法 开始移除/添加校验规则
  let result = this.cacheSchemaNum >= 0; // 通过cacheSchemaNum数量变动来检测移除添加过程是否执行
```

```typescript
  importNextSchema(v: Validator) {
    let nextSchema = v.unresolvedRefs.shift(); // 移除校验规则
    if (this.cacheSchemaNum >= this.schemaArr.length) {
      this.isFinish = true;
      return
    }
    if (!nextSchema) {
      this.isFinish = true;
      return;
    }
    console.log(`nextSchema：${JSON.stringify(nextSchema)}`)  // 打印被移除校验规则
    v.addSchema(this.schemaArr[this.cacheSchemaNum]);  // 继续添加校验规则
    this.cacheSchemaNum++;
    this.importNextSchema(v); // 递归本方法 不断移除/添加校验规则
  }
```

通过Validator.unresolvedRefs.shift()可以将设置给验证器的某些规则移除，然后添加其他的规则，这样就可以使用同一个验证器组合出多种多样的校验规则，适用于复杂的校验场景。

### 属性预处理

在校验之前对需要校验的属性值进行预处理，包括判空、类型转换等。

```typescript
preValidate(object, key, schema, options, ctx) {
  let value = object[key];
  if (typeof value === 'undefined') return;
    // Test if the schema declares a type, but the type keyword fails validation
  if (schema.type
    && v1.attributes.type.call(v1, value, schema, options, ctx.makeChild(schema, key))) {
      // If the type is "number" but the instance is not a number, cast it
      if (schema.type === 'number' && typeof value !== 'number') {
        object[key] = parseFloat(value);
        return;
      }
      // If the type is "string" but the instance is not a string, cast it
      if (schema.type === 'string' && typeof value !== 'string') {
        object[key] = String(value).toString();
        return;
      }
   }
};
```

设置规则并开始校验

```typescript
 const schema = { 
     'properties': {
        'name': { 'type': 'string' },
        'quantity': { 'type': 'number' }
      } 
 };
 const instance = {
   name: 123,
   quantity: '2'
 }
 let v0 = new Validator();
 let v1 = new Validator();
// 属性不预处理
 let result0 = v0.validate(instance, schema).valid;
// 属性预处理
 let result1 = v1.validate(instance, schema, { preValidateProperty: this.preValidate }).valid;
```

提前处理某些属性可以避免设置过于复杂的校验规则，提高校验成功率。

### 跳过关键字验证

```typescript
let schema = {
   "id": "/SimplePerson",
   "type": "object",
   "properties": {
     "name": { "type": "string" },
     "sex": { "type": "number", "minimum": 50 },
     "votes": { "type": "integer", "minimum": 1 }
   }
};

 let p = {
   "name": "张三",
   "sex": 45,
   "votes": 22
 };
 let v0 = new Validator();
 let result0 = v0.validate(p, schema, { skipAttributes: ["minimum"] }).valid;
```

使用"skipAttributes"选项跳过某些关键字的验证，可以防止某些导入的模板校验规则中的某一条非必要校验规则导致的验证失败。如上所示，如果校验规则模板中age属性有最小值限制为50，但是我们项目中无此限制则可以设置跳过age关键字的最小值校验。

### 允许未知关键字失败

```typescript
let v0 = new Validator();
let schema = {
  type: "string",
  format: "email",
  example: "foo",
};
let result0 = v0.validate("Name", schema, { allowUnknownAttributes: true }).valid;
let v1 = new Validator();
let result1 = v1.validate("Name", schema, { allowUnknownAttributes: false });
// result0  false
// result1  throw err
```

默认情况下，jsonSchema会忽略未知的模式关键字，校验不通过不会抛出错误信息而是返回false的校验结果；如果用户需要处理该校验不通过的场景则可以设置allowUnknownAttributes: false来抛出异常错误信息中断校验过程，并针对返回的错误信息做出相应的处理。

## 接口说明

| 接口名                     | 参数                                                         | 返回值                  | 说明                                |
| -------------------------- | ------------------------------------------------------------ | ----------------------- | ----------------------------------- |
| new Validator()            | 暂无                                                         | Validator               | 生成校验器对象                      |
| Validator.validate()       | instance: any,<br/>schema: Schema,<br/>options?: Options,<br/>ctx?: SchemaContext | ValidatorResult         | 验证schema                          |
| Validator.addSchema()      | schema?: Schema,<br/>uri?: string                            | Schema\|void            | 添加schema到校验器                  |
| validate()                 | instance: any,<br/> schema: any,<br/>options?: Options       | ValidatorResult         | 验证schema                          |
| rewrite()                  | instance: any,<br/> schema: Schema, <br/>options: Options,<br/> ctx: SchemaContext | any                     | 在成功验证实例后更改实例的值        |
| preValidateProperty()      | instance: any, <br/>key: string, <br/>schema: Schema, <br/>options: Options, <br/>ctx: SchemaContext | any                     | 在验证之前需要对属性进行一些处理    |
| customFormats()            | input: any                                                   | boolean                 | 添加自己的自定义格式函数            |
| attributes()               | instance: any, schema: Schema, options: Options, ctx: SchemaContext | string\|ValidatorResult | 指定关键字                          |
| ValidatorResult.addError() | detail: string\|ErrorDetail                                  | ValidationError         | ValidatorResult对象添加错误信息错误 |
| ValidatorResult.toString() | 暂无                                                         | string                  | ValidatorResult对象转化为字符串     |
| ValidationError.toString() | 暂无                                                         | string                  | ValidationError对象转化为字符串     |
| shift()                    | 暂无                                                         | T \| undefined          | 移除并返回添加的验证规则            |

更多模块的使用可参考[官方文档](https://github.com/tdegrunt/jsonschema/blob/master/README.md)，[单元测试用例](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/json-schema/TEST.md)详情可参考

## 约束与限制
在下述版本验证通过：

- DevEco Studio: 4.0 (4.0.3.513), SDK: API10 (4.0.10.10)


## 目录结构
````
|---- json-schema  
|     |---- entry  # 示例代码文件夹
|     	|---- pages  # 应用页面，根据测试的json-schema的不同功能特性分为不同页面
|       |---- AllFuntionString.ts  # 用于返回用于界面显示的字符串
|       |---- JumpPathConfig.ts # 页面跳转辅助类，用于首页列表的数据显示以及点击跳转参数获取
|          
|     |---- README.md  # 安装使用方法                    
````

## 贡献代码
使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议
本项目基于 [MIT License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/json-schema/LICENSE) ，请自由地享受和参与开源。