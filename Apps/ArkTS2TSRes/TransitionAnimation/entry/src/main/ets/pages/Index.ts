interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import router from '@ohos.router';
import TitleBar from '../common/TitleBar';
import { Show } from '@ohos/enter-animation';
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
    ButtonItem(text: Resource | string, pageUrl: string, parent = null) {
        Button.createWithChild({ type: ButtonType.Capsule });
        Button.width('80%');
        Button.layoutWeight(1);
        Button.margin('5%');
        Button.backgroundColor('#F0FFF0');
        Button.onClick(() => {
            router.push({ url: pageUrl });
        });
        Text.create(text);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor(Color.Black);
        Text.width('90%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.padding({ bottom: 20 });
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        this.ButtonItem($r('app.string.enter_animation'), 'pages/Home', this);
        this.ButtonItem($r('app.string.page_transition_bottom'), 'pages/page/BottomTransition', this);
        this.ButtonItem($r('app.string.page_transition_custom_first'), 'pages/page/CustomTransition', this);
        this.ButtonItem($r('app.string.page_transition_custom_second'), 'pages/page/CustomTransition2', this);
        this.ButtonItem($r('app.string.component_transition'), 'pages/ComponentTransition', this);
        this.ButtonItem($r('app.string.share_transition'), 'pages/share/ShareItem', this);
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
