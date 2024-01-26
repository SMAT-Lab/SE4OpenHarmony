interface NavigationBar_Params {
    url?: string;
    username?: string;
    bundleName?: string;
    flag?: boolean;
    title?: Resource;
    email?: string;
    signature?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "NavigationBar_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
import Logger from '../model/Logger';
const TAG: string = '[NavigationBar]';
export class NavigationBar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.url = '';
        this.username = '';
        this.bundleName = '';
        this.flag = false;
        this.title = $r('app.string.empty');
        this.email = '';
        this.signature = '';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NavigationBar_Params) {
        if (params.url !== undefined) {
            this.url = params.url;
        }
        if (params.username !== undefined) {
            this.username = params.username;
        }
        if (params.bundleName !== undefined) {
            this.bundleName = params.bundleName;
        }
        if (params.flag !== undefined) {
            this.flag = params.flag;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.email !== undefined) {
            this.email = params.email;
        }
        if (params.signature !== undefined) {
            this.signature = params.signature;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private url: string;
    private username: string;
    private bundleName: string;
    private flag: boolean;
    private title: Resource;
    private email: string;
    private signature: string;
    render() {
        Row.create();
        If.create();
        if (this.flag) {
            If.branchId(0);
            Row.create();
            Row.height('8%');
            Row.width('100%');
            Row.padding({ left: 15 });
            Row.backgroundColor('#0D9FFB');
            Row.constraintSize({ minHeight: 50 });
            Row.create();
            Row.id('back');
            Row.layoutWeight(1);
            Row.onClick(() => {
                AlertDialog.show({
                    title: $r('app.string.warning'),
                    message: $r('app.string.routerback'),
                    primaryButton: {
                        value: $r('app.string.confirm'),
                        action: () => {
                            router.replaceUrl({
                                url: this.url,
                                params: {
                                    bundleName: this.bundleName,
                                    username: this.username,
                                    email: this.email,
                                    signature: this.signature
                                }
                            });
                        }
                    },
                    secondaryButton: {
                        value: $r('app.string.cancel'),
                        action: () => {
                            Logger.info(TAG, `AlertDialog enter`);
                        }
                    },
                    cancel: () => {
                        Logger.info(TAG, `AlertDialog close`);
                    }
                });
            });
            Image.create($r('app.media.left'));
            Image.objectFit(ImageFit.Contain);
            Image.width('10%');
            Text.create($r('app.string.back'));
            Text.fontSize(18);
            Text.textAlign(TextAlign.End);
            Text.fontColor(Color.White);
            Text.pop();
            Row.pop();
            Text.create(this.title);
            Text.fontSize(18);
            Text.fontColor(Color.White);
            Text.textAlign(TextAlign.Start);
            Text.margin({ right: '5%' });
            Text.pop();
            Row.pop();
        }
        else {
            If.branchId(1);
            Row.create();
            Row.height('8%');
            Row.width('100%');
            Row.padding({ left: 15 });
            Row.backgroundColor('#0D9FFB');
            Row.constraintSize({ minHeight: 50 });
            Text.create(this.title);
            Text.fontSize(18);
            Text.fontColor(Color.White);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Row.pop();
        }
        If.pop();
        Row.pop();
    }
}
