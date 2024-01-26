interface AddTitle_Params {
    clickAble?: boolean;
    back?: (event) => void;
    save?: (event) => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AddTitle_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import CommonConstants from '../common/constants/CommonConstants';
export class AddTitle extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__clickAble = new SynchedPropertySimpleTwoWay(params.clickAble, this, "clickAble");
        this.back = undefined;
        this.save = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AddTitle_Params) {
        if (params.back !== undefined) {
            this.back = params.back;
        }
        if (params.save !== undefined) {
            this.save = params.save;
        }
    }
    aboutToBeDeleted() {
        this.__clickAble.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __clickAble: SynchedPropertySimpleTwoWay<boolean>;
    get clickAble() {
        return this.__clickAble.get();
    }
    set clickAble(newValue: boolean) {
        this.__clickAble.set(newValue);
    }
    private back: (event) => void;
    private save: (event) => void;
    render() {
        Row.create();
        Row.width(CommonConstants.FULL_WIDTH);
        Row.height(54);
        Row.margin({
            top: 19
        });
        Row.create();
        Row.padding({ left: 2, right: 17, top: 10, bottom: 10 });
        Row.onClick((e) => {
            this.back(e);
        });
        Image.create($r('app.media.icon_back'));
        Image.width(24);
        Image.height(24);
        Row.pop();
        Text.create($r('app.string.add_notebook'));
        Text.fontSize(CommonConstants.FONT_SIZE_29);
        Text.pop();
        Blank.create();
        Blank.pop();
        Button.createWithLabel($r('app.string.save'));
        Button.fontSize(CommonConstants.FONT_SIZE_22);
        Button.backgroundColor(this.clickAble ? $r('app.color.theme') : $r('app.color.button_disable'));
        Button.height(44);
        Button.borderRadius(7);
        Button.padding({
            left: 14,
            right: 14,
        });
        Button.margin({ bottom: 4 });
        Button.enabled(this.clickAble);
        Button.onClick((e) => {
            this.save(e);
        });
        Button.type(ButtonType.Normal);
        Button.pop();
        Row.pop();
    }
}
