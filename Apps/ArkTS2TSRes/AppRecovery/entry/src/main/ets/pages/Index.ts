interface FirstPage_Params {
    storage?;
    launchReason?: string;
    lastExitReason?: string;
    callerAbility?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
class FirstPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.storage = LocalStorage.getShared();
        this.__launchReason = new ObservedPropertySimple('', this, "launchReason");
        this.__lastExitReason = new ObservedPropertySimple('', this, "lastExitReason");
        this.__callerAbility = new ObservedPropertySimple('', this, "callerAbility");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: FirstPage_Params) {
        if (params.storage !== undefined) {
            this.storage = params.storage;
        }
        if (params.launchReason !== undefined) {
            this.launchReason = params.launchReason;
        }
        if (params.lastExitReason !== undefined) {
            this.lastExitReason = params.lastExitReason;
        }
        if (params.callerAbility !== undefined) {
            this.callerAbility = params.callerAbility;
        }
    }
    aboutToBeDeleted() {
        this.__launchReason.aboutToBeDeleted();
        this.__lastExitReason.aboutToBeDeleted();
        this.__callerAbility.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private storage;
    private __launchReason: ObservedPropertySimple<string>;
    get launchReason() {
        return this.__launchReason.get();
    }
    set launchReason(newValue: string) {
        this.__launchReason.set(newValue);
    }
    private __lastExitReason: ObservedPropertySimple<string>;
    get lastExitReason() {
        return this.__lastExitReason.get();
    }
    set lastExitReason(newValue: string) {
        this.__lastExitReason.set(newValue);
    }
    private __callerAbility: ObservedPropertySimple<string>;
    get callerAbility() {
        return this.__callerAbility.get();
    }
    set callerAbility(newValue: string) {
        this.__callerAbility.set(newValue);
    }
    aboutToAppear() {
        this.launchReason = this.storage.get<string>('launchReason') ?? 'Unknown';
        this.lastExitReason = this.storage.get<string>('lastExitReason') ?? 'Unknown';
        this.callerAbility = this.storage.get<string>('CurrentAbilityName') ?? 'Unknown';
    }
    render() {
        Column.create();
        Column.backgroundColor($r('sys.color.ohos_id_color_sub_background'));
        Column.width('100%');
        Column.height('100%');
        Text.create(this.callerAbility);
        Text.fontSize('30fp');
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: '24vp', right: '24vp', top: '7vp', bottom: '8vp' });
        Text.margin({ top: '24vp' });
        Text.textAlign(TextAlign.Start);
        Text.height('56vp');
        Text.width('100%');
        Text.fontColor($r('app.color.text_grey'));
        Text.pop();
        List.create();
        List.alignListItem(ListItemAlign.Center);
        List.margin({ left: '12vp', right: '12vp', top: '8vp' });
        List.width('93.3%');
        List.borderRadius('24vp');
        List.backgroundColor($r('sys.color.ohos_id_color_foreground_contrary'));
        List.padding({ left: '12vp', right: '12vp', top: '4vp', bottom: '4vp' });
        List.divider({ strokeWidth: '0.5vp', color: $r('app.color.text_grey_opacity') });
        ListItem.create();
        ListItem.width('100%');
        ListItem.height('48vp');
        ListItem.align(Alignment.Center);
        Column.create();
        Row.create();
        Text.create($r('app.string.launch_reason'));
        Text.fontSize('16fp');
        Text.width('86%');
        Text.pop();
        Text.create('0' + this.launchReason);
        Text.fontSize('14fp');
        Text.width('14%');
        Text.fontColor($r('app.color.text_grey'));
        Text.opacity(0.6);
        Text.textAlign(TextAlign.End);
        Text.pop();
        Row.pop();
        Column.pop();
        ListItem.pop();
        ListItem.create();
        ListItem.width('100%');
        ListItem.height('48vp');
        ListItem.align(Alignment.Center);
        Column.create();
        Row.create();
        Text.create($r('app.string.last_exit_reason'));
        Text.fontSize('16fp');
        Text.width('86%');
        Text.pop();
        Text.create('0' + this.lastExitReason);
        Text.fontSize('14fp');
        Text.width('14%');
        Text.fontColor($r('app.color.text_grey'));
        Text.opacity(0.6);
        Text.textAlign(TextAlign.End);
        Text.pop();
        Row.pop();
        Column.pop();
        ListItem.pop();
        List.pop();
        Button.createWithLabel($r('app.string.trigger_fault'));
        Button.fontSize('16fp');
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/FaultTriggerPage' });
        });
        Button.width('88.9%');
        Button.margin({ top: '520vp', right: '24vp', left: '24vp', bottom: '24vp' });
        Button.height('40vp');
        Button.backgroundColor($r('app.color.text_blue_opacity'));
        Button.pop();
        Column.pop();
    }
}
loadDocument(new FirstPage("1", undefined, {}));
