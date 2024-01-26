interface group_all_member_Params {
    isAdministrator?: boolean;
    isMember?: boolean;
    isOwner?: boolean;
    isBanned?: boolean;
    isCompere?: boolean;
    states?: string[];
    select?: number;
    users?: Array<GroupUserEntity>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "group_member_" + ++__generate__Id;
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
import { ItemText } from '../../base/ItemText';
import { MUCRoomAffiliation, MUCRoomRole } from '@ohos/smack';
import { PresenceRoomType } from '@ohos/smack';
import router from '@ohos.router';
import { GroupUserEntity } from '../../../entity/GroupUserEntity';
import { Smack } from '@ohos/smack';
class group_all_member extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isAdministrator = new ObservedPropertySimple(false //是否为管理员
        , this, "isAdministrator");
        this.__isMember = new ObservedPropertySimple(false //是否为会员
        , this, "isMember");
        this.__isOwner = new ObservedPropertySimple(false //是否为群主
        , this, "isOwner");
        this.__isBanned = new ObservedPropertySimple(false //是否禁言
        , this, "isBanned");
        this.__isCompere = new ObservedPropertySimple(false //是否为主持人
        , this, "isCompere");
        this.states = ['在线', '空闲', '离开', '请勿打扰', '长时间离开', '离线'];
        this.__select = new ObservedPropertySimple(0, this, "select");
        this.__users = new ObservedPropertyObject([]
        // todo 设置用户在线状态
        , this, "users");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: group_all_member_Params) {
        if (params.isAdministrator !== undefined) {
            this.isAdministrator = params.isAdministrator;
        }
        if (params.isMember !== undefined) {
            this.isMember = params.isMember;
        }
        if (params.isOwner !== undefined) {
            this.isOwner = params.isOwner;
        }
        if (params.isBanned !== undefined) {
            this.isBanned = params.isBanned;
        }
        if (params.isCompere !== undefined) {
            this.isCompere = params.isCompere;
        }
        if (params.states !== undefined) {
            this.states = params.states;
        }
        if (params.select !== undefined) {
            this.select = params.select;
        }
        if (params.users !== undefined) {
            this.users = params.users;
        }
    }
    aboutToBeDeleted() {
        this.__isAdministrator.aboutToBeDeleted();
        this.__isMember.aboutToBeDeleted();
        this.__isOwner.aboutToBeDeleted();
        this.__isBanned.aboutToBeDeleted();
        this.__isCompere.aboutToBeDeleted();
        this.__select.aboutToBeDeleted();
        this.__users.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isAdministrator: ObservedPropertySimple<boolean>; //是否为管理员
    get isAdministrator() {
        return this.__isAdministrator.get();
    }
    set isAdministrator(newValue: boolean) {
        this.__isAdministrator.set(newValue);
    }
    private __isMember: ObservedPropertySimple<boolean>; //是否为会员
    get isMember() {
        return this.__isMember.get();
    }
    set isMember(newValue: boolean) {
        this.__isMember.set(newValue);
    }
    private __isOwner: ObservedPropertySimple<boolean>; //是否为群主
    get isOwner() {
        return this.__isOwner.get();
    }
    set isOwner(newValue: boolean) {
        this.__isOwner.set(newValue);
    }
    private __isBanned: ObservedPropertySimple<boolean>; //是否禁言
    get isBanned() {
        return this.__isBanned.get();
    }
    set isBanned(newValue: boolean) {
        this.__isBanned.set(newValue);
    }
    private __isCompere: ObservedPropertySimple<boolean>; //是否为主持人
    get isCompere() {
        return this.__isCompere.get();
    }
    set isCompere(newValue: boolean) {
        this.__isCompere.set(newValue);
    }
    private states: string[];
    private __select: ObservedPropertySimple<number>;
    get select() {
        return this.__select.get();
    }
    set select(newValue: number) {
        this.__select.set(newValue);
    }
    private __users: ObservedPropertyObject<Array<GroupUserEntity>>;
    get users() {
        return this.__users.get();
    }
    set users(newValue: Array<GroupUserEntity>) {
        this.__users.set(newValue);
    }
    // todo 设置用户在线状态
    private onSetOnLineState() {
        let presenceType: PresenceRoomType = PresenceRoomType.Available;
        let state = 'Available';
        if (this.select == 0) {
            state = 'Available';
            presenceType = PresenceRoomType.Available;
        }
        else if (this.select == 1) {
            state = 'Chat';
            presenceType = PresenceRoomType.Chat;
        }
        else if (this.select == 2) {
            state = 'Away';
            presenceType = PresenceRoomType.Away;
        }
        else if (this.select == 3) {
            state = 'DND';
            presenceType = PresenceRoomType.DND;
        }
        else if (this.select == 4) {
            state = 'XA';
            presenceType = PresenceRoomType.XA;
        }
        else if (this.select == 5) {
            state = 'Unavailable';
            presenceType = PresenceRoomType.Unavailable;
        }
        Smack.setPresence(presenceType, state);
    }
    public aboutToAppear() {
        this.users = (router.getParams() as Record<string, Object>)['userData'] as Array<GroupUserEntity>;
    }
    public getUsers(): string {
        let str = "";
        for (let i = 0; i < this.users.length; i++) {
            let item = this.users[i];
            str = str.concat(item.name);
            if (i != this.users.length - 1)
                str = str.concat(",");
        }
        return str;
    }
    render() {
        Column.create();
        let earlierCreatedChild_2: Toolbar = (this && this.findChildById) ? this.findChildById("2") as Toolbar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Toolbar("2", this, {
                title: '',
                isBack: true
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: '',
                isBack: true
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Row.create();
        Row.height(100);
        Row.margin({ left: 20, top: 20 });
        List.create({});
        List.width('100%');
        List.listDirection(Axis.Horizontal);
        ForEach.create("3", this, ObservedObject.GetRawObject(this.users), (item: GroupUserEntity) => {
            ListItem.create();
            ListItem.editable(true);
            Row.create();
            Image.create($r('app.media.app_icon'));
            Image.height(60);
            Image.width(60);
            Image.borderRadius(10);
            Text.create(item.name);
            Text.padding(13);
            Text.backgroundColor('#ffffff');
            Text.fontSize(18);
            Text.pop();
            Row.pop();
            ListItem.pop();
        }, (item: GroupUserEntity) => item.name);
        ForEach.pop();
        List.pop();
        Row.pop();
        let earlierCreatedChild_4: ItemText = (this && this.findChildById) ? this.findChildById("4") as ItemText : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new ItemText("4", this, { title: "踢出群聊", clickEvent: () => {
                    if (this.users.length == 1) {
                        Smack.kick(this.users[0].name, "kick");
                    }
                    else {
                        Smack.bans(this.getUsers(), "bans");
                    }
                    router.back();
                } }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                title: "踢出群聊", clickEvent: () => {
                    if (this.users.length == 1) {
                        Smack.kick(this.users[0].name, "kick");
                    }
                    else {
                        Smack.bans(this.getUsers(), "bans");
                    }
                    router.back();
                }
            });
            if (!earlierCreatedChild_4.needsUpdate()) {
                earlierCreatedChild_4.markStatic();
            }
            View.create(earlierCreatedChild_4);
        }
        let earlierCreatedChild_5: ItemText = (this && this.findChildById) ? this.findChildById("5") as ItemText : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new ItemText("5", this, { title: "加入黑名单", clickEvent: () => {
                    Smack.ban(this.users[0].name, "ban");
                } }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                title: "加入黑名单", clickEvent: () => {
                    Smack.ban(this.users[0].name, "ban");
                }
            });
            if (!earlierCreatedChild_5.needsUpdate()) {
                earlierCreatedChild_5.markStatic();
            }
            View.create(earlierCreatedChild_5);
        }
        If.create();
        if (this.isCompere) {
            If.branchId(0);
            let earlierCreatedChild_6: ItemText = (this && this.findChildById) ? this.findChildById("6") as ItemText : undefined;
            if (earlierCreatedChild_6 == undefined) {
                View.create(new ItemText("6", this, { title: "撤销设为主持人", clickEvent: () => {
                        this.isCompere = !this.isCompere;
                        if (this.users.length > 1) {
                            Smack.setRoles(this.getUsers(), MUCRoomRole.RoleParticipant, "RoleParticipant");
                        }
                        else {
                            Smack.setRole(this.users[0].name, MUCRoomRole.RoleParticipant, "RoleParticipant");
                        }
                    } }));
            }
            else {
                earlierCreatedChild_6.updateWithValueParams({
                    title: "撤销设为主持人", clickEvent: () => {
                        this.isCompere = !this.isCompere;
                        if (this.users.length > 1) {
                            Smack.setRoles(this.getUsers(), MUCRoomRole.RoleParticipant, "RoleParticipant");
                        }
                        else {
                            Smack.setRole(this.users[0].name, MUCRoomRole.RoleParticipant, "RoleParticipant");
                        }
                    }
                });
                if (!earlierCreatedChild_6.needsUpdate()) {
                    earlierCreatedChild_6.markStatic();
                }
                View.create(earlierCreatedChild_6);
            }
        }
        else {
            If.branchId(1);
            let earlierCreatedChild_7: ItemText = (this && this.findChildById) ? this.findChildById("7") as ItemText : undefined;
            if (earlierCreatedChild_7 == undefined) {
                View.create(new ItemText("7", this, { title: "设为主持人", clickEvent: () => {
                        this.isCompere = !this.isCompere;
                        if (this.users.length > 1) {
                            Smack.setRoles(this.getUsers(), MUCRoomRole.RoleModerator, "RoleModerator");
                        }
                        else {
                            Smack.setRole(this.users[0].name, MUCRoomRole.RoleModerator, "RoleModerator");
                        }
                    } }));
            }
            else {
                earlierCreatedChild_7.updateWithValueParams({
                    title: "设为主持人", clickEvent: () => {
                        this.isCompere = !this.isCompere;
                        if (this.users.length > 1) {
                            Smack.setRoles(this.getUsers(), MUCRoomRole.RoleModerator, "RoleModerator");
                        }
                        else {
                            Smack.setRole(this.users[0].name, MUCRoomRole.RoleModerator, "RoleModerator");
                        }
                    }
                });
                if (!earlierCreatedChild_7.needsUpdate()) {
                    earlierCreatedChild_7.markStatic();
                }
                View.create(earlierCreatedChild_7);
            }
        }
        If.pop();
        let earlierCreatedChild_8: ItemText = (this && this.findChildById) ? this.findChildById("8") as ItemText : undefined;
        if (earlierCreatedChild_8 == undefined) {
            View.create(new ItemText("8", this, { title: "设置用户状态", clickEvent: () => {
                    TextPickerDialog.show({
                        range: this.states,
                        selected: this.select,
                        onAccept: (value: TextPickerResult) => {
                            if (typeof value.index == 'number') {
                                this.select = (value.index as number);
                                this.onSetOnLineState();
                            }
                        }
                    });
                } }));
        }
        else {
            earlierCreatedChild_8.updateWithValueParams({
                title: "设置用户状态", clickEvent: () => {
                    TextPickerDialog.show({
                        range: this.states,
                        selected: this.select,
                        onAccept: (value: TextPickerResult) => {
                            if (typeof value.index == 'number') {
                                this.select = (value.index as number);
                                this.onSetOnLineState();
                            }
                        }
                    });
                }
            });
            if (!earlierCreatedChild_8.needsUpdate()) {
                earlierCreatedChild_8.markStatic();
            }
            View.create(earlierCreatedChild_8);
        }
        If.create();
        if (this.isAdministrator) {
            If.branchId(0);
            let earlierCreatedChild_9: ItemText = (this && this.findChildById) ? this.findChildById("9") as ItemText : undefined;
            if (earlierCreatedChild_9 == undefined) {
                View.create(new ItemText("9", this, { title: "撤销管理员身份", clickEvent: () => {
                        this.isAdministrator = !this.isAdministrator;
                        if (this.users.length > 1) {
                            Smack.setAffiliations(this.getUsers(), MUCRoomAffiliation.AffiliationNone, "AffiliationNone");
                        }
                        else {
                            Smack.setAffiliation(this.users[0].name, MUCRoomAffiliation.AffiliationNone, "AffiliationNone");
                        }
                    } }));
            }
            else {
                earlierCreatedChild_9.updateWithValueParams({
                    title: "撤销管理员身份", clickEvent: () => {
                        this.isAdministrator = !this.isAdministrator;
                        if (this.users.length > 1) {
                            Smack.setAffiliations(this.getUsers(), MUCRoomAffiliation.AffiliationNone, "AffiliationNone");
                        }
                        else {
                            Smack.setAffiliation(this.users[0].name, MUCRoomAffiliation.AffiliationNone, "AffiliationNone");
                        }
                    }
                });
                if (!earlierCreatedChild_9.needsUpdate()) {
                    earlierCreatedChild_9.markStatic();
                }
                View.create(earlierCreatedChild_9);
            }
        }
        else {
            If.branchId(1);
            let earlierCreatedChild_10: ItemText = (this && this.findChildById) ? this.findChildById("10") as ItemText : undefined;
            if (earlierCreatedChild_10 == undefined) {
                View.create(new ItemText("10", this, { title: "设置为群管理员", clickEvent: () => {
                        this.isAdministrator = !this.isAdministrator;
                        if (this.users.length > 1) {
                            Smack.setAffiliations(this.getUsers(), MUCRoomAffiliation.AffiliationAdmin, "AffiliationAdmin");
                        }
                        else {
                            Smack.setAffiliation(this.users[0].name, MUCRoomAffiliation.AffiliationAdmin, "AffiliationAdmin");
                        }
                    } }));
            }
            else {
                earlierCreatedChild_10.updateWithValueParams({
                    title: "设置为群管理员", clickEvent: () => {
                        this.isAdministrator = !this.isAdministrator;
                        if (this.users.length > 1) {
                            Smack.setAffiliations(this.getUsers(), MUCRoomAffiliation.AffiliationAdmin, "AffiliationAdmin");
                        }
                        else {
                            Smack.setAffiliation(this.users[0].name, MUCRoomAffiliation.AffiliationAdmin, "AffiliationAdmin");
                        }
                    }
                });
                if (!earlierCreatedChild_10.needsUpdate()) {
                    earlierCreatedChild_10.markStatic();
                }
                View.create(earlierCreatedChild_10);
            }
        }
        If.pop();
        If.create();
        if (this.isMember) {
            If.branchId(0);
            let earlierCreatedChild_11: ItemText = (this && this.findChildById) ? this.findChildById("11") as ItemText : undefined;
            if (earlierCreatedChild_11 == undefined) {
                View.create(new ItemText("11", this, { title: "取消会员身份", clickEvent: () => {
                        this.isMember = !this.isMember;
                        if (this.users.length > 1) {
                            Smack.setAffiliations(this.getUsers(), MUCRoomAffiliation.AffiliationNone, "AffiliationNone");
                        }
                        else {
                            Smack.setAffiliation(this.users[0].name, MUCRoomAffiliation.AffiliationNone, "AffiliationNone");
                        }
                    } }));
            }
            else {
                earlierCreatedChild_11.updateWithValueParams({
                    title: "取消会员身份", clickEvent: () => {
                        this.isMember = !this.isMember;
                        if (this.users.length > 1) {
                            Smack.setAffiliations(this.getUsers(), MUCRoomAffiliation.AffiliationNone, "AffiliationNone");
                        }
                        else {
                            Smack.setAffiliation(this.users[0].name, MUCRoomAffiliation.AffiliationNone, "AffiliationNone");
                        }
                    }
                });
                if (!earlierCreatedChild_11.needsUpdate()) {
                    earlierCreatedChild_11.markStatic();
                }
                View.create(earlierCreatedChild_11);
            }
        }
        else {
            If.branchId(1);
            let earlierCreatedChild_12: ItemText = (this && this.findChildById) ? this.findChildById("12") as ItemText : undefined;
            if (earlierCreatedChild_12 == undefined) {
                View.create(new ItemText("12", this, { title: "设为会员", clickEvent: () => {
                        this.isMember = !this.isMember;
                        if (this.users.length > 1) {
                            Smack.setAffiliations(this.getUsers(), MUCRoomAffiliation.AffiliationMember, "AffiliationMember");
                        }
                        else {
                            Smack.setAffiliation(this.users[0].name, MUCRoomAffiliation.AffiliationMember, "AffiliationMember");
                        }
                    } }));
            }
            else {
                earlierCreatedChild_12.updateWithValueParams({
                    title: "设为会员", clickEvent: () => {
                        this.isMember = !this.isMember;
                        if (this.users.length > 1) {
                            Smack.setAffiliations(this.getUsers(), MUCRoomAffiliation.AffiliationMember, "AffiliationMember");
                        }
                        else {
                            Smack.setAffiliation(this.users[0].name, MUCRoomAffiliation.AffiliationMember, "AffiliationMember");
                        }
                    }
                });
                if (!earlierCreatedChild_12.needsUpdate()) {
                    earlierCreatedChild_12.markStatic();
                }
                View.create(earlierCreatedChild_12);
            }
        }
        If.pop();
        If.create();
        if (this.isOwner) {
            If.branchId(0);
            let earlierCreatedChild_13: ItemText = (this && this.findChildById) ? this.findChildById("13") as ItemText : undefined;
            if (earlierCreatedChild_13 == undefined) {
                View.create(new ItemText("13", this, { title: "撤销设为群主", clickEvent: () => {
                        this.isOwner = !this.isOwner;
                        if (this.users.length > 1) {
                            Smack.setAffiliations(this.getUsers(), MUCRoomAffiliation.AffiliationNone, "AffiliationNone");
                        }
                        else {
                            Smack.setAffiliation(this.users[0].name, MUCRoomAffiliation.AffiliationNone, "AffiliationNone");
                        }
                    } }));
            }
            else {
                earlierCreatedChild_13.updateWithValueParams({
                    title: "撤销设为群主", clickEvent: () => {
                        this.isOwner = !this.isOwner;
                        if (this.users.length > 1) {
                            Smack.setAffiliations(this.getUsers(), MUCRoomAffiliation.AffiliationNone, "AffiliationNone");
                        }
                        else {
                            Smack.setAffiliation(this.users[0].name, MUCRoomAffiliation.AffiliationNone, "AffiliationNone");
                        }
                    }
                });
                if (!earlierCreatedChild_13.needsUpdate()) {
                    earlierCreatedChild_13.markStatic();
                }
                View.create(earlierCreatedChild_13);
            }
        }
        else {
            If.branchId(1);
            let earlierCreatedChild_14: ItemText = (this && this.findChildById) ? this.findChildById("14") as ItemText : undefined;
            if (earlierCreatedChild_14 == undefined) {
                View.create(new ItemText("14", this, { title: "设为群主", clickEvent: () => {
                        this.isOwner = !this.isOwner;
                        if (this.users.length > 1) {
                            Smack.setAffiliations(this.getUsers(), MUCRoomAffiliation.AffiliationOwner, "AffiliationOwner");
                        }
                        else {
                            Smack.setAffiliation(this.users[0].name, MUCRoomAffiliation.AffiliationOwner, "AffiliationOwner");
                        }
                    } }));
            }
            else {
                earlierCreatedChild_14.updateWithValueParams({
                    title: "设为群主", clickEvent: () => {
                        this.isOwner = !this.isOwner;
                        if (this.users.length > 1) {
                            Smack.setAffiliations(this.getUsers(), MUCRoomAffiliation.AffiliationOwner, "AffiliationOwner");
                        }
                        else {
                            Smack.setAffiliation(this.users[0].name, MUCRoomAffiliation.AffiliationOwner, "AffiliationOwner");
                        }
                    }
                });
                if (!earlierCreatedChild_14.needsUpdate()) {
                    earlierCreatedChild_14.markStatic();
                }
                View.create(earlierCreatedChild_14);
            }
        }
        If.pop();
        If.create();
        if (this.isBanned) {
            If.branchId(0);
            let earlierCreatedChild_15: ItemText = (this && this.findChildById) ? this.findChildById("15") as ItemText : undefined;
            if (earlierCreatedChild_15 == undefined) {
                View.create(new ItemText("15", this, { title: "取消禁言", clickEvent: () => {
                        this.isBanned = !this.isBanned;
                        if (this.users.length > 1) {
                            Smack.grantVoices(this.getUsers(), "grantVoices");
                        }
                        else {
                            Smack.grantVoice(this.users[0].name, "grantVoice");
                        }
                    }
                }));
            }
            else {
                earlierCreatedChild_15.updateWithValueParams({
                    title: "取消禁言", clickEvent: () => {
                        this.isBanned = !this.isBanned;
                        if (this.users.length > 1) {
                            Smack.grantVoices(this.getUsers(), "grantVoices");
                        }
                        else {
                            Smack.grantVoice(this.users[0].name, "grantVoice");
                        }
                    }
                });
                if (!earlierCreatedChild_15.needsUpdate()) {
                    earlierCreatedChild_15.markStatic();
                }
                View.create(earlierCreatedChild_15);
            }
        }
        else {
            If.branchId(1);
            let earlierCreatedChild_16: ItemText = (this && this.findChildById) ? this.findChildById("16") as ItemText : undefined;
            if (earlierCreatedChild_16 == undefined) {
                View.create(new ItemText("16", this, { title: "禁言", clickEvent: () => {
                        this.isBanned = !this.isBanned;
                        if (this.users.length > 1) {
                            Smack.revokeVoices(this.getUsers(), "revokeVoices");
                        }
                        else {
                            Smack.revokeVoice(this.users[0].name, "revokeVoice");
                        }
                        if (this.users.length > 1) {
                            Smack.setAffiliations(this.getUsers(), MUCRoomAffiliation.AffiliationNone, "AffiliationNone");
                        }
                        else {
                            Smack.setAffiliation(this.users[0].name, MUCRoomAffiliation.AffiliationNone, "AffiliationNone");
                        }
                    } }));
            }
            else {
                earlierCreatedChild_16.updateWithValueParams({
                    title: "禁言", clickEvent: () => {
                        this.isBanned = !this.isBanned;
                        if (this.users.length > 1) {
                            Smack.revokeVoices(this.getUsers(), "revokeVoices");
                        }
                        else {
                            Smack.revokeVoice(this.users[0].name, "revokeVoice");
                        }
                        if (this.users.length > 1) {
                            Smack.setAffiliations(this.getUsers(), MUCRoomAffiliation.AffiliationNone, "AffiliationNone");
                        }
                        else {
                            Smack.setAffiliation(this.users[0].name, MUCRoomAffiliation.AffiliationNone, "AffiliationNone");
                        }
                    }
                });
                if (!earlierCreatedChild_16.needsUpdate()) {
                    earlierCreatedChild_16.markStatic();
                }
                View.create(earlierCreatedChild_16);
            }
        }
        If.pop();
        Column.pop();
    }
}
loadDocument(new group_all_member("1", undefined, {}));
