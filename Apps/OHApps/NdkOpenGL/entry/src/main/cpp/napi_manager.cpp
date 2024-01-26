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

#include <cstdint>
#include <string>
#include <cstdio>

#include "log.h"
#include "napi_manager.h"

enum class ContextType {
    APP_LIFECYCLE = 0,
    JS_PAGE_LIFECYCLE,
};

NapiManager NapiManager::manager_;

napi_value NapiManager::GetContext(napi_env env, napi_callback_info info)
{
    napi_status status;
    napi_value exports;
    size_t argc = 1;
    napi_value args[1];
    NAPI_CALL(env, napi_get_cb_info(env, info, &argc, args, nullptr, nullptr));

    if (argc != 1) {
        napi_throw_type_error(env, NULL, "Wrong number of arguments");
        return nullptr;
    }

    napi_valuetype valuetype;
    status = napi_typeof(env, args[0], &valuetype);
    if (status != napi_ok) {
        return nullptr;
    }
    if (valuetype != napi_number) {
        napi_throw_type_error(env, NULL, "Wrong arguments");
        return nullptr;
    }

    int64_t value;
    NAPI_CALL(env, napi_get_value_int64(env, args[0], &value));
    NAPI_CALL(env, napi_create_object(env, &exports));

    switch (value) {
        case int64_t(ContextType::APP_LIFECYCLE):
            {
                /* AppInit对应EntryAbility.ts中的应用生命周期: onCreate, onShow, onHide, onDestroy */
                LOGD("GetContext APP_LIFECYCLE");

                /* Register App Lifecycle */
                napi_property_descriptor desc[] = {
                    DECLARE_NAPI_FUNCTION("onCreate", NapiManager::NapiOnCreate),
                    DECLARE_NAPI_FUNCTION("onShow", NapiManager::NapiOnShow),
                    DECLARE_NAPI_FUNCTION("onHide", NapiManager::NapiOnHide),
                    DECLARE_NAPI_FUNCTION("onDestroy", NapiManager::NapiOnDestroy),
                };
                NAPI_CALL(env, napi_define_properties(env, exports, sizeof(desc) / sizeof(desc[0]), desc));
            }

            break;
        case int64_t(ContextType::JS_PAGE_LIFECYCLE):
            {
                /* JS Page */
                LOGD("GetContext JS_PAGE_LIFECYCLE");
                napi_property_descriptor desc[] = {
                    DECLARE_NAPI_FUNCTION("onPageShow", NapiManager::NapiOnPageShow),
                    DECLARE_NAPI_FUNCTION("onPageHide", NapiManager::NapiOnPageHide),
                };
                NAPI_CALL(env, napi_define_properties(env, exports, sizeof(desc) / sizeof(desc[0]), desc));
            }
            break;
        default:
            LOGE("unknown type");
    }
    return exports;
}

bool NapiManager::Export(napi_env env, napi_value exports)
{
    napi_status status;
    napi_value exportInstance = nullptr;
    OH_NativeXComponent *nativeXComponent = nullptr;
    int32_t ret;
    char idStr[OH_XCOMPONENT_ID_LEN_MAX + 1] = { };
    uint64_t idSize = OH_XCOMPONENT_ID_LEN_MAX + 1;

    status = napi_get_named_property(env, exports, OH_NATIVE_XCOMPONENT_OBJ, &exportInstance);
    if (status != napi_ok) {
        return false;
    }

    status = napi_unwrap(env, exportInstance, reinterpret_cast<void**>(&nativeXComponent));
    if (status != napi_ok) {
        return false;
    }

    ret = OH_NativeXComponent_GetXComponentId(nativeXComponent, idStr, &idSize);
    if (ret != OH_NATIVEXCOMPONENT_RESULT_SUCCESS) {
        return false;
    }

    std::string id(idStr);
    auto context = NapiManager::GetInstance();
    if (context) {
        context->SetNativeXComponent(id, nativeXComponent);
        auto app = context->GetApp(id);
        app->SetNativeXComponent(nativeXComponent);
        app->Export(env, exports);
        return true;
    }

    return false;
}

void NapiManager::SetNativeXComponent(std::string& id, OH_NativeXComponent* nativeXComponent)
{
    if (nativeXComponentMap_.find(id) == nativeXComponentMap_.end()) {
        nativeXComponentMap_[id] = nativeXComponent;
    } else {
        if (nativeXComponentMap_[id] != nativeXComponent) {
            nativeXComponentMap_[id] = nativeXComponent;
        }
    }
}

OH_NativeXComponent* NapiManager::GetNativeXComponent(std::string& id)
{
    if (nativeXComponentMap_.find(id) == nativeXComponentMap_.end()) {
        return nullptr;
    } else {
        return nativeXComponentMap_[id];
    }
}

AppNapi* NapiManager::GetApp(std::string& id)
{
    if (appNapiMap_.find(id) == appNapiMap_.end()) {
        AppNapi* instance = AppNapi::GetInstance(id);
        appNapiMap_[id] = instance;
        return instance;
    } else {
        return appNapiMap_[id];
    }
}

void NapiManager::MainOnMessage(const uv_async_t* req)
{
    LOGD("MainOnMessage Triggered");
}

napi_value NapiManager::NapiOnCreate(napi_env env, napi_callback_info info)
{
    LOGD("NapiManager::NapiOnCreate");
    uv_loop_t* loop = nullptr;
    NAPI_CALL(env, napi_get_uv_event_loop(env, &loop));
    NapiManager::GetInstance()->OnCreateNative(env, loop);
    return nullptr;
}

napi_value NapiManager::NapiOnShow(napi_env env, napi_callback_info info)
{
    NapiManager::GetInstance()->OnShowNative();
    return nullptr;
}

napi_value NapiManager::NapiOnHide(napi_env env, napi_callback_info info)
{
    NapiManager::GetInstance()->OnHideNative();
    return nullptr;
}

napi_value NapiManager::NapiOnDestroy(napi_env env, napi_callback_info info)
{
    NapiManager::GetInstance()->OnDestroyNative();
    return nullptr;
}

void NapiManager::OnCreateNative(napi_env env, uv_loop_t* loop)
{
    mainEnv_ = env;
    mainLoop_ = loop;
    if (mainLoop_) {
        uv_async_init(mainLoop_, &mainOnMessageSignal_, reinterpret_cast<uv_async_cb>(NapiManager::MainOnMessage));
    }
}

void NapiManager::OnShowNative()
{
    LOGD("NapiManager::OnShowNative");
}

void NapiManager::OnHideNative()
{
    LOGD("NapiManager::OnHideNative");
}

void NapiManager::OnDestroyNative()
{
    LOGD("NapiManager::OnDestroyNative");
}

napi_value NapiManager::NapiOnPageShow(napi_env env, napi_callback_info info)
{
    LOGD("NapiManager::NapiOnPageShow");
    return nullptr;
}

napi_value NapiManager::NapiOnPageHide(napi_env env, napi_callback_info info)
{
    LOGD("NapiManager::NapiOnPageHide");
    return nullptr;
}

void NapiManager::OnPageShowNative()
{
    LOGD("NapiManager::OnPageShowNative");
}

void NapiManager::OnPageHideNative()
{
    LOGD("NapiManager::OnPageHideNative");
}