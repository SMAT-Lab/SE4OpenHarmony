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
export class ID3v2UrlFrameData extends AbstractID3v2FrameData {
    protected url: string;
    protected description: EncodedText;
    constructor(unsynchronisation: boolean, description?: EncodedText, url?: string) {
        super(unsynchronisation);
        if (description) {
            this.description = description;
        }
        if (url) {
            this.url = url;
        }
    }
    public static create(unsynchronisation: boolean, bytes: number[]): ID3v2UrlFrameData {
        let frame = new ID3v2UrlFrameData(unsynchronisation);
        frame.synchroniseAndUnpackFrameData(bytes);
        return frame;
    }
    protected unpackFrameData(bytes: number[]): void {
        let marker = BufferTools.indexOfTerminatorForEncoding(bytes, 1, bytes[0]);
        if (marker >= 0) {
            this.description = new EncodedText({
                textEncoding: bytes[0],
                value: BufferTools.copyBuffer(bytes, 1, marker - 1)
            });
            marker += this.description.getTerminator().length;
        }
        else {
            description = new EncodedText({ textEncoding: bytes[0], str: "" });
            marker = 1;
        }
        try {
            this.url = BufferTools.byteBufferToString(bytes, marker, bytes.length - marker);
        }
        catch (error) {
            this.url = "";
        }
    }
    protected packFrameData(): number[] {
        let bytes: number[] = new Array(this.getLength());
        if (this.description != null)
            bytes[0] = this.description.getTextEncoding();
        else
            bytes[0] = 0;
        let marker = 1;
        if (this.description != null) {
            let descriptionBytes: number[] = this.description.toBytes(true, true);
            BufferTools.copyIntoByteBuffer(descriptionBytes, 0, descriptionBytes.length, bytes, marker);
            marker += descriptionBytes.length;
        }
        else {
            bytes[marker++] = 0;
        }
        if (this.url != null && this.url.length > 0) {
            try {
                BufferTools.stringIntoByteBuffer(this.url, 0, this.url.length, bytes, marker);
            }
            catch (error) {
            }
        }
        return bytes;
    }
    protected getLength(): number {
        let length = 1;
        if (this.description != null)
            length += this.description.toBytes(true, true).length;
        else
            length++;
        if (this.url != null)
            length += this.url.length;
        return length;
    }
    public getDescription(): EncodedText {
        return this.description;
    }
    public setDescription(description: EncodedText): void {
        this.description = description;
    }
    public getUrl(): string {
        return this.url;
    }
    public setUrl(url: string): void {
        this.url = url;
    }
}
