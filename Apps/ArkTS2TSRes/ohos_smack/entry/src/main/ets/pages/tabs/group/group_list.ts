interface CustomDialogExample_Params {
    controller?: CustomDialogController;
}
interface Group_list_Params {
    groupList?: Array<string>;
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "group_list_" + ++__generate__Id;
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
import { Constant } from '../../../entity/Constant';
import { Smack } from '@ohos/smack';
import { GlobalContext } from '../../../entity/GlobalContext';
export class Group_list extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__groupList = new ObservedPropertyObject([], this, "groupList");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogExample("3", this, {});
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            customStyle: true,
            alignment: DialogAlignment.TopEnd,
            offset: { dx: -20, dy: 50 }
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Group_list_Params) {
        if (params.groupList !== undefined) {
            this.groupList = params.groupList;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__groupList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __groupList: ObservedPropertyObject<Array<string>>;
    get groupList() {
        return this.__groupList.get();
    }
    set groupList(newValue: Array<string>) {
        this.__groupList.set(newValue);
    }
    private dialogController: CustomDialogController;
    aboutToAppear() {
        this.getAllGroup();
    }
    // todo 获取所有群聊列表
    getAllGroup() {
        for (let i = 0; i < 10; i++) {
            this.groupList.push('群聊名称 ' + (i + 1));
        }
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor('#ffffff');
        let earlierCreatedChild_2: Toolbar = (this && this.findChildById) ? this.findChildById("2") as Toolbar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Toolbar("2", this, { title: '群聊',
                rightIcon: $r('app.media.add'),
                rightClickCallBack: () => {
                    this.dialogController.open();
                }
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: '群聊',
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
        Column.pop();
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
        Text.create('创建群聊');
        Text.fontSize(36);
        Text.padding(10);
        Text.onClick(() => {
            router.push({
                url: 'pages/tabs/group/create_group_chat'
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
        Text.create('加入群聊');
        Text.fontSize(36);
        Text.padding(10);
        Text.onClick(() => {
            router.push({
                url: 'pages/tabs/group/Join_in_group'
            });
            if (this.controller != null) {
                this.controller.close();
            }
        });
        Text.pop();
        Column.pop();
    }
}
loadDocument(new Group_list("1", undefined, {}));
