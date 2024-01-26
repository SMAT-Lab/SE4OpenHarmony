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
import PropertyListParser from './PropertyListParser';
import NSNumber from './NSNumber';
import NSSet from './NSSet';
import NSString from './NSString';
import NSDate from './NSDate';
import NSData from './NSData';
import NSDictionary from './NSDictionary';
import ASCIIPropertyListParser from './ASCIIPropertyListParser';
import ArrayUtils from '../utils/ArrayUtils';
import NSObject from './NSObject';
import BinaryPropertyListWriter from './BinaryPropertyListWriter';
class NSArray extends NSObject {
    private array: Array<NSObject>;
    /**
     * Creates a new NSArray instance of the specified size.
     *
     * @param length The number of elements the NSArray instance will be able to hold.
     */
    public constructor(length?: number, arr?: NSObject[]) {
        super();
        if (!ArrayUtils.isEmpty(arr)) {
            this.array = arr;
        }
        else if (length != null && length != undefined) {
            this.array = new Array<NSObject>(length);
        }
    }
    /**
     * Returns the object stored at the given index.
     * Equivalent to <code>getArray()[i]</code>.
     *
     * @param i The index of the object.
     * @return The object at the given index.
     */
    public objectAtIndex(i: number): NSObject {
        return this.array[i];
    }
    /**
     * Removes the i-th element from the array.
     * The array will be resized.
     *
     * @param i The index of the object
     */
    public remove(i: number): void {
        if ((i >= this.array.length) || (i < 0)) {
            throw new Error("invalid index:" + i + ";the array length is " + this.array.length);
        }
        this.array.splice(i, 1);
    }
    /**
     * Stores an object at the specified index.
     * If there was another object stored at that index it will be replaced.
     * Equivalent to <code>getArray()[key] = value</code>.
     *
     * @param key   The index where to store the object.
     * @param value The object.
     */
    public setValue(key: number, value: Object): void {
        this.array.splice(key, 1, PropertyListParser.fromJavaObject(value));
    }
    /**
     * Returns the array of NSObjects represented by this NSArray.
     * Any changes to the values of this array will also affect the NSArray.
     *
     * @return The actual array represented by this NSArray.
     */
    public getArray(): Array<NSObject> {
        return this.array;
    }
    /**
     * Returns the size of the array.
     *
     * @return The number of elements that this array can store.
     */
    public count(): number {
        return this.array.length;
    }
    /**
     * Checks whether an object is present in the array or whether it is equal
     * to any of the objects in the array.
     *
     * @param obj The object to look for.
     * @return <code>true</code>, when the object could be found. <code>false</code> otherwise.
     */
    public containsObject(obj: Object): boolean {
        let nso: NSObject = PropertyListParser.fromJavaObject(obj);
        for (let elem of this.array) {
            if (elem == null) {
                if (obj == null)
                    return true;
                continue;
            }
            if (this.deepEqual(elem, nso)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Searches for an object in the array. If the specified object or an object equal to it is found,
     * its index is returned. Otherwise, -1 is returned.
     *
     * @param obj The object to look for.
     * @return The index of the object, if it was found. -1 otherwise.
     */
    public indexOfObject(obj: Object): number {
        let nso: NSObject = PropertyListParser.fromJavaObject(obj);
        for (let i = 0; i < this.array.length; i++) {
            if (this.deepEqual(this.array[i], nso)) {
                return i;
            }
        }
        return -1;
    }
    private deepEqual(obj1, obj2) {
        if (obj1 === obj2) {
            return true;
        }
        if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj1 === null) {
            return false;
        }
        let keys1 = Object.keys(obj1);
        let keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length) {
            return false;
        }
        for (let key of keys1) {
            if (!keys2.includes(key) || !this.deepEqual(obj1[key], obj2[key])) {
                return false;
            }
        }
        return true;
    }
    /**
     * Searches for a specific object in the array. If the specified object is found (reference equality),
     * its index is returned. Otherwise, -1 is returned.
     *
     * @param obj The object to look for.
     * @return The index of the object, if it was found. -1 otherwise.
     * @see #indexOfObject(Object)
     */
    public indexOfIdenticalObject(obj: Object): number {
        let nso: NSObject = PropertyListParser.fromJavaObject(obj);
        for (let i = 0; i < this.array.length; i++) {
            if (this.array[i] == nso) {
                return i;
            }
        }
        return -1;
    }
    /**
     * Returns the last object contained in this array.
     * Equivalent to <code>getArray()[getArray().length-1]</code>.
     *
     * @return The value of the highest index in the array.
     */
    public lastObject(): NSObject {
        console.info("test---" + JSON.stringify(this.array));
        return this.array[this.array.length - 1];
    }
    /**
     * Returns a new array containing only the values stored at the given
     * indices. The values are sorted by their index.
     *
     * @param indexes The indices of the objects.
     * @return The new array containing the objects stored at the given indices.
     */
    public objectsAtIndexes(indexes: number[]): NSObject[] {
        let result: Array<NSObject> = new Array(indexes.length);
        indexes.sort();
        for (let i = 0; i < indexes.length; i++) {
            result[i] = this.array[indexes[i]];
        }
        return result;
    }
    public equals(obj: Object): boolean {
        if (obj == null)
            return false;
        if (obj instanceof NSArray) {
            return ArrayUtils.equals(obj.getArray(), this.array);
        }
        else {
            let nso: NSObject = PropertyListParser.fromJavaObject(obj);
            if (nso instanceof NSArray) {
                return ArrayUtils.equals(nso.getArray(), this.array);
            }
        }
        return false;
    }
    public hashCode(): number {
        let hash: number = 7;
        hash = 89 * hash + this.array.length;
        return hash;
    }
    public clone(): NSArray {
        return new NSArray(null, this.array);
    }
    toXML(xml: string, level: number): string {
        try {
            xml = this.indent(xml, level);
            xml = xml.concat("<array>");
            xml = xml.concat(NSObject.NEWLINE);
            for (let o of this.array) {
                xml = o.toXML(xml, level + 1);
                xml = xml.concat(NSObject.NEWLINE);
            }
            xml = this.indent(xml, level);
            xml = xml.concat("</array>");
        }
        catch (e) {
            console.info("toXML err:" + JSON.stringify(e));
        }
        return xml;
    }
    assignIDs(out: BinaryPropertyListWriter): void {
        PropertyListParser.assignIDs(this, out);
        for (let obj of this.array) {
            PropertyListParser.assignIDs(obj, out);
        }
    }
    toBinary(out: BinaryPropertyListWriter): void {
        out.writeIntHeader(0xA, this.array.length);
        for (let obj of this.array) {
            out.writeID(out.getID(obj));
        }
    }
    /**
     * Generates a valid ASCII property list which has this NSArray as its
     * root object. The generated property list complies with the format.
     * Property List Programming Guide - Old-Style ASCII Property Lists</a>.
     *
     * @return ASCII representation of this object.
     */
    public toASCIIPropertyList(): string {
        let ascii: string = '';
        this.toASCII(ascii, 0);
        ascii = ascii.concat(NSObject.NEWLINE);
        return ascii;
    }
    /**
     * Generates a valid ASCII property list in GnuStep format which has this
     * NSArray as its root object. The generated property list complies with
     * the format as described in <a href="http://www.gnustep.org/resources/documentation/Developer/Base/Reference/NSPropertyList.html">
     * GnuStep - NSPropertyListSerialization class documentation
     * </a>
     *
     * @return GnuStep ASCII representation of this object.
     */
    public toGnuStepASCIIPropertyList(): string {
        let ascii: string = '';
        this.toASCIIGnuStep(ascii, 0);
        ascii = ascii.concat(NSObject.NEWLINE);
        return ascii;
    }
    public toASCII(ascii: string, level: number): void {
        ascii = this.indent(ascii, level);
        ascii = ascii.concat(ASCIIPropertyListParser.ARRAY_BEGIN_TOKEN);
        let indexOfLastNewLine = ascii.lastIndexOf(NSObject.NEWLINE);
        let i = 0;
        for (let obj of this.array) {
            if ((obj instanceof NSDictionary || obj instanceof NSArray || obj instanceof NSData)
                && indexOfLastNewLine != ascii.length) {
                ascii = ascii.concat(NSObject.NEWLINE);
                indexOfLastNewLine = ascii.length;
                obj.toASCII(ascii, level + 1);
            }
            else {
                if (i != 0)
                    ascii = ascii.concat(' ');
                if (obj instanceof NSDate || obj instanceof NSString || obj instanceof NSSet || obj instanceof NSNumber) {
                    obj.toASCII(ascii, 0);
                }
            }
            if (i != this.array.length - 1)
                ascii = ascii.concat(ASCIIPropertyListParser.ARRAY_ITEM_DELIMITER_TOKEN);
            if (ascii.length - indexOfLastNewLine > NSObject.ASCII_LINE_LENGTH) {
                ascii = ascii.concat(NSObject.NEWLINE);
                indexOfLastNewLine = ascii.length;
            }
            i++;
        }
        ascii = ascii.concat(ASCIIPropertyListParser.ARRAY_END_TOKEN);
    }
    public toASCIIGnuStep(ascii: string, level: number): void {
        ascii = this.indent(ascii, level);
        ascii = ascii.concat(ASCIIPropertyListParser.ARRAY_BEGIN_TOKEN);
        let indexOfLastNewLine = ascii.lastIndexOf(NSObject.NEWLINE);
        let i = 0;
        for (let obj of this.array) {
            if ((obj instanceof NSDictionary || obj instanceof NSArray || obj instanceof NSData)
                && indexOfLastNewLine != ascii.length) {
                ascii = ascii.concat(NSObject.NEWLINE);
                indexOfLastNewLine = ascii.length;
                obj.toASCIIGnuStep(ascii, level + 1);
            }
            else {
                if (i != 0)
                    ascii = ascii.concat(' ');
                if (obj instanceof NSDate || obj instanceof NSString || obj instanceof NSSet || obj instanceof NSNumber) {
                    obj.toASCIIGnuStep(ascii, 0);
                }
            }
            if (i != this.array.length - 1)
                ascii = ascii.concat(ASCIIPropertyListParser.ARRAY_ITEM_DELIMITER_TOKEN);
            if (ascii.length - indexOfLastNewLine > NSObject.ASCII_LINE_LENGTH) {
                ascii = ascii.concat(NSObject.NEWLINE);
                indexOfLastNewLine = ascii.length;
            }
            i++;
        }
        ascii = ascii.concat(ASCIIPropertyListParser.ARRAY_END_TOKEN);
    }
}
export default NSArray;
