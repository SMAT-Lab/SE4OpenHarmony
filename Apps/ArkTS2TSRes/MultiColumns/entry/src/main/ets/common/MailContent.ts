interface MailContent_Params {
    buttonList?: OperateTabs[];
    currentBreakPoint?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MailContent_" + ++__generate__Id;
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
import { OperateTabs } from '../model/dataType';
export class MailContent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__buttonList = new ObservedPropertyObject([
            new OperateTabs($r('app.media.reply'), $r('app.string.reply')),
            new OperateTabs($r('app.media.replyAll'), $r('app.string.replyAll')),
            new OperateTabs($r('app.media.forward'), $r('app.string.send')),
            new OperateTabs($r('app.media.ic_public_delete'), $r('app.string.delete')),
            new OperateTabs($r('app.media.more'), $r('app.string.more')),
        ], this, "buttonList");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MailContent_Params) {
        if (params.buttonList !== undefined) {
            this.buttonList = params.buttonList;
        }
    }
    aboutToBeDeleted() {
        this.__buttonList.aboutToBeDeleted();
        this.__currentBreakPoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __buttonList: ObservedPropertyObject<OperateTabs[]>;
    get buttonList() {
        return this.__buttonList.get();
    }
    set buttonList(newValue: OperateTabs[]) {
        this.__buttonList.set(newValue);
    }
    private __currentBreakPoint: ObservedPropertyAbstract<string> = this.localStorage_.setAndProp<string>('currentBreakPoint', 'md', this, "currentBreakPoint");
    get currentBreakPoint() {
        return this.__currentBreakPoint.get();
    }
    set currentBreakPoint(newValue: string) {
        this.__currentBreakPoint.set(newValue);
    }
    render() {
        NavDestination.create();
        NavDestination.width('100%');
        NavDestination.height('100%');
        NavDestination.hideTitleBar(true);
        Column.create();
        Column.create();
        Column.layoutWeight(1);
        Column.padding({ left: 20, right: 20, top: 24 });
        Column.alignItems(HorizontalAlign.Start);
        Row.create();
        Row.width('100%');
        Row.height(56);
        If.create();
        if (this.currentBreakPoint === 'sm') {
            If.branchId(0);
            Row.create();
            Row.width(24);
            Row.height(24);
            Row.pop();
        }
        else {
            If.branchId(1);
            Image.create($r('app.media.ic_expand'));
            Image.width(24);
            Image.height(24);
        }
        If.pop();
        Text.create('HHHxx UXD');
        Text.fontSize(20);
        Text.lineHeight(23);
        Text.margin({ left: 21 });
        Text.fontWeight(FontWeight.Medium);
        Text.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.height(48);
        Text.create($r('app.string.recUser'));
        Text.fontSize(14);
        Text.fontWeight(FontWeight.Regular);
        Text.pop();
        Text.create($r('app.string.mailDesc'));
        Text.padding({ left: 12 });
        Text.fontSize(16);
        Text.fontWeight(FontWeight.Medium);
        Text.pop();
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.right_expend_grey'));
        Image.width(24);
        Image.height(12);
        Image.opacity(0.8);
        Image.rotate({ angle: 90 });
        Row.pop();
        Text.create('PostMaster');
        Text.fontSize(20);
        Text.fontColor('#040404');
        Text.lineHeight(23);
        Text.pop();
        Text.create('09:42');
        Text.margin({ top: 2 });
        Text.fontColor('#1818a');
        Text.opacity(0.6);
        Text.pop();
        Column.create();
        Column.margin({ top: 20 });
        Column.height(478);
        Column.width('100%');
        Column.alignItems(HorizontalAlign.Start);
        Text.create($r('app.string.textData'));
        Text.fontSize(16);
        Text.fontWeight(FontWeight.Regular);
        Text.lineHeight(25);
        Text.pop();
        Text.create($r('app.string.bodyTextPartOne'));
        Text.fontSize(16);
        Text.fontWeight(FontWeight.Regular);
        Text.lineHeight(25);
        Text.pop();
        Text.create('');
        Text.lineHeight(25);
        Text.pop();
        Image.create($r('app.media.orange'));
        Image.width('100%');
        Image.height(166);
        Image.borderRadius(10);
        Text.create('');
        Text.lineHeight(25);
        Text.pop();
        Text.create($r('app.string.bodyTextPartTwo'));
        Text.fontSize(16);
        Text.fontWeight(FontWeight.Regular);
        Text.lineHeight(25);
        Text.pop();
        Text.create($r('app.string.bodyTextPartThree'));
        Text.fontSize(16);
        Text.fontWeight(FontWeight.Regular);
        Text.lineHeight(25);
        Text.pop();
        Column.pop();
        Column.pop();
        Row.create();
        Row.width('100%');
        Row.height(56);
        Row.justifyContent(FlexAlign.SpaceBetween);
        Row.padding(this.currentBreakPoint === 'sm' ? { left: 21, right: 21 } : { left: 46, right: 46 });
        Row.backgroundColor('#fff');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.buttonList), (item: OperateTabs) => {
            Column.create();
            Image.create(item.src);
            Image.width(24);
            Image.height(24);
            Text.create(item.name);
            Text.fontSize(10);
            Text.margin({ top: 3 });
            Text.lineHeight(12);
            Text.pop();
            Column.pop();
        });
        ForEach.pop();
        Row.pop();
        Column.pop();
        NavDestination.pop();
    }
}
