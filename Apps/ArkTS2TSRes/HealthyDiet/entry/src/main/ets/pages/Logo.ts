interface Logo_Params {
    opacityValue?: number;
    scaleValue?: number;
    rightPath?: string;
    rightBottomPath?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Logo_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import curves from '@ohos.curves';
import router from '@ohos.router';
class Logo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__opacityValue = new ObservedPropertySimple(0, this, "opacityValue");
        this.__scaleValue = new ObservedPropertySimple(0, this, "scaleValue");
        this.rightPath = 'M319.5 128.1 c103.5 0 187.5 84 187.5 187.5 v15 a172.5 172.5 0 0 3 -172.5 172.5 H198 a36 36 0 0 3 -13.8 -1 207 207 0 0 0 87 -372 h48.3 z';
        this.rightBottomPath = 'M270.6 128.1 h48.6 c51.6 0 98.4 21 132.3 54.6 a411 411 0 0 3 -45.6 123 c-25.2 45.6 -56.4 84 -87.6 110.4 a206.1 206.1 0 0 0 -47.7 -288 z';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Logo_Params) {
        if (params.opacityValue !== undefined) {
            this.opacityValue = params.opacityValue;
        }
        if (params.scaleValue !== undefined) {
            this.scaleValue = params.scaleValue;
        }
        if (params.rightPath !== undefined) {
            this.rightPath = params.rightPath;
        }
        if (params.rightBottomPath !== undefined) {
            this.rightBottomPath = params.rightBottomPath;
        }
    }
    aboutToBeDeleted() {
        this.__opacityValue.aboutToBeDeleted();
        this.__scaleValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __opacityValue: ObservedPropertySimple<number>;
    get opacityValue() {
        return this.__opacityValue.get();
    }
    set opacityValue(newValue: number) {
        this.__opacityValue.set(newValue);
    }
    private __scaleValue: ObservedPropertySimple<number>;
    get scaleValue() {
        return this.__scaleValue.get();
    }
    set scaleValue(newValue: number) {
        this.__scaleValue.set(newValue);
    }
    private rightPath: string;
    private rightBottomPath: string;
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Flex.linearGradient({ angle: 180, colors: [['#BDE895', 0.1], ['#95DE7F', 0.6], ['#7AB967', 1]] });
        Shape.create();
        Shape.height(210);
        Shape.width(210);
        Shape.scale({ x: this.scaleValue, y: this.scaleValue });
        Shape.opacity(this.opacityValue);
        Shape.onAppear(() => {
            Context.animateTo({
                duration: 1000,
                curve: curves.cubicBezier(0.4, 0, 1, 1),
                delay: 100,
                onFinish: () => {
                    setTimeout(() => {
                        router.replace({ url: 'pages/Home' });
                    }, 1000);
                }
            }, () => {
                this.opacityValue = 1;
                this.scaleValue = 1;
            });
        });
        Path.create();
        Path.commands('M162 128.7 a222 222 0 0 1 100.8 374.4 H198 a36 36 0 0 3 -36 -36');
        Path.fill(Color.White);
        Path.create();
        Path.commands(this.rightPath);
        Path.fill('none');
        Path.linearGradient({ angle: 30, colors: [['#C4FFA0', 0], ['#ffffff', 1]] });
        Path.clip(new Path().commands(this.rightPath));
        Path.create();
        Path.commands(this.rightBottomPath);
        Path.fill('none');
        Path.linearGradient({ angle: 50, colors: [['#8CC36A', 0.1], ['#B3EB90', 0.4], ['#ffffff', 0.7]] });
        Path.clip(new Path().commands(this.rightBottomPath));
        Shape.pop();
        Text.create($r("app.string.healthy_diet"));
        Text.fontSize(26);
        Text.fontColor(Color.White);
        Text.margin({ top: 300 });
        Text.pop();
        Text.create($r("app.string.logo_description"));
        Text.fontSize(17);
        Text.fontColor(Color.White);
        Text.margin({ top: 4 });
        Text.pop();
        Flex.pop();
    }
}
loadDocument(new Logo("1", undefined, {}));
