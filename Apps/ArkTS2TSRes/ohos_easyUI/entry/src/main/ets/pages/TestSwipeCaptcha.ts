interface TestSwipeCaptcha_Params {
    ImgList?: ImageItem[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestSwipeCaptcha_" + ++__generate__Id;
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
import { SwipePuzzle } from 'easyui';
import { SimpleSwipe } from 'easyui';
import { RotatePuzzle } from 'easyui';
import { ImageItem } from 'easyui';
class TestSwipeCaptcha extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__ImgList = AppStorage.SetAndLink("ImgList", [], this, "ImgList");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestSwipeCaptcha_Params) {
    }
    aboutToBeDeleted() {
        this.__ImgList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    //图片源
    private __ImgList: ObservedPropertyAbstract<ImageItem[]>;
    get ImgList() {
        return this.__ImgList.get();
    }
    set ImgList(newValue: ImageItem[]) {
        this.__ImgList.set(newValue);
    }
    render() {
        Row.create();
        Row.onAppear(() => {
            this.ImgList = [
                new ImageItem('SwipeCaptcha_test1.jpg'),
                new ImageItem('SwipeCaptcha_test2.jpg'),
                new ImageItem('SwipeCaptcha_test3.jpg'),
                new ImageItem('SwipeCaptcha_test4.jpg'),
                new ImageItem('SwipeCaptcha_test5.jpg'),
                new ImageItem('SwipeCaptcha_test6.jpg'),
                new ImageItem('SwipeCaptcha_test7.jpg'),
                new ImageItem('SwipeCaptcha_test8.jpg')
            ];
            console.log("【swipePuzzle】ImgList.length = " + this.ImgList.length);
        });
        Column.create();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new TestSwipeCaptcha("1", undefined, {}));
