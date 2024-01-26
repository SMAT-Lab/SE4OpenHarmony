interface CustomTransition2_Params {
    myProgress?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CustomTransition2_" + ++__generate__Id;
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
import TitleBar from '../../common/TitleBar';
class CustomTransition2 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__myProgress = new ObservedPropertySimple(1, this, "myProgress");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomTransition2_Params) {
        if (params.myProgress !== undefined) {
            this.myProgress = params.myProgress;
        }
    }
    aboutToBeDeleted() {
        this.__myProgress.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __myProgress: ObservedPropertySimple<number>;
    get myProgress() {
        return this.__myProgress.get();
    }
    set myProgress(newValue: number) {
        this.__myProgress.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, { hasBackPress: true }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                hasBackPress: true
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Image.create($r('app.media.custom_transition2'));
        Image.width('100%');
        Image.layoutWeight(1);
        Image.objectFit(ImageFit.Contain);
        Image.opacity(this.myProgress);
        Image.scale({ x: this.myProgress, y: this.myProgress });
        Image.rotate({ x: 0, y: 0, z: 1, angle: 360 * this.myProgress });
        Column.pop();
    }
    // 页面转场通过全局transition方法进行配置转场参数
    pageTransition() {
        PageTransition.create();
        // 页面入场组件： 进场过程中会逐帧触发onEnter回调，入参为动效的归一化进度(0% -- 100%)
        PageTransitionEnter.create({ duration: 800, curve: Curve.Smooth });
        // 页面入场组件： 进场过程中会逐帧触发onEnter回调，入参为动效的归一化进度(0% -- 100%)
        PageTransitionEnter.onEnter((type?: RouteType, progress?: number) => {
            if (progress !== undefined) {
                this.myProgress = progress; // 页面入场时myProgress从0变化到1
            }
        });
        // 页面退场组件： 进场过程中会逐帧触发onExit回调，入参为动效的归一化进度(0% -- 100%)
        PageTransitionExit.create({ duration: 1000, curve: Curve.Smooth });
        // 页面退场组件： 进场过程中会逐帧触发onExit回调，入参为动效的归一化进度(0% -- 100%)
        PageTransitionExit.onExit((type?: RouteType, progress?: number) => {
            if (progress !== undefined) {
                this.myProgress = 1 - progress; // 页面退场式myProgress从1变化到0
            }
        });
        PageTransition.pop();
    }
}
loadDocument(new CustomTransition2("1", undefined, {}));
