interface Add_group_Params {
    groupName?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "add_group_" + ++__generate__Id;
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
class Add_group extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__groupName = new ObservedPropertySimple('', this, "groupName");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Add_group_Params) {
        if (params.groupName !== undefined) {
            this.groupName = params.groupName;
        }
    }
    aboutToBeDeleted() {
        this.__groupName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __groupName: ObservedPropertySimple<string>;
    get groupName() {
        return this.__groupName.get();
    }
    set groupName(newValue: string) {
        this.__groupName.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.backgroundColor('#ffffff');
        Flex.borderRadius(10);
        let earlierCreatedChild_2: Toolbar = (this && this.findChildById) ? this.findChildById("2") as Toolbar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Toolbar("2", this, {
                title: '创建好友分组',
                isBack: true
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: '创建好友分组',
                isBack: true
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Flex.create({ direction: FlexDirection.Column });
        Flex.padding(30);
        Text.create('分组名称');
        Text.fontSize(30);
        Text.padding(10);
        Text.pop();
        TextInput.create({ text: this.groupName, placeholder: '请输入' });
        TextInput.height(80);
        TextInput.fontSize(30);
        TextInput.onChange(v => {
            this.groupName = v;
        });
        Button.createWithLabel('创 建');
        Button.height(80);
        Button.fontSize(30);
        Button.onClick(e => {
            this.onAddGroup();
        });
        Button.margin({ top: 20 });
        Button.pop();
        Flex.pop();
        Flex.pop();
    }
    // todo 创建好友分组
    onAddGroup() {
        if (this.groupName == '') {
            prompt.showToast({
                message: '请输入完整'
            });
        }
        else {
            Smack.createGroup(this.groupName + '@' + Constant.HOST_IP);
            prompt.showToast({
                message: '已创建'
            });
        }
    }
}
loadDocument(new Add_group("1", undefined, {}));
