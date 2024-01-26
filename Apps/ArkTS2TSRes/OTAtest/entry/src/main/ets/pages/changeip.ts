interface LocalUpdater_Params {
    onBack?: () => boolean;
    ip?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "changeip_" + ++__generate__Id;
}
/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import router from '@ohos.router';
import ServiceModel from '../components/ServiceModel';
import systemparameter from '@ohos.systemparameter';
import promptAction from '@ohos.promptAction';
class LocalUpdater extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.onBack = undefined;
        this.__ip = new ObservedPropertySimple('', this, "ip");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: LocalUpdater_Params) {
        if (params.onBack !== undefined) {
            this.onBack = params.onBack;
        }
        if (params.ip !== undefined) {
            this.ip = params.ip;
        }
    }
    aboutToBeDeleted() {
        this.__ip.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private onBack?: () => boolean;
    private __ip: ObservedPropertySimple<string>;
    get ip() {
        return this.__ip.get();
    }
    set ip(newValue: string) {
        this.__ip.set(newValue);
    }
    render() {
        Column.create();
        Row.create();
        Row.width('90%');
        Row.height(56);
        Image.create($r('app.media.back'));
        Image.width(30);
        Image.height(30);
        Image.objectFit(ImageFit.Contain);
        Image.margin({ left: 16 });
        Image.onClick(() => {
            let isCanNotBack = this.onBack?.();
            if (isCanNotBack) {
                return;
            }
            router.back();
        });
        Text.create('服务器ip修改');
        Text.fontSize(25);
        Text.fontColor(Color.Black);
        Text.margin({ left: 16 });
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Row.pop();
        Column.create();
        Image.create($r('app.media.logo'));
        Image.height('30%');
        Image.width('70%');
        Image.objectFit(ImageFit.Contain);
        TextInput.create({ placeholder: '输入需要修改ip' });
        TextInput.placeholderColor(Color.Grey);
        TextInput.placeholderFont({ size: 14, weight: 400 });
        TextInput.caretColor(Color.Blue);
        TextInput.width(400);
        TextInput.height(60);
        TextInput.margin(20);
        TextInput.fontSize(50);
        TextInput.fontColor(Color.Black);
        TextInput.onChange((value: string) => {
            this.ip = value;
        });
        Column.create();
        Button.createWithLabel("修改ip");
        Button.fontSize(50);
        Button.onClick(() => {
            try {
                var p = systemparameter.set("update.serverip.search", this.ip);
                try {
                    systemparameter.set("persist.otaservice.ip", this.ip, function (err, data) {
                        if (err == undefined) {
                            console.log("set test.parameter.key value success :" + data);
                        }
                        else {
                            console.log("set test.parameter.key value err:" + err.code);
                        }
                    });
                }
                catch (e) {
                    console.log("set unexpected error: " + e);
                }
                p.then(function (value) {
                    promptAction.showToast({
                        message: '修改ip成功',
                        duration: 2000,
                    });
                }).catch(function (err) {
                    promptAction.showToast({
                        message: '修改失败',
                        duration: 2000,
                    });
                });
            }
            catch (e) {
            }
        });
        Button.pop();
        Column.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new LocalUpdater("1", undefined, {}));
