interface UserPrivacyDialog_Params {
    controller?: CustomDialogController;
    cancel?: Function;
    confirm?: Function;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "UserPrivacyDialog_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import { FONT_WEIGHT_400, FULL_WIDTH, OPACITY_4, OPACITY_6 } from '../common/constant/CommonConstant';
function __Text__descStyle(): void {
    Text.fontSize($r('app.float.default_14'));
    Text.fontWeight(FONT_WEIGHT_400);
    Text.fontFamily($r('app.string.HarmonyHeiTi'));
    Text.fontColor({ "id": `app.element.color.titleColor`, params: [] });
    Text.width(FULL_WIDTH);
    Text.lineHeight($r('app.float.default_20'));
    Text.margin({ top: $r('app.float.default_8') });
}
export default class UserPrivacyDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = new CustomDialogController({
            builder: ''
        }, this);
        this.cancel = () => { };
        this.confirm = () => { };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: UserPrivacyDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private cancel: Function;
    private confirm: Function;
    render() {
        Column.create();
        Column.padding($r('app.float.default_16'));
        Text.create($r('app.string.privacy_title'));
        __Text__descStyle();
        Text.pop();
        Text.create($r('app.string.privacy_desc'));
        __Text__descStyle();
        Text.opacity(OPACITY_6);
        Text.pop();
        Row.create();
        Row.width(FULL_WIDTH);
        Row.margin({ top: $r('app.float.default_22') });
        Row.justifyContent(FlexAlign.SpaceEvenly);
        Button.createWithLabel($r('app.string.cancel'));
        Button.backgroundColor(Color.White);
        Button.fontColor($r('app.color.blueColor'));
        Button.onClick(() => {
            this.controller.close();
            this.cancel();
        });
        Button.pop();
        Divider.create();
        Divider.vertical(true);
        Divider.height($r('app.float.default_22'));
        Divider.opacity(OPACITY_4);
        Button.createWithLabel($r('app.string.sure'));
        Button.backgroundColor(Color.White);
        Button.fontColor($r('app.color.blueColor'));
        Button.onClick(() => {
            this.controller.close();
            this.confirm();
        });
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
