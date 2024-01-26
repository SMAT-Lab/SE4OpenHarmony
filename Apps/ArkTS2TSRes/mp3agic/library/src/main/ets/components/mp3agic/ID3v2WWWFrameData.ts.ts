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
import { AbstractID3v2FrameData } from "./AbstractID3v2FrameData";
export class ID3v2WWWFrameData extends AbstractID3v2FrameData {
    protected url: string;
    constructor(unsynchronisation: boolean, url?: string) {
        super(unsynchronisation);
        if (url) {
            this.url = url;
        }
    }
    protected static create(unsynchronisation: boolean, bytes: number[]): ID3v2WWWFrameData {
        let frame = new ID3v2WWWFrameData(unsynchronisation);
        frame.synchroniseAndUnpackFrameData(bytes);
        return frame;
    }
    protected unpackFrameData(bytes: number[]): void {
        try {
            this.url = BufferTools.byteBufferToString(bytes, 0, bytes.length);
        }
        catch (error) {
            this.url = "";
        }
    }
    protected packFrameData(): number[] {
        let bytes: number[] = new Array(this.getLength());
        if (this.url != null && this.url.length > 0) {
            try {
                BufferTools.stringIntoByteBuffer(this.url, 0, this.url.length, bytes, 0);
            }
            catch (error) {
            }
        }
        return bytes;
    }
    protected getLength(): number {
        let length = 0;
        if (this.url != null)
            length = this.url.length;
        return length;
    }
    public getUrl(): string {
        return this.url;
    }
    public setUrl(url: string): void {
        this.url = url;
    }
}
