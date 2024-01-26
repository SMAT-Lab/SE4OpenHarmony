interface PublishPage_Params {
    itemList?: Array<Item>;
    uploadController?: UploadController;
    uploadFile?: string;
    currentUser?: User | null;
    uploadState?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PublishPage_" + ++__generate__Id;
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
import promptAction from '@ohos.promptAction';
import router from '@ohos.router';
import UploadController from '../../controller/UploadController';
import User from '../data/User';
import Logger from '../../utils/Logger';
import { BusinessError } from '@ohos.base';
const TAG: string = '[PublishPage]';
class Item {
    res?: Resource;
    name?: Resource;
}
class PublishPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.itemList = [{ res: $r('app.media.app_icon'), name: $r('app.string.Where_are_you') },
            { res: $r('app.media.app_icon'), name: $r('app.string.Add_applet') },
            { res: $r('app.media.app_icon'), name: $r('app.string.Publicly_visible') },
            { res: $r('app.media.app_icon'), name: $r('app.string.Advanced_setup') }];
        this.uploadController = new UploadController();
        this.uploadFile = (router.getParams() as Record<string, Object>).uploadFile as string;
        this.currentUser = null;
        this.__uploadState = new ObservedPropertySimple(false, this, "uploadState");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PublishPage_Params) {
        if (params.itemList !== undefined) {
            this.itemList = params.itemList;
        }
        if (params.uploadController !== undefined) {
            this.uploadController = params.uploadController;
        }
        if (params.uploadFile !== undefined) {
            this.uploadFile = params.uploadFile;
        }
        if (params.currentUser !== undefined) {
            this.currentUser = params.currentUser;
        }
        if (params.uploadState !== undefined) {
            this.uploadState = params.uploadState;
        }
    }
    aboutToBeDeleted() {
        this.__uploadState.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private itemList: Array<Item>;
    private uploadController: UploadController;
    private uploadFile: string; // 需要上传的文件名
    private currentUser: User | null; // 当前用户信息
    private __uploadState: ObservedPropertySimple<boolean>;
    get uploadState() {
        return this.__uploadState.get();
    }
    set uploadState(newValue: boolean) {
        this.__uploadState.set(newValue);
    }
    pageTransition() {
        PageTransition.create();
        // 登录页面从底部滑入滑出
        PageTransitionEnter.create({ type: RouteType.Push, duration: 10 });
        // 登录页面从底部滑入滑出
        PageTransitionEnter.slide(SlideEffect.Right);
        PageTransitionExit.create({ type: RouteType.Pop, duration: 10 });
        PageTransitionExit.slide(SlideEffect.Right);
        PageTransition.pop();
    }
    aboutToAppear() {
        if (AppStorage.get("currentUser")) {
            this.currentUser = AppStorage.get("currentUser")!;
        }
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor($r('app.color.COLOR_151724'));
        Row.create({ space: 12 });
        Row.width('100%');
        Row.height('8%');
        Row.padding({ left: 12 });
        Row.onClick(e => {
            router.back();
        });
        Image.create($r('app.media.app_icon'));
        Image.width(24);
        Image.height(24);
        Image.objectFit(ImageFit.Fill);
        Text.create($r('app.string.Return_edit'));
        Text.textAlign(TextAlign.Center);
        Text.fontColor($r('app.color.COLOR_CCFFFFFF'));
        Text.fontSize(16);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.borderRadius(14);
        Text.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.height('22%');
        Column.create();
        Column.width('70%');
        Column.height('100%');
        Column.padding({ left: 12 });
        TextArea.create({ placeholder: $r('app.string.Add_work_description') });
        TextArea.id('textArea');
        TextArea.width('100%');
        TextArea.height('50%');
        TextArea.fontColor($r('app.color.COLOR_FFFFFF'));
        TextArea.placeholderColor($r('app.color.COLOR_CCFFFFFF'));
        TextArea.fontSize(18);
        TextArea.fontFamily($r('app.string.Font_family_regular'));
        Blank.create();
        Blank.pop();
        Row.create({ space: 6 });
        Row.width('100%');
        Row.height(48);
        Text.create($r('app.string.Topic'));
        Text.width(88);
        Text.height(42);
        Text.fontColor($r('app.color.COLOR_FFFFFF'));
        Text.backgroundColor($r('app.color.COLOR_669F9B9B'));
        Text.textAlign(TextAlign.Center);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.borderRadius(12);
        Text.pop();
        Text.create($r('app.string.Well_Number_Friend'));
        Text.width(88);
        Text.height(42);
        Text.fontColor($r('app.color.COLOR_FFFFFF'));
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor($r('app.color.COLOR_669F9B9B'));
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.borderRadius(12);
        Text.pop();
        Row.pop();
        Column.pop();
        Blank.create();
        Blank.pop();
        Stack.create();
        Stack.width('30%');
        Stack.height('100%');
        Stack.borderRadius(12);
        Stack.alignContent(Alignment.Bottom);
        Image.create($r('app.media.app_icon'));
        Image.width('80%');
        Image.height('90%');
        Image.objectFit(ImageFit.Fill);
        Image.borderRadius(12);
        Text.create($r('app.string.Select_cover'));
        Text.width('80%');
        Text.height(32);
        Text.fontColor($r('app.color.COLOR_FFFFFF'));
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor($r('app.color.COLOR_669F9B9B'));
        Text.borderRadius(12);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.pop();
        Stack.pop();
        Row.pop();
        Divider.create();
        Divider.vertical(false);
        Divider.height(1);
        Divider.width('92%');
        Divider.color($r('app.color.COLOR_5A5B63'));
        Divider.margin({ top: 12 });
        Column.create({ space: 2 });
        Column.width('100%');
        Column.height('40%');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.itemList), (item: Item) => {
            Row.create({ space: 12 });
            Row.width('100%');
            Row.height(64);
            Row.padding({ left: 12, right: 12 });
            Image.create(item.res);
            Image.width(24);
            Image.height(24);
            Image.objectFit(ImageFit.Fill);
            Image.borderRadius(4);
            Text.create(item.name);
            Text.fontColor($r('app.color.COLOR_FFFFFF'));
            Text.textAlign(TextAlign.Center);
            Text.fontFamily($r('app.string.Font_family_regular'));
            Text.pop();
            Blank.create();
            Blank.pop();
            Image.create($r('app.media.app_icon'));
            Image.width(18);
            Image.height(18);
            Image.objectFit(ImageFit.Fill);
            Row.pop();
        });
        ForEach.pop();
        Column.pop();
        Blank.create();
        Blank.pop();
        If.create();
        // 发布成功的提示
        if (this.uploadState) {
            If.branchId(0);
            Row.create({ space: 8 });
            Row.width('96%');
            Row.height(64);
            Row.backgroundColor($r('app.color.COLOR_FFFFFF'));
            Row.margin({ left: 8, right: 8, bottom: 12 });
            Row.padding({ left: 12, right: 12 });
            Row.borderRadius(12);
            If.create();
            if (this.currentUser) {
                If.branchId(0);
                Image.create($r('app.media.app_icon'));
                Image.width(36);
                Image.height(36);
                Image.objectFit(ImageFit.Contain);
                Image.borderRadius(18);
            }
            If.pop();
            Text.create($r('app.string.Publish_Success'));
            Text.fontColor($r('app.color.COLOR_000000'));
            Text.textAlign(TextAlign.Center);
            Text.fontFamily($r('app.string.Font_family_regular'));
            Text.fontSize(18);
            Text.pop();
            Row.pop();
        }
        If.pop();
        Row.create({ space: 8 });
        Row.width('100%');
        Row.height('9%');
        Row.padding({ left: 8, right: 8 });
        Row.create({ space: 8 });
        Row.layoutWeight(1);
        Row.height('80%');
        Row.justifyContent(FlexAlign.Center);
        Row.backgroundColor($r('app.color.COLOR_393939'));
        Row.borderRadius(12);
        Image.create($r('app.media.app_icon'));
        Image.width(20);
        Image.height(20);
        Image.objectFit(ImageFit.Contain);
        Image.borderRadius(14);
        Text.create($r('app.string.Save_Draft'));
        Text.textAlign(TextAlign.Center);
        Text.fontColor($r('app.color.COLOR_FFFFFF'));
        Text.fontSize(16);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.borderRadius(14);
        Text.pop();
        Row.pop();
        Row.create({ space: 8 });
        Row.id('upload');
        Row.layoutWeight(1);
        Row.height('80%');
        Row.justifyContent(FlexAlign.Center);
        Row.backgroundColor($r('app.color.COLOR_FC2B55'));
        Row.borderRadius(12);
        Row.onClick(e => {
            Logger.info(TAG, `uploadFile = ${this.uploadFile}`);
            this.uploadController.uploadFile(this.uploadFile).then(res => {
                Logger.info(TAG, `uploadFile success= ${JSON.stringify(res)}`);
                this.uploadState = true;
                setTimeout(() => {
                    this.uploadState = false;
                    router.pushUrl({ url: 'pages/Index' });
                }, 500);
            }).catch((err: BusinessError) => {
                Logger.info(TAG, `uploadFile faild= ${JSON.stringify(err)}`);
                router.pushUrl({ url: 'pages/Index' });
            });
        });
        Image.create($r('app.media.app_icon'));
        Image.width(20);
        Image.height(20);
        Image.objectFit(ImageFit.Contain);
        Image.borderRadius(14);
        Text.create($r('app.string.Publish'));
        Text.textAlign(TextAlign.Center);
        Text.fontColor($r('app.color.COLOR_FFFFFF'));
        Text.fontSize(16);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.borderRadius(14);
        Text.pop();
        Row.pop();
        Row.pop();
        Column.pop();
    }
}
loadDocument(new PublishPage("1", undefined, {}));
