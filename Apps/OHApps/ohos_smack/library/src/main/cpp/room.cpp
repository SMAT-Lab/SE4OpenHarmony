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
#include <cstdio>
#include <forward_list>

#include "log.h"
#include "room.h"

static constexpr const size_t CALL_JS_ARGV_SIZE = 2;

using namespace gloox;

void room::createRoom(ClientBase *client, const std::string &jidStr, const std::string &roomName,
                      const std::string &domain, const std::string &serviceName)
{
    JID jid(jidStr);
    JID nicks(roomName+"@"+serviceName+"."+domain+"/"+ jid.username()); // 65地址替换
    m_room = new MUCRoom(client, nicks, this, this);
}

void room::Loop()
{
    LOGD("loop...");
    ConnectionError ce = ConnNoError;
    while (ce == ConnNoError) {
        LOGD("calling recv");
        ce = j->recv();
    }
    LOGD("recv error: %d", ce);
}

void room::createOrJoinRoom(ClientBase *client, const RoomParams &params)
{
    JID roomJID(params.roomStr + "@" + params.serviceName + "." + params.domain + "/" + params.nick);
    m_room = new MUCRoom(client, roomJID, this, this);
    if (params.password != "") {
        m_room->setPassword(params.password);
    }
    m_room->join();
}

void room::destroy(const std::string &reason /* = EmptyString */,
                   const JID &alternate /* = JID() */, const std::string &password /* = EmptyString */)
{
    m_room->destroy(reason, alternate, password);
}

void room::setPassword(const std::string &password)
{
    m_room->setPassword(password);
}

void room::Join()
{
    m_room->join();
}

void room::leave(const std::string &msg)
{
    m_room->leave(msg);
}

void room::setNick(const std::string &nick)
{
    LOGD("setNick  start %s", nick.c_str());
    m_room->setNick(nick);
    LOGD("setNick  end");
}

void room::bans(const std::string &nicks, const std::string &reason)
{
    LOGD("bans  start   nicks=%s  reason=%s", nicks.c_str(), reason.c_str());
    m_room->bans(nicks, reason);
    LOGD("bans  end");
}

std::string room::getAffiliation()
{
    LOGD("smack room getAffiliation", "smack room getAffiliation");
    auto affiliation = m_room->affiliation();
    LOGD("smack room getAffiliation", "smack room getAffiliation affiliation: %d", affiliation);
    std::string result = "";
    switch (affiliation) {
        case gloox::MUCRoomAffiliation::AffiliationNone: // MUCRoomAffiliation.AffiliationNone
            result = "0";
            break;
        case gloox::MUCRoomAffiliation::AffiliationOutcast: // MUCRoomAffiliation.AffiliationOutcast:
            result = "1";
            break;
        case gloox::MUCRoomAffiliation::AffiliationMember: // MUCRoomAffiliation.AffiliationMember:
            result = "2";
            break;
        case gloox::MUCRoomAffiliation::AffiliationOwner: // MUCRoomAffiliation.AffiliationOwner:
            result = "3";
            break;
        case gloox::MUCRoomAffiliation::AffiliationAdmin: // MUCRoomAffiliation.AffiliationAdmin:
            result = "4";
            break;
        case gloox::MUCRoomAffiliation::AffiliationInvalid: // MUCRoomAffiliation.AffiliationInvalid:
            result = "5";
            break;
        default:
            break;
    }
    LOGD("smack room getAffiliation", "smack room getAffiliation result: %s", result.c_str());
    return result;
}

std::string room::getRole()
{
    LOGD("smack room getRole", "smack room getRole");
    auto role = m_room->role();
    LOGD("smack room getRole", "smack room getRole role: %d", role);
    std::string result = "";
    switch (role) {
        case gloox::MUCRoomRole::RoleNone: // MUCRoomRole.RoleNone
            result = "0";
            break;
        case gloox::MUCRoomRole::RoleVisitor: // MUCRoomRole.RoleVisitor
            result = "1";
            break;
        case gloox::MUCRoomRole::RoleParticipant: // MUCRoomRole.RoleParticipant
            result = "2";
            break;
        case gloox::MUCRoomRole::RoleModerator: // MUCRoomRole.RoleModerator
            result = "3";
            break;
        case gloox::MUCRoomRole::RoleInvalid: // MUCRoomRole.RoleInvalid
            result = "4";
            break;
        default:
            break;
    }
    LOGD("smack room getRole", "smack room getRole result: %s", result.c_str());
    return result;
}

std::string room::isJoined()
{
    return m_room->isJoined();
}

void room::invite(const JID &invitee, const std::string &reason)
{
    m_room->invite(invitee, reason);
}

std::string room::nick()
{
    return m_room->nick();
}

std::string room::getRoomInfo()
{
    room_info = "";
    LOGD("getRoomInfo handleMUCInfo");
    m_room->getRoomInfo();
    while (room_info.empty()) {
    }

    LOGD("getRoomInfo handleMUCInfo 11 result:%s", room_info.c_str());
    return room_info;
}

void room::kick(const std::string &nick, const std::string &reason)
{
    m_room->kick(nick, reason);
}

void room::ban(const std::string &nick, const std::string &reason)
{
    m_room->ban(nick, reason);
}

void room::RequestVoice()
{
    m_room->requestVoice();
}

void room::grantVoice(const std::string &nick, const std::string &reason)
{
    m_room->grantVoice(nick, reason);
}

void room::grantVoices(const std::string &nicks, const std::string &reason)
{
    m_room->setRoles(nicks, RoleParticipant, reason);
}

Message *room::createDataForm(const JID &room, const DataForm *df)
{
    return m_room->createDataForm(room, df);
}

void room::revokeVoice(const std::string &nick, const std::string &reason)
{
    m_room->revokeVoice(nick, reason);
}

void room::revokeVoices(const std::string &nicks, const std::string &reason)
{
    m_room->setRoles(nicks, RoleVisitor, reason);
}

void room::setRole(const std::string &nick, const std::string &roleStr, const std::string &reason)
{
    MUCRoomRole role;
    if (roleStr == "0") {
        role = MUCRoomRole::RoleNone;
    } else if (roleStr == "1") {
        role = MUCRoomRole::RoleVisitor;
    } else if (roleStr == "2") {
        role = MUCRoomRole::RoleParticipant;
    } else if (roleStr == "3") {
        role = MUCRoomRole::RoleModerator;
    } else if (roleStr == "4") {
        role = MUCRoomRole::RoleInvalid;
    }

    m_room->setRole(nick, role, reason);
}

void room::setRoles(const std::string &nick, const std::string &roleStr, const std::string &reason)
{
    MUCRoomRole role;
    if (roleStr == "0") {
        role = MUCRoomRole::RoleNone;
    } else if (roleStr == "1") {
        role = MUCRoomRole::RoleVisitor;
    } else if (roleStr == "2") {
        role = MUCRoomRole::RoleParticipant;
    } else if (roleStr == "3") {
        role = MUCRoomRole::RoleModerator;
    } else if (roleStr == "4") {
        role = MUCRoomRole::RoleInvalid;
    }

    m_room->setRoles(nick, role, reason);
}

void room::setAffiliation(const std::string &nick, const std::string &affiliationStr, const std::string &reason)
{
    MUCRoomAffiliation affiliation;
    if (affiliationStr == "0") {
        affiliation = MUCRoomAffiliation::AffiliationNone;
    } else if (affiliationStr == "1") {
        affiliation = MUCRoomAffiliation::AffiliationOutcast;
    } else if (affiliationStr == "2") {
        affiliation = MUCRoomAffiliation::AffiliationMember;
    } else if (affiliationStr == "3") {
        affiliation = MUCRoomAffiliation::AffiliationOwner;
    } else if (affiliationStr == "4") {
        affiliation = MUCRoomAffiliation::AffiliationAdmin;
    } else if (affiliationStr == "5") {
        affiliation = MUCRoomAffiliation::AffiliationInvalid;
    }

    m_room->setAffiliation(nick, affiliation, reason);
}

void room::setAffiliations(const std::string& nicks, std::string& affiliationStr,
    const std::string& reason)
{
    MUCRoomAffiliation affiliation;
    if (affiliationStr == "0") {
        affiliation = MUCRoomAffiliation::AffiliationNone;
    } else if (affiliationStr == "1") {
        affiliation = MUCRoomAffiliation::AffiliationOutcast;
    } else if (affiliationStr == "2") {
        affiliation = MUCRoomAffiliation::AffiliationMember;
    } else if (affiliationStr == "3") {
        affiliation = MUCRoomAffiliation::AffiliationOwner;
    } else if (affiliationStr =="4") {
        affiliation = MUCRoomAffiliation::AffiliationAdmin;
    } else if (affiliationStr == "5") {
        affiliation = MUCRoomAffiliation::AffiliationInvalid;
    }

    m_room->setAffiliations(nicks, affiliation, reason);
}

void room::setPresence(const std::string &presenceStr, const std::string &msg)
{
    Presence::PresenceType presence;

    if (presenceStr == "0") {
        presence = Presence::PresenceType::Available;
    } else if (presenceStr == "1") {
        presence = Presence::PresenceType::Chat;
    } else if (presenceStr == "2") {
        presence = Presence::PresenceType::Away;
    } else if (presenceStr == "3") {
        presence = Presence::PresenceType::DND;
    } else if (presenceStr == "4") {
        presence = Presence::PresenceType::XA;
    } else if (presenceStr == "5") {
        presence = Presence::PresenceType::Unavailable;
    } else if (presenceStr == "6") {
        presence = Presence::PresenceType::Probe;
    } else if (presenceStr == "7") {
        presence = Presence::PresenceType::Error;
    } else if (presenceStr == "8") {
        presence = Presence::PresenceType::Invalid;
    }

    m_room->setPresence(presence, msg);
}

std::string room::requestList(const std::string &operationStr)
{
    MUCOperation operation;

    if (operationStr == "0") {
        operation = MUCOperation::RequestVoiceList;
    } else if (operationStr == "1") {
        operation = MUCOperation::RequestBanList;
    } else if (operationStr == "2") {
        operation = MUCOperation::RequestMemberList;
    } else if (operationStr == "3") {
        operation = MUCOperation::RequestModeratorList;
    } else if (operationStr == "4") {
        operation = MUCOperation::RequestOwnerList;
    } else if (operationStr == "5") {
        operation = MUCOperation::RequestAdminList;
    }

    room_opr_list = "";
    m_room->requestList(operation);

    while (room_opr_list.empty()) {
    }

    return room_opr_list;
}

std::string room::getRoomItems()
{
    room_item_list = "";
    m_room->getRoomItems();
    while (room_item_list.empty()) {
    }
    return room_item_list;
}

const int ODD_NUMBER = 1;
const int EXPECT_NUMBER = 2;

// 解析配置字符串并生成配置映射
static std::map<std::string, std::string> parseConfigString(const std::string& config)
{
    std::map<std::string, std::string> map;
    std::string str = config.c_str();

    char* p1 = new char[str.size() + 1];
    std::strcpy(p1, str.c_str());
    int len = strlen(p1);
    char *p2;
    char *p3;
    int pos = 1;

    while ((len > 0) && (p2 = strtok(p1, ",")) != nullptr) {
        p1 += strlen(p2) + 1;
        len -= strlen(p2) + 1;

        char *k;
        char *v;
        while ((p3 = strtok(p2, ":")) != nullptr) {
            p2 = nullptr;
            if (pos % EXPECT_NUMBER == ODD_NUMBER) {
                k = p3;
            } else {
                v = p3;
            }
            pos++;
        }
        if (k && v) {
            map[k] = v;
        }
    }
    return map;
}

// 创建 StringList 对象并从 map 的值中填充
static StringList* createStringListFromMapValue(const std::map<std::string, std::string>& mmap)
{
    std::map<std::string, std::string> map = mmap;
    StringList *list = new StringList();
    char *s = (char *)map["presencebroadcast"].c_str();
    const char *d = " ";
    char *p = strtok(s, d);

    if (p) {
        while (p) {
            list->push_back(p);
            p = strtok(nullptr, d);
        }
    }
    return list;
}

// 创建 DataFormField 对象
static DataFormField* createDataFormField(DataFormField::FieldType type, const std::string& name,
    const std::string& label)
{
    return new DataFormField(name, "", label, type);
}

// 将值添加到 DataFormField 对象
static void addValuesToDataFormField(const StringList* list, DataFormField* field)
{
    if (list == nullptr || field == nullptr) {
        LOGE("SMACK_TAG---------> [room.addValuesToDataFormField]list or field is null");
        return;
    }
    StringList::const_iterator it = list->begin();
    int in = 0;
    for (; it != list->end(); ++it) {
        if (in == 0) {
            field->setValue(it->c_str());
        } else {
            field->addValue(it->c_str());
        }
        in++;
    }
}

static void addChatRoomInfo(const std::map<std::string, std::string>& mmap, DataForm *fform)
{
    std::map<std::string, std::string> map = mmap;
    DataForm *form = fform;
    if (form == nullptr) {
        LOGE("SMACK_TAG---------> [room.addChatRoomInfo]form is null");
        return;
    }
    if (map.find("passwordprotectedroom") != map.end()) {
        std::string passwordprotectedroom = map["passwordprotectedroom"]; // "1";
        form->addField(DataFormField::TypeBoolean, "muc#roomconfig_passwordprotectedroom",
            passwordprotectedroom, "需要密码才能进入房间");
    }
    if (map.find("roomsecret") != map.end()) {
        std::string roomsecret = map["roomsecret"]; // "123";
        form->addField(DataFormField::TypeTextPrivate, "muc#roomconfig_roomsecret", roomsecret, "密码");
    }
    if (map.find("whois") != map.end()) {
        std::string whois = map["whois"]; // "anyone";
        form->addField(DataFormField::TypeTextSingle, "muc#roomconfig_whois", whois, "能够发现成员真实 JID 的角色");
    }
    if (map.find("allowpm") != map.end()) {
        std::string allowpm = map["allowpm"]; // "anyone";
        form->addField(DataFormField::TypeTextSingle, "muc#roomconfig_allowpm", allowpm,
            "Allowed to Send Private Messages");
    }
    if (map.find("enablelogging") != map.end()) {
        std::string enablelogging = map["enablelogging"];
        form->addField(DataFormField::TypeBoolean, "muc#roomconfig_enablelogging", enablelogging, "记录房间聊天");
    }
    if (map.find("reservednick") != map.end()) {
        std::string reservednick = map["reservednick"];
        form->addField(DataFormField::TypeBoolean, "x-muc#roomconfig_reservednick", reservednick, "仅允许注册昵称登录");
    }
    if (map.find("canchangenick") != map.end()) {
        std::string canchangenick = map["canchangenick"];
        form->addField(DataFormField::TypeBoolean, "x-muc#roomconfig_canchangenick", canchangenick, "允许成员修改昵称");
    }
    if (map.find("registration") != map.end()) {
        std::string registration = map["registration"];
        form->addField(DataFormField::TypeBoolean, "x-muc#roomconfig_registration", registration, "允许用户注册房间");
    }
    if (map.find("roomadmins") != map.end()) {
        std::string roomadmins = map["roomadmins"]; // "555@he-202101111234";
        form->addField(DataFormField::TypeJidMulti, "muc#roomconfig_roomadmins", roomadmins, "房间管理员");
    }
    if (map.find("roomowners") != map.end()) {
        std::string roomowners = map["roomowners"]; // "444@he-202101111234";
        form->addField(DataFormField::TypeJidMulti, "muc#roomconfig_roomowners", roomowners, "房间拥有者");
    }
}

static void addPersonInfo(const std::map<std::string, std::string>& mmap, DataForm *fform)
{
    std::map<std::string, std::string> map = mmap;
    DataForm *form = fform;
    if (form == nullptr) {
        LOGE("SMACK_TAG---------> [room.addPersonInfo]form is null");
        return;
    }
    if (map.find("publicroom") != map.end()) {
        std::string publicroom = map["publicroom"]; // "1";
        form->addField(DataFormField::TypeBoolean, "muc#roomconfig_publicroom", publicroom, "在目录中列出房间");
    }
    if (map.find("persistentroom") != map.end()) {
        std::string persistentroom = map["persistentroom"]; // "1";
        LOGI("SETROOMconfig---- persistentroom %s", persistentroom.c_str());
        form->addField(DataFormField::TypeBoolean, "muc#roomconfig_persistentroom", persistentroom, "永久房间");
    }
    if (map.find("moderatedroom") != map.end()) {
        std::string moderatedroom = map["moderatedroom"]; // "1";
        form->addField(DataFormField::TypeBoolean, "muc#roomconfig_moderatedroom", moderatedroom, "房间需要审核");
    }
    if (map.find("membersonly") != map.end()) {
        std::string membersonly = map["membersonly"]; // "1";
        form->addField(DataFormField::TypeBoolean, "muc#roomconfig_membersonly", membersonly, "房间仅对成员开放");
    }
    if (map.find("allowinvites") != map.end()) {
        std::string allowinvites = map["allowinvites"]; // "1";
        form->addField(DataFormField::TypeBoolean, "muc#roomconfig_allowinvites", allowinvites, "允许成员邀请其他人");
    }
}
void room::setRoomConfig(const std::string &config)
{
    std::map<std::string, std::string> map = parseConfigString(config);

    if (map.size() > 0) {
        DataForm *form = new DataForm(TypeSubmit);
        if (form == nullptr) {
            LOGE("SMACK_TAG---------> [room.setRoomConfig]form is null");
            return;
        }
        form->addField(DataFormField::TypeHidden, "FORM_TYPE", XMLNS_MUC_REQUEST);

        if (map.find("roomname") != map.end()) {
            std::string room = map["roomname"]; // "room3";
            form->addField(DataFormField::TypeTextSingle, "muc#roomconfig_roomname", room, "房间名称");
        }
        if (map.find("roomdesc") != map.end()) {
            std::string roomdesc = map["roomdesc"]; // "room description";
            form->addField(DataFormField::TypeTextSingle, "muc#roomconfig_roomdesc", roomdesc, "房间描述");
        }
        if (map.find("changesubject") != map.end()) {
            std::string changesubject = map["changesubject"]; // "1";
            form->addField(DataFormField::TypeBoolean, "muc#roomconfig_changesubject", changesubject, "允许成员更改主题");
        }
        if (map.find("maxusers") != map.end()) {
            std::string maxusers = map["maxusers"]; // "28";
            form->addField(DataFormField::TypeTextSingle, "muc#roomconfig_maxusers", maxusers, "最大房间成员人数");
        }
        if (map.find("presencebroadcast") != map.end()) {
            StringList *list = createStringListFromMapValue(map);
            if (list == nullptr) {
                LOGE("SMACK_TAG---------> [room.setRoomConfig]list is null");
                return;
            }
            if (list->size() > 0) {
                DataFormField *field = createDataFormField(DataFormField::TypeTextMulti,
                    "muc#roomconfig_presencebroadcast", "广播其存在的角色");
                addValuesToDataFormField(list, field);
                form->addField(field);
            }
        }
        addChatRoomInfo(map, form);
        addPersonInfo(map, form);
        m_room->setRoomConfig(form);
    }
}

std::string room::requestRoomConfig()
{
    room_config = "";
    m_room->requestRoomConfig();
    while (room_config.empty()) {}
    return room_config;
}

const MUCListItemList &room::list() {}

void room::OnConnect()
{
    LOGD("connected!!!\n");
}

void room::sendGroupMessage(const std::string &message)
{
    m_room->send(message);
}

void room::setSubject(const std::string &subject)
{
    m_room->setSubject(subject);
}

void room::onDisconnect(ConnectionError e)
{
    LOGD("message_test: disconnected: %d\n", e);
    if (e == ConnAuthenticationFailed) {
        LOGD("onDisconnect auth failed. reason: %d\n", j->authError());
    }
}

void room::onResourceBind(const std::string &resource)
{
    LOGD("onResourceBind");
}

void room::onResourceBindError(const Error *error)
{
    LOGD("onResourceBindError");
}

void room::onSessionCreateError(const Error *error)
{
    LOGD("onSessionCreateError");
}

void room::onStreamEvent(StreamEvent event)
{
    LOGD("onStreamEvent");
}

bool room::onTLSConnect(const CertInfo &info)
{
    LOGD("onTLSConnect status: %d\nissuer: %s\npeer: %s\nprotocol: %s\nmac: %s\ncipher: %s\ncompression: %s\n",
        info.status, info.issuer.c_str(), info.server.c_str(),
        info.protocol.c_str(), info.mac.c_str(), info.cipher.c_str(),
        info.compression.c_str());
    return true;
}

void room::handleLog(LogLevel level, LogArea area, const std::string &message)
{
    LOGD("handleLog log: level: %d, area: %d, %s\n", level, area, message.c_str());
}

static std::string presenceTypeDetect(const Presence &presence)
{
    std::string preType;
    if (presence.presence() == Presence::Available) {
        preType = "0";
    } else if (presence.presence() == Presence::Chat) {
        preType = "1";
    } else if (presence.presence() == Presence::Away) {
        preType = "2";
    } else if (presence.presence() == Presence::DND) {
        preType = "3";
    } else if (presence.presence() == Presence::XA) {
        preType = "4";
    } else if (presence.presence() == Presence::Unavailable) {
        preType = "5";
    } else if (presence.presence() == Presence::Probe) {
        preType = "6";
    } else if (presence.presence() == Presence::Error) {
        preType = "7";
    } else if (presence.presence() == Presence::Invalid) {
        preType = "8";
    }
    return preType;
}

static std::string affiliationTypeDetect(const MUCRoomParticipant participant)
{
    std::string affiliation;
    if (participant.affiliation == MUCRoomAffiliation::AffiliationNone) {
        affiliation = "0";
    } else if (participant.affiliation == MUCRoomAffiliation::AffiliationOutcast) {
        affiliation = "1";
    } else if (participant.affiliation == MUCRoomAffiliation::AffiliationMember) {
        affiliation = "2";
    } else if (participant.affiliation == MUCRoomAffiliation::AffiliationOwner) {
        affiliation = "3";
    } else if (participant.affiliation == MUCRoomAffiliation::AffiliationAdmin) {
        affiliation = "4";
    } else if (participant.affiliation == MUCRoomAffiliation::AffiliationInvalid) {
        affiliation = "5";
    }
    return affiliation;
}

static std::string roleTypeDetect(const MUCRoomParticipant participant)
{
    std::string role;
    if (participant.role == MUCRoomRole::RoleNone) {
        role = "0";
    } else if (participant.role == MUCRoomRole::RoleVisitor) {
        role = "1";
    } else if (participant.role == MUCRoomRole::RoleParticipant) {
        role = "2";
    } else if (participant.role == MUCRoomRole::RoleModerator) {
        role = "3";
    } else if (participant.role == MUCRoomRole::RoleInvalid) {
        role = "4";
    }
    return role;
}

static std::string flagTypeDetect(const MUCRoomParticipant participant)
{
    std::string flagType;
    if (participant.flags == MUCUserFlag::UserSelf) {
        flagType = "1"; // Other flags relate to the current user him/herself
    } else if (participant.flags == MUCUserFlag::UserNickChanged) {
        flagType = "2"; // The user changed his/her nickname
    } else if (participant.flags == MUCUserFlag::UserKicked) {
        flagType = "3"; // The user has been kicked
    } else if (participant.flags == MUCUserFlag::UserBanned) {
        flagType = "4"; // The user has been banned
    } else if (participant.flags == MUCUserFlag::UserAffiliationChanged) {
        flagType = "5"; // The user's affiliation with the room changed and
                        // as a result he/she has been removed from the room.
    } else if (participant.flags == MUCUserFlag::UserRoomDestroyed) {
        flagType = "6"; // The room has been destroyed
    } else if (participant.flags == MUCUserFlag::UserNickAssigned) {
        flagType = "7"; // Service has assigned or modified occupant's roomnick.
    } else if (participant.flags == MUCUserFlag::UserNewRoom) {
        flagType = "8"; // The room has been newly created.
    } else if (participant.flags == MUCUserFlag::UserMembershipRequired) {
        flagType = "9"; // User is being removed from the room because the room has been changed to
                        // members-only and the user is not a member.
    } else if (participant.flags == MUCUserFlag::UserRoomShutdown) {
        flagType = "10"; // User is being removed from the room because of a system shutdown.
    } else if (participant.flags == MUCUserFlag::UserAffiliationChangedWNR) {
        flagType = "11"; // The user's affiliation changed While Not in the Room
    } else {
        flagType = "0";
    }
    return flagType;
}

// 定义线程数据结构体
struct ThreadSafeInfoRoom {
    std::string id;
    std::string msg;
};

struct ThreadSafeInfoMUCP {
    std::string nike;
    std::string presenceType;
};

// 实例化结构体
static struct ThreadSafeInfoRoom g_threadInfoRoom = {};
static struct ThreadSafeInfoMUCP g_threadInfoMUCP = {};
static napi_threadsafe_function tsfn_room;
static napi_threadsafe_function tsfn_mucp;

static void CallJs(napi_env env, napi_value jsCb, void *context, void *data)
{
    LOGI("SMACK_TAG--------->CallJs0: %s:  %d", "CallJs: ", __LINE__);
    napi_value undefined;
    napi_value ret;

    napi_value argv[] = {nullptr, nullptr};

    // 解析参数 data
    ThreadSafeInfoRoom *arg = (ThreadSafeInfoRoom *)data;
    if (arg == nullptr) {
        LOGE("SMACK_TAG---------> [room.CallJs]arg is null");
        return;
    }
    LOGI("SMACK_TAG--------->room CallJs1: %s:  %d", (arg->id).c_str(), __LINE__);
    LOGI("SMACK_TAG--------->room CallJs2: %s:  %d", (arg->msg).c_str(), __LINE__);
    napi_create_string_utf8(env, (arg->id).c_str(), NAPI_AUTO_LENGTH, &argv[0]);
    LOGI("SMACK_TAG--------->room CallJs3: %s:  %d", "CallJs: ", __LINE__);
    napi_create_string_utf8(env, (arg->msg).c_str(), NAPI_AUTO_LENGTH, &argv[1]);
    LOGI("SMACK_TAG--------->room CallJs4: %s:  %d", "CallJs: ", __LINE__);
    // 调用 js 回调函数
    napi_status status;
    if (jsCb != nullptr && argv != nullptr) {
        LOGI("SMACK_TAG--------->room CallJs4: %s:  %d", "CallJs 1 ", __LINE__);
        status = napi_call_function(env, undefined, jsCb, CALL_JS_ARGV_SIZE, argv, &ret);
        LOGI("SMACK_TAG--------->room CallJs4: %s:  %d", "CallJs 2 ", __LINE__);
    }
    LOGI("SMACK_TAG--------->room CallJs5: %d:  %d", status, __LINE__);
}

static void CallJs_MUCP(napi_env env, napi_value jsCb, void *context, void *data)
{
    LOGI("SMACK_TAG--------->CallJs0: %s:  %d", "CallJs: ", __LINE__);
    napi_value undefined;
    napi_value ret;

    napi_value argv[] = {nullptr, nullptr};

    // 解析参数 data
    ThreadSafeInfoMUCP *arg = (ThreadSafeInfoMUCP *)data;
    if (arg == nullptr) {
        LOGE("SMACK_TAG---------> [room.CallJs_MUCP]arg is null");
        return;
    }
    LOGI("SMACK_TAG--------->room CallJs1: %s:  %d", (arg->nike).c_str(), __LINE__);
    LOGI("SMACK_TAG--------->room CallJs2: %s:  %d", (arg->presenceType).c_str(), __LINE__);
    napi_create_string_utf8(env, (arg->nike).c_str(), NAPI_AUTO_LENGTH, &argv[0]);
    LOGI("SMACK_TAG--------->room CallJs3: %s:  %d", "CallJs: ", __LINE__);
    napi_create_string_utf8(env, (arg->presenceType).c_str(), NAPI_AUTO_LENGTH, &argv[1]);
    LOGI("SMACK_TAG--------->room CallJs4: %s:  %d", "CallJs: ", __LINE__);
    // 调用 js 回调函数
    napi_status status;
    if (jsCb != nullptr && argv != nullptr) {
        LOGI("SMACK_TAG--------->room CallJs4: %s:  %d", "CallJs_MUCP 1 ", __LINE__);
        status = napi_call_function(env, undefined, jsCb, CALL_JS_ARGV_SIZE, argv, &ret);
        LOGI("SMACK_TAG--------->room CallJs4: %s:  %d", "CallJs_MUCP 2 ", __LINE__);
    }
    LOGI("SMACK_TAG--------->room CallJs5: %d:  %d", status, __LINE__);
}

void room::handleMUCParticipantPresence(MUCRoom * /* room */, const MUCRoomParticipant participant,
    const Presence &presence)
{
    LOGD("handleMUCParticipantPresence Presence is %d of nick: %s, reason: %s,status: %s,"
        "affiliation: %d, role: %d, flag: %d",
        presence.presence(), participant.nick->resource().c_str(), participant.reason.c_str(),
        participant.status.c_str(), participant.affiliation, participant.role, participant.flags);

    if (tsfn_mucp == nullptr) {
        LOGE("smack handleMUCParticipantPresence  %s:  %d", "handleMUCParticipantPresence return  ", __LINE__);
        return;
    }

    std::string nick = participant.nick->resource().c_str(); // 用户昵称
    std::string presenceType = presenceTypeDetect(presence); // 用户状态
    std::string affiliationType = affiliationTypeDetect(participant); // 岗位从属关系
    std::string roleType = roleTypeDetect(participant);
    std::string flagType = flagTypeDetect(participant);
    std::string jsonStr;

    if (flagType == "2") {
        nick = participant.newNick;
    }

    jsonStr.append("{");
    jsonStr.append("\"presenceType\":\"");
    jsonStr.append(presenceType.c_str());
    jsonStr.append("\",");
    jsonStr.append("\"affiliationType\":\"");
    jsonStr.append(affiliationType.c_str());
    jsonStr.append("\",");
    jsonStr.append("\"roleType\":\"");
    jsonStr.append(roleType.c_str());
    jsonStr.append("\",");
    jsonStr.append("\"flagType\":\"");
    jsonStr.append(flagType.c_str());
    jsonStr.append("\"");
    jsonStr.append("}");
    LOGD("handleMUCParticipantPresence ===>>>> %s %s \n", nick.c_str(), flagType.c_str());
    ThreadSafeInfoMUCP *data = &g_threadInfoMUCP;
    if (data == nullptr) {
        LOGE("SMACK_TAG---------> [room.handleMUCParticipantPresence]data is null");
        return;
    }
    data->nike = nick.c_str();
    data->presenceType = jsonStr.c_str();
    napi_acquire_threadsafe_function(tsfn_mucp);
    LOGI("SMACK_TAG--------->: %s:  %d", "handleMUCMessage: ", __LINE__);
    // 调用主线程函数，传入 Data
    napi_call_threadsafe_function(tsfn_mucp, data, napi_tsfn_blocking);
    LOGI("SMACK_TAG--------->: %s:  %d", "handleMUCMessage: ", __LINE__);
}

void room::handleMUCMessage(MUCRoom * /* room */, const Message &msg, bool priv)
{
    LOGD("handleMUCMessage %s said: '%s' (history: %s, private: %s)\n",
        msg.from().resource().c_str(), msg.body().c_str(),
        msg.when() ? "yes" : "no", priv ? "yes" : "no");
    LOGI("SMACK_TAG--------->: %s:  %d", "handleMUCMessage:  ", __LINE__);
    auto body = msg.body();
    LOGI("SMACK_TAG--------->: %s:  %d", msg.from().resource().c_str(), __LINE__);
    
    if (tsfn_room == nullptr) {
        LOGE("smack handleMUCMessage  %s:  %d", "handleMUCMessage return  ", __LINE__);
        return;
    }
    LOGI("smack handleMUCMessage  %s:  %d", "handleMUCMessage work  ", __LINE__);

    ThreadSafeInfoRoom *data = &g_threadInfoRoom;
	if (data == nullptr) {
        LOGE("SMACK_TAG---------> [room.handleMUCMessage]data is null");
        return;
    }
    data->id = msg.from().resource().c_str();
    data->msg = body.c_str();
    LOGI("SMACK_TAG--------->: %s:  %d", "handleMUCMessage: ", __LINE__);
    napi_acquire_threadsafe_function(tsfn_room);
    LOGI("SMACK_TAG--------->: %s:  %d", "handleMUCMessage: ", __LINE__);
    // 调用主线程函数，传入 Data
    napi_call_threadsafe_function(tsfn_room, data, napi_tsfn_blocking);
    LOGI("SMACK_TAG--------->: %s:  %d", "handleMUCMessage: ", __LINE__);
}

void room::handleMUCSubject(MUCRoom * /* room */, const std::string &nick, const std::string &subject)
{
    if (nick.empty()) {
        LOGD("handleMUCSubject Subject: %s\n", subject.c_str());
    } else {
        LOGD("handleMUCSubject %s has set the subject to: '%s'\n", nick.c_str(), subject.c_str());
    }
}

void room::handleMUCError(MUCRoom * /* room */, StanzaError error)
{
    LOGD("handleMUCError !!!!!!!!got an error: %d", error);
}

void room::handleMUCInfo(MUCRoom * /* room */, int features, const std::string &name, const DataForm *infoForm)
{
    if (infoForm == nullptr) {
        LOGE("SMACK_TAG---------> [room.handleMUCInfo]infoForm is null");
        return;
    }
    // todo 房间信息获取
    LOGD("handleMUCInfo features: %d, name: %s, form xml: %s\n",
        features, name.c_str(), infoForm->tag()->xml().c_str());
    room_info = infoForm->tag()->xml().c_str();
}

void room::handleMUCInviteDecline(MUCRoom * /* room */, const JID &invitee, const std::string &reason)
{
    LOGD("handleMUCInviteDecline Invitee %s declined invitation. reason given: %s\n",
         invitee.full().c_str(), reason.c_str());
}

bool room::handleMUCRoomCreation(MUCRoom *room)
{
    if (room == nullptr) {
        LOGE("SMACK_TAG---------> [room.handleMUCRoomCreation]room is null");
        return false;
    }
    LOGD("handleMUCRoomCreation room %s didn't exist, beeing created.\n",
         room->name().c_str());
    return true;
}

void room::handleMUCConfigForm(MUCRoom *room, const DataForm &form)
{
    if (room == nullptr) {
        LOGE("SMACK_TAG---------> [room.handleMUCConfigForm]room is null");
        return;
    }
    // todo 房间配置信息处理处
    LOGD("requestRoomConfig handleMUCConfigForm room:%s, title:%s, form:%s", room->name().c_str(),
         form.title().c_str(), form.filterString().c_str());
    LOGD("requestRoomConfig handleMUCConfigForm tag:%s", form.tag()->xml().c_str());
    room_config = form.tag()->xml().c_str();
}

void room::handleMUCItems(MUCRoom * /* room */, const Disco::ItemList &items)
{
    // todo 房间成员信息处理
    LOGD("handleMUCItems start");
    std::string name;
    name.append("[");

    Disco::ItemList::const_iterator it = items.begin();
    for (; it != items.end(); ++it) {
        LOGD("handleMUCItems %s -- %s is an item here\n", (*it)->jid().full().c_str(),
             (*it)->name().c_str());

        name.append("{");
        name.append("\"room\":");
        name.append("\"");
        name.append((*it)->jid().full().c_str());
        name.append("\"");
        name.append("},");
    }

    name.append("]");
    room_item_list = name;
}

void room::recvGroupMsg(napi_env env, napi_value jsCb)
{
    napi_value workName;
    napi_create_string_utf8(env, "recvGroupMsg", NAPI_AUTO_LENGTH, &workName);
    LOGI("SMACK_TAG--------->recvGroupMsg: %s:  %d", "recvGroupMsg: ", __LINE__);
    napi_create_threadsafe_function(env, jsCb, nullptr, workName, 0, 1, nullptr, nullptr, nullptr, CallJs, &tsfn_room);
    LOGI("SMACK_TAG--------->recvGroupMsg: %s:  %d", "recvGroupMsg: ", __LINE__);
}

void room::recvMUCParticipantPresenceListener(napi_env env, napi_value jsCb)
{
    napi_value workName;
    napi_create_string_utf8(env, "recvMUCParticipantPresenceListener", NAPI_AUTO_LENGTH, &workName);
    LOGI("SMACK_TAG--------->recvMUCParticipantPresenceListener: %d", __LINE__);
    napi_create_threadsafe_function(env, jsCb, nullptr, workName, 0, 1, nullptr, nullptr, nullptr,
                                    CallJs_MUCP, &tsfn_room);
    LOGI("SMACK_TAG--------->recvMUCParticipantPresenceListener: %d",  __LINE__);
}

void room::UnregisterGroupMessageCallback()
{
    LOGI("SMACK_TAG------------>: unregisterGroupMessageCallback %d", __LINE__);
    tsfn_room = nullptr;
}

void room::UnregisterMUCParticipantPresenceListener()
{
    LOGI("SMACK_TAG------------>: unregisterMUCParticipantPresenceListener %d", __LINE__);
    tsfn_mucp = nullptr;
}

void room::handleMUCConfigList(MUCRoom *room, const MUCListItemList &items, MUCOperation operation)
{
	if (room == nullptr) {
        LOGE("SMACK_TAG---------> [room.handleMUCConfigList]room is null");
        return;
    }
    // todo 房间岗位列表
    LOGD("handleMUCConfigList room:%s", room->name().c_str());

    std::string name;
    name.append("[");
    MUCListItemList::const_iterator it = items.begin();
    for (; it != items.end(); ++it) {
        LOGD("handleMUCConfigList item jid: %s , nick:%s ", (*it).jid().full().c_str(), (*it).nick().c_str());
        name.append("{");
        name.append("\"jid\":");
        name.append("\"");
        name.append((*it).jid().full().c_str());
        name.append("\"");
        name.append("},");
    }
    name.append("]");
    room_opr_list = name;
}

void room::handleMUCConfigResult(MUCRoom *room, bool success, MUCOperation operation)
{
    if (room == nullptr) {
        LOGE("SMACK_TAG---------> [room.handleMUCConfigResult]room is null");
        return;
    }
    LOGD("handleMUCConfigResult room:%s", room->name().c_str());
}

void room::handleMUCRequest(MUCRoom *room, const DataForm &form)
{
    if (room == nullptr) {
        LOGE("SMACK_TAG---------> [room.handleMUCRequest]room is null");
        return;
    }
    LOGD("handleMUCRequest room:%s", room->name().c_str());
}
