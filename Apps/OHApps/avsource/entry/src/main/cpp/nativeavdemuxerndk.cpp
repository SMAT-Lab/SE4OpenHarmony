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
#include "node_api.h"
#include <fcntl.h>
#include <linux/usb/charger.h>
#include <multimedia/player_framework/native_avcodec_audiodecoder.h>
#include <multimedia/player_framework/native_avcodec_base.h>
#include <multimedia/player_framework/native_avdemuxer.h>
#include <multimedia/player_framework/native_averrors.h>
#include <multimedia/player_framework/native_avmuxer.h>
#include <multimedia/player_framework/native_avsource.h>
#include <sys/stat.h>
#include <unistd.h>

#define MUNUSONE (-1)
#define ZEROVAL 0
#define BIGVAL 44100
#define TWOVAL 2
#define ONEONEVAL 11
#define PARAM_1 1
#define TWOTWOVAL 23
#define SUCCESS 0
#define FAIL (-1)
#define DENSITY 240
#define ONEHUNVAL 100
#define PARAM_0666 0777
#define PARAM_0 0
#define PATH "/data/storage/el2/base/files/demo1.mp4"

static int64_t GetFileSize(const char *fileName)
{
    int64_t fileSize = ZEROVAL;
    if (fileName != nullptr) {
        struct stat fileStatus;
        fileSize = static_cast<size_t>(fileStatus.st_size);
    }
    return fileSize;
}

static OH_AVSource *GetSource()
{
    int fd = open(PATH, O_RDWR, PARAM_0666);
    int64_t fileSize = GetFileSize(PATH);
    OH_AVSource *source;
    int64_t offset = ZEROVAL;
    source = OH_AVSource_CreateWithFD(fd, offset, fileSize);
    close(fd);
    return source;
}

static napi_value OHAVDemuxerCreateWithSource(napi_env env, napi_callback_info info)
{
    OH_AVDemuxer *demuxer = nullptr;
    demuxer = OH_AVDemuxer_CreateWithSource(GetSource());
    int returnValue = FAIL;
    if (demuxer != nullptr) {
        returnValue = SUCCESS;
    } else if (demuxer == nullptr) {
        returnValue = ONEHUNVAL;
    }
    napi_value result = nullptr;
    napi_create_int32(env, returnValue, &result);
    OH_AVDemuxer_Destroy(demuxer);
    return result;
}

static napi_value OHAVDemuxerDestroy(napi_env env, napi_callback_info info)
{
    OH_AVErrCode backInfo;
    OH_AVDemuxer *demuxer = nullptr;
    demuxer = OH_AVDemuxer_CreateWithSource(GetSource());
    int returnValue = FAIL;
    backInfo = OH_AVDemuxer_Destroy(demuxer);
    if (backInfo == AV_ERR_OK) {
        returnValue = SUCCESS;
    }
    demuxer = nullptr;
    napi_value result = nullptr;
    napi_create_int32(env, returnValue, &result);
    return result;
}

static napi_value OHAVDemuxerUnselectTrackByID(napi_env env, napi_callback_info info)
{
    OH_AVErrCode backInfo = AV_ERR_OK;
    OH_AVDemuxer *demuxer = nullptr;
    uint32_t audioTrackIndex = ZEROVAL;
    uint32_t videoTrackIndex = ZEROVAL;
    demuxer = OH_AVDemuxer_CreateWithSource(GetSource());
    OH_AVDemuxer_SelectTrackByID(demuxer, audioTrackIndex);
    OH_AVDemuxer_SelectTrackByID(demuxer, videoTrackIndex);
    backInfo = OH_AVDemuxer_UnselectTrackByID(demuxer, audioTrackIndex);
    int returnValue = FAIL;
    if (backInfo == AV_ERR_OK) {
        returnValue = SUCCESS;
    } else if (demuxer == nullptr) {
        returnValue = ONEHUNVAL;
    }
    napi_value result = nullptr;
    napi_create_int32(env, returnValue, &result);
    OH_AVDemuxer_Destroy(demuxer);
    return result;
}

static napi_value OHAVDemuxerSeekToTime(napi_env env, napi_callback_info info)
{
    OH_AVErrCode backInfo = AV_ERR_OK;
    OH_AVDemuxer *demuxer = nullptr;
    uint32_t audioTrackIndex = ZEROVAL;
    uint32_t videoTrackIndex = ZEROVAL;
    demuxer = OH_AVDemuxer_CreateWithSource(GetSource());
    OH_AVDemuxer_SelectTrackByID(demuxer, audioTrackIndex);
    OH_AVDemuxer_SelectTrackByID(demuxer, videoTrackIndex);
    int returnValue = FAIL;
    backInfo = OH_AVDemuxer_SeekToTime(demuxer, ZEROVAL, OH_AVSeekMode::SEEK_MODE_CLOSEST_SYNC);
    if (backInfo == AV_ERR_OK) {
        returnValue = SUCCESS;
    }
    napi_value result = nullptr;
    napi_create_int32(env, returnValue, &result);
    OH_AVDemuxer_Destroy(demuxer);
    return result;
}

static napi_value OHAVDemuxerSelectTrackByID(napi_env env, napi_callback_info info)
{
    OH_AVErrCode backInfo = AV_ERR_OK;
    OH_AVErrCode backInfoo = AV_ERR_OK;
    OH_AVDemuxer *demuxer = nullptr;
    uint32_t audioTrackIndex = ZEROVAL;
    uint32_t videoTrackIndex = ZEROVAL;
    demuxer = OH_AVDemuxer_CreateWithSource(GetSource());
    int returnValue = FAIL;
    backInfo = OH_AVDemuxer_SelectTrackByID(demuxer, audioTrackIndex);
    backInfoo = OH_AVDemuxer_SelectTrackByID(demuxer, videoTrackIndex);
    if (backInfo == AV_ERR_OK) {
        returnValue = SUCCESS;
    }
    if (backInfoo == AV_ERR_OK) {
        returnValue = SUCCESS;
    }
    napi_value result = nullptr;
    napi_create_int32(env, returnValue, &result);
    OH_AVDemuxer_Destroy(demuxer);
    return result;
}

static napi_value OHAVDemuxerReadSample(napi_env env, napi_callback_info info)
{
    OH_AVSource *oH_AVSource = GetSource();
    OH_AVDemuxer *demuxer;
    demuxer = OH_AVDemuxer_CreateWithSource(oH_AVSource);
    int returnValue = FAIL;
    OH_AVMemory *buffer = OH_AVMemory_Create(TWOTWOVAL);
    uint32_t audioTrackIndex = ZEROVAL;
    OH_AVDemuxer_SelectTrackByID(demuxer, audioTrackIndex);
    OH_AVCodecBufferAttr attrInfo;
    attrInfo.pts = ZEROVAL;
    attrInfo.size = ZEROVAL;
    attrInfo.offset = ZEROVAL;
    attrInfo.flags |= AVCODEC_BUFFER_FLAGS_SYNC_FRAME;
    OH_AVDemuxer_SeekToTime(demuxer, ZEROVAL, OH_AVSeekMode::SEEK_MODE_CLOSEST_SYNC);
    if (OH_AVDemuxer_ReadSample(demuxer, audioTrackIndex, buffer, &attrInfo) == AV_ERR_OK) {
        returnValue = SUCCESS;
    }
    napi_value result = nullptr;
    OH_AVMemory_Destroy(buffer);
    if (oH_AVSource == nullptr) {
        returnValue = PARAM_1;
    }
    if (demuxer == nullptr) {
        returnValue = TWOTWOVAL;
    }
    napi_create_int32(env, returnValue, &result);
    OH_AVDemuxer_Destroy(demuxer);
    return result;
}

EXTERN_C_START
static napi_value Init(napi_env env, napi_value exports)
{
    napi_property_descriptor desc[] = {
        {"oHAVDemuxerCreateWithSource", nullptr, OHAVDemuxerCreateWithSource, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHAVDemuxerDestroy", nullptr, OHAVDemuxerDestroy, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAVDemuxerUnselectTrackByID", nullptr, OHAVDemuxerUnselectTrackByID, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHAVDemuxerReadSample", nullptr, OHAVDemuxerReadSample, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAVDemuxerSeekToTime", nullptr, OHAVDemuxerSeekToTime, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHAVDemuxerSelectTrackByID", nullptr, OHAVDemuxerSelectTrackByID, nullptr, nullptr, nullptr, napi_default,
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
    .nm_modname = "nativeavdemuxer",
    .nm_priv = ((void *)0),
    .reserved = { 0 },
};

extern "C" __attribute__((constructor)) void RegisterEntryModule(void)
{
    napi_module_register(&demoModule);
}
