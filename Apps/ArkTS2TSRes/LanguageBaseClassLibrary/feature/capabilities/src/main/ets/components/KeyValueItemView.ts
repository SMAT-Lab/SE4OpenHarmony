interface KeyValueItemView_Params {
    keyValuePair?: KeyValuePair;
    deleteEnabled?: boolean;
    deleteAction?: (event?: ClickEvent) => void;
    index?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "KeyValueItemView_" + ++__generate__Id;
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
import { KeyValuePair } from '../model/KeyValuePair';
import { DeleteView } from './DeleteView';
export class KeyValueItemView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__keyValuePair = new SynchedPropertyNesedObject(params.keyValuePair, this, "keyValuePair");
        this.__deleteEnabled = new ObservedPropertySimple(true, this, "deleteEnabled");
        this.deleteAction = () => {
        };
        this.index = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: KeyValueItemView_Params) {
        this.__keyValuePair.set(params.keyValuePair);
        if (params.deleteEnabled !== undefined) {
            this.deleteEnabled = params.deleteEnabled;
        }
        if (params.deleteAction !== undefined) {
            this.deleteAction = params.deleteAction;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
    }
    aboutToBeDeleted() {
        this.__keyValuePair.aboutToBeDeleted();
        this.__deleteEnabled.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __keyValuePair: SynchedPropertyNesedObject<KeyValuePair>;
    get keyValuePair() {
        return this.__keyValuePair.get();
    }
    private __deleteEnabled: ObservedPropertySimple<boolean>;
    get deleteEnabled() {
        return this.__deleteEnabled.get();
    }
    set deleteEnabled(newValue: boolean) {
        this.__deleteEnabled.set(newValue);
    }
    private deleteAction: (event?: ClickEvent) => void;
    private index: number;
    render() {
        Row.create();
        Row.width('100%');
        Row.height(64);
        Row.alignItems(VerticalAlign.Center);
        Column.create();
        Column.height('100%');
        Column.layoutWeight(1);
        Column.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        Column.borderRadius(16);
        Column.backgroundColor($r('app.color.bg_white'));
        Column.alignItems(HorizontalAlign.Start);
        Text.create(`Key: ${this.keyValuePair.key}`);
        Text.fontColor($r('app.color.text_color_primary'));
        Text.fontSize(16);
        Text.pop();
        Text.create(`Value: ${this.keyValuePair.value}`);
        Text.fontColor($r('app.color.text_color_second'));
        Text.fontSize(14);
        Text.pop();
        Column.pop();
        __Common__.create();
        __Common__.id(`delete${this.index}`);
        __Common__.margin({ left: 12 });
        __Common__.enabled(this.deleteEnabled);
        __Common__.onClick(this.deleteAction);
        let earlierCreatedChild_2: DeleteView = (this && this.findChildById) ? this.findChildById("2") as DeleteView : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new DeleteView("2", this, { enable: this.deleteEnabled }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                enable: this.deleteEnabled
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
