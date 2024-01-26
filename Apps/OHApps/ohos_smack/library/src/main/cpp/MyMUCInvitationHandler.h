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

#ifndef OHOSXMPPCLIENT_MYMUCINVITATIONHANDLER_H
#define OHOSXMPPCLIENT_MYMUCINVITATIONHANDLER_H

#include <node_api.h>
#include <src/mucinvitationhandler.h>
#include <src/clientbase.h>
#include <string>

class MyMUCInvitationHandler : public gloox::MUCInvitationHandler {
public:
    explicit MyMUCInvitationHandler(gloox::ClientBase *parent);
    /**
     * This function is called for incoming invitations to MUC rooms.
     * @param room The JID of the room you're being invited to.
     * @param from The JID of the inviter.
     * @param reason A reason for the invitation.
     * @param body The body of the message. May contain a MUC-service generated invitation message.
     * @param password Optionally, a password for the room.
     * @param cont Indicates whether or not the multi-user chat is a continuation of a private chat.
     * @param thread An optional thread identifier in case this is a
     * continued chat.
     */
    void recvMUCInvitation(napi_env env, napi_value jsCb);
    void UnregisterInvitationListener();
    virtual void handleMUCInvitation(const gloox::JID& room, const gloox::JID& from, const std::string& reason,
                                    const std::string& body, const std::string& password,
                                    bool cont, const std::string& thread);

private:
    gloox::ClientBase *clientBase;
};

#endif // ohosXmppClient_MyMUCInvitationHandler_H
