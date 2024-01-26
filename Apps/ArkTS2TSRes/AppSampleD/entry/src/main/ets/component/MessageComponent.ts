interface MessagePage_Params {
    selectDownIndex?: number;
    scrollerHor?: Scroller;
    scrollerVer?: Scroller;
    userArr?: Array<User>;
    currentUser?: User | null;
    oppositeUser?: User | null;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MessageComponent_" + ++__generate__Id;
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
import User from '../appsampled/data/User';
import { getMockUser } from '../mock/MockData';
import Logger from '../utils/Logger';
const TAG: string = '[MessagePage]';
export default class MessagePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__selectDownIndex = new ObservedPropertySimple(2, this, "selectDownIndex");
        this.scrollerHor = new Scroller();
        this.scrollerVer = new Scroller();
        this.userArr = getMockUser();
        this.currentUser = null;
        this.oppositeUser = null;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MessagePage_Params) {
        if (params.selectDownIndex !== undefined) {
            this.selectDownIndex = params.selectDownIndex;
        }
        if (params.scrollerHor !== undefined) {
            this.scrollerHor = params.scrollerHor;
        }
        if (params.scrollerVer !== undefined) {
            this.scrollerVer = params.scrollerVer;
        }
        if (params.userArr !== undefined) {
            this.userArr = params.userArr;
        }
        if (params.currentUser !== undefined) {
            this.currentUser = params.currentUser;
        }
        if (params.oppositeUser !== undefined) {
            this.oppositeUser = params.oppositeUser;
        }
    }
    aboutToBeDeleted() {
        this.__selectDownIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __selectDownIndex: ObservedPropertySimple<number>; // 底部选择索引
    get selectDownIndex() {
        return this.__selectDownIndex.get();
    }
    set selectDownIndex(newValue: number) {
        this.__selectDownIndex.set(newValue);
    }
    private scrollerHor: Scroller;
    private scrollerVer: Scroller;
    private userArr: Array<User>; // 用户信息模拟数据
    private currentUser: User | null; // 当前用户信息
    private oppositeUser: User | null; // 对端用户信息
    aboutToAppear() {
        // globalThis.oppositeUser = new User('13222222222',$r('app.media.ic_headphoto_2'));
        if (AppStorage.get("currentUser")) {
            this.currentUser = AppStorage.get("currentUser")!;
        }
        if (AppStorage.get("oppositeUser")) {
            this.oppositeUser = AppStorage.get("oppositeUser")!;
            // 将模拟数据中的第一条替换成真实对端数据
            this.userArr[0].setUsername(this.oppositeUser?.getUsername());
            this.userArr[0].setUserIcon(this.oppositeUser?.getUserIcon());
        }
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor($r('app.color.COLOR_000000'));
        Row.create();
        Row.width('100%');
        Row.height('7%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Image.create($r('app.media.app_icon'));
        Image.width(30);
        Image.height(30);
        Image.objectFit(ImageFit.Contain);
        Image.margin({ left: 15 });
        Image.create($r('app.media.app_icon'));
        Image.width(40);
        Image.height(40);
        Image.objectFit(ImageFit.Contain);
        Image.create($r('app.media.app_icon'));
        Image.width(30);
        Image.height(30);
        Image.objectFit(ImageFit.Contain);
        Image.margin({ right: 15 });
        Row.pop();
        Column.create();
        Column.width('100%');
        Column.height('93%');
        Scroll.create(this.scrollerVer);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.Off);
        Scroll.width('100%');
        Scroll.height('100%');
        Column.create();
        Column.width('100%');
        // 横向列表
        Scroll.create(this.scrollerHor);
        // 横向列表
        Scroll.scrollable(ScrollDirection.Horizontal);
        // 横向列表
        Scroll.scrollBar(BarState.Off);
        // 横向列表
        Scroll.width('100%');
        // 横向列表
        Scroll.height(120);
        Row.create();
        Row.height('100%');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.userArr), (user: User) => {
            Column.create();
            Column.width(90);
            Column.height(90);
            Image.create($r('app.media.app_icon'));
            Image.width(70);
            Image.height(70);
            Image.objectFit(ImageFit.Contain);
            Image.borderRadius(35);
            Image.margin({ bottom: 8 });
            Text.create(user.getUsername());
            Text.height(20);
            Text.fontColor($r('app.color.COLOR_E6FFFFFF'));
            Text.fontSize(16);
            Text.fontFamily($r('app.string.Font_family_regular'));
            Text.textAlign(TextAlign.Center);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.pop();
            Column.pop();
        });
        ForEach.pop();
        Row.pop();
        // 横向列表
        Scroll.pop();
        // 新朋友
        Row.create();
        // 新朋友
        Row.width('100%');
        // 新朋友
        Row.height(80);
        // 新朋友
        Row.alignItems(VerticalAlign.Center);
        Column.create();
        Column.width(60);
        Column.height(60);
        Column.backgroundColor($r('app.color.COLOR_57A9FE'));
        Column.borderRadius(30);
        Column.justifyContent(FlexAlign.Center);
        Column.margin({ left: 15, right: 15 });
        Image.create($r('app.media.app_icon'));
        Image.width(30);
        Image.height(30);
        Image.objectFit(ImageFit.Contain);
        Column.pop();
        Column.create({ space: 8 });
        Column.height(70);
        Column.justifyContent(FlexAlign.Center);
        Column.alignItems(HorizontalAlign.Start);
        Text.create($r('app.string.NewFriend'));
        Text.height(20);
        Text.fontColor($r('app.color.COLOR_FFFFFF'));
        Text.fontSize(18);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.pop();
        Text.create($r('app.string.No_new_notice'));
        Text.height(20);
        Text.fontColor($r('app.color.COLOR_CCFFFFFF'));
        Text.fontSize(16);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.pop();
        Column.pop();
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.app_icon'));
        Image.width(20);
        Image.height(20);
        Image.objectFit(ImageFit.Contain);
        Image.margin({ right: 20 });
        // 新朋友
        Row.pop();
        // 互动消息
        Row.create();
        // 互动消息
        Row.width('100%');
        // 互动消息
        Row.height(80);
        // 互动消息
        Row.alignItems(VerticalAlign.Center);
        Column.create();
        Column.width(60);
        Column.height(60);
        Column.backgroundColor($r('app.color.COLOR_FF689F'));
        Column.borderRadius(30);
        Column.justifyContent(FlexAlign.Center);
        Column.margin({ left: 15, right: 15 });
        Image.create($r('app.media.app_icon'));
        Image.width(50);
        Image.height(50);
        Image.objectFit(ImageFit.Contain);
        Image.rotate({ angle: -90 });
        Column.pop();
        Column.create({ space: 8 });
        Column.height(70);
        Column.justifyContent(FlexAlign.Center);
        Column.alignItems(HorizontalAlign.Start);
        Text.create($r('app.string.Interactive_message'));
        Text.height(20);
        Text.fontColor($r('app.color.COLOR_FFFFFF'));
        Text.fontSize(18);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.pop();
        Text.create($r('app.string.Interactive_message_content'));
        Text.height(20);
        Text.fontColor($r('app.color.COLOR_CCFFFFFF'));
        Text.fontSize(16);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.pop();
        Column.pop();
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.app_icon'));
        Image.width(20);
        Image.height(20);
        Image.objectFit(ImageFit.Contain);
        Image.margin({ right: 20 });
        // 互动消息
        Row.pop();
        // 竖向列表
        ForEach.create("3", this, ObservedObject.GetRawObject(this.userArr), (user: User, index: number) => {
            Row.create();
            Row.id(`userID_${index + 1}`);
            Row.width('100%');
            Row.height(80);
            Row.alignItems(VerticalAlign.Center);
            Row.onClick(e => {
                if (index !== 0) {
                    return;
                }
                router.pushUrl({ url: 'appsampled/pages/ChatPage' });
            });
            Column.create();
            Column.width(60);
            Column.height(60);
            Column.borderRadius(30);
            Column.justifyContent(FlexAlign.Center);
            Column.margin({ left: 15, right: 15 });
            Image.create($r('app.media.app_icon'));
            Image.width(60);
            Image.height(60);
            Image.objectFit(ImageFit.Contain);
            Image.borderRadius(30);
            Column.pop();
            Column.create({ space: 8 });
            Column.height(70);
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Start);
            Text.create(user.getUsername());
            Text.height(20);
            Text.fontColor($r('app.color.COLOR_FFFFFF'));
            Text.fontSize(18);
            Text.fontFamily($r('app.string.Font_family_regular'));
            Text.pop();
            Text.create($r('app.string.Greet'));
            Text.height(20);
            Text.fontColor($r('app.color.COLOR_CCFFFFFF'));
            Text.fontSize(16);
            Text.fontFamily($r('app.string.Font_family_regular'));
            Text.pop();
            Column.pop();
            Row.pop();
        });
        // 竖向列表
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
        Column.pop();
    }
}
