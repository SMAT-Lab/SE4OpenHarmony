interface FixSample_Params {
    bgColor?: Color | string;
    range?: Array<number>;
    stickyStart?: boolean;
    linearLayoutAttribute?: LinearAttributes;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "FixSample_" + ++__generate__Id;
}
/*
Copyright (c) 2021 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import { FIX_LAYOUT, SCROLL_FIX_LAYOUT, STICKY_LAYOUT, FLOAT_LAYOUT, LINEAR_LAYOUT, LinearAttributes, layoutDataType } from '@ohos/vlayout';
enum AlignType {
    TOP_LEFT = 0,
    TOP_RIGHT = 1,
    BOTTOM_LEFT = 2,
    BOTTOM_RIGHT = 3
}
class FixSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__bgColor = new ObservedPropertySimple(Color.Pink, this, "bgColor");
        this.__range = new ObservedPropertyObject([0, 11], this, "range");
        this.__stickyStart = new ObservedPropertySimple(true //控制STICKY_LAYOUT是否吸顶
        , this, "stickyStart");
        this.__linearLayoutAttribute = new ObservedPropertyObject({}, this, "linearLayoutAttribute");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: FixSample_Params) {
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
        if (params.range !== undefined) {
            this.range = params.range;
        }
        if (params.stickyStart !== undefined) {
            this.stickyStart = params.stickyStart;
        }
        if (params.linearLayoutAttribute !== undefined) {
            this.linearLayoutAttribute = params.linearLayoutAttribute;
        }
    }
    aboutToBeDeleted() {
        this.__bgColor.aboutToBeDeleted();
        this.__range.aboutToBeDeleted();
        this.__stickyStart.aboutToBeDeleted();
        this.__linearLayoutAttribute.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    fixLayoutContent(item: layoutDataType, position: number | undefined, parent = null) {
        Text.create(`${item}`);
        Text.width('100%');
        Text.height('100%');
        Text.backgroundColor(0x22EEEEEE);
        Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.fontSize(25);
        Text.fontColor('#999999');
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.onClick(() => {
            console.info('position = ' + position);
        });
        Text.pop();
    }
    scrollFixLayoutContent(item: layoutDataType, position: number | undefined, parent = null) {
        Text.create(`${item}`);
        Text.width('100%');
        Text.height('100%');
        Text.backgroundColor(0x22EEEEEE);
        Text.border({ width: 0, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.fontSize(18);
        Text.fontColor(0x000000);
        Text.fontWeight(FontWeight.Normal);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.onClick(() => {
            console.info('position = ' + position);
        });
        Text.pop();
    }
    stickyLayoutContent(item: layoutDataType, position: number | undefined, parent = null) {
        Text.create(`${item}`);
        Text.width('100%');
        Text.height('100%');
        Text.backgroundColor(0x22EEEEEE);
        Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.fontSize(25);
        Text.fontColor('#999999');
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.onClick(() => {
            console.info('position = ' + position);
        });
        Text.pop();
    }
    floatLayoutContent(item: layoutDataType, position: number | undefined, parent = null) {
        Text.create(`${item}`);
        Text.width('100%');
        Text.height('100%');
        Text.textAlign(TextAlign.Center);
        Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.pop();
    }
    linearLayoutContent(item: layoutDataType, position: number | undefined, listItemHeight: number | undefined, parent = null) {
        Text.create(`${item}`);
        Text.width('100%');
        Text.height('100%');
        Text.backgroundColor('#33EEEEEE');
        Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Text.fontColor('#999999');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.onClick(() => {
            console.info('position = ' + position + ', item = ' + JSON.stringify(item));
        });
        Text.pop();
    }
    private __bgColor: ObservedPropertySimple<Color | string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: Color | string) {
        this.__bgColor.set(newValue);
    }
    private __range: ObservedPropertyObject<Array<number>>;
    get range() {
        return this.__range.get();
    }
    set range(newValue: Array<number>) {
        this.__range.set(newValue);
    }
    private __stickyStart: ObservedPropertySimple<boolean>; //控制STICKY_LAYOUT是否吸顶
    get stickyStart() {
        return this.__stickyStart.get();
    }
    set stickyStart(newValue: boolean) {
        this.__stickyStart.set(newValue);
    }
    private __linearLayoutAttribute: ObservedPropertyObject<LinearAttributes>;
    get linearLayoutAttribute() {
        return this.__linearLayoutAttribute.get();
    }
    set linearLayoutAttribute(newValue: LinearAttributes) {
        this.__linearLayoutAttribute.set(newValue);
    }
    aboutToAppear() {
        this.linearLayoutAttribute.range = this.range;
        this.linearLayoutAttribute.dividerHeight = 10;
        this.linearLayoutAttribute.aspectRatio = 1;
        this.linearLayoutAttribute.bgColor = this.bgColor;
        this.linearLayoutAttribute.padding = [5, 5, 5, 5];
        this.linearLayoutAttribute.margin = [5, 5, 5, 5];
    }
    render() {
        Stack.create();
        List.create();
        ListItem.create();
        Button.createWithChild();
        Button.width('100%');
        Button.height(50);
        Button.backgroundColor(this.bgColor);
        Button.onClick(() => {
            this.linearLayoutAttribute.bgColor = 0x22EEEEEE;
            this.linearLayoutAttribute.range = [0, 5];
        });
        Text.create('transparency change');
        Text.pop();
        Button.pop();
        ListItem.pop();
        ListItem.create();
        ListItem.sticky(this.stickyStart ? Sticky.Normal : Sticky.None);
        ListItem.pop();
        ListItem.create();
        ListItem.pop();
        List.pop();
        Stack.pop();
    }
}
loadDocument(new FixSample("1", undefined, {}));
