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
export class ID3v2ChapterTOCFrameData extends AbstractID3v2FrameData {
    protected is_root: boolean;
    protected is_ordered: boolean;
    protected id: string;
    protected children: Array;
    protected subframes: JList<ID3v2Frame> = new JList<ID3v2Frame>();
    constructor(unsynchronisation: boolean, bytes?: number[], isRoot?: boolean, isOrdered?: boolean, id?: string, children?: Array) {
        super(unsynchronisation);
        if (id) {
            this.is_root = isRoot;
            this.is_ordered = isOrdered;
            this.id = id;
            this.children = children;
        }
        if (bytes) {
            super.synchroniseAndUnpackFrameData(bytes);
        }
    }
    protected unpackFrameData(bytes: number[]): void {
        try {
            this.id = ByteBufferUtils.extractNullTerminatedString(bytes);
            let startNum = this.id.length + 1;
            let flags = bytes[startNum];
            startNum += 1;
            if ((flags & 0x01) == 0x01) {
                this.is_root = true;
            }
            if ((flags & 0x02) == 0x02) {
                this.is_ordered = true;
            }
            // TODO: 0xFF -> int = 255; byte = -128;
            let childCount = bytes[startNum];
            startNum += 1;
            this.children = new Array(childCount);
            for (let i = 0; i < childCount; i++) {
                this.children[i] = ByteBufferUtils.extractNullTerminatedString(bytes, startNum);
                startNum = startNum + this.children[i].length + 1;
            }
            for (let offset = startNum; offset < bytes.length;) {
                let frame: ID3v2Frame = ID3v2Frame.create(bytes, offset);
                offset += frame.getLength();
                this.subframes.insert(frame);
            }
        }
        catch (error) {
            throw new InvalidDataException();
        }
    }
    public addSubframe(id: string, frame: AbstractID3v2FrameData): void {
        this.subframes.insert(new ID3v2Frame(id, frame.toBytes()));
    }
    protected packFrameData(): number[] {
        let bb = new Array(this.getLength());
        let ids = BufferTools.stringToBytes(this.id);
        let indexNum = 0;
        // bb.put(id.getBytes());
        for (; indexNum < ids.length; indexNum++) {
            bb[indexNum] = ids[indexNum];
        }
        //bb.put((byte) 0);
        bb[indexNum] = 0;
        indexNum++;
        bb[indexNum] = this.getFlags();
        indexNum++;
        // bb.put((byte) children.length);
        bb[indexNum] = Int8Array.from([this.children.length])[0];
        indexNum++;
        for (let child of this.children) {
            let str = BufferTools.stringToBytes(child);
            for (let i = 0; i < str.length; i++) {
                bb[indexNum] = str[i];
                indexNum++;
            }
            // bb.push(0);
            bb[indexNum] = 0;
            indexNum++;
        }
        for (let index = 0; index < this.subframes.length(); index++) {
            try {
                // bb.push(this.subframes.get(index).toBytes());
                let bytes = this.subframes.get(index).toBytes();
                for (let i = 0; i < bytes.length; i++) {
                    bb[indexNum] = bytes[i];
                    indexNum++;
                }
            }
            catch (error) {
                console.error('mp3agic ID3v2ChapterTOCFrameData packFrameData error: ' + error);
            }
        }
        return bb;
    }
    private getFlags(): number {
        let b = 0;
        if (this.is_root) {
            b |= 0x01;
        }
        if (this.is_ordered) {
            b |= 0x02;
        }
        return b;
    }
    public isRoot(): boolean {
        return this.is_root;
    }
    public setRoot(isRoot: boolean): void {
        this.is_root = isRoot;
    }
    public isOrdered(): boolean {
        return this.is_ordered;
    }
    public setOrdered(isOrdered: boolean): void {
        this.is_ordered = isOrdered;
    }
    public getId(): string {
        return this.id;
    }
    public setId(id: string): void {
        this.id = id;
    }
    public getChildren(): Array {
        return this.children;
    }
    public setChildren(children: Array): void {
        this.children = children;
    }
    // Deprecated
    public getChilds(): string[] {
        return this.children;
    }
    // Deprecated
    public setChilds(childs: string[]): void {
        this.children = childs;
    }
    public getSubframes(): JList<ID3v2Frame> {
        return this.subframes;
    }
    public setSubframes(subframes: JList<ID3v2Frame>): void {
        this.subframes = subframes;
    }
    protected getLength(): number {
        let length = 3;
        if (this.id != null)
            length += this.id.length;
        if (this.children != null) {
            length += this.children.length;
            for (let child of this.children) {
                length += child.length;
            }
        }
        if (this.subframes != null) {
            for (let index = 0; index < this.subframes.length(); index++) {
                length += this.subframes.get(index).getLength();
            }
        }
        return length;
    }
}
