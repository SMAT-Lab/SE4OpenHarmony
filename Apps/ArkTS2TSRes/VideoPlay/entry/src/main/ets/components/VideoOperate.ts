interface VideoOperate_Params {
    videoList?: Resource[];
    speedSelect?: number;
    currentTime?: number;
    durationTime?: number;
    isSwiping?: boolean;
    avPlayManage?: avPlayManage;
    flag?: boolean;
    XComponentFlag?: boolean;
    speedIndex?: number;
    sliderWidth?: string;
    speedName?: Resource;
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "VideoOperate_" + ++__generate__Id;
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
import { timeConvert } from '../utils/TimeUtils';
import avPlayManage from '../videomanager/AvPlayManager';
import { SpeedDialog } from '../components/SpeedDialog';
export class VideoOperate extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__videoList = new ObservedPropertyObject([$r('app.string.video_res_1'), $r('app.string.video_res_2'), $r('app.string.video_res_3')], this, "videoList");
        this.__speedSelect = new ObservedPropertySimple(0, this, "speedSelect");
        this.__currentTime = new SynchedPropertySimpleTwoWay(params.currentTime, this, "currentTime");
        this.__durationTime = new SynchedPropertySimpleTwoWay(params.durationTime, this, "durationTime");
        this.__isSwiping = new SynchedPropertySimpleTwoWay(params.isSwiping, this, "isSwiping");
        this.__avPlayManage = new SynchedPropertyObjectTwoWay(params.avPlayManage, this, "avPlayManage");
        this.__flag = new SynchedPropertySimpleTwoWay(params.flag, this, "flag");
        this.__XComponentFlag = new SynchedPropertySimpleTwoWay(params.XComponentFlag, this, "XComponentFlag");
        this.__speedIndex = AppStorage.SetAndLink('speedIndex', 0, this, "speedIndex");
        this.__sliderWidth = AppStorage.SetAndLink('sliderWidth', '', this, "sliderWidth");
        this.__speedName = AppStorage.SetAndLink('speedName', $r('app.string.video_speed_1_0X'), this, "speedName");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new SpeedDialog("2", this, { speedSelect: this.__speedSelect });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            alignment: DialogAlignment.Bottom,
            offset: { dx: $r('app.float.size_zero'), dy: $r('app.float.size_down_20') }
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: VideoOperate_Params) {
        if (params.videoList !== undefined) {
            this.videoList = params.videoList;
        }
        if (params.speedSelect !== undefined) {
            this.speedSelect = params.speedSelect;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__videoList.aboutToBeDeleted();
        this.__speedSelect.aboutToBeDeleted();
        this.__currentTime.aboutToBeDeleted();
        this.__durationTime.aboutToBeDeleted();
        this.__isSwiping.aboutToBeDeleted();
        this.__avPlayManage.aboutToBeDeleted();
        this.__flag.aboutToBeDeleted();
        this.__XComponentFlag.aboutToBeDeleted();
        this.__speedIndex.aboutToBeDeleted();
        this.__sliderWidth.aboutToBeDeleted();
        this.__speedName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __videoList: ObservedPropertyObject<Resource[]>;
    get videoList() {
        return this.__videoList.get();
    }
    set videoList(newValue: Resource[]) {
        this.__videoList.set(newValue);
    }
    private __speedSelect: ObservedPropertySimple<number>; // 倍速选择
    get speedSelect() {
        return this.__speedSelect.get();
    }
    set speedSelect(newValue: number) {
        this.__speedSelect.set(newValue);
    }
    private __currentTime: SynchedPropertySimpleTwoWay<number>;
    get currentTime() {
        return this.__currentTime.get();
    }
    set currentTime(newValue: number) {
        this.__currentTime.set(newValue);
    }
    private __durationTime: SynchedPropertySimpleTwoWay<number>;
    get durationTime() {
        return this.__durationTime.get();
    }
    set durationTime(newValue: number) {
        this.__durationTime.set(newValue);
    }
    private __isSwiping: SynchedPropertySimpleTwoWay<boolean>;
    get isSwiping() {
        return this.__isSwiping.get();
    }
    set isSwiping(newValue: boolean) {
        this.__isSwiping.set(newValue);
    }
    private __avPlayManage: SynchedPropertySimpleOneWay<avPlayManage>;
    get avPlayManage() {
        return this.__avPlayManage.get();
    }
    set avPlayManage(newValue: avPlayManage) {
        this.__avPlayManage.set(newValue);
    }
    private __flag: SynchedPropertySimpleTwoWay<boolean>;
    get flag() {
        return this.__flag.get();
    }
    set flag(newValue: boolean) {
        this.__flag.set(newValue);
    }
    private __XComponentFlag: SynchedPropertySimpleTwoWay<boolean>;
    get XComponentFlag() {
        return this.__XComponentFlag.get();
    }
    set XComponentFlag(newValue: boolean) {
        this.__XComponentFlag.set(newValue);
    }
    private __speedIndex: ObservedPropertyAbstract<number>; // 倍速索引
    get speedIndex() {
        return this.__speedIndex.get();
    }
    set speedIndex(newValue: number) {
        this.__speedIndex.set(newValue);
    }
    private __sliderWidth: ObservedPropertyAbstract<string>;
    get sliderWidth() {
        return this.__sliderWidth.get();
    }
    set sliderWidth(newValue: string) {
        this.__sliderWidth.set(newValue);
    }
    private __speedName: ObservedPropertyAbstract<Resource>;
    get speedName() {
        return this.__speedName.get();
    }
    set speedName(newValue: Resource) {
        this.__speedName.set(newValue);
    }
    private dialogController: CustomDialogController;
    render() {
        Row.create();
        Row.justifyContent(FlexAlign.Center);
        Row.padding({ left: $r('app.float.size_25'), right: $r('app.float.size_30') });
        Row.width('100%');
        Row.create();
        Image.create(this.flag ? $r("app.media.ic_video_play") : $r("app.media.ic_video_pause"));
        Image.id('play');
        Image.width($r('app.float.size_40'));
        Image.height($r('app.float.size_40'));
        Image.onClick(() => {
            if (this.flag) {
                this.avPlayManage.videoPause();
                this.flag = false;
            }
            else {
                this.avPlayManage.videoPlay();
                this.flag = true;
            }
        });
        // 左侧时间
        Text.create(timeConvert(this.currentTime));
        // 左侧时间
        Text.fontColor(Color.White);
        // 左侧时间
        Text.textAlign(TextAlign.End);
        // 左侧时间
        Text.fontWeight(FontWeight.Regular);
        // 左侧时间
        Text.margin({ left: $r('app.float.size_10') });
        // 左侧时间
        Text.pop();
        Row.pop();
        Row.create();
        Row.layoutWeight(1);
        Slider.create({
            value: this.currentTime,
            min: 0,
            max: this.durationTime,
            style: SliderStyle.OutSet
        });
        Slider.id('Slider');
        Slider.blockColor(Color.White);
        Slider.trackColor(Color.Gray);
        Slider.selectedColor($r("app.color.slider_selected"));
        Slider.showTips(false);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            if (mode == SliderChangeMode.Begin) {
                this.isSwiping = true;
                this.avPlayManage.videoPause();
            }
            this.avPlayManage.videoSeek(value);
            this.currentTime = value;
            if (mode == SliderChangeMode.End) {
                this.isSwiping = false;
                this.flag = true;
                this.avPlayManage.videoPlay();
            }
        });
        Row.pop();
        Row.create();
        // 右侧时间
        Text.create(timeConvert(this.durationTime));
        // 右侧时间
        Text.fontColor(Color.White);
        // 右侧时间
        Text.fontWeight(FontWeight.Regular);
        // 右侧时间
        Text.pop();
        Button.createWithLabel(this.speedName, { type: ButtonType.Normal });
        Button.border({ width: $r('app.float.size_1'), color: Color.White });
        Button.width($r('app.float.size_75'));
        Button.height($r('app.float.size_40'));
        Button.fontSize($r('app.float.size_15'));
        Button.borderRadius($r('app.float.size_24'));
        Button.fontColor(Color.White);
        Button.backgroundColor(Color.Black);
        Button.opacity($r('app.float.size_1'));
        Button.margin({ left: $r('app.float.size_10') });
        Button.id('Speed');
        Button.onClick(() => {
            this.speedSelect = this.speedIndex;
            this.dialogController.open();
        });
        Button.pop();
        Row.pop();
        Row.pop();
    }
}
