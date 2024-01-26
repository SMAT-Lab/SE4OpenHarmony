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
export class ID3v2TextFrameData extends AbstractID3v2FrameData {
    protected text: EncodedText;
    constructor(unsynchronisation: boolean, text?: EncodedText) {
        super(unsynchronisation);
        if (text) {
            this.text = text;
        }
    }
    public static create(unsynchronisation: boolean, bytes: number[]): ID3v2TextFrameData {
        let frame = new ID3v2TextFrameData(unsynchronisation);
        frame.synchroniseAndUnpackFrameData(bytes);
        return frame;
    }
    protected unpackFrameData(bytes: number[]): void {
        this.text = new EncodedText({ textEncoding: bytes[0], value: BufferTools.copyBuffer(bytes, 1, bytes.length - 1) });
    }
    protected packFrameData(): number[] {
        let bytes: number[] = new Array(this.getLength());
        if (this.text != null) {
            bytes[0] = this.text.getTextEncoding();
            let textBytes: number[] = this.text.toBytes(true, false);
            if (textBytes.length > 0) {
                BufferTools.copyIntoByteBuffer(textBytes, 0, textBytes.length, bytes, 1);
            }
        }
        return bytes;
    }
    protected getLength(): number {
        let length = 1;
        if (this.text != null)
            length += this.text.toBytes(true, false).length;
        return length;
    }
    public getText(): EncodedText {
        return this.text;
    }
    public setText(text: EncodedText): void {
        this.text = text;
    }
}
