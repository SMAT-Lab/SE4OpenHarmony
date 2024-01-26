interface SCROLL_FIX_LAYOUT_Params {
    vLayoutContent?: (item?: ESObject, position?: number) => ESObject //布局
    ;
    vLayoutData?: layoutDataType[] | number[] | string[];
    vLayoutAttribute?: FixAreaAttributes;
    scrollFixInfo?: FixAreaAttributes;
    layoutWidth?: number;
    layoutHeight?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ScrollFixLayoutHelper_" + ++__generate__Id;
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
import { FixAreaAttributes, layoutDataType, AlignType } from '../core/VLayoutAttributes';
import display from '@ohos.display';
const TAG = 'vlayout SCROLL_FIX_LAYOUT ';
export class SCROLL_FIX_LAYOUT extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.vLayoutContent = undefined;
        this.vLayoutData = [] //数据源
        ;
        this.__vLayoutAttribute = new ObservedPropertyObject({} //属性
        , this, "vLayoutAttribute");
        this.__scrollFixInfo = new ObservedPropertyObject({} //属性
        , this, "scrollFixInfo");
        this.layoutWidth = 0 //获取的容器高度
        ;
        this.layoutHeight = 0 //获取的容器高度
        ;
        this.updateWithValueParams(params);
        this.declareWatch("vLayoutAttribute", this.defaultValueInit);
    }
    updateWithValueParams(params: SCROLL_FIX_LAYOUT_Params) {
        if (params.vLayoutContent !== undefined) {
            this.vLayoutContent = params.vLayoutContent;
        }
        if (params.vLayoutData !== undefined) {
            this.vLayoutData = params.vLayoutData;
        }
        if (params.vLayoutAttribute !== undefined) {
            this.vLayoutAttribute = params.vLayoutAttribute;
        }
        if (params.scrollFixInfo !== undefined) {
            this.scrollFixInfo = params.scrollFixInfo;
        }
        if (params.layoutWidth !== undefined) {
            this.layoutWidth = params.layoutWidth;
        }
        if (params.layoutHeight !== undefined) {
            this.layoutHeight = params.layoutHeight;
        }
    }
    aboutToBeDeleted() {
        this.__vLayoutAttribute.aboutToBeDeleted();
        this.__scrollFixInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __vLayoutContent; //布局
    private vLayoutData: layoutDataType[] | number[] | string[]; //数据源
    private __vLayoutAttribute?: ObservedPropertyObject<FixAreaAttributes>; //属性
    get vLayoutAttribute() {
        return this.__vLayoutAttribute.get();
    }
    set vLayoutAttribute(newValue: FixAreaAttributes) {
        this.__vLayoutAttribute.set(newValue);
    }
    private __scrollFixInfo: ObservedPropertyObject<FixAreaAttributes>; //属性
    get scrollFixInfo() {
        return this.__scrollFixInfo.get();
    }
    set scrollFixInfo(newValue: FixAreaAttributes) {
        this.__scrollFixInfo.set(newValue);
    }
    private layoutWidth: number; //获取的容器高度
    private layoutHeight: number; //获取的容器高度
    aboutToAppear() {
        this.defaultValueInit();
    }
    defaultValueInit() {
        this.scrollFixInfo = {
            range: this.vLayoutAttribute?.range == undefined ? [] : this.vLayoutAttribute.range,
            layoutWidth: this.vLayoutAttribute?.layoutWidth,
            layoutHeight: this.vLayoutAttribute?.layoutHeight,
            aspectRatio: this.vLayoutAttribute?.aspectRatio,
            bgColor: this.vLayoutAttribute?.bgColor == undefined ? 'rgba(0,0,0,0)' : this.vLayoutAttribute.bgColor,
            xOffset: this.vLayoutAttribute?.xOffset == undefined ? 0 : this.vLayoutAttribute.xOffset,
            yOffset: this.vLayoutAttribute?.yOffset == undefined ? 0 : this.vLayoutAttribute.yOffset,
            alignType: this.vLayoutAttribute?.alignType,
            sketchMeasure: this.vLayoutAttribute?.sketchMeasure == undefined ? false : this.vLayoutAttribute.sketchMeasure,
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
        if (this.scrollFixInfo.padding?.length == 4) {
            this.scrollFixInfo.topPadding = this.scrollFixInfo.padding[0];
            this.scrollFixInfo.rightPadding = this.scrollFixInfo.padding[1];
            this.scrollFixInfo.bottomPadding = this.scrollFixInfo.padding[2];
            this.scrollFixInfo.leftPadding = this.scrollFixInfo.padding[3];
        }
        if (this.scrollFixInfo.margin?.length == 4) {
            this.scrollFixInfo.topMargin = this.scrollFixInfo.margin[0];
            this.scrollFixInfo.rightMargin = this.scrollFixInfo.margin[1];
            this.scrollFixInfo.bottomMargin = this.scrollFixInfo.margin[2];
            this.scrollFixInfo.leftMargin = this.scrollFixInfo.margin[3];
        }
        this.initComponentSize();
        this.computedRange();
        this.computedAlignType();
    }
    initComponentSize() {
        //当容器宽度layoutWidth定义了，无法同时给左右外边距
        //当容器纵横比aspectRatio定义了就相当于容器宽度layoutWidth定义了
        //八种情况下只有两种情况同时给定左右外边距能生效
        if (this.scrollFixInfo.layoutWidth == undefined && this.scrollFixInfo.layoutHeight == undefined && this.scrollFixInfo.aspectRatio == undefined) {
            this.scrollFixInfo.layoutWidth = undefined;
            this.scrollFixInfo.layoutHeight = 100;
            this.scrollFixInfo.aspectRatio = undefined;
        }
        else if (this.scrollFixInfo.layoutWidth != undefined && this.scrollFixInfo.layoutHeight == undefined && this.scrollFixInfo.aspectRatio == undefined) {
            this.scrollFixInfo.layoutWidth = this.scrollFixInfo.layoutWidth;
            this.scrollFixInfo.layoutHeight = 100;
            this.scrollFixInfo.aspectRatio = undefined;
        }
        else if (this.scrollFixInfo.layoutWidth == undefined && this.scrollFixInfo.layoutHeight != undefined && this.scrollFixInfo.aspectRatio == undefined) {
            this.scrollFixInfo.layoutWidth = undefined;
            this.scrollFixInfo.layoutHeight = this.scrollFixInfo.layoutHeight;
            this.scrollFixInfo.aspectRatio = undefined;
        }
        else if (this.scrollFixInfo.layoutWidth == undefined && this.scrollFixInfo.layoutHeight == undefined && this.scrollFixInfo.aspectRatio != undefined) {
            this.scrollFixInfo.layoutWidth = undefined;
            this.scrollFixInfo.layoutHeight = undefined;
            this.scrollFixInfo.aspectRatio = this.scrollFixInfo.aspectRatio;
        }
        else if (this.scrollFixInfo.layoutWidth != undefined && this.scrollFixInfo.layoutHeight != undefined && this.scrollFixInfo.aspectRatio != undefined) {
            this.scrollFixInfo.layoutWidth = this.scrollFixInfo.layoutWidth;
            this.scrollFixInfo.layoutHeight = undefined;
            this.scrollFixInfo.aspectRatio = this.scrollFixInfo.aspectRatio;
        }
        else if (this.scrollFixInfo.layoutWidth != undefined && this.scrollFixInfo.layoutHeight != undefined && this.scrollFixInfo.aspectRatio == undefined) {
            this.scrollFixInfo.layoutWidth = this.scrollFixInfo.layoutWidth;
            this.scrollFixInfo.layoutHeight = this.scrollFixInfo.layoutHeight;
            this.scrollFixInfo.aspectRatio = undefined;
        }
        else if (this.scrollFixInfo.layoutWidth != undefined && this.scrollFixInfo.layoutHeight == undefined && this.scrollFixInfo.aspectRatio != undefined) {
            this.scrollFixInfo.layoutWidth = this.scrollFixInfo.layoutWidth;
            this.scrollFixInfo.layoutHeight = undefined;
            this.scrollFixInfo.aspectRatio = this.scrollFixInfo.aspectRatio;
        }
        else if (this.scrollFixInfo.layoutWidth == undefined && this.scrollFixInfo.layoutHeight != undefined && this.scrollFixInfo.aspectRatio != undefined) {
            this.scrollFixInfo.layoutWidth = undefined;
            this.scrollFixInfo.layoutHeight = this.scrollFixInfo.layoutHeight;
            this.scrollFixInfo.aspectRatio = this.scrollFixInfo.aspectRatio;
        }
        else {
            console.error(TAG + 'else');
        }
    }
    computedRange() {
        //可显示的条目range数组长度为2并且数组元素内第一项大于等于0并且第二项大于第一项
        if (this.scrollFixInfo.range?.length == 2 && this.scrollFixInfo.range[0] >= 0 && this.scrollFixInfo.range[1] > this.scrollFixInfo.range[0]) {
            this.vLayoutData = this.vLayoutData.splice(this.scrollFixInfo.range[0], this.scrollFixInfo.range[1]);
        }
        else {
            this.vLayoutData = this.vLayoutData;
        }
        console.info(TAG + 'vLayoutData = ' + JSON.stringify(this.vLayoutData));
    }
    computedAlignType() {
        let displayClass: display.Display | null = null;
        try {
            displayClass = display.getDefaultDisplaySync();
            let screenWidth = px2vp(displayClass.width);
            let screenHeight = px2vp(displayClass.height);
            if (this.scrollFixInfo.alignType == AlignType.TOP_LEFT) { //左上
                this.scrollFixInfo.xOffset = 0;
                this.scrollFixInfo.yOffset = 0;
            }
            else if (this.scrollFixInfo.alignType == AlignType.TOP_RIGHT) { //右上
                this.scrollFixInfo.xOffset = screenWidth - this.layoutWidth;
                this.scrollFixInfo.yOffset = 0;
            }
            else if (this.scrollFixInfo.alignType == AlignType.BOTTOM_LEFT) { //左下
                this.scrollFixInfo.xOffset = 0;
                this.scrollFixInfo.yOffset = screenHeight - this.layoutHeight;
            }
            else if (this.scrollFixInfo.alignType == AlignType.BOTTOM_RIGHT) { //右下
                this.scrollFixInfo.xOffset = screenWidth - this.layoutWidth;
                this.scrollFixInfo.yOffset = screenHeight - this.layoutHeight;
            }
            else {
                this.scrollFixInfo.xOffset = this.scrollFixInfo.xOffset;
                this.scrollFixInfo.yOffset = this.scrollFixInfo.yOffset;
            }
        }
        catch (exception) {
            console.error('Failed to obtain the default display object. Code: ' + JSON.stringify(exception));
        }
    }
    render() {
        Column.create();
        Column.onAreaChange((oldValue, newValue) => {
            this.layoutWidth = Number(newValue.width);
            this.layoutHeight = Number(newValue.height);
            console.info(TAG + 'layoutWidth = ' + this.layoutWidth + ', layoutHeight = ' + this.layoutHeight);
            this.computedAlignType();
        });
        Column.width(this.scrollFixInfo.sketchMeasure ? '100%' : this.scrollFixInfo.layoutWidth);
        Column.height(this.scrollFixInfo.layoutHeight);
        Column.aspectRatio(this.scrollFixInfo.aspectRatio);
        Column.backgroundColor(this.scrollFixInfo.bgColor);
        Column.position({
            x: this.scrollFixInfo.sketchMeasure ? '0%' : this.scrollFixInfo.xOffset,
            y: this.scrollFixInfo.yOffset
        });
        Column.zIndex(this.scrollFixInfo.zIndex);
        Column.padding({
            top: this.scrollFixInfo.topPadding,
            right: this.scrollFixInfo.rightPadding,
            bottom: this.scrollFixInfo.bottomPadding,
            left: this.scrollFixInfo.leftPadding
        });
        Column.margin({
            top: this.scrollFixInfo.topMargin,
            right: this.scrollFixInfo.rightMargin,
            bottom: this.scrollFixInfo.bottomMargin,
            left: this.scrollFixInfo.leftMargin
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.vLayoutData), (item: any, position: number) => {
            this.vLayoutContent(item, position, this);
        });
        ForEach.pop();
        Column.pop();
    }
}
