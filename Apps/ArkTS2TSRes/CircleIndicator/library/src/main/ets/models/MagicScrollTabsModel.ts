let __generate__Id: number = 0;
function generateId(): string {
    return "MagicScrollTabsModel_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import curves from '@ohos.curves';
import BaseModel from './BaseModel';
import ComputeTextWidth from "../components/inner_components/computeTextWidth";
import { length2Vp } from '../utils/UiUtil';
import common from '@ohos.app.ability.common';
//  DefaultText : 默认，切换后文字状态修改
//  ClipText: 通过两层文字剪切进行修改状态
//  ColorFlipText：文字在过程过半后修改颜色
//  ColorGradientText：文字在过程中渐变颜色与大小
export enum TitleMode {
    DEFAULT = 0,
    COLOR_FLIP = 1,
    COLOR_GRADIENT = 2,
    CLIP = 3
}
export enum CursorType {
    NONE = 0,
    LINE = 1,
    BEZIER = 2,
    WRAP = 3,
    TRIANGLE = 4
}
export enum DividerWidthMode {
    MODE_MATCH_EDGE = 0,
    MODE_WRAP_CONTENT = 1,
    MODE_EXACTLY = 2
}
const DEFAULT_HEIGHT: Length = '40vp';
const DEFAULT_TEXT_SIZE: number = 16;
const DEFAULT_INTERVAL: Length = "10vp";
const DEFAULT_TEXT_HOR_PADDING: Length = "8vp";
const DEFAULT_TEXT_VER_PADDING: Length = "6vp";
const DEFAULT_ROUND_RADIUS: Length = "30vp";
const DEFAULT_DIVIDER_WIDTH: Length = "10vp";
const DEFAULT_TRIANGLE_HEIGHT: Length = "5vp";
const DEFAULT_TRIANGLE_WIDTH: Length = "10vp";
const DEFAULT_VIEW_WIDTH: number = lpx2px(720);
const DEFAULT_MAX_NUM: number = 9999;
const DEFAULT_SCROLL_PIVOT_X: number = 0.5;
const DEFAULT_Y_OFFSET: number = 1;
const DEFAULT_MAX_CIRCLE_RADIUS: number = 6;
const DEFAULT_MIN_CIRCLE_RADIUS: number = 4;
const DEFAULT_STROKE_WIDTH: number = 0;
const DEFAULT_LEFT_PADDING: number = 0;
const DEFAULT_RIGHT_PADDING: number = 0;
const DEFAULT_TEXT_COLOR: number | string = 0xaaaaaa;
const DEFAULT_SELECTED_TEXT_COLOR: number | string = 0xff0000;
const DEFAULT_INDICATOR_COLORS: Array<number | string> = [0xffffff];
export class MagicScrollTabsModel extends BaseModel<MagicScrollTabsModel> {
    // 通用
    protected backgroundColor: ResourceColor = $r('app.color.magic_default_background_color');
    // 指示器高度
    protected height: number = length2Vp(getContext(), DEFAULT_HEIGHT);
    private titles: Array<string> = [];
    private arr: Array<string> = [];
    private textSize: number = DEFAULT_TEXT_SIZE;
    private textColor: number | string = DEFAULT_TEXT_COLOR;
    private selectedTextColor: number | string = DEFAULT_SELECTED_TEXT_COLOR;
    // 元素间隔
    private interval: number = length2Vp(getContext(), DEFAULT_INTERVAL);
    // 指示对应tabs宽度
    private viewWidth: number = DEFAULT_VIEW_WIDTH;
    // 文字边距
    private textHorPadding: number = length2Vp(getContext(), DEFAULT_TEXT_HOR_PADDING);
    private textVerPadding: number = length2Vp(getContext(), DEFAULT_TEXT_VER_PADDING);
    private clickListener: (index: number) => void = (index: number) => { };
    // 动画掠过
    private skimOver: boolean = true;
    private clickChange: boolean = false;
    // 滑动偏移
    private leftPadding: number = length2Vp(getContext(), DEFAULT_LEFT_PADDING);
    private rightPadding: number = length2Vp(getContext(), DEFAULT_RIGHT_PADDING);
    private scrollPivotX: number = DEFAULT_SCROLL_PIVOT_X;
    // 自动布局与首行固定
    private adjustMode: boolean = false;
    private pinnedTabView: boolean = false;
    private pinnedTabBgColor: ResourceColor = $r('app.color.pinned_tab_background_color');
    private num: number = DEFAULT_MAX_NUM;
    // 选中背景修改
    private fillColor: ResourceColor = $r('app.color.default_transparent_color');
    private roundRadius: number = length2Vp(getContext(), DEFAULT_ROUND_RADIUS);
    // 选中字体大小修改
    private selectedTextSize: number = 0;
    // 指示器是否处于上层
    private indicatorOnTop: boolean = false;
    // 线条指示器设置
    // 线条高度
    private strokeWidth: number = DEFAULT_STROKE_WIDTH;
    private strokeColor: ResourceColor = $r('app.color.magic_stroke_color');
    private lineRound: boolean = true;
    // 线条宽度
    private dividerWidth: number = length2Vp(getContext(), DEFAULT_DIVIDER_WIDTH);
    private dividerWidthMode: DividerWidthMode = DividerWidthMode.MODE_MATCH_EDGE;
    // 线条指示器位置偏移，正数为下方，负数为上方，值为偏移比例
    private yOffset: number = DEFAULT_Y_OFFSET;
    // 适应布局
    private textModel: ComputeTextWidth.textModel = new ComputeTextWidth.textModel();
    // 字体动画
    private titleMode: TitleMode = TitleMode.DEFAULT;
    // 指示器类型
    private cursorType: CursorType = CursorType.NONE;
    // 贝塞尔指示器
    private maxCircleRadius: number = DEFAULT_MAX_CIRCLE_RADIUS;
    private minCircleRadius: number = DEFAULT_MIN_CIRCLE_RADIUS;
    private indicatorColors: Array<number | string> = DEFAULT_INDICATOR_COLORS;
    // 三角指示器
    private triangleHeight: number = length2Vp(getContext(), DEFAULT_TRIANGLE_HEIGHT);
    private triangleWidth: number = length2Vp(getContext(), DEFAULT_TRIANGLE_WIDTH);
    // 三角指示器反向
    private reverse: boolean = false;
    // 指示器宽度动画
    private leftCurve: any;
    private rightCurve: any;
    private followTouch: boolean = true;
    private enablePivotScroll: boolean = true;
    private smoothScroll: boolean = true;
    constructor(controller: TabsController | null) {
        super(controller);
        if (!!!this.viewWidth) {
            this.viewWidth = lpx2px(720);
        }
    }
    public setFollowTouch(followTouch: boolean): MagicScrollTabsModel {
        this.followTouch = followTouch;
        return this;
    }
    public isFollowTouch(): boolean {
        return this.followTouch;
    }
    public setSmoothScroll(smoothScroll: boolean): MagicScrollTabsModel {
        this.smoothScroll = smoothScroll;
        return this;
    }
    public isSmoothScroll(): boolean {
        return this.smoothScroll;
    }
    public setEnablePivotScroll(enablePivotScroll: boolean): MagicScrollTabsModel {
        this.enablePivotScroll = enablePivotScroll;
        return this;
    }
    public isEnablePivotScroll(): boolean {
        return this.enablePivotScroll;
    }
    public setLeftCurve(leftCurve: any): MagicScrollTabsModel {
        this.leftCurve = leftCurve;
        return this;
    }
    public getLeftCurve(): any {
        return this.leftCurve;
    }
    public setLeftPadding(leftPadding: Length, context?: common.UIAbilityContext): MagicScrollTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.leftPadding = length2Vp(context, leftPadding);
        return this;
    }
    public getLeftPadding(): number {
        return this.leftPadding;
    }
    public setRightPadding(rightPadding: Length, context?: common.UIAbilityContext): MagicScrollTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.rightPadding = length2Vp(context, rightPadding);
        return this;
    }
    public getRightPadding(): number {
        return this.rightPadding;
    }
    public setLineRound(lineRound: boolean): MagicScrollTabsModel {
        this.lineRound = lineRound;
        return this;
    }
    public isLineRound(): boolean {
        return this.lineRound;
    }
    public setRightCurve(rightCurve: any): MagicScrollTabsModel {
        this.rightCurve = rightCurve;
        return this;
    }
    public getRightCurve(): any {
        return this.rightCurve;
    }
    public setRoundRadius(roundRadius: Length, context?: common.UIAbilityContext): MagicScrollTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.roundRadius = length2Vp(context, roundRadius);
        return this;
    }
    public getRoundRadius(): number {
        return this.roundRadius;
    }
    public setTriangleHeight(triangleHeight: Length, context?: common.UIAbilityContext): MagicScrollTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.triangleHeight = length2Vp(context, triangleHeight);
        return this;
    }
    public getTriangleHeight(): number {
        return this.triangleHeight;
    }
    public setTriangleWidth(triangleWidth: Length, context?: common.UIAbilityContext): MagicScrollTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.triangleWidth = length2Vp(context, triangleWidth);
        return this;
    }
    public getTriangleWidth(): number {
        return this.triangleWidth;
    }
    public setCursorType(cursorType: CursorType): MagicScrollTabsModel {
        this.cursorType = cursorType;
        return this;
    }
    public getCursorType(): CursorType {
        return this.cursorType;
    }
    public setIndicatorColors(indicatorColors: Array<number | string> | number | string): MagicScrollTabsModel {
        if (indicatorColors instanceof Array) {
            this.indicatorColors = indicatorColors;
        }
        else {
            this.indicatorColors[0] = indicatorColors;
        }
        return this;
    }
    public getIndicatorColors(): Array<number | string> {
        return this.indicatorColors;
    }
    public setIndicatorOnTop(indicatorOnTop: boolean): MagicScrollTabsModel {
        this.indicatorOnTop = indicatorOnTop;
        return this;
    }
    public isIndicatorOnTop(): boolean {
        return this.indicatorOnTop;
    }
    public setReverse(reverse: boolean): MagicScrollTabsModel {
        this.reverse = reverse;
        return this;
    }
    public isReverse(): boolean {
        return this.reverse;
    }
    public setClickChange(clickChange: boolean): MagicScrollTabsModel {
        this.clickChange = clickChange;
        return this;
    }
    public isClickChange(): boolean {
        return this.clickChange;
    }
    public setHorizontalPadding(textHorPadding: Length, context?: common.UIAbilityContext): MagicScrollTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.textHorPadding = length2Vp(context, textHorPadding);
        return this;
    }
    public getHorizontalPadding(): number {
        return this.textHorPadding;
    }
    public setVerticalPadding(textVerPadding: Length, context?: common.UIAbilityContext): MagicScrollTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.textVerPadding = length2Vp(context, textVerPadding);
        return this;
    }
    public getVerticalPadding(): number {
        return this.textVerPadding;
    }
    public setMaxCircleRadius(maxCircleRadius: number): MagicScrollTabsModel {
        this.maxCircleRadius = maxCircleRadius;
        this.setDividerWidth(maxCircleRadius)
            .setDividerWidthMode(DividerWidthMode.MODE_EXACTLY);
        return this;
    }
    public getMaxCircleRadius(): number {
        return this.maxCircleRadius;
    }
    public setMinCircleRadius(minCircleRadius: number): MagicScrollTabsModel {
        this.minCircleRadius = minCircleRadius;
        return this;
    }
    public getMinCircleRadius(): number {
        return this.minCircleRadius;
    }
    public setSkimOver(skimOver: boolean): MagicScrollTabsModel {
        this.skimOver = skimOver;
        return this;
    }
    public isSkimOver(): boolean {
        return this.skimOver;
    }
    public setClickListener(callback: (index: number) => void): MagicScrollTabsModel {
        this.clickListener = callback;
        return this;
    }
    public getClickListener(): (num: number) => void {
        return this.clickListener;
    }
    public setTitleMode(titleMode: TitleMode): MagicScrollTabsModel {
        this.titleMode = titleMode;
        return this;
    }
    public getTitleMode(): TitleMode {
        return this.titleMode;
    }
    public setAdjustMode(adjustMode: boolean): MagicScrollTabsModel {
        this.adjustMode = adjustMode;
        return this;
    }
    public isAdjustMode(): boolean {
        return this.adjustMode;
    }
    public setViewWidth(viewWidth: number): MagicScrollTabsModel {
        this.viewWidth = viewWidth;
        return this;
    }
    public getViewWidth(): number {
        return this.viewWidth;
    }
    public setScrollPivotX(scrollPivotX: number): MagicScrollTabsModel {
        this.scrollPivotX = scrollPivotX;
        return this;
    }
    public getScrollPivotX(): number {
        return this.scrollPivotX;
    }
    public setInterval(interval: Length, context?: common.UIAbilityContext): MagicScrollTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.interval = length2Vp(context, interval);
        return this;
    }
    public getInterval(): number {
        return this.interval;
    }
    public setUnselectedTextSize(textSize: number): MagicScrollTabsModel {
        this.textSize = textSize;
        return this;
    }
    public getUnselectedTextSize(): number {
        return this.textSize;
    }
    public setSelectedTextSize(selectedTextSize: number): MagicScrollTabsModel {
        this.selectedTextSize = selectedTextSize;
        return this;
    }
    public getSelectedTextSize(): number {
        return this.selectedTextSize;
    }
    public setFillColor(fillColor: ResourceColor): MagicScrollTabsModel {
        this.fillColor = fillColor;
        return this;
    }
    public getFillColor(): ResourceColor {
        return this.fillColor;
    }
    public setUnselectedTextColor(textColor: number | string): MagicScrollTabsModel {
        this.textColor = textColor;
        return this;
    }
    public getUnselectedTextColor(): number | string {
        return this.textColor;
    }
    public setSelectedTextColor(selectedTextColor: number | string): MagicScrollTabsModel {
        this.selectedTextColor = selectedTextColor;
        return this;
    }
    public getSelectedTextColor(): number | string {
        return this.selectedTextColor;
    }
    public setPinnedTabBgColor(pinnedTabBgColor: ResourceColor): MagicScrollTabsModel {
        this.pinnedTabBgColor = pinnedTabBgColor;
        return this;
    }
    public getPinnedTabBgColor(): ResourceColor {
        return this.pinnedTabBgColor;
    }
    public setPinnedTabView(pinnedTabView: boolean): MagicScrollTabsModel {
        this.pinnedTabView = pinnedTabView;
        return this;
    }
    public isPinnedTabView(): boolean {
        return this.pinnedTabView;
    }
    public setStrokeWidth(strokeWidth: number): MagicScrollTabsModel {
        this.strokeWidth = strokeWidth;
        return this;
    }
    public getStrokeWidth(): number {
        return this.strokeWidth;
    }
    public setStrokeColor(strokeColor: ResourceColor): MagicScrollTabsModel {
        this.strokeColor = strokeColor;
        return this;
    }
    public getStrokeColor(): ResourceColor {
        return this.strokeColor;
    }
    public setYOffset(yOffset: number): MagicScrollTabsModel {
        this.yOffset = yOffset;
        return this;
    }
    public getYOffset(): number {
        return this.yOffset;
    }
    public setDividerWidth(dividerWidth: Length, context?: common.UIAbilityContext): MagicScrollTabsModel {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.dividerWidth = length2Vp(context, dividerWidth);
        return this;
    }
    public getDividerWidth(): number {
        return this.dividerWidth;
    }
    public setDividerWidthMode(dividerWidthMode: DividerWidthMode): MagicScrollTabsModel {
        this.dividerWidthMode = dividerWidthMode;
        return this;
    }
    public getDividerWidthMode(): DividerWidthMode {
        return this.dividerWidthMode;
    }
    public setMaxNum(num: number): MagicScrollTabsModel {
        this.num = num;
        return this;
    }
    public getMaxNum(): number {
        return this.num;
    }
    public setTitles(titles: Array<string>): MagicScrollTabsModel {
        this.titles = titles;
        this.arr = titles;
        return this;
    }
    public getTitles(): Array<string> {
        return this.titles;
    }
    public getTextModel(): ComputeTextWidth.textModel {
        return this.textModel;
    }
}
