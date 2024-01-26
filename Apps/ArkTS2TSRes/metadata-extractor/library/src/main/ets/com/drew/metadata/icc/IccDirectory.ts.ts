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
import IccDescriptor from './IccDescriptor';
class IccDirectory extends Directory {
    // These (smaller valued) tags have an integer value that's equal to their offset within the ICC data buffer.
    public static readonly TAG_PROFILE_BYTE_COUNT: number = 0;
    public static readonly TAG_CMM_TYPE: number = 4;
    public static readonly TAG_PROFILE_VERSION: number = 8;
    public static readonly TAG_PROFILE_CLASS: number = 12;
    public static readonly TAG_COLOR_SPACE: number = 16;
    public static readonly TAG_PROFILE_CONNECTION_SPACE: number = 20;
    public static readonly TAG_PROFILE_DATETIME: number = 24;
    public static readonly TAG_SIGNATURE: number = 36;
    public static readonly TAG_PLATFORM: number = 40;
    public static readonly TAG_CMM_FLAGS: number = 44;
    public static readonly TAG_DEVICE_MAKE: number = 48;
    public static readonly TAG_DEVICE_MODEL: number = 52;
    public static readonly TAG_DEVICE_ATTR: number = 56;
    public static readonly TAG_RENDERING_INTENT: number = 64;
    public static readonly TAG_XYZ_VALUES: number = 68;
    public static readonly TAG_PROFILE_CREATOR: number = 80;
    public static readonly TAG_TAG_COUNT: number = 128;
    // These tag values
    public static readonly TAG_TAG_A2B0: number = 0x41324230;
    public static readonly TAG_TAG_A2B1: number = 0x41324231;
    public static readonly TAG_TAG_A2B2: number = 0x41324232;
    public static readonly TAG_TAG_bXYZ: number = 0x6258595A;
    public static readonly TAG_TAG_bTRC: number = 0x62545243;
    public static readonly TAG_TAG_B2A0: number = 0x42324130;
    public static readonly TAG_TAG_B2A1: number = 0x42324131;
    public static readonly TAG_TAG_B2A2: number = 0x42324132;
    public static readonly TAG_TAG_calt: number = 0x63616C74;
    public static readonly TAG_TAG_targ: number = 0x74617267;
    public static readonly TAG_TAG_chad: number = 0x63686164;
    public static readonly TAG_TAG_chrm: number = 0x6368726D;
    public static readonly TAG_TAG_cprt: number = 0x63707274;
    public static readonly TAG_TAG_crdi: number = 0x63726469;
    public static readonly TAG_TAG_dmnd: number = 0x646D6E64;
    public static readonly TAG_TAG_dmdd: number = 0x646D6464;
    public static readonly TAG_TAG_devs: number = 0x64657673;
    public static readonly TAG_TAG_gamt: number = 0x67616D74;
    public static readonly TAG_TAG_kTRC: number = 0x6B545243;
    public static readonly TAG_TAG_gXYZ: number = 0x6758595A;
    public static readonly TAG_TAG_gTRC: number = 0x67545243;
    public static readonly TAG_TAG_lumi: number = 0x6C756D69;
    public static readonly TAG_TAG_meas: number = 0x6D656173;
    public static readonly TAG_TAG_bkpt: number = 0x626B7074;
    public static readonly TAG_TAG_wtpt: number = 0x77747074;
    public static readonly TAG_TAG_ncol: number = 0x6E636F6C;
    public static readonly TAG_TAG_ncl2: number = 0x6E636C32;
    public static readonly TAG_TAG_resp: number = 0x72657370;
    public static readonly TAG_TAG_pre0: number = 0x70726530;
    public static readonly TAG_TAG_pre1: number = 0x70726531;
    public static readonly TAG_TAG_pre2: number = 0x70726532;
    public static readonly TAG_TAG_desc: number = 0x64657363;
    public static readonly TAG_TAG_pseq: number = 0x70736571;
    public static readonly TAG_TAG_psd0: number = 0x70736430;
    public static readonly TAG_TAG_psd1: number = 0x70736431;
    public static readonly TAG_TAG_psd2: number = 0x70736432;
    public static readonly TAG_TAG_psd3: number = 0x70736433;
    public static readonly TAG_TAG_ps2s: number = 0x70733273;
    public static readonly TAG_TAG_ps2i: number = 0x70733269;
    public static readonly TAG_TAG_rXYZ: number = 0x7258595A;
    public static readonly TAG_TAG_rTRC: number = 0x72545243;
    public static readonly TAG_TAG_scrd: number = 0x73637264;
    public static readonly TAG_TAG_scrn: number = 0x7363726E;
    public static readonly TAG_TAG_tech: number = 0x74656368;
    public static readonly TAG_TAG_bfd: number = 0x62666420;
    public static readonly TAG_TAG_vued: number = 0x76756564;
    public static readonly TAG_TAG_view: number = 0x76696577;
    public static readonly TAG_TAG_aabg: number = 0x61616267;
    public static readonly TAG_TAG_aagg: number = 0x61616767;
    public static readonly TAG_TAG_aarg: number = 0x61617267;
    public static readonly TAG_TAG_mmod: number = 0x6D6D6F64;
    public static readonly TAG_TAG_ndin: number = 0x6E64696E;
    public static readonly TAG_TAG_vcgt: number = 0x76636774;
    public static readonly TAG_APPLE_MULTI_LANGUAGE_PROFILE_NAME: number = 0x6473636d;
    private static readonly _tagNameMap: Map<number, string> = new Map<number, string>()
        .set(IccDirectory.TAG_PROFILE_BYTE_COUNT, "Profile Size")
        .set(IccDirectory.TAG_CMM_TYPE, "CMM Type")
        .set(IccDirectory.TAG_PROFILE_VERSION, "Version")
        .set(IccDirectory.TAG_PROFILE_CLASS, "Class")
        .set(IccDirectory.TAG_COLOR_SPACE, "Color space")
        .set(IccDirectory.TAG_PROFILE_CONNECTION_SPACE, "Profile Connection Space")
        .set(IccDirectory.TAG_PROFILE_DATETIME, "Profile Date/Time")
        .set(IccDirectory.TAG_SIGNATURE, "Signature")
        .set(IccDirectory.TAG_PLATFORM, "Primary Platform")
        .set(IccDirectory.TAG_CMM_FLAGS, "CMM Flags")
        .set(IccDirectory.TAG_DEVICE_MAKE, "Device manufacturer")
        .set(IccDirectory.TAG_DEVICE_MODEL, "Device model")
        .set(IccDirectory.TAG_DEVICE_ATTR, "Device attributes")
        .set(IccDirectory.TAG_RENDERING_INTENT, "Rendering Intent")
        .set(IccDirectory.TAG_XYZ_VALUES, "XYZ values")
        .set(IccDirectory.TAG_PROFILE_CREATOR, "Profile Creator")
        .set(IccDirectory.TAG_TAG_COUNT, "Tag Count")
        .set(IccDirectory.TAG_TAG_A2B0, "AToB 0")
        .set(IccDirectory.TAG_TAG_A2B1, "AToB 1")
        .set(IccDirectory.TAG_TAG_A2B2, "AToB 2")
        .set(IccDirectory.TAG_TAG_bXYZ, "Blue Colorant")
        .set(IccDirectory.TAG_TAG_bTRC, "Blue TRC")
        .set(IccDirectory.TAG_TAG_B2A0, "BToA 0")
        .set(IccDirectory.TAG_TAG_B2A1, "BToA 1")
        .set(IccDirectory.TAG_TAG_B2A2, "BToA 2")
        .set(IccDirectory.TAG_TAG_calt, "Calibration Date/Time")
        .set(IccDirectory.TAG_TAG_targ, "Char Target")
        .set(IccDirectory.TAG_TAG_chad, "Chromatic Adaptation")
        .set(IccDirectory.TAG_TAG_chrm, "Chromaticity")
        .set(IccDirectory.TAG_TAG_cprt, "Profile Copyright")
        .set(IccDirectory.TAG_TAG_crdi, "CrdInfo")
        .set(IccDirectory.TAG_TAG_dmnd, "Device Mfg Description")
        .set(IccDirectory.TAG_TAG_dmdd, "Device Model Description")
        .set(IccDirectory.TAG_TAG_devs, "Device Settings")
        .set(IccDirectory.TAG_TAG_gamt, "Gamut")
        .set(IccDirectory.TAG_TAG_kTRC, "Gray TRC")
        .set(IccDirectory.TAG_TAG_gXYZ, "Green Colorant")
        .set(IccDirectory.TAG_TAG_gTRC, "Green TRC")
        .set(IccDirectory.TAG_TAG_lumi, "Luminance")
        .set(IccDirectory.TAG_TAG_meas, "Measurement")
        .set(IccDirectory.TAG_TAG_bkpt, "Media Black Point")
        .set(IccDirectory.TAG_TAG_wtpt, "Media White Point")
        .set(IccDirectory.TAG_TAG_ncol, "Named Color")
        .set(IccDirectory.TAG_TAG_ncl2, "Named Color 2")
        .set(IccDirectory.TAG_TAG_resp, "Output Response")
        .set(IccDirectory.TAG_TAG_pre0, "Preview 0")
        .set(IccDirectory.TAG_TAG_pre1, "Preview 1")
        .set(IccDirectory.TAG_TAG_pre2, "Preview 2")
        .set(IccDirectory.TAG_TAG_desc, "Profile Description")
        .set(IccDirectory.TAG_TAG_pseq, "Profile Sequence Description")
        .set(IccDirectory.TAG_TAG_psd0, "Ps2 CRD 0")
        .set(IccDirectory.TAG_TAG_psd1, "Ps2 CRD 1")
        .set(IccDirectory.TAG_TAG_psd2, "Ps2 CRD 2")
        .set(IccDirectory.TAG_TAG_psd3, "Ps2 CRD 3")
        .set(IccDirectory.TAG_TAG_ps2s, "Ps2 CSA")
        .set(IccDirectory.TAG_TAG_ps2i, "Ps2 Rendering Intent")
        .set(IccDirectory.TAG_TAG_rXYZ, "Red Colorant")
        .set(IccDirectory.TAG_TAG_rTRC, "Red TRC")
        .set(IccDirectory.TAG_TAG_scrd, "Screening Desc")
        .set(IccDirectory.TAG_TAG_scrn, "Screening")
        .set(IccDirectory.TAG_TAG_tech, "Technology")
        .set(IccDirectory.TAG_TAG_bfd, "Ucrbg")
        .set(IccDirectory.TAG_TAG_vued, "Viewing Conditions Description")
        .set(IccDirectory.TAG_TAG_view, "Viewing Conditions")
        .set(IccDirectory.TAG_TAG_aabg, "Blue Parametric TRC")
        .set(IccDirectory.TAG_TAG_aagg, "Green Parametric TRC")
        .set(IccDirectory.TAG_TAG_aarg, "Red Parametric TRC")
        .set(IccDirectory.TAG_TAG_mmod, "Make And Model")
        .set(IccDirectory.TAG_TAG_ndin, "Native Display Information")
        .set(IccDirectory.TAG_TAG_vcgt, "Video Card Gamma")
        .set(IccDirectory.TAG_APPLE_MULTI_LANGUAGE_PROFILE_NAME, "Apple Multi-language Profile Name");
    public constructor() {
        super();
        this.setDescriptor(new IccDescriptor(this));
    }
    public getName(): string {
        return "ICC Profile";
    }
    protected getTagNameMap(): Map<number, string> {
        return IccDirectory._tagNameMap;
    }
}
export default IccDirectory;
