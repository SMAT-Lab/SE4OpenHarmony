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

#ifndef OHOSXMPPCLIENT_REGISTRATION_H
#define OHOSXMPPCLIENT_REGISTRATION_H

#include <src/connectionlistener.h>
#include <src/loghandler.h>
#include <src/client.h>
#include <src/registration.h>

class registration : public gloox::ConnectionListener,
                     public gloox::LogHandler,
                     public gloox::RegistrationHandler {
public:
    int createAccounts(const std::string &ipStr, const std::string &nameStr, const std::string &pwdStr);
    virtual void onConnect();
    virtual void onDisconnect(gloox::ConnectionError e);
    virtual void onResourceBind(const std::string &resource);
    virtual void onResourceBindError(const gloox::Error *error);
    virtual void onSessionCreateError(const gloox::Error *error);
    virtual bool onTLSConnect(const gloox::CertInfo &info);
    virtual void onStreamEvent(gloox::StreamEvent event);

    virtual void handleLog(gloox::LogLevel level, gloox::LogArea area, const std::string &message);
    virtual void handleRegistrationFields(const gloox::JID &from, int fields, std::string instructions);
    virtual void handleAlreadyRegistered(const gloox::JID &from);
    virtual void handleRegistrationResult(const gloox::JID &from, gloox::RegistrationResult regResult);
    virtual void handleDataForm(const gloox::JID &from, const gloox::DataForm &form);
    virtual void handleOOB(const gloox::JID &from, const gloox::OOB &oob);

private:
    gloox::Client *j = nullptr;
    gloox::Registration *m_reg;
    std::string name = "";
    std::string pwd = "";
};

#endif // ohosXmppClient_registration_H