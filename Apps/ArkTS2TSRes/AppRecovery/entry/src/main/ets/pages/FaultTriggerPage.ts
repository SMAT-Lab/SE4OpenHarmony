interface FaultTriggerPage_Params {
    storage?;
    counter?: number;
    callerAbility?: string;
    launchReason?: string;
    lastExitReason?: string;
    curAbilitySaveState?: string;
    allAbilitySaveState?: string;
    setRecoveryAbility?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "FaultTriggerPage_" + ++__generate__Id;
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
import appRecovery from '@ohos.app.ability.appRecovery';
import ResUtil from '../common/ResUtil';
import { CurActiveAbility } from '../common/CurActiveAbility';
class FaultTriggerPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.storage = LocalStorage.getShared();
        this.__counter = new ObservedPropertySimple(0, this, "counter");
        this.__callerAbility = new ObservedPropertySimple('', this, "callerAbility");
        this.__launchReason = new ObservedPropertySimple('', this, "launchReason");
        this.__lastExitReason = new ObservedPropertySimple('', this, "lastExitReason");
        this.__curAbilitySaveState = new ObservedPropertySimple('', this, "curAbilitySaveState");
        this.__allAbilitySaveState = new ObservedPropertySimple('', this, "allAbilitySaveState");
        this.__setRecoveryAbility = new ObservedPropertySimple('', this, "setRecoveryAbility");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: FaultTriggerPage_Params) {
        if (params.storage !== undefined) {
            this.storage = params.storage;
        }
        if (params.counter !== undefined) {
            this.counter = params.counter;
        }
        if (params.callerAbility !== undefined) {
            this.callerAbility = params.callerAbility;
        }
        if (params.launchReason !== undefined) {
            this.launchReason = params.launchReason;
        }
        if (params.lastExitReason !== undefined) {
            this.lastExitReason = params.lastExitReason;
        }
        if (params.curAbilitySaveState !== undefined) {
            this.curAbilitySaveState = params.curAbilitySaveState;
        }
        if (params.allAbilitySaveState !== undefined) {
            this.allAbilitySaveState = params.allAbilitySaveState;
        }
        if (params.setRecoveryAbility !== undefined) {
            this.setRecoveryAbility = params.setRecoveryAbility;
        }
    }
    aboutToBeDeleted() {
        this.__counter.aboutToBeDeleted();
        this.__callerAbility.aboutToBeDeleted();
        this.__launchReason.aboutToBeDeleted();
        this.__lastExitReason.aboutToBeDeleted();
        this.__curAbilitySaveState.aboutToBeDeleted();
        this.__allAbilitySaveState.aboutToBeDeleted();
        this.__setRecoveryAbility.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private storage;
    private __counter: ObservedPropertySimple<number>;
    get counter() {
        return this.__counter.get();
    }
    set counter(newValue: number) {
        this.__counter.set(newValue);
    }
    private __callerAbility: ObservedPropertySimple<string>;
    get callerAbility() {
        return this.__callerAbility.get();
    }
    set callerAbility(newValue: string) {
        this.__callerAbility.set(newValue);
    }
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
    private __curAbilitySaveState: ObservedPropertySimple<string>;
    get curAbilitySaveState() {
        return this.__curAbilitySaveState.get();
    }
    set curAbilitySaveState(newValue: string) {
        this.__curAbilitySaveState.set(newValue);
    }
    private __allAbilitySaveState: ObservedPropertySimple<string>;
    get allAbilitySaveState() {
        return this.__allAbilitySaveState.get();
    }
    set allAbilitySaveState(newValue: string) {
        this.__allAbilitySaveState.set(newValue);
    }
    private __setRecoveryAbility: ObservedPropertySimple<string>;
    get setRecoveryAbility() {
        return this.__setRecoveryAbility.get();
    }
    set setRecoveryAbility(newValue: string) {
        this.__setRecoveryAbility.set(newValue);
    }
    aboutToAppear() {
        this.counter = this.storage.get<number>('FaultTriggerPageCounter') ?? 0;
        this.callerAbility = this.storage.get<string>('CurrentAbilityName') ?? 'UnknownCallingAbility';
        this.launchReason = this.storage.get<string>('launchReason') ?? 'Unknown';
        this.lastExitReason = this.storage.get<string>('lastExitReason') ?? 'Unknown';
        ResUtil.getString($r('app.string.save_state').id).then((value: string) => this.curAbilitySaveState = value);
        ResUtil.getString($r('app.string.save_state').id).then((value: string) => this.allAbilitySaveState = value);
        ResUtil.getString($r('app.string.set_config').id).then((value: string) => this.setRecoveryAbility = value);
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
        List.create();
        List.height('56vp');
        List.margin({ left: '12vp', right: '12vp', top: '12vp' });
        List.width('93.3%');
        List.borderRadius('24vp');
        List.backgroundColor($r('sys.color.ohos_id_color_foreground_contrary'));
        List.padding({ left: '12vp', right: '12vp' });
        ListItem.create();
        ListItem.align(Alignment.Center);
        ListItem.padding({ top: '4vp', bottom: '4vp' });
        ListItem.width('100%');
        Column.create();
        Row.create();
        Row.align(Alignment.Center);
        Row.height('48vp');
        Row.create();
        Row.align(Alignment.Center);
        Row.width('76.3%');
        Text.create($r('app.string.click_counter'));
        Text.fontSize('16fp');
        Text.pop();
        Text.create(this.counter.toString());
        Text.fontSize('16fp');
        Text.pop();
        Row.pop();
        Button.createWithLabel($r('app.string.counter_name'));
        Button.fontSize('12fp');
        Button.width('23.7%');
        Button.fontColor($r('app.color.text_blue_opacity'));
        Button.onClick(() => {
            this.counter++;
        });
        Button.backgroundColor($r('sys.color.ohos_id_color_sub_background'));
        Button.align(Alignment.Center);
        Button.height('28vp');
        Button.pop();
        Row.pop();
        Column.pop();
        ListItem.pop();
        List.pop();
        Text.create($r('app.string.recover_settings'));
        Text.fontSize('14fp');
        Text.margin({ left: '24vp', right: '24vp', top: '19.5vp', bottom: '9.5vp' });
        Text.textAlign(TextAlign.Start);
        Text.fontColor($r('app.color.text_grey'));
        Text.opacity(0.6);
        Text.height('19vp');
        Text.width('86.7%');
        Text.pop();
        List.create();
        List.margin({ left: '12vp', right: '12vp' });
        List.width('93.3%');
        List.borderRadius('24vp');
        List.backgroundColor($r('sys.color.ohos_id_color_foreground_contrary'));
        List.padding({ left: '12vp', right: '12vp', top: '4vp', bottom: '4vp' });
        List.divider({ strokeWidth: '0.5vp', color: $r('app.color.text_grey_opacity') });
        ListItem.create();
        ListItem.width('100%');
        Column.create();
        Row.create();
        Row.height('48vp');
        Row.width('100%');
        Text.create($r('app.string.save_current_ability_status'));
        Text.fontSize('16fp');
        Text.width('76.3%');
        Text.pop();
        Button.createWithLabel(this.curAbilitySaveState);
        Button.fontSize('12fp');
        Button.width('23.7%');
        Button.fontColor($r('app.color.text_blue_opacity'));
        Button.onClick(() => {
            this.storage.setOrCreate('FaultTriggerPageCounter', this.counter);
            this.storage.setOrCreate('FaultTriggerPageString', 'TestFaultTriggerPageString');
            appRecovery.saveAppState(CurActiveAbility.GetInstance().GetGlobalAbility().context);
            ResUtil.getString($r('app.string.save_state_done').id)
                .then((value: string) => this.curAbilitySaveState = value);
        });
        Button.height('28vp');
        Button.backgroundColor($r('sys.color.ohos_id_color_sub_background'));
        Button.pop();
        Row.pop();
        Column.pop();
        ListItem.pop();
        ListItem.create();
        ListItem.width('100%');
        Column.create();
        Row.create();
        Row.height('48vp');
        Row.width('100%');
        Text.create($r('app.string.save_all_ability_status'));
        Text.fontSize('16fp');
        Text.width('76.3%');
        Text.pop();
        Button.createWithLabel(this.allAbilitySaveState);
        Button.fontSize('12fp');
        Button.width('23.7%');
        Button.fontColor($r('app.color.text_blue_opacity'));
        Button.onClick(() => {
            this.storage.setOrCreate('FaultTriggerPageCounter', this.counter);
            this.storage.setOrCreate('FaultTriggerPageString', 'TestFaultTriggerPageString');
            appRecovery.saveAppState();
            ResUtil.getString($r('app.string.save_state_done').id)
                .then((value: string) => this.allAbilitySaveState = value);
        });
        Button.height('28vp');
        Button.backgroundColor($r('sys.color.ohos_id_color_sub_background'));
        Button.pop();
        Row.pop();
        Column.pop();
        ListItem.pop();
        ListItem.create();
        ListItem.width('100%');
        Column.create();
        Row.create();
        Row.height('48vp');
        Row.width('100%');
        Text.create($r('app.string.set_recovery_ability'));
        Text.fontSize('16fp');
        Text.width('76.3%');
        Text.pop();
        Button.createWithLabel(this.setRecoveryAbility);
        Button.fontSize('12fp');
        Button.width('23.7%');
        Button.fontColor($r('app.color.text_blue_opacity'));
        Button.onClick(() => {
            let tmp: Record<string, string> = { 'RecoverAbility': this.callerAbility };
            let want: Record<string, Object> = {
                'bundleName': 'com.samples.recovery',
                'abilityName': 'RecoveryAbility',
                'parameters': tmp,
            };
            appRecovery.setRestartWant(want);
            ResUtil.getString($r('app.string.set_config_done').id)
                .then((value: string) => this.setRecoveryAbility = value);
        });
        Button.height('28vp');
        Button.backgroundColor($r('sys.color.ohos_id_color_sub_background'));
        Button.pop();
        Row.pop();
        Column.pop();
        ListItem.pop();
        If.create();
        if (this.callerAbility === 'EntryAbility') {
            If.branchId(0);
            ListItem.create();
            ListItem.width('100%');
            Column.create();
            Row.create();
            Row.height('48vp');
            Row.width('100%');
            Text.create('SecondAbility');
            Text.fontSize('16fp');
            Text.width('76.3%');
            Text.pop();
            Button.createWithLabel($r('app.string.launch_ability'));
            Button.fontSize('12fp');
            Button.width('23.7%');
            Button.fontColor($r('app.color.text_blue_opacity'));
            Button.onClick(() => {
                if (CurActiveAbility.GetInstance().GetGlobalAbility() == undefined) {
                    return;
                }
                this.storage.setOrCreate('FaultTriggerPageCounter', this.counter);
                this.storage.setOrCreate('FaultTriggerPageString', 'TestFaultTriggerPageString');
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
        }
        If.pop();
        List.pop();
        Text.create($r('app.string.trigger_fault_items'));
        Text.fontSize('14fp');
        Text.margin({ left: '24vp', right: '24vp', top: '19.5vp', bottom: '9.5vp' });
        Text.textAlign(TextAlign.Start);
        Text.fontColor($r('app.color.text_grey'));
        Text.opacity(0.6);
        Text.height('19vp');
        Text.width('86.7%');
        Text.pop();
        List.create();
        List.margin({ left: '12vp', right: '12vp' });
        List.width('93.3%');
        List.borderRadius('24vp');
        List.backgroundColor($r('sys.color.ohos_id_color_foreground_contrary'));
        List.padding({ left: '12vp', right: '12vp', top: '4vp', bottom: '4vp' });
        List.divider({ strokeWidth: '0.5vp', color: $r('app.color.text_grey_opacity') });
        ListItem.create();
        ListItem.width('100%');
        Column.create();
        Row.create();
        Row.height('48vp');
        Row.align(Alignment.Center);
        Row.width('100%');
        Text.create($r('app.string.trigger_js_error'));
        Text.fontSize('16fp');
        Text.width('76.3%');
        Text.pop();
        Button.createWithLabel($r('app.string.trigger'));
        Button.fontSize('12fp');
        Button.width('23.7%');
        Button.fontColor($r('app.color.text_blue_opacity'));
        Button.onClick(() => {
            throw new Error('Force Crash');
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
loadDocument(new FaultTriggerPage("1", undefined, {}));
