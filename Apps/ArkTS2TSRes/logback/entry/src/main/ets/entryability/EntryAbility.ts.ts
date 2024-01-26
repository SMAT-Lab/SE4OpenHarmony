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
import Ability from '@ohos.app.ability.UIAbility';
import { Level, AppenderEnum, FilterEnum, Configuration, Match } from '@ohos/logback';
import hilog from '@ohos.hilog';
let root = {
    level: Level.ERROR,
    appenderRef: {
        ref: 'ROOT'
    }
};
let logger = [
    {
        name: 'com.log.logger',
        additivity: true,
        level: Level.FATAL,
        appenderRef: {
            ref: 'LOGGER'
        }
    },
    {
        name: 'com.log.threshold',
        additivity: true,
        level: Level.WARN,
        appenderRef: {
            ref: 'THRESHOLD'
        }
    },
    {
        name: 'com.log.level',
        additivity: true,
        level: Level.WARN,
        appenderRef: {
            ref: 'LEVEL'
        }
    },
    {
        name: 'com.log.file',
        additivity: true,
        level: Level.WARN,
        appenderRef: {
            ref: 'LOGFILE'
        }
    },
    {
        name: 'com.log.smtp',
        additivity: true,
        level: Level.ERROR,
        appenderRef: {
            ref: 'SMTP'
        }
    },
    {
        name: 'com.log.sift',
        additivity: true,
        level: Level.WARN,
        appenderRef: {
            ref: 'SIFT'
        }
    },
    {
        name: 'com.log.db',
        additivity: true,
        level: Level.WARN,
        appenderRef: {
            ref: 'DB'
        }
    },
    {
        name: 'com.log.rolling',
        additivity: true,
        level: Level.WARN,
        appenderRef: {
            ref: 'ROLLING'
        }
    },
    {
        name: 'com.log.socket',
        additivity: true,
        level: Level.WARN,
        appenderRef: {
            ref: 'SOCKET'
        }
    }
];
let appender = [
    {
        name: 'ROOT',
        className: AppenderEnum.CONSOLE,
        encoder: {
            pattern: {
                msg: '%date %level %logger %msg'
            }
        }
    },
    {
        name: 'LOGGER',
        className: AppenderEnum.CONSOLE,
        encoder: {
            pattern: {
                msg: '%date %level %logger %msg'
            }
        }
    },
    {
        name: 'THRESHOLD',
        className: AppenderEnum.CONSOLE,
        encoder: {
            pattern: {
                msg: '%date %level %logger %msg'
            }
        },
        filter: {
            className: FilterEnum.THRESHOLD,
            level: Level.INFO,
        }
    },
    {
        name: 'LEVEL',
        className: AppenderEnum.CONSOLE,
        encoder: {
            pattern: {
                msg: '%date %level %logger %msg'
            }
        },
        filter: {
            className: FilterEnum.LEVEL,
            level: Level.WARN,
            onMatch: Match.ACCEPT,
            onMismatch: Match.DENY
        }
    },
    {
        name: 'LOGFILE',
        className: AppenderEnum.FILE,
        file: '111.log',
        encoder: {
            pattern: {
                msg: '%level %logger %msg'
            }
        },
        filter: {
            className: FilterEnum.THRESHOLD,
            level: Level.ERROR,
        }
    },
    {
        name: 'SMTP',
        className: AppenderEnum.SMTP,
        fromMail: "xxx1@xxx.com",
        toMail: "xxx2@xxx.com",
        subject: "mail subject",
        // 服务器域名
        smtpHost: "smtp host",
        smtpPort: 25,
        username: "xxx",
        // 邮件三方授权码
        password: "xxx",
        localHost: "xxx"
    },
    {
        name: 'SIFT',
        className: AppenderEnum.SIFT,
        discriminator: {
            Key: 'userid',
            DefaultValue: 'unknown'
        },
        sift: {
            appender: {
                file: '${userid}.log',
                className: AppenderEnum.FILE,
                encoder: {
                    pattern: {
                        msg: '%level %logger %msg'
                    }
                },
                filter: {
                    className: FilterEnum.THRESHOLD,
                    level: Level.INFO,
                }
            },
            mdc: [
                { key: 'userid', value: '100001' },
                { key: 'userid', value: '100002' }
            ]
        }
    },
    {
        name: 'DB',
        className: AppenderEnum.DB,
        storeName: 'logback_rdb.db',
        encoder: {
            pattern: {
                msg: '%date %level %logger %msg'
            }
        },
        filter: {
            className: FilterEnum.THRESHOLD,
            level: Level.INFO,
        }
    },
    {
        name: 'ROLLING',
        className: AppenderEnum.ROLLING_FILE,
        encoder: {
            pattern: {
                msg: '%date %level %logger %msg'
            }
        },
        rollingPolicy: {
            fileName: 'rolling.log',
            filePattern: 'rolling-%d{yyyy-MM-dd HH:mm:ss}.log',
            maxHistory: 5
        }
    },
    {
        name: 'SOCKET',
        className: AppenderEnum.SOCKET,
        localHost: '10.0.5.1',
        remoteHost: '10.0.5.2',
        port: 8090
    }
];
export { root, appender, logger };
export default class EntryAbility extends Ability {
    onCreate(want, launchParam) {
        console.log("[Demo] MainAbility onCreate");
    }
    onDestroy() {
        console.log("[Demo] MainAbility onDestroy");
    }
    onWindowStageCreate(windowStage) {
        // Main window is created, set main page for this ability
        console.log("[Demo] MainAbility onWindowStageCreate");
        windowStage.loadContent('pages/index', (err, data) => {
            if (err.code) {
                hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
                return;
            }
            hilog.info(0x0000, 'testTag', 'Succeeded in loading the content. Data: %{public}s', JSON.stringify(data) ?? '');
        });
    }
    onWindowStageDestroy() {
        // Main window is destroyed, release UI related resources
        console.log("[Demo] MainAbility onWindowStageDestroy");
    }
    onForeground() {
        // Ability has brought to foreground
        console.log("[Demo] MainAbility onForeground");
    }
    onBackground() {
        // Ability has back to background
        console.log("[Demo] MainAbility onBackground");
    }
}
