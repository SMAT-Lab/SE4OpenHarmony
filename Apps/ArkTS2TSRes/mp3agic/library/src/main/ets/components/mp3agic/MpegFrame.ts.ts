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
import { BufferTools } from './BufferTools';
import { InvalidDataException } from './InvalidDataException';
export class MpegFrame {
    public static MPEG_VERSION_1_0: string = "1.0";
    public static MPEG_VERSION_2_0: string = "2.0";
    public static MPEG_VERSION_2_5: string = "2.5";
    public static MPEG_LAYER_1: string = "I";
    public static MPEG_LAYER_2: string = "II";
    public static MPEG_LAYER_3: string = "III";
    public static MPEG_LAYERS: string[] = [null, MpegFrame.MPEG_LAYER_1, MpegFrame.MPEG_LAYER_2, MpegFrame.MPEG_LAYER_3];
    public static CHANNEL_MODE_MONO: string = "Mono";
    public static CHANNEL_MODE_DUAL_MONO: string = "Dual mono";
    public static CHANNEL_MODE_JOINT_STEREO: string = "Joint stereo";
    public static CHANNEL_MODE_STEREO: string = "Stereo";
    public static MODE_EXTENSION_BANDS_4_31: string = "Bands 4-31";
    public static MODE_EXTENSION_BANDS_8_31: string = "Bands 8-31";
    public static MODE_EXTENSION_BANDS_12_31: string = "Bands 12-31";
    public static MODE_EXTENSION_BANDS_16_31: string = "Bands 16-31";
    public static MODE_EXTENSION_NONE: string = "None";
    public static MODE_EXTENSION_INTENSITY_STEREO: string = "Intensity stereo";
    public static MODE_EXTENSION_M_S_STEREO: string = "M/S stereo";
    public static MODE_EXTENSION_INTENSITY_M_S_STEREO: string = "Intensity & M/S stereo";
    public static MODE_EXTENSION_NA: string = "n/a";
    public static EMPHASIS_NONE: string = "None";
    public static EMPHASIS__50_15_MS: string = "50/15 ms";
    public static EMPHASIS_CCITT_J_17: string = "CCITT J.17";
    private static FRAME_DATA_LENGTH: number = 4;
    private static FRAME_SYNC: number = 0x7FF;
    private static BITMASK_FRAME_SYNC: number = 0xFFE00000;
    private static BITMASK_VERSION: number = 0x180000;
    private static BITMASK_LAYER: number = 0x60000;
    private static BITMASK_PROTECTION: number = 0x10000;
    private static BITMASK_BITRATE: number = 0xF000;
    private static BITMASK_SAMPLE_RATE: number = 0xC00;
    private static BITMASK_PADDING: number = 0x200;
    private static BITMASK_PRIVATE: number = 0x100;
    private static BITMASK_CHANNEL_MODE: number = 0xC0;
    private static BITMASK_MODE_EXTENSION: number = 0x30;
    private static BITMASK_COPYRIGHT: number = 0x8;
    private static BITMASK_ORIGINAL: number = 0x4;
    private static BITMASK_EMPHASIS: number = 0x3;
    private version: string;
    private layer: number;
    private protection: boolean;
    private bitrate: number;
    private sampleRate: number;
    private padding: boolean;
    private privat: boolean;
    private channelMode: string;
    private modeExtension: string;
    private copyright: boolean;
    private original: boolean;
    private emphasis: string;
    constructor(frameData1: number, frameData2: number, frameData3: number, frameData4: number) {
        let frameHeader = BufferTools.unpackInteger(frameData1, frameData2, frameData3, frameData4);
        this.setFields(frameHeader);
    }
    private setFields(frameHeader: number): void {
        let frameSync = this.extractField(frameHeader, MpegFrame.BITMASK_FRAME_SYNC);
        if (frameSync != MpegFrame.FRAME_SYNC) {
            throw new InvalidDataException("Frame sync missing");
        }
        this.setVersion(this.extractField(frameHeader, MpegFrame.BITMASK_VERSION));
        this.setLayer(this.extractField(frameHeader, MpegFrame.BITMASK_LAYER));
        this.setProtection(this.extractField(frameHeader, MpegFrame.BITMASK_PROTECTION));
        this.setBitRate(this.extractField(frameHeader, MpegFrame.BITMASK_BITRATE));
        this.setSampleRate(this.extractField(frameHeader, MpegFrame.BITMASK_SAMPLE_RATE));
        this.setPadding(this.extractField(frameHeader, MpegFrame.BITMASK_PADDING));
        this.setPrivate(this.extractField(frameHeader, MpegFrame.BITMASK_PRIVATE));
        this.setChannelMode(this.extractField(frameHeader, MpegFrame.BITMASK_CHANNEL_MODE));
        this.setModeExtension(this.extractField(frameHeader, MpegFrame.BITMASK_MODE_EXTENSION));
        this.setCopyright(this.extractField(frameHeader, MpegFrame.BITMASK_COPYRIGHT));
        this.setOriginal(this.extractField(frameHeader, MpegFrame.BITMASK_ORIGINAL));
        this.setEmphasis(this.extractField(frameHeader, MpegFrame.BITMASK_EMPHASIS));
    }
    protected extractField(frameHeader: number, bitMask: number): number {
        let shiftBy = 0;
        for (let i = 0; i <= 31; i++) {
            if (((bitMask >> i) & 1) != 0) {
                shiftBy = i;
                break;
            }
        }
        // TODO 强转int, bitMask >> shiftBy  ----> 无符号右移 bitMask >>> shiftBy
        return ((frameHeader >> shiftBy) & (bitMask >>> shiftBy));
    }
    private setVersion(version: number): void {
        switch (version) {
            case 0:
                this.version = MpegFrame.MPEG_VERSION_2_5;
                break;
            case 2:
                this.version = MpegFrame.MPEG_VERSION_2_0;
                break;
            case 3:
                this.version = MpegFrame.MPEG_VERSION_1_0;
                break;
            default:
                throw new InvalidDataException("Invalid mpeg audio version in frame header");
        }
    }
    private setLayer(layer: number): void {
        switch (layer) {
            case 1:
                this.layer = 3;
                break;
            case 2:
                this.layer = 2;
                break;
            case 3:
                this.layer = 1;
                break;
            default:
                throw new InvalidDataException("Invalid mpeg layer description in frame header");
        }
    }
    private setProtection(protectionBit: number): void {
        this.protection = (protectionBit == 1);
    }
    private setBitRate(bitrate: number): void {
        if (MpegFrame.MPEG_VERSION_1_0 == this.version) {
            if (this.layer == 1) {
                switch (bitrate) {
                    case 1:
                        this.bitrate = 32;
                        return;
                    case 2:
                        this.bitrate = 64;
                        return;
                    case 3:
                        this.bitrate = 96;
                        return;
                    case 4:
                        this.bitrate = 128;
                        return;
                    case 5:
                        this.bitrate = 160;
                        return;
                    case 6:
                        this.bitrate = 192;
                        return;
                    case 7:
                        this.bitrate = 224;
                        return;
                    case 8:
                        this.bitrate = 256;
                        return;
                    case 9:
                        this.bitrate = 288;
                        return;
                    case 10:
                        this.bitrate = 320;
                        return;
                    case 11:
                        this.bitrate = 352;
                        return;
                    case 12:
                        this.bitrate = 384;
                        return;
                    case 13:
                        this.bitrate = 416;
                        return;
                    case 14:
                        this.bitrate = 448;
                        return;
                }
            }
            else if (this.layer == 2) {
                switch (bitrate) {
                    case 1:
                        this.bitrate = 32;
                        return;
                    case 2:
                        this.bitrate = 48;
                        return;
                    case 3:
                        this.bitrate = 56;
                        return;
                    case 4:
                        this.bitrate = 64;
                        return;
                    case 5:
                        this.bitrate = 80;
                        return;
                    case 6:
                        this.bitrate = 96;
                        return;
                    case 7:
                        this.bitrate = 112;
                        return;
                    case 8:
                        this.bitrate = 128;
                        return;
                    case 9:
                        this.bitrate = 160;
                        return;
                    case 10:
                        this.bitrate = 192;
                        return;
                    case 11:
                        this.bitrate = 224;
                        return;
                    case 12:
                        this.bitrate = 256;
                        return;
                    case 13:
                        this.bitrate = 320;
                        return;
                    case 14:
                        this.bitrate = 384;
                        return;
                }
            }
            else if (this.layer == 3) {
                switch (bitrate) {
                    case 1:
                        this.bitrate = 32;
                        return;
                    case 2:
                        this.bitrate = 40;
                        return;
                    case 3:
                        this.bitrate = 48;
                        return;
                    case 4:
                        this.bitrate = 56;
                        return;
                    case 5:
                        this.bitrate = 64;
                        return;
                    case 6:
                        this.bitrate = 80;
                        return;
                    case 7:
                        this.bitrate = 96;
                        return;
                    case 8:
                        this.bitrate = 112;
                        return;
                    case 9:
                        this.bitrate = 128;
                        return;
                    case 10:
                        this.bitrate = 160;
                        return;
                    case 11:
                        this.bitrate = 192;
                        return;
                    case 12:
                        this.bitrate = 224;
                        return;
                    case 13:
                        this.bitrate = 256;
                        return;
                    case 14:
                        this.bitrate = 320;
                        return;
                }
            }
        }
        else if (MpegFrame.MPEG_VERSION_2_0 == this.version || MpegFrame.MPEG_VERSION_2_5 == this.version) {
            if (this.layer == 1) {
                switch (bitrate) {
                    case 1:
                        this.bitrate = 32;
                        return;
                    case 2:
                        this.bitrate = 48;
                        return;
                    case 3:
                        this.bitrate = 56;
                        return;
                    case 4:
                        this.bitrate = 64;
                        return;
                    case 5:
                        this.bitrate = 80;
                        return;
                    case 6:
                        this.bitrate = 96;
                        return;
                    case 7:
                        this.bitrate = 112;
                        return;
                    case 8:
                        this.bitrate = 128;
                        return;
                    case 9:
                        this.bitrate = 144;
                        return;
                    case 10:
                        this.bitrate = 160;
                        return;
                    case 11:
                        this.bitrate = 176;
                        return;
                    case 12:
                        this.bitrate = 192;
                        return;
                    case 13:
                        this.bitrate = 224;
                        return;
                    case 14:
                        this.bitrate = 256;
                        return;
                }
            }
            else if (this.layer == 2 || this.layer == 3) {
                switch (bitrate) {
                    case 1:
                        this.bitrate = 8;
                        return;
                    case 2:
                        this.bitrate = 16;
                        return;
                    case 3:
                        this.bitrate = 24;
                        return;
                    case 4:
                        this.bitrate = 32;
                        return;
                    case 5:
                        this.bitrate = 40;
                        return;
                    case 6:
                        this.bitrate = 48;
                        return;
                    case 7:
                        this.bitrate = 56;
                        return;
                    case 8:
                        this.bitrate = 64;
                        return;
                    case 9:
                        this.bitrate = 80;
                        return;
                    case 10:
                        this.bitrate = 96;
                        return;
                    case 11:
                        this.bitrate = 112;
                        return;
                    case 12:
                        this.bitrate = 128;
                        return;
                    case 13:
                        this.bitrate = 144;
                        return;
                    case 14:
                        this.bitrate = 160;
                        return;
                }
            }
        }
        throw new InvalidDataException("Invalid bitrate in frame header");
    }
    private setSampleRate(sampleRate: number): void {
        if (MpegFrame.MPEG_VERSION_1_0 == (this.version)) {
            switch (sampleRate) {
                case 0:
                    this.sampleRate = 44100;
                    return;
                case 1:
                    this.sampleRate = 48000;
                    return;
                case 2:
                    this.sampleRate = 32000;
                    return;
            }
        }
        else if (MpegFrame.MPEG_VERSION_2_0 == (this.version)) {
            switch (sampleRate) {
                case 0:
                    this.sampleRate = 22050;
                    return;
                case 1:
                    this.sampleRate = 24000;
                    return;
                case 2:
                    this.sampleRate = 16000;
                    return;
            }
        }
        else if (MpegFrame.MPEG_VERSION_2_5 == (this.version)) {
            switch (sampleRate) {
                case 0:
                    this.sampleRate = 11025;
                    return;
                case 1:
                    this.sampleRate = 12000;
                    return;
                case 2:
                    this.sampleRate = 8000;
                    return;
            }
        }
        throw new InvalidDataException("Invalid sample rate in frame header");
    }
    private setPadding(paddingBit: number): void {
        this.padding = (paddingBit == 1);
    }
    private setPrivate(privateBit: number): void {
        this.privat = (privateBit == 1);
    }
    private setChannelMode(channelMode: number): void {
        switch (channelMode) {
            case 0:
                this.channelMode = MpegFrame.CHANNEL_MODE_STEREO;
                break;
            case 1:
                this.channelMode = MpegFrame.CHANNEL_MODE_JOINT_STEREO;
                break;
            case 2:
                this.channelMode = MpegFrame.CHANNEL_MODE_DUAL_MONO;
                break;
            case 3:
                this.channelMode = MpegFrame.CHANNEL_MODE_MONO;
                break;
            default:
                throw new InvalidDataException("Invalid channel mode in frame header");
        }
    }
    private setModeExtension(modeExtension: number): void {
        if (!(MpegFrame.CHANNEL_MODE_JOINT_STEREO == this.channelMode)) {
            this.modeExtension = MpegFrame.MODE_EXTENSION_NA;
        }
        else {
            if (this.layer == 1 || this.layer == 2) {
                switch (modeExtension) {
                    case 0:
                        this.modeExtension = MpegFrame.MODE_EXTENSION_BANDS_4_31;
                        return;
                    case 1:
                        this.modeExtension = MpegFrame.MODE_EXTENSION_BANDS_8_31;
                        return;
                    case 2:
                        this.modeExtension = MpegFrame.MODE_EXTENSION_BANDS_12_31;
                        return;
                    case 3:
                        this.modeExtension = MpegFrame.MODE_EXTENSION_BANDS_16_31;
                        return;
                }
            }
            else if (this.layer == 3) {
                switch (modeExtension) {
                    case 0:
                        this.modeExtension = MpegFrame.MODE_EXTENSION_NONE;
                        return;
                    case 1:
                        this.modeExtension = MpegFrame.MODE_EXTENSION_INTENSITY_STEREO;
                        return;
                    case 2:
                        this.modeExtension = MpegFrame.MODE_EXTENSION_M_S_STEREO;
                        return;
                    case 3:
                        this.modeExtension = MpegFrame.MODE_EXTENSION_INTENSITY_M_S_STEREO;
                        return;
                }
            }
            throw new InvalidDataException("Invalid mode extension in frame header");
        }
    }
    private setCopyright(copyrightBit: number): void {
        this.copyright = (copyrightBit == 1);
    }
    private setOriginal(originalBit: number): void {
        this.original = (originalBit == 1);
    }
    private setEmphasis(emphasis: number): void {
        switch (emphasis) {
            case 0:
                this.emphasis = MpegFrame.EMPHASIS_NONE;
                break;
            case 1:
                this.emphasis = MpegFrame.EMPHASIS__50_15_MS;
                break;
            case 3:
                this.emphasis = MpegFrame.EMPHASIS_CCITT_J_17;
                break;
            default:
                throw new InvalidDataException("Invalid emphasis in frame header");
        }
    }
    public getBitrate(): number {
        return this.bitrate;
    }
    public getChannelMode(): string {
        return this.channelMode;
    }
    public isCopyright(): boolean {
        return this.copyright;
    }
    public getEmphasis(): string {
        return this.emphasis;
    }
    public getLayer(): string {
        return MpegFrame.MPEG_LAYERS[this.layer];
    }
    public getModeExtension(): string {
        return this.modeExtension;
    }
    public isOriginal(): boolean {
        return this.original;
    }
    public hasPadding(): boolean {
        return this.padding;
    }
    public isPrivate(): boolean {
        return this.privat;
    }
    public isProtection(): boolean {
        return this.protection;
    }
    public getSampleRate(): number {
        return this.sampleRate;
    }
    public getVersion(): string {
        return this.version;
    }
    public getLengthInBytes(): number {
        let length;
        let pad;
        if (this.padding)
            pad = 1;
        else
            pad = 0;
        if (this.layer == 1) {
            length = ((48000 * this.bitrate) / this.sampleRate) + (pad * 4);
        }
        else {
            length = ((144000 * this.bitrate) / this.sampleRate) + pad;
        }
        // TODO 取整，源码未取整
        return Math.floor(length);
    }
}
