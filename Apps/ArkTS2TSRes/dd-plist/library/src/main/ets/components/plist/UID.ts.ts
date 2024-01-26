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
import NSObject from './NSObject';
import BinaryPropertyListWriter from './BinaryPropertyListWriter';
import HexUtils from '../utils/HexUtils';
/**
 * The UID class holds a unique identifier.
 * Only found in binary property lists that are keyed archives.
 *
 */
class UID extends NSObject {
    private readonly bytes: Int8Array;
    private readonly name: string;
    /**
         * Creates a new UID instance.
         * @param name The UID name.
         * @param bytes The UID value.
         */
    public constructor(name: string, bytes: Int8Array) {
        super();
        this.name = name;
        this.bytes = bytes;
    }
    /**
         * Gets this instance's value.
         * @return The UID's value.
         */
    public getBytes(): Int8Array {
        return this.bytes;
    }
    /**
         * Gets this instance's name.
         * @return The UID's name.
         */
    public getName(): string {
        return this.name;
    }
    public clone(): UID {
        return new UID(this.name, this.bytes);
    }
    /**
         * There is no XML representation specified for UIDs.
         * In this implementation UIDs are represented as hexadecimal strings in the XML output.
         *
         * @param xml   The XML StringBuilder
         * @param level The indentation level
         */
    toXML(xml: string, level: number): string {
        this.indent(xml, level);
        xml = xml + "<string>";
        for (let i = 0; i < this.bytes.length; i++) {
            let b = this.bytes[i];
            if (b < 16)
                xml = xml + '0';
            let arr: Int8Array = new Int8Array([b]);
            xml = xml + HexUtils.encodeHexStr(arr);
        }
        xml = xml + "</string>";
        return xml;
    }
    toBinary(out: BinaryPropertyListWriter): void {
        out.writeByNumber(0x80 + this.bytes.length - 1);
        out.writeByBytes(this.bytes);
    }
    public toASCII(ascii: string, level: number): void {
        this.indent(ascii, level);
        ascii = ascii + '"';
        for (let i = 0; i < this.bytes.length; i++) {
            let b = this.bytes[i];
            if (b < 16)
                ascii = ascii + '0';
            let arr: Int8Array = new Int8Array([b]);
            ascii = ascii + HexUtils.encodeHexStr(arr);
        }
        ascii = ascii + '"';
    }
    public toASCIIGnuStep(ascii: string, level: number): void {
        this.toASCII(ascii, level);
    }
}
export default UID;
