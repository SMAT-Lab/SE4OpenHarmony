interface Url_Params {
    output?: string;
    doOperation?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Url_" + ++__generate__Id;
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
import { ColumnOperation } from '../components/ColumnOperation';
import { changeValue, deleteNode, getFirstNode, insertNode } from '../util/UrlUtil';
const URL_NET: string = 'https://gitee.com/openharmony/';
export class Url extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__output = new ObservedPropertySimple(URL_NET, this, "output");
        this.doOperation = (index: number) => {
            switch (index) {
                case 0:
                    this.output = insertNode();
                    break;
                case 1:
                    this.output = deleteNode();
                    break;
                case 2:
                    this.output = getFirstNode();
                    break;
                case 3:
                    this.output = changeValue();
                    break;
                default:
                    break;
            }
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Url_Params) {
        if (params.output !== undefined) {
            this.output = params.output;
        }
        if (params.doOperation !== undefined) {
            this.doOperation = params.doOperation;
        }
    }
    aboutToBeDeleted() {
        this.__output.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __output: ObservedPropertySimple<string>;
    get output() {
        return this.__output.get();
    }
    set output(newValue: string) {
        this.__output.set(newValue);
    }
    render() {
        Scroll.create();
        Scroll.scrollBar(BarState.Off);
        Scroll.align(Alignment.Start);
        Column.create();
        Column.width('100%');
        Column.padding(16);
        Text.create(this.output);
        Text.id('output');
        Text.width('95%');
        Text.height('30%');
        Text.fontSize(15);
        Text.padding(10);
        Text.margin({ left: 10, right: 10, top: 10 });
        Text.border({ width: 2, radius: 5, color: Color.Gray });
        Text.pop();
        Text.create(URL_NET);
        Text.fontSize(15);
        Text.margin({ top: 15 });
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        let earlierCreatedChild_2: ColumnOperation = (this && this.findChildById) ? this.findChildById("2") as ColumnOperation : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new ColumnOperation("2", this, { operationRes: $r('app.strarray.url_operations'), doOperation: this.doOperation }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                operationRes: $r('app.strarray.url_operations'), doOperation: this.doOperation
            });
            View.create(earlierCreatedChild_2);
        }
        Column.pop();
        Scroll.pop();
    }
    private doOperation;
}
