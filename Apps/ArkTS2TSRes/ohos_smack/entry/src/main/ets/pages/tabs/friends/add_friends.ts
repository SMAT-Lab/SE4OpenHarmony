interface Add_friends_Params {
    name?: string;
    group?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "add_friends_" + ++__generate__Id;
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
class Add_friends extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__name = new ObservedPropertySimple('', this, "name");
        this.__group = new ObservedPropertySimple('', this, "group");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Add_friends_Params) {
        if (params.name !== undefined) {
            this.name = params.name;
        }
        if (params.group !== undefined) {
            this.group = params.group;
        }
    }
    aboutToBeDeleted() {
        this.__name.aboutToBeDeleted();
        this.__group.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __name: ObservedPropertySimple<string>;
    get name() {
        return this.__name.get();
    }
    set name(newValue: string) {
        this.__name.set(newValue);
    }
    private __group: ObservedPropertySimple<string>;
    get group() {
        return this.__group.get();
    }
    set group(newValue: string) {
        this.__group.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.backgroundColor('#ffffff');
        Flex.borderRadius(10);
        let earlierCreatedChild_2: Toolbar = (this && this.findChildById) ? this.findChildById("2") as Toolbar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Toolbar("2", this, {
                title: '添加好友',
                isBack: true
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: '添加好友',
                isBack: true
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Flex.create({ direction: FlexDirection.Column });
        Flex.padding(30);
        Text.create('名称');
        Text.fontSize(30);
        Text.padding(10);
        Text.pop();
        TextInput.create({ text: this.name });
        TextInput.height(80);
        TextInput.fontSize(30);
        TextInput.onChange(value => {
            this.name = value;
        });
        Text.create('分组');
        Text.fontSize(30);
        Text.padding(10);
        Text.pop();
        TextInput.create({ text: this.group });
        TextInput.height(80);
        TextInput.fontSize(30);
        TextInput.onChange(value => {
            this.group = value;
        });
        Button.createWithLabel('添 加');
        Button.height(80);
        Button.fontSize(30);
        Button.onClick(e => {
            this.onAddFriends();
        });
        Button.margin({ top: 20 });
        Button.pop();
        Flex.pop();
        Flex.pop();
    }
    // todo 添加好友
    onAddFriends() {
        if (this.name == '' || this.group == '') {
            prompt.showToast({
                message: '请输入完整'
            });
        }
        else {
            Smack.addFriends(this.name + "@" + Constant.HOST_DOMAIN, this.name, this.group);
            prompt.showToast({
                message: '已发送好友请求'
            });
        }
    }
}
loadDocument(new Add_friends("1", undefined, {}));
