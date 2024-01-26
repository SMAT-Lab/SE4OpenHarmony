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
import NumUtils from '../utils/NumUtils';
import HexUtil from '../utils/HexUtils';
import NSDictionary from './NSDictionary';
import NSObject from './NSObject';
import NSArray from './NSArray';
import NSSet from './NSSet';
import { FileUtils } from '../utils/FileUtils';
import fs from '@ohos.file.fs';
/**
 * A BinaryPropertyListWriter is a helper class for writing out
 * binary property list files.  It contains an output stream and
 * various structures for keeping track of which NSObjects have
 * already been serialized, and where they were put in the file.
 */
class BinaryPropertyListWriter {
    private static readonly VERSION_00: number = 0;
    private static readonly VERSION_10: number = 10;
    private static readonly VERSION_15: number = 15;
    private static readonly VERSION_20: number = 20;
    private version: number = BinaryPropertyListWriter.VERSION_00;
    //     raw output stream to result file
    private readonly out: any;
    // # of bytes written so far
    private count: number;
    // map from object to its ID
    private readonly idMap: Map<NSObject, number> = new Map();
    private idSizeInBytes: number;
    /**
         * Creates a new binary property list writer
         *
         * @param out The output stream into which the binary property list will be written
         */
    constructor(out: any, version?: number) {
        this.out = out;
        if (version != null && version != undefined) {
            this.version = version;
        }
    }
    /**
         * Finds out the minimum binary property list format version that
         * can be used to save the given NSObject tree.
         *
         * @param root Object root
         * @return Version code
         */
    private static getMinimumRequiredVersion(root: NSObject): number {
        let minVersion: number = BinaryPropertyListWriter.VERSION_00;
        if (root == null) {
            minVersion = BinaryPropertyListWriter.VERSION_10;
        }
        if (root instanceof NSDictionary) {
            let dict: NSDictionary = root;
            for (let obj of dict.getHashMap().values()) {
                let v: number = this.getMinimumRequiredVersion(obj);
                if (v > minVersion)
                    minVersion = v;
            }
        }
        else if (root instanceof NSArray) {
            let array: NSArray = root;
            for (let obj of array.getArray()) {
                let v: number = this.getMinimumRequiredVersion(obj);
                if (v > minVersion)
                    minVersion = v;
            }
        }
        else if (root instanceof NSSet) {
            //Sets are only allowed in property lists v1+
            minVersion = BinaryPropertyListWriter.VERSION_10;
            let nsSet: NSSet = root;
            for (let obj of nsSet.allObjects()) {
                let v: number = this.getMinimumRequiredVersion(obj);
                if (v > minVersion)
                    minVersion = v;
            }
        }
        return minVersion;
    }
    /**
         * Writes a binary plist file with the given object as the root.
         *
         * @param file the file to write to
         * @param root the source of the data to write to the file
         */
    public static writeByFilePath(filePath: string, root: NSObject): void {
        let stream = FileUtils.openFile(filePath);
        try {
            BinaryPropertyListWriter.write(stream, root);
        }
        finally {
            stream.close();
        }
    }
    /**
         * Writes a binary plist serialization of the given object as the root.
         * This method does not close the output stream.
         *
         * @param out  the stream to write to
         * @param root the source of the data to write to the stream
         */
    public static write(out: any, root: NSObject): void {
        let minVersion: number = this.getMinimumRequiredVersion(root);
        if (minVersion > BinaryPropertyListWriter.VERSION_00) {
            let versionString: string = minVersion == BinaryPropertyListWriter.VERSION_10 ? "v1.0" :
                (minVersion == BinaryPropertyListWriter.VERSION_15 ? "v1.5" : (minVersion == BinaryPropertyListWriter.VERSION_20 ? "v2.0" : "v0.0"));
            throw new Error("The given property list structure cannot be saved. " +
                "The required version of the binary format (" + versionString + ") is not yet supported.");
        }
        let w: BinaryPropertyListWriter = new BinaryPropertyListWriter(out, minVersion);
        w.write(root);
    }
    write(root: NSObject): void {
        // magic bytes
        let intArr: Int8Array = new Int8Array(['b'.charCodeAt(0), 'p'.charCodeAt(0), 'l'.charCodeAt(0), 'i'.charCodeAt(0), 's'.charCodeAt(0), 't'.charCodeAt(0)]);
        this.writeByBytes(intArr);
        //version
        switch (this.version) {
            case BinaryPropertyListWriter.VERSION_00:
                {
                    this.writeByBytes(new Int8Array(['0'.charCodeAt(0), '0'.charCodeAt(0)]));
                    break;
                }
            case BinaryPropertyListWriter.VERSION_10:
                {
                    this.writeByBytes(new Int8Array(['1'.charCodeAt(0), '0'.charCodeAt(0)]));
                    break;
                }
            case BinaryPropertyListWriter.VERSION_15:
                {
                    this.writeByBytes(new Int8Array(['1'.charCodeAt(0), '5'.charCodeAt(0)]));
                    break;
                }
            case BinaryPropertyListWriter.VERSION_20:
                {
                    this.writeByBytes(new Int8Array(['2'.charCodeAt(0), '0'.charCodeAt(0)]));
                    break;
                }
            default:
                break;
        }
        // assign IDs to all the objects.
        PropertyListParser.assignIDs(root, this);
        this.idSizeInBytes = BinaryPropertyListWriter.computeIdSizeInBytes(this.idMap.size);
        // offsets of each object, indexed by ID
        let offsets: Array<number> = /*new long[this.idMap.size()];*/ new Array();
        // write each object, save offset
        for (let [obj, id] of this.idMap) {
            offsets[id] = this.count;
            if (obj == null) {
                this.writeByNumber(0x00);
            }
            else {
                obj.toBinary(this);
            }
        }
        // write offset table
        let offsetTableOffset: number = this.count;
        let offsetSizeInBytes: number = this.computeOffsetSizeInBytes(this.count);
        //        for (long offset : offsets) {
        for (let offset of offsets) {
            this.writeBytes(offset, offsetSizeInBytes);
        }
        if (this.version != BinaryPropertyListWriter.VERSION_15) {
            // write trailer
            // 6 null bytes
            this.writeByBytes(new Int8Array([6]));
            // size of an offset
            this.writeByNumber(offsetSizeInBytes);
            // size of a ref
            this.writeByNumber(this.idSizeInBytes);
            // number of objects
            this.writeLong(this.idMap.size);
            // top object
            this.writeLong(this.idMap.get(root));
            // offset table offset
            this.writeLong(offsetTableOffset);
        }
        this.out.flush();
    }
    assignID(obj: NSObject): void {
        if (!this.idMap.has(obj)) {
            this.idMap.set(obj, this.idMap.size);
        }
    }
    getID(obj: NSObject): number {
        return this.idMap.get(obj);
    }
    private static computeIdSizeInBytes(numberOfIds: number): number {
        if (numberOfIds < 256)
            return 1;
        if (numberOfIds < 65536)
            return 2;
        return 4;
    }
    private computeOffsetSizeInBytes(maxOffset: number): number {
        if (maxOffset < 256)
            return 1;
        if (maxOffset < 65536)
            return 2;
        if (maxOffset < 4294967296)
            return 4;
        return 8;
    }
    writeIntHeader(kind: number, value: number): void {
        if (value >= 0 == false) {
            throw new Error();
        }
        if (value < 15) {
            this.writeByNumber((kind << 4) + value);
        }
        else if (value < 256) {
            this.writeByNumber((kind << 4) + 15);
            this.writeByNumber(0x10);
            this.writeBytes(value, 1);
        }
        else if (value < 65536) {
            this.writeByNumber((kind << 4) + 15);
            this.writeByNumber(0x11);
            this.writeBytes(value, 2);
        }
        else {
            this.writeByNumber((kind << 4) + 15);
            this.writeByNumber(0x12);
            this.writeBytes(value, 4);
        }
    }
    writeByNumber(b: number): void {
        let arr: Int8Array = new Int8Array([b]);
        let hexStr = HexUtil.encodeHexStr(arr);
        let bytesToProcess: ArrayBuffer = new ArrayBuffer(hexStr.length / 2);
        let int8a = new Int8Array(bytesToProcess);
        int8a.set(HexUtil.hexStringToBytes(hexStr));
        this.out.writeSync(bytesToProcess);
        this.count++;
    }
    writeByBytes(bytes: Int8Array): void {
        let hexStr = HexUtil.encodeHexStr(bytes);
        let bytesToProcess: ArrayBuffer = new ArrayBuffer(hexStr.length / 2);
        let int8a = new Int8Array(bytesToProcess);
        int8a.set(HexUtil.hexStringToBytes(hexStr));
        this.out.writeSync(bytesToProcess);
        this.count += bytes.length;
    }
    writeBytes(value: number, bytes: number): void {
        // write low-order bytes big-endian style
        for (let i = bytes - 1; i >= 0; i--) {
            let b: number = (value >> (8 * i));
            this.writeByNumber(b);
        }
    }
    writeID(id: number): void {
        this.writeBytes(id, this.idSizeInBytes);
    }
    writeLong(value: number): void {
        this.writeBytes(value, 8);
    }
    writeDouble(value: number): void {
        this.writeLong(NumUtils.doubleToRawLongBits(value));
    }
}
export default BinaryPropertyListWriter;
