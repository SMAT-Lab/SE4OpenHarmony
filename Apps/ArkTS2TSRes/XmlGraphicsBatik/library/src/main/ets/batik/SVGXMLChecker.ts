let __generate__Id: number = 0;
function generateId(): string {
    return "SVGXMLChecker_" + ++__generate__Id;
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
import XMLConstants from "./constants/XMLConstants";
import SVGXMLConstants from "./constants/SVGXMLConstants";
import RegexConstants from "./constants/RegexConstants";
import { StringReader } from "./StringReader";
import { isXmlChar, isWhitespace, isNameStartChar, isNameChar, isReferenceChar, predefinedEntities } from "./util/XMLRules";
import { stringToHex } from './tools/StringToHex';
export class SVGXMLChecker {
    // 文件的顶部可能存在的编码格式字符
    private static UNICODE_FEFF: string = '\uFEFF';
    // 文本阅读器
    private _svgStringReader: StringReader | null = null;
    // 是否为根标签
    private _isRootTag = true;
    constructor() {
    }
    /**
     * 验证SVG文档是否符合规范
     * @param xml XML字符串
     * @param onSuccess 校验成功回调，失败则抛出异常
     */
    public check(xml: string, onSuccess: () => void): void {
        // 创建文件阅读器实例
        this._svgStringReader = new StringReader(this._normalizeXmlString(xml));
        // 处理Prolog:xml声明 @see https://www.w3.org/TR/xml "2.8 Prolog 文档类型声明"
        this._readProlog();
        // 读取元素节点
        if (!this._readElement()) {
            this._error('Root element is missing or invalid');
        }
        // 读取各种杂项
        while (this._readMisc()) {
        }
        // 读取结束
        if (!this._svgStringReader.isEnd()) {
            this._error('Extra content at the end of the document');
        }
        onSuccess();
    }
    /**
     * 处理文件首部可能存在的编解码符号，同时全局替换文本中的回车及换行符为 \n
     * @param xml svg文件的xml字符串
     * @return 处理之后的文本字符串
     */
    private _normalizeXmlString(xml: string): string {
        if (xml[0] === SVGXMLChecker.UNICODE_FEFF) {
            xml = xml.slice(1);
        }
        return xml.replace(RegexConstants.REGEX_GLOBAL_REPLACE_ENTER, XMLConstants.XML_LINE_FEED);
    }
    /**
     * 读取Prolog
     */
    private _readProlog(): boolean {
        let _svgStringReader: StringReader = this._svgStringReader!;
        let mark = _svgStringReader.charIndex;
        // 读取文件声明
        this._readXmlDeclaration();
        // 循环读取杂项信息：注释、处理命令、空白字符
        while (this._readMisc()) {
        }
        // 读取文档类型
        if (this._readDocTypeDeclaration()) {
            while (this._readMisc()) {
            }
        }
        return mark < _svgStringReader.charIndex;
    }
    /**
     * 读取xml声明：声明格式 <?xml version="1.x" encoding="utf-8" standalone="yes" ?>
     * @return 是否成功读取到了声明
     */
    private _readXmlDeclaration(): boolean {
        let _svgStringReader: StringReader = this._svgStringReader!;
        let xmlStartTab: string = _svgStringReader.readStringFast(XMLConstants.XML_START_TAB);
        if (!xmlStartTab) {
            this._error('Invalid XML declaration start tag');
        }
        if (!this._readWhitespace()) {
            this._error('Invalid XML declaration');
        }
        // 读取版本信息
        this._readVersionInfo();
        if (this._readWhitespace()) {
            // 读取编码格式信息
            this._readEncodingInfo();
            // 读取文档独立信息
            this._readStandaloneInfo();
        }
        if (!_svgStringReader.readStringFast(XMLConstants.XML_END_TAB)) {
            this._error('Invalid or unclosed XML declaration');
        }
        return true;
    }
    /**
     * 读取Version信息
     */
    private _readVersionInfo(): void {
        let _svgStringReader: StringReader = this._svgStringReader!;
        let version: boolean = Boolean(_svgStringReader.readStringFast(XMLConstants.XML_VERSION_KEY)) && this._readEqual();
        let versionValue: string = this._readSystemLiteral() as string;
        let versionResult: string | boolean = version && versionValue;
        if (!versionResult) {
            this._error('XML version is missing or invalid');
        }
        else if (!RegexConstants.REGEX_VERSION.test(versionValue)) {
            this._error('Invalid character in version number');
        }
    }
    /**
     * 读取编码格式信息
     */
    private _readEncodingInfo(): void {
        let _svgStringReader = this._svgStringReader!;
        let encoding: boolean = Boolean(_svgStringReader.readStringFast(XMLConstants.XML_ENCODING)) && this._readEqual();
        let encodingValue: string = this._readSystemLiteral() as string;
        let encodingResult: string | boolean = encoding && encodingValue;
        if (encodingResult) {
            this._readWhitespace();
        }
    }
    /**
     * 读取独立文档信息
     */
    private _readStandaloneInfo(): void {
        let _svgStringReader = this._svgStringReader!;
        let standaloneText = _svgStringReader.readStringFast(XMLConstants.XML_STANDALONE);
        let standalone: boolean = Boolean(standaloneText) && this._readEqual();
        let standaloneValue: string = this._readSystemLiteral() as string;
        let standaloneResult: string | boolean = standalone && standaloneValue;
        if (standaloneResult) {
            if (standaloneValue !== XMLConstants.XML_STANDALONE_YES && standaloneValue !== XMLConstants.XML_STANDALONE_NO) {
                this._error('Only `yes` and `no` are permitted as values of `standalone`');
            }
            this._readWhitespace();
        }
    }
    /**
     * 读取系统文字：`SystemLiteral`类似于属性值，但允许字符 `<`和`&`，并且不替换引用。
     * @see https://www.w3.org/TR/xml/ 2.3节 [11] SystemLiteral
     * @return {string|boolean} 返回值为去掉引号的 SystemLiteral的值或者空值，或者false;
     */
    private _readSystemLiteral(): string | boolean {
        let _svgStringReader = this._svgStringReader!;
        let quote: string = _svgStringReader.readStringFast(XMLConstants.XML_DOUBLE_QUOTATION_MARK)
            || _svgStringReader.readStringFast(XMLConstants.XML_SINGLE_QUOTATION_MARK);
        if (!quote) {
            return false;
        }
        let value: string = _svgStringReader.readUntilString(quote);
        this._validateChars(value);
        if (!_svgStringReader.readStringFast(quote)) {
            this._error('Missing end quote');
        }
        return value;
    }
    /**
     * 读取杂项：注释、处理指令、空白字符
     * @see https://www.w3.org/TR/xml/ 2.8节 [27] Misc
     * @return 是否读取到了杂项信息;
     */
    private _readMisc(): boolean {
        return this._readComment() || this._readProcessingInstruction() || this._readWhitespace();
    }
    /**
     * 读取注释
     * @see https://www.w3.org/TR/xml/ 2.5节 [15] Comment
     * @return 是否读取到了注释信息
     */
    private _readComment(): boolean {
        let _svgStringReader = this._svgStringReader!;
        if (!_svgStringReader.readStringFast(XMLConstants.XML_START_COMMENT)) {
            return false;
        }
        let content: string = _svgStringReader.readUntilString(XMLConstants.XML_DOUBLE_DASH);
        this._validateChars(content);
        if (!_svgStringReader.readStringFast(XMLConstants.XML_END_COMMENT)) {
            if (_svgStringReader.peek(2) === XMLConstants.XML_DOUBLE_DASH) {
                this._error("The string `--` isn't allowed inside a comment");
            }
            else {
                this._error('Unclosed comment');
            }
        }
        return true;
    }
    /**
     * 读取处理指令
     * @see https://www.w3.org/TR/xml/ 2.6节 [15] Pi
     * @return 是否读取到了处理指令
     */
    private _readProcessingInstruction(): boolean {
        let _svgStringReader = this._svgStringReader!;
        let mark = _svgStringReader.charIndex;
        if (!_svgStringReader.readStringFast(XMLConstants.XML_START_PROCESSING_INSTRUCTION)) {
            return false;
        }
        let name = this._readName();
        if (name) {
            if (name.toLowerCase() === XMLConstants.XML_PREFIX) {
                _svgStringReader.reset(mark);
                this._error("XML declaration isn't allowed here");
            }
        }
        else {
            this._error('Invalid processing instruction');
        }
        if (!this._readWhitespace()) {
            if (_svgStringReader.readStringFast(XMLConstants.XML_END_PROCESSING_INSTRUCTION)) {
                return true;
            }
            this._error('Whitespace is required after a processing instruction name');
        }
        let content = _svgStringReader.readUntilString(XMLConstants.XML_END_PROCESSING_INSTRUCTION);
        this._validateChars(content);
        if (!_svgStringReader.readStringFast(XMLConstants.XML_END_PROCESSING_INSTRUCTION)) {
            this._error('Unterminated processing instruction');
        }
        return true;
    }
    /**
     * 读取文档类型：doctype声明一般被丢弃
     * @see https://www.w3.org/TR/xml/ 2.8节 [28] doctypedecl
     * @return 是否读取到了文档类型声明
     */
    private _readDocTypeDeclaration(): boolean {
        let _svgStringReader = this._svgStringReader!;
        if (!_svgStringReader.readStringFast(XMLConstants.XML_DOCTYPE) || !this._readWhitespace()) {
            return false;
        }
        // 读取第一组到达 [ 或 > 的字符
        _svgStringReader.readMatchRegex(RegexConstants.REGEX_DOC_TYPE);
        // 读取从[到]>的字符串
        if (_svgStringReader.readMatchRegex(RegexConstants.REGEX_DOC_TYPE_INT_SUBSET)) {
            return true;
        }
        if (!_svgStringReader.readStringFast(XMLConstants.XML_CLOSE_TAG_END)) {
            this._error('Unclosed doctype declaration');
        }
        return true;
    }
    /**
     * 读取xml元素
     * @see https://www.w3.org/TR/xml/ 3节 [39] element
     */
    private _readElement(): boolean {
        let _svgStringReader = this._svgStringReader!;
        let mark = _svgStringReader.charIndex;
        if (_svgStringReader.peek() !== XMLConstants.XML_OPEN_TAG_START) {
            return false;
        }
        _svgStringReader.moveNext();
        let tagName = this._readName();
        if (!tagName) {
            _svgStringReader.reset(mark);
            return false;
        }
        if (this._isRootTag && tagName !== SVGXMLConstants.SVG_SVG_TAG) {
            this._error('root tag must be `svg`');
        }
        else {
            this._isRootTag = false;
        }
        let attributes: Record<string, string | boolean> = {};
        while (this._readWhitespace()) {
            let attrName = this._readName();
            if (!attrName) {
                continue;
            }
            let attrValue: boolean | string = this._readEqual() && this._readAttributeValue();
            if (!attrValue) {
                this._error('Attribute value expected');
            }
            if (attributes.attrName !== undefined) {
                this._error(`Duplicate attribute: ${attrName}`);
            }
            if (attrName === XMLConstants.XML_SPACE_QNAME
                && attrValue !== XMLConstants.XML_DEFAULT_VALUE
                && attrValue !== XMLConstants.XML_PRESERVE_VALUE) {
                this._error('Value of the `xml:space` attribute must be `default` or `preserve`');
            }
            attributes[attrName] = attrValue;
        }
        let isEmpty = Boolean(_svgStringReader.readStringFast(XMLConstants.XML_OPEN_TAG_END_NO_CHILDREN));
        if (!isEmpty) {
            if (!_svgStringReader.readStringFast('>')) {
                this._error(`Unclosed start tag for element ${tagName}`);
            }
            this._readCharData();
            while (this._readElement()
                || this._readContentReference()
                || this._readCdataSection()
                || this._readProcessingInstruction()
                || this._readComment()) {
                this._readCharData();
            }
            let endTagMark = _svgStringReader.charIndex;
            let endTagName: string = '';
            if (!_svgStringReader.readStringFast('</')
                || !(endTagName = this._readName())
                || endTagName !== tagName) {
                _svgStringReader.reset(endTagMark);
                this._error(`Missing end tag for element ${tagName}`);
            }
            this._readWhitespace();
            if (!_svgStringReader.readStringFast('>')) {
                this._error(`Unclosed end tag for element ${tagName}`);
            }
        }
        return true;
    }
    /**
     * 读取属性值
     * @see https://www.w3.org/TR/xml/ 2.3节 [10] AttValue
     * @return {string|false} 返回去掉引号的属性值，没读取到则返回false,空字符表示读取到了，但为空
     */
    private _readAttributeValue(): boolean | string {
        let _svgStringReader = this._svgStringReader!;
        let quote = _svgStringReader.peek();
        if (quote !== XMLConstants.XML_DOUBLE_QUOTATION_MARK && quote !== XMLConstants.XML_SINGLE_QUOTATION_MARK) {
            return false;
        }
        _svgStringReader.moveNext();
        let chars: string = '';
        let isClosed = false;
        let value = _svgStringReader.emptyString;
        let regex = quote === XMLConstants.XML_DOUBLE_QUOTATION_MARK
            ? RegexConstants.REGEX_DOUBLE_QUOTATION_MARK
            : RegexConstants.REGEX_SINGLE_QUOTATION_MARK;
        matchLoop: while (!_svgStringReader.isEnd()) {
            chars = _svgStringReader.readMatchRegex(regex);
            if (chars) {
                this._validateChars(chars);
                value += chars.replace(RegexConstants.REGEX_T_R_N, XMLConstants.XML_SPACE);
            }
            let nextChar = _svgStringReader.peek();
            switch (nextChar) {
                case quote:
                    isClosed = true;
                    break matchLoop;
                case '&':
                    value += this._readReference();
                    continue;
                case '<':
                    this._error('Unescaped `<` is not allowed in an attribute value');
                    break;
                case _svgStringReader.emptyString:
                    this._error('Unclosed attribute');
                    break;
            }
        }
        if (!isClosed) {
            this._error('Unclosed attribute');
        }
        _svgStringReader.moveNext();
        return value;
    }
    /**
     * 读取字符数据
     * @see https://www.w3.org/TR/xml/ 2.4节 [14] CharData
     * @return 返回是否读取到了字符数据
     */
    private _readCharData(): boolean {
        let _svgStringReader = this._svgStringReader!;
        let charData = _svgStringReader.readUntilMatch(RegexConstants.REGEX_SPECIAL_MARK);
        if (!charData) {
            return false;
        }
        this._validateChars(charData);
        if (_svgStringReader.peek() === XMLConstants.XML_SINGLE_SQUARE_BRACKETS
            && _svgStringReader.peek(3) === XMLConstants.XML_CDATA_END) {
            this._error('Element content may not contain the CDATA section close delimiter `]]>`');
        }
        return true;
    }
    /**
     * 读取引用
     * @see https://www.w3.org/TR/xml/ 4.1节 [67] Reference
     * @return 是否读取到了引用
     */
    private _readContentReference(): boolean {
        let ref = this._readReference();
        if (ref) {
            return true;
        }
        return false;
    }
    /**
     * 读取引用
     * @see https://www.w3.org/TR/xml/ 4.1节 [67] Reference
     * @return {string|false} 返回引用值，如果未读取到，则返回false
     */
    private _readReference(): string | boolean {
        let _svgStringReader = this._svgStringReader!;
        if (_svgStringReader.peek() !== '&') {
            return false;
        }
        _svgStringReader.moveNext();
        let ref = _svgStringReader.readByFunction(isReferenceChar);
        if (_svgStringReader.readByCount() !== ';') {
            this._error('Unterminated reference(a reference must end with `;`)');
        }
        let parsedValue: string = '';
        if (ref[0] === '#') {
            // 字符引用
            let codePoint = ref[1] === 'x'
                ? stringToHex(ref.slice(2), 16) // 十六进制数值
                : stringToHex(ref.slice(1), 10); // 十进制数值
            if (Number.isNaN(codePoint)) {
                this._error('Invalid character reference');
            }
            parsedValue = String.fromCodePoint(codePoint);
            if (!isXmlChar(parsedValue)) {
                this._error('character reference resolves to an invalid character');
            }
        }
        else {
            // 实体引用
            parsedValue = predefinedEntities.getValue(ref);
            ;
            if (parsedValue === undefined) {
                let wrappedRef = `&${ref}`;
                return wrappedRef;
            }
        }
        return parsedValue;
    }
    /**
     * 读取CDATA
     * @see https://www.w3.org/TR/xml/ 2.7节 [20] CDATA
     * @return boolean 返回是否读取到了CDATA数据
     */
    private _readCdataSection(): boolean {
        let _svgStringReader = this._svgStringReader!;
        if (!_svgStringReader.readStringFast('<![CDATA[')) {
            return false;
        }
        let text = _svgStringReader.readUntilString(']]>');
        this._validateChars(text);
        if (!_svgStringReader.readStringFast(']]>')) {
            this._error('Unclosed CDATA section');
        }
        return true;
    }
    /**
     * 读取一个或多个pi名称、标签名称字符
     * @see https://www.w3.org/TR/xml/ 2.3节 [5] Name
     * @return 读取到的名称字符、未读取到则返回空字符
     */
    private _readName(): string {
        return isNameStartChar(this._svgStringReader!.peek())
            ? this._svgStringReader!.readByFunction(isNameChar)
            : this._svgStringReader!.emptyString;
    }
    /**
     * 验证字符是否为正确的xml字符
     * @param strCharacter 被验证的字符串
     */
    private _validateChars(strCharacter: string): void {
        let charIndex = 0;
        for (let char of strCharacter) {
            if (!isXmlChar(char)) {
                this._svgStringReader!.reset(-(strCharacter.split('').length - charIndex));
                this._error('Invalid character');
            }
            charIndex += 1;
        }
    }
    /**
     * 读取一个或多个空白字符
     * @see https://www.w3.org/TR/xml/ 2.3节 [3] White Space
     * @return 是否读取到了空白字符
     */
    private _readWhitespace(): boolean {
        return Boolean(this._svgStringReader!.readByFunction(isWhitespace));
    }
    /**
     * 读取 '=' 字符
     * @see https://www.w3.org/TR/xml/ 2.8节 [25] Eq
     * @return 是否读取到了'='字符
     */
    private _readEqual(): boolean {
        this._readWhitespace();
        if (this._svgStringReader!.readStringFast(XMLConstants.XML_EQ)) {
            this._readWhitespace();
            return true;
        }
        return false;
    }
    /**
     * 抛出错误信息
     * @param message 错误信息
     */
    private _error(message: string): void {
        let charIndex = this._svgStringReader!.charIndex;
        let xml: string = this._svgStringReader!.xmlDetailInfo;
        let column = 1;
        let excerpt = '';
        let line = 1;
        // 找到错误信息的行数及字符位置
        for (let i = 0; i < charIndex; ++i) {
            let char = xml[i];
            if (char === XMLConstants.XML_LINE_FEED) {
                column = 1;
                excerpt = '';
                line += 1;
            }
            else {
                column += 1;
                excerpt += char;
            }
        }
        let eol = xml.indexOf(XMLConstants.XML_LINE_FEED, charIndex);
        excerpt += eol === -1
            ? xml.slice(charIndex)
            : xml.slice(charIndex, eol);
        let excerptStart = 0;
        // 将摘录保持在50个字符以内，保证始终将错误位置保持在试图中
        if (excerpt.length > 50) {
            if (column < 40) {
                excerpt = excerpt.slice(0, 50);
            }
            else {
                excerptStart = column - 20;
                excerpt = excerpt.slice(excerptStart, column + 30);
            }
        }
        class ErrTpye extends Error {
            column: number = 0;
            excerpt: string = '';
            line: number = 0;
            pos: number = charIndex;
        }
        let err: ErrTpye = new ErrTpye(`${message} (line ${line},column ${column})\n`
            + `  ${excerpt}\n`
            + ' '.repeat(column - excerptStart + 1) + '^\n');
        err.column = column;
        err.excerpt = excerpt;
        err.line = line;
        err.pos = charIndex;
        throw err;
    }
}
