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

#include <hilog/log.h>
#include "log.h"

constexpr unsigned int LOG_DOMAIN_NUM = 0x0201;
constexpr unsigned int LOG_LEN = 65535;

void Log::Logger(Level level, const char *tag, const char * msg)
{
    LogLevel logLevel = LOG_DEBUG;
    switch (level) {
        case Level::VERBOSE:
        case Level::DEBUG:
            logLevel = LOG_DEBUG;
            break;
        case Level::INFO:
            logLevel = LOG_INFO;
            break;
        case Level::WARN:
            logLevel = LOG_WARN;
            break;
        case Level::ERROR:
            logLevel = LOG_ERROR;
            break;
        case Level::FATAL:
            logLevel = LOG_FATAL;
            break;
        default:
            logLevel = LOG_FATAL;
            break;
    }

    OH_LOG_Print(LOG_APP, logLevel, LOG_DOMAIN_NUM, tag, msg, 0);
}
