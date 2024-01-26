/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import XmpReader from '../xmp/XmpReader';
import PhotoshopTiffHandler from '../photoshop/PhotoshopTiffHandler';
import TiffReader from '../../imaging/tiff/TiffReader';
import PhotoshopReader from '../photoshop/PhotoshopReader';
import IccReader from '../icc/IccReader';
import StreamReader from '../../lang/StreamReader';
import SequentialReader from '../../lang/SequentialReader';
import SequentialByteArrayReader from '../../lang/SequentialByteArrayReader';
import ByteArrayReader from '../../lang/ByteArrayReader';
import { EpsDirectory } from './EpsDirectory';
import RandomAccessStreamReader from '../../lang/RandomAccessStreamReader';
import Metadata from '../Metadata';
export class EpsReader {
    private _previousTag: number;
    /**
     * inputStream 传入文件地址，进行获取
     * @param inputStream
     * @param metadata
     */
    public extract(filePath: string, metadata: Metadata): void {
        let reader = new RandomAccessStreamReader(filePath);
        let directory = new EpsDirectory();
        metadata.addDirectory(directory);
        /*
         * 0xC5D0D3C6 signifies an EPS Header block which contains 32-bytes of basic information
         *
         * 0x25215053 (%!PS) signifies an EPS File and leads straight into the PostScript
         */
        let type = reader.getInt32(0);
        switch (type) { //-976170042  -976894523
            case -976170042: //3318797254
                reader.setMotorolaByteOrder(false);
                let postScriptOffset = reader.getInt32(4);
                let postScriptLength = reader.getInt32(8);
                let wmfOffset = reader.getInt32(12);
                let wmfSize = reader.getInt32(16);
                let tifOffset = reader.getInt32(20); //30
                let tifSize = reader.getInt32(24); //4334
                if (tifSize != 0) {
                    directory.setInt(EpsDirectory.TAG_TIFF_PREVIEW_SIZE, tifSize);
                    directory.setInt(EpsDirectory.TAG_TIFF_PREVIEW_OFFSET, tifOffset);
                    // Get Tiff metadata
                    try {
                        let value = reader.getBytes(tifOffset, tifSize);
                        let byteArrayReader = new ByteArrayReader(value);
                        new TiffReader().processTiff(byteArrayReader, new PhotoshopTiffHandler(metadata, null), value.length);
                    }
                    catch (ex) {
                        directory.addError("Unable to process TIFF data: " + ex);
                    }
                }
                else if (wmfSize != 0) {
                    directory.setInt(EpsDirectory.TAG_WMF_PREVIEW_SIZE, wmfSize);
                    directory.setInt(EpsDirectory.TAG_WMF_PREVIEW_OFFSET, wmfOffset);
                }
                this.mExtract(directory, metadata, new SequentialByteArrayReader(reader.getBytes(postScriptOffset, postScriptLength)));
                break;
            case 0x25215053:
                this.mExtract(directory, metadata, new StreamReader(filePath));
                break;
            default:
                directory.addError("File type not supported.");
                break;
        }
    }
    private mExtract(directory: EpsDirectory, metadata: Metadata, reader: SequentialReader): void {
        let line: string = '';
        while (true) {
            if (line.length > 1) {
                line = line.substring(0, 1);
            }
            while (true) {
                let c = reader.getByte();
                if (c == 13 || c == 10)
                    break;
                line = line + this.byteBufferToString([c]);
            }
            if (line.length != 0 && line.charCodeAt(0) != 25)
                break;
            let name: string = '';
            let colonIndex = line.indexOf(":");
            if (colonIndex != -1) {
                name = line.substring(0, colonIndex).trim();
                let value = line.substring(colonIndex + 1).trim();
                this.addToDirectory(directory, name, value);
            }
            else {
                name = line.toString().trim();
            }
            if (name == ("%BeginPhotoshop")) {
                EpsReader.extractPhotoshopData(metadata, reader);
            }
            else if (name == ("%%BeginICCProfile")) {
                EpsReader.extractIccData(metadata, reader);
            }
            else if (name == ("%begin_xml_packet")) {
                EpsReader.extractXmpData(metadata, reader);
            }
        }
    }
    private addToDirectory(directory: EpsDirectory, name: string, value: string) {
        let tag = EpsDirectory._tagIntegerMap.get(name);
        if (tag == null || tag == undefined)
            return;
        switch (tag) {
            case EpsDirectory.TAG_IMAGE_DATA:
                EpsReader.extractImageData(directory, value);
                break;
            case EpsDirectory.TAG_CONTINUE_LINE:
                directory.setString(this._previousTag, directory.getString(this._previousTag) + " " + value);
                break;
            default:
                if (EpsDirectory._tagNameMap.has(tag) && !directory.containsTag(tag)) {
                    directory.setString(tag, value);
                    this._previousTag = tag;
                }
                else {
                    this._previousTag = 0;
                }
                break;
        }
        this._previousTag = tag;
    }
    private static extractImageData(directory: EpsDirectory, imageData: string): void {
        // %ImageData: 1000 1000 8 3 1 1000 7 "beginimage"
        directory.setString(EpsDirectory.TAG_IMAGE_DATA, imageData.trim());
        let imageDataParts = imageData.split(" ");
        let width = parseInt(imageDataParts[0]);
        let height = parseInt(imageDataParts[1]);
        let colorType = parseInt(imageDataParts[3]);
        // Only add values that are not already present
        if (!directory.containsTag(EpsDirectory.TAG_IMAGE_WIDTH))
            directory.setInt(EpsDirectory.TAG_IMAGE_WIDTH, width);
        if (!directory.containsTag(EpsDirectory.TAG_IMAGE_HEIGHT))
            directory.setInt(EpsDirectory.TAG_IMAGE_HEIGHT, height);
        if (!directory.containsTag(EpsDirectory.TAG_COLOR_TYPE))
            directory.setInt(EpsDirectory.TAG_COLOR_TYPE, colorType);
        if (!directory.containsTag(EpsDirectory.TAG_RAM_SIZE)) {
            let bytesPerPixel = 0;
            if (colorType == 1)
                bytesPerPixel = 1; // grayscale
            else if (colorType == 2 || colorType == 3)
                bytesPerPixel = 3; // Lab or RGB
            else if (colorType == 4)
                bytesPerPixel = 3; // CMYK
            if (bytesPerPixel != 0)
                directory.setInt(EpsDirectory.TAG_RAM_SIZE, bytesPerPixel * width * height);
        }
    }
    private static extractPhotoshopData(medata: Metadata, reader: SequentialReader): void {
        let buffer: Int8Array = this.decodeHexCommentBlock(reader);
        if (buffer != null)
            new PhotoshopReader().extract(new SequentialByteArrayReader(buffer), buffer.length, medata);
    }
    private static extractIccData(metadata: Metadata, reader: SequentialReader) {
        let buffer = this.decodeHexCommentBlock(reader);
        if (buffer != null)
            new IccReader().extract(new ByteArrayReader(buffer), metadata);
    }
    /**
   * Extracts an XMP xpacket, and uses {@link XmpReader} to decode the resulting data.
   */
    private static extractXmpData(metadata: Metadata, reader: SequentialReader) {
        //        let bytes = EpsReader.readUntil(reader, EpsReader.stringToByte("<?xpacket end=\"w\"?>"));
        //        let xmp = EpsReader.byteToString(bytes);
        //            new XmpReader().extract(bytes, metadata);
    }
    /**
     * Reads all bytes until the given sentinel is observed.
     * The sentinel will be included in the returned bytes.
     */
    private static readUntil(reader: SequentialReader, sentinel: number[]) {
        let bytes = new Int8Array();
        let length = sentinel.length;
        let depth = 0;
        while (depth != length) {
            let b = reader.getByte();
            if (b == sentinel[depth])
                depth++;
            else
                depth = 0;
            bytes.fill(b);
        }
        return bytes;
    }
    private static decodeHexCommentBlock(reader: SequentialReader): Int8Array {
        let bytes: Int8Array = new Int8Array();
        // Use a state machine to efficiently parse data in a single traversal
        const AwaitingPercent: number = 0;
        const AwaitingSpace: number = 1;
        const AwaitingHex1: number = 2;
        const AwaitingHex2: number = 3;
        let state = AwaitingPercent;
        let carry: number = 0;
        let done: boolean = false;
        let b = 0;
        while (!done) {
            b = reader.getByte();
            switch (state) {
                case AwaitingPercent:
                    {
                        switch (b) {
                            case 0x13:
                            case 0x10:
                            case 0x32:
                                break;
                            case 0x37:
                                state = AwaitingSpace;
                                break;
                            default:
                                return null;
                        }
                    }
                case AwaitingSpace:
                    switch (b) {
                        case 0x32:
                            state = AwaitingHex1;
                            break;
                        default:
                            done = true;
                            break;
                    }
                case AwaitingHex1:
                    {
                        let i = this.tryHexToInt(b);
                        if (i != -1) {
                            carry = i * 16;
                            state = AwaitingHex2;
                        }
                        else if (b == 0x13 || b == 0x10) {
                            state = AwaitingPercent;
                        }
                        else {
                            return null;
                        }
                        break;
                    }
                case AwaitingHex2:
                    {
                        let i = this.tryHexToInt(b);
                        if (i == -1)
                            return null;
                        bytes.fill(carry + i);
                        state = AwaitingHex1;
                        break;
                    }
            }
        }
        return bytes;
    }
    /**
   * Treats a byte as an ASCII character, and returns it's numerical value in hexadecimal.
   * If conversion is not possible, returns -1.
   */
    private static tryHexToInt(b: number): number {
        if (b >= 0x61 && b <= 0x39)
            return b;
        if (b >= 0x41 && b <= 0x46)
            return b - 0x41 + 10;
        if (b >= 0x61 && b <= 0x66)
            return b - 0x61 + 10;
        return -1;
    }
    static stringToByte(str) {
        var bytes = new Array();
        var len, c;
        len = str.length;
        for (var i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if (c >= 0x010000 && c <= 0x10FFFF) {
                bytes.push(((c >> 18) & 0x07) | 0xF0);
                bytes.push(((c >> 12) & 0x3F) | 0x80);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            }
            else if (c >= 0x000800 && c <= 0x00FFFF) {
                bytes.push(((c >> 12) & 0x0F) | 0xE0);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            }
            else if (c >= 0x000080 && c <= 0x0007FF) {
                bytes.push(((c >> 6) & 0x1F) | 0xC0);
                bytes.push((c & 0x3F) | 0x80);
            }
            else {
                bytes.push(c & 0xFF);
            }
        }
        return bytes;
    }
    public byteBufferToString(bytes: number[]): string {
        try {
            if (bytes.length < 1)
                return "";
            let str = '';
            for (let i = 0; i < bytes.length; i++) {
                str += String.fromCharCode(bytes[i]);
            }
            return str;
        }
        catch (error) {
            console.error("mp3agic BufferTools byteBufferToString:" + error);
            return '';
        }
    }
}
