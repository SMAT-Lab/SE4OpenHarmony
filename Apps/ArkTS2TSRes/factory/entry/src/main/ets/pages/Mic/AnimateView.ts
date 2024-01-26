interface AnimateView_Params {
    timeTextNum?;
    intervalId?: number;
    updateTimeStr?: () => void;
    timeAdd?: number;
    translateImage?: string;
    translateText?: string;
    recordState?: boolean;
    playState?: boolean;
    resetAnimation?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AnimateView_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import { getTimeString } from '../../model/Utils';
import Logger from '../../model/Logger';
const TAG = '[Recorder.AnimateView]';
export class AnimateView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.timeTextNum = [0, 1, 2, 3, 4, 5];
        this.intervalId = 0;
        this.updateTimeStr = undefined;
        this.__timeAdd = new ObservedPropertySimple(0, this, "timeAdd");
        this.__translateImage = new ObservedPropertySimple('-0.2%', this, "translateImage");
        this.__translateText = new ObservedPropertySimple('-1%', this, "translateText");
        this.__recordState = AppStorage.SetAndLink('recordState', true, this, "recordState");
        this.__playState = AppStorage.SetAndLink('playState', true, this, "playState");
        this.__resetAnimation = new SynchedPropertySimpleTwoWay(params.resetAnimation, this, "resetAnimation");
        this.updateWithValueParams(params);
        this.declareWatch("recordState", this.onPlayChange);
        this.declareWatch("playState", this.onPlayChange);
        this.declareWatch("resetAnimation", this.onResetChange);
    }
    updateWithValueParams(params: AnimateView_Params) {
        if (params.timeTextNum !== undefined) {
            this.timeTextNum = params.timeTextNum;
        }
        if (params.intervalId !== undefined) {
            this.intervalId = params.intervalId;
        }
        if (params.updateTimeStr !== undefined) {
            this.updateTimeStr = params.updateTimeStr;
        }
        if (params.timeAdd !== undefined) {
            this.timeAdd = params.timeAdd;
        }
        if (params.translateImage !== undefined) {
            this.translateImage = params.translateImage;
        }
        if (params.translateText !== undefined) {
            this.translateText = params.translateText;
        }
    }
    aboutToBeDeleted() {
        this.__timeAdd.aboutToBeDeleted();
        this.__translateImage.aboutToBeDeleted();
        this.__translateText.aboutToBeDeleted();
        this.__recordState.aboutToBeDeleted();
        this.__playState.aboutToBeDeleted();
        this.__resetAnimation.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private timeTextNum;
    private intervalId: number;
    private updateTimeStr: () => void;
    private __timeAdd: ObservedPropertySimple<number>;
    get timeAdd() {
        return this.__timeAdd.get();
    }
    set timeAdd(newValue: number) {
        this.__timeAdd.set(newValue);
    }
    private __translateImage: ObservedPropertySimple<string>;
    get translateImage() {
        return this.__translateImage.get();
    }
    set translateImage(newValue: string) {
        this.__translateImage.set(newValue);
    }
    private __translateText: ObservedPropertySimple<string>;
    get translateText() {
        return this.__translateText.get();
    }
    set translateText(newValue: string) {
        this.__translateText.set(newValue);
    }
    private __recordState: ObservedPropertyAbstract<boolean>;
    get recordState() {
        return this.__recordState.get();
    }
    set recordState(newValue: boolean) {
        this.__recordState.set(newValue);
    }
    private __playState: ObservedPropertyAbstract<boolean>;
    get playState() {
        return this.__playState.get();
    }
    set playState(newValue: boolean) {
        this.__playState.set(newValue);
    }
    private __resetAnimation: SynchedPropertySimpleTwoWay<boolean>;
    get resetAnimation() {
        return this.__resetAnimation.get();
    }
    set resetAnimation(newValue: boolean) {
        this.__resetAnimation.set(newValue);
    }
    onPlayChange() {
        Logger.info(TAG, `onPlayChange`);
        this.animator();
    }
    animator() {
        Logger.info(TAG, `animator,recordState=${this.recordState},playState=${this.playState}`);
        if (this.recordState || this.playState) {
            this.intervalId = setInterval(() => {
                this.updateTimeStr();
                this.translateImage = '16.3%';
                this.translateText = '15.5%';
                this.timeAdd += 1;
                Context.animateTo({ duration: 1100, curve: Curve.Linear }, () => {
                    this.translateImage = '-0.2%';
                    this.translateText = '-1%';
                });
            }, 1000);
        }
        else {
            clearInterval(this.intervalId);
        }
    }
    onResetChange() {
        this.timeAdd = 0;
    }
    aboutToAppear() {
        this.animator();
    }
    render() {
        Column.create();
        Row.create();
        Row.width('120%');
        Row.translate({ x: this.translateText });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.timeTextNum), item => {
            Text.create(getTimeString(this.timeAdd, item));
            Text.fontSize(12);
            Text.fontColor(Color.Gray);
            Text.textAlign(TextAlign.End);
            Text.maxLines(1);
            Text.pop();
            Blank.create();
            Blank.layoutWeight(1);
            Blank.pop();
        }, item => item.toString());
        ForEach.pop();
        Row.pop();
        Image.create($r('app.media.slider_time'));
        Image.width('120%');
        Image.height(20);
        Image.objectFit(ImageFit.Fill);
        Image.translate({ x: this.translateImage });
        Column.pop();
    }
}
