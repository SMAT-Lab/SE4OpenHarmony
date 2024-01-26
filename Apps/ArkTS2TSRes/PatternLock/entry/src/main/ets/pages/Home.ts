interface Home_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Home_" + ++__generate__Id;
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
import TitleBar from '../common/TitleBar';
class Home extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Home_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor('#F0F0F0');
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Stack.create();
        Stack.width('100%');
        Stack.height('100%');
        Image.create($r('app.media.home'));
        Image.width('100%');
        Image.height('100%');
        Image.objectFit(ImageFit.Fill);
        Image.opacity(0.3);
        Text.create($r('app.string.message_unlock'));
        Text.fontSize(35);
        Text.fontWeight(FontWeight.Bold);
        Text.padding(20);
        Text.alignSelf(ItemAlign.Center);
        Text.pop();
        Stack.pop();
        Column.pop();
    }
}
loadDocument(new Home("1", undefined, {}));
