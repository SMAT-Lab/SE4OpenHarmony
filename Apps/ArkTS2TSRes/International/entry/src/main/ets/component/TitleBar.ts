interface TitleBar_Params {
    title?: string | Resource;
    hasBackPress?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TitleBar_" + ++__generate__Id;
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
export default class TitleBar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.title = $r('app.string.app_name');
        this.hasBackPress = false;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TitleBar_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.hasBackPress !== undefined) {
            this.hasBackPress = params.hasBackPress;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private title: string | Resource;
    private hasBackPress: boolean;
    render() {
        Row.create();
        Row.width('100%');
        Row.height(56);
        Row.backgroundColor(Color.Transparent);
        If.create();
        if (this.hasBackPress) {
            If.branchId(0);
            Row.create();
            Row.height('100%');
            Row.aspectRatio(1);
            Row.margin({ left: 24 });
            Row.onClick(() => {
                router.back();
            });
            Image.create($r('app.media.ic_public_back'));
            Image.id('btnBack');
            Image.width(24);
            Image.height(24);
            Row.pop();
        }
        If.pop();
        Text.create(this.title);
        Text.fontSize(20);
        Text.fontColor(Color.Black);
        Text.margin(this.hasBackPress ? {} : { left: 24 });
        Text.pop();
        Blank.create();
        Blank.pop();
        Row.pop();
    }
}
