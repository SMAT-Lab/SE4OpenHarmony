interface FLOAT_LAYOUT_Params {
    vLayoutContent?: (item?: ESObject, position?: number) => ESObject //布局
    ;
    vLayoutData?: layoutDataType[] | number[] | string[];
    vLayoutAttribute?: FixAreaAttributes;
    floatInfo?: FixAreaAttributes;
    layoutWidth?: number;
    layoutHeight?: number;
    imitatorShow?: boolean;
    imitatorWidth?: number;
    imitatorHeight?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "FloatLayoutHelper_" + ++__generate__Id;
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
import { BusinessError } from '@ohos.base';
const TAG = 'vlayout FLOAT_LAYOUT ';
export class FLOAT_LAYOUT extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.vLayoutContent = undefined;
        this.vLayoutData = [] //数据源
        ;
        this.__vLayoutAttribute = new ObservedPropertyObject({} //属性
        , this, "vLayoutAttribute");
        this.__floatInfo = new ObservedPropertyObject({} //属性
        , this, "floatInfo");
        this.layoutWidth = 0 //获取的容器高度
        ;
        this.layoutHeight = 0 //获取的容器高度
        ;
        this.__imitatorShow = new ObservedPropertySimple(false //模拟块是否显示
        , this, "imitatorShow");
        this.__imitatorWidth = new ObservedPropertySimple(0 //模拟块宽度
        , this, "imitatorWidth");
        this.__imitatorHeight = new ObservedPropertySimple(0 //模拟块高度
        , this, "imitatorHeight");
        this.updateWithValueParams(params);
        this.declareWatch("vLayoutAttribute", this.defaultValueInit);
    }
    updateWithValueParams(params: FLOAT_LAYOUT_Params) {
        if (params.vLayoutContent !== undefined) {
            this.vLayoutContent = params.vLayoutContent;
        }
        if (params.vLayoutData !== undefined) {
            this.vLayoutData = params.vLayoutData;
        }
        if (params.vLayoutAttribute !== undefined) {
            this.vLayoutAttribute = params.vLayoutAttribute;
        }
        if (params.floatInfo !== undefined) {
            this.floatInfo = params.floatInfo;
        }
        if (params.layoutWidth !== undefined) {
            this.layoutWidth = params.layoutWidth;
        }
        if (params.layoutHeight !== undefined) {
            this.layoutHeight = params.layoutHeight;
        }
        if (params.imitatorShow !== undefined) {
            this.imitatorShow = params.imitatorShow;
        }
        if (params.imitatorWidth !== undefined) {
            this.imitatorWidth = params.imitatorWidth;
        }
        if (params.imitatorHeight !== undefined) {
            this.imitatorHeight = params.imitatorHeight;
        }
    }
    aboutToBeDeleted() {
        this.__vLayoutAttribute.aboutToBeDeleted();
        this.__floatInfo.aboutToBeDeleted();
        this.__imitatorShow.aboutToBeDeleted();
        this.__imitatorWidth.aboutToBeDeleted();
        this.__imitatorHeight.aboutToBeDeleted();
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
    private __floatInfo: ObservedPropertyObject<FixAreaAttributes>; //属性
    get floatInfo() {
        return this.__floatInfo.get();
    }
    set floatInfo(newValue: FixAreaAttributes) {
        this.__floatInfo.set(newValue);
    }
    private layoutWidth: number; //获取的容器高度
    private layoutHeight: number; //获取的容器高度
    private __imitatorShow: ObservedPropertySimple<boolean>; //模拟块是否显示
    get imitatorShow() {
        return this.__imitatorShow.get();
    }
    set imitatorShow(newValue: boolean) {
        this.__imitatorShow.set(newValue);
    }
    private __imitatorWidth: ObservedPropertySimple<number>; //模拟块宽度
    get imitatorWidth() {
        return this.__imitatorWidth.get();
    }
    set imitatorWidth(newValue: number) {
        this.__imitatorWidth.set(newValue);
    }
    private __imitatorHeight: ObservedPropertySimple<number>; //模拟块高度
    get imitatorHeight() {
        return this.__imitatorHeight.get();
    }
    set imitatorHeight(newValue: number) {
        this.__imitatorHeight.set(newValue);
    }
    aboutToAppear() {
        this.defaultValueInit();
    }
    defaultValueInit() {
        this.floatInfo = {
            range: this.vLayoutAttribute?.range == undefined ? [] : this.vLayoutAttribute.range,
            layoutWidth: this.vLayoutAttribute?.layoutWidth,
            layoutHeight: this.vLayoutAttribute?.layoutHeight,
            aspectRatio: this.vLayoutAttribute?.aspectRatio,
            bgColor: this.vLayoutAttribute?.bgColor == undefined ? 'rgba(0,0,0,0)' : this.vLayoutAttribute.bgColor,
            xOffset: this.vLayoutAttribute?.xOffset == undefined ? 0 : this.vLayoutAttribute.xOffset,
            yOffset: this.vLayoutAttribute?.yOffset == undefined ? 0 : this.vLayoutAttribute.yOffset,
            alignType: this.vLayoutAttribute?.alignType,
            defaultLocation: this.vLayoutAttribute?.defaultLocation,
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
        if (this.floatInfo.padding?.length == 4) {
            this.floatInfo.topPadding = this.floatInfo.padding[0];
            this.floatInfo.rightPadding = this.floatInfo.padding[1];
            this.floatInfo.bottomPadding = this.floatInfo.padding[2];
            this.floatInfo.leftPadding = this.floatInfo.padding[3];
        }
        if (this.floatInfo.margin?.length == 4) {
            this.floatInfo.topMargin = this.floatInfo.margin[0];
            this.floatInfo.rightMargin = this.floatInfo.margin[1];
            this.floatInfo.bottomMargin = this.floatInfo.margin[2];
            this.floatInfo.leftMargin = this.floatInfo.margin[3];
        }
        if (this.floatInfo.defaultLocation?.length == 2) {
            this.floatInfo.xOffset = this.floatInfo.defaultLocation[0];
            this.floatInfo.yOffset = this.floatInfo.defaultLocation[1];
        }
        this.initComponentSize();
        this.computedRange();
        this.computedAlignType();
    }
    initComponentSize() {
        //当容器宽度layoutWidth定义了，无法同时给左右外边距
        //当容器纵横比aspectRatio定义了就相当于容器宽度layoutWidth定义了
        //八种情况下只有两种情况同时给定左右外边距能生效
        if (this.floatInfo.layoutWidth == undefined && this.floatInfo.layoutHeight == undefined && this.floatInfo.aspectRatio == undefined) {
            this.floatInfo.layoutWidth = undefined;
            this.floatInfo.layoutHeight = 100;
            this.floatInfo.aspectRatio = undefined;
        }
        else if (this.floatInfo.layoutWidth != undefined && this.floatInfo.layoutHeight == undefined && this.floatInfo.aspectRatio == undefined) {
            this.floatInfo.layoutWidth = this.floatInfo.layoutWidth;
            this.floatInfo.layoutHeight = 100;
            this.floatInfo.aspectRatio = undefined;
        }
        else if (this.floatInfo.layoutWidth == undefined && this.floatInfo.layoutHeight != undefined && this.floatInfo.aspectRatio == undefined) {
            this.floatInfo.layoutWidth = undefined;
            this.floatInfo.layoutHeight = this.floatInfo.layoutHeight;
            this.floatInfo.aspectRatio = undefined;
        }
        else if (this.floatInfo.layoutWidth == undefined && this.floatInfo.layoutHeight == undefined && this.floatInfo.aspectRatio != undefined) {
            this.floatInfo.layoutWidth = undefined;
            this.floatInfo.layoutHeight = undefined;
            this.floatInfo.aspectRatio = this.floatInfo.aspectRatio;
        }
        else if (this.floatInfo.layoutWidth != undefined && this.floatInfo.layoutHeight != undefined && this.floatInfo.aspectRatio != undefined) {
            this.floatInfo.layoutWidth = this.floatInfo.layoutWidth;
            this.floatInfo.layoutHeight = undefined;
            this.floatInfo.aspectRatio = this.floatInfo.aspectRatio;
        }
        else if (this.floatInfo.layoutWidth != undefined && this.floatInfo.layoutHeight != undefined && this.floatInfo.aspectRatio == undefined) {
            this.floatInfo.layoutWidth = this.floatInfo.layoutWidth;
            this.floatInfo.layoutHeight = this.floatInfo.layoutHeight;
            this.floatInfo.aspectRatio = undefined;
        }
        else if (this.floatInfo.layoutWidth != undefined && this.floatInfo.layoutHeight == undefined && this.floatInfo.aspectRatio != undefined) {
            this.floatInfo.layoutWidth = this.floatInfo.layoutWidth;
            this.floatInfo.layoutHeight = undefined;
            this.floatInfo.aspectRatio = this.floatInfo.aspectRatio;
        }
        else if (this.floatInfo.layoutWidth == undefined && this.floatInfo.layoutHeight != undefined && this.floatInfo.aspectRatio != undefined) {
            this.floatInfo.layoutWidth = undefined;
            this.floatInfo.layoutHeight = this.floatInfo.layoutHeight;
            this.floatInfo.aspectRatio = this.floatInfo.aspectRatio;
        }
        else {
            console.error(TAG + 'else');
        }
    }
    computedRange() {
        //可显示的条目range数组长度为2并且数组元素内第一项大于等于0并且第二项大于第一项
        if (this.floatInfo.range && this.floatInfo.range.length == 2 && this.floatInfo.range[0] >= 0 && this.floatInfo.range[1] > this.floatInfo.range[0]) {
            this.vLayoutData = this.vLayoutData.splice(this.floatInfo.range[0], this.floatInfo.range[1]);
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
            let screenWidth: number = px2vp(displayClass.width);
            let screenHeight: number = px2vp(displayClass.height);
            if (this.floatInfo.alignType == AlignType.TOP_LEFT) { //左上
                this.floatInfo.xOffset = 0;
                this.floatInfo.yOffset = 0;
            }
            else if (this.floatInfo.alignType == AlignType.TOP_RIGHT) { //右上
                this.floatInfo.xOffset = screenWidth - this.layoutWidth;
                this.floatInfo.yOffset = 0;
            }
            else if (this.floatInfo.alignType == AlignType.BOTTOM_LEFT) { //左下
                this.floatInfo.xOffset = 0;
                this.floatInfo.yOffset = screenHeight - this.layoutHeight;
            }
            else if (this.floatInfo.alignType == AlignType.BOTTOM_RIGHT) { //右下
                this.floatInfo.xOffset = screenWidth - this.layoutWidth;
                this.floatInfo.yOffset = screenHeight - this.layoutHeight;
            }
            else {
                this.floatInfo.xOffset = this.floatInfo.xOffset;
                this.floatInfo.yOffset = this.floatInfo.yOffset;
            }
            if (this.floatInfo.defaultLocation?.length == 2) {
                this.floatInfo.xOffset = Number(this.floatInfo.xOffset) + this.floatInfo.defaultLocation[0];
                this.floatInfo.yOffset = Number(this.floatInfo.yOffset) + this.floatInfo.defaultLocation[1];
            }
        }
        catch (exception) {
            console.error('Failed to obtain the default display object. Code: ' + JSON.stringify(exception));
        }
        console.info(TAG + 'xOffset = ' + this.floatInfo.xOffset + ', yOffset = ' + this.floatInfo.yOffset);
    }
    getSize(id: string): Array<number> {
        let info: any = JSON.parse(getInspectorByKey(id));
        let rectStr: string[] = info.$rect
            .replace('][', ',')
            .replace('[', '')
            .replace(']', '')
            .replace(' ', '')
            .split(',');
        return [Number(rectStr[2]) - Number(rectStr[0]), Number(rectStr[3]) - Number(rectStr[1])];
    }
    render() {
        Stack.create();
        Stack.onTouch((e: TouchEvent) => {
            if (e.type === TouchType.Down) {
                //拷贝块样式
                let areaInfo = e.target.area;
                //断言数据类型
                this.imitatorWidth = areaInfo.width as number;
                this.imitatorHeight = areaInfo.height as number;
                this.floatInfo.xOffset = areaInfo.globalPosition.x as number;
                this.floatInfo.yOffset = areaInfo.globalPosition.y as number;
                //拷贝完成，展示模拟块
                this.imitatorShow = true;
            }
            else if (e.type === TouchType.Move) {
                this.floatInfo.xOffset = e.touches[0].screenX - this.imitatorWidth / 2;
                this.floatInfo.yOffset = e.touches[0].screenY - this.imitatorHeight / 2;
            }
            else if (e.type === TouchType.Up) {
                this.imitatorShow = false;
                let displayClass: display.Display | null = null;
                display.getDefaultDisplay().then((data) => {
                    displayClass = data;
                    if (this.floatInfo.xOffset && this.floatInfo.xOffset < (px2vp(displayClass.width) / 2)) {
                        this.floatInfo.xOffset = 0;
                    }
                    else {
                        this.floatInfo.xOffset = px2vp(displayClass.width) - this.imitatorWidth;
                    }
                }).catch((err: BusinessError) => {
                    console.error(TAG + 'getDefaultDisplay error: ' + JSON.stringify(err));
                });
            }
            else if (e.type === TouchType.Cancel) {
                console.error(TAG + 'Cancel');
            }
            else {
                console.error(TAG + 'else');
            }
        });
        Stack.id('FLOAT');
        Stack.onAppear(() => {
            let mSize: number[] = this.getSize('FLOAT');
            this.layoutWidth = px2vp(mSize[0]);
            this.layoutHeight = px2vp(mSize[1]);
            console.info(TAG + 'layoutWidth = ' + this.layoutWidth + ', layoutHeight = ' + this.layoutHeight);
            this.computedAlignType();
        });
        Stack.width(this.floatInfo.layoutWidth);
        Stack.height(this.floatInfo.layoutHeight);
        Stack.aspectRatio(this.floatInfo.aspectRatio);
        Stack.backgroundColor(this.floatInfo.bgColor);
        Stack.position({
            x: this.floatInfo.xOffset,
            y: this.floatInfo.yOffset
        });
        Stack.zIndex(this.floatInfo.zIndex);
        Stack.padding({
            top: this.floatInfo.topPadding,
            right: this.floatInfo.rightPadding,
            bottom: this.floatInfo.bottomPadding,
            left: this.floatInfo.leftPadding
        });
        Stack.margin({
            top: this.floatInfo.topMargin,
            right: this.floatInfo.rightMargin,
            bottom: this.floatInfo.bottomMargin,
            left: this.floatInfo.leftMargin
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.vLayoutData), (item: any, position: number) => {
            this.vLayoutContent(item, position, this);
            If.create();
            if (this.imitatorShow) {
                If.branchId(0);
                Stack.create();
                Stack.width(this.imitatorWidth);
                Stack.height(this.imitatorHeight);
                Stack.backgroundColor(0x66EEEEEE);
                this.vLayoutContent(item, position, this);
                Stack.pop();
            }
            If.pop();
        });
        ForEach.pop();
        Stack.pop();
    }
}
