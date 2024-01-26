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
import DateUtils from '../utils/DateUtils';
import TextUtils from '../utils/TextUtils';
import BinaryPropertyListParser from './BinaryPropertyListParser';
import ArrayUtils from '../utils/ArrayUtils';
import NSObject from './NSObject';
import BinaryPropertyListWriter from './BinaryPropertyListWriter';
class NSDate extends NSObject {
    private date: Date;
    private static readonly EPOCH: number = 978307200000;
    private static readonly sdfDefault: string = "yyyy-MM-dd'T'HH:mm:ss'Z'";
    private static readonly sdfGnuStep: string = "yyyy-MM-dd HH:mm:ss Z";
    /**
         * Creates new NSDate instance from its binary representation.
         *
         * @param bytes The binary date representation.
         */
    public constructor(bytes?: Int8Array, readonly startIndex?: number, readonly endIndex?: number, textRepresentation?: string, d?: Date) {
        super();
        if (!ArrayUtils.isEmpty(bytes)) {
            if (startIndex == null || startIndex == undefined) {
                startIndex = 0;
            }
            if (endIndex == null || endIndex == undefined) {
                endIndex = bytes.length;
            }
            this.date = new Date(NSDate.EPOCH + (1000 * BinaryPropertyListParser.parseDouble(bytes, startIndex, endIndex)));
        }
        else if (!TextUtils.isEmpty(textRepresentation)) {
            this.date = new Date(textRepresentation);
        }
        else if (d != null && d != undefined) {
            this.date = d;
        }
    }
    /**
         * Generates a string representation of a Java Date object. The string
         * is formatted according to the specification for XML property list dates.
         *
         * @param date The date which should be represented.
         * @return The string representation of the date.
         */
    private static makeDateString(date: Date): string {
        return DateUtils.dateFormat(date, NSDate.sdfDefault);
    }
    /**
         * Generates a string representation of a Java Date object. The string
         * is formatted according to the specification for GnuStep ASCII property
         * list dates.
         *
         * @param date The date which should be represented.
         * @return The string representation of the date.
         */
    private static makeDateStringGnuStep(date: Date): string {
        return DateUtils.dateFormat(date, NSDate.sdfGnuStep);
    }
    /**
         * Gets the date.
         *
         * @return The date.
         */
    public getDate(): Date {
        return this.date;
    }
    public equals(obj: NSDate): boolean {
        return this.date.toString() == obj.date.toString();
    }
    public hashCode(): number {
        return TextUtils.hashCode(DateUtils.dateFormat(this.date, NSDate.sdfGnuStep));
    }
    public clone(): NSDate {
        return new NSDate(null, null, null, null, this.date);
    }
    toXML(xml: string, level: number): string {
        xml = this.indent(xml, level);
        xml = xml.concat("<date>");
        xml = xml.concat(NSDate.makeDateString(this.date));
        xml = xml.concat("</date>");
        return xml;
    }
    public toBinary(out: BinaryPropertyListWriter): void {
        out.writeByNumber(0x33);
        out.writeDouble((this.date.getTime() - NSDate.EPOCH) / 1000.0);
    }
    /**
         * Generates a string representation of the date.
         *
         * @return A string representation of the date.
         */
    public toString(): string {
        return this.date.toString();
    }
    public toASCII(ascii: string, level: number): void {
        ascii = this.indent(ascii, level);
        ascii = ascii.concat('"');
        ascii = ascii.concat(NSDate.makeDateString(this.date));
        ascii = ascii.concat('"');
    }
    public toASCIIGnuStep(ascii: string, level: number): void {
        ascii = this.indent(ascii, level);
        ascii = ascii.concat("<*D");
        ascii = ascii.concat(NSDate.makeDateStringGnuStep(this.date));
        ascii = ascii.concat('>');
    }
}
export default NSDate;
