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
import { ID3v2PictureFrameData } from "./ID3v2PictureFrameData";
export class ID3v2ObseletePictureFrameData extends ID3v2PictureFrameData {
    protected mimeType: string;
    protected pictureType: number;
    protected description: EncodedText;
    protected imageData: number[];
    constructor(unsynchronisation: boolean, bytes: number[]) {
        super(unsynchronisation, bytes);
    }
    protected unpackFrameData(bytes: number[]): void {
        let filetype;
        try {
            filetype = BufferTools.byteBufferToString(bytes, 1, 3);
        }
        catch (error) {
            filetype = "unknown";
        }
        console.log('mp3agic filetype:' + filetype);
        this.mimeType = "image/" + filetype.toLowerCase();
        this.pictureType = bytes[4];
        let marker = BufferTools.indexOfTerminatorForEncoding(bytes, 5, bytes[0]);
        if (marker >= 0) {
            this.description = new EncodedText({
                textEncoding: bytes[0],
                value: BufferTools.copyBuffer(bytes, 5, marker - 5)
            });
            marker += this.description.getTerminator().length;
        }
        else {
            this.description = new EncodedText({ textEncoding: bytes[0], str: "" });
            marker = 1;
        }
        this.imageData = BufferTools.copyBuffer(bytes, marker, bytes.length - marker);
    }
}
