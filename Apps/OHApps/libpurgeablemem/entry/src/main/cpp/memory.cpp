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
#include "native_common.h"
#include "cstdlib"
#include <js_native_api_types.h>
#include <purgeable_memory/purgeable_memory.h>

struct ParaData {
    int start;
    int end;
};
bool FactorialFunc(void *data, size_t, void *param)
{
    bool ret = true;
    ParaData *pData = (ParaData *)param;
    int *oriData = (int *)data;
    int i = pData->start;
    while (i < pData->end) {
        *oriData *= i;
        i++;
    }
    return ret;
}
struct AppendParaData {
    int newPara;
};
#define DATASIZE (4 * 1024 * 1024)
#define DATASIZENULL (0 * 1024 * 1024)
struct ParaData g_pData = {1, 2};

bool AddFunc(void *data, size_t, void *param)
{
    bool ret = true;
    int *oriDaTap = (int *)data;
    AppendParaData *apData = (AppendParaData *)param;
    *oriDaTap += apData->newPara;
    return ret;
}

static napi_value CreateOne(napi_env env, napi_callback_info)
{
    OH_PurgeableMemory *res = OH_PurgeableMemory_Create(DATASIZE, FactorialFunc, &g_pData);
    napi_value result = nullptr;
    napi_create_int32(env, res != nullptr, &result);
    OH_PurgeableMemory_Destroy(res);
    return result;
}

static napi_value CreateTwo(napi_env env, napi_callback_info)
{
    OH_PurgeableMemory *res = OH_PurgeableMemory_Create(DATASIZENULL, FactorialFunc, &g_pData);
    napi_value result = nullptr;
    napi_create_int32(env, res == nullptr, &result);
    OH_PurgeableMemory_Destroy(res);
    return result;
}

static napi_value DestroyOne(napi_env env, napi_callback_info)
{
    OH_PurgeableMemory *res = OH_PurgeableMemory_Create(DATASIZE, FactorialFunc, &g_pData);
    NAPI_ASSERT(env, res != nullptr, "OH_PurgeAbleMemory_Create failed");
    bool ret = OH_PurgeableMemory_Destroy(res);
    napi_value result = nullptr;
    napi_create_int32(env, ret, &result);
    return result;
}

static napi_value DestroyTwo(napi_env env, napi_callback_info)
{
    OH_PurgeableMemory *res = OH_PurgeableMemory_Create(DATASIZE, FactorialFunc, &g_pData);
    NAPI_ASSERT(env, res != nullptr, "OH_PurgeAbleMemory_Create failed");
    bool ret = OH_PurgeableMemory_Destroy(res);
    NAPI_ASSERT(env, ret == true, "OH_PurgeAbleMemory_Destroy failed");
    class ReqObj;
    ReqObj *pReqObj = (ReqObj *)OH_PurgeableMemory_GetContent(res);
    napi_value result = nullptr;
    napi_create_int32(env, pReqObj == nullptr, &result);
    return result;
}

static napi_value DestroyThree(napi_env env, napi_callback_info)
{
    OH_PurgeableMemory *res = nullptr;
    bool ret = OH_PurgeableMemory_Destroy(res);
    napi_value result = nullptr;
    napi_create_int32(env, ret, &result);
    return result;
}

static napi_value BeginReadOne(napi_env env, napi_callback_info)
{
    OH_PurgeableMemory *res = OH_PurgeableMemory_Create(DATASIZE, FactorialFunc, &g_pData);
    NAPI_ASSERT(env, res != nullptr, "OH_PurgeAbleMemory_Create failed");
    bool ret = OH_PurgeableMemory_BeginRead(res);
    OH_PurgeableMemory_EndRead(res);
    OH_PurgeableMemory_Destroy(res);
    napi_value result = nullptr;
    napi_create_int32(env, ret, &result);
    return result;
}

static napi_value BeginReadTwo(napi_env env, napi_callback_info)
{
    OH_PurgeableMemory *res = OH_PurgeableMemory_Create(DATASIZE, FactorialFunc, &g_pData);
    NAPI_ASSERT(env, res != nullptr, "OH_PurgeAbleMemory_Create failed");
    OH_PurgeableMemory_Destroy(res);
    bool ret = OH_PurgeableMemory_BeginRead(res);
    napi_value result = nullptr;
    napi_create_int32(env, ret, &result);
    return result;
}

static napi_value EndRead(napi_env env, napi_callback_info)
{
    OH_PurgeableMemory *res = OH_PurgeableMemory_Create(DATASIZE, FactorialFunc, &g_pData);
    NAPI_ASSERT(env, res != nullptr, "OH_PurgeAbleMemory_Create failed");
    bool beginReadValue = OH_PurgeableMemory_BeginRead(res);
    NAPI_ASSERT(env, beginReadValue == true, "OH_PurgeAbleMemory_BeginRead failed");
    OH_PurgeableMemory_EndRead(res);
    OH_PurgeableMemory_Destroy(res);
    napi_value result = nullptr;
    napi_create_int32(env, true, &result);
    return result;
}

static napi_value BeginWriteOne(napi_env env, napi_callback_info)
{
    OH_PurgeableMemory *res = OH_PurgeableMemory_Create(DATASIZE, FactorialFunc, &g_pData);
    NAPI_ASSERT(env, res != nullptr, "OH_PurgeAbleMemory_Create failed");
    bool ret = OH_PurgeableMemory_BeginWrite(res);
    napi_value result = nullptr;
    napi_create_int32(env, ret, &result);
    OH_PurgeableMemory_EndRead(res);
    OH_PurgeableMemory_Destroy(res);
    return result;
}

static napi_value BeginWriteTwo(napi_env env, napi_callback_info)
{
    OH_PurgeableMemory *res = OH_PurgeableMemory_Create(DATASIZE, FactorialFunc, &g_pData);
    NAPI_ASSERT(env, res != nullptr, "OH_PurgeAbleMemory_Create failed");
    OH_PurgeableMemory_Destroy(res);
    bool ret = OH_PurgeableMemory_BeginWrite(res);
    napi_value result = nullptr;
    napi_create_int32(env, ret, &result);
    return result;
}

static napi_value EndWrite(napi_env env, napi_callback_info)
{
    OH_PurgeableMemory *res = OH_PurgeableMemory_Create(DATASIZE, FactorialFunc, &g_pData);
    NAPI_ASSERT(env, res != nullptr, "OH_PurgeAbleMemory_Create failed");
    bool beginWriteValue = OH_PurgeableMemory_BeginWrite(res);
    NAPI_ASSERT(env, beginWriteValue == true, "OH_PurgeAbleMemory_Create failed");
    OH_PurgeableMemory_EndWrite(res);
    struct AppendParaData apData = {1};
    bool ret = OH_PurgeableMemory_AppendModify(res, AddFunc, &apData);
    OH_PurgeableMemory_Destroy(res);
    napi_value result = nullptr;
    napi_create_int32(env, ret, &result);
    return result;
}

static napi_value GetContentOne(napi_env env, napi_callback_info)
{
    OH_PurgeableMemory *res = OH_PurgeableMemory_Create(DATASIZE, FactorialFunc, &g_pData);
    NAPI_ASSERT(env, res != nullptr, "OH_PurgeAbleMemory_Create failed");
    bool beginReadValue = OH_PurgeableMemory_BeginRead(res);
    NAPI_ASSERT(env, beginReadValue == true, "OH_PurgeAbleMemory_Create failed");
    class ReqObj;
    ReqObj *pReqObj = (ReqObj *)OH_PurgeableMemory_GetContent(res);
    napi_value result = nullptr;
    napi_create_int32(env, pReqObj != nullptr, &result);
    OH_PurgeableMemory_EndRead(res);
    OH_PurgeableMemory_Destroy(res);
    return result;
}

static napi_value GetContentTwo(napi_env env, napi_callback_info)
{
    OH_PurgeableMemory *res = OH_PurgeableMemory_Create(DATASIZE, FactorialFunc, &g_pData);
    NAPI_ASSERT(env, res != nullptr, "OH_PurgeAbleMemory_Create failed");
    OH_PurgeableMemory_Destroy(res);
    class ReqObj;
    ReqObj *pReqObj = (ReqObj *)OH_PurgeableMemory_GetContent(res);
    napi_value result = nullptr;
    napi_create_int32(env, pReqObj == nullptr, &result);

    return result;
}

static napi_value ContentSizeOne(napi_env env, napi_callback_info)
{
    OH_PurgeableMemory *res = OH_PurgeableMemory_Create(DATASIZE, FactorialFunc, &g_pData);
    NAPI_ASSERT(env, res != nullptr, "OH_PurgeAbleMemory_Create failed");
    bool beginReadValue = OH_PurgeableMemory_BeginRead(res);
    NAPI_ASSERT(env, beginReadValue == true, "OH_PurgeAbleMemory_BeginRead failed");
    size_t size = OH_PurgeableMemory_ContentSize(res);
    napi_value result = nullptr;
    napi_create_int32(env, size != 0, &result);
    OH_PurgeableMemory_EndRead(res);
    OH_PurgeableMemory_Destroy(res);
    return result;
}

static napi_value ContentSizeTwo(napi_env env, napi_callback_info)
{
    OH_PurgeableMemory *res = OH_PurgeableMemory_Create(DATASIZE, FactorialFunc, &g_pData);
    NAPI_ASSERT(env, res != nullptr, "OH_PurgeAbleMemory_Create failed");
    size_t size = OH_PurgeableMemory_ContentSize(res);
    napi_value result = nullptr;
    napi_create_int32(env, size == 0, &result);
    OH_PurgeableMemory_Destroy(res);
    return result;
}

static napi_value AppendModifyOne(napi_env env, napi_callback_info)
{
    OH_PurgeableMemory *res = OH_PurgeableMemory_Create(DATASIZE, FactorialFunc, &g_pData);
    NAPI_ASSERT(env, res != nullptr, "OH_PurgeAbleMemory_Create failed");
    bool beginWriteValue = OH_PurgeableMemory_BeginWrite(res);
    NAPI_ASSERT(env, beginWriteValue == true, "OH_PurgeAbleMemory_Create failed");
    struct AppendParaData apData = {1};
    bool ret = OH_PurgeableMemory_AppendModify(res, AddFunc, &apData);
    OH_PurgeableMemory_EndWrite(res);
    OH_PurgeableMemory_Destroy(res);
    napi_value result = nullptr;
    napi_create_int32(env, ret, &result);
    return result;
}

static napi_value AppendModifyTwo(napi_env env, napi_callback_info)
{
    OH_PurgeableMemory *res = nullptr;
    struct AppendParaData apData = {1};
    bool ret = OH_PurgeableMemory_AppendModify(res, AddFunc, &apData);
    napi_value result = nullptr;
    napi_create_int32(env, ret, &result);
    return result;
}

EXTERN_C_START
static napi_value Init(napi_env env, napi_value exports)
{
    napi_property_descriptor desc[] = {
        {"createOne", nullptr, CreateOne, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"createTwo", nullptr, CreateTwo, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"destroyOne", nullptr, DestroyOne, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"destroyTwo", nullptr, DestroyTwo, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"destroyThree", nullptr, DestroyThree, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"beginReadOne", nullptr, BeginReadOne, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"beginReadTwo", nullptr, BeginReadTwo, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"endRead", nullptr, EndRead, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"beginWriteOne", nullptr, BeginWriteOne, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"beginWriteTwo", nullptr, BeginWriteTwo, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"endWrite", nullptr, EndWrite, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"getContentOne", nullptr, GetContentOne, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"getContentTwo", nullptr, GetContentTwo, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"contentSizeOne", nullptr, ContentSizeOne, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"contentSizeTwo", nullptr, ContentSizeTwo, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"appendModifyOne", nullptr, AppendModifyOne, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"appendModifyTwo", nullptr, AppendModifyTwo, nullptr, nullptr, nullptr, napi_default, nullptr},
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
    .nm_modname = "libmemory",
    .nm_priv = ((void *)0),
    .reserved = {0},
};

extern "C" __attribute__((constructor)) void RegisterEntryModule(void) { napi_module_register(&demoModule); }
