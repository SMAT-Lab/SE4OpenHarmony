interface Index_Params {
    scroller?: Scroller;
    email?: string;
    userPassword?: string;
    userName?: string;
    presenceUserId?: string;
    createUserName?: string;
    createUserPreferredName?: string;
    createUserEmail?: string;
    createUserPassword?: string;
    visitorName?: string;
    visitorEmail?: string;
    visitorToken?: string;
    visitorPhone?: string;
    visitorAddress?: string;
    channelName?: string;
    groupName?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "restApiSample_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import prompt from '@system.prompt';
import { RestAPI } from '@ohos/rocketchat';
import { PageData, VisitorInfo, CustomFields, VisitorStatus, Data, OptionalParams, CustomField, PostMessageData, AvatarData, OnClickUsersListData, OnClickUsersCreate } from "./RestApiSamepleEntity";
let restAPI: RestAPI = new RestAPI("", "", "");
let authToken: string = "";
let rid: string = "";
let userId: string = "";
let channelId: string = "";
let roomName: string = "";
let groupID: string = "";
let messageId: string = "";
let user_id: string = "";
let channelName: string = "";
let otherUserId: string = "LnxXdiShd3WTLovPa"; // Create a new user or get list of user, put the desired user id.
class OnClickUserDeleteData {
    userId?: string = "";
    username?: string = "";
    confirmRelinquish?: boolean = false;
}
class OnClickUsersPresenceData {
    userId?: string = "";
    userName?: string = "";
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.__email = new ObservedPropertySimple('', this, "email");
        this.__userPassword = new ObservedPropertySimple('', this, "userPassword");
        this.__userName = new ObservedPropertySimple('', this, "userName");
        this.__presenceUserId = new ObservedPropertySimple('', this, "presenceUserId");
        this.__createUserName = new ObservedPropertySimple('', this, "createUserName");
        this.__createUserPreferredName = new ObservedPropertySimple('', this, "createUserPreferredName");
        this.__createUserEmail = new ObservedPropertySimple('', this, "createUserEmail");
        this.__createUserPassword = new ObservedPropertySimple('', this, "createUserPassword");
        this.__visitorName = new ObservedPropertySimple('', this, "visitorName");
        this.__visitorEmail = new ObservedPropertySimple('', this, "visitorEmail");
        this.__visitorToken = new ObservedPropertySimple('', this, "visitorToken");
        this.__visitorPhone = new ObservedPropertySimple('', this, "visitorPhone");
        this.__visitorAddress = new ObservedPropertySimple('', this, "visitorAddress");
        this.__channelName = new ObservedPropertySimple('', this, "channelName");
        this.__groupName = new ObservedPropertySimple('', this, "groupName");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.email !== undefined) {
            this.email = params.email;
        }
        if (params.userPassword !== undefined) {
            this.userPassword = params.userPassword;
        }
        if (params.userName !== undefined) {
            this.userName = params.userName;
        }
        if (params.presenceUserId !== undefined) {
            this.presenceUserId = params.presenceUserId;
        }
        if (params.createUserName !== undefined) {
            this.createUserName = params.createUserName;
        }
        if (params.createUserPreferredName !== undefined) {
            this.createUserPreferredName = params.createUserPreferredName;
        }
        if (params.createUserEmail !== undefined) {
            this.createUserEmail = params.createUserEmail;
        }
        if (params.createUserPassword !== undefined) {
            this.createUserPassword = params.createUserPassword;
        }
        if (params.visitorName !== undefined) {
            this.visitorName = params.visitorName;
        }
        if (params.visitorEmail !== undefined) {
            this.visitorEmail = params.visitorEmail;
        }
        if (params.visitorToken !== undefined) {
            this.visitorToken = params.visitorToken;
        }
        if (params.visitorPhone !== undefined) {
            this.visitorPhone = params.visitorPhone;
        }
        if (params.visitorAddress !== undefined) {
            this.visitorAddress = params.visitorAddress;
        }
        if (params.channelName !== undefined) {
            this.channelName = params.channelName;
        }
        if (params.groupName !== undefined) {
            this.groupName = params.groupName;
        }
    }
    aboutToBeDeleted() {
        this.__email.aboutToBeDeleted();
        this.__userPassword.aboutToBeDeleted();
        this.__userName.aboutToBeDeleted();
        this.__presenceUserId.aboutToBeDeleted();
        this.__createUserName.aboutToBeDeleted();
        this.__createUserPreferredName.aboutToBeDeleted();
        this.__createUserEmail.aboutToBeDeleted();
        this.__createUserPassword.aboutToBeDeleted();
        this.__visitorName.aboutToBeDeleted();
        this.__visitorEmail.aboutToBeDeleted();
        this.__visitorToken.aboutToBeDeleted();
        this.__visitorPhone.aboutToBeDeleted();
        this.__visitorAddress.aboutToBeDeleted();
        this.__channelName.aboutToBeDeleted();
        this.__groupName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private __email: ObservedPropertySimple<string>;
    get email() {
        return this.__email.get();
    }
    set email(newValue: string) {
        this.__email.set(newValue);
    }
    private __userPassword: ObservedPropertySimple<string>;
    get userPassword() {
        return this.__userPassword.get();
    }
    set userPassword(newValue: string) {
        this.__userPassword.set(newValue);
    }
    private __userName: ObservedPropertySimple<string>;
    get userName() {
        return this.__userName.get();
    }
    set userName(newValue: string) {
        this.__userName.set(newValue);
    }
    private __presenceUserId: ObservedPropertySimple<string>;
    get presenceUserId() {
        return this.__presenceUserId.get();
    }
    set presenceUserId(newValue: string) {
        this.__presenceUserId.set(newValue);
    }
    private __createUserName: ObservedPropertySimple<string>;
    get createUserName() {
        return this.__createUserName.get();
    }
    set createUserName(newValue: string) {
        this.__createUserName.set(newValue);
    }
    private __createUserPreferredName: ObservedPropertySimple<string>;
    get createUserPreferredName() {
        return this.__createUserPreferredName.get();
    }
    set createUserPreferredName(newValue: string) {
        this.__createUserPreferredName.set(newValue);
    }
    private __createUserEmail: ObservedPropertySimple<string>;
    get createUserEmail() {
        return this.__createUserEmail.get();
    }
    set createUserEmail(newValue: string) {
        this.__createUserEmail.set(newValue);
    }
    private __createUserPassword: ObservedPropertySimple<string>;
    get createUserPassword() {
        return this.__createUserPassword.get();
    }
    set createUserPassword(newValue: string) {
        this.__createUserPassword.set(newValue);
    }
    private __visitorName: ObservedPropertySimple<string>;
    get visitorName() {
        return this.__visitorName.get();
    }
    set visitorName(newValue: string) {
        this.__visitorName.set(newValue);
    }
    private __visitorEmail: ObservedPropertySimple<string>;
    get visitorEmail() {
        return this.__visitorEmail.get();
    }
    set visitorEmail(newValue: string) {
        this.__visitorEmail.set(newValue);
    }
    private __visitorToken: ObservedPropertySimple<string>;
    get visitorToken() {
        return this.__visitorToken.get();
    }
    set visitorToken(newValue: string) {
        this.__visitorToken.set(newValue);
    }
    private __visitorPhone: ObservedPropertySimple<string>;
    get visitorPhone() {
        return this.__visitorPhone.get();
    }
    set visitorPhone(newValue: string) {
        this.__visitorPhone.set(newValue);
    }
    private __visitorAddress: ObservedPropertySimple<string>;
    get visitorAddress() {
        return this.__visitorAddress.get();
    }
    set visitorAddress(newValue: string) {
        this.__visitorAddress.set(newValue);
    }
    private __channelName: ObservedPropertySimple<string>;
    get channelName() {
        return this.__channelName.get();
    }
    set channelName(newValue: string) {
        this.__channelName.set(newValue);
    }
    private __groupName: ObservedPropertySimple<string>;
    get groupName() {
        return this.__groupName.get();
    }
    set groupName(newValue: string) {
        this.__groupName.set(newValue);
    }
    render() {
        Stack.create({ alignContent: Alignment.TopStart });
        Scroll.create(this.scroller);
        Flex.create({ wrap: FlexWrap.Wrap });
        TextInput.create({ placeholder: 'Username' });
        TextInput.type(InputType.Normal);
        TextInput.placeholderColor(Color.Blue);
        TextInput.placeholderFont({ size: 40, weight: FontWeight.Normal, family: "sans-serif", style: FontStyle.Normal });
        TextInput.enterKeyType(EnterKeyType.Next);
        TextInput.caretColor(Color.Green);
        TextInput.width('90%');
        TextInput.height(60);
        TextInput.maxLength(20);
        TextInput.margin(5);
        TextInput.onChange((value: string) => {
            this.email = value;
        });
        TextInput.create({ placeholder: 'Password' });
        TextInput.type(InputType.Password);
        TextInput.placeholderColor(Color.Blue);
        TextInput.placeholderFont({ size: 40, weight: FontWeight.Normal, family: "sans-serif", style: FontStyle.Normal });
        TextInput.enterKeyType(EnterKeyType.Next);
        TextInput.caretColor(Color.Green);
        TextInput.width('90%');
        TextInput.height(60);
        TextInput.maxLength(20);
        TextInput.margin(5);
        TextInput.onChange((value: string) => {
            this.userPassword = value;
        });
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Login!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickLogin();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("LoginWithAuthToken!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickLoginWithAuthToken();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Me!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickMe();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Users List!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickUsersList();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("User's Info!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickUsersInfo();
        });
        Text.pop();
        Column.pop();
        TextInput.create({ placeholder: 'Username' });
        TextInput.type(InputType.Normal);
        TextInput.placeholderColor(Color.Blue);
        TextInput.placeholderFont({ size: 40, weight: FontWeight.Normal, family: "sans-serif", style: FontStyle.Normal });
        TextInput.enterKeyType(EnterKeyType.Next);
        TextInput.caretColor(Color.Green);
        TextInput.width('90%');
        TextInput.height(60);
        TextInput.maxLength(20);
        TextInput.margin(5);
        TextInput.onChange((value: string) => {
            this.userName = value;
        });
        TextInput.create({ placeholder: 'User Id' });
        TextInput.type(InputType.Normal);
        TextInput.placeholderColor(Color.Blue);
        TextInput.placeholderFont({ size: 40, weight: FontWeight.Normal, family: "sans-serif", style: FontStyle.Normal });
        TextInput.enterKeyType(EnterKeyType.Next);
        TextInput.caretColor(Color.Green);
        TextInput.width('90%');
        TextInput.height(60);
        TextInput.maxLength(20);
        TextInput.margin(5);
        TextInput.onChange((value: string) => {
            this.presenceUserId = value;
        });
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("User's Presence!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickUsersPresence();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("User Set Avatar!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickUserSetAvatar();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Settings!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickSettings();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Page Visited!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickPageVisited();
        });
        Text.pop();
        Column.pop();
        TextInput.create({ placeholder: 'Visitor Name' });
        TextInput.type(InputType.Normal);
        TextInput.placeholderColor(Color.Blue);
        TextInput.placeholderFont({ size: 40, weight: FontWeight.Normal, family: "sans-serif", style: FontStyle.Normal });
        TextInput.enterKeyType(EnterKeyType.Next);
        TextInput.caretColor(Color.Green);
        TextInput.width('90%');
        TextInput.height(60);
        TextInput.maxLength(20);
        TextInput.margin(5);
        TextInput.inputFilter('^[a-zA-Z0-9]+$', (e) => {
            this.showToast("ֻ�����������ֺ�Ӣ��");
        });
        TextInput.onChange((value: string) => {
            this.visitorName = value;
        });
        TextInput.create({ placeholder: 'Visitor Email(optional)' });
        TextInput.type(InputType.Normal);
        TextInput.placeholderColor(Color.Blue);
        TextInput.placeholderFont({ size: 30, weight: FontWeight.Normal, family: "sans-serif", style: FontStyle.Normal });
        TextInput.enterKeyType(EnterKeyType.Next);
        TextInput.caretColor(Color.Green);
        TextInput.width('90%');
        TextInput.height(60);
        TextInput.maxLength(20);
        TextInput.margin(5);
        TextInput.onChange((value: string) => {
            this.visitorEmail = value;
        });
        TextInput.create({ placeholder: 'Visitor Token(optional)' });
        TextInput.type(InputType.Normal);
        TextInput.placeholderColor(Color.Blue);
        TextInput.placeholderFont({ size: 30, weight: FontWeight.Normal, family: "sans-serif", style: FontStyle.Normal });
        TextInput.enterKeyType(EnterKeyType.Next);
        TextInput.caretColor(Color.Green);
        TextInput.width('90%');
        TextInput.height(60);
        TextInput.maxLength(20);
        TextInput.margin(5);
        TextInput.onChange((value: string) => {
            this.visitorToken = value;
        });
        TextInput.create({ placeholder: 'Phone(optional)' });
        TextInput.type(InputType.Number);
        TextInput.placeholderColor(Color.Blue);
        TextInput.placeholderFont({ size: 30, weight: FontWeight.Normal, family: "sans-serif", style: FontStyle.Normal });
        TextInput.enterKeyType(EnterKeyType.Next);
        TextInput.caretColor(Color.Green);
        TextInput.width('90%');
        TextInput.height(60);
        TextInput.maxLength(20);
        TextInput.margin(5);
        TextInput.onChange((value: string) => {
            this.visitorPhone = value;
        });
        TextInput.create({ placeholder: 'Address(optional)' });
        TextInput.type(InputType.Normal);
        TextInput.placeholderColor(Color.Blue);
        TextInput.placeholderFont({ size: 30, weight: FontWeight.Normal, family: "sans-serif", style: FontStyle.Normal });
        TextInput.enterKeyType(EnterKeyType.Next);
        TextInput.caretColor(Color.Green);
        TextInput.width('90%');
        TextInput.height(60);
        TextInput.maxLength(20);
        TextInput.margin(5);
        TextInput.onChange((value: string) => {
            this.visitorAddress = value;
        });
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Visitor Registration!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickVisitorRegistration();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Retrieve Visitor!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickRetrieveVisitor();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Set Visitor Status!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickSetVisitorStatus();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Visitor Delete!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickVisitorDelete();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Banners End Point!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickBannersEndPoint();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Get Banners!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickGetBanners();
        });
        Text.pop();
        Column.pop();
        TextInput.create({ placeholder: 'Channel Name' });
        TextInput.type(InputType.Normal);
        TextInput.placeholderColor(Color.Blue);
        TextInput.placeholderFont({ size: 40, weight: FontWeight.Normal, family: "sans-serif", style: FontStyle.Normal });
        TextInput.enterKeyType(EnterKeyType.Next);
        TextInput.caretColor(Color.Green);
        TextInput.width('90%');
        TextInput.height(60);
        TextInput.maxLength(20);
        TextInput.margin(5);
        TextInput.inputFilter('^[a-zA-Z0-9]+$', (e) => {
            this.showToast("ֻ�����������ֺ�Ӣ��");
        });
        TextInput.onChange((value: string) => {
            this.channelName = value;
        });
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Create Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickCreateChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Channel Post Message!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickPostMessageChat();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Channel Update Message!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickUpdateMessageChat();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Channel Delete Message!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickDeleteMessageChat();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Invite Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickInviteChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Add Leader Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickAddLeaderChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Remove Leader Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickRemoveLeaderChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Add Moderator Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickAddModeratorChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Remove Moderator Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickRemoveModeratorChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Add Owner Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickAddOwnerChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Remove Owner Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickRemoveOwnerChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Set Channel Purpose!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickSetPurposeChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Set Read Only Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickSetReadOnlyChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Archive Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickArchiveChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("UnArchive Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickUnArchiveChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Counter Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickCounterChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Files Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickFilesChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Get History Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickHistoryChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Info Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickInfoChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Join Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickJoinChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Kick Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickKickChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("List Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickListChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Join List Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickJoinListChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Members Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickMembersChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Online Channel Users!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickOnlineChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("User All Mention By Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickGetUserAllMentionByChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Rename Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickRenameChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Roles Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickRolesChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Set Announcement Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickSetAnnouncementChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Set Join Code Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickSetJoinCodeChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Set Channel Topic!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickSetTopicChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Close Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickCloseChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Open Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickOpenChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Get Integrations Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickGetIntegrationsChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Set Default Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickSetDefaultChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Leave Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickLeaveChannel();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Delete Channel!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickDeleteChannel();
        });
        Text.pop();
        Column.pop();
        TextInput.create({ placeholder: 'Group Name' });
        TextInput.type(InputType.Normal);
        TextInput.placeholderColor(Color.Blue);
        TextInput.placeholderFont({ size: 40, weight: FontWeight.Normal, family: "sans-serif", style: FontStyle.Normal });
        TextInput.enterKeyType(EnterKeyType.Next);
        TextInput.caretColor(Color.Green);
        TextInput.width('90%');
        TextInput.height(60);
        TextInput.maxLength(20);
        TextInput.margin(5);
        TextInput.inputFilter('^[a-zA-Z0-9]+$', (e) => {
            this.showToast("ֻ�����������ֺ�Ӣ��");
        });
        TextInput.onChange((value: string) => {
            this.groupName = value;
        });
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Create a Group!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickGroupCreate();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Group Add All!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickGroupAddAll();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Group Invite!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickGroupInvite();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Group Add Moderator!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickGroupAddModerator();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Group Remove Moderator!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickGroupRemoveModerator();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Add Owner!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickGroupAddOwner();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Group Remove Owner!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickGroupRemoveOwner();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Group Info!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickGroupInfo();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Group List!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickGroupList();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Set Description!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickSetDescription();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Group History!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickGroupHistory();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Set Purpose!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickSetPurpose();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Set Topic!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickSetTopic();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Group Close!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickGroupClose();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Group Open!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickGroupOpen();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Group Rename!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickGroupRename();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Group Kick!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickGroupKick();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Group Archive!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickGroupArchive();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Group Integrations!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickGroupIntegrations();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Group UnArchive!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickGroupUnArchive();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Group Leave!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickGroupLeave();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Group Set ReadOnly!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickSetReadOnly();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Group Add Leader!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickGroupAddLeader();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Delete Group!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickGroupDelete();
        });
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin(5);
        Column.align(Alignment.Center);
        Text.create("Logout!!");
        Text.width('90%');
        Text.height(40);
        Text.backgroundColor(0x5733FF);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.fontSize('22vp');
        Text.onClick(() => {
            this.onClickLogout();
        });
        Text.pop();
        Column.pop();
        Flex.pop();
        Scroll.pop();
        Stack.pop();
    }
    onClickLogin() {
        let that = this;
        restAPI = new RestAPI("https://open.rocket.chat/api/v1/", this.email, this.userPassword);
        restAPI.login().then((data: any) => {
            console.info("onClickLogin data:" + JSON.stringify(data));
            authToken = data.data.authToken;
            userId = data.data.userId;
            console.info("authToken data:" + authToken);
            console.info("authToken userId:" + userId);
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("onClickLogin error:" + error);
        });
    }
    onClickLoginWithAuthToken() {
        let that = this;
        restAPI.loginWithAuthToken(authToken).then((data: any) => {
            console.info("onClickLogin data:" + JSON.stringify(data));
            authToken = data.data.authToken;
            userId = data.data.userId;
            console.info("authToken data:" + authToken);
            console.info("authToken userId:" + userId);
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("onClickLogin error:" + error);
        });
    }
    onClickMe() {
        let that = this;
        restAPI.me().then((data: string) => {
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
        });
    }
    onClickUsersList() {
        let that = this;
        let data: OnClickUsersListData = { fields: { name: 1, emails: 1 }, query: { active: true, type: { $in: ['user', 'bot'] } } };
        restAPI.usersList(data).then((data: string) => {
            console.info("usersList:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("usersList:" + error);
        });
    }
    onClickUsersCreate() {
        let that = this;
        let data: OnClickUsersCreate = {
            name: that.createUserName,
            email: that.createUserEmail,
            password: that.createUserPassword,
            username: that.createUserPreferredName,
            active: true,
            roles: ['user'],
            joinDefaultChannels: true,
            requirePasswordChange: false,
            sendWelcomeEmail: false,
            verified: false
        };
        restAPI.userCreate(data).then((data: any) => {
            console.info("userCreate:" + JSON.stringify(data));
            user_id = data.user._id;
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("userCreate:" + error);
        });
    }
    onClickPageVisited() {
        let that = this;
        //Add room id from realtime api or after creating channel
        let pageData: PageData = {
            token: authToken,
            rid: "4Eyfj2XLKiRDboAjE",
            pageInfo: {
                change: "url",
                title: "",
                location: {
                    href: "https://open.rocket.chat/packages/rocketchat_livechat/assets/demo.html#page-4"
                }
            }
        };
        restAPI.pageVisited(pageData).then((data: string) => {
            console.info("pageData data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("pageData error:" + error);
        });
    }
    onClickVisitorRegistration() {
        let that = this;
        //Add a user defined token
        if (that.visitorName.trim().length == 0) {
            this.showToast("visitor name ������Ϊ��");
        }
        else {
            if (that.visitorPhone.trim().length > 0 && (that.visitorPhone.trim().length != 11 || that.visitorPhone.trim().search("1") != 0)) {
                this.showToast("��������ȷ���ֻ���");
            }
            else {
                if (that.visitorEmail.trim().length > 0 && that.visitorEmail.search("@") < 0) {
                    this.showToast("��������ȷ������");
                }
                else {
                    let visitorInfo: VisitorInfo = {
                        visitor: {
                            name: that.visitorName,
                            email: that.visitorEmail,
                            token: that.visitorToken,
                            phone: that.visitorPhone,
                            customFields: [{ key: "address", value: that.visitorAddress, overwrite: true }]
                        }
                    };
                    restAPI.visitorRegistration(visitorInfo).then((data: string) => {
                        console.info("visitorRegistration data:" + JSON.stringify(data));
                        that.showToast("Success");
                    }).catch((error: string) => {
                        that.showToast("Error :" + error);
                        console.info("visitorRegistration error:" + error);
                    });
                }
            }
        }
    }
    onClickRetrieveVisitor() {
        let that = this;
        restAPI.visitor(that.visitorToken).then((data: string) => {
            console.info("visitor data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("visitor error:" + error);
        });
    }
    onClickSetVisitorStatus() {
        let that = this;
        let visitorStatus: VisitorStatus = {
            token: that.visitorToken,
            status: "busy",
        };
        restAPI.setVisitorStatus(visitorStatus).then((data: string) => {
            console.info("visitorStatus data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("visitorStatus error:" + error);
        });
    }
    onClickVisitorDelete() {
        let that = this;
        restAPI.visitorDelete(that.visitorToken).then((data: string) => {
            console.info("visitorDelete data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("visitorDelete error:" + error);
        });
    }
    onClickBannersEndPoint() {
        let that = this;
        //Banner id if not available can pass null, as get bannerId or create banner id not available in api list
        restAPI.bannersEndPoint(null).then((data: string) => {
            console.info("bannersEndPoint data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("bannersEndPoint error:" + error);
        });
    }
    onClickGetBanners() {
        let that = this;
        restAPI.getBanners().then((data: string) => {
            console.info("getBanners data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("getBanners error:" + error);
        });
    }
    onClickCreateChannel() {
        let that = this;
        let readOnly = true;
        if (that.channelName.trim().length == 0) {
            that.showToast("channelName ������Ϊ��");
        }
        else {
            restAPI.createChannel(that.channelName, ['userName1', 'userName2'], readOnly).then((data: any) => {
                console.info("createChannel data:" + JSON.stringify(data));
                that.showToast("Success");
            }).catch((error: string) => {
                that.showToast("Error :" + error);
                console.info("createChannel error:" + error);
            });
        }
    }
    onClickAddAllChannel() {
        let that = this;
        let roomID = channelId;
        let activeUsersOnly = true;
        restAPI.addAllChannel(channelId, activeUsersOnly).then((data: any) => {
            console.info("AddAllChannel data:" + JSON.stringify(data));
            let addedUsers: any = data.channel.usernames;
            console.info("AddAllChannel addedUsers:" + addedUsers);
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("AddAllChannel error:" + error);
        });
    }
    onClickInviteChannel() {
        let that = this;
        //Add a userid of another user
        let data: Data = { roomId: channelId, userId: otherUserId };
        restAPI.inviteChannel(data).then((data: string) => {
            console.info("inviteChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("inviteChannel error:" + error);
        });
    }
    onClickAddLeaderChannel() {
        let that = this;
        let leaderData: Data = { roomId: channelId,
            userId: userId };
        restAPI.addLeaderChannel(leaderData).then((data: string) => {
            console.info("addLeaderChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("addLeaderChannel error:" + error);
        });
    }
    onClickAddModeratorChannel() {
        let that = this;
        let moderatorData: Data = { roomId: channelId,
            userId: userId };
        restAPI.addModeratorChannel(moderatorData).then((data: string) => {
            console.info("addModeratorChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("addModeratorChannel error:" + error);
        });
    }
    onClickAddOwnerChannel() {
        let that = this;
        let ownerData: Data = { roomId: channelId,
            userId: otherUserId };
        restAPI.addOwnerChannel(ownerData).then((data: string) => {
            console.info("addOwnerChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("addOwnerChannel error:" + error);
        });
    }
    onClickCounterChannel() {
        let that = this;
        let roomId = "snLhQqKN6NXLEfEey";
        let roomName = "TestRoomName"; //Pass an existing room name
        restAPI.counterChannel(roomId, roomName).then((data: string) => {
            console.info("counterChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("counterChannel error:" + error);
        });
    }
    onClickGetUserAllMentionByChannel() {
        let that = this;
        restAPI.getUserAllMentionByChannel(channelId).then((data: string) => {
            console.info("onClickGetUserAllMentionByChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("onClickGetUserAllMentionByChannel error:" + error);
        });
    }
    onClickFilesChannel() {
        let that = this;
        restAPI.filesChannel(channelId, roomName).then((data: string) => {
            console.info("filesChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("filesChannel error:" + error);
        });
    }
    onClickHistoryChannel() {
        let that = this;
        let inclusive = true;
        let offset = 2;
        let count = 100;
        let unreads = true;
        let sampleDate = "2022-03-29";
        let oldestDate = new Date(sampleDate);
        let oldestUTC = Date.UTC(oldestDate.getUTCFullYear(), oldestDate.getUTCMonth(), oldestDate.getUTCDate(), oldestDate.getUTCHours(), oldestDate.getUTCMinutes(), oldestDate.getUTCSeconds());
        let latestDate = new Date();
        let latestUTC = Date.UTC(latestDate.getUTCFullYear(), latestDate.getUTCMonth(), latestDate.getUTCDate(), latestDate.getUTCHours(), latestDate.getUTCMinutes(), latestDate.getUTCSeconds());
        let latest = new Date(latestUTC);
        let oldest = new Date(oldestUTC);
        let optionalParams: OptionalParams = {
            latest: latest.toISOString(),
            oldest: oldest.toISOString(),
            inclusive: inclusive,
            offset: offset,
            count: count,
            unreads: unreads
        };
        restAPI.historyChannel(channelId, optionalParams).then((data: string) => {
            console.info("historyChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("historyChannel error:" + error);
        });
    }
    onClickInfoChannel() {
        let that = this;
        let roomOptionalId = undefined;
        restAPI.infoChannel(roomOptionalId, roomName).then((data: string) => {
            console.info("infoChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("infoChannel error:" + error);
        });
    }
    onClickJoinChannel() {
        let that = this;
        let joinCode = "Rocket";
        restAPI.joinChannel(channelId, joinCode).then((data: string) => {
            console.info("joinChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("joinChannel error:" + error);
        });
    }
    onClickKickChannel() {
        let that = this;
        restAPI.kickChannel(channelId, userId).then((data: string) => {
            console.info("kickChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("kickChannel error:" + error);
        });
    }
    onClickLeaveChannel() {
        let that = this;
        restAPI.leaveChannel(channelId).then((data: string) => {
            console.info("leaveChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("leaveChannel error:" + error);
        });
    }
    onClickListChannel() {
        let that = this;
        restAPI.listChannel().then((data: string) => {
            console.info("listChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("listChannel error:" + error);
        });
    }
    onClickJoinListChannel() {
        let that = this;
        restAPI.joinListChannel().then((data: string) => {
            console.info("joinListChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("joinListChannel error:" + error);
        });
    }
    onClickMembersChannel() {
        let that = this;
        let roomOptionalId = undefined;
        restAPI.membersChannel(roomOptionalId, roomName).then((data: string) => {
            console.info("membersChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("membersChannel error:" + error);
        });
    }
    onClickMessageChannel() {
        let that = this;
        restAPI.messageChannel(channelId, roomName).then((data: string) => {
            console.info("messageChannel data:" + JSON.stringify(data));
            that.showToast("Success" + JSON.stringify(data));
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("messageChannel error:" + error);
        });
    }
    onClickOnlineChannel() {
        let that = this;
        restAPI.onlineChannel(channelId).then((data: string) => {
            console.info("onlineChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("onlineChannel error:" + error);
        });
    }
    onClickRenameChannel() {
        let that = this;
        let name = "RenamedChannel2";
        restAPI.renameChannel(channelId, name).then((data: string) => {
            console.info("renameChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("renameChannel error:" + error);
        });
    }
    onClickRolesChannel() {
        let that = this;
        restAPI.rolesChannel(channelId, roomName).then((data: string) => {
            console.info("rolesChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("rolesChannel error:" + error);
        });
    }
    onClickSetAnnouncementChannel() {
        let that = this;
        let announcement = "hello";
        restAPI.setAnnouncementChannel(channelId, announcement).then((data: string) => {
            console.info("setAnnouncementChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("setAnnouncementChannel error:" + error);
        });
    }
    onClickSetCustomFieldsChannel() {
        let that = this;
        let customField: CustomField = { organization: "tra-la-la" };
        // channelId can be replaced as first parameter instead of undefined in below api call
        restAPI.setCustomFieldsChannel(undefined, roomName, customField).then((data: string) => {
            console.info("setCustomFieldsChannel data:" + JSON.stringify(data));
            that.showToast("Success" + JSON.stringify(data));
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("setCustomFieldsChannel error:" + error);
        });
    }
    onClickSetJoinCodeChannel() {
        let that = this;
        let joinCode = "test";
        restAPI.setJoinCodeChannel(channelId, joinCode).then((data: string) => {
            console.info("setJoinCodeChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("setJoinCodeChannel error:" + error);
        });
    }
    onClickSetPurposeChannel() {
        let that = this;
        let purpose = "test";
        restAPI.setPurposeChannel(channelId, purpose).then((data: string) => {
            console.info("setPurposeChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("setPurposeChannel error:" + error);
        });
    }
    onClickSetTopicChannel() {
        let that = this;
        let topic = "Test";
        restAPI.setTopicChannel(channelId, topic).then((data: string) => {
            console.info("setTopicChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("setTopicChannel error:" + error);
        });
    }
    onClickSetTypeChannel() {
        let that = this;
        let channelType = "p";
        restAPI.setTypeChannel(channelId, roomName, channelType).then((data: string) => {
            console.info("setTypeChannel data:" + JSON.stringify(data));
            that.showToast("Success" + JSON.stringify(data));
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("setTypeChannel error:" + error);
        });
    }
    onClickArchiveChannel() {
        let that = this;
        restAPI.archiveChannel(channelId).then((data: string) => {
            console.info("archiveChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("archiveChannel error:" + error);
        });
    }
    onClickDeleteChannel() {
        let that = this;
        restAPI.deleteChannel(channelId, roomName).then((data: string) => {
            console.info("deleteChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("deleteChannel error:" + error);
        });
    }
    onClickCloseChannel() {
        let that = this;
        restAPI.closeChannel(channelId).then((data: string) => {
            console.info("closeChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("closeChannel error:" + error);
        });
    }
    onClickOpenChannel() {
        let that = this;
        restAPI.openChannel(channelId).then((data: string) => {
            console.info("OpenChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("OpenChannel error:" + error);
        });
    }
    onClickRemoveLeaderChannel() {
        let that = this;
        restAPI.removeLeaderChannel(channelId, userId).then((data: string) => {
            console.info("removeLeaderChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("removeLeaderChannel error:" + error);
        });
    }
    onClickRemoveModeratorChannel() {
        let that = this;
        restAPI.removeModeratorChannel(channelId, userId).then((data: string) => {
            console.info("removeModeratorChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("removeModeratorChannel error:" + error);
        });
    }
    onClickRemoveOwnerChannel() {
        let that = this;
        restAPI.removeOwnerChannel(channelId, otherUserId).then((data: string) => {
            console.info("removeOwnerChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("removeOwnerChannel error:" + error);
        });
    }
    onClickSetReadOnlyChannel() {
        let that = this;
        let readOnly = false;
        restAPI.setReadOnlyChannel(channelId, true).then((data: string) => {
            console.info("setReadOnlyChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("setReadOnlyChannel error:" + error);
        });
    }
    onClickSetDefaultChannel() {
        let that = this;
        let isDefault = false;
        restAPI.setDefaultChannel(channelId, isDefault).then((data: string) => {
            console.info("setDefaultChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("setDefaultChannel error:" + error);
        });
    }
    onClickUnArchiveChannel() {
        let that = this;
        restAPI.unArchiveChannel(channelId).then((data: string) => {
            console.info("unArchiveChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("unArchiveChannel error:" + error);
        });
    }
    onClickGroupAddLeader() {
        let that = this;
        restAPI.groupAddLeader(groupID, userId).then((data: string) => {
            console.info("group Add Leader data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("group Add Leader error:" + error);
        });
    }
    onClickGroupAddModerator() {
        let that = this;
        restAPI.groupAddModerator(groupID, userId).then((data: string) => {
            console.info("group Add Moderator data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("group Add Moderator error:" + error);
        });
    }
    onClickGroupArchive() {
        let that = this;
        restAPI.groupArchive(groupID).then((data: string) => {
            console.info("groupArchive data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("groupArchive error:" + error);
        });
    }
    onClickGroupUnArchive() {
        let that = this;
        restAPI.groupUnArchive(groupID).then((data: string) => {
            console.info("groupUnArchive data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("groupUnArchive error:" + error);
        });
    }
    onClickGroupCreate() {
        let that = this;
        let readOnly = true;
        if (that.groupName.trim().length == 0) {
            this.showToast("group name ������Ϊ��");
        }
        else {
            restAPI.groupCreate(that.groupName, ['userName1', 'userName2'], readOnly).then((data: any) => {
                console.info("restApiSample groupCreate data:" + JSON.stringify(data));
                console.info('groupCreate data:' + JSON.stringify(data));
                that.showToast("Success");
            }).catch((error: string) => {
                that.showToast("Error :" + error);
                console.info("groupCreate error:" + error);
            });
        }
    }
    onClickGroupIntegrations() {
        let that = this;
        restAPI.groupIntegrations(groupID).then((data: string) => {
            console.info("groupIntegrations data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("groupIntegrations error:" + error);
        });
    }
    onClickGroupInvite() {
        let that = this;
        restAPI.groupInvite(groupID, otherUserId).then((data: string) => {
            console.info("groupInvite data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("groupInvite error:" + error);
        });
    }
    onClickGroupRename() {
        let that = this;
        restAPI.groupRename("DevGroupRename26", groupID).then((data: string) => {
            console.info("groupRename data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("groupRename error:" + error);
        });
    }
    onClickGroupDelete() {
        let that = this;
        restAPI.groupDelete(groupID, roomName).then((data: string) => {
            console.info("groupDelete data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("groupDelete error:" + error);
        });
    }
    onClickGroupAddAll() {
        let that = this;
        let activeUsersOnly = true;
        restAPI.groupAddAll(groupID, activeUsersOnly).then((data: string) => {
            console.info("groupAddAll data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("groupAddAll error:" + error);
        });
    }
    onClickGroupAddOwner() {
        let that = this;
        restAPI.groupAddOwner(groupID, otherUserId).then((data: string) => {
            console.info("groups.addOwner data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("groups.addOwner error:" + error);
        });
    }
    onClickGroupRemoveOwner() {
        let that = this;
        restAPI.groupRemoveOwner(groupID, userId).then((data: string) => {
            console.info("groups.removeOwner data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("groups.removeOwner error:" + error);
        });
    }
    onClickGroupRemoveModerator() {
        let that = this;
        restAPI.groupRemoveModerator(groupID, userId).then((data: string) => {
            console.info("groupRemoveModerator data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("groupRemoveModerator error:" + error);
        });
    }
    onClickGroupInfo() {
        let that = this;
        let roomName = undefined;
        restAPI.groupInfo(groupID, roomName).then((data: string) => {
            console.info("groupInfo data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("groupInfo error:" + error);
        });
    }
    onClickGroupList() {
        let that = this;
        restAPI.groupList().then((data: string) => {
            console.info("groupList data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("groupList error:" + error);
        });
    }
    onClickGroupHistory() {
        let that = this;
        let inclusive = true;
        let offset = 2;
        let count = 100;
        let unreads = true;
        let sampleDate = "2022-03-29";
        let oldestDate = new Date(sampleDate);
        let oldestUTC = Date.UTC(oldestDate.getUTCFullYear(), oldestDate.getUTCMonth(), oldestDate.getUTCDate(), oldestDate.getUTCHours(), oldestDate.getUTCMinutes(), oldestDate.getUTCSeconds());
        let latestDate = new Date();
        let latestUTC = Date.UTC(latestDate.getUTCFullYear(), latestDate.getUTCMonth(), latestDate.getUTCDate(), latestDate.getUTCHours(), latestDate.getUTCMinutes(), latestDate.getUTCSeconds());
        let latest = new Date(latestUTC);
        let oldest = new Date(oldestUTC);
        let optionalParams: OptionalParams = {
            latest: latest.toISOString(),
            oldest: oldest.toISOString(),
            inclusive: inclusive,
            offset: offset,
            count: count,
            unreads: unreads
        };
        restAPI.groupHistory(groupID, optionalParams).then((data: string) => {
            console.info("groupHistory data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("groupHistory error:" + error);
        });
    }
    onClickSetDescription() {
        let that = this;
        restAPI.groupSetDescription(groupID, "SetDescription").then((data: string) => {
            console.info("groupSetDescription data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("groupSetDescription error:" + error);
        });
    }
    onClickGroupOpen() {
        let that = this;
        restAPI.groupOpen(groupID).then((data: string) => {
            console.info("groupOpen data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("groupOpen error:" + error);
        });
    }
    onClickGroupClose() {
        let that = this;
        restAPI.groupClose(groupID).then((data: string) => {
            console.info("groupClose data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("groupClose error:" + error);
        });
    }
    onClickGroupKick() {
        let that = this;
        restAPI.groupKick(groupID, userId).then((data: string) => {
            console.info("groupKick data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("groupKick error:" + error);
        });
    }
    onClickGroupLeave() {
        let that = this;
        restAPI.groupLeave(groupID).then((data: string) => {
            console.info("groupLeave data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("groupLeave error:" + error);
        });
    }
    onClickSetPurpose() {
        let that = this;
        restAPI.groupSetPurpose(groupID, "Test out everything").then((data: string) => {
            console.info("groupSetPurpose data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("groupSetPurpose error:" + error);
        });
    }
    onClickSetReadOnly() {
        let that = this;
        let readOnly = false;
        restAPI.groupSetReadOnly(groupID, false).then((data: string) => {
            console.info("setReadOnly data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("setReadOnly error:" + error);
        });
    }
    onClickSetTopic() {
        let that = this;
        let readOnly = false;
        restAPI.groupSetTopic(groupID, "GroupTopic").then((data: string) => {
            console.info("groupSetTopic data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("groupSetTopic error:" + error);
        });
    }
    onClickSetType() {
        let that = this;
        restAPI.groupSetType(groupID, 'c').then((data: string) => {
            console.info("groupSetType data:" + JSON.stringify(data));
            that.showToast(JSON.stringify(data));
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("groupSetType error:" + error);
        });
    }
    onClickSettings() {
        let that = this;
        restAPI.settings().then((data: string) => {
            console.info("settings:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("settings :" + error);
            console.info("settings:" + error);
        });
    }
    onClickLogout() {
        let that = this;
        restAPI.logout().then((data: string) => {
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
        });
    }
    onClickPostMessageChat() {
        let postMessageData: PostMessageData = {
            channel: "#" + roomName,
            emoji: ":smirk:",
            roomId: channelId,
            text: "Hello",
            attachments: [
                {
                    audio_url: "http://www.w3schools.com/tags/horse.mp3",
                    author_icon: "https://avatars.githubusercontent.com/u/850391?v=3",
                    author_link: "https://rocket.chat/",
                    author_name: "Bradley Hilton",
                    collapsed: false,
                    color: Color.White,
                    fields: [
                        {
                            short: true,
                            title: "Test",
                            value: "Testing out something or other"
                        },
                        {
                            short: true,
                            title: "Another Test",
                            value: "[Link](http://www.w3schools.com) something and this and that."
                        }
                    ],
                    message_link: "http://www.w3schools.com",
                    text: "Yay for gruggy!",
                    thumb_url: "https://via.placeholder.com/300/09f/fff.png",
                    title: "Attachment Example",
                    title_link: "http://www.w3schools.com",
                    title_link_download: true,
                    ts: "2016-12-09T16:53:06.761Z",
                    video_url: "http://www.w3schools.com/tags/movie.mp4"
                }
            ]
        };
        let that = this;
        restAPI.postMessageChat(postMessageData).then((data: any) => {
            console.info("postMessageChat data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("logout error:" + error);
        });
    }
    onClickUpdateMessageChat() {
        let that = this;
        restAPI.updateMessageChat(channelId, messageId, "Hello Everyone!!").then((data: string) => {
            console.info("updateMessageChat data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("updateMessageChat error:" + error);
        });
    }
    onClickDeleteMessageChat() {
        let that = this;
        restAPI.deleteMessageChat(channelId, messageId, true).then((data: string) => {
            console.info("deleteMessageChat data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("deleteMessageChat error:" + error);
        });
    }
    onClickUserSetAvatar() {
        let that = this;
        let data: AvatarData = new AvatarData();
        let userName: string = "";
        if ((userName.trim().length || 0) > 0) {
            data = {
                avatarUrl: "https://via.placeholder.com/300/09f/fff.png",
                username: userName
            };
        }
        else if ((user_id?.trim()?.length || 0) > 0) {
            data = {
                avatarUrl: "https://via.placeholder.com/300/09f/fff.png",
                userId: user_id
            };
        }
        restAPI.setAvatar(data).then((data: string) => {
            console.info("setAvatar:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("setAvatar:" + error);
        });
    }
    onClickGetIntegrationsChannel() {
        let that = this;
        restAPI.getIntegrationChannel(channelId).then((data: string) => {
            console.info("getIntegrationsChannel data:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("getIntegrationsChannel error:" + error);
        });
    }
    onClickUsersInfo() {
        let that = this;
        restAPI.usersInfo(user_id, undefined).then((data: string) => {
            console.info("usersInfo:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("usersInfo:" + error);
        });
    }
    onClickUsersPresence() {
        let that = this;
        let data: OnClickUsersPresenceData = { userId: this.presenceUserId, userName: this.userName };
        restAPI.usersPresence(data).then((data: string) => {
            console.info("usersPresence:" + JSON.stringify(data));
            that.showToast(JSON.stringify(data));
        }).catch((error: string) => {
            that.showToast("Error :" + error);
            console.info("usersPresence:" + error);
        });
    }
    onClickUserDelete() {
        let that = this;
        let data: OnClickUserDeleteData = {};
        let userName = this.userName;
        if ((userName?.trim()?.length || 0) > 0) {
            data = { username: userName, confirmRelinquish: false };
        }
        else if ((user_id?.trim()?.length || 0) > 0) {
            data = { userId: user_id, confirmRelinquish: false };
        }
        restAPI.userDelete(JSON.stringify(data)).then((data: string) => {
            console.info("userDelete:" + JSON.stringify(data));
            that.showToast("Success");
        }).catch((error: string) => {
            that.showToast("userDelete :" + error);
            console.info("userDelete:" + error);
        });
    }
    showToast(message: string) {
        prompt.showToast({ message: message, duration: 3000 });
    }
}
loadDocument(new Index("1", undefined, {}));
