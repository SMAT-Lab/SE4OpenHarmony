interface Index_Params {
    pwmAngle?: number;
    pwmPin?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/* Copyright 2023 Unionman Technology Co., Ltd.
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
// @ts-nocheck
import hilog from '@ohos.hilog';
import pwmtest from '@ohos.pwmtest';
import promptAction from '@ohos.promptAction';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__pwmAngle = new ObservedPropertySimple(0
        // 舵机的引脚,默认是引脚1
        , this, "pwmAngle");
        this.__pwmPin = new ObservedPropertySimple(1, this, "pwmPin");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.pwmAngle !== undefined) {
            this.pwmAngle = params.pwmAngle;
        }
        if (params.pwmPin !== undefined) {
            this.pwmPin = params.pwmPin;
        }
    }
    aboutToBeDeleted() {
        this.__pwmAngle.aboutToBeDeleted();
        this.__pwmPin.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 舵机的角度
    private __pwmAngle: ObservedPropertySimple<number>;
    get pwmAngle() {
        return this.__pwmAngle.get();
    }
    set pwmAngle(newValue: number) {
        this.__pwmAngle.set(newValue);
    }
    // 舵机的引脚,默认是引脚1
    private __pwmPin: ObservedPropertySimple<number>;
    get pwmPin() {
        return this.__pwmPin.get();
    }
    set pwmPin(newValue: number) {
        this.__pwmPin.set(newValue);
    }
    aboutToAppear() {
        hilog.info(0x0000, 'testTag', '%{public}s', 'TestAbility index aboutToAppear');
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Button.createWithLabel('选择引脚');
        Button.onClick(() => {
            ActionSheet.show({
                title: '舵机的引脚',
                message: '选择引脚如下',
                autoCancel: false,
                cancel: () => {
                    console.log('actionSheet canceled');
                },
                alignment: DialogAlignment.Bottom,
                offset: { dx: 0, dy: -10 },
                sheets: [
                    {
                        title: '引脚1',
                        action: () => {
                            this.pwmPin = 1;
                            console.log('select the servo pwmPin ' + this.pwmPin);
                        }
                    },
                    {
                        title: '引脚2',
                        action: () => {
                            this.pwmPin = 2;
                            console.log('select the servo pwmPin ' + this.pwmPin);
                        }
                    }
                ]
            });
        });
        Button.pop();
        TextInput.create({ text: this.pwmAngle, placeholder: '输入舵机要转动的角度...', controller: this.controller });
        TextInput.placeholderColor(Color.Grey);
        TextInput.placeholderFont({ size: 14, weight: 400 });
        TextInput.caretColor(Color.Blue);
        TextInput.width(400);
        TextInput.height(40);
        TextInput.margin(20);
        TextInput.fontSize(14);
        TextInput.fontColor(Color.Black);
        TextInput.inputFilter('[0-9]', (e) => {
            console.log('The servo angle is' + JSON.stringify(e));
        });
        TextInput.onChange((value: number) => {
            this.pwmAngle = value;
            if (value > 180) {
                this.pwmAngle = 0;
                try {
                    promptAction.showToast({
                        message: "角度范围在0-180！",
                        duration: 2000
                    });
                }
                catch (error) {
                    console.error(`showToast args error code is ${error.code}, message is ${error.message}`);
                }
                ;
            }
            console.log('select the this.pwmAngle is ' + this.pwmAngle);
        });
        Row.create();
        Text.create('选择的引脚为：' + this.pwmPin);
        Text.pop();
        Divider.create();
        Divider.vertical(true);
        Divider.height(22);
        Divider.color('#182431');
        Divider.opacity(0.6);
        Divider.margin({ left: 8, right: 8 });
        Text.create('舵机的角度为：' + this.pwmAngle);
        Text.pop();
        Row.pop();
        Divider.create();
        Divider.vertical(false);
        Divider.height(22);
        Divider.color('#182431');
        Divider.opacity(0.6);
        Divider.margin({ left: 8, right: 8 });
        Button.createWithLabel('启动');
        Button.onClick(() => {
            pwmtest.setPwmStatus(this.pwmPin, this.pwmAngle);
        });
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
