interface SINGLE_LAYOUT_Params {
    vLayoutContent?: (item?: ESObject, position?: number) => ESObject //布局
    ;
    vLayoutData?: layoutDataType[] | number[] | string[];
    vLayoutAttribute?: AbstractFullFillAttributes;
    singleInfo?: AbstractFullFillAttributes;
    layoutHeight?: number | undefined;
    itemWidth?: number;
    itemHeight?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SingleLayoutHelper_" + ++__generate__Id;
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
const TAG = 'vlayout SINGLE_LAYOUT ';
export class SINGLE_LAYOUT extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.vLayoutContent = undefined;
        this.vLayoutData = [] //数据源
        ;
        this.__vLayoutAttribute = new ObservedPropertyObject({} //属性
        , this, "vLayoutAttribute");
        this.__singleInfo = new ObservedPropertyObject({} //属性
        , this, "singleInfo");
        this.__layoutHeight = new ObservedPropertyObject(undefined //single布局的高度
        , this, "layoutHeight");
        this.itemWidth = 0 //每个item的宽度
        ;
        this.itemHeight = 0 //每个item的高度
        ;
        this.updateWithValueParams(params);
        this.declareWatch("vLayoutAttribute", this.defaultValueInit);
    }
    updateWithValueParams(params: SINGLE_LAYOUT_Params) {
        if (params.vLayoutContent !== undefined) {
            this.vLayoutContent = params.vLayoutContent;
        }
        if (params.vLayoutData !== undefined) {
            this.vLayoutData = params.vLayoutData;
        }
        if (params.vLayoutAttribute !== undefined) {
            this.vLayoutAttribute = params.vLayoutAttribute;
        }
        if (params.singleInfo !== undefined) {
            this.singleInfo = params.singleInfo;
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
    }
    aboutToBeDeleted() {
        this.__vLayoutAttribute.aboutToBeDeleted();
        this.__singleInfo.aboutToBeDeleted();
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
    private __singleInfo: ObservedPropertyObject<AbstractFullFillAttributes>; //属性
    get singleInfo() {
        return this.__singleInfo.get();
    }
    set singleInfo(newValue: AbstractFullFillAttributes) {
        this.__singleInfo.set(newValue);
    }
    private __layoutHeight: ObservedPropertyObject<number | undefined>; //single布局的高度
    get layoutHeight() {
        return this.__layoutHeight.get();
    }
    set layoutHeight(newValue: number | undefined) {
        this.__layoutHeight.set(newValue);
    }
    private itemWidth: number; //每个item的宽度
    private itemHeight: number; //每个item的高度
    aboutToAppear() {
        this.defaultValueInit();
    }
    defaultValueInit() {
        this.singleInfo = {
            range: this.vLayoutAttribute?.range == undefined ? [] : this.vLayoutAttribute.range,
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
        if (this.singleInfo.padding?.length == 4) {
            this.singleInfo.topPadding = this.singleInfo.padding[0];
            this.singleInfo.rightPadding = this.singleInfo.padding[1];
            this.singleInfo.bottomPadding = this.singleInfo.padding[2];
            this.singleInfo.leftPadding = this.singleInfo.padding[3];
        }
        if (this.singleInfo.margin?.length == 4) {
            this.singleInfo.topMargin = this.singleInfo.margin[0];
            this.singleInfo.rightMargin = this.singleInfo.margin[1];
            this.singleInfo.bottomMargin = this.singleInfo.margin[2];
            this.singleInfo.leftMargin = this.singleInfo.margin[3];
        }
        this.initComponentSize();
        this.computedRange();
    }
    initComponentSize() {
        //当容器宽度layoutWidth定义了，无法同时给左右外边距
        //当容器纵横比aspectRatio定义了就相当于容器宽度layoutWidth定义了
        //八种情况下只有两种情况同时给定左右外边距能生效
        if (this.singleInfo.layoutWidth == undefined && this.singleInfo.layoutHeight == undefined && this.singleInfo.aspectRatio == undefined) {
            this.singleInfo.layoutWidth = undefined;
            this.singleInfo.layoutHeight = undefined;
            this.singleInfo.aspectRatio = undefined;
        }
        else if (this.singleInfo.layoutWidth != undefined && this.singleInfo.layoutHeight == undefined && this.singleInfo.aspectRatio == undefined) {
            this.singleInfo.layoutWidth = this.singleInfo.layoutWidth;
            this.singleInfo.layoutHeight = undefined;
            this.singleInfo.aspectRatio = undefined;
        }
        else if (this.singleInfo.layoutWidth == undefined && this.singleInfo.layoutHeight != undefined && this.singleInfo.aspectRatio == undefined) {
            this.singleInfo.layoutWidth = undefined;
            this.singleInfo.layoutHeight = this.singleInfo.layoutHeight;
            this.singleInfo.aspectRatio = undefined;
        }
        else if (this.singleInfo.layoutWidth == undefined && this.singleInfo.layoutHeight == undefined && this.singleInfo.aspectRatio != undefined) {
            this.singleInfo.layoutWidth = undefined;
            this.singleInfo.layoutHeight = undefined;
            this.singleInfo.aspectRatio = this.singleInfo.aspectRatio;
        }
        else if (this.singleInfo.layoutWidth != undefined && this.singleInfo.layoutHeight != undefined && this.singleInfo.aspectRatio != undefined) {
            this.singleInfo.layoutWidth = this.singleInfo.layoutWidth;
            this.singleInfo.layoutHeight = this.singleInfo.layoutHeight;
            this.singleInfo.aspectRatio = this.singleInfo.aspectRatio;
        }
        else if (this.singleInfo.layoutWidth != undefined && this.singleInfo.layoutHeight != undefined && this.singleInfo.aspectRatio == undefined) {
            this.singleInfo.layoutWidth = this.singleInfo.layoutWidth;
            this.singleInfo.layoutHeight = this.singleInfo.layoutHeight;
            this.singleInfo.aspectRatio = undefined;
        }
        else if (this.singleInfo.layoutWidth != undefined && this.singleInfo.layoutHeight == undefined && this.singleInfo.aspectRatio != undefined) {
            this.singleInfo.layoutWidth = this.singleInfo.layoutWidth;
            this.singleInfo.layoutHeight = undefined;
            this.singleInfo.aspectRatio = this.singleInfo.aspectRatio;
        }
        else if (this.singleInfo.layoutWidth == undefined && this.singleInfo.layoutHeight != undefined && this.singleInfo.aspectRatio != undefined) {
            this.singleInfo.layoutWidth = undefined;
            this.singleInfo.layoutHeight = this.singleInfo.layoutHeight;
            this.singleInfo.aspectRatio = this.singleInfo.aspectRatio;
        }
        else {
            console.error(TAG + 'initComponentSize else');
        }
    }
    computedRange() {
        //可显示的条目range数组长度为2并且数组元素内第一项大于等于0并且第二项大于第一项
        if (this.singleInfo.range?.length == 2 && this.singleInfo.range[0] >= 0 && this.singleInfo.range[1] > this.singleInfo.range[0]) {
            this.vLayoutData = this.vLayoutData.splice(this.singleInfo.range[0], this.singleInfo.range[1]);
        }
        else {
            this.vLayoutData = this.vLayoutData;
        }
        console.info(TAG + 'vLayoutData = ' + JSON.stringify(this.vLayoutData));
    }
    computedHeight() {
        if (this.layoutHeight) {
            this.layoutHeight = this.itemHeight;
        }
        this.computedExtraHeight();
        console.warn(TAG + 'computedHeight layoutHeight = ' + this.layoutHeight);
    }
    computedExtraHeight() {
        if (this.singleInfo.topPadding && this.layoutHeight) {
            if (this.singleInfo.topPadding >= 0 && typeof (this.singleInfo.topPadding) == 'number') {
                this.layoutHeight = this.layoutHeight + this.singleInfo.topPadding;
            }
            else if (typeof (this.singleInfo.topPadding) == 'string' && this.singleInfo.topPadding != '' && this.singleInfo.topPadding.includes('%')) {
                let topPadding = Number(this.singleInfo.topPadding.substring(0, this.singleInfo.topPadding.indexOf('%'))) * 0.01 * this.layoutHeight;
                this.layoutHeight = this.layoutHeight + topPadding;
            }
            else {
                console.error(TAG + 'something else topPadding');
            }
        }
        if (this.singleInfo.bottomPadding && this.layoutHeight) {
            if (this.singleInfo.bottomPadding >= 0 && typeof (this.singleInfo.bottomPadding) == 'number') {
                this.layoutHeight = this.layoutHeight + this.singleInfo.bottomPadding;
            }
            else if (typeof (this.singleInfo.bottomPadding) == 'string' && this.singleInfo.bottomPadding != '' && this.singleInfo.bottomPadding.includes('%')) {
                let bottomPadding = Number(this.singleInfo.bottomPadding.substring(0, this.singleInfo.bottomPadding.indexOf('%'))) * 0.01 * this.layoutHeight;
                this.layoutHeight = this.layoutHeight + bottomPadding;
            }
            else {
                console.error(TAG + 'something else bottomPadding');
            }
        }
    }
    render() {
        Column.create();
        Column.backgroundColor(this.singleInfo.bgColor);
        Column.zIndex(this.singleInfo.zIndex);
        Column.margin({
            top: this.singleInfo.topMargin,
            right: this.singleInfo.rightMargin,
            bottom: this.singleInfo.bottomMargin,
            left: this.singleInfo.leftMargin
        });
        Stack.create();
        Stack.width(this.singleInfo.layoutWidth);
        Stack.height(this.singleInfo.layoutHeight == undefined ? this.layoutHeight : this.singleInfo.layoutHeight);
        Stack.aspectRatio(this.singleInfo.aspectRatio);
        Stack.padding({
            top: this.singleInfo.topPadding,
            right: this.singleInfo.rightPadding,
            bottom: this.singleInfo.bottomPadding,
            left: this.singleInfo.leftPadding
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.vLayoutData), (item: any, position: number) => {
            Column.create();
            Column.onAreaChange((oldValue, newValue) => {
                this.itemWidth = (Number(newValue.width));
                this.itemHeight = (Number(newValue.height));
                console.error(TAG + 'itemWidth = ' + this.itemWidth + ', itemHeight = ' + this.itemHeight);
                this.computedHeight();
            });
            this.vLayoutContent(item, position, this);
            Column.pop();
        });
        ForEach.pop();
        Stack.pop();
        Column.pop();
    }
}
