interface AbilityOutOfSyncPage_Params {
    isAbility?: boolean;
    title?: Resource;
    currentModelStatus?: boolean;
    contentFontSize?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AbilityOutOfSyncPage_" + ++__generate__Id;
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
let storage: LocalStorage = LocalStorage.GetShared();
class AbilityOutOfSyncPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isAbility = new ObservedPropertySimple(true, this, "isAbility");
        this.__title = new ObservedPropertyObject($r('app.string.localStorage_abilitytitle'), this, "title");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AbilityOutOfSyncPage_Params) {
        if (params.isAbility !== undefined) {
            this.isAbility = params.isAbility;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
    }
    aboutToBeDeleted() {
        this.__isAbility.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        this.__currentModelStatus.aboutToBeDeleted();
        this.__contentFontSize.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 判断是否关联ability的变量
    private __isAbility: ObservedPropertySimple<boolean>;
    get isAbility() {
        return this.__isAbility.get();
    }
    set isAbility(newValue: boolean) {
        this.__isAbility.set(newValue);
    }
    private __title: ObservedPropertyObject<Resource>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: Resource) {
        this.__title.set(newValue);
    }
    // 和主页、Page1、Page2不同步夜间模式状态
    private __currentModelStatus: ObservedPropertyAbstract<boolean> = this.localStorage_.setAndLink<boolean>('currentModelStatus', true, this, "currentModelStatus");
    get currentModelStatus() {
        return this.__currentModelStatus.get();
    }
    set currentModelStatus(newValue: boolean) {
        this.__currentModelStatus.set(newValue);
    }
    // 和主页、Page1、Page2不同步内容字体大小
    private __contentFontSize: ObservedPropertyAbstract<number> = this.localStorage_.setAndLink<number>('contentFontSize', 18, this, "contentFontSize");
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
                    Column.create({ space: 30 });
                    Column.height('100%');
                    Column.padding($r('app.float.page_padding'));
                    let earlierCreatedChild_4: ViewCodeText = (this && this.findChildById) ? this.findChildById("4") as ViewCodeText : undefined;
                    if (earlierCreatedChild_4 == undefined) {
                        // 查看源码
                        View.create(new ViewCodeText("4", this, { webSrc: { "id": 0, "type": 30000, params: ['AbilityOutOfSyncPage.ets.html'] } }));
                    }
                    else {
                        earlierCreatedChild_4.updateWithValueParams({
                            webSrc: { "id": 0, "type": 30000, params: ['AbilityOutOfSyncPage.ets.html'] }
                        });
                        View.create(earlierCreatedChild_4);
                    }
                    Text.create($r('app.string.localStorage_both_data_binding'));
                    Text.fontSize(this.contentFontSize);
                    Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'));
                    Text.width('100%');
                    Text.textAlign(TextAlign.Center);
                    Text.pop();
                    Text.create($r('app.string.localStorage_single_data_binding'));
                    Text.fontSize(this.contentFontSize);
                    Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'));
                    Text.width('100%');
                    Text.textAlign(TextAlign.Center);
                    Text.pop();
                    Text.create($r('app.string.enter_ability_outofsync_text'));
                    Text.fontSize(this.contentFontSize);
                    Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'));
                    Text.width('100%');
                    Text.textAlign(TextAlign.Center);
                    Text.pop();
                    Button.createWithChild();
                    Button.id('nightModeSwitchFour');
                    Button.type(ButtonType.Capsule);
                    Button.backgroundColor($r('app.color.button_background_color'));
                    Button.padding($r('app.float.page_padding'));
                    Button.onClick(() => {
                        // 更新控制夜间模式状态的变量数据，@LocalStorageLink和@LocalStorageProp关联的数据变量刷新
                        this.currentModelStatus = !this.currentModelStatus;
                    });
                    Text.create(this.currentModelStatus ? $r('app.string.close_nightmode') : $r('app.string.start_nightmode'));
                    Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.button_text_color'));
                    Text.fontSize(this.contentFontSize);
                    Text.width('60%');
                    Text.textAlign(TextAlign.Center);
                    Text.pop();
                    Button.pop();
                    Column.pop();
                }
            }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                isShowTitle: false,
                contentView: () => {
                    Column.create({ space: 30 });
                    Column.height('100%');
                    Column.padding($r('app.float.page_padding'));
                    let earlierCreatedChild_4: ViewCodeText = (this && this.findChildById) ? this.findChildById("4") as ViewCodeText : undefined;
                    if (earlierCreatedChild_4 == undefined) {
                        // 查看源码
                        View.create(new ViewCodeText("4", this, { webSrc: { "id": 0, "type": 30000, params: ['AbilityOutOfSyncPage.ets.html'] } }));
                    }
                    else {
                        earlierCreatedChild_4.updateWithValueParams({
                            webSrc: { "id": 0, "type": 30000, params: ['AbilityOutOfSyncPage.ets.html'] }
                        });
                        View.create(earlierCreatedChild_4);
                    }
                    Text.create($r('app.string.localStorage_both_data_binding'));
                    Text.fontSize(this.contentFontSize);
                    Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'));
                    Text.width('100%');
                    Text.textAlign(TextAlign.Center);
                    Text.pop();
                    Text.create($r('app.string.localStorage_single_data_binding'));
                    Text.fontSize(this.contentFontSize);
                    Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'));
                    Text.width('100%');
                    Text.textAlign(TextAlign.Center);
                    Text.pop();
                    Text.create($r('app.string.enter_ability_outofsync_text'));
                    Text.fontSize(this.contentFontSize);
                    Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.tips_font_color'));
                    Text.width('100%');
                    Text.textAlign(TextAlign.Center);
                    Text.pop();
                    Button.createWithChild();
                    Button.id('nightModeSwitchFour');
                    Button.type(ButtonType.Capsule);
                    Button.backgroundColor($r('app.color.button_background_color'));
                    Button.padding($r('app.float.page_padding'));
                    Button.onClick(() => {
                        // 更新控制夜间模式状态的变量数据，@LocalStorageLink和@LocalStorageProp关联的数据变量刷新
                        this.currentModelStatus = !this.currentModelStatus;
                    });
                    Text.create(this.currentModelStatus ? $r('app.string.close_nightmode') : $r('app.string.start_nightmode'));
                    Text.fontColor(this.currentModelStatus ? $r('app.color.color_white') : $r('app.color.button_text_color'));
                    Text.fontSize(this.contentFontSize);
                    Text.width('60%');
                    Text.textAlign(TextAlign.Center);
                    Text.pop();
                    Button.pop();
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
loadDocument(new AbilityOutOfSyncPage("1", undefined, {}, storage));
