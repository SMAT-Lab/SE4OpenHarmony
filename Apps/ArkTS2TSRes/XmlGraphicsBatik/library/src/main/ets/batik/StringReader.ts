let __generate__Id: number = 0;
function generateId(): string {
    return "StringReader_" + ++__generate__Id;
}
/**
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
import RegexConstants from './constants/RegexConstants';
export class StringReader {
    // 传入的xml字符串转成的字符数组
    private _chars: string[] = new Array();
    // 字符数组的长度
    private _charCount: number = 0;
    // 字符数组转成bytes数组
    private _charsToBytes: number[] = new Array();
    // 是否为多字节模式
    private _multiByteMode: boolean = false;
    // 读取到的字符索引位置
    public charIndex: number = 0;
    // XML文件字符串
    public xmlDetailInfo: string = '';
    // 空字符
    public emptyString: string = '';
    constructor(xmlInfo: string) {
        let xmlInfoArray: string[] = xmlInfo.split('');
        this._chars = xmlInfoArray;
        this._charCount = this._chars.length;
        this._charsToBytes = new Array(this._charCount);
        this._multiByteMode = false;
        this.charIndex = 0;
        this.xmlDetailInfo = xmlInfo;
        let _chars = this._chars;
        let _charCount = this._charCount;
        let _charsToBytes = this._charsToBytes;
        if (_charCount === xmlInfo.length) {
            // 输入的字符串中没有多字节字符，所以char索引与byte索引相同
            for (let i = 0; i < _charCount; ++i) {
                _charsToBytes[i] = i;
            }
        }
        else {
            // 当字符串中包含多字节字符时，字节索引与字符索引不相等
            for (let byteIndex = 0, charIndex = 0; charIndex < _charCount; ++charIndex) {
                _charsToBytes[charIndex] = byteIndex;
                byteIndex += _chars[charIndex].length;
            }
            this._multiByteMode = true;
        }
    }
    /*
     * 返回字符数，如果字符串中包含多字节字符，字符长度可能与字节长度不同
     * @param string
     */
    private _getCharLength(characters: string): number {
        let length: number = characters.length;
        if (length < 2 || !this._multiByteMode) {
            return length;
        }
        return characters.replace(RegexConstants.REGEX_MULTIBYTE, '_').length;
    }
    // -- Public Methods ---------------------------------------------------------
    /*
     * 判断当前读取的字符位置是否为文档最后
     */
    public isEnd(): boolean {
        return this.charIndex >= this._charCount;
    }
    /*
     * 更新字符索引
     * @param count = 1 移动的字符数
     */
    public moveNext(count: number = 1): void {
        this.charIndex = Math.min(this._charCount, this.charIndex + count);
    }
    /*
     * 继续读取给定字符数，如果到达字符串末尾，则停止。读不到时返回空字符串
     * @param count 读取的字符数
     * @return 读取到的字符串
     */
    public readByCount(count: number = 1): string {
        let characters = this.peek(count);
        this.moveNext(count);
        return characters;
    }
    /*
     * 读取符合正则表达式的字符
     * @param {RegExp}regex 返回符合正则表达式的字符
     * @return 读取到的符合正则表达式的字符
     */
    public readMatchRegex(regex: RegExp): string {
        if (!regex.sticky) {
            throw new Error('`regex` must have a sticky flag ("y")');
        }
        regex.lastIndex = this._charsToBytes[this.charIndex];
        let result = regex.exec(this.xmlDetailInfo);
        if (result === null) {
            return this.emptyString;
        }
        let match = result[0];
        this.moveNext(this._getCharLength(match));
        return match;
    }
    /**
     * 在给定函数返回真值时读取字符，在返回假值或输入结束时停止。
     * @param {(char: string) => boolean} fn
     * @return 返回 读取到的符合条件的字符串
     */
    public readByFunction(fn: (char: string) => boolean): string {
        let startIndex = this.charIndex;
        while (!this.isEnd() && fn(this.peek())) {
            this.moveNext();
        }
        return this.charIndex > startIndex
            ? this.xmlDetailInfo.slice(this._charsToBytes[startIndex], this._charsToBytes[this.charIndex])
            : this.emptyString;
    }
    /**
     * 如果给定的字符串在当前的字符索引中，读取字符串并更新索引位置
     * @param pendingReadString 要读取的字符串
     * @return 返回要被读取的字符串，未读取到返回空字符串
     */
    public ReadByString(pendingReadString: string): string {
        if (this.readStringFast(pendingReadString)) {
            return pendingReadString;
        }
        if (!this._multiByteMode) {
            return this.emptyString;
        }
        let length: number = pendingReadString.length;
        let charLengthToMatch = this._getCharLength(pendingReadString);
        if (charLengthToMatch !== length
            && pendingReadString === this.peek(charLengthToMatch)) {
            this.moveNext(charLengthToMatch);
            return pendingReadString;
        }
        return this.emptyString;
    }
    /**
     * 读取给定字符
     * @param stringToConsume 要读取的字符
     * @return 要被读取的字符串
     */
    public readStringFast(pendingReadString: string): string {
        if (this.peek() === pendingReadString[0]) {
            let length: number = pendingReadString.length;
            if (length === 1) {
                this.moveNext();
                return pendingReadString;
            }
            if (this.peek(length) === pendingReadString) {
                this.moveNext(length);
                return pendingReadString;
            }
        }
        return this.emptyString;
    }
    /*
     * 读取到符合给定的全局正则表达式的字符串位置的字符串，更新lastIndex
     * @param regex 带有全局标识的正则表达式
     * @return 返回到符合正则表达式部分的字符串
     */
    public readUntilMatch(regex: RegExp): string {
        if (!regex.global) {
            throw new Error('`regex` must have a global flag ("g")');
        }
        let byteIndex = this._charsToBytes[this.charIndex];
        regex.lastIndex = byteIndex;
        let match = regex.exec(this.xmlDetailInfo);
        if (match === null || match.index === byteIndex) {
            return this.emptyString;
        }
        let result = this.xmlDetailInfo.slice(byteIndex, match.index);
        this.moveNext(this._getCharLength(result));
        return result;
    }
    /*
     * 读取从当前位置到符合搜索条件的字符串的全部字符串，如果没找到符合条件的字符串，则返回空字符串
     * @param searchString  将要查找的字符串
     * @return 返回到给定字符串部分的字符串
     */
    public readUntilString(searchString: string): string {
        let charIndex: number = this.charIndex;
        let _charsToBytes: number[] = this._charsToBytes;
        let xmlDetailInfo: string = this.xmlDetailInfo;
        let byteIndex = _charsToBytes[charIndex];
        let matchByteIndex = xmlDetailInfo.indexOf(searchString, byteIndex);
        if (matchByteIndex <= 0) {
            return this.emptyString;
        }
        let result = xmlDetailInfo.slice(byteIndex, matchByteIndex);
        this.moveNext(this._getCharLength(result));
        return result;
    }
    /*
     * 获取从当前索引位置开始的给定字符数的字符
     * @param count：要获取的字符数
     * @return 返回给定数量的字符串
     */
    public peek(count: number = 1): string {
        if (this.charIndex >= this._charCount) {
            return this.emptyString;
        }
        if (count === 1) {
            return this._chars[this.charIndex];
        }
        let _charsToBytes: number[] = this._charsToBytes;
        let charIndex: number = this.charIndex;
        return this.xmlDetailInfo.slice(_charsToBytes[charIndex], _charsToBytes[charIndex + count]);
    }
    /*
     * 重置字符索引为给定的位置，如果未给出索引位置，则重置为输入字符串的开头。
     * @param index 索引位置，如果索引为负数，向后移动指定字符数，直至字符串开头
     */
    public reset(index: number = 0): void {
        this.charIndex = index >= 0
            ? Math.min(this._charCount, index)
            : Math.max(0, this.charIndex + index);
    }
}
