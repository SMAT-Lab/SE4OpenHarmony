interface PassWordDialog_Params {
    controller?: CustomDialogController;
    inputStr?: string;
}
interface Create_group_chat_Params {
    inputName?: string;
    passWordDialog?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "create_group_chat_" + ++__generate__Id;
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
import prompt from '@ohos.prompt';
import { Constant } from '../../../entity/Constant';
import { Smack } from '@ohos/smack';
import { GlobalContext } from '../../../entity/GlobalContext';
class Create_group_chat extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.inputName = '';
        this.passWordDialog = new CustomDialogController({
            builder: () => {
                let jsDialog = new PassWordDialog("3", this, {});
                jsDialog.setController(this.passWordDialog);
                View.create(jsDialog);
            },
            customStyle: true,
            alignment: DialogAlignment.Center
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Create_group_chat_Params) {
        if (params.inputName !== undefined) {
            this.inputName = params.inputName;
        }
        if (params.passWordDialog !== undefined) {
            this.passWordDialog = params.passWordDialog;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private inputName: string;
    private passWordDialog: CustomDialogController;
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.backgroundColor('#ffffff');
        Flex.borderRadius(10);
        let earlierCreatedChild_2: Toolbar = (this && this.findChildById) ? this.findChildById("2") as Toolbar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Toolbar("2", this, {
                title: '创建群聊',
                isBack: true
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: '创建群聊',
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
        TextInput.onChange(v => {
            this.inputName = v;
        });
        Button.createWithLabel('创 建');
        Button.onClick(e => {
            if (this.inputName != '') {
                this.onCreateGroupChat(this.inputName);
            }
            else {
                prompt.showToast({ message: "请输入房间名" });
            }
        });
        Button.margin({ top: 20 });
        Button.pop();
        Button.createWithLabel('加入密码房');
        Button.onClick(e => {
            if (this.inputName) {
                Smack.createRoom(GlobalContext.getContext().getValue('userName') as string, this.inputName, Constant.HOST_DOMAIN, Constant.SERVICE_NAME);
                this.passWordDialog.open();
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
    // todo 创建群聊
    onCreateGroupChat(input: string) {
        Smack.createRoom(GlobalContext.getContext().getValue('userName') as string, input, Constant.HOST_DOMAIN, Constant.SERVICE_NAME);
        setTimeout(() => {
            Smack.join();
        }, 500);
        setTimeout(() => {
            if (Smack.isJoined() == '1') {
                prompt.showToast({
                    message: '房间创建成功'
                });
                router.replace({
                    url: 'pages/chat/group_chat/group_chat_main'
                });
            }
            else {
                prompt.showToast({
                    message: '进入房间失败'
                });
            }
        }, 1200);
    }
}
class PassWordDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = {} as CustomDialogController;
        this.inputStr = '';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PassWordDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.inputStr !== undefined) {
            this.inputStr = params.inputStr;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private inputStr: string;
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.padding(20);
        Flex.height(px2vp(280));
        Flex.backgroundColor('#ffffff');
        Flex.borderRadius(10);
        Flex.width('80%');
        Text.create('密码');
        Text.fontSize(15);
        Text.padding(10);
        Text.pop();
        TextInput.create();
        TextInput.onChange(v => {
            this.inputStr = v;
        });
        Button.createWithLabel('确 定');
        Button.onClick(e => {
            Smack.setPassword(this.inputStr);
            this.onJoinInMeeting();
            if (this.controller != null) {
                this.controller.close();
            }
        });
        Button.margin({ top: 20 });
        Button.pop();
        Flex.pop();
    }
    // todo 从会议列表里进入会议
    onJoinInMeeting() {
        setTimeout(() => {
            Smack.join();
            if (this.controller != null) {
                this.controller.close();
            }
            setTimeout(() => {
                if (Smack.isJoined() == '1') {
                    router.replace({
                        url: 'pages/chat/group_chat/group_chat_main'
                    });
                }
                else {
                    prompt.showToast({
                        message: '进入房间失败'
                    });
                }
            }, 1000);
        }, 500);
    }
}
loadDocument(new Create_group_chat("1", undefined, {}));
