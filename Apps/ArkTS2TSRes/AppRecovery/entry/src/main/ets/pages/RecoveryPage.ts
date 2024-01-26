interface Index_Params {
    storage?;
    launchParam?: string;
    wantParam?: string;
    fromEntryAbility?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "RecoveryPage_" + ++__generate__Id;
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
import { CurActiveAbility } from '../common/CurActiveAbility';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.storage = LocalStorage.getShared();
        this.__launchParam = new ObservedPropertySimple('', this, "launchParam");
        this.__wantParam = new ObservedPropertySimple('', this, "wantParam");
        this.fromEntryAbility = false;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.storage !== undefined) {
            this.storage = params.storage;
        }
        if (params.launchParam !== undefined) {
            this.launchParam = params.launchParam;
        }
        if (params.wantParam !== undefined) {
            this.wantParam = params.wantParam;
        }
        if (params.fromEntryAbility !== undefined) {
            this.fromEntryAbility = params.fromEntryAbility;
        }
    }
    aboutToBeDeleted() {
        this.__launchParam.aboutToBeDeleted();
        this.__wantParam.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private storage;
    private __launchParam: ObservedPropertySimple<string>;
    get launchParam() {
        return this.__launchParam.get();
    }
    set launchParam(newValue: string) {
        this.__launchParam.set(newValue);
    }
    private __wantParam: ObservedPropertySimple<string>;
    get wantParam() {
        return this.__wantParam.get();
    }
    set wantParam(newValue: string) {
        this.__wantParam.set(newValue);
    }
    private fromEntryAbility: boolean;
    aboutToAppear() {
        this.launchParam = this.storage.get<string>('launchParam') ?? 'UnknownLaunchParam';
        this.wantParam = this.storage.get<string>('wantParam') ?? 'UnknownWantParam';
        let abilityName = AppStorage.get<string>('RecoverAbility');
        if (abilityName === 'EntryAbility') {
            this.fromEntryAbility = true;
        }
    }
    render() {
        Column.create();
        Column.backgroundColor($r('sys.color.ohos_id_color_sub_background'));
        Column.width('100%');
        Column.height('100%');
        Text.create('RecoveryPage');
        Text.fontSize('30fp');
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: '24vp', right: '24vp', top: '4vp', bottom: '4vp' });
        Text.margin({ top: '24vp' });
        Text.textAlign(TextAlign.Start);
        Text.height('56vp');
        Text.width('100%');
        Text.fontColor($r('app.color.text_grey'));
        Text.pop();
        If.create();
        if (this.fromEntryAbility === false) {
            If.branchId(0);
            List.create();
            List.margin({ left: '12vp', right: '12vp', top: '12vp' });
            List.width('93.3%');
            List.borderRadius('24vp');
            List.backgroundColor($r('sys.color.ohos_id_color_foreground_contrary'));
            List.padding({ left: '12vp', right: '12vp', top: '4vp', bottom: '4vp' });
            ListItem.create();
            ListItem.width('100%');
            Column.create();
            Row.create();
            Row.height('48vp');
            Row.align(Alignment.Center);
            Row.width('100%');
            Text.create('SecondAbility');
            Text.fontSize('16fp');
            Text.width('76.3%');
            Text.pop();
            Button.createWithLabel($r('app.string.recover'));
            Button.fontSize('12fp');
            Button.width('23.7%');
            Button.fontColor($r('app.color.text_blue_opacity'));
            Button.onClick(() => {
                if (CurActiveAbility.GetInstance().GetGlobalAbility() == undefined) {
                    return;
                }
                let want: Record<string, Object> = {
                    'bundleName': 'com.samples.recovery',
                    'abilityName': 'SecondAbility'
                };
                CurActiveAbility.GetInstance().GetGlobalAbility().context.startAbility(want);
            });
            Button.height('28vp');
            Button.backgroundColor($r('sys.color.ohos_id_color_sub_background'));
            Button.pop();
            Row.pop();
            Column.pop();
            ListItem.pop();
            List.pop();
        }
        If.pop();
        List.create();
        List.margin({ left: '12vp', right: '12vp', top: '12vp' });
        List.width('93.3%');
        List.borderRadius('24vp');
        List.backgroundColor($r('sys.color.ohos_id_color_foreground_contrary'));
        List.padding({ left: '12vp', right: '12vp', top: '4vp', bottom: '4vp' });
        ListItem.create();
        ListItem.width('100%');
        Column.create();
        Row.create();
        Row.height('48vp');
        Row.align(Alignment.Center);
        Row.width('100%');
        Text.create('EntryAbility');
        Text.fontSize('16fp');
        Text.width('76.3%');
        Text.pop();
        Button.createWithLabel($r('app.string.recover'));
        Button.fontSize('12fp');
        Button.width('23.7%');
        Button.fontColor($r('app.color.text_blue_opacity'));
        Button.onClick(() => {
            if (CurActiveAbility.GetInstance().GetGlobalAbility() == undefined) {
                return;
            }
            let want: Record<string, Object> = {
                'bundleName': 'com.samples.recovery',
                'abilityName': 'EntryAbility'
            };
            CurActiveAbility.GetInstance().GetGlobalAbility().context.startAbility(want);
        });
        Button.height('28vp');
        Button.backgroundColor($r('sys.color.ohos_id_color_sub_background'));
        Button.pop();
        Row.pop();
        Column.pop();
        ListItem.pop();
        List.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
