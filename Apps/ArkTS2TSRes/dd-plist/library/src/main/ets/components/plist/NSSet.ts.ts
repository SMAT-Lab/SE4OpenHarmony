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
import NSString from './NSString';
import NSDate from './NSDate';
import NSData from './NSData';
import NSArray from './NSArray';
import NSDictionary from './NSDictionary';
import ASCIIPropertyListParser from './ASCIIPropertyListParser';
import NSObject from './NSObject';
import BinaryPropertyListWriter from './BinaryPropertyListWriter';
class NSSet extends NSObject {
    private set: Set<NSObject>;
    private ordered: boolean = false;
    /**
         * Creates a new NSSet instance. The created set is unordered.
         *
         */
    public constructor(ordered?: boolean, objects?: NSObject[]) {
        super();
        this.set = new Set();
        if (ordered != null && ordered != undefined) {
            this.ordered = ordered;
        }
        if (objects != null && objects.length > 0) {
            this.set = new Set(objects);
        }
    }
    /**
         * Adds an object to the set.
         *
         * @param obj The object to add.
         */
    public addObject(obj: NSObject): void {
        this.set.add(obj);
    }
    /**
         * Removes an object from the set.
         *
         * @param obj The object to remove.
         */
    public removeObject(obj: NSObject): void {
        this.set.delete(obj);
    }
    /**
         * Returns all objects contained in the set.
         *
         * @return An array of all objects in the set.
         */
    public allObjects(): Array<NSObject> {
        return Array.from(this.set);
    }
    /**
         * Returns one of the objects in the set, or <code>null</code>
         * if the set contains no objects.
         *
         * @return The first object in the set, or <code>null</code> if the set is empty.
         */
    public anyObject(): NSObject {
        if (this.set.size == 0) {
            return null;
        }
        else {
            for (let ns of this.set) {
                return ns;
            }
        }
    }
    /**
         * Finds out whether the given object is contained in the set.
         *
         * @param obj The object to look for.
         * @return <code>true</code>, when the object was found, <code>false</code> otherwise.
         */
    public containsObject(obj: NSObject): boolean {
        return this.set.has(obj);
    }
    /**
         * Determines whether the set contains an object equal to the given object
         * and returns that object if it is present.
         *
         * @param obj The object to look for.
         * @return The object if it is present, <code>null</code> otherwise.
         */
    public member(obj: NSObject): NSObject {
        for (let ns of this.set) {
            if (ns == obj) {
                return ns;
            }
        }
        return null;
    }
    /**
         * Finds out whether at least one object is present in both sets.
         *
         * @param otherSet The other set.
         * @return <code>false</code> if the intersection of both sets is empty, <code>true</code> otherwise.
         */
    public intersectsSet(otherSet: NSSet): boolean {
        for (let ns of this.set) {
            if (otherSet.containsObject(ns))
                return true;
        }
        return false;
    }
    /**
         * Finds out if this set is a subset of the given set.
         *
         * @param otherSet The other set.
         * @return <code>true</code> if all elements in this set are also present in the other set, <code>false</code> otherwise.
         */
    public isSubsetOfSet(otherSet: NSSet): boolean {
        for (let ns of this.set) {
            if (!otherSet.containsObject(ns))
                return false;
        }
        return true;
    }
    /**
         * Returns an iterator object that lets you iterate over all elements of the set.
         * This is the equivalent to <code>objectEnumerator</code> in the Cocoa implementation
         * of NSSet.
         *
         * @return The iterator for the set.
         */
    public objectIterator(): IterableIterator<NSObject> {
        return Array.from(this.set).values();
    }
    /**
         * Gets the underlying data structure in which this NSSets stores its content.
         * @return A Set object.
         */
    getSet(): Set<NSObject> {
        return this.set;
    }
    public hashCode(): number {
        let hash: number = 7;
        hash = 29 * hash + this.set.size;
        return hash;
    }
    public equals(obj: NSSet): boolean {
        if (obj == null) {
            return false;
        }
        return this.set == obj.set;
    }
    /**
         * Gets the number of elements in the set.
         *
         * @return The number of elements in the set.
         * @see Set#size()
         */
    public count(): number {
        return this.set.size;
    }
    public clone(): NSSet {
        let arr: NSObject[] = [];
        for (let ns of this.set) {
            arr.push(ns != null ? ns.clone() : null);
        }
        return new NSSet(this.ordered, arr);
    }
    //
    /**
         * Returns the XML representation for this set.
         * There is no official XML representation specified for sets.
         * In this implementation it is represented by an array.
         *
         * @param xml   The XML StringBuilder
         * @param level The indentation level
         */
    toXML(xml: string, level: number): string {
        xml = this.indent(xml, level);
        xml = xml.concat("<array>");
        xml = xml.concat(NSObject.NEWLINE);
        for (let o of this.set) {
            xml = o.toXML(xml, level + 1);
            xml = xml.concat(NSObject.NEWLINE);
        }
        xml = this.indent(xml, level);
        xml = xml.concat("</array>");
        return xml;
    }
    assignIDs(out: BinaryPropertyListWriter): void {
        PropertyListParser.assignIDs(this, out);
        for (let obj of this.set) {
            PropertyListParser.assignIDs(obj, out);
        }
    }
    toBinary(out: BinaryPropertyListWriter): void {
        if (this.ordered) {
            out.writeIntHeader(0xB, this.set.size);
        }
        else {
            out.writeIntHeader(0xC, this.set.size);
        }
        for (let obj of this.set) {
            out.writeID(out.getID(obj));
        }
    }
    /**
         * Returns the ASCII representation of this set.
         * There is no official ASCII representation for sets.
         * In this implementation sets are represented as arrays.
         *
         * @param ascii The ASCII file string builder
         * @param level The indentation level
         */
    public toASCII(ascii: string, level: number): void {
        ascii = this.indent(ascii, level);
        let array: Array<NSObject> = this.allObjects();
        ascii = ascii.concat(ASCIIPropertyListParser.ARRAY_BEGIN_TOKEN);
        let indexOfLastNewLine: number = ascii.lastIndexOf(NSObject.NEWLINE);
        let i: number = 0;
        for (let obj of array) {
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
            if (i != array.length - 1)
                ascii = ascii.concat(ASCIIPropertyListParser.ARRAY_ITEM_DELIMITER_TOKEN);
            if (ascii.length - indexOfLastNewLine > NSObject.ASCII_LINE_LENGTH) {
                ascii = ascii.concat(NSObject.NEWLINE);
                indexOfLastNewLine = ascii.length;
            }
            i++;
        }
        ascii = ascii.concat(ASCIIPropertyListParser.ARRAY_END_TOKEN);
    }
    /**
         * Returns the ASCII representation of this set according to the GnuStep format.
         * There is no official ASCII representation for sets.
         * In this implementation sets are represented as arrays.
         *
         * @param ascii The ASCII file string builder
         * @param level The indentation level
         */
    public toASCIIGnuStep(ascii: string, level: number): void {
        ascii = this.indent(ascii, level);
        let array: Array<NSObject> = this.allObjects();
        ascii = ascii.concat(ASCIIPropertyListParser.ARRAY_BEGIN_TOKEN);
        let indexOfLastNewLine: number = ascii.lastIndexOf(NSObject.NEWLINE);
        let i: number = 0;
        for (let obj of array) {
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
            if (i != array.length - 1)
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
export default NSSet;
