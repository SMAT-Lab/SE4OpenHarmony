interface ColumnOperation_Params {
    operationRes?: Resource;
    operationSource?: CustomDataSource;
    doOperation?: (index: number) => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ColumnOperation_" + ++__generate__Id;
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
import { CustomDataSource, getStringArray } from '@ohos/common';
export class ColumnOperation extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.operationRes = undefined;
        this.operationSource = new CustomDataSource([]);
        this.doOperation = () => {
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ColumnOperation_Params) {
        if (params.operationRes !== undefined) {
            this.operationRes = params.operationRes;
        }
        if (params.operationSource !== undefined) {
            this.operationSource = params.operationSource;
        }
        if (params.doOperation !== undefined) {
            this.doOperation = params.doOperation;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private operationRes?: Resource;
    private operationSource: CustomDataSource;
    private doOperation: (index: number) => void;
    render() {
        List.create();
        List.width('100%');
        LazyForEach.create("2", this, ObservedObject.GetRawObject(this.operationSource), (item: string, index: number) => {
            this.isRenderingInProgress = true;
            ListItem.create();
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.Start);
            Button.createWithChild();
            Button.width('100%');
            Button.height(68);
            Button.borderRadius(20);
            Button.type(ButtonType.Normal);
            Button.backgroundColor($r("app.color.white"));
            Button.margin({ top: 16 });
            Button.onClick(() => {
                this.doOperation(index);
            });
            Text.create(item);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor($r("app.color.list_title"));
            Text.width('100%');
            Text.padding({
                left: 16
            });
            Text.textAlign(TextAlign.Start);
            Text.pop();
            Button.pop();
            Row.pop();
            ListItem.pop();
            this.isRenderingInProgress = false;
        }, (index: number) => index.toString());
        LazyForEach.pop();
        List.pop();
    }
    async aboutToAppear() {
        if (this.operationRes) {
            let menuList = await getStringArray(this.operationRes);
            this.operationSource.dataArray = menuList;
            this.operationSource.notifyDataReload();
        }
    }
}
