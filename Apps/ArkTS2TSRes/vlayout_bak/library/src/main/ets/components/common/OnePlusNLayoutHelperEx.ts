interface ONEN_EX_LAYOUT_Params {
    vLayoutContent?: (item?: ESObject) => ESObject //布局
    ;
    vLayoutData?: layoutDataType[] | number[] | string[];
    vLayoutAttribute?: AbstractFullFillAttributes;
    onePlusNEXInfo?: AbstractFullFillAttributes;
    colWeightArray?: number[];
    rowWeightArray?: number[];
    layoutHeight?: number | undefined;
    mWeight?: number;
    itemWidth?: number;
    itemHeight?: number;
    itemHeight1?: number;
    itemHeight2?: number;
    itemHeight3?: number;
    itemHeight4?: number;
    itemHeight5?: number;
    itemHeight6?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "OnePlusNLayoutHelperEx_" + ++__generate__Id;
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
const TAG = 'vlayout ONEN_EX_LAYOUT ';
export class ONEN_EX_LAYOUT extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.vLayoutContent = undefined;
        this.vLayoutData = [] //数据源
        ;
        this.__vLayoutAttribute = new ObservedPropertyObject({} //属性
        , this, "vLayoutAttribute");
        this.__onePlusNEXInfo = new ObservedPropertyObject({} //属性
        , this, "onePlusNEXInfo");
        this.__colWeightArray = new ObservedPropertyObject([] //列权重
        , this, "colWeightArray");
        this.__rowWeightArray = new ObservedPropertyObject([] //行权重
        , this, "rowWeightArray");
        this.__layoutHeight = new ObservedPropertyObject(undefined //一拖n布局的高度
        , this, "layoutHeight");
        this.mWeight = 0 //一拖5布局的第二行的权重
        ;
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
        this.itemHeight5 = 0 //第六个item的高度
        ;
        this.itemHeight6 = 0 //第七个item的高度
        ;
        this.updateWithValueParams(params);
        this.declareWatch("vLayoutAttribute", this.defaultValueInit);
    }
    updateWithValueParams(params: ONEN_EX_LAYOUT_Params) {
        if (params.vLayoutContent !== undefined) {
            this.vLayoutContent = params.vLayoutContent;
        }
        if (params.vLayoutData !== undefined) {
            this.vLayoutData = params.vLayoutData;
        }
        if (params.vLayoutAttribute !== undefined) {
            this.vLayoutAttribute = params.vLayoutAttribute;
        }
        if (params.onePlusNEXInfo !== undefined) {
            this.onePlusNEXInfo = params.onePlusNEXInfo;
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
        if (params.mWeight !== undefined) {
            this.mWeight = params.mWeight;
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
        if (params.itemHeight5 !== undefined) {
            this.itemHeight5 = params.itemHeight5;
        }
        if (params.itemHeight6 !== undefined) {
            this.itemHeight6 = params.itemHeight6;
        }
    }
    aboutToBeDeleted() {
        this.__vLayoutAttribute.aboutToBeDeleted();
        this.__onePlusNEXInfo.aboutToBeDeleted();
        this.__colWeightArray.aboutToBeDeleted();
        this.__rowWeightArray.aboutToBeDeleted();
        this.__layoutHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    /*
     * 1 + 4
     * -------------------------
     * |       |       |       |
     * |       |   2   |   3   |
     * |       |       |       |
     * |   1   |-------|-------|
     * |       |       |       |
     * |       |   4   |   5   |
     * |       |       |       |
     * -------------------------
     *
     *  1 + 5
     * -------------------------
     * |           |     2     |
     * |     1     |-----------|
     * |           |     3     |
     * -------------------------
     * |       |       |       |
     * |   4   |   5   |   6   |
     * |       |       |       |
     * -------------------------
     *
     *  1 + 6
     * -------------------------
     * |       |   2   |   3   |
     * |       |-------|-------|
     * |   1   |   4   |   5   |
     * |       |-------|-------|
     * |       |   6   |   7   |
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
    private __onePlusNEXInfo: ObservedPropertyObject<AbstractFullFillAttributes>; //属性
    get onePlusNEXInfo() {
        return this.__onePlusNEXInfo.get();
    }
    set onePlusNEXInfo(newValue: AbstractFullFillAttributes) {
        this.__onePlusNEXInfo.set(newValue);
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
    private mWeight: number; //一拖5布局的第二行的权重
    private itemWidth: number; //每个item的宽度
    private itemHeight: number; //第一个item的高度
    private itemHeight1: number; //第二个item的高度
    private itemHeight2: number; //第三个item的高度
    private itemHeight3: number; //第四个item的高度
    private itemHeight4: number; //第五个item的高度
    private itemHeight5: number; //第六个item的高度
    private itemHeight6: number; //第七个item的高度
    aboutToAppear() {
        this.defaultValueInit();
    }
    defaultValueInit() {
        this.onePlusNEXInfo = {
            range: this.vLayoutAttribute?.range == undefined ? [] : this.vLayoutAttribute.range,
            rowWeights: this.vLayoutAttribute?.rowWeights == undefined || this.vLayoutAttribute.rowWeights.length == 0 ? [] : this.vLayoutAttribute.rowWeights,
            colWeights: this.vLayoutAttribute?.colWeights == undefined || this.vLayoutAttribute.colWeights.length == 0 ? [] : this.vLayoutAttribute.colWeights,
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
        if (this.onePlusNEXInfo.padding?.length == 4) {
            this.onePlusNEXInfo.topPadding = this.onePlusNEXInfo.padding[0];
            this.onePlusNEXInfo.rightPadding = this.onePlusNEXInfo.padding[1];
            this.onePlusNEXInfo.bottomPadding = this.onePlusNEXInfo.padding[2];
            this.onePlusNEXInfo.leftPadding = this.onePlusNEXInfo.padding[3];
        }
        if (this.onePlusNEXInfo.margin?.length == 4) {
            this.onePlusNEXInfo.topMargin = this.onePlusNEXInfo.margin[0];
            this.onePlusNEXInfo.rightMargin = this.onePlusNEXInfo.margin[1];
            this.onePlusNEXInfo.bottomMargin = this.onePlusNEXInfo.margin[2];
            this.onePlusNEXInfo.leftMargin = this.onePlusNEXInfo.margin[3];
        }
        this.computedRange();
        this.computedColWeights();
        this.computedRowWeights();
    }
    computedRange() {
        //可显示的条目range数组长度为2并且数组元素内第一项大于等于0并且第二项大于第一项
        if (this.onePlusNEXInfo.range?.length == 2 && this.onePlusNEXInfo.range[0] >= 0 && this.onePlusNEXInfo.range[1] > this.onePlusNEXInfo.range[0]) {
            this.vLayoutData = this.vLayoutData.splice(this.onePlusNEXInfo.range[0], this.onePlusNEXInfo.range[1]);
        }
        else {
            this.vLayoutData = this.vLayoutData;
        }
        console.info(TAG + 'vLayoutData = ' + JSON.stringify(this.vLayoutData));
    }
    computedColWeights() {
        if (this.onePlusNEXInfo.colWeights) {
            this.colWeightArray = this.onePlusNEXInfo.colWeights;
            if (this.vLayoutData.length > this.onePlusNEXInfo.colWeights.length) { //数据源数组长度大于列权重数组长度时
                if (this.onePlusNEXInfo.colWeights.length == 1) {
                    let sum = 0;
                    for (let i = 0; i < this.onePlusNEXInfo.colWeights.length; i++) {
                        let element = this.onePlusNEXInfo.colWeights[i];
                        sum += element;
                    }
                    if (this.vLayoutData.length == 5) {
                        if (sum < 100) {
                            for (let j = 0; j < 4; j++) {
                                this.colWeightArray.push((100 - sum) / 2);
                            }
                        }
                    }
                    if (this.vLayoutData.length == 6) {
                        if (sum < 100) {
                            for (let j = 0; j < 2; j++) {
                                this.colWeightArray.push((100 - sum));
                            }
                            this.mWeight = 1;
                        }
                    }
                    if (this.vLayoutData.length == 7) {
                        if (sum < 100) {
                            for (let j = 0; j < 6; j++) {
                                this.colWeightArray.push((100 - sum) / 2);
                            }
                        }
                    }
                }
                else if (this.onePlusNEXInfo.colWeights.length == 2) {
                    if (this.vLayoutData.length == 5) {
                        this.colWeightArray.push((100 - this.colWeightArray[0] - this.colWeightArray[1]));
                        for (let j = 0; j < 2; j++) {
                            this.colWeightArray.push((100 - this.colWeightArray[0]) / 2);
                        }
                    }
                    if (this.vLayoutData.length == 6) {
                        this.colWeightArray.push((100 - this.colWeightArray[0]));
                        this.mWeight = 1;
                    }
                    if (this.vLayoutData.length == 7) {
                        this.colWeightArray.push((100 - this.colWeightArray[0] - this.colWeightArray[1]));
                        for (let j = 0; j < 4; j++) {
                            this.colWeightArray.push((100 - this.colWeightArray[0]) / 2);
                        }
                    }
                }
                else if (this.onePlusNEXInfo.colWeights.length == 3) {
                    if (this.vLayoutData.length == 5) {
                        for (let j = 0; j < 2; j++) {
                            this.colWeightArray.push((100 - this.colWeightArray[0]) / 2);
                        }
                    }
                    if (this.vLayoutData.length == 6) {
                        this.mWeight = 1;
                    }
                    if (this.vLayoutData.length == 7) {
                        for (let j = 0; j < 4; j++) {
                            this.colWeightArray.push((100 - this.colWeightArray[0]) / 2);
                        }
                    }
                }
                else if (this.onePlusNEXInfo.colWeights.length == 4) {
                    if (this.vLayoutData.length == 5) {
                        this.colWeightArray.push((100 - this.colWeightArray[0] - this.colWeightArray[3]));
                    }
                    if (this.vLayoutData.length == 6) {
                        for (let j = 0; j < 2; j++) {
                            this.colWeightArray.push((100 - this.colWeightArray[3]) / 2);
                        }
                    }
                    if (this.vLayoutData.length == 7) {
                        this.colWeightArray.push((100 - this.colWeightArray[0] - this.colWeightArray[3]));
                        for (let j = 0; j < 2; j++) {
                            this.colWeightArray.push((100 - this.colWeightArray[0]) / 2);
                        }
                    }
                }
                else if (this.onePlusNEXInfo.colWeights.length == 5) {
                    if (this.vLayoutData.length == 6) {
                        this.colWeightArray.push((100 - this.colWeightArray[3] - this.colWeightArray[4]));
                    }
                    if (this.vLayoutData.length == 7) {
                        for (let j = 0; j < 2; j++) {
                            this.colWeightArray.push((100 - this.colWeightArray[0]) / 2);
                        }
                    }
                }
                else if (this.onePlusNEXInfo.colWeights.length == 6) {
                    if (this.vLayoutData.length == 7) {
                        this.colWeightArray.push((100 - this.colWeightArray[0] - this.colWeightArray[5]));
                    }
                }
                else {
                    console.error(TAG + 'computedColWeights else');
                }
                console.error(TAG + '> colWeightArray = ' + JSON.stringify(this.colWeightArray));
            }
            else { //数据源数组长度小于等于列权重数组长度时
                console.error(TAG + '<= colWeightArray = ' + JSON.stringify(this.colWeightArray));
            }
        }
    }
    computedRowWeights() {
        if (this.onePlusNEXInfo.rowWeights) {
            this.rowWeightArray = this.onePlusNEXInfo.rowWeights;
            if (this.onePlusNEXInfo.rowWeights.length == 1) {
                if (this.vLayoutData.length == 5 || this.vLayoutData.length == 6) {
                    this.rowWeightArray.push(this.onePlusNEXInfo.rowWeights[0]);
                }
                if (this.vLayoutData.length == 7) {
                    for (let i = 0; i < 2; i++) {
                        this.rowWeightArray.push(this.onePlusNEXInfo.rowWeights[0]);
                    }
                }
            }
            else if (this.onePlusNEXInfo.rowWeights.length == 2) {
                if (this.vLayoutData.length == 7) {
                    this.rowWeightArray.push(this.onePlusNEXInfo.rowWeights[0]);
                }
            }
            else {
                console.error(TAG + 'computedRowWeights else');
            }
            console.error(TAG + 'rowWeightArray = ' + JSON.stringify(this.rowWeightArray));
        }
    }
    computedSize() {
        //当容器宽度定义了，无法同时给左右外边距
        //当容器纵横比定义了就相当于容器宽度定义了
        if (this.onePlusNEXInfo.layoutWidth == undefined && this.onePlusNEXInfo.layoutHeight == undefined && this.onePlusNEXInfo.aspectRatio == undefined) {
            //当不设置容器宽度、高度、纵横比时，子项请勿提供百分比的高度，请提供数值的高度；
            this.onePlusNEXInfo.layoutWidth = undefined;
            this.onePlusNEXInfo.layoutHeight = undefined;
            this.onePlusNEXInfo.aspectRatio = undefined;
            this.computedLayoutHeight();
        }
        else if (this.onePlusNEXInfo.layoutWidth != undefined && this.onePlusNEXInfo.layoutHeight == undefined && this.onePlusNEXInfo.aspectRatio == undefined) {
            //当设置容器宽度，不设置高度、纵横比时，子项请勿提供百分比的高度，请提供数值的高度；
            this.onePlusNEXInfo.layoutWidth = this.onePlusNEXInfo.layoutWidth;
            this.onePlusNEXInfo.layoutHeight = undefined;
            this.onePlusNEXInfo.aspectRatio = undefined;
            this.computedLayoutHeight();
        }
        else if (this.onePlusNEXInfo.layoutWidth == undefined && this.onePlusNEXInfo.layoutHeight != undefined && this.onePlusNEXInfo.aspectRatio == undefined) {
            this.onePlusNEXInfo.layoutWidth = undefined;
            this.onePlusNEXInfo.layoutHeight = this.onePlusNEXInfo.layoutHeight;
            this.onePlusNEXInfo.aspectRatio = undefined;
        }
        else if (this.onePlusNEXInfo.layoutWidth == undefined && this.onePlusNEXInfo.layoutHeight == undefined && this.onePlusNEXInfo.aspectRatio != undefined) {
            //当不设置容器宽度、高度但设置纵横比时，子项不建议提供百分百的高度，建议提供数值的高度；
            this.onePlusNEXInfo.layoutWidth = undefined;
            this.onePlusNEXInfo.layoutHeight = undefined;
            this.onePlusNEXInfo.aspectRatio = this.onePlusNEXInfo.aspectRatio;
            this.computedLayoutHeight();
        }
        else if (this.onePlusNEXInfo.layoutWidth != undefined && this.onePlusNEXInfo.layoutHeight != undefined && this.onePlusNEXInfo.aspectRatio != undefined) {
            //当设置了容器宽度、高度、纵横比时，子项不建议提供数值的高度，建议提供百分百的高度；
            this.onePlusNEXInfo.layoutWidth = this.onePlusNEXInfo.layoutWidth;
            this.onePlusNEXInfo.layoutHeight = this.onePlusNEXInfo.layoutHeight; //此时提供的高度无效
            this.onePlusNEXInfo.aspectRatio = this.onePlusNEXInfo.aspectRatio;
        }
        else if (this.onePlusNEXInfo.layoutWidth != undefined && this.onePlusNEXInfo.layoutHeight != undefined && this.onePlusNEXInfo.aspectRatio == undefined) {
            //当设置了容器宽度、高度但不设置纵横比时，子项不建议提供数值的高度，建议提供百分百的高度；
            this.onePlusNEXInfo.layoutWidth = this.onePlusNEXInfo.layoutWidth;
            this.onePlusNEXInfo.layoutHeight = this.onePlusNEXInfo.layoutHeight;
            this.onePlusNEXInfo.aspectRatio = undefined;
        }
        else if (this.onePlusNEXInfo.layoutWidth != undefined && this.onePlusNEXInfo.layoutHeight == undefined && this.onePlusNEXInfo.aspectRatio != undefined) {
            //当设置了容器宽度、纵横比但不设置高度时，子项不建议提供百分百的高度，建议提供数值的高度；
            this.onePlusNEXInfo.layoutWidth = this.onePlusNEXInfo.layoutWidth;
            this.onePlusNEXInfo.layoutHeight = undefined;
            this.onePlusNEXInfo.aspectRatio = this.onePlusNEXInfo.aspectRatio;
            this.computedLayoutHeight();
        }
        else if (this.onePlusNEXInfo.layoutWidth == undefined && this.onePlusNEXInfo.layoutHeight != undefined && this.onePlusNEXInfo.aspectRatio != undefined) {
            //当设置了容器高度、纵横比但不设置宽度时，子项不建议提供数值的高度，建议提供百分百的高度；
            this.onePlusNEXInfo.layoutWidth = undefined;
            this.onePlusNEXInfo.layoutHeight = this.onePlusNEXInfo.layoutHeight;
            this.onePlusNEXInfo.aspectRatio = this.onePlusNEXInfo.aspectRatio;
        }
        else {
            console.error(TAG + 'computedSize else');
        }
    }
    computedLayoutHeight() {
        if (this.vLayoutData.length == 5) {
            if (Math.max(this.itemHeight1 + this.itemHeight3, this.itemHeight2 + this.itemHeight4) >= this.itemHeight) {
                this.layoutHeight = Math.max(this.itemHeight1 + this.itemHeight3, this.itemHeight2 + this.itemHeight4);
            }
            else {
                this.layoutHeight = this.itemHeight;
            }
        }
        else if (this.vLayoutData.length == 6) {
            if (this.itemHeight1 + this.itemHeight2 >= this.itemHeight) {
                this.layoutHeight = Math.max(this.itemHeight3, this.itemHeight4, this.itemHeight5) + this.itemHeight1 + this.itemHeight2;
            }
            else {
                this.layoutHeight = Math.max(this.itemHeight3, this.itemHeight4, this.itemHeight5) + this.itemHeight;
            }
        }
        else if (this.vLayoutData.length == 7) {
            if (Math.max(this.itemHeight1 + this.itemHeight3 + this.itemHeight5, this.itemHeight2 + this.itemHeight4 + this.itemHeight6) >= this.itemHeight) {
                this.layoutHeight = Math.max(this.itemHeight1 + this.itemHeight3 + this.itemHeight5, this.itemHeight2 + this.itemHeight4 + this.itemHeight6);
            }
            else {
                this.layoutHeight = this.itemHeight;
            }
        }
        else {
            console.error(TAG + 'computedLayoutHeight else');
        }
        this.computedExtraHeight();
    }
    computedExtraHeight() {
        if (this.onePlusNEXInfo.topPadding && this.layoutHeight) {
            if (this.onePlusNEXInfo.topPadding >= 0 && typeof (this.onePlusNEXInfo.topPadding) == 'number') {
                this.layoutHeight = this.layoutHeight + this.onePlusNEXInfo.topPadding;
            }
            else if (typeof (this.onePlusNEXInfo.topPadding) == 'string' && this.onePlusNEXInfo.topPadding != '' && this.onePlusNEXInfo.topPadding.includes('%')) {
                let topPadding = Number(this.onePlusNEXInfo.topPadding.substring(0, this.onePlusNEXInfo.topPadding.indexOf('%'))) * 0.01 * this.layoutHeight;
                this.layoutHeight = this.layoutHeight + topPadding;
            }
            else {
                console.error(TAG + 'something else topPadding');
            }
        }
        if (this.onePlusNEXInfo.bottomPadding && this.layoutHeight) {
            if (this.onePlusNEXInfo.bottomPadding >= 0 && typeof (this.onePlusNEXInfo.bottomPadding) == 'number') {
                this.layoutHeight = this.layoutHeight + this.onePlusNEXInfo.bottomPadding;
            }
            else if (typeof (this.onePlusNEXInfo.bottomPadding) == 'string' && this.onePlusNEXInfo.bottomPadding != '' && this.onePlusNEXInfo.bottomPadding.includes('%')) {
                let bottomPadding = Number(this.onePlusNEXInfo.bottomPadding.substring(0, this.onePlusNEXInfo.bottomPadding.indexOf('%'))) * 0.01 * this.layoutHeight;
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
        Column.backgroundColor(this.onePlusNEXInfo.bgColor);
        Column.zIndex(this.onePlusNEXInfo.zIndex);
        Column.margin({
            top: this.onePlusNEXInfo.topMargin,
            right: this.onePlusNEXInfo.rightMargin,
            bottom: this.onePlusNEXInfo.bottomMargin,
            left: this.onePlusNEXInfo.leftMargin
        });
        Row.create();
        Row.width(this.onePlusNEXInfo.layoutWidth);
        Row.height(this.onePlusNEXInfo.layoutHeight == undefined ? this.layoutHeight : this.onePlusNEXInfo.layoutHeight);
        Row.aspectRatio(this.onePlusNEXInfo.aspectRatio);
        Row.padding({
            top: this.vLayoutAttribute?.topPadding,
            right: this.vLayoutAttribute?.rightPadding,
            bottom: this.vLayoutAttribute?.bottomPadding,
            left: this.vLayoutAttribute?.leftPadding
        });
        If.create();
        if (this.vLayoutData.length == 5) {
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
            Column.width(this.colWeightArray.length == 0 ? '34%' : this.toPercent(this.colWeightArray[0]));
            this.vLayoutContent(this.vLayoutData[0], this);
            Column.pop();
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.width(this.colWeightArray.length == 0 ? '66%' : '100%');
            Row.create();
            Row.layoutWeight(this.onePlusNEXInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[0]));
            Row.create();
            Row.onAreaChange((oldValue, newValue) => {
                this.itemWidth = (Number(newValue.width));
                this.itemHeight1 = (Number(newValue.height));
                console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight1 = ' + this.itemHeight1);
                this.computedSize();
            });
            Row.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[1]));
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
            this.vLayoutContent(this.vLayoutData[2], this);
            Row.pop();
            Row.pop();
            Row.create();
            Row.layoutWeight(this.onePlusNEXInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[1]));
            Row.create();
            Row.onAreaChange((oldValue, newValue) => {
                this.itemWidth = (Number(newValue.width));
                this.itemHeight3 = (Number(newValue.height));
                console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight3 = ' + this.itemHeight3);
                this.computedSize();
            });
            Row.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[3]));
            this.vLayoutContent(this.vLayoutData[3], this);
            Row.pop();
            Row.create();
            Row.onAreaChange((oldValue, newValue) => {
                this.itemWidth = (Number(newValue.width));
                this.itemHeight4 = (Number(newValue.height));
                console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight4 = ' + this.itemHeight4);
                this.computedSize();
            });
            Row.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[4]));
            this.vLayoutContent(this.vLayoutData[4], this);
            Row.pop();
            Row.pop();
            Column.pop();
            Row.pop();
        }
        else if (this.vLayoutData.length == 6) {
            If.branchId(1);
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Row.create();
            Row.layoutWeight(this.onePlusNEXInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[0]));
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
            Row.layoutWeight(this.onePlusNEXInfo.layoutHeight == undefined ? undefined : 1);
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
            Row.layoutWeight(this.onePlusNEXInfo.layoutHeight == undefined ? undefined : 1);
            this.vLayoutContent(this.vLayoutData[2], this);
            Row.pop();
            Column.pop();
            Row.pop();
            Row.create();
            Row.layoutWeight(this.onePlusNEXInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[1]));
            Column.create();
            Column.onAreaChange((oldValue, newValue) => {
                this.itemWidth = (Number(newValue.width));
                this.itemHeight3 = (Number(newValue.height));
                console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight3 = ' + this.itemHeight3);
                this.computedSize();
            });
            Column.width(this.colWeightArray.length == 0 ? '33%' : this.toPercent(this.colWeightArray[3]));
            Column.layoutWeight(this.onePlusNEXInfo.layoutHeight == undefined ? undefined : (this.colWeightArray.length == 0 ? 1 : this.mWeight));
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
            Column.layoutWeight(this.onePlusNEXInfo.layoutHeight == undefined ? undefined : (this.colWeightArray.length == 0 ? 1 : this.mWeight));
            this.vLayoutContent(this.vLayoutData[4], this);
            Column.pop();
            Column.create();
            Column.onAreaChange((oldValue, newValue) => {
                this.itemWidth = (Number(newValue.width));
                this.itemHeight5 = (Number(newValue.height));
                console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight5 = ' + this.itemHeight5);
                this.computedSize();
            });
            Column.width(this.colWeightArray.length == 0 ? '33%' : this.toPercent(this.colWeightArray[5]));
            Column.layoutWeight(this.onePlusNEXInfo.layoutHeight == undefined ? undefined : (this.colWeightArray.length == 0 ? 1 : this.mWeight));
            this.vLayoutContent(this.vLayoutData[5], this);
            Column.pop();
            Row.pop();
            Column.pop();
        }
        else if (this.vLayoutData.length == 7) {
            If.branchId(2);
            Row.create();
            Column.create();
            Column.onAreaChange((oldValue, newValue) => {
                this.itemWidth = (Number(newValue.width));
                this.itemHeight = (Number(newValue.height));
                console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight = ' + this.itemHeight);
                this.computedSize();
            });
            Column.alignItems(HorizontalAlign.Start);
            Column.width(this.colWeightArray.length == 0 ? '34%' : this.toPercent(this.colWeightArray[0]));
            this.vLayoutContent(this.vLayoutData[0], this);
            Column.pop();
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.width(this.colWeightArray.length == 0 ? '66%' : '100%');
            Row.create();
            Row.layoutWeight(this.onePlusNEXInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[0]));
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
            Row.layoutWeight(this.onePlusNEXInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[1]));
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
            Column.create();
            Column.onAreaChange((oldValue, newValue) => {
                this.itemWidth = (Number(newValue.width));
                this.itemHeight4 = (Number(newValue.height));
                console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight4 = ' + this.itemHeight4);
                this.computedSize();
            });
            Column.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[4]));
            this.vLayoutContent(this.vLayoutData[4], this);
            Column.pop();
            Row.pop();
            Row.create();
            Row.layoutWeight(this.onePlusNEXInfo.layoutHeight == undefined ? undefined : (this.rowWeightArray.length == 0 ? 1 : this.rowWeightArray[2]));
            Column.create();
            Column.onAreaChange((oldValue, newValue) => {
                this.itemWidth = (Number(newValue.width));
                this.itemHeight5 = (Number(newValue.height));
                console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight5 = ' + this.itemHeight5);
                this.computedSize();
            });
            Column.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[5]));
            this.vLayoutContent(this.vLayoutData[5], this);
            Column.pop();
            Column.create();
            Column.onAreaChange((oldValue, newValue) => {
                this.itemWidth = (Number(newValue.width));
                this.itemHeight6 = (Number(newValue.height));
                console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight6 = ' + this.itemHeight6);
                this.computedSize();
            });
            Column.width(this.colWeightArray.length == 0 ? '50%' : this.toPercent(this.colWeightArray[6]));
            this.vLayoutContent(this.vLayoutData[6], this);
            Column.pop();
            Row.pop();
            Column.pop();
            Row.pop();
        }
        else {
            If.branchId(3);
            Text.create('please more than 1+3 and less than 1+7');
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
