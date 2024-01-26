interface TestImageZoom_Params {
    Img?: ImageItem;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestImageZoom_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Institute of Software, Chinese Academy of Sciences.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { ImageItem } from 'easyui';
import { ImageZoom } from 'easyui';
class TestImageZoom extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__Img = AppStorage.SetAndLink("Img", new ImageItem(""), this, "Img");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestImageZoom_Params) {
    }
    aboutToBeDeleted() {
        this.__Img.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __Img: ObservedPropertyAbstract<ImageItem>;
    get Img() {
        return this.__Img.get();
    }
    set Img(newValue: ImageItem) {
        this.__Img.set(newValue);
    }
    render() {
        Column.create({ space: 5 });
        Column.width('100%');
        Column.height('100%');
        Column.borderRadius(10);
        Column.onAppear(() => {
            this.Img = new ImageItem("ImageZoom_dog.jpg");
        });
        Column.pop();
    }
}
loadDocument(new TestImageZoom("1", undefined, {}));
