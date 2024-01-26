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
import NSDate from './NSDate';
import UID from './UID';
import NSData from './NSData';
import NSSet from './NSSet';
import NSNumber from './NSNumber';
import NSString from './NSString';
import PropertyListFormatException from './PropertyListFormatException';
import NSArray from './NSArray';
import NSDictionary from './NSDictionary';
import BinaryPropertyListWriter from './BinaryPropertyListWriter';
import BinaryPropertyListParser from './BinaryPropertyListParser';
import ASCIIPropertyListParser from './ASCIIPropertyListParser';
import XMLPropertyListParser from './XMLPropertyListParser';
import NSObject from './NSObject';
import ArrayUtils from '../utils/ArrayUtils';
import fs from '@ohos.file.fs';
import { FileUtils } from '../utils/FileUtils';
class PropertyListParser {
    private static readonly TYPE_XML: number = 0;
    private static readonly TYPE_BINARY: number = 1;
    private static readonly TYPE_ASCII: number = 2;
    private static readonly TYPE_ERROR_BLANK: number = 10;
    private static readonly TYPE_ERROR_UNKNOWN: number = 11;
    private static readonly READ_BUFFER_LENGTH: number = 2048;
    /**
     * Prevent instantiation.
     */
    public constructor() {
        /* empty */
    }
    /**
     * Determines the type of a property list by means of the first bytes of its data
     * @param dataBeginning The very first bytes of data of the property list (minus any whitespace) as a string
     * @return The type of the property list
     */
    private static determineTypeByString(dataBeginning: string): number {
        if (!dataBeginning) {
            return PropertyListParser.TYPE_ERROR_UNKNOWN;
        }
        dataBeginning = dataBeginning.trim();
        if (dataBeginning.length == 0) {
            return PropertyListParser.TYPE_ERROR_BLANK;
        }
        if (dataBeginning.startsWith("bplist")) {
            return PropertyListParser.TYPE_BINARY;
        }
        if (dataBeginning.startsWith("(") || dataBeginning.startsWith("{") || dataBeginning.startsWith("/")) {
            return PropertyListParser.TYPE_ASCII;
        }
        if (dataBeginning.startsWith("<")) {
            return PropertyListParser.TYPE_XML;
        }
        return PropertyListParser.TYPE_ERROR_UNKNOWN;
    }
    /**
     * Determines the type of a property list by means of the first bytes of its data
     * @param bytes The very first bytes of data of the property list (minus any whitespace)
     * @return The type of the property list
     */
    private static determineTypeByArray(bytes: Int8Array): number {
        //Skip any possible whitespace at the beginning of the file
        let offset: number = 0;
        if (bytes.length >= 3 && (bytes[0] & 0xFF) == 0xEF && (bytes[1] & 0xFF) == 0xBB && (bytes[2] & 0xFF) == 0xBF) {
            //Skip Unicode byte order mark (BOM)
            offset += 3;
        }
        while (offset < bytes.length &&
            (bytes[offset] == 32 /*‘ ’.charCodeAt(0)*/
                || bytes[offset] == 9 /*'\t'.charCodeAt(0)*/
                || bytes[offset] == 13 /*'\r'.charCodeAt(0)*/
                || bytes[offset] == 10 /*'\n'.charCodeAt(0)*/
                || bytes[offset] == 12 /*'\f'.charCodeAt(0)*/)) {
            offset++;
        }
        return PropertyListParser.determineTypeByString(ArrayUtils.Int8Array2String(bytes, "UTF-8", offset, Math.min(8, bytes.length - offset)));
    }
    /**
     * Determines the type of a property list by means of the first bytes of its data
     * @param is An input stream pointing to the beginning of the property list data.
     *           If the stream supports marking it will be reset to the beginning of the property
     *           list data after the type has been determined.
     * @param offset The number of bytes to skip in the stream.
     * @return The type of the property list
     */
    private static determineTypeByStream(input: fs.Stream, offset: number): number {
        let index: number = offset;
        let readLimit: number = index + 1024;
        let b: number;
        let bom: boolean = false;
        //Skip any possible whitespace at the beginning of the file
        do {
            if (++index > readLimit) {
                return PropertyListParser.determineTypeByStream(input, readLimit);
            }
            let ab: ArrayBuffer = new ArrayBuffer(readLimit);
            input.readSync(ab, { offset: offset });
            let arr: Int8Array = new Int8Array(ab);
            b = arr[0];
            //Check if we are reading the Unicode byte order mark (BOM) and skip it
            bom = index < 3 && ((index == 0 && b == 0xEF) || (bom && ((index == 1 && b == 0xBB) || (index == 2 && b == 0xBF))));
        } while (b != -1 && (b == 32 /*' '.charCodeAt(0)*/
            || b == 9 /*'\t'.charCodeAt(0)*/
            || b == 13 /*'\r'.charCodeAt(0)*/
            || b == 10 /*'\n'.charCodeAt(0)*/
            || b == 12 /*'\f'.charCodeAt(0)*/
            || bom));
        if (b == -1) {
            return PropertyListParser.TYPE_ERROR_BLANK;
        }
        let magicBytes: ArrayBuffer = new ArrayBuffer(8);
        let magicArr: Int8Array = new Int8Array(magicBytes);
        magicArr[0] = b;
        let read: number = input.readSync(magicBytes, { offset: 1, length: 7 });
        let mType: number = PropertyListParser.determineTypeByString(ArrayUtils.arrayBuffer2String(magicBytes, "UTF-8", 0, read + 1));
        return mType;
    }
    /**
     * Reads all bytes from an InputStream and stores them in an array, up to
     * a maximum count.
     *
     * @param in  The InputStream pointing to the data that should be stored in the array.
     * @return An array containing all bytes that were read from the input stream.
     */
    public static readAll(input: any): Int8Array {
        let magicBytes: ArrayBuffer = new ArrayBuffer(8192);
        input.readSync(magicBytes, { position: 0 });
        return new Int8Array(magicBytes);
    }
    /**
     * Parses a property list from a file.
     *
     * @param f The property list file.
     * @return The root object in the property list. This is usually a {@link NSDictionary} but can also be a {@link NSArray}.
     * @Deprecated() Use {@link parseByPath} instead.
     */
    public static parse(filePath: string, func?: Function): NSObject {
        let exits = fs.accessSync(filePath);
        if (!exits) {
            return null;
        }
        let file = fs.openSync(filePath, fs.OpenMode.READ_WRITE);
        let stat = fs.statSync(filePath);
        let buf = new ArrayBuffer(stat.size);
        let readLen = fs.readSync(file.fd, buf);
        let uint8array = new Uint8Array(buf.slice(0, readLen));
        const int8Array: Int8Array = new Int8Array(uint8array.buffer);
        let result = this.parseByBytes(int8Array, func);
        return result;
    }
    /**
     * Parses a property list from a file.
     *
     * @param f The property list file.
     * @return The root object in the property list. This is usually a {@link NSDictionary} but can also be a {@link NSArray}.
     */
    public static parseByPath(filePath: string, func: Function) {
        let exits = fs.accessSync(filePath);
        if (!exits) {
            return null;
        }
        let file = fs.openSync(filePath, fs.OpenMode.READ_WRITE);
        let stat = fs.statSync(filePath);
        let buf = new ArrayBuffer(stat.size);
        let readLen = fs.readSync(file.fd, buf);
        let uint8array = new Uint8Array(buf.slice(0, readLen));
        const int8Array: Int8Array = new Int8Array(uint8array.buffer);
        this.parseByInt8Array(int8Array, func);
        fs.closeSync(file);
    }
    /**
     * Parses a property list from a file.
     *
     * @param file file.
     * @return The root object in the property list. This is usually a {@link NSDictionary} but can also be a {@link NSArray}.
     */
    public static parseByFile(file: fs.File, func: Function) {
        let stat = fs.statSync(file.fd);
        let buf = new ArrayBuffer(stat.size);
        let readLen = fs.readSync(file.fd, buf);
        let uint8array = new Uint8Array(buf.slice(0, readLen));
        const int8Array: Int8Array = new Int8Array(uint8array.buffer);
        this.parseByInt8Array(int8Array, func);
        fs.closeSync(file);
    }
    /**
     * Parses a property list from a byte array.
     *
     * @param bytes The property list data as a byte array.
     * @return The root object in the property list. This is usually a {@link NSDictionary} but can also be a {@link NSArray}.
     * @Deprecated() Use {@link parseByInt8Array} instead.
     */
    public static parseByBytes(bytes: Int8Array, func?: Function): NSObject {
        switch (PropertyListParser.determineTypeByArray(bytes)) {
            case PropertyListParser.TYPE_BINARY:
                return BinaryPropertyListParser.parseByBytes(bytes);
            case PropertyListParser.TYPE_XML:
                if (!!!func) {
                    throw new PropertyListFormatException("func parameter is undefined");
                }
                new XMLPropertyListParser().parseByBytes(bytes, func);
                return null;
            case PropertyListParser.TYPE_ASCII:
                return ASCIIPropertyListParser.parseByBytes(bytes);
            case PropertyListParser.TYPE_ERROR_BLANK:
                return null;
            default:
                throw new PropertyListFormatException("The given data is not a property list of a supported format.");
        }
    }
    /**
     * Parses a property list from a byte array.
     *
     * @param bytes The property list data as a byte array.
     * @return The root object in the property list. This is usually a {@link NSDictionary} but can also be a {@link NSArray}.
     */
    public static async parseByInt8Array(bytes: Int8Array, func: Function) {
        switch (PropertyListParser.determineTypeByArray(bytes)) {
            case PropertyListParser.TYPE_BINARY:
                func(BinaryPropertyListParser.parseByBytes(bytes));
                break;
            case PropertyListParser.TYPE_XML:
                let parser = new XMLPropertyListParser();
                parser.parseByBytes(bytes, (obj: NSObject) => {
                    func(obj);
                });
                break;
            case PropertyListParser.TYPE_ASCII:
                func(ASCIIPropertyListParser.parseByBytes(bytes));
                break;
            case PropertyListParser.TYPE_ERROR_BLANK:
                func(null);
                break;
            default:
                throw new PropertyListFormatException("The given data is not a property list of a supported format.");
        }
    }
    /**
     * Parses a property list from an InputStream.
     * This method does not close the specified input stream.
     *
     * @param is The InputStream delivering the property list data.
     * @return The root object of the property list. This is usually a {@link NSDictionary} but can also be a {@link NSArray}.
     */
    public static parseByStream(input: any, func?: Function): NSObject {
        switch (PropertyListParser.determineTypeByStream(input, 0)) {
            case PropertyListParser.TYPE_BINARY:
                return BinaryPropertyListParser.parseByStream(input);
            case PropertyListParser.TYPE_XML:
                new XMLPropertyListParser().parseByStream(func, input);
                return null;
            case PropertyListParser.TYPE_ASCII:
                return ASCIIPropertyListParser.parseByStream(input);
            case PropertyListParser.TYPE_ERROR_BLANK:
                return null;
            default:
                throw new PropertyListFormatException("The given data is not a property list of a supported format.");
        }
    }
    /**
     * Saves a property list with the given object as root into a XML file.
     *
     * @param root The root object.
     * @param out  The output file.
     */
    public static saveAsXML(root: NSObject, filePath: string): void {
        PropertyListParser.saveAsXMLByStream(root, filePath);
    }
    /**
     * Saves a property list with the given object as root into a XML file.
     *
     * @param root The root object.
     * @param out  The output file.
     */
    public static saveAsXMLByFile(root: NSObject, file: fs.File): void {
        try {
            let xml = root.toXMLPropertyList();
            fs.writeSync(file.fd, xml);
            fs.closeSync(file);
        }
        catch (e) {
            fs.closeSync(file);
            new Error(JSON.stringify(e));
        }
    }
    /**
     * Saves a property list with the given object as root in XML format into an output stream.
     * This method does not close the specified input stream.
     *
     * @param root The root object.
     * @param out  The output stream.
     */
    public static saveAsXMLByStream(root: NSObject, filePath: string): void {
        let stream = FileUtils.openFile(filePath);
        if (!stream) {
            return;
        }
        stream.writeSync(root.toXMLPropertyList());
        stream.flushSync();
    }
    public static saveAsXMLToStream(root: NSObject, stream: fs.Stream): void {
        if (!!!stream) {
            return;
        }
        stream.writeSync(root.toXMLPropertyList());
        stream.flushSync();
    }
    /**
     * Converts a given property list file into the OS X and iOS XML format.
     *
     * @param in  The source filepath.
     * @param out The target filepath.
     *
     */
    public static convertToXml(sourceFilePath: string, targetFilepath: string): void {
        let root = PropertyListParser.parse(sourceFilePath);
        PropertyListParser.saveAsXML(root, targetFilepath);
    }
    /**
     * Converts a given property list file into the OS X and iOS XML format.
     *
     * @param in  The source file.
     * @param out The target file.
     *
     */
    public static convertToXmlByFile(fileIn: fs.File, fileOut: fs.File): void {
        PropertyListParser.parseByFile(fileIn, (root) => {
            PropertyListParser.saveAsXMLByFile(root, fileOut);
        });
    }
    /**
     * Saves a property list with the given object as root into a binary file.
     *
     * @param root The root object.
     * @param out  The output file.
     */
    public static saveAsBinary(root: NSObject, targetFile: string): void {
        BinaryPropertyListWriter.writeByFilePath(targetFile, root);
    }
    /**
     * Saves a property list with the given object as root in binary format into an output stream.
     * This method does not close the specified input stream.
     *
     * @param root The root object.
     * @param out  The output stream.
     */
    public static saveAsBinaryByStream(root: NSObject, out: any): void {
        BinaryPropertyListWriter.write(out, root);
    }
    /**
     * Converts a given property list file into the OS X and iOS binary format.
     *
     * @param in  The source file.
     * @param out The target file.
     */
    public static convertToBinary(sourceFilePath: string, targetFilePath: string): void {
        PropertyListParser.parseByPath(sourceFilePath, (root) => {
            PropertyListParser.saveAsBinary(root, targetFilePath);
        });
    }
    /**
     * Saves a property list with the given object as root into a ASCII file.
     *
     * @param root The root object.
     * @param out  The output file.
     */
    public static saveAsASCIIForNSDictionary(root: NSDictionary, targetFilePath: string): void {
        let ss;
        try {
            ss = FileUtils.openFile(targetFilePath);
            ss.writeSync(root.toASCIIPropertyList());
        }
        catch (e) {
            throw new PropertyListFormatException(JSON.stringify(e));
        }
        finally {
            if (!!ss) {
                ss.close();
            }
        }
    }
    /**
     * Saves a property list with the given object as root into a ASCII file.
     *
     * @param root The root object.
     * @param out  The output file.
     */
    public static saveAsASCIIForNSArray(root: NSArray, targetFilePath: string): void {
        let ss;
        try {
            ss = FileUtils.openFile(targetFilePath);
            ss.writeSync(root.toASCIIPropertyList());
        }
        catch (e) {
            throw new PropertyListFormatException(JSON.stringify(e));
        }
        finally {
            if (!!ss) {
                ss.close();
            }
        }
    }
    /**
     * Converts a given property list file into ASCII format.
     *
     * @param in  The source file.
     * @param out The target file.
     */
    public static convertToASCII(sourceFilePath: string, targetFilePath: string): void {
        PropertyListParser.parse(sourceFilePath, (root) => {
            if (root instanceof NSDictionary) {
                PropertyListParser.saveAsASCIIForNSDictionary(root, targetFilePath);
            }
            else if (root instanceof NSArray) {
                PropertyListParser.saveAsASCIIForNSArray(root, targetFilePath);
            }
            else {
                throw new PropertyListFormatException("The root of the given input property list "
                    + "is neither a Dictionary nor an Array!");
            }
        });
    }
    /**
     * Saves a property list with the given object as root into a ASCII file.
     *
     * @param root The root object.
     * @param out  The output file.
     */
    public static saveAsGnuStepASCIIForNSDictionary(root: NSDictionary, targetFilePath: string): void {
        let ss;
        try {
            ss = FileUtils.openFile(targetFilePath);
            ss.writeSync(root.toGnuStepASCIIPropertyList());
        }
        catch (e) {
            throw new PropertyListFormatException(JSON.stringify(e));
        }
        finally {
            if (!!ss) {
                ss.close();
            }
        }
    }
    /**
     * Saves a property list with the given object as root into a ASCII file.
     *
     * @param root The root object.
     * @param out  The output file.
     */
    public static saveAsGnuStepASCIIForNSArray(root: NSArray, targetFilePath: string): void {
        let ss;
        try {
            ss = FileUtils.openFile(targetFilePath);
            ss.writeSync(root.toGnuStepASCIIPropertyList());
        }
        catch (e) {
            throw new PropertyListFormatException(JSON.stringify(e));
        }
        finally {
            if (!!ss) {
                ss.close();
            }
        }
    }
    /**
     * Converts a given property list file into ASCII format.
     *
     * @param in  The source file.
     * @param out The target file.
     */
    public static convertToGnuStepASCII(sourceFilePath: string, targetFilePath: string): void {
        PropertyListParser.parse(sourceFilePath, (root) => {
            if (root instanceof NSDictionary) {
                PropertyListParser.saveAsGnuStepASCIIForNSDictionary(root, targetFilePath);
            }
            else if (root instanceof NSArray) {
                PropertyListParser.saveAsGnuStepASCIIForNSArray(root, targetFilePath);
            }
            else {
                throw new PropertyListFormatException("The root of the given input property list "
                    + "is neither a Dictionary nor an Array!");
            }
        });
    }
    /**
     * Assigns IDs to all the objects in this NSObject subtree.
     *
     * @param out The writer object that handles the binary serialization.
     */
    public static assignIDs(obj: NSObject, out: BinaryPropertyListWriter): void {
        out.assignID(obj);
    }
    /**
     * Converts this NSObject into an equivalent object of the Java Runtime Environment.
     * <ul>
     * <li>{@link NSArray} objects are converted to arrays.</li>
     * <li>{@link NSDictionary} objects are converted to objects extending the {@link java.util.Map} class.</li>
     * <li>{@link NSSet} objects are converted to objects extending the {@link java.util.Set} class.</li>
     * <li>{@link NSNumber} objects are converted to primitive number values (int, long, double or boolean).</li>
     * <li>{@link NSString} objects are converted to {@link String} objects.</li>
     * <li>{@link NSData} objects are converted to byte arrays.</li>
     * <li>{@link NSDate} objects are converted to {@link java.util.Date} objects.</li>
     * <li>{@link UID} objects are converted to byte arrays.</li>
     * </ul>
     * @return A native java object representing this NSObject's value.
     */
    public static toJavaObject(obj: NSObject): Object {
        if (obj instanceof NSArray) {
            return this.deserializeArray(obj);
        }
        else if (obj instanceof NSDictionary) {
            return this.deserializeMap(obj);
        }
        else if (obj instanceof NSSet) {
            return this.deserializeSet(obj);
        }
        else if (obj instanceof NSNumber) {
            return this.deserializeNumber(obj);
        }
        else if (obj instanceof NSString) {
            let nsString: NSString = obj;
            return nsString.getContent();
        }
        else if (obj instanceof NSData) {
            let nsData: NSData = obj;
            return nsData.getBytes();
        }
        else if (obj instanceof NSDate) {
            let nsDate: NSDate = obj;
            return nsDate.getDate();
        }
        else if (obj instanceof UID) {
            let uid: UID = obj;
            return uid.getBytes();
        }
        else {
            return obj;
        }
    }
    /**
     * Serializes the specified object into an NSObject.
     * Objects which do not have a direct type correspondence to an NSObject type will be serialized as a {@link NSDictionary}.
     * The dictionary will contain the values of all publicly accessible fields and properties.
     * @param object The object to serialize.
     * @return A NSObject instance.
     */
    public static fromJavaObject(object: Object): NSObject {
        if (object == null) {
            return null;
        }
        if (object instanceof NSObject) {
            let nsObject: NSObject = object;
            return nsObject;
        }
        if (object instanceof Array) {
            return this.fromArray(object, object);
        }
        if (PropertyListParser.isSimple(object)) {
            //process simple types
            return this.fromSimple(object, object);
        }
        if (object instanceof Set) {
            //process set
            return this.fromSet(object);
        }
        if (object instanceof Map) {
            //process Map
            return this.fromMap(object);
        }
        //process pojo
        return this.fromPojo(object, object);
    }
    private static isSimple(obj: Object): boolean {
        let isPrimitive: boolean = false;
        let mType: string = typeof (obj);
        if (mType == 'boolean' || mType == 'string' || mType == 'number') {
            isPrimitive = true;
        }
        return isPrimitive || Date.prototype.isPrototypeOf(obj);
    }
    private static getClassForName(className: string): Object {
        let spaceIndex: number = className.indexOf(' ');
        if (spaceIndex != -1) {
            className = className.substring(spaceIndex + 1);
        }
        if ("double" == (className)) {
            return Number;
        }
        if ("float" == (className)) {
            return Number;
        }
        if ("int" == (className)) {
            return Number;
        }
        if ("long" == (className)) {
            return Number;
        }
        if ("short" == (className)) {
            return Number;
        }
        if ("boolean" == (className)) {
            return Boolean;
        }
        return Object;
    }
    private static makeFirstCharLowercase(input: string): string {
        let chars: Array<string> = TextUtils.toCharArray(input);
        chars[0] = chars[0].toLowerCase();
        chars.toString();
        return chars.toString();
    }
    private toJavaObjectFromNSObject(payload: NSObject, clazz: Object, types: Array<string>): Object {
        if (Array.prototype.isPrototypeOf(Object)) {
            //generics and arrays do not mix
            return PropertyListParser.deserializeArrayByNSObject(payload, clazz);
        }
        if (PropertyListParser.isSimple(clazz)) {
            return PropertyListParser.deserializeSimple(payload, clazz);
        }
        if (clazz == Object && !(payload instanceof NSSet || payload instanceof NSArray)) {
            return PropertyListParser.deserializeSimple(payload, clazz);
        }
        if (payload instanceof NSSet /*&& Collection.class.isAssignableFrom(clazz)*/) {
            return this.deserializeCollection(payload, clazz, types);
        }
        if (payload instanceof NSArray /*&& Collection.class.isAssignableFrom(clazz)*/) {
            return this.deserializeCollection(payload, clazz, types);
        }
        if (payload instanceof NSDictionary) {
            let nsDictionary: NSDictionary = payload;
            return this.deserializeObject(nsDictionary, clazz, types);
        }
        if (payload instanceof NSData /*&& Collection.class.isAssignableFrom(clazz)*/) {
            return this.deserializeCollection(payload, clazz, types);
        }
        throw new Error("Cannot process object");
    }
    private deserializeObject(payload: NSDictionary, clazz: Object, types: Array<string>): Object {
        let map: Map<string, NSObject> = payload.getHashMap();
        if (Map.prototype.isPrototypeOf(clazz)) {
            return PropertyListParser.deserializeMapByObject(clazz, types, map);
        }
        let result: Object = clazz;
        let getters: Map<String, Function> = new Map();
        let setters: Map<String, Function> = new Map();
        if (clazz instanceof NSArray) {
            //          clazz = new NSArray()
            getters.set(PropertyListParser.makeFirstCharLowercase("Array"), new Function("getArray"));
            setters.set(PropertyListParser.makeFirstCharLowercase("Value"), new Function("setValue"));
        }
        else if (clazz instanceof NSData) {
            clazz = new NSData();
            getters.set(PropertyListParser.makeFirstCharLowercase("Base64EncodedData"), new Function("getBase64EncodedData"));
        }
        else if (clazz instanceof NSDate) {
            clazz = new NSDate();
            getters.set(PropertyListParser.makeFirstCharLowercase("Date"), new Function("getDate"));
        }
        else if (clazz instanceof NSDictionary) {
            clazz = new NSDictionary();
            getters.set(PropertyListParser.makeFirstCharLowercase("HashMap"), new Function("getHashMap"));
        }
        else if (clazz instanceof NSNumber) {
            clazz = new NSNumber();
            getters.set(PropertyListParser.makeFirstCharLowercase("Boolean"), new Function("isBoolean"));
            getters.set(PropertyListParser.makeFirstCharLowercase("Integer"), new Function("isInteger"));
            getters.set(PropertyListParser.makeFirstCharLowercase("Real"), new Function("isReal"));
        }
        else if (clazz instanceof NSSet) {
            clazz = new NSSet();
            getters.set(PropertyListParser.makeFirstCharLowercase("Set"), new Function("getSet"));
            getters.set(PropertyListParser.makeFirstCharLowercase("SubsetOfSet"), new Function("isSubsetOfSet"));
        }
        else if (clazz instanceof NSString) {
            clazz = new NSString(null, null);
            getters.set(PropertyListParser.makeFirstCharLowercase("Content"), new Function("getContent"));
            setters.set(PropertyListParser.makeFirstCharLowercase("Content"), new Function("setContent"));
        }
        for (let [key, value] of map.entries()) {
            let setter: Function = setters.get(PropertyListParser.makeFirstCharLowercase(key));
            let getter: Function = getters.get(PropertyListParser.makeFirstCharLowercase(key));
            if (setter != null && getter != null) {
            }
        }
        return result;
    }
    private static deserializeMap(obj: NSObject): Map<string, Object> {
        let nsd: NSDictionary;
        if (obj instanceof NSDictionary) {
            nsd = obj;
        }
        let originalMap: Map<string, NSObject> = nsd.getHashMap();
        let clonedMap: Map<string, Object> = new Map();
        for (let key of originalMap.keys()) {
            clonedMap.set(key, PropertyListParser.toJavaObject(originalMap.get(key)));
        }
        return clonedMap;
    }
    private static deserializeMapByObject(clazz: Object, types: Array<string>, map: Map<string, NSObject>): Object {
        let result: Map<string, Object>;
        if (clazz instanceof Map) {
            let temp: Map<string, Object> = clazz;
            result = temp;
        }
        else {
            result = new Map();
        }
        let elemClass: Object = null;
        let elemParams: Array<string> = null;
        if (types != null && types.length > 1) {
            let elemType = types[1];
            elemClass = PropertyListParser.getClassForName(elemType.toString());
        }
        let parse: PropertyListParser = new PropertyListParser();
        for (let [key, value] of map.entries()) {
            result.set(key, parse.toJavaObjectFromNSObject(value, elemClass, elemParams));
        }
        return result;
    }
    private deserializeCollection(payload: NSObject, clazz: Object, types: Array<string>): Object {
        let result: Array<any> = new Array();
        let elemClass: Object = null;
        if (types != null && types.length > 0) {
            elemClass = PropertyListParser.getClassForName(types[0].toString());
        }
        if (payload instanceof NSArray) {
            for (let nsObject of payload.getArray()) {
                result.push(this.toJavaObjectFromNSObject(nsObject, elemClass, null));
            }
            return result;
        }
        if (payload instanceof NSData) {
            if (elemClass != null) {
                for (let n of payload.getBytes()) {
                    result.push(n);
                }
                return result;
            }
            else {
                throw new Error("NSData cannot be converted");
                return;
            }
        }
        if (payload instanceof NSSet) {
            for (let nsObject of payload.getSet()) {
                result.push(this.toJavaObjectFromNSObject(nsObject, elemClass, null));
            }
            return result;
        }
        throw new Error("Unknown NS* type ");
    }
    private static deserializeArray(obj: NSObject): Object[] {
        let arr: NSArray = new NSArray();
        if (obj instanceof NSArray) {
            arr = obj;
        }
        let originalArray: NSObject[] = arr.getArray();
        let clonedArray: Object[] = new Object[originalArray.length];
        for (let i = 0; i < originalArray.length; i++) {
            clonedArray[i] = PropertyListParser.toJavaObject(originalArray[i]);
        }
        return clonedArray;
    }
    private static deserializeArrayByNSObject(payload: NSObject, clazz: Object): Object {
        let elementClass = PropertyListParser.getClassForName(clazz.toLocaleString());
        let parse: PropertyListParser = new PropertyListParser();
        if (payload instanceof NSArray) {
            let array: NSObject[] = payload.getArray();
            let result: Array<Object> = new Array();
            for (let i = 0; i < array.length; i++) {
                result.push(parse.toJavaObjectFromNSObject(array[i], elementClass, null));
            }
            return result;
        }
        if (payload instanceof NSSet) {
            let s: Set<NSObject> = payload.getSet();
            let result: Array<typeof elementClass> = new Array();
            let i: number = 0;
            for (let aSet of s) {
                result.push(parse.toJavaObjectFromNSObject(aSet, elementClass, null));
                i++;
            }
            return result;
        }
        if (payload instanceof NSData) {
            return PropertyListParser.deserializeData(payload, elementClass);
        }
        throw new Error("Unable to map object");
    }
    private static deserializeSet(obj: NSObject): Set<Object> {
        let s: NSSet;
        if (obj instanceof NSSet) {
            s = obj;
        }
        let originalSet: Set<NSObject> = s.getSet();
        let clonedSet: Set<Object> = new Set();
        for (let o of originalSet) {
            clonedSet.add(PropertyListParser.toJavaObject(o));
        }
        return clonedSet;
    }
    private static deserializeData(payload: NSData, elementClass: Object): Object {
        return payload.getBytes();
    }
    private static deserializeSimple(payload: NSObject, clazz: Object): Object {
        if (payload instanceof NSNumber) {
            return PropertyListParser.deserializeNumberByNumber(payload, clazz);
        }
        if (payload instanceof NSDate) {
            return PropertyListParser.deserializeDate(payload, clazz);
        }
        if (payload instanceof NSString) {
            return payload.getContent();
        }
        throw new Error("Cannot map");
    }
    private static deserializeDate(date: NSDate, clazz: Object): Date {
        if (clazz instanceof Date) {
            //short circuit
            return date.getDate();
        }
        let result: Date = new Date();
        result.setTime(date.getDate().getTime());
        return result;
    }
    private static deserializeNumber(obj: NSObject): Object {
        let num: NSNumber = new NSNumber();
        if (obj instanceof NSNumber) {
            num = obj;
        }
        switch (num.getType()) {
            case NSNumber.INTEGER: {
                let longVal: number = num.getLongValue();
                if (longVal > Number.MAX_VALUE || longVal < Number.MIN_VALUE) {
                    return longVal;
                }
                else {
                    return num.getIntValue();
                }
            }
            case NSNumber.REAL: {
                return num.getDoubleValue();
            }
            case NSNumber.BOOLEAN: {
                return num.getBoolValue();
            }
            default: {
                return num.getDoubleValue();
            }
        }
    }
    private static deserializeNumberByNumber(number: NSNumber, clazz: Object): Object {
        if (number.isInteger()) {
            return number.getIntValue();
        }
        if (number.isInteger() || number.isReal()) {
            return number.getFloatValue();
        }
        if (number.isBoolean()) {
            return number.getBoolValue();
        }
        throw new Error("Cannot map NSNumber to number");
    }
    private static fromSimple(object: Object, objClass: Object): NSObject {
        if (typeof (object) == "number") {
            return NSNumber.createNSNumberByNumber(parseInt(object.toString()));
        }
        if (typeof (object) == "boolean") {
            return NSNumber.createNSNumberByBoolean(object);
        }
        if (object instanceof Date) {
            return new NSDate(null, null, null, null, object);
        }
        if (typeof (object) == 'string') {
            return new NSString(null, null, null, null, object);
        }
        throw new Error("Cannot map objClass as a simple type.");
    }
    private static fromPojo(object: Object, objClass: Object): NSDictionary {
        let result: NSDictionary = new NSDictionary();
        return result;
    }
    private static fromMap(map: Map<any, any>): NSDictionary {
        let result: NSDictionary = new NSDictionary();
        for (let [key, value] of map.entries()) {
            if (typeof (key) != "string") {
                throw new Error("Maps need a String key for mapping to NSDictionary.");
                return;
            }
            result.put(key, PropertyListParser.fromJavaObject(value));
        }
        return result;
    }
    private static fromArray(object: Array<any>, objClass: Object): NSObject {
        if (typeof (objClass) == 'number') {
            return PropertyListParser.fromData(object);
        }
        let size: number = object.length;
        let array: NSObject[] = [];
        for (let i = 0; i < size; i++) {
            array[i] = PropertyListParser.fromJavaObject(object[i]);
        }
        return new NSArray(null, array);
    }
    private static fromData(object: Array<any>): NSData {
        let size: number = object.length;
        let array: Int8Array = new Int8Array(object.length);
        for (let i = 0; i < size; i++) {
            array[i] = object[i];
        }
        return new NSData(array);
    }
    private static fromCollection(collection: Array<any> | Map<any, any> | Set<any>): NSArray {
        let payload: Array<NSObject> = new Array();
        for (let elem of collection) {
            payload.push(PropertyListParser.fromJavaObject(elem));
        }
        Array.from(payload);
        return new NSArray(null, Array.from(payload));
    }
    private static fromSet(s: Set<any>): NSSet {
        let result: NSSet = new NSSet();
        for (let elem of s) {
            result.addObject(PropertyListParser.fromJavaObject(elem));
        }
        return result;
    }
}
export default PropertyListParser;
