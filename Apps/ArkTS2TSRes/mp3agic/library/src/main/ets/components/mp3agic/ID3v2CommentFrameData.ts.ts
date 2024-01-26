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
import { IllegalArgumentException } from './IllegalArgumentException';
export class ID3v2CommentFrameData extends AbstractID3v2FrameData {
    private static const DEFAULT_LANGUAGE: string = "eng";
    private language: string;
    private description: EncodedText;
    private comment: EncodedText;
    constructor(unsynchronisation: boolean, language?: string, description?: EncodedText | null, comment?: EncodedText) {
        super(unsynchronisation);
        if (description != null && comment != null && description.getTextEncoding() != comment.getTextEncoding()) {
            throw new IllegalArgumentException("description and comment must have same text encoding");
        }
        if (language) {
            this.language = language;
        }
        if (description) {
            this.description = description;
        }
        if (comment) {
            this.comment = comment;
        }
    }
    public static create(unsynchronisation: boolean, bytes: number[]): ID3v2CommentFrameData {
        let frame = new ID3v2CommentFrameData(unsynchronisation);
        frame.synchroniseAndUnpackFrameData(bytes);
        return frame;
    }
    protected unpackFrameData(bytes: number[]): void {
        try {
            this.language = BufferTools.byteBufferToString(bytes, 1, 3);
        }
        catch (error) {
            this.language = "";
        }
        let marker = BufferTools.indexOfTerminatorForEncoding(bytes, 4, bytes[0]);
        if (marker >= 4) {
            this.description = new EncodedText({
                textEncoding: bytes[0],
                value: BufferTools.copyBuffer(bytes, 4, marker - 4)
            });
            marker += this.description.getTerminator().length;
        }
        else {
            this.description = new EncodedText({ textEncoding: bytes[0], str: "" });
            marker = 4;
        }
        this.comment = new EncodedText({
            textEncoding: bytes[0],
            value: BufferTools.copyBuffer(bytes, marker, bytes.length - marker)
        });
    }
    protected packFrameData(): number[] {
        let bytes: number[] = new Array(this.getLength());
        if (this.comment != null) {
            bytes[0] = this.comment.getTextEncoding();
        }
        else {
            bytes[0] = 0;
        }
        let langPadded: string;
        if (this.language == null) {
            langPadded = ID3v2CommentFrameData.DEFAULT_LANGUAGE;
        }
        else if (this.language.length > 3) {
            langPadded = this.language.substring(0, 3);
        }
        else {
            langPadded = BufferTools.padStringRight(this.language, 3, '00');
        }
        try {
            BufferTools.stringIntoByteBuffer(langPadded, 0, 3, bytes, 1);
        }
        catch (error) {
        }
        let marker = 4;
        if (this.description != null) {
            let descriptionBytes: number[] = this.description.toBytes(true, true);
            BufferTools.copyIntoByteBuffer(descriptionBytes, 0, descriptionBytes.length, bytes, marker);
            marker += descriptionBytes.length;
        }
        else {
            let terminatorBytes: number[] = this.comment != null ? this.comment.getTerminator() : [0];
            BufferTools.copyIntoByteBuffer(terminatorBytes, 0, terminatorBytes.length, bytes, marker);
            marker += terminatorBytes.length;
        }
        if (this.comment != null) {
            let commentBytes: number[] = this.comment.toBytes(true, false);
            BufferTools.copyIntoByteBuffer(commentBytes, 0, commentBytes.length, bytes, marker);
        }
        return bytes;
    }
    protected getLength(): number {
        let length = 4;
        if (this.description != null)
            length += this.description.toBytes(true, true).length;
        else
            length += this.comment != null ? this.comment.getTerminator().length : 1;
        if (this.comment != null)
            length += this.comment.toBytes(true, false).length;
        return length;
    }
    public getLanguage(): string {
        return this.language;
    }
    public setLanguage(language: string): void {
        this.language = language;
    }
    public getComment(): EncodedText {
        return this.comment;
    }
    public setComment(comment: EncodedText): void {
        this.comment = comment;
    }
    public getDescription(): EncodedText {
        return this.description;
    }
    public setDescription(description: EncodedText): void {
        this.description = description;
    }
}
