interface Group_chat_edit_Params {
    passwordprotectedroom?: string;
    temp?: string;
    JidVal?: string;
    PrivateVal?: string;
    roomName?: string;
    roomDesc?: string;
    roomMaxusers?: string;
    roomPassword?: string;
    roomAdmins?: string;
    roomOwners?: string;
    roomPresencebroadcast?: Array<string>;
    whois_options?: Array<SelectOptionsEntity>;
    allowpm_options?: Array<SelectOptionsEntity>;
    roomConfig?: RoomConfig;
    scroller?: Scroller;
    allowpm_selectDialog?: CustomDialogController;
    whois_selectDialog?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "group_chat_edit_" + ++__generate__Id;
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
import { Switches } from '../../base/Switches';
import { ItemInput } from '../../base/ItemInput';
import { RoomConfig } from '@ohos/smack';
import { SelectDialog } from '../../base/SelectDialog';
import { Smack } from '@ohos/smack';
import { SelectOptionsEntity } from '../../../entity/SelectOptionsEntity';
import { GlobalContext } from '../../../entity/GlobalContext';
class Group_chat_edit extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.passwordprotectedroom = '';
        this.__temp = new ObservedPropertySimple('', this, "temp");
        this.__JidVal = new ObservedPropertySimple('任何人', this, "JidVal");
        this.__PrivateVal = new ObservedPropertySimple('任何人', this, "PrivateVal");
        this.__roomName = new ObservedPropertySimple('', this, "roomName");
        this.__roomDesc = new ObservedPropertySimple('', this, "roomDesc");
        this.__roomMaxusers = new ObservedPropertySimple('', this, "roomMaxusers");
        this.__roomPassword = new ObservedPropertySimple('', this, "roomPassword");
        this.__roomAdmins = new ObservedPropertySimple('', this, "roomAdmins");
        this.__roomOwners = new ObservedPropertySimple('', this, "roomOwners");
        this.__roomPresencebroadcast = new ObservedPropertyObject([], this, "roomPresencebroadcast");
        this.__whois_options = new ObservedPropertyObject([
            {
                "label": "任何人",
                "value": "anyone"
            },
            {
                "label": "审核者",
                "value": "moderators"
            }
        ], this, "whois_options");
        this.__allowpm_options = new ObservedPropertyObject([
            {
                "label": "任何人",
                "value": "anyone"
            },
            {
                "label": "参与者",
                "value": "participants"
            },
            {
                "label": "审核者",
                "value": "moderators"
            },
            {
                "label": "无",
                "value": "none"
            }
        ], this, "allowpm_options");
        this.roomConfig = new RoomConfig();
        this.scroller = new Scroller();
        this.allowpm_selectDialog = new CustomDialogController({
            builder: () => {
                let jsDialog = new SelectDialog("21", this, {
                    vue: this.__PrivateVal,
                    options: this.allowpm_options
                });
                jsDialog.setController(this.allowpm_selectDialog);
                View.create(jsDialog);
            },
            customStyle: true,
            alignment: DialogAlignment.Center
        }, this);
        this.whois_selectDialog = new CustomDialogController({
            builder: () => {
                let jsDialog = new SelectDialog("22", this, {
                    vue: this.__JidVal,
                    options: this.whois_options,
                });
                jsDialog.setController(this.whois_selectDialog);
                View.create(jsDialog);
            },
            customStyle: true,
            alignment: DialogAlignment.Center
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Group_chat_edit_Params) {
        if (params.passwordprotectedroom !== undefined) {
            this.passwordprotectedroom = params.passwordprotectedroom;
        }
        if (params.temp !== undefined) {
            this.temp = params.temp;
        }
        if (params.JidVal !== undefined) {
            this.JidVal = params.JidVal;
        }
        if (params.PrivateVal !== undefined) {
            this.PrivateVal = params.PrivateVal;
        }
        if (params.roomName !== undefined) {
            this.roomName = params.roomName;
        }
        if (params.roomDesc !== undefined) {
            this.roomDesc = params.roomDesc;
        }
        if (params.roomMaxusers !== undefined) {
            this.roomMaxusers = params.roomMaxusers;
        }
        if (params.roomPassword !== undefined) {
            this.roomPassword = params.roomPassword;
        }
        if (params.roomAdmins !== undefined) {
            this.roomAdmins = params.roomAdmins;
        }
        if (params.roomOwners !== undefined) {
            this.roomOwners = params.roomOwners;
        }
        if (params.roomPresencebroadcast !== undefined) {
            this.roomPresencebroadcast = params.roomPresencebroadcast;
        }
        if (params.whois_options !== undefined) {
            this.whois_options = params.whois_options;
        }
        if (params.allowpm_options !== undefined) {
            this.allowpm_options = params.allowpm_options;
        }
        if (params.roomConfig !== undefined) {
            this.roomConfig = params.roomConfig;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.allowpm_selectDialog !== undefined) {
            this.allowpm_selectDialog = params.allowpm_selectDialog;
        }
        if (params.whois_selectDialog !== undefined) {
            this.whois_selectDialog = params.whois_selectDialog;
        }
    }
    aboutToBeDeleted() {
        this.__temp.aboutToBeDeleted();
        this.__JidVal.aboutToBeDeleted();
        this.__PrivateVal.aboutToBeDeleted();
        this.__roomName.aboutToBeDeleted();
        this.__roomDesc.aboutToBeDeleted();
        this.__roomMaxusers.aboutToBeDeleted();
        this.__roomPassword.aboutToBeDeleted();
        this.__roomAdmins.aboutToBeDeleted();
        this.__roomOwners.aboutToBeDeleted();
        this.__roomPresencebroadcast.aboutToBeDeleted();
        this.__whois_options.aboutToBeDeleted();
        this.__allowpm_options.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private passwordprotectedroom: string;
    private __temp: ObservedPropertySimple<string>;
    get temp() {
        return this.__temp.get();
    }
    set temp(newValue: string) {
        this.__temp.set(newValue);
    }
    private __JidVal: ObservedPropertySimple<string>;
    get JidVal() {
        return this.__JidVal.get();
    }
    set JidVal(newValue: string) {
        this.__JidVal.set(newValue);
    }
    private __PrivateVal: ObservedPropertySimple<string>;
    get PrivateVal() {
        return this.__PrivateVal.get();
    }
    set PrivateVal(newValue: string) {
        this.__PrivateVal.set(newValue);
    }
    private __roomName: ObservedPropertySimple<string>;
    get roomName() {
        return this.__roomName.get();
    }
    set roomName(newValue: string) {
        this.__roomName.set(newValue);
    }
    private __roomDesc: ObservedPropertySimple<string>;
    get roomDesc() {
        return this.__roomDesc.get();
    }
    set roomDesc(newValue: string) {
        this.__roomDesc.set(newValue);
    }
    private __roomMaxusers: ObservedPropertySimple<string>;
    get roomMaxusers() {
        return this.__roomMaxusers.get();
    }
    set roomMaxusers(newValue: string) {
        this.__roomMaxusers.set(newValue);
    }
    private __roomPassword: ObservedPropertySimple<string>;
    get roomPassword() {
        return this.__roomPassword.get();
    }
    set roomPassword(newValue: string) {
        this.__roomPassword.set(newValue);
    }
    private __roomAdmins: ObservedPropertySimple<string>;
    get roomAdmins() {
        return this.__roomAdmins.get();
    }
    set roomAdmins(newValue: string) {
        this.__roomAdmins.set(newValue);
    }
    private __roomOwners: ObservedPropertySimple<string>;
    get roomOwners() {
        return this.__roomOwners.get();
    }
    set roomOwners(newValue: string) {
        this.__roomOwners.set(newValue);
    }
    private __roomPresencebroadcast: ObservedPropertyObject<Array<string>>;
    get roomPresencebroadcast() {
        return this.__roomPresencebroadcast.get();
    }
    set roomPresencebroadcast(newValue: Array<string>) {
        this.__roomPresencebroadcast.set(newValue);
    }
    private __whois_options: ObservedPropertyObject<Array<SelectOptionsEntity>>;
    get whois_options() {
        return this.__whois_options.get();
    }
    set whois_options(newValue: Array<SelectOptionsEntity>) {
        this.__whois_options.set(newValue);
    }
    private __allowpm_options: ObservedPropertyObject<Array<SelectOptionsEntity>>;
    get allowpm_options() {
        return this.__allowpm_options.get();
    }
    set allowpm_options(newValue: Array<SelectOptionsEntity>) {
        this.__allowpm_options.set(newValue);
    }
    public roomConfig: RoomConfig;
    private scroller: Scroller;
    private allowpm_selectDialog: CustomDialogController;
    private whois_selectDialog: CustomDialogController;
    aboutToAppear() {
        this.getRoomConfig();
    }
    switchAllowpm(str: string) {
        switch (str) {
            case "anyone":
                this.PrivateVal = "任何人";
                break;
            case "participants":
                this.PrivateVal = "参与者";
                break;
            case "moderators":
                this.PrivateVal = "审核者";
                break;
            case "none":
                this.PrivateVal = "无";
                break;
        }
    }
    switchAllowpmStr(str: string): string {
        let val = 'anyone';
        switch (str) {
            case "任何人":
                val = "anyone";
                break;
            case "参与者":
                val = "participants";
                break;
            case "审核者":
                val = "moderators";
                break;
            case "无":
                val = "none";
                break;
        }
        return val;
    }
    public getRoomConfig() {
        this.roomConfig = JSON.parse(Smack.getRoomConfig()) as RoomConfig;
        this.JidVal = this.roomConfig.whois == "anyone" ? "任何人" : "审核者";
        this.switchAllowpm(this.roomConfig.allowpm);
        this.roomName = this.roomConfig.roomname;
        this.roomDesc = this.roomConfig.roomdesc;
        this.roomMaxusers = this.roomConfig.maxusers;
        this.roomPassword = this.roomConfig.roomsecret ? this.roomConfig.roomsecret : "";
        this.passwordprotectedroom = this.roomConfig.passwordprotectedroom;
        console.info('passwordprotectedroom-----------//' + this.passwordprotectedroom);
        this.roomAdmins = this.roomConfig.roomadmins;
        this.roomOwners = this.roomConfig.roomowners;
        this.roomPresencebroadcast = this.roomConfig.presencebroadcast;
        console.info('Checkbox-----------//' + JSON.stringify(this.roomPresencebroadcast));
        console.info('roomConfig-----------//' + JSON.stringify(this.roomConfig));
    }
    //todo 修改房间配置
    updateRoomConfig() {
        this.roomConfig.allowpm = this.switchAllowpmStr(this.PrivateVal);
        this.roomConfig.whois = (this.JidVal == "任何人") ? "anyone" : "moderators";
        this.roomConfig.roomname = this.roomName;
        this.roomConfig.roomdesc = this.roomDesc;
        this.roomConfig.maxusers = this.roomMaxusers;
        this.roomConfig.roomsecret = this.roomPassword;
        this.roomConfig.roomadmins = this.roomAdmins;
        this.roomConfig.roomowners = this.roomOwners;
        this.roomConfig.presencebroadcast = this.roomPresencebroadcast;
        this.roomConfig.passwordprotectedroom = this.roomPassword ? '1' : '0';
        console.info('update roomConfig roomPassword-----------//' + this.roomPassword + ',passwordprotectedroom:' + this.roomConfig.passwordprotectedroom + ',,');
        console.info('update roomConfig-----------//' + JSON.stringify(this.roomConfig));
        Smack.setRoomConfig(JSON.stringify(this.roomConfig));
        prompt.showToast({ message: "更新成功" });
        setTimeout(() => {
            router.back();
        }, 500);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.width('100%');
        Flex.backgroundColor('#ececec');
        let earlierCreatedChild_2: Toolbar = (this && this.findChildById) ? this.findChildById("2") as Toolbar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Toolbar("2", this, {
                isBack: true,
                title: '房间配置',
                rightText: '保存',
                rightClickCallBack: () => {
                    this.updateRoomConfig();
                }
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                isBack: true,
                title: '房间配置',
                rightText: '保存',
                rightClickCallBack: () => {
                    this.updateRoomConfig();
                }
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Column.create();
        let earlierCreatedChild_3: ItemInput = (this && this.findChildById) ? this.findChildById("3") as ItemInput : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new ItemInput("3", this, { title: "房间名称", value: this.__roomName, val: this.__temp }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                title: "房间名称"
            });
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: ItemInput = (this && this.findChildById) ? this.findChildById("4") as ItemInput : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new ItemInput("4", this, { title: "房间描述", value: this.__roomDesc, val: this.__temp }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                title: "房间描述"
            });
            View.create(earlierCreatedChild_4);
        }
        let earlierCreatedChild_5: ItemInput = (this && this.findChildById) ? this.findChildById("5") as ItemInput : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new ItemInput("5", this, {
                title: "房间最大人数",
                value: this.__roomMaxusers,
                val: this.__temp,
                typeStr: "4"
            }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                title: "房间最大人数",
                typeStr: "4"
            });
            View.create(earlierCreatedChild_5);
        }
        let earlierCreatedChild_6: ItemInput = (this && this.findChildById) ? this.findChildById("6") as ItemInput : undefined;
        if (earlierCreatedChild_6 == undefined) {
            View.create(new ItemInput("6", this, {
                title: "密码",
                value: this.__roomPassword,
                typeStr: "2",
                val: this.__temp
            }));
        }
        else {
            earlierCreatedChild_6.updateWithValueParams({
                title: "密码",
                typeStr: "2"
            });
            View.create(earlierCreatedChild_6);
        }
        let earlierCreatedChild_7: ItemInput = (this && this.findChildById) ? this.findChildById("7") as ItemInput : undefined;
        if (earlierCreatedChild_7 == undefined) {
            View.create(new ItemInput("7", this, {
                title: "能够发现成员真实 JID 的角色",
                widthStr: '65%',
                widthInput: '30%',
                value: this.__temp,
                val: this.__JidVal,
                radio: true,
                selectDialog: () => {
                    this.whois_selectDialog.open();
                }
            }));
        }
        else {
            earlierCreatedChild_7.updateWithValueParams({
                title: "能够发现成员真实 JID 的角色",
                widthStr: '65%',
                widthInput: '30%',
                radio: true,
                selectDialog: () => {
                    this.whois_selectDialog.open();
                }
            });
            View.create(earlierCreatedChild_7);
        }
        let earlierCreatedChild_8: ItemInput = (this && this.findChildById) ? this.findChildById("8") as ItemInput : undefined;
        if (earlierCreatedChild_8 == undefined) {
            View.create(new ItemInput("8", this, {
                title: "Allowed to Send Private Messages",
                widthStr: '65%',
                widthInput: '30%',
                value: this.__temp,
                val: this.__PrivateVal,
                radio: true,
                selectDialog: () => {
                    this.allowpm_selectDialog.open();
                }
            }));
        }
        else {
            earlierCreatedChild_8.updateWithValueParams({
                title: "Allowed to Send Private Messages",
                widthStr: '65%',
                widthInput: '30%',
                radio: true,
                selectDialog: () => {
                    this.allowpm_selectDialog.open();
                }
            });
            View.create(earlierCreatedChild_8);
        }
        let earlierCreatedChild_9: ItemInput = (this && this.findChildById) ? this.findChildById("9") as ItemInput : undefined;
        if (earlierCreatedChild_9 == undefined) {
            View.create(new ItemInput("9", this, {
                title: "房间管理员",
                widthStr: '30%',
                widthInput: '65%',
                value: this.__roomAdmins,
                val: this.__temp,
                radio: false,
                selectDialog: () => {
                    this.allowpm_selectDialog.open();
                }
            }));
        }
        else {
            earlierCreatedChild_9.updateWithValueParams({
                title: "房间管理员",
                widthStr: '30%',
                widthInput: '65%',
                radio: false,
                selectDialog: () => {
                    this.allowpm_selectDialog.open();
                }
            });
            View.create(earlierCreatedChild_9);
        }
        let earlierCreatedChild_10: ItemInput = (this && this.findChildById) ? this.findChildById("10") as ItemInput : undefined;
        if (earlierCreatedChild_10 == undefined) {
            View.create(new ItemInput("10", this, {
                title: "房间拥有者",
                widthStr: '30%',
                widthInput: '65%',
                value: this.__roomOwners,
                val: this.__temp,
                radio: false,
                selectDialog: () => {
                    this.allowpm_selectDialog.open();
                }
            }));
        }
        else {
            earlierCreatedChild_10.updateWithValueParams({
                title: "房间拥有者",
                widthStr: '30%',
                widthInput: '65%',
                radio: false,
                selectDialog: () => {
                    this.allowpm_selectDialog.open();
                }
            });
            View.create(earlierCreatedChild_10);
        }
        Row.create();
        Row.padding({ left: 15 });
        Row.height(54);
        Row.backgroundColor(Color.White);
        Row.margin({ top: 1 });
        Row.width('100%');
        Text.create("广播其存在的角色");
        Text.width('35%');
        Text.height('100%');
        Text.fontSize(18);
        Text.pop();
        Row.create();
        Row.width('55%');
        Row.justifyContent(FlexAlign.End);
        Checkbox.create({ name: 'checkbox1', group: 'checkboxGroup' });
        Checkbox.select(this.roomPresencebroadcast.indexOf("moderator") == 0);
        Checkbox.selectedColor(0x39a2db);
        Checkbox.onChange((value: boolean) => {
            let that = this;
            console.info('Checkbox1 change is' + value);
            this.roomPresencebroadcast[0] = (value ? 'moderator' : '');
        });
        Checkbox.pop();
        Text.create("审核者");
        Text.fontSize(16);
        Text.pop();
        Checkbox.create({ name: 'checkbox2', group: 'checkboxGroup' });
        Checkbox.select(this.roomPresencebroadcast.indexOf("participant") == 1);
        Checkbox.selectedColor(0x39a2db);
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox2 change is' + value);
            this.roomPresencebroadcast[1] = (value ? 'participant' : '');
        });
        Checkbox.pop();
        Text.create("参与者");
        Text.fontSize(16);
        Text.pop();
        Checkbox.create({ name: 'checkbox3', group: 'checkboxGroup' });
        Checkbox.select(this.roomPresencebroadcast.indexOf("visitor") == 2);
        Checkbox.selectedColor(0x39a2db);
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox3 change is' + value);
            this.roomPresencebroadcast[2] = (value ? 'visitor' : '');
        });
        Checkbox.pop();
        Text.create("访客");
        Text.fontSize(16);
        Text.pop();
        Row.pop();
        Row.pop();
        let earlierCreatedChild_11: Switches = (this && this.findChildById) ? this.findChildById("11") as Switches : undefined;
        if (earlierCreatedChild_11 == undefined) {
            View.create(new Switches("11", this, { isOn: this.roomConfig.publicroom, title: '在目录中列出房间', onToggleChange: (HisOn: string) => {
                    this.roomConfig.publicroom = HisOn;
                } }));
        }
        else {
            earlierCreatedChild_11.updateWithValueParams({
                isOn: this.roomConfig.publicroom, title: '在目录中列出房间', onToggleChange: (HisOn: string) => {
                    this.roomConfig.publicroom = HisOn;
                }
            });
            if (!earlierCreatedChild_11.needsUpdate()) {
                earlierCreatedChild_11.markStatic();
            }
            View.create(earlierCreatedChild_11);
        }
        let earlierCreatedChild_12: Switches = (this && this.findChildById) ? this.findChildById("12") as Switches : undefined;
        if (earlierCreatedChild_12 == undefined) {
            View.create(new Switches("12", this, { isOn: this.roomConfig.persistentroom, title: '永久房间', onToggleChange: (HisOn: string) => {
                    this.roomConfig.persistentroom = HisOn;
                } }));
        }
        else {
            earlierCreatedChild_12.updateWithValueParams({
                isOn: this.roomConfig.persistentroom, title: '永久房间', onToggleChange: (HisOn: string) => {
                    this.roomConfig.persistentroom = HisOn;
                }
            });
            if (!earlierCreatedChild_12.needsUpdate()) {
                earlierCreatedChild_12.markStatic();
            }
            View.create(earlierCreatedChild_12);
        }
        let earlierCreatedChild_13: Switches = (this && this.findChildById) ? this.findChildById("13") as Switches : undefined;
        if (earlierCreatedChild_13 == undefined) {
            View.create(new Switches("13", this, { isOn: this.roomConfig.membersonly, title: '房间仅对成员开放', onToggleChange: (HisOn: string) => {
                    this.roomConfig.membersonly = HisOn;
                } }));
        }
        else {
            earlierCreatedChild_13.updateWithValueParams({
                isOn: this.roomConfig.membersonly, title: '房间仅对成员开放', onToggleChange: (HisOn: string) => {
                    this.roomConfig.membersonly = HisOn;
                }
            });
            if (!earlierCreatedChild_13.needsUpdate()) {
                earlierCreatedChild_13.markStatic();
            }
            View.create(earlierCreatedChild_13);
        }
        let earlierCreatedChild_14: Switches = (this && this.findChildById) ? this.findChildById("14") as Switches : undefined;
        if (earlierCreatedChild_14 == undefined) {
            View.create(new Switches("14", this, { isOn: this.roomConfig.moderatedroom, title: '房间需要审核', onToggleChange: (HisOn: string) => {
                    this.roomConfig.moderatedroom = HisOn;
                } }));
        }
        else {
            earlierCreatedChild_14.updateWithValueParams({
                isOn: this.roomConfig.moderatedroom, title: '房间需要审核', onToggleChange: (HisOn: string) => {
                    this.roomConfig.moderatedroom = HisOn;
                }
            });
            if (!earlierCreatedChild_14.needsUpdate()) {
                earlierCreatedChild_14.markStatic();
            }
            View.create(earlierCreatedChild_14);
        }
        let earlierCreatedChild_15: Switches = (this && this.findChildById) ? this.findChildById("15") as Switches : undefined;
        if (earlierCreatedChild_15 == undefined) {
            View.create(new Switches("15", this, { isOn: this.roomConfig.allowinvites, title: '允许成员邀请其他人进群', onToggleChange: (HisOn: string) => {
                    this.roomConfig.allowinvites = HisOn;
                } }));
        }
        else {
            earlierCreatedChild_15.updateWithValueParams({
                isOn: this.roomConfig.allowinvites, title: '允许成员邀请其他人进群', onToggleChange: (HisOn: string) => {
                    this.roomConfig.allowinvites = HisOn;
                }
            });
            if (!earlierCreatedChild_15.needsUpdate()) {
                earlierCreatedChild_15.markStatic();
            }
            View.create(earlierCreatedChild_15);
        }
        let earlierCreatedChild_16: Switches = (this && this.findChildById) ? this.findChildById("16") as Switches : undefined;
        if (earlierCreatedChild_16 == undefined) {
            View.create(new Switches("16", this, { isOn: this.roomConfig.changesubject, title: '允许成员更改主题', onToggleChange: (HisOn: string) => {
                    this.roomConfig.changesubject = HisOn;
                } }));
        }
        else {
            earlierCreatedChild_16.updateWithValueParams({
                isOn: this.roomConfig.changesubject, title: '允许成员更改主题', onToggleChange: (HisOn: string) => {
                    this.roomConfig.changesubject = HisOn;
                }
            });
            if (!earlierCreatedChild_16.needsUpdate()) {
                earlierCreatedChild_16.markStatic();
            }
            View.create(earlierCreatedChild_16);
        }
        let earlierCreatedChild_17: Switches = (this && this.findChildById) ? this.findChildById("17") as Switches : undefined;
        if (earlierCreatedChild_17 == undefined) {
            View.create(new Switches("17", this, { isOn: this.roomConfig.reservednick, title: '仅允许注册昵称登陆', onToggleChange: (HisOn: string) => {
                    this.roomConfig.reservednick = HisOn;
                } }));
        }
        else {
            earlierCreatedChild_17.updateWithValueParams({
                isOn: this.roomConfig.reservednick, title: '仅允许注册昵称登陆', onToggleChange: (HisOn: string) => {
                    this.roomConfig.reservednick = HisOn;
                }
            });
            if (!earlierCreatedChild_17.needsUpdate()) {
                earlierCreatedChild_17.markStatic();
            }
            View.create(earlierCreatedChild_17);
        }
        let earlierCreatedChild_18: Switches = (this && this.findChildById) ? this.findChildById("18") as Switches : undefined;
        if (earlierCreatedChild_18 == undefined) {
            View.create(new Switches("18", this, { isOn: this.roomConfig.canchangenick, title: '允许成员修改昵称', onToggleChange: (HisOn: string) => {
                    this.roomConfig.canchangenick = HisOn;
                } }));
        }
        else {
            earlierCreatedChild_18.updateWithValueParams({
                isOn: this.roomConfig.canchangenick, title: '允许成员修改昵称', onToggleChange: (HisOn: string) => {
                    this.roomConfig.canchangenick = HisOn;
                }
            });
            if (!earlierCreatedChild_18.needsUpdate()) {
                earlierCreatedChild_18.markStatic();
            }
            View.create(earlierCreatedChild_18);
        }
        let earlierCreatedChild_19: Switches = (this && this.findChildById) ? this.findChildById("19") as Switches : undefined;
        if (earlierCreatedChild_19 == undefined) {
            View.create(new Switches("19", this, { isOn: this.roomConfig.canchangenick, title: '允许成员注册房间', onToggleChange: (HisOn: string) => {
                    this.roomConfig.canchangenick = HisOn;
                } }));
        }
        else {
            earlierCreatedChild_19.updateWithValueParams({
                isOn: this.roomConfig.canchangenick, title: '允许成员注册房间', onToggleChange: (HisOn: string) => {
                    this.roomConfig.canchangenick = HisOn;
                }
            });
            if (!earlierCreatedChild_19.needsUpdate()) {
                earlierCreatedChild_19.markStatic();
            }
            View.create(earlierCreatedChild_19);
        }
        let earlierCreatedChild_20: Switches = (this && this.findChildById) ? this.findChildById("20") as Switches : undefined;
        if (earlierCreatedChild_20 == undefined) {
            View.create(new Switches("20", this, { isOn: this.roomConfig.enablelogging, title: '记录房间聊天', onToggleChange: (HisOn: string) => {
                    this.roomConfig.enablelogging = HisOn;
                } }));
        }
        else {
            earlierCreatedChild_20.updateWithValueParams({
                isOn: this.roomConfig.enablelogging, title: '记录房间聊天', onToggleChange: (HisOn: string) => {
                    this.roomConfig.enablelogging = HisOn;
                }
            });
            if (!earlierCreatedChild_20.needsUpdate()) {
                earlierCreatedChild_20.markStatic();
            }
            View.create(earlierCreatedChild_20);
        }
        Column.pop();
        Scroll.pop();
        Flex.pop();
    }
    // todo 退出群聊
    onExitGroup() {
        //销毁房间,群主可调用
        Smack.destroy(GlobalContext.getContext().getValue('userName') as string, "123");
    }
}
loadDocument(new Group_chat_edit("1", undefined, {}));
