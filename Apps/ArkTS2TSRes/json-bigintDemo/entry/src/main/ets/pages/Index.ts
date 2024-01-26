interface Index_Params {
    input?: string;
    strictInput?: string;
    failsInput?: string;
    storeAsStringInput?: string;
    useNativeBigIntInput?: string;
    alwaysParseAsBigInput?: string;
    scroller?: Scroller;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
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
import jsonBigint from 'json-bigint';
import { jsonBigTpye } from './index.ts';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__input = new ObservedPropertySimple('{"bigValue":9223372036854775807,"SmallValue":123}', this, "input");
        this.__strictInput = new ObservedPropertySimple('{ "dupkey": "value 1", "dupkey": "value 2"}', this, "strictInput");
        this.__failsInput = new ObservedPropertySimple('will stay like this', this, "failsInput");
        this.__storeAsStringInput = new ObservedPropertySimple('{ "key": 1234567890123456789 }', this, "storeAsStringInput");
        this.__useNativeBigIntInput = new ObservedPropertySimple('{ "key": 993143214321423154315154321 }', this, "useNativeBigIntInput");
        this.__alwaysParseAsBigInput = new ObservedPropertySimple('{ "key": 12312312312 }', this, "alwaysParseAsBigInput");
        this.scroller = new Scroller();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.input !== undefined) {
            this.input = params.input;
        }
        if (params.strictInput !== undefined) {
            this.strictInput = params.strictInput;
        }
        if (params.failsInput !== undefined) {
            this.failsInput = params.failsInput;
        }
        if (params.storeAsStringInput !== undefined) {
            this.storeAsStringInput = params.storeAsStringInput;
        }
        if (params.useNativeBigIntInput !== undefined) {
            this.useNativeBigIntInput = params.useNativeBigIntInput;
        }
        if (params.alwaysParseAsBigInput !== undefined) {
            this.alwaysParseAsBigInput = params.alwaysParseAsBigInput;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    aboutToBeDeleted() {
        this.__input.aboutToBeDeleted();
        this.__strictInput.aboutToBeDeleted();
        this.__failsInput.aboutToBeDeleted();
        this.__storeAsStringInput.aboutToBeDeleted();
        this.__useNativeBigIntInput.aboutToBeDeleted();
        this.__alwaysParseAsBigInput.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __input: ObservedPropertySimple<string>; //无配置项中需要测试的数据
    get input() {
        return this.__input.get();
    }
    set input(newValue: string) {
        this.__input.set(newValue);
    }
    private __strictInput: ObservedPropertySimple<string>; //严格模式下需要测试的数据
    get strictInput() {
        return this.__strictInput.get();
    }
    set strictInput(newValue: string) {
        this.__strictInput.set(newValue);
    }
    private __failsInput: ObservedPropertySimple<string>;
    get failsInput() {
        return this.__failsInput.get();
    }
    set failsInput(newValue: string) {
        this.__failsInput.set(newValue);
    }
    private __storeAsStringInput: ObservedPropertySimple<string>; //bigint转为字符串需要测试的数据
    get storeAsStringInput() {
        return this.__storeAsStringInput.get();
    }
    set storeAsStringInput(newValue: string) {
        this.__storeAsStringInput.set(newValue);
    }
    private __useNativeBigIntInput: ObservedPropertySimple<string>; //使用本地的bigint需要测试的数据
    get useNativeBigIntInput() {
        return this.__useNativeBigIntInput.get();
    }
    set useNativeBigIntInput(newValue: string) {
        this.__useNativeBigIntInput.set(newValue);
    }
    private __alwaysParseAsBigInput: ObservedPropertySimple<string>; //将所有的数字存储为bignumber
    get alwaysParseAsBigInput() {
        return this.__alwaysParseAsBigInput.get();
    }
    set alwaysParseAsBigInput(newValue: string) {
        this.__alwaysParseAsBigInput.set(newValue);
    }
    private scroller: Scroller;
    render() {
        Scroll.create(this.scroller);
        Row.create();
        Column.create();
        Column.width('100%');
        //原生JSON.parse  JSON.stringify的基本使用
        Button.createWithLabel('测试原生Json转换是否支持bigint');
        //原生JSON.parse  JSON.stringify的基本使用
        Button.fontSize(15);
        //原生JSON.parse  JSON.stringify的基本使用
        Button.fontWeight(FontWeight.Bold);
        //原生JSON.parse  JSON.stringify的基本使用
        Button.margin({ top: 40 });
        //原生JSON.parse  JSON.stringify的基本使用
        Button.onClick(() => {
            let parseValue: string = JSON.parse(this.input).bigValue.toString();
            console.log(`JSON.parse,${parseValue}`); // 92233720368547760000 精度不准
            let stringifyValue: string = JSON.stringify(parseValue);
            console.log(`JSON.stringify(JSON.parse(input)):${stringifyValue}`); //{"big":9223372036854776000,"small":123}
        });
        //原生JSON.parse  JSON.stringify的基本使用
        Button.pop();
        // json_bigint 基本使用
        Button.createWithLabel('测试json_bigint转换是否支持bigint');
        // json_bigint 基本使用
        Button.fontSize(15);
        // json_bigint 基本使用
        Button.fontWeight(FontWeight.Bold);
        // json_bigint 基本使用
        Button.margin({ top: 40 });
        // json_bigint 基本使用
        Button.onClick(() => {
            let bigint: jsonBigTpye = jsonBigint();
            let parseValue: Record<string, string> = bigint.parse(this.input);
            console.log(`bigint.parse : ${parseValue.bigValue.toString()}`); // bigint.parse:9223372036854775807
            let stringifyValue: string = bigint.stringify(bigint.parse(this.input));
            console.log(`bigint.stringify(bigint.parse(input)):${stringifyValue}`); // {"big":'9223372036854775807',"small":123}
        });
        // json_bigint 基本使用
        Button.pop();
        // json_bigint
        // 添加strict：true 指定解析为‘严格的’，如果有重复键值则在此类重复键出现时失效，从而提前警告可能丢失的信息。
        Button.createWithLabel('测试json_bigint开启strict:true');
        // json_bigint
        // 添加strict：true 指定解析为‘严格的’，如果有重复键值则在此类重复键出现时失效，从而提前警告可能丢失的信息。
        Button.fontSize(15);
        // json_bigint
        // 添加strict：true 指定解析为‘严格的’，如果有重复键值则在此类重复键出现时失效，从而提前警告可能丢失的信息。
        Button.fontWeight(FontWeight.Bold);
        // json_bigint
        // 添加strict：true 指定解析为‘严格的’，如果有重复键值则在此类重复键出现时失效，从而提前警告可能丢失的信息。
        Button.margin({ top: 40 });
        // json_bigint
        // 添加strict：true 指定解析为‘严格的’，如果有重复键值则在此类重复键出现时失效，从而提前警告可能丢失的信息。
        Button.onClick(() => {
            let bigint: jsonBigTpye = jsonBigint({ strict: true });
            try {
                this.failsInput = bigint.parse(this.strictInput);
                console.log('ERROR!! Should never get here');
            }
            catch (e) {
                console.log('Succesfully catched expected exception on duplicate keys: %j', JSON.stringify(e));
                /*
                   Succesfully catched expected exception on duplicate keys:
                   {"name":"SyntaxError","message":"Duplicate key \"dupkey\"","at":33,"text":"{ \"dupkey\": \"value 1\", \"dupkey\": \"value 2\"}"}
                */
            }
        });
        // json_bigint
        // 添加strict：true 指定解析为‘严格的’，如果有重复键值则在此类重复键出现时失效，从而提前警告可能丢失的信息。
        Button.pop();
        // json_bigint
        // 指定是否应将BigInts作为字符串存储在对象中，而不是默认的BigNumber。
        // 请注意，这是一个危险的行为，因为它破坏了能够在不更改数据类型的情况下来回转换的默认功能（因为这会将所有BigInt转换为前后字符串）。
        Button.createWithLabel('测试json_bigint开启storeAsString: true');
        // json_bigint
        // 指定是否应将BigInts作为字符串存储在对象中，而不是默认的BigNumber。
        // 请注意，这是一个危险的行为，因为它破坏了能够在不更改数据类型的情况下来回转换的默认功能（因为这会将所有BigInt转换为前后字符串）。
        Button.fontSize(15);
        // json_bigint
        // 指定是否应将BigInts作为字符串存储在对象中，而不是默认的BigNumber。
        // 请注意，这是一个危险的行为，因为它破坏了能够在不更改数据类型的情况下来回转换的默认功能（因为这会将所有BigInt转换为前后字符串）。
        Button.fontWeight(FontWeight.Bold);
        // json_bigint
        // 指定是否应将BigInts作为字符串存储在对象中，而不是默认的BigNumber。
        // 请注意，这是一个危险的行为，因为它破坏了能够在不更改数据类型的情况下来回转换的默认功能（因为这会将所有BigInt转换为前后字符串）。
        Button.margin({ top: 40 });
        // json_bigint
        // 指定是否应将BigInts作为字符串存储在对象中，而不是默认的BigNumber。
        // 请注意，这是一个危险的行为，因为它破坏了能够在不更改数据类型的情况下来回转换的默认功能（因为这会将所有BigInt转换为前后字符串）。
        Button.onClick(() => {
            let bigint: jsonBigTpye = jsonBigint({ storeAsString: true });
            let withString: Record<string, string> = bigint.parse(this.storeAsStringInput);
            console.log(`${withString.key}`); //1234567890123456789
            console.log(`Default type: %s, With option type: %s, ${typeof withString.key}`); //Default type: object, With option type: string
        });
        // json_bigint
        // 指定是否应将BigInts作为字符串存储在对象中，而不是默认的BigNumber。
        // 请注意，这是一个危险的行为，因为它破坏了能够在不更改数据类型的情况下来回转换的默认功能（因为这会将所有BigInt转换为前后字符串）。
        Button.pop();
        // json_bigint
        // 指定解析器是否使用本机BigInt而不是bignumber.js
        Button.createWithLabel('测试json_bigint开启useNativeBigInt: true');
        // json_bigint
        // 指定解析器是否使用本机BigInt而不是bignumber.js
        Button.fontSize(15);
        // json_bigint
        // 指定解析器是否使用本机BigInt而不是bignumber.js
        Button.fontWeight(FontWeight.Bold);
        // json_bigint
        // 指定解析器是否使用本机BigInt而不是bignumber.js
        Button.margin({ top: 40 });
        // json_bigint
        // 指定解析器是否使用本机BigInt而不是bignumber.js
        Button.onClick(() => {
            let bigint: jsonBigTpye = jsonBigint({ useNativeBigInt: true });
            let JSONbigNative: Record<string, string> = bigint.parse(this.useNativeBigIntInput);
            console.log(`${JSONbigNative.key}`); // 993143214321423154315154321
            console.log(`Default type: %s, With option type: %s, ${typeof JSONbigNative.key}`); // Default type: %s, With option type: %s, bigint
        });
        // json_bigint
        // 指定解析器是否使用本机BigInt而不是bignumber.js
        Button.pop();
        // json_bigint
        // 指定是否应将所有数字存储为BigNumber。
        Button.createWithLabel('测试json_bigint开启alwaysParseAsBig: true ');
        // json_bigint
        // 指定是否应将所有数字存储为BigNumber。
        Button.fontSize(15);
        // json_bigint
        // 指定是否应将所有数字存储为BigNumber。
        Button.fontWeight(FontWeight.Bold);
        // json_bigint
        // 指定是否应将所有数字存储为BigNumber。
        Button.margin({ top: 40 });
        // json_bigint
        // 指定是否应将所有数字存储为BigNumber。
        Button.onClick(() => {
            let bigint: jsonBigTpye = jsonBigint({ alwaysParseAsBig: true });
            let JSONbigAlways: Record<string, string> = bigint.parse(this.alwaysParseAsBigInput);
            console.log(`${JSONbigAlways.key}`); // 12312312312
            console.log(`Default type: %s, With option type: %s, ${typeof JSONbigAlways.key}`); // Default type: %s, With option type: %s, object
        });
        // json_bigint
        // 指定是否应将所有数字存储为BigNumber。
        Button.pop();
        Column.pop();
        Row.pop();
        Scroll.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
