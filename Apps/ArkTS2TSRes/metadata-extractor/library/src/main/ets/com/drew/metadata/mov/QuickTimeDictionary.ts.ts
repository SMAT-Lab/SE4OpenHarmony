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
import Directory from '../Directory';
import QuickTimeDirectory from './QuickTimeDirectory';
import StringValue from '../StringValue';
class QuickTimeDictionary {
    // Major Brands
    private static _majorBrands: Map<string, string> = new Map<string, string>([
        ["3g2a", "3GPP2 Media (.3G2) compliant with 3GPP2 C.S0050-0 V1.0"],
        ["3g2b", "3GPP2 Media (.3G2) compliant with 3GPP2 C.S0050-A V1.0.0"],
        ["3g2c", "3GPP2 Media (.3G2) compliant with 3GPP2 C.S0050-B v1.0"],
        ["3ge6", "3GPP (.3GP) Release 6 MBMS Extended Presentations"],
        ["3ge7", "3GPP (.3GP) Release 7 MBMS Extended Presentations"],
        ["3gg6", "3GPP Release 6 General Profile"],
        ["3gp1", "3GPP Media (.3GP) Release 1 (probably non-existent)"],
        ["3gp2", "3GPP Media (.3GP) Release 2 (probably non-existent)"],
        ["3gp3", "3GPP Media (.3GP) Release 3 (probably non-existent)"],
        ["3gp4", "3GPP Media (.3GP) Release 4"],
        ["3gp5", "3GPP Media (.3GP) Release 5"],
        ["3gp6", "3GPP Media (.3GP) Release 6 Basic Profile"],
        ["3gp6", "3GPP Media (.3GP) Release 6 Progressive Download"],
        ["3gp6", "3GPP Media (.3GP) Release 6 Streaming Servers"],
        ["3gs7", "3GPP Media (.3GP) Release 7 Streaming Servers"],
        ["avc1", "MP4 Base w/ AVC ext [ISO 14496-12:2005]"],
        ["CAEP", "Canon Digital Camera"],
        ["caqv", "Casio Digital Camera"],
        ["CDes", "Convergent Design"],
        ["da0a", "DMB MAF w/ MPEG Layer II aud, MOT slides, DLS, JPG/PNG/MNG images"],
        ["da0b", "DMB MAF, extending DA0A, with 3GPP timed text, DID, TVA, REL, IPMP"],
        ["da1a", "DMB MAF audio with ER-BSAC audio, JPG/PNG/MNG images"],
        ["da1b", "DMB MAF, extending da1a, with 3GPP timed text, DID, TVA, REL, IPMP"],
        ["da2a", "DMB MAF aud w/ HE-AAC v2 aud, MOT slides, DLS, JPG/PNG/MNG images"],
        ["da2b", "DMB MAF, extending da2a, with 3GPP timed text, DID, TVA, REL, IPMP"],
        ["da3a", "DMB MAF aud with HE-AAC aud, JPG/PNG/MNG images"],
        ["da3b", "DMB MAF, extending da3a w/ BIFS, 3GPP timed text, DID, TVA, REL, IPMP"],
        ["dmb1", "DMB MAF supporting all the components defined in the specification"],
        ["dmpf", "Digital Media Project"],
        ["drc1", "Dirac (wavelet compression), encapsulated in ISO base media (MP4)"],
        ["dv1a", "DMB MAF vid w/ AVC vid, ER-BSAC aud, BIFS, JPG/PNG/MNG images, TS"],
        ["dv1b", "DMB MAF, extending dv1a, with 3GPP timed text, DID, TVA, REL, IPMP"],
        ["dv2a", "DMB MAF vid w/ AVC vid, HE-AAC v2 aud, BIFS, JPG/PNG/MNG images, TS"],
        ["dv2b", "DMB MAF, extending dv2a, with 3GPP timed text, DID, TVA, REL, IPMP"],
        ["dv3a", "DMB MAF vid w/ AVC vid, HE-AAC aud, BIFS, JPG/PNG/MNG images, TS"],
        ["dv3b", "DMB MAF, extending dv3a, with 3GPP timed text, DID, TVA, REL, IPMP"],
        ["dvr1", "DVB (.DVB) over RTP"],
        ["dvt1", "DVB (.DVB) over MPEG-2 Transport Stream"],
        ["F4V ", "Video for Adobe Flash Player 9+ (.F4V)"],
        ["F4P ", "Protected Video for Adobe Flash Player 9+ (.F4P)"],
        ["F4A ", "Audio for Adobe Flash Player 9+ (.F4A)"],
        ["F4B ", "Audio Book for Adobe Flash Player 9+ (.F4B)"],
        ["isc2", "ISMACryp 2.0 Encrypted File"],
        ["iso2", "MP4 Base Media v2 [ISO 14496-12:2005]"],
        ["isom", "MP4  Base Media v1 [IS0 14496-12:2003]"],
        ["JP2 ", "JPEG 2000 Image (.JP2) [ISO 15444-1 ?]"],
        ["JP20", "Unknown, from GPAC samples (prob non-existent)"],
        ["jpm ", "JPEG 2000 Compound Image (.JPM) [ISO 15444-6]"],
        ["jpx ", "JPEG 2000 w/ extensions (.JPX) [ISO 15444-2]"],
        ["KDDI", "3GPP2 EZmovie for KDDI 3G cellphones"],
        ["M4A ", "Apple iTunes AAC-LC (.M4A) Audio"],
        ["M4B ", "Apple iTunes AAC-LC (.M4B) Audio Book"],
        ["M4P ", "Apple iTunes AAC-LC (.M4P) AES Protected Audio"],
        ["M4V ", "Apple iTunes Video (.M4V) Video"],
        ["M4VH", "Apple TV (.M4V)"],
        ["M4VP", "Apple iPhone (.M4V)"],
        ["mj2s", "Motion JPEG 2000 [ISO 15444-3] Simple Profile"],
        ["mjp2", "Motion JPEG 2000 [ISO 15444-3] General Profile"],
        ["mmp4", "MPEG-4/3GPP Mobile Profile (.MP4 / .3GP) (for NTT)"],
        ["mp21", "MPEG-21 [ISO/IEC 21000-9]"],
        ["mp41", "MP4 v1 [ISO 14496-1:ch13]"],
        ["mp42", "MP4 v2 [ISO 14496-14]"],
        ["mp71", "MP4 w/ MPEG-7 Metadata [per ISO 14496-12]"],
        ["MPPI", "Photo Player, MAF [ISO/IEC 23000-3]"],
        ["mqt ", "Sony / Mobile QuickTime (.MQV)  US Patent 7,477,830 (Sony Corp)"],
        ["MSNV", "MPEG-4 (.MP4) for SonyPSP"],
        ["NDAS", "MP4 v2 [ISO 14496-14] Nero Digital AAC Audio"],
        ["NDSC", "MPEG-4 (.MP4) Nero Cinema Profile"],
        ["NDSH", "MPEG-4 (.MP4) Nero HDTV Profile"],
        ["NDSM", "MPEG-4 (.MP4) Nero Mobile Profile"],
        ["NDSP", "MPEG-4 (.MP4) Nero Portable Profile"],
        ["NDSS", "MPEG-4 (.MP4) Nero Standard Profile"],
        ["NDXC", "H.264/MPEG-4 AVC (.MP4) Nero Cinema Profile"],
        ["NDXH", "H.264/MPEG-4 AVC (.MP4) Nero HDTV Profile"],
        ["NDXM", "H.264/MPEG-4 AVC (.MP4) Nero Mobile Profile"],
        ["NDXP", "H.264/MPEG-4 AVC (.MP4) Nero Portable Profile"],
        ["NDXS", "H.264/MPEG-4 AVC (.MP4) Nero Standard Profile"],
        ["odcf", "OMA DCF DRM Format 2.0 (OMA-TS-DRM-DCF-V2_0-20060303-A)"],
        ["opf2", "OMA PDCF DRM Format 2.1 (OMA-TS-DRM-DCF-V2_1-20070724-C)"],
        ["opx2", "OMA PDCF DRM + XBS extensions (OMA-TS-DRM_XBS-V1_0-20070529-C)"],
        ["pana", "Panasonic Digital Camera"],
        ["qt  ", "Apple QuickTime (.MOV/QT)"],
        ["ROSS", "Ross Video"],
        ["sdv ", "SD Memory Card Video"],
        ["ssc1", "Samsung stereoscopic, single stream (patent pending, see notes)"],
        ["ssc2", "Samsung stereoscopic, dual stream (patent pending, see notes)"]
    ]);
    // Video Compression Types
    private static _videoCompressionTypes: Map<string, string> = new Map<string, string>([
        ["3IVX", "3ivx MPEG-4"],
        ["3IV1", "3ivx MPEG-4 v1"],
        ["3IV2", "3ivx MPEG-4 v2"],
        ["avr ", "AVR-JPEG"],
        ["base", "Base"],
        ["WRLE", "BMP"],
        ["cvid", "Cinepak"],
        ["clou", "Cloud"],
        ["cmyk", "CMYK"],
        ["yuv2", "ComponentVideo"],
        ["yuvu", "ComponentVideoSigned"],
        ["yuvs", "ComponentVideoUnsigned"],
        ["dvc ", "DVC-NTSC"],
        ["dvcp", "DVC-PAL"],
        ["dvpn", "DVCPro-NTSC"],
        ["dvpp", "DVCPro-PAL"],
        ["fire", "Fire"],
        ["flic", "FLC"],
        ["b48r", "48RGB"],
        ["gif ", "GIF"],
        ["smc ", "Graphics"],
        ["h261", "Apple H261"],
        ["h263", "Apple VC H.263"],
        ["IV41", "Indeo4"],
        ["jpeg", "JPEG"],
        ["PNTG", "MacPaint"],
        ["msvc", "Microsoft Video1"],
        ["mjpa", "Apple Motion JPEG-A"],
        ["mjpb", "Apple Motion JPEG-B"],
        ["myuv", "MPEG YUV420"],
        ["dmb1", "OpenDML JPEG"],
        ["kpcd", "PhotoCD"],
        ["8BPS", "Planar RGB"],
        ["png ", "PNG"],
        ["qdrw", "QuickDraw"],
        ["qdgx", "QuickDrawGX"],
        ["raw ", "RAW"],
        [".SGI", "SGI"],
        ["b16g", "16Gray"],
        ["b64a", "64ARGB"],
        ["SVQ1", "Sorenson Video 1"],
        ["SVQ3", "Sorenson Video 3"],
        ["syv9", "Sorenson YUV9"],
        ["tga ", "Targa"],
        ["b32a", "32AlphaGray"],
        ["tiff", "TIFF"],
        ["path", "Vector"],
        ["rpza", "Video (Road Pizza)"],
        ["ripl", "WaterRipple"],
        ["WRAW", "Windows RAW"],
        ["y420", "YUV420"],
        ["avc1", "H.264"],
        ["mp4v", "MPEG-4"],
        ["MP4V", "MPEG-4"],
        ["dvhp", "DVCPRO HD 720p60"],
        ["hdv2", "HDV 1080i60"],
        ["dvc+", "DV/DVCPRO - NTSC"],
        ["mx5p", "MPEG2 IMX 635/50 50mb/s"],
        ["mx3n", "MPEG2 IMX 635/50 30mb/s"],
        ["dv5p", "DVCPRO50"],
        ["hdv3", "HDV Final Cut Pro"],
        ["rle ", "Animation"],
        ["rle ", "Animation"],
        ["2vuY", "Uncompressed Y'CbCr, 8-bit-per-component 4:2:2"],
        ["v308", "Uncompressed Y'CbCr, 8-bit-per-component 4:4:4"],
        ["v408", "Uncompressed Y'CbCr, 8-bit-per-component 4:4:4:4"],
        ["v216", "Uncompressed Y'CbCr, 10, 12, 14, or 16-bit-per-component 4:2:2"],
        ["v410", "Uncompressed Y'CbCr, 10-bit-per-component 4:4:4"],
        ["v210", "Uncompressed Y'CbCr, 10-bit-per-component 4:2:2"]
    ]);
    // Sound Audio Formats
    private static _soundAudioFormats: Map<string, string> = new Map<string, string>([
        ["NONE", ""],
        ["raw ", "Uncompressed in offset-binary format"],
        ["twos", "Uncompressed in two's-complement format"],
        ["sowt", "16-bit little-endian, twos-complement"],
        ["MAC3", "MACE 3:1"],
        ["MAC6", "MACE 6:1"],
        ["ima4", "IMA 4:1"],
        ["fl32", "32-bit floating point"],
        ["fl64", "64-bit floating point"],
        ["in24", "24-bit integer"],
        ["in32", "32-bit integer"],
        ["ulaw", "uLaw 2:1"],
        ["alaw", "uLaw 2:1"],
        [StringValue.Int8Array2String(new Int8Array([0x6D, 0x73, 0x00, 0x02]), 'utf-8'), "Microsoft ADPCM-ACM code 2"],
        [StringValue.Int8Array2String(new Int8Array([0x6D, 0x73, 0x00, 0x11]), 'utf-8'), "DVI/Intel IMAADPCM-ACM code 17"],
        ["dvca", "DV Audio"],
        ["QDMC", "QDesign music"],
        ["QDM2", "QDesign music version 2"],
        ["Qclp", "QUALCOMM PureVoice"],
        [StringValue.Int8Array2String(new Int8Array([0x6D, 0x73, 0x00, 0x55]), 'utf-8'), "MPEG-1 layer 3, CBR only (pre-QT4.1)"],
        [".mp3", "MPEG-1 layer 3, CBR & VBR (QT4.1 and later)"],
        ["mp4a", "MPEG-4, Advanced Audio Coding (AAC)"],
        ["ac-3", "Digital Audio Compression Standard (AC-3, Enhanced AC-3)"],
        ["aac ", "ISO/IEC 144963-3 AAC"],
        ["agsm", "Apple GSM 10:1"],
        ["alac", "Apple Lossless Audio Codec"],
        ["conv", "Sample Format"],
        ["dvi ", "DV 4:1"],
        ["eqal", "Frequency Equalizer"],
        ["lpc ", "LPC 23:1"],
        ["mixb", "8-bit Mixer"],
        ["mixw", "16-bit Mixer"],
        [StringValue.Int8Array2String(new Int8Array([0x4d, 0x53, 0x00, 0x02]), 'utf-8'), "Microsoft ADPCM"],
        [StringValue.Int8Array2String(new Int8Array([0x4d, 0x53, 0x00, 0x11]), 'utf-8'), "DV IMA"],
        [StringValue.Int8Array2String(new Int8Array([0x4d, 0x53, 0x00, 0x55]), 'utf-8'), "MPEG3"],
        ["ratb", "8-bit Rate"],
        ["ratw", "16-bit Rate"],
        ["sour", "Sound Source"],
        ["str1", "Iomega MPEG layer II"],
        ["str2", "Iomega MPEG *layer II"],
        ["str3", "Iomega MPEG **layer II"],
        ["str4", "Iomega MPEG ***layer II"],
        ["lpcm", "Linear Pulse Code Modulation"]
    ]);
    // Vendor ID's https://sno.phy.queensu.ca/~phil/exiftool/TagNames/QuickTime.html#Meta
    private static readonly _vendorIds: Map<string, string> = new Map<string, string>([
        [" KD ", "Kodak"],
        ["AR.D", "Parrot AR.Drone"],
        ["FFMP", "FFmpeg"],
        ["GIC ", "General Imaging Co."],
        ["KMPI", "Konica-Minolta"],
        ["NIKO", "Nikon"],
        ["SMI ", "Sorenson Media Inc."],
        ["ZORA", "Zoran Corporation"],
        ["appl", "Apple"],
        ["fe20", "Olympus (fe20)"],
        ["kdak", "Kodak"],
        ["leic", "Leica"],
        ["mino", "Minolta"],
        ["niko", "Nikon"],
        ["olym", "Olympus"],
        ["pana", "Panasonic"],
        ["pent", "Pentax"],
        ["pr01", "Olympus (pr01)"],
        ["sany", "Sanyo"]
    ]);
    private static _dictionary: Map<number, Map<string, string>> = new Map<number, Map<string, string>>();
    public static lookup(scope: number, lookup: string): string {
        if (QuickTimeDictionary._dictionary.has(scope) && QuickTimeDictionary._dictionary.get(scope).has(lookup)) {
            return QuickTimeDictionary._dictionary.get(scope).get(lookup);
        }
        else {
            return "Unknown";
        }
    }
    public static setLookup(scope: number, lookup: string, directory: Directory): void {
        let results: string = QuickTimeDictionary.lookup(scope, lookup);
        directory.setString(scope, results);
    }
    private constructor() {
        QuickTimeDictionary._dictionary.set(QuickTimeDirectory.TAG_MAJOR_BRAND, QuickTimeDictionary._majorBrands);
    }
}
export default QuickTimeDictionary;