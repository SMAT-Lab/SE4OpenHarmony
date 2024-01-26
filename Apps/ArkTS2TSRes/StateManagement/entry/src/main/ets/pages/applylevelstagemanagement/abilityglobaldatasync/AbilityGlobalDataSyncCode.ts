interface AbilityGlobalDataSyncCode_Params {
    minFontSize?: number;
    contentFontSize?: number;
    currentModelStatus?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AbilityGlobalDataSyncCode_" + ++__generate__Id;
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
import common from '@ohos.app.ability.common';
import { ViewCodeText } from '../../../commoncomponents/ViewCodeText';
import { startSpecifiedAbility } from '../../../utils/StartAbilityUtils';
// 声明一个上下文信息
const CONTEXT: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
export class AbilityGlobalDataSyncCode extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.minFontSize = 10;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AbilityGlobalDataSyncCode_Params) {
        if (params.minFontSize !== undefined) {
            this.minFontSize = params.minFontSize;
        }
    }
    aboutToBeDeleted() {
        this.__contentFontSize.aboutToBeDeleted();
        this.__currentModelStatus.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 初始化字体大小最小值
    private minFontSize: number;
    // 和主页、Page1、Page2双向同步内容字体大小
    private __contentFontSize: ObservedPropertyAbstract<number> = this.localStorage_.setAndLink<number>('contentFontSize', 18, this, "contentFontSize");
    get contentFontSize() {
        return this.__contentFontSize.get();
    }
    set contentFontSize(newValue: number) {
        this.__contentFontSize.set(newValue);
    }
    // 和主页、Page1、Page2双向同步夜间模式状态
    private __currentModelStatus: ObservedPropertyAbstract<boolean> = this.localStorage_.setAndLink<boolean>('currentModelStatus', true, this, "currentModelStatus");
    get currentModelStatus() {
        return this.__currentModelStatus.get();
    }
    set currentModelStatus(newValue: boolean) {
        this.__currentModelStatus.set(newValue);
    }
    render() {
        Column.create({ space: 10 });
        Column.width('100%');
        Column.padding(10);
        let earlierCreatedChild_2: ViewCodeText = (this && this.findChildById) ? this.findChildById("2") as ViewCodeText : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 查看源码
            View.create(new ViewCodeText("2", this, { webSrc: { "id": 0, "type": 30000, params: ['AbilityGlobalDataSyncCode.ets.html'] } }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                webSrc: { "id": 0, "type": 30000, params: ['AbilityGlobalDataSyncCode.ets.html'] }
            });
            View.create(earlierCreatedChild_2);
        }
        Row.create();
        Row.justifyContent(FlexAlign.SpaceAround);
        Row.width('70%');
        Row.border({ radius: 50, color: Color.Grey, width: $r('app.float.border_width') });
        Text.create($r('app.string.nightmode'));
        Text.fontSize(this.contentFontSize);
        Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'));
        Text.pop();
        // 控制夜间模式
        Toggle.create({ type: ToggleType.Switch, isOn: this.currentModelStatus });
        // 控制夜间模式
        Toggle.id('abilityGlobalDataSyncCode');
        // 控制夜间模式
        Toggle.selectedColor(Color.Blue);
        // 控制夜间模式
        Toggle.switchPointColor(Color.White);
        // 控制夜间模式
        Toggle.onChange((isOn: boolean) => {
            // 更新控制夜间模式状态的变量数据，@StorageLink和@StorageLink关联的数据变量刷新
            this.currentModelStatus = isOn;
        });
        // 控制夜间模式
        Toggle.pop();
        Row.pop();
        Text.create($r('app.string.ability_storage_nightmodelsync'));
        Text.fontSize(this.contentFontSize);
        Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'));
        Text.textAlign(TextAlign.Center);
        Text.pop();
        // slider滑动模块控制字体大小
        Column.create();
        // slider滑动模块控制字体大小
        Column.margin({ top: 50 });
        Text.create($r('app.string.fontSize_text'));
        Text.fontSize(this.contentFontSize);
        Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'));
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Row.create();
        Row.width('80%');
        Text.create(`${this.minFontSize}`);
        Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'));
        Text.fontSize($r('app.float.tips_font_size'));
        Text.pop();
        Slider.create({
            value: this.contentFontSize,
            min: 10,
            max: 30,
            style: SliderStyle.OutSet
        });
        Slider.showTips(true);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            // 更新控制字体大小状态的变量数据，@LocalStorageLink和@LocalStorageProp关联的数据变量刷新
            this.contentFontSize = value;
        });
        // toFixed(0)将滑动条返回值处理为整数精度
        Text.create(this.contentFontSize.toFixed(0));
        // toFixed(0)将滑动条返回值处理为整数精度
        Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'));
        // toFixed(0)将滑动条返回值处理为整数精度
        Text.fontSize($r('app.float.tips_font_size'));
        // toFixed(0)将滑动条返回值处理为整数精度
        Text.pop();
        Row.pop();
        // slider滑动模块控制字体大小
        Column.pop();
        Text.create($r('app.string.ability_storage_fontsizesync'));
        Text.fontSize(this.contentFontSize);
        Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'));
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.createWithChild();
        Button.id('enterPageOne');
        Button.type(ButtonType.Capsule);
        Button.backgroundColor($r('app.color.button_background_color'));
        Button.padding($r('app.float.page_padding'));
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/applylevelstagemanagement/abilityglobaldatasync/LocalStoragePropPage' });
        });
        Text.create($r('app.string.enter_pageone'));
        Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.button_text_color'));
        Text.fontSize(this.contentFontSize);
        Text.width('60%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.id('enterPageTwo');
        Button.type(ButtonType.Capsule);
        Button.backgroundColor($r('app.color.button_background_color'));
        Button.padding($r('app.float.page_padding'));
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/applylevelstagemanagement/abilityglobaldatasync/LocalStorageLinkPage' });
        });
        Text.create($r('app.string.enter_pagetwo'));
        Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.button_text_color'));
        Text.fontSize(this.contentFontSize);
        Text.width('60%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Divider.create();
        Divider.width('100%');
        Divider.strokeWidth(1);
        Button.createWithChild();
        Button.id('enterOutOfAbility');
        Button.type(ButtonType.Capsule);
        Button.backgroundColor($r('app.color.button_background_color'));
        Button.padding($r('app.float.page_padding'));
        Button.onClick(() => {
            startSpecifiedAbility(CONTEXT, 'OutOfSyncAbility');
        });
        Text.create($r('app.string.enter_ability_outofsync'));
        Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.button_text_color'));
        Text.fontSize(this.contentFontSize);
        Text.width('60%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Column.pop();
    }
}
