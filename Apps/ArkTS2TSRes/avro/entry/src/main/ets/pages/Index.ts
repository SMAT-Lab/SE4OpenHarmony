interface Index_Params {
    arrayTestResult?: string;
    booleanTestResult?: string;
    doubleTestResult?: string;
    floatTestResult?: string;
    intTestResult?: string;
    longTestResult?: string;
    mapTestResult?: string;
    nullTestResult?: string;
    stringTestResult?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import avro from '@ohos/avro-js';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__arrayTestResult = new ObservedPropertySimple("ArrayType", this, "arrayTestResult");
        this.__booleanTestResult = new ObservedPropertySimple("BooleanType", this, "booleanTestResult");
        this.__doubleTestResult = new ObservedPropertySimple("DoubleType", this, "doubleTestResult");
        this.__floatTestResult = new ObservedPropertySimple("FloatType", this, "floatTestResult");
        this.__intTestResult = new ObservedPropertySimple("IntType", this, "intTestResult");
        this.__longTestResult = new ObservedPropertySimple("LongType", this, "longTestResult");
        this.__mapTestResult = new ObservedPropertySimple("MapType", this, "mapTestResult");
        this.__nullTestResult = new ObservedPropertySimple("NullType", this, "nullTestResult");
        this.__stringTestResult = new ObservedPropertySimple("StringType", this, "stringTestResult");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.arrayTestResult !== undefined) {
            this.arrayTestResult = params.arrayTestResult;
        }
        if (params.booleanTestResult !== undefined) {
            this.booleanTestResult = params.booleanTestResult;
        }
        if (params.doubleTestResult !== undefined) {
            this.doubleTestResult = params.doubleTestResult;
        }
        if (params.floatTestResult !== undefined) {
            this.floatTestResult = params.floatTestResult;
        }
        if (params.intTestResult !== undefined) {
            this.intTestResult = params.intTestResult;
        }
        if (params.longTestResult !== undefined) {
            this.longTestResult = params.longTestResult;
        }
        if (params.mapTestResult !== undefined) {
            this.mapTestResult = params.mapTestResult;
        }
        if (params.nullTestResult !== undefined) {
            this.nullTestResult = params.nullTestResult;
        }
        if (params.stringTestResult !== undefined) {
            this.stringTestResult = params.stringTestResult;
        }
    }
    aboutToBeDeleted() {
        this.__arrayTestResult.aboutToBeDeleted();
        this.__booleanTestResult.aboutToBeDeleted();
        this.__doubleTestResult.aboutToBeDeleted();
        this.__floatTestResult.aboutToBeDeleted();
        this.__intTestResult.aboutToBeDeleted();
        this.__longTestResult.aboutToBeDeleted();
        this.__mapTestResult.aboutToBeDeleted();
        this.__nullTestResult.aboutToBeDeleted();
        this.__stringTestResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __arrayTestResult: ObservedPropertySimple<string>;
    get arrayTestResult() {
        return this.__arrayTestResult.get();
    }
    set arrayTestResult(newValue: string) {
        this.__arrayTestResult.set(newValue);
    }
    private __booleanTestResult: ObservedPropertySimple<string>;
    get booleanTestResult() {
        return this.__booleanTestResult.get();
    }
    set booleanTestResult(newValue: string) {
        this.__booleanTestResult.set(newValue);
    }
    private __doubleTestResult: ObservedPropertySimple<string>;
    get doubleTestResult() {
        return this.__doubleTestResult.get();
    }
    set doubleTestResult(newValue: string) {
        this.__doubleTestResult.set(newValue);
    }
    private __floatTestResult: ObservedPropertySimple<string>;
    get floatTestResult() {
        return this.__floatTestResult.get();
    }
    set floatTestResult(newValue: string) {
        this.__floatTestResult.set(newValue);
    }
    private __intTestResult: ObservedPropertySimple<string>;
    get intTestResult() {
        return this.__intTestResult.get();
    }
    set intTestResult(newValue: string) {
        this.__intTestResult.set(newValue);
    }
    private __longTestResult: ObservedPropertySimple<string>;
    get longTestResult() {
        return this.__longTestResult.get();
    }
    set longTestResult(newValue: string) {
        this.__longTestResult.set(newValue);
    }
    private __mapTestResult: ObservedPropertySimple<string>;
    get mapTestResult() {
        return this.__mapTestResult.get();
    }
    set mapTestResult(newValue: string) {
        this.__mapTestResult.set(newValue);
    }
    private __nullTestResult: ObservedPropertySimple<string>;
    get nullTestResult() {
        return this.__nullTestResult.get();
    }
    set nullTestResult(newValue: string) {
        this.__nullTestResult.set(newValue);
    }
    private __stringTestResult: ObservedPropertySimple<string>;
    get stringTestResult() {
        return this.__stringTestResult.get();
    }
    set stringTestResult(newValue: string) {
        this.__stringTestResult.set(newValue);
    }
    render() {
        Column.create();
        Column.height("100%");
        Column.width('100%');
        Column.margin({ top: 50 });
        Button.createWithLabel('Click');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            this.arrayTest();
            this.booleanTest();
            this.doubleTest();
            this.floatTest();
            this.intTest();
            this.longTest();
            this.mapTest();
            this.nullTest();
            this.stringTest();
        });
        Button.pop();
        Text.create(this.arrayTestResult);
        Text.margin(10);
        Text.fontSize(15);
        Text.fontColor("#070707");
        Text.pop();
        Text.create(this.booleanTestResult);
        Text.margin(10);
        Text.fontSize(15);
        Text.fontColor("#070707");
        Text.pop();
        Text.create(this.doubleTestResult);
        Text.margin(10);
        Text.fontSize(15);
        Text.fontColor("#070707");
        Text.pop();
        Text.create(this.floatTestResult);
        Text.margin(10);
        Text.fontSize(15);
        Text.fontColor("#070707");
        Text.pop();
        Text.create(this.intTestResult);
        Text.margin(10);
        Text.fontSize(15);
        Text.fontColor("#070707");
        Text.pop();
        Text.create(this.longTestResult);
        Text.margin(10);
        Text.fontSize(15);
        Text.fontColor("#070707");
        Text.pop();
        Text.create(this.nullTestResult);
        Text.margin(10);
        Text.fontSize(15);
        Text.fontColor("#070707");
        Text.pop();
        Text.create(this.stringTestResult);
        Text.margin(10);
        Text.fontSize(15);
        Text.fontColor("#070707");
        Text.pop();
        Text.create(this.mapTestResult);
        Text.margin(10);
        Text.fontSize(15);
        Text.fontColor("#070707");
        Text.pop();
        Column.pop();
    }
    private longTest() {
        let longType: any = avro.parse({ type: 'long' });
        let petlong = 2131344;
        let bufmap: any = longType.toBuffer(petlong); // Buffer containing 'Hi''s Avro encoding.
        let longmap: any = longType.fromBuffer(bufmap); // === 'Hi'
        let bufferStr = "";
        for (let i = 0; i < bufmap.length; i++) {
            bufferStr = bufferStr + bufmap[i];
        }
        this.longTestResult = "LongType:{原始数据:" + petlong + ",序列化后:" + bufferStr + ",还原数据:" + longmap + "};";
        console.info("----LongType--{original_data:" + petlong + ",serialization：" + bufferStr + ",restore_data：" + longmap + "}");
    }
    private stringTest() {
        let stringType: any = avro.parse({ type: 'string' });
        let petString = '你好wqer';
        let buf: any = stringType.toBuffer(petString); // Buffer containing 'Hi''s Avro encoding.
        let str: any = stringType.fromBuffer(buf); // === 'Hi'
        let bufferStr = "";
        for (let i = 0; i < buf.length; i++) {
            bufferStr = bufferStr + buf[i];
        }
        this.stringTestResult = "StringType:{原始数据:" + petString + ",序列化后:" + bufferStr + ",还原数据:" + str + "};";
        console.info("---StringType---{original_data:" + petString + ",serialization：" + bufferStr + ",restore_data：" + str + "}");
    }
    private intTest() {
        let intType: any = avro.parse({ type: 'int' });
        let petint = 123;
        let bufInt: any = intType.toBuffer(petint); // Buffer containing 'Hi''s Avro encoding.
        let intSrc: any = intType.fromBuffer(bufInt); // === 'Hi'
        let bufferStr = "";
        for (let i = 0; i < bufInt.length; i++) {
            bufferStr = bufferStr + bufInt[i];
        }
        this.intTestResult = "IntType:{原始数据:" + petint + ",序列化后:" + bufferStr + ",还原数据:" + intSrc + "};";
        console.info("----IntType--{original_data:" + petint + ",serialization：" + bufferStr + ",restore_data：" + intSrc + "}");
    }
    private mapTest() {
        let mapType: any = avro.parse({ type: 'map', values: 'long' });
        let petMap: petMapType = { key1: 12343, key2: 3445 };
        let bufMap: any = mapType.toBuffer(petMap); // Buffer containing 'Hi''s Avro encoding.
        let mapSrc: any = mapType.fromBuffer(bufMap); // === 'Hi'
        let bufferStr = "";
        for (let i = 0; i < bufMap.length; i++) {
            bufferStr = bufferStr + bufMap[i];
        }
        this.mapTestResult = "MapType:{原始数据:" + JSON.stringify(petMap) + ",序列化后:" + bufferStr + ",还原数据:" + JSON.stringify(mapSrc) + "};";
        console.info("----MapType--{original_data:" + JSON.stringify(petMap) + ",serialization：" + bufferStr + ",restore_data：" + JSON.stringify(mapSrc) + "}");
    }
    private booleanTest() {
        console.error("------init--booleanTest----");
        let booleanType: any = avro.parse({ type: 'boolean' });
        console.error("------init--booleanType----");
        let petBoolean: boolean = false;
        let bufBoolean: any = booleanType.toBuffer(petBoolean); // Buffer containing 'Hi''s Avro encoding.
        let booleanSrc: any = booleanType.fromBuffer(bufBoolean); // === 'Hi'
        let bufferStr = "";
        for (let i = 0; i < bufBoolean.length; i++) {
            bufferStr = bufferStr + bufBoolean[i];
        }
        this.booleanTestResult = "BooleanType:{原始数据:" + petBoolean + ",序列化后:" + bufferStr + ",还原数据:" + booleanSrc + "};";
        console.info(this.booleanTestResult);
    }
    private enumTest() {
        let enumType: any = avro.parse({ name: 'Pet', type: 'enum', symbols: ['CAT', 'DOG'] });
        let petEnum: petEnumType = { name: 'Albert', name1: 'Albert1' };
        let bufEnum: any = enumType.toBuffer(petEnum); // Buffer containing 'Hi''s Avro encoding.
        let enumSrc: any = enumType.fromBuffer(bufEnum); // === 'Hi'
        let bufferStr = "";
        for (let i = 0; i < bufEnum.length; i++) {
            bufferStr = bufferStr + bufEnum[i];
        }
        console.info("----EnumType--{original_data:" + JSON.stringify(petEnum) + ",serialization：" + bufferStr + ",restore_data：" + JSON.stringify(enumSrc) + "}");
    }
    private arrayTest() {
        let arrayType: any = avro.parse({ type: 'array', items: 'string' });
        let petArray = ['3443rtr', 'sfrf', 'eryryyh'];
        //   以下方式也可以通过 , 注意parse 参数 含有items 而不是values;
        //    let petArray    =new Array();
        //    petArray.push('sfrf');
        //    petArray.push('eryryyh');
        let bufArray: any = arrayType.toBuffer(petArray); // Buffer containing 'Hi''s Avro encoding.
        let arraySrc: any = arrayType.fromBuffer(bufArray); // === 'Hi'
        let bufferStr = "";
        for (let i = 0; i < bufArray.length; i++) {
            bufferStr = bufferStr + bufArray[i];
        }
        this.arrayTestResult = "ArrayType:{原始数据:[" + petArray + "],序列化后:" + bufferStr + ",还原数据:[" + arraySrc + "];";
        console.info("----ArrayType--{original_data:[" + petArray + "],serialization:" + bufferStr + ",restore_data:[" + arraySrc + "]");
    }
    private doubleTest() {
        let doubleType: any = avro.parse({ type: 'double' });
        let doublePet = 245.34;
        let doubleBuf: any = doubleType.toBuffer(doublePet); // Buffer containing 'Hi''s Avro encoding.
        let doubleSrc: any = doubleType.fromBuffer(doubleBuf); // === 'Hi'
        let bufferStr = "";
        for (let i = 0; i < doubleBuf.length; i++) {
            bufferStr = bufferStr + doubleBuf[i];
        }
        this.doubleTestResult = "DoubleType:{原始数据:" + doublePet + ",序列化后:" + bufferStr + ",还原数据:" + doubleSrc + "};";
        console.info("----DoubleType--{original_data:" + doublePet + ",serialization：" + bufferStr + ",restore_data：" + doubleSrc + "}");
    }
    private floatTest() {
        let floatType: any = avro.parse({ type: 'float' });
        let floatPet = 245.34;
        let floatBuf: any = floatType.toBuffer(floatPet); // Buffer containing 'Hi''s Avro encoding.
        let floatSrc: any = floatType.fromBuffer(floatBuf); // === 'Hi'
        let bufferStr = "";
        for (let i = 0; i < floatBuf.length; i++) {
            bufferStr = bufferStr + floatBuf[i];
        }
        this.floatTestResult = "FloatTest:{原始数据:" + floatPet + ",序列化后:" + bufferStr + ",还原数据:" + floatSrc + "};";
        console.info("----FloatTest--{original_data:" + floatPet + ",serialization：" + bufferStr + ",restore_data：" + floatSrc + "}");
    }
    private nullTest() {
        console.error("-----init-nullTest----");
        let nullType: any = avro.parse({ type: 'null' });
        console.error("-----nullType----");
        let nullPet = null;
        let nullBuf: any = nullType.toBuffer(nullPet); // Buffer containing 'Hi''s Avro encoding.
        let nullSrc: any = nullType.fromBuffer(nullBuf); // === 'Hi'
        let bufferStr = "";
        for (let i = 0; i < nullBuf.length; i++) {
            bufferStr = bufferStr + nullBuf[i];
        }
        this.nullTestResult = "NullType:{原始数据:" + nullPet + ",序列化后:" + bufferStr + ",还原数据:" + nullSrc + "};";
        console.info("----NullType--{original_data:" + nullPet + ",serialization：" + bufferStr + ",restore_data：" + nullSrc + "}");
    }
}
class petEnumType {
    name: string = '';
    name1: string = '';
}
class petMapType {
    key1: number = 0;
    key2: number = 0;
}
loadDocument(new Index("1", undefined, {}));
