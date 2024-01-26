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
export class ID3v2PopmFrameData extends AbstractID3v2FrameData {
    protected static WMP9_ADDRESS: string = "Windows Media Player 9 Series";
    protected address: string = "";
    protected rating: number = -1;
    private static byteToRating: Map<number, number> = new Map();
    //(byte) 0x80 ----- > -128, (byte) 0xC4 ----> -60, (byte) 0xFF-------> -1
    private static wmp9encodedRatings: number[] = [0x00, 0x01, 0x40, -128, -60, -1];
    constructor(unsynchronisation: boolean, bytes: number[] | null, rating?: number) {
        super(unsynchronisation);
        if (rating != null) {
            this.address = ID3v2PopmFrameData.WMP9_ADDRESS;
            this.rating = rating;
        }
        if (bytes != null) {
            for (let i = 0; i < 6; i++) {
                ID3v2PopmFrameData.byteToRating.set(ID3v2PopmFrameData.wmp9encodedRatings[i], i);
            }
            super.synchroniseAndUnpackFrameData(bytes);
        }
    }
    protected unpackFrameData(bytes: number[]): void {
        try {
            this.address = BufferTools.byteBufferToString(bytes, 0, bytes.length - 2);
        }
        catch (error) {
            this.address = "";
        }
        let ratingByte: number = bytes[bytes.length - 1];
        if (ID3v2PopmFrameData.byteToRating.has(ratingByte)) {
            this.rating = ID3v2PopmFrameData.byteToRating.get(ratingByte);
        }
        else {
            this.rating = -1;
        }
    }
    public packFrameData(): number[] {
        let bytes: number[] = BufferTools.stringToBytes(this.address);
        bytes = BufferTools.copyOf(bytes, this.address.length + 2);
        bytes[bytes.length - 2] = 0;
        bytes[bytes.length - 1] = ID3v2PopmFrameData.wmp9encodedRatings[this.rating];
        return bytes;
    }
    public getAddress(): string {
        return this.address;
    }
    public setAddress(address: string): void {
        this.address = address;
    }
    public getRating(): number {
        return this.rating;
    }
    public setRating(rating: number): void {
        this.rating = rating;
    }
    protected getLength(): number {
        return this.address.length + 2;
    }
}
