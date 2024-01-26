interface headsetInButton_Params {
    backColor?: Color;
    btnName?: string;
    intervalID?;
    audioManager?;
    audioRoutingManager?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "headsetInButton_" + ++__generate__Id;
}
/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { commonButton } from './commonButton';
// @ts-ignore
import adc_napi from '@ohos.adc';
import audio from '@ohos.multimedia.audio'; // 导入audio模块
import inputDevice from '@ohos.multimodalInput.inputDevice';
import Logger from '../../../utils/Logger';
const TAG = '[headsetInButton]';
export class headsetInButton extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__backColor = new ObservedPropertySimple(Color.Red, this, "backColor");
        this.__btnName = new ObservedPropertySimple("耳机接入", this, "btnName");
        this.intervalID = undefined;
        this.audioManager = audio.getAudioManager();
        this.audioRoutingManager = this.audioManager.getRoutingManager();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: headsetInButton_Params) {
        if (params.backColor !== undefined) {
            this.backColor = params.backColor;
        }
        if (params.btnName !== undefined) {
            this.btnName = params.btnName;
        }
        if (params.intervalID !== undefined) {
            this.intervalID = params.intervalID;
        }
        if (params.audioManager !== undefined) {
            this.audioManager = params.audioManager;
        }
        if (params.audioRoutingManager !== undefined) {
            this.audioRoutingManager = params.audioRoutingManager;
        }
    }
    aboutToBeDeleted() {
        this.__backColor.aboutToBeDeleted();
        this.__btnName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __backColor: ObservedPropertySimple<Color>;
    get backColor() {
        return this.__backColor.get();
    }
    set backColor(newValue: Color) {
        this.__backColor.set(newValue);
    }
    private __btnName: ObservedPropertySimple<string>;
    get btnName() {
        return this.__btnName.get();
    }
    set btnName(newValue: string) {
        this.__btnName.set(newValue);
    }
    private intervalID;
    private audioManager; // 需要先创建AudioManager实例
    private audioRoutingManager; // 再调用AudioManager的方法创建AudioRoutingManager实例
    aboutToDisappear() {
        clearInterval(this.intervalID);
    }
    aboutToAppear() {
        this.intervalID = setInterval(() => {
            // 传入3表示测试耳机接入
            adc_napi.UM_adc_test(3).then((ret) => {
                if (ret == 1) {
                    this.backColor = Color.Green;
                    clearInterval(this.intervalID);
                }
            });
        }, 1000);
    }
    render() {
        let earlierCreatedChild_2: commonButton = (this && this.findChildById) ? this.findChildById("2") as commonButton : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new commonButton("2", this, {
                backColor: this.__backColor,
                btnName: this.__btnName,
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
    }
}
