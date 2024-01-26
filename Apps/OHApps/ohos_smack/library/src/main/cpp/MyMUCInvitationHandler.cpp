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

#include <node_api.h>
#include "log.h"
#include "MyMUCInvitationHandler.h"

using namespace gloox;

struct ThreadSafeInfoMUCInvitation {
    std::string result;
};

static struct ThreadSafeInfoMUCInvitation g_threadInfoMUCInvitation = {};
static napi_threadsafe_function tsfn_invitation;

static void CallJs(napi_env env, napi_value jsCb, void *context, void *data)
{
    LOGI("SMACK_TAG--------->MyMUCInvitationHandler CallJs0: %s:  %d", "CallJs: ", __LINE__);
    napi_value undefined;
    napi_value ret;
    napi_value argv;

    ThreadSafeInfoMUCInvitation *arg = (struct ThreadSafeInfoMUCInvitation *)data;
    if (arg == nullptr) {
        LOGE("SMACK_TAG---------> [MyMUC....CallJs]arg is null");
        return;
    }
    LOGI("SMACK_TAG--------->MyMUCInvitationHandler CallJs2: %s:  %d", (arg->result).c_str(), __LINE__);
    napi_create_string_utf8(env, (arg->result).c_str(), NAPI_AUTO_LENGTH, &argv);
    LOGI("SMACK_TAG--------->CallJs4: %s:  %d", "CallJs: ", __LINE__);

    napi_status status = napi_call_function(env, undefined, jsCb, 1, &argv, &ret);
    LOGI("SMACK_TAG--------->MyMUCInvitationHandler CallJs5: %d:  %d", status, __LINE__);
}

void MyMUCInvitationHandler::recvMUCInvitation(napi_env env, napi_value jsCb)
{
    napi_value workName;
    napi_create_string_utf8(env, "recvMUCInvitation", NAPI_AUTO_LENGTH, &workName);
    LOGI("SMACK_TAG--------->: %s:  %d", "recvMUCInvitation: ", __LINE__);
    napi_create_threadsafe_function(env, jsCb, nullptr, workName, 0, 1, nullptr, nullptr, nullptr, CallJs,
                                    &tsfn_invitation);
    LOGI("SMACK_TAG--------->: %s:  %d", "recvMUCInvitation: ", __LINE__);
}

void MyMUCInvitationHandler::UnregisterInvitationListener()
{
    LOGI("SMACK_TAG------------>: %s:  %d", "unregisterInvitationListener: ", __LINE__);
    tsfn_invitation = nullptr;
}

void MyMUCInvitationHandler::handleMUCInvitation(const JID &room, const JID &from, const std::string &reason,
                                                 const std::string &body, const std::string &password, bool cont,
                                                 const std::string &thread)
{
    if (tsfn_invitation == nullptr) {
        LOGE("smack handleMUCInvitation  %s:  %d", "handleMUCInvitation return  ", __LINE__);
        return;
    }
    LOGI("smack handleMUCInvitation  %s:  %d", "handleMUCInvitation work  ", __LINE__);

    std::string jsonStr;
    jsonStr.append("{");
    jsonStr.append("\"room\":\"");
    jsonStr.append(room.full().c_str());
    jsonStr.append("\",");
    jsonStr.append("\"from\":\"");
    jsonStr.append(from.full().c_str());
    jsonStr.append("\",");
    jsonStr.append("\"reason\":\"");
    jsonStr.append(reason.c_str());
    jsonStr.append("\",");
    jsonStr.append("\"body\":\"");
    jsonStr.append(body.c_str());
    jsonStr.append("\",");
    jsonStr.append("\"password\":\"");
    jsonStr.append(password.c_str());
    jsonStr.append("\",");
    jsonStr.append("\"cont\":\"");
    jsonStr.append("");
    jsonStr.append("\",");
    jsonStr.append("\"thread\":\"");
    jsonStr.append(thread.c_str());

    jsonStr.append("\"");
    jsonStr.append("}");

    ThreadSafeInfoMUCInvitation *data = &g_threadInfoMUCInvitation;
    if (data == nullptr) {
        LOGE("SMACK_TAG---------> [MyMUC....handleMUCInvitation]data is null");
        return;
    }
    data->result = jsonStr.c_str();
    napi_acquire_threadsafe_function(tsfn_invitation);

    napi_call_threadsafe_function(tsfn_invitation, data, napi_tsfn_blocking);
    LOGI("SMACK_TAG--------->: %s:  %d", "handleMUCInvitation: ", __LINE__);
}

MyMUCInvitationHandler::MyMUCInvitationHandler(ClientBase *parent) : MUCInvitationHandler(parent)
{
    if (parent == nullptr) {
        LOGE("SMACK_TAG---------> [MyMUC.....MyMUCInvitationHandler]parent is null");
        return;
    }
    clientBase = parent;
}
