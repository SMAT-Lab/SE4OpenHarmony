interface RationalNumber_Params {
    resultText?: string;
    doOperation?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "RationalNumber_" + ++__generate__Id;
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
import { compareTo, getDenominator, getValueOf, isFinite, isNaN, isZero } from '../../util/RationalNumberUtil';
import { GridOperation } from '../GridOperation';
const NUMERATOR1: number = 1;
const DENOMINATOR1: number = 2;
const NUMERATOR2: number = 3;
const DENOMINATOR2: number = 4;
function __Text__textStyle(): void {
    Text.border({ width: 1, color: '#000000', radius: 10, style: BorderStyle.Solid });
    Text.fontSize(24);
    Text.textAlign(TextAlign.Center);
}
export class RationalNumber extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__resultText = new ObservedPropertySimple('', this, "resultText");
        this.doOperation = (index: number) => {
            switch (index) {
                case 0:
                    this.resultText = compareTo();
                    break;
                case 1:
                    this.resultText = getValueOf();
                    break;
                case 2:
                    this.resultText = getDenominator();
                    break;
                case 3:
                    this.resultText = isZero();
                    break;
                case 4:
                    this.resultText = isNaN();
                    break;
                case 5:
                    this.resultText = isFinite();
                    break;
                default:
                    break;
            }
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: RationalNumber_Params) {
        if (params.resultText !== undefined) {
            this.resultText = params.resultText;
        }
        if (params.doOperation !== undefined) {
            this.doOperation = params.doOperation;
        }
    }
    aboutToBeDeleted() {
        this.__resultText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __resultText: ObservedPropertySimple<string>;
    get resultText() {
        return this.__resultText.get();
    }
    set resultText(newValue: string) {
        this.__resultText.set(newValue);
    }
    render() {
        Scroll.create();
        Scroll.scrollBar(BarState.Off);
        Scroll.align(Alignment.Start);
        Column.create({ space: 12 });
        Column.width('100%');
        Column.padding(16);
        Text.create($r('app.string.first_rational_number'));
        Text.width('100%');
        Text.fontSize(24);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        this.Texts(NUMERATOR1, DENOMINATOR1, this);
        Text.create($r('app.string.second_rational_number'));
        Text.width('100%');
        Text.fontSize(24);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        this.Texts(NUMERATOR2, DENOMINATOR2, this);
        Text.create(this.resultText);
        __Text__textStyle();
        Text.width('100%');
        Text.height(100);
        Text.pop();
        let earlierCreatedChild_2: GridOperation = (this && this.findChildById) ? this.findChildById("2") as GridOperation : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new GridOperation("2", this, { operationRes: $r('app.strarray.rational_number_operations'), doOperation: this.doOperation }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                operationRes: $r('app.strarray.rational_number_operations'), doOperation: this.doOperation
            });
            View.create(earlierCreatedChild_2);
        }
        Column.pop();
        Scroll.pop();
    }
    Texts(numerator: number, denominator: number, parent = null) {
        Row.create();
        Row.width('100%');
        Row.alignItems(VerticalAlign.Center);
        Row.justifyContent(FlexAlign.SpaceAround);
        Text.create($r('app.string.numerator'));
        Text.fontSize(24);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create(`${numerator}`);
        __Text__textStyle();
        Text.margin({ left: 5 });
        Text.layoutWeight(1);
        Text.pop();
        Text.create($r('app.string.denominator'));
        Text.fontSize(24);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create(`${denominator}`);
        __Text__textStyle();
        Text.margin({ left: 5 });
        Text.layoutWeight(1);
        Text.pop();
        Row.pop();
    }
    private doOperation;
}
