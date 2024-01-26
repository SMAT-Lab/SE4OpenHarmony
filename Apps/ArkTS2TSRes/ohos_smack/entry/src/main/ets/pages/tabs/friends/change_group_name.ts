interface Change_group_name_Params {
    oldName?: string;
    newName?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "change_group_name_" + ++__generate__Id;
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
import { Smack } from '@ohos/smack';
class Change_group_name extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__oldName = new ObservedPropertySimple('', this, "oldName");
        this.__newName = new ObservedPropertySimple('', this, "newName");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Change_group_name_Params) {
        if (params.oldName !== undefined) {
            this.oldName = params.oldName;
        }
        if (params.newName !== undefined) {
            this.newName = params.newName;
        }
    }
    aboutToBeDeleted() {
        this.__oldName.aboutToBeDeleted();
        this.__newName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __oldName: ObservedPropertySimple<string>;
    get oldName() {
        return this.__oldName.get();
    }
    set oldName(newValue: string) {
        this.__oldName.set(newValue);
    }
    private __newName: ObservedPropertySimple<string>;
    get newName() {
        return this.__newName.get();
    }
    set newName(newValue: string) {
        this.__newName.set(newValue);
    }
    aboutToAppear() {
        this.oldName = (router.getParams() as Record<string, Object>)['name'] as string;
    }
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.backgroundColor('#ffffff');
        Flex.borderRadius(10);
        let earlierCreatedChild_2: Toolbar = (this && this.findChildById) ? this.findChildById("2") as Toolbar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Toolbar("2", this, {
                title: '修改分组名称',
                isBack: true
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: '修改分组名称',
                isBack: true
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Flex.create({ direction: FlexDirection.Column });
        Flex.padding(30);
        Text.create('原始名称：' + this.oldName);
        Text.fontSize(30);
        Text.padding(10);
        Text.pop();
        Text.create('新的名称');
        Text.fontSize(30);
        Text.padding(10);
        Text.pop();
        TextInput.create({ placeholder: "请输入" });
        TextInput.height(80);
        TextInput.fontSize(30);
        TextInput.onChange(value => {
            this.newName = value;
        });
        Button.createWithLabel('修 改');
        Button.height(80);
        Button.fontSize(30);
        Button.onClick(e => {
            this.onChangeName();
        });
        Button.margin({ top: 20 });
        Button.pop();
        Flex.pop();
        Flex.pop();
    }
    // todo 修改分组名称
    onChangeName() {
        if (this.newName == '') {
            prompt.showToast({
                message: '请输入完整'
            });
        }
        else {
            Smack.changeGroup(this.oldName, this.newName);
            prompt.showToast({
                message: '已修改'
            });
        }
    }
}
loadDocument(new Change_group_name("1", undefined, {}));
