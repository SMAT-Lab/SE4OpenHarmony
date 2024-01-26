interface Index_Params {
    selectDownIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import Logger from '../utils/Logger';
import MessagePage from '../component/MessageComponent';
import VideoComponent from '../component/VideoComponent';
import emitter from '@ohos.events.emitter';
import Constant from '../utils/Constant';
const TAG: string = '[Index]';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__selectDownIndex = new ObservedPropertySimple(0, this, "selectDownIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.selectDownIndex !== undefined) {
            this.selectDownIndex = params.selectDownIndex;
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
    /**
     * 登录验证
     */
    loginVerification(): boolean {
        // 验证是否登录
        if (AppStorage.get("userInfo") == null || AppStorage.get("userInfo") == undefined) {
            return false;
        }
        return true;
    }
    pageTransition() {
        PageTransition.create();
        // 禁止首页页面转场效果
        PageTransitionEnter.create({ type: RouteType.None, duration: 0 });
        PageTransitionExit.create({ type: RouteType.None, duration: 0 });
        PageTransition.pop();
    }
    onPageShow() {
        router.clear();
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor($r('app.color.COLOR_000000'));
        Column.create();
        Column.width('100%');
        Column.height('92%');
        If.create();
        if (this.selectDownIndex === 0) {
            If.branchId(0);
            let earlierCreatedChild_2: VideoComponent = (this && this.findChildById) ? this.findChildById("2") as VideoComponent : undefined;
            if (earlierCreatedChild_2 == undefined) {
                View.create(new VideoComponent("2", this, {}));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({});
                View.create(earlierCreatedChild_2);
            }
        }
        else if (this.selectDownIndex === 1) {
            If.branchId(1);
        }
        else if (this.selectDownIndex === 2 && this.loginVerification()) {
            If.branchId(2);
            let earlierCreatedChild_3: MessagePage = (this && this.findChildById) ? this.findChildById("3") as MessagePage : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new MessagePage("3", this, {}));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({});
                View.create(earlierCreatedChild_3);
            }
        }
        else if (this.selectDownIndex === 3) {
            If.branchId(3);
        }
        If.pop();
        Column.pop();
        // 底部操作栏
        Row.create();
        // 底部操作栏
        Row.width('100%');
        // 底部操作栏
        Row.height('8%');
        // 底部操作栏
        Row.justifyContent(FlexAlign.SpaceAround);
        Text.create($r('app.string.Home_page'));
        Text.height('100%');
        Text.fontColor(this.selectDownIndex === 0 ? $r('app.color.COLOR_FFFFFF') : $r('app.color.COLOR_CCF1F3F5'));
        Text.fontSize(22);
        Text.fontFamily($r('app.string.Font_family_medium'));
        Text.margin({ left: 10 });
        Text.onClick(e => {
            this.selectDownIndex = 0;
            Logger.info(TAG, `onClick this is ${this.selectDownIndex}`);
        });
        Text.pop();
        Text.create($r('app.string.Friend'));
        Text.height('100%');
        Text.fontColor(this.selectDownIndex === 1 ? $r('app.color.COLOR_FFFFFF') : $r('app.color.COLOR_CCF1F3F5'));
        Text.fontSize(22);
        Text.fontFamily($r('app.string.Font_family_medium'));
        Text.margin({ left: 10 });
        Text.onClick(e => {
            this.selectDownIndex = 1;
            Logger.info(TAG, `onClick this is ${this.selectDownIndex}`);
        });
        Text.pop();
        Image.create($r('app.media.app_icon'));
        Image.id('index_main');
        Image.width(80);
        Image.height(40);
        Image.objectFit(ImageFit.Contain);
        Image.onClick(e => {
            Logger.info(TAG, `onClick this is ${this.selectDownIndex}`);
            // 跳转页面前暂停本地视频
            emitter.emit({ eventId: Constant.EVENT_PAUSED_INDEX });
            // 验证是否登录
            if (!this.loginVerification()) {
                router.pushUrl({ url: 'appsampled/pages/Login' });
                return;
            }
            router.pushUrl({ url: 'appsampled/pages/CameraPage' });
        });
        Text.create($r('app.string.Message'));
        Text.id('index_message');
        Text.height('100%');
        Text.fontColor(this.selectDownIndex === 2 ? $r('app.color.COLOR_FFFFFF') : $r('app.color.COLOR_CCF1F3F5'));
        Text.fontSize(22);
        Text.fontFamily($r('app.string.Font_family_medium'));
        Text.margin({ right: 10 });
        Text.onClick(e => {
            this.selectDownIndex = 2;
            Logger.info(TAG, `onClick this is ${this.selectDownIndex}`);
            // 跳转页面前暂停本地视频
            emitter.emit({ eventId: Constant.EVENT_PAUSED_INDEX });
            // 验证是否登录
            if (!this.loginVerification()) {
                router.pushUrl({ url: 'appsampled/pages/Login' });
            }
        });
        Text.pop();
        Text.create($r('app.string.Me'));
        Text.height('100%');
        Text.fontColor(this.selectDownIndex === 3 ? $r('app.color.COLOR_FFFFFF') : $r('app.color.COLOR_CCF1F3F5'));
        Text.fontSize(22);
        Text.fontFamily($r('app.string.Font_family_medium'));
        Text.margin({ left: 10 });
        Text.onClick(e => {
            this.selectDownIndex = 3;
            Logger.info(TAG, `onClick this is ${this.selectDownIndex}`);
        });
        Text.pop();
        // 底部操作栏
        Row.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
