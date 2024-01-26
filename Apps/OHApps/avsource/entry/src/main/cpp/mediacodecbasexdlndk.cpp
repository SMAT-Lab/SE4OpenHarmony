/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include "napi/native_api.h"
#include <js_native_api_types.h>
#include <multimedia/player_framework/native_avcapability.h>
#include <multimedia/player_framework/native_avcodec_base.h>
#include <multimedia/player_framework/native_avdemuxer.h>
#include <multimedia/player_framework/native_avformat.h>
#include <multimedia/player_framework/native_avsource.h>

#define FAIL (-1)
#define SUCCESS 0
#define WIDTH 1920
#define HEIGHT 1080
#define PARAM_720 720
#define PARAM_1280 1280
#define PARAM_0 0
#define PARAM_30 30
const bool isEncoder = true;
const bool isDecoder = false;

static napi_value OHAvCapabilityGetEncoderQualityRangeAnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_HEVC, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeBnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_FLAC, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeCnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeDnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_MPEG, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeEnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_MPEG4, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeFnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_AAC, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeGnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_IMAGE_JPG, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeHnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_IMAGE_PNG, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeInormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_IMAGE_BMP, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeJnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_HEVC, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeKnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_FLAC, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeLnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeMnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_MPEG, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeNnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_MPEG4, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeOnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_AAC, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangePnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_IMAGE_JPG, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeQnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_IMAGE_PNG, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeRnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_IMAGE_BMP, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeSnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeTnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_HEVC, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeUnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_FLAC, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeVnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeWnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_MPEG, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeXnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_MPEG4, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeYnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_AAC, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeZnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_IMAGE_JPG, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeAAnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_IMAGE_PNG, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeABnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_IMAGE_BMP, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeACnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeADnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_HEVC, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeAEnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_FLAC, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeAFnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeAGnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_MPEG, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeAHnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_MPEG4, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeAInormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_AAC, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeAJnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_IMAGE_JPG, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeAKnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_IMAGE_PNG, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeALnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_IMAGE_BMP, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderQualityRangeAMnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeAnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_AAC, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeBnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_FLAC, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeCnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeDnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_MPEG, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeEnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_HEVC, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeFnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_MPEG4, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeGnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_IMAGE_JPG, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeHnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_IMAGE_PNG, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeInormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_IMAGE_BMP, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeJnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeKnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_AAC, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeLnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_FLAC, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeMnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeNnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_MPEG, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeOnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_HEVC, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangePnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_MPEG4, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeQnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_IMAGE_JPG, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeRnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_IMAGE_PNG, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeSnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_IMAGE_BMP, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeTnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeUnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_AAC, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeVnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_FLAC, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeWnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeXnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_MPEG, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeYnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_HEVC, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeZnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_MPEG4, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeAAnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_IMAGE_JPG, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeABnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_IMAGE_PNG, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeACnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_IMAGE_BMP, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeADnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeAEnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_AAC, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeAFnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_FLAC, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeAGnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeAHnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_MPEG, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeAInormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_HEVC, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeAJnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_MPEG4, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeAKnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_IMAGE_JPG, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeALnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_IMAGE_PNG, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetEncoderComplexityRangeAMnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_IMAGE_BMP, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioSupportedSampleRatesAbnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_FLAC, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetAudioSupportedSampleRates(capability, nullptr, nullptr);
    if (checkParam == AV_ERR_INVALID_VAL) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioSupportedSampleRatesAnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    const int32_t *sampleRates = nullptr;
    uint32_t sampleRateNum;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_AAC, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetAudioSupportedSampleRates(capability, &sampleRates, &sampleRateNum);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}
static napi_value OHAvCapabilityGetAudioSupportedSampleRatesBnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVErrCode checkParam;
    const int32_t *sampleRates = nullptr;
    uint32_t sampleRateNum;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetAudioSupportedSampleRates(capability, &sampleRates, &sampleRateNum);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}
static napi_value OHAvCapabilityGetAudioSupportedSampleRatesCnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVErrCode checkParam;
    const int32_t *sampleRates = nullptr;
    uint32_t sampleRateNum;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_MPEG, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetAudioSupportedSampleRates(capability, &sampleRates, &sampleRateNum);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioSupportedSampleRatesDnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVErrCode checkParam;
    const int32_t *sampleRates = nullptr;
    uint32_t sampleRateNum;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_AAC, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetAudioSupportedSampleRates(capability, &sampleRates, &sampleRateNum);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioSupportedSampleRatesEnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVErrCode checkParam;
    const int32_t *sampleRates = nullptr;
    uint32_t sampleRateNum;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetAudioSupportedSampleRates(capability, &sampleRates, &sampleRateNum);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioSupportedSampleRatesFnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVErrCode checkParam;
    const int32_t *sampleRates = nullptr;
    uint32_t sampleRateNum;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_MPEG, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetAudioSupportedSampleRates(capability, &sampleRates, &sampleRateNum);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioSupportedSampleRatesGnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVErrCode checkParam;
    const int32_t *sampleRates = nullptr;
    uint32_t sampleRateNum;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_FLAC, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetAudioSupportedSampleRates(capability, &sampleRates, &sampleRateNum);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioSupportedSampleRatesHnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVErrCode checkParam;
    const int32_t *sampleRates = nullptr;
    uint32_t sampleRateNum;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_AAC, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetAudioSupportedSampleRates(capability, &sampleRates, &sampleRateNum);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioSupportedSampleRatesInormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVErrCode checkParam;
    const int32_t *sampleRates = nullptr;
    uint32_t sampleRateNum;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetAudioSupportedSampleRates(capability, &sampleRates, &sampleRateNum);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioSupportedSampleRatesJnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVErrCode checkParam;
    const int32_t *sampleRates = nullptr;
    uint32_t sampleRateNum;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_MPEG, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetAudioSupportedSampleRates(capability, &sampleRates, &sampleRateNum);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioSupportedSampleRatesKnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVErrCode checkParam;
    const int32_t *sampleRates = nullptr;
    uint32_t sampleRateNum;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_FLAC, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetAudioSupportedSampleRates(capability, &sampleRates, &sampleRateNum);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioSupportedSampleRatesLnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVErrCode checkParam;
    const int32_t *sampleRates = nullptr;
    uint32_t sampleRateNum;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_AAC, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetAudioSupportedSampleRates(capability, &sampleRates, &sampleRateNum);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioSupportedSampleRatesMnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVErrCode checkParam;
    const int32_t *sampleRates = nullptr;
    uint32_t sampleRateNum;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetAudioSupportedSampleRates(capability, &sampleRates, &sampleRateNum);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioSupportedSampleRatesNnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVErrCode checkParam;
    const int32_t *sampleRates = nullptr;
    uint32_t sampleRateNum;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_MPEG, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetAudioSupportedSampleRates(capability, &sampleRates, &sampleRateNum);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioSupportedSampleRatesOnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVErrCode checkParam;
    const int32_t *sampleRates = nullptr;
    uint32_t sampleRateNum;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_FLAC, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetAudioSupportedSampleRates(capability, &sampleRates, &sampleRateNum);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioSupportedSampleRatesPnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVErrCode checkParam;
    const int32_t *sampleRates = nullptr;
    uint32_t sampleRateNum;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetAudioSupportedSampleRates(capability, &sampleRates, &sampleRateNum);
    if (checkParam == AV_ERR_INVALID_VAL) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioChannelCountRangeAnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange channelCountRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isDecoder);
    checkParam = OH_AVCapability_GetAudioChannelCountRange(capability, &channelCountRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioChannelCountRangeBnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange channelCountRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_AUDIO_AAC, isDecoder);
    checkParam = OH_AVCapability_GetAudioChannelCountRange(capability, &channelCountRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioChannelCountRangeCnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange channelCountRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_AUDIO_FLAC, isDecoder);
    checkParam = OH_AVCapability_GetAudioChannelCountRange(capability, &channelCountRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioChannelCountRangeDnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange channelCountRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_AUDIO_MPEG, isDecoder);
    checkParam = OH_AVCapability_GetAudioChannelCountRange(capability, &channelCountRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioChannelCountRangeEnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange channelCountRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_VIDEO_HEVC, isDecoder);
    checkParam = OH_AVCapability_GetAudioChannelCountRange(capability, &channelCountRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioChannelCountRangeFnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange channelCountRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_VIDEO_MPEG4, isDecoder);
    checkParam = OH_AVCapability_GetAudioChannelCountRange(capability, &channelCountRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioChannelCountRangeGnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange channelCountRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_IMAGE_JPG, isDecoder);
    checkParam = OH_AVCapability_GetAudioChannelCountRange(capability, &channelCountRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioChannelCountRangeHnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange channelCountRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_IMAGE_PNG, isDecoder);
    checkParam = OH_AVCapability_GetAudioChannelCountRange(capability, &channelCountRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioChannelCountRangeInormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange channelCountRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_IMAGE_BMP, isDecoder);
    checkParam = OH_AVCapability_GetAudioChannelCountRange(capability, &channelCountRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioChannelCountRangeJnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange channelCountRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS, isEncoder);
    checkParam = OH_AVCapability_GetAudioChannelCountRange(capability, &channelCountRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioChannelCountRangeKnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange channelCountRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isEncoder);
    checkParam = OH_AVCapability_GetAudioChannelCountRange(capability, &channelCountRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioChannelCountRangeLnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange channelCountRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_AUDIO_AAC, isEncoder);
    checkParam = OH_AVCapability_GetAudioChannelCountRange(capability, &channelCountRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioChannelCountRangeMnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange channelCountRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_AUDIO_FLAC, isEncoder);
    checkParam = OH_AVCapability_GetAudioChannelCountRange(capability, &channelCountRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioChannelCountRangeNnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange channelCountRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_AUDIO_MPEG, isEncoder);
    checkParam = OH_AVCapability_GetAudioChannelCountRange(capability, &channelCountRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioChannelCountRangeOnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange channelCountRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_VIDEO_HEVC, isEncoder);
    checkParam = OH_AVCapability_GetAudioChannelCountRange(capability, &channelCountRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioChannelCountRangePnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange channelCountRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_VIDEO_MPEG4, isEncoder);
    checkParam = OH_AVCapability_GetAudioChannelCountRange(capability, &channelCountRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioChannelCountRangeQnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange channelCountRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_IMAGE_JPG, isEncoder);
    checkParam = OH_AVCapability_GetAudioChannelCountRange(capability, &channelCountRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioChannelCountRangeRnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange channelCountRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_IMAGE_PNG, isEncoder);
    checkParam = OH_AVCapability_GetAudioChannelCountRange(capability, &channelCountRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetAudioChannelCountRangeSnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange channelCountRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_IMAGE_BMP, isEncoder);
    checkParam = OH_AVCapability_GetAudioChannelCountRange(capability, &channelCountRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetVideoWidthAlignmentAnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t widthAlignment;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_MPEG4, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetVideoWidthAlignment(capability, &widthAlignment);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetVideoWidthAlignmentBnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t widthAlignment;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_HEVC, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetVideoWidthAlignment(capability, &widthAlignment);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetVideoWidthAlignmentCnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t widthAlignment;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetVideoWidthAlignment(capability, &widthAlignment);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetVideoWidthAlignmentDnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t widthAlignment;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_MPEG4, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetVideoWidthAlignment(capability, &widthAlignment);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetVideoWidthAlignmentEnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t widthAlignment;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_HEVC, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetVideoWidthAlignment(capability, &widthAlignment);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetVideoWidthAlignmentFnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t widthAlignment;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetVideoWidthAlignment(capability, &widthAlignment);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetVideoWidthAlignmentGnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t widthAlignment;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_MPEG4, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetVideoWidthAlignment(capability, &widthAlignment);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetVideoWidthAlignmentHnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t widthAlignment;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_HEVC, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetVideoWidthAlignment(capability, &widthAlignment);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetVideoWidthAlignmentInormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t widthAlignment;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetVideoWidthAlignment(capability, &widthAlignment);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetVideoWidthAlignmentJnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t widthAlignment;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_MPEG4, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetVideoWidthAlignment(capability, &widthAlignment);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetVideoWidthAlignmentKnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t widthAlignment;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_HEVC, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetVideoWidthAlignment(capability, &widthAlignment);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetVideoWidthAlignmentLnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t widthAlignment;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetVideoWidthAlignment(capability, &widthAlignment);
    if (checkParam == AV_ERR_INVALID_VAL) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAvCapabilityGetVideoWidthAlignmentMnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_HEVC, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetVideoWidthAlignment(capability, nullptr);
    if (checkParam == AV_ERR_INVALID_VAL) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value oHAvCapabilityGetVideoHeightAlignmentAnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t heightAlignment;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_MPEG4, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetVideoHeightAlignment(capability, &heightAlignment);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value oHAvCapabilityGetVideoHeightAlignmentBnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t heightAlignment;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_HEVC, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetVideoHeightAlignment(capability, &heightAlignment);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value oHAvCapabilityGetVideoHeightAlignmentCnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t heightAlignment;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetVideoHeightAlignment(capability, &heightAlignment);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value oHAvCapabilityGetVideoHeightAlignmentDnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t heightAlignment;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_MPEG4, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetVideoHeightAlignment(capability, &heightAlignment);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value oHAvCapabilityGetVideoHeightAlignmentEnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t heightAlignment;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_HEVC, isDecoder, HARDWARE);
    checkParam = OH_AVCapability_GetVideoHeightAlignment(capability, &heightAlignment);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value oHAvCapabilityGetVideoHeightAlignmentFnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t heightAlignment;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetVideoHeightAlignment(capability, &heightAlignment);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value oHAvCapabilityGetVideoHeightAlignmentGnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t heightAlignment;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_MPEG4, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetVideoHeightAlignment(capability, &heightAlignment);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value oHAvCapabilityGetVideoHeightAlignmentHnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t heightAlignment;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_HEVC, isDecoder, SOFTWARE);
    checkParam = OH_AVCapability_GetVideoHeightAlignment(capability, &heightAlignment);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value oHAvCapabilityGetVideoHeightAlignmentInormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t heightAlignment;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_MPEG4, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetVideoHeightAlignment(capability, &heightAlignment);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value oHAvCapabilityGetVideoHeightAlignmentJnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t heightAlignment;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_HEVC, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetVideoHeightAlignment(capability, &heightAlignment);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value oHAvCapabilityGetVideoHeightAlignmentKnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t heightAlignment;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetVideoHeightAlignment(capability, &heightAlignment);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value oHAvCapabilityGetVideoHeightAlignmentLnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t heightAlignment;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetVideoHeightAlignment(capability, &heightAlignment);
    if (checkParam == AV_ERR_INVALID_VAL) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value oHAvCapabilityGetVideoHeightAlignmentMnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetVideoHeightAlignment(capability, nullptr);
    if (checkParam == AV_ERR_INVALID_VAL) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AVCapabilityGetEncoderQualityRange(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange qualityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderQualityRange(capability, &qualityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AVCapabilityGetEncoderComplexityRange(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange complexityRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetEncoderComplexityRange(capability, &complexityRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AVCapabilityGetAudioSupportedSampleRates(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    const int32_t *sampleRates = nullptr;
    uint32_t sampleRateNum;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_AUDIO_FLAC, isEncoder, SOFTWARE);
    checkParam = OH_AVCapability_GetAudioSupportedSampleRates(capability, &sampleRates, &sampleRateNum);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AVCapabilityGetAudioChannelCountRange(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange channelCountRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS, isDecoder);
    checkParam = OH_AVCapability_GetAudioChannelCountRange(capability, &channelCountRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AVCapabilityGetVideoWidthAlignment(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t widthAlignment;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetVideoWidthAlignment(capability, &widthAlignment);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AVCapabilityGetVideoHeightAlignment(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t heightAlignment;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isEncoder, HARDWARE);
    checkParam = OH_AVCapability_GetVideoHeightAlignment(capability, &heightAlignment);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AVCodecGetCapability(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *checkParam = nullptr;
    checkParam = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isDecoder);
    if (checkParam != nullptr) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AVCodecGetCapabilityByCategory(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *checkParam = nullptr;
    checkParam = OH_AVCodec_GetCapabilityByCategory(OH_AVCODEC_MIMETYPE_VIDEO_HEVC, isDecoder, HARDWARE);
    if (checkParam != nullptr) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AVCapabilityGetVideoWidthRange(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange widthRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isEncoder);
    checkParam = OH_AVCapability_GetVideoWidthRange(capability, &widthRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AVCapabilityGetVideoHeightRange(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange heightRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isEncoder);
    checkParam = OH_AVCapability_GetVideoHeightRange(capability, &heightRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AVCapabilityIsVideoSizeSupported(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t width = PARAM_1280, height = PARAM_720;
    bool checkParam = false;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isEncoder);
    checkParam = OH_AVCapability_IsVideoSizeSupported(capability, width, height);
    if (checkParam != false) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AVCapabilityGetVideoFrameRateRange(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    OH_AVRange frameRateRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isEncoder);
    checkParam = OH_AVCapability_GetVideoFrameRateRange(capability, &frameRateRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AVCapabilityGetVideoFrameRateRangeForSize(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t width = WIDTH, height = HEIGHT;
    OH_AVRange frameRateRange;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isEncoder);
    checkParam = OH_AVCapability_GetVideoFrameRateRangeForSize(capability, width, height, &frameRateRange);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AVCapabilityAreVideoSizeAndFrameRateSupported(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    int32_t width = HEIGHT, height = PARAM_720, frameRate = PARAM_30;
    bool checkParam = false;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isDecoder);
    checkParam = OH_AVCapability_AreVideoSizeAndFrameRateSupported(capability, width, height, frameRate);
    if (checkParam != false) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AVCapabilityGetVideoSupportedPixelFormats(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    const int32_t *pixFormats = nullptr;
    uint32_t pixFormatNum;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isEncoder);
    checkParam = OH_AVCapability_GetVideoSupportedPixelFormats(capability, &pixFormats, &pixFormatNum);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AVCapabilityGetSupportedProfiles(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    const int32_t *profiles = nullptr;
    uint32_t profileNum;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isEncoder);
    checkParam = OH_AVCapability_GetSupportedProfiles(capability, &profiles, &profileNum);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AVCapabilityGetSupportedLevelsForProfile(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backParam = FAIL;
    OH_AVCapability *capability = nullptr;
    const int32_t *levels = nullptr;
    uint32_t levelNum;
    OH_AVErrCode checkParam;
    capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_VIDEO_AVC, isEncoder);
    checkParam = OH_AVCapability_GetSupportedLevelsForProfile(capability, PARAM_0, &levels, &levelNum);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

EXTERN_C_START
static napi_value Init(napi_env env, napi_value exports)
{
    napi_property_descriptor desc[] = {
        {"oHAvCapabilityGetEncoderQualityRangeAnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeAnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeBnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeBnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeCnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeCnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeDnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeDnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeEnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeEnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeFnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeFnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeGnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeGnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeHnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeHnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeInormal", nullptr, OHAvCapabilityGetEncoderQualityRangeInormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},

        {"oHAvCapabilityGetEncoderQualityRangeJnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeJnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeKnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeKnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeLnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeLnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeMnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeMnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeNnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeNnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeOnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeOnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangePnormal", nullptr, OHAvCapabilityGetEncoderQualityRangePnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeQnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeQnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeRnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeRnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeSnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeSnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},

        {"oHAvCapabilityGetEncoderQualityRangeTnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeTnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeUnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeUnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeVnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeVnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeWnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeWnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeXnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeXnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeYnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeYnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeZnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeZnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeAAnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeAAnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeABnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeABnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeACnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeACnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},

        {"oHAvCapabilityGetEncoderQualityRangeADnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeADnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeAEnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeAEnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeAFnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeAFnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeAGnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeAGnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeAHnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeAHnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeAInormal", nullptr, OHAvCapabilityGetEncoderQualityRangeAInormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeAJnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeAJnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeAKnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeAKnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeALnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeALnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderQualityRangeAMnormal", nullptr, OHAvCapabilityGetEncoderQualityRangeAMnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},

        {"oHAvCapabilityGetEncoderComplexityRangeAnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeAnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeBnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeBnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeCnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeCnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeDnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeDnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeEnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeEnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeFnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeFnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeGnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeGnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeHnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeHnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeInormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeInormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},

        {"oHAvCapabilityGetEncoderComplexityRangeJnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeJnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeKnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeKnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeLnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeLnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeMnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeMnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeNnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeNnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeOnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeOnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangePnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangePnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeQnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeQnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeRnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeRnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeSnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeSnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},

        {"oHAvCapabilityGetEncoderComplexityRangeTnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeTnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeUnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeUnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeVnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeVnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeWnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeWnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeXnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeXnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeYnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeYnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeZnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeZnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeAAnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeAAnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeABnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeABnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeACnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeACnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},

        {"oHAvCapabilityGetEncoderComplexityRangeADnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeADnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeAEnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeAEnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeAFnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeAFnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeAGnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeAGnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeAHnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeAHnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeAInormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeAInormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeAJnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeAJnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeAKnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeAKnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeALnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeALnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetEncoderComplexityRangeAMnormal", nullptr, OHAvCapabilityGetEncoderComplexityRangeAMnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},

        {"oHAvCapabilityGetAudioSupportedSampleRatesAbnormal", nullptr,
         OHAvCapabilityGetAudioSupportedSampleRatesAbnormal, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioSupportedSampleRatesAnormal", nullptr,
         OHAvCapabilityGetAudioSupportedSampleRatesAnormal, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioSupportedSampleRatesBnormal", nullptr,
         OHAvCapabilityGetAudioSupportedSampleRatesBnormal, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioSupportedSampleRatesCnormal", nullptr,
         OHAvCapabilityGetAudioSupportedSampleRatesCnormal, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioSupportedSampleRatesDnormal", nullptr,
         OHAvCapabilityGetAudioSupportedSampleRatesDnormal, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioSupportedSampleRatesEnormal", nullptr,
         OHAvCapabilityGetAudioSupportedSampleRatesEnormal, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioSupportedSampleRatesFnormal", nullptr,
         OHAvCapabilityGetAudioSupportedSampleRatesFnormal, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioSupportedSampleRatesGnormal", nullptr,
         OHAvCapabilityGetAudioSupportedSampleRatesGnormal, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioSupportedSampleRatesHnormal", nullptr,
         OHAvCapabilityGetAudioSupportedSampleRatesHnormal, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioSupportedSampleRatesInormal", nullptr,
         OHAvCapabilityGetAudioSupportedSampleRatesInormal, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioSupportedSampleRatesJnormal", nullptr,
         OHAvCapabilityGetAudioSupportedSampleRatesJnormal, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioSupportedSampleRatesKnormal", nullptr,
         OHAvCapabilityGetAudioSupportedSampleRatesKnormal, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioSupportedSampleRatesLnormal", nullptr,
         OHAvCapabilityGetAudioSupportedSampleRatesLnormal, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioSupportedSampleRatesMnormal", nullptr,
         OHAvCapabilityGetAudioSupportedSampleRatesMnormal, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioSupportedSampleRatesNnormal", nullptr,
         OHAvCapabilityGetAudioSupportedSampleRatesNnormal, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioSupportedSampleRatesOnormal", nullptr,
         OHAvCapabilityGetAudioSupportedSampleRatesOnormal, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioSupportedSampleRatesPnormal", nullptr,
         OHAvCapabilityGetAudioSupportedSampleRatesPnormal, nullptr, nullptr, nullptr, napi_default, nullptr},

        {"oHAvCapabilityGetAudioChannelCountRangeAnormal", nullptr, OHAvCapabilityGetAudioChannelCountRangeAnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioChannelCountRangeBnormal", nullptr, OHAvCapabilityGetAudioChannelCountRangeBnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioChannelCountRangeCnormal", nullptr, OHAvCapabilityGetAudioChannelCountRangeCnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioChannelCountRangeDnormal", nullptr, OHAvCapabilityGetAudioChannelCountRangeDnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioChannelCountRangeEnormal", nullptr, OHAvCapabilityGetAudioChannelCountRangeEnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioChannelCountRangeFnormal", nullptr, OHAvCapabilityGetAudioChannelCountRangeFnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioChannelCountRangeGnormal", nullptr, OHAvCapabilityGetAudioChannelCountRangeGnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioChannelCountRangeHnormal", nullptr, OHAvCapabilityGetAudioChannelCountRangeHnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioChannelCountRangeInormal", nullptr, OHAvCapabilityGetAudioChannelCountRangeInormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},

        {"oHAvCapabilityGetAudioChannelCountRangeJnormal", nullptr, OHAvCapabilityGetAudioChannelCountRangeJnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioChannelCountRangeKnormal", nullptr, OHAvCapabilityGetAudioChannelCountRangeKnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioChannelCountRangeLnormal", nullptr, OHAvCapabilityGetAudioChannelCountRangeLnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioChannelCountRangeMnormal", nullptr, OHAvCapabilityGetAudioChannelCountRangeMnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioChannelCountRangeNnormal", nullptr, OHAvCapabilityGetAudioChannelCountRangeNnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioChannelCountRangeOnormal", nullptr, OHAvCapabilityGetAudioChannelCountRangeOnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioChannelCountRangePnormal", nullptr, OHAvCapabilityGetAudioChannelCountRangePnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioChannelCountRangeQnormal", nullptr, OHAvCapabilityGetAudioChannelCountRangeQnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioChannelCountRangeRnormal", nullptr, OHAvCapabilityGetAudioChannelCountRangeRnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetAudioChannelCountRangeSnormal", nullptr, OHAvCapabilityGetAudioChannelCountRangeSnormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},

        {"oHAvCapabilityGetVideoWidthAlignmentAnormal", nullptr, OHAvCapabilityGetVideoWidthAlignmentAnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetVideoWidthAlignmentBnormal", nullptr, OHAvCapabilityGetVideoWidthAlignmentBnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetVideoWidthAlignmentCnormal", nullptr, OHAvCapabilityGetVideoWidthAlignmentCnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetVideoWidthAlignmentDnormal", nullptr, OHAvCapabilityGetVideoWidthAlignmentDnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetVideoWidthAlignmentEnormal", nullptr, OHAvCapabilityGetVideoWidthAlignmentEnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetVideoWidthAlignmentFnormal", nullptr, OHAvCapabilityGetVideoWidthAlignmentFnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetVideoWidthAlignmentGnormal", nullptr, OHAvCapabilityGetVideoWidthAlignmentGnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetVideoWidthAlignmentHnormal", nullptr, OHAvCapabilityGetVideoWidthAlignmentHnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetVideoWidthAlignmentInormal", nullptr, OHAvCapabilityGetVideoWidthAlignmentInormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetVideoWidthAlignmentJnormal", nullptr, OHAvCapabilityGetVideoWidthAlignmentJnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetVideoWidthAlignmentKnormal", nullptr, OHAvCapabilityGetVideoWidthAlignmentKnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetVideoWidthAlignmentLnormal", nullptr, OHAvCapabilityGetVideoWidthAlignmentLnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetVideoWidthAlignmentMnormal", nullptr, OHAvCapabilityGetVideoWidthAlignmentMnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},

        {"oHAvCapabilityGetVideoHeightAlignmentAnormal", nullptr, oHAvCapabilityGetVideoHeightAlignmentAnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetVideoHeightAlignmentBnormal", nullptr, oHAvCapabilityGetVideoHeightAlignmentBnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetVideoHeightAlignmentCnormal", nullptr, oHAvCapabilityGetVideoHeightAlignmentCnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetVideoHeightAlignmentDnormal", nullptr, oHAvCapabilityGetVideoHeightAlignmentDnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetVideoHeightAlignmentEnormal", nullptr, oHAvCapabilityGetVideoHeightAlignmentEnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetVideoHeightAlignmentFnormal", nullptr, oHAvCapabilityGetVideoHeightAlignmentFnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetVideoHeightAlignmentGnormal", nullptr, oHAvCapabilityGetVideoHeightAlignmentGnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetVideoHeightAlignmentHnormal", nullptr, oHAvCapabilityGetVideoHeightAlignmentHnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetVideoHeightAlignmentInormal", nullptr, oHAvCapabilityGetVideoHeightAlignmentInormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetVideoHeightAlignmentJnormal", nullptr, oHAvCapabilityGetVideoHeightAlignmentJnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetVideoHeightAlignmentKnormal", nullptr, oHAvCapabilityGetVideoHeightAlignmentKnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetVideoHeightAlignmentLnormal", nullptr, oHAvCapabilityGetVideoHeightAlignmentLnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHAvCapabilityGetVideoHeightAlignmentMnormal", nullptr, oHAvCapabilityGetVideoHeightAlignmentMnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"OH_AVCapability_GetEncoderQualityRange", nullptr, AVCapabilityGetEncoderQualityRange, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"OH_AVCapability_GetEncoderComplexityRange", nullptr, AVCapabilityGetEncoderComplexityRange, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"OH_AVCapability_GetAudioSupportedSampleRates", nullptr, AVCapabilityGetAudioSupportedSampleRates, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"OH_AVCapability_GetAudioChannelCountRange", nullptr, AVCapabilityGetAudioChannelCountRange, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"OH_AVCapability_GetVideoWidthAlignment", nullptr, AVCapabilityGetVideoWidthAlignment, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"OH_AVCapability_GetVideoHeightAlignment", nullptr, AVCapabilityGetVideoHeightAlignment, nullptr, nullptr,
         nullptr, napi_default, nullptr},

        {"OH_AVCodec_GetCapability", nullptr, AVCodecGetCapability, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"OH_AVCodec_GetCapabilityByCategory", nullptr, AVCodecGetCapabilityByCategory, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"OH_AVCapability_GetVideoWidthRange", nullptr, AVCapabilityGetVideoWidthRange, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"OH_AVCapability_GetVideoHeightRange", nullptr, AVCapabilityGetVideoHeightRange, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"OH_AVCapability_IsVideoSizeSupported", nullptr, AVCapabilityIsVideoSizeSupported, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"OH_AVCapability_GetVideoFrameRateRange", nullptr, AVCapabilityGetVideoFrameRateRange, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"OH_AVCapability_GetVideoFrameRateRangeForSize", nullptr, AVCapabilityGetVideoFrameRateRangeForSize, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"OH_AVCapability_AreVideoSizeAndFrameRateSupported", nullptr, AVCapabilityAreVideoSizeAndFrameRateSupported,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"OH_AVCapability_GetVideoSupportedPixelFormats", nullptr, AVCapabilityGetVideoSupportedPixelFormats, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"OH_AVCapability_GetSupportedProfiles", nullptr, AVCapabilityGetSupportedProfiles, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"OH_AVCapability_GetSupportedLevelsForProfile", nullptr, AVCapabilityGetSupportedLevelsForProfile, nullptr,
         nullptr, nullptr, napi_default, nullptr},
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
    .nm_modname = "libmediacodecbasexdlndk",
    .nm_priv = ((void *)0),
    .reserved = { 0 },
};

extern "C" __attribute__((constructor)) void RegisterModule(void)
{
    napi_module_register(&demoModule);
}
