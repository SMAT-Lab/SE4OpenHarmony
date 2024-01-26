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
#include <condition_variable>
#include <js_native_api_types.h>
#include <multimedia/player_framework/native_avcodec_videoencoder.h>
#include <multimedia/player_framework/native_avcapability.h>
#include <multimedia/player_framework/native_avcodec_base.h>
#include <multimedia/player_framework/native_avformat.h>
#include <pthread.h>
#include <iostream>
#include <fstream>

#define FAIL (-1)
#define SUCCESS 0
#define PARAM_0 0
#define PARAM_1 1
#define PARAM_2 2
#define PARAM_3 3
#define PARAM_4 4
#define PARAM_5 5
#define PARAM_6 6
#define PARAM_7 7
using namespace std;

constexpr uint32_t DEFAULT_WIDTH = 320;

constexpr uint32_t DEFAULT_HEIGHT = 240;

constexpr OH_AVPixelFormat DEFAULT_PIXELFORMAT = AV_PIXEL_FORMAT_YUVI420;

static napi_value OHVideoEncoderCreateByMime(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    OH_AVCodec *checkParam = nullptr;
    checkParam = OH_VideoEncoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    if (checkParam != nullptr) {
        backParam = SUCCESS;
    }
    napi_value result = nullptr;
    OH_VideoEncoder_Destroy(checkParam);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderCreateByMimeHEVC(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    OH_AVCodec *checkParam = nullptr;
    checkParam = OH_VideoEncoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_HEVC);
    if (checkParam != nullptr) {
        backParam = SUCCESS;
    }
    napi_value result = nullptr;
    OH_VideoEncoder_Destroy(checkParam);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderCreateByMimeAbnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    OH_AVCodec *checkParam = nullptr;
    checkParam = OH_VideoEncoder_CreateByMime(nullptr);
    if (checkParam == nullptr) {
        backParam = SUCCESS;
    }
    napi_value result = nullptr;
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderCreateByName(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    OH_AVCodec *checkParam = nullptr;
    OH_AVCapability *capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_VIDEO_AVC, true);
    const char *codecName = OH_AVCapability_GetName(capability);
    checkParam = OH_VideoEncoder_CreateByName(codecName);
    if (checkParam != nullptr) {
        backParam = SUCCESS;
    }
    napi_value result = nullptr;
    OH_VideoEncoder_Destroy(checkParam);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderCreateByNameHEVC(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    OH_AVCodec *checkParam = nullptr;
    OH_AVCapability *capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_VIDEO_HEVC, true);
    const char *codecName = OH_AVCapability_GetName(capability);
    checkParam = OH_VideoEncoder_CreateByName(codecName);
    if (checkParam != nullptr) {
        backParam = SUCCESS;
    }
    napi_value result = nullptr;
    OH_VideoEncoder_Destroy(checkParam);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderCreateByNameAbnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    OH_AVCodec *checkParam = nullptr;
    OH_AVCapability *capability = OH_AVCodec_GetCapability(nullptr, true);
    const char *codecName = OH_AVCapability_GetName(capability);
    checkParam = OH_VideoEncoder_CreateByName(codecName);
    if (checkParam == nullptr) {
        backParam = SUCCESS;
    }
    napi_value result = nullptr;
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderDestroy(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    videoEnc = OH_VideoEncoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    checkParam = OH_VideoEncoder_Destroy(videoEnc);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    videoEnc = nullptr;
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderDestroyHEVC(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    videoEnc = OH_VideoEncoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_HEVC);
    checkParam = OH_VideoEncoder_Destroy(videoEnc);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    videoEnc = nullptr;
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderDestroyAbnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    videoEnc = OH_VideoEncoder_CreateByMime(nullptr);
    checkParam = OH_VideoEncoder_Destroy(videoEnc);
    if (checkParam != AV_ERR_OK) {
        backParam = SUCCESS;
    }
    videoEnc = nullptr;
    napi_create_int32(env, backParam, &result);
    return result;
}

static void OnError(OH_AVCodec *codec, int32_t errorCode, void *userData)
{
    (void)codec;
    (void)errorCode;
    (void)userData;
}

static void OnStreamChanged(OH_AVCodec *codec, OH_AVFormat *format, void *userData)
{
    (void)codec;
    (void)format;
    (void)userData;
}

static void OnNeedInputData(OH_AVCodec *codec, uint32_t index, OH_AVMemory *mem, void *userData)
{
    (void)userData;
}

static void OnNeedOutputData(OH_AVCodec *codec, uint32_t index, OH_AVMemory *mem, OH_AVCodecBufferAttr *attr,
    void *userData)
{
    (void)userData;
}

static napi_value OHVideoEncoderSetCallback(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    videoEnc = OH_VideoEncoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    OH_AVCodecAsyncCallback callback = { &OnError, &OnStreamChanged, &OnNeedInputData, &OnNeedOutputData };
    checkParam = OH_VideoEncoder_SetCallback(videoEnc, callback, nullptr);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderSetCallbackHEVC(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    videoEnc = OH_VideoEncoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_HEVC);
    OH_AVCodecAsyncCallback callback = { &OnError, &OnStreamChanged, &OnNeedInputData, &OnNeedOutputData };
    checkParam = OH_VideoEncoder_SetCallback(videoEnc, callback, nullptr);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderSetCallbackAbnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    videoEnc = OH_VideoEncoder_CreateByMime(nullptr);
    OH_AVCodecAsyncCallback callback = { &OnError, &OnStreamChanged, &OnNeedInputData, &OnNeedOutputData };
    checkParam = OH_VideoEncoder_SetCallback(videoEnc, callback, nullptr);
    if (checkParam != AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderConfigure(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    checkParam = OH_VideoEncoder_Configure(videoEnc, format);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderConfigureHEVC(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_HEVC);
    checkParam = OH_VideoEncoder_Configure(videoEnc, format);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderConfigureAbnormal1(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    checkParam = OH_VideoEncoder_Configure(videoEnc, nullptr);
    if (checkParam != AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderConfigureAbnormal2(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    checkParam = OH_VideoEncoder_Configure(nullptr, format);
    if (checkParam != AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderConfigureAbnormal3(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    checkParam = OH_VideoEncoder_Configure(nullptr, nullptr);
    if (checkParam != AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderConfigureAbnormal4(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(nullptr);
    checkParam = OH_VideoEncoder_Configure(videoEnc, format);
    if (checkParam != AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderConfigureAbnormal5(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(nullptr);
    checkParam = OH_VideoEncoder_Configure(videoEnc, nullptr);
    if (checkParam != AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderConfigureAbnormal6(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(nullptr);
    checkParam = OH_VideoEncoder_Configure(nullptr, format);
    if (checkParam != AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderConfigureAbnormal7(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(nullptr);
    checkParam = OH_VideoEncoder_Configure(nullptr, nullptr);
    if (checkParam != AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderPrepare(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    OH_VideoEncoder_Configure(videoEnc, format);
    checkParam = OH_VideoEncoder_Prepare(videoEnc);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderPrepareHEVC(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_HEVC);
    OH_VideoEncoder_Configure(videoEnc, format);
    checkParam = OH_VideoEncoder_Prepare(videoEnc);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderPrepareAbnormal1(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    OH_VideoEncoder_Configure(videoEnc, format);
    checkParam = OH_VideoEncoder_Prepare(nullptr);
    if (checkParam != AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderPrepareAbnormal2(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    OH_VideoEncoder_Configure(videoEnc, nullptr);
    checkParam = OH_VideoEncoder_Prepare(videoEnc);
    if (checkParam != AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderPrepareAbnormal3(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    OH_VideoEncoder_Configure(videoEnc, nullptr);
    checkParam = OH_VideoEncoder_Prepare(nullptr);
    if (checkParam != AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderPrepareAbnormal4(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    OH_VideoEncoder_Configure(nullptr, format);
    checkParam = OH_VideoEncoder_Prepare(videoEnc);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderPrepareAbnormal5(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    OH_VideoEncoder_Configure(nullptr, format);
    checkParam = OH_VideoEncoder_Prepare(nullptr);
    if (checkParam != AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderPrepareAbnormal6(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    OH_VideoEncoder_Configure(nullptr, nullptr);
    checkParam = OH_VideoEncoder_Prepare(videoEnc);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderPrepareAbnormal7(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    OH_VideoEncoder_Configure(nullptr, nullptr);
    checkParam = OH_VideoEncoder_Prepare(nullptr);
    if (checkParam != AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderPrepareAbnormal8(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(nullptr);
    OH_VideoEncoder_Configure(videoEnc, format);
    checkParam = OH_VideoEncoder_Prepare(videoEnc);
    if (checkParam != AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderPrepareAbnormal9(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(nullptr);
    OH_VideoEncoder_Configure(videoEnc, format);
    checkParam = OH_VideoEncoder_Prepare(nullptr);
    if (checkParam != AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderPrepareAbnormal10(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(nullptr);
    OH_VideoEncoder_Configure(videoEnc, nullptr);
    checkParam = OH_VideoEncoder_Prepare(videoEnc);
    if (checkParam != AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderPrepareAbnormal11(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(nullptr);
    OH_VideoEncoder_Configure(videoEnc, nullptr);
    checkParam = OH_VideoEncoder_Prepare(nullptr);
    if (checkParam != AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderPrepareAbnormal12(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(nullptr);
    OH_VideoEncoder_Configure(nullptr, format);
    checkParam = OH_VideoEncoder_Prepare(videoEnc);
    if (checkParam != AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderPrepareAbnormal13(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(nullptr);
    OH_VideoEncoder_Configure(nullptr, format);
    checkParam = OH_VideoEncoder_Prepare(nullptr);
    if (checkParam != AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderPrepareAbnormal14(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(nullptr);
    OH_VideoEncoder_Configure(nullptr, nullptr);
    checkParam = OH_VideoEncoder_Prepare(videoEnc);
    if (checkParam != AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderPrepareAbnormal15(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(nullptr);
    OH_VideoEncoder_Configure(nullptr, nullptr);
    checkParam = OH_VideoEncoder_Prepare(nullptr);
    if (checkParam != AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderStart(napi_env env, napi_callback_info info)
{
    size_t argc = PARAM_6;
    napi_value args[PARAM_6] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    int firstParam;
    int secondParam;
    int thirdParam;
    int fourthParam;
    int fifthParam;
    int sixthParam;
    const char *mimeType = nullptr;
    napi_get_value_int32(env, args[PARAM_0], &firstParam);
    napi_get_value_int32(env, args[PARAM_1], &secondParam);
    napi_get_value_int32(env, args[PARAM_2], &thirdParam);
    napi_get_value_int32(env, args[PARAM_3], &fourthParam);
    napi_get_value_int32(env, args[PARAM_4], &fifthParam);
    napi_get_value_int32(env, args[PARAM_5], &sixthParam);

    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;

    if (firstParam == PARAM_1) {
        mimeType = OH_AVCODEC_MIMETYPE_VIDEO_AVC;
    } else if (firstParam == PARAM_0) {
        mimeType = nullptr;
    } else if (firstParam == PARAM_2) {
        mimeType = OH_AVCODEC_MIMETYPE_VIDEO_HEVC;
    }

    if (secondParam == PARAM_1) {
        videoEnc = OH_VideoEncoder_CreateByMime(mimeType);
    } else if (secondParam == PARAM_0) {
        videoEnc = nullptr;
    }

    if (thirdParam == PARAM_1) {
        format = OH_AVFormat_Create();
        OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
        OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
        OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    }

    OH_VideoEncoder_Configure(videoEnc, format);

    if (fourthParam == PARAM_1) {
        OH_VideoEncoder_Prepare(videoEnc);
    } else if (fourthParam == PARAM_0) {
        OH_VideoEncoder_Prepare(nullptr);
    }

    if (fifthParam == PARAM_1) {
        checkParam = OH_VideoEncoder_Start(videoEnc);
    } else if (fifthParam == PARAM_0) {
        checkParam = OH_VideoEncoder_Start(nullptr);
    }

    if (sixthParam == PARAM_1) {
        if (checkParam == AV_ERR_OK) {
            backParam = SUCCESS;
        }
    } else if (sixthParam == PARAM_0) {
        if (checkParam != AV_ERR_OK) {
            backParam = SUCCESS;
        }
    }

    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderStop(napi_env env, napi_callback_info info)
{
    size_t argc = PARAM_7;
    napi_value args[PARAM_7] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    int firstParam;
    int secondParam;
    int thirdParam;
    int fourthParam;
    int fifthParam;
    int sixthParam;
    int seventhParam;
    const char *mimeType = nullptr;
    napi_get_value_int32(env, args[PARAM_0], &firstParam);
    napi_get_value_int32(env, args[PARAM_1], &secondParam);
    napi_get_value_int32(env, args[PARAM_2], &thirdParam);
    napi_get_value_int32(env, args[PARAM_3], &fourthParam);
    napi_get_value_int32(env, args[PARAM_4], &fifthParam);
    napi_get_value_int32(env, args[PARAM_5], &sixthParam);
    napi_get_value_int32(env, args[PARAM_6], &seventhParam);

    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;

    if (firstParam == PARAM_1) {
        mimeType = OH_AVCODEC_MIMETYPE_VIDEO_AVC;
    } else if (firstParam == PARAM_0) {
        mimeType = nullptr;
    } else if (firstParam == PARAM_2) {
        mimeType = OH_AVCODEC_MIMETYPE_VIDEO_HEVC;
    }

    if (secondParam == PARAM_1) {
        videoEnc = OH_VideoEncoder_CreateByMime(mimeType);
    } else if (secondParam == PARAM_0) {
        videoEnc = nullptr;
    }

    if (thirdParam == PARAM_1) {
        format = OH_AVFormat_Create();
        OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
        OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
        OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    }

    OH_VideoEncoder_Configure(videoEnc, format);

    if (fourthParam == PARAM_1) {
        OH_VideoEncoder_Prepare(videoEnc);
    } else if (fourthParam == PARAM_0) {
        OH_VideoEncoder_Prepare(nullptr);
    }

    if (fifthParam == PARAM_1) {
        OH_VideoEncoder_Start(videoEnc);
    } else if (fifthParam == PARAM_0) {
        OH_VideoEncoder_Start(nullptr);
    }

    if (sixthParam == PARAM_1) {
        checkParam = OH_VideoEncoder_Stop(videoEnc);
    } else if (sixthParam == PARAM_0) {
        checkParam = OH_VideoEncoder_Stop(nullptr);
    }

    if (seventhParam == PARAM_1) {
        if (checkParam == AV_ERR_OK) {
            backParam = SUCCESS;
        }
    } else if (seventhParam == PARAM_0) {
        if (checkParam != AV_ERR_OK) {
            backParam = SUCCESS;
        }
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderFlush(napi_env env, napi_callback_info info)
{
    size_t argc = PARAM_7;
    napi_value args[PARAM_7] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    int firstParam;
    int secondParam;
    int thirdParam;
    int fourthParam;
    int fifthParam;
    int sixthParam;
    int seventhParam;
    const char *mimeType = nullptr;
    napi_get_value_int32(env, args[PARAM_0], &firstParam);
    napi_get_value_int32(env, args[PARAM_1], &secondParam);
    napi_get_value_int32(env, args[PARAM_2], &thirdParam);
    napi_get_value_int32(env, args[PARAM_3], &fourthParam);
    napi_get_value_int32(env, args[PARAM_4], &fifthParam);
    napi_get_value_int32(env, args[PARAM_5], &sixthParam);
    napi_get_value_int32(env, args[PARAM_6], &seventhParam);

    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;

    if (firstParam == PARAM_1) {
        mimeType = OH_AVCODEC_MIMETYPE_VIDEO_AVC;
    } else if (firstParam == PARAM_0) {
        mimeType = nullptr;
    } else if (firstParam == PARAM_2) {
        mimeType = OH_AVCODEC_MIMETYPE_VIDEO_HEVC;
    }

    if (secondParam == PARAM_1) {
        videoEnc = OH_VideoEncoder_CreateByMime(mimeType);
    } else if (secondParam == PARAM_0) {
        videoEnc = nullptr;
    }

    if (thirdParam == PARAM_1) {
        format = OH_AVFormat_Create();
        OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
        OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
        OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    }

    OH_VideoEncoder_Configure(videoEnc, format);

    if (fourthParam == PARAM_1) {
        OH_VideoEncoder_Prepare(videoEnc);
    } else if (fourthParam == PARAM_0) {
        OH_VideoEncoder_Prepare(nullptr);
    }

    if (fifthParam == PARAM_1) {
        OH_VideoEncoder_Start(videoEnc);
    } else if (fifthParam == PARAM_0) {
        OH_VideoEncoder_Start(nullptr);
    }

    if (sixthParam == PARAM_1) {
        checkParam = OH_VideoEncoder_Flush(videoEnc);
    } else if (sixthParam == PARAM_0) {
        checkParam = OH_VideoEncoder_Flush(nullptr);
    }
    if (seventhParam == PARAM_1) {
        if (checkParam == AV_ERR_OK) {
            backParam = SUCCESS;
        }
    } else if (seventhParam == PARAM_0) {
        if (checkParam != AV_ERR_OK) {
            backParam = SUCCESS;
        }
    }
    OH_VideoEncoder_Stop(videoEnc);
    OH_VideoEncoder_Destroy(videoEnc);

    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderReset(napi_env env, napi_callback_info info)
{
    size_t argc = PARAM_7;
    napi_value args[PARAM_7] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    int firstParam;
    int secondParam;
    int thirdParam;
    int fourthParam;
    int fifthParam;
    int sixthParam;
    int seventhParam;
    const char *mimeType = nullptr;
    napi_get_value_int32(env, args[PARAM_0], &firstParam);
    napi_get_value_int32(env, args[PARAM_1], &secondParam);
    napi_get_value_int32(env, args[PARAM_2], &thirdParam);
    napi_get_value_int32(env, args[PARAM_3], &fourthParam);
    napi_get_value_int32(env, args[PARAM_4], &fifthParam);
    napi_get_value_int32(env, args[PARAM_5], &sixthParam);
    napi_get_value_int32(env, args[PARAM_6], &seventhParam);

    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;

    if (firstParam == PARAM_1) {
        mimeType = OH_AVCODEC_MIMETYPE_VIDEO_AVC;
    } else if (firstParam == PARAM_0) {
        mimeType = nullptr;
    } else if (firstParam == PARAM_2) {
        mimeType = OH_AVCODEC_MIMETYPE_VIDEO_HEVC;
    }

    if (secondParam == PARAM_1) {
        videoEnc = OH_VideoEncoder_CreateByMime(mimeType);
    } else if (secondParam == PARAM_0) {
        videoEnc = nullptr;
    }

    if (thirdParam == PARAM_1) {
        format = OH_AVFormat_Create();
        OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
        OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
        OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    }

    OH_VideoEncoder_Configure(videoEnc, format);

    if (fourthParam == PARAM_1) {
        OH_VideoEncoder_Prepare(videoEnc);
    } else if (fourthParam == PARAM_0) {
        OH_VideoEncoder_Prepare(nullptr);
    }

    if (fifthParam == PARAM_1) {
        OH_VideoEncoder_Start(videoEnc);
    } else if (fifthParam == PARAM_0) {
        OH_VideoEncoder_Start(nullptr);
    }

    if (sixthParam == PARAM_1) {
        checkParam = OH_VideoEncoder_Reset(videoEnc);
    } else if (sixthParam == PARAM_0) {
        checkParam = OH_VideoEncoder_Reset(nullptr);
    }
    if (seventhParam == PARAM_1) {
        if (checkParam == AV_ERR_OK) {
            backParam = SUCCESS;
        }
    } else if (seventhParam == PARAM_0) {
        if (checkParam != AV_ERR_OK) {
            backParam = SUCCESS;
        }
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderGetOutputDescription(napi_env env, napi_callback_info info)
{
    size_t argc = PARAM_7;
    napi_value args[PARAM_7] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    int firstParam;
    int secondParam;
    int thirdParam;
    int fourthParam;
    int fifthParam;
    int sixthParam;
    int seventhParam;
    const char *mimeType = nullptr;
    napi_get_value_int32(env, args[PARAM_0], &firstParam);
    napi_get_value_int32(env, args[PARAM_1], &secondParam);
    napi_get_value_int32(env, args[PARAM_2], &thirdParam);
    napi_get_value_int32(env, args[PARAM_3], &fourthParam);
    napi_get_value_int32(env, args[PARAM_4], &fifthParam);
    napi_get_value_int32(env, args[PARAM_5], &sixthParam);
    napi_get_value_int32(env, args[PARAM_6], &seventhParam);

    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVFormat *checkParam = nullptr;
    OH_AVFormat *format = nullptr;

    if (firstParam == PARAM_1) {
        mimeType = OH_AVCODEC_MIMETYPE_VIDEO_AVC;
    } else if (firstParam == PARAM_0) {
        mimeType = nullptr;
    } else if (firstParam == PARAM_2) {
        mimeType = OH_AVCODEC_MIMETYPE_VIDEO_HEVC;
    }

    if (secondParam == PARAM_1) {
        videoEnc = OH_VideoEncoder_CreateByMime(mimeType);
    } else if (secondParam == PARAM_0) {
        videoEnc = nullptr;
    }

    if (thirdParam == PARAM_1) {
        format = OH_AVFormat_Create();
        OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
        OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
        OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    }

    OH_VideoEncoder_Configure(videoEnc, format);

    if (fourthParam == PARAM_1) {
        OH_VideoEncoder_Prepare(videoEnc);
    } else if (fourthParam == PARAM_0) {
        OH_VideoEncoder_Prepare(nullptr);
    }

    if (fifthParam == PARAM_1) {
        OH_VideoEncoder_Start(videoEnc);
    } else if (fifthParam == PARAM_0) {
        OH_VideoEncoder_Start(nullptr);
    }

    if (sixthParam == PARAM_1) {
        checkParam = OH_VideoEncoder_GetOutputDescription(videoEnc);
    } else if (sixthParam == PARAM_0) {
        checkParam = OH_VideoEncoder_GetOutputDescription(nullptr);
    }
    if (seventhParam == PARAM_1) {
        if (checkParam != nullptr) {
            backParam = SUCCESS;
        }
    } else if (seventhParam == PARAM_0) {
        if (checkParam == nullptr) {
            backParam = SUCCESS;
        }
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderSetParameter(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    OH_VideoEncoder_Configure(videoEnc, format);
    OH_VideoEncoder_Prepare(videoEnc);
    checkParam = OH_VideoEncoder_Start(videoEnc);
    if (checkParam == AV_ERR_OK) {
        checkParam = OH_VideoEncoder_SetParameter(videoEnc, format);
        if (checkParam == AV_ERR_OK) {
            backParam = SUCCESS;
        }
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderSetParameterHEVC(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_HEVC);
    OH_VideoEncoder_Configure(videoEnc, format);
    OH_VideoEncoder_Prepare(videoEnc);
    checkParam = OH_VideoEncoder_Start(videoEnc);
    if (checkParam == AV_ERR_OK) {
        checkParam = OH_VideoEncoder_SetParameter(videoEnc, format);
        if (checkParam == AV_ERR_OK) {
            backParam = SUCCESS;
        }
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderSetParameterAbnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoEnc = OH_VideoEncoder_CreateByMime(nullptr);
    OH_VideoEncoder_Configure(videoEnc, format);
    OH_VideoEncoder_Prepare(videoEnc);
    checkParam = OH_VideoEncoder_Start(videoEnc);
    if (checkParam != AV_ERR_OK) {
        checkParam = OH_VideoEncoder_SetParameter(videoEnc, format);
        if (checkParam != AV_ERR_OK) {
            backParam = SUCCESS;
        }
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderGetInputDescription(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVFormat *checkParam = nullptr;
    videoEnc = OH_VideoEncoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    checkParam = OH_VideoEncoder_GetInputDescription(videoEnc);
    if (checkParam != nullptr) {
        backParam = SUCCESS;
        OH_VideoEncoder_Stop(videoEnc);
        OH_AVFormat_Destroy(checkParam);
        OH_VideoEncoder_Destroy(videoEnc);
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderGetInputDescriptionHEVC(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVFormat *checkParam = nullptr;
    videoEnc = OH_VideoEncoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_HEVC);
    checkParam = OH_VideoEncoder_GetInputDescription(videoEnc);
    if (checkParam != nullptr) {
        backParam = SUCCESS;
        OH_VideoEncoder_Stop(videoEnc);
        OH_AVFormat_Destroy(checkParam);
        OH_VideoEncoder_Destroy(videoEnc);
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderGetInputDescriptionAbnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVFormat *checkParam = nullptr;
    videoEnc = OH_VideoEncoder_CreateByMime(nullptr);
    checkParam = OH_VideoEncoder_GetInputDescription(videoEnc);
    if (checkParam == nullptr) {
        backParam = SUCCESS;
        OH_VideoEncoder_Stop(videoEnc);
        OH_AVFormat_Destroy(checkParam);
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderIsValid(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    bool status = true;
    videoEnc = OH_VideoEncoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    checkParam = OH_VideoEncoder_IsValid(videoEnc, &status);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
        OH_VideoEncoder_Stop(videoEnc);
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderIsValidHEVC(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    bool status = true;
    videoEnc = OH_VideoEncoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_HEVC);
    checkParam = OH_VideoEncoder_IsValid(videoEnc, &status);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
        OH_VideoEncoder_Stop(videoEnc);
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoEncoderIsValidAbnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoEnc = nullptr;
    OH_AVErrCode checkParam;
    bool status = true;
    videoEnc = OH_VideoEncoder_CreateByMime(nullptr);
    checkParam = OH_VideoEncoder_IsValid(videoEnc, &status);
    if (checkParam != AV_ERR_OK) {
        backParam = SUCCESS;
        OH_VideoEncoder_Stop(videoEnc);
    }
    OH_VideoEncoder_Destroy(videoEnc);
    napi_create_int32(env, backParam, &result);
    return result;
}

EXTERN_C_START
static napi_value Init(napi_env env, napi_value exports)
{
    napi_property_descriptor desc[] = {
        {"oHVideoEncoderCreateByMime", nullptr, OHVideoEncoderCreateByMime, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHVideoEncoderCreateByMimeHEVC", nullptr, OHVideoEncoderCreateByMimeHEVC, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderCreateByMimeAbnormal", nullptr, OHVideoEncoderCreateByMimeAbnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderCreateByName", nullptr, OHVideoEncoderCreateByName, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHVideoEncoderCreateByNameHEVC", nullptr, OHVideoEncoderCreateByNameHEVC, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderCreateByNameAbnormal", nullptr, OHVideoEncoderCreateByNameAbnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderDestroy", nullptr, OHVideoEncoderDestroy, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHVideoEncoderDestroyHEVC", nullptr, OHVideoEncoderDestroyHEVC, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHVideoEncoderDestroyAbnormal", nullptr, OHVideoEncoderDestroyAbnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderSetCallback", nullptr, OHVideoEncoderSetCallback, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHVideoEncoderSetCallbackHEVC", nullptr, OHVideoEncoderSetCallbackHEVC, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderSetCallbackAbnormal", nullptr, OHVideoEncoderSetCallbackAbnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderConfigure", nullptr, OHVideoEncoderConfigure, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHVideoEncoderConfigureHEVC", nullptr, OHVideoEncoderConfigureHEVC, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHVideoEncoderConfigureAbnormal1", nullptr, OHVideoEncoderConfigureAbnormal1, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderConfigureAbnormal2", nullptr, OHVideoEncoderConfigureAbnormal2, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderConfigureAbnormal3", nullptr, OHVideoEncoderConfigureAbnormal3, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderConfigureAbnormal4", nullptr, OHVideoEncoderConfigureAbnormal4, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderConfigureAbnormal5", nullptr, OHVideoEncoderConfigureAbnormal5, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderConfigureAbnormal6", nullptr, OHVideoEncoderConfigureAbnormal6, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderConfigureAbnormal7", nullptr, OHVideoEncoderConfigureAbnormal7, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderPrepare", nullptr, OHVideoEncoderPrepare, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHVideoEncoderPrepareHEVC", nullptr, OHVideoEncoderPrepareHEVC, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHVideoEncoderPrepareAbnormal1", nullptr, OHVideoEncoderPrepareAbnormal1, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderPrepareAbnormal2", nullptr, OHVideoEncoderPrepareAbnormal2, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderPrepareAbnormal3", nullptr, OHVideoEncoderPrepareAbnormal3, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderPrepareAbnormal4", nullptr, OHVideoEncoderPrepareAbnormal4, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderPrepareAbnormal5", nullptr, OHVideoEncoderPrepareAbnormal5, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderPrepareAbnormal6", nullptr, OHVideoEncoderPrepareAbnormal6, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderPrepareAbnormal7", nullptr, OHVideoEncoderPrepareAbnormal7, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderPrepareAbnormal8", nullptr, OHVideoEncoderPrepareAbnormal8, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderPrepareAbnormal9", nullptr, OHVideoEncoderPrepareAbnormal9, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderPrepareAbnormal10", nullptr, OHVideoEncoderPrepareAbnormal10, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderPrepareAbnormal11", nullptr, OHVideoEncoderPrepareAbnormal11, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderPrepareAbnormal12", nullptr, OHVideoEncoderPrepareAbnormal12, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderPrepareAbnormal13", nullptr, OHVideoEncoderPrepareAbnormal13, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderPrepareAbnormal14", nullptr, OHVideoEncoderPrepareAbnormal14, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderPrepareAbnormal15", nullptr, OHVideoEncoderPrepareAbnormal15, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderStart", nullptr, OHVideoEncoderStart, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHVideoEncoderStop", nullptr, OHVideoEncoderStop, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHVideoEncoderFlush", nullptr, OHVideoEncoderFlush, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHVideoEncoderReset", nullptr, OHVideoEncoderReset, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHVideoEncoderGetOutputDescription", nullptr, OHVideoEncoderGetOutputDescription, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderSetParameter", nullptr, OHVideoEncoderSetParameter, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHVideoEncoderSetParameterHEVC", nullptr, OHVideoEncoderSetParameterHEVC, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderSetParameterAbnormal", nullptr, OHVideoEncoderSetParameterAbnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderGetInputDescription", nullptr, OHVideoEncoderGetInputDescription, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoEncoderGetInputDescriptionHEVC", nullptr, OHVideoEncoderGetInputDescriptionHEVC, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"oHVideoEncoderGetInputDescriptionAbnormal", nullptr, OHVideoEncoderGetInputDescriptionAbnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHVideoEncoderIsValid", nullptr, OHVideoEncoderIsValid, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHVideoEncoderIsValidHEVC", nullptr, OHVideoEncoderIsValidHEVC, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHVideoEncoderIsValidAbnormal", nullptr, OHVideoEncoderIsValidAbnormal, nullptr, nullptr, nullptr,
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
    .nm_modname = "libvideoencoderndk",
    .nm_priv = ((void *)0),
    .reserved = { 0 },
};

extern "C" __attribute__((constructor)) void RegisterModule(void)
{
    napi_module_register(&demoModule);
}
