interface ComponentTransition_Params {
    isShow?: boolean;
}
interface ComponentItem_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ComponentTransition_" + ++__generate__Id;
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
import TitleBar from '../common/TitleBar';
class ComponentItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ComponentItem_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Stack.create({ alignContent: Alignment.Bottom });
        Stack.width('100%');
        Stack.height('60%');
        Stack.transition({ type: TransitionType.Insert, translate: { x: 0, y: 500, z: 0 }, opacity: 1.0 });
        Stack.transition({ type: TransitionType.Delete, rotate: { x: 1, y: 0, z: 0, angle: 180 } });
        Image.create($r('app.media.component_transition'));
        Image.objectFit(ImageFit.Cover);
        Image.width('100%');
        Image.height('100%');
        Image.borderRadius(15);
        Stack.pop();
    }
}
class ComponentTransition extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isShow = new ObservedPropertySimple(false, this, "isShow");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ComponentTransition_Params) {
        if (params.isShow !== undefined) {
            this.isShow = params.isShow;
        }
    }
    aboutToBeDeleted() {
        this.__isShow.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isShow: ObservedPropertySimple<boolean>;
    get isShow() {
        return this.__isShow.get();
    }
    set isShow(newValue: boolean) {
        this.__isShow.set(newValue);
    }
    render() {
        Column.create();
        Column.height('100%');
        Column.width('100%');
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
        Button.createWithLabel(this.isShow ? $r('app.string.hide') : $r('app.string.show'));
        Button.onClick(() => {
            // 执行动效，动效时长600ms
            Context.animateTo({ duration: 600 }, () => {
                this.isShow = !this.isShow;
            });
        });
        Button.height(45);
        Button.width(200);
        Button.fontColor(Color.Black);
        Button.backgroundColor('#F0FFF0');
        Button.margin({ top: 20 });
        Button.pop();
        Stack.create({ alignContent: Alignment.Bottom });
        Stack.width('100%');
        Stack.layoutWeight(1);
        Stack.padding(20);
        If.create();
        if (this.isShow) {
            If.branchId(0);
            let earlierCreatedChild_3: ComponentItem = (this && this.findChildById) ? this.findChildById("3") as ComponentItem : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new ComponentItem("3", this, {}));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({});
                if (!earlierCreatedChild_3.needsUpdate()) {
                    earlierCreatedChild_3.markStatic();
                }
                View.create(earlierCreatedChild_3);
            }
        }
        If.pop();
        Stack.pop();
        Column.pop();
    }
}
loadDocument(new ComponentTransition("1", undefined, {}));
