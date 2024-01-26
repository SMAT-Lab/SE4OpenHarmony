interface Join_in_group_Params {
    room?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Join_in_group_" + ++__generate__Id;
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
import { Smack } from '@ohos/smack';
import { Constant } from '../../../entity/Constant';
import prompt from '@ohos.prompt';
class Join_in_group extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.room = '';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Join_in_group_Params) {
        if (params.room !== undefined) {
            this.room = params.room;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private room: string;
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.backgroundColor('#ffffff');
        Flex.borderRadius(10);
        let earlierCreatedChild_2: Toolbar = (this && this.findChildById) ? this.findChildById("2") as Toolbar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Toolbar("2", this, {
                title: '加入群聊',
                isBack: true
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: '加入群聊',
                isBack: true
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Flex.create({ direction: FlexDirection.Column });
        Flex.padding(30);
        Text.create('群聊名称');
        Text.fontSize(15);
        Text.padding(10);
        Text.pop();
        TextInput.create();
        TextInput.onChange((str: string) => {
            this.room = str;
        });
        Button.createWithLabel('加 入');
        Button.onClick(e => {
            if (this.room) {
                this.onJoinInGroup();
            }
            else {
                prompt.showToast({
                    message: '输入房间名称'
                });
            }
        });
        Button.margin({ top: 20 });
        Button.pop();
        Flex.pop();
        Flex.pop();
    }
    // todo 加入群聊
    onJoinInGroup() {
        Smack.createOrJoinRoom(this.room, Constant.HOST_DOMAIN, Constant.SERVICE_NAME /*, password?: string*/);
        setTimeout(() => {
            let isJoined = Smack.isJoined();
            if (isJoined == '1') {
                router.replace({
                    url: 'pages/chat/group_chat/group_chat_main'
                });
            }
            else {
                prompt.showToast({
                    message: '进入房间失败'
                });
            }
        }, 500);
    }
}
loadDocument(new Join_in_group("1", undefined, {}));
