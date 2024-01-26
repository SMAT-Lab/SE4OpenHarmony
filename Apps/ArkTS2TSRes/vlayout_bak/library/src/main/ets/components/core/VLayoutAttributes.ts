let __generate__Id: number = 0;
function generateId(): string {
    return "VLayoutAttributes_" + ++__generate__Id;
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
export class GridAttributes {
    /*
     * GridLayoutHelper
     * RangeGridLayoutHelper
     */
    range?: Array<number>; //可显示的条目，默认值为[0,数据源长度]
    spanCount?: number; //列数，默认值为1
    weights?: Array<number>; //列占比集合：数组元素数值约分为占比，默认值为[100]
    autoExpand?: boolean; //余子项宽度自适应，当weights未定义时有效，且与colsSpan存在互斥关系，默认值为true
    aspectRatio?: number; //GridItem的单行纵横比，默认值为0
    layoutHeight?: Length; //Grid容器高度
    bgColor?: ResourceColor; //Grid容器背景颜色，默认值为透明
    zIndex?: number; //z序，默认值为0
    gap?: number; //行列间距，默认值为0
    vGap?: number; //行与行的间距，默认值为0
    hGap?: number; //列与列的间距，默认值为0
    padding?: Length[]; //内边距，默认值为[]，优先级比单给内边距高
    topPadding?: Length; //上内边距，默认值为0
    rightPadding?: Length; //右内边距，默认值为0
    bottomPadding?: Length; //下内边距，默认值为0
    leftPadding?: Length; //左内边距，默认值为0
    margin?: Length[]; //外边距，默认值为[]，优先级比单给外边距高
    topMargin?: Length; //上外边距，默认值为0
    rightMargin?: Length; //右外边距，默认值为0
    bottomMargin?: Length; //下外边距，默认值为0
    leftMargin?: Length; //左外边距，默认值为0
}
export class StaggeredGridAttributes {
    /*
     * StaggeredGridLayoutHelper
     */
    range?: Array<number>; //可显示的条目，默认值为[0,数据源长度]
    lanes?: number; //列数，默认值为1
    bgColor?: ResourceColor; //容器背景颜色，默认值为透明
    zIndex?: number; //z序，默认值为0
    gap?: number; //行列间距，默认值为0
    vGap?: number; //行与行的间距，默认值为0
    hGap?: number; //列与列的间距，默认值为0
    padding?: Length[]; //内边距，默认值为[]，优先级比单给内边距高
    topPadding?: Length; //上内边距，默认值为0
    rightPadding?: Length; //右内边距，默认值为0
    bottomPadding?: Length; //下内边距，默认值为0
    leftPadding?: Length; //左内边距，默认值为0
    margin?: Length[]; //外边距，默认值为[]，优先级比单给外边距高
    topMargin?: Length; //上外边距，默认值为0
    rightMargin?: Length; //右外边距，默认值为0
    bottomMargin?: Length; //下外边距，默认值为0
    leftMargin?: Length; //左外边距，默认值为0
}
export class AbstractFullFillAttributes {
    /*
     * SingleLayoutHelper
     * ColumnLayoutHelper
     * OnePlusNLayoutHelper
     * OnePlusNLayoutHelperEx
     */
    range?: Array<number>; //可显示的条目，默认值为[0,数据源长度]
    rowWeights?: Array<number>; //行权重，默认值为[]，仅OnePlusNLayoutHelper、OnePlusNLayoutHelperEx支持
    colWeights?: Array<number>; //列权重，默认值为[]
    hasHeader?: boolean; //第一个子项变成一行一列，默认值为false，仅OnePlusNLayoutHelper支持
    hasFooter?: boolean; //最后一个子项变成一行一列，默认值为false，仅OnePlusNLayoutHelper支持
    layoutWidth?: Length; //容器宽度
    layoutHeight?: Length; //容器高度
    aspectRatio?: number; //容器纵横比
    bgColor?: ResourceColor; //容器背景颜色，默认值为透明
    zIndex?: number; //z序，默认值为0
    padding?: Length[]; //内边距，默认值为[]，优先级比单给内边距高
    topPadding?: Length; //上内边距，默认值为0
    rightPadding?: Length; //右内边距，默认值为0
    bottomPadding?: Length; //下内边距，默认值为0
    leftPadding?: Length; //左内边距，默认值为0
    margin?: Length[]; //外边距，默认值为[]，优先级比单给外边距高
    topMargin?: Length; //上外边距，默认值为0
    rightMargin?: Length; //右外边距，默认值为0
    bottomMargin?: Length; //下外边距，默认值为0
    leftMargin?: Length; //左外边距，默认值为0
}
export class BannerAttributes {
    /*
     * BannerLayoutHelper
     */
    range?: Array<number>; //可显示的条目，默认值为[0,数据源长度]
    layoutWidth?: Length; //容器宽度
    layoutHeight?: Length; //容器高度
    aspectRatio?: number; //容器纵横比
    bgColor?: ResourceColor; //容器背景颜色，默认值为透明
    layoutIndex?: number; //设置当前在容器中显示的子组件的索引值，默认值为0
    layoutAutoPlay?: boolean; //子组件是否自动播放，自动播放状态下，导航点不可操作，默认值为false
    layoutInterval?: number; //使用自动播放时播放的时间间隔，单位为毫秒，默认值为1000
    layoutIndicator?: boolean; //是否启用导航点指示器，默认值为false
    layoutLoop?: boolean; //是否开启循环，默认值为false
    layoutDuration?: number; //子组件切换的动画时长，单位为毫秒，默认值为400
    layoutVertical?: boolean; //是否为纵向滑动，默认值为false
    layoutItemSpace?: number | string; //设置子组件与子组件之间间隙，默认值为0
    layoutEffectMode?: EdgeEffect; //滑动效果，默认值为None
    zIndex?: number; //z序，默认值为0
    padding?: Length[]; //内边距，默认值为[]，优先级比单给内边距高
    topPadding?: Length; //上内边距，默认值为0
    rightPadding?: Length; //右内边距，默认值为0
    bottomPadding?: Length; //下内边距，默认值为0
    leftPadding?: Length; //左内边距，默认值为0
    margin?: Length[]; //外边距，默认值为[]，优先级比单给外边距高
    topMargin?: Length; //上外边距，默认值为0
    rightMargin?: Length; //右外边距，默认值为0
    bottomMargin?: Length; //下外边距，默认值为0
    leftMargin?: Length; //左外边距，默认值为0
}
export class LinearAttributes {
    /*
     * LinearLayoutHelper
     * DefaultLayoutHelper
     */
    range?: Array<number>; //可显示的条目，默认值为[0,数据源长度]
    dividerHeight?: number | string; //列表项垂直间距，默认值为0
    layoutHeight?: Length; //容器高度
    aspectRatio?: number; //ListItem的单行纵横比，默认值为0
    bgColor?: ResourceColor; //容器背景颜色，默认值为透明
    zIndex?: number; //z序，默认值为0
    padding?: Length[]; //内边距，默认值为[]，优先级比单给内边距高
    topPadding?: Length; //上内边距，默认值为0
    rightPadding?: Length; //右内边距，默认值为0
    bottomPadding?: Length; //下内边距，默认值为0
    leftPadding?: Length; //左内边距，默认值为0
    margin?: Length[]; //外边距，默认值为[]，优先级比单给外边距高
    topMargin?: Length; //上外边距，默认值为0
    rightMargin?: Length; //右外边距，默认值为0
    bottomMargin?: Length; //下外边距，默认值为0
    leftMargin?: Length; //左外边距，默认值为0
}
export enum AlignType {
    TOP_LEFT = 0,
    TOP_RIGHT = 1,
    BOTTOM_LEFT = 2,
    BOTTOM_RIGHT = 3
}
export class FixAreaAttributes {
    /*
     * FixLayoutHelper
     * ScrollFixLayoutHelper
     * StickyLayoutHelper
     * FloatLayoutHelper
     */
    range?: Array<number>; //可显示的条目，默认值为[0,数据源长度]
    layoutWidth?: Length; //容器宽度
    layoutHeight?: Length; //容器高度，当容器纵横比为0时有效
    aspectRatio?: number; //容器纵横比
    bgColor?: ResourceColor; //容器背景颜色，默认值为透明
    xOffset?: Length; //水平偏移量，默认值为0，只有StickyLayoutHelper不支持
    yOffset?: Length; //竖直偏移量，默认值为0，只有StickyLayoutHelper不支持
    alignType?: AlignType; //固定的位置，只有StickyLayoutHelper不支持，优先级比单给xy高，FloatLayoutHelper中与defaultLocation进行累加
    sketchMeasure?: boolean; //宽度占满屏幕，只有FixLayoutHelper, ScrollFixLayoutHelper支持
    stickyStart?: boolean; //true：吸顶，false：吸底，只有StickyLayoutHelper支持
    defaultLocation?: number[]; //默认位置，只有FloatLayoutHelper支持，优先级比单给xy高，与alignType进行累加
    zIndex?: number; //z序，默认值为0
    padding?: Length[]; //内边距，默认值为[]，优先级比单给内边距高
    topPadding?: Length; //上内边距，默认值为0
    rightPadding?: Length; //右内边距，默认值为0
    bottomPadding?: Length; //下内边距，默认值为0
    leftPadding?: Length; //左内边距，默认值为0
    margin?: Length[]; //外边距，默认值为[]，优先级比单给外边距高
    topMargin?: Length; //上外边距，默认值为0
    rightMargin?: Length; //右外边距，默认值为0
    bottomMargin?: Length; //下外边距，默认值为0
    leftMargin?: Length; //左外边距，默认值为0
}
export class dataType {
    layoutData: number[] | layoutDataType[] | string[] = [];
    rowsTemplate?: string[] = [];
}
export class layoutDataType {
    layoutText: number | string = 0;
    colsSpan?: number = 0;
    layoutColor?: string = '#FF0000';
    layoutWeight?: number = 1;
    textSize?: number = 25;
    textColor?: string = '#999999';
    bgColor?: string = '#CFCFCF';
    top?: number = 0;
    left?: number = 0;
    tag?: string = '';
}
