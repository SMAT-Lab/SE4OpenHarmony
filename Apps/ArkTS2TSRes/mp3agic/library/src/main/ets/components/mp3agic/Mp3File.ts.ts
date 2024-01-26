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
import fileio from '@ohos.fileio';
import { ID3v1 } from './ID3v1';
import { ID3v2 } from './ID3v2';
import { ID3v1Tag } from './ID3v1Tag';
import { AbstractID3v2Tag } from './AbstractID3v2Tag';
import { ID3v2TagFactory } from './ID3v2TagFactory';
import { FileWrapper } from './FileWrapper';
import { BufferTools } from './BufferTools';
import { MutableInteger } from './MutableInteger';
import { MpegFrame } from './MpegFrame';
import { UnsupportedTagException } from './UnsupportedTagException';
import { NoSuchTagException } from './NoSuchTagException';
import { IOException } from './IOException';
import { InvalidDataException } from './InvalidDataException';
import { IllegalArgumentException } from './IllegalArgumentException';
import { GlobalContext } from './GlobalContext';
export class Mp3File extends FileWrapper {
    private static DEFAULT_BUFFER_LENGTH: number = 65536;
    private static XING_MARKER_OFFSET_1: number = 13;
    private static XING_MARKER_OFFSET_2: number = 21;
    private static XING_MARKER_OFFSET_3: number = 36;
    private static MINIMUM_BUFFER_LENGTH: number = 40;
    private path: string;
    private id3v1Tag: ID3v1;
    private id3v2Tag: ID3v2;
    private dataText: string = '';
    protected bufferLength: number;
    private scanFileFlag: boolean;
    private xingOffset: number = -1;
    private startOffset: number = -1;
    private endOffset: number = -1;
    private frameCount: number = 0;
    private bitrates: Map<number, MutableInteger> = new Map();
    private xingBitrate: number;
    private bitrate: number = 0;
    private channelMode: string;
    private emphasis: string;
    private layer: string;
    private modeExtension: string;
    private sampleRate: number;
    private copyright: boolean;
    private original: boolean;
    private version: string;
    private customTag: number[];
    constructor(path: string, bufferLength?: number, scanFileFlag?: boolean) {
        // 传入参数bufferLength时，必须同时传入参数scanFileFlag ----》When you pass in the parameter bufferlength, you must also pass in the parameter scanfileflag
        // 解析时scanFileFlag应为true  ----》Scanfileflag should be true when parsing
        super(path);
        if (bufferLength) {
            this.init(bufferLength, scanFileFlag);
        }
        else {
            this.init(Mp3File.DEFAULT_BUFFER_LENGTH, true);
        }
    }
    private init(bufferLength: number, scanFileFlag: boolean): void {
        if (bufferLength < Mp3File.MINIMUM_BUFFER_LENGTH + 1) {
            throw new IllegalArgumentException("Buffer too small");
        }
        this.bufferLength = bufferLength;
        this.scanFileFlag = scanFileFlag;
        let id3v1buf = new ArrayBuffer(ID3v1Tag.TAG_LENGTH);
        let id3v1fd = fileio.openSync(this.path, 0o2);
        // Read the data of id3v1tag
        let bytesRead = fileio.readSync(id3v1fd, id3v1buf, { position: super.getLength() - ID3v1Tag.TAG_LENGTH });
        let arrview = new Int8Array(id3v1buf);
        let data = BufferTools.byteBufferToStringIgnoringEncodingIssues(arrview, 0, bytesRead);
        this.initId3v1Tag(data);
        this.scanFile();
        if (this.startOffset < 0) {
            throw new InvalidDataException("No mpegs frames found");
        }
        this.initId3v2Tag();
        if (scanFileFlag) {
            this.initCustomTag();
        }
    }
    private initId3v1Tag(data: string): void {
        try {
            if ((data.length - data.lastIndexOf('TAG')) < ID3v1Tag.TAG_LENGTH) {
                throw new IOException("Not enough bytes read");
            }
            this.id3v1Tag = new ID3v1Tag(data);
        }
        catch (error) {
            console.info('mp3agic Mp3File initId3v1Tag():' + error);
            this.id3v1Tag = null;
        }
    }
    private scanFile(): void {
        let buf = new ArrayBuffer(FileWrapper.DEFAULT_BUFFER_LENGTH);
        // read result
        let fileOffset = this.preScanFile();
        let lastBlock = false;
        let lastOffset = fileOffset;
        while (!lastBlock) {
            let bytesRead = 0;
            let fd = fileio.openSync(this.path, 0o2);
            // read offset length
            bytesRead = fileio.readSync(fd, buf, { position: fileOffset });
            let view = new Int8Array(buf);
            if (bytesRead < this.bufferLength) {
                lastBlock = true;
            }
            if (bytesRead >= Mp3File.MINIMUM_BUFFER_LENGTH) {
                while (true) {
                    try {
                        let offset = 0;
                        if (this.startOffset < 0) {
                            offset = this.scanBlockForStart(view, bytesRead, fileOffset, offset);
                            if (this.startOffset >= 0 && !this.scanFileFlag) {
                                return;
                            }
                            lastOffset = this.startOffset;
                        }
                        offset = this.scanBlock(view, bytesRead, fileOffset, offset);
                        fileOffset += offset;
                        // seekableByteChannel.position(fileOffset);
                        break;
                    }
                    catch (error) {
                        if (this.frameCount < 2) {
                            this.startOffset = -1;
                            this.xingOffset = -1;
                            this.frameCount = 0;
                            this.bitrates.clear();
                            lastBlock = false;
                            fileOffset = lastOffset + 1;
                            if (fileOffset == 0)
                                throw new InvalidDataException("Valid start of mpeg frames not found :" + error);
                            // seekableByteChannel.position(fileOffset);
                            break;
                        }
                        return;
                    }
                }
            }
        }
    }
    private preScanFile(): number {
        try {
            let bytesRead = 0;
            let buf = new ArrayBuffer(AbstractID3v2Tag.HEADER_LENGTH);
            let fd = fileio.openSync(this.path, 0o2);
            // read offset length
            bytesRead = fileio.readSync(fd, buf);
            let data = new Int8Array(buf);
            Mp3File.sanityCheckTag(data);
            return AbstractID3v2Tag.HEADER_LENGTH +
                BufferTools.unpackSynchsafeInteger(data[AbstractID3v2Tag.DATA_LENGTH_OFFSET], data[AbstractID3v2Tag.DATA_LENGTH_OFFSET + 1], data[AbstractID3v2Tag.DATA_LENGTH_OFFSET + 2], data[AbstractID3v2Tag.DATA_LENGTH_OFFSET + 3]);
        }
        catch (error) {
            console.error('mp3agic Mp3File preScanFile Error:' + error);
        }
        return 0;
    }
    private scanBlockForStart(data: Int8Array, bytesRead: number, absoluteOffset: number, offset: number): number {
        while (offset < bytesRead - Mp3File.MINIMUM_BUFFER_LENGTH) {
            // -1  ---->  (byte) 0xFF  -32 --------> (byte) 0xE0
            if (data[offset] == -1 && (data[offset + 1] & -32) == -32) {
                try {
                    let frame: MpegFrame = new MpegFrame(data[offset], data[offset + 1], data[offset + 2], data[offset + 3]);
                    if (this.xingOffset < 0 && this.isXingFrame(data, offset)) {
                        this.xingOffset = absoluteOffset + offset;
                        this.xingBitrate = frame.getBitrate();
                        offset += frame.getLengthInBytes();
                    }
                    else {
                        this.startOffset = absoluteOffset + offset;
                        this.channelMode = frame.getChannelMode();
                        this.emphasis = frame.getEmphasis();
                        this.layer = frame.getLayer();
                        this.modeExtension = frame.getModeExtension();
                        this.sampleRate = frame.getSampleRate();
                        this.version = frame.getVersion();
                        this.copyright = frame.isCopyright();
                        this.original = frame.isOriginal();
                        this.frameCount++;
                        this.addBitrate(frame.getBitrate());
                        offset += frame.getLengthInBytes();
                        return offset;
                    }
                }
                catch (error) {
                    offset++;
                }
            }
            else {
                offset++;
            }
        }
        return offset;
    }
    private scanBlock(bytes: Int8Array, bytesRead: number, absoluteOffset: number, offset: number): number {
        while (offset < bytesRead - Mp3File.MINIMUM_BUFFER_LENGTH) {
            let frame: MpegFrame = new MpegFrame(bytes[offset], bytes[offset + 1], bytes[offset + 2], bytes[offset + 3]);
            this.sanityCheckFrame(frame, absoluteOffset + offset);
            let newEndOffset: number = absoluteOffset + offset + frame.getLengthInBytes() - 1;
            if (newEndOffset < this.maxEndOffset()) {
                this.endOffset = absoluteOffset + offset + frame.getLengthInBytes() - 1;
                this.frameCount++;
                this.addBitrate(frame.getBitrate());
                offset += frame.getLengthInBytes();
            }
            else {
                break;
            }
        }
        return offset;
    }
    private maxEndOffset(): number {
        let maxEndOffset: number = super.getLength();
        if (this.hasId3v1Tag())
            maxEndOffset -= ID3v1Tag.TAG_LENGTH;
        return maxEndOffset;
    }
    private isXingFrame(bytes: Int8Array, offset: number): boolean {
        if (bytes.length >= offset + Mp3File.XING_MARKER_OFFSET_1 + 3) {
            if ("Xing" == (BufferTools.byteBufferToStringIgnoringEncodingIssues(bytes, offset + Mp3File.XING_MARKER_OFFSET_1, 4)))
                return true;
            if ("Info" == (BufferTools.byteBufferToStringIgnoringEncodingIssues(bytes, offset + Mp3File.XING_MARKER_OFFSET_1, 4)))
                return true;
            if (bytes.length >= offset + Mp3File.XING_MARKER_OFFSET_2 + 3) {
                if ("Xing" == (BufferTools.byteBufferToStringIgnoringEncodingIssues(bytes, offset + Mp3File.XING_MARKER_OFFSET_2, 4)))
                    return true;
                if ("Info" == (BufferTools.byteBufferToStringIgnoringEncodingIssues(bytes, offset + Mp3File.XING_MARKER_OFFSET_2, 4)))
                    return true;
                if (bytes.length >= offset + Mp3File.XING_MARKER_OFFSET_3 + 3) {
                    if ("Xing" == (BufferTools.byteBufferToStringIgnoringEncodingIssues(bytes, offset + Mp3File.XING_MARKER_OFFSET_3, 4)))
                        return true;
                    if ("Info" == (BufferTools.byteBufferToStringIgnoringEncodingIssues(bytes, offset + Mp3File.XING_MARKER_OFFSET_3, 4)))
                        return true;
                }
            }
        }
        return false;
    }
    private sanityCheckFrame(frame: MpegFrame, offset: number): void {
        if (this.sampleRate != frame.getSampleRate())
            throw new InvalidDataException("Inconsistent frame header");
        if (!(this.layer == (frame.getLayer())))
            throw new InvalidDataException("Inconsistent frame header");
        if (!(this.version == (frame.getVersion())))
            throw new InvalidDataException("Inconsistent frame header");
        if (offset + frame.getLengthInBytes() > super.getLength())
            throw new InvalidDataException("Frame would extend beyond end of file");
    }
    private addBitrate(bitrate: number): void {
        let count: MutableInteger = this.bitrates.get(bitrate);
        if (count != null) {
            count.increment();
        }
        else {
            this.bitrates.set(bitrate, new MutableInteger(1));
        }
        this.bitrate = ((this.bitrate * (this.frameCount - 1)) + bitrate) / this.frameCount;
    }
    private initId3v2Tag(): void {
        if (this.xingOffset == 0 || this.startOffset == 0) {
            this.id3v2Tag = null;
        }
        else {
            let bufferLength;
            if (this.hasXingFrame()) {
                bufferLength = this.xingOffset;
            }
            else {
                bufferLength = this.startOffset;
            }
            let bytesRead = 0;
            let buf = new ArrayBuffer(bufferLength);
            let fd = fileio.openSync(this.path, 0o2);
            // read offset length
            bytesRead = fileio.readSync(fd, buf);
            let view = new Int8Array(buf);
            if (bytesRead < bufferLength)
                throw new IOException("Not enough bytes read");
            try {
                this.id3v2Tag = ID3v2TagFactory.createTag(view);
            }
            catch (error) {
                console.error('mp3agic Mp3File initId3v2Tag error:' + error);
                this.id3v2Tag = null;
            }
        }
    }
    public static sanityCheckTag(data: Int8Array): void {
        if (data.length < AbstractID3v2Tag.HEADER_LENGTH) {
            throw new NoSuchTagException("Buffer too short");
        }
        if (!(AbstractID3v2Tag.TAG == (BufferTools.byteBufferToStringIgnoringEncodingIssues(data, 0, AbstractID3v2Tag.TAG.length)))) {
            throw new NoSuchTagException("No ID3V2 tag!");
        }
        let majorVersion = data[AbstractID3v2Tag.MAJOR_VERSION_OFFSET];
        if (majorVersion != 2 && majorVersion != 3 && majorVersion != 4) {
            let minorVersion = data[AbstractID3v2Tag.MINOR_VERSION_OFFSET];
            throw new UnsupportedTagException("Unsupported version 2." + majorVersion + "." + minorVersion);
        }
    }
    private initCustomTag(): void {
        let bufferLength = (super.getLength() - (this.endOffset + 1));
        if (this.hasId3v1Tag())
            bufferLength -= ID3v1Tag.TAG_LENGTH;
        if (bufferLength <= 0) {
            this.customTag = null;
        }
        else {
            let buf = new ArrayBuffer(bufferLength);
            let bytesRead = 0;
            let fd = fileio.openSync(this.path, 0o2);
            // read offset length
            bytesRead = fileio.readSync(fd, buf, { position: this.endOffset + 1 });
            this.customTag = new Int8Array(buf);
            if (bytesRead < bufferLength)
                throw new IOException("Not enough bytes read");
        }
    }
    public hasId3v1Tag(): boolean {
        if (this.id3v1Tag != null) {
            return true;
        }
        else {
            return false;
        }
    }
    public getId3v1Tag(): ID3v1 {
        return this.id3v1Tag;
    }
    public setId3v1Tag(id3v1Tag: ID3v1): void {
        this.id3v1Tag = id3v1Tag;
    }
    public removeId3v1Tag(): void {
        this.id3v1Tag = null;
    }
    public hasId3v2Tag(): boolean {
        return this.id3v2Tag != null;
    }
    public getId3v2Tag(): ID3v2 {
        return this.id3v2Tag;
    }
    public setId3v2Tag(id3v2Tag: ID3v2): void {
        this.id3v2Tag = id3v2Tag;
    }
    public removeId3v2Tag(): void {
        this.id3v2Tag = null;
    }
    public hasXingFrame(): boolean {
        return (this.xingOffset >= 0);
    }
    public getXingOffset(): number {
        return this.xingOffset;
    }
    public getStartOffset(): number {
        return this.startOffset;
    }
    public getEndOffset(): number {
        return this.endOffset;
    }
    public getFrameCount(): number {
        return this.frameCount;
    }
    public getLengthInMilliseconds(): number {
        return Math.floor((((this.endOffset - this.startOffset) * (8.0 / this.bitrate)) + 0.5));
    }
    public getLengthInSeconds(): number {
        return Math.floor(((this.getLengthInMilliseconds() + 500) / 1000));
    }
    public isVbr(): boolean {
        return this.bitrates.size > 1;
    }
    public getBitrate(): number {
        return Math.floor((this.bitrate + 0.5));
    }
    public getBitrates(): Map<Number, MutableInteger> {
        return this.bitrates;
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
        return this.layer;
    }
    public getModeExtension(): string {
        return this.modeExtension;
    }
    public isOriginal(): boolean {
        return this.original;
    }
    public getSampleRate(): number {
        return this.sampleRate;
    }
    public getVersion(): string {
        return this.version;
    }
    public getXingBitrate(): number {
        return this.xingBitrate;
    }
    public hasCustomTag(): boolean {
        return this.customTag != null;
    }
    public getCustomTag(): number[] {
        return this.customTag;
    }
    public setCustomTag(customTag: number[]): void {
        this.customTag = customTag;
    }
    public removeCustomTag(): void {
        this.customTag = null;
    }
    public save(newFilename: string): void {
        let filePath: string = '';
        try {
            filePath = GlobalContext.getContext().getValue("path").toString() + '/' + newFilename;
            let fd = fileio.openSync(filePath, 0o102, 0o666);
            let contentBuf;
            if (this.hasId3v2Tag()) {
                var d3v2 = new Int8Array(this.id3v2Tag.toBytes()).buffer;
                if (d3v2 != null) {
                    contentBuf = BufferTools.mergeArrayBuffer(d3v2);
                }
            }
            // saveMpegFrames start
            let filePos = this.xingOffset;
            if (filePos < 0)
                filePos = this.startOffset;
            if (filePos < 0)
                return;
            if (this.endOffset < filePos)
                return;
            while (true) {
                let bufFrame = new ArrayBuffer(this.bufferLength);
                let srcFd = fileio.openSync(this.path, 0o2);
                let bytesRead = fileio.readSync(srcFd, bufFrame, { position: filePos });
                // bufFrame = new ArrayBuffer(bytesRead);
                bufFrame = bufFrame.slice(0, bytesRead);
                if (filePos + bytesRead <= this.endOffset) {
                    if (bufFrame != null) {
                        contentBuf = BufferTools.mergeArrayBuffer(contentBuf, bufFrame);
                    }
                    filePos += bytesRead;
                }
                else {
                    // byteBuffer.limit(this.endOffset - filePos + 1);
                    bufFrame = bufFrame.slice(0, this.endOffset - filePos + 1);
                    if (bufFrame != null) {
                        contentBuf = BufferTools.mergeArrayBuffer(contentBuf, bufFrame);
                    }
                    break;
                }
            }
            if (this.hasCustomTag()) {
                let customTag = new Int8Array(this.customTag).buffer;
                if (customTag != null) {
                    contentBuf = BufferTools.mergeArrayBuffer(contentBuf, customTag);
                }
            }
            if (this.hasId3v1Tag()) {
                let d3v1 = new Int8Array(this.id3v1Tag.toBytes()).buffer;
                if (d3v1 != null) {
                    contentBuf = BufferTools.mergeArrayBuffer(contentBuf, d3v1);
                }
            }
            let result = fileio.writeSync(fd, contentBuf);
        }
        catch (error) {
            console.error('mp3agic Failed to obtain the file directory. Cause: ' + error.message);
        }
    }
}
