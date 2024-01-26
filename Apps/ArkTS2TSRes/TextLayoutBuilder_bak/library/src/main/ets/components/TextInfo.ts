let __generate__Id: number = 0;
function generateId(): string {
    return "TextInfo_" + ++__generate__Id;
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
export class TextInfo {
    start: number = 0;
    end: number = 0;
    text: string = '';
    textType: string = '';
    fontSize: string = '';
    fontColor: string = '';
    fontLetterSpacing: string = '';
    fontStyle: FontStyle = FontStyle.Normal;
    setStart(start: number): void {
        this.start = start;
    }
    getStart(): number {
        return this.start;
    }
    setEnd(end: number): void {
        this.end = end;
    }
    getEnd(): number {
        return this.end;
    }
    setText(text: string): void {
        this.text = text;
    }
    getText(): string {
        return this.text;
    }
    setTextType(textType: string): void {
        this.textType = textType;
    }
    getTextType(): string {
        return this.textType;
    }
    setFontSize(fontSize: string): void {
        this.fontSize = fontSize;
    }
    getFontSize(): string {
        return this.fontSize;
    }
    setFontColor(fontColor: string): void {
        this.fontColor = fontColor;
    }
    getFontColor(): string {
        return this.fontColor;
    }
    setFontLetterSpacing(fontLetterSpacing: string): void {
        this.fontLetterSpacing = fontLetterSpacing;
    }
    getFontLetterSpacing(): string {
        return this.fontLetterSpacing;
    }
    setFontStyle(fontStyle: FontStyle): void {
        this.fontStyle = fontStyle;
    }
    getFontStyle(): FontStyle {
        return this.fontStyle;
    }
}
