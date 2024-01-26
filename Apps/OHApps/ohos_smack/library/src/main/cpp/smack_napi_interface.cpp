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
#include <string>

#include <js_native_api.h>
#include <js_native_api_types.h>

#include "napi/native_api.h"
#include "Smack.h"
#include "log.h"
#include "registration.h"
#include "room.h"
#include "MyMUCInvitationHandler.h"

static constexpr const int MAX_STRING_LENGTH = (1024 * 5);
static constexpr const int ARG_INDEX_0 = 0;
static constexpr const int ARG_INDEX_1 = 1;
static constexpr const int ARG_INDEX_2 = 2;
static constexpr const int ARG_INDEX_3 = 3;

static Smack *g_smack = nullptr;
static room *g_room1 = nullptr;
static MyMUCInvitationHandler *g_myMUCInvitationHandler = nullptr;
static registration *g_mregistration = nullptr;
static napi_value js_sb;

static size_t register_argc = 2;
static size_t register_argc_group = 2;
static size_t register_argc_invitation = 1;
static size_t register_argc_MUCParticipant = 2;
static size_t register_argc_HANDLE_SUBSCRIPTRION_REQUEST = 1;

static napi_env register_env;
static napi_env register_env_group;
static napi_env register_env_invitation;
static napi_env register_env_MUCParticipant;
static napi_env register_env_HANDLE_SUBSCRIPTRION_REQUEST;

using namespace gloox;
/**
 * 登录    OK
 * @param env
 * @param info
 * @return
 */

static napi_value login(napi_env env, napi_callback_info info)
{
    size_t argc = 2;
    napi_value args[2] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    char value1[MAX_STRING_LENGTH];
    size_t size1 = 0;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);

    g_smack = new Smack();
    napi_value sum;
    napi_create_int32(env, g_smack->Login(value0, value1), &sum);
    return sum;
}

/**
 * 发送消息
 * @param env
 * @param info
 * @return
 */
static napi_value send(napi_env env, napi_callback_info info)
{
    size_t argc = 2;
    napi_value args[2] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    char value1[MAX_STRING_LENGTH];
    size_t size1 = 0;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);

    g_smack->Send(value0, value1);
    napi_value sum;
    napi_create_string_utf8(env, value0, MAX_STRING_LENGTH, &sum);
    return sum;
}

/**
 * 获取好友列表
 * @param env
 * @param info
 * @return
 */
static napi_value getFriendList(napi_env env, napi_callback_info info)
{
    napi_value sum;
    std::string str = g_smack->GetFriendList();
    napi_create_string_utf8(env, str.c_str(), strlen(str.c_str()), &sum);
    return sum;
}

/**
 * 更改用户状态  OK
 * @param env
 * @param info
 * @return
 */
static napi_value changePresence(napi_env env, napi_callback_info info)
{
    size_t argc = 2;
    napi_value args[2] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    char value1[MAX_STRING_LENGTH];
    size_t size1 = 0;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);

    g_smack->ChangePresence(value0, value1);

    napi_value sum;
    napi_create_string_utf8(env, value0, MAX_STRING_LENGTH, &sum);
    return sum;
}

/**
 * 退出登录
 * @param env
 * @param info
 * @return
 */
static napi_value loginout(napi_env env, napi_callback_info info)
{
    napi_value sum;
    g_smack->Loginout();

    napi_create_int32(env, 0, &sum);
    return sum;
}

/**
 * 修改密码
 * @param env
 * @param info
 * @return
 */
static napi_value changpwd(napi_env env, napi_callback_info info)
{
    size_t argc = 1;
    napi_value args[1] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    g_smack->ChangePasswords(value0);
    napi_value sum;
    napi_create_string_utf8(env, value0, MAX_STRING_LENGTH, &sum);
    return sum;
}

/**
 * 注册   OK
 * @param env
 * @param info
 * @return
 */
static napi_value registers(napi_env env, napi_callback_info info)
{
    size_t argc = 3;
    napi_value args[3] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    napi_valuetype valuetype2;
    napi_typeof(env, args[ARG_INDEX_2], &valuetype2);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    char value1[MAX_STRING_LENGTH];
    size_t size1 = 0;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);

    char value2[MAX_STRING_LENGTH];
    size_t size2 = 0;
    napi_get_value_string_utf8(env, args[ARG_INDEX_2], value2, MAX_STRING_LENGTH, &size2);

    if (g_mregistration == nullptr) {
        g_mregistration = new registration();
    }

    napi_value sum;
    napi_create_int32(env, g_mregistration->createAccounts(value0, value1, value2), &sum);
    return sum;
}

/**
 * 添加好友
 */
static napi_value addFriends(napi_env env, napi_callback_info info)
{
    size_t argc = 3;
    napi_value args[3] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    napi_valuetype valuetype2;
    napi_typeof(env, args[ARG_INDEX_2], &valuetype1);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    char value1[MAX_STRING_LENGTH];
    size_t size1 = 0;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);

    char value2[MAX_STRING_LENGTH];
    size_t size2 = 0;
    napi_get_value_string_utf8(env, args[ARG_INDEX_2], value2, MAX_STRING_LENGTH, &size2);

    g_smack->AddFriends(value0, value1, value2);

    napi_value sum;
    napi_create_string_utf8(env, value0, MAX_STRING_LENGTH, &sum);
    return sum;
}

/**
 * 创建分组
 * @param env
 * @param info
 * @return
 */
static napi_value createGroup(napi_env env, napi_callback_info info)
{
    size_t argc = 1;
    napi_value args[1] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    g_smack->CreateGroup(value0);

    napi_value sum;
    napi_create_string_utf8(env, value0, MAX_STRING_LENGTH, &sum);
    return sum;
}

/**
 * 删除好友
 * @param env
 * @param info
 * @return
 */
static napi_value delfriend(napi_env env, napi_callback_info info)
{
    size_t argc = 1;
    napi_value args[1] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    g_smack->Delfriends(value0);

    napi_value sum;
    napi_create_string_utf8(env, value0, MAX_STRING_LENGTH, &sum);
    return sum;
}

/**
 * 删除账户
 * @param env
 * @param info
 * @return
 */
static napi_value unregister(napi_env env, napi_callback_info info)
{
    napi_value sum;

    g_smack->RemoveAccounts();
    napi_create_int32(env, 0, &sum);
    return sum;
}

/**
 * 更改好友分组
 * @param env
 * @param info
 * @return
 */
static napi_value changeFriendGroup(napi_env env, napi_callback_info info)
{
    napi_value sum;
    size_t argc = 2;
    napi_value args[2] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);
    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);
    char value1[MAX_STRING_LENGTH];
    size_t size1 = 1;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);

    g_smack->ChangeFriendGroup(value0, value1);
    napi_create_int32(env, 0, &sum);
    return sum;
}

static napi_value changeGroup(napi_env env, napi_callback_info info)
{
    size_t argc = 2;
    napi_value args[2] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    char value1[MAX_STRING_LENGTH];
    size_t size1 = 0;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);

    g_smack->ChangeGroup(value0, value1);

    napi_value sum;
    napi_create_int32(env, 0, &sum);
    return sum;
}

static napi_value register_message(napi_env env, napi_callback_info info)
{
    napi_value args[2] = {nullptr, nullptr};
    napi_get_cb_info(env, info, &register_argc, args, nullptr, nullptr);
    register_env = env;

    return NULL;
}

static napi_value registerMessageCallback(napi_env env, napi_callback_info info)
{
    size_t argc = 1;
    napi_value args[1] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    napi_value on_call_back = args[0];
    LOGW("SMACK_TAG--------->registerMessageCallback: %p:  %d", on_call_back, __LINE__);
    g_smack->RecvMsg(env, on_call_back);
    
    return NULL;
}

static napi_value registerGroupMessageCallback(napi_env env, napi_callback_info info)
{
    size_t argc = 1;
    napi_value args[1] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    napi_value on_call_back = args[0];
    LOGW("SMACK_TAG--------->registerGroupMessageCallback: %p:  %d", on_call_back, __LINE__);
    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    g_room1->recvGroupMsg(env, on_call_back);

    return NULL;
}

static napi_value registerNonrosterPresenceCallback(napi_env env, napi_callback_info info)
{
    size_t argc = 1;
    napi_value args[1] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    napi_value on_call_back = args[0];
    g_smack->RegisterNonrosterPresenceCallback(env, on_call_back);

    return NULL;
}

static napi_value registerMessageGroup(napi_env env, napi_callback_info info)
{
    napi_value args[2] = {nullptr, nullptr};
    napi_get_cb_info(env, info, &register_argc_group, args, nullptr, nullptr);
    register_env_group = env;

    return NULL;
}

static napi_value registerMUCParticipantPresenceListener(napi_env env, napi_callback_info info)
{
    napi_value args[2] = {nullptr, nullptr};
    napi_get_cb_info(env, info, &register_argc_MUCParticipant, args, nullptr, nullptr);
    register_env_MUCParticipant = env;

    return NULL;
}

static napi_value registerMUCParticipantPresenceListener2(napi_env env, napi_callback_info info)
{
    size_t argc = 1;
    napi_value args[1] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    napi_value on_call_back = args[0];
    LOGW("SMACK_TAG--------->registerMessageCallback: %p:  %d", on_call_back, __LINE__);
    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    g_room1->recvMUCParticipantPresenceListener(env, on_call_back);

    return NULL;
}

static napi_value registerInvitationListener(napi_env env, napi_callback_info info)
{
    size_t argc = 1;
    napi_value args;
    napi_get_cb_info(env, info, &argc, &args, nullptr, nullptr);
    napi_value on_call_back = args;
    
    LOGW("SMACK_TAG--------->registerInvitationListener: %p:  %d", on_call_back, __LINE__);
    g_smack->GetMUCInvitationHandler()->recvMUCInvitation(env, on_call_back);
    return NULL;
}

/**
 * createRoom
 * @param env
 * @param info
 * @return
 */
static napi_value createRoom(napi_env env, napi_callback_info info)
{
    size_t argc = 4;
    napi_value args[4] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    napi_valuetype valuetype2;
    napi_typeof(env, args[ARG_INDEX_2], &valuetype2);

    napi_valuetype valuetype3;
    napi_typeof(env, args[ARG_INDEX_3], &valuetype3);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    char value1[MAX_STRING_LENGTH];
    size_t size1 = 0;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);

    char value2[MAX_STRING_LENGTH];
    size_t size2 = 0;
    napi_get_value_string_utf8(env, args[ARG_INDEX_2], value2, MAX_STRING_LENGTH, &size2);

    char value3[MAX_STRING_LENGTH];
    size_t size3 = 0;
    napi_get_value_string_utf8(env, args[ARG_INDEX_3], value3, MAX_STRING_LENGTH, &size3);

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    g_room1->createRoom(g_smack->getClent(), value0, value1, value2, value3);

    napi_value sum;
    napi_create_string_utf8(env, value0, MAX_STRING_LENGTH, &sum);
    return sum;
}

/**
 * leave
 * @param env
 * @param info
 * @return
 */
static napi_value leave(napi_env env, napi_callback_info info)
{
    size_t argc = 1;
    napi_value args[1] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    g_room1->leave(value0);

    napi_value sum;
    napi_create_string_utf8(env, value0, MAX_STRING_LENGTH, &sum);
    return sum;
}

/**
 * sendGroupMessage
 * @param env
 * @param info
 * @return
 */
static napi_value sendGroupMessage(napi_env env, napi_callback_info info)
{
    size_t argc = 1;
    napi_value args[1] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    g_room1->sendGroupMessage(value0);

    napi_value sum;
    napi_create_string_utf8(env, value0, MAX_STRING_LENGTH, &sum);
    return sum;
}

/**
 * setSubject
 * @param env
 * @param info
 * @return
 */
static napi_value setSubject(napi_env env, napi_callback_info info)
{
    size_t argc = 1;
    napi_value args[1] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    g_room1->setSubject(value0);

    napi_value sum;
    napi_create_string_utf8(env, value0, MAX_STRING_LENGTH, &sum);
    return sum;
}

/**
 * join
 * @param env
 * @param info
 * @return
 */
static napi_value join(napi_env env, napi_callback_info info)
{
    napi_value sum;

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    g_room1->Join();
    napi_create_int32(env, 0, &sum);
    return sum;
}

/**
 * join
 * @param env
 * @param info
 * @return
 */
static napi_value destroy(napi_env env, napi_callback_info info)
{
    size_t argc = 2;
    napi_value args[2] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    char value1[MAX_STRING_LENGTH];
    size_t size1 = 0;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    JID jid(value0);
    g_room1->destroy("reason", jid, value1);

    napi_value sum;
    napi_create_int32(env, 0, &sum);
    return sum;
}

static napi_value kick(napi_env env, napi_callback_info info)
{
    size_t argc = 2;
    napi_value args[2] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    char value1[MAX_STRING_LENGTH];
    size_t size1 = 0;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    g_room1->kick(value0, value1);

    napi_value sum;
    napi_create_int32(env, 0, &sum);
    return sum;
}

static napi_value ban(napi_env env, napi_callback_info info)
{
    size_t argc = 2;
    napi_value args[2] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    char value1[MAX_STRING_LENGTH];
    size_t size1 = 0;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    g_room1->ban(value0, value1);

    napi_value sum;
    napi_create_int32(env, 0, &sum);
    return sum;
}

static napi_value requestVoice(napi_env env, napi_callback_info info)
{
    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    g_room1->RequestVoice();

    napi_value sum;
    napi_create_int32(env, 0, &sum);
    return sum;
}

static napi_value grantVoice(napi_env env, napi_callback_info info)
{
    size_t argc = 2;
    napi_value args[2] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    char value1[MAX_STRING_LENGTH];
    size_t size1 = 0;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    g_room1->grantVoice(value0, value1);

    napi_value sum;
    napi_create_int32(env, 0, &sum);
    return sum;
}

static napi_value grantVoices(napi_env env, napi_callback_info info)
{
    size_t argc = 2;
    napi_value args[2] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    char value1[MAX_STRING_LENGTH];
    size_t size1 = 0;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    g_room1->grantVoices(value0, value1);

    napi_value sum;
    napi_create_int32(env, 0, &sum);
    return sum;
}

static napi_value revokeVoice(napi_env env, napi_callback_info info)
{
    size_t argc = 2;
    napi_value args[2] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    char value1[MAX_STRING_LENGTH];
    size_t size1 = 0;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    g_room1->revokeVoice(value0, value1);

    napi_value sum;
    napi_create_int32(env, 0, &sum);
    return sum;
}

static napi_value revokeVoices(napi_env env, napi_callback_info info)
{
    size_t argc = 2;
    napi_value args[2] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    char value1[MAX_STRING_LENGTH];
    size_t size1 = 0;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    g_room1->revokeVoices(value0, value1);

    napi_value sum;
    napi_create_int32(env, 0, &sum);
    return sum;
}

static napi_value setAffiliation(napi_env env, napi_callback_info info)
{
    size_t argc = 3;
    napi_value args[3] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    napi_valuetype valuetype2;
    napi_typeof(env, args[ARG_INDEX_2], &valuetype2);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    char value1[MAX_STRING_LENGTH];
    size_t size1 = 0;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);

    char value2[MAX_STRING_LENGTH];
    size_t size2 = 0;
    napi_get_value_string_utf8(env, args[ARG_INDEX_2], value2, MAX_STRING_LENGTH, &size2);

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    g_room1->setAffiliation(value0, value1, value2);

    napi_value sum;
    napi_create_string_utf8(env, value0, MAX_STRING_LENGTH, &sum);
    return sum;
}

static napi_value setRole(napi_env env, napi_callback_info info)
{
    size_t argc = 3;
    napi_value args[3] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    napi_valuetype valuetype2;
    napi_typeof(env, args[ARG_INDEX_2], &valuetype2);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    char value1[MAX_STRING_LENGTH];
    size_t size1 = 0;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);

    char value2[MAX_STRING_LENGTH];
    size_t size2 = 0;
    napi_get_value_string_utf8(env, args[ARG_INDEX_2], value2, MAX_STRING_LENGTH, &size2);

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    g_room1->setRole(value0, value1, value2);

    napi_value sum;
    napi_create_string_utf8(env, value0, MAX_STRING_LENGTH, &sum);
    return sum;
}

static napi_value setRoles(napi_env env, napi_callback_info info)
{
    size_t argc = 3;
    napi_value args[3] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    napi_valuetype valuetype2;
    napi_typeof(env, args[ARG_INDEX_2], &valuetype2);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    char value1[MAX_STRING_LENGTH];
    size_t size1 = 0;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);

    char value2[MAX_STRING_LENGTH];
    size_t size2 = 0;
    napi_get_value_string_utf8(env, args[ARG_INDEX_2], value2, MAX_STRING_LENGTH, &size2);

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    g_room1->setRoles(value0, value1, value2);

    napi_value sum;
    napi_create_string_utf8(env, value0, MAX_STRING_LENGTH, &sum);
    return sum;
}

static napi_value setPresence(napi_env env, napi_callback_info info)
{
    size_t argc = 2;
    napi_value args[2] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    char value1[MAX_STRING_LENGTH];
    size_t size1 = 0;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    g_room1->setPresence(value0, value1);

    napi_value sum;
    napi_create_string_utf8(env, value0, MAX_STRING_LENGTH, &sum);
    return sum;
}

static napi_value invite(napi_env env, napi_callback_info info)
{
    size_t argc = 2;
    napi_value args[2] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    char value1[MAX_STRING_LENGTH];
    size_t size1 = 0;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    JID jids(value0);
    g_room1->invite(jids, value1);

    napi_value sum;
    napi_create_string_utf8(env, value0, MAX_STRING_LENGTH, &sum);
    return sum;
}

static napi_value requestRoomConfig(napi_env env, napi_callback_info info)
{
    napi_value sum;

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    std::string str = g_room1->requestRoomConfig();
    napi_create_string_utf8(env, str.c_str(), strlen(str.c_str()), &sum);
    return sum;
}

static napi_value requestList(napi_env env, napi_callback_info info)
{
    napi_value sum;
    size_t argc = 1;
    napi_value args[1] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    std::string str = g_room1->requestList(value0);
    napi_create_string_utf8(env, str.c_str(), strlen(str.c_str()), &sum);
    return sum;
}

static napi_value getRoomItems(napi_env env, napi_callback_info info)
{
    napi_value sum;

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    std::string str = g_room1->getRoomItems();
    napi_create_string_utf8(env, str.c_str(), strlen(str.c_str()), &sum);
    return sum;
}

static napi_value getRoomInfo(napi_env env, napi_callback_info info)
{
    napi_value sum;

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    std::string str = g_room1->getRoomInfo();
    napi_create_string_utf8(env, str.c_str(), strlen(str.c_str()), &sum);
    return sum;
}

static napi_value declineInvitation(napi_env env, napi_callback_info info)
{
    size_t argc = 3;
    napi_value args[3] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    napi_valuetype valuetype2;
    napi_typeof(env, args[ARG_INDEX_2], &valuetype2);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    char value1[MAX_STRING_LENGTH];
    size_t size1 = 0;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);

    char value2[MAX_STRING_LENGTH];
    size_t size2 = 0;
    napi_get_value_string_utf8(env, args[ARG_INDEX_2], value2, MAX_STRING_LENGTH, &size2);

    if (g_smack == nullptr) {
        g_smack = new Smack();
    }
    g_smack->DeclineInvitation(value0, value1, value2);

    napi_value sum;
    napi_create_string_utf8(env, value0, MAX_STRING_LENGTH, &sum);
    return sum;
}

static napi_value createOrJoinRoom(napi_env env, napi_callback_info info)
{
    size_t argc = 4;
    napi_value args[4] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    napi_valuetype valuetype2;
    napi_typeof(env, args[ARG_INDEX_2], &valuetype2);

    napi_valuetype valuetype3;
    napi_typeof(env, args[ARG_INDEX_3], &valuetype2);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    char value1[MAX_STRING_LENGTH];
    size_t size1 = 0;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);

    char value2[MAX_STRING_LENGTH];
    size_t size2 = 0;
    napi_get_value_string_utf8(env, args[ARG_INDEX_2], value2, MAX_STRING_LENGTH, &size2);

    char value3[MAX_STRING_LENGTH];
    size_t size3 = 0;
    napi_get_value_string_utf8(env, args[ARG_INDEX_3], value3, MAX_STRING_LENGTH, &size3);

    if (g_smack == nullptr) {
        g_smack = new Smack();
    }
    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    Client *client = g_smack->getClent();
    JID &jid = g_smack->getMyJID();
    RoomParams roomParams = {};
    roomParams.roomStr = value0;
    roomParams.domain = value1;
    roomParams.serviceName = value2;
    roomParams.password = value3;
    roomParams.nick = jid.username();
    
    g_room1->createOrJoinRoom(client, roomParams);

    napi_value sum;
    napi_create_string_utf8(env, value0, MAX_STRING_LENGTH, &sum);
    return sum;
}

static napi_value setRoomConfig(napi_env env, napi_callback_info info)
{
    napi_value sum;
    size_t argc = 1;
    napi_value args[1] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    g_room1->setRoomConfig(value0);
    napi_create_string_utf8(env, value0, MAX_STRING_LENGTH, &sum);
    return sum;
}

static napi_value setPassword(napi_env env, napi_callback_info info)
{
    napi_value sum;
    size_t argc = 1;
    napi_value args[1] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    g_room1->setPassword(value0);
    napi_create_string_utf8(env, value0, MAX_STRING_LENGTH, &sum);
    return sum;
}

static napi_value bans(napi_env env, napi_callback_info info)
{
    size_t argc = 2;
    napi_value args[2] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    char value1[MAX_STRING_LENGTH];
    size_t size1 = 0;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    g_room1->bans(value0, value1);

    napi_value sum;
    napi_create_string_utf8(env, value0, MAX_STRING_LENGTH, &sum);
    return sum;
}

static napi_value setNick(napi_env env, napi_callback_info info)
{
    napi_value sum;
    size_t argc = 1;
    napi_value args[1] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    g_room1->setNick(value0);
    napi_create_string_utf8(env, value0, MAX_STRING_LENGTH, &sum);
    return sum;
}

static napi_value isJoined(napi_env env, napi_callback_info info)
{
    napi_value sum;

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    std::string str = g_room1->isJoined();
    napi_create_string_utf8(env, str.c_str(), strlen(str.c_str()), &sum);
    return sum;
}

static napi_value nick(napi_env env, napi_callback_info info)
{
    napi_value sum;

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    std::string str = g_room1->nick();
    napi_create_string_utf8(env, str.c_str(), strlen(str.c_str()), &sum);
    return sum;
}

static napi_value isConnected(napi_env env, napi_callback_info info)
{
    napi_value sum;

    if (g_smack == nullptr) {
        g_smack = new Smack();
    }
    int32_t num = 0;
    if (g_smack->IsConnected()) {
        num = 1;
    }
    napi_create_int32(env, num, &sum);
    return sum;
}

static napi_value username(napi_env env, napi_callback_info info)
{
    napi_value value;
    if (g_smack == nullptr) {
        g_smack = new Smack();
    }
    std::string str = g_smack->Username();
    napi_create_string_utf8(env, str.c_str(), strlen(str.c_str()), &value);
    return value;
}

static napi_value connect(napi_env env, napi_callback_info info)
{
    napi_value sum;

    if (g_smack == nullptr) {
        g_smack = new Smack();
    }
    int32_t num = 0;
    if (g_smack->Connect()) {
        num = 1;
    }
    napi_create_int32(env, num, &sum);
    return sum;
}

static napi_value setServer(napi_env env, napi_callback_info info)
{
    napi_value sum;
    size_t argc = 1;
    napi_value args[1] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);
    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);
    if (g_smack == nullptr) {
        g_smack = new Smack();
    }
    g_smack->SetServer(value0);
    napi_create_string_utf8(env, value0, MAX_STRING_LENGTH, &sum);
    return sum;
}

static napi_value setUsernameAndPassword(napi_env env, napi_callback_info info)
{
    size_t argc = 2;
    napi_value args[2] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    char value1[MAX_STRING_LENGTH];
    size_t size1 = 0;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);
    if (g_smack == nullptr) {
        g_smack = new Smack();
    }
    g_smack->SetUsernameAndPassword(value0, value1);
    napi_value sum;
    napi_create_int32(env, 0, &sum);
    return sum;
}

static napi_value setPort(napi_env env, napi_callback_info info)
{
    size_t argc = 1;
    napi_value args[1] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    napi_valuetype valuetype0;

    napi_typeof(env, args[0], &valuetype0);

    int32_t value0 = 0;
    napi_get_value_int32(env, args[0], &value0);

    if (g_smack == nullptr) {
        g_smack = new Smack();
    }
    g_smack->SetPort(value0);
    napi_value sum;
    napi_create_int32(env, value0, &sum);
    return sum;
}
static napi_value password(napi_env env, napi_callback_info info)
{
    napi_value sum;

    if (g_smack == nullptr) {
        g_smack = new Smack();
    }
    std::string str = g_smack->Password();
    napi_create_string_utf8(env, str.c_str(), strlen(str.c_str()), &sum);
    return sum;
}

static napi_value resource(napi_env env, napi_callback_info info)
{
    napi_value sum;

    if (g_smack == nullptr) {
        g_smack = new Smack();
    }
    std::string str = g_smack->Resource();
    napi_create_string_utf8(env, str.c_str(), strlen(str.c_str()), &sum);
    return sum;
}

static napi_value setResource(napi_env env, napi_callback_info info)
{
    napi_value sum;
    size_t argc = 1;
    napi_value args[1] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);
    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);
    if (g_smack == nullptr) {
        g_smack = new Smack();
    }
    g_smack->SetResource(value0);
    napi_create_string_utf8(env, value0, MAX_STRING_LENGTH, &sum);
    return sum;
};

static napi_value onLogin(napi_env env, napi_callback_info info)
{
    napi_value sum;
    if (g_smack == nullptr) {
        g_smack = new Smack();
    }
    int32_t num = g_smack->Login() ? 1 : 0;
    napi_create_int32(env, num, &sum);
    return sum;
}

static napi_value server(napi_env env, napi_callback_info info)
{
    napi_value sum;

    if (g_smack == nullptr) {
        g_smack = new Smack();
    }
    std::string str = g_smack->Server();
    napi_create_string_utf8(env, str.c_str(), strlen(str.c_str()), &sum);
    return sum;
}

static napi_value authed(napi_env env, napi_callback_info info)
{
    napi_value sum;
    if (g_smack == nullptr) {
        g_smack = new Smack();
    }
    int32_t num = g_smack->Authed();
    napi_create_int32(env, num, &sum);
    return sum;
}

static napi_value port(napi_env env, napi_callback_info info)
{
    napi_value sum;
    if (g_smack == nullptr) {
        g_smack = new Smack();
    }
    int32_t num = g_smack->Port();
    napi_create_int32(env, num, &sum);
    return sum;
}

static napi_value compression(napi_env env, napi_callback_info info)
{
    napi_value sum;
    if (g_smack == nullptr) {
        g_smack = new Smack();
    }
    int32_t num = g_smack->Compression();
    napi_create_int32(env, num, &sum);
    return sum;
}

static napi_value setAffiliations(napi_env env, napi_callback_info info)
{
    napi_value sum;
    size_t argc = 3;
    napi_value args[3] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    napi_valuetype valuetype2;
    napi_typeof(env, args[ARG_INDEX_2], &valuetype2);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    char value1[MAX_STRING_LENGTH];
    size_t size1 = 0;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);

    char value2[MAX_STRING_LENGTH];
    size_t size2 = 0;
    napi_get_value_string_utf8(env, args[ARG_INDEX_2], value2, MAX_STRING_LENGTH, &size2);

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    g_room1->setAffiliation(value0, value1, value2);
    napi_create_string_utf8(env, value0, MAX_STRING_LENGTH, &sum);
    return sum;
}

static napi_value handleSubscriptionRequestListener(napi_env env, napi_callback_info info)
{
    size_t argc = 1;
    napi_value args;
    napi_get_cb_info(env, info, &argc, &args, nullptr, nullptr);
    napi_value on_call_back = args;
    LOGW("SMACK_TAG--------->handleSubscriptionRequestListener: %p:  %d", on_call_back, __LINE__);
    g_smack->RecvSubscriptionRequestListener(env, on_call_back);
    return NULL;
}

static napi_value receiveFriends(napi_env env, napi_callback_info info)
{
    napi_value sum;
    size_t argc = 3;
    napi_value args[3] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    napi_valuetype valuetype2;
    napi_typeof(env, args[ARG_INDEX_2], &valuetype2);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    char value1[MAX_STRING_LENGTH];
    size_t size1 = 0;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);

    char value2[MAX_STRING_LENGTH];
    size_t size2 = 0;
    napi_get_value_string_utf8(env, args[ARG_INDEX_2], value2, MAX_STRING_LENGTH, &size2);

    if (g_smack == nullptr) {
        g_smack = new Smack();
    }
    g_smack->ReceiveFriends(value0, value1, value2);
    napi_create_string_utf8(env, value0, MAX_STRING_LENGTH, &sum);
    return sum;
}

static napi_value rejectFriends(napi_env env, napi_callback_info info)
{
    napi_value sum;
    size_t argc = 2;
    napi_value args[2] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    char value0[MAX_STRING_LENGTH];
    size_t size0 = 0;
    napi_get_value_string_utf8(env, args[0], value0, MAX_STRING_LENGTH, &size0);

    char value1[MAX_STRING_LENGTH];
    size_t size1 = 0;
    napi_get_value_string_utf8(env, args[1], value1, MAX_STRING_LENGTH, &size1);

    if (g_smack == nullptr) {
        g_smack = new Smack();
    }
    g_smack->RejectFriends(value0, value1);

    napi_create_string_utf8(env, value0, MAX_STRING_LENGTH, &sum);

    return sum;
}

static napi_value getAffiliation(napi_env env, napi_callback_info info)
{
    napi_value sum;

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    std::string str = g_room1->getAffiliation();
    napi_create_string_utf8(env, str.c_str(), strlen(str.c_str()), &sum);
    return sum;
}

static napi_value getRole(napi_env env, napi_callback_info info)
{
    napi_value sum;

    if (g_room1 == nullptr) {
        g_room1 = new room();
    }
    std::string str = g_room1->getRole();
    napi_create_string_utf8(env, str.c_str(), strlen(str.c_str()), &sum);
    return sum;
}

static napi_value unregisterMessageCallback(napi_env env, napi_callback_info info)
{
    napi_value sum;
    g_smack->UnregisterMessageCallback();
    napi_create_int32(env, 0, &sum);
    return sum;
}

static napi_value unregisterGroupMessageCallback(napi_env env, napi_callback_info info)
{
    napi_value sum;
    g_room1->UnregisterGroupMessageCallback();
    napi_create_int32(env, 0, &sum);
    return sum;
}

static napi_value unregisterInvitationListener(napi_env env, napi_callback_info info)
{
    napi_value sum;
    g_smack->GetMUCInvitationHandler()->UnregisterInvitationListener();
    napi_create_int32(env, 0, &sum);
    return sum;
}

static napi_value unregisterMUCParticipantPresenceListener(napi_env env, napi_callback_info info)
{
    napi_value sum;
    g_room1->UnregisterMUCParticipantPresenceListener();
    napi_create_int32(env, 0, &sum);
    return sum;
}

static napi_value unSubscriptionRequestListener(napi_env env, napi_callback_info info)
{
    napi_value sum;
    g_smack->UnSubscriptionRequestListener();
    napi_create_int32(env, 0, &sum);
    return sum;
}

static napi_value unregisterNonrosterPresenceCallback(napi_env env, napi_callback_info info)
{
    napi_value sum;
    g_smack->UnregisterNonrosterPresenceCallback();
    napi_create_int32(env, 0, &sum);
    return sum;
}

static napi_property_descriptor g_desc[] = {
    {"login", nullptr, login, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"kick", nullptr, kick, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"ban", nullptr, ban, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"requestVoice", nullptr, requestVoice, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"grantVoice", nullptr, grantVoice, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"grantVoices", nullptr, grantVoices, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"revokeVoice", nullptr, revokeVoice, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"revokeVoices", nullptr, revokeVoices, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"createRoom", nullptr, createRoom, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"send", nullptr, send, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"leave", nullptr, leave, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"destroy", nullptr, destroy, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"sendGroupMessage", nullptr, sendGroupMessage, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"setSubject", nullptr, setSubject, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"join", nullptr, join, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"loginout", nullptr, loginout, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"addFriends", nullptr, addFriends, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"delfriend", nullptr, delfriend, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"createGroup", nullptr, createGroup, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"changePresence", nullptr, changePresence, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"registers", nullptr, registers, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"changpwd", nullptr, changpwd, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"getFriendList", nullptr, getFriendList, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"unregister", nullptr, unregister, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"changeFriendGroup", nullptr, changeFriendGroup, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"changeGroup", nullptr, changeGroup, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"register_message", nullptr, register_message, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"setAffiliation", nullptr, setAffiliation, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"setRole", nullptr, setRole, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"setRoles", nullptr, setRoles, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"setPresence", nullptr, setPresence, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"invite", nullptr, invite, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"requestRoomConfig", nullptr, requestRoomConfig, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"requestList", nullptr, requestList, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"getRoomItems", nullptr, getRoomItems, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"declineInvitation", nullptr, declineInvitation, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"registerInvitationListener", nullptr, registerInvitationListener, nullptr, nullptr, nullptr, napi_default,
     nullptr},
    {"getRoomInfo", nullptr, getRoomInfo, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"createOrJoinRoom", nullptr, createOrJoinRoom, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"setPassword", nullptr, setPassword, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"setRoomConfig", nullptr, setRoomConfig, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"registerMUCParticipantPresenceListener", nullptr, registerMUCParticipantPresenceListener, nullptr, nullptr,
     nullptr, napi_default, nullptr},
    {"registerMUCParticipantPresenceListener2", nullptr, registerMUCParticipantPresenceListener2, nullptr, nullptr,
     nullptr, napi_default, nullptr},
    {"bans", nullptr, bans, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"setNick", nullptr, setNick, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"isJoined", nullptr, isJoined, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"nick", nullptr, nick, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"isConnected", nullptr, isConnected, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"username", nullptr, username, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"connect", nullptr, connect, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"setServer", nullptr, setServer, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"setUsernameAndPassword", nullptr, setUsernameAndPassword, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"setPort", nullptr, setPort, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"password", nullptr, password, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"resource", nullptr, resource, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"setResource", nullptr, setResource, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"onLogin", nullptr, onLogin, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"server", nullptr, server, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"authed", nullptr, authed, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"port", nullptr, port, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"compression", nullptr, compression, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"setAffiliations", nullptr, setAffiliations, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"handleSubscriptionRequestListener", nullptr, handleSubscriptionRequestListener, nullptr, nullptr, nullptr,
     napi_default, nullptr},
    {"receiveFriends", nullptr, receiveFriends, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"rejectFriends", nullptr, rejectFriends, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"registerMessageCallback", nullptr, registerMessageCallback, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"registerGroupMessageCallback", nullptr, registerGroupMessageCallback, nullptr, nullptr, nullptr, napi_default,
     nullptr},
    {"registerMessageGroup", nullptr, registerMessageGroup, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"unregisterMessageCallback", nullptr, unregisterMessageCallback, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"unregisterGroupMessageCallback", nullptr, unregisterGroupMessageCallback, nullptr, nullptr, nullptr, napi_default,
     nullptr},
    {"unregisterInvitationListener", nullptr, unregisterInvitationListener, nullptr, nullptr, nullptr, napi_default,
     nullptr},
    {"unregisterMUCParticipantPresenceListener", nullptr, unregisterMUCParticipantPresenceListener, nullptr, nullptr,
     nullptr, napi_default, nullptr},
    {"unSubscriptionRequestListener", nullptr, unSubscriptionRequestListener, nullptr, nullptr, nullptr, napi_default,
     nullptr},
    {"registerNonrosterPresenceCallback", nullptr, registerNonrosterPresenceCallback, nullptr, nullptr, nullptr,
     napi_default, nullptr},
    {"unregisterNonrosterPresenceCallback", nullptr, unregisterNonrosterPresenceCallback, nullptr, nullptr, nullptr,
     napi_default, nullptr},
    {"getRole", nullptr, getRole, nullptr, nullptr, nullptr, napi_default, nullptr},
    {"getAffiliation", nullptr, getAffiliation, nullptr, nullptr, nullptr, napi_default, nullptr}};

EXTERN_C_START
static napi_value Init(napi_env env, napi_value exports)
{
    napi_define_properties(env, exports, sizeof(g_desc) / sizeof(g_desc[0]), g_desc);
    return exports;
}
EXTERN_C_END

static napi_module demoModule = {
    .nm_version = 1,
    .nm_flags = 0,
    .nm_filename = nullptr,
    .nm_register_func = Init,
    .nm_modname = "libhello",
    .nm_priv = ((void *)0),
    .reserved = {0},
};

extern "C" __attribute__((constructor)) void RegisterModule(void)
{
    napi_module_register(&demoModule);
}
