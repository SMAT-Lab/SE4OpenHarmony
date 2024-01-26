interface TestMaskGuideView_Params {
    url?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestMaskGuideView_" + ++__generate__Id;
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
import { MaskGuideView } from "easyui";
import router from '@ohos.router';
class TestMaskGuideView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.url = "pages/TestCardView";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestMaskGuideView_Params) {
        if (params.url !== undefined) {
            this.url = params.url;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private url: string;
    render() {
        Column.create();
        Button.createWithLabel("页面1");
        Button.width(80);
        Button.height(40);
        Button.position({
            x: 30,
            y: 20
        });
        Button.onClick(() => {
            router.pushUrl({
                url: this.url
            });
        });
        Button.pop();
        Column.pop();
    }
}
loadDocument(new TestMaskGuideView("1", undefined, {}));
