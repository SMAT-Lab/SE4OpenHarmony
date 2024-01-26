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
#include <multimedia/player_framework/native_avcapability.h>
#include <multimedia/player_framework/native_avcodec_audiodecoder.h>
#include <multimedia/player_framework/native_avcodec_base.h>
#include <multimedia/player_framework/native_averrors.h>
#include <multimedia/player_framework/native_avformat.h>
#include <pthread.h>
#include <queue>
#include <fstream>
#include <iostream>

#define FAIL (-1)
#define SUCCESS 0

constexpr uint32_t DEFAULT_SAMPLERATE = 44100;
constexpr uint32_t DEFAULT_BITRATE = 32000;
constexpr uint32_t DEFAULT_CHANNEL_COUNT = 2;
constexpr uint32_t DEFAULT_MAX_INPUT_SIZE = 1152;
constexpr uint32_t DEFAULT_AAC_TYPE = 1;
constexpr uint8_t DEFAULT_VORBIS_TYPE = 10;
constexpr uint8_t DEFAULT_VORBISTWO_TYPE = 20;
using namespace std;

static napi_value TestInitPtr(napi_env env, OH_AVCodec *param)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVCodec *checkParam = param;
    if (checkParam != nullptr) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value TestInitAVErrCode(napi_env env, OH_AVErrCode param)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVErrCode checkParam = param;
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AudioDecoderCreateByMimeAudioAac(napi_env env, napi_callback_info info)
{
    return TestInitPtr(env, OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_AAC));
}

static napi_value AudioDecoderCreateByName(napi_env env, napi_callback_info info)
{
    OH_AVCapability *capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS, false);
    const char *name = OH_AVCapability_GetName(capability);
    return TestInitPtr(env, OH_AudioDecoder_CreateByName(name));
}

static napi_value AudioDecoderDestroy(napi_env env, napi_callback_info info)
{
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_FLAC);
    return TestInitAVErrCode(env, OH_AudioDecoder_Destroy(audioDec));
}

class ADecSignal {
public:
    pthread_mutex_t inMutex_;
    pthread_mutex_t outMutex_;
    pthread_mutex_t startMutex_;
    std::condition_variable inCond_;
    std::condition_variable outCond_;
    std::condition_variable startCond_;
    std::queue<uint32_t> inQueue_;
    std::queue<uint32_t> outQueue_;
    std::queue<OH_AVMemory *> inBufferQueue_;
    std::queue<OH_AVMemory *> outBufferQueue_;
    std::queue<OH_AVCodecBufferAttr> attrQueue_;
};
ADecSignal *signal_;
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
static void onNeedInputData(OH_AVCodec *codec, uint32_t index, OH_AVMemory *data, void *userData)
{
    (void)codec;
    ADecSignal *signal = static_cast<ADecSignal *>(userData);
    pthread_mutex_lock(&signal->inMutex_);
    signal->inQueue_.push(index);
    signal->inBufferQueue_.push(data);
    signal->inCond_.notify_all();
}
static void onNeedOutputData(OH_AVCodec *codec, uint32_t index, OH_AVMemory *data, OH_AVCodecBufferAttr *attr,
    void *userData)
{
    (void)codec;
    ADecSignal *signal = static_cast<ADecSignal *>(userData);
    pthread_mutex_unlock(&signal->outMutex_);
    signal->outQueue_.push(index);
    signal->outBufferQueue_.push(data);
    if (attr) {
        signal->attrQueue_.push(*attr);
    }
    signal->outCond_.notify_all();
}

static napi_value AudioDecoderSetCallback(napi_env env, napi_callback_info info)
{
    napi_value result;
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_AAC);
    signal_ = new ADecSignal();
    OH_AVCodecAsyncCallback callback = { &OnError, &OnStreamChanged, &onNeedInputData, &onNeedOutputData };
    result = TestInitAVErrCode(env, OH_AudioDecoder_SetCallback(audioDec, callback, signal_));
    OH_AudioDecoder_Destroy(audioDec);
    return result;
}

static napi_value AudioDecoderConfigure(napi_env env, napi_callback_info info)
{
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_SAMPLE_RATE, DEFAULT_SAMPLERATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_BITRATE, DEFAULT_BITRATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_CHANNEL_COUNT, DEFAULT_CHANNEL_COUNT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_MAX_INPUT_SIZE, DEFAULT_MAX_INPUT_SIZE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AAC_IS_ADTS, DEFAULT_AAC_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_MPEG);
    return TestInitAVErrCode(env, OH_AudioDecoder_Configure(audioDec, format));
}

static napi_value AudioDecoderPrepare(napi_env env, napi_callback_info info)
{
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_SAMPLE_RATE, DEFAULT_SAMPLERATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_BITRATE, DEFAULT_BITRATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_CHANNEL_COUNT, DEFAULT_CHANNEL_COUNT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_MAX_INPUT_SIZE, DEFAULT_MAX_INPUT_SIZE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AAC_IS_ADTS, DEFAULT_AAC_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_MPEG);
    OH_AudioDecoder_Configure(audioDec, format);
    return TestInitAVErrCode(env, OH_AudioDecoder_Prepare(audioDec));
}

static napi_value AudioDecoderStart(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_SAMPLE_RATE, DEFAULT_SAMPLERATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_BITRATE, DEFAULT_BITRATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_CHANNEL_COUNT, DEFAULT_CHANNEL_COUNT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_MAX_INPUT_SIZE, DEFAULT_MAX_INPUT_SIZE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AAC_IS_ADTS, DEFAULT_AAC_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_MPEG);
    checkParam = OH_AudioDecoder_Configure(audioDec, format);
    checkParam = OH_AudioDecoder_Prepare(audioDec);
    checkParam = OH_AudioDecoder_Start(audioDec);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AudioDecoderStop(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_SAMPLE_RATE, DEFAULT_SAMPLERATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_BITRATE, DEFAULT_BITRATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_CHANNEL_COUNT, DEFAULT_CHANNEL_COUNT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_MAX_INPUT_SIZE, DEFAULT_MAX_INPUT_SIZE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AAC_IS_ADTS, DEFAULT_AAC_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_MPEG);
    checkParam = OH_AudioDecoder_Configure(audioDec, format);
    checkParam = OH_AudioDecoder_Prepare(audioDec);
    if (OH_AudioDecoder_Start(audioDec) == AV_ERR_OK) {
        checkParam = OH_AudioDecoder_Stop(audioDec);
        if (checkParam == AV_ERR_OK) {
            backParam = SUCCESS;
        }
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AudioDecoderFlush(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_SAMPLE_RATE, DEFAULT_SAMPLERATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_BITRATE, DEFAULT_BITRATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_CHANNEL_COUNT, DEFAULT_CHANNEL_COUNT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_MAX_INPUT_SIZE, DEFAULT_MAX_INPUT_SIZE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AAC_IS_ADTS, DEFAULT_AAC_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_MPEG);
    OH_AudioDecoder_Configure(audioDec, format);
    OH_AudioDecoder_Prepare(audioDec);
    if (OH_AudioDecoder_Start(audioDec) == AV_ERR_OK) {
        checkParam = OH_AudioDecoder_Flush(audioDec);
        if (checkParam == AV_ERR_OK) {
            backParam = SUCCESS;
            OH_AudioDecoder_Stop(audioDec);
        }
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AudioDecoderReset(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_SAMPLE_RATE, DEFAULT_SAMPLERATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_BITRATE, DEFAULT_BITRATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_CHANNEL_COUNT, DEFAULT_CHANNEL_COUNT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_MAX_INPUT_SIZE, DEFAULT_MAX_INPUT_SIZE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AAC_IS_ADTS, DEFAULT_AAC_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_MPEG);
    OH_AudioDecoder_Configure(audioDec, format);
    OH_AudioDecoder_Prepare(audioDec);
    if (OH_AudioDecoder_Start(audioDec) == AV_ERR_OK) {
        checkParam = OH_AudioDecoder_Reset(audioDec);
        if (checkParam == AV_ERR_OK) {
            backParam = SUCCESS;
            OH_AudioDecoder_Stop(audioDec);
        }
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AudioDecoderGetOutputDescription(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVFormat *checkParam = nullptr;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_SAMPLE_RATE, DEFAULT_SAMPLERATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_BITRATE, DEFAULT_BITRATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_CHANNEL_COUNT, DEFAULT_CHANNEL_COUNT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_MAX_INPUT_SIZE, DEFAULT_MAX_INPUT_SIZE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AAC_IS_ADTS, DEFAULT_AAC_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_MPEG);
    OH_AudioDecoder_Configure(audioDec, format);
    OH_AudioDecoder_Prepare(audioDec);
    if (OH_AudioDecoder_Start(audioDec) == AV_ERR_OK) {
        checkParam = OH_AudioDecoder_GetOutputDescription(audioDec);
        if (checkParam != nullptr) {
            backParam = SUCCESS;
            OH_AudioDecoder_Stop(audioDec);
            free(checkParam);
        }
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AudioDecoderSetParameter(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_SAMPLE_RATE, DEFAULT_SAMPLERATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_BITRATE, DEFAULT_BITRATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_CHANNEL_COUNT, DEFAULT_CHANNEL_COUNT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_MAX_INPUT_SIZE, DEFAULT_MAX_INPUT_SIZE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AAC_IS_ADTS, DEFAULT_AAC_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_MPEG);
    checkParam = OH_AudioDecoder_Configure(audioDec, format);
    checkParam = OH_AudioDecoder_Prepare(audioDec);
    if (OH_AudioDecoder_Start(audioDec) == AV_ERR_OK) {
        format = OH_AudioDecoder_GetOutputDescription(audioDec);
        if (format != nullptr) {
            checkParam = OH_AudioDecoder_SetParameter(audioDec, format);
            if (checkParam == AV_ERR_OK) {
                backParam = SUCCESS;
                free(format);
            }
        }
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AudioDecoderIsValid(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVErrCode checkParam;
    bool status = true;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_SAMPLE_RATE, DEFAULT_SAMPLERATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_BITRATE, DEFAULT_BITRATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_CHANNEL_COUNT, DEFAULT_CHANNEL_COUNT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_MAX_INPUT_SIZE, DEFAULT_MAX_INPUT_SIZE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AAC_IS_ADTS, DEFAULT_AAC_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_MPEG);
    checkParam = OH_AudioDecoder_Configure(audioDec, format);
    checkParam = OH_AudioDecoder_Prepare(audioDec);
    if (OH_AudioDecoder_Start(audioDec) == AV_ERR_OK) {
        checkParam = OH_AudioDecoder_Flush(audioDec);
        if (checkParam == AV_ERR_OK) {
            checkParam = OH_AudioDecoder_IsValid(audioDec, &status);
            if (checkParam == AV_ERR_OK) {
                backParam = SUCCESS;
                OH_AudioDecoder_Stop(audioDec);
            }
        }
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAudioDecoderCreateByNameAnormal(napi_env env, napi_callback_info info)
{
    OH_AVCapability *capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_AUDIO_AAC, false);
    const char *name = OH_AVCapability_GetName(capability);
    return TestInitPtr(env, OH_AudioDecoder_CreateByName(name));
}

static napi_value OHAudioDecoderCreateByNameBnormal(napi_env env, napi_callback_info info)
{
    OH_AVCapability *capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_AUDIO_MPEG, false);
    const char *name = OH_AVCapability_GetName(capability);
    return TestInitPtr(env, OH_AudioDecoder_CreateByName(name));
}

static napi_value OHAudioDecoderCreateByNameCnormal(napi_env env, napi_callback_info info)
{
    OH_AVCapability *capability = OH_AVCodec_GetCapability(OH_AVCODEC_MIMETYPE_AUDIO_FLAC, false);
    const char *name = OH_AVCapability_GetName(capability);
    return TestInitPtr(env, OH_AudioDecoder_CreateByName(name));
}

static napi_value OHAudioDecoderDestroyAnormal(napi_env env, napi_callback_info info)
{
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_AAC);
    return TestInitAVErrCode(env, OH_AudioDecoder_Destroy(audioDec));
}

static napi_value OHAudioDecoderDestroyBnormal(napi_env env, napi_callback_info info)
{
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_MPEG);
    return TestInitAVErrCode(env, OH_AudioDecoder_Destroy(audioDec));
}

static napi_value OHAudioDecoderDestroyCnormal(napi_env env, napi_callback_info info)
{
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS);
    return TestInitAVErrCode(env, OH_AudioDecoder_Destroy(audioDec));
}

static napi_value OHAudioDecoderStartAnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_SAMPLE_RATE, DEFAULT_SAMPLERATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_BITRATE, DEFAULT_BITRATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_CHANNEL_COUNT, DEFAULT_CHANNEL_COUNT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_MAX_INPUT_SIZE, DEFAULT_MAX_INPUT_SIZE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AAC_IS_ADTS, DEFAULT_AAC_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_AAC);
    OH_AudioDecoder_Configure(audioDec, format);
    OH_AudioDecoder_Prepare(audioDec);
    checkParam = OH_AudioDecoder_Start(audioDec);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAudioDecoderStartBnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_SAMPLE_RATE, DEFAULT_SAMPLERATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_BITRATE, DEFAULT_BITRATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_CHANNEL_COUNT, DEFAULT_CHANNEL_COUNT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_MAX_INPUT_SIZE, DEFAULT_MAX_INPUT_SIZE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AAC_IS_ADTS, DEFAULT_AAC_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_FLAC);
    OH_AudioDecoder_Configure(audioDec, format);
    OH_AudioDecoder_Prepare(audioDec);
    checkParam = OH_AudioDecoder_Start(audioDec);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAudioDecoderStartCnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_IDENTIFICATION_HEADER, DEFAULT_VORBISTWO_TYPE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_SETUP_HEADER, DEFAULT_VORBIS_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS);
    OH_AudioDecoder_Configure(audioDec, format);
    OH_AudioDecoder_Prepare(audioDec);
    checkParam = OH_AudioDecoder_Start(audioDec);
    if (checkParam == AV_ERR_OK) {
        backParam = SUCCESS;
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAudioDecoderStopAnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_SAMPLE_RATE, DEFAULT_SAMPLERATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_BITRATE, DEFAULT_BITRATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_CHANNEL_COUNT, DEFAULT_CHANNEL_COUNT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_MAX_INPUT_SIZE, DEFAULT_MAX_INPUT_SIZE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AAC_IS_ADTS, DEFAULT_AAC_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_AAC);
    OH_AudioDecoder_Configure(audioDec, format);
    OH_AudioDecoder_Prepare(audioDec);
    if (OH_AudioDecoder_Start(audioDec) == AV_ERR_OK) {
        checkParam = OH_AudioDecoder_Stop(audioDec);
        if (checkParam == AV_ERR_OK) {
            backParam = SUCCESS;
        }
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAudioDecoderStopBnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_SAMPLE_RATE, DEFAULT_SAMPLERATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_BITRATE, DEFAULT_BITRATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_CHANNEL_COUNT, DEFAULT_CHANNEL_COUNT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_MAX_INPUT_SIZE, DEFAULT_MAX_INPUT_SIZE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AAC_IS_ADTS, DEFAULT_AAC_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_FLAC);
    OH_AudioDecoder_Configure(audioDec, format);
    OH_AudioDecoder_Prepare(audioDec);
    if (OH_AudioDecoder_Start(audioDec) == AV_ERR_OK) {
        checkParam = OH_AudioDecoder_Stop(audioDec);
        if (checkParam == AV_ERR_OK) {
            backParam = SUCCESS;
        }
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAudioDecoderStopCnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_IDENTIFICATION_HEADER, DEFAULT_VORBISTWO_TYPE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_SETUP_HEADER, DEFAULT_VORBIS_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS);
    OH_AudioDecoder_Configure(audioDec, format);
    OH_AudioDecoder_Prepare(audioDec);
    if (OH_AudioDecoder_Start(audioDec) == AV_ERR_OK) {
        checkParam = OH_AudioDecoder_Stop(audioDec);
        if (checkParam == AV_ERR_OK) {
            backParam = SUCCESS;
        }
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAudioDecoderFlushAnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_SAMPLE_RATE, DEFAULT_SAMPLERATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_BITRATE, DEFAULT_BITRATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_CHANNEL_COUNT, DEFAULT_CHANNEL_COUNT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_MAX_INPUT_SIZE, DEFAULT_MAX_INPUT_SIZE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AAC_IS_ADTS, DEFAULT_AAC_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_AAC);
    OH_AudioDecoder_Configure(audioDec, format);
    OH_AudioDecoder_Prepare(audioDec);
    if (OH_AudioDecoder_Start(audioDec) == AV_ERR_OK) {
        checkParam = OH_AudioDecoder_Flush(audioDec);
        if (checkParam == AV_ERR_OK) {
            backParam = SUCCESS;
            OH_AudioDecoder_Stop(audioDec);
        }
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAudioDecoderFlushBnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_SAMPLE_RATE, DEFAULT_SAMPLERATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_BITRATE, DEFAULT_BITRATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_CHANNEL_COUNT, DEFAULT_CHANNEL_COUNT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_MAX_INPUT_SIZE, DEFAULT_MAX_INPUT_SIZE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AAC_IS_ADTS, DEFAULT_AAC_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_FLAC);
    OH_AudioDecoder_Configure(audioDec, format);
    OH_AudioDecoder_Prepare(audioDec);
    if (OH_AudioDecoder_Start(audioDec) == AV_ERR_OK) {
        checkParam = OH_AudioDecoder_Flush(audioDec);
        if (checkParam == AV_ERR_OK) {
            backParam = SUCCESS;
            OH_AudioDecoder_Stop(audioDec);
        }
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAudioDecoderFlushCnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_IDENTIFICATION_HEADER, DEFAULT_VORBISTWO_TYPE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_SETUP_HEADER, DEFAULT_VORBIS_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS);
    OH_AudioDecoder_Configure(audioDec, format);
    OH_AudioDecoder_Prepare(audioDec);
    if (OH_AudioDecoder_Start(audioDec) == AV_ERR_OK) {
        checkParam = OH_AudioDecoder_Flush(audioDec);
        if (checkParam == AV_ERR_OK) {
            backParam = SUCCESS;
            OH_AudioDecoder_Stop(audioDec);
        }
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAudioDecoderResetAnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_SAMPLE_RATE, DEFAULT_SAMPLERATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_BITRATE, DEFAULT_BITRATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_CHANNEL_COUNT, DEFAULT_CHANNEL_COUNT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_MAX_INPUT_SIZE, DEFAULT_MAX_INPUT_SIZE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AAC_IS_ADTS, DEFAULT_AAC_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_MPEG);
    OH_AudioDecoder_Configure(audioDec, format);
    OH_AudioDecoder_Prepare(audioDec);
    if (OH_AudioDecoder_Start(audioDec) == AV_ERR_OK) {
        checkParam = OH_AudioDecoder_Reset(audioDec);
        if (checkParam == AV_ERR_OK) {
            backParam = SUCCESS;
            OH_AudioDecoder_Stop(audioDec);
        }
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAudioDecoderResetBnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_SAMPLE_RATE, DEFAULT_SAMPLERATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_BITRATE, DEFAULT_BITRATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_CHANNEL_COUNT, DEFAULT_CHANNEL_COUNT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_MAX_INPUT_SIZE, DEFAULT_MAX_INPUT_SIZE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AAC_IS_ADTS, DEFAULT_AAC_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_FLAC);
    OH_AudioDecoder_Configure(audioDec, format);
    OH_AudioDecoder_Prepare(audioDec);
    if (OH_AudioDecoder_Start(audioDec) == AV_ERR_OK) {
        checkParam = OH_AudioDecoder_Reset(audioDec);
        if (checkParam == AV_ERR_OK) {
            backParam = SUCCESS;
            OH_AudioDecoder_Stop(audioDec);
        }
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAudioDecoderResetCnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_IDENTIFICATION_HEADER, DEFAULT_VORBISTWO_TYPE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_SETUP_HEADER, DEFAULT_VORBIS_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS);
    OH_AudioDecoder_Configure(audioDec, format);
    OH_AudioDecoder_Prepare(audioDec);
    if (OH_AudioDecoder_Start(audioDec) == AV_ERR_OK) {
        checkParam = OH_AudioDecoder_Reset(audioDec);
        if (checkParam == AV_ERR_OK) {
            backParam = SUCCESS;
            OH_AudioDecoder_Stop(audioDec);
        }
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAudioDecoderGetOutputDescriptionAnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVFormat *checkParam = nullptr;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_SAMPLE_RATE, DEFAULT_SAMPLERATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_BITRATE, DEFAULT_BITRATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_CHANNEL_COUNT, DEFAULT_CHANNEL_COUNT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_MAX_INPUT_SIZE, DEFAULT_MAX_INPUT_SIZE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AAC_IS_ADTS, DEFAULT_AAC_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_AAC);
    OH_AudioDecoder_Configure(audioDec, format);
    OH_AudioDecoder_Prepare(audioDec);
    if (OH_AudioDecoder_Start(audioDec) == AV_ERR_OK) {
        checkParam = OH_AudioDecoder_GetOutputDescription(audioDec);
        if (checkParam != nullptr) {
            backParam = SUCCESS;
            OH_AudioDecoder_Stop(audioDec);
            free(checkParam);
        }
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAudioDecoderGetOutputDescriptionBnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVFormat *checkParam = nullptr;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_SAMPLE_RATE, DEFAULT_SAMPLERATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_BITRATE, DEFAULT_BITRATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_CHANNEL_COUNT, DEFAULT_CHANNEL_COUNT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_MAX_INPUT_SIZE, DEFAULT_MAX_INPUT_SIZE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AAC_IS_ADTS, DEFAULT_AAC_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_FLAC);
    OH_AudioDecoder_Configure(audioDec, format);
    OH_AudioDecoder_Prepare(audioDec);
    if (OH_AudioDecoder_Start(audioDec) == AV_ERR_OK) {
        checkParam = OH_AudioDecoder_GetOutputDescription(audioDec);
        if (checkParam != nullptr) {
            backParam = SUCCESS;
            OH_AudioDecoder_Stop(audioDec);
            free(checkParam);
        }
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAudioDecoderGetOutputDescriptionCnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVFormat *checkParam = nullptr;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_IDENTIFICATION_HEADER, DEFAULT_VORBISTWO_TYPE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_SETUP_HEADER, DEFAULT_VORBIS_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS);
    OH_AudioDecoder_Configure(audioDec, format);
    OH_AudioDecoder_Prepare(audioDec);
    if (OH_AudioDecoder_Start(audioDec) == AV_ERR_OK) {
        checkParam = OH_AudioDecoder_GetOutputDescription(audioDec);
        if (checkParam != nullptr) {
            backParam = SUCCESS;
            OH_AudioDecoder_Stop(audioDec);
            free(checkParam);
        }
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAudioDecoderSetParameterAnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_SAMPLE_RATE, DEFAULT_SAMPLERATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_BITRATE, DEFAULT_BITRATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_CHANNEL_COUNT, DEFAULT_CHANNEL_COUNT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_MAX_INPUT_SIZE, DEFAULT_MAX_INPUT_SIZE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AAC_IS_ADTS, DEFAULT_AAC_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_AAC);
    OH_AudioDecoder_Configure(audioDec, format);
    OH_AudioDecoder_Prepare(audioDec);
    if (OH_AudioDecoder_Start(audioDec) == AV_ERR_OK) {
        format = OH_AudioDecoder_GetOutputDescription(audioDec);
        if (format != nullptr) {
            checkParam = OH_AudioDecoder_SetParameter(audioDec, format);
            if (checkParam == AV_ERR_OK) {
                backParam = SUCCESS;
                free(format);
            }
        }
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAudioDecoderSetParameterBnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_SAMPLE_RATE, DEFAULT_SAMPLERATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_BITRATE, DEFAULT_BITRATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_CHANNEL_COUNT, DEFAULT_CHANNEL_COUNT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_MAX_INPUT_SIZE, DEFAULT_MAX_INPUT_SIZE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AAC_IS_ADTS, DEFAULT_AAC_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_FLAC);
    OH_AudioDecoder_Configure(audioDec, format);
    OH_AudioDecoder_Prepare(audioDec);
    if (OH_AudioDecoder_Start(audioDec) == AV_ERR_OK) {
        format = OH_AudioDecoder_GetOutputDescription(audioDec);
        if (format != nullptr) {
            checkParam = OH_AudioDecoder_SetParameter(audioDec, format);
            if (checkParam == AV_ERR_OK) {
                backParam = SUCCESS;
                free(format);
            }
        }
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAudioDecoderSetParameterCnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVErrCode checkParam;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_IDENTIFICATION_HEADER, DEFAULT_VORBISTWO_TYPE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_SETUP_HEADER, DEFAULT_VORBIS_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS);
    OH_AudioDecoder_Configure(audioDec, format);
    OH_AudioDecoder_Prepare(audioDec);
    if (OH_AudioDecoder_Start(audioDec) == AV_ERR_OK) {
        format = OH_AudioDecoder_GetOutputDescription(audioDec);
        if (format != nullptr) {
            checkParam = OH_AudioDecoder_SetParameter(audioDec, format);
            if (checkParam == AV_ERR_OK) {
                backParam = SUCCESS;
                free(format);
            }
        }
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAudioDecoderIsValidAnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVErrCode checkParam;
    bool status = true;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_SAMPLE_RATE, DEFAULT_SAMPLERATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_BITRATE, DEFAULT_BITRATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_CHANNEL_COUNT, DEFAULT_CHANNEL_COUNT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_MAX_INPUT_SIZE, DEFAULT_MAX_INPUT_SIZE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AAC_IS_ADTS, DEFAULT_AAC_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_AAC);
    OH_AudioDecoder_Configure(audioDec, format);
    OH_AudioDecoder_Prepare(audioDec);
    if (OH_AudioDecoder_Start(audioDec) == AV_ERR_OK) {
        checkParam = OH_AudioDecoder_Flush(audioDec);
        if (checkParam == AV_ERR_OK) {
            checkParam = OH_AudioDecoder_IsValid(audioDec, &status);
            if (checkParam == AV_ERR_OK) {
                backParam = SUCCESS;
                OH_AudioDecoder_Stop(audioDec);
            }
        }
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAudioDecoderIsValidBnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVErrCode checkParam;
    bool status = true;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_SAMPLE_RATE, DEFAULT_SAMPLERATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_BITRATE, DEFAULT_BITRATE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AUD_CHANNEL_COUNT, DEFAULT_CHANNEL_COUNT);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_MAX_INPUT_SIZE, DEFAULT_MAX_INPUT_SIZE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_AAC_IS_ADTS, DEFAULT_AAC_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_FLAC);
    OH_AudioDecoder_Configure(audioDec, format);
    OH_AudioDecoder_Prepare(audioDec);
    if (OH_AudioDecoder_Start(audioDec) == AV_ERR_OK) {
        checkParam = OH_AudioDecoder_Flush(audioDec);
        if (checkParam == AV_ERR_OK) {
            checkParam = OH_AudioDecoder_IsValid(audioDec, &status);
            if (checkParam == AV_ERR_OK) {
                backParam = SUCCESS;
                OH_AudioDecoder_Stop(audioDec);
            }
        }
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value OHAudioDecoderIsValidCnormal(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    napi_value result = nullptr;
    OH_AVErrCode checkParam;
    bool status = true;
    OH_AVFormat *format = nullptr;
    format = OH_AVFormat_Create();
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_IDENTIFICATION_HEADER, DEFAULT_VORBISTWO_TYPE);
    OH_AVFormat_SetIntValue(format, OH_MD_KEY_SETUP_HEADER, DEFAULT_VORBIS_TYPE);
    OH_AVCodec *audioDec = OH_AudioDecoder_CreateByMime(OH_AVCODEC_MIMETYPE_AUDIO_VORBIS);
    OH_AudioDecoder_Configure(audioDec, format);
    OH_AudioDecoder_Prepare(audioDec);
    if (OH_AudioDecoder_Start(audioDec) == AV_ERR_OK) {
        checkParam = OH_AudioDecoder_Flush(audioDec);
        if (checkParam == AV_ERR_OK) {
            checkParam = OH_AudioDecoder_IsValid(audioDec, &status);
            if (checkParam == AV_ERR_OK) {
                backParam = SUCCESS;
                OH_AudioDecoder_Stop(audioDec);
            }
        }
    }
    napi_create_int32(env, backParam, &result);
    return result;
}

EXTERN_C_START
static napi_value Init(napi_env env, napi_value exports)
{
    napi_property_descriptor desc[] = {
        {"OH_AudioDecoder_CreateByMime", nullptr, AudioDecoderCreateByMimeAudioAac, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"OH_AudioDecoder_CreateByName", nullptr, AudioDecoderCreateByName, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"OH_AudioDecoder_Destroy", nullptr, AudioDecoderDestroy, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"OH_AudioDecoder_SetCallback", nullptr, AudioDecoderSetCallback, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"OH_AudioDecoder_Configure", nullptr, AudioDecoderConfigure, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"OH_AudioDecoder_Prepare", nullptr, AudioDecoderPrepare, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"OH_AudioDecoder_Start", nullptr, AudioDecoderStart, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"OH_AudioDecoder_Stop", nullptr, AudioDecoderStop, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"OH_AudioDecoder_Flush", nullptr, AudioDecoderFlush, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"OH_AudioDecoder_Reset", nullptr, AudioDecoderReset, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"OH_AudioDecoder_GetOutputDescription", nullptr, AudioDecoderGetOutputDescription, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"OH_AudioDecoder_SetParameter", nullptr, AudioDecoderSetParameter, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"OH_AudioDecoder_IsValid", nullptr, AudioDecoderIsValid, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"OHAudioDecoderCreateByNameAnormal", nullptr, OHAudioDecoderCreateByNameAnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"OHAudioDecoderCreateByNameBnormal", nullptr, OHAudioDecoderCreateByNameBnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"OHAudioDecoderCreateByNameCnormal", nullptr, OHAudioDecoderCreateByNameCnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"OHAudioDecoderDestroyAnormal", nullptr, OHAudioDecoderDestroyAnormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"OHAudioDecoderDestroyBnormal", nullptr, OHAudioDecoderDestroyBnormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"OHAudioDecoderDestroyCnormal", nullptr, OHAudioDecoderDestroyCnormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"OHAudioDecoderStartAnormal", nullptr, OHAudioDecoderStartAnormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"OHAudioDecoderStartBnormal", nullptr, OHAudioDecoderStartBnormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"OHAudioDecoderStartCnormal", nullptr, OHAudioDecoderStartCnormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"OHAudioDecoderStopAnormal", nullptr, OHAudioDecoderStopAnormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"OHAudioDecoderStopBnormal", nullptr, OHAudioDecoderStopBnormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"OHAudioDecoderStopCnormal", nullptr, OHAudioDecoderStopCnormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"OHAudioDecoderFlushAnormal", nullptr, OHAudioDecoderFlushAnormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"OHAudioDecoderFlushBnormal", nullptr, OHAudioDecoderFlushBnormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"OHAudioDecoderFlushCnormal", nullptr, OHAudioDecoderFlushCnormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"OHAudioDecoderResetAnormal", nullptr, OHAudioDecoderResetAnormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"OHAudioDecoderResetBnormal", nullptr, OHAudioDecoderResetBnormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"OHAudioDecoderResetCnormal", nullptr, OHAudioDecoderResetCnormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"OHAudioDecoderGetOutputDescriptionAnormal", nullptr, OHAudioDecoderGetOutputDescriptionAnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"OHAudioDecoderGetOutputDescriptionBnormal", nullptr, OHAudioDecoderGetOutputDescriptionBnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"OHAudioDecoderGetOutputDescriptionCnormal", nullptr, OHAudioDecoderGetOutputDescriptionCnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"OHAudioDecoderSetParameterAnormal", nullptr, OHAudioDecoderSetParameterAnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"OHAudioDecoderSetParameterBnormal", nullptr, OHAudioDecoderSetParameterBnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"OHAudioDecoderSetParameterCnormal", nullptr, OHAudioDecoderSetParameterCnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"OHAudioDecoderIsValidAnormal", nullptr, OHAudioDecoderIsValidAnormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"OHAudioDecoderIsValidBnormal", nullptr, OHAudioDecoderIsValidBnormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"OHAudioDecoderIsValidCnormal", nullptr, OHAudioDecoderIsValidCnormal, nullptr, nullptr, nullptr, napi_default,
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
    .nm_modname = "libaudiodecoderxdlndk",
    .nm_priv = ((void *)0),
    .reserved = { 0 },
};

extern "C" __attribute__((constructor)) void RegisterModule(void)
{
    napi_module_register(&demoModule);
}
