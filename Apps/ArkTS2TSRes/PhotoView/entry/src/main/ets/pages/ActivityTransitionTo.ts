interface Sample_Params {
    data?: PhotoView.Model;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ActivityTransitionTo_" + ++__generate__Id;
}
/*
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
import { PhotoView } from '@ohos/photoview';
class Sample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__data = new ObservedPropertyObject(new PhotoView.Model(), this, "data");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Sample_Params) {
        if (params.data !== undefined) {
            this.data = params.data;
        }
    }
    aboutToBeDeleted() {
        this.__data.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __data: ObservedPropertyObject<PhotoView.Model>;
    get data() {
        return this.__data.get();
    }
    set data(newValue: PhotoView.Model) {
        this.__data.set(newValue);
    }
    aboutToAppear() {
        this.data
            .setImageResource($r('app.media.wallpaper'));
    }
    render() {
        Column.create();
        Column.height('100%');
        Column.width('100%');
        Column.backgroundColor(0x3d3d3d);
        Column.pop();
    }
}
loadDocument(new Sample("1", undefined, {}));
