interface COLUMN_LAYOUT_Params {
    vLayoutContent?: (item?: ESObject, position?: number, layoutHeight?: number) => ESObject //布局
    ;
    vLayoutData?: layoutDataType[] | number[] | string[];
    vLayoutAttribute?: AbstractFullFillAttributes;
    columnInfo?: AbstractFullFillAttributes;
    colWeightArray?: Array<number>;
    layoutHeight?: number | undefined;
    builderWidth?: number;
    builderItemHeight?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ColumnLayoutHelper_" + ++__generate__Id;
}
/*
Copyright (c) 2021 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import { AbstractFullFillAttributes, layoutDataType } from '../core/VLayoutAttributes';
const TAG = 'vlayout COLUMN_LAYOUT ';
export class COLUMN_LAYOUT extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.vLayoutContent = undefined;
        this.vLayoutData = [] //数据源
        ;
        this.__vLayoutAttribute = new ObservedPropertyObject({} //属性
        , this, "vLayoutAttribute");
        this.__columnInfo = new ObservedPropertyObject({} //属性
        , this, "columnInfo");
        this.__colWeightArray = new ObservedPropertyObject([], this, "colWeightArray");
        this.__layoutHeight = new ObservedPropertyObject(undefined //容器高度
        , this, "layoutHeight");
        this.builderWidth = 0 //获取的宽度
        ;
        this.builderItemHeight = 0 //获取的高度
        ;
        this.updateWithValueParams(params);
        this.declareWatch("vLayoutAttribute", this.defaultValueInit);
    }
    updateWithValueParams(params: COLUMN_LAYOUT_Params) {
        if (params.vLayoutContent !== undefined) {
            this.vLayoutContent = params.vLayoutContent;
        }
        if (params.vLayoutData !== undefined) {
            this.vLayoutData = params.vLayoutData;
        }
        if (params.vLayoutAttribute !== undefined) {
            this.vLayoutAttribute = params.vLayoutAttribute;
        }
        if (params.columnInfo !== undefined) {
            this.columnInfo = params.columnInfo;
        }
        if (params.colWeightArray !== undefined) {
            this.colWeightArray = params.colWeightArray;
        }
        if (params.layoutHeight !== undefined) {
            this.layoutHeight = params.layoutHeight;
        }
        if (params.builderWidth !== undefined) {
            this.builderWidth = params.builderWidth;
        }
        if (params.builderItemHeight !== undefined) {
            this.builderItemHeight = params.builderItemHeight;
        }
    }
    aboutToBeDeleted() {
        this.__vLayoutAttribute.aboutToBeDeleted();
        this.__columnInfo.aboutToBeDeleted();
        this.__colWeightArray.aboutToBeDeleted();
        this.__layoutHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __vLayoutContent; //布局
    private vLayoutData: layoutDataType[] | number[] | string[]; //数据源
    private __vLayoutAttribute?: ObservedPropertyObject<AbstractFullFillAttributes>; //属性
    get vLayoutAttribute() {
        return this.__vLayoutAttribute.get();
    }
    set vLayoutAttribute(newValue: AbstractFullFillAttributes) {
        this.__vLayoutAttribute.set(newValue);
    }
    private __columnInfo: ObservedPropertyObject<AbstractFullFillAttributes>; //属性
    get columnInfo() {
        return this.__columnInfo.get();
    }
    set columnInfo(newValue: AbstractFullFillAttributes) {
        this.__columnInfo.set(newValue);
    }
    private __colWeightArray: ObservedPropertyObject<Array<number>>;
    get colWeightArray() {
        return this.__colWeightArray.get();
    }
    set colWeightArray(newValue: Array<number>) {
        this.__colWeightArray.set(newValue);
    }
    private __layoutHeight: ObservedPropertyObject<number | undefined>; //容器高度
    get layoutHeight() {
        return this.__layoutHeight.get();
    }
    set layoutHeight(newValue: number | undefined) {
        this.__layoutHeight.set(newValue);
    }
    private builderWidth: number; //获取的宽度
    private builderItemHeight: number; //获取的高度
    aboutToAppear() {
        this.defaultValueInit();
    }
    defaultValueInit() {
        this.columnInfo = {
            range: this.vLayoutAttribute?.range == undefined ? [] : this.vLayoutAttribute.range,
            colWeights: this.vLayoutAttribute?.colWeights == undefined || this.vLayoutAttribute.colWeights.length == 0 ? [] : this.vLayoutAttribute.colWeights,
            aspectRatio: this.vLayoutAttribute?.aspectRatio == undefined ? 0 : this.vLayoutAttribute.aspectRatio,
            bgColor: this.vLayoutAttribute?.bgColor == undefined ? 'rgba(0,0,0,0)' : this.vLayoutAttribute.bgColor,
            zIndex: this.vLayoutAttribute?.zIndex == undefined ? 0 : this.vLayoutAttribute.zIndex,
            padding: this.vLayoutAttribute?.padding == undefined ? [] : this.vLayoutAttribute.padding,
            topPadding: this.vLayoutAttribute?.topPadding == undefined ? 0 : this.vLayoutAttribute.topPadding,
            rightPadding: this.vLayoutAttribute?.rightPadding == undefined ? 0 : this.vLayoutAttribute.rightPadding,
            bottomPadding: this.vLayoutAttribute?.bottomPadding == undefined ? 0 : this.vLayoutAttribute.bottomPadding,
            leftPadding: this.vLayoutAttribute?.leftPadding == undefined ? 0 : this.vLayoutAttribute.leftPadding,
            margin: this.vLayoutAttribute?.margin == undefined ? [] : this.vLayoutAttribute.margin,
            topMargin: this.vLayoutAttribute?.topMargin == undefined ? 0 : this.vLayoutAttribute.topMargin,
            rightMargin: this.vLayoutAttribute?.rightMargin == undefined ? 0 : this.vLayoutAttribute.rightMargin,
            bottomMargin: this.vLayoutAttribute?.bottomMargin == undefined ? 0 : this.vLayoutAttribute.bottomMargin,
            leftMargin: this.vLayoutAttribute?.leftMargin == undefined ? 0 : this.vLayoutAttribute.leftMargin
        };
        if (this.columnInfo.padding?.length == 4) {
            this.columnInfo.topPadding = this.columnInfo.padding[0];
            this.columnInfo.rightPadding = this.columnInfo.padding[1];
            this.columnInfo.bottomPadding = this.columnInfo.padding[2];
            this.columnInfo.leftPadding = this.columnInfo.padding[3];
        }
        if (this.columnInfo.margin?.length == 4) {
            this.columnInfo.topMargin = this.columnInfo.margin[0];
            this.columnInfo.rightMargin = this.columnInfo.margin[1];
            this.columnInfo.bottomMargin = this.columnInfo.margin[2];
            this.columnInfo.leftMargin = this.columnInfo.margin[3];
        }
        this.computedRange();
        this.computedColWeights();
    }
    computedRange() {
        //可显示的条目range数组长度为2并且数组元素内第一项大于等于0并且第二项大于第一项
        if (this.columnInfo.range?.length == 2 && this.columnInfo.range[0] >= 0 && this.columnInfo.range[1] > this.columnInfo.range[0]) {
            this.vLayoutData = this.vLayoutData.splice(this.columnInfo.range[0], this.columnInfo.range[1]);
        }
        else {
            this.vLayoutData = this.vLayoutData;
        }
        console.info(TAG + 'vLayoutData = ' + JSON.stringify(this.vLayoutData));
    }
    computedColWeights() {
        let element = 0;
        if (this.columnInfo.colWeights) {
            for (let index = 0; index < this.columnInfo.colWeights?.length; index++) {
                element = this.columnInfo.colWeights[index];
                if (element < 0) {
                    this.columnInfo.colWeights = [];
                }
                else {
                    this.columnInfo.colWeights = this.columnInfo.colWeights;
                }
            }
            if (this.vLayoutData.length == this.columnInfo.colWeights?.length) { //数据源数组长度等于列权重数组长度时
                this.colWeightArray = this.columnInfo.colWeights;
            }
            else if (this.vLayoutData.length < this.columnInfo.colWeights?.length) { //数据源数组长度小于列权重数组长度时
                this.colWeightArray = this.columnInfo.colWeights;
                let arr: number[] = [];
                for (let i = 0; i < this.vLayoutData.length; i++) {
                    arr.push(this.colWeightArray[i]);
                }
                this.colWeightArray = arr;
            }
            else { //数据源数组长度大于列权重数组长度时
                this.colWeightArray = this.columnInfo.colWeights;
                let sum = 0;
                let item = 0;
                let count = this.vLayoutData.length - this.colWeightArray.length;
                if (this.colWeightArray.length == 0) {
                    this.colWeightArray = [];
                }
                else {
                    for (let i = 0; i < this.colWeightArray.length; i++) {
                        element = this.colWeightArray[i];
                        sum += element;
                        if (sum < 100) {
                            item = (100 - sum) / count;
                        }
                        else {
                            item = 0;
                        }
                    }
                    for (let j = 0; j < count; j++) {
                        this.colWeightArray.push(item);
                    }
                }
            }
            console.info(TAG + 'colWeightArray = ' + this.colWeightArray);
        }
    }
    computedHeight() {
        if (this.columnInfo.aspectRatio && this.columnInfo.aspectRatio > 0) {
            let mHeight = this.builderWidth / this.columnInfo.aspectRatio;
            this.layoutHeight = mHeight;
            this.computedExtraHeight();
        }
        else {
            this.layoutHeight = this.builderItemHeight;
            this.computedExtraHeight();
        }
    }
    computedExtraHeight() {
        if (this.columnInfo.topPadding && this.layoutHeight) {
            if (this.columnInfo.topPadding >= 0 && typeof (this.columnInfo.topPadding) == 'number') {
                this.layoutHeight = this.layoutHeight + this.columnInfo.topPadding;
            }
            else if (typeof (this.columnInfo.topPadding) == 'string' && this.columnInfo.topPadding != '' && this.columnInfo.topPadding.includes('%')) {
                let topPadding = Number(this.columnInfo.topPadding.substring(0, this.columnInfo.topPadding.indexOf('%'))) * 0.01 * this.layoutHeight;
                this.layoutHeight = this.layoutHeight + topPadding;
            }
            else {
                console.error(TAG + 'something else topPadding');
            }
        }
        if (this.columnInfo.bottomPadding && this.layoutHeight) {
            if (this.columnInfo.bottomPadding >= 0 && typeof (this.columnInfo.bottomPadding) == 'number') {
                this.layoutHeight = this.layoutHeight + this.columnInfo.bottomPadding;
            }
            else if (typeof (this.columnInfo.bottomPadding) == 'string' && this.columnInfo.bottomPadding != '' && this.columnInfo.bottomPadding.includes('%')) {
                let bottomPadding = Number(this.columnInfo.bottomPadding.substring(0, this.columnInfo.bottomPadding.indexOf('%'))) * 0.01 * this.layoutHeight;
                this.layoutHeight = this.layoutHeight + bottomPadding;
            }
            else {
                console.error(TAG + 'something else bottomPadding');
            }
        }
    }
    toPercent(num: number) {
        let str = Number(num).toFixed(0);
        str += '%';
        return str;
    }
    render() {
        Column.create();
        Column.backgroundColor(this.columnInfo.bgColor);
        Column.zIndex(this.columnInfo.zIndex);
        Column.margin({
            top: this.columnInfo.topMargin,
            right: this.columnInfo.rightMargin,
            bottom: this.columnInfo.bottomMargin,
            left: this.columnInfo.leftMargin
        });
        Row.create();
        Row.onAreaChange((oldValue, newValue) => {
            this.builderWidth = Number(newValue.width);
            let builderHeight = Number(newValue.height);
            console.info(TAG + 'builderWidth = ' + this.builderWidth + ', builderHeight = ' + builderHeight);
        });
        Row.width(undefined);
        Row.height(ObservedObject.GetRawObject(this.layoutHeight));
        Row.padding({
            top: this.columnInfo.topPadding,
            right: this.columnInfo.rightPadding,
            bottom: this.columnInfo.bottomPadding,
            left: this.columnInfo.leftPadding
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.vLayoutData), (item: any, position: number) => {
            Stack.create();
            Stack.width(this.colWeightArray.length == 0 ? undefined : this.toPercent(this.colWeightArray[position]));
            Stack.layoutWeight(this.colWeightArray.length == 0 ? 1 : undefined);
            Stack.onAreaChange((oldValue, newValue) => {
                let builderItemWidth = Number(newValue.width);
                this.builderItemHeight = Number(newValue.height);
                console.info(TAG + 'builderItemWidth = ' + builderItemWidth + ', builderItemHeight = ' + this.builderItemHeight);
                this.computedHeight();
            });
            this.vLayoutContent(item, position, ObservedObject.GetRawObject(this.layoutHeight), this);
            Stack.pop();
        });
        ForEach.pop();
        Row.pop();
        Column.pop();
    }
}
