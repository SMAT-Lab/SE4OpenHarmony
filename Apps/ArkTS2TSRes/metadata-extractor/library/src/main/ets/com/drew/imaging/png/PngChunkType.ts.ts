/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import StringUtil from '../../lang/StringUtil';
import buffer from '@ohos.buffer';
class PngChunkType {
    private static readonly _identifiersAllowingMultiples: Set<String> = new Set<String>()
        .add("IDAT")
        .add("sPLT")
        .add("iTXt")
        .add("tEXt")
        .add("zTXt");
    //
    // Standard critical chunks
    //
    /**
     * Denotes a critical {@link PngChunk} that contains basic information about the PNG image.
     * This must be the first chunk in the data sequence, and may only occur once.
     * <p>
     * The format is:
     * <ul>
     *     <li><b>pixel width</b> 4 bytes, unsigned and greater than zero</li>
     *     <li><b>pixel height</b> 4 bytes, unsigned and greater than zero</li>
     *     <li><b>bit depth</b> 1 byte, number of bits per sample or per palette index (not per pixel)</li>
     *     <li><b>color type</b> 1 byte, maps to {@link PngColorType} enum</li>
     *     <li><b>compression method</b> 1 byte, currently only a value of zero (deflate/inflate) is in the standard</li>
     *     <li><b>filter method</b> 1 byte, currently only a value of zero (adaptive filtering with five basic filter types) is in the standard</li>
     *     <li><b>interlace method</b> 1 byte, indicates the transmission order of image data, currently only 0 (no interlace) and 1 (Adam7 interlace) are in the standard</li>
     * </ul>
     */
    public static readonly IHDR: PngChunkType = new PngChunkType("IHDR");
    /**
     * Denotes a critical {@link PngChunk} that contains palette entries.
     * This chunk should only appear for a {@link PngColorType} of <code>IndexedColor</code>,
     * and may only occur once in the PNG data sequence.
     * <p>
     * The chunk contains between one and 256 entries, each of three bytes:
     * <ul>
     *     <li><b>red</b> 1 byte</li>
     *     <li><b>green</b> 1 byte</li>
     *     <li><b>blue</b> 1 byte</li>
     * </ul>
     * The number of entries is determined by the chunk length. A chunk length indivisible by three is an error.
     */
    public static readonly PLTE: PngChunkType = new PngChunkType("PLTE");
    public static readonly IDAT: PngChunkType = new PngChunkType("IDAT", true);
    public static readonly IEND: PngChunkType = new PngChunkType("IEND");
    //
    // Standard ancillary chunks
    //
    public static readonly cHRM: PngChunkType = new PngChunkType("cHRM");
    public static readonly gAMA: PngChunkType = new PngChunkType("gAMA");
    public static readonly iCCP: PngChunkType = new PngChunkType("iCCP");
    public static readonly sBIT: PngChunkType = new PngChunkType("sBIT");
    public static readonly sRGB: PngChunkType = new PngChunkType("sRGB");
    public static readonly bKGD: PngChunkType = new PngChunkType("bKGD");
    public static readonly hIST: PngChunkType = new PngChunkType("hIST");
    public static readonly tRNS: PngChunkType = new PngChunkType("tRNS");
    public static readonly pHYs: PngChunkType = new PngChunkType("pHYs");
    public static readonly sPLT: PngChunkType = new PngChunkType("sPLT", true);
    public static readonly tIME: PngChunkType = new PngChunkType("tIME");
    public static readonly iTXt: PngChunkType = new PngChunkType("iTXt", true);
    public static readonly tEXt: PngChunkType = new PngChunkType("tEXt", true);
    public static readonly zTXt: PngChunkType = new PngChunkType("zTXt", true);
    public static readonly eXIf: PngChunkType = new PngChunkType("eXIf");
    /**
     * Denotes an ancillary {@link PngChunk} that contains textual data, having first a keyword and then a value.
     * If multiple text data keywords are needed, then multiple chunks are included in the PNG data stream.
     * <p>
     * The format is:
     * <ul>
     *     <li><b>keyword</b> 1-79 bytes</li>
     *     <li><b>null separator</b> 1 byte (\0)</li>
     *     <li><b>text string</b> 0 or more bytes</li>
     * </ul>
     * Text is interpreted according to the Latin-1 character set [ISO-8859-1].
     * Newlines should be represented by a single linefeed character (0x9).
     */
    private readonly _bytes: number[];
    private readonly _multipleAllowed: boolean;
    public constructor(identifier?: string, multipleAllowed?: boolean, input?: number[]) {
        if (identifier != null && identifier != '') {
            this._multipleAllowed = multipleAllowed;
            try {
                this._bytes = this.stringToAsciiBytes(identifier);
            }
            catch (error) {
                throw new Error("Unable to convert string code to bytes.");
            }
        }
        else {
            PngChunkType.validateBytes(input);
            this._bytes = input;
            this._multipleAllowed = PngChunkType._identifiersAllowingMultiples.has(this.getIdentifier());
        }
    }
    stringToAsciiBytes(str) {
        var bytes = [];
        for (var i = 0; i < str.length; i++) {
            var charCode = str.charCodeAt(i);
            // 检查字符是否在 ASCII 编码范围内（0-127）
            if (charCode >= 0 && charCode <= 127) {
                bytes.push(charCode);
            }
            else {
                throw new Error('PngChunkType String contains non-ASCII characters.');
            }
        }
        return bytes;
    }
    public static validateBytes(bytes: number[]): void {
        if (bytes.length != 4) {
            throw new Error("PNG chunk type identifier must be four bytes in length");
        }
        for (let b of bytes) {
            if (!PngChunkType.isValidByte(b)) {
                throw new Error("PNG chunk type identifier may only contain alphabet characters");
            }
        }
    }
    public isCritical(): boolean {
        return PngChunkType.isUpperCase(this._bytes[0]);
    }
    public isAncillary(): boolean {
        return !this.isCritical();
    }
    public isPrivate(): boolean {
        return PngChunkType.isUpperCase(this._bytes[1]);
    }
    public isSafeToCopy(): boolean {
        return PngChunkType.isLowerCase(this._bytes[3]);
    }
    public areMultipleAllowed(): boolean {
        return this._multipleAllowed;
    }
    private static isLowerCase(b: number): boolean {
        return (b & (1 << 5)) != 0;
    }
    private static isUpperCase(b: number): boolean {
        return (b & (1 << 5)) == 0;
    }
    private static isValidByte(b: number): boolean {
        return (b >= 65 && b <= 90) || (b >= 97 && b <= 122);
    }
    public getIdentifier(): string {
        try {
            return buffer.from(this._bytes).toString('ascii');
        }
        catch (error) {
            console.info("PngChunkType getIdentifier error" + error);
            // The constructor should ensure that we're always able to encode the bytes in ASCII.
            // noinspection ConstantConditions
            return "Invalid object instance";
        }
    }
    public toString(): string {
        return this.getIdentifier();
    }
    public equals(o: Object): boolean {
        if (this == o) {
            return true;
        }
        if (o == null) {
            return false;
        }
    }
}
export default PngChunkType;
