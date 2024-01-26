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
import { AbstractID3v2Tag } from "./AbstractID3v2Tag";
import { ID3v2Frame } from "./ID3v2Frame";
import { ID3v24Frame } from "./ID3v24Frame";
import { EncodedText } from "./EncodedText";
import { ID3v2TextFrameData } from "./ID3v2TextFrameData";
import { BufferTools } from "./BufferTools";
export class ID3v24Tag extends AbstractID3v2Tag {
    public static const VERSION: string = "4.0";
    public static const ID_RECTIME: string = "TDRC";
    constructor(data?: Int8Array, obseleteFormat?: boolean) {
        super(data, obseleteFormat);
        if (!data) {
            this.version = ID3v24Tag.VERSION;
        }
    }
    public unpackFlags(buffer: Int8Array): void {
        this.unsynchronisation = BufferTools.checkBit(buffer[AbstractID3v2Tag.FLAGS_OFFSET], AbstractID3v2Tag.UNSYNCHRONISATION_BIT);
        this.extendedHeader = BufferTools.checkBit(buffer[AbstractID3v2Tag.FLAGS_OFFSET], AbstractID3v2Tag.EXTENDED_HEADER_BIT);
        this.experimental = BufferTools.checkBit(buffer[AbstractID3v2Tag.FLAGS_OFFSET], AbstractID3v2Tag.EXPERIMENTAL_BIT);
        this.footer = BufferTools.checkBit(buffer[AbstractID3v2Tag.FLAGS_OFFSET], AbstractID3v2Tag.FOOTER_BIT);
    }
    public packFlags(bytes: number[], offset: number): void {
        bytes[offset + AbstractID3v2Tag.FLAGS_OFFSET] = BufferTools.setBit(bytes[offset + AbstractID3v2Tag.FLAGS_OFFSET], AbstractID3v2Tag.UNSYNCHRONISATION_BIT, this.unsynchronisation);
        bytes[offset + AbstractID3v2Tag.FLAGS_OFFSET] = BufferTools.setBit(bytes[offset + AbstractID3v2Tag.FLAGS_OFFSET], AbstractID3v2Tag.EXTENDED_HEADER_BIT, this.extendedHeader);
        bytes[offset + AbstractID3v2Tag.FLAGS_OFFSET] = BufferTools.setBit(bytes[offset + AbstractID3v2Tag.FLAGS_OFFSET], AbstractID3v2Tag.EXPERIMENTAL_BIT, this.experimental);
        bytes[offset + AbstractID3v2Tag.FLAGS_OFFSET] = BufferTools.setBit(bytes[offset + AbstractID3v2Tag.FLAGS_OFFSET], AbstractID3v2Tag.FOOTER_BIT, this.footer);
    }
    protected useFrameUnsynchronisation(): boolean {
        return this.unsynchronisation;
    }
    protected createFrame(buffer: number[], currentOffset: number): ID3v2Frame {
        try {
            return ID3v24Frame.create(buffer, currentOffset);
        }
        catch (error) {
            return null;
        }
    }
    protected createFrameById(id: string, data: number[]): ID3v2Frame {
        return new ID3v24Frame(id, data);
    }
    public setGenreDescription(text: string): void {
        let frameData: ID3v2TextFrameData = new ID3v2TextFrameData(useFrameUnsynchronisation(), new EncodedText({ str: text }));
        let frameSet: ID3v2FrameSet = this.getFrameSets().get(AbstractID3v2Tag.ID_GENRE);
        if (frameSet == null) {
            this.getFrameSets().set(AbstractID3v2Tag.ID_GENRE, frameSet = new ID3v2FrameSet(AbstractID3v2Tag.ID_GENRE));
        }
        frameSet.clear();
        frameSet.addFrame(this.createFrameById(AbstractID3v2Tag.ID_GENRE, frameData.toBytes()));
    }
    public getRecordingTime(): string {
        let frameData: ID3v2TextFrameData = super.extractTextFrameData(ID3v24Tag.ID_RECTIME);
        if (frameData != null && frameData.getText() != null)
            return frameData.getText().toString();
        return null;
    }
    public setRecordingTime(recTime: string): void {
        if (recTime != null && recTime.length > 0) {
            super.invalidateDataLength();
            let frameData: ID3v2TextFrameData = new ID3v2TextFrameData(this.useFrameUnsynchronisation(), new EncodedText({ str: recTime }));
            this.addFrame(this.createFrameById(ID3v24Tag.ID_RECTIME, frameData.toBytes()), true);
        }
    }
}
