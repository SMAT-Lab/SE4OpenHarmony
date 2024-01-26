interface AddInformationView_Params {
    information?: Information;
    dialogController?: CustomDialogController;
    flag?: string;
}
interface AgePickDialog_Params {
    controller?: CustomDialogController;
    sure?: (age: number) => void;
    select?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AddInformationView_" + ++__generate__Id;
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
import { Constant, Information } from '@ohos/capabilities';
import { getString } from '@ohos/common';
const MIN_AGE = 1;
const AGE_RANGE = 9;
const AGE_DEFAULT = 0;
const arr = Array(AGE_RANGE)
    .fill(0)
    .map<string>((_: number, i: number) => `${i + MIN_AGE}${getString($r('app.string.old'))}`);
class AgePickDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = undefined;
        this.sure = () => { };
        this.__select = new ObservedPropertySimple(AGE_DEFAULT, this, "select");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AgePickDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.sure !== undefined) {
            this.sure = params.sure;
        }
        if (params.select !== undefined) {
            this.select = params.select;
        }
    }
    aboutToBeDeleted() {
        this.__select.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private sure: (age: number) => void;
    private __select: ObservedPropertySimple<number>;
    get select() {
        return this.__select.get();
    }
    set select(newValue: number) {
        this.__select.set(newValue);
    }
    render() {
        Column.create();
        Column.height(328);
        Column.margin({ left: 12, right: 12, bottom: 16 });
        Column.borderRadius(24);
        Column.backgroundColor($r('app.color.bg_white'));
        Text.create($r('app.string.age'));
        Text.margin({ left: 24, top: 14 });
        Text.width('100%');
        Text.fontColor($r('app.color.text_color_primary'));
        Text.fontSize(20);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Column.create();
        Column.width('100%');
        Column.height(238);
        TextPicker.create({ range: arr, selected: this.select });
        TextPicker.onChange((value: string | string[], index: number | number[]) => {
            if (typeof index === 'number') {
                this.select = index;
            }
        });
        TextPicker.pop();
        Column.pop();
        Row.create();
        Row.height(40);
        Text.create($r('app.string.cancel'));
        Text.height('100%');
        Text.width('50%');
        Text.textAlign(TextAlign.Center);
        Text.fontSize(16);
        Text.fontColor($r('app.color.text_color_accent'));
        Text.onClick(() => {
            this.controller?.close();
        });
        Text.pop();
        Divider.create();
        Divider.vertical(true);
        Divider.height('100%');
        Text.create($r('app.string.sure'));
        Text.id('add_sure');
        Text.height('100%');
        Text.width('50%');
        Text.textAlign(TextAlign.Center);
        Text.fontSize(16);
        Text.fontColor($r('app.color.text_color_accent'));
        Text.onClick(() => {
            this.sure(this.select + MIN_AGE);
            this.controller?.close();
        });
        Text.pop();
        Row.pop();
        Column.pop();
    }
}
export class AddInformationView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__information = new ObservedPropertyObject(new Information('', 0, '', true), this, "information");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new AgePickDialog("2", this, { sure: (age: number) => {
                        this.information.age = age;
                    } });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            customStyle: true,
            alignment: DialogAlignment.Bottom
        }, this);
        this.__flag = new ObservedPropertySimple('', this, "flag");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AddInformationView_Params) {
        if (params.information !== undefined) {
            this.information = params.information;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
        if (params.flag !== undefined) {
            this.flag = params.flag;
        }
    }
    aboutToBeDeleted() {
        this.__information.aboutToBeDeleted();
        this.__flag.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __information: ObservedPropertyObject<Information>;
    get information() {
        return this.__information.get();
    }
    set information(newValue: Information) {
        this.__information.set(newValue);
    }
    private dialogController: CustomDialogController;
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
        Text.create($r('app.string.add_new_contact'));
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
                case getString($r('app.string.deque')):
                    eventId = Constant.EMITTER_ID_DEQUE;
                    break;
                case getString($r('app.string.linked_list')):
                    eventId = Constant.EMITTER_ID_LINKED_LIST;
                    break;
                case getString($r('app.string.list')):
                    eventId = Constant.EMITTER_ID_LIST;
                    break;
                case getString($r('app.string.array_list')):
                    eventId = Constant.EMITTER_ID_ARRAY_LIST;
                    break;
                case getString($r('app.string.queue')):
                    eventId = Constant.EMITTER_ID_QUEUE;
                    break;
                case getString($r('app.string.stack')):
                    eventId = Constant.EMITTER_ID_STACK;
                    break;
                case getString($r('app.string.vector')):
                    eventId = Constant.EMITTER_ID_VECTOR;
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
                data: this.information
            };
            emitter.emit(event, eventData);
            router.back();
        });
        Image.create($r('app.media.ic_public_confirm'));
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
        Image.create($r('app.media.ic_public_user'));
        Image.margin({ left: 19 });
        Image.width(19);
        Image.aspectRatio(1);
        Text.create($r('app.string.names'));
        Text.margin({ left: 19 });
        Text.fontSize(16);
        Text.fontColor($r('app.color.text_color_primary'));
        Text.pop();
        Column.create();
        Column.layoutWeight(1);
        Column.margin({ left: 52, right: 16 });
        TextInput.create({ placeholder: $r('app.string.input_name') });
        TextInput.id('add_name');
        TextInput.height(48);
        TextInput.fontSize(16);
        TextInput.backgroundColor($r('sys.color.ohos_id_color_background_transparent'));
        TextInput.onChange((value: string) => {
            this.information.name = value;
        });
        Column.pop();
        Row.pop();
        Row.create();
        Row.height(64);
        Row.width('100%');
        Row.borderRadius(16);
        Row.backgroundColor($r('app.color.bg_white'));
        Row.margin({ top: 12 });
        Image.create($r('app.media.ic_age'));
        Image.margin({ left: 19 });
        Image.width(19);
        Image.aspectRatio(1);
        Text.create($r('app.string.age'));
        Text.margin({ left: 19 });
        Text.fontSize(16);
        Text.fontColor($r('app.color.text_color_primary'));
        Text.pop();
        Column.create();
        Column.id('add_age');
        Column.justifyContent(FlexAlign.Center);
        Column.width(54);
        Column.height('100%');
        Column.onClick(() => {
            this.dialogController.open();
        });
        Image.create($r('app.media.ic_public_spinner_down'));
        Image.height(24);
        Image.width(12);
        Column.pop();
        Column.create();
        Column.layoutWeight(1);
        Column.margin({ right: 16 });
        TextInput.create({
            text: this.information.age === 0 ? '' : `${this.information.age}`,
            placeholder: $r('app.string.please_choose')
        });
        TextInput.height(48);
        TextInput.fontSize(16);
        TextInput.focusable(false);
        TextInput.backgroundColor($r('sys.color.ohos_id_color_background_transparent'));
        TextInput.onClick(() => {
            this.dialogController.open();
        });
        Column.pop();
        Row.pop();
        Row.create();
        Row.height(64);
        Row.width('100%');
        Row.borderRadius(16);
        Row.backgroundColor($r('app.color.bg_white'));
        Row.margin({ top: 12 });
        Image.create($r('app.media.ic_public_phone'));
        Image.margin({ left: 19 });
        Image.width(19);
        Image.aspectRatio(1);
        Text.create($r('app.string.contact_phone'));
        Text.margin({ left: 19 });
        Text.fontSize(16);
        Text.fontColor($r('app.color.text_color_primary'));
        Text.pop();
        Column.create();
        Column.layoutWeight(1);
        Column.margin({ left: 52, right: 16 });
        TextInput.create({ placeholder: $r('app.string.input_phone') });
        TextInput.id('add_phone');
        TextInput.height(48);
        TextInput.fontSize(16);
        TextInput.backgroundColor($r('sys.color.ohos_id_color_background_transparent'));
        TextInput.onChange((value: string) => {
            this.information.phone = value;
        });
        Column.pop();
        Row.pop();
        Column.pop();
    }
}
loadDocument(new AddInformationView("1", undefined, {}));
