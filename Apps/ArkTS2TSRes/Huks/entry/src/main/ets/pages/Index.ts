interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
export class Flag {
    public static value: number = 0;
    public static set(v: number): void {
        Flag.value = v;
    }
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    NavigationTitle(parent = null) {
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Text.create($r('app.string.module_desc'));
        Text.fontColor('#182431');
        Text.fontSize(20);
        Text.lineHeight(25);
        Text.fontWeight(700);
        Text.pop();
        Column.pop();
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor('#F1F1F1');
        Navigation.create();
        Navigation.title({ builder: this.NavigationTitle.bind(this), height: 56 });
        Navigation.titleMode(NavigationTitleMode.Mini);
        Navigation.hideTitleBar(false);
        Navigation.hideToolBar(true);
        Navigation.hideBackButton(true);
        Stack.create({ alignContent: Alignment.Center });
        Stack.height('94%');
        Column.create();
        Column.width('100%');
        Column.height('296vp');
        Column.justifyContent(FlexAlign.End);
        GridRow.create();
        GridRow.margin({ left: 24, right: 24 });
        GridCol.create({ span: { xs: 12, sm: 12, md: 12, lg: 12 } });
        Column.create();
        Button.createWithChild();
        Button.id('new_key');
        Button.borderRadius(20);
        Button.type(ButtonType.Capsule);
        Button.width('100%');
        Button.height('40vp');
        Button.margin({ bottom: 16 });
        Button.backgroundColor('#007DFF');
        Button.onClick(() => {
            Flag.set(1);
            router.pushUrl({
                url: 'pages/SelectPage'
            });
        });
        Text.create($r('app.string.new_key'));
        Text.fontSize(16);
        Text.fontWeight(500);
        Text.lineHeight(22);
        Text.fontColor('#FFFFFF');
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.borderRadius(20);
        Button.id('old_key');
        Button.type(ButtonType.Capsule);
        Button.margin({ left: 24, right: 24 });
        Button.margin({ bottom: 16 });
        Button.width('100%');
        Button.height('40vp');
        Button.backgroundColor('#007DFF');
        Button.onClick(() => {
            Flag.set(2);
            router.pushUrl({
                url: 'pages/SelectPage'
            });
        });
        Text.create($r('app.string.old_key'));
        Text.fontSize(16);
        Text.fontWeight(500);
        Text.lineHeight(22);
        Text.fontColor('#FFFFFF');
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.borderRadius(20);
        Button.id('min_access_control');
        Button.type(ButtonType.Capsule);
        Button.margin({ left: 24, right: 24 });
        Button.margin({ bottom: 16 });
        Button.width('100%');
        Button.height('40vp');
        Button.backgroundColor('#007DFF');
        Button.onClick(() => {
            Flag.set(3);
            router.pushUrl({
                url: 'pages/SelectPage'
            });
        });
        Text.create($r('app.string.min_access_control'));
        Text.fontSize(16);
        Text.fontWeight(500);
        Text.lineHeight(22);
        Text.fontColor('#FFFFFF');
        Text.pop();
        Button.pop();
        Column.pop();
        GridCol.pop();
        GridRow.pop();
        Column.pop();
        Stack.pop();
        Navigation.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
