interface ONEN_LAYOUT_Params {
    vLayoutContent?: (item?: ESObject) => ESObject //布局
    ;
    vLayoutData?: layoutDataType[] | number[] | string[];
    vLayoutAttribute?: AbstractFullFillAttributes;
    onePlusNInfo?: AbstractFullFillAttributes;
    colWeightArray?: number[];
    rowWeightArray?: number[];
    layoutHeight?: number | undefined;
    itemWidth?: number;
    itemHeight?: number;
    itemHeight1?: number;
    itemHeight2?: number;
    itemHeight3?: number;
    itemHeight4?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "OnePlusNLayoutHelper_" + ++__generate__Id;
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
const TAG = 'vlayout ONEN_LAYOUT ';
export class ONEN_LAYOUT extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.vLayoutContent = undefined;
        this.vLayoutData = [] //数据源
        ;
        this.__vLayoutAttribute = new ObservedPropertyObject({} //属性
        , this, "vLayoutAttribute");
        this.__onePlusNInfo = new ObservedPropertyObject({} //属性
        , this, "onePlusNInfo");
        this.__colWeightArray = new ObservedPropertyObject([] //列权重
        , this, "colWeightArray");
        this.__rowWeightArray = new ObservedPropertyObject([] //行权重
        , this, "rowWeightArray");
        this.__layoutHeight = new ObservedPropertyObject(undefined //一拖n布局的高度
        , this, "layoutHeight");
        this.itemWidth = 0 //每个item的宽度
        ;
        this.itemHeight = 0 //第一个item的高度
        ;
        this.itemHeight1 = 0 //第二个item的高度
        ;
        this.itemHeight2 = 0 //第三个item的高度
        ;
        this.itemHeight3 = 0 //第四个item的高度
        ;
        this.itemHeight4 = 0 //第五个item的高度
        ;
        this.updateWithValueParams(params);
        this.declareWatch("vLayoutAttribute", this.defaultValueInit);
    }
    updateWithValueParams(params: ONEN_LAYOUT_Params) {
        if (params.vLayoutContent !== undefined) {
            this.vLayoutContent = params.vLayoutContent;
        }
        if (params.vLayoutData !== undefined) {
            this.vLayoutData = params.vLayoutData;
        }
        if (params.vLayoutAttribute !== undefined) {
            this.vLayoutAttribute = params.vLayoutAttribute;
        }
        if (params.onePlusNInfo !== undefined) {
            this.onePlusNInfo = params.onePlusNInfo;
        }
        if (params.colWeightArray !== undefined) {
            this.colWeightArray = params.colWeightArray;
        }
        if (params.rowWeightArray !== undefined) {
            this.rowWeightArray = params.rowWeightArray;
        }
        if (params.layoutHeight !== undefined) {
            this.layoutHeight = params.layoutHeight;
        }
        if (params.itemWidth !== undefined) {
            this.itemWidth = params.itemWidth;
        }
        if (params.itemHeight !== undefined) {
            this.itemHeight = params.itemHeight;
        }
        if (params.itemHeight1 !== undefined) {
            this.itemHeight1 = params.itemHeight1;
        }
        if (params.itemHeight2 !== undefined) {
            this.itemHeight2 = params.itemHeight2;
        }
        if (params.itemHeight3 !== undefined) {
            this.itemHeight3 = params.itemHeight3;
        }
        if (params.itemHeight4 !== undefined) {
            this.itemHeight4 = params.itemHeight4;
        }
    }
    aboutToBeDeleted() {
        this.__vLayoutAttribute.aboutToBeDeleted();
        this.__onePlusNInfo.aboutToBeDeleted();
        this.__colWeightArray.aboutToBeDeleted();
        this.__rowWeightArray.aboutToBeDeleted();
        this.__layoutHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    /*
     * 1 + 0
     * -------------------------
     * |                       |
     * |                       |
     * |           1           |
     * |                       |
     * |                       |
     * |                       |
     * -------------------------
     *
     * 1 + 1
     * -------------------------
     * |           |           |
     * |           |           |
     * |           |           |
     * |     1     |     2     |
     * |           |           |
     * |           |           |
     * |           |           |
     * -------------------------
     *
     * 1 + 2
     * -------------------------
     * |           |           |
     * |           |     2     |
     * |           |           |
     * |     1     |-----------|
     * |           |           |
     * |           |     3     |
     * |           |           |
     * -------------------------
     *
     * 1 + 3
     * -------------------------
     * |           |           |
     * |           |     2     |
     * |           |           |
     * |     1     |-----------|
     * |           |     |     |
     * |           |  3  |  4  |
     * |           |     |     |
     * -------------------------
     *
     *  1 + 4
     * -------------------------
     * |           |           |
     * |           |     2     |
     * |           |           |
     * |     1     |-----------|
     * |           |   |   |   |
     * |           | 3 | 4 | 5 |
     * |           |   |   |   |
     * -------------------------
     */
    private __vLayoutContent; //布局
    private vLayoutData: layoutDataType[] | number[] | string[]; //数据源
    private __vLayoutAttribute?: ObservedPropertyObject<AbstractFullFillAttributes>; //属性
    get vLayoutAttribute() {
        return this.__vLayoutAttribute.get();
    }
    set vLayoutAttribute(newValue: AbstractFullFillAttributes) {
        this.__vLayoutAttribute.set(newValue);
    }
    private __onePlusNInfo: ObservedPropertyObject<AbstractFullFillAttributes>; //属性
    get onePlusNInfo() {
        return this.__onePlusNInfo.get();
    }
    set onePlusNInfo(newValue: AbstractFullFillAttributes) {
        this.__onePlusNInfo.set(newValue);
    }
    private __colWeightArray: ObservedPropertyObject<number[]>; //列权重
    get colWeightArray() {
        return this.__colWeightArray.get();
    }
    set colWeightArray(newValue: number[]) {
        this.__colWeightArray.set(newValue);
    }
    private __rowWeightArray: ObservedPropertyObject<number[]>; //行权重
    get rowWeightArray() {
        return this.__rowWeightArray.get();
    }
    set rowWeightArray(newValue: number[]) {
        this.__rowWeightArray.set(newValue);
    }
    private __layoutHeight: ObservedPropertyObject<number | undefined>; //一拖n布局的高度
    get layoutHeight() {
        return this.__layoutHeight.get();
    }
    set layoutHeight(newValue: number | undefined) {
        this.__layoutHeight.set(newValue);
    }
    private itemWidth: number; //每个item的宽度
    private itemHeight: number; //第一个item的高度
    private itemHeight1: number; //第二个item的高度
    private itemHeight2: number; //第三个item的高度
    private itemHeight3: number; //第四个item的高度
    private itemHeight4: number; //第五个item的高度
    aboutToAppear() {
        this.defaultValueInit();
    }
    defaultValueInit() {
        this.onePlusNInfo = {
            range: this.vLayoutAttribute?.range == undefined ? [] : this.vLayoutAttribute.range,
            rowWeights: this.vLayoutAttribute?.rowWeights == undefined || this.vLayoutAttribute.rowWeights.length == 0 ? [] : this.vLayoutAttribute.rowWeights,
            colWeights: this.vLayoutAttribute?.colWeights == undefined || this.vLayoutAttribute.colWeights.length == 0 ? [] : this.vLayoutAttribute.colWeights,
            hasHeader: this.vLayoutAttribute?.hasHeader == undefined ? false : this.vLayoutAttribute.hasHeader,
            hasFooter: this.vLayoutAttribute?.hasFooter == undefined ? false : this.vLayoutAttribute.hasFooter,
            layoutWidth: this.vLayoutAttribute?.layoutWidth,
            layoutHeight: this.vLayoutAttribute?.layoutHeight,
            aspectRatio: this.vLayoutAttribute?.aspectRatio,
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
        if (this.onePlusNInfo.padding?.length == 4) {
            this.onePlusNInfo.topPadding = this.onePlusNInfo.padding[0];
            this.onePlusNInfo.rightPadding = this.onePlusNInfo.padding[1];
            this.onePlusNInfo.bottomPadding = this.onePlusNInfo.padding[2];
            this.onePlusNInfo.leftPadding = this.onePlusNInfo.padding[3];
        }
        if (this.onePlusNInfo.margin?.length == 4) {
            this.onePlusNInfo.topMargin = this.onePlusNInfo.margin[0];
            this.onePlusNInfo.rightMargin = this.onePlusNInfo.margin[1];
            this.onePlusNInfo.bottomMargin = this.onePlusNInfo.margin[2];
            this.onePlusNInfo.leftMargin = this.onePlusNInfo.margin[3];
        }
        this.computedRange();
        this.computedColWeights();
        this.computedRowWeights();
    }
    computedRange() {
        //可显示的条目range数组长度为2并且数组元素内第一项大于等于0并且第二项大于第一项
        if (this.onePlusNInfo.range?.length == 2 && this.onePlusNInfo.range[0] >= 0 && this.onePlusNInfo.range[1] > this.onePlusNInfo.range[0]) {
            this.vLayoutData = this.vLayoutData.splice(this.onePlusNInfo.range[0], this.onePlusNInfo.range[1]);
        }
        else {
            this.vLayoutData = this.vLayoutData;
        }
        console.info(TAG + 'vLayoutData = ' + JSON.stringify(this.vLayoutData));
    }
    computedColWeights() {
        if (this.onePlusNInfo.colWeights) {
            this.colWeightArray = this.onePlusNInfo.colWeights;
            if (this.onePlusNInfo.colWeights && this.vLayoutData.length > this.onePlusNInfo.colWeights.length) { //数据源数组长度大于列权重数组长度时
                if (this.onePlusNInfo.colWeights.length == 1) {
                    let sum = 0;
                    for (let i = 0; i < this.onePlusNInfo.colWeights.length; i++) {
                        let element: number = this.onePlusNInfo.colWeights[i];
                        sum += element;
                    }
                    if (this.vLayoutData.length == 2) {
                        if (sum <= 100) {
                            this.colWeightArray.push(100 - sum);
                        }
                    }
                    if (this.vLayoutData.length == 3) {
                        if (sum <= 100) {
                            for (let j = 0; j < 2; j++) {
                                this.colWeightArray.push(100 - sum);
                            }
                        }
                    }
                    if (this.vLayoutData.length == 4) {
                        if (sum < 100) {
                            this.colWeightArray.push(100 - sum);
                            for (let j = 0; j < 2; j++) {
                                this.colWeightArray.push((100 - sum) / 2);
                            }
                        }
                    }
                    if (this.vLayoutData.length == 5) {
                        if (sum < 100) {
                            this.colWeightArray.push(100 - sum);
                            for (let j = 0; j < 3; j++) {
                                this.colWeightArray.push((100 - sum) / 3);
                            }
                        }
                    }
                }
                else if (this.onePlusNInfo.colWeights.length == 2) {
                    if (this.vLayoutData.length == 3) {
                        this.colWeightArray.push(100 - this.colWeightArray[0]);
                    }
                    if (this.vLayoutData.length == 4) {
                        for (let j = 0; j < 2; j++) {
                            this.colWeightArray.push((100 - this.colWeightArray[0]) / 2);
                        }
                    }
                    if (this.vLayoutData.length == 5) {
                        for (let j = 0; j < 3; j++) {
                            this.colWeightArray.push((100 - this.colWeightArray[0]) / 3);
                        }
                    }
                }
                else if (this.onePlusNInfo.colWeights.length == 3) {
                    if (this.vLayoutData.length == 4) {
                        this.colWeightArray.push(100 - this.colWeightArray[0] - this.colWeightArray[2]);
                    }
                    if (this.vLayoutData.length == 5) {
                        for (let j = 0; j < 2; j++) {
                            this.colWeightArray.push((100 - this.colWeightArray[0] - this.colWeightArray[2]) / 2);
                        }
                    }
                }
                else if (this.onePlusNInfo.colWeights.length == 4) {
                    if (this.vLayoutData.length == 5) {
                        this.colWeightArray.push(100 - this.colWeightArray[0] - this.colWeightArray[2] - this.colWeightArray[3]);
                    }
                }
                else {
                    console.error(TAG + 'computedColWeights else');
                }
                console.info(TAG + '> colWeightArray = ' + JSON.stringify(this.colWeightArray));
            }
            else { //数据源数组长度小于等于列权重数组长度时
                console.info(TAG + '<= colWeightArray = ' + JSON.stringify(this.colWeightArray));
            }
        }
    }
    computedRowWeights() {
        if (this.onePlusNInfo.rowWeights) {
            this.rowWeightArray = this.onePlusNInfo.rowWeights;
            if (this.onePlusNInfo.rowWeights.length == 1) {
                if (this.vLayoutData.length == 3 || this.vLayoutData.length == 4 || this.vLayoutData.length == 5) {
                    this.rowWeightArray.push(this.onePlusNInfo.rowWeights[0]);
                }
            }
            else {
                console.error(TAG + 'computedRowWeights else');
            }
            console.info(TAG + 'rowWeightArray = ' + JSON.stringify(this.rowWeightArray));
        }
    }
    computedSize() {
        //当容器宽度定义了，无法同时给左右外边距
        //当容器纵横比定义了就相当于容器宽度定义了
        if (this.onePlusNInfo.layoutWidth == undefined && this.onePlusNInfo.layoutHeight == undefined && this.onePlusNInfo.aspectRatio == undefined) {
            //当不设置容器宽度、高度、纵横比时，子项请勿提供百分比的高度，请提供数值的高度；
            this.onePlusNInfo.layoutWidth = undefined;
            this.onePlusNInfo.layoutHeight = undefined;
            this.onePlusNInfo.aspectRatio = undefined;
            this.computedLayoutHeight();
        }
        else if (this.onePlusNInfo.layoutWidth != undefined && this.onePlusNInfo.layoutHeight == undefined && this.onePlusNInfo.aspectRatio == undefined) {
            //当设置容器宽度，不设置高度、纵横比时，子项请勿提供百分比的高度，请提供数值的高度；
            this.onePlusNInfo.layoutWidth = this.onePlusNInfo.layoutWidth;
            this.onePlusNInfo.layoutHeight = undefined;
            this.onePlusNInfo.aspectRatio = undefined;
            this.computedLayoutHeight();
        }
        else if (this.onePlusNInfo.layoutWidth == undefined && this.onePlusNInfo.layoutHeight != undefined && this.onePlusNInfo.aspectRatio == undefined) {
            this.onePlusNInfo.layoutWidth = undefined;
            this.onePlusNInfo.layoutHeight = this.onePlusNInfo.layoutHeight;
            this.onePlusNInfo.aspectRatio = undefined;
        }
        else if (this.onePlusNInfo.layoutWidth == undefined && this.onePlusNInfo.layoutHeight == undefined && this.onePlusNInfo.aspectRatio != undefined) {
            //当不设置容器宽度、高度但设置纵横比时，子项不建议提供百分百的高度，建议提供数值的高度；
            this.onePlusNInfo.layoutWidth = undefined;
            this.onePlusNInfo.layoutHeight = undefined;
            this.onePlusNInfo.aspectRatio = this.onePlusNInfo.aspectRatio;
            this.computedLayoutHeight();
        }
        else if (this.onePlusNInfo.layoutWidth != undefined && this.onePlusNInfo.layoutHeight != undefined && this.onePlusNInfo.aspectRatio != undefined) {
            //当设置了容器宽度、高度、纵横比时，子项不建议提供数值的高度，建议提供百分百的高度；
            this.onePlusNInfo.layoutWidth = this.onePlusNInfo.layoutWidth;
            this.onePlusNInfo.layoutHeight = this.onePlusNInfo.layoutHeight; //此时提供的高度无效
            this.onePlusNInfo.aspectRatio = this.onePlusNInfo.aspectRatio;
        }
        else if (this.onePlusNInfo.layoutWidth != undefined && this.onePlusNInfo.layoutHeight != undefined && this.onePlusNInfo.aspectRatio == undefined) {
            //当设置了容器宽度、高度但不设置纵横比时，子项不建议提供数值的高度，建议提供百分百的高度；
            this.onePlusNInfo.layoutWidth = this.onePlusNInfo.layoutWidth;
            this.onePlusNInfo.layoutHeight = this.onePlusNInfo.layoutHeight;
            this.onePlusNInfo.aspectRatio = undefined;
        }
        else if (this.onePlusNInfo.layoutWidth != undefined && this.onePlusNInfo.layoutHeight == undefined && this.onePlusNInfo.aspectRatio != undefined) {
            //当设置了容器宽度、纵横比但不设置高度时，子项不建议提供百分百的高度，建议提供数值的高度；
            this.onePlusNInfo.layoutWidth = this.onePlusNInfo.layoutWidth;
            this.onePlusNInfo.layoutHeight = undefined;
            this.onePlusNInfo.aspectRatio = this.onePlusNInfo.aspectRatio;
            this.computedLayoutHeight();
        }
        else if (this.onePlusNInfo.layoutWidth == undefined && this.onePlusNInfo.layoutHeight != undefined && this.onePlusNInfo.aspectRatio != undefined) {
            //当设置了容器高度、纵横比但不设置宽度时，子项不建议提供数值的高度，建议提供百分百的高度；
            this.onePlusNInfo.layoutWidth = undefined;
            this.onePlusNInfo.layoutHeight = this.onePlusNInfo.layoutHeight;
            this.onePlusNInfo.aspectRatio = this.onePlusNInfo.aspectRatio;
        }
        else {
            console.error(TAG + 'computedSize else');
        }
    }
    computedLayoutHeight() {
        if (this.vLayoutData.length == 1) {
            this.layoutHeight = this.itemHeight;
        }
        else if (this.vLayoutData.length == 2) {
            this.layoutHeight = Math.max(this.itemHeight1, this.itemHeight2);
        }
        else if (this.vLayoutData.length == 3) {
            if (this.vLayoutAttribute?.hasHeader && !this.vLayoutAttribute?.hasFooter) {
                this.layoutHeight = Math.max(this.itemHeight1, this.itemHeight2) + this.itemHeight;
            }
            else if (!this.vLayoutAttribute?.hasHeader && this.vLayoutAttribute?.hasFooter) {
                this.layoutHeight = Math.max(this.itemHeight, this.itemHeight1) + this.itemHeight2;
            }
            else if (this.vLayoutAttribute?.hasHeader && this.vLayoutAttribute?.hasFooter) {
                this.layoutHeight = this.itemHeight + this.itemHeight1 + this.itemHeight2;
            }
            else {
                if (this.itemHeight1 + this.itemHeight2 >= this.itemHeight) {
                    this.layoutHeight = this.itemHeight1 + this.itemHeight2;
                }
                else {
                    this.layoutHeight = Math.max(this.itemHeight, this.itemHeight1, this.itemHeight2);
                }
            }
        }
        else if (this.vLayoutData.length == 4) {
            if (this.vLayoutAttribute?.hasHeader && !this.vLayoutAttribute?.hasFooter) {
                if (this.itemHeight1 >= this.itemHeight2 + this.itemHeight3) {
                    this.layoutHeight = this.itemHeight + this.itemHeight1;
                }
                else {
                    this.layoutHeight = this.itemHeight + this.itemHeight2 + this.itemHeight3;
                }
            }
            else if (!this.vLayoutAttribute?.hasHeader && this.vLayoutAttribute?.hasFooter) {
                if (this.itemHeight1 + this.itemHeight2 >= this.itemHeight) {
                    this.layoutHeight = this.itemHeight1 + this.itemHeight2 + this.itemHeight3;
                }
                else {
                    this.layoutHeight = this.itemHeight + this.itemHeight3;
                }
            }
            else if (this.vLayoutAttribute?.hasHeader && this.vLayoutAttribute?.hasFooter) {
                this.layoutHeight = this.itemHeight + Math.max(this.itemHeight1, this.itemHeight2) + this.itemHeight3;
            }
            else {
                if (this.itemHeight1 + Math.max(this.itemHeight2, this.itemHeight3) >= this.itemHeight) {
                    this.layoutHeight = this.itemHeight1 + Math.max(this.itemHeight2, this.itemHeight3);
                }
                else {
                    this.layoutHeight = Math.max(this.itemHeight, this.itemHeight1, this.itemHeight2, this.itemHeight3);
                }
            }
        }
        else if (this.vLayoutData.length == 5) {
            if (this.vLayoutAttribute?.hasHeader && !this.vLayoutAttribute?.hasFooter) {
                if (this.itemHeight2 + Math.max(this.itemHeight3, this.itemHeight4) >= this.itemHeight1) {
                    this.layoutHeight = this.itemHeight + this.itemHeight2 + Math.max(this.itemHeight3, this.itemHeight4);
                }
                else {
                    this.layoutHeight = this.itemHeight + this.itemHeight1;
                }
            }
            else if (!this.vLayoutAttribute?.hasHeader && this.vLayoutAttribute?.hasFooter) {
                if (this.itemHeight1 + Math.max(this.itemHeight2, this.itemHeight3) >= this.itemHeight) {
                    this.layoutHeight = this.itemHeight1 + Math.max(this.itemHeight2, this.itemHeight3) + this.itemHeight4;
                }
                else {
                    this.layoutHeight = this.itemHeight + this.itemHeight4;
                }
            }
            else if (this.vLayoutAttribute?.hasHeader && this.vLayoutAttribute?.hasFooter) {
                if (this.itemHeight2 + this.itemHeight3 >= this.itemHeight1) {
                    this.layoutHeight = this.itemHeight + this.itemHeight2 + this.itemHeight3 + this.itemHeight4;
                }
                else {
                    this.layoutHeight = this.itemHeight + this.itemHeight1 + this.itemHeight4;
                }
            }
            else {
                if (this.itemHeight1 + Math.max(this.itemHeight2, this.itemHeight3, this.itemHeight4) >= this.itemHeight) {
                    this.layoutHeight = this.itemHeight1 + Math.max(this.itemHeight2, this.itemHeight3, this.itemHeight4);
                }
                else {
                    this.layoutHeight = Math.max(this.itemHeight, this.itemHeight1, this.itemHeight2, this.itemHeight3, this.itemHeight4);
                }
            }
        }
        else {
            console.error(TAG + 'computedLayoutHeight else');
        }
        this.computedExtraHeight();
    }
    computedExtraHeight() {
        if (this.onePlusNInfo.topPadding && this.layoutHeight) {
            if (this.onePlusNInfo.topPadding >= 0 && typeof (this.onePlusNInfo.topPadding) == 'number') {
                this.layoutHeight = this.layoutHeight + this.onePlusNInfo.topPadding;
            }
            else if (typeof (this.onePlusNInfo.topPadding) == 'string' && this.onePlusNInfo.topPadding != '' && this.onePlusNInfo.topPadding.includes('%')) {
                let topPadding = Number(this.onePlusNInfo.topPadding.substring(0, this.onePlusNInfo.topPadding.indexOf('%'))) * 0.01 * this.layoutHeight;
                this.layoutHeight = this.layoutHeight + topPadding;
            }
            else {
                console.error(TAG + 'something else topPadding');
            }
        }
        if (this.onePlusNInfo.bottomPadding && this.layoutHeight) {
            if (this.onePlusNInfo.bottomPadding >= 0 && typeof (this.onePlusNInfo.bottomPadding) == 'number') {
                this.layoutHeight = this.layoutHeight + this.onePlusNInfo.bottomPadding;
            }
            else if (typeof (this.onePlusNInfo.bottomPadding) == 'string' && this.onePlusNInfo.bottomPadding != '' && this.onePlusNInfo.bottomPadding.includes('%')) {
                let bottomPadding = Number(this.onePlusNInfo.bottomPadding.substring(0, this.onePlusNInfo.bottomPadding.indexOf('%'))) * 0.01 * this.layoutHeight;
                this.layoutHeight = this.layoutHeight + bottomPadding;
            }
            else {
                console.error(TAG + 'something else bottomPadding');
            }
        }
    }
    toPercent(num: number) {
        let str: string = Number(num).toFixed(0);
        str += '%';
        return str;
    }
    render() {
        Column.create();
        Column.backgroundColor(this.onePlusNInfo.bgColor);
        Column.zIndex(this.onePlusNInfo.zIndex);
        Column.margin({
            top: this.onePlusNInfo.topMargin,
            right: this.onePlusNInfo.rightMargin,
            bottom: this.onePlusNInfo.bottomMargin,
            left: this.onePlusNInfo.leftMargin
        });
        Row.create();
        Row.width(this.onePlusNInfo.layoutWidth);
        Row.height(this.onePlusNInfo.layoutHeight == undefined ? this.layoutHeight : this.onePlusNInfo.layoutHeight);
        Row.aspectRatio(this.onePlusNInfo.aspectRatio);
        Row.padding({
            top: this.onePlusNInfo.topPadding,
            right: this.onePlusNInfo.rightPadding,
            bottom: this.onePlusNInfo.bottomPadding,
            left: this.onePlusNInfo.leftPadding
        });
        If.create();
        if (this.vLayoutData.length == 1) {
            If.branchId(0);
            Row.create();
            Column.create();
            Column.onAreaChange((oldValue, newValue) => {
                this.itemWidth = (Number(newValue.width));
                this.itemHeight = (Number(newValue.height));
                console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight = ' + this.itemHeight);
                this.computedSize();
            });
            Column.alignItems(HorizontalAlign.Start);
            Column.width(this.colWeightArray.length == 0 ? '100%' : this.toPercent(this.colWeightArray[0]));
            this.vLayoutContent(this.vLayoutData[0], this);
            Column.pop();
            Row.pop();
        }
        else if (this.vLayoutData.length == 2) {
            If.branchId(1);
            Row.create();
            Column.create();
            Column.onAreaChange((oldValue, newValue) => {
                this.itemWidth = (Number(newValue.width));
                this.itemHeight1 = (Number(newValue.height));
                console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight1 = ' + this.itemHeight1);
                this.computedSize();
            });
            Column.alignItems(HorizontalAlign.Start);
            Column.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[0]));
            this.vLayoutContent(this.vLayoutData[0], this);
            Column.pop();
            Column.create();
            Column.onAreaChange((oldValue, newValue) => {
                this.itemWidth = (Number(newValue.width));
                this.itemHeight2 = (Number(newValue.height));
                console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight2 = ' + this.itemHeight2);
                this.computedSize();
            });
            Column.alignItems(HorizontalAlign.Start);
            Column.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[1]));
            this.vLayoutContent(this.vLayoutData[1], this);
            Column.pop();
            Row.pop();
        }
        else if (this.vLayoutData.length == 3) {
            If.branchId(2);
            If.create();
            if (this.vLayoutAttribute?.hasHeader && !this.vLayoutAttribute?.hasFooter) {
                If.branchId(0);
                Column.create();
                Column.alignItems(HorizontalAlign.Start);
                Row.create();
                Row.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight = ' + this.itemHeight);
                    this.computedSize();
                });
                Row.width(this.colWeightArray.length == 0 ? '100%' : this.toPercent(this.colWeightArray[0]));
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[0]));
                this.vLayoutContent(this.vLayoutData[0], this);
                Row.pop();
                Row.create();
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[1]));
                Column.create();
                Column.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight1 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight1 = ' + this.itemHeight1);
                    this.computedSize();
                });
                Column.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[1]));
                this.vLayoutContent(this.vLayoutData[1], this);
                Column.pop();
                Column.create();
                Column.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight2 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight2 = ' + this.itemHeight2);
                    this.computedSize();
                });
                Column.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[2]));
                this.vLayoutContent(this.vLayoutData[2], this);
                Column.pop();
                Row.pop();
                Column.pop();
            }
            else if (!this.vLayoutAttribute?.hasHeader && this.vLayoutAttribute?.hasFooter) {
                If.branchId(1);
                Column.create();
                Column.alignItems(HorizontalAlign.Start);
                Row.create();
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[0]));
                Column.create();
                Column.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight = ' + this.itemHeight);
                    this.computedSize();
                });
                Column.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[0]));
                this.vLayoutContent(this.vLayoutData[0], this);
                Column.pop();
                Column.create();
                Column.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight1 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight1 = ' + this.itemHeight1);
                    this.computedSize();
                });
                Column.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[1]));
                this.vLayoutContent(this.vLayoutData[1], this);
                Column.pop();
                Row.pop();
                Row.create();
                Row.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight2 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight2 = ' + this.itemHeight2);
                    this.computedSize();
                });
                Row.width(this.colWeightArray.length == 0 ? '100%' : this.toPercent(this.colWeightArray[2]));
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[1]));
                this.vLayoutContent(this.vLayoutData[2], this);
                Row.pop();
                Column.pop();
            }
            else if (this.vLayoutAttribute?.hasHeader && this.vLayoutAttribute?.hasFooter) {
                If.branchId(2);
                Column.create();
                Column.alignItems(HorizontalAlign.Start);
                Row.create();
                Row.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight = ' + this.itemHeight);
                    this.computedSize();
                });
                Row.width(this.colWeightArray.length == 0 ? '100%' : this.toPercent(this.colWeightArray[0]));
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[0]));
                this.vLayoutContent(this.vLayoutData[0], this);
                Row.pop();
                Row.create();
                Row.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight1 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight1 = ' + this.itemHeight1);
                    this.computedSize();
                });
                Row.width(this.colWeightArray.length == 0 ? '100%' : this.toPercent(this.colWeightArray[1]));
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[1]));
                this.vLayoutContent(this.vLayoutData[1], this);
                Row.pop();
                Row.create();
                Row.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight2 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight2 = ' + this.itemHeight2);
                    this.computedSize();
                });
                Row.width(this.colWeightArray.length == 0 ? '100%' : this.toPercent(this.colWeightArray[2]));
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[0]));
                this.vLayoutContent(this.vLayoutData[2], this);
                Row.pop();
                Column.pop();
            }
            else {
                If.branchId(3);
                Row.create();
                Column.create();
                Column.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight = ' + this.itemHeight);
                    this.computedSize();
                });
                Column.alignItems(HorizontalAlign.Start);
                Column.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[0]));
                this.vLayoutContent(this.vLayoutData[0], this);
                Column.pop();
                Column.create();
                Column.alignItems(HorizontalAlign.Start);
                Row.create();
                Row.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight1 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight1 = ' + this.itemHeight1);
                    this.computedSize();
                });
                Row.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[1]));
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[0]));
                this.vLayoutContent(this.vLayoutData[1], this);
                Row.pop();
                Row.create();
                Row.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight2 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight2 = ' + this.itemHeight2);
                    this.computedSize();
                });
                Row.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[2]));
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[1]));
                this.vLayoutContent(this.vLayoutData[2], this);
                Row.pop();
                Column.pop();
                Row.pop();
            }
            If.pop();
        }
        else if (this.vLayoutData.length == 4) {
            If.branchId(3);
            If.create();
            if (this.vLayoutAttribute?.hasHeader && !this.vLayoutAttribute?.hasFooter) {
                If.branchId(0);
                Column.create();
                Column.alignItems(HorizontalAlign.Start);
                Row.create();
                Row.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight = ' + this.itemHeight);
                    this.computedSize();
                });
                Row.width(this.colWeightArray.length == 0 ? '100%' : this.toPercent(this.colWeightArray[0]));
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[0]));
                this.vLayoutContent(this.vLayoutData[0], this);
                Row.pop();
                Row.create();
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[1]));
                Column.create();
                Column.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight1 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight1 = ' + this.itemHeight1);
                    this.computedSize();
                });
                Column.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[1]));
                this.vLayoutContent(this.vLayoutData[1], this);
                Column.pop();
                Column.create();
                Column.alignItems(HorizontalAlign.Start);
                Row.create();
                Row.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight2 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight2 = ' + this.itemHeight2);
                    this.computedSize();
                });
                Row.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[2]));
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : 1);
                this.vLayoutContent(this.vLayoutData[2], this);
                Row.pop();
                Row.create();
                Row.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight3 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight3 = ' + this.itemHeight3);
                    this.computedSize();
                });
                Row.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[3]));
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : 1);
                this.vLayoutContent(this.vLayoutData[3], this);
                Row.pop();
                Column.pop();
                Row.pop();
                Column.pop();
            }
            else if (!this.vLayoutAttribute?.hasHeader && this.vLayoutAttribute?.hasFooter) {
                If.branchId(1);
                Column.create();
                Column.alignItems(HorizontalAlign.Start);
                Row.create();
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[0]));
                Column.create();
                Column.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight = ' + this.itemHeight);
                    this.computedSize();
                });
                Column.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[0]));
                this.vLayoutContent(this.vLayoutData[0], this);
                Column.pop();
                Column.create();
                Column.alignItems(HorizontalAlign.Start);
                Row.create();
                Row.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight1 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight1 = ' + this.itemHeight1);
                    this.computedSize();
                });
                Row.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[1]));
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : 1);
                this.vLayoutContent(this.vLayoutData[1], this);
                Row.pop();
                Row.create();
                Row.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight2 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight2 = ' + this.itemHeight2);
                    this.computedSize();
                });
                Row.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[2]));
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : 1);
                this.vLayoutContent(this.vLayoutData[2], this);
                Row.pop();
                Column.pop();
                Row.pop();
                Row.create();
                Row.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight3 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight3 = ' + this.itemHeight3);
                    this.computedSize();
                });
                Row.width(this.colWeightArray.length == 0 ? '100%' : this.toPercent(this.colWeightArray[3]));
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[1]));
                this.vLayoutContent(this.vLayoutData[3], this);
                Row.pop();
                Column.pop();
            }
            else if (this.vLayoutAttribute?.hasHeader && this.vLayoutAttribute?.hasFooter) {
                If.branchId(2);
                Column.create();
                Column.alignItems(HorizontalAlign.Start);
                Row.create();
                Row.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight = ' + this.itemHeight);
                    this.computedSize();
                });
                Row.width(this.colWeightArray.length == 0 ? '100%' : this.toPercent(this.colWeightArray[0]));
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[0]));
                this.vLayoutContent(this.vLayoutData[0], this);
                Row.pop();
                Row.create();
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[1]));
                Column.create();
                Column.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight1 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight1 = ' + this.itemHeight1);
                    this.computedSize();
                });
                Column.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[1]));
                this.vLayoutContent(this.vLayoutData[1], this);
                Column.pop();
                Column.create();
                Column.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight2 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight2 = ' + this.itemHeight2);
                    this.computedSize();
                });
                Column.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[2]));
                this.vLayoutContent(this.vLayoutData[2], this);
                Column.pop();
                Row.pop();
                Row.create();
                Row.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight3 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight3 = ' + this.itemHeight3);
                    this.computedSize();
                });
                Row.width(this.colWeightArray.length == 0 ? '100%' : this.toPercent(this.colWeightArray[3]));
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[0]));
                this.vLayoutContent(this.vLayoutData[3], this);
                Row.pop();
                Column.pop();
            }
            else {
                If.branchId(3);
                Row.create();
                Column.create();
                Column.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight = ' + this.itemHeight);
                    this.computedSize();
                });
                Column.alignItems(HorizontalAlign.Start);
                Column.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[0]));
                this.vLayoutContent(this.vLayoutData[0], this);
                Column.pop();
                Column.create();
                Column.alignItems(HorizontalAlign.Start);
                Column.create();
                Column.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight1 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight1 = ' + this.itemHeight1);
                    this.computedSize();
                });
                Column.alignItems(HorizontalAlign.Start);
                Column.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[1]));
                Column.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[0]));
                this.vLayoutContent(this.vLayoutData[1], this);
                Column.pop();
                Row.create();
                Row.width(this.colWeightArray.length == 0 ? '50%' : '100%');
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[1]));
                Column.create();
                Column.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight2 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight2 = ' + this.itemHeight2);
                    this.computedSize();
                });
                Column.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[2]));
                this.vLayoutContent(this.vLayoutData[2], this);
                Column.pop();
                Column.create();
                Column.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight3 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight3 = ' + this.itemHeight3);
                    this.computedSize();
                });
                Column.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[3]));
                this.vLayoutContent(this.vLayoutData[3], this);
                Column.pop();
                Row.pop();
                Column.pop();
                Row.pop();
            }
            If.pop();
        }
        else if (this.vLayoutData.length == 5) {
            If.branchId(4);
            If.create();
            if (this.vLayoutAttribute?.hasHeader && !this.vLayoutAttribute?.hasFooter) {
                If.branchId(0);
                Column.create();
                Column.alignItems(HorizontalAlign.Start);
                Row.create();
                Row.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight = ' + this.itemHeight);
                    this.computedSize();
                });
                Row.width(this.colWeightArray.length == 0 ? '100%' : this.toPercent(this.colWeightArray[0]));
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[0]));
                this.vLayoutContent(this.vLayoutData[0], this);
                Row.pop();
                Row.create();
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[1]));
                Column.create();
                Column.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight1 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight1 = ' + this.itemHeight1);
                    this.computedSize();
                });
                Column.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[1]));
                this.vLayoutContent(this.vLayoutData[1], this);
                Column.pop();
                Column.create();
                Column.alignItems(HorizontalAlign.Start);
                Column.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : 1);
                Row.create();
                Row.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight2 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight2 = ' + this.itemHeight2);
                    this.computedSize();
                });
                Row.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[2]));
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : 1);
                this.vLayoutContent(this.vLayoutData[2], this);
                Row.pop();
                Row.create();
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : 1);
                Column.create();
                Column.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight3 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight3 = ' + this.itemHeight3);
                    this.computedSize();
                });
                Column.width(this.colWeightArray.length == 0 ? '25%' : this.toPercent(this.colWeightArray[3]));
                this.vLayoutContent(this.vLayoutData[3], this);
                Column.pop();
                Column.create();
                Column.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight4 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight4 = ' + this.itemHeight4);
                    this.computedSize();
                });
                Column.width(this.colWeightArray.length == 0 ? '25%' : this.toPercent(this.colWeightArray[4]));
                this.vLayoutContent(this.vLayoutData[4], this);
                Column.pop();
                Row.pop();
                Column.pop();
                Row.pop();
                Column.pop();
            }
            else if (!this.vLayoutAttribute?.hasHeader && this.vLayoutAttribute?.hasFooter) {
                If.branchId(1);
                Column.create();
                Column.alignItems(HorizontalAlign.Start);
                Row.create();
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[0]));
                Column.create();
                Column.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight = ' + this.itemHeight);
                    this.computedSize();
                });
                Column.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[0]));
                this.vLayoutContent(this.vLayoutData[0], this);
                Column.pop();
                Column.create();
                Column.alignItems(HorizontalAlign.Start);
                Column.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : 1);
                Row.create();
                Row.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight1 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight1 = ' + this.itemHeight1);
                    this.computedSize();
                });
                Row.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[1]));
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : 1);
                this.vLayoutContent(this.vLayoutData[1], this);
                Row.pop();
                Row.create();
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : 1);
                Column.create();
                Column.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight2 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight2 = ' + this.itemHeight2);
                    this.computedSize();
                });
                Column.width(this.colWeightArray.length == 0 ? '25%' : this.toPercent(this.colWeightArray[2]));
                this.vLayoutContent(this.vLayoutData[2], this);
                Column.pop();
                Column.create();
                Column.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight3 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight3 = ' + this.itemHeight3);
                    this.computedSize();
                });
                Column.width(this.colWeightArray.length == 0 ? '25%' : this.toPercent(this.colWeightArray[3]));
                this.vLayoutContent(this.vLayoutData[3], this);
                Column.pop();
                Row.pop();
                Column.pop();
                Row.pop();
                Row.create();
                Row.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight4 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight4 = ' + this.itemHeight4);
                    this.computedSize();
                });
                Row.width(this.colWeightArray.length == 0 ? '100%' : this.toPercent(this.colWeightArray[4]));
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[1]));
                this.vLayoutContent(this.vLayoutData[4], this);
                Row.pop();
                Column.pop();
            }
            else if (this.vLayoutAttribute?.hasHeader && this.vLayoutAttribute?.hasFooter) {
                If.branchId(2);
                Column.create();
                Column.alignItems(HorizontalAlign.Start);
                Row.create();
                Row.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight = ' + this.itemHeight);
                    this.computedSize();
                });
                Row.width(this.colWeightArray.length == 0 ? '100%' : this.toPercent(this.colWeightArray[0]));
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[0]));
                this.vLayoutContent(this.vLayoutData[0], this);
                Row.pop();
                Row.create();
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[1]));
                Column.create();
                Column.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight1 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight1 = ' + this.itemHeight1);
                    this.computedSize();
                });
                Column.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[1]));
                this.vLayoutContent(this.vLayoutData[1], this);
                Column.pop();
                Column.create();
                Column.alignItems(HorizontalAlign.Start);
                Column.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : 1);
                Row.create();
                Row.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight2 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight2 = ' + this.itemHeight2);
                    this.computedSize();
                });
                Row.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[2]));
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : 1);
                this.vLayoutContent(this.vLayoutData[2], this);
                Row.pop();
                Row.create();
                Row.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight3 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight3 = ' + this.itemHeight3);
                    this.computedSize();
                });
                Row.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[3]));
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : 1);
                this.vLayoutContent(this.vLayoutData[3], this);
                Row.pop();
                Column.pop();
                Row.pop();
                Row.create();
                Row.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight4 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight4 = ' + this.itemHeight4);
                    this.computedSize();
                });
                Row.width(this.colWeightArray.length == 0 ? '100%' : this.toPercent(this.colWeightArray[4]));
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[0]));
                this.vLayoutContent(this.vLayoutData[4], this);
                Row.pop();
                Column.pop();
            }
            else {
                If.branchId(3);
                Row.create();
                Column.create();
                Column.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight = ' + this.itemHeight);
                    this.computedSize();
                });
                Column.alignItems(HorizontalAlign.Start);
                Column.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[0]));
                this.vLayoutContent(this.vLayoutData[0], this);
                Column.pop();
                Column.create();
                Column.alignItems(HorizontalAlign.Start);
                Column.create();
                Column.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight1 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight1 = ' + this.itemHeight1);
                    this.computedSize();
                });
                Column.alignItems(HorizontalAlign.Start);
                Column.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[1]));
                Column.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[0]));
                this.vLayoutContent(this.vLayoutData[1], this);
                Column.pop();
                Row.create();
                Row.width(this.colWeightArray.length == 0 ? '50%' : '100%');
                Row.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[1]));
                Column.create();
                Column.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight2 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight2 = ' + this.itemHeight2);
                    this.computedSize();
                });
                Column.width(this.colWeightArray.length == 0 ? '33%' : this.toPercent(this.colWeightArray[2]));
                Column.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.colWeightArray.length == 0 ? 1 : 0));
                this.vLayoutContent(this.vLayoutData[2], this);
                Column.pop();
                Column.create();
                Column.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight3 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight3 = ' + this.itemHeight3);
                    this.computedSize();
                });
                Column.width(this.colWeightArray.length == 0 ? '33%' : this.toPercent(this.colWeightArray[3]));
                Column.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.colWeightArray.length == 0 ? 1 : 0));
                this.vLayoutContent(this.vLayoutData[3], this);
                Column.pop();
                Column.create();
                Column.onAreaChange((oldValue, newValue) => {
                    this.itemWidth = (Number(newValue.width));
                    this.itemHeight4 = (Number(newValue.height));
                    console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight4 = ' + this.itemHeight4);
                    this.computedSize();
                });
                Column.width(this.colWeightArray.length == 0 ? '33%' : this.toPercent(this.colWeightArray[4]));
                Column.layoutWeight(this.onePlusNInfo.layoutHeight == undefined ? undefined : (this.colWeightArray.length == 0 ? 1 : 0));
                this.vLayoutContent(this.vLayoutData[4], this);
                Column.pop();
                Row.pop();
                Column.pop();
                Row.pop();
            }
            If.pop();
        }
        else {
            If.branchId(5);
            Text.create('please less than 1+5');
            Text.width('100%');
            Text.height('100%');
            Text.backgroundColor(0x22EEEEEE);
            Text.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
            Text.fontSize(25);
            Text.fontColor('#999999');
            Text.fontWeight(FontWeight.Bold);
            Text.textAlign(TextAlign.Center);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.pop();
        }
        If.pop();
        Row.pop();
        Column.pop();
    }
}
