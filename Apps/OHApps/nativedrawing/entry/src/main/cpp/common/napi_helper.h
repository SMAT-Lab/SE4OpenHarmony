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

#ifndef NAPI_HELPER_H
#define NAPI_HELPER_H
#include "napi/native_api.h"

class NapiHelper {
public:
    static bool IsString(napi_value value);
    static bool IsNotUndefined(napi_value value);
    static bool IsArray(napi_value value);
    static bool IsFunction(napi_value object);
    static bool IsArrayBuffer(napi_value value);
    static bool IsNumber(napi_value value);
    static bool IsCallable(napi_env env, napi_value value);
    static bool IsCallable(napi_env env, napi_ref value);
    static size_t GetCallbackInfoArgc(napi_env env, napi_callback_info cbInfo);
    static napi_value GetNamePropertyInParentPort(napi_env env, napi_ref parentPort, const char *name);
    static void SetNamePropertyInGlobal(napi_env env, const char *name, napi_value value);
    static napi_value GetUndefinedValue(napi_env env);
    static bool IsObject(napi_value value);
    static char *GetString(napi_env env, napi_value value);
    static napi_value CreateBooleanValue(napi_env env, bool value);
    static napi_value GetGlobalObject(napi_env env);
    static napi_ref CreateReference(napi_env env, napi_value value, uint32_t refcount);
    static napi_value CreateUint32(napi_env env, uint32_t value);
    static napi_value GetReferenceValue(napi_env env, napi_ref ref);
    static void DeleteReference(napi_env env, napi_ref ref);
    static napi_value GetNameProperty(napi_env env, napi_value obj, const char *name);
    static bool GetBooleanValue(napi_env env, napi_value value);
    static bool StrictEqual(napi_env env, napi_value value, napi_value cmpValue);
    static napi_value GetConstructorName(napi_env env, napi_value object);
    static napi_value CreateObject(napi_env env);
    static napi_value CreatePromise(napi_env env, napi_deferred *deferred);
    static uint32_t GetArrayLength(napi_env env, napi_value array);
    static uint32_t GetUint32Value(napi_env env, napi_value value);
    static bool IsExceptionPending(napi_env env);
};
#endif  //NAPI_HELPER_H