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
import { ID3v2ChapterFrameData } from './ID3v2ChapterFrameData';
import { ID3v2ChapterTOCFrameData } from './ID3v2ChapterTOCFrameData';
import { ID3v2FrameSet } from './ID3v2FrameSet';
export interface ID3v2 extends ID3v1 {
    getPadding(): boolean;
    setPadding(padding: boolean): void;
    hasFooter(): boolean;
    setFooter(footer: boolean): void;
    hasUnsynchronisation(): boolean;
    setUnsynchronisation(unsynchronisation: boolean): void;
    getBPM(): number;
    setBPM(bpm: number): void;
    getGrouping(): string;
    setGrouping(grouping: string): void;
    getKey(): string;
    setKey(key: string): void;
    getDate(): string;
    setDate(date: string): void;
    getComposer(): string;
    setComposer(composer: string): void;
    getPublisher(): string;
    setPublisher(publisher: string): void;
    getOriginalArtist(): string;
    setOriginalArtist(originalArtist: string): void;
    getAlbumArtist(): string;
    setAlbumArtist(albumArtist: string): void;
    getCopyright(): string;
    setCopyright(copyright: string): void;
    getArtistUrl(): string;
    setArtistUrl(url: string): void;
    getCommercialUrl(): string;
    setCommercialUrl(url: string): void;
    getCopyrightUrl(): string;
    setCopyrightUrl(url: string): void;
    getAudiofileUrl(): string;
    setAudiofileUrl(url: string): void;
    getAudioSourceUrl(): string;
    setAudioSourceUrl(url: string): void;
    getRadiostationUrl(): string;
    setRadiostationUrl(url: string): void;
    getPaymentUrl(): string;
    setPaymentUrl(url: string): void;
    getPublisherUrl(): string;
    setPublisherUrl(url: string): void;
    getUrl(): string;
    setUrl(url: string): void;
    getPartOfSet(): string;
    setPartOfSet(partOfSet: string): void;
    isCompilation(): boolean;
    setCompilation(compilation: boolean): void;
    getChapters(): Array<ID3v2ChapterFrameData>;
    setChapters(chapters: Array<ID3v2ChapterFrameData>): void;
    getChapterTOC(): Array<ID3v2ChapterTOCFrameData>;
    setChapterTOC(ctoc: Array<ID3v2ChapterTOCFrameData>): void;
    getEncoder(): string;
    setEncoder(encoder: string);
    getAlbumImage(): number[];
    setAlbumImage(albumImage: number[], mimeType: string, imageType?: number, imageDescription?: string): void;
    clearAlbumImage(): void;
    getAlbumImageMimeType(): string;
    getWmpRating(): number;
    setWmpRating(rating: number): void;
    getItunesComment(): string;
    setItunesComment(itunesComment: string): void;
    getLyrics(): string;
    setLyrics(lyrics: string): void;
    setGenreDescription(text: string): void;
    getDataLength(): number;
    getLength(): number;
    getObseleteFormat(): boolean;
    getFrameSets(): Map<String, ID3v2FrameSet>;
    clearFrameSet(id: string): void;
}
