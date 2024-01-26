interface TestPagination_Params {
    currentPage_1?: number;
    currentPage_2?: number;
    currentPage_3?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestPagination_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Institute of Software, Chinese Academy of Sciences.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Pagination_basic, Pagination_simple, Pagination_ellipses } from "easyui";
class TestPagination extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentPage_1 = new ObservedPropertySimple(1, this, "currentPage_1");
        this.__currentPage_2 = new ObservedPropertySimple(1, this, "currentPage_2");
        this.__currentPage_3 = new ObservedPropertySimple(1, this, "currentPage_3");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestPagination_Params) {
        if (params.currentPage_1 !== undefined) {
            this.currentPage_1 = params.currentPage_1;
        }
        if (params.currentPage_2 !== undefined) {
            this.currentPage_2 = params.currentPage_2;
        }
        if (params.currentPage_3 !== undefined) {
            this.currentPage_3 = params.currentPage_3;
        }
    }
    aboutToBeDeleted() {
        this.__currentPage_1.aboutToBeDeleted();
        this.__currentPage_2.aboutToBeDeleted();
        this.__currentPage_3.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentPage_1: ObservedPropertySimple<number>;
    get currentPage_1() {
        return this.__currentPage_1.get();
    }
    set currentPage_1(newValue: number) {
        this.__currentPage_1.set(newValue);
    }
    private __currentPage_2: ObservedPropertySimple<number>;
    get currentPage_2() {
        return this.__currentPage_2.get();
    }
    set currentPage_2(newValue: number) {
        this.__currentPage_2.set(newValue);
    }
    private __currentPage_3: ObservedPropertySimple<number>;
    get currentPage_3() {
        return this.__currentPage_3.get();
    }
    set currentPage_3(newValue: number) {
        this.__currentPage_3.set(newValue);
    }
    render() {
        Column.create();
        Column.width("100%");
        Column.height("100%");
        Column.backgroundColor("#ffececec");
        Text.create("基础用法");
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ top: 100, left: 10, bottom: 10 });
        Text.pop();
        Text.create("简单模式");
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ top: 100, left: 10, bottom: 10 });
        Text.pop();
        Text.create("显示省略号");
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ top: 100, left: 10, bottom: 10 });
        Text.pop();
        Column.pop();
    }
}
loadDocument(new TestPagination("1", undefined, {}));
