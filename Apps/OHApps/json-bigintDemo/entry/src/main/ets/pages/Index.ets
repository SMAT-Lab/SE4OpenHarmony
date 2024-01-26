/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import jsonBigint from 'json-bigint'
import { jsonBigTpye} from './index.ts'
@Entry
@Component
struct Index {
  @State input:string = '{"bigValue":9223372036854775807,"SmallValue":123}';//无配置项中需要测试的数据
  @State strictInput:string = '{ "dupkey": "value 1", "dupkey": "value 2"}';//严格模式下需要测试的数据
  @State failsInput:string = 'will stay like this';
  @State storeAsStringInput:string = '{ "key": 1234567890123456789 }';//bigint转为字符串需要测试的数据
  @State useNativeBigIntInput:string = '{ "key": 993143214321423154315154321 }';//使用本地的bigint需要测试的数据
  @State alwaysParseAsBigInput:string = '{ "key": 12312312312 }';//将所有的数字存储为bignumber
  scroller: Scroller = new Scroller()
  build() {
    Scroll(this.scroller) {
      Row() {
        Column() {
          //原生JSON.parse  JSON.stringify的基本使用
          Button('测试原生Json转换是否支持bigint')
            .fontSize(15)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 40 })
            .onClick(() => {
              let parseValue:string = JSON.parse(this.input).bigValue.toString();
              console.log(`JSON.parse,${ parseValue}`);// 92233720368547760000 精度不准
              let stringifyValue:string = JSON.stringify(parseValue);
              console.log(`JSON.stringify(JSON.parse(input)):${stringifyValue}`);//{"big":9223372036854776000,"small":123}
            })
          // json_bigint 基本使用
          Button('测试json_bigint转换是否支持bigint')
            .fontSize(15)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 40 })
            .onClick(() => {
              let bigint:jsonBigTpye = jsonBigint();
              let parseValue:Record<string, string > = bigint.parse(this.input);
              console.log(`bigint.parse : ${  parseValue.bigValue.toString() }`);// bigint.parse:9223372036854775807
              let stringifyValue:string = bigint.stringify(bigint.parse(this.input));
              console.log(`bigint.stringify(bigint.parse(input)):${stringifyValue}`);// {"big":'9223372036854775807',"small":123}
            })
          // json_bigint
          // 添加strict：true 指定解析为‘严格的’，如果有重复键值则在此类重复键出现时失效，从而提前警告可能丢失的信息。
          Button('测试json_bigint开启strict:true')
            .fontSize(15)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 40 })
            .onClick(() => {
              let bigint:jsonBigTpye = jsonBigint({strict:true});
              try {
                this.failsInput= bigint.parse(this.strictInput);
                console.log('ERROR!! Should never get here');
              } catch (e) {
                console.log(
                  'Succesfully catched expected exception on duplicate keys: %j', JSON.stringify(e));
                /*
                   Succesfully catched expected exception on duplicate keys:
                   {"name":"SyntaxError","message":"Duplicate key \"dupkey\"","at":33,"text":"{ \"dupkey\": \"value 1\", \"dupkey\": \"value 2\"}"}
                */
              }
            })
          // json_bigint
          // 指定是否应将BigInts作为字符串存储在对象中，而不是默认的BigNumber。
          // 请注意，这是一个危险的行为，因为它破坏了能够在不更改数据类型的情况下来回转换的默认功能（因为这会将所有BigInt转换为前后字符串）。
          Button('测试json_bigint开启storeAsString: true')
            .fontSize(15)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 40 })
            .onClick(() => {
              let bigint:jsonBigTpye = jsonBigint({ storeAsString: true });
              let  withString:Record<string, string > = bigint.parse(this.storeAsStringInput);
              console.log(`${withString.key}`);//1234567890123456789
              console.log(`Default type: %s, With option type: %s, ${typeof withString.key}`);//Default type: object, With option type: string
            });
          // json_bigint
          // 指定解析器是否使用本机BigInt而不是bignumber.js
          Button('测试json_bigint开启useNativeBigInt: true')
            .fontSize(15)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 40 })
            .onClick(() => {
              let bigint:jsonBigTpye = jsonBigint({ useNativeBigInt: true });
              let JSONbigNative:Record<string, string> = bigint.parse(this.useNativeBigIntInput);
              console.log(`${JSONbigNative.key}`)// 993143214321423154315154321
              console.log(`Default type: %s, With option type: %s, ${typeof JSONbigNative.key}`);// Default type: %s, With option type: %s, bigint
            })
          // json_bigint
          // 指定是否应将所有数字存储为BigNumber。
          Button('测试json_bigint开启alwaysParseAsBig: true ')
            .fontSize(15)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 40 })
            .onClick(() => {
              let bigint:jsonBigTpye = jsonBigint({ alwaysParseAsBig: true });
              let  JSONbigAlways:Record<string, string > = bigint.parse(this.alwaysParseAsBigInput);
              console.log(`${JSONbigAlways.key}`);// 12312312312
              console.log(`Default type: %s, With option type: %s, ${typeof JSONbigAlways.key}`);// Default type: %s, With option type: %s, object
            })
        }
        .width('100%')
      }
    }
  }
}