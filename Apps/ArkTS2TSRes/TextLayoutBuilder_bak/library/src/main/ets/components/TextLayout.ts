interface TextLayout_Params {
    model?: TextLayout.Layout;
    eventType?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TextLayout_" + ++__generate__Id;
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
import { TextInfo } from './TextInfo';
let TEXT_TYPE_NORMAL = "normal";
let TEXT_TYPE_RICH = "richtext";
let TEXT_TYPE_HTTP = "http";
class TextInfoData {
    index: number = -1;
    data: TextInfo = new TextInfo();
}
class TextLayout extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new TextLayout.Layout(), this, "model");
        this.__eventType = new ObservedPropertySimple(-1, this, "eventType");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TextLayout_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.eventType !== undefined) {
            this.eventType = params.eventType;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__eventType.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<TextLayout.Layout>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: TextLayout.Layout) {
        this.__model.set(newValue);
    }
    private __eventType: ObservedPropertySimple<number>;
    get eventType() {
        return this.__eventType.get();
    }
    set eventType(newValue: number) {
        this.__eventType.set(newValue);
    }
    render() {
        Flex.create();
        Flex.width('100%');
        Text.create();
        Text.fontFamily(this.model.typeface);
        Text.borderRadius(10);
        Text.textAlign(this.model.textalign);
        Text.padding({
            left: this.model.shouldInclude ? 14 : this.model.leftIndents,
            right: this.model.shouldInclude ? 14 : this.model.rightIndents,
            top: this.model.shouldInclude ? 14 : 0,
            bottom: this.model.shouldInclude ? 14 : 0
        });
        Text.constraintSize({
            minWidth: this.getMinWidthEms(),
            maxWidth: this.getMaxWidthEms(),
        });
        Text.maxLines(this.model.singleLine ? 1 : this.model.maxLines != null ? this.model.maxLines : 9999999 * 99999999);
        Text.textOverflow({ overflow: this.model.ellipsize });
        Text.backgroundColor(this.eventType == EventType.DOWN ? this.getTextLayoutBgColor() : this.model.bgColor);
        Text.lineHeight(30);
        Text.width(this.model.width);
        Text.onTouch((event?: TouchEvent) => {
            if (!!event) {
                if (event.type === TouchType.Down) {
                    this.eventType = EventType.DOWN;
                }
                if (event.type === TouchType.Up) {
                    this.eventType = EventType.UP;
                }
                if (event.type === TouchType.Move) {
                    this.eventType = EventType.MOVE;
                }
            }
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.getTextLayout().map((data, index): TextInfoData => {
            return { index: index, data: data };
        })), (item: TextInfoData) => {
            If.create();
            if (item.data.getTextType() == TEXT_TYPE_RICH) { // 特殊处理的字符串
                If.branchId(0);
                Span.create(this.model.textDirection == 0 ? item.data.getText() : this.stringReverse(item.data.getText()));
                Span.fontSize(item.data.getFontSize());
                Span.letterSpacing(item.data.getFontLetterSpacing());
                Span.fontColor(item.data.getFontColor());
                Span.fontStyle(item.data.getFontStyle());
                Span.onClick(() => {
                    if (this.model.clickCallback != null) {
                        this.model.clickCallback(item.data);
                    }
                });
            }
            else if (item.data.getTextType() == TEXT_TYPE_HTTP) { // 链接字符串
                If.branchId(1);
                Span.create(this.model.textDirection == 0 ? item.data.getText() : this.stringReverse(item.data.getText()));
                Span.fontSize(this.model.status ? this.model.size : this.model.size - 4);
                Span.fontColor(this.model.linkColor);
                Span.decoration({ type: TextDecorationType.Underline, color: this.model.linkColor });
                Span.fontStyle(this.model.style);
            }
            else if (item.data.getTextType() == TEXT_TYPE_NORMAL) { // 正常文字
                If.branchId(2);
                Span.create(this.model.textDirection == 0 ? item.data.getText() : this.stringReverse(item.data.getText()));
                Span.fontSize(this.model.size);
                Span.letterSpacing(this.model.letterSpacing);
                Span.fontColor(this.model.textColor);
                Span.fontStyle(this.model.style);
            }
            If.pop();
        }, (item: TextInfoData) => item.index + "");
        ForEach.pop();
        Text.pop();
        Flex.pop();
    }
    private getTextLayout(): Array<TextInfo> {
        let TextLayout = this.model.textDirection == 0 ? this.stringToArray(this.model.text) :
            this.stringToArray(this.model.text).reverse();
        return TextLayout;
    }
    /**
     * 获取文本背景色
     */
    private getTextLayoutBgColor(): string | Color | number {
        return this.model.isEnablePressState ? this.model.textPressStateStyle : this.model.bgColor;
    }
    /**
     * 获取最小宽度，以及最小字符宽度
     */
    private getMinWidthEms(): number {
        return this.model.minEms == null ? this.model.minWidth == undefined ? -1 : this.model.minWidth :
            (px2vp(fp2px(this.model.size)) + this.model.letterSpacing) * this.model.minEms + (this.model.shouldInclude ? 28 :
                this.model.leftIndents + this.model.rightIndents);
    }
    /**
     * 获取最大宽度，以及最大字符宽度
     */
    private getMaxWidthEms(): number {
        return this.model.maxEms == null ? this.model.maxWidth == undefined ? -1 : this.model.maxWidth :
            (px2vp(fp2px(this.model.size)) + this.model.letterSpacing) * this.model.maxEms + (this.model.shouldInclude ? 28 :
                this.model.leftIndents + this.model.rightIndents);
    }
    /**
     * 字符串根据规则转字符数组
     * 规则：先根据指定特殊字符索引拆分，再根据链接拆分
     * @param str
     */
    private stringToArray(str: string): Array<TextInfo> {
        // 1、处理纯空字符串
        let regu = "^[ ]+$";
        let re = new RegExp(regu);
        if (re.test(str) && !this.model.shouldLayoutZeroLengthText) {
            return new Array<TextInfo>();
        }
        // 2、根据被标记的字符段将内容拆分 string 数组
        let strArray = this.splitSpecialStr(str);
        // 3、根据链接将 strArray 数组中的每一项拆分 string 数组,最终封装成UI要显示的数据
        let resultArray = this.splitHttpStr(strArray);
        return resultArray;
    }
    /**
     * 创建 TextInfo
     * @param str   内容
     * @param strType 类型
     */
    private creatTextInfo(text: string, textType: string): TextInfo {
        let textInfo = new TextInfo();
        textInfo.setText(text);
        textInfo.setTextType(textType);
        return textInfo;
    }
    /**
     * 字符串整理
     *
     * 根据特殊标记的字符段进行拆分字符串
     * @param str
     */
    private splitSpecialStr(str: string): Array<TextInfo> {
        let strArray: TextInfo[] = new Array();
        // 提取特殊字符，封装成数组
        if (this.model.specialTextInfoArray != null && this.model.specialTextInfoArray.length > 0) {
            let endTemp = 0;
            for (let i = 0; i < this.model.specialTextInfoArray.length; i++) {
                let textRichText = this.model.specialTextInfoArray[i];
                let start = textRichText.start; // 特殊处理开始位置
                let end = textRichText.end; // 特殊处理结束位置
                let first = str.slice(0, start - endTemp);
                let second = str.slice(start - endTemp, end - endTemp);
                str = str.slice(end - endTemp, str.length);
                endTemp = end;
                let textNormal1 = this.creatTextInfo(first, TEXT_TYPE_NORMAL);
                textRichText.setTextType(TEXT_TYPE_RICH);
                textRichText.setText(second);
                strArray.push(textNormal1);
                strArray.push(textRichText);
            }
            let textNormal2 = this.creatTextInfo(str, TEXT_TYPE_NORMAL);
            strArray.push(textNormal2);
        }
        else {
            let textAllNormal = this.creatTextInfo(str, TEXT_TYPE_NORMAL);
            strArray.push(textAllNormal);
        }
        return strArray;
    }
    /**
     * 字符串整理
     * 根据 url 进行拆分字符串
     * @param strArray
     */
    private splitHttpStr(strArray: Array<TextInfo>): Array<TextInfo> {
        // url 正则
        let reg: RegExp = new RegExp('(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]', 'g');
        let bytes = new Array<TextInfo>();
        let index: number = 0;
        let tempStr: string = '';
        // 外循环是处理过特殊字符的数组
        for (let j = 0; j < strArray.length; j++) {
            // 特殊处理的字符段  打上标记 0x001,UI 显示时只要开头带有0x001说明需要特殊处理
            if (strArray[j].getTextType() == TEXT_TYPE_RICH) {
                bytes.push(strArray[j]);
                continue;
            }
            index = strArray[j].getText().indexOf(TEXT_TYPE_HTTP);
            // 提取字符串中的链接，封装进数组里
            if (index != -1) {
                let urls: Array<string> | null = null;
                urls = strArray[j].getText().match(reg);
                if (urls == null)
                    return [];
                // 内循环是处理链接相关
                for (let i = 0; i < urls.length; i++) {
                    index = strArray[j].getText().indexOf(TEXT_TYPE_HTTP);
                    if (index != -1) {
                        tempStr = strArray[j].getText().substr(0, index);
                        let textNormal = this.creatTextInfo(tempStr, TEXT_TYPE_NORMAL);
                        bytes.push(textNormal);
                        let textHttp = this.creatTextInfo(urls[i], TEXT_TYPE_HTTP);
                        bytes.push(textHttp);
                        strArray[j].setText(strArray[j].getText()
                            .substr(index + urls[i].length, (strArray[j].getText().length - 1)));
                    }
                }
                let textEndNor = this.creatTextInfo(strArray[j].getText(), TEXT_TYPE_NORMAL);
                bytes.push(textEndNor);
            }
            else {
                bytes.push(strArray[j]);
            }
        }
        return bytes;
    }
    /**
     * 字符串反转  主要用作当布局设置为反转排列时操作链接跟随反转
     * @param str
     */
    private stringReverse(str: string): string {
        let result: string = '';
        for (let i = str.length; i > -1; i--) {
            result += str.charAt(i);
        }
        return result;
        //    return str.split("").reverse().join("")  该代码在大禹板子上出现乱码
    }
}
enum EventType {
    DOWN,
    UP,
    MOVE
}
// --------------------------以下为对外提供的接口-------------------------------------------------
namespace TextLayout {
    export class Layout {
        text: string = '';
        specialTextInfoArray: Array<TextInfo>;
        specialTextInfo?: TextInfo;
        textColor: string | Color | number = '#000000';
        bgColor: string | Color | number = '';
        width: string | number = "";
        minWidth?: number;
        maxWidth?: number;
        size: number = 12;
        linkColor: string | Color | number = '#0037ff';
        isEnablePressState: boolean = false;
        textPressStateStyle: string = '#999999';
        spacingExtra?: number;
        letterSpacing: number = 0;
        minEms: number | null = null;
        maxEms?: number;
        leftIndents: number = 0;
        rightIndents: number = 0;
        shouldInclude: boolean = false;
        textalign: TextAlign = TextAlign.Start;
        textDirection: number = 0; // 0 默认正常排列自左向右，1 反向排列
        style: FontStyle = FontStyle.Normal;
        typeface: string = "Arial";
        ellipsize: TextOverflow = TextOverflow.None;
        singleLine: boolean = false;
        status: boolean = true;
        maxLines?: number;
        shouldLayoutZeroLengthText: boolean = true;
        clickCallback?: (textInfo: TextInfo) => void;
        constructor() {
            this.specialTextInfoArray = new Array<TextInfo>();
        }
        creatTempLayout() {
            let tempLayout: Layout = new Layout();
            return tempLayout;
        }
        public setSpecialTextClick(clickCallback: (textInfo: TextInfo) => void): Layout {
            this.clickCallback = clickCallback;
            return this;
        }
        public setWidth(width: string | number): Layout {
            if (this.width != width) {
                this.width = width;
            }
            return this;
        }
        public setMinWidth(minWidth: number): Layout {
            if (this.minWidth != minWidth) {
                this.minWidth = minWidth;
            }
            return this;
        }
        public getMinWidth(): number | void {
            if (this.minWidth != null) {
                return this.minWidth;
            }
        }
        public setMaxWidth(maxWidth: number): Layout {
            if (this.maxWidth != maxWidth) {
                this.maxWidth = maxWidth;
            }
            return this;
        }
        public getMaxWidth(): number | void {
            if (this.maxWidth !== null) {
                return this.maxWidth;
            }
        }
        public setText(text: string): Layout {
            if (this.text != text) {
                this.text = text;
            }
            return this;
        }
        public getText(): string {
            return this.text;
        }
        public setSpecialTextInfo(specialTextInfo: TextInfo): Layout {
            if (this.specialTextInfo != specialTextInfo) {
                this.specialTextInfo = specialTextInfo;
                this.specialTextInfoArray.push(this.specialTextInfo);
            }
            return this;
        }
        public setTextSize(size: number): Layout {
            if (this.size != size) {
                this.size = size;
            }
            return this;
        }
        public getTextSize(): number {
            return this.size;
        }
        public setTextColor(textColor: string | Color | number): Layout {
            if (this.textColor != textColor) {
                this.textColor = textColor;
            }
            return this;
        }
        public setBgColor(bgColor: string | Color | number): Layout {
            if (this.bgColor != bgColor) {
                this.bgColor = bgColor;
            }
            return this;
        }
        public getTextColor(): string | Color | number {
            return this.textColor;
        }
        public setLinkColor(linkColor: string | Color | number): Layout {
            if (this.linkColor != linkColor) {
                this.linkColor = linkColor;
            }
            return this;
        }
        public getLinkColor(): string | Color | number {
            return this.linkColor;
        }
        public setTextSpacingExtra(spacingExtra: number): Layout {
            if (this.spacingExtra != spacingExtra) {
                this.spacingExtra = spacingExtra;
            }
            return this;
        }
        public getTextSpacingExtra(): number | void {
            if (this.spacingExtra !== null) {
                return this.spacingExtra;
            }
        }
        public setIsEnablePressState(isEnablePressState: boolean): Layout {
            if (this.isEnablePressState != isEnablePressState) {
                this.isEnablePressState = isEnablePressState;
            }
            return this;
        }
        public setTextPressStateStyle(textPressStateStyle: string): Layout {
            if (this.textPressStateStyle != textPressStateStyle) {
                this.textPressStateStyle = textPressStateStyle;
            }
            return this;
        }
        public getTextPressStateStyle(): string {
            return this.textPressStateStyle;
        }
        public setUseLineSpacingFromFallbacks(status: boolean): Layout {
            if (this.status != status) {
                this.status = status;
            }
            return this;
        }
        public getUseLineSpacingFromFallbacks(): boolean {
            return this.status;
        }
        public setLetterSpacing(letterSpacing: number): Layout {
            if (this.letterSpacing != letterSpacing) {
                this.letterSpacing = letterSpacing;
            }
            return this;
        }
        public getLetterSpacing(): number {
            return this.letterSpacing;
        }
        public setMinEms(minEms: number): Layout {
            if (this.minEms != minEms) {
                this.minEms = minEms;
            }
            return this;
        }
        public getMinEms(): number | void {
            if (this.minEms !== null) {
                return this.minEms;
            }
        }
        public setMaxEms(maxEms: number): Layout {
            if (this.maxEms != maxEms) {
                this.maxEms = maxEms;
            }
            return this;
        }
        public getMaxEms(): number | void {
            if (this.maxEms !== null) {
                return this.maxEms;
            }
        }
        public setIncludeFontPadding(shouldInclude: boolean): Layout {
            if (this.shouldInclude != shouldInclude) {
                this.shouldInclude = shouldInclude;
            }
            return this;
        }
        public getIncludeFontPadding(): boolean {
            return this.shouldInclude;
        }
        public setAlignment(textalign: TextAlign): Layout {
            if (this.textalign != textalign) {
                this.textalign = textalign;
            }
            return this;
        }
        public getAlignment(): TextAlign {
            return this.textalign;
        }
        public setIndents(leftIndents: number, rightIndents: number): Layout {
            if (this.leftIndents != leftIndents) {
                this.leftIndents = leftIndents;
            }
            if (this.rightIndents != rightIndents) {
                this.rightIndents = rightIndents;
            }
            return this;
        }
        public getLeftIndents(): number {
            return this.rightIndents;
        }
        public getRightIndents(): number {
            return this.leftIndents;
        }
        public setTextDirection(textDirection: number): Layout {
            if (this.textDirection != textDirection) {
                this.textDirection = textDirection;
            }
            return this;
        }
        public getTextDirection(): number {
            return this.textDirection;
        }
        public setTextStyle(style: FontStyle): Layout {
            if (this.style != style) {
                this.style = style;
            }
            return this;
        }
        public setTypeface(typeface: string): Layout {
            if (this.typeface != typeface) {
                this.typeface = typeface;
            }
            return this;
        }
        public getTypeface(): string {
            return this.typeface;
        }
        public setEllipsize(ellipsize: TextOverflow): Layout {
            if (this.ellipsize != ellipsize) {
                this.ellipsize = ellipsize;
            }
            return this;
        }
        public getEllipsize(): TextOverflow {
            return this.ellipsize;
        }
        public setSingleLine(singleLine: boolean): Layout {
            if (this.singleLine != singleLine) {
                this.singleLine = singleLine;
            }
            return this;
        }
        public getSingleLine(): boolean {
            return this.singleLine;
        }
        public setMaxLines(maxLines: number): Layout {
            if (this.maxLines != maxLines) {
                this.maxLines = maxLines;
            }
            return this;
        }
        public getMaxLines(): number | void {
            if (this.maxLines !== null) {
                return this.maxLines;
            }
        }
        public setShouldLayoutZeroLengthText(shouldLayoutZeroLengthText: boolean) {
            if (this.shouldLayoutZeroLengthText != shouldLayoutZeroLengthText) {
                this.shouldLayoutZeroLengthText = shouldLayoutZeroLengthText;
            }
            return this;
        }
    }
}
export default TextLayout;
