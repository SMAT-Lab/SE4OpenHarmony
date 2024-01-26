/*
 * The MIT License (MIT)
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 */
import TextUtils from '../utils/TextUtils';
import ArrayUtils from '../utils/ArrayUtils';
import NSObject from './NSObject';
import util from '@ohos.util';
import BinaryPropertyListWriter from './BinaryPropertyListWriter';
import HexUtils from '../utils/HexUtils';
/**
 * The NSString class is a wrapper for a string.
 */
class NSString extends NSObject {
    private content: string = '';
    /**
     * Creates a new NSString instance from its binary representation.
     *
     * @param bytes    The binary representation.
     * @param encoding The string encoding (name of the charset).
     */
    public constructor(bytes: Int8Array, encoding: string, readonly startIndex?: number, readonly endIndex?: number, content?: string) {
        super();
        if (!ArrayUtils.isEmpty(bytes) && !TextUtils.isEmpty(encoding)) {
            if (startIndex == null || startIndex == undefined) {
                startIndex = 0;
            }
            if (endIndex == null || endIndex == undefined) {
                endIndex = bytes.length;
            }
            this.content = ArrayUtils.Int8Array2String(bytes, encoding, startIndex, endIndex);
        }
        else if (!TextUtils.isEmpty(content)) {
            this.content = content;
        }
    }
    //
    /**
     * Gets the integer value of this string.
     *
     * @return The integer value of this string, assuming a decimal representation
     *         and skipping whitespace at the beginning of the string. If the string
     *         does not contain a valid decimal representation of a number, 0 is returned.
     *         If the string contains an integer larger than Integer.MAX_VALUE, Integer.MAX_VALUE is returned.
     *         If the string contains an integer less than Integer.MIN_VALUE, Integer.MIN_VALUE is returned.
     */
    public intValue(): number {
        let d: number = this.doubleValue();
        if (d > Number.MAX_VALUE) {
            return Number.MAX_VALUE;
        }
        if (d < Number.MIN_VALUE) {
            return Number.MIN_VALUE;
        }
        return parseInt(d.toString());
    }
    /**
     * Gets the floating-point value of this string.
     *
     * @return The floating-point value of this string, assuming a decimal representation
     *         and skipping whitespace at the beginning of the string. If the string
     *         does not contain a valid decimal representation of a number, 0 is returned.
     *         If the string contains an integer larger than Float.MAX_VALUE, Float.MAX_VALUE is returned.
     *         If the string contains an integer less than -Float.MAX_VALUE, -Float.MAX_VALUE is returned.
     */
    public floatValue(): number {
        let d: number = this.doubleValue();
        if (d > Number.MAX_VALUE) {
            return Number.MAX_VALUE;
        }
        if (d < -Number.MAX_VALUE) {
            return -Number.MAX_VALUE;
        }
        return parseFloat(d.toString());
    }
    /**
     * Gets the floating-point value (double precision) of this string.
     *
     * @return The floating-point value of this string, assuming a decimal representation
     *         and skipping whitespace at the beginning of the string. If the string does not contain
     *         a valid decimal representation of a floating-point number, 0 is returned.
     */
    public doubleValue(): number {
        //        Scanner s = new Scanner(this.content.trim()).useLocale(Locale.ROOT).useDelimiter("[^0-9.+-]+");
        let value: number = 0;
        for (let num of this.content.trim().match(/^(-?\d+)(\.\d+)?$/g)) {
            value = parseFloat(num);
        }
        if (value != 0) {
            return value;
        }
        return 0;
    }
    /**
     * Gets the boolean value of this string.
     *
     * @return The boolean value of this string. Leading whitespaces are ignored. Any + or - sign and leading zeroes are
     *         ignored.
     *         If the remaining string starts with 'Y', 'y', 'T', 't' or a positive digit (1-9), true is returned.
     *         Otherwise, false is returned.
     *
     *         Examples:
     *         "YES" is true
     *         "true" is true
     *         " YES" is true
     *         "+1" is true
     *         "-9" is true
     *         " +01" is true
     *         "0" is false
     *         "false" is false
     *         "no" is false
     *         "1FALSE" is true
     *         "0TRUE" is true
     *         "FALSE1" is false
     */
    public boolValue(): boolean {
        const regex: RegExp = /([+-]?0*)?[YyTt1-9].*/;
        // 使用正则表达式检查字符串
        const match: RegExpExecArray | null = regex.exec(this.content);
        // 检查是否有匹配项
        if (match) {
            // 如果有匹配项，你可以访问匹配结果
            return true;
        }
        else {
            // 如果没有匹配项，你可以在此处处理
            return false;
        }
    }
    /**
     * Gets the string content of this instance.
     *
     * @return This string contained in this instance.
     */
    public getContent(): string {
        return this.content;
    }
    /**
     * Sets the string content of this instance.
     *
     * @param c The new content of this string object.
     */
    public setContent(c: string): void {
        this.content = c;
    }
    /**
     * Appends a string to this string.
     *
     * @param s The string to append.
     */
    public append(ns?: NSString, s?: string): void {
        if (ns != null && ns != undefined) {
            this.content += ns.getContent();
        }
        else if (!TextUtils.isEmpty(s)) {
            this.content += s;
        }
        else {
            throw new Error("require at least 1 parameter");
        }
    }
    /**
     * Prepends a string to this string.
     *
     * @param s The string to prepend.
     */
    public prepend(ns?: NSString, s?: string): void {
        if (ns != null && ns != undefined) {
            this.content = ns.getContent() + this.content;
        }
        else if (!TextUtils.isEmpty(s)) {
            this.content = s + this.content;
        }
        else {
            throw new Error("require at least 1 parameter");
        }
    }
    public equals(obj: NSString): boolean {
        return this.content == obj.content;
    }
    public hashCode(): number {
        return TextUtils.hashCode(this.content);
    }
    public toString(): string {
        return this.content;
    }
    public clone(): NSString {
        return new NSString(null, null, null, null, this.content);
    }
    toXML(xml: string, level: number): string {
        xml = this.indent(xml, level);
        xml = xml.concat("<string>");
        let cleanedContent: string = NSString.escapeStringForXml(this.content);
        //According to http://www.w3.org/TR/REC-xml/#syntax node values must not
        //contain the characters < or &. Also the > character should be escaped.
        if (TextUtils.contains(cleanedContent, "&") || TextUtils.contains(cleanedContent, "<") || TextUtils.contains(cleanedContent, ">")) {
            xml = xml.concat("<![CDATA[");
            xml = xml.concat(cleanedContent.replace(/]]>/g, "]]]]><![CDATA[>"));
            xml = xml.concat("]]>");
        }
        else {
            xml = xml.concat(cleanedContent);
        }
        xml = xml.concat("</string>");
        return xml;
    }
    public toBinary(out: BinaryPropertyListWriter): void {
        let bytes: Int8Array = new Int8Array(this.content.length);
        let kind: number = 0x5;
        for (let i = 0; i < this.content.length; i++) {
            if (this.content.charCodeAt(i) > 127) {
                kind = 0x6;
            }
            bytes[i] = (this.content.charCodeAt(i));
        }
        //        byte[] bytes = new byte[byteBuf.remaining()];
        //        byteBuf.get(bytes);
        out.writeIntHeader(kind, this.content.length);
        out.writeByBytes(bytes);
    }
    public toASCII(ascii: string, level: number): void {
        ascii = this.indent(ascii, level);
        ascii = ascii.concat("\"");
        //According to https://developer.apple.com/library/mac/#documentation/Cocoa/Conceptual/PropertyLists/OldStylePlists/OldStylePLists.html
        //non-ASCII characters are not escaped but simply written into the
        //file, thus actually violating the ASCII plain text format.
        //We will escape the string anyway because current Xcode project files (ASCII property lists) also escape their strings.
        ascii = ascii.concat(NSString.escapeStringForASCII(this.content));
        ascii = ascii.concat("\"");
    }
    public toASCIIGnuStep(ascii: string, level: number): void {
        ascii = this.indent(ascii, level);
        ascii = ascii.concat("\"");
        ascii = ascii.concat(NSString.escapeStringForASCII(this.content));
        ascii = ascii.concat("\"");
    }
    public compareTo(o: Object): number {
        if (o instanceof NSString) {
            return this.getContent().localeCompare(o.getContent());
        }
        else if (o instanceof String) {
            return this.getContent().localeCompare(o.valueOf());
        }
        else if (typeof (o) == 'string') {
            return this.getContent().localeCompare(o);
        }
        else {
            return -1;
        }
    }
    /**
     * Escapes a string for use in ASCII property lists.
     *
     * @param s The unescaped string.
     * @return The escaped string.
     */
    static escapeStringForASCII(s: string): string {
        let out: string = '';
        let arr: Array<string> = ArrayUtils.string2Array(s);
        for (let c of arr) {
            if (c.charCodeAt(0) > 127) {
                //non-ASCII Unicode
                out = out.concat("\\U");
                let nums: Int8Array = new Int8Array([c.charCodeAt(0)]);
                HexUtils.encodeHexStr(nums);
                let hex: string = HexUtils.encodeHexStr(nums);
                while (hex.length < 4)
                    hex = "0" + hex;
                out = out.concat(hex);
            }
            else if (c == '\\') {
                out = out.concat("\\\\");
            }
            else if (c == "\'") {
                out = out.concat("\\\"");
            }
            else if (c == '\b') {
                out = out.concat("\\b");
            }
            else if (c == '\n') {
                out = out.concat("\\n");
            }
            else if (c == '\r') {
                out = out.concat("\\r");
            }
            else if (c == '\t') {
                out = out.concat("\\t");
            }
            else {
                out = out.concat(c);
            }
        }
        return out;
    }
    static escapeStringForXml(s: string): string {
        let sb: string = '';
        for (let i = 0; i < s.length; i++) {
            let codePoint: number = s.codePointAt(i);
            if (codePoint > 0xFFFF) {
                i++;
            }
            if ((codePoint == 0x9) || (codePoint == 0xA) || (codePoint == 0xD)
                || ((codePoint >= 0x20) && (codePoint <= 0xD7FF))
                || ((codePoint >= 0xE000) && (codePoint <= 0xFFFD))
                || ((codePoint >= 0x10000) && (codePoint <= 0x10FFFF))) {
                sb = sb + String.fromCharCode(codePoint);
            }
        }
        return sb.toString();
    }
}
export default NSString;
