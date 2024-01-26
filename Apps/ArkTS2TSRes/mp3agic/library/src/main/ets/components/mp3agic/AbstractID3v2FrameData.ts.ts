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
import { InvalidDataException } from './InvalidDataException';
export abstract class AbstractID3v2FrameData {
    unsynchronisation: boolean;
    constructor(unsynchronisation: boolean) {
        this.unsynchronisation = unsynchronisation;
    }
    protected synchroniseAndUnpackFrameData(bytes: number[]): void {
        try {
            if (this.unsynchronisation && BufferTools.sizeSynchronisationWouldSubtract(bytes) > 0) {
                let synchronisedBytes: number[] = BufferTools.synchroniseBuffer(bytes);
                this.unpackFrameData(synchronisedBytes);
            }
            else {
                this.unpackFrameData(bytes);
            }
        }
        catch (error) {
            throw new InvalidDataException();
        }
    }
    protected packAndUnsynchroniseFrameData(): number[] {
        let bytes: number[] = this.packFrameData();
        if (this.unsynchronisation && BufferTools.sizeUnsynchronisationWouldAdd(bytes) > 0) {
            return BufferTools.unsynchroniseBuffer(bytes);
        }
        return bytes;
    }
    public toBytes(): number[] {
        return this.packAndUnsynchroniseFrameData();
    }
    protected abstract unpackFrameData(bytes: number[]): void;
    protected abstract packFrameData(): number[];
    protected abstract getLength(): number;
}
