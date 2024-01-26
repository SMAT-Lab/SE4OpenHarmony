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
class FileType {
    public static readonly Unknown: FileType = new FileType("Unknown", "Unknown", null);
    public static readonly Jpeg: FileType = new FileType("JPEG", "Joint Photographic Experts Group", "image/jpeg", "jpg", "jpeg", "jpe");
    public static readonly Tiff: FileType = new FileType("TIFF", "Tagged Image File Format", "image/tiff", "tiff", "tif");
    public static readonly Psd: FileType = new FileType("PSD", "Photoshop Document", "image/vnd.adobe.photoshop", "psd");
    public static readonly Png: FileType = new FileType("PNG", "Portable Network Graphics", "image/png", "png");
    public static readonly Bmp: FileType = new FileType("BMP", "Device Independent Bitmap", "image/bmp", "bmp");
    public static readonly Gif: FileType = new FileType("GIF", "Graphics Interchange Format", "image/gif", "gif");
    public static readonly Ico: FileType = new FileType("ICO", "Windows Icon", "image/x-icon", "ico");
    public static readonly Pcx: FileType = new FileType("PCX", "PiCture eXchange", "image/x-pcx", "pcx");
    public static readonly Riff: FileType = new FileType("RIFF", "Resource Interchange File Format", null);
    public static readonly Wav: FileType = new FileType("WAV", "Waveform Audio File Format", "audio/vnd.wave", "wav", "wave");
    public static readonly Avi: FileType = new FileType("AVI", "Audio Video Interleaved", "video/vnd.avi", "avi");
    public static readonly WebP: FileType = new FileType("WebP", "WebP", "image/webp", "webp");
    public static readonly QuickTime: FileType = new FileType("MOV", "QuickTime Movie", "video/quicktime", "mov", "qt");
    public static readonly Mp4: FileType = new FileType("MP4", "MPEG-4 Part 14", "video/mp4", "mp4", "m4a", "m4p", "m4b", "m4r", "m4v");
    public static readonly Heif: FileType = new FileType("HEIF", "High Efficiency Image File Format", "image/heif", "heif", "heic");
    public static readonly Eps: FileType = new FileType("EPS", "Encapsulated PostScript", "application/postscript", "eps", "epsf", "epsi");
    public static readonly Mp3: FileType = new FileType("MP3", "MPEG Audio Layer III", "audio/mpeg", "mp3");
    /** Sony camera raw. */
    public static readonly Arw: FileType = new FileType("ARW", "Sony Camera Raw", null, "arw");
    /** Canon camera raw, version 1. */
    public static readonly Crw: FileType = new FileType("CRW", "Canon Camera Raw", null, "crw");
    /** Canon camera raw, version 2. */
    public static readonly Cr2: FileType = new FileType("CR2", "Canon Camera Raw", null, "cr2");
    /** Nikon camera raw. */
    public static readonly Nef: FileType = new FileType("NEF", "Nikon Camera Raw", null, "nef");
    /** Olympus camera raw. */
    public static readonly Orf: FileType = new FileType("ORF", "Olympus Camera Raw", null, "orf");
    /** FujiFilm camera raw. */
    public static readonly Raf: FileType = new FileType("RAF", "FujiFilm Camera Raw", null, "raf");
    /** Panasonic camera raw. */
    public static readonly Rw2: FileType = new FileType("RW2", "Panasonic Camera Raw", null, "rw2");
    /** Canon camera raw (version 3). Shared by CR3 (image) and CRM (video). */
    public static readonly Crx: FileType = new FileType("CRX", "Canon Camera Raw", null, "cr3", "crm");
    // Only file detection
    public static readonly Aac: FileType = new FileType("AAC", "Advanced Audio Coding", "audio/aac", "m4a");
    public static readonly Asf: FileType = new FileType("ASF", "Advanced Systems Format", "video/x-ms-asf", "asf", "wma", "wmv");
    public static readonly Cfbf: FileType = new FileType("CFBF", "Compound File Binary Format", null, null);
    public static readonly Flv: FileType = new FileType("FLV", "Flash Video", "video/x-flv", ".flv", ".f4v,");
    public static readonly Indd: FileType = new FileType("INDD", "INDesign Document", "application/octet-stream", ".indd");
    public static readonly Mxf: FileType = new FileType("MXF", "Material Exchange Format", "application/mxf", "mxf");
    public static readonly Pdf: FileType = new FileType("PDF", "Portable Document Format", "application/pdf", "pdf");
    public static readonly Qxp: FileType = new FileType("QXP", "Quark XPress Document", null, "qzp", "qxd");
    public static readonly Ram: FileType = new FileType("RAM", "RealAudio", "audio/vnd.rn-realaudio", "aac", "ra");
    public static readonly Rtf: FileType = new FileType("RTF", "Rich Text Format", "application/rtf", "rtf");
    public static readonly Sit: FileType = new FileType("SIT", "Stuffit Archive", "application/x-stuffit", "sit");
    public static readonly Sitx: FileType = new FileType("SITX", "Stuffit X Archive", "application/x-stuffitx", "sitx");
    public static readonly Swf: FileType = new FileType("SWF", "Small Web Format", "application/vnd.adobe.flash-movie", "swf");
    public static readonly Vob: FileType = new FileType("VOB", "Video Object", "video/dvd", ".vob");
    public static readonly Zip: FileType = new FileType("ZIP", "ZIP Archive", "application/zip", ".zip", ".zipx");
    private readonly _name: string;
    private readonly _longName: string;
    private readonly _mimeType: string;
    private readonly _extensions: string[];
    constructor(name: string, longName: string, mimeType: string, ...extensions: string[]) {
        this._name = name;
        this._longName = longName;
        this._mimeType = mimeType;
        this._extensions = extensions;
    }
    public getName(): string {
        return this._name;
    }
    public getLongName(): string {
        return this._longName;
    }
    public getMimeType(): string {
        return this._mimeType;
    }
    public getCommonExtension(): string {
        return (this._extensions == null || this._extensions.length == 0) ? null : this._extensions[0];
    }
    public getAllExtensions(): string[] {
        return this._extensions;
    }
}
export default FileType;
