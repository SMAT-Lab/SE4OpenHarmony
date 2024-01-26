interface LoadingDialog_Params {
    controller?: CustomDialogController;
    loadingTitle?: string;
    data?: LoadingDialogModel;
    interpolatedProgress?: string;
    linearProgress?: string;
    popupAnimation?: TransitionEffect | undefined;
    // 控制执行一次
    interpolatedFlag?: boolean;
    linearFlag?: boolean;
    state?: number;
    interpolatedData?: LoadingDialogModel;
    linearData?: LoadingDialogModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LoadingDialog_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { LoadingDialogModel } from '../model/LoadingDialogModel';
export class LoadingDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = undefined;
        this.__loadingTitle = new SynchedPropertySimpleOneWay(params.loadingTitle, this, "loadingTitle");
        this.__data = new ObservedPropertyObject(new LoadingDialogModel(), this, "data");
        this.__interpolatedProgress = new ObservedPropertySimple('', this, "interpolatedProgress");
        this.__linearProgress = new ObservedPropertySimple('', this, "linearProgress");
        this.interpolatedFlag = false;
        this.linearFlag = false;
        this.__state = AppStorage.SetAndProp('state', 1
        //监测进度值的改变
        , this, "state");
        this.__interpolatedData = new ObservedPropertyObject(new LoadingDialogModel(), this, "interpolatedData");
        this.__linearData = new ObservedPropertyObject(new LoadingDialogModel(), this, "linearData");
        this.updateWithValueParams(params);
        this.declareWatch("interpolatedData", this.interpolatedUpdated);
        this.declareWatch("linearData", this.linearUpdated);
    }
    updateWithValueParams(params: LoadingDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        this.loadingTitle = params.loadingTitle;
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.interpolatedProgress !== undefined) {
            this.interpolatedProgress = params.interpolatedProgress;
        }
        if (params.linearProgress !== undefined) {
            this.linearProgress = params.linearProgress;
        }
        this.popupAnimation = params.popupAnimation;
        if (params.interpolatedFlag !== undefined) {
            this.interpolatedFlag = params.interpolatedFlag;
        }
        if (params.linearFlag !== undefined) {
            this.linearFlag = params.linearFlag;
        }
        if (params.interpolatedData !== undefined) {
            this.interpolatedData = params.interpolatedData;
        }
        if (params.linearData !== undefined) {
            this.linearData = params.linearData;
        }
    }
    aboutToBeDeleted() {
        this.__loadingTitle.aboutToBeDeleted();
        this.__data.aboutToBeDeleted();
        this.__interpolatedProgress.aboutToBeDeleted();
        this.__linearProgress.aboutToBeDeleted();
        this.__popupAnimation.aboutToBeDeleted();
        this.__state.aboutToBeDeleted();
        this.__interpolatedData.aboutToBeDeleted();
        this.__linearData.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private __loadingTitle: SynchedPropertySimpleOneWay<string>;
    get loadingTitle() {
        return this.__loadingTitle.get();
    }
    set loadingTitle(newValue: string) {
        this.__loadingTitle.set(newValue);
    }
    private __data: ObservedPropertyObject<LoadingDialogModel>;
    get data() {
        return this.__data.get();
    }
    set data(newValue: LoadingDialogModel) {
        this.__data.set(newValue);
    }
    private __interpolatedProgress: ObservedPropertySimple<string>;
    get interpolatedProgress() {
        return this.__interpolatedProgress.get();
    }
    set interpolatedProgress(newValue: string) {
        this.__interpolatedProgress.set(newValue);
    }
    private __linearProgress: ObservedPropertySimple<string>;
    get linearProgress() {
        return this.__linearProgress.get();
    }
    set linearProgress(newValue: string) {
        this.__linearProgress.set(newValue);
    }
    private __popupAnimation: SynchedPropertySimpleOneWay<TransitionEffect | undefined>;
    get popupAnimation() {
        return this.__popupAnimation.get();
    }
    set popupAnimation(newValue: TransitionEffect | undefined) {
        this.__popupAnimation.set(newValue);
    }
    // 控制执行一次
    private interpolatedFlag: boolean;
    private linearFlag: boolean;
    private __state: ObservedPropertyAbstract<number>;
    get state() {
        return this.__state.get();
    }
    set state(newValue: number) {
        this.__state.set(newValue);
    }
    //监测进度值的改变
    private __interpolatedData: ObservedPropertyObject<LoadingDialogModel>;
    get interpolatedData() {
        return this.__interpolatedData.get();
    }
    set interpolatedData(newValue: LoadingDialogModel) {
        this.__interpolatedData.set(newValue);
    }
    //监测进度值的改变
    private __linearData: ObservedPropertyObject<LoadingDialogModel>;
    get linearData() {
        return this.__linearData.get();
    }
    set linearData(newValue: LoadingDialogModel) {
        this.__linearData.set(newValue);
    }
    interpolatedUpdated(value: Object): void {
        this.interpolatedProgress = this.interpolatedData.getProgress();
        if (AppStorage.Get('state') == 1) {
            this.interpolatedRunCallback();
        }
    }
    linearUpdated(value: Object): void {
        this.interpolatedProgress = this.interpolatedData.getProgress();
        this.linearProgress = this.linearData.getProgress();
        if (AppStorage.Get('state') == 1) {
            this.linearRunCallback();
        }
    }
    interpolatedRunCallback() {
        // 内插值进度轮
        if (this.interpolatedProgress == '0.00') {
            if (this.interpolatedFlag) {
                this.interpolatedFlag = false;
                this.interpolatedData.setProgress(1).init();
            }
        }
        else if (this.interpolatedProgress == '1.00') {
            if (!this.interpolatedFlag) {
                this.interpolatedFlag = true;
                this.interpolatedData.setProgress(0).init();
            }
        }
    }
    linearRunCallback() {
        // 线性进度轮
        if (this.linearProgress == '0.00') {
            if (this.linearFlag) {
                this.linearFlag = false;
                this.linearData.setProgress(1).init();
            }
        }
        else if (this.linearProgress == '1.00') {
            if (!this.linearFlag) {
                this.linearFlag = true;
                this.linearData.setProgress(0).init();
            }
        }
    }
    render() {
        Column.create();
        Column.height(100);
        Column.width(100);
        Column.backgroundColor(Color.White);
        Column.borderRadius(10);
        Column.transition(this.popupAnimation != undefined ? this.popupAnimation : undefined);
        Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
        Column.create();
        Stack.create();
        Path.create();
        Path.strokeWidth(this.data.barWidth);
        Path.fillOpacity(0);
        Path.stroke(this.data.barColor);
        Path.commands(this.data.svgPath);
        Path.width(50);
        Path.height(50);
        Path.zIndex(2);
        Path.create();
        Path.strokeWidth(this.data.rimWidth);
        Path.fillOpacity(0);
        Path.stroke(this.data.rimColor);
        Path.width(50);
        Path.height(50);
        Path.commands(this.data.rimSvgPath);
        Path.zIndex(0);
        Stack.pop();
        Column.pop();
        Column.create();
        Text.create(this.loadingTitle);
        Text.fontSize(15);
        Text.fontColor(0x7A7A7A);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Column.pop();
        Flex.pop();
        Column.pop();
    }
    aboutToAppear() {
        this.data.init();
        this.interpolatedData
            .setSpinning(false)
            .setLinearProgress(true)
            .setProgress(1)
            .init();
        this.linearData
            .setSpinning(false)
            .setLinearProgress(true)
            .setProgress(1)
            .init();
    }
    aboutToDisappear() {
        // 关闭定时器
        this.data.closeTimer();
        this.interpolatedData.closeTimer();
        this.linearData.closeTimer();
    }
}
