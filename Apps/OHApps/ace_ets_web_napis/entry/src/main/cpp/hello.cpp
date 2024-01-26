/**
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
#include <chrono>
#include <string>
#include "common/native_common.h"
#include "web/native_interface_arkweb.h"

constexpr unsigned int LOG_PRINT_DOMAIN = 0xFF00;

std::chrono::time_point<std::chrono::high_resolution_clock> start;

// 发送JS脚本到H5侧执行，执行结果的回调
static void RunJavaScriptCallback(const char *result)
{
    std::chrono::duration<double, std::milli> elapsed_ms = std::chrono::high_resolution_clock::now() - start;
}

// 示例代码 ，注册了1个对象，2个方法
static char *ProxyMethod1(const char **argv, int argc)
{
    return nullptr;
}

static char *ProxyMethod2(const char **argv, int argc)
{
    char *ret = "ygz hello from native ProxyMethod2";
    return ret;
}

static char *ProxyMethod3(const char **argv, int argc)
{
    char *ret = "ygz hello from native ProxyMethod3";
    return ret;
}

void ValidCallback(const char *webName)
{
    const char *methodName[2] = {"method1", "method2"};
    NativeArkWeb_OnJavaScriptProxyCallback callback[2] = {ProxyMethod1, ProxyMethod2};
    // 如此注册的情况下，在H5页面就可以使用proxy.method1、proxy.method1调用此文件下的ProxyMethod1和ProxyMethod2方法了
    int32_t size = 2;
    OH_NativeArkWeb_RegisterJavaScriptProxy(webName, "ndkProxy", methodName, callback, size, false);
}

void DestroyCallback(const char *webName)
{
}

static napi_value NativeWebInit(napi_env env, napi_callback_info info)
{
    size_t argc = 1;
    napi_value args[1] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    // 获取第一个参数 webName
    size_t webNameSize = 0;
    napi_get_value_string_utf8(env, args[0], nullptr, 0, &webNameSize);
    char *webNameValue = new (std::nothrow) char[webNameSize + 1];
    size_t webNameLength = 0;
    napi_get_value_string_utf8(env, args[0], webNameValue, webNameSize + 1, &webNameLength);

    // 注js proxy册回调函数
    NativeArkWeb_OnValidCallback ptr = ValidCallback;
    OH_NativeArkWeb_SetJavaScriptProxyValidCallback(webNameValue, ptr);
    OH_NativeArkWeb_GetJavaScriptProxyValidCallback(webNameValue);
    // 注册destroy回调函数
    OH_NativeArkWeb_SetDestroyCallback(webNameValue, DestroyCallback);
    OH_NativeArkWeb_GetDestroyCallback(webNameValue);
    return nullptr;
}

// 发送JS脚本到H5侧执行
static napi_value RunJavaScript(napi_env env, napi_callback_info info)
{
    size_t argc = 2;
    napi_value args[2] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    // 获取第一个参数 webName
    size_t webNameSize = 0;
    napi_get_value_string_utf8(env, args[0], nullptr, 0, &webNameSize);
    char *webNameValue = new (std::nothrow) char[webNameSize + 1];
    size_t webNameLength = 0;
    napi_get_value_string_utf8(env, args[0], webNameValue, webNameSize + 1, &webNameLength);

    // 获取第二个参数 jsCode
    size_t bufferSize = 0;
    napi_get_value_string_utf8(env, args[1], nullptr, 0, &bufferSize);
    char *jsCode = new (std::nothrow) char[bufferSize + 1];
    size_t byteLength = 0;
    napi_get_value_string_utf8(env, args[1], jsCode, bufferSize + 1, &byteLength);
    start = std::chrono::high_resolution_clock::now();

    // 调用ndk接口
    OH_NativeArkWeb_RunJavaScript(webNameValue, jsCode, RunJavaScriptCallback);
    napi_value output;
    NAPI_CALL(env, napi_create_string_utf8(env, "RegisterSuccess", NAPI_AUTO_LENGTH, &output));
    return output;
}

static napi_value RegisterJavaScriptProxy(napi_env env, napi_callback_info info)
{
    size_t argc = 1;
    napi_value args[1] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    // 获取第一个参数 webName
    size_t webNameSize = 0;
    napi_get_value_string_utf8(env, args[0], nullptr, 0, &webNameSize);
    char *webNameValue = new (std::nothrow) char[webNameSize + 1];
    size_t webNameLength = 0;
    napi_get_value_string_utf8(env, args[0], webNameValue, webNameSize + 1, &webNameLength);
    const char *methodName[3] = {"method1", "method2", "method3"};
    NativeArkWeb_OnJavaScriptProxyCallback callback[3] = {ProxyMethod1, ProxyMethod2, ProxyMethod3};
    // 如此注册的情况下，在H5页面就可以使用proxy.method1、proxy.method1调用此文件下的ProxyMethod1和ProxyMethod2方法了
    int32_t size = 3;
    OH_NativeArkWeb_RegisterJavaScriptProxy(webNameValue, "ndkProxy", methodName, callback, size, false);
    return nullptr;
}

static napi_value UnregisterJavaScriptProxy(napi_env env, napi_callback_info info)
{
    size_t argc = 1;
    napi_value args[1] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    // 获取第一个参数 webName
    size_t webNameSize = 0;
    napi_get_value_string_utf8(env, args[0], nullptr, 0, &webNameSize);
    char *webNameValue = new (std::nothrow) char[webNameSize + 1];
    size_t webNameLength = 0;
    napi_get_value_string_utf8(env, args[0], webNameValue, webNameSize + 1, &webNameLength);
    NativeArkWeb_OnJavaScriptProxyCallback callback[3] = {ProxyMethod1, ProxyMethod2, ProxyMethod3};
    // 如此注册的情况下，在H5页面就可以使用proxy.method1、proxy.method1调用此文件下的ProxyMethod1和ProxyMethod2方法了
    OH_NativeArkWeb_UnregisterJavaScriptProxy(webNameValue, "ndkProxy");
    return nullptr;
}

EXTERN_C_START
static napi_value Init(napi_env env, napi_value exports)
{
    napi_property_descriptor desc[] = {
        {"nativeWebInit", nullptr, NativeWebInit, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"runJavaScript", nullptr, RunJavaScript, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"registerJavaScriptProxy", nullptr, RegisterJavaScriptProxy, nullptr, nullptr, nullptr, napi_default, nullptr},
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
    .nm_modname = "entry",
    .nm_priv = ((void *)0),
    .reserved = {0},
};

extern "C" __attribute__((constructor)) void RegisterEntryModule(void)
{
    napi_module_register(&demoModule);
}