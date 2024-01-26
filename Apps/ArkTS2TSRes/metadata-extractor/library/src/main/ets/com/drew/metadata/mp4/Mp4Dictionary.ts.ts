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
import Mp4Directory from './Mp4Directory';
import Mp4SoundDirectory from './media/Mp4SoundDirectory';
import Mp4VideoDirectory from './media/Mp4VideoDirectory';
class Mp4Dictionary {
    private static _dictionary: Map<number, Map<string, string>> = new Map<number, Map<string, string>>();
    private static _majorBrands: Map<string, string> = new Map<string, string>();
    private static _videoCompressionTypes: Map<string, string> = new Map<string, string>();
    private static _soundAudioFormats: Map<string, string> = new Map<string, string>();
    private static _vendorIds: Map<string, string> = new Map<string, string>();
    public constructor() {
    }
    private static init(): void {
        //todo  add video
        Mp4Dictionary._dictionary.set(Mp4Directory.TAG_MAJOR_BRAND, Mp4Dictionary._majorBrands);
        Mp4Dictionary._dictionary.set(Mp4VideoDirectory.TAG_COMPRESSION_TYPE, Mp4Dictionary._videoCompressionTypes);
        Mp4Dictionary._dictionary.set(Mp4SoundDirectory.TAG_AUDIO_FORMAT, Mp4Dictionary._soundAudioFormats);
        Mp4Dictionary._dictionary.set(Mp4VideoDirectory.TAG_VENDOR, Mp4Dictionary._vendorIds);
        // Video Compression Types
        Mp4Dictionary._videoCompressionTypes.set("3IVX", "3ivx MPEG-4");
        Mp4Dictionary._videoCompressionTypes.set("3IV1", "3ivx MPEG-4 v1");
        Mp4Dictionary._videoCompressionTypes.set("3IV2", "3ivx MPEG-4 v2");
        Mp4Dictionary._videoCompressionTypes.set("avr ", "AVR-JPEG");
        Mp4Dictionary._videoCompressionTypes.set("base", "Base");
        Mp4Dictionary._videoCompressionTypes.set("WRLE", "BMP");
        Mp4Dictionary._videoCompressionTypes.set("cvid", "Cinepak");
        Mp4Dictionary._videoCompressionTypes.set("clou", "Cloud");
        Mp4Dictionary._videoCompressionTypes.set("cmyk", "CMYK");
        Mp4Dictionary._videoCompressionTypes.set("yuv2", "ComponentVideo");
        Mp4Dictionary._videoCompressionTypes.set("yuvu", "ComponentVideoSigned");
        Mp4Dictionary._videoCompressionTypes.set("yuvs", "ComponentVideoUnsigned");
        Mp4Dictionary._videoCompressionTypes.set("dvc ", "DVC-NTSC");
        Mp4Dictionary._videoCompressionTypes.set("dvcp", "DVC-PAL");
        Mp4Dictionary._videoCompressionTypes.set("dvpn", "DVCPro-NTSC");
        Mp4Dictionary._videoCompressionTypes.set("dvpp", "DVCPro-PAL");
        Mp4Dictionary._videoCompressionTypes.set("fire", "Fire");
        Mp4Dictionary._videoCompressionTypes.set("flic", "FLC");
        Mp4Dictionary._videoCompressionTypes.set("b48r", "48RGB");
        Mp4Dictionary._videoCompressionTypes.set("gif ", "GIF");
        Mp4Dictionary._videoCompressionTypes.set("smc ", "Graphics");
        Mp4Dictionary._videoCompressionTypes.set("h261", "Apple H261");
        Mp4Dictionary._videoCompressionTypes.set("h263", "Apple VC H.263");
        Mp4Dictionary._videoCompressionTypes.set("IV41", "Indeo4");
        Mp4Dictionary._videoCompressionTypes.set("jpeg", "JPEG");
        Mp4Dictionary._videoCompressionTypes.set("PNTG", "MacPaint");
        Mp4Dictionary._videoCompressionTypes.set("msvc", "Microsoft Video1");
        Mp4Dictionary._videoCompressionTypes.set("mjpa", "Apple Motion JPEG-A");
        Mp4Dictionary._videoCompressionTypes.set("mjpb", "Apple Motion JPEG-B");
        Mp4Dictionary._videoCompressionTypes.set("myuv", "MPEG YUV420");
        Mp4Dictionary._videoCompressionTypes.set("dmb1", "OpenDML JPEG");
        Mp4Dictionary._videoCompressionTypes.set("kpcd", "PhotoCD");
        Mp4Dictionary._videoCompressionTypes.set("8BPS", "Planar RGB");
        Mp4Dictionary._videoCompressionTypes.set("png ", "PNG");
        Mp4Dictionary._videoCompressionTypes.set("qdrw", "QuickDraw");
        Mp4Dictionary._videoCompressionTypes.set("qdgx", "QuickDrawGX");
        Mp4Dictionary._videoCompressionTypes.set("raw ", "RAW");
        Mp4Dictionary._videoCompressionTypes.set(".SGI", "SGI");
        Mp4Dictionary._videoCompressionTypes.set("b16g", "16Gray");
        Mp4Dictionary._videoCompressionTypes.set("b64a", "64ARGB");
        Mp4Dictionary._videoCompressionTypes.set("SVQ1", "Sorenson Video 1");
        Mp4Dictionary._videoCompressionTypes.set("SVQ3", "Sorenson Video 3");
        Mp4Dictionary._videoCompressionTypes.set("syv9", "Sorenson YUV9");
        Mp4Dictionary._videoCompressionTypes.set("tga ", "Targa");
        Mp4Dictionary._videoCompressionTypes.set("b32a", "32AlphaGray");
        Mp4Dictionary._videoCompressionTypes.set("tiff", "TIFF");
        Mp4Dictionary._videoCompressionTypes.set("path", "Vector");
        Mp4Dictionary._videoCompressionTypes.set("rpza", "Video (Road Pizza)");
        Mp4Dictionary._videoCompressionTypes.set("ripl", "WaterRipple");
        Mp4Dictionary._videoCompressionTypes.set("WRAW", "Windows RAW");
        Mp4Dictionary._videoCompressionTypes.set("y420", "YUV420");
        Mp4Dictionary._videoCompressionTypes.set("avc1", "H.264");
        Mp4Dictionary._videoCompressionTypes.set("mp4v", "MPEG-4");
        Mp4Dictionary._videoCompressionTypes.set("MP4V", "MPEG-4");
        Mp4Dictionary._videoCompressionTypes.set("dvhp", "DVCPRO HD 720p60");
        Mp4Dictionary._videoCompressionTypes.set("hdv2", "HDV 1080i60");
        Mp4Dictionary._videoCompressionTypes.set("dvc+", "DV/DVCPRO - NTSC");
        Mp4Dictionary._videoCompressionTypes.set("mx5p", "MPEG2 IMX 635/50 50mb/s");
        Mp4Dictionary._videoCompressionTypes.set("mx3n", "MPEG2 IMX 635/50 30mb/s");
        Mp4Dictionary._videoCompressionTypes.set("dv5p", "DVCPRO50");
        Mp4Dictionary._videoCompressionTypes.set("hdv3", "HDV Final Cut Pro");
        Mp4Dictionary._videoCompressionTypes.set("rle ", "Animation");
        Mp4Dictionary._videoCompressionTypes.set("rle ", "Animation");
        Mp4Dictionary._videoCompressionTypes.set("2vuY", "Uncompressed Y'CbCr, 8-bit-per-component 4:2:2");
        Mp4Dictionary._videoCompressionTypes.set("v308", "Uncompressed Y'CbCr, 8-bit-per-component 4:4:4");
        Mp4Dictionary._videoCompressionTypes.set("v408", "Uncompressed Y'CbCr, 8-bit-per-component 4:4:4:4");
        Mp4Dictionary._videoCompressionTypes.set("v216", "Uncompressed Y'CbCr, 10, 12, 14, or 16-bit-per-component 4:2:2");
        Mp4Dictionary._videoCompressionTypes.set("v410", "Uncompressed Y'CbCr, 10-bit-per-component 4:4:4");
        Mp4Dictionary._videoCompressionTypes.set("v210", "Uncompressed Y'CbCr, 10-bit-per-component 4:2:2");
        // Sound Audio Formats
        Mp4Dictionary._soundAudioFormats.set("NONE", "");
        Mp4Dictionary._soundAudioFormats.set("raw ", "Uncompressed in offset-binary format");
        Mp4Dictionary._soundAudioFormats.set("twos", "Uncompressed in two's-complement format");
        Mp4Dictionary._soundAudioFormats.set("sowt", "16-bit little-endian, twos-complement");
        Mp4Dictionary._soundAudioFormats.set("MAC3", "MACE 3:1");
        Mp4Dictionary._soundAudioFormats.set("MAC6", "MACE 6:1");
        Mp4Dictionary._soundAudioFormats.set("ima4", "IMA 4:1");
        Mp4Dictionary._soundAudioFormats.set("fl32", "32-bit floating point");
        Mp4Dictionary._soundAudioFormats.set("fl64", "64-bit floating point");
        Mp4Dictionary._soundAudioFormats.set("in24", "24-bit integer");
        Mp4Dictionary._soundAudioFormats.set("in32", "32-bit integer");
        Mp4Dictionary._soundAudioFormats.set("ulaw", "uLaw 2:1");
        Mp4Dictionary._soundAudioFormats.set("alaw", "uLaw 2:1");
        Mp4Dictionary._soundAudioFormats.set(Uint8Array.of(0x6D, 0x73, 0x00, 0x02).toString(), "Microsoft ADPCM-ACM code 2");
        Mp4Dictionary._soundAudioFormats.set(Uint8Array.of(0x6D, 0x73, 0x00, 0x11).toString(), "DVI/Intel IMAADPCM-ACM code 17");
        Mp4Dictionary._soundAudioFormats.set("dvca", "DV Audio");
        Mp4Dictionary._soundAudioFormats.set("QDMC", "QDesign music");
        Mp4Dictionary._soundAudioFormats.set("QDM2", "QDesign music version 2");
        Mp4Dictionary._soundAudioFormats.set("Qclp", "QUALCOMM PureVoice");
        Mp4Dictionary._soundAudioFormats.set(Uint8Array.of(0x6D, 0x73, 0x00, 0x55).toString(), "MPEG-1 layer 3, CBR only (pre-QT4.1)");
        Mp4Dictionary._soundAudioFormats.set(".mp3", "MPEG-1 layer 3, CBR & VBR (QT4.1 and later)");
        Mp4Dictionary._soundAudioFormats.set("mp4a", "MPEG-4, Advanced Audio Coding (AAC)");
        Mp4Dictionary._soundAudioFormats.set("ac-3", "Digital Audio Compression Standard (AC-3, Enhanced AC-3)");
        Mp4Dictionary._soundAudioFormats.set("aac ", "ISO/IEC 144963-3 AAC");
        Mp4Dictionary._soundAudioFormats.set("agsm", "Apple GSM 10:1");
        Mp4Dictionary._soundAudioFormats.set("alac", "Apple Lossless Audio Codec");
        Mp4Dictionary._soundAudioFormats.set("conv", "Sample Format");
        Mp4Dictionary._soundAudioFormats.set("dvi ", "DV 4:1");
        Mp4Dictionary._soundAudioFormats.set("eqal", "Frequency Equalizer");
        Mp4Dictionary._soundAudioFormats.set("lpc ", "LPC 23:1");
        Mp4Dictionary._soundAudioFormats.set("mixb", "8-bit Mixer");
        Mp4Dictionary._soundAudioFormats.set("mixw", "16-bit Mixer");
        Mp4Dictionary._soundAudioFormats.set(Uint8Array.of(0x4d, 0x53, 0x00, 0x02).toString(), "Microsoft ADPCM");
        Mp4Dictionary._soundAudioFormats.set(Uint8Array.of(0x4d, 0x53, 0x00, 0x11).toString(), "DV IMA");
        Mp4Dictionary._soundAudioFormats.set(Uint8Array.of(0x4d, 0x53, 0x00, 0x55).toString(), "MPEG3");
        Mp4Dictionary._soundAudioFormats.set("ratb", "8-bit Rate");
        Mp4Dictionary._soundAudioFormats.set("ratw", "16-bit Rate");
        Mp4Dictionary._soundAudioFormats.set("sour", "Sound Source");
        Mp4Dictionary._soundAudioFormats.set("str1", "Iomega MPEG layer II");
        Mp4Dictionary._soundAudioFormats.set("str2", "Iomega MPEG *layer II");
        Mp4Dictionary._soundAudioFormats.set("str3", "Iomega MPEG **layer II");
        Mp4Dictionary._soundAudioFormats.set("str4", "Iomega MPEG ***layer II");
        Mp4Dictionary._soundAudioFormats.set("lpcm", "Linear Pulse Code Modulation");
        // Major Brands
        Mp4Dictionary._majorBrands.set("3g2a", "3GPP2 Media (.3G2) compliant with 3GPP2 C.S0050-0 V1.0");
        Mp4Dictionary._majorBrands.set("3g2b", "3GPP2 Media (.3G2) compliant with 3GPP2 C.S0050-A V1.0.0");
        Mp4Dictionary._majorBrands.set("3g2c", "3GPP2 Media (.3G2) compliant with 3GPP2 C.S0050-B v1.0");
        Mp4Dictionary._majorBrands.set("3ge6", "3GPP (.3GP) Release 6 MBMS Extended Presentations");
        Mp4Dictionary._majorBrands.set("3ge7", "3GPP (.3GP) Release 7 MBMS Extended Presentations");
        Mp4Dictionary._majorBrands.set("3gg6", "3GPP Release 6 General Profile");
        Mp4Dictionary._majorBrands.set("3gp1", "3GPP Media (.3GP) Release 1 (probably non-existent)");
        Mp4Dictionary._majorBrands.set("3gp2", "3GPP Media (.3GP) Release 2 (probably non-existent)");
        Mp4Dictionary._majorBrands.set("3gp3", "3GPP Media (.3GP) Release 3 (probably non-existent)");
        Mp4Dictionary._majorBrands.set("3gp4", "3GPP Media (.3GP) Release 4");
        Mp4Dictionary._majorBrands.set("3gp5", "3GPP Media (.3GP) Release 5");
        Mp4Dictionary._majorBrands.set("3gp6", "3GPP Media (.3GP) Release 6 Basic Profile");
        Mp4Dictionary._majorBrands.set("3gp6", "3GPP Media (.3GP) Release 6 Progressive Download");
        Mp4Dictionary._majorBrands.set("3gp6", "3GPP Media (.3GP) Release 6 Streaming Servers");
        Mp4Dictionary._majorBrands.set("3gs7", "3GPP Media (.3GP) Release 7 Streaming Servers");
        Mp4Dictionary._majorBrands.set("avc1", "MP4 Base w/ AVC ext [ISO 14496-12:2005]");
        Mp4Dictionary._majorBrands.set("CAEP", "Canon Digital Camera");
        Mp4Dictionary._majorBrands.set("caqv", "Casio Digital Camera");
        Mp4Dictionary._majorBrands.set("CDes", "Convergent Design");
        Mp4Dictionary._majorBrands.set("da0a", "DMB MAF w/ MPEG Layer II aud, MOT slides, DLS, JPG/PNG/MNG images");
        Mp4Dictionary._majorBrands.set("da0b", "DMB MAF, extending DA0A, with 3GPP timed text, DID, TVA, REL, IPMP");
        Mp4Dictionary._majorBrands.set("da1a", "DMB MAF audio with ER-BSAC audio, JPG/PNG/MNG images");
        Mp4Dictionary._majorBrands.set("da1b", "DMB MAF, extending da1a, with 3GPP timed text, DID, TVA, REL, IPMP");
        Mp4Dictionary._majorBrands.set("da2a", "DMB MAF aud w/ HE-AAC v2 aud, MOT slides, DLS, JPG/PNG/MNG images");
        Mp4Dictionary._majorBrands.set("da2b", "DMB MAF, extending da2a, with 3GPP timed text, DID, TVA, REL, IPMP");
        Mp4Dictionary._majorBrands.set("da3a", "DMB MAF aud with HE-AAC aud, JPG/PNG/MNG images");
        Mp4Dictionary._majorBrands.set("da3b", "DMB MAF, extending da3a w/ BIFS, 3GPP timed text, DID, TVA, REL, IPMP");
        Mp4Dictionary._majorBrands.set("dmb1", "DMB MAF supporting all the components defined in the specification");
        Mp4Dictionary._majorBrands.set("dmpf", "Digital Media Project");
        Mp4Dictionary._majorBrands.set("drc1", "Dirac (wavelet compression), encapsulated in ISO base media (MP4)");
        Mp4Dictionary._majorBrands.set("dv1a", "DMB MAF vid w/ AVC vid, ER-BSAC aud, BIFS, JPG/PNG/MNG images, TS");
        Mp4Dictionary._majorBrands.set("dv1b", "DMB MAF, extending dv1a, with 3GPP timed text, DID, TVA, REL, IPMP");
        Mp4Dictionary._majorBrands.set("dv2a", "DMB MAF vid w/ AVC vid, HE-AAC v2 aud, BIFS, JPG/PNG/MNG images, TS");
        Mp4Dictionary._majorBrands.set("dv2b", "DMB MAF, extending dv2a, with 3GPP timed text, DID, TVA, REL, IPMP");
        Mp4Dictionary._majorBrands.set("dv3a", "DMB MAF vid w/ AVC vid, HE-AAC aud, BIFS, JPG/PNG/MNG images, TS");
        Mp4Dictionary._majorBrands.set("dv3b", "DMB MAF, extending dv3a, with 3GPP timed text, DID, TVA, REL, IPMP");
        Mp4Dictionary._majorBrands.set("dvr1", "DVB (.DVB) over RTP");
        Mp4Dictionary._majorBrands.set("dvt1", "DVB (.DVB) over MPEG-2 Transport Stream");
        Mp4Dictionary._majorBrands.set("F4V ", "Video for Adobe Flash Player 9+ (.F4V)");
        Mp4Dictionary._majorBrands.set("F4P ", "Protected Video for Adobe Flash Player 9+ (.F4P)");
        Mp4Dictionary._majorBrands.set("F4A ", "Audio for Adobe Flash Player 9+ (.F4A)");
        Mp4Dictionary._majorBrands.set("F4B ", "Audio Book for Adobe Flash Player 9+ (.F4B)");
        Mp4Dictionary._majorBrands.set("isc2", "ISMACryp 2.0 Encrypted File");
        Mp4Dictionary._majorBrands.set("iso2", "MP4 Base Media v2 [ISO 14496-12:2005]");
        Mp4Dictionary._majorBrands.set("isom", "MP4  Base Media v1 [IS0 14496-12:2003]");
        Mp4Dictionary._majorBrands.set("JP2 ", "JPEG 2000 Image (.JP2) [ISO 15444-1 ?]");
        Mp4Dictionary._majorBrands.set("JP20", "Unknown, from GPAC samples (prob non-existent)");
        Mp4Dictionary._majorBrands.set("jpm ", "JPEG 2000 Compound Image (.JPM) [ISO 15444-6]");
        Mp4Dictionary._majorBrands.set("jpx ", "JPEG 2000 w/ extensions (.JPX) [ISO 15444-2]");
        Mp4Dictionary._majorBrands.set("KDDI", "3GPP2 EZmovie for KDDI 3G cellphones");
        Mp4Dictionary._majorBrands.set("M4A ", "Apple iTunes AAC-LC (.M4A) Audio");
        Mp4Dictionary._majorBrands.set("M4B ", "Apple iTunes AAC-LC (.M4B) Audio Book");
        Mp4Dictionary._majorBrands.set("M4P ", "Apple iTunes AAC-LC (.M4P) AES Protected Audio");
        Mp4Dictionary._majorBrands.set("M4V ", "Apple iTunes Video (.M4V) Video");
        Mp4Dictionary._majorBrands.set("M4VH", "Apple TV (.M4V)");
        Mp4Dictionary._majorBrands.set("M4VP", "Apple iPhone (.M4V)");
        Mp4Dictionary._majorBrands.set("mj2s", "Motion JPEG 2000 [ISO 15444-3] Simple Profile");
        Mp4Dictionary._majorBrands.set("mjp2", "Motion JPEG 2000 [ISO 15444-3] General Profile");
        Mp4Dictionary._majorBrands.set("mmp4", "MPEG-4/3GPP Mobile Profile (.MP4 / .3GP) (for NTT)");
        Mp4Dictionary._majorBrands.set("mp21", "MPEG-21 [ISO/IEC 21000-9]");
        Mp4Dictionary._majorBrands.set("mp41", "MP4 v1 [ISO 14496-1:ch13]");
        Mp4Dictionary._majorBrands.set("mp42", "MP4 v2 [ISO 14496-14]");
        Mp4Dictionary._majorBrands.set("mp71", "MP4 w/ MPEG-7 Metadata [per ISO 14496-12]");
        Mp4Dictionary._majorBrands.set("MPPI", "Photo Player, MAF [ISO/IEC 23000-3]");
        Mp4Dictionary._majorBrands.set("mqt ", "Sony / Mobile QuickTime (.MQV)  US Patent 7,477,830 (Sony Corp)");
        Mp4Dictionary._majorBrands.set("MSNV", "MPEG-4 (.MP4) for SonyPSP");
        Mp4Dictionary._majorBrands.set("NDAS", "MP4 v2 [ISO 14496-14] Nero Digital AAC Audio");
        Mp4Dictionary._majorBrands.set("NDSC", "MPEG-4 (.MP4) Nero Cinema Profile");
        Mp4Dictionary._majorBrands.set("NDSH", "MPEG-4 (.MP4) Nero HDTV Profile");
        Mp4Dictionary._majorBrands.set("NDSM", "MPEG-4 (.MP4) Nero Mobile Profile");
        Mp4Dictionary._majorBrands.set("NDSP", "MPEG-4 (.MP4) Nero Portable Profile");
        Mp4Dictionary._majorBrands.set("NDSS", "MPEG-4 (.MP4) Nero Standard Profile");
        Mp4Dictionary._majorBrands.set("NDXC", "H.264/MPEG-4 AVC (.MP4) Nero Cinema Profile");
        Mp4Dictionary._majorBrands.set("NDXH", "H.264/MPEG-4 AVC (.MP4) Nero HDTV Profile");
        Mp4Dictionary._majorBrands.set("NDXM", "H.264/MPEG-4 AVC (.MP4) Nero Mobile Profile");
        Mp4Dictionary._majorBrands.set("NDXP", "H.264/MPEG-4 AVC (.MP4) Nero Portable Profile");
        Mp4Dictionary._majorBrands.set("NDXS", "H.264/MPEG-4 AVC (.MP4) Nero Standard Profile");
        Mp4Dictionary._majorBrands.set("odcf", "OMA DCF DRM Format 2.0 (OMA-TS-DRM-DCF-V2_0-20060303-A)");
        Mp4Dictionary._majorBrands.set("opf2", "OMA PDCF DRM Format 2.1 (OMA-TS-DRM-DCF-V2_1-20070724-C)");
        Mp4Dictionary._majorBrands.set("opx2", "OMA PDCF DRM + XBS extensions (OMA-TS-DRM_XBS-V1_0-20070529-C)");
        Mp4Dictionary._majorBrands.set("pana", "Panasonic Digital Camera");
        Mp4Dictionary._majorBrands.set("qt  ", "Apple QuickTime (.MOV/QT)");
        Mp4Dictionary._majorBrands.set("ROSS", "Ross Video");
        Mp4Dictionary._majorBrands.set("sdv ", "SD Memory Card Video");
        Mp4Dictionary._majorBrands.set("ssc1", "Samsung stereoscopic, single stream (patent pending, see notes)");
        Mp4Dictionary._majorBrands.set("ssc2", "Samsung stereoscopic, dual stream (patent pending, see notes)");
        // Vendor ID's https://sno.phy.queensu.ca/~phil/exiftool/TagNames/QuickTime.html#Meta
        Mp4Dictionary._vendorIds.set(" KD ", "Kodak");
        Mp4Dictionary._vendorIds.set("AR.D", "Parrot AR.Drone");
        Mp4Dictionary._vendorIds.set("FFMP", "FFmpeg");
        Mp4Dictionary._vendorIds.set("GIC ", "General Imaging Co.");
        Mp4Dictionary._vendorIds.set("KMPI", "Konica-Minolta");
        Mp4Dictionary._vendorIds.set("NIKO", "Nikon");
        Mp4Dictionary._vendorIds.set("SMI ", "Sorenson Media Inc.");
        Mp4Dictionary._vendorIds.set("ZORA", "Zoran Corporation");
        Mp4Dictionary._vendorIds.set("appl", "Apple");
        Mp4Dictionary._vendorIds.set("fe20", "Olympus (fe20)");
        Mp4Dictionary._vendorIds.set("kdak", "Kodak");
        Mp4Dictionary._vendorIds.set("leic", "Leica");
        Mp4Dictionary._vendorIds.set("mino", "Minolta");
        Mp4Dictionary._vendorIds.set("niko", "Nikon");
        Mp4Dictionary._vendorIds.set("olym", "Olympus");
        Mp4Dictionary._vendorIds.set("pana", "Panasonic");
        Mp4Dictionary._vendorIds.set("pent", "Pentax");
        Mp4Dictionary._vendorIds.set("pr01", "Olympus (pr01)");
        Mp4Dictionary._vendorIds.set("sany", "Sanyo");
    }
    public static lookup(scope: number, lookup: string): string {
        Mp4Dictionary.init();
        if (Mp4Dictionary._dictionary.has(scope) && Mp4Dictionary._dictionary.get(scope).has(lookup)) {
            return Mp4Dictionary._dictionary.get(scope).get(lookup);
        }
        else {
            return "Unknown";
        }
    }
    public static setLookup(scope: number, lookup: string, directory: Mp4Directory): void {
        let results = Mp4Dictionary.lookup(scope, lookup);
        directory.setString(scope, results);
    }
}
export default Mp4Dictionary;
