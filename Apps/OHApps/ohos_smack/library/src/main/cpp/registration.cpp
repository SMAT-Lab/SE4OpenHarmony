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

#include <thread>
#include <src/base64.h>
#include <src/message.h>
#include <unistd.h>
#include <ctime>

#include "gloox/src/disco.h"
#include "log.h"
#include "registration.h"

using namespace gloox;
constexpr int REG_DELAY_TM_40S = (5 * 1000 * 500); // 延时约40秒
/*
*  返回-1 表示注册失败
*  返回 1 表示注册成功
*/
int g_userRegState = -1;
static void DelayMsecs(int msec)
{
    clock_t now = clock();
    if (now > 0) {
        while (clock() - now < msec) {}
    }
}

int registration::createAccounts(const std::string &ipStr, const std::string &nameStr, const std::string &pwdStr)
{
    g_userRegState = -1;
    name = nameStr;
    pwd = pwdStr;
    j = new Client(ipStr);

    j->disableRoster();
    j->registerConnectionListener(this);

    m_reg = new Registration(j);
    m_reg->registerRegistrationHandler(this);

    j->logInstance().registerLogHandler(LogLevelDebug, LogAreaAll, this);
    j->disco()->setVersion("messageTest", GLOOX_VERSION, "OHOS");
    j->disco()->setIdentity("client", "bot");
    j->disco()->addFeature(XMLNS_CHAT_STATES);

    j->connect();
    DelayMsecs(REG_DELAY_TM_40S);

    return g_userRegState;
}

void registration::onConnect()
{
    LOGI("onConnect!!!\n");
    if (m_reg != nullptr)
        m_reg->fetchRegistrationFields();
}

void registration::onDisconnect(ConnectionError e)
{
    LOGI("onDisconnect: %d\n", e);
    if (e == ConnAuthenticationFailed)
        LOGD("auth failed. reason: %d\n", j->authError());
}

bool registration::onTLSConnect(const CertInfo &info)
{
    time_t from(info.date_from);
    time_t to(info.date_to);

    LOGI("onTLSConnect status: %d\nissuer: %s\npeer: %s\nprotocol: %s\nmac: %s\ncipher: %s\ncompression: %s\n"
         "from: %s\nto: %s\n",
         info.status, info.issuer.c_str(), info.server.c_str(),
         info.protocol.c_str(), info.mac.c_str(), info.cipher.c_str(),
         info.compression.c_str(), ctime(&from), ctime(&to));
    return true;
}

void registration::onResourceBind(const std::string &resource)
{
    LOGI("onResourceBind: %s", resource.c_str());
}

void registration::onResourceBindError(const Error *error)
{
    LOGI("onResourceBindError: %d\n", error);
}

void registration::onSessionCreateError(const Error *error)
{
    LOGI("onSessionCreateError: %d\n", error);
}

void registration::handleLog(LogLevel level, LogArea area, const std::string &message)
{
    LOGI("handleLog area: 0x%x, msg: %s", area, message.c_str());
}

void registration::onStreamEvent(StreamEvent event)
{
    LOGI("onStreamEvent");
}

void registration::handleRegistrationFields(const JID &from, int fields, std::string instructions)
{
    LOGI("handleRegistrationFields", "handleRegistrationFields fields: %d instructions: %s ,from %s", fields,
        instructions.c_str(), from.full().c_str());
    RegistrationFields vals;
    vals.username = name;
    vals.password = pwd;
    bool isRegSuc = m_reg->createAccount(fields, vals);
}

void registration::handleRegistrationResult(const JID & /* from */, RegistrationResult result)
{
    LOGI("handleRegistrationResult", "handleRegistrationResult result: %d", result);
    g_userRegState = result;
    j->disconnect();
}

void registration::handleAlreadyRegistered(const JID & /* from */)
{
    LOGI("handleAlreadyRegistered", "handleAlreadyRegistered the account already exists.\n");
}

void registration::handleDataForm(const JID & /* from */, const DataForm & /* form */)
{
    LOGI("handleDataForm datForm received\n");
}

void registration::handleOOB(const JID & /* from */, const OOB &oob)
{
    LOGI("handleOOB OOB registration requested. %s: %s\n", oob.desc().c_str(), oob.url().c_str());
}
