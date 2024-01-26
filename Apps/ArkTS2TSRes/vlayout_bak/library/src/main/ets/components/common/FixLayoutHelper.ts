interface FIX_LAYOUT_Params {
    vLayoutContent?: (item?: ESObject, position?: number) => ESObject //布局
    ;
    vLayoutData?: layoutDataType[] | number[] | string[];
    vLayoutAttribute?: FixAreaAttributes;
    fixInfo?: FixAreaAttributes;
    layoutWidth?: number;
    layoutHeight?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "FixLayoutHelper_" + ++__generate__Id;
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
const TAG = 'vlayout FIX_LAYOUT ';
export class FIX_LAYOUT extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.vLayoutContent = undefined;
        this.vLayoutData = [] //数据源
        ;
        this.__vLayoutAttribute = new ObservedPropertyObject({} //属性
        , this, "vLayoutAttribute");
        this.__fixInfo = new ObservedPropertyObject({} //属性
        , this, "fixInfo");
        this.layoutWidth = 0 //获取的容器高度
        ;
        this.layoutHeight = 0 //获取的容器高度
        ;
        this.updateWithValueParams(params);
        this.declareWatch("vLayoutAttribute", this.defaultValueInit);
    }
    updateWithValueParams(params: FIX_LAYOUT_Params) {
        if (params.vLayoutContent !== undefined) {
            this.vLayoutContent = params.vLayoutContent;
        }
        if (params.vLayoutData !== undefined) {
            this.vLayoutData = params.vLayoutData;
        }
        if (params.vLayoutAttribute !== undefined) {
            this.vLayoutAttribute = params.vLayoutAttribute;
        }
        if (params.fixInfo !== undefined) {
            this.fixInfo = params.fixInfo;
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
        this.__fixInfo.aboutToBeDeleted();
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
    private __fixInfo: ObservedPropertyObject<FixAreaAttributes>; //属性
    get fixInfo() {
        return this.__fixInfo.get();
    }
    set fixInfo(newValue: FixAreaAttributes) {
        this.__fixInfo.set(newValue);
    }
    private layoutWidth: number; //获取的容器高度
    private layoutHeight: number; //获取的容器高度
    aboutToAppear() {
        this.defaultValueInit();
    }
    defaultValueInit() {
        this.fixInfo = {
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
        if (this.fixInfo.padding?.length == 4) {
            this.fixInfo.topPadding = this.fixInfo.padding[0];
            this.fixInfo.rightPadding = this.fixInfo.padding[1];
            this.fixInfo.bottomPadding = this.fixInfo.padding[2];
            this.fixInfo.leftPadding = this.fixInfo.padding[3];
        }
        if (this.fixInfo.margin?.length == 4) {
            this.fixInfo.topMargin = this.fixInfo.margin[0];
            this.fixInfo.rightMargin = this.fixInfo.margin[1];
            this.fixInfo.bottomMargin = this.fixInfo.margin[2];
            this.fixInfo.leftMargin = this.fixInfo.margin[3];
        }
        this.initComponentSize();
        this.computedRange();
        this.computedAlignType();
    }
    initComponentSize() {
        //当容器宽度layoutWidth定义了，无法同时给左右外边距
        //当容器纵横比aspectRatio定义了就相当于容器宽度layoutWidth定义了
        //八种情况下只有两种情况同时给定左右外边距能生效
        if (this.fixInfo.layoutWidth == undefined && this.fixInfo.layoutHeight == undefined && this.fixInfo.aspectRatio == undefined) {
            this.fixInfo.layoutWidth = undefined;
            this.fixInfo.layoutHeight = 100;
            this.fixInfo.aspectRatio = undefined;
        }
        else if (this.fixInfo.layoutWidth != undefined && this.fixInfo.layoutHeight == undefined && this.fixInfo.aspectRatio == undefined) {
            this.fixInfo.layoutWidth = this.fixInfo.layoutWidth;
            this.fixInfo.layoutHeight = 100;
            this.fixInfo.aspectRatio = undefined;
        }
        else if (this.fixInfo.layoutWidth == undefined && this.fixInfo.layoutHeight != undefined && this.fixInfo.aspectRatio == undefined) {
            this.fixInfo.layoutWidth = undefined;
            this.fixInfo.layoutHeight = this.fixInfo.layoutHeight;
            this.fixInfo.aspectRatio = undefined;
        }
        else if (this.fixInfo.layoutWidth == undefined && this.fixInfo.layoutHeight == undefined && this.fixInfo.aspectRatio != undefined) {
            this.fixInfo.layoutWidth = undefined;
            this.fixInfo.layoutHeight = undefined;
            this.fixInfo.aspectRatio = this.fixInfo.aspectRatio;
        }
        else if (this.fixInfo.layoutWidth != undefined && this.fixInfo.layoutHeight != undefined && this.fixInfo.aspectRatio != undefined) {
            this.fixInfo.layoutWidth = this.fixInfo.layoutWidth;
            this.fixInfo.layoutHeight = undefined;
            this.fixInfo.aspectRatio = this.fixInfo.aspectRatio;
        }
        else if (this.fixInfo.layoutWidth != undefined && this.fixInfo.layoutHeight != undefined && this.fixInfo.aspectRatio == undefined) {
            this.fixInfo.layoutWidth = this.fixInfo.layoutWidth;
            this.fixInfo.layoutHeight = this.fixInfo.layoutHeight;
            this.fixInfo.aspectRatio = undefined;
        }
        else if (this.fixInfo.layoutWidth != undefined && this.fixInfo.layoutHeight == undefined && this.fixInfo.aspectRatio != undefined) {
            this.fixInfo.layoutWidth = this.fixInfo.layoutWidth;
            this.fixInfo.layoutHeight = undefined;
            this.fixInfo.aspectRatio = this.fixInfo.aspectRatio;
        }
        else if (this.fixInfo.layoutWidth == undefined && this.fixInfo.layoutHeight != undefined && this.fixInfo.aspectRatio != undefined) {
            this.fixInfo.layoutWidth = undefined;
            this.fixInfo.layoutHeight = this.fixInfo.layoutHeight;
            this.fixInfo.aspectRatio = this.fixInfo.aspectRatio;
        }
        else {
            console.error(TAG + 'else');
        }
    }
    computedRange() {
        //可显示的条目range数组长度为2并且数组元素内第一项大于等于0并且第二项大于第一项
        if (this.fixInfo.range?.length == 2 && this.fixInfo.range[0] >= 0 && this.fixInfo.range[1] > this.fixInfo.range[0]) {
            this.vLayoutData = this.vLayoutData.splice(this.fixInfo.range[0], this.fixInfo.range[1]);
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
            if (this.fixInfo.alignType == AlignType.TOP_LEFT) { //左上
                this.fixInfo.xOffset = 0;
                this.fixInfo.yOffset = 0;
            }
            else if (this.fixInfo.alignType == AlignType.TOP_RIGHT) { //右上
                this.fixInfo.xOffset = screenWidth - this.layoutWidth;
                this.fixInfo.yOffset = 0;
            }
            else if (this.fixInfo.alignType == AlignType.BOTTOM_LEFT) { //左下
                this.fixInfo.xOffset = 0;
                this.fixInfo.yOffset = screenHeight - this.layoutHeight;
            }
            else if (this.fixInfo.alignType == AlignType.BOTTOM_RIGHT) { //右下
                this.fixInfo.xOffset = screenWidth - this.layoutWidth;
                this.fixInfo.yOffset = screenHeight - this.layoutHeight;
            }
            else {
                this.fixInfo.xOffset = this.fixInfo.xOffset;
                this.fixInfo.yOffset = this.fixInfo.yOffset;
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
        Column.width(this.fixInfo.sketchMeasure ? '100%' : this.fixInfo.layoutWidth);
        Column.height(this.fixInfo.layoutHeight);
        Column.aspectRatio(this.fixInfo.aspectRatio);
        Column.backgroundColor(this.fixInfo.bgColor);
        Column.position({
            x: this.fixInfo.sketchMeasure ? '0%' : this.fixInfo.xOffset,
            y: this.fixInfo.yOffset
        });
        Column.zIndex(this.fixInfo.zIndex);
        Column.padding({
            top: this.fixInfo.topPadding,
            right: this.fixInfo.rightPadding,
            bottom: this.fixInfo.bottomPadding,
            left: this.fixInfo.leftPadding
        });
        Column.margin({
            top: this.fixInfo.topMargin,
            right: this.fixInfo.rightMargin,
            bottom: this.fixInfo.bottomMargin,
            left: this.fixInfo.leftMargin
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.vLayoutData), (item: any, position: number) => {
            this.vLayoutContent(item, position, this);
        });
        ForEach.pop();
        Column.pop();
    }
}
