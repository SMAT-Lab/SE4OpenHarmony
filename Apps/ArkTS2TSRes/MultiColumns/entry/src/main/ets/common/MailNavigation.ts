interface MailNavigation_Params {
    pathInfo?: NavPathStack;
    currentIndex?: number;
    mailList?: string[];
    currentBreakPoint?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MailNavigation_" + ++__generate__Id;
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
import { BreakpointType } from './BreakpointSystem';
import { MailContent } from './MailContent';
export class MailNavigation extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__pathInfo = new ObservedPropertyObject(new NavPathStack(), this, "pathInfo");
        this.__currentIndex = new ObservedPropertySimple(0, this, "currentIndex");
        this.__mailList = new ObservedPropertyObject(['1', '1', '1', '1', '1', '1'], this, "mailList");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MailNavigation_Params) {
        if (params.pathInfo !== undefined) {
            this.pathInfo = params.pathInfo;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.mailList !== undefined) {
            this.mailList = params.mailList;
        }
    }
    aboutToBeDeleted() {
        this.__pathInfo.aboutToBeDeleted();
        this.__currentIndex.aboutToBeDeleted();
        this.__mailList.aboutToBeDeleted();
        this.__currentBreakPoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __pathInfo: ObservedPropertyObject<NavPathStack>;
    get pathInfo() {
        return this.__pathInfo.get();
    }
    set pathInfo(newValue: NavPathStack) {
        this.__pathInfo.set(newValue);
    }
    private __currentIndex: ObservedPropertySimple<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private __mailList: ObservedPropertyObject<string[]>;
    get mailList() {
        return this.__mailList.get();
    }
    set mailList(newValue: string[]) {
        this.__mailList.set(newValue);
    }
    private __currentBreakPoint: ObservedPropertyAbstract<string> = this.localStorage_.setAndProp<string>('currentBreakPoint', 'md', this, "currentBreakPoint");
    get currentBreakPoint() {
        return this.__currentBreakPoint.get();
    }
    set currentBreakPoint(newValue: string) {
        this.__currentBreakPoint.set(newValue);
    }
    myRouter(name: string, param?: number | undefined, parent = null) {
        let earlierCreatedChild_2: MailContent = ((parent ? parent : this) && (parent ? parent : this).findChildById) ? (parent ? parent : this).findChildById(generateId()) as MailContent : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new MailContent("MailNavigation_" + __generate__Id, parent ? parent : this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
    }
    NavigationMenus(parent = null) {
        If.create();
        if (this.currentBreakPoint !== 'md') {
            If.branchId(0);
            Row.create();
            Row.height(56);
            Row.padding({ top: 48 });
            Image.create($r('app.media.add'));
            Image.width(24);
            Image.height(24);
            Image.create($r('app.media.more'));
            Image.width(24);
            Image.height(24);
            Image.margin({ left: 24, right: 0 });
            Row.pop();
        }
        If.pop();
    }
    NavigationTitle(parent = null) {
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.height(162);
        Column.width(138);
        Column.padding({ top: 80, left: 24 });
        Text.create($r('app.string.recvBox'));
        Text.fontColor('#000');
        Text.fontSize(30);
        Text.lineHeight(41);
        Text.fontWeight(FontWeight.Medium);
        Text.pop();
        Text.create('jiaozi@xxx.com');
        Text.fontColor('#99000000');
        Text.fontSize(14);
        Text.lineHeight(20);
        Text.margin({ top: 2 });
        Text.pop();
        Column.pop();
    }
    aboutToAppear() {
        this.pathInfo.pushPath({ name: 'one' });
    }
    render() {
        Navigation.create(this.pathInfo);
        Navigation.navBarWidth(new BreakpointType(321, 321, 390).GetValue(this.currentBreakPoint) as number | Length);
        Navigation.navDestination({ builder: this.myRouter.bind(this) });
        Navigation.menus({ builder: this.NavigationMenus.bind(this) });
        Navigation.width('100%');
        Navigation.title({ builder: this.NavigationTitle.bind(this), height: 162 });
        Navigation.hideBackButton(true);
        Stack.create({ alignContent: Alignment.Start });
        Column.create();
        Column.height('100%');
        Column.width('100%');
        Column.padding({ left: 12, right: 12 });
        Row.create();
        Row.height(56);
        Search.create({ placeholder: $r('app.string.searchMail') });
        Search.margin({ left: 12, right: 12 });
        Search.pop();
        Row.pop();
        List.create();
        List.divider({ strokeWidth: 1, startMargin: 12, endMargin: 12 });
        List.height('100%');
        List.width('100%');
        List.layoutWeight(1);
        ForEach.create("3", this, ObservedObject.GetRawObject(this.mailList), (item: string, index: number | undefined) => {
            ListItem.create();
            ListItem.padding({ left: 12, right: 12 });
            ListItem.backgroundColor(index === 2 ? '#19254ff7' : '');
            ListItem.borderRadius(10);
            Column.create();
            Column.height(96);
            Column.justifyContent(FlexAlign.Center);
            Row.create();
            Row.width('100%');
            Text.create($r('app.string.nonSense'));
            Text.fontSize(16);
            Text.lineHeight(22);
            Text.fontColor('#1818a');
            Text.pop();
            Blank.create();
            Blank.pop();
            Text.create('4/12');
            Text.fontSize(12);
            Text.opacity(0.6);
            Text.pop();
            Row.pop();
            Column.create();
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
            Text.create($r('app.string.textPartOne'));
            Text.lineHeight(19);
            Text.fontSize(14);
            Text.fontColor('#1818a');
            Text.pop();
            Text.create($r('app.string.textPartTwo'));
            Text.fontSize(14);
            Text.fontColor('#1818a');
            Text.opacity(0.6);
            Text.lineHeight(19);
            Text.pop();
            Column.pop();
            Column.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Column.pop();
        If.create();
        if (this.currentBreakPoint !== 'lg') {
            If.branchId(0);
            Image.create($r('app.media.ic_public_list_add_light'));
            Image.width(48);
            Image.height(48);
            Image.position({ x: 240, y: 549 });
        }
        If.pop();
        Stack.pop();
        Navigation.pop();
    }
}
