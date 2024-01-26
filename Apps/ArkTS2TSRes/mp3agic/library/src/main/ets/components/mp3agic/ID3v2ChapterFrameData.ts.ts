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
import { ID3v2Frame } from "./ID3v2Frame";
import { JList } from "./JList";
import { ByteBufferUtils } from "./ByteBufferUtils";
import { AbstractID3v2FrameData } from "./AbstractID3v2FrameData";
import { BufferTools } from "./BufferTools";
import { InvalidDataException } from './InvalidDataException';
export class ID3v2ChapterFrameData extends AbstractID3v2FrameData {
    protected id: string;
    protected startTime: number;
    protected endTime: number;
    protected startOffset: number;
    protected endOffset: number;
    protected subframes: JList<ID3v2Frame> = new JList<ID3v2Frame>();
    constructor(unsynchronisation: boolean, bytes?: number[], id?: string, startTime?: number, endTime?: number, startOffset?: number, endOffset?: number) {
        super(unsynchronisation);
        if (id) {
            this.id = id;
            this.startTime = startTime;
            this.endTime = endTime;
            this.startOffset = startOffset;
            this.endOffset = endOffset;
        }
        if (bytes) {
            super.synchroniseAndUnpackFrameData(bytes);
        }
    }
    protected unpackFrameData(bytes: number[]): void {
        try {
        }
        catch (error) {
            throw new InvalidDataException();
        }
        this.id = ByteBufferUtils.extractNullTerminatedString(bytes);
        let startNum = this.id.length + 1;
        this.startTime = ByteBufferUtils.getInt(bytes[startNum], bytes[startNum + 1], bytes[startNum + 2], bytes[startNum + 3]);
        startNum += 4;
        this.endTime = ByteBufferUtils.getInt(bytes[startNum], bytes[startNum + 1], bytes[startNum + 2], bytes[startNum + 3]);
        startNum += 4;
        this.startOffset = ByteBufferUtils.getInt(bytes[startNum], bytes[startNum + 1], bytes[startNum + 2], bytes[startNum + 3]);
        startNum += 4;
        this.endOffset = ByteBufferUtils.getInt(bytes[startNum], bytes[startNum + 1], bytes[startNum + 2], bytes[startNum + 3]);
        startNum += 4;
        for (let offset = startNum; offset < bytes.length;) {
            let frame: ID3v2Frame = ID3v2Frame.create(bytes, offset);
            offset += frame.getLength();
            this.subframes.insert(frame);
        }
    }
    public addSubframe(id: string, frame: AbstractID3v2FrameData): void {
        this.subframes.insert(new ID3v2Frame(id, frame.toBytes()));
    }
    protected packFrameData(): number[] {
        let bb: number[] = new Array(this.getLength());
        // bb.push(BufferTools.stringToBytes(this.id));
        let ids = BufferTools.stringToBytes(this.id);
        let indexNum = 0;
        // bb.put(id.getBytes());
        for (; indexNum < ids.length; indexNum++) {
            bb[indexNum] = ids[indexNum];
        }
        // bb.put((byte) 0);
        bb[indexNum] = 0;
        indexNum++;
        indexNum = this.putInt(bb, indexNum, this.startTime);
        indexNum = this.putInt(bb, indexNum, this.endTime);
        indexNum = this.putInt(bb, indexNum, this.startOffset);
        indexNum = this.putInt(bb, indexNum, this.endOffset);
        for (let index = 0; index < this.subframes.length(); index++) {
            try {
                let bytes = this.subframes.get(index).toBytes();
                for (let i = 0; i < bytes.length; i++) {
                    bb[indexNum] = bytes[i];
                    indexNum++;
                }
            }
            catch (error) {
                console.error('mp3agic ID3v2ChapterFrameData packFrameData error:' + error);
            }
        }
        return bb;
    }
    private putInt(array: Array, index: number, num: number): number {
        array[index] = this.int3(num);
        index++;
        array[index] = this.int2(num);
        index++;
        array[index] = this.int1(num);
        index++;
        array[index] = this.int0(num);
        index++;
        return index;
    }
    // byte Int8Array.from
    private int3(x: number): number {
        return Int8Array.from([x >> 24])[0];
    }
    private int2(x: number): number {
        return Int8Array.from([x >> 16])[0];
    }
    private int1(x: number): number {
        return Int8Array.from([x >> 8])[0];
    }
    private int0(x: number): number {
        return Int8Array.from([x])[0];
    }
    public getId(): string {
        return this.id;
    }
    public setId(id: string) {
        this.id = id;
    }
    public getStartTime(): number {
        return this.startTime;
    }
    public setStartTime(startTime: number): void {
        this.startTime = startTime;
    }
    public getEndTime(): number {
        return this.endTime;
    }
    public setEndTime(endTime: number): void {
        this.endTime = endTime;
    }
    public getStartOffset(): number {
        return this.startOffset;
    }
    public setStartOffset(startOffset: number): void {
        this.startOffset = startOffset;
    }
    public getEndOffset(): number {
        return this.endOffset;
    }
    public setEndOffset(endOffset: number): void {
        this.endOffset = endOffset;
    }
    public getSubframes(): JList<ID3v2Frame> {
        return this.subframes;
    }
    public setSubframes(subframes: JList<ID3v2Frame>): void {
        this.subframes = subframes;
    }
    protected getLength(): number {
        let length = 1;
        length += 16;
        if (this.id != null)
            length += this.id.length;
        if (this.subframes != null) {
            for (let index = 0; index < this.subframes.length(); index++) {
                length += this.subframes.get(index).getLength();
            }
        }
        return length;
    }
}
