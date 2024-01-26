interface ObserverAbilityLevel_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ObserverAbilityLevel_" + ++__generate__Id;
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
import { LiveEventBus } from '@ohos/liveeventbus';
const KEY_TEST_ACTIVE_LEVEL_SINGLE: string = "key_test_active_level_single";
const KEY_TEST_ACTIVE_LEVEL: string = "key_test_active_level";
class ObserverAbilityLevel extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ObserverAbilityLevel_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    aboutToAppear() {
        LiveEventBus.getObservableConfig(KEY_TEST_ACTIVE_LEVEL_SINGLE)
            .lifecycleObserverAlwaysActive(false);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Text.create('测试Observer Active Level');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.createWithLabel('发送消息给已经Stop的Ability');
        Button.onClick((event) => {
            this.sendMsgToPrevent();
        });
        Button.pop();
        Button.createWithLabel('发送消息给已经Stop的Ability');
        Button.onClick((event) => {
            this.sendMsgToPreventSingle();
        });
        Button.pop();
        Flex.pop();
    }
    public sendMsgToPrevent() {
        LiveEventBus
            .get<string>(KEY_TEST_ACTIVE_LEVEL)
            .post("Send Msg To Observer Stopped");
    }
    public sendMsgToPreventSingle() {
        LiveEventBus
            .get<string>(KEY_TEST_ACTIVE_LEVEL_SINGLE)
            .post("Send Msg To Observer Stopped");
    }
}
loadDocument(new ObserverAbilityLevel("1", undefined, {}));
