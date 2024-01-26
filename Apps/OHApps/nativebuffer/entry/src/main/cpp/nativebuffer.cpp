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
#include <native_buffer/native_buffer.h>

#define SUCCESS 0
#define FAIL (-1)
#define ERROR_NUMBER 40001000

static OH_NativeBuffer *getBuffer()
{
    OH_NativeBuffer_Config config = {
        .width = 0x100,
        .height = 0x100,
        .format = NATIVEBUFFER_PIXEL_FMT_RGBA_8888,
        .usage = NATIVEBUFFER_USAGE_CPU_READ | NATIVEBUFFER_USAGE_CPU_WRITE | NATIVEBUFFER_USAGE_MEM_DMA,
    };
    OH_NativeBuffer *buffer = OH_NativeBuffer_Alloc(&config);
    return buffer;
}
static napi_value OHNativeBufferAlloc(napi_env env, napi_callback_info info)
{

    napi_value result = nullptr;
    int backInfo = FAIL;
    OH_NativeBuffer *buffer = getBuffer();
    if (buffer != nullptr) {
        backInfo = SUCCESS;
    }
    napi_create_int32(env, backInfo, &result);
    return result;
}
static napi_value OHNativeBufferAllocAbnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backInfo = FAIL;
    OH_NativeBuffer *buffer = OH_NativeBuffer_Alloc(nullptr);

    if (buffer != nullptr) {
        backInfo = SUCCESS;
    }
    napi_create_int32(env, backInfo, &result);

    return result;
}
static napi_value OHNativeBufferReference(napi_env env, napi_callback_info info)
{
    int backInfo = FAIL;
    OH_NativeBuffer *buffer = getBuffer();
    if (buffer != nullptr) {
        int32_t ret = OH_NativeBuffer_Reference(buffer);
        backInfo = ret;
    }
    napi_value result = nullptr;
    napi_create_int32(env, backInfo, &result);
    return result;
}
static napi_value OHNativeBufferReferenceAbnormal(napi_env env, napi_callback_info info)
{
    int backInfo = FAIL;
    int32_t ret = OH_NativeBuffer_Reference(nullptr);
    if (ret == 0) {
        backInfo = SUCCESS;
    }
    napi_value result = nullptr;
    napi_create_int32(env, backInfo, &result);
    return result;
}
static napi_value OHNativeBufferUnreference(napi_env env, napi_callback_info info)
{
    int backInfo = FAIL;
    OH_NativeBuffer *buffer = getBuffer();

    if (buffer != nullptr) {
        int32_t ret = OH_NativeBuffer_Unreference(buffer);
        backInfo = ret;
    }
    napi_value result = nullptr;
    napi_create_int32(env, backInfo, &result);
    return result;
}

static napi_value OHNativeBufferUnreferenceAbnormal(napi_env env, napi_callback_info info)
{
    int backInfo = FAIL;

    int32_t ret = OH_NativeBuffer_Unreference(nullptr);
    if (ret == 0) {
        backInfo = SUCCESS;
    }
    napi_value result = nullptr;
    napi_create_int32(env, backInfo, &result);
    return result;
}

static napi_value OHNativeBufferGetConfig(napi_env env, napi_callback_info info)
{
    int backInfo = FAIL;
    OH_NativeBuffer *buffer = getBuffer();
    if (buffer != nullptr) {
        OH_NativeBuffer_Config checkConfig = {};
        checkConfig.width = 0x0;
        checkConfig.height = 0x0;
        checkConfig.format = 0x0;
        checkConfig.usage = 0x0;
        OH_NativeBuffer_GetConfig(buffer, &checkConfig);
        if (&checkConfig != nullptr) {
            backInfo = SUCCESS;
        }
    }
    napi_value result = nullptr;
    napi_create_int32(env, backInfo, &result);
    return result;
}

static napi_value OHNativeBufferMap(napi_env env, napi_callback_info info)
{
    int backInfo = FAIL;
    OH_NativeBuffer *buffer = getBuffer();

    if (buffer != nullptr) {
        void *virAddr = nullptr;
        int32_t ret = OH_NativeBuffer_Map(buffer, &virAddr);
        backInfo = ret;
    }
    napi_value result = nullptr;
    napi_create_int32(env, backInfo, &result);
    return result;
}
static napi_value OHNativeBufferMapAbnormal(napi_env env, napi_callback_info info)
{
    int backInfo = FAIL;
    void *virAddr = nullptr;
    int32_t ret = OH_NativeBuffer_Map(nullptr, &virAddr);
    if (ret == 0) {
        backInfo = SUCCESS;
    }
    napi_value result = nullptr;
    napi_create_int32(env, backInfo, &result);
    return result;
}
static napi_value OHNativeBufferUnmap(napi_env env, napi_callback_info info)
{
    int backInfo = FAIL;
    OH_NativeBuffer *buffer = getBuffer();

    if (buffer != nullptr) {
        int32_t ret = OH_NativeBuffer_Unmap(buffer);
        backInfo = ret;
    }
    napi_value result = nullptr;
    napi_create_int32(env, backInfo, &result);
    return result;
}
static napi_value OHNativeBufferUnmapAbnormal(napi_env env, napi_callback_info info)
{
    int backInfo = FAIL;
    int32_t ret = OH_NativeBuffer_Unmap(nullptr);
    if (ret == 0) {
        backInfo = SUCCESS;
    }
    napi_value result = nullptr;
    napi_create_int32(env, backInfo, &result);
    return result;
}
static napi_value OHNativeBufferGetSeqNum(napi_env env, napi_callback_info info)
{
    int backInfo = FAIL;
    OH_NativeBuffer *buffer = getBuffer();

    if (buffer != nullptr) {
        uint32_t id = OH_NativeBuffer_GetSeqNum(buffer);
        if (id > 0) {
            backInfo = SUCCESS;
        }
    }
    napi_value result = nullptr;
    napi_create_int32(env, backInfo, &result);
    return result;
}
static napi_value OHNativeBufferGetSeqNumAbnormal(napi_env env, napi_callback_info info)
{
    int backInfo = FAIL;
    uint32_t id = OH_NativeBuffer_GetSeqNum(nullptr);
    if (id > 0 && id != ERROR_NUMBER) {
        backInfo = SUCCESS;
    }
    napi_value result = nullptr;
    napi_create_int32(env, backInfo, &result);
    return result;
}
EXTERN_C_START
static napi_value Init(napi_env env, napi_value exports)
{
    napi_property_descriptor desc[] = {
        {"oHNativeBufferAlloc", nullptr, OHNativeBufferAlloc, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHNativeBufferReference", nullptr, OHNativeBufferReference, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHNativeBufferUnreference", nullptr, OHNativeBufferUnreference, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHNativeBufferGetConfig", nullptr, OHNativeBufferGetConfig, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHNativeBufferMap", nullptr, OHNativeBufferMap, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHNativeBufferUnmap", nullptr, OHNativeBufferUnmap, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHNativeBufferGetSeqNum", nullptr, OHNativeBufferGetSeqNum, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHNativeBufferAllocAbnormal", nullptr, OHNativeBufferAllocAbnormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHNativeBufferReferenceAbnormal", nullptr, OHNativeBufferReferenceAbnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHNativeBufferUnreferenceAbnormal", nullptr, OHNativeBufferUnreferenceAbnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHNativeBufferMapAbnormal", nullptr, OHNativeBufferMapAbnormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHNativeBufferUnmapAbnormal", nullptr, OHNativeBufferUnmapAbnormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHNativeBufferGetSeqNumAbnormal", nullptr, OHNativeBufferGetSeqNumAbnormal, nullptr, nullptr, nullptr,
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
    .nm_modname = "nativebuffer",
    .nm_priv = ((void *)0),
    .reserved = {0},
};

extern "C" __attribute__((constructor)) void RegisterModule(void) { napi_module_register(&demoModule); };
