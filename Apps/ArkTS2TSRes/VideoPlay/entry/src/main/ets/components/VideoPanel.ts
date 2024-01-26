interface VideoPanel_Params {
    videoList?: Resource[];
    selectColor?: boolean;
    show?: boolean;
    videoSelect?: number;
    avPlayManage?: avPlayManage;
    linkSpeed?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "VideoPanel_" + ++__generate__Id;
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
import media from '@ohos.multimedia.media';
import wf from '@ohos.wifiManager';
import promptAction from '@ohos.promptAction';
import resourceManager from '@ohos.resourceManager';
import { GlobalContext } from '../utils/GlobalContext';
import common from '@ohos.app.ability.common';
const VIDEOSELECT = 2; // 网络视频索引
export class VideoPanel extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__videoList = new ObservedPropertyObject([$r('app.string.video_res_1'), $r('app.string.video_res_2'), $r('app.string.video_res_3')], this, "videoList");
        this.__selectColor = new ObservedPropertySimple(true, this, "selectColor");
        this.__show = new SynchedPropertySimpleTwoWay(params.show, this, "show");
        this.__videoSelect = new SynchedPropertySimpleTwoWay(params.videoSelect, this, "videoSelect");
        this.__avPlayManage = AppStorage.SetAndLink('avPlayManage', new avPlayManage(), this, "avPlayManage");
        this.__linkSpeed = new ObservedPropertySimple(0, this, "linkSpeed");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: VideoPanel_Params) {
        if (params.videoList !== undefined) {
            this.videoList = params.videoList;
        }
        if (params.selectColor !== undefined) {
            this.selectColor = params.selectColor;
        }
        if (params.linkSpeed !== undefined) {
            this.linkSpeed = params.linkSpeed;
        }
    }
    aboutToBeDeleted() {
        this.__videoList.aboutToBeDeleted();
        this.__selectColor.aboutToBeDeleted();
        this.__show.aboutToBeDeleted();
        this.__videoSelect.aboutToBeDeleted();
        this.__avPlayManage.aboutToBeDeleted();
        this.__linkSpeed.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __videoList: ObservedPropertyObject<Resource[]>;
    get videoList() {
        return this.__videoList.get();
    }
    set videoList(newValue: Resource[]) {
        this.__videoList.set(newValue);
    }
    private __selectColor: ObservedPropertySimple<boolean>;
    get selectColor() {
        return this.__selectColor.get();
    }
    set selectColor(newValue: boolean) {
        this.__selectColor.set(newValue);
    }
    private __show: SynchedPropertySimpleTwoWay<boolean>;
    get show() {
        return this.__show.get();
    }
    set show(newValue: boolean) {
        this.__show.set(newValue);
    }
    private __videoSelect: SynchedPropertySimpleTwoWay<number>; // 当前选择项的索引
    get videoSelect() {
        return this.__videoSelect.get();
    }
    set videoSelect(newValue: number) {
        this.__videoSelect.set(newValue);
    }
    private __avPlayManage: ObservedPropertyAbstract<avPlayManage>;
    get avPlayManage() {
        return this.__avPlayManage.get();
    }
    set avPlayManage(newValue: avPlayManage) {
        this.__avPlayManage.set(newValue);
    }
    private __linkSpeed: ObservedPropertySimple<number>;
    get linkSpeed() {
        return this.__linkSpeed.get();
    }
    set linkSpeed(newValue: number) {
        this.__linkSpeed.set(newValue);
    }
    // 判断是否联网
    async checkWifiState(): Promise<boolean> {
        let linkInfo = await wf.getLinkedInfo();
        if (linkInfo.connState !== wf.ConnState.CONNECTED) {
            return false;
        }
        return true;
    }
    async isInternet(): Promise<void> {
        if (!await this.checkWifiState() && this.videoSelect === VIDEOSELECT) {
            this.toast();
        }
    }
    async toast() {
        promptAction.showToast({
            message: $r('app.string.video_warn'),
            duration: 2000,
        });
        setTimeout(() => {
            (GlobalContext.getContext().getObject('context') as (common.UIAbilityContext)).terminateSelf();
        }, 1000);
    }
    async aboutToAppear() {
        setInterval(async () => {
            try {
                await this.isInternet();
            }
            catch (err) {
                if (!wf.isConnected() && this.videoSelect === VIDEOSELECT) {
                    this.toast();
                }
            }
        }, 2000);
    }
    render() {
        Panel.create(this.show);
        Panel.onClick(() => {
            this.show = false;
        });
        Panel.onChange(() => {
            this.show = false;
        });
        Panel.backgroundColor($r('app.color.video_play'));
        Panel.type(PanelType.Foldable);
        Panel.mode(PanelMode.Half);
        Panel.dragBar(false);
        Panel.halfHeight(254);
        Panel.width('100%');
        Panel.mode(PanelMode.Half);
        Panel.padding({ top: $r('app.float.size_5') });
        Column.create();
        RelativeContainer.create();
        RelativeContainer.height($r('app.float.size_20'));
        RelativeContainer.width("90%");
        RelativeContainer.margin({ top: $r('app.float.size_20'), bottom: $r('app.float.size_20') });
        Text.create(this.videoList[this.videoSelect]);
        Text.fontColor(Color.White);
        Text.fontSize($r('app.float.size_18'));
        Text.fontWeight(FontWeight.Regular);
        Text.alignRules({
            middle: { anchor: '__container__', align: HorizontalAlign.Center },
            center: { anchor: '__container__', align: VerticalAlign.Center }
        });
        Text.id("test1");
        Text.pop();
        Image.create($r('app.media.ic_video_list_down'));
        Image.width($r('app.float.size_30'));
        Image.height($r('app.float.size_20'));
        Image.alignRules({
            right: { anchor: '__container__', align: HorizontalAlign.End },
            center: { anchor: '__container__', align: VerticalAlign.Center }
        });
        Image.id("test2");
        RelativeContainer.pop();
        List.create();
        List.width("100%");
        ForEach.create("2", this, ObservedObject.GetRawObject(this.videoList), (item: Resource, index) => {
            ListItem.create();
            ListItem.backgroundColor(this.videoSelect === index ? $r('app.color.video_play_selected') : "");
            ListItem.width("100%");
            ListItem.height($r('app.float.size_64'));
            ListItem.onClick(async () => {
                this.videoSelect = index;
                AppStorage.setOrCreate('videoName', this.videoList[this.videoSelect]);
                AppStorage.setOrCreate('videoIndex', this.videoSelect);
                AppStorage.setOrCreate('speedName', $r('app.string.video_speed_1_0X'));
                AppStorage.setOrCreate('speedIndex', 0);
                this.show = false;
                let str = await (GlobalContext.getContext().getObject('context') as (common.UIAbilityContext))
                    .resourceManager.getStringValue(this.videoList[this.videoSelect]);
                this.avPlayManage.videoChoose(str, this.videoSelect, (avPlayer: media.AVPlayer) => {
                });
            });
            Column.create();
            Column.width("100%");
            Row.create();
            Row.width("90%");
            Text.create(item);
            Text.fontSize($r('app.float.size_20'));
            Text.fontColor(Color.White);
            Text.fontWeight(FontWeight.Regular);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Blank.create();
            Blank.pop();
            If.create();
            if (this.videoSelect === index) {
                If.branchId(0);
                Text.create($r('app.string.playing'));
                Text.fontSize($r('app.float.size_20'));
                Text.fontColor(Color.White);
                Text.opacity($r('app.float.size_zero_six'));
                Text.fontWeight(FontWeight.Regular);
                Text.textAlign(TextAlign.Center);
                Text.pop();
            }
            If.pop();
            Row.pop();
            Column.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Column.pop();
        Panel.pop();
    }
}
