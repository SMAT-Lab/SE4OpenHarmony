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

#include <cstring>
#include <js_native_api.h>
#include <js_native_api_types.h>
#include <node_api.h>
#include "napi/native_api.h"
#include "hilog/log.h"

#include "sio_client.h"
#include "sio_message.h"
#include "client_socket.h"

static constexpr const int MAX_BUF_SIZE = 128;

// 全局env
static napi_env env_global = nullptr;
// client相关回调
static napi_ref on_open_call_ref, on_fail_call_ref, on_reconnecting_call_ref, on_reconnect_call_ref;
static napi_ref on_socket_open_call_ref, on_socket_close_call_ref, on_close_call_ref;
// 根据eventname筛选event回调方法
static std::map<std::string, napi_ref> on_event_listener_call_aux_ref_map;
// socket相关回调
static napi_ref on_error_listener_call_ref;
// 根据eventname筛选ack回调方法
static std::map<std::string, napi_ref> on_emit_listener_call_ref_map;
// 全局result
static size_t result = 0;

static constexpr const int ARG_INDEX_0 = 0;
static constexpr const int ARG_INDEX_1 = 1;
static constexpr const int ARG_INDEX_2 = 2;

static const char* g_newMessage = "new message";
static const char* g_userJoined = "user joined";
static const char* g_userLeft = "user left";
static const char* g_login = "login";

static struct ThreadSafeInfo g_threadSafeInfo = {};

static std::string get_message_value(sio::message::ptr const &message)
{
    std::string message_json;
    std::map<std::string, sio::message::ptr> messageMap;
    switch (message->get_flag()) {
        case sio::message::flag_integer:
            return std::to_string(message->get_int());
        case sio::message::flag_double:
            return std::to_string(message->get_double());
        case sio::message::flag_string:
            return std::string("\"") + message->get_string() + "\"";
        case sio::message::flag_binary:
            return std::string("\"") + *message->get_binary() + "\"" + ",\"binary\":true";
        case sio::message::flag_object:
            message_json = "{";
            messageMap = message->get_map();
            for (auto it : messageMap) {
                if (messageMap.begin()->first != it.first) {
                    message_json += std::string(",");
                }
                message_json += std::string("\"") + it.first.c_str() + "\":" + get_message_value(it.second);
            }
            message_json += "}";
            return message_json;
        case sio::message::flag_boolean:
            return std::to_string(message->get_bool());
        case sio::message::flag_null:
            return std::string("\"\"");
        default:
            return std::string("\"\"");
    }
}

static void handler_event_listener_aux(bool isOnce, const std::string &name, sio::message::ptr const &message,
    bool needAck, sio::message::list &ack_message)
{
    napi_ref on_event_listener_call_aux_ref = on_event_listener_call_aux_ref_map[name.c_str()];
    if (on_event_listener_call_aux_ref != nullptr) {
        std::string message_json = std::string("{") + "\"eventName\":\"" + name + "\"";
        if (message->get_flag() == sio::message::flag_object) {
            std::map<std::string, sio::message::ptr> messageMap = message->get_map();
            for (auto it : messageMap) {
                message_json += std::string(",\"") + it.first.c_str() + "\":" + get_message_value(it.second);
            }
        } else {
            message_json += std::string(",\"") + "message" + "\":" + get_message_value(message);
        }
        message_json += "}";
        
        OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG,
                     "SOCKETIO_TAG------> handler_event_listener_aux ,当前是子线程 event_name: %{public}s", name.c_str());
        
        ThreadSafeInfo* data = &g_threadSafeInfo;
        if (data == nullptr) {
            OH_LOG_Print(LOG_APP, LOG_ERROR, LOG_DOMAIN, LOG_TAG, "[event_listener]g_threadSafeInfo is null");
            return;
        }
        data->result = message_json;
        if (name == "new message") {
            napi_acquire_threadsafe_function(g_tsfnOnNewMessageCall);
            // 调用主线程函数，传入 Data
            napi_call_threadsafe_function(g_tsfnOnNewMessageCall, data, napi_tsfn_blocking);
        } else if (name == "login") {
            napi_acquire_threadsafe_function(g_tsfnOnLoginCall);
            // 调用主线程函数，传入 Data
            napi_call_threadsafe_function(g_tsfnOnLoginCall, data, napi_tsfn_blocking);
        } else if (name == "user joined") {
            napi_acquire_threadsafe_function(g_tsfnOnUserJoinedCall);
            // 调用主线程函数，传入 Data
            napi_call_threadsafe_function(g_tsfnOnUserJoinedCall, data, napi_tsfn_blocking);
        } else if (name == "user left") {
            napi_acquire_threadsafe_function(g_tsfnOnUserLeftCall);
            // 调用主线程函数，传入 Data
            napi_call_threadsafe_function(g_tsfnOnUserLeftCall, data, napi_tsfn_blocking);
        }
        
        if (isOnce) {
            on_event_listener_call_aux_ref_map[name.c_str()] = nullptr;
        }
    }
}

class ClientSocket {
public:
    ClientSocket() noexcept {}

    void OnOpen()
    {
        OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG, "SOCKETIO_TAG------> OnOpen ");
            
        napi_acquire_threadsafe_function(g_tsfnOnOpenCall);
        // 调用主线程函数，传入 Data
        napi_call_threadsafe_function(g_tsfnOnOpenCall, nullptr, napi_tsfn_blocking);
    }

    void OnFail()
    {
        OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG, "SOCKETIO_TAG------> OnFail ");
            
        napi_acquire_threadsafe_function(g_tsfnFailCall);
        // 调用主线程函数，传入 Data
        napi_call_threadsafe_function(g_tsfnFailCall, nullptr, napi_tsfn_blocking);
    }

    void OnReconnecting()
    {
        OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG, "SOCKETIO_TAG------> OnReconnecting ");
            
        napi_acquire_threadsafe_function(g_tsfnReconnectingCall);
        // 调用主线程函数，传入 Data
        napi_call_threadsafe_function(g_tsfnReconnectingCall, nullptr, napi_tsfn_blocking);
    }

    // 待回传unsigned两个参数
    void OnReconnect(unsigned, unsigned)
    {
        OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG, "SOCKETIO_TAG------> OnReconnect ");
            
        napi_acquire_threadsafe_function(g_tsfnReconnectCall);
        // 调用主线程函数，传入 Data
        napi_call_threadsafe_function(g_tsfnReconnectCall, nullptr, napi_tsfn_blocking);
    }

    void on_close(sio::client::close_reason const &reason)
    {
        std::string reasonString = "";
        if (reason == sio::client::close_reason_normal) {
            reasonString = "close_reason_normal";
        } else if (reason == sio::client::close_reason_drop) {
            reasonString = "close_reason_drop";
        }
        OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG, "SOCKETIO_TAG------> on_close ");
        
        ThreadSafeInfo* data = &g_threadSafeInfo;
        if (data == nullptr) {
            OH_LOG_Print(LOG_APP, LOG_ERROR, LOG_DOMAIN, LOG_TAG, "[on_close]g_threadSafeInfo is null");
            return;
        }
        data->result = reasonString;
        
        napi_acquire_threadsafe_function(g_tsfnCloseCall);
        // 调用主线程函数，传入 Data
        napi_call_threadsafe_function(g_tsfnCloseCall, data, napi_tsfn_blocking);
    }

    void on_socket_open(std::string const &nsp)
    {
        OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG, "SOCKETIO_TAG------>0 on_socket_open %{public}s",
                     nsp.c_str());
        
        ThreadSafeInfo* data = &g_threadSafeInfo;
        if (data == nullptr) {
            OH_LOG_Print(LOG_APP, LOG_ERROR, LOG_DOMAIN, LOG_TAG, "[on_socket_open]g_threadSafeInfo is null");
            return;
        }
        data->result = nsp;
        
        OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG,
                     "SOCKETIO_TAG------>2 on_socket_open %{public}s", (data->result).c_str());
        
        napi_acquire_threadsafe_function(g_tsfnOnSocketioOpenCall);
        // 调用主线程函数，传入 Data
        napi_call_threadsafe_function(g_tsfnOnSocketioOpenCall, data, napi_tsfn_blocking);
    }

    void on_socket_close(std::string const &nsp)
    {
        OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG, "SOCKETIO_TAG------> on_socket_close ");
        ThreadSafeInfo* data = &g_threadSafeInfo;
        if (data == nullptr) {
            OH_LOG_Print(LOG_APP, LOG_ERROR, LOG_DOMAIN, LOG_TAG, "[on_socket_close]g_threadSafeInfo is null");
            return;
        }
        data->result = nsp;
        
        napi_acquire_threadsafe_function(g_tsfnOnCloseCall);
        // 调用主线程函数，传入 Data
        napi_call_threadsafe_function(g_tsfnOnCloseCall, data, napi_tsfn_blocking);
    }

    void on_event_listener_aux(const std::string &name, sio::message::ptr const &message, bool needAck,
        sio::message::list &ack_message)
    {
        handler_event_listener_aux(false, name, message, needAck, ack_message);
    }

    void once_event_listener_aux(const std::string &name, sio::message::ptr const &message, bool needAck,
        sio::message::list &ack_message)
    {
        handler_event_listener_aux(true, name, message, needAck,
            ack_message);
    }

    void on_error_listener(sio::message::ptr const &message)
    {
        std::string error_string = "on error";
        
        ThreadSafeInfo* data = &g_threadSafeInfo;
        if (data == nullptr) {
            OH_LOG_Print(LOG_APP, LOG_ERROR, LOG_DOMAIN, LOG_TAG, "[on_error_listener]g_threadSafeInfo is null");
            return;
        }
        data->result = error_string;
        
        OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG,
                     "SOCKETIO_TAG------> on_error_listener %{public}s", (data->result).c_str());
        
        napi_acquire_threadsafe_function(g_tsfnOnErrorCall);
        // 调用主线程函数，传入 Data
        napi_call_threadsafe_function(g_tsfnOnErrorCall, data, napi_tsfn_blocking);
    }

    void on_emit_callback(std::string const &ack_name, sio::message::list const &list)
    {
        OH_LOG_Print(LOG_APP,   LOG_INFO,   LOG_DOMAIN,   LOG_TAG, "SOCKETIO_TAG------> 0 on_emit_callback -------");
        napi_ref on_emit_listener_call_ref = on_emit_listener_call_ref_map[ack_name.c_str()];
        if (on_emit_listener_call_ref != nullptr) {
            std::string message_json = std::string("{");
            if (list.at(0)->get_flag() == sio::message::flag_object) {
                std::map<std::string, sio::message::ptr> messageMap = list.at(0)->get_map();
                for (auto it : messageMap) {
                    if (messageMap.begin()->first != it.first) {
                        message_json += std::string(",");
                    }
                    message_json += std::string("\"") + it.first.c_str() + "\":" +
                        get_message_value(it.second);
                }
            } else {
                message_json += std::string("\"") + "message" + "\":" + get_message_value(list.at(0));
            }
            message_json += "}";
            OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG,
                         "SOCKETIO_TAG------> 1 on_emit_callback %{public}s", message_json.c_str());

            ThreadSafeInfo* data = &g_threadSafeInfo;
            if (data == nullptr) {
                OH_LOG_Print(LOG_APP, LOG_ERROR, LOG_DOMAIN, LOG_TAG, "[on_emit_callback]g_threadSafeInfo is null");
                return;
            }
            data->result = message_json;
            
            napi_acquire_threadsafe_function(g_tsfnEmitCall);
            // 调用主线程函数，传入 Data
            napi_call_threadsafe_function(g_tsfnEmitCall, data, napi_tsfn_blocking);
        }
    }
};

static ClientSocket g_clientSocket;

static sio::client clientInstance;

static void initEnv(napi_env env)
{
    if (env_global == nullptr) {
        env_global = env;
    }
}

// client相关napi接口
static napi_value connect(napi_env env, napi_callback_info info)
{
    size_t argc = 1;
    napi_value args[1] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    char uri[MAX_BUF_SIZE];
    napi_get_value_string_utf8(env, args[0], uri, MAX_BUF_SIZE, &result);
    clientInstance.connect(uri);
    return 0;
}

static napi_value set_open_listener(napi_env env, napi_callback_info info)
{
    initEnv(env);
    size_t argc = 1;
    napi_value args[1] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    napi_value on_open_call = args[0];
    napi_create_reference(env_global, on_open_call, 1, &on_open_call_ref);
    
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG, "SOCKETIO_TAG------> 1 set_open_listener ");
    
    NapiCreateThreadsafe(env, on_open_call, CallJsNoParames, &g_tsfnOnOpenCall);

    clientInstance.set_open_listener(std::bind(&ClientSocket::OnOpen, &g_clientSocket));
    
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG, "SOCKETIO_TAG------> 2 set_open_listener ");
    return 0;
}

static napi_value set_fail_listener(napi_env env, napi_callback_info info)
{
    initEnv(env);
    size_t argc = 1;
    napi_value args[1] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    napi_value on_fail_call = args[0];
    napi_create_reference(env_global, on_fail_call, 1, &on_fail_call_ref);
    
    NapiCreateThreadsafe(env, on_fail_call, CallJsNoParames, &g_tsfnFailCall);
    
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG, "SOCKETIO_TAG------> set_fail_listener ");
    
    clientInstance.set_fail_listener(std::bind(&ClientSocket::OnFail, &g_clientSocket));
    return 0;
}

static napi_value set_reconnecting_listener(napi_env env, napi_callback_info info)
{
    initEnv(env);
    size_t argc = 1;
    napi_value args[1] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    napi_value on_reconnecting_call = args[0];
    napi_create_reference(env_global, on_reconnecting_call, 1, &on_reconnecting_call_ref);
    
    NapiCreateThreadsafe(env, on_reconnecting_call, CallJsNoParames, &g_tsfnReconnectingCall);
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG, "SOCKETIO_TAG------> set_reconnecting_listener ");
    
    clientInstance.set_reconnecting_listener(std::bind(&ClientSocket::OnReconnecting, &g_clientSocket));
    return 0;
}

static napi_value set_reconnect_listener(napi_env env, napi_callback_info info)
{
    initEnv(env);
    size_t argc = 1;
    napi_value args[1] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    napi_value on_reconnect_call = args[0];
    napi_create_reference(env_global, on_reconnect_call, 1, &on_reconnect_call_ref);
    
    NapiCreateThreadsafe(env, on_reconnect_call, CallJsNoParames, &g_tsfnReconnectCall);
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG, "SOCKETIO_TAG------> set_reconnect_listener ");
    
    clientInstance.set_reconnect_listener(std::bind(&ClientSocket::OnReconnect, &g_clientSocket,
        std::placeholders::_1, std::placeholders::_2));
    return 0;
}

static napi_value set_close_listener(napi_env env, napi_callback_info info)
{
    initEnv(env);
    size_t argc = 1;
    napi_value args[1] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    napi_value on_close_call = args[0];
    napi_create_reference(env_global, on_close_call, 1, &on_close_call_ref);
    
    NapiCreateThreadsafe(env, on_close_call, CallJsEmit, &g_tsfnCloseCall);
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG, "SOCKETIO_TAG------> set_close_listener ");
    
    clientInstance.set_close_listener(std::bind(&ClientSocket::on_close, &g_clientSocket, std::placeholders::_1));
    return 0;
}

static napi_value set_socket_open_listener(napi_env env, napi_callback_info info)
{
    initEnv(env);
    size_t argc = 1;
    napi_value args[1] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    napi_value on_socket_open_call = args[0];
    
    NapiCreateThreadsafe(env, on_socket_open_call, CallJsEmit, &g_tsfnOnSocketioOpenCall);
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG, "SOCKETIO_TAG------> set_socket_open_listener ");
        
    clientInstance.set_socket_open_listener(std::bind(&ClientSocket::on_socket_open, &g_clientSocket,
        std::placeholders::_1));
    return 0;
}

static napi_value set_socket_close_listener(napi_env env, napi_callback_info info)
{
    initEnv(env);
    size_t argc = 1;
    napi_value args[1] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    napi_value on_socket_close_call = args[0];
    napi_create_reference(env_global, on_socket_close_call, 1, &on_socket_close_call_ref);
    
    NapiCreateThreadsafe(env, on_socket_close_call, CallJsEmit, &g_tsfnOnCloseCall);
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG, "SOCKETIO_TAG------> set_socket_close_listener ");
      
    clientInstance.set_socket_close_listener(std::bind(&ClientSocket::on_socket_close, &g_clientSocket,
        std::placeholders::_1));
    return 0;
}

static napi_value clear_con_listeners(napi_env env, napi_callback_info info)
{
    clientInstance.clear_con_listeners();
    return 0;
}

static napi_value clear_socket_listeners(napi_env env, napi_callback_info info)
{
    clientInstance.clear_socket_listeners();
    return 0;
}

static napi_value set_reconnect_attempts(napi_env env, napi_callback_info info)
{
    size_t argc = 1;
    napi_value args[1] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    double attempts;
    napi_get_value_double(env, args[0], &attempts);
    clientInstance.set_reconnect_attempts((int)attempts);
    return 0;
}

static napi_value set_reconnect_delay(napi_env env, napi_callback_info info)
{
    size_t argc = 1;
    napi_value args[1] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    double millis;
    napi_get_value_double(env, args[0], &millis);
    clientInstance.set_reconnect_delay((unsigned)millis);
    return 0;
}

static napi_value set_reconnect_delay_max(napi_env env, napi_callback_info info)
{
    size_t argc = 1;
    napi_value args[1] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    double millis;
    napi_get_value_double(env, args[0], &millis);
    clientInstance.set_reconnect_delay_max((unsigned)millis);
    return 0;
}

static napi_value set_logs_default(napi_env env, napi_callback_info info)
{
    clientInstance.set_logs_default();
    return 0;
}

static napi_value set_logs_quiet(napi_env env, napi_callback_info info)
{
    clientInstance.set_logs_quiet();
    return 0;
}

static napi_value set_logs_verbose(napi_env env, napi_callback_info info)
{
    clientInstance.set_logs_verbose();
    return 0;
}

static napi_value close(napi_env env, napi_callback_info info)
{
    clientInstance.close();
    return 0;
}

static napi_value sync_close(napi_env env, napi_callback_info info)
{
    clientInstance.sync_close();
    return 0;
}

static napi_value set_proxy_basic_auth(napi_env env, napi_callback_info info)
{
    size_t argc = 3;
    napi_value args[3] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    char uri[MAX_BUF_SIZE];
    char username[MAX_BUF_SIZE];
    char keywords[MAX_BUF_SIZE];
    napi_get_value_string_utf8(env, args[ARG_INDEX_0], uri, MAX_BUF_SIZE, &result);
    napi_get_value_string_utf8(env, args[ARG_INDEX_1], username, MAX_BUF_SIZE, &result);
    napi_get_value_string_utf8(env, args[ARG_INDEX_2], keywords, MAX_BUF_SIZE, &result);
    clientInstance.set_proxy_basic_auth(uri, username, keywords);
    return 0;
}

static napi_value opened(napi_env env, napi_callback_info info)
{
    bool opened = clientInstance.opened();
    napi_value napi_opened;
    napi_get_boolean(env, opened, &napi_opened);
    return napi_opened;
}

static napi_value get_sessionid(napi_env env, napi_callback_info info)
{
    std::string sessionid = clientInstance.get_sessionid();
    napi_value napi_sessionid;
    napi_create_string_utf8(env, sessionid.c_str(), MAX_BUF_SIZE, &napi_sessionid);
    return napi_sessionid;
}

// socket相关napi接口
static std::string nsp = "";

static sio::socket::ptr get_socket()
{
    if (nsp == "") {
        return clientInstance.socket();
    } else {
        return clientInstance.socket(nsp);
    }
}

static napi_value set_nsp(napi_env env, napi_callback_info info)
{
    size_t argc = 1;
    napi_value args[1] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    char charNsp[MAX_BUF_SIZE];
    napi_get_value_string_utf8(env, args[0], charNsp, MAX_BUF_SIZE, &result);
    nsp = charNsp;
    return 0;
}

static napi_value on(napi_env env, napi_callback_info info)
{
    initEnv(env);
    size_t argc = 2;
    napi_value args[ARG_INDEX_2] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    char eventName[MAX_BUF_SIZE];
    napi_get_value_string_utf8(env, args[0], eventName, MAX_BUF_SIZE, &result);
    napi_value on_event_listener_call_aux = args[1];
    napi_ref on_event_listener_call_aux_ref;
    napi_create_reference(env_global, on_event_listener_call_aux, 1, &on_event_listener_call_aux_ref);
    on_event_listener_call_aux_ref_map.insert(
        {eventName, on_event_listener_call_aux_ref});
    
    if (strcmp(eventName, g_newMessage) == 0) {
        NapiCreateThreadsafe(env,  on_event_listener_call_aux, CallJsEmit,
            &g_tsfnOnNewMessageCall);
    } else if (strcmp(eventName, g_userJoined) == 0) {
        NapiCreateThreadsafe(env,  on_event_listener_call_aux, CallJsEmit,
            &g_tsfnOnUserJoinedCall);
    } else if (strcmp(eventName, g_userLeft) == 0) {
        NapiCreateThreadsafe(env,  on_event_listener_call_aux,  CallJsEmit,
            &g_tsfnOnUserLeftCall);
    } else if (strcmp(eventName, g_login) == 0) {
        NapiCreateThreadsafe(env,  on_event_listener_call_aux,  CallJsEmit,
            &g_tsfnOnLoginCall);
    }
    
    get_socket()->on(eventName, std::bind(&ClientSocket::on_event_listener_aux, &g_clientSocket,
        std::placeholders::_1, std::placeholders::_2, std::placeholders::_3, std::placeholders::_4));
    return 0;
}

static napi_value once(napi_env env, napi_callback_info info)
{
    initEnv(env);
    size_t argc = 2;
    napi_value args[ARG_INDEX_2] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    char eventName[MAX_BUF_SIZE];
    napi_get_value_string_utf8(env, args[0], eventName, MAX_BUF_SIZE, &result);
    napi_value on_event_listener_call_aux = args[1];
    napi_ref on_event_listener_call_aux_ref;
    napi_create_reference(env_global, on_event_listener_call_aux, 1, &on_event_listener_call_aux_ref);
    on_event_listener_call_aux_ref_map.insert(
        {eventName, on_event_listener_call_aux_ref});
    get_socket()->on(eventName, std::bind(&ClientSocket::once_event_listener_aux, &g_clientSocket,
        std::placeholders::_1, std::placeholders::_2, std::placeholders::_3, std::placeholders::_4));
    return 0;
}

static napi_value off(napi_env env, napi_callback_info info)
{
    size_t argc = 1;
    napi_value args[1] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    char eventName[MAX_BUF_SIZE];
    napi_get_value_string_utf8(env, args[0], eventName, MAX_BUF_SIZE, &result);
    get_socket()->off(eventName);
    return 0;
}

static napi_value off_all(napi_env env, napi_callback_info info)
{
    get_socket()->off_all();
    return 0;
}

static napi_value socket_close(napi_env env, napi_callback_info info)
{
    get_socket()->close();
    return 0;
}
static napi_value on_error(napi_env env, napi_callback_info info)
{
    initEnv(env);
    size_t argc = 1;
    napi_value args[1] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    napi_value on_error_listener_call = args[0];
    napi_create_reference(env_global, on_error_listener_call, 1, &on_error_listener_call_ref);
    
    NapiCreateThreadsafe(env, on_error_listener_call, CallJsEmit, &g_tsfnOnErrorCall);
    
    get_socket()->on_error(std::bind(&ClientSocket::on_error_listener, &g_clientSocket, std::placeholders::_1));
    return 0;
}

static napi_value off_error(napi_env env, napi_callback_info info)
{
    get_socket()->off_error();
    return 0;
}

static sio::object_message::ptr get_object_message(napi_env env, napi_value napi_object_value)
{
    napi_value keys;
    napi_get_property_names(env, napi_object_value, &keys);
    uint32_t key_length;
    napi_get_array_length(env, keys, &key_length);
    sio::object_message::ptr message_item = sio::object_message::create();
    for (uint32_t i = 0; i < key_length; i++) {
        // 获取key
        napi_value napi_key;
        napi_get_element(env, keys, i, &napi_key);
        char char_key[MAX_BUF_SIZE];
        napi_get_value_string_utf8(env, napi_key, char_key, MAX_BUF_SIZE, &result);
        // 获取value
        napi_value napi_value;
        napi_get_named_property(env, napi_object_value, char_key, &napi_value);
        napi_valuetype valueType;
        napi_typeof(env, napi_value, &valueType);
        switch (valueType) {
            case napi_string:
                char char_value[MAX_BUF_SIZE];
                napi_get_value_string_utf8(env, napi_value, char_value, MAX_BUF_SIZE, &result);
                ((sio::object_message *)message_item.get())->insert(char_key, std::string(char_value));
                break;
            case napi_number:
                double num_value;
                napi_get_value_double(env, napi_value, &num_value);
                ((sio::object_message *)message_item.get())->insert(char_key, (int64_t)num_value);
                break;
            case napi_boolean:
                bool bool_value;
                napi_get_value_bool(env, napi_value, &bool_value);
                ((sio::object_message *)message_item.get())->insert(char_key, bool_value);
                break;
            case napi_object:
                sio::object_message::ptr message_object = get_object_message(env, napi_value);
                ((sio::object_message *)message_item.get())->insert(char_key, message_object);
                message_object = nullptr;
                break;
        }
    }
    return message_item;
}

static napi_value emit(napi_env env, napi_callback_info info)
{
    initEnv(env);
    size_t argc = 4;
    napi_value args[4] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    char eventName[MAX_BUF_SIZE];
    napi_get_value_string_utf8(env, args[0], eventName, MAX_BUF_SIZE, &result);
    napi_valuetype messageType;
    napi_typeof(env, args[1], &messageType);
    napi_value on_emit_listener_call = args[3];
    napi_ref on_emit_listener_call_ref;
    napi_create_reference(env_global, on_emit_listener_call, 1, &on_emit_listener_call_ref);
    on_emit_listener_call_ref_map.insert(
        {eventName, on_emit_listener_call_ref});
    sio::message::list *messageList = new sio::message::list();
    if (messageType == napi_string) {
        char message[MAX_BUF_SIZE];
        napi_get_value_string_utf8(env, args[1], message, MAX_BUF_SIZE, &result);
        bool isArraybuffer;
        napi_get_value_bool(env, args[ARG_INDEX_2], &isArraybuffer);
        if (isArraybuffer) {
            std::shared_ptr<std::string> message_binary = std::make_shared<std::string>(message);
            messageList->push(message_binary);
            message_binary = nullptr;
        } else {
            messageList->push(message);
        }
    } else if (messageType == napi_object) {
        sio::object_message::ptr message_item = get_object_message(env, args[1]);
        messageList->push(message_item);
        message_item = nullptr;
    }
    
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG, "SOCKETIO_TAG------> 0 napi_value emit ");
    NapiCreateThreadsafe(env, on_emit_listener_call, CallJsEmit, &g_tsfnEmitCall);
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_DOMAIN, LOG_TAG, "SOCKETIO_TAG------> 1 napi_value emit ");
    
    get_socket()->emit(eventName, *messageList, std::bind(&ClientSocket::on_emit_callback, &g_clientSocket,
        std::placeholders::_1, std::placeholders::_2));
    delete messageList;
    messageList = nullptr;
    return 0;
}

EXTERN_C_START
static napi_value Init(napi_env env, napi_value exports)
{
    napi_property_descriptor desc[] = {
        {"connect", nullptr, connect, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"set_open_listener", nullptr, set_open_listener, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"set_fail_listener", nullptr, set_fail_listener, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"set_reconnecting_listener", nullptr, set_reconnecting_listener, nullptr, nullptr, nullptr,
            napi_default, nullptr},
        {"set_reconnect_listener", nullptr, set_reconnect_listener, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"set_close_listener", nullptr, set_close_listener, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"set_socket_open_listener", nullptr, set_socket_open_listener, nullptr, nullptr, nullptr,
            napi_default, nullptr},
        {"set_socket_close_listener", nullptr, set_socket_close_listener, nullptr, nullptr, nullptr,
            napi_default, nullptr},
        {"clear_con_listeners", nullptr, clear_con_listeners, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"clear_socket_listeners", nullptr, clear_socket_listeners, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"set_reconnect_attempts", nullptr, set_reconnect_attempts, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"set_reconnect_delay", nullptr, set_reconnect_delay, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"set_reconnect_delay_max", nullptr, set_reconnect_delay_max, nullptr, nullptr, nullptr,
            napi_default, nullptr},
        {"set_logs_default", nullptr, set_logs_default, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"set_logs_quiet", nullptr, set_logs_quiet, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"set_logs_verbose", nullptr, set_logs_verbose, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"close", nullptr, close, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"sync_close", nullptr, sync_close, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"set_proxy_basic_auth", nullptr, set_proxy_basic_auth, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"opened", nullptr, opened, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"get_sessionid", nullptr, get_sessionid, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"set_nsp", nullptr, set_nsp, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"on", nullptr, on, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"once", nullptr, once, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"off", nullptr, off, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"off_all", nullptr, off_all, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"socket_close", nullptr, socket_close, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"on_error", nullptr, on_error, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"off_error", nullptr, off_error, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"emit", nullptr, emit, nullptr, nullptr, nullptr, napi_default, nullptr},
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
    .nm_modname = "client_socket_c",
    .nm_priv = ((void *)0),
    .reserved = {0},
};

extern "C" __attribute__((constructor)) void RegisterSocketIoModule(void)
{
    napi_module_register(&demoModule);
}