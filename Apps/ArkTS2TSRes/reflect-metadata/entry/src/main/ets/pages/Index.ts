interface Index_Params {
    result1?: string;
    result2?: string;
    result3?: string;
    result4?: string;
    result5?: string;
    result6?: string;
    result7?: string;
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
const METADATA_KEY = 'demo-metadata';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__result1 = new ObservedPropertySimple('', this, "result1");
        this.__result2 = new ObservedPropertySimple('', this, "result2");
        this.__result3 = new ObservedPropertySimple('', this, "result3");
        this.__result4 = new ObservedPropertySimple('', this, "result4");
        this.__result5 = new ObservedPropertySimple('', this, "result5");
        this.__result6 = new ObservedPropertySimple('', this, "result6");
        this.__result7 = new ObservedPropertySimple('', this, "result7");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.result1 !== undefined) {
            this.result1 = params.result1;
        }
        if (params.result2 !== undefined) {
            this.result2 = params.result2;
        }
        if (params.result3 !== undefined) {
            this.result3 = params.result3;
        }
        if (params.result4 !== undefined) {
            this.result4 = params.result4;
        }
        if (params.result5 !== undefined) {
            this.result5 = params.result5;
        }
        if (params.result6 !== undefined) {
            this.result6 = params.result6;
        }
        if (params.result7 !== undefined) {
            this.result7 = params.result7;
        }
    }
    aboutToBeDeleted() {
        this.__result1.aboutToBeDeleted();
        this.__result2.aboutToBeDeleted();
        this.__result3.aboutToBeDeleted();
        this.__result4.aboutToBeDeleted();
        this.__result5.aboutToBeDeleted();
        this.__result6.aboutToBeDeleted();
        this.__result7.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __result1: ObservedPropertySimple<string>;
    get result1() {
        return this.__result1.get();
    }
    set result1(newValue: string) {
        this.__result1.set(newValue);
    }
    private __result2: ObservedPropertySimple<string>;
    get result2() {
        return this.__result2.get();
    }
    set result2(newValue: string) {
        this.__result2.set(newValue);
    }
    private __result3: ObservedPropertySimple<string>;
    get result3() {
        return this.__result3.get();
    }
    set result3(newValue: string) {
        this.__result3.set(newValue);
    }
    private __result4: ObservedPropertySimple<string>;
    get result4() {
        return this.__result4.get();
    }
    set result4(newValue: string) {
        this.__result4.set(newValue);
    }
    private __result5: ObservedPropertySimple<string>;
    get result5() {
        return this.__result5.get();
    }
    set result5(newValue: string) {
        this.__result5.set(newValue);
    }
    private __result6: ObservedPropertySimple<string>;
    get result6() {
        return this.__result6.get();
    }
    set result6(newValue: string) {
        this.__result6.set(newValue);
    }
    private __result7: ObservedPropertySimple<string>;
    get result7() {
        return this.__result7.get();
    }
    set result7(newValue: string) {
        this.__result7.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Button.createWithLabel('Click', { type: ButtonType.Capsule, stateEffect: true });
        Button.backgroundColor(0x317aff);
        Button.width('50%');
        Button.height(60);
        Button.margin({ bottom: 30, top: 50 });
        Button.onClick(() => {
            import("reflect-metadata").then((reflectMetadata) => {
                @Reflect.metadata(METADATA_KEY, 'John Doe')
                class Person {
                    name: string = 'John Doe';
                }
                this.result1 = Reflect.hasMetadata(METADATA_KEY, Person).toString();
                this.result2 = Reflect.hasOwnMetadata(METADATA_KEY, Person).toString();
                this.result3 = Reflect.getMetadata(METADATA_KEY, Person);
                this.result4 = Reflect.getOwnMetadata(METADATA_KEY, Person);
                this.result5 = Reflect.getMetadataKeys(Person).toString();
                this.result6 = Reflect.getOwnMetadataKeys(Person).toString();
                this.result7 = Reflect.deleteMetadata(METADATA_KEY, Person).toString();
            });
        });
        Button.pop();
        Column.create();
        Column.width('100%');
        Column.alignItems(HorizontalAlign.Start);
        Text.create('带有元数据的类: demo-metadata {name: John Doe; age: 30}');
        Text.fontSize(20);
        Text.margin({ bottom: 20 });
        Text.pop();
        Text.create('检查原型链上是否存在元数据键: ' + this.result1);
        Text.fontSize(20);
        Text.margin({ bottom: 20 });
        Text.pop();
        Text.create('检查是否存在自己的元数据键: ' + this.result2);
        Text.fontSize(20);
        Text.margin({ bottom: 20 });
        Text.pop();
        Text.create('获取原型链上元数据键的元数据值: ' + this.result3);
        Text.fontSize(20);
        Text.margin({ bottom: 20 });
        Text.pop();
        Text.create('获取自己的元数据键的元数据值: ' + this.result4);
        Text.fontSize(20);
        Text.margin({ bottom: 20 });
        Text.pop();
        Text.create('获取原型链上的所有元数据键: ' + this.result5);
        Text.fontSize(20);
        Text.margin({ bottom: 20 });
        Text.pop();
        Text.create('获取所有自己的元数据键: ' + this.result6);
        Text.fontSize(20);
        Text.margin({ bottom: 20 });
        Text.pop();
        Text.create('删除元数据: ' + this.result7);
        Text.fontSize(20);
        Text.margin({ bottom: 20 });
        Text.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
