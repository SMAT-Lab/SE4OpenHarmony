interface ColorDemo_Params {
    color?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ColorDemo_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import randomColor from 'randomcolor';
interface formatType {
    format: string;
}
let formatFn = (data: string): formatType => {
    const formatData: formatType = {
        format: data
    };
    return formatData;
};
class ColorDemo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__color = new ObservedPropertySimple(0xff0000, this, "color");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ColorDemo_Params) {
        if (params.color !== undefined) {
            this.color = params.color;
        }
    }
    aboutToBeDeleted() {
        this.__color.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __color: ObservedPropertySimple<number>;
    get color() {
        return this.__color.get();
    }
    set color(newValue: number) {
        this.__color.set(newValue);
    }
    render() {
        Column.create();
        Column.padding({ top: 18, bottom: 18 });
        Row.create();
        Button.createWithLabel('随机颜色测试');
        Button.margin({ left: 18 });
        Button.onClick(() => {
            this.color = randomColor(formatFn('hex'));
            console.log('颜色' + this.color); // '22';
        });
        Button.pop();
        Text.create();
        Text.size({ width: 20, height: 20 });
        Text.margin({ left: 18 });
        Text.backgroundColor(this.color);
        Text.pop();
        Row.pop();
        Column.pop();
    }
}
loadDocument(new ColorDemo("1", undefined, {}));
