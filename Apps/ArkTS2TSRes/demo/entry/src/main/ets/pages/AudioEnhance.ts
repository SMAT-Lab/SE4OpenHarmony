interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AudioEnhance_" + ++__generate__Id;
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
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Row.create();
        Row.height('100%');
        Row.width('100%');
        Column.create();
        Column.width('90%');
        Column.margin('5%');
        Button.createWithChild();
        Button.width('100%');
        Button.margin({ bottom: 40 });
        Button.height(60);
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/AudioEnhance/AudioRendererEnhance' });
        });
        Text.create("音频流播放功能增强");
        Text.fontSize(30);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('100%');
        Button.margin({ bottom: 40 });
        Button.height(60);
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/AudioEnhance/AudioCapturerEnhance' });
        });
        Text.create("音频流录制功能增强");
        Text.fontSize(30);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('100%');
        Button.margin({ bottom: 40 });
        Button.height(60);
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/AudioEnhance/AudioManagerEnhance' });
        });
        Text.create("音频策略管理功能增强");
        Text.fontSize(30);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('100%');
        Button.margin({ bottom: 40 });
        Button.height(60);
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/AudioEnhance/MicrophoneEnhance' });
        });
        Text.create("麦克风信息管理");
        Text.fontSize(30);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
