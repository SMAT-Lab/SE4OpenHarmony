interface Index_Params {
    result?: string;
    expression?: string;
    onInputValue?;
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
let storage = new LocalStorage();
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__result = new ObservedPropertySimple('', this, "result");
        this.__expression = new ObservedPropertySimple('', this, "expression");
        this.onInputValue = (value: string) => {
            if (value === 'C') { // 当用户点击C按钮，表达式和运算结果归0
                this.expression = '';
                this.result = '';
                return;
            }
            else if (value === '') {
                this.expression = this.expression.substring(0, this.expression.length - 1);
                this.result = this.result = calc(this.expression);
                if (!this.expression.length) {
                    this.result = '';
                }
            }
            else if (isOperator(value)) {
                let size = this.expression.length;
                if (size) {
                    const last = this.expression.charAt(size - 1);
                    if (isOperator(last)) {
                        this.expression = this.expression.substring(0, this.expression.length - 1);
                    }
                }
                if (!this.expression && (value === '*' || value === '/')) {
                    return;
                }
                this.expression += value;
            }
            else if (value === '=') {
                this.result = calc(this.expression);
                if (this.result !== '' && this.result !== undefined) {
                    this.expression = this.result;
                    this.result = '';
                }
            }
            else {
                this.expression += value;
                this.result = calc(this.expression);
            }
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.result !== undefined) {
            this.result = params.result;
        }
        if (params.expression !== undefined) {
            this.expression = params.expression;
        }
        if (params.onInputValue !== undefined) {
            this.onInputValue = params.onInputValue;
        }
    }
    aboutToBeDeleted() {
        this.__result.aboutToBeDeleted();
        this.__expression.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __result: ObservedPropertySimple<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
    }
    private __expression: ObservedPropertySimple<string>;
    get expression() {
        return this.__expression.get();
    }
    set expression(newValue: string) {
        this.__expression.set(newValue);
    }
    render() {
        Column.create();
        Stack.create({ alignContent: Alignment.End });
        Stack.padding(1);
        Stack.width('100%');
        Stack.height('20%');
        Text.create(this.expression);
        Text.maxLines(1);
        Text.opacity(0.38);
        Text.textAlign(TextAlign.Start);
        Text.fontSize('30');
        Text.pop();
        Stack.pop();
        Row.create();
        Row.height('16%');
        Row.width('100%');
        ForEach.create("2", this, ObservedObject.GetRawObject(calcButton1()), (item: ImageList, index: number) => {
            Button.createWithChild({ type: ButtonType.Normal });
            Button.width('25%');
            Button.borderRadius(20);
            Button.backgroundColor(index < 3 ? '#33007DFF' : '#F0F0F0');
            Button.onClick(() => {
                this.onInputValue(item.value);
            });
            Image.create(item.image);
            Image.height('100%');
            Image.aspectRatio(1);
            Image.objectFit(ImageFit.Contain);
            Button.pop();
        });
        ForEach.pop();
        Row.pop();
        Row.create();
        Row.padding(1);
        Row.width('100%');
        Row.height('16%');
        ForEach.create("3", this, ObservedObject.GetRawObject(calcButton2()), (item: ImageList, index: number) => {
            Button.createWithChild({ type: ButtonType.Normal });
            Button.width('25%');
            Button.height('100%');
            Button.borderRadius(20);
            Button.backgroundColor(index < 3 ? '#33007DFF' : '#F0F0F0');
            Button.onClick(() => {
                this.onInputValue(item.value);
            });
            Image.create(item.image);
            Image.height('100%');
            Image.aspectRatio(item.value === '0' ? 2.5 : 1);
            Image.objectFit(ImageFit.Contain);
            Button.pop();
        });
        ForEach.pop();
        Row.pop();
        Row.create();
        Row.padding(1);
        Row.width('100%');
        Row.height('16%');
        ForEach.create("4", this, ObservedObject.GetRawObject(calcButton3()), (item: ImageList, index: number) => {
            Button.createWithChild({ type: ButtonType.Normal });
            Button.width('25%');
            Button.height('100%');
            Button.borderRadius(20);
            Button.backgroundColor(index < 3 ? '#33007DFF' : '#F0F0F0');
            Button.onClick(() => {
                this.onInputValue(item.value);
            });
            Image.create(item.image);
            Image.height('100%');
            Image.aspectRatio(item.value === '0' ? 2.5 : 1);
            Image.objectFit(ImageFit.Contain);
            Button.pop();
        });
        ForEach.pop();
        Row.pop();
        Row.create();
        Row.padding(1);
        Row.width('100%');
        Row.height('16%');
        ForEach.create("5", this, ObservedObject.GetRawObject(calcButton4()), (item: ImageList, index: number) => {
            Button.createWithChild({ type: ButtonType.Normal });
            Button.width('25%');
            Button.height('100%');
            Button.borderRadius(20);
            Button.backgroundColor(index < 3 ? '#33007DFF' : '#F0F0F0');
            Button.onClick(() => {
                this.onInputValue(item.value);
            });
            Image.create(item.image);
            Image.height('100%');
            Image.aspectRatio(1);
            Image.objectFit(ImageFit.Contain);
            Button.pop();
        });
        ForEach.pop();
        Row.pop();
        Row.create();
        Row.padding(1);
        Row.width('100%');
        Row.height('16%');
        ForEach.create("6", this, ObservedObject.GetRawObject(calcButton5()), (item: ImageList, index: number) => {
            Button.createWithChild({ type: ButtonType.Normal });
            Button.width('100%');
            Button.height('100%');
            Button.borderRadius(20);
            Button.backgroundColor(index < 3 ? '#33007DFF' : '#F0F0F0');
            Button.align(Alignment.Center);
            Button.onClick(() => {
                this.onInputValue(item.value);
            });
            Image.create(item.image);
            Image.height('100%');
            Image.aspectRatio(1);
            Image.objectFit(ImageFit.Contain);
            Button.pop();
        });
        ForEach.pop();
        Row.pop();
        Column.pop();
    }
    aboutToAppear() {
        console.error("ArkTSForm aboutToAppear");
    }
    aboutToDisappear() {
        console.error("ArkTSForm aboutToDisappear");
    }
    onPageShow() {
        console.error("ArkTSForm onPageShow");
    }
    onPageHide() {
        console.error("ArkTSForm onPageHide");
    }
    onBackPress() {
        console.error("ArkTSForm onBackPress");
    }
    private onInputValue;
}
interface ImageList {
    image: Resource;
    value: string;
}
function calcButton1(): Array<ImageList> {
    let list: Array<ImageList> = [
        { image: $r('app.media.ic_cal_delete_c'), value: 'C' },
        { image: $r('app.media.ic_cal_division'), value: '/' },
        { image: $r('app.media.ic_cal_multiply'), value: '*' },
        { image: $r('app.media.ic_cal_delete'), value: '' },
    ];
    return list;
}
function calcButton2(): Array<ImageList> {
    let list: Array<ImageList> = [
        { image: $r('app.media.ic_cal_seven'), value: '7' },
        { image: $r('app.media.ic_cal_eight'), value: '8' },
        { image: $r('app.media.ic_cal_nine'), value: '9' },
        { image: $r('app.media.ic_cal_minus'), value: '-' },
    ];
    return list;
}
function calcButton3(): Array<ImageList> {
    let list: Array<ImageList> = [
        { image: $r('app.media.ic_cal_four'), value: '4' },
        { image: $r('app.media.ic_cal_five'), value: '5' },
        { image: $r('app.media.ic_cal_six'), value: '6' },
        { image: $r('app.media.ic_cal_plus'), value: '+' },
    ];
    return list;
}
function calcButton4(): Array<ImageList> {
    let list: Array<ImageList> = [
        { image: $r('app.media.ic_cal_one'), value: '1' },
        { image: $r('app.media.ic_cal_two'), value: '2' },
        { image: $r('app.media.ic_cal_three'), value: '3' },
        { image: $r("app.media.ic_cal_zero"), value: '0' },
    ];
    return list;
}
function calcButton5(): Array<ImageList> {
    let list: Array<ImageList> = [
        { image: $r('app.media.ic_cal_equal'), value: '=' }
    ];
    return list;
}
export function calc(inputContent: string): string {
    const infixExpression: string[] = parseInfixExpression(inputContent);
    const suffixExpression: string[] = toSuffixExpression(infixExpression);
    return calcSuffixExpression(suffixExpression);
}
function parseInfixExpression(inputContent: string) {
    const size: number = inputContent.length;
    const lastIndex = size - 1;
    let singleChar = '';
    const expression: Array<string> = [];
    for (let index = 0; index < size; index++) {
        const element: string = inputContent[index];
        if (isGrouping(element)) {
            if (singleChar !== '') {
                expression.push(singleChar);
                singleChar = '';
            }
            expression.push(element);
        }
        else if (isOperator(element)) {
            if (isSymbol(element) && (index === 0 || inputContent[index - 1] === '(')) {
                singleChar += element;
            }
            else {
                if (singleChar !== '') {
                    expression.push(singleChar);
                    singleChar = '';
                }
                if (index !== lastIndex) {
                    expression.push(element);
                }
            }
        }
        else {
            singleChar += element;
        }
        if (index === lastIndex && singleChar !== '') {
            expression.push(singleChar);
        }
    }
    return expression;
}
function toSuffixExpression(expression: string[]) {
    const operatorStack: Array<string> = [];
    const suffixExpression: Array<string> = [];
    let topOperator: string;
    for (let index = 0, size: number = expression.length; index < size; ++index) {
        const element: string = expression[index];
        if (element === '(') {
            operatorStack.push(element);
            continue;
        }
        if (element === ')') {
            if (operatorStack.length) {
                let operator: string | undefined = operatorStack.pop();
                while (operator !== '(') {
                    suffixExpression.push(operator as string);
                    operator = operatorStack.pop();
                }
            }
            continue;
        }
        if (isOperator(element)) {
            if (!operatorStack.length) {
                operatorStack.push(element);
            }
            else {
                topOperator = operatorStack[operatorStack.length - 1];
                if (!isGrouping(topOperator) && !isPrioritized(element, topOperator)) {
                    while (operatorStack.length) {
                        suffixExpression.push(operatorStack.pop() as string);
                    }
                }
                operatorStack.push(element);
            }
            continue;
        }
        suffixExpression.push(element);
    }
    while (operatorStack.length) {
        suffixExpression.push(operatorStack.pop() as string);
    }
    return suffixExpression;
}
function calcSuffixExpression(expression: string[]) {
    const numberStack: Array<string> = [];
    while (expression.length) {
        let element: string | undefined = expression.shift();
        if (!isOperator(element as string)) {
            numberStack.push(element as string);
        }
        else {
            const firstStackElement: string | undefined = numberStack.pop();
            const secondStackElement: string | undefined = numberStack.pop();
            const result: string = OPERATORHANDLERS[element as string](secondStackElement, firstStackElement);
            if (result.length > 15) {
                numberStack.push((Number.parseFloat(result).toExponential()) as string);
            }
            else {
                numberStack.push(result);
            }
        }
    }
    return numberStack[0];
}
function isOperator(operator: string) {
    return (operator === '+' || operator === '-' || operator === '*' || operator === '/');
}
function isGrouping(operator: string) {
    return operator === '(' || operator === ')';
}
function isSymbol(symbol: string) {
    return symbol === '+' || symbol === '-';
}
function isPrioritized(firstOperator: string, secondOperator: string) {
    return OPERATORLEVELS[firstOperator] > OPERATORLEVELS[secondOperator];
}
const OPERATORLEVELS: Record<string, number> = {
    '+': 0,
    '-': 0,
    '*': 1,
    '/': 1,
};
const OPERATORHANDLERS: Record<string, Function> = {
    '+': (firstOperand: string, secondOperand: string) => (Number.parseFloat(firstOperand) + Number.parseFloat(secondOperand)).toFixed(getFloatNum(Number(firstOperand), Number(secondOperand), '+')),
    '-': (firstOperand: number, secondOperand: number) => (firstOperand - secondOperand).toFixed(getFloatNum(firstOperand, secondOperand, '-')),
    '*': (firstOperand: number, secondOperand: number) => (firstOperand * secondOperand).toFixed(getFloatNum(firstOperand, secondOperand, '*')),
    '/': (firstOperand: number, secondOperand: number) => (firstOperand / secondOperand).toFixed(getFloatNum(firstOperand, secondOperand, '/')),
};
function getFloatNum(firstOperand: number, secondOperand: number, oprate: string) {
    let result = 0;
    let oneString = (new String(firstOperand)).toString();
    let otherString = (new String(secondOperand)).toString();
    let firstNum = 0;
    if (oneString.indexOf('.') !== -1) {
        firstNum = oneString.split('.')[1].length;
    }
    let secondNum = 0;
    if (otherString.indexOf('.') !== -1) {
        secondNum = otherString.split('.')[1].length;
    }
    if (oprate === '+' || oprate === '-') {
        result = Math.max(firstNum, secondNum);
    }
    if (oprate === '*') {
        result = firstNum + secondNum;
    }
    if (oprate === '/') {
        result = (firstNum + otherString.length) > 3 ? (firstNum + otherString.length) : 3;
    }
    return result;
}
loadDocument(new Index("1", undefined, {}, storage));
