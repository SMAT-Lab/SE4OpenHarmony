interface Meeting_chat_setting_Params {
    allList?: Array<string>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "meeting_chat_setting_" + ++__generate__Id;
}
/**
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * This software is distributed under a license. The full license
 * agreement can be found in the file LICENSE in this distribution.
 * This software may not be copied, modified, sold or distributed
 * other than expressed in the named license agreement.
 *
 * This software is distributed without any warranty.
 */
import { Toolbar } from '../../base/toolbar';
import router from '@ohos.router';
class Meeting_chat_setting extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__allList = new ObservedPropertyObject([], this, "allList");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Meeting_chat_setting_Params) {
        if (params.allList !== undefined) {
            this.allList = params.allList;
        }
    }
    aboutToBeDeleted() {
        this.__allList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __allList: ObservedPropertyObject<Array<string>>;
    get allList() {
        return this.__allList.get();
    }
    set allList(newValue: Array<string>) {
        this.__allList.set(newValue);
    }
    aboutToAppear() {
        this.onGetAllMeetingMember();
    }
    // todo 查看所有会议成员
    onGetAllMeetingMember() {
        this.allList.push('花花');
        this.allList.push('娜娜');
        this.allList.push('丽丽');
        this.allList.push('木木');
        this.allList.push('贱贱');
    }
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.backgroundColor('#ececec');
        let earlierCreatedChild_2: Toolbar = (this && this.findChildById) ? this.findChildById("2") as Toolbar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Toolbar("2", this, {
                title: '会议成员',
                isBack: true
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: '会议成员',
                isBack: true
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        List.create();
        ForEach.create("3", this, ObservedObject.GetRawObject(this.allList), (item: string) => {
            ListItem.create();
            Text.create(item);
            Text.padding(13);
            Text.backgroundColor('#ffffff');
            Text.fontSize(18);
            Text.width('100%');
            Text.margin({ bottom: 1 });
            Text.pop();
            ListItem.pop();
        }, (item: string) => JSON.stringify(item));
        ForEach.pop();
        List.pop();
        Flex.pop();
    }
}
loadDocument(new Meeting_chat_setting("1", undefined, {}));
