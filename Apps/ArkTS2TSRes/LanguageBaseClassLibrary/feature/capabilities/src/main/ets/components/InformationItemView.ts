interface InformationItemView_Params {
    information?: Information;
    deleteAction?: (event?: ClickEvent) => void;
    index?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "InformationItemView_" + ++__generate__Id;
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
import { Information } from '../model/Information';
import { DeleteView } from './DeleteView';
import { getString } from '@ohos/common';
export class InformationItemView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__information = new SynchedPropertyNesedObject(params.information, this, "information");
        this.deleteAction = () => { };
        this.index = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: InformationItemView_Params) {
        this.__information.set(params.information);
        if (params.deleteAction !== undefined) {
            this.deleteAction = params.deleteAction;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
    }
    aboutToBeDeleted() {
        this.__information.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __information: SynchedPropertyNesedObject<Information>;
    get information() {
        return this.__information.get();
    }
    private deleteAction: (event?: ClickEvent) => void;
    private index: number;
    render() {
        Row.create();
        Row.padding({ left: 12 });
        Row.width('100%');
        Row.margin({ top: 12, right: 12 });
        Row.create();
        Row.height(72);
        Row.layoutWeight(1);
        Row.padding({ left: 16, right: 15 });
        Row.margin({ right: 12 });
        Row.backgroundColor($r('app.color.bg_white'));
        Row.borderRadius(16);
        Column.create();
        Text.create(this.information.name);
        Text.fontColor($r('app.color.text_color_primary'));
        Text.fontSize(16);
        Text.pop();
        Text.create(this.information.phone);
        Text.fontColor($r('app.color.text_color_second'));
        Text.fontSize(14);
        Text.margin({ top: 5 });
        Text.pop();
        Column.pop();
        Blank.create();
        Blank.pop();
        Text.create(`${this.information.age}${getString($r('app.string.old'))}`);
        Text.fontColor($r('app.color.text_color_second'));
        Text.fontSize(12);
        Text.pop();
        Row.pop();
        __Common__.create();
        __Common__.id(`delete${this.index}`);
        __Common__.enabled(this.information.clickAble);
        __Common__.onClick(this.deleteAction);
        let earlierCreatedChild_2: DeleteView = (this && this.findChildById) ? this.findChildById("2") as DeleteView : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new DeleteView("2", this, { enable: this.information.clickAble }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                enable: this.information.clickAble
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        __Common__.pop();
        Row.pop();
    }
}
