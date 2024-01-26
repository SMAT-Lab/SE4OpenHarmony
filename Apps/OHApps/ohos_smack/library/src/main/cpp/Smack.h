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

#ifndef OHOSXMPPCLIENT_SMACK_H
#define OHOSXMPPCLIENT_SMACK_H

#include <node_api.h>
#include <src/connectionlistener.h>
#include <src/loghandler.h>
#include <src/presencehandler.h>
#include <src/messagehandler.h>
#include <src/messagesessionhandler.h>
#include <src/client.h>
#include <src/chatstatehandler.h>
#include <src/messageeventhandler.h>
#include <src/chatstatefilter.h>
#include <src/registration.h>
#include <src/rostermanager.h>
#include <src/subscription.h>
#include <src/mucinvitationhandler.h>
#include <src/mucroom.h>
#include "src/messageeventfilter.h"
#include "MyMUCInvitationHandler.h"

class Smack : public gloox::PresenceHandler,
              public gloox::ConnectionListener,
              public gloox::LogHandler,
              public gloox::MessageHandler,
              public gloox::MessageEventHandler,
              public gloox::MessageSessionHandler,
              public gloox::ChatStateHandler,
              public gloox::RegistrationHandler,
              public gloox::RosterListener,
              public gloox::SubscriptionHandler {
public:
    Smack();
    int Login(const std::string &jidStr, const std::string &pwd);
    void RecvMsg(napi_env env, napi_value jsCb);
    void RecvSubscriptionRequestListener(napi_env env, napi_value jsCb);
    void RegisterNonrosterPresenceCallback(napi_env env, napi_value jsCb);
    void UnregisterMessageCallback();
    void UnSubscriptionRequestListener();
    void UnregisterNonrosterPresenceCallback();
    void Loop();
    void Loginout();
    void Send(const std::string &jidStr, const std::string &text);
    void ReceiveMsg(const std::string &jidStr, const std::string &msg);
    void RemoveAccounts();
    void ChangePasswords(const std::string &password);
    void AddFriends(const std::string &jidStr, const std::string &username, const std::string &group);
    void CreateGroup(const std::string &group);
    void Delfriends(const std::string &jidStr);
    std::string GetFriendList();
    void ChangeGroup(const std::string &oldGroup, const std::string &newGroup);

    void DeclineInvitation(const std::string &roomStr, const std::string &invitorStr, const std::string &reason);
    bool IsConnected();
    std::string Username();
    void SetUsernameAndPassword(std::string username, std::string pwd);
    void SetPort(int port);
    bool Connect();
    void SetServer(const std::string &server);
    void SetPassword(const std::string &password);
    std::string Password();
    std::string Resource();
    void SetResource(const std::string &resource);
    bool Login();
    void ReceiveFriends(const std::string &jidStr, const std::string &groupName, const std::string &hello);
    void RejectFriends(const std::string &jidStr, const std::string &reason);
    std::string Server();
    int Authed();
    int Port();
    int Compression();
    // 获取当前登录的JID
    gloox::JID &getMyJID();
    // 获取clent
    gloox::Client *getClent();
    MyMUCInvitationHandler *GetMUCInvitationHandler();

    // 变更用户状态
    void ChangePresence(const std::string &statusType, const std::string &status);
    void ChangeFriendGroup(const std::string &jidStr, const std::string &group);

    virtual void handlePresence(const gloox::Presence &presence);
    virtual void onConnect();
    virtual void onDisconnect(gloox::ConnectionError e);
    virtual void onResourceBind(const std::string &resource);
    virtual void onResourceBindError(const gloox::Error *error);
    virtual void onSessionCreateError(const gloox::Error *error);
    virtual bool onTLSConnect(const gloox::CertInfo &info);
    virtual void onStreamEvent(gloox::StreamEvent event);

    virtual void handleLog(gloox::LogLevel level, gloox::LogArea area, const std::string &message);
    virtual void handleMessage(const gloox::Message &msg, gloox::MessageSession *session = nullptr);
    virtual void handleMessageEvent(const gloox::JID &from, gloox::MessageEventType event);
    virtual void handleMessageSession(gloox::MessageSession *session);
    virtual void handleChatState(const gloox::JID &from, gloox::ChatStateType state);

    /****************账户管理***********************/
    virtual void handleRegistrationFields(const gloox::JID &from, int fields,
                                          std::string instructions);
    virtual void handleAlreadyRegistered(const gloox::JID &from);
    virtual void handleRegistrationResult(const gloox::JID &from, gloox::RegistrationResult regResult);
    virtual void handleDataForm(const gloox::JID &from, const gloox::DataForm &form);
    virtual void handleOOB(const gloox::JID &from, const gloox::OOB &oob);

    /****************用户管理***********************/
    virtual void handleItemAdded(const gloox::JID &jid);
    virtual void handleItemSubscribed(const gloox::JID &jid);
    virtual void handleItemRemoved(const gloox::JID &jid);
    virtual void handleItemUpdated(const gloox::JID &jid);
    virtual void handleItemUnsubscribed(const gloox::JID &jid);
    virtual void handleRoster(const gloox::Roster &roster);
    virtual void handleRosterPresence(const gloox::RosterItem &item, const std::string &resource,
                                      gloox::Presence::PresenceType presence, const std::string &msg);
    virtual void handleSelfPresence(const gloox::RosterItem &item, const std::string &resource,
                                    gloox::Presence::PresenceType presence, const std::string &msg);
    virtual bool handleSubscriptionRequest(const gloox::JID &jid, const std::string &msg);
    virtual bool handleUnsubscriptionRequest(const gloox::JID &jid, const std::string &msg);
    virtual void handleNonrosterPresence(const gloox::Presence &presence);
    virtual void handleRosterError(const gloox::IQ &iq);
    virtual void handleSubscription(const gloox::Subscription &subscription);

private:
    gloox::Client *j = nullptr;
    gloox::MessageSession *m_session = nullptr;
    gloox::MessageEventFilter *m_messageEventFilter = nullptr;
    gloox::ChatStateFilter *m_chatStateFilter = nullptr;
    gloox::JID m_jid;
    gloox::Registration *m_reg;
    int32_t presenceType = -1;
    std::string userName = "";
    MyMUCInvitationHandler *myMUCInvitationhandler = nullptr;
};
// 定义线程数据结构体
struct ThreadSafeInfoRecvMsg {
    std::string id;
    std::string msg;
    std::string type;
};

struct ThreadSafeInfoSub {
    std::string result;
};
#endif // ohosXmppClient_Smack_H
