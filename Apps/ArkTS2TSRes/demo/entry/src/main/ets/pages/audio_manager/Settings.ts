interface Settings_Params {
    audioManager?;
    returnMsg?: string;
    selectAudioSceneList?;
    selectedAudioSceneKey?: string;
    keyController?: TextInputController;
    valueController?: TextInputController;
    keyStr?: string;
    valueStr?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Settings_" + ++__generate__Id;
}
/*
* Copyright (C) 2023 Huawei Device Co., Ltd.
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
import audio from '@ohos.multimedia.audio';
class Settings extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.audioManager = null;
        this.__returnMsg = new ObservedPropertySimple('Hello World', this, "returnMsg");
        this.selectAudioSceneList = [];
        this.__selectedAudioSceneKey = new ObservedPropertySimple("请选择音频场景", this, "selectedAudioSceneKey");
        this.keyController = new TextInputController();
        this.valueController = new TextInputController();
        this.__keyStr = new ObservedPropertySimple("", this, "keyStr");
        this.__valueStr = new ObservedPropertySimple("", this, "valueStr");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Settings_Params) {
        if (params.audioManager !== undefined) {
            this.audioManager = params.audioManager;
        }
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.selectAudioSceneList !== undefined) {
            this.selectAudioSceneList = params.selectAudioSceneList;
        }
        if (params.selectedAudioSceneKey !== undefined) {
            this.selectedAudioSceneKey = params.selectedAudioSceneKey;
        }
        if (params.keyController !== undefined) {
            this.keyController = params.keyController;
        }
        if (params.valueController !== undefined) {
            this.valueController = params.valueController;
        }
        if (params.keyStr !== undefined) {
            this.keyStr = params.keyStr;
        }
        if (params.valueStr !== undefined) {
            this.valueStr = params.valueStr;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__selectedAudioSceneKey.aboutToBeDeleted();
        this.__keyStr.aboutToBeDeleted();
        this.__valueStr.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private audioManager;
    private __returnMsg: ObservedPropertySimple<string>;
    get returnMsg() {
        return this.__returnMsg.get();
    }
    set returnMsg(newValue: string) {
        this.__returnMsg.set(newValue);
    }
    private selectAudioSceneList;
    private __selectedAudioSceneKey: ObservedPropertySimple<string>;
    get selectedAudioSceneKey() {
        return this.__selectedAudioSceneKey.get();
    }
    set selectedAudioSceneKey(newValue: string) {
        this.__selectedAudioSceneKey.set(newValue);
    }
    private keyController: TextInputController;
    private valueController: TextInputController;
    private __keyStr: ObservedPropertySimple<string>;
    get keyStr() {
        return this.__keyStr.get();
    }
    set keyStr(newValue: string) {
        this.__keyStr.set(newValue);
    }
    private __valueStr: ObservedPropertySimple<string>;
    get valueStr() {
        return this.__valueStr.get();
    }
    set valueStr(newValue: string) {
        this.__valueStr.set(newValue);
    }
    aboutToAppear() {
        this.audioManager = audio.getAudioManager();
        for (let key in audio.AudioScene) {
            this.selectAudioSceneList.push({ value: key });
        }
    }
    setAudioSceneCallback() {
        if (this.selectedAudioSceneKey == "请选择音频场景") {
            this.returnMsg = "请选择音频场景";
            return;
        }
        let _this = this;
        this.audioManager.setAudioScene(audio.AudioScene[this.selectedAudioSceneKey], (err) => {
            if (err) {
                _this.returnMsg = `setAudioScene callback Error:${JSON.stringify(err)}`;
                return;
            }
            _this.returnMsg = `setAudioScene callback Success`;
        });
    }
    setAudioScenePromise() {
        if (this.selectedAudioSceneKey == "请选择音频场景") {
            this.returnMsg = "请选择音频场景";
            return;
        }
        let _this = this;
        this.audioManager.setAudioScene(audio.AudioScene[this.selectedAudioSceneKey])
            .then(() => {
            _this.returnMsg = `setAudioScene promise Success`;
        }).catch(err => {
            _this.returnMsg = `setAudioScene promise Error:${JSON.stringify(err)}`;
        });
    }
    getAudioSceneCallback() {
        let _this = this;
        this.audioManager.getAudioScene((err, value) => {
            if (err) {
                _this.returnMsg = `getAudioScene callback Error:${JSON.stringify(err)}`;
                return;
            }
            _this.returnMsg = `getAudioScene callback Success,返回值：${value}`;
        });
    }
    getAudioScenePromise() {
        let _this = this;
        this.audioManager.getAudioScene()
            .then(value => {
            _this.returnMsg = `getAudioScene promise Success,返回值：${value}`;
        }).catch(err => {
            _this.returnMsg = `getAudioScene promise Error:${JSON.stringify(err)}`;
        });
    }
    setAudioParameterCallback() {
        let _this = this;
        if (this.keyStr == "") {
            _this.returnMsg = `key 值尚未输入`;
            return;
        }
        if (this.valueStr == "") {
            _this.returnMsg = `value 值尚未输入`;
            return;
        }
        _this.returnMsg = `key:${this.keyStr},value:${this.valueStr} \n`;
        _this.audioManager.setAudioParameter(this.keyStr, this.valueStr, (err) => {
            if (err) {
                _this.returnMsg += `setAudioParameter callback Error:${JSON.stringify(err)}`;
                return;
            }
            _this.returnMsg += `setAudioParameter callback Success`;
        });
    }
    setAudioParameterPromise() {
        let _this = this;
        if (this.keyStr == "") {
            _this.returnMsg = `key 值尚未输入`;
            return;
        }
        if (this.valueStr == "") {
            _this.returnMsg = `value 值尚未输入`;
            return;
        }
        _this.returnMsg = `key:${this.keyStr},value:${this.valueStr} \n`;
        _this.audioManager.setAudioParameter(this.keyStr, this.valueStr)
            .then(() => {
            _this.returnMsg += `setAudioParameter promise Success`;
        }).cacth(err => {
            _this.returnMsg += `setAudioParameter promise Error:${JSON.stringify(err)}`;
        });
    }
    getAudioParameterCallback() {
        let _this = this;
        if (this.keyStr == "") {
            _this.returnMsg = `key 值尚未输入`;
            return;
        }
        _this.returnMsg = `key:${this.keyStr} \n`;
        _this.audioManager.getAudioParameter(this.keyStr, (err, value) => {
            if (err) {
                _this.returnMsg += `getAudioParameter callback Error:${JSON.stringify(err)}`;
                return;
            }
            _this.returnMsg += `setAudioParameter callback Success,返回值：${value}`;
        });
    }
    getAudioParameterPromise() {
        let _this = this;
        if (this.keyStr == "") {
            _this.returnMsg = `key 值尚未输入`;
            return;
        }
        _this.returnMsg = `key:${this.keyStr} \n`;
        _this.audioManager.getAudioParameter(this.keyStr)
            .then(value => {
            _this.returnMsg += `setAudioParameter promise Success,返回值：${value}`;
        }).catch(err => {
            _this.returnMsg += `getAudioParameter promise Error:${JSON.stringify(err)}`;
        });
    }
    render() {
        Row.create();
        Row.width('100%');
        Row.create();
        Row.position({ x: 0, y: 0 });
        Row.width('100%');
        Row.zIndex(999);
        Column.create();
        Column.width('98%');
        Column.height(120);
        Column.backgroundColor(Color.Orange);
        Column.position({ x: '1%' });
        Text.create("【音频管理-设置】返回数据：");
        Text.fontWeight(FontWeight.Bolder);
        Text.position({ x: 10, y: 5 });
        Text.fontSize(18);
        Text.pop();
        Text.create(this.returnMsg);
        Text.position({ x: 10, y: 30 });
        Text.fontSize(14);
        Text.pop();
        Column.pop();
        Row.pop();
        Scroll.create();
        Scroll.width('100%');
        Scroll.margin({ top: 130 });
        Column.create();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Select.create(this.selectAudioSceneList);
        Select.value(this.selectedAudioSceneKey);
        Select.onSelect((index, value) => {
            this.selectedAudioSceneKey = value;
        });
        Select.pop();
        Row.pop();
        Divider.create();
        Divider.strokeWidth(2);
        Divider.color(Color.Gray);
        Divider.margin({ bottom: 20 });
        Row.create();
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceAround);
        Button.createWithChild();
        Button.height(100);
        Button.width('49%');
        Button.onClick(() => this.setAudioSceneCallback());
        Text.create("setAudioScene callback");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.align(Alignment.Center);
        Text.lineHeight(40);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.height(100);
        Button.width('49%');
        Button.onClick(() => this.setAudioScenePromise());
        Text.create("setAudioScene promise");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.align(Alignment.Center);
        Text.lineHeight(40);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceAround);
        Row.margin({ top: 20, bottom: 20 });
        Button.createWithChild();
        Button.height(100);
        Button.width('49%');
        Button.onClick(() => this.getAudioSceneCallback());
        Text.create("getAudioScene callback");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.align(Alignment.Center);
        Text.lineHeight(40);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.height(100);
        Button.width('49%');
        Button.onClick(() => this.getAudioScenePromise());
        Text.create("getAudioScene promise");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.align(Alignment.Center);
        Text.lineHeight(40);
        Text.pop();
        Button.pop();
        Row.pop();
        Divider.create();
        Divider.strokeWidth(10);
        Divider.color(Color.Blue);
        Row.create();
        TextInput.create({ "placeholder": "请输入音频参数的键", controller: this.keyController, text: `${this.keyStr}` });
        TextInput.width('90%');
        TextInput.height(80);
        TextInput.style(TextInputStyle.Inline);
        TextInput.borderRadius(0);
        TextInput.fontSize(24);
        TextInput.placeholderFont({ size: 22 });
        TextInput.onChange((value) => {
            this.keyStr = value;
        });
        Row.pop();
        Row.create();
        Row.margin({ top: 20 });
        TextInput.create({ "placeholder": "请输入音频参数的值", controller: this.valueController, text: `${this.valueStr}` });
        TextInput.width('90%');
        TextInput.height(80);
        TextInput.style(TextInputStyle.Inline);
        TextInput.borderRadius(0);
        TextInput.fontSize(24);
        TextInput.placeholderFont({ size: 22 });
        TextInput.onChange((value) => {
            this.valueStr = value;
        });
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceAround);
        Button.createWithChild();
        Button.height(100);
        Button.width('49%');
        Button.onClick(() => this.setAudioParameterCallback());
        Text.create("setAudioParameter callback");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.align(Alignment.Center);
        Text.lineHeight(40);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.height(100);
        Button.width('49%');
        Button.onClick(() => this.setAudioParameterPromise());
        Text.create("setAudioParameter promise");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.align(Alignment.Center);
        Text.lineHeight(40);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceAround);
        Row.margin({ top: 20, bottom: 20 });
        Button.createWithChild();
        Button.height(100);
        Button.width('49%');
        Button.onClick(() => this.getAudioParameterCallback());
        Text.create("getAudioParameter callback");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.align(Alignment.Center);
        Text.lineHeight(40);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.height(100);
        Button.width('49%');
        Button.onClick(() => this.getAudioParameterPromise());
        Text.create("getAudioParameter promise");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.align(Alignment.Center);
        Text.lineHeight(40);
        Text.pop();
        Button.pop();
        Row.pop();
        Divider.create();
        Divider.strokeWidth(10);
        Divider.color(Color.Blue);
        Column.pop();
        Scroll.pop();
        Row.pop();
    }
}
loadDocument(new Settings("1", undefined, {}));
