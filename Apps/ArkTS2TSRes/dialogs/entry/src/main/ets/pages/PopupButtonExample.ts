interface PopupButtonExample_Params {
    model1?: ButtonAttributeModel;
    model2?: ButtonAttributeModel;
    model3?: ButtonAttributeModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PopupButtonExample_" + ++__generate__Id;
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
import { ButtonAttributeModel, PopupButton } from '@ohos/dialogs';
import Prompt from '@system.prompt';
class PopupButtonExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model1 = new ObservedPropertyObject(new ButtonAttributeModel(), this, "model1");
        this.__model2 = new ObservedPropertyObject(new ButtonAttributeModel(), this, "model2");
        this.__model3 = new ObservedPropertyObject(new ButtonAttributeModel(), this, "model3");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PopupButtonExample_Params) {
        if (params.model1 !== undefined) {
            this.model1 = params.model1;
        }
        if (params.model2 !== undefined) {
            this.model2 = params.model2;
        }
        if (params.model3 !== undefined) {
            this.model3 = params.model3;
        }
    }
    aboutToBeDeleted() {
        this.__model1.aboutToBeDeleted();
        this.__model2.aboutToBeDeleted();
        this.__model3.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model1: ObservedPropertyObject<ButtonAttributeModel>;
    get model1() {
        return this.__model1.get();
    }
    set model1(newValue: ButtonAttributeModel) {
        this.__model1.set(newValue);
    }
    private __model2: ObservedPropertyObject<ButtonAttributeModel>;
    get model2() {
        return this.__model2.get();
    }
    set model2(newValue: ButtonAttributeModel) {
        this.__model2.set(newValue);
    }
    private __model3: ObservedPropertyObject<ButtonAttributeModel>;
    get model3() {
        return this.__model3.get();
    }
    set model3(newValue: ButtonAttributeModel) {
        this.__model3.set(newValue);
    }
    aboutToAppear() {
        this.model1.placement = Placement.Right;
        this.model1.firstText = '赞';
        this.model1.secondText = '评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论';
        this.model1.secondWidth = 150;
        this.model1.firstAction = () => {
            Prompt.showToast({ message: JSON.stringify(this.model1.firstText) });
        };
        this.model1.secondAction = () => {
            Prompt.showToast({ message: JSON.stringify(this.model1.secondText) });
        };
        this.model2.placement = Placement.Top;
        this.model3.placement = Placement.Left;
        this.model3.firstText = '赞';
        this.model3.secondText = '评论评论评论评论评论';
        this.model3.secondWidth = 150;
    }
    // action(model) {
    //   Prompt.showToast({ message: JSON.stringify(model.firstText) })
    // }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Row.create();
        Row.layoutWeight(1);
        Row.width('100%');
        Row.pop();
        Row.create();
        Row.layoutWeight(1);
        Row.justifyContent(FlexAlign.Center);
        Row.width('100%');
        Row.pop();
        Row.create();
        Row.layoutWeight(1);
        Row.justifyContent(FlexAlign.End);
        Row.width('100%');
        Row.pop();
        Column.pop();
    }
}
loadDocument(new PopupButtonExample("1", undefined, {}));
