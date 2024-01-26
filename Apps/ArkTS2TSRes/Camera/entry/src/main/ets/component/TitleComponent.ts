interface Title_Params {
    titleText?: string | Resource;
    hasBack?: boolean;
    isIndex?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TitleComponent_" + ++__generate__Id;
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
export default class Title extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.titleText = $r('app.string.EntryAbility_label');
        this.hasBack = false;
        this.isIndex = true;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Title_Params) {
        if (params.titleText !== undefined) {
            this.titleText = params.titleText;
        }
        if (params.hasBack !== undefined) {
            this.hasBack = params.hasBack;
        }
        if (params.isIndex !== undefined) {
            this.isIndex = params.isIndex;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private titleText: string | Resource;
    private hasBack: boolean;
    private isIndex: boolean;
    aboutToAppear() {
        this.hasBack = Number(router.getLength()) > 0;
    }
    render() {
        Row.create();
        Row.height('8%');
        Row.width('100%');
        Row.alignItems(VerticalAlign.Center);
        Row.constraintSize({ minHeight: 70 });
        Row.backgroundColor(this.isIndex ? $r('app.color.COLOR_000000') : $r('app.color.COLOR_F1F3F5'));
        Row.create({ space: 16 });
        Row.width('40%');
        Row.height('100%');
        Row.margin({ left: 26, right: 18 });
        If.create();
        if (this.hasBack) {
            If.branchId(0);
            Image.create(this.isIndex ? $r('app.media.ic_back') : $r('app.media.ic_back_black'));
            Image.id('back');
            Image.width(24);
            Image.height('100%');
            Image.objectFit(ImageFit.Contain);
            Image.onClick(() => {
                router.back();
                AppStorage.Set('isRefresh', true);
            });
        }
        If.pop();
        Text.create(this.titleText);
        Text.layoutWeight(1);
        Text.fontColor(this.isIndex ? $r('app.color.COLOR_FFFFFF') : $r('app.color.COLOR_E6000000'));
        Text.fontSize(20);
        Text.fontFamily($r('app.string.font_family'));
        Text.pop();
        Row.pop();
        Blank.create();
        Blank.pop();
        Row.pop();
    }
}
