let __generate__Id: number = 0;
function generateId(): string {
    return "Logger.test_" + ++__generate__Id;
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { Level, LoggerFactory, MDC, Logger, AppenderEnum, FilterEnum, Configuration, LoggerFilter, Match } from '@ohos/logback';
import fileio from '@ohos.file.fs';
import { GlobalContext } from './GlobalContext';
import { Appender } from '@ohos/logback/src/main/ets/components/config/Appender';
export default function loggerTest() {
    describe('LoggerTest', () => {
        // Defines a test suite. Two parameters are supported: test suite name and test suite function.
        beforeAll(() => {
            // Presets an action, which is performed only once before all test cases of the test suite start.
            // This API supports only one parameter: preset action function.
        });
        beforeEach(() => {
            // Presets an action, which is performed before each unit test case starts.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: preset action function.
        });
        afterEach(() => {
            // Presets a clear action, which is performed after each unit test case ends.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: clear action function.
        });
        afterAll(() => {
            // Presets a clear action, which is performed after all test cases of the test suite end.
            // This API supports only one parameter: clear action function.
        });
        let ctx: Context = GlobalContext.getContext().getValue("contt") as Context;
        const logItem: LoggerFilter = {
            name: 'com.log.file',
            additivity: true,
            level: Level.WARN,
            appenderRef: {
                ref: 'LOGFILE'
            }
        };
        let loggerFilter = [logItem];
        const appender: Appender[] = [{
                name: 'LOGFILE',
                className: AppenderEnum.FILE,
                file: 'fatal1.log',
                encoder: {
                    pattern: {
                        msg: '%level %logger %msg'
                    }
                },
                filter: {
                    className: FilterEnum.LEVEL,
                    level: Level.FATAL,
                    onMatch: Match.ACCEPT,
                    onMismatch: Match.DENY
                }
            }];
        //生成filte为LEVEL的config
        let makeThresholdFilterConfig = (fileName: string, level: Level) => {
            let config: Configuration | undefined = undefined;
            if (fileName) {
                let appenders: Appender[] = appender.copyWithin(-1, -1);
                appenders[0]["file"] = fileName;
                let filter = appenders[0]["filter"];
                if (filter) {
                    filter['className'] = FilterEnum.THRESHOLD;
                    filter['level'] = level;
                }
                config = {
                    appender: appender,
                    logger: loggerFilter
                };
            }
            return config;
        };
        //生成filte为THRESHOLD的config
        let makeConfig = (fileName: string, level: Level) => {
            let config: Configuration | undefined = undefined;
            if (fileName) {
                let appenders: Appender[] = appender.copyWithin(-1, -1);
                appenders[0]["file"] = fileName;
                let filter = appenders[0]["filter"];
                if (filter) {
                    filter['className'] = FilterEnum.LEVEL;
                    filter['level'] = level;
                }
                config = {
                    appender: appender,
                    logger: loggerFilter
                };
            }
            return config;
        };
        let printLog = (config: Configuration | undefined) => {
            if (config) {
                let logger: Logger = LoggerFactory.getLogger(ctx, "com.log.file", config);
                logger.setTag('logback');
                if (logger) {
                    logger.trace("=====trace=====");
                    logger.debug("=====debug=====");
                    logger.info("=====info=====");
                    logger.warn("=====warn=====");
                    logger.error("=====error=====");
                    logger.fatal("=====fatal=====");
                }
            }
        };
        let printLevelLog = (config: Configuration | undefined, level: Level) => {
            if (config) {
                let logger: Logger = LoggerFactory.getLogger(ctx, "com.log.file", config);
                logger.setTag('logback');
                if (logger) {
                    switch (level) {
                        case Level.TRACE:
                            logger.trace("=====trace=====");
                            break;
                        case Level.DEBUG:
                            logger.debug("=====debug=====");
                            break;
                        case Level.INFO:
                            logger.info("=====info=====");
                            break;
                        case Level.WARN:
                            logger.warn("=====warn=====");
                            break;
                        case Level.ERROR:
                            logger.error("=====error=====");
                            break;
                        case Level.FATAL:
                            logger.fatal("=====fatal=====");
                            break;
                    }
                }
            }
        };
        //写文件并读出内容
        let readFile = (fileName: string) => {
            let arr: string[] = [];
            if (fileName) {
                let filePath = ctx.filesDir + '/' + fileName;
                let fl = fileio.openSync(filePath, fileio.OpenMode.READ_WRITE);
                expect(fl).not().assertNull();
                let buf = new ArrayBuffer(512);
                fileio.readSync(fl.fd, buf);
                expect(buf).not().assertNull();
                let result = String.fromCharCode(...new Uint8Array(buf));
                arr = result.split('\n');
            }
            return arr;
        };
        it('LoggerTrace1', 0, () => {
            printLog(makeConfig('trace1.log', Level.TRACE));
            let arr = readFile('trace1.log');
            expect(arr.length).assertEqual(2);
            expect(arr[0]).assertEqual('TRACE com.log.file =====trace=====');
        });
        it('LoggerTrace2', 0, () => {
            printLevelLog(makeThresholdFilterConfig('trace2.log', Level.TRACE), Level.TRACE);
            let arr = readFile('trace2.log');
            expect(arr.length).assertEqual(2);
            expect(arr[0]).assertEqual('TRACE com.log.file =====trace=====');
        });
        it('LoggerTrace3', 0, () => {
            printLevelLog(makeThresholdFilterConfig('trace3.log', Level.DEBUG), Level.TRACE);
            let arr = readFile('trace3.log');
            expect(arr.length).assertEqual(1);
            expect(arr[0]).not().assertEqual('TRACE com.log.file =====trace=====');
        });
        it('LoggerTrace4', 0, () => {
            printLevelLog(makeThresholdFilterConfig('trace4.log', Level.INFO), Level.TRACE);
            let arr = readFile('trace4.log');
            expect(arr.length).assertEqual(1);
            expect(arr[0]).not().assertEqual('TRACE com.log.file =====trace=====');
        });
        it('LoggerTrace5', 0, () => {
            printLevelLog(makeThresholdFilterConfig('trace5.log', Level.WARN), Level.TRACE);
            let arr = readFile('trace5.log');
            expect(arr.length).assertEqual(1);
            expect(arr[0]).not().assertEqual('TRACE com.log.file =====trace=====');
        });
        it('LoggerDebug1', 0, () => {
            printLog(makeConfig('debug1.log', Level.DEBUG));
            let arr = readFile('debug1.log');
            expect(arr.length).assertEqual(2);
            expect(arr[0]).assertEqual('DEBUG com.log.file =====debug=====');
        });
        it('LoggerDebug2', 0, () => {
            printLevelLog(makeThresholdFilterConfig('debug2.log', Level.DEBUG), Level.DEBUG);
            let arr = readFile('debug2.log');
            expect(arr.length).assertEqual(2);
            expect(arr[0]).assertEqual('DEBUG com.log.file =====debug=====');
        });
        it('LoggerDebug3', 0, () => {
            printLevelLog(makeThresholdFilterConfig('debug3.log', Level.TRACE), Level.DEBUG);
            let arr = readFile('debug3.log');
            expect(arr.length).assertEqual(2);
            expect(arr[0]).assertEqual('DEBUG com.log.file =====debug=====');
        });
        it('LoggerDebug4', 0, () => {
            printLevelLog(makeThresholdFilterConfig('debug4.log', Level.INFO), Level.DEBUG);
            let arr = readFile('debug4.log');
            expect(arr.length).assertEqual(1);
            expect(arr[0]).not().assertEqual('DEBUG com.log.file =====debug=====');
        });
        it('LoggerDebug5', 0, () => {
            printLevelLog(makeThresholdFilterConfig('debug5.log', Level.WARN), Level.DEBUG);
            let arr = readFile('debug5.log');
            expect(arr.length).assertEqual(1);
            expect(arr[0]).not().assertEqual('DEBUG com.log.file =====debug=====');
        });
        it('LoggerInfo1', 0, () => {
            printLog(makeConfig('info1.log', Level.INFO));
            let arr = readFile('info1.log');
            expect(arr.length).assertEqual(2);
            expect(arr[0]).assertEqual('INFO com.log.file =====info=====');
        });
        it('LoggerInfo2', 0, () => {
            printLevelLog(makeThresholdFilterConfig('info2.log', Level.INFO), Level.INFO);
            let arr = readFile('info2.log');
            expect(arr.length).assertEqual(2);
            expect(arr[0]).assertEqual('INFO com.log.file =====info=====');
        });
        it('LoggerInfo3', 0, () => {
            printLevelLog(makeThresholdFilterConfig('info3.log', Level.TRACE), Level.INFO);
            let arr = readFile('info3.log');
            expect(arr.length).assertEqual(2);
            expect(arr[0]).assertEqual('INFO com.log.file =====info=====');
        });
        it('LoggerInfo4', 0, () => {
            printLevelLog(makeThresholdFilterConfig('info4.log', Level.DEBUG), Level.INFO);
            let arr = readFile('info4.log');
            expect(arr.length).assertEqual(2);
            expect(arr[0]).assertEqual('INFO com.log.file =====info=====');
        });
        it('LoggerInfo5', 0, () => {
            printLevelLog(makeThresholdFilterConfig('info5.log', Level.WARN), Level.INFO);
            let arr = readFile('info5.log');
            expect(arr.length).assertEqual(1);
            expect(arr[0]).not().assertEqual('INFO com.log.file =====info=====');
        });
        it('LoggerWarn1', 0, () => {
            printLog(makeConfig('warn1.log', Level.WARN));
            let arr = readFile('warn1.log');
            expect(arr.length).assertEqual(2);
            expect(arr[0]).assertEqual('WARN com.log.file =====warn=====');
        });
        it('LoggerWarn2', 0, () => {
            printLevelLog(makeThresholdFilterConfig('warn2.log', Level.WARN), Level.WARN);
            let arr = readFile('warn1.log');
            expect(arr.length).assertEqual(2);
            expect(arr[0]).assertEqual('WARN com.log.file =====warn=====');
        });
        it('LoggerWarn3', 0, () => {
            printLevelLog(makeThresholdFilterConfig('warn3.log', Level.TRACE), Level.WARN);
            let arr = readFile('warn3.log');
            expect(arr.length).assertEqual(2);
            expect(arr[0]).assertEqual('WARN com.log.file =====warn=====');
        });
        it('LoggerWarn4', 0, () => {
            printLevelLog(makeThresholdFilterConfig('warn4.log', Level.INFO), Level.WARN);
            let arr = readFile('warn4.log');
            expect(arr.length).assertEqual(2);
            expect(arr[0]).assertEqual('WARN com.log.file =====warn=====');
        });
        it('LoggerWarn5', 0, () => {
            printLevelLog(makeThresholdFilterConfig('warn5.log', Level.FATAL), Level.WARN);
            let arr = readFile('warn5.log');
            expect(arr.length).assertEqual(1);
            expect(arr[0]).not().assertEqual('WARN com.log.file =====warn=====');
        });
        it('LoggerError1', 0, () => {
            printLog(makeConfig('error1.log', Level.ERROR));
            let arr = readFile('error1.log');
            expect(arr.length).assertEqual(2);
            expect(arr[0]).assertEqual('ERROR com.log.file =====error=====');
        });
        it('LoggerError2', 0, () => {
            printLevelLog(makeThresholdFilterConfig('error2.log', Level.ERROR), Level.ERROR);
            let arr = readFile('error2.log');
            expect(arr.length).assertEqual(2);
            expect(arr[0]).assertEqual('ERROR com.log.file =====error=====');
        });
        it('LoggerError3', 0, () => {
            printLevelLog(makeThresholdFilterConfig('error3.log', Level.TRACE), Level.ERROR);
            let arr = readFile('error3.log');
            expect(arr.length).assertEqual(2);
            expect(arr[0]).assertEqual('ERROR com.log.file =====error=====');
        });
        it('LoggerError4', 0, () => {
            printLevelLog(makeThresholdFilterConfig('error4.log', Level.DEBUG), Level.ERROR);
            let arr = readFile('error4.log');
            expect(arr.length).assertEqual(2);
            expect(arr[0]).assertEqual('ERROR com.log.file =====error=====');
        });
        it('LoggerError5', 0, () => {
            printLevelLog(makeThresholdFilterConfig('error5.log', Level.FATAL), Level.ERROR);
            let arr = readFile('error5.log');
            expect(arr.length).assertEqual(1);
            expect(arr[0]).not().assertEqual('ERROR com.log.file =====error=====');
        });
        it('LoggerFatal1', 0, () => {
            printLog(makeConfig('fatal1.log', Level.FATAL));
            let arr = readFile('fatal1.log');
            expect(arr.length).assertEqual(2);
            expect(arr[0]).assertEqual('FATAL com.log.file =====fatal=====');
        });
        it('LoggerFatal2', 0, () => {
            printLevelLog(makeThresholdFilterConfig('fatal2.log', Level.FATAL), Level.FATAL);
            let arr = readFile('fatal1.log');
            expect(arr.length).assertEqual(2);
            expect(arr[0]).assertEqual('FATAL com.log.file =====fatal=====');
        });
        it('LoggerFatal3', 0, () => {
            printLevelLog(makeThresholdFilterConfig('fatal3.log', Level.TRACE), Level.FATAL);
            let arr = readFile('fatal3.log');
            expect(arr.length).assertEqual(2);
            expect(arr[0]).assertEqual('FATAL com.log.file =====fatal=====');
        });
        it('LoggerFatal4', 0, () => {
            printLevelLog(makeThresholdFilterConfig('fatal4.log', Level.INFO), Level.FATAL);
            let arr = readFile('fatal4.log');
            expect(arr.length).assertEqual(2);
            expect(arr[0]).assertEqual('FATAL com.log.file =====fatal=====');
        });
        it('LoggerFatal5', 0, () => {
            printLevelLog(makeThresholdFilterConfig('fatal5.log', Level.ERROR), Level.FATAL);
            let arr = readFile('fatal5.log');
            expect(arr.length).assertEqual(2);
            expect(arr[0]).assertEqual('FATAL com.log.file =====fatal=====');
        });
    });
}
