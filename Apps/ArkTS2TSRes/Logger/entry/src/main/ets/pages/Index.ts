interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
import common from '@ohos.app.ability.common';
import { Logger, Configure, LogLevel } from '@ohos/log';
let logger = new Logger(getContext(this) as common.UIAbilityContext);
let level: LogLevel = LogLevel.DEBUG;
let configure = new Configure(['file'], 'log.txt', 'Index', level);
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    aboutToAppear() {
        logger.setConfigure(configure);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor('#F1F1F1');
        Row.create();
        Row.height('6%');
        Row.width('100%');
        Row.padding({ left: 15 });
        Row.backgroundColor('#0D9FFB');
        Row.constraintSize({ minHeight: 50 });
        Text.create($r('app.string.EntryAbility_label'));
        Text.fontSize(18);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Row.pop();
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Button.createWithLabel($r('app.string.log'));
        Button.id('log');
        Button.fontSize(30);
        Button.width('55%');
        Button.height('8%');
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            for (let i = 0; i <= 4; i++) { //  测试日志打印运行次数常量
                if ((i < 2)) { //  测试日志打印运行次数常量
                    logger.debug(`This is a debug message. Message number: ${i}`);
                }
                else {
                    logger.warn(`This is a warning message. Message number: ${i}`);
                }
                for (let j = 0; j <= 4; j++) { //  测试日志打印运行次数常量
                    if ((j < 2)) { //  测试日志打印运行次数常量
                        logger.info(`This is a info message. Message number: ${j}`);
                    }
                    else {
                        logger.fatal(`This is a fatal message. Message number: ${j}`);
                    }
                    logger.error(`This is a error message. i type of ${typeof (i)} j type of ${typeof (j)}`);
                }
            }
        });
        Button.pop();
        Flex.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
