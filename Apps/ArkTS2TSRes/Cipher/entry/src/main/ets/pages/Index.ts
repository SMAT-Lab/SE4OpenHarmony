interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
        Column.backgroundColor('#F1F1F1');
        Row.create();
        Row.height('6%');
        Row.width('100%');
        Row.padding({ left: 16 });
        Row.backgroundColor('#0D9FFB');
        Row.constraintSize({ minHeight: 50 });
        Text.create($r('app.string.entry_MainAbility'));
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Row.pop();
        Stack.create({ alignContent: Alignment.Center });
        Stack.height('94%');
        Column.create();
        Button.createWithLabel($r('app.string.encryption'));
        Button.id('encryption');
        Button.margin(10);
        Button.fontSize(20);
        Button.width('40%');
        Button.height('10%');
        Button.onClick(() => {
            router.pushUrl({
                url: 'pages/Second',
                params: paramsInfo
            });
        });
        Button.pop();
        Button.createWithLabel($r('app.string.decrypt'));
        Button.id('decrypt');
        Button.margin(10);
        Button.fontSize(20);
        Button.width('40%');
        Button.height('10%');
        Button.onClick(() => {
            router.push({
                url: 'pages/Second',
                params: {
                    flag: false
                }
            });
        });
        Button.pop();
        Column.pop();
        Stack.pop();
        Column.pop();
    }
}
class DataModel {
    flag: boolean = true;
}
let paramsInfo: DataModel = {
    flag: true
};
loadDocument(new Index("1", undefined, {}));
