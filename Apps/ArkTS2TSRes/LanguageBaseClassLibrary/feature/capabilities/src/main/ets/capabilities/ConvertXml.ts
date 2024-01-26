interface ConvertXml_Params {
    output?: string;
    input?: string;
    doOperation?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ConvertXml_" + ++__generate__Id;
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
import { serializerNode, parserNode, convertNode } from '../util/ConvertXmlUtil';
export class ConvertXml extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__output = new ObservedPropertySimple(`eTSXmlTextConvert`, this, "output");
        this.__input = new ObservedPropertySimple(`<?xml version="1.0" encoding="utf-8"?>
     <note importance="high" logged="true">
         <title>Happy</title>
         <todo>Work</todo>
         <todo>Play</todo>
     </note>`, this, "input");
        this.doOperation = (index: number) => {
            switch (index) {
                case 0:
                    this.output = serializerNode();
                    break;
                case 1:
                    this.output = parserNode(this.input);
                    break;
                case 2:
                    this.output = convertNode(this.input);
                    break;
                default:
                    break;
            }
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ConvertXml_Params) {
        if (params.output !== undefined) {
            this.output = params.output;
        }
        if (params.input !== undefined) {
            this.input = params.input;
        }
        if (params.doOperation !== undefined) {
            this.doOperation = params.doOperation;
        }
    }
    aboutToBeDeleted() {
        this.__output.aboutToBeDeleted();
        this.__input.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __output: ObservedPropertySimple<string>;
    get output() {
        return this.__output.get();
    }
    set output(newValue: string) {
        this.__output.set(newValue);
    }
    private __input: ObservedPropertySimple<string>;
    get input() {
        return this.__input.get();
    }
    set input(newValue: string) {
        this.__input.set(newValue);
    }
    render() {
        Scroll.create();
        Scroll.scrollBar(BarState.Off);
        Scroll.align(Alignment.Start);
        Column.create();
        Column.width('100%');
        Column.padding(16);
        Text.create(this.output);
        Text.width('90%');
        Text.height('60%');
        Text.fontSize(15);
        Text.padding(10);
        Text.margin({ left: 10, right: 10, top: 20, bottom: 10 });
        Text.border({ width: 2, radius: 5, color: Color.Gray });
        Text.pop();
        let earlierCreatedChild_2: ColumnOperation = (this && this.findChildById) ? this.findChildById("2") as ColumnOperation : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new ColumnOperation("2", this, { operationRes: $r('app.strarray.convert_xml_operations'), doOperation: this.doOperation }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                operationRes: $r('app.strarray.convert_xml_operations'), doOperation: this.doOperation
            });
            View.create(earlierCreatedChild_2);
        }
        Column.pop();
        Scroll.pop();
    }
    private doOperation;
}
