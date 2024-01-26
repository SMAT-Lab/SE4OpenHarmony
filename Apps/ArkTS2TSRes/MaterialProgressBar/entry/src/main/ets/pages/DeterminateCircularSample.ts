interface DeterminateCircularSample_Params {
    progress?: number;
    progressSecond?: number;
    angle?: number;
    times?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DeterminateCircularSample_" + ++__generate__Id;
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
import router from '@ohos.router';
import { CircularComponent } from '@ohos/materialprogressbar';
class DeterminateCircularSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__progress = new ObservedPropertySimple(0, this, "progress");
        this.__progressSecond = new ObservedPropertySimple(10, this, "progressSecond");
        this.__angle = new ObservedPropertySimple(0, this, "angle");
        this.times = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DeterminateCircularSample_Params) {
        if (params.progress !== undefined) {
            this.progress = params.progress;
        }
        if (params.progressSecond !== undefined) {
            this.progressSecond = params.progressSecond;
        }
        if (params.angle !== undefined) {
            this.angle = params.angle;
        }
        if (params.times !== undefined) {
            this.times = params.times;
        }
    }
    aboutToBeDeleted() {
        this.__progress.aboutToBeDeleted();
        this.__progressSecond.aboutToBeDeleted();
        this.__angle.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __progress: ObservedPropertySimple<number>;
    get progress() {
        return this.__progress.get();
    }
    set progress(newValue: number) {
        this.__progress.set(newValue);
    }
    private __progressSecond: ObservedPropertySimple<number>;
    get progressSecond() {
        return this.__progressSecond.get();
    }
    set progressSecond(newValue: number) {
        this.__progressSecond.set(newValue);
    }
    private __angle: ObservedPropertySimple<number>;
    get angle() {
        return this.__angle.get();
    }
    set angle(newValue: number) {
        this.__angle.set(newValue);
    }
    private times: number;
    aboutToAppear() {
        let intervalId = setInterval(() => {
            this.times++;
            this.progress++;
            this.angle += 4;
            if (this.angle > 360) {
                this.angle = 360;
            }
            if (this.progress < 30) {
                this.progressSecond += 1.3;
            }
            else {
                this.progressSecond += 1;
            }
            if (this.progress > 100) {
                this.progress = 100;
            }
            if (this.times > 150) {
                this.times = 0;
                this.progress = 0;
                this.progressSecond = 0;
                this.angle = 0;
            }
        }, 30);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, });
        Flex.width('100%');
        Flex.height('100%');
        Flex.padding(10);
        Text.create('< Back');
        Text.fontSize(22);
        Text.onClick(() => {
            router.back();
        });
        Text.pop();
        Text.create('Normal Style');
        Text.fontSize(18);
        Text.margin({ top: 5, bottom: 5 });
        Text.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.SpaceAround });
        Flex.height(48);
        Flex.width('100%');
        Flex.padding({ top: 10 });
        Flex.pop();
        Text.create('Normal Style (Tinted)');
        Text.fontSize(18);
        Text.margin({ top: 5, bottom: 5 });
        Text.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.SpaceAround });
        Flex.height(48);
        Flex.width('100%');
        Flex.padding({ top: 10 });
        Flex.pop();
        Text.create('Dynamic Style');
        Text.fontSize(18);
        Text.margin({ top: 5, bottom: 5 });
        Text.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.SpaceAround });
        Flex.height(48);
        Flex.width('100%');
        Flex.padding({ top: 10 });
        Flex.pop();
        Text.create('Dynamic Style (Tinted)');
        Text.fontSize(18);
        Text.margin({ top: 5, bottom: 5 });
        Text.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.SpaceAround });
        Flex.height(48);
        Flex.width('100%');
        Flex.padding({ top: 10 });
        Flex.pop();
        Flex.pop();
    }
}
loadDocument(new DeterminateCircularSample("1", undefined, {}));
