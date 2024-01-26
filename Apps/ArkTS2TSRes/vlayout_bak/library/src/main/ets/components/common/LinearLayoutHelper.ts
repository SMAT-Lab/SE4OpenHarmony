interface LINEAR_LAYOUT_Params {
    vLayoutContent?: (item?: ESObject, position?: number, listItemHeight?: number) => ESObject //布局
    ;
    vLayoutData?: layoutDataType[] | number[] | string[];
    vLayoutAttribute?: LinearAttributes;
    linearInfo?: LinearAttributes;
    oneRowHeight?: number | undefined;
    layoutHeight?: number | undefined;
    listWidth?: number;
    listHeight?: number;
    listItemWidth?: number;
    listItemHeight?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LinearLayoutHelper_" + ++__generate__Id;
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
import { LinearAttributes, layoutDataType } from '../core/VLayoutAttributes';
const TAG = 'vlayout LINEAR_LAYOUT ';
export class LINEAR_LAYOUT extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.vLayoutContent = undefined;
        this.vLayoutData = [] //数据源
        ;
        this.__vLayoutAttribute = new ObservedPropertyObject({} //属性
        , this, "vLayoutAttribute");
        this.__linearInfo = new ObservedPropertyObject({} //属性
        , this, "linearInfo");
        this.__oneRowHeight = new ObservedPropertyObject(undefined //单行高度
        , this, "oneRowHeight");
        this.__layoutHeight = new ObservedPropertyObject(undefined //list高度
        , this, "layoutHeight");
        this.listWidth = 0 //获取的list高度
        ;
        this.listHeight = 0 //获取的list高度
        ;
        this.listItemWidth = 0 //获取的listItem宽度
        ;
        this.listItemHeight = 0 //获取的listItem高度
        ;
        this.updateWithValueParams(params);
        this.declareWatch("vLayoutAttribute", this.defaultValueInit);
    }
    updateWithValueParams(params: LINEAR_LAYOUT_Params) {
        if (params.vLayoutContent !== undefined) {
            this.vLayoutContent = params.vLayoutContent;
        }
        if (params.vLayoutData !== undefined) {
            this.vLayoutData = params.vLayoutData;
        }
        if (params.vLayoutAttribute !== undefined) {
            this.vLayoutAttribute = params.vLayoutAttribute;
        }
        if (params.linearInfo !== undefined) {
            this.linearInfo = params.linearInfo;
        }
        if (params.oneRowHeight !== undefined) {
            this.oneRowHeight = params.oneRowHeight;
        }
        if (params.layoutHeight !== undefined) {
            this.layoutHeight = params.layoutHeight;
        }
        if (params.listWidth !== undefined) {
            this.listWidth = params.listWidth;
        }
        if (params.listHeight !== undefined) {
            this.listHeight = params.listHeight;
        }
        if (params.listItemWidth !== undefined) {
            this.listItemWidth = params.listItemWidth;
        }
        if (params.listItemHeight !== undefined) {
            this.listItemHeight = params.listItemHeight;
        }
    }
    aboutToBeDeleted() {
        this.__vLayoutAttribute.aboutToBeDeleted();
        this.__linearInfo.aboutToBeDeleted();
        this.__oneRowHeight.aboutToBeDeleted();
        this.__layoutHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __vLayoutContent; //布局
    private vLayoutData: layoutDataType[] | number[] | string[]; //数据源
    private __vLayoutAttribute?: ObservedPropertyObject<LinearAttributes>; //属性
    get vLayoutAttribute() {
        return this.__vLayoutAttribute.get();
    }
    set vLayoutAttribute(newValue: LinearAttributes) {
        this.__vLayoutAttribute.set(newValue);
    }
    private __linearInfo: ObservedPropertyObject<LinearAttributes>; //属性
    get linearInfo() {
        return this.__linearInfo.get();
    }
    set linearInfo(newValue: LinearAttributes) {
        this.__linearInfo.set(newValue);
    }
    aboutToAppear() {
        this.defaultValueInit();
    }
    defaultValueInit() {
        this.linearInfo = {
            range: this.vLayoutAttribute?.range == undefined ? [] : this.vLayoutAttribute.range,
            dividerHeight: this.vLayoutAttribute?.dividerHeight == undefined ? 0 : this.vLayoutAttribute.dividerHeight,
            layoutHeight: this.vLayoutAttribute?.layoutHeight,
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
        if (this.linearInfo.padding?.length == 4) {
            this.linearInfo.topPadding = this.linearInfo.padding[0];
            this.linearInfo.rightPadding = this.linearInfo.padding[1];
            this.linearInfo.bottomPadding = this.linearInfo.padding[2];
            this.linearInfo.leftPadding = this.linearInfo.padding[3];
        }
        if (this.linearInfo.margin?.length == 4) {
            this.linearInfo.topMargin = this.linearInfo.margin[0];
            this.linearInfo.rightMargin = this.linearInfo.margin[1];
            this.linearInfo.bottomMargin = this.linearInfo.margin[2];
            this.linearInfo.leftMargin = this.linearInfo.margin[3];
        }
        this.computedRange();
    }
    computedRange() {
        //可显示的条目range数组长度为2并且数组元素内第一项大于等于0并且第二项大于第一项
        if (this.linearInfo.range?.length == 2 && this.linearInfo.range[0] >= 0 && this.linearInfo.range[1] > this.linearInfo.range[0]) {
            this.vLayoutData = this.vLayoutData.splice(this.linearInfo.range[0], this.linearInfo.range[1]);
        }
        else {
            this.vLayoutData = this.vLayoutData;
        }
        console.info(TAG + 'vLayoutData = ' + JSON.stringify(this.vLayoutData));
    }
    computedHeight() {
        let rowCount: number = this.vLayoutData.length;
        console.error(TAG + 'rowCount = ' + rowCount);
        if (this.linearInfo.aspectRatio) {
            if (this.linearInfo.layoutHeight == undefined && this.linearInfo.aspectRatio == 0) {
                this.layoutHeight = this.listItemHeight * rowCount;
                this.computedExtraHeight(rowCount);
                console.log(TAG + 'the first case layoutHeight = ' + this.layoutHeight);
            }
            else if (this.linearInfo.layoutHeight == undefined && this.linearInfo.aspectRatio > 0) {
                this.oneRowHeight = this.listWidth / this.linearInfo.aspectRatio;
                this.layoutHeight = this.oneRowHeight * rowCount;
                this.computedExtraHeight(rowCount);
                console.log(TAG + 'the second case oneRowHeight = ' + this.oneRowHeight + ', layoutHeight = ' + this.layoutHeight);
            }
            else if (this.linearInfo.layoutHeight != undefined && this.linearInfo.aspectRatio > 0) {
                this.oneRowHeight = this.listWidth / this.linearInfo.aspectRatio;
                console.log(TAG + 'the third case oneRowHeight = ' + this.oneRowHeight + ', layoutHeight = ' + this.linearInfo.layoutHeight);
            }
            else if (this.linearInfo.layoutHeight != undefined && this.linearInfo.aspectRatio == 0) {
                this.linearInfo.layoutHeight = this.linearInfo.layoutHeight;
                console.log(TAG + 'the fourth case layoutHeight = ' + this.linearInfo.layoutHeight);
            }
            else {
                console.error(TAG + 'something else computedHeight');
            }
        }
    }
    computedExtraHeight(rowCount: number) {
        if (this.linearInfo.dividerHeight && this.layoutHeight) {
            if (this.linearInfo.dividerHeight >= 0 && typeof (this.linearInfo.dividerHeight) == 'number') {
                this.layoutHeight = this.layoutHeight + this.linearInfo.dividerHeight * (rowCount - 1);
            }
            else if (typeof (this.linearInfo.dividerHeight) == 'string' && this.linearInfo.dividerHeight != '' && this.linearInfo.dividerHeight.includes('%')) {
                let dividerHeight = Number(this.linearInfo.dividerHeight.toString()
                    .substring(0, this.linearInfo.dividerHeight.toString().indexOf('%'))) * 0.01 * this.layoutHeight;
                this.layoutHeight = this.layoutHeight + dividerHeight * (rowCount - 1);
            }
            else {
                console.error(TAG + 'something else dividerHeight');
            }
        }
        if (this.linearInfo.topPadding && this.layoutHeight) {
            if (this.linearInfo.topPadding >= 0 && typeof (this.linearInfo.topPadding) == 'number') {
                this.layoutHeight = this.layoutHeight + this.linearInfo.topPadding;
            }
            else if (typeof (this.linearInfo.topPadding) == 'string' && this.linearInfo.topPadding != '' && this.linearInfo.topPadding.includes('%')) {
                let topPadding = Number(this.linearInfo.topPadding.substring(0, this.linearInfo.topPadding.indexOf('%'))) * 0.01 * this.layoutHeight;
                this.layoutHeight = this.layoutHeight + topPadding;
            }
            else {
                console.error(TAG + 'something else topPadding');
            }
        }
        if (this.linearInfo.bottomPadding && this.layoutHeight) {
            if (this.linearInfo.bottomPadding >= 0 && typeof (this.linearInfo.bottomPadding) == 'number') {
                this.layoutHeight = this.layoutHeight + this.linearInfo.bottomPadding;
            }
            else if (typeof (this.linearInfo.bottomPadding) == 'string' && this.linearInfo.bottomPadding != '' && this.linearInfo.bottomPadding.includes('%')) {
                let bottomPadding = Number(this.linearInfo.bottomPadding.substring(0, this.linearInfo.bottomPadding.indexOf('%'))) * 0.01 * this.layoutHeight;
                this.layoutHeight = this.layoutHeight + bottomPadding;
            }
            else {
                console.error(TAG + 'something else bottomPadding');
            }
        }
    }
    private __oneRowHeight: ObservedPropertyObject<number | undefined>; //单行高度
    get oneRowHeight() {
        return this.__oneRowHeight.get();
    }
    set oneRowHeight(newValue: number | undefined) {
        this.__oneRowHeight.set(newValue);
    }
    private __layoutHeight: ObservedPropertyObject<number | undefined>; //list高度
    get layoutHeight() {
        return this.__layoutHeight.get();
    }
    set layoutHeight(newValue: number | undefined) {
        this.__layoutHeight.set(newValue);
    }
    private listWidth: number; //获取的list高度
    private listHeight: number; //获取的list高度
    private listItemWidth: number; //获取的listItem宽度
    private listItemHeight: number; //获取的listItem高度
    render() {
        Column.create();
        Column.backgroundColor(this.linearInfo.bgColor);
        Column.zIndex(this.linearInfo.zIndex);
        Column.margin({
            top: this.linearInfo.topMargin,
            right: this.linearInfo.rightMargin,
            bottom: this.linearInfo.bottomMargin,
            left: this.linearInfo.leftMargin
        });
        List.create({ space: this.linearInfo.dividerHeight });
        List.onAreaChange((oldValue, newValue) => {
            this.listWidth = (Number(newValue.width));
            this.listHeight = (Number(newValue.height));
            console.info(TAG + 'List listWidth = ' + this.listWidth + ', listHeight = ' + this.listHeight);
        });
        List.width(undefined);
        List.height(this.linearInfo.layoutHeight == undefined ? this.layoutHeight : this.linearInfo.layoutHeight);
        List.edgeEffect(EdgeEffect.None);
        List.padding({
            top: this.linearInfo.topPadding,
            right: this.linearInfo.rightPadding,
            bottom: this.linearInfo.bottomPadding,
            left: this.linearInfo.leftPadding
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.vLayoutData), (item: any, position: number) => {
            ListItem.create();
            ListItem.height(ObservedObject.GetRawObject(this.oneRowHeight));
            ListItem.onAreaChange((oldValue, newValue) => {
                this.listItemWidth = (Number(newValue.width));
                this.listItemHeight = (Number(newValue.height));
                this.computedHeight();
                console.info(TAG + 'ListItem listItemWidth = ' + this.listItemWidth + ', listItemHeight = ' + this.listItemHeight);
            });
            this.vLayoutContent(item, position, ObservedObject.GetRawObject(this.oneRowHeight), this);
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
