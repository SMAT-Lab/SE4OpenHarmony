interface SpeedDialog_Params {
    speedList?: Resource[];
    speedSelect?: number;
    avPlayManage?: avPlayManage;
    controller?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SpeedDialog_" + ++__generate__Id;
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
import avPlayManage from '../videomanager/AvPlayManager';
const ZERO = 0; // 倍速列表索引
const ONE = 1; // 倍速列表索引
const TWO = 2; // 倍速列表索引
const THREE = 3; // 倍速列表索引
export class SpeedDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__speedList = new ObservedPropertyObject([$r('app.string.video_speed_1_0X'), $r('app.string.video_speed_1_25X'), $r('app.string.video_speed_1_75X'), $r('app.string.video_speed_2_0X')], this, "speedList");
        this.__speedSelect = new SynchedPropertySimpleTwoWay(params.speedSelect, this, "speedSelect");
        this.__avPlayManage = AppStorage.SetAndLink('avPlayManage', new avPlayManage(), this, "avPlayManage");
        this.controller = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SpeedDialog_Params) {
        if (params.speedList !== undefined) {
            this.speedList = params.speedList;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__speedList.aboutToBeDeleted();
        this.__speedSelect.aboutToBeDeleted();
        this.__avPlayManage.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __speedList: ObservedPropertyObject<Resource[]>;
    get speedList() {
        return this.__speedList.get();
    }
    set speedList(newValue: Resource[]) {
        this.__speedList.set(newValue);
    }
    private __speedSelect: SynchedPropertySimpleTwoWay<number>; // 当前选择项的索引
    get speedSelect() {
        return this.__speedSelect.get();
    }
    set speedSelect(newValue: number) {
        this.__speedSelect.set(newValue);
    }
    private __avPlayManage: ObservedPropertyAbstract<avPlayManage>;
    get avPlayManage() {
        return this.__avPlayManage.get();
    }
    set avPlayManage(newValue: avPlayManage) {
        this.__avPlayManage.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    render() {
        Column.create();
        Column.alignItems(HorizontalAlign.Center);
        Column.width("90%");
        Column.borderRadius($r('app.float.size_24'));
        Column.backgroundColor(Color.White);
        Text.create($r('app.string.dialog_play_speed'));
        Text.fontSize($r('app.float.size_20'));
        Text.width("90%");
        Text.fontColor(Color.Black);
        Text.textAlign(TextAlign.Start);
        Text.margin({ top: $r('app.float.size_20'), bottom: $r('app.float.size_12') });
        Text.pop();
        List.create();
        List.width("100%");
        List.margin({
            top: $r('app.float.size_12')
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.speedList), (item: Resource, index) => {
            ListItem.create();
            ListItem.width("100%");
            ListItem.height($r('app.float.size_48'));
            ListItem.onClick(() => {
                this.speedSelect = index;
                AppStorage.setOrCreate('speedName', this.speedList[this.speedSelect]);
                AppStorage.setOrCreate('speedIndex', this.speedSelect);
                this.controller.close();
                switch (this.speedSelect) {
                    case ZERO:
                        this.avPlayManage.videoSpeedOne();
                        break;
                    case ONE:
                        this.avPlayManage.videoSpeedOnePointTwentyFive();
                        break;
                    case TWO:
                        this.avPlayManage.videoSpeedOnePointSeventyFive();
                        break;
                    case THREE:
                        this.avPlayManage.videoSpeedTwo();
                        break;
                }
            });
            Column.create();
            Column.width("90%");
            Row.create();
            Row.width('100%');
            Text.create(item);
            Text.fontSize($r('app.float.size_16'));
            Text.fontColor(Color.Black);
            Text.fontWeight(FontWeight.Medium);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Blank.create();
            Blank.pop();
            Image.create(this.speedSelect == index ? $r('app.media.ic_radio_selected') : $r('app.media.ic_radio'));
            Image.width($r('app.float.size_24'));
            Image.height($r('app.float.size_24'));
            Image.objectFit(ImageFit.Contain);
            Row.pop();
            If.create();
            if (index != this.speedList.length - ONE) {
                If.branchId(0);
                Divider.create();
                Divider.vertical(false);
                Divider.strokeWidth(1);
                Divider.margin({ top: $r('app.float.size_10') });
                Divider.color($r('app.color.speed_dialog'));
                Divider.width('100%');
            }
            If.pop();
            Column.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Row.create();
        Row.alignItems(VerticalAlign.Center);
        Row.height($r('app.float.size_50'));
        Row.padding({ bottom: $r('app.float.size_5') });
        Row.width("100%");
        Text.create($r('app.string.dialog_cancel'));
        Text.fontSize($r('app.float.size_16'));
        Text.fontColor('#0A59F7');
        Text.fontWeight(FontWeight.Medium);
        Text.layoutWeight(1);
        Text.textAlign(TextAlign.Center);
        Text.onClick(() => {
            this.controller.close();
        });
        Text.pop();
        Row.pop();
        Column.pop();
    }
}
