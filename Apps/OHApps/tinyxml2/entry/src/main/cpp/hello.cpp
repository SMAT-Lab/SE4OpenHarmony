/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
#include "tinyxml2.h"

static napi_value GetText(napi_env env, napi_callback_info info)
{
    size_t requireArgc = 2;
    size_t argc = 1;
    napi_value args[1] = {nullptr};
    
    static const char* xml ="<?xml version=\"1.0\"?>"
                            "<!DOCTYPE PLAY SYSTEM \"play.dtd\">"
                            "<PLAY>"
                            "<TITLE>A Midsummer Night's Dream</TITLE>"
                            "</PLAY>";
        
    tinyxml2::XMLDocument doc;
    doc.Parse(xml);
    tinyxml2::XMLElement* titleElement = doc.FirstChildElement("PLAY")->FirstChildElement("TITLE");
    const char* title = titleElement->GetText();
    
    tinyxml2::XMLText* textNode = titleElement->FirstChild()->ToText();
    title = textNode->Value();

    napi_value sum;
    napi_create_string_utf8(env, title, strlen(title), &sum);
    return sum;
}

EXTERN_C_START
static napi_value Init(napi_env env, napi_value exports)
{
    napi_property_descriptor desc[] = {
        { "GetText", nullptr, GetText, nullptr, nullptr, nullptr, napi_default, nullptr }
    };
    napi_define_properties(env, exports, sizeof(desc) / sizeof(desc[0]), desc);
    return exports;
}
EXTERN_C_END

static napi_module demoModule = {
    .nm_version =1,
    .nm_flags = 0,
    .nm_filename = nullptr,
    .nm_register_func = Init,
    .nm_modname = "entry",
    .nm_priv = ((void*)0),
    .reserved = { 0 },
};

extern "C" __attribute__((constructor)) void RegisterEntryModule(void)
{
    napi_module_register(&demoModule);
}
