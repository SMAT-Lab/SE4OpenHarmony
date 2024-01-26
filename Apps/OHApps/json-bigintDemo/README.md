# json-bigint
# 简介
json-bigint是一个具有bigints支持的JSON.parse/stringify，基于JSON.js包和bignumber.js库。
# 下载安装
    ohpm install json-bigint
    ohpm install @types/json-bigint --save-dev //import json-bigint 的时候语法报错。其原因是json-bigint包内不含类型声明，需要 @types/json-bigint 下载这个包的声明文件，从而解决语法的报错。
OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)
# 使用说明
安装json-bigint之后，在需要使用的界面先导入json-bigint并调用

    import  jsonBigint from 'json-bigint'
    let bigint = jsonBigint()
## 简单使用
    @State input:string  = '{"bigValue":9223372036854775807,"SmallValue":123}';// 无配置项中需要测试的数据
    let parseValue:Record<string, string > = bigint.parse(this.input)
    console.log(`JSON.parse : ${ typeof parseValue.bigValue }`)// JSON.parse :9223372036854775807
    let stringifyValue:string = bigint.stringify(parseValue)
    console.log(`JSONbig.stringify(JSONbig.parse(input)):${stringifyValue}`)// JSONbig.stringify(JSONbig.parse(input)):{"big":9223372036854775807,"small":123}
## 开启严格模式

    @State strictInput:string = '{ "dupkey": "value 1", "dupkey": "value 2"}';// 严格模式下需要测试的数据
    let bigint = jsonBigint({strict:true})
    try {
            this.failsInput= bigint.parse(this.strictInput);
            console.log('ERROR!! Should never get here');
        } catch (e) {
            console.log('Succesfully catched expected exception on duplicate keys: %j',JSON.stringify(e))// Succesfully catched expected exception on duplicate keys: {"name":"SyntaxError","message":"Duplicate key \"dupkey\"","at":33,"text":"{ \"dupkey\": \"value 1\", \"dupkey\": \"value 2\"}"}
        }
在调用json_bigint时添加strict：true 指定解析为‘严格的’，如果有重复键值则在此类重复键出现时失效，从而提前警告可能丢失的信息
## 开启bigint转为字符串

     @State storeAsStringInput:string = '{ "key": 1234567890123456789 }'// bigint转为字符串需要测试的数据
    let bigint = jsonBigint({ storeAsString: true })
    let  withString:Record<string, string > = bigint.parse(this.storeAsStringInput);
            console.log(`${withString.key}`)//1234567890123456789
            console.log(`Default type: %s, With option type: %s, ${typeof withString.key}`);// Default type: object, With option type: string
            })
在调用json_bigint时添加storeAsString：true，指定是否应将BigInts作为字符串存储在对象中，而不是默认的BigNumber。请注意，这是一个危险的行为，因为它破坏了能够在不更改数据类型的情况下来回转换的默认功能（因为这会将所有BigInt转换为前后字符串）
## 开启使用原生bigint
    @State useNativeBigIntInput:string = '{ "key": 993143214321423154315154321 }'// 使用本地的bigint需要测试的数据
    let bigint = jsonBigint({ useNativeBigInt: true } )
    let  JSONbigNative:Record<string, string > = bigint.parse(this.useNativeBigIntInput);
            console.log(`${JSONbigNative.key}`)
            console.log(
                `Default type: %s, With option type: %s, ${typeof JSONbigNative.key}`);// Default type: %s, With option type: %s, bigint
            })
在调用json_bigint时添加useNativeBigInt：true，指定解析器是否使用本机BigInt而不是bignumber.js

## 开启将所有数字存储为BigNumber

    @State alwaysParseAsBigInput:string = '{ "key": 12312312312 }'// 将所有的数字存储为bignumber
    let bigint = jsonBigint({ alwaysParseAsBig: true } )
    let  JSONbigAlways:Record<string, string > = bigint.parse(this.alwaysParseAsBigInput);
            console.log(`${JSONbigAlways.key}`)
            console.log(
                `Default type: %s, With option type: %s, ${typeof JSONbigAlways.key}`);// Default type: %s, With option type: %s, object
            })
在调用json_bigint时添加alwaysParseAsBig：true，指定是否应将所有数字存储为BigNumber。

# 接口说明
|接口名   | 参数           |返回值   |说明   |
| ------------ |--------------| ------------ | ------------ |
|jsonBigint()   | options 可选   |optionsType   |生成转换对象   |
|parse()   | value:string 要被解析成的字符串|object   |将JSON格式的字符串转换为对象(可支持bigint数据类型)   |
|stringify()   | value:object 将要序列化成 一个JSON字符串的 |string  |将js值转换为JSON对象(可支持bigint数据类型)   |
**单元测试用例详见**[TEST.md](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/json-bigintDemo/TEST.md)
### options参数说明
| 参数                     |说明   |
|------------------------| ------------ |
| strict：true            | 指定解析为‘严格的’，如果有重复键值则在此类重复键出现时失效，从而提前警告可能丢失的信息  |
| storeAsString：true     |指定是否应将BigInts作为字符串存储在对象中，而不是默认的BigNumber。请注意，这是一个危险的行为，因为它破坏了能够在不更改数据类型的情况下来回转换的默认功能（因为这会将所有BigInt转换为前后字符串）   |
| useNaiveBigint:true    | 指定解析器是否使用本机的Bigint而不是bignumber.js  |
| alwaysParseAsBig: true | 指定是否将所有数字存储为bignumber|

# 约束与限制
- DevEco Studio: 4.0 (4.1.3.313), SDK: API10 (4.0.10.10)

# 目录结构
    |---- json-bigint  
    |     |---- entry  # 示例代码文件夹
    |     	|---- pages  # 应用页面，根据测试的json-bigint的不同功能特性分为不同页面
    |           |---- index.ets  # 测试json-bigint的不同功能特性                   
    |     |---- README.md  # 安装使用方法     

# 贡献代码
使用过程中发现任何问题都可以提[ Issue ](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues)给我们，当然，我们也欢迎你给我们发[PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls)

# 开源协议
本项目基于 [ MIT License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/json-bigint/LICENSE) ，请自由地享受和参与开源。