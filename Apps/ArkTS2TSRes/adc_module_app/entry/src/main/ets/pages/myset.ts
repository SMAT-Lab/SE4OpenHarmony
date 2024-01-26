interface Myset_Params {
    localmode?: boolean;
    clickAble?: boolean;
    mode?: boolean;
    lowthreshold?: number;
    highthreshold?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "myset_" + ++__generate__Id;
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
import prompt from '@ohos.prompt';
import RouterParm from '../common/database/RouterParm';
class Myset extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__localmode = new ObservedPropertySimple(true //只有state变量才能给check赋值
        , this, "localmode");
        this.__clickAble = new ObservedPropertySimple(true, this, "clickAble");
        this.mode = true;
        this.lowthreshold = 0;
        this.highthreshold = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Myset_Params) {
        if (params.localmode !== undefined) {
            this.localmode = params.localmode;
        }
        if (params.clickAble !== undefined) {
            this.clickAble = params.clickAble;
        }
        if (params.mode !== undefined) {
            this.mode = params.mode;
        }
        if (params.lowthreshold !== undefined) {
            this.lowthreshold = params.lowthreshold;
        }
        if (params.highthreshold !== undefined) {
            this.highthreshold = params.highthreshold;
        }
    }
    aboutToBeDeleted() {
        this.__localmode.aboutToBeDeleted();
        this.__clickAble.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __localmode: ObservedPropertySimple<boolean>; //只有state变量才能给check赋值
    get localmode() {
        return this.__localmode.get();
    }
    set localmode(newValue: boolean) {
        this.__localmode.set(newValue);
    }
    private __clickAble: ObservedPropertySimple<boolean>;
    get clickAble() {
        return this.__clickAble.get();
    }
    set clickAble(newValue: boolean) {
        this.__clickAble.set(newValue);
    }
    private mode: boolean;
    private lowthreshold: number;
    private highthreshold: number;
    onPageShow() {
        let routerParm = router.getParams() as RouterParm;
        this.mode = routerParm.mode;
        this.localmode = this.mode;
        console.log("在设置界面的onpageshow,拿到了mode为：" + this.mode);
    }
    save() {
        let routerParm: RouterParm = new RouterParm(this.mode, this.lowthreshold, this.highthreshold);
        router.replaceUrl({
            url: 'pages/myMenu',
            params: routerParm,
        });
    }
    back() {
        router.replaceUrl({
            url: 'pages/myMenu'
        });
    }
    render() {
        Column.create();
        Column.height('100%');
        Column.width('100%');
        Column.backgroundImage($r('app.media.bg1'));
        Column.backgroundImageSize(ImageSize.Cover);
        Row.create();
        Row.width('100%');
        Row.height(54);
        Row.margin({
            top: 5
        });
        Row.create();
        Row.padding({ left: 2, right: 17, top: 10, bottom: 10 });
        Row.onClick(() => {
            this.back();
        });
        Image.create($r('app.media.icon_back'));
        Image.width(24);
        Image.height(24);
        Image.id("back");
        Row.pop();
        Blank.create();
        Blank.pop();
        Button.createWithLabel($r('app.string.save'));
        Button.fontSize(22);
        Button.id("Saving");
        Button.backgroundColor(this.clickAble ? '#4F7EFD' : "#C0CFF7");
        Button.height(44);
        Button.borderRadius(7);
        Button.padding({
            left: 14,
            right: 14,
        });
        Button.margin({ bottom: 4 });
        Button.enabled(this.clickAble);
        Button.onClick(() => {
            this.save();
        });
        Button.type(ButtonType.Normal);
        Button.pop();
        Row.pop();
        Row.create();
        Row.width('90%');
        Column.create();
        Column.margin({ top: 80 });
        Text.create("温度单位:");
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Start);
        Text.id("TempUnit");
        Text.pop();
        Row.create();
        Column.create();
        Radio.create({ value: 'centigrade', group: 'tempchoice' });
        Radio.checked(this.localmode);
        Radio.id('°C');
        Radio.width(50);
        Radio.onChange((isChecked: boolean) => {
            if (isChecked) {
                // 切换为摄氏度模式
                prompt.showToast({ message: 'centigrade mode.' });
                this.mode = true;
            }
        });
        Text.create('°C');
        Text.pop();
        Column.pop();
        Column.create();
        Radio.create({ value: 'Fahrenheit', group: 'tempchoice' });
        Radio.checked(!this.localmode);
        Radio.id('°F');
        Radio.width(50);
        Radio.onChange((isChecked: boolean) => {
            if (isChecked) {
                // 切换为华氏度模式
                prompt.showToast({ message: 'Fahrenheit mode.' });
                this.mode = false;
            }
        });
        Text.create('°F');
        Text.pop();
        Column.pop();
        Row.pop();
        Column.pop();
        Blank.create();
        Blank.pop();
        Column.create();
        Row.create();
        Row.margin({ top: 30 });
        Text.create("低温阈值:");
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.id("MinTemp");
        Text.pop();
        TextInput.create();
        TextInput.type(InputType.Number);
        TextInput.id("InputMin");
        TextInput.width(100);
        TextInput.backgroundColor(Color.Gray);
        Row.pop();
        Row.create();
        Row.margin({ top: 40 });
        Text.create("高温阈值:");
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.id("MaxTemp");
        Text.pop();
        TextInput.create();
        TextInput.type(InputType.Number);
        TextInput.id("InputMax");
        TextInput.width(100);
        TextInput.backgroundColor(Color.Grey);
        Row.pop();
        Column.pop();
        Row.pop();
        Column.pop();
    }
}
loadDocument(new Myset("1", undefined, {}));
