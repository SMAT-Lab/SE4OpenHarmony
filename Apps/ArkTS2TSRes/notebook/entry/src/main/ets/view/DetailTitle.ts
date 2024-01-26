interface DetailTitle_Params {
    back?: (event) => void;
    edit?: (event) => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DetailTitle_" + ++__generate__Id;
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
export class DetailTitle extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.back = undefined;
        this.edit = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DetailTitle_Params) {
        if (params.back !== undefined) {
            this.back = params.back;
        }
        if (params.edit !== undefined) {
            this.edit = params.edit;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private back: (event) => void;
    private edit: (event) => void;
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
        Text.create($r('app.string.detail_notebook'));
        Text.fontSize(CommonConstants.FONT_SIZE_29);
        Text.pop();
        Blank.create();
        Blank.pop();
        Text.create($r('app.string.edit'));
        Text.fontSize(CommonConstants.FONT_SIZE_22);
        Text.fontColor($r('app.color.theme'));
        Text.padding({
            left: 15
        });
        Text.align(Alignment.Center);
        Text.height(54);
        Text.onClick((e) => {
            this.edit(e);
        });
        Text.pop();
        Row.pop();
    }
}
