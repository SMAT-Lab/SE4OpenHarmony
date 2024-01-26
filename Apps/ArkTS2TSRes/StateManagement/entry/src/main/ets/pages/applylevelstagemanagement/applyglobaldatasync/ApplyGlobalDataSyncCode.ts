interface ApplyGlobalDataSyncCode_Params {
    contentFontSize?: number;
    currentModelStatus?: boolean;
    minFontSize?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ApplyGlobalDataSyncCode_" + ++__generate__Id;
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
import common from '@ohos.app.ability.common';
import { ViewCodeText } from '../../../commoncomponents/ViewCodeText';
import { startSpecifiedAbility } from '../../../utils/StartAbilityUtils';
// 声明一个上下文信息
const CONTEXT: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
export default class ApplyGlobalDataSyncCode extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__contentFontSize = AppStorage.SetAndLink('contentFontSize', 18, this, "contentFontSize");
        this.__currentModelStatus = AppStorage.SetAndLink('currentModelStatus', true, this, "currentModelStatus");
        this.minFontSize = 10;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ApplyGlobalDataSyncCode_Params) {
        if (params.minFontSize !== undefined) {
            this.minFontSize = params.minFontSize;
        }
    }
    aboutToBeDeleted() {
        this.__contentFontSize.aboutToBeDeleted();
        this.__currentModelStatus.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 和Ability1、Ability2页面双向同步内容字体大小
    private __contentFontSize: ObservedPropertyAbstract<number>;
    get contentFontSize() {
        return this.__contentFontSize.get();
    }
    set contentFontSize(newValue: number) {
        this.__contentFontSize.set(newValue);
    }
    // 和Ability1、Ability2页面双向同步夜间模式状态
    private __currentModelStatus: ObservedPropertyAbstract<boolean>;
    get currentModelStatus() {
        return this.__currentModelStatus.get();
    }
    set currentModelStatus(newValue: boolean) {
        this.__currentModelStatus.set(newValue);
    }
    // 初始化字体大小最小值
    private minFontSize: number;
    render() {
        Column.create({ space: 10 });
        Column.padding($r('app.float.page_padding'));
        let earlierCreatedChild_2: ViewCodeText = (this && this.findChildById) ? this.findChildById("2") as ViewCodeText : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 查看源码
            View.create(new ViewCodeText("2", this, { webSrc: { "id": 0, "type": 30000, params: ['ApplyGlobalDataSyncCode.ets.html'] } }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                webSrc: { "id": 0, "type": 30000, params: ['ApplyGlobalDataSyncCode.ets.html'] }
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
        // 开发控制夜间模式
        Toggle.create({ type: ToggleType.Switch, isOn: this.currentModelStatus });
        // 开发控制夜间模式
        Toggle.id('applyGlobalDataSyncCode');
        // 开发控制夜间模式
        Toggle.selectedColor(Color.Blue);
        // 开发控制夜间模式
        Toggle.switchPointColor(Color.White);
        // 开发控制夜间模式
        Toggle.onChange((isOn: boolean) => {
            // 更新控制夜间模式状态的变量数据，@StorageLink和@StorageLink关联的数据变量刷新
            this.currentModelStatus = isOn;
            AppStorage.setOrCreate<boolean>('currentModelStatus', this.currentModelStatus);
        });
        // 开发控制夜间模式
        Toggle.pop();
        Row.pop();
        Text.create($r('app.string.nightmode_text'));
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
            min: this.minFontSize,
            max: 30,
            style: SliderStyle.OutSet
        });
        Slider.showTips(true);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            // 更新控制字体大小状态的变量数据，@StorageLink和@StorageProp关联的数据变量刷新
            this.contentFontSize = value;
            AppStorage.setOrCreate<number>('contentFontSize', this.contentFontSize);
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
        Text.create($r('app.string.fontSize_singlesync_textone'));
        Text.fontSize(this.contentFontSize);
        Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'));
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.createWithChild();
        Button.id('enterAbilityOne');
        Button.type(ButtonType.Capsule);
        Button.backgroundColor($r('app.color.button_background_color'));
        Button.padding($r('app.float.page_padding'));
        Button.onClick(() => {
            startSpecifiedAbility(CONTEXT, 'StoragePropAbility');
        });
        Text.create($r('app.string.enter_abilityone'));
        Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.button_text_color'));
        Text.fontSize(this.contentFontSize);
        Text.width('60%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.id('enterAbilityTwo');
        Button.type(ButtonType.Capsule);
        Button.backgroundColor($r('app.color.button_background_color'));
        Button.padding($r('app.float.page_padding'));
        Button.onClick(() => {
            startSpecifiedAbility(CONTEXT, 'StorageLinkAbility');
        });
        Text.create($r('app.string.enter_abilitytwo'));
        Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.button_text_color'));
        Text.fontSize(this.contentFontSize);
        Text.width('60%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Column.pop();
    }
}
