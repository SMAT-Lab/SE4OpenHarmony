interface Meeting_chat_main_Params {
    chatContentList?: Array<ChatContentEntity>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "meeting_chat_main_" + ++__generate__Id;
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
import { ChatContentEntity } from '../../../entity/ChatContentEntity';
class Meeting_chat_main extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__chatContentList = new ObservedPropertyObject([], this, "chatContentList");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Meeting_chat_main_Params) {
        if (params.chatContentList !== undefined) {
            this.chatContentList = params.chatContentList;
        }
    }
    aboutToBeDeleted() {
        this.__chatContentList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __chatContentList: ObservedPropertyObject<Array<ChatContentEntity>>;
    get chatContentList() {
        return this.__chatContentList.get();
    }
    set chatContentList(newValue: Array<ChatContentEntity>) {
        this.__chatContentList.set(newValue);
    }
    aboutToAppear() {
    }
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('100%');
        Flex.backgroundColor('#ececec');
        let earlierCreatedChild_2: Toolbar = (this && this.findChildById) ? this.findChildById("2") as Toolbar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Toolbar("2", this, {
                title: '120会议',
                isBack: true,
                rightIcon: $r('app.media.more'),
                rightClickCallBack: () => {
                    router.push({
                        url: "pages/chat/meeting_chat/meeting_chat_setting"
                    });
                }
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: '120会议',
                isBack: true,
                rightIcon: $r('app.media.more'),
                rightClickCallBack: () => {
                    router.push({
                        url: "pages/chat/meeting_chat/meeting_chat_setting"
                    });
                }
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Stack.create({ alignContent: Alignment.Bottom });
        List.create();
        List.margin({ bottom: 60 });
        ForEach.create("3", this, ObservedObject.GetRawObject(this.chatContentList), (item: ChatContentEntity) => {
            ListItem.create();
            ListItem.padding(10);
            Flex.create({ direction: FlexDirection.Column });
            If.create();
            if (item.isTip) {
                If.branchId(0);
                Column.create();
                Column.width('100%');
                Text.create(item.message);
                Text.fontSize(13);
                Text.textAlign(TextAlign.Center);
                Text.backgroundColor('#ffe2e2e2');
                Text.padding({ left: 10, right: 10, top: 5, bottom: 5 });
                Text.borderRadius(10);
                Text.pop();
                Column.pop();
            }
            else {
                If.branchId(1);
                Flex.create({ justifyContent: item.author == '1' ? FlexAlign.End : FlexAlign.Start });
                Flex.create({ direction: FlexDirection.Column });
                Text.create(item.author == '1' ? '我' : item.author);
                Text.fontSize(15);
                Text.padding(5);
                Text.alignSelf(item.author == '1' ? ItemAlign.End : ItemAlign.Start);
                Text.pop();
                If.create();
                if (item.messageType == 1) {
                    If.branchId(0);
                    Text.create(item.message);
                    Text.backgroundColor(item.author != '1' ? '#ffffff' : '#95ec69');
                    Text.padding({ left: 15, top: 10, right: 15, bottom: 10 });
                    Text.alignSelf(ItemAlign.End);
                    Text.fontSize(18);
                    Text.borderRadius(10);
                    Text.pop();
                }
                else if (item.messageType == 2) {
                    If.branchId(1);
                    Image.create(item.message);
                    Image.objectFit(ImageFit.Cover);
                    Image.width('50%');
                }
                If.pop();
                Flex.pop();
                Flex.pop();
            }
            If.pop();
            Flex.pop();
            ListItem.pop();
        }, (item: ChatContentEntity) => JSON.stringify(item));
        ForEach.pop();
        List.pop();
        Flex.create({ direction: FlexDirection.Row, justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
        Flex.height(60);
        Flex.width('100%');
        Flex.padding({ left: 15, right: 15 });
        Flex.backgroundColor('#ffffff');
        TextInput.create({ placeholder: '请输入' });
        Button.createWithLabel('发 送');
        Button.width(100);
        Button.margin({ left: 8 });
        Button.onClick(e => {
            this.onSendMeetingMessage();
        });
        Button.pop();
        Flex.pop();
        Stack.pop();
        Flex.pop();
    }
    // todo 发送会议信息
    onSendMeetingMessage() {
    }
}
loadDocument(new Meeting_chat_main("1", undefined, {}));
