/*
* Copyright (C) 2022 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import Directory from '../Directory';
import WavDescriptor from './WavDescriptor'

/**
 * Holds basic metadata from Wav files including some ID3 tags
 */
class WavDirectory extends Directory {
  public static readonly TAG_FORMAT: number = 1;
  public static readonly TAG_CHANNELS: number = 2;
  public static readonly TAG_SAMPLES_PER_SEC: number = 3;
  public static readonly TAG_BYTES_PER_SEC: number = 4;
  public static readonly TAG_BLOCK_ALIGNMENT: number = 5;
  public static readonly TAG_BITS_PER_SAMPLE: number = 6;
  public static readonly TAG_ARTIST: number = 7;
  public static readonly TAG_TITLE: number = 8;
  public static readonly TAG_PRODUCT: number = 9;
  public static readonly TAG_TRACK_NUMBER: number = 10;
  public static readonly TAG_DATE_CREATED: number = 11;
  public static readonly TAG_GENRE: number = 12;
  public static readonly TAG_COMMENTS: number = 13;
  public static readonly TAG_COPYRIGHT: number = 14;
  public static readonly TAG_SOFTWARE: number = 15;
  public static readonly TAG_DURATION: number = 16;
  public static readonly CHUNK_FORMAT: string = "fmt ";
  public static readonly CHUNK_DATA: string = "data";
  public static readonly LIST_INFO: string = "INFO";
  public static readonly FORMAT: string = "WAVE";
  public static readonly _tagNameMap: Map<number, string> = new Map<number, string>([
    [WavDirectory.TAG_FORMAT, "Format"],
    [WavDirectory.TAG_CHANNELS, "Channels"],
    [WavDirectory.TAG_SAMPLES_PER_SEC, "Samples Per Second"],
    [WavDirectory.TAG_BYTES_PER_SEC, "Bytes Per Second"],
    [WavDirectory.TAG_BLOCK_ALIGNMENT, "Block Alignment"],
    [WavDirectory.TAG_BITS_PER_SAMPLE, "Bits Per Sample"],
    [WavDirectory.TAG_ARTIST, "Artist"],
    [WavDirectory.TAG_TITLE, "Title"],
    [WavDirectory.TAG_PRODUCT, "Product"],
    [WavDirectory.TAG_TRACK_NUMBER, "Track Number"],
    [WavDirectory.TAG_DATE_CREATED, "Date Created"],
    [WavDirectory.TAG_GENRE, "Genre"],
    [WavDirectory.TAG_COMMENTS, "Comments"],
    [WavDirectory.TAG_COPYRIGHT, "Copyright"],
    [WavDirectory.TAG_SOFTWARE, "Software"],
    [WavDirectory.TAG_DURATION, "Duration"]
  ]);
  public static readonly _tagIntegerMap: Map<string, number> = new Map<string, number>([
    ["IART", WavDirectory.TAG_ARTIST],
    ["INAM", WavDirectory.TAG_TITLE],
    ["IPRD", WavDirectory.TAG_PRODUCT],
    ["ITRK", WavDirectory.TAG_TRACK_NUMBER],
    ["ICRD", WavDirectory.TAG_DATE_CREATED],
    ["IGNR", WavDirectory.TAG_GENRE],
    ["ICMT", WavDirectory.TAG_COMMENTS],
    ["ICOP", WavDirectory.TAG_COPYRIGHT],
    ["ISFT", WavDirectory.TAG_SOFTWARE]
  ]);
  public static readonly _audioEncodingMap: Map<number, string> = new Map<number, string>([
    [0x1, "Microsoft PCM"],
    [0x2, "Microsoft ADPCM"],
    [0x3, "Microsoft IEEE float"],
    [0x4, "Compaq VSELP"],
    [0x5, "IBM CVSD"],
    [0x6, "Microsoft a-Law"],
    [0x7, "Microsoft u-Law"],
    [0x8, "Microsoft DTS"],
    [0x9, "DRM"],
    [0xa, "WMA 9 Speech"],
    [0xb, "Microsoft Windows Media RT Voice"],
    [0x10, "OKI-ADPCM"],
    [0x11, "Intel IMA/DVI-ADPCM"],
    [0x12, "Videologic Mediaspace ADPCM"],
    [0x13, "Sierra ADPCM"],
    [0x14, "Antex G.723 ADPCM"],
    [0x15, "DSP Solutions DIGISTD"],
    [0x16, "DSP Solutions DIGIFIX"],
    [0x17, "Dialoic OKI ADPCM"],
    [0x18, "Media Vision ADPCM"],
    [0x19, "HP CU"],
    [0x1a, "HP Dynamic Voice"],
    [0x20, "Yamaha ADPCM"],
    [0x21, "SONARC Speech Compression"],
    [0x22, "DSP Group True Speech"],
    [0x23, "Echo Speech Corp."],
    [0x24, "Virtual Music Audiofile AF36"],
    [0x25, "Audio Processing Tech."],
    [0x26, "Virtual Music Audiofile AF10"],
    [0x27, "Aculab Prosody 1612"],
    [0x28, "Merging Tech. LRC"],
    [0x30, "Dolby AC2"],
    [0x31, "Microsoft GSM610"],
    [0x32, "MSN Audio"],
    [0x33, "Antex ADPCME"],
    [0x34, "Control Resources VQLPC"],
    [0x35, "DSP Solutions DIGIREAL"],
    [0x36, "DSP Solutions DIGIADPCM"],
    [0x37, "Control Resources CR10"],
    [0x38, "Natural MicroSystems VBX ADPCM"],
    [0x39, "Crystal Semiconductor IMA ADPCM"],
    [0x3a, "Echo Speech ECHOSC3"],
    [0x3b, "Rockwell ADPCM"],
    [0x3c, "Rockwell DIGITALK"],
    [0x3d, "Xebec Multimedia"],
    [0x40, "Antex G.721 ADPCM"],
    [0x41, "Antex G.728 CELP"],
    [0x42, "Microsoft MSG723"],
    [0x43, "IBM AVC ADPCM"],
    [0x45, "ITU-T G.726"],
    [0x50, "Microsoft MPEG"],
    [0x51, "RT23 or PAC"],
    [0x52, "InSoft RT24"],
    [0x53, "InSoft PAC"],
    [0x55, "MP3"],
    [0x59, "Cirrus"],
    [0x60, "Cirrus Logic"],
    [0x61, "ESS Tech. PCM"],
    [0x62, "Voxware Inc."],
    [0x63, "Canopus ATRAC"],
    [0x64, "APICOM G.726 ADPCM"],
    [0x65, "APICOM G.722 ADPCM"],
    [0x66, "Microsoft DSAT"],
    [0x67, "Micorsoft DSAT DISPLAY"],
    [0x69, "Voxware Byte Aligned"],
    [0x70, "Voxware AC8"],
    [0x71, "Voxware AC10"],
    [0x72, "Voxware AC16"],
    [0x73, "Voxware AC20"],
    [0x74, "Voxware MetaVoice"],
    [0x75, "Voxware MetaSound"],
    [0x76, "Voxware RT29HW"],
    [0x77, "Voxware VR12"],
    [0x78, "Voxware VR18"],
    [0x79, "Voxware TQ40"],
    [0x7a, "Voxware SC3"],
    [0x7b, "Voxware SC3"],
    [0x80, "Soundsoft"],
    [0x81, "Voxware TQ60"],
    [0x82, "Microsoft MSRT24"],
    [0x83, "AT&T G.729A"],
    [0x84, "Motion Pixels MVI MV12"],
    [0x85, "DataFusion G.726"],
    [0x86, "DataFusion GSM610"],
    [0x88, "Iterated Systems Audio"],
    [0x89, "Onlive"],
    [0x8a, "Multitude, Inc. FT SX20"],
    [0x8b, "Infocom ITS A/S G.721 ADPCM"],
    [0x8c, "Convedia G729"],
    [0x8d, "Not specified congruency, Inc."],
    [0x91, "Siemens SBC24"],
    [0x92, "Sonic Foundry Dolby AC3 APDIF"],
    [0x93, "MediaSonic G.723"],
    [0x94, "Aculab Prosody 8kbps"],
    [0x97, "ZyXEL ADPCM"],
    [0x98, "Philips LPCBB"],
    [0x99, "Studer Professional Audio Packed"],
    [0xa0, "Malden PhonyTalk"],
    [0xa1, "Racal Recorder GSM"],
    [0xa2, "Racal Recorder G720.a"],
    [0xa3, "Racal G723.1"],
    [0xa4, "Racal Tetra ACELP"],
    [0xb0, "NEC AAC NEC Corporation"],
    [0xff, "AAC"],
    [0x100, "Rhetorex ADPCM"],
    [0x101, "IBM u-Law"],
    [0x102, "IBM a-Law"],
    [0x103, "IBM ADPCM"],
    [0x111, "Vivo G.723"],
    [0x112, "Vivo Siren"],
    [0x120, "Philips Speech Processing CELP"],
    [0x121, "Philips Speech Processing GRUNDIG"],
    [0x123, "Digital G.723"],
    [0x125, "Sanyo LD ADPCM"],
    [0x130, "Sipro Lab ACEPLNET"],
    [0x131, "Sipro Lab ACELP4800"],
    [0x132, "Sipro Lab ACELP8V3"],
    [0x133, "Sipro Lab G.729"],
    [0x134, "Sipro Lab G.729A"],
    [0x135, "Sipro Lab Kelvin"],
    [0x136, "VoiceAge AMR"],
    [0x140, "Dictaphone G.726 ADPCM"],
    [0x150, "Qualcomm PureVoice"],
    [0x151, "Qualcomm HalfRate"],
    [0x155, "Ring Zero Systems TUBGSM"],
    [0x160, "Microsoft Audio1"],
    [0x161, "Windows Media Audio V2 V7 V8 V9 / DivX audio (WMA) / Alex AC3 Audio"],
    [0x162, "Windows Media Audio Professional V9"],
    [0x163, "Windows Media Audio Lossless V9"],
    [0x164, "WMA Pro over S/PDIF"],
    [0x170, "UNISYS NAP ADPCM"],
    [0x171, "UNISYS NAP ULAW"],
    [0x172, "UNISYS NAP ALAW"],
    [0x173, "UNISYS NAP 16K"],
    [0x174, "MM SYCOM ACM SYC008 SyCom Technologies"],
    [0x175, "MM SYCOM ACM SYC701 G726L SyCom Technologies"],
    [0x176, "MM SYCOM ACM SYC701 CELP54 SyCom Technologies"],
    [0x177, "MM SYCOM ACM SYC701 CELP68 SyCom Technologies"],
    [0x178, "Knowledge Adventure ADPCM"],
    [0x180, "Fraunhofer IIS MPEG2AAC"],
    [0x190, "Digital Theater Systems DTS DS"],
    [0x200, "Creative Labs ADPCM"],
    [0x202, "Creative Labs FASTSPEECH8"],
    [0x203, "Creative Labs FASTSPEECH10"],
    [0x210, "UHER ADPCM"],
    [0x215, "Ulead DV ACM"],
    [0x216, "Ulead DV ACM"],
    [0x220, "Quarterdeck Corp."],
    [0x230, "I-Link VC"],
    [0x240, "Aureal Semiconductor Raw Sport"],
    [0x241, "ESST AC3"],
    [0x250, "Interactive Products HSX"],
    [0x251, "Interactive Products RPELP"],
    [0x260, "Consistent CS2"],
    [0x270, "Sony SCX"],
    [0x271, "Sony SCY"],
    [0x272, "Sony ATRAC3"],
    [0x273, "Sony SPC"],
    [0x280, "TELUM Telum Inc."],
    [0x281, "TELUMIA Telum Inc."],
    [0x285, "Norcom Voice Systems ADPCM"],
    [0x300, "Fujitsu FM TOWNS SND"],
    [0x301, "Fujitsu (not specified)"],
    [0x302, "Fujitsu (not specified)"],
    [0x303, "Fujitsu (not specified)"],
    [0x304, "Fujitsu (not specified)"],
    [0x305, "Fujitsu (not specified)"],
    [0x306, "Fujitsu (not specified)"],
    [0x307, "Fujitsu (not specified)"],
    [0x308, "Fujitsu (not specified)"],
    [0x350, "Micronas Semiconductors, Inc. Development"],
    [0x351, "Micronas Semiconductors, Inc. CELP833"],
    [0x400, "Brooktree Digital"],
    [0x401, "Intel Music Coder (IMC)"],
    [0x402, "Ligos Indeo Audio"],
    [0x450, "QDesign Music"],
    [0x500, "On2 VP7 On2 Technologies"],
    [0x501, "On2 VP6 On2 Technologies"],
    [0x680, "AT&T VME VMPCM"],
    [0x681, "AT&T TCP"],
    [0x700, "YMPEG Alpha (dummy for MPEG-2 compressor)"],
    [0x8ae, "ClearJump LiteWave (lossless)"],
    [0x1000, "Olivetti GSM"],
    [0x1001, "Olivetti ADPCM"],
    [0x1002, "Olivetti CELP"],
    [0x1003, "Olivetti SBC"],
    [0x1004, "Olivetti OPR"],
    [0x1100, "Lernout & Hauspie"],
    [0x1101, "Lernout & Hauspie CELP codec"],
    [0x1102, "Lernout & Hauspie SBC codec"],
    [0x1103, "Lernout & Hauspie SBC codec"],
    [0x1104, "Lernout & Hauspie SBC codec"],
    [0x1400, "Norris Comm. Inc."],
    [0x1401, "ISIAudio"],
    [0x1500, "AT&T Soundspace Music Compression"],
    [0x181c, "VoxWare RT24 speech codec"],
    [0x181e, "Lucent elemedia AX24000P Music codec"],
    [0x1971, "Sonic Foundry LOSSLESS"],
    [0x1979, "Innings Telecom Inc. ADPCM"],
    [0x1c07, "Lucent SX8300P speech codec"],
    [0x1c0c, "Lucent SX5363S G.723 compliant codec"],
    [0x1f03, "CUseeMe DigiTalk (ex-Rocwell)"],
    [0x1fc4, "NCT Soft ALF2CD ACM"],
    [0x2000, "FAST Multimedia DVM"],
    [0x2001, "Dolby DTS (Digital Theater System)"],
    [0x2002, "RealAudio 1 / 2 14.4"],
    [0x2003, "RealAudio 1 / 2 28.8"],
    [0x2004, "RealAudio G2 / 8 Cook (low bitrate)"],
    [0x2005, "RealAudio 3 / 4 / 5 Music (DNET)"],
    [0x2006, "RealAudio 10 AAC (RAAC)"],
    [0x2007, "RealAudio 10 AAC+ (RACP)"],
    [0x2500, "Reserved range to 0x2600 Microsoft"],
    [0x3313, "makeAVIS (ffvfw fake AVI sound from AviSynth scripts)"],
    [0x4143, "Divio MPEG-4 AAC audio"],
    [0x4201, "Nokia adaptive multirate"],
    [0x4243, "Divio G726 Divio, Inc."],
    [0x434c, "LEAD Speech"],
    [0x564c, "LEAD Vorbis"],
    [0x5756, "WavPack Audio"],
    [0x674f, "Ogg Vorbis (mode 1)"],
    [0x6750, "Ogg Vorbis (mode 2)"],
    [0x6751, "Ogg Vorbis (mode 3)"],
    [0x676f, "Ogg Vorbis (mode 1+)"],
    [0x6770, "Ogg Vorbis (mode 2+)"],
    [0x6771, "Ogg Vorbis (mode 3+)"],
    [0x7000, "3COM NBX 3Com Corporation"],
    [0x706d, "FAAD AAC"],
    [0x7a21, "GSM-AMR (CBR, no SID)"],
    [0x7a22, "GSM-AMR (VBR, including SID)"],
    [0xa100, "Comverse Infosys Ltd. G723 1"],
    [0xa101, "Comverse Infosys Ltd. AVQSBC"],
    [0xa102, "Comverse Infosys Ltd. OLDSBC"],
    [0xa103, "Symbol Technologies G729A"],
    [0xa104, "VoiceAge AMR WB VoiceAge Corporation"],
    [0xa105, "Ingenient Technologies Inc. G726"],
    [0xa106, "ISO/MPEG-4 advanced audio Coding"],
    [0xa107, "Encore Software Ltd G726"],
    [0xa109, "Speex ACM Codec xiph.org"],
    [0xdfac, "DebugMode SonicFoundry Vegas FrameServer ACM Codec"],
    [0xe708, "Unknown -"],
    [0xf1ac, "Free Lossless Audio Codec FLAC"],
    [0xfffe, "Extensible"],
    [0xffff, "Development"]
  ]);

  public constructor () {
    super()
    this.setDescriptor(new WavDescriptor(this));
  }

  public getName() {
    return "WAV";
  }

  protected getTagNameMap(): Map<number, string> {
    return WavDirectory._tagNameMap;
  }
}

export default WavDirectory
