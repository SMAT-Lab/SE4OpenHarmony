interface RANGEGRID_LAYOUT_Params {
    vLayoutContent?: (item?: ESObject, position?: number, gridItemHeight?: number) => ESObject //布局
    ;
    vLayoutData?: layoutDataType[] | number[] | string[];
    vLayoutAttribute?: GridAttributes;
    gridInfo?: GridAttributes;
    columnsTemplate?: string;
    rowsTemplate?: string;
    oneRowHeight?: number | undefined;
    layoutHeight?: number | undefined;
    rightPadding?: number | undefined;
    gridWidth?: number;
    gridHeight?: number;
    gridItemWidth?: number;
    gridItemHeight?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "RangeGridLayoutHelper_" + ++__generate__Id;
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
import { GridAttributes, layoutDataType } from '../core/VLayoutAttributes';
const TAG = 'vlayout RANGEGRID_LAYOUT ';
export class RANGEGRID_LAYOUT extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.vLayoutContent = undefined;
        this.vLayoutData = [] //数据源
        ;
        this.__vLayoutAttribute = new ObservedPropertyObject({} //属性
        , this, "vLayoutAttribute");
        this.__gridInfo = new ObservedPropertyObject({} //属性
        , this, "gridInfo");
        this.columnsTemplate = '' //列
        ;
        this.rowsTemplate = '' //行
        ;
        this.__oneRowHeight = new ObservedPropertyObject(undefined //单行高度
        , this, "oneRowHeight");
        this.__layoutHeight = new ObservedPropertyObject(undefined //grid高度
        , this, "layoutHeight");
        this.__rightPadding = new ObservedPropertyObject(undefined //右内边距
        , this, "rightPadding");
        this.gridWidth = 0 //获取的grid高度
        ;
        this.gridHeight = 0 //获取的grid高度
        ;
        this.gridItemWidth = 0 //获取的gridItem宽度
        ;
        this.gridItemHeight = 0 //获取的gridItem高度
        ;
        this.updateWithValueParams(params);
        this.declareWatch("vLayoutAttribute", this.defaultValueInit);
    }
    updateWithValueParams(params: RANGEGRID_LAYOUT_Params) {
        if (params.vLayoutContent !== undefined) {
            this.vLayoutContent = params.vLayoutContent;
        }
        if (params.vLayoutData !== undefined) {
            this.vLayoutData = params.vLayoutData;
        }
        if (params.vLayoutAttribute !== undefined) {
            this.vLayoutAttribute = params.vLayoutAttribute;
        }
        if (params.gridInfo !== undefined) {
            this.gridInfo = params.gridInfo;
        }
        if (params.columnsTemplate !== undefined) {
            this.columnsTemplate = params.columnsTemplate;
        }
        if (params.rowsTemplate !== undefined) {
            this.rowsTemplate = params.rowsTemplate;
        }
        if (params.oneRowHeight !== undefined) {
            this.oneRowHeight = params.oneRowHeight;
        }
        if (params.layoutHeight !== undefined) {
            this.layoutHeight = params.layoutHeight;
        }
        if (params.rightPadding !== undefined) {
            this.rightPadding = params.rightPadding;
        }
        if (params.gridWidth !== undefined) {
            this.gridWidth = params.gridWidth;
        }
        if (params.gridHeight !== undefined) {
            this.gridHeight = params.gridHeight;
        }
        if (params.gridItemWidth !== undefined) {
            this.gridItemWidth = params.gridItemWidth;
        }
        if (params.gridItemHeight !== undefined) {
            this.gridItemHeight = params.gridItemHeight;
        }
    }
    aboutToBeDeleted() {
        this.__vLayoutAttribute.aboutToBeDeleted();
        this.__gridInfo.aboutToBeDeleted();
        this.__oneRowHeight.aboutToBeDeleted();
        this.__layoutHeight.aboutToBeDeleted();
        this.__rightPadding.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __vLayoutContent; //布局
    private vLayoutData: layoutDataType[] | number[] | string[]; //数据源
    private __vLayoutAttribute?: ObservedPropertyObject<GridAttributes>; //属性
    get vLayoutAttribute() {
        return this.__vLayoutAttribute.get();
    }
    set vLayoutAttribute(newValue: GridAttributes) {
        this.__vLayoutAttribute.set(newValue);
    }
    private __gridInfo: ObservedPropertyObject<GridAttributes>; //属性
    get gridInfo() {
        return this.__gridInfo.get();
    }
    set gridInfo(newValue: GridAttributes) {
        this.__gridInfo.set(newValue);
    }
    private columnsTemplate: string; //列
    private rowsTemplate: string; //行
    private __oneRowHeight: ObservedPropertyObject<number | undefined>; //单行高度
    get oneRowHeight() {
        return this.__oneRowHeight.get();
    }
    set oneRowHeight(newValue: number | undefined) {
        this.__oneRowHeight.set(newValue);
    }
    private __layoutHeight: ObservedPropertyObject<number | undefined>; //grid高度
    get layoutHeight() {
        return this.__layoutHeight.get();
    }
    set layoutHeight(newValue: number | undefined) {
        this.__layoutHeight.set(newValue);
    }
    private __rightPadding: ObservedPropertyObject<number | undefined>; //右内边距
    get rightPadding() {
        return this.__rightPadding.get();
    }
    set rightPadding(newValue: number | undefined) {
        this.__rightPadding.set(newValue);
    }
    private gridWidth: number; //获取的grid高度
    private gridHeight: number; //获取的grid高度
    private gridItemWidth: number; //获取的gridItem宽度
    private gridItemHeight: number; //获取的gridItem高度
    aboutToAppear() {
        this.defaultValueInit();
    }
    defaultValueInit() {
        this.gridInfo = {
            range: this.vLayoutAttribute?.range == undefined ? [] : this.vLayoutAttribute.range,
            spanCount: this.vLayoutAttribute?.spanCount,
            weights: this.vLayoutAttribute?.weights,
            autoExpand: this.vLayoutAttribute?.autoExpand == undefined ? true : this.vLayoutAttribute.autoExpand,
            aspectRatio: this.vLayoutAttribute?.aspectRatio == undefined ? 0 : this.vLayoutAttribute.aspectRatio,
            layoutHeight: this.vLayoutAttribute?.layoutHeight,
            bgColor: this.vLayoutAttribute?.bgColor == undefined ? 'rgba(0,0,0,0)' : this.vLayoutAttribute.bgColor,
            zIndex: this.vLayoutAttribute?.zIndex == undefined ? 0 : this.vLayoutAttribute.zIndex,
            gap: this.vLayoutAttribute?.gap == undefined ? 0 : this.vLayoutAttribute.gap,
            vGap: this.vLayoutAttribute?.vGap == undefined ? 0 : this.vLayoutAttribute.vGap,
            hGap: this.vLayoutAttribute?.hGap == undefined ? 0 : this.vLayoutAttribute.hGap,
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
        if (this.gridInfo.gap && this.gridInfo.gap > 0) {
            this.gridInfo.vGap = this.gridInfo.gap;
            this.gridInfo.hGap = this.gridInfo.gap;
        }
        if (this.gridInfo.padding?.length == 4) {
            this.gridInfo.topPadding = this.gridInfo.padding[0];
            this.gridInfo.rightPadding = this.gridInfo.padding[1];
            this.gridInfo.bottomPadding = this.gridInfo.padding[2];
            this.gridInfo.leftPadding = this.gridInfo.padding[3];
        }
        if (this.gridInfo.margin?.length == 4) {
            this.gridInfo.topMargin = this.gridInfo.margin[0];
            this.gridInfo.rightMargin = this.gridInfo.margin[1];
            this.gridInfo.bottomMargin = this.gridInfo.margin[2];
            this.gridInfo.leftMargin = this.gridInfo.margin[3];
        }
        this.computedSpanCountAndWeights();
        this.computedRange();
        this.computedColumnsTemplate();
        this.computedRowsTemplate();
        this.computedHeight();
    }
    computedSpanCountAndWeights() {
        if (this.gridInfo.spanCount == undefined && this.gridInfo.weights == undefined) { //列数和列占比集合同时未定义时
            this.gridInfo.spanCount = 4;
            this.gridInfo.weights = [25, 25, 25, 25];
        }
        else if (this.gridInfo.spanCount == undefined && this.gridInfo.weights != undefined) { //列占比集合定义了但列数未定义时
            this.gridInfo.spanCount = this.gridInfo.weights.length;
        }
        else {
            this.gridInfo.spanCount = this.gridInfo.spanCount;
        }
    }
    computedRange() {
        //可显示的条目range数组长度为2并且数组元素内第一项大于等于0并且第二项大于第一项
        if (this.gridInfo.range?.length == 2 && this.gridInfo.range[0] >= 0 && this.gridInfo.range[1] > this.gridInfo.range[0]) {
            this.vLayoutData = this.vLayoutData.splice(this.gridInfo.range[0], this.gridInfo.range[1]);
        }
        else {
            this.vLayoutData = this.vLayoutData;
        }
        console.info(TAG + 'vLayoutData = ' + JSON.stringify(this.vLayoutData));
    }
    computedColumnsTemplate() {
        let rightPadding: number = 0;
        let element: number = 0;
        let cols: string[] = [];
        if (this.gridInfo.spanCount) {
            if (this.gridInfo.weights !== undefined) { //当weights定义了，autoExpand失效
                if (this.gridInfo.weights.length == this.gridInfo.spanCount) { //当weights数组长度等于列数时，若数组内元素之和小于100，右侧则空出剩余部分，否则不进行空出
                    for (let i = 0; i < this.gridInfo.weights.length; i++) {
                        cols.push(Math.round(this.gridInfo.weights[i]) + 'fr');
                        element += this.gridInfo.weights[i];
                    }
                    if (element < 100) {
                        rightPadding = (100 - element) * 0.01 * this.gridWidth; //右边空出剩余部分
                    }
                    else {
                        rightPadding = 0;
                    }
                    this.computedRightPadding(rightPadding);
                    this.columnsTemplate = cols.join(' ');
                }
                else if (this.gridInfo.weights.length < this.gridInfo.spanCount) { //当weights数组长度小于列数时，若数组内元素之和小于100，则自动填充剩余占比
                    for (let i = 0; i < this.gridInfo.weights.length; i++) {
                        cols.push(this.gridInfo.weights[i] + 'fr');
                        element += this.gridInfo.weights[i];
                    }
                    if (element < 100) {
                        for (let j = 0; j < this.gridInfo.spanCount - this.gridInfo.weights.length; j++) {
                            cols.push((100 - element) / (this.gridInfo.spanCount - this.gridInfo.weights.length) + 'fr'); //自动填充剩余占比
                        }
                        this.computedRightPadding(rightPadding);
                        this.columnsTemplate = cols.join(' ');
                    }
                    else {
                        this.computedRightPadding(rightPadding);
                        this.columnsTemplate = cols.join(' ');
                    }
                }
                else { //当weights数组长度大于列数时，若数组内前三项元素之和小于100，则进行空出
                    for (let i = 0; i < this.gridInfo.spanCount; i++) {
                        cols.push(this.gridInfo.weights[i] + 'fr');
                        element += this.gridInfo.weights[i];
                    }
                    if (element < 100) {
                        rightPadding = (100 - element) * 0.01 * this.gridWidth; //右边空出剩余部分
                    }
                    else {
                        rightPadding = 0;
                    }
                    this.computedRightPadding(rightPadding);
                    this.columnsTemplate = cols.join(' ');
                }
            }
            else { //当weight未定义时，autoExpand才有效
                for (let i = 0; i < this.gridInfo.spanCount; i++) {
                    element = 100 / this.gridInfo.spanCount;
                    cols.push(element + 'fr');
                }
                this.computedRightPadding(rightPadding);
                this.columnsTemplate = cols.join(' ');
                //autoExpand为true时，余子项宽度自适配
                if (this.gridInfo.autoExpand) {
                    let mod = this.vLayoutData.length % cols.length; //余子项数
                    if (mod == 0) {
                        this.computedRightPadding(rightPadding);
                        this.columnsTemplate = cols.join(' ');
                    }
                    else {
                        let newCols: string[] = [];
                        let temp: number = this.gridInfo.spanCount * mod; //列数和余子项数的公倍数
                        for (let i = 0; i < temp; i++) {
                            newCols.push(Math.trunc(100 / temp) + 'fr');
                        }
                        for (let j = 0; j < this.vLayoutData.length - mod; j++) {
                            this.vLayoutData[j] = new vLayoutDataType(`${(this.vLayoutData[j] as layoutDataType).layoutText}`, 1, mod);
                        }
                        for (let k = this.vLayoutData.length - mod; k < this.vLayoutData.length; k++) {
                            this.vLayoutData[k] = new vLayoutDataType(`${(this.vLayoutData[k] as layoutDataType).layoutText}`, 1, temp / mod);
                        }
                        this.computedRightPadding(rightPadding);
                        this.columnsTemplate = newCols.join(' ');
                    }
                    let count: number = Math.ceil(this.vLayoutData.length / this.gridInfo.spanCount);
                    let rows: string[] = [];
                    rows.push('1fr '.repeat(count));
                    this.rowsTemplate = rows.join(' ');
                }
                else {
                    console.error(TAG + 'autoExpand false');
                }
            }
        }
    }
    computedRightPadding(rightPadding: number) {
        let temp: number = 0;
        if (typeof (this.gridInfo.rightPadding) == 'string' && this.gridInfo.rightPadding != '' && this.gridInfo.rightPadding.includes('%')) { //右内边距为非空字符串并且含有%时，转换成数值进行计算
            temp = Number(this.gridInfo.rightPadding.substring(0, this.gridInfo.rightPadding.indexOf('%'))) * 0.01 * this.gridWidth;
        }
        else {
            temp = Number(this.gridInfo.rightPadding);
        }
        this.rightPadding = temp + rightPadding;
    }
    computedRowsTemplate() {
        let lines: number[] = [0];
        if (this.gridInfo.spanCount) {
            let columnCount: number = this.gridInfo.spanCount;
            for (let item of this.vLayoutData) {
                let colsSpan: number = Math.min(Math.max((item as layoutDataType).colsSpan ?? 1, 1), columnCount);
                (item as layoutDataType).colsSpan = colsSpan;
                if (lines[lines.length - 1] + colsSpan > columnCount) {
                    lines.push(colsSpan);
                }
                else {
                    lines[lines.length - 1] += colsSpan;
                }
            }
        }
        let rows: string[] = [];
        rows.push('1fr '.repeat(lines.length)); //行数为1:1
        this.rowsTemplate = rows.join(' ');
    }
    /*
     * 1.当layoutHeight未定义并且aspectRatio等于0或未定义时，宫格不进行内部滑动，高度自适应，即grid总高度等于使用者给定的组件高度*行数，其中使用者给不给定提供的组件高度都行，额外影响因素有vGap、topPadding、bottomPadding；
     * 2.当layoutHeight未定义并且aspectRatio大于0时，请不要再提供组件高度，vlayout建议使用者在提供的组件的高度处使用GRID_LAYOUT传递回来的高度，额外影响因素有vGap、topPadding、bottomPadding；
     * 3.当layoutHeight定义了并且aspectRatio大于0时，请不要再提供组件高度，vlayout建议使用者在提供的组件的高度处使用GRID_LAYOUT传递回来的高度，grid总高度等于给定的高度，若需要宫格可以进行内部滑动，那么使用者提供的组件高度的总和必须大于layoutHeight；
     * 4.当layoutHeight定义了并且aspectRatio等于0时，grid总高度等于给定的高度，若需要宫格可以进行内部滑动，那么使用者提供的组件高度的总和必须大于layoutHeight；
     * vlayout原库：当单行纵横比>0时，使用者传递的组件的高度无效；
     * 异常情况：同时提供aspectRatio以及使用者提供的组件高度的情况下，会出现布局异常；
     * 滑动冲突问题：grid无rowsTemplate属性时表示grid可以进行内部滑动，但嵌套在list里时，一旦list能开始滑动之后grid的内部滑动就失效了；
     */
    computedHeight() {
        let rowCount: number = this.rowsTemplate.length / 4;
        if (this.gridInfo.aspectRatio) {
            if (this.gridInfo.layoutHeight == undefined && this.gridInfo.aspectRatio == 0) {
                this.layoutHeight = this.gridItemHeight * rowCount;
                this.computedExtraHeight(rowCount);
                console.log(TAG + 'the first case layoutHeight = ' + this.layoutHeight);
            }
            else if (this.gridInfo.layoutHeight == undefined && this.gridInfo.aspectRatio > 0) {
                this.oneRowHeight = this.gridWidth / this.gridInfo.aspectRatio;
                this.layoutHeight = this.oneRowHeight * rowCount;
                this.computedExtraHeight(rowCount);
                console.log(TAG + 'the second case oneRowHeight = ' + this.oneRowHeight + ', layoutHeight = ' + this.layoutHeight);
            }
            else if (this.gridInfo.layoutHeight != undefined && this.gridInfo.aspectRatio > 0) {
                this.oneRowHeight = this.gridWidth / this.gridInfo.aspectRatio;
                console.log(TAG + 'the third case oneRowHeight = ' + this.oneRowHeight + ', layoutHeight = ' + this.gridInfo.layoutHeight);
            }
            else if (this.gridInfo.layoutHeight != undefined && this.gridInfo.aspectRatio == 0) {
                this.gridInfo.layoutHeight = this.gridInfo.layoutHeight;
                console.log(TAG + 'the fourth case layoutHeight = ' + this.gridInfo.layoutHeight);
            }
            else {
                console.error(TAG + 'something else computedHeight');
            }
        }
    }
    computedExtraHeight(rowCount: number) {
        if (this.gridInfo.vGap && this.layoutHeight) {
            if (this.gridInfo.vGap >= 0 && typeof (this.gridInfo.vGap) == 'number') {
                this.layoutHeight = this.layoutHeight + this.gridInfo.vGap * rowCount;
            }
        }
        if (this.gridInfo.topPadding && this.layoutHeight) {
            if (this.gridInfo.topPadding >= 0 && typeof (this.gridInfo.topPadding) == 'number') {
                this.layoutHeight = this.layoutHeight + this.gridInfo.topPadding;
            }
            else if (typeof (this.gridInfo.topPadding) == 'string' && this.gridInfo.topPadding != '' && this.gridInfo.topPadding.includes('%')) {
                let topPadding = Number(this.gridInfo.topPadding.substring(0, this.gridInfo.topPadding.indexOf('%'))) * 0.01 * this.layoutHeight;
                this.layoutHeight = this.layoutHeight + topPadding;
            }
            else {
                console.error(TAG + 'something else topPadding');
            }
        }
        if (this.gridInfo.bottomPadding && this.layoutHeight) {
            if (this.gridInfo.bottomPadding >= 0 && typeof (this.gridInfo.bottomPadding) == 'number') {
                this.layoutHeight = this.layoutHeight + this.gridInfo.bottomPadding;
            }
            else if (typeof (this.gridInfo.bottomPadding) == 'string' && this.gridInfo.bottomPadding != '' && this.gridInfo.bottomPadding.includes('%')) {
                let bottomPadding = Number(this.gridInfo.bottomPadding.substring(0, this.gridInfo.bottomPadding.indexOf('%'))) * 0.01 * this.layoutHeight;
                this.layoutHeight = this.layoutHeight + bottomPadding;
            }
            else {
                console.error(TAG + 'something else bottomPadding');
            }
        }
    }
    render() {
        Column.create();
        Column.backgroundColor(this.gridInfo.bgColor);
        Column.zIndex(this.gridInfo.zIndex);
        Column.margin({
            top: this.gridInfo.topMargin,
            right: this.gridInfo.rightMargin,
            bottom: this.gridInfo.bottomMargin,
            left: this.gridInfo.leftMargin
        });
        Grid.create();
        Grid.onAreaChange((oldValue, newValue) => {
            this.gridWidth = (Number(newValue.width));
            this.gridHeight = (Number(newValue.height));
            this.computedColumnsTemplate();
            console.info(TAG + 'Grid gridWidth = ' + this.gridWidth + ', gridHeight = ' + this.gridHeight);
        });
        Grid.width(undefined);
        Grid.height(this.gridInfo.layoutHeight == undefined ? this.layoutHeight : this.gridInfo.layoutHeight);
        Grid.columnsTemplate(this.columnsTemplate);
        Grid.columnsGap(this.gridInfo.hGap);
        Grid.rowsGap(this.gridInfo.vGap);
        Grid.padding({
            top: this.gridInfo.topPadding,
            right: this.rightPadding,
            bottom: this.gridInfo.bottomPadding,
            left: this.gridInfo.leftPadding
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.vLayoutData), (item: any, position: number) => {
            GridItem.create();
            GridItem.onAreaChange((oldValue, newValue) => {
                this.gridItemWidth = (Number(newValue.width));
                this.gridItemHeight = (Number(newValue.height));
                this.computedHeight();
                console.info(TAG + 'GridItem gridItemWidth = ' + this.gridItemWidth + ', gridItemHeight = ' + this.gridItemHeight);
            });
            GridItem.height(ObservedObject.GetRawObject(this.oneRowHeight));
            GridItem.columnStart(1);
            this.vLayoutContent(item, position, ObservedObject.GetRawObject(this.oneRowHeight), this);
            GridItem.pop();
        });
        ForEach.pop();
        Grid.pop();
        Column.pop();
    }
}
class vLayoutDataType {
    layoutText: string;
    columnStart: number;
    colsSpan: number;
    constructor(layoutText: string, columnStart: number, colsSpan: number) {
        this.layoutText = layoutText;
        this.columnStart = columnStart;
        this.colsSpan = colsSpan;
    }
}
