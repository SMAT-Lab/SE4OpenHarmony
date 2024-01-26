interface DeviceDialog_Params {
    controller?: CustomDialogController;
    deviceLists?: Array<deviceManager.DeviceInfo>;
    selectedIndex?: number;
    selectedIndexChange?: (selectedIndex: number) => void;
    cancel?: () => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DeviceDialog_" + ++__generate__Id;
}
/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */
import Logger from '../model/Logger';
import deviceManager from '@ohos.distributedHardware.deviceManager';
const TAG: string = 'DeviceDialog';
export class DeviceDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = undefined;
        this.__deviceLists = AppStorage.SetAndLink('deviceLists', AppStorage.Get('deviceLists'), this, "deviceLists");
        this.selectedIndex = 0;
        this.selectedIndexChange = () => {
        };
        this.cancel = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DeviceDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.selectedIndex !== undefined) {
            this.selectedIndex = params.selectedIndex;
        }
        if (params.selectedIndexChange !== undefined) {
            this.selectedIndexChange = params.selectedIndexChange;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
    }
    aboutToBeDeleted() {
        this.__deviceLists.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private __deviceLists: ObservedPropertyAbstract<Array<deviceManager.DeviceInfo>>;
    get deviceLists() {
        return this.__deviceLists.get();
    }
    set deviceLists(newValue: Array<deviceManager.DeviceInfo>) {
        this.__deviceLists.set(newValue);
    }
    private selectedIndex: number;
    private selectedIndexChange: (selectedIndex: number) => void;
    private cancel: () => void;
    render() {
        Column.create();
        Column.margin({ bottom: 36 });
        Column.width('500px');
        Column.padding(10);
        Column.backgroundColor(Color.White);
        Column.border({ color: Color.White, radius: 20 });
        Text.create($r('app.string.choiceDevice'));
        Text.fontSize('32px');
        Text.width('434px');
        Text.fontColor(Color.Black);
        Text.textAlign(TextAlign.Start);
        Text.fontWeight(600);
        Text.pop();
        List.create();
        List.height('36%');
        List.width('100%');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.deviceLists), (item: deviceManager.DeviceInfo, index: number | undefined) => {
            ListItem.create();
            ListItem.width('100%');
            ListItem.height(80);
            Flex.create({
                direction: FlexDirection.Row,
                justifyContent: FlexAlign.SpaceBetween,
                alignItems: ItemAlign.Center
            });
            Flex.height(55);
            Text.create(item.deviceName);
            Text.fontSize(18);
            Text.width('86%');
            Text.fontColor(Color.Black);
            Text.textAlign(TextAlign.Start);
            Text.pop();
            Radio.create({ value: '', group: 'radioGroup' });
            Radio.width('7%');
            Radio.checked(index === this.selectedIndex ? true : false);
            Radio.onChange(() => {
                Logger.info(TAG, `select device: ${item.deviceId}`);
                if (index === this.selectedIndex) {
                    Logger.info(TAG, 'index === this.selectedIndex');
                    return;
                }
                this.selectedIndex = index !== undefined ? index : 0;
                if (this.controller !== undefined) {
                    this.controller.close();
                }
                this.selectedIndexChange(this.selectedIndex);
            });
            Flex.pop();
            ListItem.pop();
        }, item => item.deviceName);
        ForEach.pop();
        List.pop();
        Button.createWithChild();
        Button.margin({ bottom: 16 });
        Button.type(ButtonType.Capsule);
        Button.backgroundColor(Color.White);
        Button.onClick(() => {
            if (this.controller !== undefined) {
                this.controller.close();
                this.cancel();
            }
        });
        Text.create($r('app.string.cancel'));
        Text.width('90%');
        Text.fontSize(21);
        Text.fontColor('#ff0d64fb');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Column.pop();
    }
}
