interface GridOperation_Params {
    operationRes?: Resource | undefined;
    operationSource?: string[];
    doOperation?: (index: number) => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "GridOperation_" + ++__generate__Id;
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
export class GridOperation extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.operationRes = undefined;
        this.__operationSource = new ObservedPropertyObject([], this, "operationSource");
        this.doOperation = () => { };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: GridOperation_Params) {
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
        this.__operationSource.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private operationRes: Resource | undefined;
    private __operationSource: ObservedPropertyObject<string[]>;
    get operationSource() {
        return this.__operationSource.get();
    }
    set operationSource(newValue: string[]) {
        this.__operationSource.set(newValue);
    }
    private doOperation: (index: number) => void;
    render() {
        Column.create();
        Column.width('100%');
        Column.padding({ bottom: 15 });
        GridRow.create({ columns: 12, gutter: { x: 2, y: 5 },
            direction: GridRowDirection.Row
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.operationSource), (item: string, index: number) => {
            GridCol.create({ span: { xs: 6, sm: 6, md: 4, lg: 4 } });
            Row.create();
            Row.justifyContent(FlexAlign.Center);
            Button.createWithChild();
            Button.width(160);
            Button.height(50);
            Button.type(ButtonType.Capsule);
            Button.margin({ right: 10, top: 10 });
            Button.onClick(() => {
                this.doOperation(index);
            });
            Text.create(item);
            Text.fontSize(16);
            Text.fontColor(Color.White);
            Text.pop();
            Button.pop();
            Row.pop();
            GridCol.pop();
        }, (index: string) => index);
        ForEach.pop();
        GridRow.pop();
        Column.pop();
    }
    async aboutToAppear() {
        if (this.operationRes) {
            let menuList = await getStringArray(this.operationRes);
            this.operationSource = menuList;
        }
    }
}
