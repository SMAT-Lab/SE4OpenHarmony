interface StoragePropAbilityPage_Params {
    title?: Resource;
    minFontSize?: number;
    currentModelStatus?: boolean;
    contentFontSize?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "StoragePropAbilityPage_" + ++__generate__Id;
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
import { CodeView } from '../../../commoncomponents/CodeView';
import { ViewCodeText } from '../../../commoncomponents/ViewCodeText';
import { TitleBarDark } from '../../../commoncomponents/TitleBarDark';
import { TitleBar } from '../../../commoncomponents/TitleBar';
class StoragePropAbilityPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__title = new ObservedPropertyObject($r('app.string.abilityone_page'), this, "title");
        this.minFontSize = 10;
        this.__currentModelStatus = AppStorage.SetAndLink('currentModelStatus', true, this, "currentModelStatus");
        this.__contentFontSize = AppStorage.SetAndProp('contentFontSize', 18, this, "contentFontSize");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: StoragePropAbilityPage_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.minFontSize !== undefined) {
            this.minFontSize = params.minFontSize;
        }
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        this.__currentModelStatus.aboutToBeDeleted();
        this.__contentFontSize.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __title: ObservedPropertyObject<Resource>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: Resource) {
        this.__title.set(newValue);
    }
    // 初始化字体大小最小值
    private minFontSize: number;
    // 和主页、Ability2页面双向同步夜间模式状态
    private __currentModelStatus: ObservedPropertyAbstract<boolean>;
    get currentModelStatus() {
        return this.__currentModelStatus.get();
    }
    set currentModelStatus(newValue: boolean) {
        this.__currentModelStatus.set(newValue);
    }
    // 和主页、Ability2页面单向同步内容字体大小
    private __contentFontSize: ObservedPropertyAbstract<number>;
    get contentFontSize() {
        return this.__contentFontSize.get();
    }
    set contentFontSize(newValue: number) {
        this.__contentFontSize.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor(this.currentModelStatus ? $r('app.color.nightnode_color') : $r('app.color.background_shallow_grey'));
        If.create();
        if (this.currentModelStatus) {
            If.branchId(0);
            let earlierCreatedChild_2: TitleBarDark = (this && this.findChildById) ? this.findChildById("2") as TitleBarDark : undefined;
            if (earlierCreatedChild_2 == undefined) {
                View.create(new TitleBarDark("2", this, { title: this.__title, isAbility: true }));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({
                    isAbility: true
                });
                View.create(earlierCreatedChild_2);
            }
        }
        else {
            If.branchId(1);
            let earlierCreatedChild_3: TitleBar = (this && this.findChildById) ? this.findChildById("3") as TitleBar : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new TitleBar("3", this, { title: this.__title, isAbility: true }));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({
                    isAbility: true
                });
                View.create(earlierCreatedChild_3);
            }
        }
        If.pop();
        let earlierCreatedChild_5: CodeView = (this && this.findChildById) ? this.findChildById("5") as CodeView : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new CodeView("5", this, {
                title: this.__title, isShowTitle: false,
                contentView: () => {
                    Column.create({ space: 20 });
                    Column.padding($r('app.float.page_padding'));
                    let earlierCreatedChild_4: ViewCodeText = (this && this.findChildById) ? this.findChildById("4") as ViewCodeText : undefined;
                    if (earlierCreatedChild_4 == undefined) {
                        // 查看源码
                        View.create(new ViewCodeText("4", this, { webSrc: { "id": 0, "type": 30000, params: ['StoragePropAbilityPage.ets.html'] } }));
                    }
                    else {
                        earlierCreatedChild_4.updateWithValueParams({
                            webSrc: { "id": 0, "type": 30000, params: ['StoragePropAbilityPage.ets.html'] }
                        });
                        View.create(earlierCreatedChild_4);
                    }
                    Text.create($r('app.string.both_data_binding'));
                    Text.fontSize(this.contentFontSize);
                    Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'));
                    Text.width('100%');
                    Text.textAlign(TextAlign.Center);
                    Text.pop();
                    Text.create($r('app.string.single_data_binding'));
                    Text.fontSize(this.contentFontSize);
                    Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'));
                    Text.width('100%');
                    Text.textAlign(TextAlign.Center);
                    Text.pop();
                    Button.createWithChild();
                    Button.id('storagePropAbilityPage');
                    Button.padding($r('app.float.page_padding'));
                    Button.type(ButtonType.Capsule);
                    Button.backgroundColor($r('app.color.button_background_color'));
                    Button.onClick(() => {
                        // 更新控制夜间模式状态的变量数据，@StorageLink和@StorageProp关联的数据变量刷新
                        this.currentModelStatus = !this.currentModelStatus;
                    });
                    Text.create(this.currentModelStatus ? $r('app.string.close_nightmode') : $r('app.string.start_nightmode'));
                    Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.button_text_color'));
                    Text.fontSize(this.contentFontSize);
                    Text.width('60%');
                    Text.textAlign(TextAlign.Center);
                    Text.pop();
                    Button.pop();
                    Text.create($r('app.string.nigntmode_both_binding'));
                    Text.fontSize(this.contentFontSize);
                    Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'));
                    Text.width('100%');
                    Text.textAlign(TextAlign.Center);
                    Text.pop();
                    // slider模块控制字体大小
                    Column.create();
                    // slider模块控制字体大小
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
                        // 更新控制字体大小的变量数据，@StorageLink关联的数据变量不刷新同步
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
                    // slider模块控制字体大小
                    Column.pop();
                    Text.create($r('app.string.single_fontsize_binding'));
                    Text.fontSize(this.contentFontSize);
                    Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'));
                    Text.width('100%');
                    Text.margin({
                        bottom: $r('app.float.margin_bottom')
                    });
                    Text.textAlign(TextAlign.Center);
                    Text.pop();
                    Column.pop();
                }
            }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                isShowTitle: false,
                contentView: () => {
                    Column.create({ space: 20 });
                    Column.padding($r('app.float.page_padding'));
                    let earlierCreatedChild_4: ViewCodeText = (this && this.findChildById) ? this.findChildById("4") as ViewCodeText : undefined;
                    if (earlierCreatedChild_4 == undefined) {
                        // 查看源码
                        View.create(new ViewCodeText("4", this, { webSrc: { "id": 0, "type": 30000, params: ['StoragePropAbilityPage.ets.html'] } }));
                    }
                    else {
                        earlierCreatedChild_4.updateWithValueParams({
                            webSrc: { "id": 0, "type": 30000, params: ['StoragePropAbilityPage.ets.html'] }
                        });
                        View.create(earlierCreatedChild_4);
                    }
                    Text.create($r('app.string.both_data_binding'));
                    Text.fontSize(this.contentFontSize);
                    Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'));
                    Text.width('100%');
                    Text.textAlign(TextAlign.Center);
                    Text.pop();
                    Text.create($r('app.string.single_data_binding'));
                    Text.fontSize(this.contentFontSize);
                    Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'));
                    Text.width('100%');
                    Text.textAlign(TextAlign.Center);
                    Text.pop();
                    Button.createWithChild();
                    Button.id('storagePropAbilityPage');
                    Button.padding($r('app.float.page_padding'));
                    Button.type(ButtonType.Capsule);
                    Button.backgroundColor($r('app.color.button_background_color'));
                    Button.onClick(() => {
                        // 更新控制夜间模式状态的变量数据，@StorageLink和@StorageProp关联的数据变量刷新
                        this.currentModelStatus = !this.currentModelStatus;
                    });
                    Text.create(this.currentModelStatus ? $r('app.string.close_nightmode') : $r('app.string.start_nightmode'));
                    Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.button_text_color'));
                    Text.fontSize(this.contentFontSize);
                    Text.width('60%');
                    Text.textAlign(TextAlign.Center);
                    Text.pop();
                    Button.pop();
                    Text.create($r('app.string.nigntmode_both_binding'));
                    Text.fontSize(this.contentFontSize);
                    Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'));
                    Text.width('100%');
                    Text.textAlign(TextAlign.Center);
                    Text.pop();
                    // slider模块控制字体大小
                    Column.create();
                    // slider模块控制字体大小
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
                        // 更新控制字体大小的变量数据，@StorageLink关联的数据变量不刷新同步
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
                    // slider模块控制字体大小
                    Column.pop();
                    Text.create($r('app.string.single_fontsize_binding'));
                    Text.fontSize(this.contentFontSize);
                    Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'));
                    Text.width('100%');
                    Text.margin({
                        bottom: $r('app.float.margin_bottom')
                    });
                    Text.textAlign(TextAlign.Center);
                    Text.pop();
                    Column.pop();
                }
            });
            View.create(earlierCreatedChild_5);
        }
        Column.pop();
    }
    aboutToDisappear(): void {
        AppStorage.setOrCreate('sideBarShow', false);
    }
}
loadDocument(new StoragePropAbilityPage("1", undefined, {}));
