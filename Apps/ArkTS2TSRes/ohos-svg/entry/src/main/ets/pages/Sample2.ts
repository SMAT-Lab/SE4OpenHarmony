interface Sample2_Params {
    model?: SVGImageView.SVGImageViewModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Sample2_" + ++__generate__Id;
}
/**
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
import { GlobalContext, SVG, SVGBase, SVGImageView } from '@ohos/svg';
export class Sample2 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new SVGImageView.SVGImageViewModel(), this, "model");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Sample2_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<SVGImageView.SVGImageViewModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SVGImageView.SVGImageViewModel) {
        this.__model.set(newValue);
    }
    public getData() {
        let context: Context = GlobalContext.getContext().getObject("context") as Context;
        context.resourceManager.getRawFileContent('ic_launcher_round.svg', (error, value) => {
            if (error != null) {
                throw new Error("未找到rawfile下的svg");
            }
            else {
                let data = SVGBase.unit8ArrayToString(value);
                let svgBase = SVGBase.getFromString(data);
                this.model.setSVG(new SVG(svgBase));
                // this.model1.setFromString(data)
            }
        });
    }
    public aboutToAppear() {
        this.getData();
    }
    render() {
        Stack.create({ alignContent: Alignment.Top });
        Stack.height("100%");
        Stack.padding({ top: 40 });
        Stack.margin({ bottom: 20 });
        Stack.create();
        Stack.pop();
        Stack.pop();
    }
}
loadDocument(new Sample2("1", undefined, {}));
