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
import ASCIIPropertyListParser from './ASCIIPropertyListParser';
import ArrayUtils from '../utils/ArrayUtils';
import NSObject from './NSObject';
import Base64 from './Base64';
import BinaryPropertyListWriter from './BinaryPropertyListWriter';
import HexUtils from '../utils/HexUtils';
/**
 * The NSData class is a wrapper for a byte buffer.
 */
class NSData extends NSObject {
    private readonly bytes: Int8Array;
    /**
         * Creates a new NSData instance with the specified content.
         *
         * @param bytes The data content.
         */
    constructor(bytes?: Int8Array, base64?: string) {
        super();
        if (bytes != null && bytes.length > 0) {
            this.bytes = bytes;
        }
        if (base64 != null && base64 != undefined) {
            let data: string = base64.replace(/\\s+/g, "");
            this.bytes = Base64.decodeByString(data, Base64.DONT_GUNZIP);
        }
    }
    /**
         * Returns the bytes contained in this instance.
         *
         * @return The data as bytes
         */
    public getBytes(): Int8Array {
        return this.bytes;
    }
    /**
         * Returns the number of bytes stored in this instance.
         *
         * @return The number of bytes contained in this object.
         */
    public length(): number {
        return this.bytes.length;
    }
    /**
         * Gets the Base64 encoded data contained in this instance.
         *
         * @return The data as a Base64 encoded <code>String</code>.
         */
    public getBase64EncodedData(): string {
        return Base64.encodeBytes1(this.bytes);
    }
    public equals(that: NSData): boolean {
        return that.bytes == this.bytes;
    }
    public hashCode(): number {
        let hash: number = 5;
        hash = 67 * hash + ArrayUtils.hashCode(this.bytes);
        return hash;
    }
    public clone(): NSData {
        return new NSData(this.bytes);
    }
    toXML(xml: string, level: number): string {
        xml = this.indent(xml, level);
        xml = xml + "<data>";
        xml = xml + NSObject.NEWLINE;
        let base64: string = this.getBase64EncodedData();
        for (let line of base64.split("\n")) {
            xml = this.indent(xml, level + 1);
            xml = xml + line;
            xml = xml + NSObject.NEWLINE;
        }
        xml = this.indent(xml, level);
        xml = xml + "</data>";
        return xml;
    }
    toBinary(out: BinaryPropertyListWriter): void {
        out.writeIntHeader(0x4, this.bytes.length);
        out.writeByBytes(this.bytes);
    }
    public toASCII(ascii: string, level: number): void {
        this.indent(ascii, level);
        ascii = ascii + ASCIIPropertyListParser.DATA_BEGIN_TOKEN;
        let indexOfLastNewLine: number = ascii.lastIndexOf(NSObject.NEWLINE);
        for (let i = 0; i < this.bytes.length; i++) {
            let b = this.bytes[i] & 0xFF;
            if (b < 16)
                ascii = ascii + '0';
            let arr: Int8Array = new Int8Array([b]);
            ascii = ascii + HexUtils.encodeHexStr(arr);
            if (ascii.length - indexOfLastNewLine > NSObject.ASCII_LINE_LENGTH) {
                ascii = ascii + NSObject.NEWLINE;
                indexOfLastNewLine = ascii.length;
            }
            else if ((i + 1) % 2 == 0 && i != this.bytes.length - 1) {
                ascii = ascii + ' ';
            }
        }
        ascii = ascii + ASCIIPropertyListParser.DATA_END_TOKEN;
    }
    public toASCIIGnuStep(ascii: string, level: number): void {
        this.toASCII(ascii, level);
    }
}
export default NSData;
