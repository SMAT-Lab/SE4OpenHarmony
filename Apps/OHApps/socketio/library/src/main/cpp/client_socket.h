/**
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * This software is distributed under a license. The full license
 * agreement can be found in the file LICENSE in this distribution.
 * This software may not be copied, modified, sold or distributed
 * other than expressed in the named license agreement.
 *
 * This software is distributed without any warranty.
 */

#ifndef OHOSXMPPCLIENT_ROOM_H
#define OHOSXMPPCLIENT_ROOM_H

#include <node_api.h>
#include <string>
#include "hilog/log.h"

// 全局无参回调
napi_value napi_result_void;

napi_threadsafe_function g_tsfnOnOpenCall;
napi_threadsafe_function g_tsfnOnCloseCall;
napi_threadsafe_function g_tsfnOnSocketioOpenCall;
napi_threadsafe_function g_tsfnEmitCall;
napi_threadsafe_function g_tsfnOnLoginCall;
napi_threadsafe_function g_tsfnOnNewMessageCall;
napi_threadsafe_function g_tsfnOnUserLeftCall;
napi_threadsafe_function g_tsfnOnUserJoinedCall;
napi_threadsafe_function g_tsfnOnErrorCall;
napi_threadsafe_function g_tsfnFailCall;
napi_threadsafe_function g_tsfnReconnectingCall;
napi_threadsafe_function g_tsfnReconnectCall;
napi_threadsafe_function g_tsfnCloseCall;

napi_value workName = nullptr;

struct ThreadSafeInfo {
    std::string result;
};

void NapiCreateThreadsafe(napi_env env, napi_value js_func, napi_threadsafe_function_call_js call_js_cb,
                          napi_threadsafe_function* result)
{
    if (workName == nullptr) {
        napi_create_string_utf8(env, "main_thread", NAPI_AUTO_LENGTH, &workName);
    }
    napi_create_threadsafe_function(env, js_func, nullptr, workName, 0, 1, nullptr, nullptr, nullptr,
                                    call_js_cb, result);
}

void CallJsNoParames(napi_env env, napi_value jsCb, void *context, void *data)
{
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG, "SOCKETIO_TAG------> 0 CallJsOpen ");
    napi_value undefined;
    // 调用 js 回调函数
    napi_status status = napi_call_function(env, undefined, jsCb, 0, nullptr, &napi_result_void);
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG, "SOCKETIO_TAG------> 1 CallJsOpen %{public}d", status);
}

void CallJsEmit(napi_env env, napi_value jsCb, void *context, void *data)
{
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG, "SOCKETIO_TAG------> 0 CallJsEmit ");
    napi_value undefined;
    napi_value ret;
    napi_value argv;
    
    // 解析参数 data
    ThreadSafeInfo *arg = (ThreadSafeInfo *)data;
    if (arg == nullptr) {
        OH_LOG_Print(LOG_APP, LOG_ERROR, LOG_DOMAIN, LOG_TAG, "[CallJsEmit]g_threadSafeInfo is null");
        return;
    }

    napi_create_string_utf8(env, (arg->result).c_str(), NAPI_AUTO_LENGTH, &argv);
    
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG, "SOCKETIO_TAG------> result is ready CallJsEmit");
    
    // 调用 js 回调函数
    napi_status status = napi_call_function(env, undefined, jsCb, 1, &argv, &ret);
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG, "SOCKETIO_TAG------> 2 CallJsEmit %{public}d", status);
}

#endif // ohosXmppClient_room_H