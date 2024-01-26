interface DEFAULT_LAYOUT_Params {
    vLayoutContent?: (item?: ESObject, position?: number, listItemHeight?: number) => ESObject //布局
    ;
    vLayoutData?: layoutDataType[] | number[] | string[];
    vLayoutAttribute?: LinearAttributes;
    defaultInfo?: LinearAttributes;
    oneRowHeight?: number | undefined;
    layoutHeight?: number | undefined;
    listWidth?: number;
    listHeight?: number;
    listItemWidth?: number;
    listItemHeight?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DefaultLayoutHelper_" + ++__generate__Id;
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
const TAG = 'vlayout DEFAULT_LAYOUT ';
export class DEFAULT_LAYOUT extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.vLayoutContent = undefined;
        this.vLayoutData = [] //数据源
        ;
        this.__vLayoutAttribute = new ObservedPropertyObject({} //属性
        , this, "vLayoutAttribute");
        this.__defaultInfo = new ObservedPropertyObject({} //属性
        , this, "defaultInfo");
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
    updateWithValueParams(params: DEFAULT_LAYOUT_Params) {
        if (params.vLayoutContent !== undefined) {
            this.vLayoutContent = params.vLayoutContent;
        }
        if (params.vLayoutData !== undefined) {
            this.vLayoutData = params.vLayoutData;
        }
        if (params.vLayoutAttribute !== undefined) {
            this.vLayoutAttribute = params.vLayoutAttribute;
        }
        if (params.defaultInfo !== undefined) {
            this.defaultInfo = params.defaultInfo;
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
        this.__defaultInfo.aboutToBeDeleted();
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
    private __defaultInfo: ObservedPropertyObject<LinearAttributes>; //属性
    get defaultInfo() {
        return this.__defaultInfo.get();
    }
    set defaultInfo(newValue: LinearAttributes) {
        this.__defaultInfo.set(newValue);
    }
    aboutToAppear() {
        this.defaultValueInit();
    }
    defaultValueInit() {
        this.defaultInfo = {
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
        if (this.defaultInfo.padding?.length == 4) {
            this.defaultInfo.topPadding = this.defaultInfo.padding[0];
            this.defaultInfo.rightPadding = this.defaultInfo.padding[1];
            this.defaultInfo.bottomPadding = this.defaultInfo.padding[2];
            this.defaultInfo.leftPadding = this.defaultInfo.padding[3];
        }
        if (this.defaultInfo.margin?.length == 4) {
            this.defaultInfo.topMargin = this.defaultInfo.margin[0];
            this.defaultInfo.rightMargin = this.defaultInfo.margin[1];
            this.defaultInfo.bottomMargin = this.defaultInfo.margin[2];
            this.defaultInfo.leftMargin = this.defaultInfo.margin[3];
        }
        this.computedRange();
    }
    computedRange() {
        //可显示的条目range数组长度为2并且数组元素内第一项大于等于0并且第二项大于第一项
        if (this.defaultInfo.range?.length == 2 && this.defaultInfo.range[0] >= 0 && this.defaultInfo.range[1] > this.defaultInfo.range[0]) {
            this.vLayoutData = this.vLayoutData.splice(this.defaultInfo.range[0], this.defaultInfo.range[1]);
        }
        else {
            this.vLayoutData = this.vLayoutData;
        }
        console.info(TAG + 'vLayoutData = ' + JSON.stringify(this.vLayoutData));
    }
    computedHeight() {
        let rowCount: number = this.vLayoutData.length;
        console.error(TAG + 'rowCount = ' + rowCount);
        if (this.defaultInfo.layoutHeight == undefined && this.defaultInfo.aspectRatio == 0) {
            this.layoutHeight = this.listItemHeight * rowCount;
            this.computedExtraHeight(rowCount);
            console.log(TAG + 'the first case layoutHeight = ' + this.layoutHeight);
        }
        else if (this.defaultInfo.layoutHeight == undefined && this.defaultInfo.aspectRatio && this.defaultInfo.aspectRatio > 0) {
            this.oneRowHeight = this.listWidth / this.defaultInfo.aspectRatio;
            this.layoutHeight = this.oneRowHeight * rowCount;
            this.computedExtraHeight(rowCount);
            console.log(TAG + 'the second case oneRowHeight = ' + this.oneRowHeight + ', layoutHeight = ' + this.layoutHeight);
        }
        else if (this.defaultInfo.layoutHeight != undefined && this.defaultInfo.aspectRatio && this.defaultInfo.aspectRatio > 0) {
            this.oneRowHeight = this.listWidth / this.defaultInfo.aspectRatio;
            console.log(TAG + 'the third case oneRowHeight = ' + this.oneRowHeight + ', layoutHeight = ' + this.defaultInfo.layoutHeight);
        }
        else if (this.defaultInfo.layoutHeight != undefined && this.defaultInfo.aspectRatio == 0) {
            this.defaultInfo.layoutHeight = this.defaultInfo.layoutHeight;
            console.log(TAG + 'the fourth case layoutHeight = ' + this.defaultInfo.layoutHeight);
        }
        else {
            console.error(TAG + 'something else computedHeight');
        }
    }
    computedExtraHeight(rowCount: number) {
        if (this.defaultInfo.dividerHeight && this.layoutHeight) {
            if (this.defaultInfo.dividerHeight >= 0 && typeof (this.defaultInfo.dividerHeight) == 'number') {
                this.layoutHeight = this.layoutHeight + this.defaultInfo.dividerHeight * (rowCount - 1);
            }
            else if (typeof (this.defaultInfo.dividerHeight) == 'string' && this.defaultInfo.dividerHeight != '' && this.defaultInfo.dividerHeight.includes('%')) {
                let dividerHeight = Number(this.defaultInfo.dividerHeight.toString()
                    .substring(0, this.defaultInfo.dividerHeight.toString().indexOf('%'))) * 0.01 * this.layoutHeight;
                this.layoutHeight = this.layoutHeight + dividerHeight * (rowCount - 1);
            }
            else {
                console.error(TAG + 'something else dividerHeight');
            }
        }
        if (this.defaultInfo.topPadding && this.layoutHeight) {
            if (this.defaultInfo.topPadding >= 0 && typeof (this.defaultInfo.topPadding) == 'number') {
                this.layoutHeight = this.layoutHeight + this.defaultInfo.topPadding;
            }
            else if (typeof (this.defaultInfo.topPadding) == 'string' && this.defaultInfo.topPadding != '' && this.defaultInfo.topPadding.includes('%')) {
                let topPadding = Number(this.defaultInfo.topPadding.substring(0, this.defaultInfo.topPadding.indexOf('%'))) * 0.01 * this.layoutHeight;
                this.layoutHeight = this.layoutHeight + topPadding;
            }
            else {
                console.error(TAG + 'something else topPadding');
            }
        }
        if (this.defaultInfo.bottomPadding && this.layoutHeight) {
            if (this.defaultInfo.bottomPadding >= 0 && typeof (this.defaultInfo.bottomPadding) == 'number') {
                this.layoutHeight = this.layoutHeight + this.defaultInfo.bottomPadding;
            }
            else if (typeof (this.defaultInfo.bottomPadding) == 'string' && this.defaultInfo.bottomPadding != '' && this.defaultInfo.bottomPadding.includes('%')) {
                let bottomPadding = Number(this.defaultInfo.bottomPadding.substring(0, this.defaultInfo.bottomPadding.indexOf('%'))) * 0.01 * this.layoutHeight;
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
        Column.backgroundColor(this.defaultInfo.bgColor);
        Column.zIndex(this.defaultInfo.zIndex);
        Column.margin({
            top: this.defaultInfo.topMargin,
            right: this.defaultInfo.rightMargin,
            bottom: this.defaultInfo.bottomMargin,
            left: this.defaultInfo.leftMargin
        });
        List.create({ space: this.vLayoutAttribute?.dividerHeight });
        List.onAreaChange((oldValue, newValue) => {
            this.listWidth = (Number(newValue.width));
            this.listHeight = (Number(newValue.height));
            console.info(TAG + 'List listWidth = ' + this.listWidth + ', listHeight = ' + this.listHeight);
        });
        List.width(undefined);
        List.height(this.defaultInfo.layoutHeight == undefined ? this.layoutHeight : this.defaultInfo.layoutHeight);
        List.edgeEffect(EdgeEffect.None);
        List.padding({
            top: this.defaultInfo.topPadding,
            right: this.defaultInfo.rightPadding,
            bottom: this.defaultInfo.bottomPadding,
            left: this.defaultInfo.leftPadding
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
