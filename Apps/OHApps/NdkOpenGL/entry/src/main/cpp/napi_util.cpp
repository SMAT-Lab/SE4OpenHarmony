/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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

#include <cstdio>
#include <locale>
#include <string>
#include <cstring>
#include "log.h"
#include "napi_util.h"

const int32_t MAX_STR_LENGTH = 2048;

napi_value NapiUtil::SetNapiCallInt32(const napi_env &env, const int32_t intValue)
{
    napi_value result;
    napi_create_int32(env, intValue, &result);
    return result;
}

napi_value NapiUtil::SetNapiCallBool(napi_env env, bool value)
{
    napi_value temp;
    napi_value result;
    napi_create_int32(env, value == true ? 1 : 0, &temp);
    napi_coerce_to_bool(env, temp, &result);
    return result;
}

int NapiUtil::StringToInt(std::string value)
{
    return atoi(value.c_str());
}

int NapiUtil::StringToLong(std::string value)
{
    return atol(value.c_str());
}

float NapiUtil::StringToFloat(std::string value)
{
    return std::stof(value);
}

bool NapiUtil::StringToBool(const std::string value)
{
    return value == "true" ? true : false;
}

