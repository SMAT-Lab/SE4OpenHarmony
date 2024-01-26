interface Collections_Params {
    mapSize?: string;
    listSize?: string;
    setSize?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "collections_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Thrift } from '@ohos/thrift';
import CalculatorClient from '../common/calculator/Calculator';
import { WorkSet, WorkMap, WorkList, Operation } from '../common/calculator/tutorial_types';
import { GlobalContext } from '../GlobalContext';
class Collections extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__mapSize = new ObservedPropertySimple('MAP SIZE:', this, "mapSize");
        this.__listSize = new ObservedPropertySimple('LIST SIZE:', this, "listSize");
        this.__setSize = new ObservedPropertySimple('SET SIZE:', this, "setSize");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Collections_Params) {
        if (params.mapSize !== undefined) {
            this.mapSize = params.mapSize;
        }
        if (params.listSize !== undefined) {
            this.listSize = params.listSize;
        }
        if (params.setSize !== undefined) {
            this.setSize = params.setSize;
        }
    }
    aboutToBeDeleted() {
        this.__mapSize.aboutToBeDeleted();
        this.__listSize.aboutToBeDeleted();
        this.__setSize.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __mapSize: ObservedPropertySimple<string>;
    get mapSize() {
        return this.__mapSize.get();
    }
    set mapSize(newValue: string) {
        this.__mapSize.set(newValue);
    }
    private __listSize: ObservedPropertySimple<string>;
    get listSize() {
        return this.__listSize.get();
    }
    set listSize(newValue: string) {
        this.__listSize.set(newValue);
    }
    private __setSize: ObservedPropertySimple<string>;
    get setSize() {
        return this.__setSize.get();
    }
    set setSize(newValue: string) {
        this.__setSize.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.mapSize);
        Text.width('100%');
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0xFFFFFF);
        Text.pop();
        Text.create(this.listSize);
        Text.width('100%');
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0xFFFFFF);
        Text.margin({
            top: 10
        });
        Text.pop();
        Text.create(this.setSize);
        Text.width('100%');
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0xFFFFFF);
        Text.margin({
            top: 10
        });
        Text.pop();
        Button.createWithLabel('send request');
        Button.width("100%");
        Button.height(100);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.margin({
            top: 10
        });
        Button.onClick((event) => {
            this.onButtonClick();
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
    onBackPress() {
    }
    async onButtonClick() {
        let transport: any = new Thrift.Transport("http://" + GlobalContext.getContext().getValue("ipAddress").toString());
        let protocol: any = new Thrift.Protocol(transport);
        let client: CalculatorClient = new CalculatorClient(protocol, null);
        let that: any = this;
        let workMap: WorkMap = new WorkMap();
        workMap.mapValue = {
            'hello': 'world', 'OpenHarmony': 'thrift'
        };
        workMap.op = Operation.MAP_SIZE;
        client.getMapSize(1, workMap, (result: any) => {
            if (result) {
                that.mapSize = 'MAP SIZE:' + result;
            }
        });
        let workSet: WorkSet = new WorkSet();
        workSet.setValue = ['hello', 'world'];
        workSet.op = Operation.SET_SIZE;
        client.getSetSize(1, workSet, (result: any) => {
            if (result) {
                that.setSize = 'LIST SIZE:' + result;
            }
        });
        let workList: WorkList = new WorkList();
        workList.listValue = ['hello', 'world'];
        workList.op = Operation.LIST_SIZE;
        client.getListSize(1, workList, (result: any) => {
            if (result) {
                that.listSize = 'SET SIZE:' + result;
            }
        });
    }
}
loadDocument(new Collections("1", undefined, {}));
