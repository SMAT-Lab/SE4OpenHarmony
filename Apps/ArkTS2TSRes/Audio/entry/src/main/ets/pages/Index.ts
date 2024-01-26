interface Index_Params {
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
        Column.create();
        Column.height('100%');
        Column.width('100%');
        Column.backgroundColor('#F1F3F5');
        Row.create();
        Row.margin({ top: 32 });
        Row.justifyContent(FlexAlign.SpaceBetween);
        Column.create();
        Column.id('select_output_device_card');
        Column.backgroundColor(Color.White);
        Column.margin({ right: 12 });
        Column.width(174);
        Column.height(188);
        Column.borderRadius(30);
        Column.onClick(async () => {
            await router.pushUrl({ url: 'pages/PreferOutputDevice' });
        });
        Image.create($r('app.media.png01_findxhdpi'));
        Image.width(72);
        Image.height(72);
        Image.margin({ top: 36 });
        Text.create($r('app.string.SelectOutputDevice'));
        Text.fontColor(Color.Black);
        Text.fontSize(16);
        Text.margin({ top: 12 });
        Text.pop();
        Column.pop();
        Column.create();
        Column.id('audio_focus_card');
        Column.backgroundColor(Color.White);
        Column.borderRadius(30);
        Column.width(174);
        Column.height(188);
        Column.onClick(async () => {
            await router.pushUrl({ url: 'pages/Focus' });
        });
        Image.create($r('app.media.png01_audioxhdpi'));
        Image.width(72);
        Image.height(72);
        Image.margin({ top: 36 });
        Text.create($r('app.string.AudioFocus'));
        Text.fontColor(Color.Black);
        Text.fontSize(16);
        Text.margin({ top: 12 });
        Text.pop();
        Column.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 12 });
        Row.justifyContent(FlexAlign.SpaceBetween);
        Column.create();
        Column.id('audio_effect_manager_card');
        Column.backgroundColor(Color.White);
        Column.borderRadius(30);
        Column.margin({ right: 12 });
        Column.width(174);
        Column.height(188);
        Column.onClick(async () => {
            await router.pushUrl({ url: 'pages/PresetEffect' });
        });
        Image.create($r('app.media.png01_Soundeffectsxhdpi'));
        Image.width(72);
        Image.height(72);
        Image.margin({ top: 36 });
        Text.create($r('app.string.AudioEffectManager'));
        Text.fontColor(Color.Black);
        Text.fontSize(16);
        Text.margin({ top: 12 });
        Text.pop();
        Column.pop();
        Column.create();
        Column.id('audio_capturer_card');
        Column.backgroundColor(Color.White);
        Column.borderRadius(30);
        Column.width(174);
        Column.height(188);
        Column.onClick(async () => {
            await router.pushUrl({ url: 'pages/NormalCapturer' });
        });
        Image.create($r('app.media.png01_Recordingxxxhdpi'));
        Image.width(72);
        Image.height(72);
        Image.margin({ top: 36 });
        Text.create($r('app.string.AUDIO_CAPTURER'));
        Text.fontColor(Color.Black);
        Text.fontSize(16);
        Text.margin({ top: 12 });
        Text.pop();
        Column.pop();
        Row.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
