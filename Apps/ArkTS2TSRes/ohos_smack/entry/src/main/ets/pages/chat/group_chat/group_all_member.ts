interface Group_all_member_Params {
    allList?: Array<GroupUserEntity>;
    adminList?: Array<string>;
    roomName?: string;
    memberNumber?: number;
    IsBatch?: boolean;
    rightTxt?: string;
    ownerList?: Array<string>;
    userName?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "group_all_member_" + ++__generate__Id;
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
import { MUCOperation } from '@ohos/smack';
import { GroupUserEntity } from '../../../entity/GroupUserEntity';
import { Smack } from '@ohos/smack';
import { GlobalContext } from '../../../entity/GlobalContext';
import prompt from '@ohos.prompt';
class Group_all_member extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__allList = new ObservedPropertyObject([], this, "allList");
        this.__adminList = new ObservedPropertyObject([], this, "adminList");
        this.__roomName = new ObservedPropertySimple('', this, "roomName");
        this.__memberNumber = new ObservedPropertySimple(0, this, "memberNumber");
        this.__IsBatch = new ObservedPropertySimple(false, this, "IsBatch");
        this.__rightTxt = new ObservedPropertySimple('批量操作', this, "rightTxt");
        this.ownerList = [];
        this.userName = '';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Group_all_member_Params) {
        if (params.allList !== undefined) {
            this.allList = params.allList;
        }
        if (params.adminList !== undefined) {
            this.adminList = params.adminList;
        }
        if (params.roomName !== undefined) {
            this.roomName = params.roomName;
        }
        if (params.memberNumber !== undefined) {
            this.memberNumber = params.memberNumber;
        }
        if (params.IsBatch !== undefined) {
            this.IsBatch = params.IsBatch;
        }
        if (params.rightTxt !== undefined) {
            this.rightTxt = params.rightTxt;
        }
        if (params.ownerList !== undefined) {
            this.ownerList = params.ownerList;
        }
        if (params.userName !== undefined) {
            this.userName = params.userName;
        }
    }
    aboutToBeDeleted() {
        this.__allList.aboutToBeDeleted();
        this.__adminList.aboutToBeDeleted();
        this.__roomName.aboutToBeDeleted();
        this.__memberNumber.aboutToBeDeleted();
        this.__IsBatch.aboutToBeDeleted();
        this.__rightTxt.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __allList: ObservedPropertyObject<Array<GroupUserEntity>>;
    get allList() {
        return this.__allList.get();
    }
    set allList(newValue: Array<GroupUserEntity>) {
        this.__allList.set(newValue);
    }
    private __adminList: ObservedPropertyObject<Array<string>>;
    get adminList() {
        return this.__adminList.get();
    }
    set adminList(newValue: Array<string>) {
        this.__adminList.set(newValue);
    }
    private __roomName: ObservedPropertySimple<string>;
    get roomName() {
        return this.__roomName.get();
    }
    set roomName(newValue: string) {
        this.__roomName.set(newValue);
    }
    private __memberNumber: ObservedPropertySimple<number>;
    get memberNumber() {
        return this.__memberNumber.get();
    }
    set memberNumber(newValue: number) {
        this.__memberNumber.set(newValue);
    }
    private __IsBatch: ObservedPropertySimple<boolean>;
    get IsBatch() {
        return this.__IsBatch.get();
    }
    set IsBatch(newValue: boolean) {
        this.__IsBatch.set(newValue);
    }
    private __rightTxt: ObservedPropertySimple<string>;
    get rightTxt() {
        return this.__rightTxt.get();
    }
    set rightTxt(newValue: string) {
        this.__rightTxt.set(newValue);
    }
    private ownerList: Array<string>;
    private userName: string;
    aboutToAppear() {
        this.userName = GlobalContext.getContext().getValue('userName').toString().split('@')[0];
        this.onGetAllMemberFriends();
        this.onGetAllAdminFriends();
        this.onGetAllOwnerList();
    }
    //是否是管理员
    isAdmin(): boolean {
        if (this.adminList && this.adminList.length > 0) {
            for (let i = 0; i < this.adminList.length; i++) {
                let user = this.adminList[i].split("@")[0];
                if (user == this.userName) {
                    return true;
                }
            }
        }
        return false;
    }
    //是否是拥有者
    isOwner(): boolean {
        if (this.ownerList && this.ownerList.length > 0) {
            for (let i = 0; i < this.ownerList.length; i++) {
                let user = this.ownerList[i].split("@")[0];
                if (user == this.userName) {
                    return true;
                }
            }
        }
        return false;
    }
    //是否可以执行操作
    isOprationer(): boolean {
        return this.isOwner() || this.isAdmin();
    }
    //获取房屋拥有者列表
    onGetAllOwnerList() {
        this.ownerList = [];
        let roomitems = Smack.requestList(MUCOperation.RequestOwnerList);
        if (roomitems) {
            let items: Array<any> = JSON.parse(roomitems);
            for (let index = 0; index < items.length; index++) {
                let str: string = items[index].jid.replace(" ", "");
                this.ownerList.push(str);
            }
        }
    }
    // todo 查看所有群成员
    onGetAllMemberFriends() {
        this.allList = [];
        let roomitems: Array<any> = JSON.parse(Smack.getRoomItems());
        if (roomitems) {
            for (let index = 0; index < roomitems.length; index++) {
                let str: string = roomitems[index].room.replace(" ", "");
                str = str.substr(str.lastIndexOf("/") + 1, str.length - 1);
                this.allList.push({ name: str, isCheck: 0 });
                this.memberNumber = this.allList.length;
            }
        }
    }
    // todo 查看所有群管理
    onGetAllAdminFriends() {
        this.adminList = [];
        let roomitems = Smack.requestList(MUCOperation.RequestAdminList);
        if (roomitems) {
            let items: Array<any> = JSON.parse(roomitems);
            for (let index = 0; index < items.length; index++) {
                let str: string = items[index].jid.replace(" ", "");
                this.adminList.push(str);
            }
        }
    }
    onGetOperations(): Array<GroupUserEntity> {
        let users: Array<GroupUserEntity> = [];
        for (let index = 0; index < this.allList.length; index++) {
            const element = this.allList[index];
            if (element.isCheck == 1) {
                users.push(element);
            }
        }
        return users;
    }
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.backgroundColor('#ececec');
        let earlierCreatedChild_2: Toolbar = (this && this.findChildById) ? this.findChildById("2") as Toolbar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Toolbar("2", this, {
                title: '群成员',
                isBack: true,
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: '群成员',
                isBack: true
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Text.create("管理员");
        Text.width('100%');
        Text.fontSize(18);
        Text.alignSelf(ItemAlign.Center);
        Text.backgroundColor(Color.White);
        Text.height(40);
        Text.padding({ left: 20 });
        Text.pop();
        List.create();
        ForEach.create("3", this, ObservedObject.GetRawObject(this.adminList), (item: string) => {
            ListItem.create();
            Text.create(item);
            Text.padding(13);
            Text.backgroundColor('#ffffff');
            Text.fontSize(18);
            Text.width('100%');
            Text.margin({ top: 1 });
            Text.onClick(v => {
                if (!this.isOwner()) {
                    prompt.showToast({
                        message: '非拥有者不可操作'
                    });
                    return;
                }
                router.push({
                    url: 'pages/chat/group_chat/group_member',
                    params: { userData: [item] }
                });
            });
            Text.pop();
            ListItem.pop();
        }, (item: string) => JSON.stringify(item));
        ForEach.pop();
        List.pop();
        Row.create();
        Text.create("成员 (" + this.memberNumber + ")");
        Text.width('60%');
        Text.fontSize(18);
        Text.alignSelf(ItemAlign.Center);
        Text.backgroundColor(Color.White);
        Text.height(40);
        Text.padding({ left: 20 });
        Text.pop();
        Text.create(this.IsBatch ? "完成" : "批量操作");
        Text.height(40);
        Text.padding({ right: 20 });
        Text.fontSize(18);
        Text.backgroundColor(Color.White);
        Text.width('40%');
        Text.alignSelf(ItemAlign.Center);
        Text.textAlign(TextAlign.End);
        Text.onClick(v => {
            if (!this.isOprationer()) {
                prompt.showToast({
                    message: '非拥有者和管理员不可操作'
                });
                return;
            }
            if (this.IsBatch) {
                let users: Array<GroupUserEntity> = this.onGetOperations();
                if (users && users.length > 0) {
                    router.push({
                        url: 'pages/chat/group_chat/group_member',
                        params: { userData: users }
                    });
                }
            }
            this.IsBatch = !this.IsBatch;
        });
        Text.pop();
        Row.pop();
        List.create();
        ForEach.create("4", this, ObservedObject.GetRawObject(this.allList), (item: GroupUserEntity) => {
            ListItem.create();
            ListItem.backgroundColor('#ffffff');
            Row.create();
            If.create();
            if (this.IsBatch) {
                If.branchId(0);
                Checkbox.create({ name: 'checkbox2', group: 'checkboxGroup' });
                Checkbox.select(false);
                Checkbox.selectedColor(0x39a2db);
                Checkbox.onChange((value: boolean) => {
                    console.info('Checkbox2 change is' + value);
                    item.isCheck = value ? 1 : 0;
                });
                Checkbox.pop();
            }
            If.pop();
            Text.create(item.name);
            Text.padding(13);
            Text.fontSize(18);
            Text.width('100%');
            Text.margin({ top: 1 });
            Text.onClick(v => {
                if (!this.isOprationer()) {
                    prompt.showToast({
                        message: '非拥有者和管理员不可操作'
                    });
                    return;
                }
                router.push({
                    url: 'pages/chat/group_chat/group_member',
                    params: { userData: [item] }
                });
            });
            Text.pop();
            Row.pop();
            ListItem.pop();
        }, (item: GroupUserEntity) => JSON.stringify(item));
        ForEach.pop();
        List.pop();
        Flex.pop();
    }
}
loadDocument(new Group_all_member("1", undefined, {}));
