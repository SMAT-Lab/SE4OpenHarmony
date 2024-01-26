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
#include <fcntl.h>
#include <js_native_api_types.h>
#include <multimedia/player_framework/native_avsource.h>
#include <multimedia/player_framework/native_avdemuxer.h>
#include <multimedia/player_framework/native_avcapability.h>
#include <multimedia/player_framework/native_avcodec_base.h>
#include <multimedia/player_framework/native_avformat.h>
#include <sys/stat.h>
#include <unistd.h>

#define FAIL (-1)
#define SUCCESS 0
#define ZEROVAL 0
#define PARAM_0666 0666
#define PARAM_0 0
static napi_value AVSourceCreateWithURI(napi_env env, napi_callback_info info)
{
    int checkParam = FAIL;
    OH_AVSource *backParam = nullptr;
    backParam = OH_AVSource_CreateWithURI(nullptr);
    if (backParam != nullptr) {
        checkParam = SUCCESS;
    }
    OH_AVSource_Destroy(backParam);
    backParam = nullptr;
    napi_value result = nullptr;
    napi_create_int32(env, checkParam, &result);
    return result;
}

static napi_value AVSourceCreateWithFD(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    OH_AVSource *checkParam = nullptr;
    char fileName[] = {"/data/storage/el2/base/files/demo.mp4"};
    int fd = open(fileName, O_RDONLY, PARAM_0666);
    struct stat fileStatus {};
    size_t fileSize = PARAM_0;
    if (stat(fileName, &fileStatus) == ZEROVAL) {
        fileSize = static_cast<size_t>(fileStatus.st_size);
    } else {
        napi_value result = nullptr;
        napi_create_int32(env, backParam, &result);
        return result;
    }
    checkParam = OH_AVSource_CreateWithFD(fd, PARAM_0, fileSize);
    if (checkParam != nullptr) {
        backParam = SUCCESS;
    }
    OH_AVSource_Destroy(checkParam);
    checkParam = nullptr;
    napi_value result = nullptr;
    close(fd);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AVSourceDestroy(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    OH_AVSource *getSource = nullptr;
    napi_value result = nullptr;
    OH_AVErrCode checkParam;
    char fileName[] = {"/data/storage/el2/base/files/demo.mp4"};
    int fd = open(fileName, O_RDONLY, PARAM_0666);
    struct stat fileStatus {};
    size_t fileSize = PARAM_0;
    if (stat(fileName, &fileStatus) == ZEROVAL) {
        fileSize = static_cast<size_t>(fileStatus.st_size);
    } else {
        result = nullptr;
        napi_create_int32(env, backParam, &result);
        return result;
    }
    getSource = OH_AVSource_CreateWithFD(fd, PARAM_0, fileSize);
    if (getSource != nullptr) {
        checkParam = OH_AVSource_Destroy(getSource);
        if(checkParam == AV_ERR_OK){
            backParam = SUCCESS;
        }
    }
    close(fd);
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AVSourceGetSourceFormat(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    OH_AVSource *getSource = nullptr;
    OH_AVFormat *checkParam = nullptr;
    char fileName[] = {"/data/storage/el2/base/files/demo.mp4"};
    int fd = open(fileName, O_RDONLY, PARAM_0666);
    struct stat fileStatus {};
    size_t fileSize = PARAM_0;
    if (stat(fileName, &fileStatus) == ZEROVAL) {
        fileSize = static_cast<size_t>(fileStatus.st_size);
    } else {
        napi_value result = nullptr;
        napi_create_int32(env, backParam, &result);
        return result;
    }
    getSource = OH_AVSource_CreateWithFD(fd, PARAM_0, fileSize);
    if (getSource != nullptr) {
        checkParam = OH_AVSource_GetSourceFormat(getSource);
    }
    if (checkParam != nullptr) {
        backParam = SUCCESS;
    }
    OH_AVSource_Destroy(getSource);
    close(fd);
    napi_value result = nullptr;
    napi_create_int32(env, backParam, &result);
    return result;
}

static napi_value AVSourceGetTrackFormat(napi_env env, napi_callback_info info)
{
    int backParam = FAIL;
    OH_AVSource *getSource = nullptr;
    OH_AVFormat *checkParam = nullptr;
    napi_value result = nullptr;
    char fileName[] = {"/data/storage/el2/base/files/demo.mp4"};
    int fd = open(fileName, O_RDONLY, PARAM_0666);
    struct stat fileStatus {};
    size_t fileSize = PARAM_0;
    if (stat(fileName, &fileStatus) == ZEROVAL) {
        fileSize = static_cast<size_t>(fileStatus.st_size);
    } else {
        backParam = 1;
    }
    getSource = OH_AVSource_CreateWithFD(fd, PARAM_0, fileSize);
    if (getSource != nullptr) {
        checkParam = OH_AVSource_GetTrackFormat(getSource, PARAM_0);
        if (checkParam != nullptr) {
            backParam = SUCCESS;
        }
    }
    OH_AVSource_Destroy(getSource);
    close(fd);
    napi_create_int32(env, backParam, &result);
    return result;
}

EXTERN_C_START
static napi_value Init(napi_env env, napi_value exports) {
    napi_property_descriptor desc[] = {
        {"OH_AVSource_CreateWithURI", nullptr, AVSourceCreateWithURI, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"OH_AVSource_CreateWithFD", nullptr, AVSourceCreateWithFD, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"OH_AVSource_Destroy", nullptr, AVSourceDestroy, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"OH_AVSource_GetSourceFormat", nullptr, AVSourceGetSourceFormat, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"OH_AVSource_GetTrackFormat", nullptr, AVSourceGetTrackFormat, nullptr, nullptr, nullptr, napi_default,
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
    .nm_modname = "libmediaavsourcendk",
    .nm_priv = ((void *)0),
    .reserved = {0},
};

extern "C" __attribute__((constructor)) void RegisterModule(void) {
    napi_module_register(&demoModule);
}
