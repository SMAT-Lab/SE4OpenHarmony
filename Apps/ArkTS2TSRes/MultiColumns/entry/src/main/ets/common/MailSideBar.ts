interface MailStatusList_Params {
    mailState?: MailType[];
}
interface AccountInfo_Params {
    accountList?: string[];
}
interface MailSideBar_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MailSideBar_" + ++__generate__Id;
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
import { MailType } from '../model/dataType';
function __Text__TextStyle(): void {
    Text.backgroundColor('#254ff7');
    Text.fontColor('#fff');
    Text.fontSize(10);
    Text.textAlign(TextAlign.Center);
}
export class MailSideBar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MailSideBar_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Column.width('100%');
        let earlierCreatedChild_2: AccountInfo = (this && this.findChildById) ? this.findChildById("2") as AccountInfo : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new AccountInfo("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: MailStatusList = (this && this.findChildById) ? this.findChildById("3") as MailStatusList : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new MailStatusList("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
    }
}
class AccountInfo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__accountList = new ObservedPropertyObject([
            'jiaozi@xxx.com',
            'jiaozi@163.com',
        ], this, "accountList");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AccountInfo_Params) {
        if (params.accountList !== undefined) {
            this.accountList = params.accountList;
        }
    }
    aboutToBeDeleted() {
        this.__accountList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __accountList: ObservedPropertyObject<string[]>;
    get accountList() {
        return this.__accountList.get();
    }
    set accountList(newValue: string[]) {
        this.__accountList.set(newValue);
    }
    accountInfo(parent = null) {
        Column.create();
        Column.margin({ top: 78 });
        Column.padding({ left: 16, right: 16 });
        Row.create();
        Row.width('100%');
        Row.height(48);
        Text.create($r('app.string.account'));
        Text.fontSize(14);
        Text.fontColor($r('sys.color.ohos_id_color_text_secondary'));
        Text.fontWeight(FontWeight.Medium);
        Text.pop();
        Blank.create();
        Blank.pop();
        Text.create($r('app.string.addAccount'));
        Text.fontSize(14);
        Text.fontColor('#0a59f7');
        Text.fontWeight(FontWeight.Medium);
        Text.pop();
        Row.pop();
        Column.pop();
    }
    render() {
        Column.create();
        this.accountInfo(this);
        List.create();
        List.width('100%');
        List.height('100%');
        List.padding({ left: 16, right: 16 });
        List.divider({ strokeWidth: 1 });
        ForEach.create("4", this, ObservedObject.GetRawObject(this.accountList), (item: string, index: number | undefined) => {
            ListItem.create();
            Row.create();
            Row.width('100%');
            Row.height(56);
            Text.create();
            Text.width(12);
            Text.height(12);
            Text.borderRadius(8);
            Text.backgroundColor(index === 0 ? '#61cfbe' : '#fec700');
            Text.pop();
            Text.create(item);
            Text.fontSize(16);
            Text.fontColor(index === 0 ? '#000' : '#E5000000');
            Text.margin({ left: 13 });
            Text.pop();
            Blank.create();
            Blank.pop();
            If.create();
            if (index === 0) {
                If.branchId(0);
                Image.create($r('app.media.ic_confirm'));
                Image.width(16);
                Image.height(16);
                Image.fillColor('#244ff7');
            }
            else {
                If.branchId(1);
                Text.create('9');
                Text.width(18);
                Text.height(18);
                Text.borderRadius(18);
                __Text__TextStyle();
                Text.pop();
            }
            If.pop();
            Row.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
class MailStatusList extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__mailState = new ObservedPropertyObject([
            new MailType($r('app.string.recvBox'), 3, $r('app.media.inbox')),
            new MailType($r('app.string.unRead'), 5, $r('app.media.unread')),
            new MailType($r('app.string.sended'), 9, $r('app.media.ic_favourites')),
            new MailType($r('app.string.allFolders'), 0, $r('app.media.allFolders'))
        ], this, "mailState");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MailStatusList_Params) {
        if (params.mailState !== undefined) {
            this.mailState = params.mailState;
        }
    }
    aboutToBeDeleted() {
        this.__mailState.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __mailState: ObservedPropertyObject<MailType[]>;
    get mailState() {
        return this.__mailState.get();
    }
    set mailState(newValue: MailType[]) {
        this.__mailState.set(newValue);
    }
    accountInfo(parent = null) {
        Column.create();
        Row.create();
        Row.width('100%');
        Row.height(48);
        Text.create($r('app.string.account'));
        Text.fontSize(14);
        Text.pop();
        Blank.create();
        Blank.pop();
        Text.create($r('app.string.addAccount'));
        Text.fontSize(14);
        Text.fontColor('#0a59f7');
        Text.pop();
        Row.pop();
        Column.pop();
    }
    render() {
        List.create();
        List.width('100%');
        List.height('100%');
        List.padding({ left: 7, right: 7 });
        List.margin({ top: 8 });
        List.divider({ strokeWidth: 1, startMargin: 12, endMargin: 12 });
        ListItem.create();
        ListItem.padding({ left: 9, right: 9 });
        this.accountInfo(this);
        ListItem.pop();
        ForEach.create("5", this, ObservedObject.GetRawObject(this.mailState), (item: MailType, index: number | undefined) => {
            ListItem.create();
            ListItem.padding({ left: 14, right: 24 });
            ListItem.height(56);
            ListItem.backgroundColor(index === 0 ? '#19254ff7' : '');
            ListItem.borderRadius(16);
            Row.create();
            Row.width('100%');
            Image.create(item.src);
            Image.width(24);
            Image.height(24);
            Text.create(item.type);
            Text.fontSize(16);
            Text.margin({ left: 16 });
            Text.fontColor(index === 0 ? '#000' : '#e5000000');
            Text.fontWeight(FontWeight.Medium);
            Text.pop();
            Blank.create();
            Blank.pop();
            If.create();
            if (index === this.mailState.length - 1) {
                If.branchId(0);
                Image.create($r('app.media.ic_settings_arrow'));
                Image.width(12);
                Image.height(24);
                Image.rotate({ angle: 90 });
            }
            else {
                If.branchId(1);
                Text.create(item.num.toString());
                Text.fontColor('#18181a');
                Text.fontSize(14);
                Text.pop();
            }
            If.pop();
            Row.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
    }
}
