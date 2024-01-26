interface DistributedAudio_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DistributedAudio_" + ++__generate__Id;
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
class DistributedAudio extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DistributedAudio_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Column.height('100%');
        Column.width('100%');
        Row.create();
        Row.position({ x: 0, y: 0 });
        Row.width('100%');
        Row.height(60);
        Row.backgroundColor(Color.Orange);
        Text.create("分布式音频");
        Text.fontColor(Color.White);
        Text.fontSize(28);
        Text.textAlign(TextAlign.Center);
        Text.width('100%');
        Text.pop();
        Row.pop();
        Row.create();
        Row.margin({ bottom: 10, top: 100 });
        Button.createWithChild();
        Button.height(80);
        Button.width('90%');
        Button.onClick(() => {
            router.push({ url: 'pages/distribute/DistributedAudioCallback' });
        });
        Text.create("分布式投播(ALL) callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ bottom: 10, top: 40 });
        Button.createWithChild();
        Button.height(80);
        Button.width('90%');
        Button.onClick(() => {
            router.push({ url: 'pages/distribute/DistributedAudioPromise' });
        });
        Text.create("分布式投播(ALL) promise");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
loadDocument(new DistributedAudio("1", undefined, {}));
