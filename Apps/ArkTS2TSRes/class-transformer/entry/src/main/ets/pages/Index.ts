interface Index_Params {
    message?: string;
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
import { plainToClassDemo } from "../methods/plainToClass";
import { plainToClassFromExistDemo } from "../methods/plainToClassFromExist";
import { classToPlainDemo } from "../methods/classToPlain";
import { classToPlainFromExistDemo } from "../methods/classToPlainFromExist";
import { instanceToPlainDemo } from "../methods/instanceToPlain";
import { plainToInstanceDemo } from "../methods/plainToInstance";
import { instanceToInstanceDemo } from "../methods/instanceToInstance";
import { classToClassFromExistDemo } from "../methods/classToClassFromExist";
import { serializeDemo } from "../methods/serialize";
import { deserializeDemo } from "../methods/deserialize";
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    BuildButton(text: string, callback: () => void, remake?: string, parent = null) {
        Button.createWithLabel(text);
        Button.onClick(callback);
        Button.width("90%");
        Button.pop();
        Text.create(remake);
        Text.margin({ top: 4, bottom: 10 });
        Text.width("90%");
        Text.pop();
    }
    render() {
        Scroll.create();
        Scroll.width("100%");
        Scroll.height("100%");
        Column.create();
        Column.width('100%');
        Column.padding({ top: 10 });
        this.BuildButton("plainToClassDemo", plainToClassDemo, "此方法将普通javascript对象转换为特定类的实例", this);
        this.BuildButton("plainToInstanceDemo", plainToInstanceDemo, "此方法将普通javascript对象转换为特定类的实例", this);
        this.BuildButton("classToPlainDemo", classToPlainDemo, "这个方法将类对象转换回普通javascript对象", this);
        this.BuildButton("instanceToPlainDemo", instanceToPlainDemo, "这个方法将类对象转换回普通javascript对象", this);
        this.BuildButton("classToPlainFromExistDemo", classToPlainFromExistDemo, "将类实例与普通javascript对象合并", this);
        this.BuildButton("plainToClassFromExistDemo", plainToClassFromExistDemo, "此方法使用已填充的对象（目标类中的实例）将普通对象转换为实例", this);
        this.BuildButton("instanceToInstanceDemo", instanceToInstanceDemo, "将类（构造函数）对象转换为新的类（构造器）对象。也适用于数组。", this);
        this.BuildButton("classToClassFromExistDemo", classToClassFromExistDemo, "将类（构造函数）对象转换为纯（文字）对象。", this);
        this.BuildButton("serializeDemo", serializeDemo, "将给定对象序列化为JSON字符串。。", this);
        this.BuildButton("deserializeDemo", deserializeDemo, "将对象字符串转换为一个类的实例", this);
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
