let __generate__Id: number = 0;
function generateId(): string {
    return "Utils_" + ++__generate__Id;
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
import Paint, { Style } from '../data/Paint';
import MyRect from '../data/Rect';
import FSize from './FSize';
import MPPointF from './MPPointF';
import IValueFormatter from '../formatter/IValueFormatter';
import DefaultValueFormatter from '../formatter/DefaultValueFormatter';
import deviceInfo from '@ohos.deviceInfo';
import ChartPixelMap from '../data/ChartPixelMap';
import Highlight from '../highlight/Highlight';
/**
 * Utilities class that has some helper methods. Needs to be initialized by
 * calling Utils.init(...) before usage. Inside the Chart.init() method, this is
 * done, if the Utils are used before that, Utils.init(...) needs to be called
 * manually.
 *
 * @author Philipp Jahoda
 */
export default abstract class Utils {
    private static scaledDensity: number = 3.3125;
    private static mMinimumFlingVelocity: number = 50;
    private static mMaximumFlingVelocity: number = 8000;
    public static DEG2RAD: number = (Math.PI / 180.0);
    public static FDEG2RAD: number = (Math.PI / 180.0);
    public static DOUBLE_EPSILON: number = 4.9E-324;
    public static FLOAT_EPSILON: number = 1.4E-45;
    public static contextSettings: RenderingContextSettings = new RenderingContextSettings(true);
    public static offCanvasContext2d: OffscreenCanvasRenderingContext2D = new OffscreenCanvasRenderingContext2D(500, 500, Utils.contextSettings);
    /**
     * initialize method, called inside the Chart.init() method.
     *
     * @param context
     */
    public static init() {
        //        if (context == null) {
        //            // noinspection deprecation
        //            mMinimumFlingVelocity = ViewConfiguration.getMinimumFlingVelocity();
        //            // noinspection deprecation
        //            mMaximumFlingVelocity = ViewConfiguration.getMaximumFlingVelocity();
        //
        //            Log.e("mpchartlib-Utils"
        //                    , "Utils.init(...) PROVIDED CONTEXT OBJECT IS NULL");
        //
        //        } else {
        //            ViewConfiguration viewConfiguration = ViewConfiguration.get(context);
        //            mMinimumFlingVelocity = viewConfiguration.getScaledMinimumFlingVelocity();
        //            mMaximumFlingVelocity = viewConfiguration.getScaledMaximumFlingVelocity();
        //
        //            Resources res = context.getResources();
        //            mMetrics = res.getDisplayMetrics();
        //        }
    }
    /**
     * This method converts dp unit to equivalent pixels, depending on device
     * density. NEEDS UTILS TO BE INITIALIZED BEFORE USAGE.
     *
     * @param dp A value in dp (density independent pixels) unit. Which we need
     *           to convert into pixels
     * @return A float value to represent px equivalent to dp depending on
     * device density
     */
    public static convertDpToPixel(dp: number): number {
        //return dp * this.scaledDensity;
        return vp2px(dp);
    }
    public static setScaledDensity(value: number) {
        Utils.scaledDensity = value;
    }
    /**
     * calculates the approximate width of a text, depending on a demo text
     * avoid repeated calls (e.g. inside drawing methods)
     *
     * @param paint
     * @param demoText
     * @return
     */
    public static calcTextWidth(paint: Paint, demoText: string): number {
        Utils.resetContext2DStyle(Utils.offCanvasContext2d, paint);
        let textMetrics: TextMetrics = Utils.offCanvasContext2d.measureText(demoText);
        return textMetrics.width;
    }
    private static mCalcTextHeightRect: MyRect = new MyRect();
    /**
     * calculates the approximate height of a text, depending on a demo text
     * avoid repeated calls (e.g. inside drawing methods)
     *
     * @param paint
     * @param demoText
     * @return
     */
    public static calcTextHeight(paint: Paint, demoText: string): number {
        Utils.resetContext2DStyle(Utils.offCanvasContext2d, paint);
        let textMetrics: TextMetrics = Utils.offCanvasContext2d.measureText(demoText);
        return textMetrics.height;
    }
    public static getLineHeight(paint: Paint, c?: CanvasRenderer): number {
        if (!c) {
            c = Utils.offCanvasContext2d;
        }
        Utils.resetContext2DStyle(c, paint);
        let textMetrics: TextMetrics = c.measureText('Test');
        return textMetrics.height;
    }
    //
    public static getLineSpacing(paint: Paint, c?: CanvasRenderer): number {
        if (!c) {
            let contextSettings: RenderingContextSettings = new RenderingContextSettings(true);
            c = new OffscreenCanvasRenderingContext2D(500, 500, contextSettings);
        }
        Utils.resetContext2DStyle(c, paint);
        let textMetrics: TextMetrics = c.measureText('Test');
        //canvas暂未正确实现以下属性，目前属性值为0，等待后续实现
        // return textMetrics.actualBoundingBoxAscent - textMetrics.fontBoundingBoxAscent + textMetrics.fontBoundingBoxDescent;
        return textMetrics.height * 0.3;
    }
    public static calcTextSize(paint: Paint, demoText: string): FSize {
        Utils.resetContext2DStyle(Utils.offCanvasContext2d, paint);
        let textMetrics: TextMetrics = Utils.offCanvasContext2d.measureText(demoText);
        let width: number = textMetrics.width;
        let height: number = textMetrics.height;
        let fsize: FSize = new FSize(width, height);
        return fsize;
    }
    private static mDefaultValueFormatter: IValueFormatter = Utils.generateDefaultValueFormatter();
    //
    private static generateDefaultValueFormatter(): IValueFormatter {
        let formatter: DefaultValueFormatter = new DefaultValueFormatter(1);
        return formatter;
    }
    //    /// - returns: The default value formatter used for all chart components that needs a default
    public static getDefaultValueFormatter(): IValueFormatter {
        return Utils.mDefaultValueFormatter;
    }
    //
    //    /**
    //     * Formats the given number to the given number of decimals, and returns the
    //     * number as a string, maximum 35 characters. If thousands are separated, the separating
    //     * character is a dot (".").
    //     *
    //     * @param number
    //     * @param digitCount
    //     * @param separateThousands set this to true to separate thousands values
    //     * @return
    //     */
    //    public static String formatNumber(float number, int digitCount, boolean separateThousands) {
    //        return formatNumber(number, digitCount, separateThousands, '.');
    //    }
    //
    //    /**
    //     * Formats the given number to the given number of decimals, and returns the
    //     * number as a string, maximum 35 characters.
    //     *
    //     * @param number
    //     * @param digitCount
    //     * @param separateThousands set this to true to separate thousands values
    //     * @param separateChar      a character to be paced between the "thousands"
    //     * @return
    //     */
    //    public static String formatNumber(float number, int digitCount, boolean separateThousands,
    //                                      char separateChar) {
    //
    //        char[] out = new char[35];
    //
    //        boolean neg = false;
    //        if (number == 0) {
    //            return "0";
    //        }
    //
    //        boolean zero = false;
    //        if (number < 1 && number > -1) {
    //            zero = true;
    //        }
    //
    //        if (number < 0) {
    //            neg = true;
    //            number = -number;
    //        }
    //
    //        if (digitCount > POW_10.length) {
    //            digitCount = POW_10.length - 1;
    //        }
    //
    //        number *= POW_10[digitCount];
    //        long lval = Math.round(number);
    //        int ind = out.length - 1;
    //        int charCount = 0;
    //        boolean decimalPointAdded = false;
    //
    //        while (lval != 0 || charCount < (digitCount + 1)) {
    //            int digit = (int) (lval % 10);
    //            lval = lval / 10;
    //            out[ind--] = (char) (digit + '0');
    //            charCount++;
    //
    //            // add decimal point
    //            if (charCount == digitCount) {
    //                out[ind--] = ',';
    //                charCount++;
    //                decimalPointAdded = true;
    //
    //                // add thousand separators
    //            } else if (separateThousands && lval != 0 && charCount > digitCount) {
    //
    //                if (decimalPointAdded) {
    //
    //                    if ((charCount - digitCount) % 4 == 0) {
    //                        out[ind--] = separateChar;
    //                        charCount++;
    //                    }
    //
    //                } else {
    //
    //                    if ((charCount - digitCount) % 4 == 3) {
    //                        out[ind--] = separateChar;
    //                        charCount++;
    //                    }
    //                }
    //            }
    //        }
    //
    //        // if number around zero (between 1 and -1)
    //        if (zero) {
    //            out[ind--] = '0';
    //            charCount += 1;
    //        }
    //
    //        // if the number is negative
    //        if (neg) {
    //            out[ind--] = '-';
    //            charCount += 1;
    //        }
    //
    //        int start = out.length - charCount;
    //
    //        return String.valueOf(out, start, out.length - start);
    //    }
    //
    /**
     * rounds the given number to the next significant number
     *
     * @param number
     * @return
     */
    public static roundToNextSignificant(number: number): number {
        if (number == Number.MAX_VALUE ||
            Number.isNaN(number) ||
            number == 0.0)
            return 0;
        const d: number = Math.ceil(Math.log10(number < 0 ? -number : number));
        const pw: number = 1 - Math.floor(d);
        const magnitude: number = Math.pow(10, pw);
        const shifted: number = Math.round(number * magnitude);
        return shifted / magnitude;
    }
    /**
     * Returns the appropriate number of decimals to be used for the provided
     * number.
     *
     * @param number
     * @return
     */
    public static getDecimals(number: number): number {
        let i: number = Utils.roundToNextSignificant(number);
        if (i == Number.MAX_VALUE)
            return 0;
        return Math.floor(Math.ceil(-Math.log10(i)) + 2);
    }
    //
    //    /**
    //     * Converts the provided Integer List to an int array.
    //     *
    //     * @param integers
    //     * @return
    //     */
    //    public static int[] convertIntegers(List<Integer> integers) {
    //
    //        int[] ret = new int[integers.size()];
    //
    //        copyIntegers(integers, ret);
    //
    //        return ret;
    //    }
    //
    //    public static void copyIntegers(List<Integer> from, int[] to){
    //        int count = to.length < from.size() ? to.length : from.size();
    //        for(int i = 0 ; i < count ; i++){
    //            to[i] = from.get(i);
    //        }
    //    }
    //
    //    /**
    //     * Converts the provided String List to a String array.
    //     *
    //     * @param strings
    //     * @return
    //     */
    //    public static String[] convertStrings(List<String> strings) {
    //
    //        String[] ret = new String[strings.size()];
    //
    //        for (int i = 0; i < ret.length; i++) {
    //            ret[i] = strings.get(i);
    //        }
    //
    //        return ret;
    //    }
    //
    //    public static void copyStrings(List<String> from, String[] to){
    //        int count = to.length < from.size() ? to.length : from.size();
    //        for(int i = 0 ; i < count ; i++){
    //            to[i] = from.get(i);
    //        }
    //    }
    //
    /**
     * Replacement for the Math.nextUp(...) method that is only available in
     * HONEYCOMB and higher. Dat's some seeeeek sheeet.
     *
     * @param d
     * @return
     */
    public static nextUp(d: number): number {
        if (d == Number.MAX_VALUE)
            return d;
        else {
            d += 0.0;
            return d >= 0.0 ? d += 0.000000001 : d -= 0.000000001;
        }
    }
    //
    //    /**
    //     * Returns a recyclable MPPointF instance.
    //     * Calculates the position around a center point, depending on the distance
    //     * from the center, and the angle of the position around the center.
    //     *
    //     * @param center
    //     * @param dist
    //     * @param angle  in degrees, converted to radians internally
    //     * @return
    //     */
    public static getPosition(center: MPPointF, dist: number, angle: number, outputPoint?: MPPointF): MPPointF {
        let p: MPPointF = ((outputPoint == null || outputPoint == undefined) ? MPPointF.getInstance(0, 0) : outputPoint);
        p.x = center.x + dist * Math.cos((angle * Math.PI / 180));
        p.y = center.y + dist * Math.sin((angle * Math.PI / 180));
        return p;
    }
    //
    //    public static void velocityTrackerPointerUpCleanUpIfNecessary(MotionEvent ev,
    //                                                                  VelocityTracker tracker) {
    //
    //        // Check the dot product of current velocities.
    //        // If the pointer that left was opposing another velocity vector, clear.
    //        tracker.computeCurrentVelocity(1000, mMaximumFlingVelocity);
    //        final int upIndex = ev.getActionIndex();
    //        final int id1 = ev.getPointerId(upIndex);
    //        final float x1 = tracker.getXVelocity(id1);
    //        final float y1 = tracker.getYVelocity(id1);
    //        for (int i = 0, count = ev.getPointerCount(); i < count; i++) {
    //            if (i == upIndex)
    //                continue;
    //
    //            final int id2 = ev.getPointerId(i);
    //            final float x = x1 * tracker.getXVelocity(id2);
    //            final float y = y1 * tracker.getYVelocity(id2);
    //
    //            final float dot = x + y;
    //            if (dot < 0) {
    //                tracker.clear();
    //                break;
    //            }
    //        }
    //    }
    //
    //    /**
    //     * Original method view.postInvalidateOnAnimation() only supported in API >=
    //     * 16, This is a replica of the code from ViewCompat.
    //     *
    //     * @param view
    //     */
    //    @SuppressLint("NewApi")
    //    public static void postInvalidateOnAnimation(View view) {
    //        if (Build.VERSION.SDK_INT >= 16)
    //            view.postInvalidateOnAnimation();
    //        else
    //            view.postInvalidateDelayed(10);
    //    }
    //
    public static getMinimumFlingVelocity(): number {
        return Utils.mMinimumFlingVelocity;
    }
    //
    //    public static int getMaximumFlingVelocity() {
    //        return mMaximumFlingVelocity;
    //    }
    //
    /**
     * returns an angle between 0.f < 360.f (not less than zero, less than 360)
     */
    public static getNormalizedAngle(angle: number): number {
        while (angle < 0)
            angle += 360;
        return angle % 360;
    }
    private static mDrawableBoundsCache: MyRect = new MyRect();
    public static drawImage(canvas: CanvasRenderingContext2D, drawable: ChartPixelMap, x: number, y: number): void {
        let pixelMap = drawable.getIcon();
        if (pixelMap) {
            canvas.drawImage(pixelMap, x, y);
        }
    }
    //    private static Rect mDrawTextRectBuffer = new Rect();
    private static mFontMetricsBuffer: TextMetrics | null = null;
    public static drawXAxisValue(c: CanvasRenderingContext2D, text: string, x: number, y: number, paint: Paint, anchor: MPPointF, angleDegrees: number): void {
        let drawOffsetX: number = 0.0;
        let drawOffsetY: number = 0.0;
        // 防止计算出来的宽度，高度等数据不准确
        Utils.resetContext2DStyle(c, paint);
        Utils.mFontMetricsBuffer = c.measureText(text);
        if (Utils.mFontMetricsBuffer) {
            let lineHeight = Utils.mFontMetricsBuffer.height;
            // Android sometimes has pre-padding
            drawOffsetX -= Utils.mFontMetricsBuffer.actualBoundingBoxLeft;
            // Android does not snap the bounds to line boundaries,
            //  and draws from bottom to top.
            // And we want to normalize it.
            drawOffsetY += -Utils.mFontMetricsBuffer.actualBoundingBoxAscent;
            // To have a consistent point of reference, we always draw left-aligned
            let originalTextAlign: CanvasTextAlign = paint.getTextAlign();
            let originalTextBaseLine: CanvasTextBaseline = paint.getTextBaseline();
            paint.setTextAlign('left');
            paint.setTextBaseline('middle');
            Utils.resetContext2DStyle(c, paint);
            if (angleDegrees != 0.0) {
                // Move the text drawing rect in a way that it always rotates around its center
                drawOffsetX -= Utils.mFontMetricsBuffer.width * 0.5;
                // drawOffsetY -= lineHeight * 0.5;
                let translateX: number = x;
                let translateY: number = y;
                // Move the "outer" rect relative to the anchor, assuming its centered
                if (anchor.x != 0.5 || anchor.y != 0.5) {
                    const rotatedSize: FSize = Utils.getSizeOfRotatedRectangleByDegrees(Utils.mFontMetricsBuffer.width, lineHeight, angleDegrees);
                    translateX -= rotatedSize.width * (anchor.x - 0.5);
                    // translateY -= rotatedSize.height * (anchor.y - 0.5);
                    FSize.recycleInstance(rotatedSize);
                }
                c.save();
                c.translate(translateX, translateY);
                c.rotate(angleDegrees * Math.PI / 180);
                switch (paint.getStyle()) {
                    case Style.STROKE:
                        c.beginPath();
                        c.strokeText(text, drawOffsetX, drawOffsetY);
                        c.closePath();
                        break;
                    case Style.FILL_AND_STROKE:
                    case Style.FILL:
                    default:
                        c.beginPath();
                        c.fillText(text, drawOffsetX, drawOffsetY);
                        c.closePath();
                        break;
                }
                c.restore();
            }
            else {
                if (anchor.x != 0.0 || anchor.y != 0.0) {
                    drawOffsetX -= Utils.mFontMetricsBuffer.width * anchor.x;
                    // drawOffsetY -= lineHeight * anchor.y;
                }
                drawOffsetX += x;
                drawOffsetY += y;
                switch (paint.getStyle()) {
                    case Style.STROKE:
                        c.beginPath();
                        c.strokeText(text, drawOffsetX, drawOffsetY);
                        c.closePath();
                        break;
                    case Style.FILL_AND_STROKE:
                    case Style.FILL:
                    default:
                        c.beginPath();
                        c.fillText(text, drawOffsetX, drawOffsetY);
                        c.closePath();
                        break;
                }
            }
            paint.setTextAlign(originalTextAlign);
            paint.setTextBaseline(originalTextBaseLine);
        }
    }
    //
    //    public static void drawMultilineText(Canvas c, StaticLayout textLayout,
    //                                         float x, float y,
    //                                         TextPaint paint,
    //                                         MPPointF anchor, float angleDegrees) {
    //
    //        float drawOffsetX = 0.f;
    //        float drawOffsetY = 0.f;
    //        float drawWidth;
    //        float drawHeight;
    //
    //        final float lineHeight = paint.getFontMetrics(mFontMetricsBuffer);
    //
    //        drawWidth = textLayout.getWidth();
    //        drawHeight = textLayout.getLineCount() * lineHeight;
    //
    //        drawOffsetX -= mDrawTextRectBuffer.left;
    //
    //        //  and draws from bottom to top.
    //        // And we want to normalize it.
    //        drawOffsetY += drawHeight;
    //
    //        // To have a consistent point of reference, we always draw left-aligned
    //        Paint.Align originalTextAlign = paint.getTextAlign();
    //        paint.setTextAlign(Paint.Align.LEFT);
    //
    //        if (angleDegrees != 0.f) {
    //
    //            // Move the text drawing rect in a way that it always rotates around its center
    //            drawOffsetX -= drawWidth * 0.5f;
    //            drawOffsetY -= drawHeight * 0.5f;
    //
    //            float translateX = x;
    //            float translateY = y;
    //
    //            // Move the "outer" rect relative to the anchor, assuming its centered
    //            if (anchor.x != 0.5f || anchor.y != 0.5f) {
    //                final FSize rotatedSize = getSizeOfRotatedRectangleByDegrees(
    //                        drawWidth,
    //                        drawHeight,
    //                        angleDegrees);
    //
    //                translateX -= rotatedSize.width * (anchor.x - 0.5f);
    //                translateY -= rotatedSize.height * (anchor.y - 0.5f);
    //                FSize.recycleInstance(rotatedSize);
    //            }
    //
    //            c.save();
    //            c.translate(translateX, translateY);
    //            c.rotate(angleDegrees);
    //
    //            c.translate(drawOffsetX, drawOffsetY);
    //            textLayout.draw(c);
    //
    //            c.restore();
    //        } else {
    //            if (anchor.x != 0.f || anchor.y != 0.f) {
    //
    //                drawOffsetX -= drawWidth * anchor.x;
    //                drawOffsetY -= drawHeight * anchor.y;
    //            }
    //
    //            drawOffsetX += x;
    //            drawOffsetY += y;
    //
    //            c.save();
    //
    //            c.translate(drawOffsetX, drawOffsetY);
    //            textLayout.draw(c);
    //
    //            c.restore();
    //        }
    //
    //        paint.setTextAlign(originalTextAlign);
    //    }
    //
    //    public static void drawMultilineText(Canvas c, String text,
    //                                         float x, float y,
    //                                         TextPaint paint,
    //                                         FSize constrainedToSize,
    //                                         MPPointF anchor, float angleDegrees) {
    //
    //        StaticLayout textLayout = new StaticLayout(
    //                text, 0, text.length(),
    //                paint,
    //                (int) Math.max(Math.ceil(constrainedToSize.width), 1.f),
    //                Layout.Alignment.ALIGN_NORMAL, 1.f, 0.f, false);
    //
    //
    //        drawMultilineText(c, textLayout, x, y, paint, anchor, angleDegrees);
    //    }
    //
    //    /**
    //     * Returns a recyclable FSize instance.
    //     * Represents size of a rotated rectangle by degrees.
    //     *
    //     * @param rectangleSize
    //     * @param degrees
    //     * @return A Recyclable FSize instance
    //     */
    //    public static getSizeOfRotatedRectangleByDegrees( rectangleSize:FSize, degrees:number):FSize{
    //        let radians:number = degrees * Utils.FDEG2RAD;
    //        return this.getSizeOfRotatedRectangleByRadians(rectangleSize.width, rectangleSize.height,
    //                radians);
    //    }
    //
    //    /**
    //     * Returns a recyclable FSize instance.
    //     * Represents size of a rotated rectangle by radians.
    //     *
    //     * @param rectangleSize
    //     * @param radians
    //     * @return A Recyclable FSize instance
    //     */
    //    public static  getSizeOfRotatedRectangleByRadians( rectangleSize:FSize,  radians:number):FSize {
    //        return getSizeOfRotatedRectangleByRadians(rectangleSize.width, rectangleSize.height,
    //                radians);
    //    }
    //
    //    /**
    //     * Returns a recyclable FSize instance.
    //     * Represents size of a rotated rectangle by degrees.
    //     *
    //     * @param rectangleWidth
    //     * @param rectangleHeight
    //     * @param degrees
    //     * @return A Recyclable FSize instance
    //     */
    public static getSizeOfRotatedRectangleByDegrees(rectangleWidth: number, rectangleHeight: number, degrees: number): FSize {
        let radians: number = degrees * Utils.FDEG2RAD;
        return Utils.getSizeOfRotatedRectangleByRadians(rectangleWidth, rectangleHeight, radians);
    }
    //
    //    /**
    //     * Returns a recyclable FSize instance.
    //     * Represents size of a rotated rectangle by radians.
    //     *
    //     * @param rectangleWidth
    //     * @param rectangleHeight
    //     * @param radians
    //     * @return A Recyclable FSize instance
    //     */
    public static getSizeOfRotatedRectangleByRadians(rectangleWidth: number, rectangleHeight: number, radians: number): FSize {
        return FSize.getInstance(Math.abs(rectangleWidth * Math.cos(radians)) + Math.abs(rectangleHeight *
            Math.sin(radians)), Math.abs(rectangleWidth * Math.sin(radians)) + Math.abs(rectangleHeight *
            Math.cos(radians)));
    }
    public static getSDKInt(): number {
        return deviceInfo.sdkApiVersion;
    }
    public static resetContext2DStyle(context2D: CanvasRenderer, paint: Paint) {
        switch (paint.styleType) {
            case Style.FILL:
                context2D.fillStyle = paint.fillStyle;
                break;
            case Style.STROKE:
                context2D.strokeStyle = paint.strokeStyle;
                break;
            case Style.FILL_AND_STROKE:
            default:
                context2D.fillStyle = paint.fillStyle;
                context2D.strokeStyle = paint.strokeStyle;
                break;
        }
        if (paint.globalAlpha !== undefined) {
            context2D.globalAlpha = paint.globalAlpha;
        }
        context2D.filter = paint.filter;
        context2D.imageSmoothingEnabled = paint.imageSmoothingEnabled;
        context2D.imageSmoothingQuality = paint.imageSmoothingQuality;
        context2D.lineCap = paint.lineCap;
        context2D.lineDashOffset = paint.lineDashOffset;
        context2D.lineJoin = paint.lineJoin;
        context2D.lineWidth = paint.lineWidth;
        context2D.miterLimit = paint.miterLimit;
        context2D.shadowBlur = paint.shadowBlur;
        context2D.shadowColor = paint.shadowColor;
        context2D.shadowOffsetX = paint.shadowOffsetX;
        context2D.shadowOffsetY = paint.shadowOffsetY;
        context2D.direction = paint.direction;
        context2D.font = paint.font;
        context2D.textAlign = paint.textAlign;
        context2D.textBaseline = paint.textBaseline;
        let dashEffect = paint.getDashPathEffect();
        if (dashEffect) {
            context2D.setLineDash(dashEffect.dash);
            context2D.lineDashOffset = dashEffect.offset;
        }
    }
    public static parseInt(num: number): number {
        let stringNum = String(num);
        if (stringNum.includes('.')) {
            let numArr = stringNum.split('.');
            return Number(numArr[0]);
        }
        return num;
    }
    public static isHighLightEquals(highLight1: Highlight | null, highLight2: Highlight | null): boolean {
        if (highLight1 == undefined && highLight2 == undefined) {
            return true;
        }
        if (highLight1 == null && highLight2 == null) {
            return true;
        }
        if (highLight1 && highLight2) {
            return highLight1.getX() == highLight2.getX() && highLight1.getY() == highLight2.getY() && highLight1.getStackIndex() == highLight2.getStackIndex();
        }
        else {
            return false;
        }
    }
    public static equalsIgnoreCase(label: string, anotherString: string) {
        if (label === anotherString) {
            return true;
        }
        if (typeof anotherString === 'string') {
            return label.toLowerCase() == anotherString.toLowerCase(); //
        }
        return false;
    }
    /**
     * 绘制顶部圆角矩形
     * @param c 画布对象
     * @param left 矩形左边界的x坐标
     * @param top 矩形上边界的y坐标
     * @param width 矩形的宽度
     * @param height 矩形的高度
     * @param topRadius 顶部圆角的半径
     */
    public static fillRoundedRect(c: CanvasRenderingContext2D, left: number, top: number, width: number, height: number, topRadius: number) {
        if (topRadius > width / 2) {
            topRadius = width / 2;
        }
        c.moveTo(left + topRadius, top);
        c.arcTo(left + width, top, left + width, top + height, topRadius);
        c.lineTo(left + width, top + height);
        c.lineTo(left, top + height);
        c.arcTo(left, top, left + width, top, topRadius);
    }
    public static drawFillRect(isDrawRounded: boolean, c: CanvasRenderingContext2D, paint: Paint, left: number, top: number, right: number, bottom: number, radius: number) {
        Utils.drawRect(isDrawRounded, c, paint, left, top, right, bottom, radius, true);
    }
    public static drawStrokeRect(isDrawRounded: boolean, c: CanvasRenderingContext2D, paint: Paint, left: number, top: number, right: number, bottom: number, radius: number) {
        Utils.drawRect(isDrawRounded, c, paint, left, top, right, bottom, radius, false);
    }
    private static drawRect(isDrawRounded: boolean, c: CanvasRenderingContext2D, paint: Paint, left: number, top: number, right: number, bottom: number, radius: number, isFill: boolean): void {
        Utils.resetContext2DStyle(c, paint);
        c.beginPath();
        if (isDrawRounded && radius != 0) {
            Utils.fillRoundedRect(c, left, top, right - left, bottom - top, radius);
        }
        else {
            c.rect(left, top, right - left, bottom - top);
        }
        if (isFill) {
            c.fill();
        }
        else {
            c.stroke();
        }
        c.closePath();
    }
}
export type PanActionType = 'Down' | 'Move' | 'Up';
export type LongPressType = 'Down' | 'Up' | 'Cancel';
export type PinchActionType = 'Start' | 'Update' | 'End' | 'Cancel';
