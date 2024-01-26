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
import NumUtils from '../utils/NumUtils';
import NSObject from './NSObject';
import BinaryPropertyListParser from './BinaryPropertyListParser';
import BinaryPropertyListWriter from './BinaryPropertyListWriter';
class NSNumber extends NSObject {
    /**
     * Indicates that the number's value is an integer.
     * The number is stored as a Java <code>long</code>.
     * Its original value could have been char, short, int, long or even long long.
     */
    public static readonly INTEGER: number = 0;
    /**
     * Indicates that the number's value is a real number.
     * Its original value could have been float or double.
     */
    public static readonly REAL: number = 1;
    /**
     * Indicates that the number's value is boolean.
     */
    public static readonly BOOLEAN: number = 2;
    /** Holds the current type of this number */
    private mType: number;
    private longValue: number;
    private doubleValue: number;
    private boolValue: boolean;
    /**
     * Creates a new NSNumber instance from its binary representation.
     *
     * @param bytes The binary representation of this number.
     * @param type  The type of number.
     * @see #INTEGER
     * @see #REAL
     * @see #BOOLEAN
     */
    public constructor(bytes?: Int8Array, readonly startIndex?: number, readonly endIndex?: number, mType?: number) {
        super();
        if (bytes != undefined && bytes != null && mType != undefined && mType != null) {
            if (startIndex == undefined || startIndex == null) {
                startIndex = 0;
            }
            else {
                startIndex = startIndex;
            }
            if (endIndex == undefined || endIndex == null) {
                endIndex = bytes.length;
            }
            else {
                endIndex = endIndex;
            }
            switch (mType) {
                case NSNumber.INTEGER: {
                    this.doubleValue = this.longValue = BinaryPropertyListParser.parseLong(bytes, startIndex, endIndex);
                    break;
                }
                case NSNumber.REAL: {
                    this.doubleValue = BinaryPropertyListParser.parseDouble(bytes, startIndex, endIndex);
                    this.longValue = Math.round(this.doubleValue);
                    break;
                }
                default: {
                    throw new Error("Type argument is not valid.");
                }
            }
            this.mType = mType;
        }
    }
    /**
     * Create a NSNumber instance from its textual representation.
     *
     * @param text The textual representation of the number.
     */
    public static ceateNSNumberByText(text: string): NSNumber {
        let nsNumber: NSNumber = new NSNumber();
        if (text == null) {
            throw new Error("The given string is null and cannot be parsed as number.");
        }
        if (TextUtils.equalsIgnoreCase(text, "nan")) {
            nsNumber.doubleValue = Number.NaN;
            nsNumber.longValue = 0;
            nsNumber.mType = NSNumber.REAL;
        }
        else if (TextUtils.equalsIgnoreCase(text, "true") || TextUtils.equalsIgnoreCase(text, "yes")) {
            nsNumber.mType = NSNumber.BOOLEAN;
            nsNumber.boolValue = true;
            nsNumber.doubleValue = nsNumber.longValue = 1;
        }
        else if (TextUtils.equalsIgnoreCase(text, "false") || TextUtils.equalsIgnoreCase(text, "no")) {
            nsNumber.mType = NSNumber.BOOLEAN;
            nsNumber.boolValue = false;
            nsNumber.doubleValue = nsNumber.longValue = 0;
        }
        else {
            try {
                let l: number;
                if (text.startsWith("0x")) {
                    l = parseInt(text.substring(2), 16);
                }
                else {
                    l = parseInt(text);
                }
                nsNumber.doubleValue = nsNumber.longValue = l;
                nsNumber.mType = NSNumber.INTEGER;
            }
            catch (e1) {
                try {
                    nsNumber.doubleValue = parseInt(text);
                    nsNumber.longValue = parseFloat(nsNumber.doubleValue.toFixed());
                    nsNumber.mType = NSNumber.REAL;
                }
                catch (e2) {
                    throw new Error("The given string neither represents a double, an int nor a boolean value.");
                }
            }
        }
        return nsNumber;
    }
    /**
     * Creates a new NSNumber instance with the specified value.
     *
     * @param i The integer value.
     */
    public static createNSNumberByNumber(n: number): NSNumber {
        let nsNumber: NSNumber = new NSNumber();
        if (n.toString().indexOf('.') != -1) {
            nsNumber.doubleValue = n;
            nsNumber.longValue = nsNumber.doubleValue;
            nsNumber.mType = NSNumber.REAL;
        }
        else {
            nsNumber.doubleValue = nsNumber.longValue = n;
            nsNumber.mType = NSNumber.INTEGER;
        }
        return nsNumber;
    }
    /**
     * Creates a new NSNumber instance with the specified value.
     *
     * @param b The boolean value.
     */
    public static createNSNumberByBoolean(b: boolean): NSNumber {
        let nsNumber: NSNumber = new NSNumber();
        nsNumber.boolValue = b;
        nsNumber.doubleValue = nsNumber.longValue = b ? 1 : 0;
        nsNumber.mType = NSNumber.BOOLEAN;
        return nsNumber;
    }
    /**
     * Gets the type of this instance's value.
     *
     * @return The type flag.
     * @see #BOOLEAN
     * @see #INTEGER
     * @see #REAL
     */
    public getType(): number {
        return this.mType;
    }
    /**
     * Gets a value indicating whether the value of this NSNumber is a boolean.
     *
     * @return Whether the number's value is a boolean.
     */
    public isBoolean(): boolean {
        return this.mType == NSNumber.BOOLEAN;
    }
    /**
     * Gets a value indicating whether the value of this NSNumber is an integer.
     *
     * @return Whether the number's value is an integer.
     */
    public isInteger(): boolean {
        return this.mType == NSNumber.INTEGER;
    }
    /**
     * Gets a value indicating whether the value of this NSNumber is a real number.
     *
     * @return Whether the number's value is a real number.
     */
    public isReal(): boolean {
        return this.mType == NSNumber.REAL;
    }
    /**
     * Gets this instance's boolean value.
     *
     * @return <code>true</code> if the value is true or non-zero and not <code>Double.NaN</code>; otherwise, <code>false</code>.
     */
    public getBoolValue(): boolean {
        if (this.mType == NSNumber.BOOLEAN) {
            return this.boolValue;
        }
        else {
            return !isNaN(this.doubleValue) && this.doubleValue != 0;
        }
    }
    /**
     * Gets this instance's long integer value.
     *
     * @return The value of the number as a <code>long</code>.
     */
    public getLongValue(): number {
        if (this.mType == NSNumber.REAL && isNaN(this.doubleValue)) {
            throw new Error("The integer value is not available because the value of this NSNumber instance is NaN.");
        }
        return this.longValue;
    }
    /**
     * Gets this instance's integer value.
     * <i>Note: Even though the number's type might be INTEGER it can be larger than a Java int.
     * Use intValue() only if you are certain that it contains a number from the int range.
     * Otherwise the value might be inaccurate.</i>
     *
     * @return The value of the number as an <code>int</code>.
     */
    public getIntValue(): number {
        if (this.mType == NSNumber.REAL && isNaN(this.doubleValue)) {
            throw new Error("The integer value is not available because the value of this NSNumber instance is NaN.");
        }
        return this.longValue;
    }
    /**
     * Gets this instance's <code>double</code> value.
     *
     * @return The value of the number as a <code>double</code>.
     */
    public getDoubleValue(): number {
        return this.doubleValue;
    }
    /**
     * Gets this instance's <code>float</code> value.
     * WARNING: Possible loss of precision if the value is outside the float range.
     *
     * @return The value of the number as a <code>float</code>.
     */
    public getFloatValue(): number {
        return parseFloat(this.doubleValue.toString());
    }
    /**
     * Gets this instance's value expressed as a human-readable string.
     * @return The human-readable string representation of this number.
     */
    public stringValue(): string {
        switch (this.mType) {
            case NSNumber.INTEGER: {
                return this.longValue.toString();
            }
            case NSNumber.REAL: {
                return this.doubleValue.toString();
            }
            case NSNumber.BOOLEAN: {
                return this.boolValue.toString();
            }
            default: {
                throw new Error("The NSNumber instance has an invalid type: " + this.mType);
            }
        }
    }
    /**
     * Checks whether the other object is a NSNumber of the same value.
     *
     * @param obj The object to compare to.
     * @return Whether the objects are equal in terms of numeric value and type.
     */
    public equals(obj: NSNumber): boolean {
        return this.mType == obj.mType && this.longValue == obj.longValue && this.doubleValue == obj.doubleValue && this.boolValue == obj.boolValue;
    }
    public hashCode(): number {
        let hash: number = this.mType;
        hash = 37 * hash + (this.longValue ^ (this.longValue >>> 32));
        hash = 37 * hash + (NumUtils.doubleToLongBits(this.doubleValue) ^ (NumUtils.doubleToLongBits(this.doubleValue) >>> 32));
        hash = 37 * hash + (this.getBoolValue() ? 1 : 0);
        return hash;
    }
    public clone(): NSNumber {
        switch (this.mType) {
            case NSNumber.INTEGER: {
                return NSNumber.createNSNumberByNumber(this.longValue);
            }
            case NSNumber.REAL: {
                return NSNumber.createNSNumberByNumber(this.doubleValue);
            }
            case NSNumber.BOOLEAN: {
                return NSNumber.createNSNumberByBoolean(this.boolValue);
            }
            default: {
                throw new Error("The NSNumber instance has an invalid type: " + this.mType);
            }
        }
    }
    public toString(): string {
        switch (this.getType()) {
            case NSNumber.INTEGER: {
                return this.longValue.toString();
            }
            case NSNumber.REAL: {
                return this.doubleValue.toString();
            }
            case NSNumber.BOOLEAN: {
                return this.boolValue.toString();
            }
            default: {
                return "NSNumber";
            }
        }
    }
    toXML(xml: string, level: number): string {
        xml = this.indent(xml, level);
        switch (this.getType()) {
            case NSNumber.INTEGER: {
                xml = xml.concat("<integer>");
                xml = xml.concat(this.longValue.toString());
                xml = xml.concat("</integer>");
                break;
            }
            case NSNumber.REAL: {
                xml = xml.concat("<real>");
                xml = xml.concat(isNaN(this.doubleValue) ? "nan" : this.doubleValue.toString());
                xml = xml.concat("</real>");
                break;
            }
            case NSNumber.BOOLEAN: {
                if (this.boolValue)
                    xml = xml.concat("<true/>");
                else
                    xml = xml.concat("<false/>");
                break;
            }
            default: {
                throw new Error("The NSNumber instance has an invalid type: " + this.mType);
            }
        }
        return xml;
    }
    toBinary(out: BinaryPropertyListWriter): void {
        switch (this.getType()) {
            case NSNumber.INTEGER: {
                if (this.getLongValue() < 0) {
                    out.writeByNumber(0x13);
                    out.writeBytes(this.longValue, 8);
                }
                else if (this.longValue <= 0xff) {
                    out.writeByNumber(0x10);
                    out.writeBytes(this.getLongValue(), 1);
                }
                else if (this.longValue <= 0xffff) {
                    out.writeByNumber(0x11);
                    out.writeBytes(this.getLongValue(), 2);
                }
                else if (this.longValue <= 0xffffffff) {
                    out.writeByNumber(0x12);
                    out.writeBytes(this.longValue, 4);
                }
                else {
                    out.writeByNumber(0x13);
                    out.writeBytes(this.longValue, 8);
                }
                break;
            }
            case NSNumber.REAL: {
                out.writeByNumber(0x23);
                out.writeDouble(this.doubleValue);
                break;
            }
            case NSNumber.BOOLEAN: {
                out.writeByNumber(this.boolValue ? 0x09 : 0x08);
                break;
            }
            default: {
                throw new Error("The NSNumber instance has an invalid type: " + this.mType);
            }
        }
    }
    public toASCII(ascii: string, level: number): void {
        ascii = this.indent(ascii, level);
        if (this.isBoolean()) {
            ascii = ascii.concat(this.boolValue ? "YES" : "NO");
        }
        else {
            ascii = ascii.concat(this.toString());
        }
    }
    public toASCIIGnuStep(ascii: string, level: number): void {
        ascii = this.indent(ascii, level);
        switch (this.getType()) {
            case NSNumber.INTEGER: {
                ascii = ascii.concat("<*I");
                ascii = ascii.concat(this.toString());
                ascii = ascii.concat('>');
                break;
            }
            case NSNumber.REAL: {
                ascii = ascii.concat("<*R");
                ascii = ascii.concat(this.toString());
                ascii = ascii.concat('>');
                break;
            }
            case NSNumber.BOOLEAN: {
                if (this.getBoolValue()) {
                    ascii = ascii.concat("<*BY>");
                }
                else {
                    ascii = ascii.concat("<*BN>");
                }
                break;
            }
            default: {
                throw new Error("The NSNumber instance has an invalid type: " + this.mType);
            }
        }
    }
    public compareTo(o: Object): number {
        let x: number = this.getDoubleValue();
        let y: number;
        if (o instanceof NSNumber) {
            let num: NSNumber = o;
            y = num.getDoubleValue();
            return (x < y) ? -1 : ((x == y) ? 0 : 1);
        }
        else if (o instanceof Number) {
            y = o.valueOf();
            return (x < y) ? -1 : ((x == y) ? 0 : 1);
        }
        else {
            return -1;
        }
    }
}
export default NSNumber;
