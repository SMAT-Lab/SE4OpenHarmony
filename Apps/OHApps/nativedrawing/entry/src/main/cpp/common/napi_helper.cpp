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
#include "napi_helper.h"

static constexpr uint32_t MAX_CHAR_LENGTH = 1024;

char *NapiHelper::GetString(napi_env env, napi_value value)
{
    size_t bufferSize = 0;
    size_t strLength = 0;
    napi_get_value_string_utf8(env, value, nullptr, 0, &bufferSize);
    if (bufferSize > MAX_CHAR_LENGTH) {
        bufferSize = MAX_CHAR_LENGTH;
    }
    char *buffer = new char[bufferSize + 1]{0};
    napi_get_value_string_utf8(env, value, buffer, bufferSize + 1, &strLength);
    return buffer;
}

napi_value NapiHelper::CreateBooleanValue(napi_env env, bool value)
{
    napi_value result = nullptr;
    napi_get_boolean(env, value, &result);
    return result;
}

napi_value NapiHelper::GetGlobalObject(napi_env env)
{
    napi_value object = nullptr;
    napi_get_global(env, &object);
    return object;
}

napi_ref NapiHelper::CreateReference(napi_env env, napi_value value, uint32_t refcount)
{
    napi_ref callback = nullptr;
    napi_create_reference(env, value, refcount, &callback);
    return callback;
}

napi_value NapiHelper::CreateUint32(napi_env env, uint32_t value)
{
    napi_value result = nullptr;
    napi_create_uint32(env, value, &result);
    return result;
}

bool NapiHelper::GetBooleanValue(napi_env env, napi_value value)
{
    bool result = false;
    napi_get_value_bool(env, value, &result);
    return result;
}

bool NapiHelper::StrictEqual(napi_env env, napi_value value, napi_value cmpValue)
{
    bool isEqual = false;
    napi_strict_equals(env, value, cmpValue, &isEqual);
    return isEqual;
}

napi_value NapiHelper::CreateObject(napi_env env)
{
    napi_value obj = nullptr;
    napi_create_object(env, &obj);
    return obj;
}

napi_value NapiHelper::CreatePromise(napi_env env, napi_deferred *deferred)
{
    napi_value promise = nullptr;
    napi_create_promise(env, deferred, &promise);
    return promise;
}

uint32_t NapiHelper::GetArrayLength(napi_env env, napi_value array)
{
    uint32_t arrayLength = 0;
    return arrayLength;
}

uint32_t NapiHelper::GetUint32Value(napi_env env, napi_value value)
{
    uint32_t result = 0;
    napi_get_value_uint32(env, value, &result);
    return result;
}

bool NapiHelper::IsExceptionPending(napi_env env)
{
    bool isExceptionPending = false;
    napi_is_exception_pending(env, &isExceptionPending);
    return isExceptionPending;
}