interface TaurusSample_Params {
    model?: SmartRefreshForTaurus.Model;
    arr?: Array<ArrParam>;
    arrNumberOfCycles?: Array<number>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TaurusSample_" + ++__generate__Id;
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
import { SmartRefreshForTaurus } from "@ohos/smartrefreshlayout";
import { Taurus } from "@ohos/smartrefreshlayout";
import { TaurusBottomRefresh } from "@ohos/smartrefreshlayout";
class ArrParam {
    index: number = 0;
    name: string = "";
    color: string = "";
}
class TaurusSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new SmartRefreshForTaurus.Model(), this, "model");
        this.arr = [
            { index: 11, name: '折叠', color: '1' },
            { index: 22, name: '展开', color: '2' },
            { index: 44, name: '红色主题', color: '#ff4444' },
            { index: 55, name: '绿色主题', color: '#99cc00' },
            { index: 66, name: '蓝色主题', color: '#2299ee' },
            { index: 33, name: '橙色主题', color: '#ffbb33' },
        ];
        this.arrNumberOfCycles = [1, 2, 3, 4, 5, 6];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TaurusSample_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.arrNumberOfCycles !== undefined) {
            this.arrNumberOfCycles = params.arrNumberOfCycles;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<SmartRefreshForTaurus.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SmartRefreshForTaurus.Model) {
        this.__model.set(newValue);
    }
    private arr: Array<ArrParam>;
    private arrNumberOfCycles: Array<number>;
    aboutToAppear() {
        this.model.setBackgroundColor('#ffbb33');
        this.model.setExpand(true);
        this.model.setTitleName('冲上云霄');
    }
    testHeader(parent = null) {
    }
    testMain(parent = null) {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start });
        Flex.width("100%");
        Flex.backgroundColor("#ffffff");
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (itemOther: ArrParam) => {
            Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start });
            Flex.onClick(e => {
                if (itemOther.color == '1') {
                    this.model.setExpand(false);
                }
                else if (itemOther.color == '2') {
                    this.model.setExpand(true);
                }
                else {
                    this.model.setBackgroundColor(itemOther.color);
                }
            });
            Text.create(itemOther.name);
            Text.fontSize(30);
            Text.fontColor('#282828');
            Text.padding({ left: 10, top: 10 });
            Text.pop();
            Text.create(itemOther.color == '1' ? '折叠AppBarLayout，变成正常的列表页面' :
                itemOther.color == '2' ? '展开AppBarLayout，变成可伸展头部的页面' :
                    '更改为' + itemOther.name + '颜色');
            Text.fontSize(25);
            Text.fontColor('#8c8c8c');
            Text.padding({ left: 10, top: 5 });
            Text.pop();
            Text.create('');
            Text.backgroundColor('#ececec');
            Text.height(0.5);
            Text.width('100%');
            Text.margin({ top: 10, bottom: 5 });
            Text.pop();
            Flex.pop();
        }, (item: ArrParam) => item.index.toString());
        ForEach.pop();
        ForEach.create("3", this, ObservedObject.GetRawObject(this.arrNumberOfCycles), (item: ArrParam) => {
            Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start });
            Flex.onClick(e => {
                this.model.setBackgroundColor('#ffbb33');
            });
            Text.create("橙色主题");
            Text.fontSize(30);
            Text.fontColor('#282828');
            Text.padding({ left: 10, top: 10 });
            Text.pop();
            Text.create('更改为橙色主题颜色');
            Text.fontSize(25);
            Text.fontColor('#8c8c8c');
            Text.padding({ left: 10, top: 5 });
            Text.pop();
            Text.create('');
            Text.backgroundColor('#ececec');
            Text.height(0.5);
            Text.width('100%');
            Text.margin({ top: 10, bottom: 5 });
            Text.pop();
            Flex.pop();
        }, (item: number) => item.toString());
        ForEach.pop();
        Flex.pop();
    }
    testFooter(parent = null) {
        Column.create();
        Column.width("100%");
        Column.pop();
    }
    render() {
        Column.create();
        Column.backgroundColor("#dddddd");
        Column.pop();
    }
}
loadDocument(new TaurusSample("1", undefined, {}));
