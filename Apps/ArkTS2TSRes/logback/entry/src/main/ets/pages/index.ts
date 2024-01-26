interface Index_Params {
    scroller?: Scroller;
    config?: Configuration;
    context?: Context;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
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
import { Logger, Level, LoggerFactory, MDC, Configuration } from '@ohos/logback';
import * as entry from '../entryability/EntryAbility';
import { Context } from '@ohos.abilityAccessCtrl';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.config = {
            appender: entry.appender,
            logger: entry.logger,
            root: entry.root
        };
        this.context = getContext();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.config !== undefined) {
            this.config = params.config;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private config: Configuration;
    private context: Context;
    render() {
        Scroll.create(this.scroller);
        Scroll.height('100%');
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBarWidth(0);
        Scroll.backgroundColor(Color.White);
        Column.create();
        Column.width('100%');
        // 无需配置文件，使用默认
        Text.create("无配置文件打印日志");
        // 无需配置文件，使用默认
        Text.fontSize(20);
        // 无需配置文件，使用默认
        Text.margin(30);
        // 无需配置文件，使用默认
        Text.onClick(() => {
            let logger: Logger = LoggerFactory.getLogger(this.context, "com.log.hello");
            logger.setTag('logback');
            // print all
            logger.debug("this is debug log.");
            logger.info("this is info log.");
            logger.warn("this is warn log.");
            logger.error("this is error log.");
            logger.fatal("this is fatal log.");
        });
        // 无需配置文件，使用默认
        Text.pop();
        // 无需配置文件，使用默认
        Text.create("无配置文件-根据日志级别过滤打印日志");
        // 无需配置文件，使用默认
        Text.fontSize(20);
        // 无需配置文件，使用默认
        Text.margin(30);
        // 无需配置文件，使用默认
        Text.onClick(() => {
            let logger: Logger = LoggerFactory.getLogger(this.context, "com.log.hello");
            logger.setLevel(Level.INFO);
            logger.setTag('logback');
            // not print debug,print others
            logger.debug("this is debug log.");
            logger.info("this is info log.");
            logger.warn("this is warn log.");
            logger.error("this is error log.");
            logger.fatal("this is fatal log.");
        });
        // 无需配置文件，使用默认
        Text.pop();
        // 配置文件中不需要配置logger节点，只需要配置root节点
        Text.create("root指定level将日志输出到控制台");
        // 配置文件中不需要配置logger节点，只需要配置root节点
        Text.fontSize(20);
        // 配置文件中不需要配置logger节点，只需要配置root节点
        Text.margin(30);
        // 配置文件中不需要配置logger节点，只需要配置root节点
        Text.onClick(() => {
            let config: Configuration = {
                appender: entry.appender,
                root: entry.root
            };
            let logger: Logger = LoggerFactory.getLogger(this.context, "com.log.hello", config);
            logger.setTag('logback');
            // ROOT level is ERROR,print error、 fatal
            logger.debug("=====debug=====");
            logger.info("=====info=====");
            logger.warn("=====warn=====");
            logger.error("=====error=====");
            logger.fatal("=====fatal=====");
        });
        // 配置文件中不需要配置logger节点，只需要配置root节点
        Text.pop();
        Text.create("logger指定level将日志输出到控制台");
        Text.fontSize(20);
        Text.margin(30);
        Text.onClick(() => {
            let logger: Logger = LoggerFactory.getLogger(this.context, "com.log.logger", this.config);
            logger.setTag('logback');
            // logger level is FATAL,print fatal
            logger.debug("=====debug=====");
            logger.info("=====info=====");
            logger.warn("=====warn=====");
            logger.error("=====error=====");
            logger.fatal("=====fatal=====");
        });
        Text.pop();
        Text.create("使用ConsoleAppender和ThresholdFilter过滤打印日志");
        Text.fontSize(20);
        Text.margin(30);
        Text.onClick(() => {
            let logger: Logger = LoggerFactory.getLogger(this.context, "com.log.threshold", this.config);
            logger.setTag('logback');
            // threshold level is INFO，print info、warn、error、fatal
            logger.debug("=====debug=====");
            logger.info("=====info=====");
            logger.warn("=====warn=====");
            logger.error("=====error=====");
            logger.fatal("=====fatal=====");
        });
        Text.pop();
        Text.create("使用ConsoleAppender和LevelFilter过滤打印日志");
        Text.fontSize(20);
        Text.margin(30);
        Text.onClick(() => {
            let logger: Logger = LoggerFactory.getLogger(this.context, "com.log.level", this.config);
            logger.setTag('logback');
            // level level is WARN,but onMismatch is Match.DENY,print warn
            logger.debug("=====debug=====");
            logger.info("=====info=====");
            logger.warn("=====warn=====");
            logger.error("=====error=====");
            logger.fatal("=====fatal=====");
        });
        Text.pop();
        Text.create("使用FileAppender将日志写到文件");
        Text.fontSize(20);
        Text.margin(30);
        Text.onClick(() => {
            let logger: Logger = LoggerFactory.getLogger(this.context, "com.log.file", this.config);
            // file path /data/app/el2/100/base/cn.openharmony.logback/haps/entry/files/111.log
            // file level is ERROR,print error、fatal to file 111.log
            logger.debug("this is debug");
            logger.info("this is info");
            logger.warn("this is warn");
            logger.error("this is error");
            logger.fatal("this is fatal");
        });
        Text.pop();
        Text.create("使用SMTPAppender保存文件");
        Text.fontSize(20);
        Text.margin(30);
        Text.onClick(async () => {
            let logger: Logger = LoggerFactory.getLogger(this.context, "com.log.smtp", this.config);
            logger.debug("this is debug");
            logger.info("this is info");
            logger.warn("this is warn");
            logger.error("this is error");
            logger.fatal("this is fatal");
        });
        Text.pop();
        Text.create("使用SiftingAppender保存文件");
        Text.fontSize(20);
        Text.margin(30);
        Text.onClick(() => {
            let logger: Logger = LoggerFactory.getLogger(this.context, "com.log.sift", this.config);
            // file path /data/app/el2/100/base/cn.openharmony.logback/haps/entry/files/100001.log
            MDC.put("userid", "100001");
            // sift level is INFO,print info、warn、error、fatal to file 100001.log
            logger.debug("=====debug 100001=====");
            logger.info("=====info 100001=====");
            logger.warn("=====warn 100001=====");
            logger.error("=====error 100001=====");
            logger.fatal("=====fatal 100001=====");
            // file path /data/app/el2/100/base/cn.openharmony.logback/haps/entry/files/100002.log
            MDC.put("userid", "100002");
            // sift level is INFO,print info、warn、error、fatal to file 100002.log
            logger.debug("debug 100002");
            logger.info("info 100002");
            logger.warn("warn 100002");
            logger.error("error 100002");
            logger.fatal("fatal 100002");
        });
        Text.pop();
        Text.create("使用DBAppender保存文件");
        Text.fontSize(20);
        Text.margin(30);
        Text.onClick(() => {
            let logger: Logger = LoggerFactory.getLogger(this.context, "com.log.db", this.config);
            // file path /data/app/el2/100/database/cn.openharmony.logback/entry/rdb/logback_rdb.db
            // db level is INFO,print info、warn、error、fatal to db file
            logger.debug("=====debug=====");
            logger.info("=====info=====");
            logger.warn("=====warn=====");
            logger.error("=====error=====");
            logger.fatal("=====fatal=====");
        });
        Text.pop();
        Text.create("使用RollingFileAppender保存文件");
        Text.fontSize(20);
        Text.margin(30);
        Text.onClick(() => {
            let logger: Logger = LoggerFactory.getLogger(this.context, "com.log.rolling", this.config);
            // file path /data/app/el2/100/base/cn.openharmony.logback/haps/entry/files/rolling.log
            for (let i = 0; i < 200; i++) {
                // level is WARN,print warn、error、fatal to file rolling.log
                logger.debug("=====debug=====");
                logger.info("=====info=====");
                logger.warn("=====warn=====");
                logger.error("=====error=====");
                logger.fatal("=====fatal=====");
            }
        });
        Text.pop();
        Text.create("使用SocketAppender保存文件");
        Text.fontSize(20);
        Text.margin(30);
        Text.onClick(() => {
            let logger: Logger = LoggerFactory.getLogger(this.context, "com.log.socket", this.config);
            setTimeout(() => {
                // level is WARN,print warn、error、fatal to socket address ...
                logger.debug("=====debug=====");
                logger.info("=====info=====");
                logger.warn("=====warn=====");
                logger.error("=====error=====");
                logger.fatal("=====fatal=====");
            }, 1000);
        });
        Text.pop();
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
