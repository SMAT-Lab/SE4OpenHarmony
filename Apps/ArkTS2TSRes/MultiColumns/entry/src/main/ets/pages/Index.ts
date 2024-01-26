interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import router from '@ohos.router';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.create();
        Column.width('100%');
        Column.height('50%');
        Column.justifyContent(FlexAlign.SpaceAround);
        Button.createWithLabel('A+B+C');
        Button.onClick(() => {
            router.pushUrl({ url: "Application/MailBox" });
        });
        Button.type(ButtonType.Normal);
        Button.borderRadius(5);
        Button.width(100);
        Button.id('caseOne');
        Button.pop();
        Button.createWithLabel('A+C');
        Button.onClick(() => {
            router.pushUrl({ url: "Application/PhotoAlbum" });
        });
        Button.type(ButtonType.Normal);
        Button.borderRadius(5);
        Button.width(100);
        Button.id('caseTwo');
        Button.pop();
        Button.createWithLabel('B+C');
        Button.onClick(() => {
            router.pushUrl({ url: "Application/Settings" });
        });
        Button.type(ButtonType.Normal);
        Button.borderRadius(5);
        Button.width(100);
        Button.id('caseThree');
        Button.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));