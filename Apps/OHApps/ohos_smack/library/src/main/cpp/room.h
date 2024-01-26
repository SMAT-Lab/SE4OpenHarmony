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
#include <src/client.h>
#include <src/connectionlistener.h>
#include <src/mucroomhandler.h>
#include <src/mucroom.h>
#include <src/disco.h>
#include <src/presence.h>
#include <src/message.h>
#include <src/dataform.h>
#include <src/gloox.h>
#include <src/lastactivity.h>
#include <src/loghandler.h>
#include <src/logsink.h>

struct RoomParams {
    std::string roomStr;
    std::string domain;
    std::string serviceName;
    std::string nick;
    std::string password;
};

class room : public gloox::MUCRoomHandler,
             public gloox::MUCRoomConfigHandler {
public:
    void Loop();

    // First batch completed
    void createRoom(gloox::ClientBase *client, const std::string &jid, const std::string &roomName,
        const std::string &domain, const std::string &serviceName);
    void recvGroupMsg(napi_env env, napi_value jsCb);
    void recvMUCParticipantPresenceListener(napi_env env, napi_value jsCb);
    void UnregisterGroupMessageCallback();
    void UnregisterMUCParticipantPresenceListener();
    void leave(const std::string &msg);
    void sendGroupMessage(const std::string &message);
    void setSubject(const std::string &subject);
    void Join();
    void destroy(const std::string &reason, const gloox::JID &alternate, const std::string &password);

    // Second batch completed
    void kick(const std::string &nick, const std::string &reason);
    void ban(const std::string &nick, const std::string &reason);
    void RequestVoice();
    void grantVoice(const std::string &nick, const std::string &reason);
    void grantVoices(const std::string &nicks, const std::string &reason);
    void revokeVoice(const std::string &nick, const std::string &reason);
    void revokeVoices(const std::string &nicks, const std::string &reason);

    // Third batch completed
    void setRole(const std::string &nick, const std::string &roleStr, const std::string &reason);
    void setRoles(const std::string &nick, const std::string &roleStr, const std::string &reason);
    void setAffiliation(const std::string &nick, const std::string &affiliationStr, const std::string &reason);
    void setPresence(const std::string &presenceStr, const std::string &msg);
    void invite(const gloox::JID &invitee, const std::string &reason);

    // fourth batch completed
    std::string requestRoomConfig();
    std::string requestList(const std::string &operationStr);
    std::string getRoomItems();
    std::string getRoomInfo();
    void setAffiliations(const std::string& nicks, std::string& affiliationStr, const std::string& reason);
    // fourth batch completed
    void setRoomConfig(const std::string &config);
    void createOrJoinRoom(gloox::ClientBase *client, const RoomParams &params);
    void setPassword(const std::string &password);
    void bans(const std::string &nicks, const std::string &reason);
    void setNick(const std::string &nick);
    std::string isJoined();
    std::string nick();
    std::string getAffiliation();
    std::string getRole();

    gloox::Message *createDataForm(const gloox::JID &room, const gloox::DataForm *df);
    const gloox::MUCListItemList &list();
    virtual void OnConnect();
    virtual void onDisconnect(gloox::ConnectionError e);
    virtual void onResourceBind(const std::string &resource);
    virtual void onResourceBindError(const gloox::Error *error);
    virtual void onSessionCreateError(const gloox::Error *error);
    virtual bool onTLSConnect(const gloox::CertInfo &info);
    virtual void onStreamEvent(gloox::StreamEvent event);
    virtual void handleLog(gloox::LogLevel level, gloox::LogArea area, const std::string &message);
    virtual void handleMUCParticipantPresence(gloox::MUCRoom * /* room */,
        const gloox::MUCRoomParticipant participant, const gloox::Presence &presence);
    virtual void handleMUCMessage(gloox::MUCRoom * /* room */, const gloox::Message &msg, bool priv);
    virtual void handleMUCSubject(gloox::MUCRoom * /* room */, const std::string &nick, const std::string &subject);
    virtual void handleMUCError(gloox::MUCRoom * /* room */, gloox::StanzaError error);
    virtual void handleMUCItems(gloox::MUCRoom * /* room */, const gloox::Disco::ItemList &items);
    virtual void handleMUCInviteDecline(gloox::MUCRoom * /* room */, const gloox::JID &invitee,
        const std::string &reason);
    virtual bool handleMUCRoomCreation(gloox::MUCRoom *room);
    virtual void handleMUCConfigList(gloox::MUCRoom *room, const gloox::MUCListItemList &items,
        gloox::MUCOperation operation);
    virtual void handleMUCConfigForm(gloox::MUCRoom *room, const gloox::DataForm &form);
    virtual void handleMUCConfigResult(gloox::MUCRoom *room, bool success, gloox::MUCOperation operation);
    virtual void handleMUCRequest(gloox::MUCRoom *room, const gloox::DataForm &form);
    virtual void handleMUCInfo(gloox::MUCRoom * /* room */, int features, const std::string &name,
        const gloox::DataForm *infoForm);

private:
    gloox::Client *j;
    gloox::MUCRoom *m_room;
    std::string room_config = "";
    std::string room_opr_list = "";
    std::string room_item_list = "";
    std::string room_info = "";
};

#endif // ohosXmppClient_room_H
