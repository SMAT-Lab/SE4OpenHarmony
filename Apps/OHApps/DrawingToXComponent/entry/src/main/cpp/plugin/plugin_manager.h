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
#ifndef PLUGIN_MANAGER_H
#define PLUGIN_MANAGER_H

#include <ace/xcomponent/native_interface_xcomponent.h>
#include <js_native_api.h>
#include <js_native_api_types.h>
#include <string>
#include <unordered_map>
#include "samples/sample_bitmap.h"

class PluginManager {
public:
    ~PluginManager();

    static PluginManager *GetInstance();

    void SetNativeXComponent(std::string &id, OH_NativeXComponent *nativeXComponent);
    SampleBitMap *GetRender(std::string &id);
    void Export(napi_env env, napi_value exports);

private:
    std::unordered_map<std::string, OH_NativeXComponent *> nativeXComponentMap_;
    std::unordered_map<std::string, SampleBitMap *> pluginRenderMap_;

    SampleBitMap *pluginRender;
};
#endif // PLUGIN_MANAGER_H
