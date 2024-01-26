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
import NumUtils from '../utils/NumUtils';
import PropertyListFormatException from './PropertyListFormatException';
import NSString from './NSString';
import NSData from './NSData';
import NSDate from './NSDate';
import NSNumber from './NSNumber';
import UID from './UID';
import NSArray from './NSArray';
import NSDictionary from './NSDictionary';
import NSSet from './NSSet';
import PropertyListParser from './PropertyListParser';
import ArrayUtils from '../utils/ArrayUtils';
import NSObject from './NSObject';
import { FileUtils } from '../utils/FileUtils';
class BinaryPropertyListParser {
    /**
         * Major version of the property list format
         */
    private majorVersion: number;
    /**
         * Minor version of the property list format
         */
    private minorVersion: number;
    /**
         * The property list data.
         */
    private bytes: Int8Array;
    /**
         * Length of an object reference in bytes
         */
    private objectRefSize: number;
    /**
         * The table holding the information at which offset each object is found
         */
    private offsetTable: number[];
    /**
         * Protected constructor so that instantiation is fully controlled by the
         * static parse methods.
         *
         * @see BinaryPropertyListParser#parse(byte[])
         */
    public constructor() {
        /* empty */
    }
    /**
         * Parses a binary property list from a byte array.
         *
         * @param data The binary property list's data.
         * @return The root object of the property list. This is usually a {@link NSDictionary} but can also be a {@link NSArray}.
         */
    public static parseByBytes(data: Int8Array): NSObject {
        let parser: BinaryPropertyListParser = new BinaryPropertyListParser();
        return parser.doParse(data);
    }
    /**
         * Parses a binary property list from a byte array.
         *
         * @param data The binary property list's data.
         * @return The root object of the property list. This is usually a {@link NSDictionary} but can also be a {@link NSArray}.
         */
    private doParse(data: Int8Array): NSObject {
        this.bytes = data;
        let magic: string = ArrayUtils.UniCodeUintOrInt8Array2String(BinaryPropertyListParser.copyOfRange(this.bytes, 0, 8));
        if (!magic.startsWith("bplist")) {
            throw new Error("The given data is no binary property list. Wrong magic bytes");
        }
        this.majorVersion = magic.charAt(6).charCodeAt(0) - 0x30; //ASCII number
        this.minorVersion = magic.charAt(7).charCodeAt(0) - 0x30; //ASCII number
        if (this.majorVersion > 0) {
            throw new PropertyListFormatException("Unsupported binary property list format: v" + this.majorVersion + "." + this.minorVersion + ". " +
                "Version 1.0 and later are not yet supported.");
            return;
            //Version 1.0+ is not even supported by OS X's own parser
        }
        if (this.bytes.length < 40 /* header + trailer length */) {
            throw new PropertyListFormatException("The binary property list does not contain a complete object offset table.");
            return;
        }
        // Parse trailer, last 32 bytes of the file
        let trailer: Int8Array = BinaryPropertyListParser.copyOfRange(this.bytes, this.bytes.length - 32, this.bytes.length);
        // Trailer starts with 6 null bytes (index 0 to 5)
        let offsetSize: number = BinaryPropertyListParser.parseUnsignedInt(trailer, 6, 7);
        this.objectRefSize = BinaryPropertyListParser.parseUnsignedInt(trailer, 7, 8);
        let numObjects: number = BinaryPropertyListParser.parseUnsignedInt(trailer, 8, 16);
        let topObject: number = BinaryPropertyListParser.parseUnsignedInt(trailer, 16, 24);
        let offsetTableOffset: number = BinaryPropertyListParser.parseUnsignedInt(trailer, 24, 32);
        // Validate consistency of the trailer
        if (offsetTableOffset + (numObjects + 1) * offsetSize > this.bytes.length || topObject >= this.bytes.length - 32) {
            throw new PropertyListFormatException("The binary property list contains a corrupted object offset table.");
        }
        // Calculate offset table
        this.offsetTable = new Array();
        for (let i = 0; i < numObjects; i++) {
            this.offsetTable[i] = BinaryPropertyListParser.parseUnsignedInt(this.bytes, offsetTableOffset + i * offsetSize, offsetTableOffset + (i + 1) * offsetSize);
        }
        return this.parseObject(topObject);
    }
    /**
         * Parses a binary property list from an input stream.
         * This method does not close the specified input stream.
         *
         * @param is The input stream that points to the property list's data.
         * @return The root object of the property list. This is usually a {@link NSDictionary} but can also be a {@link NSArray}.
         */
    public static parseByStream(input: any): NSObject {
        return BinaryPropertyListParser.parseByBytes(PropertyListParser.readAll(input));
    }
    /**
         * Parses a binary property list file.
         *
         * @param f The binary property list file
         * @return The root object of the property list. This is usually a {@link NSDictionary} but can also be a {@link NSArray}.
         */
    public static parseByFile(filePath: string): NSObject {
        let ss = FileUtils.openFile(filePath);
        try {
            return BinaryPropertyListParser.parseByStream(ss);
        }
        finally {
            try {
                ss.close();
            }
            catch (e) {
                // ignore
            }
        }
    }
    /**
         * Parses an object inside the currently parsed binary property list.
         * For the format specification check
         * <a href="http://www.opensource.apple.com/source/CF/CF-855.17/CFBinaryPList.c">
         * Apple's binary property list parser implementation</a>.
         *
         * @param obj The object ID.
         * @return The parsed object.
         */
    private parseObject(obj: number): NSObject {
        let offset: number = this.offsetTable[obj];
        let mType: number = this.bytes[offset];
        let objType = (mType & 0xF0) >> 4; //First  4 bits
        let objInfo = mType & 0x0F; //Second 4 bits
        switch (objType) {
            case 0x0:
                {
                    //Simple
                    switch (objInfo) {
                        case 0x0:
                            {
                                return null;
                            }
                        case 0x8:
                            {
                                //false
                                return NSNumber.createNSNumberByBoolean(false);
                            }
                        case 0x9:
                            {
                                //true
                                return NSNumber.createNSNumberByBoolean(true);
                            }
                        case 0xC:
                            {
                                //URL with no base URL (v1.0 and later)
                                throw new Error("The given binary property list contains a URL object. Parsing of this object type is not yet implemented.");
                            }
                        case 0xD:
                            {
                                //URL with base URL (v1.0 and later)
                                throw new Error("The given binary property list contains a URL object. Parsing of this object type is not yet implemented.");
                            }
                        case 0xE:
                            {
                                //16-byte UUID (v1.0 and later)
                                throw new Error("The given binary property list contains a UUID object. Parsing of this object type is not yet implemented.");
                            }
                        default:
                            {
                                throw new PropertyListFormatException("The given binary property list contains an object of unknown type (" + objType + ")");
                            }
                    }
                }
            case 0x1:
                {
                    //integer
                    let length: number = Math.pow(2, objInfo);
                    return new NSNumber(this.bytes, offset + 1, offset + 1 + length, NSNumber.INTEGER);
                }
            case 0x2:
                {
                    //real
                    let length: number = Math.pow(2, objInfo);
                    return new NSNumber(this.bytes, offset + 1, offset + 1 + length, NSNumber.REAL);
                }
            case 0x3:
                {
                    //Date
                    if (objInfo != 0x3) {
                        throw new PropertyListFormatException("The given binary property list contains a date object of an unknown type (" + objInfo + ")");
                    }
                    return new NSDate(this.bytes, offset + 1, offset + 9);
                }
            case 0x4:
                {
                    //Data
                    let lengthAndOffset: number[] = this.readLengthAndOffset(objInfo, offset);
                    let length: number = lengthAndOffset[0];
                    let dataOffset: number = lengthAndOffset[1];
                    return new NSData(BinaryPropertyListParser.copyOfRange(this.bytes, offset + dataOffset, offset + dataOffset + length));
                }
            case 0x5:
                {
                    //ASCII string
                    let lengthAndOffset: number[] = this.readLengthAndOffset(objInfo, offset);
                    let length: number = lengthAndOffset[0]; //Each character is 1 byte
                    let strOffset: number = lengthAndOffset[1];
                    return new NSString(this.bytes, "ASCII", offset + strOffset, offset + strOffset + length);
                }
            case 0x6:
                {
                    //UTF-16-BE string
                    let lengthAndOffset: number[] = this.readLengthAndOffset(objInfo, offset);
                    let characters: number = lengthAndOffset[0];
                    let strOffset: number = lengthAndOffset[1];
                    //UTF-16 characters can have variable length, but the Core Foundation reference implementation
                    //assumes 2 byte characters, thus only covering the Basic Multilingual Plane
                    let length = characters * 2;
                    return new NSString(this.bytes, "UTF-16BE", offset + strOffset, offset + strOffset + length);
                }
            case 0x7:
                {
                    //UTF-8 string (v1.0 and later)
                    let lengthAndOffset: number[] = this.readLengthAndOffset(objInfo, offset);
                    let strOffset: number = lengthAndOffset[1];
                    let characters: number = lengthAndOffset[0];
                    //UTF-8 characters can have variable length, so we need to calculate the byte length dynamically
                    //by reading the UTF-8 characters one by one
                    let length = this.calculateUtf8StringLength(this.bytes, offset + strOffset, characters);
                    return new NSString(this.bytes, "UTF-8", offset + strOffset, offset + strOffset + length);
                }
            case 0x8:
                {
                    //UID (v1.0 and later)
                    let length = objInfo + 1;
                    return new UID(obj.toString(), BinaryPropertyListParser.copyOfRange(this.bytes, offset + 1, offset + 1 + length));
                }
            case 0xA:
                {
                    //Array
                    let lengthAndOffset: number[] = this.readLengthAndOffset(objInfo, offset);
                    let length: number = lengthAndOffset[0];
                    let arrayOffset: number = lengthAndOffset[1];
                    let array: NSArray = new NSArray(length);
                    for (let i = 0; i < length; i++) {
                        let objRef: number = BinaryPropertyListParser.parseUnsignedInt(this.bytes, offset + arrayOffset + i * this.objectRefSize, offset + arrayOffset + (i + 1) * this.objectRefSize);
                        array.setValue(i, this.parseObject(objRef));
                    }
                    return array;
                }
            case 0xB:
                {
                    //Ordered set (v1.0 and later)
                    let lengthAndOffset: number[] = this.readLengthAndOffset(objInfo, offset);
                    let length: number = lengthAndOffset[0];
                    let contentOffset: number = lengthAndOffset[1];
                    let nsSet: NSSet = new NSSet(true);
                    for (let i = 0; i < length; i++) {
                        let objRef: number = BinaryPropertyListParser.parseUnsignedInt(this.bytes, offset + contentOffset + i * this.objectRefSize, offset + contentOffset + (i + 1) * this.objectRefSize);
                        nsSet.addObject(this.parseObject(objRef));
                    }
                    return nsSet;
                }
            case 0xC:
                {
                    //Set (v1.0 and later)
                    let lengthAndOffset: number[] = this.readLengthAndOffset(objInfo, offset);
                    let length: number = lengthAndOffset[0];
                    let contentOffset: number = lengthAndOffset[1];
                    let nsSet: NSSet = new NSSet();
                    for (let i = 0; i < length; i++) {
                        let objRef: number = BinaryPropertyListParser.parseUnsignedInt(this.bytes, offset + contentOffset + i * this.objectRefSize, offset + contentOffset + (i + 1) * this.objectRefSize);
                        nsSet.addObject(this.parseObject(objRef));
                    }
                    return nsSet;
                }
            case 0xD:
                {
                    //Dictionary
                    let lengthAndOffset: number[] = this.readLengthAndOffset(objInfo, offset);
                    let length: number = lengthAndOffset[0];
                    let contentOffset: number = lengthAndOffset[1];
                    let dict: NSDictionary = new NSDictionary();
                    for (let i = 0; i < length; i++) {
                        let keyRef: number = BinaryPropertyListParser.parseUnsignedInt(this.bytes, offset + contentOffset + i * this.objectRefSize, offset + contentOffset + (i + 1) * this.objectRefSize);
                        let valRef: number = BinaryPropertyListParser.parseUnsignedInt(this.bytes, offset + contentOffset + (length * this.objectRefSize) + i * this.objectRefSize, offset + contentOffset + (length * this.objectRefSize) + (i + 1) * this.objectRefSize);
                        let key: NSObject = this.parseObject(keyRef);
                        let val: NSObject = this.parseObject(valRef);
                        if (key == null) {
                            throw new Error();
                            return;
                        }
                        dict.put(key.toString(), val);
                    }
                    return dict;
                }
            default:
                {
                    throw new PropertyListFormatException("The given binary property list contains an object of unknown type (" + objType + ")");
                }
        }
    }
    /**
         * Reads the length for arrays, sets and dictionaries.
         *
         * @param objInfo Object information byte.
         * @param offset  Offset in the byte array at which the object is located.
         * @return An array with the length two. First entry is the length, second entry the offset at which the content starts.
         */
    private readLengthAndOffset(objInfo: number, offset: number): Array<number> {
        let lengthValue = objInfo;
        let offsetValue = 1;
        if (objInfo == 0xF) {
            let int_type: number = this.bytes[offset + 1];
            let intType: number = (int_type & 0xF0) >> 4;
            if (intType != 0x1) {
                console.error("BinaryPropertyListParser: Length integer has an unexpected type" + intType + ". Attempting to parse anyway...");
            }
            let intInfo: number = int_type & 0x0F;
            let intLength: number = Math.pow(2, intInfo);
            offsetValue = 2 + intLength;
            if (intLength < 3) {
                lengthValue = BinaryPropertyListParser.parseUnsignedInt(this.bytes, offset + 2, offset + 2 + intLength);
            }
            else {
                lengthValue = NumUtils.Int8Array2Number(BinaryPropertyListParser.copyOfRange(this.bytes, offset + 2, offset + 2 + intLength));
            }
        }
        return [lengthValue, offsetValue];
    }
    private calculateUtf8StringLength(bytes: Int8Array, offset: number, numCharacters: number): number {
        let length: number = 0;
        for (let i = 0; i < numCharacters; i++) {
            let tempOffset: number = offset + length;
            if (bytes.length <= tempOffset) {
                //WARNING: Invalid UTF-8 string, fall back to length = number of characters
                return numCharacters;
            }
            if (bytes[tempOffset] < 0x80) {
                length++;
            }
            if (bytes[tempOffset] < 0xC2) {
                //Invalid value (marks continuation byte), fall back to length = number of characters
                return numCharacters;
            }
            else if (bytes[tempOffset] < 0xE0) {
                if ((bytes[tempOffset + 1] & 0xC0) != 0x80) {
                    //Invalid continuation byte, fall back to length = number of characters
                    return numCharacters;
                }
                length += 2;
            }
            else if (bytes[tempOffset] < 0xF0) {
                if ((bytes[tempOffset + 1] & 0xC0) != 0x80
                    || (bytes[tempOffset + 2] & 0xC0) != 0x80) {
                    //Invalid continuation byte, fall back to length = number of characters
                    return numCharacters;
                }
                length += 3;
            }
            else if (bytes[tempOffset] < 0xF5) {
                if ((bytes[tempOffset + 1] & 0xC0) != 0x80
                    || (bytes[tempOffset + 2] & 0xC0) != 0x80
                    || (bytes[tempOffset + 3] & 0xC0) != 0x80) {
                    //Invalid continuation byte, fall back to length = number of characters
                    return numCharacters;
                }
                length += 4;
            }
        }
        return length;
    }
    /**
         * Parses an unsigned integer from a byte array.
         *
         * @param bytes The byte array containing the unsigned integer.
         * @param startIndex Beginning of the unsigned int in the byte array.
         * @param endIndex End of the unsigned int in the byte array.
         * @return The unsigned integer represented by the given bytes.
         */
    public static parseUnsignedInt(bytes: Int8Array, startIndex?: number, endIndex?: number): number {
        if (startIndex == undefined || startIndex == null) {
            startIndex = 0;
        }
        if (endIndex == undefined || endIndex == null) {
            endIndex = bytes.length;
        }
        let l = 0;
        for (let i = startIndex; i < endIndex; i++) {
            l <<= 8;
            l |= bytes[i] & 0xFF;
        }
        l &= 0xFFFFFFFF;
        return l;
    }
    /**
         * Parses a long from a (big-endian) byte array.
         *
         * @param bytes The bytes representing the long integer.
         * @param startIndex Beginning of the long in the byte array.
         * @param endIndex End of the long in the byte array.
         * @return The long integer represented by the given bytes.
         */
    public static parseLong(bytes: Int8Array, startIndex?: number, endIndex?: number): number {
        if (startIndex == undefined || startIndex == null) {
            startIndex = 0;
        }
        if (endIndex == undefined || endIndex == null) {
            endIndex = bytes.length;
        }
        let l = 0;
        for (let i = startIndex; i < endIndex; i++) {
            l <<= 8;
            l |= bytes[i] & 0xFF;
        }
        return l;
    }
    /**
         * Parses a double from a (big-endian) byte array.
         *
         * @param bytes The bytes representing the double.
         * @param startIndex Beginning of the double in the byte array.
         * @param endIndex End of the double in the byte array.
         * @return The double represented by the given bytes.
         */
    public static parseDouble(bytes: Int8Array, startIndex?: number, endIndex?: number): number {
        if (startIndex == undefined || startIndex == null) {
            startIndex = 0;
        }
        if (endIndex == undefined || endIndex == null) {
            endIndex = bytes.length;
        }
        if (endIndex - startIndex == 8) {
            return NumUtils.longBitsToDouble(BinaryPropertyListParser.parseLong(bytes, startIndex, endIndex));
        }
        else if (endIndex - startIndex == 4) {
            return NumUtils.intBitsToFloat(parseInt(BinaryPropertyListParser.parseLong(bytes, startIndex, endIndex)
                .toString()));
        }
        else {
            throw new Error("endIndex (" + endIndex + ") - startIndex (" + startIndex + ") != 4 or 8");
        }
        return 0;
    }
    /**
         * Copies a part of a byte array into a new array.
         *
         * @param src        The source array.
         * @param startIndex The index from which to start copying.
         * @param endIndex   The index until which to copy.
         * @return The copied array.
         */
    public static copyOfRange(src: Int8Array, startIndex: number, endIndex: number): Int8Array {
        let length: number = endIndex - startIndex;
        if (length < 0) {
            throw new Error("startIndex (" + startIndex + ")" + " > endIndex (" + endIndex + ")");
        }
        //        System.arraycopy(src, startIndex, dest, 0, length);
        let dest: Int8Array = src.slice(startIndex, startIndex + length);
        return dest;
    }
}
export default BinaryPropertyListParser;
