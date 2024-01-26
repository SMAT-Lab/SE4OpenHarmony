// @ts-nocheck
/**
 *  MIT License
 *
 *  Copyright (c) 2023 Huawei Device Co., Ltd.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */
import { BufferTools } from "./BufferTools";
import { EncodedText } from "./EncodedText";
import { AbstractID3v2FrameData } from "./AbstractID3v2FrameData";
export class ID3v2PictureFrameData extends AbstractID3v2FrameData {
    protected mimeType: string;
    protected pictureType: number;
    protected description: EncodedText;
    protected imageData: number[];
    constructor(unsynchronisation: boolean, bytes?: number[], mimeType?: string, pictureType?: number, description?: EncodedText) {
        super(unsynchronisation);
        if (mimeType) {
            this.mimeType = mimeType;
            this.pictureType = pictureType;
            this.description = description;
            this.imageData = bytes;
        }
        else {
            if (bytes) {
                super.synchroniseAndUnpackFrameData(bytes);
            }
        }
    }
    protected unpackFrameData(bytes: number[]): void {
        let marker = BufferTools.indexOfTerminator(bytes, 1, 1);
        if (marker >= 0) {
            try {
                this.mimeType = BufferTools.byteBufferToString(bytes, 1, marker - 1);
            }
            catch (error) {
                this.mimeType = "image/unknown";
            }
        }
        else {
            this.mimeType = "image/unknown";
        }
        this.pictureType = bytes[marker + 1];
        marker += 2;
        let marker2 = BufferTools.indexOfTerminatorForEncoding(bytes, marker, bytes[0]);
        if (marker2 >= 0) {
            this.description = new EncodedText({
                textEncoding: bytes[0],
                value: BufferTools.copyBuffer(bytes, marker, marker2 - marker)
            });
            marker2 += this.description.getTerminator().length;
        }
        else {
            this.description = new EncodedText({ textEncoding: bytes[0], str: "" });
            marker2 = marker;
        }
        this.imageData = BufferTools.copyBuffer(bytes, marker2, bytes.length - marker2);
    }
    protected packFrameData(): number[] {
        let bytes: number[] = new Array(this.getLength());
        if (this.description != null)
            bytes[0] = this.description.getTextEncoding();
        else
            bytes[0] = 0;
        let mimeTypeLength = 0;
        if (this.mimeType != null && this.mimeType.length > 0) {
            mimeTypeLength = this.mimeType.length;
            try {
                BufferTools.stringIntoByteBuffer(this.mimeType, 0, mimeTypeLength, bytes, 1);
            }
            catch (error) {
            }
        }
        let marker = mimeTypeLength + 1;
        bytes[marker++] = 0;
        bytes[marker++] = this.pictureType;
        if (this.description != null && this.description.toBytes().length > 0) {
            let descriptionBytes: number[] = this.description.toBytes(true, true);
            //TODO
            BufferTools.copyIntoByteBuffer(descriptionBytes, 0, descriptionBytes.length, bytes, marker);
            marker += descriptionBytes.length;
        }
        else {
            bytes[marker++] = 0;
        }
        if (this.imageData != null && this.imageData.length > 0) {
            BufferTools.copyIntoByteBuffer(this.imageData, 0, this.imageData.length, bytes, marker);
        }
        return bytes;
    }
    protected getLength(): number {
        let length = 3;
        if (this.mimeType != null)
            length += this.mimeType.length;
        if (this.description != null)
            length += this.description.toBytes(true, true).length;
        else
            length++;
        if (this.imageData != null)
            length += this.imageData.length;
        return length;
    }
    public getMimeType(): string {
        return this.mimeType;
    }
    public setMimeType(mimeType: string): void {
        this.mimeType = mimeType;
    }
    public getPictureType(): number {
        return this.pictureType;
    }
    public setPictureType(pictureType: number): void {
        this.pictureType = pictureType;
    }
    public getDescription(): EncodedText {
        return this.description;
    }
    public setDescription(description: EncodedText): void {
        this.description = description;
    }
    public getImageData(): number[] {
        return this.imageData;
    }
    public setImageData(imageData: number[]): void {
        this.imageData = imageData;
    }
}
