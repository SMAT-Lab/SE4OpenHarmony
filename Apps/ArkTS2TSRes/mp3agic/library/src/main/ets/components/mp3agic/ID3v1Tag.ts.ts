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
import { ID3v1 } from "./ID3v1";
import { ID3v1Genres } from "./ID3v1Genres";
import { BufferTools } from './BufferTools';
import { NoSuchTagException } from './NoSuchTagException';
export class ID3v1Tag implements ID3v1 {
    public static TAG_LENGTH: number = 128;
    private static VERSION_0: string = "0";
    private static VERSION_1: string = "1";
    private static TAG: string = "TAG";
    private static TITLE_OFFSET: number = 3;
    private static TITLE_LENGTH: number = 30;
    private static ARTIST_OFFSET: number = 33;
    private static ARTIST_LENGTH: number = 30;
    private static ALBUM_OFFSET: number = 63;
    private static ALBUM_LENGTH: number = 30;
    private static YEAR_OFFSET: number = 93;
    private static YEAR_LENGTH: number = 4;
    private static COMMENT_OFFSET: number = 97;
    private static COMMENT_LENGTH_V1_0: number = 30;
    private static COMMENT_LENGTH_V1_1: number = 28;
    private static TRACK_MARKER_OFFSET: number = 125;
    private static TRACK_OFFSET: number = 126;
    private static GENRE_OFFSET: number = 127;
    private track: string = null;
    private data: string;
    private artist: string = null;
    private title: string = null;
    private album: string = null;
    private year: string = null;
    private genre: number = -1;
    private comment: string = null;
    private frame: string = '';
    constructor(data: string) {
        if (data) {
            this.data = data;
            try {
                this.unpackTag(data);
            }
            catch (error) {
                throw new NoSuchTagException();
            }
        }
    }
    private unpackTag(data: string): void {
        try {
            this.frame = data;
            this.sanityCheckTag(data);
            // ID3v1  Header[3]
            // ID3v1  Title[30];
            this.title = BufferTools.trimStringRight(data.substring(ID3v1Tag.TITLE_OFFSET, ID3v1Tag.TITLE_OFFSET + ID3v1Tag.TITLE_LENGTH));
            // ID3v1 Artist[30]
            this.artist = BufferTools.trimStringRight(data.substring(ID3v1Tag.ARTIST_OFFSET, ID3v1Tag.ARTIST_OFFSET + ID3v1Tag.ARTIST_LENGTH));
            // ID3v1 Album[30];
            this.album = BufferTools.trimStringRight(data.substring(ID3v1Tag.ALBUM_OFFSET, ID3v1Tag.ALBUM_OFFSET + ID3v1Tag.ALBUM_LENGTH));
            // char Year[4];
            this.year = BufferTools.trimStringRight(data.substring(ID3v1Tag.YEAR_OFFSET, ID3v1Tag.YEAR_OFFSET + ID3v1Tag.YEAR_LENGTH));
            // char Comment[30];
            // char Genre;    /* 类型，流派 */
            this.genre = (data.substring(ID3v1Tag.GENRE_OFFSET).charCodeAt()) & 0xFF;
            if (this.genre == 0xFF) {
                this.genre = -1;
            }
            if (data.charAt(ID3v1Tag.TRACK_MARKER_OFFSET).charCodeAt() != 0) {
                this.comment = BufferTools.trimStringRight(data.substring(ID3v1Tag.COMMENT_OFFSET, ID3v1Tag.COMMENT_OFFSET + ID3v1Tag.COMMENT_LENGTH_V1_0));
                this.track = null;
            }
            else {
                this.comment = BufferTools.trimStringRight(data.substring(ID3v1Tag.COMMENT_OFFSET, ID3v1Tag.COMMENT_OFFSET + ID3v1Tag.COMMENT_LENGTH_V1_1));
                let trackInt = data.charAt(ID3v1Tag.TRACK_OFFSET).charCodeAt();
                if (trackInt == 0) {
                    this.track = "";
                }
                else {
                    this.track = trackInt;
                }
            }
        }
        catch (error) {
            throw new NoSuchTagException();
        }
    }
    public packTag(bytes: number[]): void {
        BufferTools.fill(bytes, 0);
        try {
            BufferTools.stringIntoByteBuffer(ID3v1Tag.TAG, 0, 3, bytes, 0);
        }
        catch (error) {
        }
        this.packField(bytes, this.title, ID3v1Tag.TITLE_LENGTH, ID3v1Tag.TITLE_OFFSET);
        this.packField(bytes, this.artist, ID3v1Tag.ARTIST_LENGTH, ID3v1Tag.ARTIST_OFFSET);
        this.packField(bytes, this.album, ID3v1Tag.ALBUM_LENGTH, ID3v1Tag.ALBUM_OFFSET);
        this.packField(bytes, this.year, ID3v1Tag.YEAR_LENGTH, ID3v1Tag.YEAR_OFFSET);
        if (this.genre < 128) {
            bytes[ID3v1Tag.GENRE_OFFSET] = this.genre;
        }
        else {
            bytes[ID3v1Tag.GENRE_OFFSET] = (this.genre - 256);
        }
        if (this.track == null) {
            this.packField(bytes, this.comment, ID3v1Tag.COMMENT_LENGTH_V1_0, ID3v1Tag.COMMENT_OFFSET);
        }
        else {
            this.packField(bytes, this.comment, ID3v1Tag.COMMENT_LENGTH_V1_1, ID3v1Tag.COMMENT_OFFSET);
            let trackTemp: string = this.numericsOnly(this.track);
            if (trackTemp.length > 0) {
                let trackInt = Number(trackTemp);
                if (trackInt < 128) {
                    bytes[ID3v1Tag.TRACK_OFFSET] = trackInt;
                }
                else {
                    bytes[ID3v1Tag.TRACK_OFFSET] = (trackInt - 256);
                }
            }
        }
    }
    private packField(bytes: number[], value: string, maxLength: number, offset: number): void {
        if (value != null) {
            try {
                BufferTools.stringIntoByteBuffer(value, 0, Math.min(value.length, maxLength), bytes, offset);
            }
            catch (error) {
            }
        }
    }
    private numericsOnly(s: string): string {
        let result: string = '';
        let length = s.length;
        for (let i = 0; i < length; i++) {
            let ch = s.charAt(i);
            if (ch >= '0' && ch <= '9') {
                result += ch;
            }
            else {
                break;
            }
        }
        return result.toString();
    }
    private sanityCheckTag(data: string): void {
        if (data.length < ID3v1Tag.TAG_LENGTH) {
            throw new NoSuchTagException("Buffer length wrong");
        }
        if (data.indexOf('TAG') != 0) {
            throw new NoSuchTagException();
        }
    }
    public getVersion(): string {
        if (this.track == null) {
            return ID3v1Tag.VERSION_0;
        }
        else {
            return ID3v1Tag.VERSION_1;
        }
    }
    public getTrack(): string {
        return this.track;
    }
    public setTrack(track: string): void {
        this.track = track;
    }
    public getArtist(): string {
        return this.artist;
    }
    public setArtist(artist: string): void {
        this.artist = artist;
    }
    public getTitle(): string {
        return this.title;
    }
    public setTitle(title: string): void {
        this.title = title;
    }
    public getAlbum(): string {
        return this.album;
    }
    public setAlbum(album: string): void {
        this.album = album;
    }
    public getYear(): string {
        return this.year;
    }
    public setYear(year: string): void {
        this.year = year;
    }
    public getGenre(): number {
        return this.genre;
    }
    public setGenre(genre: number): void {
        this.genre = genre;
    }
    public getGenreDescription(): string {
        try {
            return ID3v1Genres.GENRES[this.genre];
        }
        catch (error) {
            return "Unknown";
        }
    }
    public getComment(): string {
        return this.comment;
    }
    public setComment(comment: string): void {
        this.comment = comment;
    }
    public toBytes(): number[] {
        let bytes: number[] = new Array(ID3v1Tag.TAG_LENGTH);
        this.packTag(bytes);
        return bytes;
    }
    public getFrame(): string {
        return this.frame;
    }
}
