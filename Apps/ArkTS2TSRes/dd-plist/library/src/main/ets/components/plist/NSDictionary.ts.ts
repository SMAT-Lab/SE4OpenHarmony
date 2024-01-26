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
import NSDate from './NSDate';
import NSData from './NSData';
import NSArray from './NSArray';
import ASCIIPropertyListParser from './ASCIIPropertyListParser';
import NSString from './NSString';
import TextUtils from '../utils/TextUtils';
import NSObject from './NSObject';
import BinaryPropertyListWriter from './BinaryPropertyListWriter';
class NSDictionary extends NSObject {
    private readonly dict: Map<string, NSObject>;
    /**
         * Creates a new NSDictionary instance.
         */
    public constructor() {
        super();
        this.dict = new Map<string, NSObject>();
    }
    /**
         * Gets the hash map which stores the keys and values of this dictionary.
         * Changes to the hash map are directly reflected in this dictionary.
         *
         * @return The hash map which is used by this dictionary to store its contents.
         */
    public getHashMap(): Map<string, NSObject> {
        return this.dict;
    }
    /**
         * Gets the NSObject stored for the given key.
         *
         * @param key The key.
         * @return The object.
         */
    public objectForKey(key: string): NSObject {
        return this.dict.get(key);
    }
    public getSize(): number {
        return this.dict.size;
    }
    public isEmpty(): boolean {
        return this.dict == null || this.dict == undefined || this.dict.size == 0;
    }
    public containsKey(key: string): boolean {
        return this.dict.has(key);
    }
    public containsValue(value: NSObject): boolean {
        if (value == null) {
            return false;
        }
        for (let obj of this.dict.values()) {
            if (value == obj) {
                return true;
            }
        }
        return false;
    }
    public get(key: string): NSObject {
        return this.dict.get(key);
    }
    public putAll(values: Map<string, NSObject>): void {
        for (let [key, value] of values.entries()) {
            this.put(key, value);
        }
    }
    /**
         * Puts a new key-value pair into this dictionary.
         * If the value is null, no operation will be performed on the dictionary.
         *
         * @param key The key.
         * @param obj The value.
         * @return The value previously associated to the given key,
         *         or null, if no value was associated to it.
         */
    public put(key: string, obj: NSObject): NSObject {
        if (key == null)
            return null;
        if (obj == null)
            return this.dict.get(key);
        this.dict.set(key, obj);
        return obj;
    }
    /**
         * Puts a new key-value pair into this dictionary.
         * If key or value are null, no operation will be performed on the dictionary.
         *
         * @param key The key.
         * @param obj The value. Supported object types are numbers, byte-arrays, dates, strings and arrays or sets of those.
         * @return The value previously associated to the given key,
         *         or null, if no value was associated to it.
         */
    public putByObject(key: string, obj: Object): NSObject {
        return this.put(key, PropertyListParser.fromJavaObject(obj));
    }
    /**
         * Removes a key-value pair from this dictionary.
         *
         * @param key The key
         * @return the value previously associated to the given key.
         */
    public remove(key: string): NSObject {
        let obj = this.dict.get(key);
        this.dict.delete(key);
        return obj == null ? null : obj;
    }
    /**
         * Removes all key-value pairs from this dictionary.
         */
    public clear(): void {
        this.dict.clear();
    }
    public keySet(): Set<string> {
        let keySet: Set<string> = new Set();
        for (let key of this.dict.keys()) {
            keySet.add(key);
        }
        return keySet;
    }
    public valueSet(): Set<NSObject> {
        let valueSet: Set<NSObject> = new Set();
        for (let value of this.dict.values()) {
            valueSet.add(value);
        }
        return valueSet;
    }
    public entrySet(): IterableIterator<[
        string,
        NSObject
    ]> {
        return this.dict.entries();
    }
    /**
         * Counts the number of contained key-value pairs.
         *
         * @return The size of this NSDictionary.
         */
    public count(): number {
        return this.dict.size;
    }
    public equals(obj: NSDictionary): boolean {
        return obj.dict == this.dict;
    }
    /**
         * Gets a list of all keys used in this NSDictionary.
         *
         * @return The list of all keys used in this NSDictionary.
         */
    public allKeys(): string[] {
        let keys: string[] = [];
        for (let key of this.dict.keys()) {
            keys.push(key);
        }
        return keys;
    }
    public hashCode(): number {
        let hash = 7;
        hash = 83 * hash + this.dict.size;
        return hash;
    }
    public clone(): NSDictionary {
        let clone: NSDictionary = new NSDictionary();
        for (let [key, value] of this.dict.entries()) {
            clone.dict.set(key, value != null ? value : null);
        }
        return clone;
    }
    toXML(xml: string, level: number): string {
        xml = this.indent(xml, level);
        xml = xml.concat("<dict>");
        xml = xml.concat(NSObject.NEWLINE);
        for (let key of this.dict.keys()) {
            let val: NSObject = this.objectForKey(key);
            xml = this.indent(xml, level + 1);
            xml = xml.concat("<key>");
            if (TextUtils.contains(key, "&") || TextUtils.contains(key, "<") || TextUtils.contains(key, ">")) {
                xml = xml.concat("<![CDATA[");
                xml = xml.concat(key.replace(/]]>/g, "]]]]><![CDATA[>"));
                xml = xml.concat("]]>");
            }
            else {
                xml = xml.concat(key);
            }
            xml = xml.concat("</key>");
            xml = xml.concat(NSObject.NEWLINE);
            xml = val.toXML(xml, level + 1);
            xml = xml.concat(NSObject.NEWLINE);
        }
        xml = this.indent(xml, level);
        xml = xml.concat("</dict>");
        return xml;
    }
    assignIDs(out: BinaryPropertyListWriter): void {
        PropertyListParser.assignIDs(this, out);
        for (let [key, value] of this.dict.entries()) {
            PropertyListParser.assignIDs(new NSString(null, null, null, null, key), out);
            PropertyListParser.assignIDs(value, out);
        }
    }
    toBinary(out: BinaryPropertyListWriter): void {
        out.writeIntHeader(0xD, this.dict.size);
        for (let [key, value] of this.dict.entries()) {
            out.writeID(out.getID(new NSString(null, null, null, null, key)));
            out.writeID(out.getID(value));
        }
    }
    /**
         * Generates a valid ASCII property list which has this NSDictionary as its
         * root object. The generated property list complies with the format.
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
         * NSDictionary as its root object. The generated property list complies with
         * the format
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
        ascii = ascii.concat(ASCIIPropertyListParser.DICTIONARY_BEGIN_TOKEN);
        ascii = ascii.concat(NSObject.NEWLINE);
        let keys: string[] = this.allKeys();
        for (let key of keys) {
            let val: NSObject = this.objectForKey(key);
            ascii = this.indent(ascii, level + 1);
            ascii = ascii.concat('"');
            ascii = ascii.concat(NSString.escapeStringForASCII(key));
            ascii = ascii.concat("\" =");
            if (val instanceof NSDictionary || val instanceof NSArray || val instanceof NSData) {
                ascii = ascii.concat(NSObject.NEWLINE);
                val.toASCII(ascii, level + 2);
            }
            else {
                ascii = ascii.concat(' ');
                if (val instanceof NSDate || val instanceof NSString || val instanceof NSSet || val instanceof NSNumber) {
                    val.toASCII(ascii, 0);
                }
            }
            ascii = ascii.concat(ASCIIPropertyListParser.DICTIONARY_ITEM_DELIMITER_TOKEN);
            ascii = ascii.concat(NSObject.NEWLINE);
        }
        ascii = this.indent(ascii, level);
        ascii = ascii.concat(ASCIIPropertyListParser.DICTIONARY_END_TOKEN);
    }
    public toASCIIGnuStep(ascii: string, level: number): void {
        ascii = this.indent(ascii, level);
        ascii = ascii.concat(ASCIIPropertyListParser.DICTIONARY_BEGIN_TOKEN);
        ascii = ascii.concat(NSObject.NEWLINE);
        let keys: string[] = Array.from(this.dict.keys());
        for (let key of keys) {
            let val: NSObject = this.objectForKey(key);
            ascii = this.indent(ascii, level + 1);
            ascii = ascii.concat('"');
            ascii = ascii.concat(NSString.escapeStringForASCII(key));
            ascii = ascii.concat("\" =");
            if (val instanceof NSDictionary || val instanceof NSArray || val instanceof NSData) {
                ascii = ascii.concat(NSObject.NEWLINE);
                val.toASCIIGnuStep(ascii, level + 2);
            }
            else {
                ascii = ascii.concat(' ');
                if (val instanceof NSDate || val instanceof NSString || val instanceof NSSet || val instanceof NSNumber) {
                    val.toASCIIGnuStep(ascii, 0);
                }
            }
            ascii = ascii.concat(ASCIIPropertyListParser.DICTIONARY_ITEM_DELIMITER_TOKEN);
            ascii = ascii.concat(NSObject.NEWLINE);
        }
        ascii = this.indent(ascii, level);
        ascii = ascii.concat(ASCIIPropertyListParser.DICTIONARY_END_TOKEN);
    }
}
export default NSDictionary;
