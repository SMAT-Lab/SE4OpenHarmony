let __generate__Id: number = 0;
function generateId(): string {
    return "Paint_" + ++__generate__Id;
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
/**
 * 画笔属性类，用于绘制时使用画笔属性
 * @param value
 */
export default class Paint {
    styleType: Style = Style.FILL_AND_STROKE;
    globalAlpha: number | undefined = undefined;
    globalCompositeOperation: string = 'source-over';
    fillStyle: string | number | CanvasGradient | CanvasPattern = Color.White;
    strokeStyle: string | number | CanvasGradient | CanvasPattern = Color.Black;
    filter: string = 'none';
    imageSmoothingEnabled: boolean = true;
    imageSmoothingQuality: ImageSmoothingQuality = 'low';
    lineCap: CanvasLineCap = 'butt';
    lineDashOffset: number = 0.0;
    lineJoin: CanvasLineJoin = 'miter';
    lineWidth: number = 1;
    miterLimit: number = 10;
    shadowBlur: number = 0.0;
    shadowColor: string = '#00000000';
    shadowOffsetX: number = 0;
    shadowOffsetY: number = 0;
    direction: CanvasDirection = 'inherit';
    fontStyle: FontStyleType = 'normal';
    fontWeight: FontWeightType = 'normal';
    fontSize: number = 14;
    fontSizeUnit: FontSizeUnit = 'px';
    fontFamily: FontFamily = '';
    font: string = 'normal normal 14px ';
    textAlign: CanvasTextAlign = 'left';
    textBaseline: CanvasTextBaseline = 'alphabetic';
    lineDash: number[] = [];
    dashPathEffect: DashPathEffect | null = null;
    // color: string | number | CanvasGradient | CanvasPattern = Color.Black;
    // dotsColor: Color | number | string | Resource = Color.Pink;
    // textSize: number = 10;
    // fill: string | number | CanvasGradient | CanvasPattern = 0;
    // stroke: Color | number | string | Resource = 0;
    // strokeWidth: number = 0;
    // strokeRadius: number = 0;
    // style: Style = Style.FILL;
    // alpha: number = 1;
    // typeface: FontWeight = FontWeight.Normal;
    // textAlign: TextAlign = TextAlign.Start;
    // align: Align = Align.LEFT;
    // strokeDashArray: number[] = [0,0];
    // strokeDashOffset: number = 0;
    // dashPathEffect: DashPathEffect|null=null;
    // x: number = 0;
    // y: number = 0;
    // width: number | string = 0;
    // height: number | string = 0;
    // dotsWidth: number = 0;
    // dotsHeight: number  = 0;
    // visibility: Visibility = Visibility.Visible
    // dotsVisibility: Visibility = Visibility.Hidden
    // clickPosition = -1;
    // dotsPosition: number = 0;
    // value:number = 0;
    // translateX :number= 0;
    // translateY:number = 0;
    // radius: number = 0;
    // y2: number = 0
    // isShowBorder: boolean = false
    constructor(paint?: Paint) {
        if (paint != null && paint != undefined) {
            this.set(paint);
        }
    }
    public set(paint: Paint) {
        this.styleType = paint.styleType;
        this.globalAlpha = paint.globalAlpha;
        this.globalCompositeOperation = paint.globalCompositeOperation;
        this.fillStyle = paint.fillStyle;
        this.strokeStyle = paint.strokeStyle;
        this.filter = paint.filter;
        this.imageSmoothingEnabled = paint.imageSmoothingEnabled;
        this.imageSmoothingQuality = paint.imageSmoothingQuality;
        this.lineCap = paint.lineCap;
        this.lineDashOffset = paint.lineDashOffset;
        this.lineJoin = paint.lineJoin;
        this.lineWidth = paint.lineWidth;
        this.miterLimit = paint.miterLimit;
        this.shadowBlur = paint.shadowBlur;
        this.shadowColor = paint.shadowColor;
        this.shadowOffsetX = paint.shadowOffsetX;
        this.shadowOffsetY = paint.shadowOffsetY;
        this.direction = paint.direction;
        this.fontStyle = paint.fontStyle;
        this.fontWeight = paint.fontWeight;
        this.fontSize = paint.fontSize;
        this.fontSizeUnit = paint.fontSizeUnit;
        this.fontFamily = paint.fontFamily;
        this.font = paint.font;
        this.textAlign = paint.textAlign;
        this.textBaseline = paint.textBaseline;
        this.lineDash = paint.lineDash;
        this.dashPathEffect = paint.dashPathEffect;
    }
    public setColor(color: string | number | CanvasGradient | CanvasPattern) {
        // switch (this.styleType) {
        //   case Style.FILL:
        //     this.fillStyle = color;
        //     break
        //   case Style.STROKE:
        //     this.strokeStyle = color;
        //     break;
        //   case Style.FILL_AND_STROKE:
        //   default:
        this.fillStyle = color;
        this.strokeStyle = color;
        // break
        // }
    }
    public getColor(): string | number | CanvasGradient | CanvasPattern {
        // switch (this.styleType) {
        //   case Style.FILL:
        //     return this.fillStyle;
        //   case Style.STROKE:
        //     return this.strokeStyle;
        //   case Style.FILL_AND_STROKE:
        //   default:
        return this.fillStyle;
        // }
    }
    public setStyle(styleType: Style) {
        this.styleType = styleType;
    }
    public getStyle(): Style {
        return this.styleType;
    }
    public setGlobalAlpha(alpha: number) {
        this.globalAlpha = alpha;
    }
    public getGlobalAlpha() {
        return this.globalAlpha;
    }
    public setGlobalCompositeOperation(composite: string) {
        this.globalCompositeOperation = composite;
    }
    public getGlobalCompositeOperation() {
        return this.globalCompositeOperation;
    }
    public setFillStyle(fillStyle: string | number | CanvasGradient | CanvasPattern) {
        this.fillStyle = fillStyle;
    }
    public getFillStyle(): string | number | CanvasGradient | CanvasPattern {
        return this.fillStyle;
    }
    public setStrokeStyle(strokeStyle: string | number | CanvasGradient | CanvasPattern) {
        this.strokeStyle = strokeStyle;
    }
    public getStrokeStyle(): string | number | CanvasGradient | CanvasPattern {
        return this.fillStyle;
    }
    public setFilter(filterType: string) {
        this.filter = filterType;
    }
    public getFilter(): string {
        return this.filter;
    }
    public setImageSmoothingEnabled(enable: boolean) {
        this.imageSmoothingEnabled = enable;
    }
    public getImageSmoothingEnabled(): boolean {
        return this.imageSmoothingEnabled;
    }
    public setImageSmoothingQuality(quality: ImageSmoothingQuality) {
        this.imageSmoothingQuality = quality;
    }
    public getImageSmoothingQuality(): ImageSmoothingQuality {
        return this.imageSmoothingQuality;
    }
    public setLineCap(lineCap: CanvasLineCap) {
        this.lineCap = lineCap;
    }
    public getLineCap(): CanvasLineCap {
        return this.lineCap;
    }
    public setLineDashOffset(offset: number) {
        this.lineDashOffset = offset;
    }
    public getLineDashOffset(): number {
        return this.lineDashOffset;
    }
    public setLineJoin(lineJoin: CanvasLineJoin) {
        this.lineJoin = lineJoin;
    }
    public getLineJoin(): CanvasLineJoin {
        return this.lineJoin;
    }
    public setStrokeWidth(lineWidth: number) {
        this.lineWidth = lineWidth;
    }
    public getStrokeWidth(): number {
        return this.lineWidth;
    }
    public setMiterLimit(miterLimit: number) {
        this.miterLimit = miterLimit;
    }
    public getMiterLimit(): number {
        return this.miterLimit;
    }
    public setShadowBlur(shadowBlur: number) {
        this.shadowBlur = shadowBlur;
    }
    public getShadowBlur(): number {
        return this.miterLimit;
    }
    public setShadowColor(shadowColor: string) {
        this.shadowColor = shadowColor;
    }
    public getShadowColor(): string {
        return this.shadowColor;
    }
    public setShadowOffsetX(shadowOffsetX: number) {
        this.shadowOffsetX = shadowOffsetX;
    }
    public getShadowOffsetX(): number {
        return this.shadowOffsetX;
    }
    public setShadowOffsetY(shadowOffsetY: number) {
        this.shadowOffsetY = shadowOffsetY;
    }
    public getShadowOffsetY(): number {
        return this.shadowOffsetY;
    }
    public setDirection(direction: CanvasDirection) {
        this.direction = direction;
    }
    public getDirection(): CanvasDirection {
        return this.direction;
    }
    public setTextSize(textSize: number, textSizeUnit?: FontSizeUnit): void {
        this.fontSize = textSize;
        if (textSizeUnit) {
            this.fontSizeUnit = textSizeUnit;
        }
        this.font = this.fontStyle + " " + this.fontWeight + " " + this.fontSize + this.fontSizeUnit + " " + this.fontFamily;
    }
    public getTextSize(): number {
        return this.fontSize;
    }
    public setFontStyle(fontStyle: FontStyleType): void {
        this.fontStyle = fontStyle;
        this.font = this.fontStyle + " " + this.fontWeight + " " + this.fontSize + this.fontSizeUnit + " " + this.fontFamily;
    }
    public getFontStyle(): FontStyleType {
        return this.fontStyle;
    }
    public setFontWeight(fontWeight: FontWeightType): void {
        this.fontWeight = fontWeight;
        this.font = this.fontStyle + " " + this.fontWeight + " " + this.fontSize + this.fontSizeUnit + " " + this.fontFamily;
    }
    public getFontWeight(): FontWeightType {
        return this.fontWeight;
    }
    public setFontFamily(fontFamily: FontFamily): void {
        this.fontFamily = fontFamily;
        this.font = this.fontStyle + " " + this.fontWeight + " " + this.fontSize + this.fontSizeUnit + " " + this.fontFamily;
    }
    public getFontFamily(): FontFamily {
        return this.fontFamily;
    }
    public setFont(fontStyle?: FontStyleType, fontWeight?: FontWeightType, fontSize?: number, fontSizeUnit?: FontSizeUnit, fontFamily?: FontFamily) {
        if (!fontStyle) {
            this.fontStyle = 'normal';
        }
        if (!fontWeight) {
            this.fontWeight = 'normal';
        }
        if (!fontSize) {
            this.fontSize = 14;
        }
        if (!fontSizeUnit) {
            this.fontSizeUnit = 'px';
        }
        if (!fontFamily) {
            this.fontFamily = '';
        }
        this.font = this.fontStyle + " " + this.fontWeight + " " + this.fontSize + this.fontSizeUnit + " " + this.fontFamily;
    }
    public getFont(): string {
        return this.font;
    }
    public setTextAlign(textAlign: CanvasTextAlign) {
        this.textAlign = textAlign;
    }
    public getTextAlign(): CanvasTextAlign {
        return this.textAlign;
    }
    public setTextBaseline(textBaseline: CanvasTextBaseline) {
        this.textBaseline = textBaseline;
    }
    public getTextBaseline(): CanvasTextBaseline {
        return this.textBaseline;
    }
    public setLineDash(lineDash: number[]) {
        this.lineDash = lineDash;
    }
    public getLineDash(): number[] {
        return this.lineDash;
    }
    public setDashPathEffect(dashEffect: DashPathEffect | null) {
        this.dashPathEffect = dashEffect;
    }
    public getDashPathEffect(): DashPathEffect | null {
        return this.dashPathEffect;
    }
}
// /**
//  * 用于绘制Line的属性类
//  */
// export class LinePaint extends Paint {
//   startPoint: number[] = [0, 0];
//   endPoint: number[] = [0, 0]
//
//   constructor(paint?: LinePaint) {
//     super(paint)
//     if (paint != null && paint != undefined) {
//       this.startPoint = paint.startPoint;
//       this.endPoint = paint.endPoint;
//     }
//   }
//
//   setStartPoint(value: number[]) {
//     this.startPoint = value
//   }
//
//   getStartPoint(): number[] {
//     return this.startPoint
//   }
//
//   setEndPoint(value: number[]) {
//     this.endPoint = value
//   }
//
//   getEndPoint(): number[] {
//     return this.endPoint
//   }
// }
export class TextPaint extends Paint {
    text: string = "";
    constructor(paint?: TextPaint) {
        super(paint);
        if (paint != null && paint != undefined) {
            this.text = paint.text;
        }
    }
    translateX: number = 0;
    translateY: number = 0;
    rotate: number = 0;
    setText(value: string) {
        this.text = value;
    }
    getText(): string {
        return this.text;
    }
    setTranslateX(value: number) {
        this.translateX = value;
    }
    getTranslateX(): number {
        return this.translateX;
    }
    setTranslateY(value: number) {
        this.translateY = value;
    }
    getTranslateY(): number {
        return this.translateY;
    }
    setRotate(value: number) {
        this.rotate = value;
    }
    getRotate(): number {
        return this.rotate;
    }
}
// export class PathPaint extends Paint {
//   commands: string = "";
//   commandsFill: string = "";
//   filled: boolean = false;
//   linearGradientColors: Array<ColorStop> = new Array<ColorStop>();
//   enabled: boolean = false;
//   circleColor: string | number | Color = Color.White;
//   colors: JArrayList<Number> | null = null;
//   radius: number = 2;
//   circleHoleRadius: number = 1;
//   circleHoleColor: string | number | Color = Color.White;
//   circleHoleEnabled: boolean = true;
//   drawValueEnable: boolean = true;
//   rotate: number = 0
//   rotateText: number = 0
//   percentage: string = ''
//   filledColor: number = 0
//   label: string = ''
//   axisDependency: AxisDependency = AxisDependency.LEFT
//   lineSvg: string = ''
//   // fillStyle: FillStyle = FillStyle.MIN;
//   positionX: number = 0
//   positionY: number = 0
//   labelX: number = 0
//   labelY: number = 0
//   iconX: number = 0
//   iconY: number = 0
//
//   constructor(paint?: PathPaint) {
//     super(paint)
//     if (paint != null && paint != undefined) {
//       this.commands = paint.commands;
//     }
//   }
//
//   setIconY(iconY: number) {
//     this.iconY = iconY
//   }
//
//   setIconX(iconX: number) {
//     this.iconX = iconX
//   }
//
//   setLabelX(labelX: number) {
//     this.labelX = labelX
//   }
//
//   setLabelY(labelY: number) {
//     this.labelY = labelY
//   }
//
//   setPositionX(positionX: number) {
//     this.positionX = positionX
//   }
//
//   setPositionY(positionY: number) {
//     this.positionY = positionY
//   }
//
//   setLineSvg(lineSvg: string) {
//     this.lineSvg = lineSvg
//   }
//
//   setLabel(label: string) {
//     this.label = label
//   }
//
//   getLabel(): string {
//     return this.label
//   }
//
//   setFilledColor(filledColor: number) {
//     this.filledColor = filledColor
//   }
//
//   getFilledColor(): number {
//     return this.filledColor
//   }
//
//   setRotateText(rotateText: number) {
//     this.rotateText = rotateText;
//   }
//
//   getRotateText(): number {
//     return this.rotateText
//   }
//
//   setPercentage(percentage: string) {
//     this.percentage = percentage
//   }
//
//   getPercentage(): string {
//     return this.percentage
//   }
//
//   setRotate(value: number) {
//     this.rotate = value
//   }
//
//   setCommands(value: string) {
//     this.commands = value;
//   }
//
//   setCommandsFill(commandsFill: string) {
//     this.commandsFill = commandsFill;
//   }
//
//   // public setFillStyle(fillStyle: FillStyle){
//   //   this.fillStyle = fillStyle;
//   // }
//
//   setDrawFilled(filled: boolean) {
//     this.filled = filled
//   }
//
//   isDrawFilledEnabled(): boolean {
//     return this.filled
//   }
//
//   setGradientFillColor(linearGradientColors: Array<ColorStop>): void {
//     this.linearGradientColors = linearGradientColors;
//   }
//
//   setColors(colors: JArrayList<Number>) {
//     this.colors = colors
//   }
//
//   setDrawCircles(enabled: boolean) {
//     this.enabled = enabled
//   }
//
//   isDrawCirclesEnabled(): boolean {
//     return this.enabled
//   }
//
//   setCirclesColor(circleColor: string | number | Color) {
//     this.circleColor = circleColor;
//   }
//
//   setCircleRadius(radius: number) {
//     this.radius = radius;
//   }
//
//   setCircleHoleRadius(circleHoleRadius: number) {
//     this.circleHoleRadius = circleHoleRadius;
//   }
//
//   setCircleHoleColor(circleHoleColor: string | number | Color) {
//     this.circleHoleColor = circleHoleColor;
//   }
//
//   setDrawCircleHole(circleHoleEnabled: boolean) {
//     this.circleHoleEnabled = circleHoleEnabled;
//   }
//
//   setDrawValueEnable(drawValueEnable: boolean) {
//     this.drawValueEnable = drawValueEnable;
//   }
//
//   setAxisDependency(axisDependency: AxisDependency) {
//     this.axisDependency = axisDependency;
//   }
// }
//
// export class PathFillPaint extends Paint {
//   commandsFill: string = "";
//   filled: boolean = false;
//   linearGradientColors: Array<ColorStop> = new Array<ColorStop>();
//   isShowFillLine: boolean = true;
//
//   constructor(paint?: PathFillPaint) {
//     super(paint)
//   }
//
//   setCommandsFill(commandsFill: string) {
//     this.commandsFill = commandsFill;
//   }
//
//   setShowFillLine(isShowFillLine: boolean) {
//     this.isShowFillLine = isShowFillLine;
//   }
//
//   setDrawFilled(filled: boolean) {
//     this.filled = filled
//   }
//
//   isDrawFilledEnabled(): boolean {
//     return this.filled
//   }
//
//   setGradientFillColor(linearGradientColors: Array<ColorStop>): void {
//     this.linearGradientColors = linearGradientColors;
//   }
// }
export enum Style {
    FILL,
    STROKE,
    FILL_AND_STROKE
}
/**
 * 用于绘制Legend的属性类
 */
// export class RectPaint extends Paint {
//   startPoint: number[] = [0, 0]
//   linearGradientColors: Array<ColorStop> = new Array<ColorStop>();
//
//   constructor(paint?: RectPaint) {
//     super(paint)
//     if (paint != null && paint != undefined) {
//       this.startPoint = paint.startPoint;
//     }
//   }
//
//   setStartPoint(value: number[]) {
//     // this.x = value[0]
//     // this.y = value[1]
//     this.startPoint = value
//   }
//
//   getStartPoint(): number[] {
//     return this.startPoint
//   }
//
//   setGradientFillColor(linearGradientColors: Array<ColorStop>): void {
//     this.linearGradientColors = linearGradientColors;
//   }
// }
//
// export class BackGroundPaint extends RectPaint {
//   backgroundColor: number = 0xffffff
//
//   constructor(paint?: BackGroundPaint) {
//     super(paint)
//     if (paint != null && paint != undefined) {
//       this.backgroundColor = paint.backgroundColor;
//     }
//   }
//
//   setBackgroundColor(value: number) {
//     this.backgroundColor = value
//   }
//
//   getBackgroundColor(): number {
//     return this.backgroundColor
//   }
// }
//
// export class LinearGradientPaint extends RectPaint {
//   constructor(paint?: BackGroundPaint) {
//     super(paint)
//   }
// }
//
// export class IndexPositionPaint extends RectPaint {
//   dataSetIndex: number = 0
//   dataIndex: number = 0
//
//   constructor(paint?: IndexPositionPaint) {
//     super(paint)
//   }
//
//   setDataSetIndex(value: number) {
//     this.dataSetIndex = value
//   }
//
//   getDataSetIndex(): number {
//     return this.dataSetIndex
//   }
//
//   setDataIndex(value: number) {
//     this.dataIndex = value
//   }
//
//   getDataIndex(): number {
//     return this.dataIndex
//   }
// }
//
// export class CirclePaint extends Paint {
//   enabled: boolean = false;
//   circleColor: string | number | Color = Color.White;
//   colors: JArrayList<number> | null = null;
//   radius: number = 2;
//   circleHoleRadius: number = 1;
//   circleHoleColor: string | number | Color = Color.White;
//   circleHoleEnabled: boolean = true;
//
//   constructor(paint?: Paint) {
//     super(paint)
//   }
//
//   setDrawCircles(enabled: boolean) {
//     this.enabled = enabled
//   }
//
//   isDrawCirclesEnabled(): boolean {
//     return this.enabled
//   }
//
//   setCirclesColor(circleColor: string | number | Color) {
//     this.circleColor = circleColor;
//   }
//
//   setCircleRadius(radius: number) {
//     this.radius = radius;
//   }
//
//   setCircleHoleRadius(circleHoleRadius: number) {
//     this.circleHoleRadius = circleHoleRadius;
//   }
//
//   setCircleHoleColor(circleHoleColor: string | number | Color) {
//     this.circleHoleColor = circleHoleColor;
//   }
//
//   setDrawCircleHole(circleHoleEnabled: boolean) {
//     this.circleHoleEnabled = circleHoleEnabled;
//   }
// }
//
//
// export class ImagePaint extends Paint {
//   icon: string | Resource = "null";
//
//   constructor(paint?: ImagePaint) {
//     super(paint)
//     if (paint != null && paint != undefined) {
//       this.icon = paint.icon;
//     }
//   }
//
//   setIcon(value: string | Resource) {
//     this.icon = value;
//   }
//
//   getIcon(): string | Resource {
//     return this.icon;
//   }
// }
// export enum Align {
//   LEFT,
//   CENTER,
//   RIGHT
// }
export class TextAlign {
    static CENTER: string = 'center';
    static END: string = 'end';
    static LEFT: string = 'left';
    static RIGHT: string = 'right';
    static START: string = 'start';
}
export type FontStyleType = 'normal' | 'italic';
// export class FontStyleType {
//   static NORMAL: string = 'normal';
//   static ITALIC: string = 'italic';
// }
export type FontWeightType = 'normal' | 'bold' | 'bolder' | 'lighter' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
// export class  FontWeightType {
//   static NORMAL: string = 'normal';
//   static BOLD: string = 'bold';
//   static BOLDER: string = 'bolder';
//   static LIGHTER: string = 'lighter';
//   static WEIGHT_100: number = 100;
//   static WEIGHT_200: number = 200;
//   static WEIGHT_300: number = 300;
//   static WEIGHT_400: number = 400;
//   static WEIGHT_500: number = 500;
//   static WEIGHT_600: number = 600;
//   static WEIGHT_700: number = 700;
//   static WEIGHT_800: number = 800;
//   static WEIGHT_900: number = 900;
// }
export type FontSizeUnit = 'px' | 'vp';
// export class FontSizeUnit {
//   static PX: string = 'px';
//   static VP: string = 'vp';
// }
export type FontFamily = 'sans-serif' | 'serif' | 'monospace' | '';
// export class FontFamily {
//   static SANS_SERIF: string = 'sans-serif';
//   static SERIF: string = 'serif';
//   static MONOSPACE: string = 'monospace';
// }
// - font-style(可选)，用于指定字体样式，支持如下几种样式：'normal','italic'。
// - font-weight(可选)，用于指定字体的粗细，支持如下几种类型：'normal', 'bold', 'bolder', 'lighter', 100, 200, 300, 400, 500, 600, 700, 800, 900。
// - font-size(可选)，指定字号和行高，单位支持px、vp。使用时需要添加单位。
// - font-family(可选)，指定字体系列，支持如下几种类型：'sans-serif', 'serif', 'monospace'。
export class DashPathEffect {
    dash: number[];
    offset: number;
    constructor(dash: number[], offset: number) {
        this.dash = dash;
        this.offset = offset;
    }
}
