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
#include "native_common.h"
#include "cstdlib"
#include <js_native_api_types.h>
#include <multimedia/player_framework/native_avcodec_base.h>
#include <multimedia/player_framework/native_averrors.h>
#include <multimedia/player_framework/native_avformat.h>
#include <multimedia/player_framework/native_avmemory.h>

#define SUCCESS 0
#define FAIL (-1)
#define PARAM_1 1
#define MPARAM_1 1.0
#define FPARAM_1 (-1)
#define PARAM_2 2
#define PARAM_0 0
#define PARAM_10 10
#define PARAM_44100 44100
#define PARAM_100 100
#define PARAM_400 400
#define PARAM_500 500

enum OH_MD_KEY {
    KEY_RANGE_FLAG = 1,
    KEY_COLOR_PRIMARIES,
    KEY_TRANSFER_CHARACTERISTICS,
    KEY_MATRIX_COEFFICIENTS,
    KEY_REQUEST_I_FRAME,
    KEY_CODEC_CONFIG,
    KEY_TITLE,
    KEY_ARTIST,
    KEY_ALBUM,
    KEY_ALBUM_ARTIST,
    KEY_DATE,
    KEY_COMMENT,
    KEY_GENRE,
    KEY_COPYRIGHT,
    KEY_LANGUAGE,
    KEY_DESCRIPTION,
    KEY_LYRICS,
    KEY_TRACK_COUNT,
    KEY_CHANNEL_LAYOUT,
    KEY_BITS_PER_CODED_SAMPLE,
    KEY_AAC_IS_ADTS,
    KEY_SBR,
    KEY_COMPLIANCE_LEVEL,
    KEY_IDENTIFICATION_HEADER,
    KEY_SETUP_HEADER,
    KEY_SCALING_MODE,
    MAX_INPUT_BUFFER_COUNT,
    MAX_OUTPUT_BUFFER_COUNT,
    KEY_TRACK_TYPE,
    KEY_CODEC_MIME,
    KEY_DURATION,
    KEY_BITRATE,
    KEY_MAX_INPUT_SIZE,
    KEY_WIDTH,
    KEY_HEIGHT,
    KEY_PIXEL_FORMAT,
    KEY_FRAME_RATE,
    KEY_AUD_CHANNEL_COUNT,
    KEY_AUD_SAMPLE_RATE,
    KEY_I_FRAME_INTERVAL,
    KEY_ROTATION,
};

const char *bufferKey = "buffer value key";
const char *intKey = "int value key";
const char *longKey = "long value key";
const char *floatKey = "float value key";
const char *doubleKey = "double value key";
const char *stringKey = "string value key";
const char *stringValue = "string_value";
int32_t intValue = PARAM_1;
int64_t longValue = PARAM_1;
float floatValue = MPARAM_1;
double doubleValue = MPARAM_1;
constexpr int32_t INFO_SIZE = PARAM_100;
static napi_value MultimediaCoreAVFormatCreate(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *ReturnValue = OH_AVFormat_Create();
    NAPI_ASSERT(env, ReturnValue != nullptr, "OH_AudioDecoder_CreateByMime failed");
    OH_AVFormat_Destroy(ReturnValue);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatCreateAudioFormatOne(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *ReturnValue = OH_AVFormat_CreateAudioFormat(OH_AVCODEC_MIMETYPE_AUDIO_FLAC,
        PARAM_44100, PARAM_2);
    NAPI_ASSERT(env, ReturnValue != nullptr, "OH_AVFormat_CreateAudioFormat failed");
    OH_AVFormat_Destroy(ReturnValue);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatCreateAudioFormatTwo(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *ReturnValue = OH_AVFormat_CreateAudioFormat(nullptr, PARAM_44100, PARAM_2);
    NAPI_ASSERT(env, ReturnValue == nullptr, "OH_AVFormat_CreateAudioFormat failed");
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatCreateVideoFormatOne(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *ReturnValue = OH_AVFormat_CreateVideoFormat(OH_AVCODEC_MIMETYPE_VIDEO_AVC,
        PARAM_400, PARAM_500);
    NAPI_ASSERT(env, ReturnValue != nullptr, "OH_AVFormat_CreateVideoFormat failed");
    OH_AVFormat_Destroy(ReturnValue);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatCreateVideoFormatTwo(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *ReturnValue = OH_AVFormat_CreateVideoFormat(nullptr, PARAM_400, PARAM_500);
    NAPI_ASSERT(env, ReturnValue == nullptr, "OH_AVFormat_CreateVideoFormat failed");
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatCopyOne(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *AVFormat = OH_AVFormat_CreateVideoFormat(OH_AVCODEC_MIMETYPE_VIDEO_AVC, PARAM_400, PARAM_500);
    OH_AVFormat *NewAVFormat = OH_AVFormat_CreateVideoFormat(OH_AVCODEC_MIMETYPE_VIDEO_AVC, PARAM_400, PARAM_500);
    bool ReturnValue = OH_AVFormat_Copy(AVFormat, NewAVFormat);
    NAPI_ASSERT(env, ReturnValue == true, "OH_AVFormat_Copy failed");
    napi_value result = nullptr;
    OH_AVFormat_Destroy(NewAVFormat);
    OH_AVFormat_Destroy(AVFormat);
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatCopyTwo(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *NewAVFormat = nullptr;
    bool ReturnValue = OH_AVFormat_Copy(nullptr, NewAVFormat);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_Copy failed");
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatCopyThree(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *AVFormat = OH_AVFormat_CreateVideoFormat(OH_AVCODEC_MIMETYPE_VIDEO_AVC, PARAM_400, PARAM_500);
    bool ReturnValue = OH_AVFormat_Copy(AVFormat, nullptr);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_Copy failed");
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatDestroy(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *AVFormat = OH_AVFormat_CreateVideoFormat(OH_AVCODEC_MIMETYPE_VIDEO_AVC, PARAM_400, PARAM_500);
    struct OH_AVFormat *NewAVFormat = nullptr;
    OH_AVFormat_Destroy(AVFormat);
    bool ReturnValue = OH_AVFormat_Copy(AVFormat, NewAVFormat);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_Destroy failed");
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatDumpInfoOne(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetStringValue(AVFormat, OH_MD_KEY_TITLE, "aaa");
    const char *ReturnValue = OH_AVFormat_DumpInfo(AVFormat);
    NAPI_ASSERT(env, ReturnValue != nullptr, "OH_AVFormat_DumpInfo failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatDumpInfoTwo(napi_env env, napi_callback_info)
{
    const char *ReturnValue = OH_AVFormat_DumpInfo(nullptr);
    NAPI_ASSERT(env, ReturnValue == nullptr, "OH_AVFormat_DumpInfo failed");
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetBufferOne(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    int32_t buffernum = PARAM_10;
    size_t sizeIn = buffernum * sizeof(uint8_t);
    uint8_t *buffer = reinterpret_cast<uint8_t *>(malloc(sizeIn));
    OH_AVFormat_SetBuffer(AVFormat, bufferKey, buffer, sizeIn);
    uint8_t *addrout = nullptr;
    size_t sizeOut = PARAM_0;
    bool ReturnValue = OH_AVFormat_GetBuffer(AVFormat, bufferKey, &addrout, &sizeOut);
    NAPI_ASSERT(env, ReturnValue == true, "OH_AVFormat_GetBuffer failed");
    OH_AVFormat_Destroy(AVFormat);
    free(buffer);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetBufferTwo(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    int32_t buffernum = PARAM_10;
    size_t sizeIn = buffernum * sizeof(uint8_t);
    uint8_t *buffer = reinterpret_cast<uint8_t *>(malloc(sizeIn));
    OH_AVFormat_SetBuffer(AVFormat, bufferKey, buffer, sizeIn);
    uint8_t *addrout = nullptr;
    size_t sizeOut = PARAM_0;
    bool ReturnValue = OH_AVFormat_GetBuffer(nullptr, bufferKey, &addrout, &sizeOut);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_GetBuffer failed");
    OH_AVFormat_Destroy(AVFormat);
    free(buffer);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetBufferThree(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    int32_t buffernum = PARAM_10;
    size_t sizeIn = buffernum * sizeof(uint8_t);
    uint8_t *buffer = reinterpret_cast<uint8_t *>(malloc(sizeIn));
    OH_AVFormat_SetBuffer(AVFormat, bufferKey, buffer, sizeIn);
    uint8_t *addrout = nullptr;
    size_t sizeOut = PARAM_0;
    bool ReturnValue = OH_AVFormat_GetBuffer(AVFormat, nullptr, &addrout, &sizeOut);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_GetBuffer failed");
    OH_AVFormat_Destroy(AVFormat);
    free(buffer);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetBufferFour(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    int32_t buffernum = PARAM_10;
    size_t sizeIn = buffernum * sizeof(uint8_t);
    uint8_t *buffer = reinterpret_cast<uint8_t *>(malloc(sizeIn));
    OH_AVFormat_SetBuffer(AVFormat, bufferKey, buffer, sizeIn);
    size_t sizeOut = PARAM_0;
    bool ReturnValue = OH_AVFormat_GetBuffer(AVFormat, bufferKey, nullptr, &sizeOut);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_GetBuffer failed");
    OH_AVFormat_Destroy(AVFormat);
    free(buffer);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetBufferFive(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    int32_t buffernum = PARAM_10;
    size_t sizeIn = buffernum * sizeof(uint8_t);
    uint8_t *buffer = reinterpret_cast<uint8_t *>(malloc(sizeIn));
    OH_AVFormat_SetBuffer(AVFormat, bufferKey, buffer, sizeIn);
    uint8_t *addrout = nullptr;
    bool ReturnValue = OH_AVFormat_GetBuffer(AVFormat, bufferKey, &addrout, nullptr);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_GetBuffer failed");
    OH_AVFormat_Destroy(AVFormat);
    free(buffer);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetDoubleValueOne(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetDoubleValue(AVFormat, doubleKey, doubleValue);
    double doubleValueOut = PARAM_0;
    bool ReturnValue = OH_AVFormat_GetDoubleValue(AVFormat, doubleKey, &doubleValueOut);
    NAPI_ASSERT(env, ReturnValue == true, "OH_AVFormat_GetDoubleValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetDoubleValueTwo(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    double doubleValueOut = PARAM_0;
    bool ReturnValue = OH_AVFormat_GetDoubleValue(AVFormat, doubleKey, &doubleValueOut);
    OH_AVFormat_Destroy(AVFormat);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_GetDoubleValue failed");
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetDoubleValueThree(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetDoubleValue(AVFormat, doubleKey, doubleValue);
    double doubleValueOut = PARAM_0;
    bool ReturnValue = OH_AVFormat_GetDoubleValue(AVFormat, nullptr, &doubleValueOut);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_GetDoubleValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetDoubleValueFour(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetDoubleValue(AVFormat, doubleKey, doubleValue);
    bool ReturnValue = OH_AVFormat_GetDoubleValue(AVFormat, doubleKey, nullptr);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_GetDoubleValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetDoubleValueFive(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetDoubleValue(AVFormat, doubleKey, doubleValue);
    double doubleValueOut = PARAM_0;
    bool ReturnValue = OH_AVFormat_GetDoubleValue(nullptr, doubleKey, &doubleValueOut);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_GetDoubleValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetFloatValueOne(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetFloatValue(AVFormat, floatKey, floatValue);
    float floatValueOut = PARAM_0;
    bool ReturnValue = OH_AVFormat_GetFloatValue(AVFormat, floatKey, &floatValueOut);
    NAPI_ASSERT(env, ReturnValue == true, "OH_AVFormat_GetFloatValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetFloatValueTwo(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    float floatValueOut = PARAM_0;
    bool ReturnValue = OH_AVFormat_GetFloatValue(AVFormat, floatKey, &floatValueOut);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_GetFloatValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetFloatValueThree(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetFloatValue(AVFormat, floatKey, floatValue);
    float floatValueOut = PARAM_0;
    bool ReturnValue = OH_AVFormat_GetFloatValue(nullptr, floatKey, &floatValueOut);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_GetFloatValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetFloatValueFour(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetFloatValue(AVFormat, floatKey, floatValue);
    float floatValueOut = PARAM_0;
    bool ReturnValue = OH_AVFormat_GetFloatValue(AVFormat, nullptr, &floatValueOut);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_GetFloatValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetFloatValueFive(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetFloatValue(AVFormat, floatKey, floatValue);
    bool ReturnValue = OH_AVFormat_GetFloatValue(AVFormat, floatKey, nullptr);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_GetFloatValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetIntValueOne(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(AVFormat, intKey, intValue);
    int intValueOut = PARAM_0;
    bool ReturnValue = OH_AVFormat_GetIntValue(AVFormat, intKey, &intValueOut);
    NAPI_ASSERT(env, ReturnValue == true, "OH_AVFormat_GetIntValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetIntValueTwo(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    int intValueOut = PARAM_0;
    bool ReturnValue = OH_AVFormat_GetIntValue(AVFormat, intKey, &intValueOut);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_GetIntValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetIntValueThree(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(AVFormat, intKey, intValue);
    int intValueOut = PARAM_0;
    bool ReturnValue = OH_AVFormat_GetIntValue(nullptr, intKey, &intValueOut);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_GetIntValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetIntValueFour(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(AVFormat, intKey, intValue);
    int intValueOut = PARAM_0;
    bool ReturnValue = OH_AVFormat_GetIntValue(AVFormat, nullptr, &intValueOut);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_GetIntValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetIntValueFive(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(AVFormat, intKey, intValue);
    bool ReturnValue = OH_AVFormat_GetIntValue(AVFormat, intKey, nullptr);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_GetIntValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetLongValueOne(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetLongValue(AVFormat, longKey, longValue);
    int64_t longValueOut = PARAM_0;
    bool ReturnValue = OH_AVFormat_GetLongValue(AVFormat, longKey, &longValueOut);
    NAPI_ASSERT(env, ReturnValue == true, "OH_AVFormat_GetLongValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetLongValueTwo(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    int64_t longValueOut = PARAM_0;
    bool ReturnValue = OH_AVFormat_GetLongValue(AVFormat, longKey, &longValueOut);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_GetLongValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetLongValueThree(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetLongValue(AVFormat, longKey, longValue);
    int64_t longValueOut = PARAM_0;
    bool ReturnValue = OH_AVFormat_GetLongValue(nullptr, longKey, &longValueOut);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_GetLongValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetLongValueFour(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetLongValue(AVFormat, longKey, longValue);
    int64_t longValueOut = PARAM_0;
    bool ReturnValue = OH_AVFormat_GetLongValue(AVFormat, nullptr, &longValueOut);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_GetLongValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetLongValueFive(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetLongValue(AVFormat, longKey, longValue);
    bool ReturnValue = OH_AVFormat_GetLongValue(AVFormat, longKey, nullptr);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_GetLongValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetStringValueOne(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetStringValue(AVFormat, stringKey, stringValue);
    const char *stringValueOut = nullptr;
    bool ReturnValue = OH_AVFormat_GetStringValue(AVFormat, stringKey, &stringValueOut);
    NAPI_ASSERT(env, ReturnValue == true, "OH_AVFormat_GetStringValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetStringValueTwo(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    const char *stringValueOut = nullptr;
    bool ReturnValue = OH_AVFormat_GetStringValue(AVFormat, stringKey, &stringValueOut);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_GetStringValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetStringValueThree(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetStringValue(AVFormat, stringKey, stringValue);
    const char *stringValueOut = nullptr;
    bool ReturnValue = OH_AVFormat_GetStringValue(nullptr, stringKey, &stringValueOut);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_GetStringValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetStringValueFour(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetStringValue(AVFormat, stringKey, stringValue);
    const char *stringValueOut = nullptr;
    bool ReturnValue = OH_AVFormat_GetStringValue(AVFormat, nullptr, &stringValueOut);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_GetStringValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatGetStringValueFive(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetStringValue(AVFormat, stringKey, stringValue);
    bool ReturnValue = OH_AVFormat_GetStringValue(AVFormat, stringKey, nullptr);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_GetStringValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatSetBufferOne(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    int32_t buffernum = PARAM_10;
    size_t sizeIn = buffernum * sizeof(uint8_t);
    uint8_t *buffer = reinterpret_cast<uint8_t *>(malloc(sizeIn));
    bool ReturnValue = OH_AVFormat_SetBuffer(AVFormat, bufferKey, buffer, sizeIn);
    NAPI_ASSERT(env, ReturnValue == true, "OH_AVFormat_SetBuffer failed");
    OH_AVFormat_Destroy(AVFormat);
    free(buffer);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatSetBufferTwo(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    int32_t buffernum = PARAM_10;
    size_t sizeIn = buffernum * sizeof(uint8_t);
    uint8_t *buffer = reinterpret_cast<uint8_t *>(malloc(sizeIn));
    bool ReturnValue = OH_AVFormat_SetBuffer(nullptr, bufferKey, buffer, sizeIn);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_SetBuffer failed");
    OH_AVFormat_Destroy(AVFormat);
    free(buffer);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatSetBufferThree(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    int32_t buffernum = PARAM_10;
    size_t sizeIn = buffernum * sizeof(uint8_t);
    uint8_t *buffer = reinterpret_cast<uint8_t *>(malloc(sizeIn));
    bool ReturnValue = OH_AVFormat_SetBuffer(AVFormat, nullptr, buffer, sizeIn);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_SetBuffer failed");
    OH_AVFormat_Destroy(AVFormat);
    free(buffer);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatSetBufferFour(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    int32_t buffernum = PARAM_10;
    size_t sizeIn = buffernum * sizeof(uint8_t);
    bool ReturnValue = OH_AVFormat_SetBuffer(AVFormat, bufferKey, nullptr, sizeIn);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_SetBuffer failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatSetDoubleValueOne(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    bool ReturnValue = OH_AVFormat_SetDoubleValue(AVFormat, doubleKey, doubleValue);
    NAPI_ASSERT(env, ReturnValue == true, "OH_AVFormat_SetDoubleValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatSetDoubleValueTwo(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    bool ReturnValue = OH_AVFormat_SetDoubleValue(nullptr, doubleKey, doubleValue);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_SetDoubleValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatSetDoubleValueThree(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    bool ReturnValue = OH_AVFormat_SetDoubleValue(AVFormat, nullptr, doubleValue);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_SetDoubleValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatSetFloatValueOne(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    bool ReturnValue = OH_AVFormat_SetFloatValue(AVFormat, floatKey, floatValue);
    NAPI_ASSERT(env, ReturnValue == true, "OH_AVFormat_SetFloatValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatSetFloatValueTwo(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    bool ReturnValue = OH_AVFormat_SetFloatValue(nullptr, floatKey, floatValue);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_SetFloatValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatSetFloatValueThree(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    bool ReturnValue = OH_AVFormat_SetFloatValue(AVFormat, nullptr, floatValue);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_SetFloatValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatSetIntValueOne(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    bool ReturnValue = OH_AVFormat_SetIntValue(AVFormat, intKey, intValue);
    NAPI_ASSERT(env, ReturnValue == true, "OH_AVFormat_SetIntValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatSetIntValueTwo(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    bool ReturnValue = OH_AVFormat_SetIntValue(nullptr, intKey, intValue);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_SetIntValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatSetIntValueThree(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    bool ReturnValue = OH_AVFormat_SetIntValue(AVFormat, nullptr, intValue);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_SetIntValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatSetLongValueOne(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    bool ReturnValue = OH_AVFormat_SetLongValue(AVFormat, longKey, longValue);
    NAPI_ASSERT(env, ReturnValue == true, "OH_AVFormat_SetLongValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatSetLongValueTwo(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    bool ReturnValue = OH_AVFormat_SetLongValue(nullptr, longKey, longValue);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_SetLongValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatSetLongValueThree(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    bool ReturnValue = OH_AVFormat_SetLongValue(AVFormat, nullptr, longValue);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_SetLongValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatSetStringValueOne(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    bool ReturnValue = OH_AVFormat_SetStringValue(AVFormat, stringKey, stringValue);
    NAPI_ASSERT(env, ReturnValue == true, "OH_AVFormat_SetStringValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatSetStringValueTwo(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    bool ReturnValue = OH_AVFormat_SetStringValue(nullptr, stringKey, stringValue);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_SetStringValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatSetStringValueThree(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    bool ReturnValue = OH_AVFormat_SetStringValue(AVFormat, nullptr, stringValue);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_SetStringValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatSetStringValueFour(napi_env env, napi_callback_info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    bool ReturnValue = OH_AVFormat_SetStringValue(AVFormat, stringKey, nullptr);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_SetStringValue failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVMemoryCreateOne(napi_env env, napi_callback_info)
{
    OH_AVMemory *avMemBuffer = OH_AVMemory_Create(INFO_SIZE);
    NAPI_ASSERT(env, avMemBuffer != nullptr, "OH_AVMemory_Create failed");
    OH_AVMemory_Destroy(avMemBuffer);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVMemoryCreateTwo(napi_env env, napi_callback_info)
{
    OH_AVMemory *avMemBuffer = OH_AVMemory_Create(FPARAM_1);
    NAPI_ASSERT(env, avMemBuffer == nullptr, "OH_AVMemory_Create failed");
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVMemoryDestroyOne(napi_env env, napi_callback_info)
{
    OH_AVMemory *avMemBuffer = OH_AVMemory_Create(INFO_SIZE);
    OH_AVErrCode ReturnValue = OH_AVMemory_Destroy(avMemBuffer);
    NAPI_ASSERT(env, ReturnValue == AV_ERR_OK, "OH_AVMemory_Destroy failed");
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVMemoryDestroyTwo(napi_env env, napi_callback_info)
{
    OH_AVErrCode ReturnValue = OH_AVMemory_Destroy(nullptr);
    NAPI_ASSERT(env, ReturnValue == AV_ERR_INVALID_VAL, "OH_AVMemory_Destroy failed");
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVMemoryGetAddrOne(napi_env env, napi_callback_info)
{
    OH_AVMemory *avMemBuffer = OH_AVMemory_Create(INFO_SIZE);
    uint8_t *data = OH_AVMemory_GetAddr(avMemBuffer);
    NAPI_ASSERT(env, data != nullptr, "OH_AVMemory_GetAddr failed");
    OH_AVMemory_Destroy(avMemBuffer);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVMemoryGetAddrTwo(napi_env env, napi_callback_info)
{
    uint8_t *data = OH_AVMemory_GetAddr(nullptr);
    NAPI_ASSERT(env, data == nullptr, "OH_AVMemory_GetAddr failed");
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVMemoryGetSizeOne(napi_env env, napi_callback_info)
{
    OH_AVMemory *avMemBuffer = OH_AVMemory_Create(INFO_SIZE);
    int32_t data = OH_AVMemory_GetSize(avMemBuffer);
    NAPI_ASSERT(env, data == INFO_SIZE, "OH_AVMemory_GetSize failed");
    napi_value result = nullptr;
    OH_AVMemory_Destroy(avMemBuffer);
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVMemoryGetSizeTwo(napi_env env, napi_callback_info)
{
    int32_t data = OH_AVMemory_GetSize(nullptr);
    NAPI_ASSERT(env, data == FPARAM_1, "OH_AVMemory_GetSize failed");
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatCreateAudioFormatAVC(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *ReturnValue = OH_AVFormat_CreateAudioFormat(OH_AVCODEC_MIMETYPE_VIDEO_AVC,
        PARAM_44100, PARAM_2);
    NAPI_ASSERT(env, ReturnValue != nullptr, "OH_AVFormat_CreateAudioFormat failed");
    OH_AVFormat_Destroy(ReturnValue);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatCreateAudioFormatVORBIS(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *ReturnValue = OH_AVFormat_CreateAudioFormat(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS,
        PARAM_44100, PARAM_2);
    NAPI_ASSERT(env, ReturnValue != nullptr, "OH_AVFormat_CreateAudioFormat failed");
    OH_AVFormat_Destroy(ReturnValue);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatCreateAudioFormatVORBISMPEG(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *ReturnValue = OH_AVFormat_CreateAudioFormat(OH_AVCODEC_MIMETYPE_AUDIO_MPEG,
        PARAM_44100, PARAM_2);
    NAPI_ASSERT(env, ReturnValue != nullptr, "OH_AVFormat_CreateAudioFormat failed");
    OH_AVFormat_Destroy(ReturnValue);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatCreateVideoFormatHEVC(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *ReturnValue = OH_AVFormat_CreateVideoFormat(OH_AVCODEC_MIMETYPE_VIDEO_HEVC,
        PARAM_400, PARAM_500);
    NAPI_ASSERT(env, ReturnValue != nullptr, "OH_AVFormat_CreateVideoFormat failed");
    OH_AVFormat_Destroy(ReturnValue);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatCreateVideoFormatMPEG4(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *ReturnValue = OH_AVFormat_CreateVideoFormat(OH_AVCODEC_MIMETYPE_VIDEO_MPEG4,
        PARAM_400, PARAM_500);
    NAPI_ASSERT(env, ReturnValue != nullptr, "OH_AVFormat_CreateVideoFormat failed");
    OH_AVFormat_Destroy(ReturnValue);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatDestroyVideoHEVC(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *AVFormat = OH_AVFormat_CreateVideoFormat(OH_AVCODEC_MIMETYPE_VIDEO_HEVC,
        PARAM_400, PARAM_500);
    struct OH_AVFormat *NewAVFormat = nullptr;
    OH_AVFormat_Destroy(AVFormat);
    bool ReturnValue = OH_AVFormat_Copy(AVFormat, NewAVFormat);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_Destroy failed");
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatDestroyVideoMPEG4(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *AVFormat = OH_AVFormat_CreateVideoFormat(OH_AVCODEC_MIMETYPE_VIDEO_MPEG4,
        PARAM_400, PARAM_500);
    struct OH_AVFormat *NewAVFormat = nullptr;
    OH_AVFormat_Destroy(AVFormat);
    bool ReturnValue = OH_AVFormat_Copy(AVFormat, NewAVFormat);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_Destroy failed");
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatDestroyAudioFLAC(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *AVFormat = OH_AVFormat_CreateAudioFormat(OH_AVCODEC_MIMETYPE_AUDIO_FLAC, PARAM_44100, PARAM_2);
    struct OH_AVFormat *NewAVFormat = nullptr;
    OH_AVFormat_Destroy(AVFormat);
    bool ReturnValue = OH_AVFormat_Copy(AVFormat, NewAVFormat);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_Destroy failed");
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatDestroyAudioAAC(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *AVFormat = OH_AVFormat_CreateAudioFormat(OH_AVCODEC_MIMETYPE_AUDIO_AAC, PARAM_44100, PARAM_2);
    struct OH_AVFormat *NewAVFormat = nullptr;
    OH_AVFormat_Destroy(AVFormat);
    bool ReturnValue = OH_AVFormat_Copy(AVFormat, NewAVFormat);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_Destroy failed");
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatDestroyAudioVORBIS(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *AVFormat = OH_AVFormat_CreateAudioFormat(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS,
        PARAM_44100, PARAM_2);
    struct OH_AVFormat *NewAVFormat = nullptr;
    OH_AVFormat_Destroy(AVFormat);
    bool ReturnValue = OH_AVFormat_Copy(AVFormat, NewAVFormat);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_Destroy failed");
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatDestroyAudioMPEG(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *AVFormat = OH_AVFormat_CreateAudioFormat(OH_AVCODEC_MIMETYPE_AUDIO_MPEG, PARAM_44100, PARAM_2);
    struct OH_AVFormat *NewAVFormat = nullptr;
    OH_AVFormat_Destroy(AVFormat);
    bool ReturnValue = OH_AVFormat_Copy(AVFormat, NewAVFormat);
    NAPI_ASSERT(env, ReturnValue == false, "OH_AVFormat_Destroy failed");
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatCopyVideoHEVC(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *AVFormat = OH_AVFormat_CreateVideoFormat(OH_AVCODEC_MIMETYPE_VIDEO_HEVC, PARAM_400, PARAM_500);
    OH_AVFormat *NewAVFormat = OH_AVFormat_CreateVideoFormat(OH_AVCODEC_MIMETYPE_VIDEO_HEVC, PARAM_400, PARAM_500);
    bool ReturnValue = OH_AVFormat_Copy(AVFormat, NewAVFormat);
    NAPI_ASSERT(env, ReturnValue == true, "OH_AVFormat_Copy failed");
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatCopyVideoMPEG4(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *AVFormat = OH_AVFormat_CreateVideoFormat(OH_AVCODEC_MIMETYPE_VIDEO_MPEG4, PARAM_400, PARAM_500);
    OH_AVFormat *NewAVFormat = OH_AVFormat_CreateVideoFormat(OH_AVCODEC_MIMETYPE_VIDEO_MPEG4, PARAM_400, PARAM_500);
    bool ReturnValue = OH_AVFormat_Copy(AVFormat, NewAVFormat);
    NAPI_ASSERT(env, ReturnValue == true, "OH_AVFormat_Copy failed");
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatCopyAudioAAC(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *AVFormat = OH_AVFormat_CreateAudioFormat(OH_AVCODEC_MIMETYPE_AUDIO_AAC, PARAM_44100, PARAM_2);
    OH_AVFormat *NewAVFormat = OH_AVFormat_CreateAudioFormat(OH_AVCODEC_MIMETYPE_AUDIO_AAC, PARAM_44100, PARAM_2);
    bool ReturnValue = OH_AVFormat_Copy(AVFormat, NewAVFormat);
    NAPI_ASSERT(env, ReturnValue == true, "OH_AVFormat_Copy failed");
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatCopyAudioFLAC(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *AVFormat = OH_AVFormat_CreateAudioFormat(OH_AVCODEC_MIMETYPE_AUDIO_FLAC, PARAM_44100, PARAM_2);
    OH_AVFormat *NewAVFormat = OH_AVFormat_CreateAudioFormat(OH_AVCODEC_MIMETYPE_AUDIO_FLAC, PARAM_44100, PARAM_2);
    bool ReturnValue = OH_AVFormat_Copy(AVFormat, NewAVFormat);
    NAPI_ASSERT(env, ReturnValue == true, "OH_AVFormat_Copy failed");
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatCopyAudioVORBIS(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *AVFormat = OH_AVFormat_CreateAudioFormat(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS,
        PARAM_44100, PARAM_2);
    OH_AVFormat *NewAVFormat = OH_AVFormat_CreateAudioFormat(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS, PARAM_44100, PARAM_2);
    bool ReturnValue = OH_AVFormat_Copy(AVFormat, NewAVFormat);
    NAPI_ASSERT(env, ReturnValue == true, "OH_AVFormat_Copy failed");
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatCopyAudioMPEG(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *AVFormat = OH_AVFormat_CreateAudioFormat(OH_AVCODEC_MIMETYPE_AUDIO_MPEG, PARAM_44100, PARAM_2);
    OH_AVFormat *NewAVFormat = OH_AVFormat_CreateAudioFormat(OH_AVCODEC_MIMETYPE_AUDIO_MPEG, PARAM_44100, PARAM_2);
    bool ReturnValue = OH_AVFormat_Copy(AVFormat, NewAVFormat);
    NAPI_ASSERT(env, ReturnValue == true, "OH_AVFormat_Copy failed");
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatDumpInfoARTIST(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetStringValue(AVFormat, OH_MD_KEY_ARTIST, "aaa");
    const char *ReturnValue = OH_AVFormat_DumpInfo(AVFormat);
    NAPI_ASSERT(env, ReturnValue != nullptr, "OH_AVFormat_DumpInfo failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatDumpInfoALBUM(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetStringValue(AVFormat, OH_MD_KEY_ALBUM, "aaa");
    const char *ReturnValue = OH_AVFormat_DumpInfo(AVFormat);
    NAPI_ASSERT(env, ReturnValue != nullptr, "OH_AVFormat_DumpInfo failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatDumpInfoALBUMARTIST(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetStringValue(AVFormat, OH_MD_KEY_ALBUM_ARTIST, "aaa");
    const char *ReturnValue = OH_AVFormat_DumpInfo(AVFormat);
    NAPI_ASSERT(env, ReturnValue != nullptr, "OH_AVFormat_DumpInfo failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatDumpInfoDATE(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetStringValue(AVFormat, OH_MD_KEY_DATE, "aaa");
    const char *ReturnValue = OH_AVFormat_DumpInfo(AVFormat);
    NAPI_ASSERT(env, ReturnValue != nullptr, "OH_AVFormat_DumpInfo failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatDumpInfoCOMMENT(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetStringValue(AVFormat, OH_MD_KEY_COMMENT, "aaa");
    const char *ReturnValue = OH_AVFormat_DumpInfo(AVFormat);
    NAPI_ASSERT(env, ReturnValue != nullptr, "OH_AVFormat_DumpInfo failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatDumpInfoGENRE(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetStringValue(AVFormat, OH_MD_KEY_GENRE, "aaa");
    const char *ReturnValue = OH_AVFormat_DumpInfo(AVFormat);
    NAPI_ASSERT(env, ReturnValue != nullptr, "OH_AVFormat_DumpInfo failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatDumpInfoCOPYRIGHT(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetStringValue(AVFormat, OH_MD_KEY_COPYRIGHT, "aaa");
    const char *ReturnValue = OH_AVFormat_DumpInfo(AVFormat);
    NAPI_ASSERT(env, ReturnValue != nullptr, "OH_AVFormat_DumpInfo failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatDumpInfoLANGUAGE(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetStringValue(AVFormat, OH_MD_KEY_LANGUAGE, "aaa");
    const char *ReturnValue = OH_AVFormat_DumpInfo(AVFormat);
    NAPI_ASSERT(env, ReturnValue != nullptr, "OH_AVFormat_DumpInfo failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatDumpInfoDESCRIPTION(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetStringValue(AVFormat, OH_MD_KEY_DESCRIPTION, "aaa");
    const char *ReturnValue = OH_AVFormat_DumpInfo(AVFormat);
    NAPI_ASSERT(env, ReturnValue != nullptr, "OH_AVFormat_DumpInfo failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static napi_value MultimediaCoreAVFormatDumpInfoLYRICS(napi_env env, napi_callback_info)
{
    struct OH_AVFormat *AVFormat = OH_AVFormat_Create();
    OH_AVFormat_SetStringValue(AVFormat, OH_MD_KEY_LYRICS, "aaa");
    const char *ReturnValue = OH_AVFormat_DumpInfo(AVFormat);
    NAPI_ASSERT(env, ReturnValue != nullptr, "OH_AVFormat_DumpInfo failed");
    OH_AVFormat_Destroy(AVFormat);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

static const char *domain(napi_env env, napi_callback_info info)
{
    size_t argc = PARAM_1;
    napi_value args[PARAM_1] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    int param = PARAM_0;
    napi_get_value_int32(env, args[PARAM_0], &param);
    const char *key = nullptr;
    if (param == KEY_RANGE_FLAG) {
        key = OH_MD_KEY_RANGE_FLAG;
    } else if (param == KEY_COLOR_PRIMARIES) {
        key = OH_MD_KEY_COLOR_PRIMARIES;
    } else if (param == KEY_TRANSFER_CHARACTERISTICS) {
        key = OH_MD_KEY_TRANSFER_CHARACTERISTICS;
    } else if (param == KEY_MATRIX_COEFFICIENTS) {
        key = OH_MD_KEY_MATRIX_COEFFICIENTS;
    } else if (param == KEY_REQUEST_I_FRAME) {
        key = OH_MD_KEY_REQUEST_I_FRAME;
    } else if (param == KEY_CODEC_CONFIG) {
        key = OH_MD_KEY_CODEC_CONFIG;
    } else if (param == KEY_TITLE) {
        key = OH_MD_KEY_TITLE;
    } else if (param == KEY_ARTIST) {
        key = OH_MD_KEY_ARTIST;
    } else if (param == KEY_ALBUM) {
        key = OH_MD_KEY_ALBUM;
    } else if (param == KEY_ALBUM_ARTIST) {
        key = OH_MD_KEY_ALBUM_ARTIST;
    } else if (param == KEY_DATE) {
        key = OH_MD_KEY_DATE;
    } else if (param == KEY_COMMENT) {
        key = OH_MD_KEY_COMMENT;
    } else if (param == KEY_GENRE) {
        key = OH_MD_KEY_GENRE;
    } else if (param == KEY_COPYRIGHT) {
        key = OH_MD_KEY_COPYRIGHT;
    } else if (param == KEY_LANGUAGE) {
        key = OH_MD_KEY_LANGUAGE;
    } else if (param == KEY_DESCRIPTION) {
        key = OH_MD_KEY_DESCRIPTION;
    } else if (param == KEY_LYRICS) {
        key = OH_MD_KEY_LYRICS;
    } else if (param == KEY_TRACK_COUNT) {
        key = OH_MD_KEY_TRACK_COUNT;
    } else if (param == KEY_CHANNEL_LAYOUT) {
        key = OH_MD_KEY_CHANNEL_LAYOUT;
    } else if (param == KEY_BITS_PER_CODED_SAMPLE) {
        key = OH_MD_KEY_BITS_PER_CODED_SAMPLE;
    } else if (param == KEY_AAC_IS_ADTS) {
        key = OH_MD_KEY_AAC_IS_ADTS;
    } else if (param == KEY_SBR) {
        key = OH_MD_KEY_SBR;
    } else if (param == KEY_COMPLIANCE_LEVEL) {
        key = OH_MD_KEY_COMPLIANCE_LEVEL;
    } else if (param == KEY_IDENTIFICATION_HEADER) {
        key = OH_MD_KEY_IDENTIFICATION_HEADER;
    } else if (param == KEY_SETUP_HEADER) {
        key = OH_MD_KEY_SETUP_HEADER;
    } else if (param == KEY_SCALING_MODE) {
        key = OH_MD_KEY_SCALING_MODE;
    } else if (param == MAX_INPUT_BUFFER_COUNT) {
        key = OH_MD_MAX_INPUT_BUFFER_COUNT;
    } else if (param == MAX_OUTPUT_BUFFER_COUNT) {
        key = OH_MD_MAX_OUTPUT_BUFFER_COUNT;
    } else if (param == KEY_TRACK_TYPE) {
        key = OH_MD_KEY_TRACK_TYPE;
    } else if (param == KEY_CODEC_MIME) {
        key = OH_MD_KEY_CODEC_MIME;
    } else if (param == KEY_DURATION) {
        key = OH_MD_KEY_DURATION;
    } else if (param == KEY_BITRATE) {
        key = OH_MD_KEY_BITRATE;
    } else if (param == KEY_MAX_INPUT_SIZE) {
        key = OH_MD_KEY_MAX_INPUT_SIZE;
    } else if (param == KEY_WIDTH) {
        key = OH_MD_KEY_WIDTH;
    } else if (param == KEY_HEIGHT) {
        key = OH_MD_KEY_HEIGHT;
    } else if (param == KEY_PIXEL_FORMAT) {
        key = OH_MD_KEY_PIXEL_FORMAT;
    } else if (param == KEY_FRAME_RATE) {
        key = OH_MD_KEY_FRAME_RATE;
    } else if (param == KEY_AUD_CHANNEL_COUNT) {
        key = OH_MD_KEY_AUD_CHANNEL_COUNT;
    } else if (param == KEY_AUD_SAMPLE_RATE) {
        key = OH_MD_KEY_AUD_SAMPLE_RATE;
    } else if (param == KEY_I_FRAME_INTERVAL) {
        key = OH_MD_KEY_I_FRAME_INTERVAL;
    } else if (param == KEY_ROTATION) {
        key = OH_MD_KEY_ROTATION;
    } else {
        key = OH_MD_KEY_ROTATION;
    }
    return key;
}

static napi_value MultimediaCoreAVFormatSetBufferAll(napi_env env, napi_callback_info info)
{
    OH_AVFormat *AVFormat = OH_AVFormat_Create();
    int32_t buffernum = PARAM_10;
    size_t sizeIn = buffernum * sizeof(uint8_t);
    uint8_t *buffer = reinterpret_cast<uint8_t *>(malloc(sizeIn));
    const char *key = domain(env, info);
    bool ReturnValue = OH_AVFormat_SetBuffer(AVFormat, key, buffer, sizeIn);
    NAPI_ASSERT(env, ReturnValue == true, "OH_AVFormat_SetBuffer failed");
    OH_AVFormat_Destroy(AVFormat);
    free(buffer);
    napi_value result = nullptr;
    napi_create_int32(env, SUCCESS, &result);
    return result;
}

EXTERN_C_START
static napi_value Init(napi_env env, napi_value exports) {
    napi_property_descriptor desc[] = {
        {"multimediaCoreAVFormatCreate", nullptr, MultimediaCoreAVFormatCreate, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"multimediaCoreAVFormatCreateAudioFormatOne", nullptr, MultimediaCoreAVFormatCreateAudioFormatOne, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatCreateAudioFormatTwo", nullptr, MultimediaCoreAVFormatCreateAudioFormatTwo, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatCreateVideoFormatOne", nullptr, MultimediaCoreAVFormatCreateVideoFormatOne, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatCreateVideoFormatTwo", nullptr, MultimediaCoreAVFormatCreateVideoFormatTwo, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatCopyOne", nullptr, MultimediaCoreAVFormatCopyOne, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"multimediaCoreAVFormatCopyTwo", nullptr, MultimediaCoreAVFormatCopyTwo, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"multimediaCoreAVFormatCopyThree", nullptr, MultimediaCoreAVFormatCopyThree, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"multimediaCoreAVFormatDestroy", nullptr, MultimediaCoreAVFormatDestroy, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"multimediaCoreAVFormatDumpInfoOne", nullptr, MultimediaCoreAVFormatDumpInfoOne, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"multimediaCoreAVFormatDumpInfoTwo", nullptr, MultimediaCoreAVFormatDumpInfoTwo, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"multimediaCoreAVFormatGetBufferOne", nullptr, MultimediaCoreAVFormatGetBufferOne, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"multimediaCoreAVFormatGetBufferTwo", nullptr, MultimediaCoreAVFormatGetBufferTwo, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"multimediaCoreAVFormatGetBufferThree", nullptr, MultimediaCoreAVFormatGetBufferThree, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatGetBufferFour", nullptr, MultimediaCoreAVFormatGetBufferFour, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"multimediaCoreAVFormatGetBufferFive", nullptr, MultimediaCoreAVFormatGetBufferFive, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"multimediaCoreAVFormatGetDoubleValueOne", nullptr, MultimediaCoreAVFormatGetDoubleValueOne, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatGetDoubleValueTwo", nullptr, MultimediaCoreAVFormatGetDoubleValueTwo, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatGetDoubleValueThree", nullptr, MultimediaCoreAVFormatGetDoubleValueThree, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatGetDoubleValueFour", nullptr, MultimediaCoreAVFormatGetDoubleValueFour, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatGetDoubleValueFive", nullptr, MultimediaCoreAVFormatGetDoubleValueFive, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatGetFloatValueOne", nullptr, MultimediaCoreAVFormatGetFloatValueOne, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatGetFloatValueTwo", nullptr, MultimediaCoreAVFormatGetFloatValueTwo, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatGetFloatValueThree", nullptr, MultimediaCoreAVFormatGetFloatValueThree, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatGetFloatValueFour", nullptr, MultimediaCoreAVFormatGetFloatValueFour, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatGetFloatValueFive", nullptr, MultimediaCoreAVFormatGetFloatValueFive, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatGetIntValueOne", nullptr, MultimediaCoreAVFormatGetIntValueOne, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatGetIntValueTwo", nullptr, MultimediaCoreAVFormatGetIntValueTwo, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatGetIntValueThree", nullptr, MultimediaCoreAVFormatGetIntValueThree, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatGetIntValueFour", nullptr, MultimediaCoreAVFormatGetIntValueFour, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatGetIntValueFive", nullptr, MultimediaCoreAVFormatGetIntValueFive, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatGetLongValueOne", nullptr, MultimediaCoreAVFormatGetLongValueOne, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatGetLongValueTwo", nullptr, MultimediaCoreAVFormatGetLongValueTwo, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatGetLongValueThree", nullptr, MultimediaCoreAVFormatGetLongValueThree, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatGetLongValueFour", nullptr, MultimediaCoreAVFormatGetLongValueFour, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatGetLongValueFive", nullptr, MultimediaCoreAVFormatGetLongValueFive, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatGetStringValueOne", nullptr, MultimediaCoreAVFormatGetStringValueOne, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatGetStringValueTwo", nullptr, MultimediaCoreAVFormatGetStringValueTwo, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatGetStringValueThree", nullptr, MultimediaCoreAVFormatGetStringValueThree, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatGetStringValueFour", nullptr, MultimediaCoreAVFormatGetStringValueFour, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatGetStringValueFive", nullptr, MultimediaCoreAVFormatGetStringValueFive, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatSetBufferOne", nullptr, MultimediaCoreAVFormatSetBufferOne, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"multimediaCoreAVFormatSetBufferTwo", nullptr, MultimediaCoreAVFormatSetBufferTwo, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"multimediaCoreAVFormatSetBufferThree", nullptr, MultimediaCoreAVFormatSetBufferThree, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatSetBufferFour", nullptr, MultimediaCoreAVFormatSetBufferFour, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"multimediaCoreAVFormatSetDoubleValueOne", nullptr, MultimediaCoreAVFormatSetDoubleValueOne, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatSetDoubleValueTwo", nullptr, MultimediaCoreAVFormatSetDoubleValueTwo, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatSetDoubleValueThree", nullptr, MultimediaCoreAVFormatSetDoubleValueThree, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatSetFloatValueOne", nullptr, MultimediaCoreAVFormatSetFloatValueOne, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatSetFloatValueTwo", nullptr, MultimediaCoreAVFormatSetFloatValueTwo, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatSetFloatValueThree", nullptr, MultimediaCoreAVFormatSetFloatValueThree, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatSetIntValueOne", nullptr, MultimediaCoreAVFormatSetIntValueOne, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatSetIntValueTwo", nullptr, MultimediaCoreAVFormatSetIntValueTwo, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatSetIntValueThree", nullptr, MultimediaCoreAVFormatSetIntValueThree, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatSetLongValueOne", nullptr, MultimediaCoreAVFormatSetLongValueOne, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatSetLongValueTwo", nullptr, MultimediaCoreAVFormatSetLongValueTwo, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatSetLongValueThree", nullptr, MultimediaCoreAVFormatSetLongValueThree, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"MultimediaCoreAVFormatSetStringValueOne", nullptr, MultimediaCoreAVFormatSetStringValueOne, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"MultimediaCoreAVFormatSetStringValueTwo", nullptr, MultimediaCoreAVFormatSetStringValueTwo, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"MultimediaCoreAVFormatSetStringValueThree", nullptr, MultimediaCoreAVFormatSetStringValueThree, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"MultimediaCoreAVFormatSetStringValueFour", nullptr, MultimediaCoreAVFormatSetStringValueFour, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"multimediaCoreAVMemoryCreateOne", nullptr, MultimediaCoreAVMemoryCreateOne, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"multimediaCoreAVMemoryCreateTwo", nullptr, MultimediaCoreAVMemoryCreateTwo, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"multimediaCoreAVMemoryDestroyOne", nullptr, MultimediaCoreAVMemoryDestroyOne, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"multimediaCoreAVMemoryDestroyTwo", nullptr, MultimediaCoreAVMemoryDestroyTwo, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"multimediaCoreAVMemoryGetAddrOne", nullptr, MultimediaCoreAVMemoryGetAddrOne, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"multimediaCoreAVMemoryGetAddrTwo", nullptr, MultimediaCoreAVMemoryGetAddrTwo, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"multimediaCoreAVMemoryGetSizeOne", nullptr, MultimediaCoreAVMemoryGetSizeOne, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"multimediaCoreAVMemoryGetSizeTwo", nullptr, MultimediaCoreAVMemoryGetSizeTwo, nullptr, nullptr, nullptr,
         napi_default, nullptr},

        {"multimediaCoreAVFormatCreateAudioFormatAVC", nullptr, MultimediaCoreAVFormatCreateAudioFormatAVC, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatCreateAudioFormatVORBIS", nullptr, MultimediaCoreAVFormatCreateAudioFormatVORBIS,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatCreateAudioFormatVORBISMPEG", nullptr, 
         MultimediaCoreAVFormatCreateAudioFormatVORBISMPEG, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatCreateVideoFormatHEVC", nullptr, MultimediaCoreAVFormatCreateVideoFormatHEVC, nullptr, 
         nullptr, nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatCreateVideoFormatMPEG4", nullptr, MultimediaCoreAVFormatCreateVideoFormatMPEG4, nullptr,
         nullptr, nullptr, napi_default, nullptr},

        {"multimediaCoreAVFormatDestroyVideoHEVC", nullptr, MultimediaCoreAVFormatDestroyVideoHEVC, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatDestroyVideoMPEG4", nullptr, MultimediaCoreAVFormatDestroyVideoMPEG4, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatDestroyAudioFLAC", nullptr, MultimediaCoreAVFormatDestroyAudioFLAC, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatDestroyAudioAAC", nullptr, MultimediaCoreAVFormatDestroyAudioAAC, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatDestroyAudioVORBIS", nullptr, MultimediaCoreAVFormatDestroyAudioVORBIS, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatDestroyAudioMPEG", nullptr, MultimediaCoreAVFormatDestroyAudioMPEG, nullptr, nullptr,
         nullptr, napi_default, nullptr},

        {"multimediaCoreAVFormatCopyVideoHEVC", nullptr, MultimediaCoreAVFormatCopyVideoHEVC, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"multimediaCoreAVFormatCopyVideoMPEG4", nullptr, MultimediaCoreAVFormatCopyVideoMPEG4, nullptr, nullptr,
         nullptr, napi_default, nullptr},

        {"multimediaCoreAVFormatCopyAudioAAC", nullptr, MultimediaCoreAVFormatCopyAudioAAC, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"multimediaCoreAVFormatCopyAudioFLAC", nullptr, MultimediaCoreAVFormatCopyAudioFLAC, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"multimediaCoreAVFormatCopyAudioVORBIS", nullptr, MultimediaCoreAVFormatCopyAudioVORBIS, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatCopyAudioMPEG", nullptr, MultimediaCoreAVFormatCopyAudioMPEG, nullptr, nullptr, nullptr,
         napi_default, nullptr},

        {"multimediaCoreAVFormatDumpInfoARTIST", nullptr, MultimediaCoreAVFormatDumpInfoARTIST, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatDumpInfoALBUM", nullptr, MultimediaCoreAVFormatDumpInfoALBUM, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"multimediaCoreAVFormatDumpInfoALBUMARTIST", nullptr, MultimediaCoreAVFormatDumpInfoALBUMARTIST, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatDumpInfoDATE", nullptr, MultimediaCoreAVFormatDumpInfoDATE, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"multimediaCoreAVFormatDumpInfoCOMMENT", nullptr, MultimediaCoreAVFormatDumpInfoCOMMENT, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatDumpInfoGENRE", nullptr, MultimediaCoreAVFormatDumpInfoGENRE, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"multimediaCoreAVFormatDumpInfoCOPYRIGHT", nullptr, MultimediaCoreAVFormatDumpInfoCOPYRIGHT, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatDumpInfoLANGUAGE", nullptr, MultimediaCoreAVFormatDumpInfoLANGUAGE, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatDumpInfoDESCRIPTION", nullptr, MultimediaCoreAVFormatDumpInfoDESCRIPTION, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatDumpInfoLYRICS", nullptr, MultimediaCoreAVFormatDumpInfoLYRICS, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"multimediaCoreAVFormatSetBufferAll", nullptr, MultimediaCoreAVFormatSetBufferAll, nullptr, nullptr, nullptr,
         napi_default, nullptr},
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
    .nm_modname = "libmultimediaCore",
    .nm_priv = ((void *)0),
    .reserved = {0},
};

extern "C" __attribute__((constructor)) void RegisterEntryModule(void)
{
    napi_module_register(&demoModule);
}
