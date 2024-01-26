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

import Directory from '../Directory'
import PhotoshopDescriptor from './PhotoshopDescriptor'

class PhotoshopDirectory extends Directory {
  public static TAG_CHANNELS_ROWS_COLUMNS_DEPTH_MODE                  = 0x03E8;
  public static TAG_MAC_PRINT_INFO                                    = 0x03E9;
  public static TAG_XML                                               = 0x03EA;
  public static TAG_INDEXED_COLOR_TABLE                               = 0x03EB;
  public static TAG_RESOLUTION_INFO                                   = 0x03ED;
  public static TAG_ALPHA_CHANNELS                                    = 0x03EE;
  public static TAG_DISPLAY_INFO_OBSOLETE                             = 0x03EF;
  public static TAG_CAPTION                                           = 0x03F0;
  public static TAG_BORDER_INFORMATION                                = 0x03F1;
  public static TAG_BACKGROUND_COLOR                                  = 0x03F2;
  public static TAG_PRINT_FLAGS                                       = 0x03F3;
  public static TAG_GRAYSCALE_AND_MULTICHANNEL_HALFTONING_INFORMATION = 0x03F4;
  public static TAG_COLOR_HALFTONING_INFORMATION                      = 0x03F5;
  public static TAG_DUOTONE_HALFTONING_INFORMATION                    = 0x03F6;
  public static TAG_GRAYSCALE_AND_MULTICHANNEL_TRANSFER_FUNCTION      = 0x03F7;
  public static TAG_COLOR_TRANSFER_FUNCTIONS                          = 0x03F8;
  public static TAG_DUOTONE_TRANSFER_FUNCTIONS                        = 0x03F9;
  public static TAG_DUOTONE_IMAGE_INFORMATION                         = 0x03FA;
  public static TAG_EFFECTIVE_BLACK_AND_WHITE_VALUES                  = 0x03FB;
  // OBSOLETE                                                           0x03FC
  public static TAG_EPS_OPTIONS                                       = 0x03FD;
  public static TAG_QUICK_MASK_INFORMATION                            = 0x03FE;
  // OBSOLETE                                                           0x03FF
  public static TAG_LAYER_STATE_INFORMATION                           = 0x0400;
  // Working path (not saved)                                           0x0401
  public static TAG_LAYERS_GROUP_INFORMATION                          = 0x0402;
  // OBSOLETE                                                           0x0403
  public static TAG_IPTC                                              = 0x0404;
  public static TAG_IMAGE_MODE_FOR_RAW_FORMAT_FILES                   = 0x0405;
  public static TAG_JPEG_QUALITY                                      = 0x0406;
  public static TAG_GRID_AND_GUIDES_INFORMATION                       = 0x0408;
  public static TAG_THUMBNAIL_OLD                                     = 0x0409;
  public static TAG_COPYRIGHT                                         = 0x040A;
  public static TAG_URL                                               = 0x040B;
  public static TAG_THUMBNAIL                                         = 0x040C;
  public static TAG_GLOBAL_ANGLE                                      = 0x040D;
  // OBSOLETE                                                           0x040E
  public static TAG_ICC_PROFILE_BYTES                                 = 0x040F;
  public static TAG_WATERMARK                                         = 0x0410;
  public static TAG_ICC_UNTAGGED_PROFILE                              = 0x0411;
  public static TAG_EFFECTS_VISIBLE                                   = 0x0412;
  public static TAG_SPOT_HALFTONE                                     = 0x0413;
  public static TAG_SEED_NUMBER                                       = 0x0414;
  public static TAG_UNICODE_ALPHA_NAMES                               = 0x0415;
  public static TAG_INDEXED_COLOR_TABLE_COUNT                         = 0x0416;
  public static TAG_TRANSPARENCY_INDEX                                = 0x0417;
  public static TAG_GLOBAL_ALTITUDE                                   = 0x0419;
  public static TAG_SLICES                                            = 0x041A;
  public static TAG_WORKFLOW_URL                                      = 0x041B;
  public static TAG_JUMP_TO_XPEP                                      = 0x041C;
  public static TAG_ALPHA_IDENTIFIERS                                 = 0x041D;
  public static TAG_URL_LIST                                          = 0x041E;
  public static TAG_VERSION                                           = 0x0421;
  public static TAG_EXIF_DATA_1                                       = 0x0422;
  public static TAG_EXIF_DATA_3                                       = 0x0423;
  public static TAG_XMP_DATA                                          = 0x0424;
  public static TAG_CAPTION_DIGEST                                    = 0x0425;
  public static TAG_PRINT_SCALE                                       = 0x0426;
  public static TAG_PIXEL_ASPECT_RATIO                                = 0x0428;
  public static TAG_LAYER_COMPS                                       = 0x0429;
  public static TAG_ALTERNATE_DUOTONE_COLORS                          = 0x042A;
  public static TAG_ALTERNATE_SPOT_COLORS                             = 0x042B;
  public static TAG_LAYER_SELECTION_IDS                               = 0x042D;
  public static TAG_HDR_TONING_INFO                                   = 0x042E;
  public static TAG_PRINT_INFO                                        = 0x042F;
  public static TAG_LAYER_GROUPS_ENABLED_ID                           = 0x0430;
  public static TAG_COLOR_SAMPLERS                                    = 0x0431;
  public static TAG_MEASUREMENT_SCALE                                 = 0x0432;
  public static TAG_TIMELINE_INFORMATION                              = 0x0433;
  public static TAG_SHEET_DISCLOSURE                                  = 0x0434;
  public static TAG_DISPLAY_INFO                                      = 0x0435;
  public static TAG_ONION_SKINS                                       = 0x0436;
  public static TAG_COUNT_INFORMATION                                 = 0x0438;
  public static TAG_PRINT_INFO_2                                      = 0x043A;
  public static TAG_PRINT_STYLE                                       = 0x043B;
  public static TAG_MAC_NSPRINTINFO                                   = 0x043C;
  public static TAG_WIN_DEVMODE                                       = 0x043D;
  public static TAG_AUTO_SAVE_FILE_PATH                               = 0x043E;
  public static TAG_AUTO_SAVE_FORMAT                                  = 0x043F;
  public static TAG_PATH_SELECTION_STATE                              = 0x0440;
  // PATH INFO                                                          0x07D0 -> 0x0BB6
  public static TAG_CLIPPING_PATH_NAME                                = 0x0BB7;
  public static TAG_ORIGIN_PATH_INFO                                  = 0x0BB8;
  // PLUG IN RESOURCES                                                  0x0FA0 -> 0x1387
  public static TAG_IMAGE_READY_VARIABLES_XML                         = 0x1B58;
  public static TAG_IMAGE_READY_DATA_SETS                             = 0x1B59;
  public static TAG_IMAGE_READY_SELECTED_STATE                        = 0x1B5A;
  public static TAG_IMAGE_READY_7_ROLLOVER                            = 0x1B5B;
  public static TAG_IMAGE_READY_ROLLOVER                              = 0x1B5C;
  public static TAG_IMAGE_READY_SAVE_LAYER_SETTINGS                   = 0x1B5D;
  public static TAG_IMAGE_READY_VERSION                               = 0x1B5E;
  public static TAG_LIGHTROOM_WORKFLOW                                = 0x1F40;
  public static TAG_PRINT_FLAGS_INFO                                  = 0x2710;

  public static _tagNameMap: Map<number, string> = new Map([
    [PhotoshopDirectory.TAG_CHANNELS_ROWS_COLUMNS_DEPTH_MODE, "Channels, Rows, Columns, Depth, Mode"],
    [PhotoshopDirectory.TAG_MAC_PRINT_INFO, "Mac Print Info"],
    [PhotoshopDirectory.TAG_XML, "XML Data"],
    [PhotoshopDirectory.TAG_INDEXED_COLOR_TABLE, "Indexed Color Table"],
    [PhotoshopDirectory.TAG_RESOLUTION_INFO, "Resolution Info"],
    [PhotoshopDirectory.TAG_ALPHA_CHANNELS, "Alpha Channels"],
    [PhotoshopDirectory.TAG_DISPLAY_INFO_OBSOLETE, "Display Info (Obsolete)"],
    [PhotoshopDirectory.TAG_CAPTION, "Caption"],
    [PhotoshopDirectory.TAG_BORDER_INFORMATION, "Border Information"],
    [PhotoshopDirectory.TAG_BACKGROUND_COLOR, "Background Color"],
    [PhotoshopDirectory.TAG_PRINT_FLAGS, "Print Flags"],
    [PhotoshopDirectory.TAG_GRAYSCALE_AND_MULTICHANNEL_HALFTONING_INFORMATION, "Grayscale and Multichannel Halftoning Information"],
    [PhotoshopDirectory.TAG_COLOR_HALFTONING_INFORMATION, "Color Halftoning Information"],
    [PhotoshopDirectory.TAG_DUOTONE_HALFTONING_INFORMATION, "Duotone Halftoning Information"],
    [PhotoshopDirectory.TAG_GRAYSCALE_AND_MULTICHANNEL_TRANSFER_FUNCTION, "Grayscale and Multichannel Transfer Function"],
    [PhotoshopDirectory.TAG_COLOR_TRANSFER_FUNCTIONS, "Color Transfer Functions"],
    [PhotoshopDirectory.TAG_DUOTONE_TRANSFER_FUNCTIONS, "Duotone Transfer Functions"],
    [PhotoshopDirectory.TAG_DUOTONE_IMAGE_INFORMATION, "Duotone Image Information"],
    [PhotoshopDirectory.TAG_EFFECTIVE_BLACK_AND_WHITE_VALUES, "Effective Black and White Values"],
    [PhotoshopDirectory.TAG_EPS_OPTIONS, "EPS Options"],
    [PhotoshopDirectory.TAG_QUICK_MASK_INFORMATION, "Quick Mask Information"],
    [PhotoshopDirectory.TAG_LAYER_STATE_INFORMATION, "Layer State Information"],
    [PhotoshopDirectory.TAG_LAYERS_GROUP_INFORMATION, "Layers Group Information"],
    [PhotoshopDirectory.TAG_IPTC, "IPTC-NAA Record"],
    [PhotoshopDirectory.TAG_IMAGE_MODE_FOR_RAW_FORMAT_FILES, "Image Mode for Raw Format Files"],
    [PhotoshopDirectory.TAG_JPEG_QUALITY, "JPEG Quality"],
    [PhotoshopDirectory.TAG_GRID_AND_GUIDES_INFORMATION, "Grid and Guides Information"],
    [PhotoshopDirectory.TAG_THUMBNAIL_OLD, "Photoshop 4.0 Thumbnail"],
    [PhotoshopDirectory.TAG_COPYRIGHT, "Copyright Flag"],
    [PhotoshopDirectory.TAG_URL, "URL"],
    [PhotoshopDirectory.TAG_THUMBNAIL, "Thumbnail Data"],
    [PhotoshopDirectory.TAG_GLOBAL_ANGLE, "Global Angle"],
    [PhotoshopDirectory.TAG_ICC_PROFILE_BYTES, "ICC Profile Bytes"],
    [PhotoshopDirectory.TAG_WATERMARK, "Watermark"],
    [PhotoshopDirectory.TAG_ICC_UNTAGGED_PROFILE, "ICC Untagged Profile"],
    [PhotoshopDirectory.TAG_EFFECTS_VISIBLE, "Effects Visible"],
    [PhotoshopDirectory.TAG_SPOT_HALFTONE, "Spot Halftone"],
    [PhotoshopDirectory.TAG_SEED_NUMBER, "Seed Number"],
    [PhotoshopDirectory.TAG_UNICODE_ALPHA_NAMES, "Unicode Alpha Names"],
    [PhotoshopDirectory.TAG_INDEXED_COLOR_TABLE_COUNT, "Indexed Color Table Count"],
    [PhotoshopDirectory.TAG_TRANSPARENCY_INDEX, "Transparency Index"],
    [PhotoshopDirectory.TAG_GLOBAL_ALTITUDE, "Global Altitude"],
    [PhotoshopDirectory.TAG_SLICES, "Slices"],
    [PhotoshopDirectory.TAG_WORKFLOW_URL, "Workflow URL"],
    [PhotoshopDirectory.TAG_JUMP_TO_XPEP, "Jump To XPEP"],
    [PhotoshopDirectory.TAG_ALPHA_IDENTIFIERS, "Alpha Identifiers"],
    [PhotoshopDirectory.TAG_URL_LIST, "URL List"],
    [PhotoshopDirectory.TAG_VERSION, "Version Info"],
    [PhotoshopDirectory.TAG_EXIF_DATA_1, "EXIF Data 1"],
    [PhotoshopDirectory.TAG_EXIF_DATA_3, "EXIF Data 3"],
    [PhotoshopDirectory.TAG_XMP_DATA, "XMP Data"],
    [PhotoshopDirectory.TAG_CAPTION_DIGEST, "Caption Digest"],
    [PhotoshopDirectory.TAG_PRINT_SCALE, "Print Scale"],
    [PhotoshopDirectory.TAG_PIXEL_ASPECT_RATIO, "Pixel Aspect Ratio"],
    [PhotoshopDirectory.TAG_LAYER_COMPS, "Layer Comps"],
    [PhotoshopDirectory.TAG_ALTERNATE_DUOTONE_COLORS, "Alternate Duotone Colors"],
    [PhotoshopDirectory.TAG_ALTERNATE_SPOT_COLORS, "Alternate Spot Colors"],
    [PhotoshopDirectory.TAG_LAYER_SELECTION_IDS, "Layer Selection IDs"],
    [PhotoshopDirectory.TAG_HDR_TONING_INFO, "HDR Toning Info"],
    [PhotoshopDirectory.TAG_PRINT_INFO, "Print Info"],
    [PhotoshopDirectory.TAG_LAYER_GROUPS_ENABLED_ID, "Layer Groups Enabled ID"],
    [PhotoshopDirectory.TAG_COLOR_SAMPLERS, "Color Samplers"],
    [PhotoshopDirectory.TAG_MEASUREMENT_SCALE, "Measurement Scale"],
    [PhotoshopDirectory.TAG_TIMELINE_INFORMATION, "Timeline Information"],
    [PhotoshopDirectory.TAG_SHEET_DISCLOSURE, "Sheet Disclosure"],
    [PhotoshopDirectory.TAG_DISPLAY_INFO, "Display Info"],
    [PhotoshopDirectory.TAG_ONION_SKINS, "Onion Skins"],
    [PhotoshopDirectory.TAG_COUNT_INFORMATION, "Count information"],
    [PhotoshopDirectory.TAG_PRINT_INFO_2, "Print Info 2"],
    [PhotoshopDirectory.TAG_PRINT_STYLE, "Print Style"],
    [PhotoshopDirectory.TAG_MAC_NSPRINTINFO, "Mac NSPrintInfo"],
    [PhotoshopDirectory.TAG_WIN_DEVMODE, "Win DEVMODE"],
    [PhotoshopDirectory.TAG_AUTO_SAVE_FILE_PATH, "Auto Save File Subpath"],
    [PhotoshopDirectory.TAG_AUTO_SAVE_FORMAT, "Auto Save Format"],
    [PhotoshopDirectory.TAG_PATH_SELECTION_STATE, "Subpath Selection State"],
    [PhotoshopDirectory.TAG_CLIPPING_PATH_NAME, "Clipping Path Name"],
    [PhotoshopDirectory.TAG_ORIGIN_PATH_INFO, "Origin Subpath Info"],
    [PhotoshopDirectory.TAG_IMAGE_READY_VARIABLES_XML, "Image Ready Variables XML"],
    [PhotoshopDirectory.TAG_IMAGE_READY_DATA_SETS, "Image Ready Data Sets"],
    [PhotoshopDirectory.TAG_IMAGE_READY_SELECTED_STATE, "Image Ready Selected State"],
    [PhotoshopDirectory.TAG_IMAGE_READY_7_ROLLOVER, "Image Ready 7 Rollover Expanded State"],
    [PhotoshopDirectory.TAG_IMAGE_READY_ROLLOVER, "Image Ready Rollover Expanded State"],
    [PhotoshopDirectory.TAG_IMAGE_READY_SAVE_LAYER_SETTINGS, "Image Ready Save Layer Settings"],
    [PhotoshopDirectory.TAG_IMAGE_READY_VERSION, "Image Ready Version"],
    [PhotoshopDirectory.TAG_LIGHTROOM_WORKFLOW, "Lightroom Workflow"],
    [PhotoshopDirectory.TAG_PRINT_FLAGS_INFO, "Print Flags Information"]
  ]);

  constructor() {
    super();
    this.setDescriptor(new PhotoshopDescriptor(this));
  }

  public getName(): string {
    return "Photoshop";
  }

  public getTagNameMap(): Map<number, string> {
    return PhotoshopDirectory._tagNameMap;
  }

  public getThumbnailBytes(): Int8Array {
    let storedBytes = this.getByteArray(PhotoshopDirectory.TAG_THUMBNAIL);
    if (storedBytes == null) {
      storedBytes = this.getByteArray(PhotoshopDirectory.TAG_THUMBNAIL_OLD);
    }
    if (storedBytes == null || storedBytes.length <= 28) {
      return null;
    }

    let thumbSize = storedBytes.length - 28;
    let thumbBytes = new Int8Array[thumbSize];
    thumbBytes = storedBytes.slice(28, thumbSize)
    return thumbBytes;
  }
}

export default PhotoshopDirectory