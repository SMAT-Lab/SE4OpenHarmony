let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
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
import { Level, LoggerFactory, MDC, Logger } from '@ohos/logback';
import { GlobalContext } from './GlobalContext';
export default function abilityTest() {
    describe('ActsAbilityTest', () => {
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
        //Level
        it('levelTest1', 0, () => {
            expect(Level.FATAL.getLevelInt()).assertEqual(Level.FATAL_INT);
        });
        it('levelTest11', 0, () => {
            expect(Level.FATAL.getLevelStr()).assertEqual("FATAL");
        });
        it('levelTest2', 0, () => {
            expect(Level.ERROR.getLevelInt()).assertEqual(Level.ERROR_INT);
        });
        it('levelTest21', 0, () => {
            expect(Level.ERROR.getLevelStr()).assertEqual("ERROR");
        });
        it('levelTest3', 0, () => {
            expect(Level.WARN.getLevelInt()).assertEqual(Level.WARN_INT);
        });
        it('levelTest31', 0, () => {
            expect(Level.WARN.getLevelStr()).assertEqual("WARN");
        });
        it('levelTest4', 0, () => {
            expect(Level.INFO.getLevelInt()).assertEqual(Level.INFO_INT);
        });
        it('levelTest41', 0, () => {
            expect(Level.INFO.getLevelStr()).assertEqual("INFO");
        });
        it('levelTest5', 0, () => {
            expect(Level.DEBUG.getLevelInt()).assertEqual(Level.DEBUG_INT);
        });
        it('levelTest51', 0, () => {
            expect(Level.DEBUG.getLevelStr()).assertEqual('DEBUG');
        });
        it('levelTest6', 0, () => {
            expect(Level.TRACE.getLevelInt()).assertEqual(Level.TRACE_INT);
        });
        it('levelTest61', 0, () => {
            expect(Level.TRACE.getLevelStr()).assertEqual("TRACE");
        });
        it('levelTest7', 0, () => {
            expect(Level.FATAL.getLevelInt()).not().assertEqual(Level.ERROR_INT);
        });
        it('levelTest71', 0, () => {
            expect(Level.FATAL.getLevelStr()).not().assertEqual("ERROR");
        });
        it('levelTest8', 0, () => {
            expect(Level.ERROR.getLevelInt()).not().assertEqual(Level.FATAL_INT);
        });
        it('levelTest81', 0, () => {
            expect(Level.ERROR.getLevelStr()).not().assertEqual("FATAL");
        });
        it('levelTest9', 0, () => {
            expect(Level.WARN.getLevelInt()).not().assertEqual(Level.INFO_INT);
        });
        it('levelTest91', 0, () => {
            expect(Level.WARN.getLevelStr()).not().assertEqual("INFO");
        });
        it('levelTest10', 0, () => {
            expect(Level.INFO.getLevelInt()).not().assertEqual(Level.WARN_INT);
        });
        it('levelTest101', 0, () => {
            expect(Level.INFO.getLevelStr()).not().assertEqual("WARN");
        });
        it('levelTest112', 0, () => {
            expect(Level.DEBUG.getLevelInt()).not().assertEqual(Level.TRACE_INT);
        });
        it('levelTest111', 0, () => {
            expect(Level.DEBUG.getLevelStr()).not().assertEqual("TRACE");
        });
        it('levelTest12', 0, () => {
            expect(Level.TRACE.getLevelInt()).not().assertEqual(Level.DEBUG_INT);
        });
        it('levelTest121', 0, () => {
            expect(Level.TRACE.getLevelStr()).not().assertEqual("DEBUG");
        });
        //MDC
        it('MDCTest1', 0, () => {
            let k: string = "key";
            let v: string = "value";
            MDC.put(k, v);
            expect(MDC.mdcMap.has(k)).assertTrue();
            expect(MDC.mdcMap.get(k)).assertEqual(v);
        });
        it('MDCTest2', 0, () => {
            let k: string = "key";
            let v: string = "value";
            MDC.put(k, v);
            expect(MDC.mdcMap.has('ke')).assertFalse();
            expect(MDC.mdcMap.get('ke')).not().assertEqual(v);
        });
        it('MDCTest3', 0, () => {
            let k: string = "key";
            let v: string = "value";
            MDC.put(k, v);
            expect(MDC.mdcMap.has('k')).assertFalse();
            expect(MDC.mdcMap.get(k)).assertEqual(v);
        });
        it('MDCTest4', 0, () => {
            let k: string = "key";
            let v: string = "value";
            MDC.put(k, v);
            expect(MDC.mdcMap.has(k)).assertTrue();
            expect(MDC.mdcMap.get('k')).not().assertEqual(v);
        });
        it('MDCTest5', 0, () => {
            let k: string = "key";
            let v: string = "value";
            MDC.put(k, v);
            expect(MDC.mdcMap.has(k)).assertTrue();
            expect(MDC.mdcMap.get(k)).not().assertEqual('v');
        });
        //LoggerFactory
        it('loggerFactoryTest1', 0, () => {
            expect(LoggerFactory.getILoggerFactory(ctx)).not().assertNull();
        });
        it('loggerFactoryTest2', 0, () => {
            let root: Logger = LoggerFactory.getLogger(ctx, Logger.ROOT_LOGGER_NAME);
            expect(root).not().assertNull();
        });
        it('loggerFactoryTest3', 0, () => {
            let factory = LoggerFactory.getILoggerFactory(ctx);
            let logger = factory.getLogger('a');
            expect(logger).not().assertNull();
        });
        it('loggerFactoryTest4', 0, () => {
            let root: Logger = LoggerFactory.getLogger(ctx, Logger.ROOT_LOGGER_NAME);
            expect(root.getTag()).assertEqual('');
        });
        it('loggerFactoryTest5', 0, () => {
            let root: Logger = LoggerFactory.getLogger(ctx, Logger.ROOT_LOGGER_NAME);
            expect(root.getTag()).not().assertEqual('a');
        });
        it('loggerFactoryTest6', 0, () => {
            let root: Logger = LoggerFactory.getLogger(ctx, Logger.ROOT_LOGGER_NAME);
            expect(root.getLevel()).not().assertNull();
        });
        it('loggerFactoryTest7', 0, () => {
            let root: Logger = LoggerFactory.getLogger(ctx, Logger.ROOT_LOGGER_NAME);
            expect(root.getLevel()).assertEqual(Level.INFO);
        });
        it('loggerFactoryTest8', 0, () => {
            let root: Logger = LoggerFactory.getLogger(ctx, Logger.ROOT_LOGGER_NAME);
            expect(root.getLevel().getLevelInt()).assertEqual(20000);
        });
        it('loggerFactoryTest9', 0, () => {
            let root: Logger = LoggerFactory.getLogger(ctx, Logger.ROOT_LOGGER_NAME);
            expect(root.getLevel().getLevelStr()).assertEqual('INFO');
        });
        it('loggerFactoryTest10', 0, () => {
            let root: Logger = LoggerFactory.getLogger(ctx, Logger.ROOT_LOGGER_NAME);
            expect(root.getLevel().getLevelInt()).not().assertEqual(30000);
        });
        it('loggerFactoryTest11', 0, () => {
            let root: Logger = LoggerFactory.getLogger(ctx, Logger.ROOT_LOGGER_NAME);
            expect(root.getLevel().getLevelStr()).not().assertEqual('WARN');
        });
        //Logger
        it('LoggerTest1', 0, () => {
            let logger: Logger = LoggerFactory.getLogger(ctx, "com.log.hello");
            let tag: string = "logback";
            logger.setTag(tag);
            expect(logger.getTag()).assertEqual(tag);
        });
        it('LoggerTest3', 0, () => {
            let logger: Logger = LoggerFactory.getLogger(ctx, "com.log.hello");
            let tag: string = "log";
            logger.setTag(tag);
            expect(logger.getTag()).assertEqual(tag);
        });
        it('LoggerTest5', 0, () => {
            let logger: Logger = LoggerFactory.getLogger(ctx, "com.log.hello");
            let tag: string = "logbacks";
            logger.setTag(tag);
            expect(logger.getTag()).assertEqual(tag);
        });
        it('LoggerTest31', 0, () => {
            let logger: Logger = LoggerFactory.getLogger(ctx, "com.log.hel");
            let tag: string = "tag";
            logger.setTag(tag);
            expect(logger.getTag()).assertEqual(tag);
        });
        it('LoggerTest51', 0, () => {
            let logger: Logger = LoggerFactory.getLogger(ctx, "com.log.heo");
            let tag: string = "logs";
            logger.setTag(tag);
            expect(logger.getTag()).assertEqual(tag);
        });
        it('LoggerTest2', 0, () => {
            let logger: Logger = LoggerFactory.getLogger(ctx, "com.log.hello");
            let level: Level = Level.INFO;
            logger.setLevel(level);
            expect(logger.getLevel()).assertEqual(level);
        });
        it('LoggerTest4', 0, () => {
            let logger: Logger = LoggerFactory.getLogger(ctx, "com.log.hello");
            let level: Level = Level.WARN;
            logger.setLevel(level);
            expect(logger.getLevel()).assertEqual(level);
        });
        it('LoggerTest6', 0, () => {
            let logger: Logger = LoggerFactory.getLogger(ctx, "com.log.hello");
            let level: Level = Level.FATAL;
            logger.setLevel(level);
            expect(logger.getLevel()).assertEqual(level);
        });
        it('LoggerTest7', 0, () => {
            let logger: Logger = LoggerFactory.getLogger(ctx, "com.log.hello");
            let level: Level = Level.DEBUG;
            logger.setLevel(level);
            expect(logger.getLevel()).assertEqual(level);
        });
        it('LoggerTest8', 0, () => {
            let logger: Logger = LoggerFactory.getLogger(ctx, "com.log.hello");
            let level: Level = Level.TRACE;
            logger.setLevel(level);
            expect(logger.getLevel()).assertEqual(level);
        });
    });
}
