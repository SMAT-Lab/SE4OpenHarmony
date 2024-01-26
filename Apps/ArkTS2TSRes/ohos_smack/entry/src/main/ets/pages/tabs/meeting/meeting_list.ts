interface CustomDialogExample_Params {
    controller?: CustomDialogController;
}
interface TextDialog_Params {
    controller?: CustomDialogController;
}
interface Meeting_list_Params {
    dialogController?: CustomDialogController;
    textDialogController?: CustomDialogController;
    meetingsList?: Array<string>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "meeting_list_" + ++__generate__Id;
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
export class Meeting_list extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogExample("4", this, {});
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            customStyle: true,
            alignment: DialogAlignment.TopEnd,
            offset: { dx: -20, dy: 50 }
        }, this);
        this.textDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new TextDialog("5", this, {});
                jsDialog.setController(this.textDialogController);
                View.create(jsDialog);
            },
            customStyle: true,
            alignment: DialogAlignment.Center
        }, this);
        this.__meetingsList = new ObservedPropertyObject([], this, "meetingsList");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Meeting_list_Params) {
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
        if (params.textDialogController !== undefined) {
            this.textDialogController = params.textDialogController;
        }
        if (params.meetingsList !== undefined) {
            this.meetingsList = params.meetingsList;
        }
    }
    aboutToBeDeleted() {
        this.__meetingsList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private dialogController: CustomDialogController;
    private textDialogController: CustomDialogController;
    private __meetingsList: ObservedPropertyObject<Array<string>>;
    get meetingsList() {
        return this.__meetingsList.get();
    }
    set meetingsList(newValue: Array<string>) {
        this.__meetingsList.set(newValue);
    }
    aboutToAppear() {
        this.getAllMeetings();
    }
    // todo 获取所有会议列表
    getAllMeetings() {
        for (let i = 0; i < 10; i++) {
            this.meetingsList.push('线上会议名称 ' + (i + 1));
        }
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.backgroundColor('#ececec');
        let earlierCreatedChild_2: Toolbar = (this && this.findChildById) ? this.findChildById("2") as Toolbar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Toolbar("2", this, {
                title: '会议',
                rightIcon: $r('app.media.add'),
                rightClickCallBack: () => {
                    this.dialogController.open();
                }
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: '会议',
                rightIcon: $r('app.media.add'),
                rightClickCallBack: () => {
                    this.dialogController.open();
                }
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        List.create();
        ForEach.create("3", this, ObservedObject.GetRawObject(this.meetingsList), (item: string) => {
            ListItem.create();
            ListItem.onClick(e => {
                this.textDialogController.open();
            });
            Column.create();
            Text.create(item);
            Text.fontSize(18);
            Text.padding(12);
            Text.width('100%');
            Text.textAlign(TextAlign.Start);
            Text.margin({ bottom: 1 });
            Text.backgroundColor('#ffffff');
            Text.pop();
            Column.pop();
            ListItem.pop();
        }, (item: string) => item.toString());
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
class TextDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = {} as CustomDialogController;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TextDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.padding(20);
        Flex.height(280);
        Flex.backgroundColor('#ffffff');
        Flex.borderRadius(10);
        Flex.width('80%');
        Text.create('昵称');
        Text.fontSize(15);
        Text.padding(10);
        Text.pop();
        TextInput.create();
        Text.create('密码');
        Text.fontSize(15);
        Text.padding(10);
        Text.pop();
        TextInput.create();
        Button.createWithLabel('确 定');
        Button.onClick(e => {
            this.onJoinInMeeting();
            this.controller.close();
        });
        Button.margin({ top: 20 });
        Button.pop();
        Flex.pop();
    }
    // todo 从会议列表里进入会议
    onJoinInMeeting() {
        router.push({
            url: 'pages/chat/meeting_chat/meeting_chat_main'
        });
    }
}
class CustomDialogExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = {} as CustomDialogController;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomDialogExample_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    render() {
        Column.create();
        Column.backgroundColor('#ffffff');
        Column.borderRadius(10);
        Column.width(100);
        Text.create('创建会议');
        Text.fontSize(16);
        Text.padding(10);
        Text.onClick(() => {
            router.push({
                url: 'pages/tabs/meeting/create_meeting'
            });
            if (this.controller != null) {
                this.controller.close();
            }
        });
        Text.pop();
        Text.create('');
        Text.height(1);
        Text.width('100%');
        Text.backgroundColor('#ececec');
        Text.pop();
        Text.create('加入会议');
        Text.fontSize(16);
        Text.padding(10);
        Text.onClick(() => {
            router.push({
                url: 'pages/tabs/meeting/Join_in_meeting'
            });
            if (this.controller != null) {
                this.controller.close();
            }
        });
        Text.pop();
        Column.pop();
    }
}
loadDocument(new Meeting_list("1", undefined, {}));
