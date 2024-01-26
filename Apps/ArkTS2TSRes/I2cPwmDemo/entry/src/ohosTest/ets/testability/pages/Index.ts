interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/* Copyright 2022 Unionman Technology Co., Ltd.
 *
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
 *
 */
import hilog from '@ohos.hilog';
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
        hilog.info(0x0000, 'testTag', '%{public}s', 'TestAbility index aboutToAppear');
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('50%');
        Column.alignItems(HorizontalAlign.Center);
        Row.create();
        Text.create("i2c获取温度值");
        Text.pop();
        Text.create("测试中...");
        Text.id("temperatureTest");
        Text.margin({ left: "100px" });
        Text.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: "50px" });
        Text.create("i2c获取湿度值");
        Text.pop();
        Text.create("测试中...");
        Text.id("humidityTest");
        Text.margin({ left: "100px" });
        Text.pop();
        Row.pop();
        Column.pop();
        Column.create();
        Column.margin({ top: "-80px" });
        Column.width('50%');
        Row.create();
        Text.create("pwm转动");
        Text.pop();
        Text.create("测试中...");
        Text.id("pwmTest");
        Text.margin({ left: "100px" });
        Text.pop();
        Row.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
