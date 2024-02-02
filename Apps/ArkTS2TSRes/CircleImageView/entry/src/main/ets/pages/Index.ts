interface Index_Params {
    data?: CircleImageView.Model;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { CircleImageView } from '@ohos/circleimageview';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__data = new ObservedPropertyObject(new CircleImageView.Model(), this, "data");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.data !== undefined) {
            this.data = params.data;
        }
    }
    aboutToBeDeleted() {
        this.__data.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __data: ObservedPropertyObject<CircleImageView.Model>;
    get data() {
        return this.__data.get();
    }
    set data(newValue: CircleImageView.Model) {
        this.__data.set(newValue);
    }
    render() {
        Column.create();
        List.create({ space: 0, initialIndex: 0 });
        List.width('100%');
        List.margin({ top: 5 });
        ListItem.create();
        ListItem.height('50%');
        ListItem.width('100%');
        Column.create({ space: 5 });
        Column.align(Alignment.Center);
        Column.width(200);
        Column.height(200);
        Column.pop();
        ListItem.pop();
        ListItem.create();
        ListItem.height('50%');
        ListItem.backgroundColor(0x000000);
        ListItem.width('100%');
        Column.create({ space: 5 });
        Column.align(Alignment.Center);
        Column.pop();
        ListItem.pop();
        List.pop();
        Column.pop();
    }
    aboutToAppear() {
        this.data.setImageURI('hugh.jpg').setDiameter(200).setBorderWidth(5)
            .setBorderColor(Color.White).setDisableCircularTransformation(true);
    }
}
loadDocument(new Index("1", undefined, {}));
