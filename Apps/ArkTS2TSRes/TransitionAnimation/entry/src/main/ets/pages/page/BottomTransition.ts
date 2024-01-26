interface BottomTransition_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BottomTransition_" + ++__generate__Id;
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
class BottomTransition extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BottomTransition_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
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
        Image.create($r('app.media.bottom_transition'));
        Image.width('100%');
        Image.layoutWeight(1);
        Image.objectFit(ImageFit.Contain);
        Column.pop();
    }
    // 页面转场通过全局transition方法进行配置转场参数
    pageTransition() {
        PageTransition.create();
        // 页面入场组件：SlideEffect.Bottom 设置到入场时表示从下边滑入，出场时表示滑出到下边。
        PageTransitionEnter.create({ duration: 600, curve: Curve.Smooth });
        // 页面入场组件：SlideEffect.Bottom 设置到入场时表示从下边滑入，出场时表示滑出到下边。
        PageTransitionEnter.slide(SlideEffect.Bottom);
        // 页面退场组件：SlideEffect.Bottom 设置到入场时表示从下边滑入，出场时表示滑出到下边。
        PageTransitionExit.create({ duration: 600, curve: Curve.Smooth });
        // 页面退场组件：SlideEffect.Bottom 设置到入场时表示从下边滑入，出场时表示滑出到下边。
        PageTransitionExit.slide(SlideEffect.Bottom);
        PageTransition.pop();
    }
}
loadDocument(new BottomTransition("1", undefined, {}));
