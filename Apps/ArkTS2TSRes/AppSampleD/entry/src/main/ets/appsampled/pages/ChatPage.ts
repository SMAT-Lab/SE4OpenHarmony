interface ChatPage_Params {
    scroller?: Scroller;
    scrollerTool?: Scroller;
    chats?: ChatSource;
    toolArr?: Array<Tool>;
    isSend?: boolean;
    isInput?: boolean;
    currentUser?: User | null;
    oppositeUser?: User | null;
    userInfo?: LoginResult | null;
    chatController?: ChatController;
    inputValue?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ChatPage_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import router from '@ohos.router';
import Logger from '../../utils/Logger';
import { ChatSource } from '../data/DataSource';
import ChatComponent from '../../component/ChatComponent';
import { ChatBox } from '../data/ChatBox';
import { getMockTool } from '../../mock/MockData';
import Tool from '../data/Tool';
import User from '../data/User';
import ChatController from '../../controller/ChatController';
import LoginResult from '../data/LoginResult';
const TAG: string = '[ChatPage]';
class ChatPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.scrollerTool = new Scroller();
        this.__chats = new ObservedPropertyObject(new ChatSource(), this, "chats");
        this.toolArr = getMockTool();
        this.__isSend = new ObservedPropertySimple(true, this, "isSend");
        this.__isInput = new ObservedPropertySimple(false, this, "isInput");
        this.currentUser = null;
        this.oppositeUser = null;
        this.userInfo = null;
        this.chatController = new ChatController();
        this.__inputValue = new ObservedPropertySimple('', this, "inputValue");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ChatPage_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.scrollerTool !== undefined) {
            this.scrollerTool = params.scrollerTool;
        }
        if (params.chats !== undefined) {
            this.chats = params.chats;
        }
        if (params.toolArr !== undefined) {
            this.toolArr = params.toolArr;
        }
        if (params.isSend !== undefined) {
            this.isSend = params.isSend;
        }
        if (params.isInput !== undefined) {
            this.isInput = params.isInput;
        }
        if (params.currentUser !== undefined) {
            this.currentUser = params.currentUser;
        }
        if (params.oppositeUser !== undefined) {
            this.oppositeUser = params.oppositeUser;
        }
        if (params.userInfo !== undefined) {
            this.userInfo = params.userInfo;
        }
        if (params.chatController !== undefined) {
            this.chatController = params.chatController;
        }
        if (params.inputValue !== undefined) {
            this.inputValue = params.inputValue;
        }
    }
    aboutToBeDeleted() {
        this.__chats.aboutToBeDeleted();
        this.__isSend.aboutToBeDeleted();
        this.__isInput.aboutToBeDeleted();
        this.__inputValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private scrollerTool: Scroller;
    private __chats: ObservedPropertyObject<ChatSource>;
    get chats() {
        return this.__chats.get();
    }
    set chats(newValue: ChatSource) {
        this.__chats.set(newValue);
    }
    private toolArr: Array<Tool>; // 用户信息模拟数据
    private __isSend: ObservedPropertySimple<boolean>; // 是否为发送消息
    get isSend() {
        return this.__isSend.get();
    }
    set isSend(newValue: boolean) {
        this.__isSend.set(newValue);
    }
    private __isInput: ObservedPropertySimple<boolean>; // 是否正在输入
    get isInput() {
        return this.__isInput.get();
    }
    set isInput(newValue: boolean) {
        this.__isInput.set(newValue);
    }
    private currentUser: User | null; // 当前用户信息
    private oppositeUser: User | null; // 对端用户信息
    private userInfo: LoginResult | null; // 登录返回结果信息
    private chatController: ChatController;
    private __inputValue: ObservedPropertySimple<string>;
    get inputValue() {
        return this.__inputValue.get();
    }
    set inputValue(newValue: string) {
        this.__inputValue.set(newValue);
    }
    aboutToAppear() {
        if (AppStorage.get("currentUser")) {
            this.currentUser = AppStorage.get("currentUser")!;
        }
        if (AppStorage.get("oppositeUser")) {
            this.oppositeUser = AppStorage.get("oppositeUser")!;
        }
        if (AppStorage.get("userInfo")) {
            this.userInfo = AppStorage.get("userInfo")!;
        }
        this.chatController.onMessage(this.userInfo?.getId(), (value: string) => {
            Logger.info(TAG, `ChatPage onMessage begin msg value: ${value}`);
            if (value) {
                this.chats.pushData(new ChatBox(false, value, this.oppositeUser?.getUserIcon()));
            }
        });
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor($r('app.color.COLOR_000000'));
        Row.create();
        Row.width('100%');
        Row.height('8%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Image.create($r('app.media.app_icon'));
        Image.id('chatBack');
        Image.width(20);
        Image.height(20);
        Image.objectFit(ImageFit.Contain);
        Image.margin({ left: 16 });
        Image.onClick(e => {
            router.back();
        });
        Image.create($r('app.media.app_icon'));
        Image.width(50);
        Image.height(50);
        Image.objectFit(ImageFit.Contain);
        Image.margin({ left: 16, right: 16 });
        Image.borderRadius(25);
        Text.create(this.oppositeUser?.getUsername());
        Text.height(30);
        Text.fontColor($r('app.color.COLOR_FFFFFF'));
        Text.fontSize(20);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.app_icon'));
        Image.width(32);
        Image.height(32);
        Image.objectFit(ImageFit.Contain);
        Image.margin({ left: 20 });
        Image.create($r('app.media.app_icon'));
        Image.width(32);
        Image.height(32);
        Image.objectFit(ImageFit.Contain);
        Image.margin({ left: 20 });
        Image.create($r('app.media.app_icon'));
        Image.width(32);
        Image.height(32);
        Image.objectFit(ImageFit.Contain);
        Image.margin({ left: 20, right: 20 });
        Row.pop();
        Divider.create();
        Divider.vertical(false);
        Divider.height(2);
        Divider.color($r('app.color.COLOR_1E1E1E'));
        // 消息滚动面板
        Column.create();
        // 消息滚动面板
        Column.width('100%');
        // 消息滚动面板
        Column.height('75%');
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.Off);
        Scroll.width('100%');
        Scroll.height('100%');
        Scroll.margin({ bottom: 8 });
        Scroll.align(Alignment.Top);
        Column.create();
        Column.width('100%');
        Column.margin({ top: 10 });
        LazyForEach.create("3", this, ObservedObject.GetRawObject(this.chats), (item: ChatBox, index: number) => {
            this.isRenderingInProgress = true;
            Row.create();
            Row.margin({ top: 5, bottom: 10 });
            let earlierCreatedChild_2: ChatComponent = (this && this.findChildById) ? this.findChildById("2") as ChatComponent : undefined;
            if (earlierCreatedChild_2 == undefined) {
                View.create(new ChatComponent("2", this, { item: item }));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({
                    item: item
                });
                if (!earlierCreatedChild_2.needsUpdate()) {
                    earlierCreatedChild_2.markStatic();
                }
                View.create(earlierCreatedChild_2);
            }
            Row.pop();
            this.isRenderingInProgress = false;
        }, (item: ChatBox) => item.message);
        LazyForEach.pop();
        Column.pop();
        Scroll.pop();
        // 消息滚动面板
        Column.pop();
        Column.create();
        Column.width('100%');
        Column.height('17%');
        // 工具栏
        Row.create();
        // 工具栏
        Row.width('100%');
        // 工具栏
        Row.height('40%');
        // 横向工具栏列表
        Scroll.create(this.scrollerTool);
        // 横向工具栏列表
        Scroll.scrollable(ScrollDirection.Horizontal);
        // 横向工具栏列表
        Scroll.scrollBar(BarState.Off);
        // 横向工具栏列表
        Scroll.width('95%');
        // 横向工具栏列表
        Scroll.height('100%');
        Row.create();
        Row.height('100%');
        Row.justifyContent(FlexAlign.Start);
        ForEach.create("4", this, ObservedObject.GetRawObject(this.toolArr), (tool: Tool) => {
            Row.create();
            Row.width(120);
            Row.height('80%');
            Row.margin({ left: 12 });
            Row.backgroundColor($r('app.color.COLOR_393939'));
            Row.borderRadius(18);
            Row.justifyContent(FlexAlign.Center);
            Image.create($r('app.media.app_icon'));
            Image.width(30);
            Image.height(30);
            Image.objectFit(ImageFit.Contain);
            Image.margin({ right: 8 });
            Text.create(tool.getToolName());
            Text.height(20);
            Text.fontColor($r('app.color.COLOR_E6FFFFFF'));
            Text.fontSize(16);
            Text.fontFamily($r('app.string.Font_family_regular'));
            Text.textAlign(TextAlign.Center);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.pop();
            Row.pop();
        });
        ForEach.pop();
        Row.pop();
        // 横向工具栏列表
        Scroll.pop();
        // 工具栏
        Row.pop();
        // 消息输入框
        Row.create();
        // 消息输入框
        Row.width('100%');
        // 消息输入框
        Row.height('60%');
        this.inputComponent(this);
        // 消息输入框
        Row.pop();
        Column.pop();
        Column.pop();
    }
    inputComponent(parent = null) {
        Stack.create();
        Stack.alignContent(Alignment.Center);
        Stack.width('100%');
        Stack.height('100%');
        Stack.backgroundColor($r('app.color.COLOR_000000'));
        Row.create();
        Row.width('95%');
        Row.height('70%');
        Row.borderRadius(32);
        Row.backgroundColor($r('app.color.COLOR_393939'));
        Row.pop();
        If.create();
        if (this.isInput) {
            If.branchId(0);
            Row.create();
            Row.width('95%');
            Row.height('70%');
            Row.create();
            Row.width(44);
            Row.height(44);
            Row.margin({ left: 5 });
            Row.borderRadius(22);
            Row.backgroundColor($r('app.color.COLOR_168CF6'));
            Row.justifyContent(FlexAlign.Center);
            Image.create($r('app.media.app_icon'));
            Image.width(26);
            Image.height(26);
            Image.objectFit(ImageFit.Contain);
            Row.pop();
            Blank.create();
            Blank.pop();
            Image.create($r('app.media.app_icon'));
            Image.width(42);
            Image.height(42);
            Image.objectFit(ImageFit.Contain);
            Row.create();
            Row.id('msgSend');
            Row.width(36);
            Row.height(36);
            Row.margin({ left: 15, right: 10 });
            Row.borderRadius(22);
            Row.backgroundColor($r('app.color.COLOR_FE2B54'));
            Row.justifyContent(FlexAlign.Center);
            Row.onClick(e => {
                Logger.info(TAG, 'onClick send');
                if (this.inputValue) {
                    this.chats.pushData(new ChatBox(true, this.inputValue, this.currentUser?.getUserIcon()));
                    this.chatController.sendMessage(this.oppositeUser?.getUsername(), this.inputValue);
                    this.inputValue = '';
                }
            });
            Image.create($r('app.media.app_icon'));
            Image.width(32);
            Image.height(32);
            Image.objectFit(ImageFit.Contain);
            Row.pop();
            Row.pop();
        }
        else {
            If.branchId(1);
            Row.create();
            Row.width('95%');
            Row.height('70%');
            Row.create();
            Row.width(44);
            Row.height(44);
            Row.margin({ left: 5 });
            Row.borderRadius(22);
            Row.backgroundColor($r('app.color.COLOR_AE4EF7'));
            Row.justifyContent(FlexAlign.Center);
            Image.create($r('app.media.app_icon'));
            Image.width(28);
            Image.height(28);
            Image.objectFit(ImageFit.Contain);
            Row.pop();
            Blank.create();
            Blank.pop();
            Image.create($r('app.media.app_icon'));
            Image.width(42);
            Image.height(42);
            Image.objectFit(ImageFit.Contain);
            Image.create($r('app.media.app_icon'));
            Image.width(42);
            Image.height(42);
            Image.objectFit(ImageFit.Contain);
            Image.margin({ left: 15, right: 15 });
            Image.create($r('app.media.app_icon'));
            Image.width(36);
            Image.height(36);
            Image.objectFit(ImageFit.Contain);
            Image.margin({ right: 10 });
            Row.pop();
        }
        If.pop();
        TextInput.create({ placeholder: $r('app.string.Send_Message'), text: this.inputValue });
        TextInput.id('chatInput');
        TextInput.width('50%');
        TextInput.height('65%');
        TextInput.placeholderColor($r('app.color.COLOR_99F1F3F5'));
        TextInput.backgroundColor($r('app.color.COLOR_393939'));
        TextInput.fontColor($r('app.color.COLOR_FFFFFF'));
        TextInput.offset({ x: -50 });
        TextInput.padding({ left: 0 });
        TextInput.onChange(value => {
            Logger.info(TAG, `TextInput onChange value= ${value}`);
            this.inputValue = value;
            if (this.inputValue) {
                this.isInput = true;
            }
            else {
                this.isInput = false;
            }
        });
        Stack.pop();
    }
}
loadDocument(new ChatPage("1", undefined, {}));
