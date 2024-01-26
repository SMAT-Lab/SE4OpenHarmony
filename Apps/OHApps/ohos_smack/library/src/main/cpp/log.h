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

#ifndef __FILE_LOG_H__
#define __FILE_LOG_H__

#include <list>
#include <sstream>

#define LOGV(...) ((void)Log::V("MYTAG", __VA_ARGS__))
#define LOGI(...) ((void)Log::I("MYTAG", __VA_ARGS__))
#define LOGD(...) ((void)Log::D("MYTAG", __VA_ARGS__))
#define LOGW(...) ((void)Log::W("MYTAG", __VA_ARGS__))
#define LOGE(...) ((void)Log::E("MYTAG", __VA_ARGS__))
#define LOGF(...) ((void)Log::F("MYTAG", __VA_ARGS__))

enum class Level {
    VERBOSE,
    INFO,
    DEBUG,
    WARN,
    ERROR,
    FATAL
};

class Log {
public:
    template <typename... Args>
    static inline void V(const char* tag, const char* fmt, Args&&... args)
    {
        std::ostringstream oss;
        ((oss << std::forward<Args>(args)), ...);
        std::string msg = oss.str();
        Logger(Level::VERBOSE, tag, msg.c_str());
    }

    template <typename... Args>
    static inline void D(const char* tag, const char* fmt, Args&&... args)
    {
        std::ostringstream oss;
        ((oss << std::forward<Args>(args)), ...);
        std::string msg = oss.str();
        Logger(Level::DEBUG, tag, msg.c_str());
    }

    template <typename... Args>
    static inline void I(const char* tag, const char* fmt, Args&&... args)
    {
        std::ostringstream oss;
        ((oss << std::forward<Args>(args)), ...);
        std::string msg = oss.str();
        std::string msg_fmt = fmt;
        msg_fmt += msg;
        Logger(Level::INFO, tag, msg.c_str());
    }

    template <typename... Args>
    static inline void W(const char* tag, const char* fmt, Args&&... args)
    {
        std::ostringstream oss;
        ((oss << std::forward<Args>(args)), ...);
        std::string msg = oss.str();
        std::string msg_fmt = fmt;
        msg_fmt += msg;
        Logger(Level::WARN, tag, msg_fmt.c_str());
    }

    template <typename... Args>
    static inline void E(const char* tag, const char* fmt, Args&&... args)
    {
        std::ostringstream oss;
        ((oss << std::forward<Args>(args)), ...);
        std::string msg = oss.str();
        Logger(Level::ERROR, tag, msg.c_str());
    }

    template <typename... Args>
    static inline void F(const char* tag, const char* fmt, Args&&... args)
    {
        std::ostringstream oss;
        ((oss << std::forward<Args>(args)), ...);
        std::string msg = oss.str();
        Logger(Level::FATAL, tag, msg.c_str());
    }

    static inline const std::list<std::string> &getLogs()
    {
        return logs;
    }

    static inline void SaveLog(const char *log)
    {
        while (logs.size()>=logs.max_size()) {
            logs.pop_front();
        }
        logs.push_back(log);
    }

private:

    static void Logger(Level level, const char *tag, const char *msg);

    static std::list<std::string> logs;
};

#endif // __FILE_LOG_H__
