interface RenderSample_Params {
    model?: SVGImageView.SVGImageViewModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "RenderSample_" + ++__generate__Id;
}
/**
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { SVGImageView } from '@ohos/svg';
class RenderSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new SVGImageView.SVGImageViewModel(), this, "model");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: RenderSample_Params) {
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
    aboutToAppear() {
        this.model.setImageRawfile('ic_launcher_round.svg');
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Column.pop();
        Row.pop();
    }
}
loadDocument(new RenderSample("1", undefined, {}));
