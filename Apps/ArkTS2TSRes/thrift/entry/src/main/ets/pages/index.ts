interface Index_Params {
    message?: string;
    ipAddress?: string;
    arrIndex?: number[];
    arrStr?: string[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import UrlConfig from '../UrlConfig';
import router from '@ohos.router';
import { GlobalContext } from '../GlobalContext';
import prompt from '@system.prompt';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__ipAddress = new ObservedPropertySimple('', this, "ipAddress");
        this.arrIndex = UrlConfig.pageIndexArr;
        this.arrStr = UrlConfig.pageNameArr;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.ipAddress !== undefined) {
            this.ipAddress = params.ipAddress;
        }
        if (params.arrIndex !== undefined) {
            this.arrIndex = params.arrIndex;
        }
        if (params.arrStr !== undefined) {
            this.arrStr = params.arrStr;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__ipAddress.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __ipAddress: ObservedPropertySimple<string>;
    get ipAddress() {
        return this.__ipAddress.get();
    }
    set ipAddress(newValue: string) {
        this.__ipAddress.set(newValue);
    }
    private arrIndex: number[];
    private arrStr: string[];
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        TextInput.create({ placeholder: 'Please input server ip address' });
        TextInput.height(50);
        TextInput.placeholderFont({ size: 20, weight: 2 });
        TextInput.fontSize(20);
        TextInput.onChange((value: string) => {
            this.ipAddress = value;
            GlobalContext.getContext().setValue("ipAddress", this.ipAddress);
            ;
        });
        List.create({ space: 20, initialIndex: 0 });
        List.listDirection(Axis.Vertical);
        List.divider({ strokeWidth: 2, color: 0xFFFFFF, startMargin: 20, endMargin: 20 });
        List.edgeEffect(EdgeEffect.None);
        List.chainAnimation(false);
        List.width('90%');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arrIndex), (item: any) => {
            ListItem.create();
            ListItem.onClick((event) => {
                if (this.ipAddress == '') {
                    prompt.showToast({ message: "Please input server ip address", duration: 3000 });
                    return;
                }
                else {
                    routePage(item as number);
                }
            });
            Text.create(this.arrStr[item]);
            Text.width('100%');
            Text.height(100);
            Text.fontSize(16);
            Text.textAlign(TextAlign.Center);
            Text.borderRadius(10);
            Text.backgroundColor(0xFFFFFF);
            Text.pop();
            ListItem.pop();
        }, (item: any) => item);
        ForEach.pop();
        List.pop();
        Column.pop();
        Row.pop();
    }
    onPageShow() {
    }
    onPageHide() {
    }
}
async function routePage(index: number) {
    try {
        let jumpUrl = UrlConfig.getJumpUrl(index);
        let options: router.RouterOptions = {
            url: jumpUrl
        };
        await router.push(options);
    }
    catch (err) {
    }
}
loadDocument(new Index("1", undefined, {}));
