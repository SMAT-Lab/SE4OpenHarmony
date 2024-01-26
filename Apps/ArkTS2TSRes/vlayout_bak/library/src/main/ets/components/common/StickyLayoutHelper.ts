interface STICKY_LAYOUT_Params {
    vLayoutContent?: (item?: ESObject, position?: number) => ESObject //布局
    ;
    vLayoutData?: layoutDataType[] | number[] | string[];
    vLayoutAttribute?: FixAreaAttributes;
    stickyInfo?: FixAreaAttributes;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "StickyLayoutHelper_" + ++__generate__Id;
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
import { FixAreaAttributes, layoutDataType } from '../core/VLayoutAttributes';
const TAG = 'vlayout STICKY_LAYOUT ';
export class STICKY_LAYOUT extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.vLayoutContent = undefined;
        this.vLayoutData = [] //数据源
        ;
        this.__vLayoutAttribute = new ObservedPropertyObject({} //属性
        , this, "vLayoutAttribute");
        this.__stickyInfo = new ObservedPropertyObject({} //属性
        , this, "stickyInfo");
        this.updateWithValueParams(params);
        this.declareWatch("vLayoutAttribute", this.defaultValueInit);
    }
    updateWithValueParams(params: STICKY_LAYOUT_Params) {
        if (params.vLayoutContent !== undefined) {
            this.vLayoutContent = params.vLayoutContent;
        }
        if (params.vLayoutData !== undefined) {
            this.vLayoutData = params.vLayoutData;
        }
        if (params.vLayoutAttribute !== undefined) {
            this.vLayoutAttribute = params.vLayoutAttribute;
        }
        if (params.stickyInfo !== undefined) {
            this.stickyInfo = params.stickyInfo;
        }
    }
    aboutToBeDeleted() {
        this.__vLayoutAttribute.aboutToBeDeleted();
        this.__stickyInfo.aboutToBeDeleted();
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
    private __stickyInfo: ObservedPropertyObject<FixAreaAttributes>; //属性
    get stickyInfo() {
        return this.__stickyInfo.get();
    }
    set stickyInfo(newValue: FixAreaAttributes) {
        this.__stickyInfo.set(newValue);
    }
    aboutToAppear() {
        this.defaultValueInit();
    }
    defaultValueInit() {
        this.stickyInfo = {
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
        if (this.stickyInfo.padding?.length == 4) {
            this.stickyInfo.topPadding = this.stickyInfo.padding[0];
            this.stickyInfo.rightPadding = this.stickyInfo.padding[1];
            this.stickyInfo.bottomPadding = this.stickyInfo.padding[2];
            this.stickyInfo.leftPadding = this.stickyInfo.padding[3];
        }
        if (this.stickyInfo.margin?.length == 4) {
            this.stickyInfo.topMargin = this.stickyInfo.margin[0];
            this.stickyInfo.rightMargin = this.stickyInfo.margin[1];
            this.stickyInfo.bottomMargin = this.stickyInfo.margin[2];
            this.stickyInfo.leftMargin = this.stickyInfo.margin[3];
        }
        this.initComponentSize();
        this.computedRange();
    }
    initComponentSize() {
        //当容器宽度layoutWidth定义了，无法同时给左右外边距
        //当容器纵横比aspectRatio定义了就相当于容器宽度layoutWidth定义了
        //八种情况下只有两种情况同时给定左右外边距能生效
        if (this.stickyInfo.layoutWidth == undefined && this.stickyInfo.layoutHeight == undefined && this.stickyInfo.aspectRatio == undefined) {
            this.stickyInfo.layoutWidth = undefined;
            this.stickyInfo.layoutHeight = 100;
            this.stickyInfo.aspectRatio = undefined;
        }
        else if (this.stickyInfo.layoutWidth != undefined && this.stickyInfo.layoutHeight == undefined && this.stickyInfo.aspectRatio == undefined) {
            this.stickyInfo.layoutWidth = this.stickyInfo.layoutWidth;
            this.stickyInfo.layoutHeight = 100;
            this.stickyInfo.aspectRatio = undefined;
        }
        else if (this.stickyInfo.layoutWidth == undefined && this.stickyInfo.layoutHeight != undefined && this.stickyInfo.aspectRatio == undefined) {
            this.stickyInfo.layoutWidth = undefined;
            this.stickyInfo.layoutHeight = this.stickyInfo.layoutHeight;
            this.stickyInfo.aspectRatio = undefined;
        }
        else if (this.stickyInfo.layoutWidth == undefined && this.stickyInfo.layoutHeight == undefined && this.stickyInfo.aspectRatio != undefined) {
            this.stickyInfo.layoutWidth = undefined;
            this.stickyInfo.layoutHeight = undefined;
            this.stickyInfo.aspectRatio = this.stickyInfo.aspectRatio;
        }
        else if (this.stickyInfo.layoutWidth != undefined && this.stickyInfo.layoutHeight != undefined && this.stickyInfo.aspectRatio != undefined) {
            this.stickyInfo.layoutWidth = this.stickyInfo.layoutWidth;
            this.stickyInfo.layoutHeight = undefined;
            this.stickyInfo.aspectRatio = this.stickyInfo.aspectRatio;
        }
        else if (this.stickyInfo.layoutWidth != undefined && this.stickyInfo.layoutHeight != undefined && this.stickyInfo.aspectRatio == undefined) {
            this.stickyInfo.layoutWidth = this.stickyInfo.layoutWidth;
            this.stickyInfo.layoutHeight = this.stickyInfo.layoutHeight;
            this.stickyInfo.aspectRatio = undefined;
        }
        else if (this.stickyInfo.layoutWidth != undefined && this.stickyInfo.layoutHeight == undefined && this.stickyInfo.aspectRatio != undefined) {
            this.stickyInfo.layoutWidth = this.stickyInfo.layoutWidth;
            this.stickyInfo.layoutHeight = undefined;
            this.stickyInfo.aspectRatio = this.stickyInfo.aspectRatio;
        }
        else if (this.stickyInfo.layoutWidth == undefined && this.stickyInfo.layoutHeight != undefined && this.stickyInfo.aspectRatio != undefined) {
            this.stickyInfo.layoutWidth = undefined;
            this.stickyInfo.layoutHeight = this.stickyInfo.layoutHeight;
            this.stickyInfo.aspectRatio = this.stickyInfo.aspectRatio;
        }
        else {
            console.error(TAG + 'else');
        }
    }
    computedRange() {
        //可显示的条目range数组长度为2并且数组元素内第一项大于等于0并且第二项大于第一项
        if (this.stickyInfo.range?.length == 2 && this.stickyInfo.range[0] >= 0 && this.stickyInfo.range[1] > this.stickyInfo.range[0]) {
            this.vLayoutData = this.vLayoutData.splice(this.stickyInfo.range[0], this.stickyInfo.range[1]);
        }
        else {
            this.vLayoutData = this.vLayoutData;
        }
        console.info(TAG + 'vLayoutData = ' + JSON.stringify(this.vLayoutData));
    }
    render() {
        Stack.create();
        Stack.width(this.stickyInfo.layoutWidth);
        Stack.height(this.stickyInfo.layoutHeight);
        Stack.aspectRatio(this.stickyInfo.aspectRatio);
        Stack.backgroundColor(this.stickyInfo.bgColor);
        Stack.zIndex(this.stickyInfo.zIndex);
        Stack.padding({
            top: this.stickyInfo.topPadding,
            right: this.stickyInfo.rightPadding,
            bottom: this.stickyInfo.bottomPadding,
            left: this.stickyInfo.leftPadding
        });
        Stack.margin({
            top: this.stickyInfo.topMargin,
            right: this.stickyInfo.rightMargin,
            bottom: this.stickyInfo.bottomMargin,
            left: this.stickyInfo.leftMargin
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.vLayoutData), (item: any, position: number) => {
            this.vLayoutContent(item, position, this);
        });
        ForEach.pop();
        Stack.pop();
    }
}
