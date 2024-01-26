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
#include <multimedia/player_framework/native_avcodec_videodecoder.h>
#include <multimedia/player_framework/native_avcapability.h>
#include <multimedia/player_framework/native_avcodec_base.h>
#include <multimedia/player_framework/native_avformat.h>
#include <pthread.h>
#include <iostream>
#include <fstream>
#include <queue>

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

static napi_value OHVideoDecoderCreateByMime(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    OH_AVCodec *checkParam = nullptr;
    checkParam = OH_VideoDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_HEVC);
    if (checkParam != nullptr) {
        backParam = SUCCESS;
    }
    napi_value result = nullptr;
    OH_VideoDecoder_Destroy(checkParam);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoDecoderCreateByName(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    OH_AVCodec *checkParam = nullptr;
    OH_AVCapability *capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_VIDEO_AVC, false);
    const char *codecName = OH_AVCapability_GetName(capability);
    checkParam = OH_VideoDecoder_CreateByName(codecName);
    if (checkParam != nullptr) {
        backParam = SUCCESS;
    }
    napi_value result = nullptr;
    OH_VideoDecoder_Destroy(checkParam);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoDecoderDestroy(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoDec = nullptr;
    OH_AVErrCode checkParam;
    videoDec = OH_VideoDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    checkParam = OH_VideoDecoder_Destroy(videoDec);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    videoDec = nullptr;
    napi_create_int32(env, backParam, &result);
    return result;
}

class VDecSignal {
public:
    std::mutex inMutex_;
    std::mutex outMutex_;
    std::condition_variable inCond_;
    std::condition_variable outCond_;
    std::queue<uint32_t> inQueue_;
    std::queue<uint32_t> outQueue_;
    std::queue<OH_AVMemory *> inBufferQueue_;
    std::queue<OH_AVMemory *> outBufferQueue_;
    std::queue<OH_AVCodecBufferAttr> attrQueue_;
};
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

static napi_value OHVideoDecoderSetCallback(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoDec = nullptr;
    OH_AVErrCode checkParam;
    videoDec = OH_VideoDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    OH_AVCodecAsyncCallback callback = { &OnError, &OnStreamChanged, &OnNeedInputData, &OnNeedOutputData };
    checkParam = OH_VideoDecoder_SetCallback(videoDec, callback, nullptr);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoDecoder_Destroy(videoDec);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoDecoderConfigure(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoDec = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, AV_PIXEL_FORMAT_NV21);
    videoDec = OH_VideoDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    checkParam = OH_VideoDecoder_Configure(videoDec, format);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
        OH_AVFormat_Destroy(format);
    }
    OH_VideoDecoder_Destroy(videoDec);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoDecoderPrepare(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoDec = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoDec = OH_VideoDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    OH_VideoDecoder_Configure(videoDec, format);
    checkParam = OH_VideoDecoder_Prepare(videoDec);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
        OH_AVFormat_Destroy(format);
    }
    OH_VideoDecoder_Destroy(videoDec);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoDecoderStart(napi_env env, napi_callback_info info)
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
    OH_AVCodec *videoDec = nullptr;
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
        videoDec = OH_VideoDecoder_CreateByMime(mimeType);
    } else if (secondParam == PARAM_0) {
        videoDec = nullptr;
    }

    if (thirdParam == PARAM_1) {
        format = OH_AVFormat_Create();
        OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
        OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
        OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    }

    OH_VideoDecoder_Configure(videoDec, format);

    if (fourthParam == PARAM_1) {
        OH_VideoDecoder_Prepare(videoDec);
    } else if (fourthParam == PARAM_0) {
        OH_VideoDecoder_Prepare(nullptr);
    }

    if (fifthParam == PARAM_1) {
        checkParam = OH_VideoDecoder_Start(videoDec);
    } else if (fifthParam == PARAM_0) {
        checkParam = OH_VideoDecoder_Start(nullptr);
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
    OH_AVFormat_Destroy(format);
    OH_VideoDecoder_Destroy(videoDec);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoDecoderStop(napi_env env, napi_callback_info info)
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
    OH_AVCodec *videoDec = nullptr;
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
        videoDec = OH_VideoDecoder_CreateByMime(mimeType);
    } else if (secondParam == PARAM_0) {
        videoDec = nullptr;
    }

    if (thirdParam == PARAM_1) {
        format = OH_AVFormat_Create();
        OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
        OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
        OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    }

    OH_VideoDecoder_Configure(videoDec, format);

    if (fourthParam == PARAM_1) {
        OH_VideoDecoder_Prepare(videoDec);
    } else if (fourthParam == PARAM_0) {
        OH_VideoDecoder_Prepare(nullptr);
    }

    if (fifthParam == PARAM_1) {
        OH_VideoDecoder_Start(videoDec);
    } else if (fifthParam == PARAM_0) {
        OH_VideoDecoder_Start(nullptr);
    }

    if (sixthParam == PARAM_1) {
        checkParam = OH_VideoDecoder_Stop(videoDec);
    } else if (sixthParam == PARAM_0) {
        checkParam = OH_VideoDecoder_Stop(nullptr);
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
    OH_AVFormat_Destroy(format);
    OH_VideoDecoder_Destroy(videoDec);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoDecoderFlush(napi_env env, napi_callback_info info)
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
    OH_AVCodec *videoDec = nullptr;
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
        videoDec = OH_VideoDecoder_CreateByMime(mimeType);
    } else if (secondParam == PARAM_0) {
        videoDec = nullptr;
    }

    if (thirdParam == PARAM_1) {
        format = OH_AVFormat_Create();
        OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
        OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
        OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    }

    OH_VideoDecoder_Configure(videoDec, format);

    if (fourthParam == PARAM_1) {
        OH_VideoDecoder_Prepare(videoDec);
    } else if (fourthParam == PARAM_0) {
        OH_VideoDecoder_Prepare(nullptr);
    }

    if (fifthParam == PARAM_1) {
        OH_VideoDecoder_Start(videoDec);
    } else if (fifthParam == PARAM_0) {
        OH_VideoDecoder_Start(nullptr);
    }

    if (sixthParam == PARAM_1) {
        checkParam = OH_VideoDecoder_Flush(videoDec);
    } else if (sixthParam == PARAM_0) {
        checkParam = OH_VideoDecoder_Flush(nullptr);
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
    OH_VideoDecoder_Stop(videoDec);
    OH_AVFormat_Destroy(format);
    OH_VideoDecoder_Destroy(videoDec);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoDecoderReset(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoDec = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoDec = OH_VideoDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    OH_VideoDecoder_Configure(videoDec, format);
    OH_VideoDecoder_Prepare(videoDec);
    if (OH_VideoDecoder_Start(videoDec) == AV_ERR_OK) {
        checkParam = OH_VideoDecoder_Reset(videoDec);
        if (checkParam == AV_ERR_OK) {
            backParam = SUCCESS;
            OH_AVFormat_Destroy(format);
        }
    }
    OH_VideoDecoder_Destroy(videoDec);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoDecoderGetOutputDescription(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoDec = nullptr;
    OH_AVFormat *checkParam = nullptr;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoDec = OH_VideoDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    OH_VideoDecoder_Configure(videoDec, format);
    OH_VideoDecoder_Prepare(videoDec);
    if (OH_VideoDecoder_Start(videoDec) == AV_ERR_OK) {
        checkParam = OH_VideoDecoder_GetOutputDescription(videoDec);
        if (checkParam != nullptr) {
            backParam = SUCCESS;
            OH_VideoDecoder_Stop(videoDec);
            OH_AVFormat_Destroy(format);
        }
    }
    OH_VideoDecoder_Destroy(videoDec);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoDecoderSetParameter(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoDec = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoDec = OH_VideoDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    OH_VideoDecoder_Configure(videoDec, format);
    OH_VideoDecoder_Prepare(videoDec);
    checkParam = OH_VideoDecoder_Start(videoDec);
    if (checkParam == AV_ERR_OK) {
        checkParam = OH_VideoDecoder_SetParameter(videoDec, format);
        if (checkParam == AV_ERR_OK) {
            backParam = SUCCESS;
            OH_VideoDecoder_Stop(videoDec);
            OH_AVFormat_Destroy(format);
        }
    }
    OH_VideoDecoder_Destroy(videoDec);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoDecoderPushInputData(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoDec = nullptr;
    uint32_t index = PARAM_1;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_WIDTH, DEFAULT_WIDTH);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_HEIGHT, DEFAULT_HEIGHT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_PIXEL_FORMAT, DEFAULT_PIXELFORMAT);
    videoDec = OH_VideoDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    OH_AVCodecBufferAttr info_;
    info_.offset = 0;
    info_.flags = AVCODEC_BUFFER_FLAGS_NONE;
    checkParam = OH_VideoDecoder_PushInputData(videoDec, index, info_);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    OH_VideoDecoder_Destroy(videoDec);
    OH_AVFormat_Destroy(format);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoDecoderRenderOutputData(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoDec = nullptr;
    OH_AVErrCode checkParam;
    uint32_t index = PARAM_1;
    videoDec = OH_VideoDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    checkParam = OH_VideoDecoder_RenderOutputData(videoDec, index);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
        OH_VideoDecoder_Stop(videoDec);
    }
    OH_VideoDecoder_Destroy(videoDec);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHVideoDecoderIsValid(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *videoDec = nullptr;
    OH_AVErrCode checkParam;
    bool status = true;
    videoDec = OH_VideoDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_VIDEO_AVC);
    checkParam = OH_VideoDecoder_IsValid(videoDec, &status);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
        OH_VideoDecoder_Stop(videoDec);
    }
    OH_VideoDecoder_Destroy(videoDec);
    napi_create_int32(env, backParam, &result);
    return result;
}

EXTERN_C_START
static napi_value Init(napi_env env, napi_value exports)
{
    napi_property_descriptor desc[] = {
        {"oHVideoDecoderCreateByMime", nullptr, OHVideoDecoderCreateByMime, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHVideoDecoderCreateByName", nullptr, OHVideoDecoderCreateByName, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHVideoDecoderDestroy", nullptr, OHVideoDecoderDestroy, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHVideoDecoderConfigure", nullptr, OHVideoDecoderConfigure, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHVideoDecoderPrepare", nullptr, OHVideoDecoderPrepare, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHVideoDecoderStart", nullptr, OHVideoDecoderStart, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHVideoDecoderStop", nullptr, OHVideoDecoderStop, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHVideoDecoderFlush", nullptr, OHVideoDecoderFlush, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHVideoDecoderReset", nullptr, OHVideoDecoderReset, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHVideoDecoderGetOutputDescription", nullptr, OHVideoDecoderGetOutputDescription, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoDecoderSetParameter", nullptr, OHVideoDecoderSetParameter, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHVideoDecoderPushInputData", nullptr, OHVideoDecoderPushInputData, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHVideoDecoderRenderOutputData", nullptr, OHVideoDecoderRenderOutputData, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHVideoDecoderIsValid", nullptr, OHVideoDecoderIsValid, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHVideoDecoderSetCallback", nullptr, OHVideoDecoderSetCallback, nullptr, nullptr, nullptr, napi_default,
         nullptr},
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
    .nm_modname = "libvideodecoderndk",
    .nm_priv = ((void *)0),
    .reserved = { 0 },
};

extern "C" __attribute__((constructor)) void RegisterModule(void)
{
    napi_module_register(&demoModule);
}
