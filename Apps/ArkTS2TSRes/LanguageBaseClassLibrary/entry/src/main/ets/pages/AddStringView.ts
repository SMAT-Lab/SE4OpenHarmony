interface AddKeyValueView_Params {
    value?: string;
    title?: string;
    flag?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AddStringView_" + ++__generate__Id;
}
/*
* Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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
import router from '@ohos.router';
import emitter from '@ohos.events.emitter';
import { getString } from '@ohos/common';
import { Constant } from '@ohos/capabilities';
export class AddKeyValueView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__value = new ObservedPropertySimple('', this, "value");
        this.__title = new ObservedPropertySimple('', this, "title");
        this.__flag = new ObservedPropertySimple('', this, "flag");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AddKeyValueView_Params) {
        if (params.value !== undefined) {
            this.value = params.value;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.flag !== undefined) {
            this.flag = params.flag;
        }
    }
    aboutToBeDeleted() {
        this.__value.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        this.__flag.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __value: ObservedPropertySimple<string>;
    get value() {
        return this.__value.get();
    }
    set value(newValue: string) {
        this.__value.set(newValue);
    }
    private __title: ObservedPropertySimple<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    private __flag: ObservedPropertySimple<string>;
    get flag() {
        return this.__flag.get();
    }
    set flag(newValue: string) {
        this.__flag.set(newValue);
    }
    aboutToAppear() {
        let tem: string = (router.getParams() as Record<string, Object>)['title'] as string;
        if (!tem) {
            return;
        }
        this.flag = tem;
        let regex: RegExp = new RegExp('.*(?=\\(|（)');
        let matchArr: RegExpMatchArray | null = tem.match(regex);
        if (matchArr !== null) {
            this.title = `${getString($r('app.string.add'))}${matchArr[0]}`;
        }
    }
    render() {
        Column.create();
        Column.height('100%');
        Column.backgroundColor($r('sys.color.ohos_id_color_sub_background'));
        Column.padding({ left: 12, right: 12 });
        Row.create();
        Row.width('100%');
        Row.height(56);
        Row.create();
        Row.height('100%');
        Row.aspectRatio(1);
        Row.padding({ left: 24 });
        Row.onClick(() => {
            router.back();
        });
        Image.create($r("app.media.ic_public_back"));
        Image.height(24);
        Image.aspectRatio(1);
        Image.objectFit(ImageFit.Contain);
        Row.pop();
        Text.create(this.title);
        Text.fontColor($r('app.color.text_color_primary'));
        Text.fontSize(20);
        Text.margin({ left: 24 });
        Text.pop();
        Blank.create();
        Blank.pop();
        Row.create();
        Row.id('add_confirm');
        Row.height('100%');
        Row.aspectRatio(1);
        Row.padding({ right: 24 });
        Row.onClick(() => {
            let eventId = Constant.EMITTER_ID_DEFAULT;
            switch (this.flag) {
                case getString($r('app.string.hash_set')):
                    eventId = Constant.EMITTER_ID_HASH_SET;
                    break;
                case getString($r('app.string.light_weight_set')):
                    eventId = Constant.EMITTER_ID_LIGHT_WEIGHT_SET;
                    break;
                case getString($r('app.string.tree_set')):
                    eventId = Constant.EMITTER_ID_TREE_SET;
                    break;
                default:
                    eventId = Constant.EMITTER_ID_DEFAULT;
                    break;
            }
            let event: emitter.InnerEvent = {
                eventId: eventId,
                priority: emitter.EventPriority.HIGH
            };
            let eventData: emitter.EventData = {
                data: { 'value': this.value }
            };
            emitter.emit(event, eventData);
            router.back();
        });
        Image.create($r("app.media.ic_public_confirm"));
        Image.height(24);
        Image.aspectRatio(1);
        Image.objectFit(ImageFit.Contain);
        Row.pop();
        Row.pop();
        Row.create();
        Row.height(64);
        Row.width('100%');
        Row.borderRadius(16);
        Row.backgroundColor($r('app.color.bg_white'));
        Row.margin({ top: 12 });
        Text.create('Value');
        Text.margin({ left: 19 });
        Text.fontSize(16);
        Text.fontColor($r('app.color.text_color_primary'));
        Text.pop();
        Column.create();
        Column.layoutWeight(1);
        Column.margin({ left: 52, right: 16 });
        TextInput.create({ placeholder: $r('app.string.input_value') });
        TextInput.id('add_value');
        TextInput.height(48);
        TextInput.fontSize(16);
        TextInput.backgroundColor($r('sys.color.ohos_id_color_background_transparent'));
        TextInput.onChange((value: string) => {
            this.value = value;
        });
        Column.pop();
        Row.pop();
        Column.pop();
    }
}
loadDocument(new AddKeyValueView("1", undefined, {}));
