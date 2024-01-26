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
declare interface Logger {
    /**
       * Send a verbose log message.
       *
       * @param tag     Used to identify the source of a log message.  It usually identifies
       *                the class or activity where the log call occurs.
       * @param message The message you would like logged. This message may contain string formatting
       *                which will be replaced with values from args.
       * @param t       An exception to log.
       * @param args    Arguments for string formatting.
       * @see java.util.Formatter
       * @see String#format(String, Object...)
       */
    v(message: string, ...args: any[]): void;
    /**
       * Send a debug log message.
       *
       * @param tag     Used to identify the source of a log message.  It usually identifies
       *                the class or activity where the log call occurs.
       * @param message The message you would like logged. This message may contain string formatting
       *                which will be replaced with values from args.
       * @param t       An exception to log.
       * @param args    Arguments for string formatting.
       * @see java.util.Formatter
       * @see String#format(String, Object...)
       */
    d(message: string, ...args: any[]): void;
    /**
       * Send a info log message.
       *
       * @param tag     Used to identify the source of a log message.  It usually identifies
       *                the class or activity where the log call occurs.
       * @param message The message you would like logged. This message may contain string formatting
       *                which will be replaced with values from args.
       * @param t       An exception to log.
       * @param args    Arguments for string formatting.
       * @see java.util.Formatter
       * @see String#format(String, Object...)
       */
    i(message: string, ...args: any[]): void;
    /**
       * Send a warning log message.
       *
       * @param tag     Used to identify the source of a log message.  It usually identifies
       *                the class or activity where the log call occurs.
       * @param message The message you would like logged. This message may contain string formatting
       *                which will be replaced with values from args.
       * @param t       An exception to log.
       * @param args    Arguments for string formatting.
       * @see java.util.Formatter
       * @see String#format(String, Object...)
       */
    w(message: string, ...args: any[]): void;
    /**
       * Send a error log message.
       *
       * @param tag     Used to identify the source of a log message.  It usually identifies
       *                the class or activity where the log call occurs.
       * @param message The message you would like logged. This message may contain string formatting
       *                which will be replaced with values from args.
       * @param t       An exception to log.
       * @param args    Arguments for string formatting.
       * @see java.util.Formatter
       * @see String#format(String, Object...)
       */
    e(message: string, ...args: any[]): void;
}
export default Logger;
