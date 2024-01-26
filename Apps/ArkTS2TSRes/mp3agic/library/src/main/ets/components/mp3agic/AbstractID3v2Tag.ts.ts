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
import { ID3v2 } from "./ID3v2";
import { ID3v2Frame } from "./ID3v2Frame";
import { ID3v2FrameSet } from "./ID3v2FrameSet";
import { ID3v2ChapterFrameData } from "./ID3v2ChapterFrameData";
import { ID3v2ChapterTOCFrameData } from "./ID3v2ChapterTOCFrameData";
import { ID3v2TextFrameData } from "./ID3v2TextFrameData";
import { ID3v2ObseleteFrame } from "./ID3v2ObseleteFrame";
import { ID3v2WWWFrameData } from "./ID3v2WWWFrameData";
import { ID3v2PopmFrameData } from "./ID3v2PopmFrameData";
import { ID3v2CommentFrameData } from "./ID3v2CommentFrameData";
import { ID3v2UrlFrameData } from "./ID3v2UrlFrameData";
import { ID3v2PictureFrameData } from "./ID3v2PictureFrameData";
import { ID3v2ObseletePictureFrameData } from "./ID3v2ObseletePictureFrameData";
import { BufferTools } from "./BufferTools";
import { Mp3File } from "./Mp3File";
import { EncodedText } from "./EncodedText";
import { JList } from "./JList";
import { ID3v1Genres } from "./ID3v1Genres";
import { IllegalArgumentException } from './IllegalArgumentException';
import { InvalidDataException } from './InvalidDataException';
import { UnsupportedTagException } from './UnsupportedTagException';
export abstract class AbstractID3v2Tag implements ID3v2 {
    public static const ID_IMAGE: string = "APIC";
    public static const ID_ENCODER: string = "TENC";
    public static const ID_URL: string = "WXXX";
    public static const ID_ARTIST_URL: string = "WOAR";
    public static const ID_COMMERCIAL_URL: string = "WCOM";
    public static const ID_COPYRIGHT_URL: string = "WCOP";
    public static const ID_AUDIOFILE_URL: string = "WOAF";
    public static const ID_AUDIOSOURCE_URL: string = "WOAS";
    public static const ID_RADIOSTATION_URL: string = "WORS";
    public static const ID_PAYMENT_URL: string = "WPAY";
    public static const ID_PUBLISHER_URL: string = "WPUB";
    public static const ID_COPYRIGHT: string = "TCOP";
    public static const ID_ORIGINAL_ARTIST: string = "TOPE";
    public static const ID_BPM: string = "TBPM";
    public static const ID_COMPOSER: string = "TCOM";
    public static const ID_PUBLISHER: string = "TPUB";
    public static const ID_COMMENT: string = "COMM";
    public static const ID_TEXT_LYRICS: string = "USLT";
    public static const ID_GENRE: string = "TCON";
    public static const ID_YEAR: string = "TYER";
    public static const ID_DATE: string = "TDAT";
    public static const ID_ALBUM: string = "TALB";
    public static const ID_TITLE: string = "TIT2";
    public static const ID_KEY: string = "TKEY";
    public static const ID_ARTIST: string = "TPE1";
    public static const ID_ALBUM_ARTIST: string = "TPE2";
    public static const ID_TRACK: string = "TRCK";
    public static const ID_PART_OF_SET: string = "TPOS";
    public static const ID_COMPILATION: string = "TCMP";
    public static const ID_CHAPTER_TOC: string = "CTOC";
    public static const ID_CHAPTER: string = "CHAP";
    public static const ID_GROUPING: string = "TIT1";
    public static const ID_RATING: string = "POPM";
    public static const ID_IMAGE_OBSELETE: string = "PIC";
    public static const ID_ENCODER_OBSELETE: string = "TEN";
    public static const ID_URL_OBSELETE: string = "WXX";
    public static const ID_COPYRIGHT_OBSELETE: string = "TCR";
    public static const ID_ORIGINAL_ARTIST_OBSELETE: string = "TOA";
    public static const ID_BPM_OBSELETE: string = "TBP";
    public static const ID_COMPOSER_OBSELETE: string = "TCM";
    public static const ID_PUBLISHER_OBSELETE: string = "TBP";
    public static const ID_COMMENT_OBSELETE: string = "COM";
    public static const ID_GENRE_OBSELETE: string = "TCO";
    public static const ID_YEAR_OBSELETE: string = "TYE";
    public static const ID_DATE_OBSELETE: string = "TDA";
    public static const ID_ALBUM_OBSELETE: string = "TAL";
    public static const ID_TITLE_OBSELETE: string = "TT2";
    public static const ID_KEY_OBSELETE: string = "TKE";
    public static const ID_ARTIST_OBSELETE: string = "TP1";
    public static const ID_ALBUM_ARTIST_OBSELETE: string = "TP2";
    public static const ID_TRACK_OBSELETE: string = "TRK";
    public static const ID_PART_OF_SET_OBSELETE: string = "TPA";
    public static const ID_COMPILATION_OBSELETE: string = "TCP";
    public static const D_GROUPING_OBSELETE: string = "TT1";
    public static const TAG: string = "ID3";
    protected static const FOOTER_TAG: string = "3DI";
    public static const HEADER_LENGTH: number = 10;
    protected static const FOOTER_LENGTH: number = 10;
    public static const MAJOR_VERSION_OFFSET: number = 3;
    public static const MINOR_VERSION_OFFSET: number = 4;
    protected static const FLAGS_OFFSET: number = 5;
    public static const DATA_LENGTH_OFFSET: number = 6;
    protected static const FOOTER_BIT: number = 4;
    protected static const EXPERIMENTAL_BIT: number = 5;
    protected static const EXTENDED_HEADER_BIT: number = 6;
    protected static const COMPRESSION_BIT: number = 6;
    protected static const UNSYNCHRONISATION_BIT: number = 7;
    protected static const PADDING_LENGTH: number = 256;
    private static const ITUNES_COMMENT_DESCRIPTION: string = "iTunNORM";
    protected unsynchronisation: boolean = false;
    protected extendedHeader: boolean = false;
    protected experimental: boolean = false;
    protected footer: boolean = false;
    protected padding: boolean = false;
    protected compression: boolean = false;
    protected footer: boolean = false;
    private obseleteFormat: boolean = false;
    protected version: string = null;
    private dataLength: number = 0;
    private extendedHeaderLength: number;
    private extendedHeaderData: number[];
    private frameSets: Map<String, ID3v2FrameSet>;
    constructor(data: Int8Array, obseleteFormat?: boolean) {
        this.frameSets = new Map();
        if (obseleteFormat) {
            this.obseleteFormat = obseleteFormat;
        }
        if (data) {
            this.unpackTag(data);
        }
    }
    private unpackTag(data: Int8Array): void {
        Mp3File.sanityCheckTag(data);
        let offset = this.unpackHeader(data);
        if (this.extendedHeader) {
            offset = this.unpackExtendedHeader(bytes, offset);
        }
        let framesLength = this.dataLength;
        if (this.footer)
            framesLength -= 10;
        offset = this.unpackFrames(data, offset, framesLength);
        if (this.footer) {
            offset = this.unpackFooter(data, dataLength);
        }
    }
    private unpackHeader(data: Int8Array): number {
        let majorVersion = data[AbstractID3v2Tag.MAJOR_VERSION_OFFSET];
        let minorVersion = data[AbstractID3v2Tag.MINOR_VERSION_OFFSET];
        this.version = majorVersion + "." + minorVersion;
        if (majorVersion != 2 && majorVersion != 3 && majorVersion != 4) {
            throw new UnsupportedTagException("Unsupported version " + this.version);
        }
        this.unpackFlags(data);
        if ((data[AbstractID3v2Tag.FLAGS_OFFSET] & 0x0F) != 0) {
            throw new UnsupportedTagException("Unrecognised bits in header");
        }
        this.dataLength = BufferTools.unpackSynchsafeInteger(data[AbstractID3v2Tag.DATA_LENGTH_OFFSET], data[AbstractID3v2Tag.DATA_LENGTH_OFFSET + 1], data[AbstractID3v2Tag.DATA_LENGTH_OFFSET + 2], data[AbstractID3v2Tag.DATA_LENGTH_OFFSET + 3]);
        if (this.dataLength < 1)
            throw new InvalidDataException("Zero size tag");
        return AbstractID3v2Tag.HEADER_LENGTH;
    }
    private unpackExtendedHeader(data: Int8Array, offset: number): number {
        this.extendedHeaderLength = BufferTools.unpackSynchsafeInteger(data[offset], data[offset + 1], data[offset + 2], data[offset + 3]) + 4;
        this.extendedHeaderData = BufferTools.copyBuffer(data, offset + 4, extendedHeaderLength);
        return extendedHeaderLength;
    }
    protected unpackFrames(data: Int8Array, offset: number, framesLength: number): number {
        let currentOffset = offset;
        while (currentOffset <= framesLength) {
            let frame: ID3v2Frame;
            try {
                frame = this.createFrame(data, currentOffset);
                this.addFrame(frame, false);
                currentOffset += frame.getLength();
            }
            catch (error) {
                break;
            }
        }
        return currentOffset;
    }
    protected addFrame(frame: ID3v2Frame, replace: boolean): void {
        let frameSet = this.frameSets.get(frame.getId());
        if (frameSet == null) {
            frameSet = new ID3v2FrameSet(frame.getId());
            frameSet.addFrame(frame);
            this.frameSets.set(frame.getId(), frameSet);
        }
        else if (replace) {
            frameSet.clear();
            frameSet.addFrame(frame);
        }
        else {
            frameSet.addFrame(frame);
        }
    }
    protected createFrame(data: Int8Array, currentOffset: number): ID3v2Frame {
        if (this.obseleteFormat)
            return ID3v2ObseleteFrame.create(data, currentOffset);
        return ID3v2Frame.create(data, currentOffset);
    }
    protected createFrameById(id: string, data: number[]): ID3v2Frame {
        if (this.obseleteFormat) {
            return new ID3v2ObseleteFrame(id, data);
        }
        else {
            return new ID3v2Frame(id, data);
        }
    }
    protected useFrameUnsynchronisation(): boolean {
        return false;
    }
    protected invalidateDataLength(): void {
        this.dataLength = 0;
    }
    protected extractGenreNumber(genreValue: string): number {
        let value = genreValue.trim();
        if (value.length > 0) {
            if (value.charAt(0) == '(') {
                let pos = value.indexOf(')');
                if (pos > 0) {
                    return Number(value.substring(1, pos));
                }
            }
        }
        return Number(value);
    }
    protected extractGenreDescription(genreValue: string): string {
        let value = genreValue.trim();
        if (value.length > 0) {
            if (value.charAt(0) == '(') {
                let pos = value.indexOf(')');
                if (pos > 0) {
                    return value.substring(pos + 1);
                }
            }
            return value;
        }
        return null;
    }
    private calculateDataLength(): number {
        let length = 0;
        if (this.extendedHeader)
            length += this.extendedHeaderLength;
        if (this.footer)
            length += AbstractID3v2Tag.FOOTER_LENGTH;
        else if (this.padding)
            length += AbstractID3v2Tag.PADDING_LENGTH;
        for (let frameSet of this.frameSets.values()) {
            let list: JList<ID3v2Frame> = frameSet.getFrames();
            for (let i = 0; i < list.length(); i++) {
                length += list.get(i).getLength();
            }
        }
        return length;
    }
    public getDataLength(): number {
        if (this.dataLength == 0) {
            this.dataLength = this.calculateDataLength();
        }
        return this.dataLength;
    }
    public getLength(): number {
        return this.getDataLength() + AbstractID3v2Tag.HEADER_LENGTH;
    }
    public getFrameSets(): Map<String, ID3v2FrameSet> {
        return this.frameSets;
    }
    public getVersion(): string {
        return this.version;
    }
    public getPadding(): boolean {
        return this.padding;
    }
    public setPadding(padding: boolean): void {
        if (this.padding != padding) {
            this.invalidateDataLength();
            this.padding = padding;
        }
    }
    public hasFooter(): boolean {
        return this.footer;
    }
    public setFooter(footer: boolean): void {
        if (this.footer != footer) {
            this.invalidateDataLength();
            this.footer = footer;
        }
    }
    public hasUnsynchronisation(): boolean {
        return this.unsynchronisation;
    }
    public setUnsynchronisation(unsynchronisation: boolean): void {
        if (this.unsynchronisation != unsynchronisation) {
            this.invalidateDataLength();
            this.unsynchronisation = unsynchronisation;
        }
    }
    public getTrack(): string {
        let frameData: ID3v2TextFrameData = this.extractTextFrameData(this.obseleteFormat ? AbstractID3v2Tag.ID_TRACK_OBSELETE : AbstractID3v2Tag.ID_TRACK);
        if (frameData != null && frameData.getText() != null)
            return frameData.getText().toString();
        return null;
    }
    public setTrack(track: string): void {
        if (track != null && track.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2TextFrameData = new ID3v2TextFrameData(this.useFrameUnsynchronisation(), new EncodedText({ str: track }));
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_TRACK, frameData.toBytes()), true);
        }
    }
    public getPartOfSet(): string {
        let frameData: ID3v2TextFrameData = this.extractTextFrameData(this.obseleteFormat ? AbstractID3v2Tag.ID_PART_OF_SET_OBSELETE : AbstractID3v2Tag.ID_PART_OF_SET);
        if (frameData != null && frameData.getText() != null)
            return frameData.getText().toString();
        return null;
    }
    public setPartOfSet(partOfSet: string): void {
        if (partOfSet != null && partOfSet.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2TextFrameData = new ID3v2TextFrameData(this.useFrameUnsynchronisation(), new EncodedText({ str: partOfSet }));
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_PART_OF_SET, frameData.toBytes()), true);
        }
    }
    public isCompilation(): boolean {
        // unofficial frame used by iTunes
        let frameData: ID3v2TextFrameData = this.extractTextFrameData(this.obseleteFormat ? AbstractID3v2Tag.ID_COMPILATION_OBSELETE : AbstractID3v2Tag.ID_COMPILATION);
        if (frameData != null && frameData.getText() != null)
            return ("1" == (frameData.getText().toString()));
        return false;
    }
    public setCompilation(compilation: boolean): void {
        this.invalidateDataLength();
        let frameData: ID3v2TextFrameData = new ID3v2TextFrameData(this.useFrameUnsynchronisation(), new EncodedText({ str: compilation ? "1" : "0" }));
        this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_COMPILATION, frameData.toBytes()), true);
    }
    public getGrouping(): string {
        let frameData: ID3v2TextFrameData = this.extractTextFrameData(this.obseleteFormat ? AbstractID3v2Tag.ID_GROUPING_OBSELETE : AbstractID3v2Tag.ID_GROUPING);
        if (frameData != null && frameData.getText() != null)
            return frameData.getText().toString();
        return null;
    }
    public setGrouping(grouping: string): void {
        if (grouping != null && grouping.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2TextFrameData = new ID3v2TextFrameData(this.useFrameUnsynchronisation(), new EncodedText({ str: grouping }));
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_GROUPING, frameData.toBytes()), true);
        }
    }
    public getArtist(): string {
        let frameData: ID3v2TextFrameData = this.extractTextFrameData(this.obseleteFormat ? AbstractID3v2Tag.ID_ARTIST_OBSELETE : AbstractID3v2Tag.ID_ARTIST);
        if (frameData != null && frameData.getText() != null)
            return frameData.getText().toString();
        return null;
    }
    public setArtist(artist: string): void {
        if (artist != null && artist.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2TextFrameData = new ID3v2TextFrameData(this.useFrameUnsynchronisation(), new EncodedText({ str: artist }));
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_ARTIST, frameData.toBytes()), true);
        }
    }
    public getAlbumArtist(): string {
        let frameData: ID3v2TextFrameData = this.extractTextFrameData(this.obseleteFormat ? AbstractID3v2Tag.ID_ALBUM_ARTIST_OBSELETE : AbstractID3v2Tag.ID_ALBUM_ARTIST);
        if (frameData != null && frameData.getText() != null)
            return frameData.getText().toString();
        return null;
    }
    public setAlbumArtist(albumArtist: string): void {
        if (albumArtist != null && albumArtist.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2TextFrameData = new ID3v2TextFrameData(this.useFrameUnsynchronisation(), new EncodedText({ str: albumArtist }));
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_ALBUM_ARTIST, frameData.toBytes()), true);
        }
    }
    public getTitle(): string {
        let frameData: ID3v2TextFrameData = this.extractTextFrameData(this.obseleteFormat ? AbstractID3v2Tag.ID_TITLE_OBSELETE : AbstractID3v2Tag.ID_TITLE);
        if (frameData != null && frameData.getText() != null)
            return frameData.getText().toString();
        return null;
    }
    public setTitle(title: string): void {
        if (title != null && title.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2TextFrameData = new ID3v2TextFrameData(this.useFrameUnsynchronisation(), new EncodedText({ str: title }));
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_TITLE, frameData.toBytes()), true);
        }
    }
    public getAlbum(): string {
        let frameData: ID3v2TextFrameData = this.extractTextFrameData(this.obseleteFormat ? AbstractID3v2Tag.ID_ALBUM_OBSELETE : AbstractID3v2Tag.ID_ALBUM);
        if (frameData != null && frameData.getText() != null)
            return frameData.getText().toString();
        return null;
    }
    public setAlbum(album: string): void {
        if (album != null && album.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2TextFrameData = new ID3v2TextFrameData(this.useFrameUnsynchronisation(), new EncodedText({ str: album }));
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_ALBUM, frameData.toBytes()), true);
        }
    }
    public getYear(): string {
        let frameData: ID3v2TextFrameData = this.extractTextFrameData(this.obseleteFormat ? AbstractID3v2Tag.ID_YEAR_OBSELETE : AbstractID3v2Tag.ID_YEAR);
        if (frameData != null && frameData.getText() != null)
            return frameData.getText().toString();
        return null;
    }
    public setYear(year: string): void {
        if (year != null && year.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2TextFrameData = new ID3v2TextFrameData(this.useFrameUnsynchronisation(), new EncodedText({ str: year }));
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_YEAR, frameData.toBytes()), true);
        }
    }
    public getDate(): string {
        let frameData: ID3v2TextFrameData = this.extractTextFrameData(this.obseleteFormat ? AbstractID3v2Tag.ID_DATE_OBSELETE : AbstractID3v2Tag.ID_DATE);
        if (frameData != null && frameData.getText() != null)
            return frameData.getText().toString();
        return null;
    }
    public setDate(date: string): void {
        if (date != null && date.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2TextFrameData = new ID3v2TextFrameData(this.useFrameUnsynchronisation(), new EncodedText({ str: date }));
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_DATE, frameData.toBytes()), true);
        }
    }
    private getGenreDes(text: string): number {
        if (text != null && text.length > 0) {
            try {
                let num = this.extractGenreNumber(text);
                if (Number.isNaN(num)) {
                    let description = this.extractGenreDescription(text);
                    num = ID3v1Genres.matchGenreDescription(description);
                }
                return num;
            }
            catch (error) {
                // match genre description
                console.error('mp3agic getGenre error: ' + error);
                let description = this.extractGenreDescription(text);
                return ID3v1Genres.matchGenreDescription(description);
            }
        }
        return -1;
    }
    protected extractTextFrameData(id: string): ID3v2TextFrameData {
        let frameSet: ID3v2FrameSet = this.frameSets.get(id);
        if (frameSet != null) {
            let frame: ID3v2Frame = frameSet.getFrames().get(0);
            let frameData: ID3v2TextFrameData;
            try {
                frameData = ID3v2TextFrameData.create(this.useFrameUnsynchronisation(), frame.getData());
                return frameData;
            }
            catch (error) {
                // do nothing
                console.error('mp3agic AbstractID3v2Tag extractTextFrameData() error:' + error);
            }
        }
        return null;
    }
    protected extractLyricsFrameData(id: string): ID3v2CommentFrameData {
        let frameSet: ID3v2FrameSet = this.frameSets.get(id);
        if (frameSet != null) {
            let list: JList<ID3v2Frame> = frameSet.getFrames();
            for (let i = 0; i < list.length(); i++) {
                let frame: ID3v2Frame = list.get(i);
                let frameData: ID3v2CommentFrameData;
                try {
                    frameData = ID3v2CommentFrameData.create(this.useFrameUnsynchronisation(), frame.getData());
                    return frameData;
                }
                catch (error) {
                    // Do nothing
                    console.error("mp3agic AbstractID3v2Tag extractLyricsFrameData error:" + error);
                }
            }
        }
        return null;
    }
    private extractCommentFrameData(id: string, itunes: boolean): ID3v2CommentFrameData {
        let frameSet: ID3v2FrameSet = this.frameSets.get(id);
        if (frameSet != null) {
            let list: JList<ID3v2Frame> = frameSet.getFrames();
            for (let i = 0; i < list.length(); i++) {
                let frame: ID3v2Frame = list.get(i);
                let frameData: ID3v2CommentFrameData;
                try {
                    frameData = ID3v2CommentFrameData.create(this.useFrameUnsynchronisation(), frame.getData());
                    if (itunes && AbstractID3v2Tag.ITUNES_COMMENT_DESCRIPTION == (frameData.getDescription().toString())) {
                        return frameData;
                    }
                    else if (!itunes) {
                        return frameData;
                    }
                }
                catch (error) {
                    console.error("mp3agic AbstractID3v2Tag extractCommentFrameData error:" + error);
                }
            }
        }
        return null;
    }
    private createPictureFrameData(id: string): ID3v2PictureFrameData {
        let frameSet: ID3v2FrameSet = this.frameSets.get(id);
        if (frameSet != null) {
            let frame: ID3v2Frame = frameSet.getFrames().get(0);
            let frameData: ID3v2PictureFrameData;
            try {
                if (this.obseleteFormat)
                    frameData = new ID3v2ObseletePictureFrameData(this.useFrameUnsynchronisation(), frame.getData());
                else
                    frameData = new ID3v2PictureFrameData(this.useFrameUnsynchronisation(), frame.getData());
                return frameData;
            }
            catch (error) {
                // do nothing
            }
        }
        return null;
    }
    private extractWWWFrameData(id: string): ID3v2WWWFrameData {
        let frameSet: ID3v2FrameSet = this.frameSets.get(id);
        if (frameSet != null) {
            let frame: ID3v2Frame = frameSet.getFrames().get(0);
            let frameData: ID3v2WWWFrameData;
            try {
                frameData = ID3v2WWWFrameData.create(this.useFrameUnsynchronisation(), frame.getData());
                return frameData;
            }
            catch (error) {
                // do nothing
                console.error('mp3agic AbstractID3v2Tag extractWWWFrameData() error:' + error);
            }
        }
        return null;
    }
    private extractUrlFrameData(id: string): ID3v2UrlFrameData {
        let frameSet: ID3v2FrameSet = this.frameSets.get(id);
        if (frameSet != null) {
            let frame: ID3v2Frame = frameSet.getFrames().get(0);
            let frameData: ID3v2UrlFrameData;
            try {
                frameData = ID3v2UrlFrameData.create(this.useFrameUnsynchronisation(), frame.getData());
                return frameData;
            }
            catch (error) {
                // do nothing
                console.error('mp3agic AbstractID3v2Tag extractUrlFrameData() error:' + error);
            }
        }
        return null;
    }
    private extractPopmFrameData(id: string): ID3v2PopmFrameData {
        let frameSet: ID3v2FrameSet = this.frameSets.get(id);
        if (frameSet != null) {
            let frame: ID3v2Frame = frameSet.getFrames().get(0);
            let frameData: ID3v2PopmFrameData;
            try {
                frameData = new ID3v2PopmFrameData(this.useFrameUnsynchronisation(), frame.getData());
                return frameData;
            }
            catch (error) {
                // do nothing
                console.error('mp3agic AbstractID3v2Tag extractPopmFrameData() error:' + error);
            }
        }
        return null;
    }
    private extractChapterFrameData(id: string): JList<ID3v2ChapterFrameData> {
        let frameSet: ID3v2FrameSet = this.frameSets.get(id);
        if (frameSet != null) {
            let chapterData: JList<ID3v2ChapterFrameData> = new JList();
            let frames: JList<ID3v2Frame> = frameSet.getFrames();
            for (let i = 0; i < frames.length(); i++) {
                let frame = frames.get(i);
                let frameData: ID3v2ChapterFrameData;
                try {
                    frameData = new ID3v2ChapterFrameData(this.useFrameUnsynchronisation(), frame.getData());
                    chapterData.insert(frameData);
                }
                catch (error) {
                    // do nothing
                    console.error('mp3agic AbstractID3v2Tag extractChapterFrameData() error:' + error);
                }
            }
            return chapterData;
        }
        return null;
    }
    private extractChapterTOCFrameData(id: string): JList<ID3v2ChapterTOCFrameData> {
        let frameSet: ID3v2FrameSet = this.frameSets.get(id);
        if (frameSet != null) {
            let chapterData: JList<ID3v2ChapterTOCFrameData> = new JList();
            let frames: JList<ID3v2Frame> = frameSet.getFrames();
            for (let i = 0; i < frames.length(); i++) {
                let frame = frames.get(i);
                let frameData: ID3v2ChapterTOCFrameData;
                try {
                    frameData = new ID3v2ChapterTOCFrameData(this.useFrameUnsynchronisation(), frame.getData());
                    chapterData.insert(frameData);
                }
                catch (error) {
                    // do nothing
                    console.error('mp3agic AbstractID3v2Tag extractChapterTOCFrameData() error:' + error);
                }
            }
            return chapterData;
        }
        return null;
    }
    public getGenre(): number {
        let frameData: ID3v2TextFrameData = this.extractTextFrameData(this.obseleteFormat ? AbstractID3v2Tag.ID_GENRE_OBSELETE : AbstractID3v2Tag.ID_GENRE);
        if (frameData == null || frameData.getText() == null) {
            return -1;
        }
        return this.getGenreDes(frameData.getText().toString());
    }
    public setGenre(genre: number): void {
        if (genre >= 0) {
            this.invalidateDataLength();
            let genreDescription = genre < ID3v1Genres.GENRES.length ? ID3v1Genres.GENRES[genre] : "";
            let combinedGenre = "(" + genre + ")" + genreDescription;
            let frameData: ID3v2TextFrameData = new ID3v2TextFrameData(this.useFrameUnsynchronisation(), new EncodedText({ str: combinedGenre }));
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_GENRE, frameData.toBytes()), true);
        }
        else {
            // TODO remove frame?
        }
    }
    public getBPM(): number {
        let frameData: ID3v2TextFrameData = this.extractTextFrameData(this.obseleteFormat ? AbstractID3v2Tag.ID_BPM_OBSELETE : AbstractID3v2Tag.ID_BPM);
        if (frameData == null || frameData.getText() == null) {
            return -1;
        }
        let bpmStr = frameData.getText().toString();
        if (BufferTools.isNumber(bpmStr)) {
            return Math.floor(bpmStr);
        }
        else {
            // float as some utilities add BPM like 67,8
            if (bpmStr.indexOf(",")) {
                bpmStr = bpmStr.trim().replace(",", ".");
                return Math.floor(bpmStr);
            }
        }
    }
    public setBPM(bpm: number): void {
        if (bpm >= 0) {
            this.invalidateDataLength();
            let frameData: ID3v2TextFrameData = new ID3v2TextFrameData(this.useFrameUnsynchronisation(), new EncodedText({ str: String(bpm) }));
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_BPM, frameData.toBytes()), true);
        }
    }
    public getKey(): string {
        let frameData: ID3v2TextFrameData = this.extractTextFrameData(this.obseleteFormat ? AbstractID3v2Tag.ID_KEY_OBSELETE : AbstractID3v2Tag.ID_KEY);
        if (frameData == null || frameData.getText() == null) {
            return null;
        }
        return frameData.getText().toString();
    }
    public setKey(key: string): void {
        if (key != null && key.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2TextFrameData = new ID3v2TextFrameData(this.useFrameUnsynchronisation(), new EncodedText({ str: key }));
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_KEY, frameData.toBytes()), true);
        }
    }
    public getGenreDescription(): string {
        let frameData: ID3v2TextFrameData = this.extractTextFrameData(this.obseleteFormat ? AbstractID3v2Tag.ID_GENRE_OBSELETE : AbstractID3v2Tag.ID_GENRE);
        if (frameData == null || frameData.getText() == null) {
            return null;
        }
        let text = frameData.getText().toString();
        if (text != null) {
            let genreNum = this.getGenre(text);
            if (genreNum >= 0 && genreNum < ID3v1Genres.GENRES.length) {
                return ID3v1Genres.GENRES[genreNum];
            }
            else {
                let description = this.extractGenreDescription(text);
                if (description != null && description.length > 0) {
                    return description;
                }
            }
        }
        return null;
    }
    public setGenreDescription(text: string): void {
        let genreNum = ID3v1Genres.matchGenreDescription(text);
        if (genreNum < 0) {
            throw new IllegalArgumentException("Unknown genre: " + text);
        }
        this.setGenre(genreNum);
    }
    public getComment(): string {
        let frameData: ID3v2CommentFrameData = this.extractCommentFrameData(this.obseleteFormat ? AbstractID3v2Tag.ID_COMMENT_OBSELETE : AbstractID3v2Tag.ID_COMMENT, false);
        if (frameData != null && frameData.getComment() != null)
            return frameData.getComment().toString();
        return null;
    }
    public setComment(comment: string): void {
        if (comment != null && comment.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2CommentFrameData = new ID3v2CommentFrameData(this.useFrameUnsynchronisation(), "eng", null, new EncodedText({ str: comment }));
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_COMMENT, frameData.toBytes()), true);
        }
    }
    public getItunesComment(): string {
        let frameData: ID3v2CommentFrameData = this.extractCommentFrameData(this.obseleteFormat ? AbstractID3v2Tag.ID_COMMENT_OBSELETE : AbstractID3v2Tag.ID_COMMENT, true);
        if (frameData != null && frameData.getComment() != null)
            return frameData.getComment().toString();
        return null;
    }
    public setItunesComment(itunesComment: string): void {
        if (itunesComment != null && itunesComment.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2CommentFrameData = new ID3v2CommentFrameData(this.useFrameUnsynchronisation(), "eng", new EncodedText({ str: AbstractID3v2Tag.ITUNES_COMMENT_DESCRIPTION }), new EncodedText({ str: itunesComment }));
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_COMMENT, frameData.toBytes()), true);
        }
    }
    public getLyrics(): string {
        let frameData: ID3v2CommentFrameData;
        if (this.obseleteFormat)
            return null;
        else
            frameData = this.extractLyricsFrameData(AbstractID3v2Tag.ID_TEXT_LYRICS);
        if (frameData != null)
            return frameData.getComment().toString();
        return null;
    }
    public setLyrics(lyrics: string): void {
        if (lyrics != null && lyrics.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2CommentFrameData = new ID3v2CommentFrameData(this.useFrameUnsynchronisation(), "eng", null, new EncodedText({ str: lyrics }));
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_TEXT_LYRICS, frameData.toBytes()), true);
        }
    }
    public getComposer(): string {
        let frameData: ID3v2TextFrameData = this.extractTextFrameData(this.obseleteFormat ? AbstractID3v2Tag.ID_COMPOSER_OBSELETE : AbstractID3v2Tag.ID_COMPOSER);
        if (frameData != null && frameData.getText() != null)
            return frameData.getText().toString();
        return null;
    }
    public setComposer(composer: string): void {
        if (composer != null && composer.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2TextFrameData = new ID3v2TextFrameData(this.useFrameUnsynchronisation(), new EncodedText({ str: composer }));
            let frame: ID3v2Frame = this.createFrameById(AbstractID3v2Tag.ID_COMPOSER, frameData.toBytes());
            this.addFrame(frame, true);
        }
    }
    public getPublisher(): string {
        let frameData: ID3v2TextFrameData = this.extractTextFrameData(this.obseleteFormat ? AbstractID3v2Tag.ID_PUBLISHER_OBSELETE : AbstractID3v2Tag.ID_PUBLISHER);
        if (frameData != null && frameData.getText() != null)
            return frameData.getText().toString();
        return null;
    }
    public setPublisher(publisher: string): void {
        if (publisher != null && publisher.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2TextFrameData = new ID3v2TextFrameData(this.useFrameUnsynchronisation(), new EncodedText({ str: publisher }));
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_PUBLISHER, frameData.toBytes()), true);
        }
    }
    public getOriginalArtist(): string {
        let frameData: ID3v2TextFrameData = this.extractTextFrameData(this.obseleteFormat ? AbstractID3v2Tag.ID_ORIGINAL_ARTIST_OBSELETE : AbstractID3v2Tag.ID_ORIGINAL_ARTIST);
        if (frameData != null && frameData.getText() != null)
            return frameData.getText().toString();
        return null;
    }
    public setOriginalArtist(originalArtist: string): void {
        if (originalArtist != null && originalArtist.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2TextFrameData = new ID3v2TextFrameData(this.useFrameUnsynchronisation(), new EncodedText({ str: originalArtist }));
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_ORIGINAL_ARTIST, frameData.toBytes()), true);
        }
    }
    public getCopyright(): string {
        let frameData: ID3v2TextFrameData = this.extractTextFrameData(this.obseleteFormat ? AbstractID3v2Tag.ID_COPYRIGHT_OBSELETE : AbstractID3v2Tag.ID_COPYRIGHT);
        if (frameData != null && frameData.getText() != null)
            return frameData.getText().toString();
        return null;
    }
    public setCopyright(copyright: string): void {
        if (copyright != null && copyright.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2TextFrameData = new ID3v2TextFrameData(this.useFrameUnsynchronisation(), new EncodedText({ str: copyright }));
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_COPYRIGHT, frameData.toBytes()), true);
        }
    }
    public getArtistUrl(): string {
        let frameData: ID3v2WWWFrameData = this.extractWWWFrameData(AbstractID3v2Tag.ID_ARTIST_URL);
        if (frameData != null)
            return frameData.getUrl();
        return null;
    }
    public setArtistUrl(url: string): void {
        if (url != null && url.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2WWWFrameData = new ID3v2WWWFrameData(this.useFrameUnsynchronisation(), url);
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_ARTIST_URL, frameData.toBytes()), true);
        }
    }
    public getCommercialUrl(): string {
        let frameData: ID3v2WWWFrameData = this.extractWWWFrameData(AbstractID3v2Tag.ID_COMMERCIAL_URL);
        if (frameData != null)
            return frameData.getUrl();
        return null;
    }
    public setCommercialUrl(url: string): void {
        if (url != null && url.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2WWWFrameData = new ID3v2WWWFrameData(this.useFrameUnsynchronisation(), url);
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_COMMERCIAL_URL, frameData.toBytes()), true);
        }
    }
    public getCopyrightUrl(): string {
        let frameData: ID3v2WWWFrameData = this.extractWWWFrameData(AbstractID3v2Tag.ID_COPYRIGHT_URL);
        if (frameData != null)
            return frameData.getUrl();
        return null;
    }
    public setCopyrightUrl(url: string): void {
        if (url != null && url.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2WWWFrameData = new ID3v2WWWFrameData(this.useFrameUnsynchronisation(), url);
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_COPYRIGHT_URL, frameData.toBytes()), true);
        }
    }
    public getAudiofileUrl(): string {
        let frameData: ID3v2WWWFrameData = this.extractWWWFrameData(AbstractID3v2Tag.ID_AUDIOFILE_URL);
        if (frameData != null)
            return frameData.getUrl();
        return null;
    }
    public setAudiofileUrl(url: string): void {
        if (url != null && url.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2WWWFrameData = new ID3v2WWWFrameData(this.useFrameUnsynchronisation(), url);
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_AUDIOFILE_URL, frameData.toBytes()), true);
        }
    }
    public getAudioSourceUrl(): string {
        let frameData: ID3v2WWWFrameData = this.extractWWWFrameData(AbstractID3v2Tag.ID_AUDIOSOURCE_URL);
        if (frameData != null)
            return frameData.getUrl();
        return null;
    }
    public setAudioSourceUrl(url: string): void {
        if (url != null && url.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2WWWFrameData = new ID3v2WWWFrameData(this.useFrameUnsynchronisation(), url);
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_AUDIOSOURCE_URL, frameData.toBytes()), true);
        }
    }
    public getRadiostationUrl(): string {
        let frameData: ID3v2WWWFrameData = this.extractWWWFrameData(AbstractID3v2Tag.ID_RADIOSTATION_URL);
        if (frameData != null)
            return frameData.getUrl();
        return null;
    }
    public setRadiostationUrl(url: string): void {
        if (url != null && url.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2WWWFrameData = new ID3v2WWWFrameData(this.useFrameUnsynchronisation(), url);
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_RADIOSTATION_URL, frameData.toBytes()), true);
        }
    }
    public getPaymentUrl(): string {
        let frameData: ID3v2WWWFrameData = this.extractWWWFrameData(AbstractID3v2Tag.ID_PAYMENT_URL);
        if (frameData != null)
            return frameData.getUrl();
        return null;
    }
    public setPaymentUrl(url: string): void {
        if (url != null && url.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2WWWFrameData = new ID3v2WWWFrameData(this.useFrameUnsynchronisation(), url);
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_PAYMENT_URL, frameData.toBytes()), true);
        }
    }
    public getPublisherUrl(): string {
        let frameData: ID3v2WWWFrameData = this.extractWWWFrameData(AbstractID3v2Tag.ID_PUBLISHER_URL);
        if (frameData != null)
            return frameData.getUrl();
        return null;
    }
    public setPublisherUrl(url: string): void {
        if (url != null && url.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2WWWFrameData = new ID3v2WWWFrameData(this.useFrameUnsynchronisation(), url);
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_PUBLISHER_URL, frameData.toBytes()), true);
        }
    }
    public getUrl(): string {
        let frameData: ID3v2UrlFrameData = this.extractUrlFrameData(this.obseleteFormat ? AbstractID3v2Tag.ID_URL_OBSELETE : AbstractID3v2Tag.ID_URL);
        if (frameData != null)
            return frameData.getUrl();
        return null;
    }
    public setUrl(url: string): void {
        if (url != null && url.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2UrlFrameData = new ID3v2UrlFrameData(this.useFrameUnsynchronisation(), null, url);
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_URL, frameData.toBytes()), true);
        }
    }
    public getChapters(): JList<ID3v2ChapterFrameData> {
        if (this.obseleteFormat) {
            return null;
        }
        return this.extractChapterFrameData(AbstractID3v2Tag.ID_CHAPTER);
    }
    public setChapters(chapters: JList<ID3v2ChapterFrameData>): void {
        if (chapters != null) {
            this.invalidateDataLength();
            let first: boolean = true;
            for (let chapter of chapters) {
                if (first) {
                    first = false;
                    this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_CHAPTER, chapter.toBytes()), true);
                }
                else {
                    this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_CHAPTER, chapter.toBytes()), false);
                }
            }
        }
    }
    public getChapterTOC(): JList<ID3v2ChapterTOCFrameData> {
        if (this.obseleteFormat) {
            return null;
        }
        return this.extractChapterTOCFrameData(AbstractID3v2Tag.ID_CHAPTER_TOC);
    }
    public setChapterTOC(toc: JList<ID3v2ChapterTOCFrameData>): void {
        if (toc != null) {
            this.invalidateDataLength();
            let first: boolean = true;
            for (let ct of toc) {
                if (first) {
                    first = false;
                    this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_CHAPTER_TOC, ct.toBytes()), true);
                }
                else {
                    this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_CHAPTER_TOC, ct.toBytes()), false);
                }
            }
        }
    }
    public getEncoder(): string {
        let frameData: ID3v2TextFrameData = this.extractTextFrameData(this.obseleteFormat ? AbstractID3v2Tag.ID_ENCODER_OBSELETE : AbstractID3v2Tag.ID_ENCODER);
        if (frameData != null && frameData.getText() != null)
            return frameData.getText().toString();
        return null;
    }
    public setEncoder(encoder: string): void {
        if (encoder != null && encoder.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2TextFrameData = new ID3v2TextFrameData(this.useFrameUnsynchronisation(), new EncodedText({ str: encoder }));
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_ENCODER, frameData.toBytes()), true);
        }
    }
    public getAlbumImage(): number[] {
        let frameData: ID3v2PictureFrameData = this.createPictureFrameData(this.obseleteFormat ? AbstractID3v2Tag.ID_IMAGE_OBSELETE : AbstractID3v2Tag.ID_IMAGE);
        if (frameData != null)
            return frameData.getImageData();
        return null;
    }
    public setAlbumImage(albumImage: number[], mimeType: string, imageType?: number, imageDescription?: string): void {
        if (albumImage != null && albumImage.length > 0 && mimeType != null && mimeType.length > 0) {
            this.invalidateDataLength();
            let frameData: ID3v2PictureFrameData = new ID3v2PictureFrameData(this.useFrameUnsynchronisation(), albumImage, mimeType, imageType, null == imageDescription ? null : new EncodedText({ str: imageDescription }));
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_IMAGE, frameData.toBytes()), true);
        }
    }
    public clearAlbumImage(): void {
        this.clearFrameSet(this.obseleteFormat ? AbstractID3v2Tag.ID_IMAGE_OBSELETE : AbstractID3v2Tag.ID_IMAGE);
    }
    public getAlbumImageMimeType(): string {
        let frameData: ID3v2PictureFrameData = this.createPictureFrameData(this.obseleteFormat ? AbstractID3v2Tag.ID_IMAGE_OBSELETE : AbstractID3v2Tag.ID_IMAGE);
        if (frameData != null && frameData.getMimeType() != null)
            return frameData.getMimeType();
        return null;
    }
    public clearFrameSet(id: string): void {
        if (this.frameSets.delete(id)) {
            this.invalidateDataLength();
        }
    }
    public getObseleteFormat(): boolean {
        return this.obseleteFormat;
    }
    public getWmpRating(): number {
        let frameData: ID3v2PopmFrameData = this.extractPopmFrameData(AbstractID3v2Tag.ID_RATING);
        if (frameData != null && frameData.getAddress() != null) {
            return frameData.getRating();
        }
        return -1;
    }
    public setWmpRating(rating: number): void {
        if (rating >= 0 && rating < 6) {
            this.invalidateDataLength();
            let frameData: ID3v2PopmFrameData = new ID3v2PopmFrameData(this.useFrameUnsynchronisation(), null, rating);
            let bytes: number[] = frameData.toBytes();
            this.addFrame(this.createFrameById(AbstractID3v2Tag.ID_RATING, bytes), true);
        }
    }
    public toBytes(): number[] {
        let bytes: number[] = new Array(this.getLength());
        this.packTag(bytes);
        return bytes;
    }
    public packTag(bytes: number[]): void {
        let offset = this.packHeader(bytes, 0);
        if (this.extendedHeader) {
            offset = this.packExtendedHeader(bytes, offset);
        }
        offset = this.packFrames(bytes, offset);
        if (this.footer) {
            offset = this.packFooter(bytes, dataLength);
        }
    }
    private packHeader(bytes: number[], offset: number): number {
        try {
            BufferTools.stringIntoByteBuffer(AbstractID3v2Tag.TAG, 0, AbstractID3v2Tag.TAG.length, bytes, offset);
        }
        catch (error) {
        }
        let s = this.version.split(".");
        if (s.length > 0) {
            let majorVersion = BufferTools.stringToBytes(s[0]);
            bytes[offset + AbstractID3v2Tag.MAJOR_VERSION_OFFSET] = s[0];
        }
        if (s.length > 1) {
            let minorVersion = BufferTools.stringToBytes(s[1]);
            bytes[offset + AbstractID3v2Tag.MINOR_VERSION_OFFSET] = s[1];
        }
        this.packFlags(bytes, offset);
        BufferTools.packSynchsafeIntegerOther(this.getDataLength(), bytes, offset + AbstractID3v2Tag.DATA_LENGTH_OFFSET);
        return offset + AbstractID3v2Tag.HEADER_LENGTH;
    }
    public abstract unpackFlags(data: string): void;
    public abstract packFlags(bytes: number[], offset: number): void;
    private packExtendedHeader(bytes: number[], offset: number): number {
        BufferTools.packSynchsafeInteger(this.extendedHeaderLength, bytes, offset);
        BufferTools.copyIntoByteBuffer(this.extendedHeaderData, 0, this.extendedHeaderData.length, bytes, offset + 4);
        return offset + 4 + this.extendedHeaderData.length;
    }
    public packFrames(bytes: number[], offset: number): number {
        let newOffset = this.packSpecifiedFrames(bytes, offset, null, "APIC");
        newOffset = this.packSpecifiedFrames(bytes, newOffset, "APIC", null);
        return newOffset;
    }
    private packSpecifiedFrames(bytes: number[], offset: number, onlyId: string, notId: string): number {
        for (let [key, value] of this.frameSets) {
            if ((onlyId == null || onlyId == value.getId()) && (notId == null || notId != value.getId())) {
                var frames = value.getFrames();
                for (let i = 0; i < frames.length(); i++) {
                    let frame: ID3v2Frame = frames.get(i);
                    if (frame.getDataLength() > 0) {
                        let frameData = frame.toBytes();
                        BufferTools.copyIntoByteBuffer(frameData, 0, frameData.length, bytes, offset);
                        offset += frameData.length;
                    }
                }
            }
        }
        return offset;
    }
    private packFooter(bytes: number[], offset: number): number {
        try {
            BufferTools.stringIntoByteBuffer(AbstractID3v2Tag.FOOTER_TAG, 0, AbstractID3v2Tag.FOOTER_TAG.length(), bytes, offset);
        }
        catch (error) {
        }
        let s = this.version.split("\\.");
        if (s.length > 0) {
            let majorVersion = BufferTools.stringToBytes(s[0]);
            bytes[offset + AbstractID3v2Tag.MAJOR_VERSION_OFFSET] = majorVersion[0];
        }
        if (s.length > 1) {
            let minorVersion = BufferTools.stringToBytes(s[1]);
            bytes[offset + AbstractID3v2Tag.MINOR_VERSION_OFFSET] = minorVersion[0];
        }
        this.packFlags(bytes, offset);
        BufferTools.packSynchsafeInteger(this.getDataLength(), bytes, offset + AbstractID3v2Tag.DATA_LENGTH_OFFSET);
        return offset + AbstractID3v2Tag.FOOTER_LENGTH;
    }
}
