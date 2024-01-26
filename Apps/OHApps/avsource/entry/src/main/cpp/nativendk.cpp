/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

#include "napi/native_api.h"
#include <js_native_api.h>
#include <multimedia/player_framework/native_avcapability.h>
#include <multimedia/player_framework/native_avcodec_audiodecoder.h>
#include <multimedia/player_framework/native_avcodec_base.h>
#include <multimedia/player_framework/native_avdemuxer.h>
#include <multimedia/player_framework/native_avformat.h>
#include <multimedia/player_framework/native_avsource.h>

#define FAIL (-1)
#define SUCCESS 0
#define WIDTH 1920
#define HEIGHT 1080
#define PARAM_0 0
#define PARAM_1 1  
#define PARAM_2 2
#define PARAM_3 3
#define PARAM_4 4
#define PARAM_5 5
#define PARAM_6 6
#define PARAM_7 7  
#define PARAM_8 8
#define PARAM_9 9
#define PARAM_10 10
#define PARAM_11 11
#define PARAM_12 12
#define PARAM_13 13
#define PARAM_14 14
#define PARAM_15 15

static OH_AVCapability *CreateCapability(napi_env env, napi_callback_info info)
{
    size_t argc = PARAM_6;
    napi_value args[PARAM_6] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    int firstParam;
    int secondParam;
    int thirdParam;
    int fourthParam;
    const char *mimeType;
    bool coder;
    OH_AVCodecCategory category;
    napi_get_value_int32(env, args[PARAM_0], &firstParam);
    napi_get_value_int32(env, args[PARAM_1], &secondParam);
    napi_get_value_int32(env, args[PARAM_2], &thirdParam);
    napi_get_value_int32(env, args[PARAM_3], &fourthParam);
    OH_AVCapability *capability;
    if (secondParam == PARAM_1) {
        coder = true;
    } else {
        coder = false;
    }

    if (firstParam == PARAM_1) {
        mimeType = OH_AVCODEC_MIMETYPE_VIDEO_AVC;
    } else if (firstParam == PARAM_2) {
        mimeType = OH_AVCODEC_MIMETYPE_AUDIO_AAC;
    } else if (firstParam == PARAM_3) {
        mimeType = OH_AVCODEC_MIMETYPE_AUDIO_FLAC;
    } else if (firstParam == PARAM_4) {
        mimeType = OH_AVCODEC_MIMETYPE_AUDIO_VORBIS;
    } else if (firstParam == PARAM_5) {
        mimeType = OH_AVCODEC_MIMETYPE_AUDIO_MPEG;
    } else if (firstParam == PARAM_6) {
        mimeType = OH_AVCODEC_MIMETYPE_VIDEO_HEVC;
    } else if (firstParam == PARAM_7) {
        mimeType = OH_AVCODEC_MIMETYPE_VIDEO_MPEG4;
    } else if (firstParam == PARAM_8) {
        mimeType = nullptr;
    } else {
        mimeType = OH_AVCODEC_MIMETYPE_VIDEO_AVC;
    }

    if (fourthParam == PARAM_1) {
        capability = OH_AVCodec_GetCapability(mimeType, coder);
    } else {
        if (thirdParam == PARAM_1) {
            category = HARDWARE;
        } else {
            category = SOFTWARE;
        }
        capability = OH_AVCodec_GetCapabilityByCategory(mimeType, coder, category);
    }

    return capability;
}

static napi_value TestInitAVErrCode(napi_env env, napi_callback_info info, OH_AVCapability *capability)
{
    napi_value result;
    size_t argc = PARAM_6;
    napi_value args[PARAM_6] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    int firstParam;
    napi_get_value_int32(env, args[PARAM_0], &firstParam);
    if (firstParam == PARAM_8) {
        if (capability == nullptr) {
            napi_create_int32(env, SUCCESS, &result);
        } else {
            napi_create_int32(env, FAIL, &result);
        }
    } else {
        if (capability != nullptr) {
            napi_create_int32(env, SUCCESS, &result);
        } else {
            napi_create_int32(env, FAIL, &result);
        }
    }

    return result;
}

static napi_value OHAVCapabilityIsHardware(OH_AVCapability *capability, napi_env env, napi_callback_info info)
{
    bool checkParam = false;
    checkParam = OH_AVCapability_IsHardware(capability);
    napi_value result = nullptr;
    int backParam = FAIL;
    if (checkParam == true) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAVCapabilityGetName(OH_AVCapability *capability, napi_env env, napi_callback_info info)
{
    const char *codecName = OH_AVCapability_GetName(capability);
    napi_value result = nullptr;
    int backParam = FAIL;
    if (codecName != nullptr) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAVCapabilityGetMaxSupportedInstances(OH_AVCapability *capability, napi_env env,
                                                         napi_callback_info info)
{
    int32_t checkParam = PARAM_0;
    checkParam = OH_AVCapability_GetMaxSupportedInstances(capability);
    napi_value result = nullptr;
    int backParam = FAIL;
    if (checkParam >= PARAM_0) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAVCapabilityGetEncoderBitrateRange(OH_AVCapability *capability, napi_env env,
                                                       napi_callback_info info)
{
    OH_AVErrCode checkParam;
    OH_AVRange bitrateRange;
    checkParam = OH_AVCapability_GetEncoderBitrateRange(capability, &bitrateRange);
    napi_value result = nullptr;
    int backParam = FAIL;
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAVCapabilityGetEncoderBitrateRangeAbnormal(OH_AVCapability *capability, napi_env env,
                                                               napi_callback_info info)
{
    OH_AVErrCode checkParam;
    checkParam = OH_AVCapability_GetEncoderBitrateRange(capability, nullptr);
    napi_value result = nullptr;
    int backParam = FAIL;
    if (checkParam == AV_ERR_INVALID_VAL) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAVCapabilityIsEncoderBitrateModeSupporteda(OH_AVCapability *capability, napi_env env,
                                                               napi_callback_info info)
{
    bool checkParam = false;
    checkParam = OH_AVCapability_IsEncoderBitrateModeSupported(capability, BITRATE_MODE_CBR);
    napi_value result = nullptr;
    int backParam = FAIL;
    if (checkParam != false) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAVCapabilityIsEncoderBitrateModeSupportedb(OH_AVCapability *capability, napi_env env,
                                                               napi_callback_info info)
{
    bool checkParam = false;
    checkParam = OH_AVCapability_IsEncoderBitrateModeSupported(capability, BITRATE_MODE_VBR);
    napi_value result = nullptr;
    int backParam = FAIL;
    if (checkParam != false) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAVCapabilityIsEncoderBitrateModeSupportedc(OH_AVCapability *capability, napi_env env,
                                                               napi_callback_info info)
{
    bool checkParam = false;
    checkParam = OH_AVCapability_IsEncoderBitrateModeSupported(capability, BITRATE_MODE_CQ);
    napi_value result = nullptr;
    int backParam = FAIL;
    if (checkParam != false) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAVCapabilityGetVideoWidthRangeForHeighta(OH_AVCapability *capability, napi_env env,
                                                             napi_callback_info info)
{
    int32_t height = HEIGHT;
    OH_AVRange widthRange;
    OH_AVErrCode checkParam;
    checkParam = OH_AVCapability_GetVideoWidthRangeForHeight(capability, height, &widthRange);
    napi_value result = nullptr;
    int backParam = FAIL;
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAVCapabilityGetVideoWidthRangeForHeightb(OH_AVCapability *capability, napi_env env,
                                                             napi_callback_info info)
{
    int32_t height = HEIGHT;
    OH_AVErrCode checkParam;
    checkParam = OH_AVCapability_GetVideoWidthRangeForHeight(capability, height, nullptr);
    napi_value result = nullptr;
    int backParam = FAIL;
    if (checkParam == AV_ERR_INVALID_VAL) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAVCapabilityGetVideoHeightRangeForWidtha(OH_AVCapability *capability, napi_env env,
                                                             napi_callback_info info)
{
    int32_t width = WIDTH;
    OH_AVRange heightRange;
    OH_AVErrCode checkParam;
    checkParam = OH_AVCapability_GetVideoHeightRangeForWidth(capability, width, &heightRange);
    napi_value result = nullptr;
    int backParam = FAIL;
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAVCapabilityGetVideoHeightRangeForWidthb(OH_AVCapability *capability, napi_env env,
                                                             napi_callback_info info)
{
    int32_t width = WIDTH;
    OH_AVErrCode checkParam;
    checkParam = OH_AVCapability_GetVideoHeightRangeForWidth(capability, width, nullptr);
    napi_value result = nullptr;
    int backParam = FAIL;
    if (checkParam == AV_ERR_INVALID_VAL) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAVCapabilityAreProfileAndLevelSupporteda(OH_AVCapability *capability, napi_env env,
                                                             napi_callback_info info)
{

    bool checkParam = false;
    checkParam = OH_AVCapability_AreProfileAndLevelSupported(capability, AVC_PROFILE_BASELINE, PARAM_1);
    napi_value result = nullptr;
    int backParam = FAIL;
    if (checkParam != false) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAVCapabilityAreProfileAndLevelSupportedb(OH_AVCapability *capability, napi_env env,
                                                             napi_callback_info info)
{
    bool checkParam = false;
    checkParam = OH_AVCapability_AreProfileAndLevelSupported(capability, AVC_PROFILE_HIGH, PARAM_1);
    napi_value result = nullptr;
    int backParam = FAIL;
    if (checkParam != false) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAVCapabilityAreProfileAndLevelSupportedc(OH_AVCapability *capability, napi_env env,
                                                             napi_callback_info info)
{
    bool checkParam = false;
    checkParam = OH_AVCapability_AreProfileAndLevelSupported(capability, AVC_PROFILE_MAIN, PARAM_1);
    napi_value result = nullptr;
    int backParam = FAIL;
    if (checkParam != false) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}


static napi_value TestForCallTiming(OH_AVCapability *capability, napi_env env, napi_callback_info info)
{
    size_t argc = PARAM_6;
    napi_value args[PARAM_6] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    int sixParam;
    napi_get_value_int32(env, args[PARAM_5], &sixParam);
    if (sixParam == PARAM_1) {
        return OHAVCapabilityIsHardware(capability, env, info);
    } else if (sixParam == PARAM_2) {
        return OHAVCapabilityGetName(capability, env, info);
    } else if (sixParam == PARAM_3) {
        return OHAVCapabilityGetMaxSupportedInstances(capability, env, info);
    } else if (sixParam == PARAM_4) {
        return OHAVCapabilityGetEncoderBitrateRange(capability, env, info);
    } else if (sixParam == PARAM_5) {
        return OHAVCapabilityGetEncoderBitrateRangeAbnormal(capability, env, info);
    } else if (sixParam == PARAM_6) {
        return OHAVCapabilityIsEncoderBitrateModeSupporteda(capability, env, info);
    } else if (sixParam == PARAM_7) {
        return OHAVCapabilityIsEncoderBitrateModeSupportedb(capability, env, info);
    } else if (sixParam == PARAM_8) {
        return OHAVCapabilityIsEncoderBitrateModeSupportedc(capability, env, info);
    } else if (sixParam == PARAM_9) {
        return OHAVCapabilityGetVideoWidthRangeForHeighta(capability, env, info);
    } else if (sixParam == PARAM_10) {
        return OHAVCapabilityGetVideoWidthRangeForHeightb(capability, env, info);
    } else if (sixParam == PARAM_11) {
        return OHAVCapabilityGetVideoHeightRangeForWidtha(capability, env, info);
    } else if (sixParam == PARAM_12) {
        return OHAVCapabilityGetVideoHeightRangeForWidthb(capability, env, info);
    } else if (sixParam == PARAM_13) {
        return OHAVCapabilityAreProfileAndLevelSupporteda(capability, env, info);
    } else if (sixParam == PARAM_14) {
        return OHAVCapabilityAreProfileAndLevelSupportedb(capability, env, info);
    } else if (sixParam == PARAM_15) {
        return OHAVCapabilityAreProfileAndLevelSupportedc(capability, env, info);
    } else {
        napi_value result = nullptr;
        napi_create_int32(env, FAIL, &result);
        return result;
    }
}

static bool isNeedCallTiming(napi_env env, napi_callback_info info)
{
    size_t argc = PARAM_6;
    napi_value args[PARAM_6] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    int fiveParam;
    napi_get_value_int32(env, args[PARAM_4], &fiveParam);
    if (fiveParam == PARAM_1) {
        return true;
    } else {
        return false;
    }
}

static napi_value DecodeMainProcess(napi_env env, napi_callback_info info)
{
    OH_AVCapability *capability = CreateCapability(env, info);
    if (isNeedCallTiming(env, info)) {
        return TestForCallTiming(capability, env, info);
    } else {
        return TestInitAVErrCode(env, info, capability);
    }
}

static napi_value AVCapabilityIsHardware(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    bool checkParam = false;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_HEVC, false, HARDWARE);
    checkParam = OH_AVCapability_IsHardware(capability);
    if (checkParam != false) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AVCapabilityGetName(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_VIDEO_MPEG4, false);
    const char *codecName = OH_AVCapability_GetName(capability);
    if (codecName != nullptr) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AVCapabilityGetMaxSupportedInstances(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_VIDEO_AVC, false);
    checkParam = OH_AVCapability_GetMaxSupportedInstances(capability);
    if (checkParam != FAIL) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;

}

static napi_value AVCapabilityGetEncoderBitrateRange(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange bitrateRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_AVC, true, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderBitrateRange(capability, &bitrateRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AVCapabilityIsEncoderBitrateModeSupported(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    bool checkParam = false;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_VIDEO_AVC, true);
    checkParam = OH_AVCapability_IsEncoderBitrateModeSupported(capability, BITRATE_MODE_CBR);
    if (checkParam != false) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AVCapabilityGetVideoWidthRangeForHeight(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t height = HEIGHT;
    OH_AVRange widthRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_AVC, false, SOFTWARE);
    checkParam = OH_AVCapability_GetVideoWidthRangeForHeight(capability, height, &widthRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AVCapabilityGetVideoHeightRangeForWidth(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t width = WIDTH;
    OH_AVRange heightRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_VIDEO_AVC, true);
    checkParam = OH_AVCapability_GetVideoHeightRangeForWidth(capability, width, &heightRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AVCapabilityAreProfileAndLevelSupported(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    bool checkParam = false;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_VIDEO_AVC, false);
    checkParam = OH_AVCapability_AreProfileAndLevelSupported(capability, AVC_PROFILE_BASELINE, PARAM_1);
    if (checkParam != false) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

EXTERN_C_START
static napi_value Init(napi_env env, napi_value exports)
{
    napi_property_descriptor desc[] = {
        {"decodeMainProcess", nullptr, DecodeMainProcess, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"OH_AVCapability_IsHardware", nullptr, AVCapabilityIsHardware, nullptr, nullptr,
            nullptr,napi_default, nullptr},
        {"OH_AVCapability_GetName", nullptr, AVCapabilityGetName, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"OH_AVCapability_GetMaxSupportedInstances", nullptr, AVCapabilityGetMaxSupportedInstances,
            nullptr, nullptr, nullptr, napi_default, nullptr},
        {"OH_AVCapability_GetEncoderBitrateRange", nullptr, AVCapabilityGetEncoderBitrateRange,
            nullptr, nullptr, nullptr, napi_default, nullptr},
        {"OH_AVCapability_IsEncoderBitrateModeSupported", nullptr, AVCapabilityIsEncoderBitrateModeSupported,
            nullptr, nullptr, nullptr, napi_default, nullptr},
        {"OH_AVCapability_GetVideoWidthRangeForHeight", nullptr, AVCapabilityGetVideoWidthRangeForHeight,
            nullptr, nullptr, nullptr, napi_default, nullptr},
        {"OH_AVCapability_GetVideoHeightRangeForWidth", nullptr, AVCapabilityGetVideoHeightRangeForWidth,
            nullptr, nullptr, nullptr, napi_default, nullptr},
        {"OH_AVCapability_AreProfileAndLevelSupported", nullptr, AVCapabilityAreProfileAndLevelSupported,
            nullptr, nullptr, nullptr, napi_default, nullptr},
    };
    napi_define_properties(env, exports, sizeof(desc) / sizeof(desc[0]), desc);
    return exports;
}

EXTERN_C_END

static napi_module demoModule = {
    .nm_version = 1,
    .nm_flags = 0,
    .nm_filename = nullptr,
    .nm_register_func = Init,
    .nm_modname = "native",
    .nm_priv = ((void *)0),
    .reserved = {0},
};

extern "C" __attribute__((constructor)) void RegisterEntryModule(void) { napi_module_register(&demoModule); }