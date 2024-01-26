let __generate__Id: number = 0;
function generateId(): string {
    return "LogManager_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import Loggers from './Loggers';
import Logger from './Logger';
class LogManager {
    private static sLogger = Loggers.infoLogger();
    private static sVerboseLoggingEnabled: boolean = false;
    public static setLogger(logger: Logger): void {
        if (logger == null) {
            throw new Error("Logger may not be null.");
        }
        LogManager.sLogger = logger;
    }
    /**
         * Gets the currently set logger
         *
         * @return logger
         */
    public getLogger(): Logger {
        return LogManager.sLogger;
    }
    /**
         * Indicates whether verbose logging is enabled.   If not, expensive calculations to create
         * log strings should be avoided.
         * @return
         */
    public static isVerboseLoggingEnabled(): boolean {
        return LogManager.sVerboseLoggingEnabled;
    }
    /**
         * Sets whether verbose logging is enabled.  If not, expensive calculations to create
         * log strings should be avoided.
         *
         * @param enabled
         */
    public static setVerboseLoggingEnabled(enabled: boolean): void {
        LogManager.sVerboseLoggingEnabled = enabled;
    }
    /**
         * Send a verbose log message to the logger.
         *
         * @param message The message you would like logged. This message may contain string formatting
         *                which will be replaced with values from args.
         * @param args    Arguments for string formatting.
         */
    public static v(message: string, ...args: any[]): void {
        LogManager.sLogger.v(message, args);
    }
    /**
         * Send a debug log message to the logger.
         *
         * @param message The message you would like logged. This message may contain string formatting
         *                which will be replaced with values from args.
         * @param args    Arguments for string formatting.
         */
    public static d(message: string, ...args: any[]): void {
        LogManager.sLogger.d(message, args);
    }
    /**
         * Send a info log message to the logger.
         *
         * @param message The message you would like logged. This message may contain string formatting
         *                which will be replaced with values from args.
         * @param args    Arguments for string formatting.
         */
    public static i(message: string, ...args: any[]): void {
        LogManager.sLogger.i(message, args);
    }
    /**
         * Send a warning log message to the logger.
         *
         * @param message The message you would like logged. This message may contain string formatting
         *                which will be replaced with values from args.
         * @param args    Arguments for string formatting.
         */
    public static w(message: string, ...args: any[]): void {
        LogManager.sLogger.w(message, args);
    }
    /**
         * Send a error log message to the logger.
         *
         * @param message The message you would like logged. This message may contain string formatting
         *                which will be replaced with values from args.
         * @param args    Arguments for string formatting.
         */
    public static e(message: string, ...args: any[]): void {
        LogManager.sLogger.e(message, args);
    }
    private constructor() {
    }
}
export default LogManager;
