/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
#include <aki/jsbind.h>

class Message {
public:
    std::string message;
    int length;
    Message() = default;
    Message(std::string info) {
        message = info + " init";
        length = message.size();
    }
};

JSBIND_CLASS(Message) {
    JSBIND_CONSTRUCTOR<>();
    JSBIND_CONSTRUCTOR<std::string>();
    JSBIND_PROPERTY(message);
    JSBIND_PROPERTY(length);
}

static Message AsyncTaskMessageReturnMessage(Message &info, std::string message) {
    info.message = message + " reply";
    info.length = info.message.size();
    return info;
}

JSBIND_GLOBAL() {
    JSBIND_PFUNCTION(AsyncTaskMessageReturnMessage);
}

JSBIND_ADDON(worker);