interface BANNER_LAYOUT_Params {
    vLayoutContent?: (item?: ESObject, position?: number) => ESObject //布局
    ;
    vLayoutData?: layoutDataType[] | number[] | string[];
    vLayoutAttribute?: BannerAttributes;
    bannerInfo?: BannerAttributes;
    layoutHeight?: number | undefined;
    itemWidth?: number;
    itemHeight?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BannerLayoutHelper_" + ++__generate__Id;
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
import { BannerAttributes, layoutDataType } from '../core/VLayoutAttributes';
const TAG = 'vlayout BANNER_LAYOUT ';
export class BANNER_LAYOUT extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.vLayoutContent = undefined;
        this.vLayoutData = [] //数据源
        ;
        this.__vLayoutAttribute = new ObservedPropertyObject({} //属性
        , this, "vLayoutAttribute");
        this.__bannerInfo = new ObservedPropertyObject({} //属性
        , this, "bannerInfo");
        this.__layoutHeight = new ObservedPropertyObject(undefined //banner布局的高度
        , this, "layoutHeight");
        this.itemWidth = 0 //每个item的宽度
        ;
        this.itemHeight = 0 //每个item的高度
        ;
        this.updateWithValueParams(params);
        this.declareWatch("vLayoutAttribute", this.defaultValueInit);
    }
    updateWithValueParams(params: BANNER_LAYOUT_Params) {
        if (params.vLayoutContent !== undefined) {
            this.vLayoutContent = params.vLayoutContent;
        }
        if (params.vLayoutData !== undefined) {
            this.vLayoutData = params.vLayoutData;
        }
        if (params.vLayoutAttribute !== undefined) {
            this.vLayoutAttribute = params.vLayoutAttribute;
        }
        if (params.bannerInfo !== undefined) {
            this.bannerInfo = params.bannerInfo;
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
        this.__bannerInfo.aboutToBeDeleted();
        this.__layoutHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __vLayoutContent; //布局
    private vLayoutData: layoutDataType[] | number[] | string[]; //数据源
    private __vLayoutAttribute?: ObservedPropertyObject<BannerAttributes>; //属性
    get vLayoutAttribute() {
        return this.__vLayoutAttribute.get();
    }
    set vLayoutAttribute(newValue: BannerAttributes) {
        this.__vLayoutAttribute.set(newValue);
    }
    private __bannerInfo: ObservedPropertyObject<BannerAttributes>; //属性
    get bannerInfo() {
        return this.__bannerInfo.get();
    }
    set bannerInfo(newValue: BannerAttributes) {
        this.__bannerInfo.set(newValue);
    }
    private __layoutHeight: ObservedPropertyObject<number | undefined>; //banner布局的高度
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
        this.bannerInfo = {
            range: this.vLayoutAttribute?.range == undefined ? [] : this.vLayoutAttribute.range,
            layoutWidth: this.vLayoutAttribute?.layoutWidth,
            layoutHeight: this.vLayoutAttribute?.layoutHeight,
            aspectRatio: this.vLayoutAttribute?.aspectRatio,
            bgColor: this.vLayoutAttribute?.bgColor == undefined ? 'rgba(0,0,0,0)' : this.vLayoutAttribute.bgColor,
            layoutIndex: this.vLayoutAttribute?.layoutIndex == undefined ? 0 : this.vLayoutAttribute.layoutIndex,
            layoutAutoPlay: this.vLayoutAttribute?.layoutAutoPlay == undefined ? false : this.vLayoutAttribute.layoutAutoPlay,
            layoutInterval: this.vLayoutAttribute?.layoutInterval == undefined ? 1000 : this.vLayoutAttribute.layoutInterval,
            layoutIndicator: this.vLayoutAttribute?.layoutIndicator == undefined ? false : this.vLayoutAttribute.layoutIndicator,
            layoutLoop: this.vLayoutAttribute?.layoutLoop == undefined ? false : this.vLayoutAttribute.layoutLoop,
            layoutDuration: this.vLayoutAttribute?.layoutDuration == undefined ? 400 : this.vLayoutAttribute.layoutDuration,
            layoutVertical: this.vLayoutAttribute?.layoutVertical == undefined ? false : this.vLayoutAttribute.layoutVertical,
            layoutItemSpace: this.vLayoutAttribute?.layoutItemSpace == undefined ? 0 : this.vLayoutAttribute.layoutItemSpace,
            layoutEffectMode: this.vLayoutAttribute?.layoutEffectMode == undefined ? EdgeEffect.None : this.vLayoutAttribute.layoutEffectMode,
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
        if (this.bannerInfo.padding?.length == 4) {
            this.bannerInfo.topPadding = this.bannerInfo.padding[0];
            this.bannerInfo.rightPadding = this.bannerInfo.padding[1];
            this.bannerInfo.bottomPadding = this.bannerInfo.padding[2];
            this.bannerInfo.leftPadding = this.bannerInfo.padding[3];
        }
        if (this.bannerInfo.margin?.length == 4) {
            this.bannerInfo.topMargin = this.bannerInfo.margin[0];
            this.bannerInfo.rightMargin = this.bannerInfo.margin[1];
            this.bannerInfo.bottomMargin = this.bannerInfo.margin[2];
            this.bannerInfo.leftMargin = this.bannerInfo.margin[3];
        }
        this.initComponentSize();
        this.computedRange();
    }
    initComponentSize() {
        //当容器宽度layoutWidth定义了，无法同时给左右外边距
        //当容器纵横比aspectRatio定义了就相当于容器宽度layoutWidth定义了
        //八种情况下只有两种情况同时给定左右外边距能生效
        if (this.bannerInfo.layoutWidth == undefined && this.bannerInfo.layoutHeight == undefined && this.bannerInfo.aspectRatio == undefined) {
            this.bannerInfo.layoutWidth = undefined;
            this.bannerInfo.layoutHeight = undefined;
            this.bannerInfo.aspectRatio = undefined;
        }
        else if (this.bannerInfo.layoutWidth != undefined && this.bannerInfo.layoutHeight == undefined && this.bannerInfo.aspectRatio == undefined) {
            this.bannerInfo.layoutWidth = this.bannerInfo.layoutWidth;
            this.bannerInfo.layoutHeight = undefined;
            this.bannerInfo.aspectRatio = undefined;
        }
        else if (this.bannerInfo.layoutWidth == undefined && this.bannerInfo.layoutHeight != undefined && this.bannerInfo.aspectRatio == undefined) {
            this.bannerInfo.layoutWidth = undefined;
            this.bannerInfo.layoutHeight = this.bannerInfo.layoutHeight;
            this.bannerInfo.aspectRatio = undefined;
        }
        else if (this.bannerInfo.layoutWidth == undefined && this.bannerInfo.layoutHeight == undefined && this.bannerInfo.aspectRatio != undefined) {
            this.bannerInfo.layoutWidth = undefined;
            this.bannerInfo.layoutHeight = undefined;
            this.bannerInfo.aspectRatio = this.bannerInfo.aspectRatio;
        }
        else if (this.bannerInfo.layoutWidth != undefined && this.bannerInfo.layoutHeight != undefined && this.bannerInfo.aspectRatio != undefined) {
            this.bannerInfo.layoutWidth = this.bannerInfo.layoutWidth;
            this.bannerInfo.layoutHeight = this.bannerInfo.layoutHeight;
            this.bannerInfo.aspectRatio = this.bannerInfo.aspectRatio;
        }
        else if (this.bannerInfo.layoutWidth != undefined && this.bannerInfo.layoutHeight != undefined && this.bannerInfo.aspectRatio == undefined) {
            this.bannerInfo.layoutWidth = this.bannerInfo.layoutWidth;
            this.bannerInfo.layoutHeight = this.bannerInfo.layoutHeight;
            this.bannerInfo.aspectRatio = undefined;
        }
        else if (this.bannerInfo.layoutWidth != undefined && this.bannerInfo.layoutHeight == undefined && this.bannerInfo.aspectRatio != undefined) {
            this.bannerInfo.layoutWidth = this.bannerInfo.layoutWidth;
            this.bannerInfo.layoutHeight = undefined;
            this.bannerInfo.aspectRatio = this.bannerInfo.aspectRatio;
        }
        else if (this.bannerInfo.layoutWidth == undefined && this.bannerInfo.layoutHeight != undefined && this.bannerInfo.aspectRatio != undefined) {
            this.bannerInfo.layoutWidth = undefined;
            this.bannerInfo.layoutHeight = this.bannerInfo.layoutHeight;
            this.bannerInfo.aspectRatio = this.bannerInfo.aspectRatio;
        }
        else {
            console.error(TAG + 'initComponentSize else');
        }
    }
    computedRange() {
        //可显示的条目range数组长度为2并且数组元素内第一项大于等于0并且第二项大于第一项
        if (this.bannerInfo.range?.length == 2 && this.bannerInfo.range[0] >= 0 && this.bannerInfo.range[1] > this.bannerInfo.range[0]) {
            this.vLayoutData = this.vLayoutData.splice(this.bannerInfo.range[0], this.bannerInfo.range[1]);
        }
        else {
            this.vLayoutData = this.vLayoutData;
        }
        console.info(TAG + 'vLayoutData = ' + JSON.stringify(this.vLayoutData));
    }
    computedHeight() {
        this.layoutHeight = this.itemHeight;
        this.computedExtraHeight();
        console.warn(TAG + 'computedHeight layoutHeight = ' + this.layoutHeight);
    }
    computedExtraHeight() {
        if (this.bannerInfo.topPadding && this.layoutHeight) {
            if (this.bannerInfo.topPadding >= 0 && typeof (this.bannerInfo.topPadding) == 'number') {
                this.layoutHeight = this.layoutHeight + this.bannerInfo.topPadding;
            }
            else if (typeof (this.bannerInfo.topPadding) == 'string' && this.bannerInfo.topPadding != '' && this.bannerInfo.topPadding.includes('%')) {
                let topPadding = Number(this.bannerInfo.topPadding.substring(0, this.bannerInfo.topPadding.indexOf('%'))) * 0.01 * this.layoutHeight;
                this.layoutHeight = this.layoutHeight + topPadding;
            }
            else {
                console.error(TAG + 'something else topPadding');
            }
        }
        if (this.bannerInfo.bottomPadding && this.layoutHeight) {
            if (this.bannerInfo.bottomPadding >= 0 && typeof (this.bannerInfo.bottomPadding) == 'number') {
                this.layoutHeight = this.layoutHeight + this.bannerInfo.bottomPadding;
            }
            else if (typeof (this.bannerInfo.bottomPadding) == 'string' && this.bannerInfo.bottomPadding != '' && this.bannerInfo.bottomPadding.includes('%')) {
                let bottomPadding = Number(this.bannerInfo.bottomPadding.substring(0, this.bannerInfo.bottomPadding.indexOf('%'))) * 0.01 * this.layoutHeight;
                this.layoutHeight = this.layoutHeight + bottomPadding;
            }
            else {
                console.error(TAG + 'something else bottomPadding');
            }
        }
    }
    render() {
        Column.create();
        Column.backgroundColor(this.bannerInfo.bgColor);
        Column.zIndex(this.bannerInfo.zIndex);
        Column.margin({
            top: this.bannerInfo.topMargin,
            right: this.bannerInfo.rightMargin,
            bottom: this.bannerInfo.bottomMargin,
            left: this.bannerInfo.leftMargin
        });
        Swiper.create();
        Swiper.width(this.bannerInfo.layoutWidth);
        Swiper.height(this.bannerInfo.layoutHeight == undefined ? this.layoutHeight : this.bannerInfo.layoutHeight);
        Swiper.aspectRatio(this.bannerInfo.aspectRatio);
        Swiper.index(this.bannerInfo.layoutIndex);
        Swiper.autoPlay(this.bannerInfo.layoutAutoPlay);
        Swiper.interval(this.bannerInfo.layoutInterval);
        Swiper.indicator(this.bannerInfo.layoutIndicator);
        Swiper.loop(this.bannerInfo.layoutLoop);
        Swiper.duration(this.bannerInfo.layoutDuration);
        Swiper.vertical(this.bannerInfo.layoutVertical);
        Swiper.itemSpace(this.bannerInfo.layoutItemSpace);
        Swiper.effectMode(this.bannerInfo.layoutEffectMode);
        Swiper.padding({
            top: this.bannerInfo.topPadding,
            right: this.bannerInfo.rightPadding,
            bottom: this.bannerInfo.bottomPadding,
            left: this.bannerInfo.leftPadding
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
        Swiper.pop();
        Column.pop();
    }
}
