interface Index_Params {
    menus?: demo[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Router from "@ohos.router";
class demo {
    text: string = '';
    path: string = '';
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.menus = [
            {
                text: "文件上传Demo演示",
                path: "pages/UploadFile"
            }
        ];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.menus !== undefined) {
            this.menus = params.menus;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private menus: demo[];
    BuildText(text: string, path: string, parent = null) {
        Text.create(text);
        Text.fontSize(30);
        Text.onClick(() => this.handleClick(path));
        Text.pop();
    }
    render() {
        Column.create({ space: 30 });
        Column.width("100%");
        Column.padding({ top: 50 });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.menus), (v: any) => {
            this.BuildText(v.text, v.path, this);
        });
        ForEach.pop();
        Column.pop();
    }
    handleClick(path: string) {
        Router.pushUrl({ url: path });
    }
}
loadDocument(new Index("1", undefined, {}));
