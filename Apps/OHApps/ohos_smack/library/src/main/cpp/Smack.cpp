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
#include <thread>
#include <src/base64.h>
#include <src/message.h>
#include <unistd.h>
#include <ctime>
#include <node_api.h>
#include "gloox/src/disco.h"
#include "src/gloox.h"
#include "src/macros.h"
#include "log.h"
#include "Smack.h"

static constexpr const int PRESENCE_DATA = 50;
static constexpr const int SMACK_DELAY_TM_5S = (5 * 1000 * 60); // 延时5秒
static constexpr const int SMACK_DELAY_TM_40S = (5 * 1000 * 500); // 延时约40秒
static constexpr const size_t CALL_JS_ARGV_SIZE = 3;
static constexpr const int CALL_JS_ARGV_SIZE_INDEX2 = 2;

using namespace gloox;
/**
 *
 * @param jidStr 当前登陆用的地址 例如：user@10.50.40.65/gloox
 * @param pwd  当前用户的登陆密码
 *
 * 注：当前的返回值没有添加
 *  返回-1 表示登陆失败
 *  返回 1 表示登陆成功
 */
int g_userState = -1;
static void DelayMsec(int msec)
{
    clock_t now = clock();
    if (now > 0) {
        while (clock() - now < msec) {}
    }
}

Smack::Smack()
{
    j = new Client("");
};

bool Smack::Connect()
{
    if (userName == "" || userName.empty()) {
        throw std::runtime_error("userName empty,set userName!!!");
    }
    std::string server = j->server();
    if (server == "" || server.empty()) {
        throw std::runtime_error("server empty,set server!!!");
    }
    std::string resource = j->resource();
    if (resource.empty()) {
        throw std::runtime_error("resource empty,set resource!!!");
    }
    JID jids(userName + "@" + server + "/" + resource);
    j->setJID(jids);
    j->registerConnectionListener(this);

    j->logInstance().registerLogHandler(LogLevelDebug, LogAreaAll, this);
    if (j->connect(false)) {
    }
    return IsConnected();
}

bool Smack::IsConnected()
{
    ConnectionState state = j->state();
    return state >= StateConnected;
}

std::string Smack::Username()
{
    return j->username();
}

void Smack::SetServer(const std::string &server)
{
    j->setServer(server);
}

void Smack::SetUsernameAndPassword(std::string username, std::string pwd)
{
    userName = username;
    SetPassword(pwd);
}

void Smack::SetPassword(const std::string &password)
{
    j->setPassword(password);
}

void Smack::SetPort(int port)
{
    j->setPort(port);
}

std::string Smack::Password()
{
    return j->password();
}

std::string Smack::Resource()
{
    return j->resource();
}

void Smack::SetResource(const std::string &resource)
{
    j->setResource(resource);
}

JID &Smack::getMyJID()
{
    return m_jid;
}

Client *Smack::getClent()
{
    return j;
}

MyMUCInvitationHandler *Smack::GetMUCInvitationHandler()
{
    return myMUCInvitationhandler;
}

bool Smack::Login()
{
    // Registration
    m_reg = new Registration(j);
    m_reg->registerRegistrationHandler(this);

    myMUCInvitationhandler = new MyMUCInvitationHandler(j);
    // 注册房间邀请监听
    j->registerMUCInvitationHandler(myMUCInvitationhandler);
    // rosterManager
    j->rosterManager()->registerRosterListener(this);
    j->registerSubscriptionHandler(this);
    j->registerPresenceHandler(this);
    j->registerMessageHandler(this);
    j->registerMessageSessionHandler(this, 0);
    j->disco()->setVersion("messageTest", GLOOX_VERSION, "OHOS");
    j->disco()->setIdentity("client", "bot");
    j->disco()->addFeature(XMLNS_CHAT_STATES);

    {
        std::thread t1(&Smack::Loop, this);
        t1.detach();
    }

    DelayMsec(SMACK_DELAY_TM_5S); // 延时5秒
    return presenceType == 0;
}

std::string Smack::Server()
{
    return j->server();
}

int Smack::Authed()
{
    return j->authed() ? 1 : 0;
}

int Smack::Port()
{
    return j->port();
}

int Smack::Compression()
{
    return j->compression() ? 1 : 0;
}

// NonrosterPresence 房间销毁回调数据
struct ThreadSafeInfoNonrosterPresence {
    std::string from;
    std::string to;
    std::string presence;
};

// 实例化结构体
static struct ThreadSafeInfoRecvMsg g_threadInfoRecvMsg = {};
static struct ThreadSafeInfoSub g_threadInfoSub = {};
static struct ThreadSafeInfoNonrosterPresence g_threadInfoNonrosterPresence = {};
static napi_threadsafe_function tsfn_recv_msg;
static napi_threadsafe_function tsfn_sub;
static napi_threadsafe_function tsfn_nonroster_presence;

static void CallJs(napi_env env, napi_value jsCb, void *context, void *data)
{
    LOGI("SMACK_TAG--------->smack CallJs0: %s:  %d", "CallJs: ", __LINE__);
    napi_value undefined;
    napi_value ret;
    
    napi_value argv[] = {nullptr, nullptr, nullptr};

    // 解析参数 data
    ThreadSafeInfoRecvMsg *arg = (ThreadSafeInfoRecvMsg *)data;
    if (arg == nullptr) {
        LOGE("SMACK_TAG---------> [Smack.CallJs]arg is null");
        return;
    }
    LOGI("SMACK_TAG---------> smack CallJs1: %s:  %d", (arg->id).c_str(), __LINE__);
    LOGI("SMACK_TAG---------> smack CallJs2: %s:  %d", (arg->msg).c_str(), __LINE__);
    napi_create_string_utf8(env, (arg->id).c_str(), NAPI_AUTO_LENGTH, &argv[0]);
    LOGI("SMACK_TAG---------> smack CallJs3: %s:  %d", "CallJs: ", __LINE__);
    napi_create_string_utf8(env, (arg->msg).c_str(), NAPI_AUTO_LENGTH, &argv[1]);
    LOGI("SMACK_TAG---------> smack CallJs4: %s:  %d", "CallJs: ", __LINE__);
    napi_create_string_utf8(env, (arg->type).c_str(), NAPI_AUTO_LENGTH, &argv[CALL_JS_ARGV_SIZE_INDEX2]);
    LOGI("SMACK_TAG------------> smack CallJs4: %s:  %d", "CallJs: ", __LINE__);
    // 调用 js 回调函数
    napi_status status;
    if (jsCb != nullptr && argv != nullptr) {
        LOGI("SMACK_TAG---------> smack CallJs4: %s:  %d", "CallJs 1 ", __LINE__);
        status = napi_call_function(env, undefined, jsCb, CALL_JS_ARGV_SIZE, argv, &ret);
        LOGI("SMACK_TAG---------> smack CallJs4: %s:  %d", "CallJs 2 ", __LINE__);
    }
    LOGI("SMACK_TAG---------> smack CallJs5: %d:  %d", status, __LINE__);
}

static void CallJs_Sub(napi_env env, napi_value jsCb, void *context, void *data)
{
    LOGI("SMACK_TAG---------> smack CallJs_Sub: %s:  %d", "CallJs: ", __LINE__);
    napi_value undefined;
    napi_value ret;
    napi_value argv;

    // 解析参数 data
    ThreadSafeInfoSub *arg = (ThreadSafeInfoSub *)data;
    if (arg == nullptr) {
        LOGE("SMACK_TAG---------> [Smack.CallJs_Sub]arg is null");
        return;
    }
    napi_create_string_utf8(env, (arg->result).c_str(), NAPI_AUTO_LENGTH, &argv);
    LOGI("SMACK_TAG---------> smack CallJs_Sub: %s:  %d", "CallJs_Sub: ", __LINE__);
    // 调用 js 回调函数
    napi_status status;
    if (jsCb != nullptr && argv != nullptr) {
        LOGI("SMACK_TAG---------> smack CallJs_Sub: %s:  %d", "CallJs_Sub 1 ", __LINE__);
        status = napi_call_function(env, undefined, jsCb, 1, &argv, &ret);
        LOGI("SMACK_TAG---------> smack CallJs_Sub: %s:  %d", "CallJs_Sub 2 ", __LINE__);
    }
    
    LOGI("SMACK_TAG---------> smack CallJs_Sub: %d:  %d", status, __LINE__);
}

void Smack::RecvMsg(napi_env env, napi_value jsCb)
{
    napi_value workName;
    napi_create_string_utf8(env, "recvMsg", NAPI_AUTO_LENGTH, &workName);
    LOGI("SMACK_TAG--------->: %s:  %d", "recvMsg: ", __LINE__);
    napi_create_threadsafe_function(env, jsCb, nullptr, workName, 0, 1, nullptr, nullptr, nullptr,
        CallJs, &tsfn_recv_msg);
    LOGI("SMACK_TAG--------->: %s:  %d", "recvMsg: ", __LINE__);
}

void Smack::RecvSubscriptionRequestListener(napi_env env, napi_value jsCb)
{
    napi_value workName;
    napi_create_string_utf8(env, "recvSubscriptionRequestListener", NAPI_AUTO_LENGTH, &workName);
    LOGI("SMACK_TAG--------->: %s:  %d", "recvSubscriptionRequestListener: ", __LINE__);
    napi_create_threadsafe_function(env, jsCb, nullptr, workName, 0, 1, nullptr, nullptr, nullptr,
                                    CallJs_Sub, &tsfn_sub);
    LOGI("SMACK_TAG--------->: %s:  %d", "recvSubscriptionRequestListener: ", __LINE__);
}

static void CallJsNonrosterPresence(napi_env env, napi_value jsCb, void *context, void *data)
{
    LOGI("SMACK_TAG------------> smack CallJs_Sub: %s:  %d", "CallJs: ", __LINE__);
    napi_value undefined;
    napi_value ret;
    napi_value argv[] = {nullptr, nullptr, nullptr};

    // 解析参数 data
    ThreadSafeInfoNonrosterPresence *arg = (ThreadSafeInfoNonrosterPresence *)data;
    LOGI("SMACK_TAG------------> smack CallJsNonrosterPresence: %s:  %d", (arg->from).c_str(), __LINE__);
    napi_create_string_utf8(env, (arg->from).c_str(), NAPI_AUTO_LENGTH, &argv[0]);
    LOGI("SMACK_TAG------------> smack CallJsNonrosterPresence: %s:  %d", (arg->to).c_str(), __LINE__);
    napi_create_string_utf8(env, (arg->to).c_str(), NAPI_AUTO_LENGTH, &argv[1]);
    LOGI("SMACK_TAG------------> smack CallJsNonrosterPresence: %s:  %d", (arg->presence).c_str(), __LINE__);
    napi_create_string_utf8(env, (arg->presence).c_str(), NAPI_AUTO_LENGTH, &argv[CALL_JS_ARGV_SIZE_INDEX2]);
    LOGI("SMACK_TAG------------> smack CallJsNonrosterPresence: %s:  %d", "CallJsNonrosterPresence: ", __LINE__);
    // 调用 js 回调函数
    napi_status status = napi_call_function(env, undefined, jsCb, 3, argv, &ret);
    LOGI("SMACK_TAG------------> smack CallJsNonrosterPresence: %d:  %d", status, __LINE__);
}


void Smack::RegisterNonrosterPresenceCallback(napi_env env, napi_value jsCb)
{
    napi_value workName;
    napi_create_string_utf8(env, "registerNonrosterPresenceCallback", NAPI_AUTO_LENGTH, &workName);
    LOGI("SMACK_TAG------------>: %s:  %d", "registerNonrosterPresenceCallback: ", __LINE__);
    napi_create_threadsafe_function(env, jsCb, nullptr, workName, 0, 1, nullptr, nullptr, nullptr,
                                    CallJsNonrosterPresence, &tsfn_nonroster_presence);
    LOGI("SMACK_TAG------------>: %s:  %d", "registerNonrosterPresenceCallback: ", __LINE__);
}

void Smack::UnregisterMessageCallback()
{
    LOGI("SMACK_TAG------------>: %s:  %d", "unregisterMessageCallback ", __LINE__);
    tsfn_recv_msg = nullptr;
}

void Smack::UnSubscriptionRequestListener()
{
    LOGI("SMACK_TAG------------>: %s:  %d", "unSubscriptionRequestListener ", __LINE__);
    tsfn_sub = nullptr;
}

void Smack::UnregisterNonrosterPresenceCallback()
{
    LOGI("SMACK_TAG------------>: %s:  %d", "unregisterNonrosterPresenceCallback ", __LINE__);
    tsfn_nonroster_presence = nullptr;
}

int Smack::Login(const std::string &jidStr, const std::string &pwd)
{
    g_userState = -1;

    JID jid(jidStr);
    m_jid = jid;
    j = new Client(jid, pwd);

    j->registerConnectionListener(this);
    // Registration
    m_reg = new Registration(j);
    m_reg->registerRegistrationHandler(this);

    myMUCInvitationhandler = new MyMUCInvitationHandler(j);
    // 注册房间邀请监听
    j->registerMUCInvitationHandler(myMUCInvitationhandler);
    // rosterManager
    j->rosterManager()->registerRosterListener(this);
    j->registerSubscriptionHandler(this);
    j->registerPresenceHandler(this);
    j->registerMessageHandler(this);
    j->registerMessageSessionHandler(this, 0);
    j->logInstance().registerLogHandler(LogLevelDebug, LogAreaAll, this);
    j->disco()->setVersion("messageTest", GLOOX_VERSION, "OHOS");
    j->disco()->setIdentity("client", "bot");
    j->disco()->addFeature(XMLNS_CHAT_STATES);

    bool value = j->connect(false);
    if (value) {
        std::thread t1(&Smack::Loop, this);
        t1.detach();
    }
    DelayMsec(SMACK_DELAY_TM_40S);

    return g_userState;
}

/**
 * 修改用户状态
 * @param pres
 * @param priority
 * @param status
 */
void Smack::ChangePresence(const std::string &statusType, const std::string &status)
{
    if (statusType.compare("0") == 0) {
        j->setPresence(Presence::PresenceType::Chat, PRESENCE_DATA, status);
    } else if (statusType.compare("1") == 0) {
        j->setPresence(Presence::PresenceType::Available, PRESENCE_DATA, status);
    } else if (statusType.compare("2") == 0) {
        j->setPresence(Presence::PresenceType::Away, PRESENCE_DATA, status);
    } else if (statusType.compare("3") == 0) {
        j->setPresence(Presence::PresenceType::XA, PRESENCE_DATA, status);
    } else if (statusType.compare("4") == 0) {
        j->setPresence(Presence::PresenceType::DND, PRESENCE_DATA, status);
    }
}

/**
 * 获取好友以及分组信息
 * @param jidStr
 */
std::string Smack::GetFriendList()
{
    RosterManager *rosterManager = j->rosterManager();
    if (rosterManager == nullptr) {
        LOGE("SMACK_TAG---------> [Smack.GetFriendList]rosterManager is null");
        return NULL;
    }
    Roster *roster = rosterManager->roster();
    if (roster == nullptr) {
        LOGE("SMACK_TAG---------> [Smack.GetFriendList]roster is null");
        return NULL;
    }
    Roster::const_iterator it = roster->begin();
    std::string name;
    name.append("[");
    for (; it != roster->end(); ++it) {
        name.append("{");
        name.append("\"jid\":");
        name.append("\"");
        name.append((*it).second->jidJID().full().c_str());
        name.append("\"");
        name.append(",\"name\":");
        name.append("\"");
        name.append((*it).second->name().c_str());
        name.append("\"");

        StringList g = (*it).second->groups();
        StringList::const_iterator it_g = g.begin();
        for (; it_g != g.end(); ++it_g) {
            name.append(",\"group\":");
            name.append("\"");
            name.append((*it_g).c_str());
            name.append("\"");
        }
        name.append("},");
        RosterItem::ResourceMap::const_iterator rit = (*it).second->resources().begin();
    }
    name.append("]");
    return name.c_str();
}

/**
 * 用户注销 接口
 * 无返回值
 */
void Smack ::Loginout()
{
    j->disconnect();
}

void Smack::ReceiveMsg(const std::string &jidStr, const std::string &msg) {}

void Smack::ChangePasswords(const std::string &password)
{
    m_reg->changePassword(j->username(), password);
}

void Smack::Loop()
{
    ConnectionError ce = ConnNoError;
    while (ce == ConnNoError) {
        ce = j->recv();
    }
}

/**
 * 消息发送 接口
 * @param jidStr  指定的用户地址 例如 ：user@he-202101111234/HE-202101111234   拼接规则 用户名称 + 主机名称 +随便加
 * @param text   需要发送的消息
 *
 * 无返回值
 */
void Smack::Send(const std::string &jidStr, const std::string &text)
{
    JID to(jidStr);
    Message msg(Message::MessageType::Chat, to, text);
    j->send(msg);
}

/**
 * 添加好友到指定分组
 * @param jidStr
 * @param username
 * @param group
 * @return
 */
void Smack::AddFriends(const std::string &jidStr, const std::string &username, const std::string &group)
{
    RosterManager *rosterManager = j->rosterManager();
    if (rosterManager == nullptr) {
        LOGE("SMACK_TAG---------> [Smack.AddFriends]rosterManager is null");
        return;
    }
    StringList gl;
    gl.clear();
    gl.push_back(group);
    JID jid(jidStr);
    rosterManager->subscribe(JID(jidStr), username, gl);
}

/**
 * 删除好友
 * @param jidStr
 */
void Smack::Delfriends(const std::string &jidStr)
{
    RosterManager *rosterManager = j->rosterManager();
    if (rosterManager == nullptr) {
        LOGE("SMACK_TAG---------> [Smack.Delfriends]rosterManager is null");
        return;
    }
    rosterManager->fill();
    JID jid(jidStr);
    rosterManager->remove(jid);
}

void Smack::ChangeFriendGroup(const std::string &jidStr, const std::string &group)
{
    RosterManager *rosterManager = j->rosterManager();
    if (rosterManager == nullptr) {
        LOGE("SMACK_TAG---------> [Smack.ChangeFriendGroup]rosterManager is null");
        return;
    }
    StringList gl;
    gl.clear();
    gl.push_back(group);
    JID jid(jidStr);
    rosterManager->add(jid, jid.username(), gl);
    rosterManager->fill();
}

void Smack::ChangeGroup(const std::string &oldGroup, const std::string &newGroup)
{
    RosterManager *rosterManager = j->rosterManager();
    if (rosterManager == nullptr) {
        LOGE("SMACK_TAG---------> [Smack.ChangeGroup]rosterManager is null");
        return;
    }
    Roster *roster = rosterManager->roster();
    if (roster == nullptr) {
        LOGE("SMACK_TAG---------> [Smack.ChangeGroup]roster is null");
        return;
    }
    Roster::const_iterator it = roster->begin();

    StringList gl;
    gl.clear();
    gl.push_back(newGroup);
    for (; it != roster->end(); ++it) {
        StringList g = (*it).second->groups();
        StringList::const_iterator it_g = g.begin();
        for (; it_g != g.end(); ++it_g) {
            if ((*it_g).compare(oldGroup) == 0) {
                rosterManager->add((*it).second->jidJID(), (*it).second->name().c_str(), gl);
            }
        }
        RosterItem::ResourceMap::const_iterator rit = (*it).second->resources().begin();
    }
}

/**
 * 创建分组
 * @param group
 */
void Smack::CreateGroup(const std::string &group)
{
    RosterManager *rosterManager = j->rosterManager();
    if (rosterManager == nullptr) {
        LOGE("SMACK_TAG---------> [Smack.CreateGroup]rosterManager is null");
        return;
    }
    rosterManager->fill();
    RosterItem *m_self = new RosterItem(j->jid().bare());

    StringList gl;
    gl.clear();
    gl.push_back(group);
    m_self->setGroups(gl);
}

void Smack::RemoveAccounts()
{
    m_reg->removeAccount();
}

void Smack::onConnect()
{
    LOGI("onConnect!!!\n");
}

void Smack::onDisconnect(ConnectionError e)
{
    LOGI("onDisconnect: %d\n", e);
    if (e == ConnAuthenticationFailed)
        LOGD("auth failed. reason: %d\n", j->authError());
}

bool Smack::onTLSConnect(const CertInfo &info)
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

void Smack::onResourceBind(const std::string &resource)
{
    LOGI("onResourceBind: %s", resource.c_str());
}

void Smack::onResourceBindError(const Error *error)
{
    LOGI("onResourceBindError: %d\n", error);
}

void Smack::onSessionCreateError(const Error *error)
{
    LOGI("onSessionCreateError: %d\n", error);
}

void Smack::handleLog(LogLevel level, LogArea area, const std::string &message)
{
    LOGI("handleLog area: 0x%x, msg: %s", area, message.c_str());
}

void Smack::handleMessage(const Message &msg, MessageSession *session)
{
    auto body = msg.body();
    LOGI("SMACK_TAG--------->: %s:  %d", msg.from().full().c_str(),  __LINE__);
    auto type = msg.subtype();
    LOGI("SMACK_TAG------------>:handleMessage type %d:|  %d", type, __LINE__);
    ThreadSafeInfoRecvMsg *data = &g_threadInfoRecvMsg;
    if (data == nullptr) {
        LOGE("SMACK_TAG---------> [Smack.handleMessage]data is null");
        return;
    }

    data->id = msg.from().full().c_str();
    data->msg = body.c_str();

    std::string message;
    switch (type) {
        case gloox::Message::MessageType::Chat: // Chat
            message.append("1");
            break;
        case gloox::Message::MessageType::Error: // Error
            message.append("2");
            break;
        case gloox::Message::MessageType::Groupchat: // Groupchat
            message.append("4");
            break;
        case gloox::Message::MessageType::Headline: // Headline
            message.append("8");
            break;
        case gloox::Message::MessageType::Normal: // Normal
            message.append("16");
            break;
        case gloox::Message::MessageType::Invalid: // Invalid
            message.append("32");
            break;
        default:
            message.append("0");
    }
    
    data->type = message.c_str();
    LOGI("SMACK_TAG------------>: handleMessage %s:  %d", data->type.c_str(), __LINE__);

    LOGI("SMACK_TAG------------>: handleMessage %s:  %d", (data->msg).c_str(), __LINE__);
    napi_acquire_threadsafe_function(tsfn_recv_msg);
    LOGI("SMACK_TAG--------->: %s:  %d", "handleMessage: ", __LINE__);
    // 调用主线程函数，传入 Data
    napi_call_threadsafe_function(tsfn_recv_msg, data, napi_tsfn_blocking);
    LOGI("SMACK_TAG--------->: %s:  %d", "handleMessage: ", __LINE__);
}

void Smack::handleMessageEvent(const JID &from, MessageEventType event)
{
    LOGI("received event: %d from: %s\n", event, from.full().c_str());
}

void Smack::handleChatState(const JID &from, ChatStateType state)
{
    LOGI("received state: %d from: %s\n", state, from.full().c_str());
}

void Smack::handleMessageSession(MessageSession *session)
{
    if (session == nullptr) {
        LOGE("SMACK_TAG---------> [Smack.handleMessageSession]session is null");
        return;
    }
    LOGI("got new session");
    j->disposeMessageSession(m_session);
    m_session = session;
    m_session->registerMessageHandler(this);
    m_messageEventFilter = new MessageEventFilter(m_session);
    m_messageEventFilter->registerMessageEventHandler(this);
    m_chatStateFilter = new ChatStateFilter(m_session);
    m_chatStateFilter->registerChatStateHandler(this);
}

void Smack::DeclineInvitation(const std::string &roomStr, const std::string &invitorStr, const std::string &reason)
{
    LOGD("smark declineInvitation roomStr: %s, invitorStr: %s, reason: %s",
        roomStr.c_str(), invitorStr.c_str(), reason.c_str());
    JID room(roomStr);
    JID invitor(invitorStr);
    Message *msg = MUCRoom::declineInvitation(room, invitor, reason);
    if (msg == nullptr) {
        LOGE("SMACK_TAG---------> [Smack.DeclineInvitation]data is null");
        return;
    }
    LOGD("smark declineInvitation result msg:%s", msg->tag()->xml().c_str());

    Tag *tag = msg->tag();
    j->send(tag);
}

void Smack::onStreamEvent(StreamEvent event)
{
    LOGI("onStreamEvent");
}

void Smack::handlePresence(const Presence &presence)
{
    g_userState = 1;
    LOGI("handlePresence roster: %s state: %d", presence.from().full().c_str(), presence.presence());
    presenceType = presence.presence();
}

/****************账户管理开始***********************/
void Smack::handleRegistrationFields(const JID &from, int fields, std::string instructions)
{
    LOGI("handleRegistrationFields fields: %d instructions: %s ", fields, instructions.c_str());
}

void Smack::handleRegistrationResult(const JID & /* from */, RegistrationResult result)
{
    LOGI("result: %d\n", result);
}

void Smack::handleAlreadyRegistered(const JID & /* from */)
{
    LOGI("handleAlreadyRegistered the account already exists.\n");
}

void Smack::handleDataForm(const JID & /* from */, const DataForm & /* form */)
{
    LOGI("handleDataForm datForm received\n");
}

void Smack::handleOOB(const JID & /* from */, const OOB &oob)
{
    LOGI("handleOOB OOB registration requested. %s: %s\n", oob.desc().c_str(), oob.url().c_str());
}

/****************用户管理开始***********************/
void Smack::handleItemSubscribed(const JID &jid)
{
    LOGI("handleItemSubscribed subscribed %s\n", jid.bare().c_str());
}

void Smack::handleItemAdded(const JID &jid)
{
    LOGI("handleItemAdded added %s\n", jid.bare().c_str());
}

void Smack::handleItemUnsubscribed(const JID &jid)
{
    LOGI("handleItemUnsubscribed unsubscribed %s\n", jid.bare().c_str());
}

void Smack::handleItemRemoved(const JID &jid)
{
    LOGI("handleItemRemoved removed %s\n", jid.bare().c_str());
}

void Smack::handleItemUpdated(const JID &jid)
{
    LOGI("handleItemUpdated updated %s\n", jid.bare().c_str());
}

void Smack::handleRoster(const Roster &roster)
{
    LOGI("roster arriving    \nitems:\n");
    Roster::const_iterator it = roster.begin();
    for (; it != roster.end(); ++it) {
        LOGI("roster arriving jid: %s, name: %s, subscription: %d\n",
             (*it).second->jidJID().full().c_str(), (*it).second->name().c_str(),
             (*it).second->subscription());
        StringList g = (*it).second->groups();
        StringList::const_iterator it_g = g.begin();
        for (; it_g != g.end(); ++it_g) {
            LOGI("\t roster arriving group: %s\n", (*it_g).c_str());
        }
        RosterItem::ResourceMap::const_iterator rit = (*it).second->resources().begin();
        for (; rit != (*it).second->resources().end(); ++rit) {
            LOGI("roster arriving resource: %s\n", (*rit).first.c_str());
        }
    }
}

void Smack::handleRosterError(const IQ &)
{
    LOGI("a roster-related error occured\n");
}

void Smack::handleRosterPresence(const RosterItem &item, const std::string &resource,
                                 Presence::PresenceType presence, const std::string & /* msg */)
{
    LOGI("handleRosterPresence received: %s/%s -- %d\n", item.jidJID().full().c_str(), resource.c_str(), presence);
}

void Smack::handleSelfPresence(const RosterItem &item, const std::string &resource,
                               Presence::PresenceType presence, const std::string & /* msg */)
{
    LOGI("handleSelfPresence received: %s/%s -- %d\n", item.jidJID().full().c_str(), resource.c_str(), presence);
}

bool Smack::handleSubscriptionRequest(const JID &jid, const std::string &msg)
{
    LOGI("smack handleSubscriptionRequest jid:%s msg:%s  %d", jid.full().c_str(), msg.c_str(), __LINE__);

    if (tsfn_sub == nullptr) {
        LOGI("smack handleSubscriptionRequest  %s:  %d", "handleSubscriptionRequest return  ", __LINE__);
        return true;
    }
    LOGI("smack handleSubscriptionRequest  %s:  %d", "handleSubscriptionRequest work  ", __LINE__);

    std::string resultStr = "";
    resultStr.append("{");
    resultStr.append("\"jid\":");
    resultStr.append("\"");
    resultStr.append(jid.bare().c_str());
    resultStr.append("\"");
    resultStr.append(",\"name\":");
    resultStr.append("\"");
    resultStr.append(jid.username().c_str());
    resultStr.append("\"");
    resultStr.append(",\"msg\":");
    resultStr.append("\"");
    resultStr.append(msg.c_str());
    resultStr.append("\"");
    resultStr.append("}");
    ThreadSafeInfoSub *data = &g_threadInfoSub;
    if (data == nullptr) {
        LOGE("SMACK_TAG---------> [Smack.handleSubscriptionRequest]data is null");
        return false;
    }
    data->result = resultStr.c_str();
    LOGI("SMACK_TAG--------->: %s:  %d", "handleSubscriptionRequest: ", __LINE__);
    napi_acquire_threadsafe_function(tsfn_sub);
    LOGI("SMACK_TAG--------->: %s:  %d", "handleSubscriptionRequest: ", __LINE__);
    // 调用主线程函数，传入 Data
    napi_call_threadsafe_function(tsfn_sub, data, napi_tsfn_blocking);
    LOGI("SMACK_TAG--------->: %s:  %d", "handleSubscriptionRequest: ", __LINE__);
    return true;
}

void Smack::ReceiveFriends(const std::string &jidStr, const std::string &groupName,
    const std::string &hello = EmptyString)
{
    JID jid(jidStr);
    StringList groups;

    groups.clear();
    RosterManager *rosterManager = j->rosterManager();
    if (rosterManager == nullptr) {
        LOGE("SMACK_TAG---------> [Smack.ReceiveFriends]rosterManager is null");
        return;
    }
    Roster *roster = rosterManager->roster();
    if (roster == nullptr) {
        LOGE("SMACK_TAG---------> [Smack.ReceiveFriends]roster is null");
        return;
    }
    Roster::const_iterator it = roster->begin();

    bool has = false;
    for (; it != roster->end(); ++it) {
        std::string fjid = (*it).second->jidJID().full();
        int result = fjid.compare(jid.full());
        if (result == 0) {
            StringList g = (*it).second->groups();
            StringList::const_iterator it_g = g.begin();
            for (; it_g != g.end(); ++it_g) {
                groups.push_back((*it_g).c_str());
                has = true;
            }
            break;
        }
    }

    if (!has) {
        groups.push_back(groupName);
    }

    rosterManager->subscribe(jid, jid.username().c_str(), groups, hello);
}

void Smack::RejectFriends(const std::string &jidStr, const std::string &reason = EmptyString)
{
    JID jid(jidStr);
    RosterManager *rosterManager = j->rosterManager();
    if (rosterManager == nullptr) {
        LOGE("SMACK_TAG---------> [Smack.ReceiveFriends]rosterManager is null");
        return;
    }
    rosterManager->unsubscribe(jid, reason);
    rosterManager->remove(jid);
}

bool Smack::handleUnsubscriptionRequest(const JID &jid, const std::string & /* msg */)
{
    LOGI("unsubscription: %s\n", jid.bare().c_str());
    return true;
}

void Smack::handleNonrosterPresence(const Presence &presence)
{
    LOGI("handleNonrosterPresence received presence from entity not in the roster: %s to %s state: %d\n",
        presence.from().full().c_str(), presence.to().full().c_str(), presence.presence());

    LOGI("SMACK_TAG------------>: handleNonrosterPresence %s:  %d", "ssss ", __LINE__);
    if (tsfn_nonroster_presence != nullptr) {
        LOGI("SMACK_TAG------------>: handleNonrosterPresence %s:  %d", "ssss1 ", __LINE__);
        ThreadSafeInfoNonrosterPresence *data = &g_threadInfoNonrosterPresence;
        data->from = presence.from().full().c_str();
        data->to = presence.to().full().c_str();

        LOGI("SMACK_TAG------------>: handleNonrosterPresence %s:  %d", "ssss2 ", __LINE__);
        std::string message;
        switch (presence.presence()) {
            case gloox::Presence::PresenceType::Available: // Available
                message.append("0");
                break;
            case gloox::Presence::PresenceType::Chat: // Chat
                message.append("1");
                break;
            case gloox::Presence::PresenceType::Away: // Away
                message.append("2");
                break;
            case gloox::Presence::PresenceType::DND: // DND
                message.append("3");
                break;
            case gloox::Presence::PresenceType::XA: // XA
                message.append("4");
                break;
            case gloox::Presence::PresenceType::Unavailable: // Unavailable
                message.append("5");
                break;
            case gloox::Presence::PresenceType::Probe: // Probe
                message.append("6");
                break;
            case gloox::Presence::PresenceType::Error: // Error
                message.append("7");
                break;
            case gloox::Presence::PresenceType::Invalid: // Invalid
                message.append("8");
                break;
            default:
                break;
        }
        data->presence = message.c_str();
        LOGI("SMACK_TAG------------>: handleNonrosterPresence %s:  %d", "ssss3 ", __LINE__);
        napi_acquire_threadsafe_function(tsfn_nonroster_presence);
        LOGI("SMACK_TAG------------>: handleNonrosterPresence %s:  %d", "ssss4 ", __LINE__);
        napi_call_threadsafe_function(tsfn_nonroster_presence, data, napi_tsfn_blocking);
        LOGI("SMACK_TAG------------>: %s:  %d", "handleNonrosterPresence: ", __LINE__);
    }
    LOGI("SMACK_TAG------------>: handleNonrosterPresence %s:  %d", "aaa ", __LINE__);
}

void Smack::handleSubscription(const Subscription &subscription)
{
    LOGI("handleSubscription subscription type: %d", subscription.subtype());
}
