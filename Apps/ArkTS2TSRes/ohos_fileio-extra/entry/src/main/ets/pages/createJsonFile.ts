interface CreateJsonFile_Params {
    con?: Array<Array<string>>;
    jsonFile?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "createJsonFile_" + ++__generate__Id;
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
import fs from '@ohos/fileio-extra';
// import router from '@system.router';
import { Objects } from './objects';
import router from '@ohos.router';
interface PathType {
    path: string;
}
export class CreateJsonFile extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__con = new ObservedPropertyObject([["", ""], ["", ""], ["", ""]], this, "con");
        this.__jsonFile = new ObservedPropertySimple("", this, "jsonFile");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CreateJsonFile_Params) {
        if (params.con !== undefined) {
            this.con = params.con;
        }
        if (params.jsonFile !== undefined) {
            this.jsonFile = params.jsonFile;
        }
    }
    aboutToBeDeleted() {
        this.__con.aboutToBeDeleted();
        this.__jsonFile.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __con: ObservedPropertyObject<Array<Array<string>>>;
    get con() {
        return this.__con.get();
    }
    set con(newValue: Array<Array<string>>) {
        this.__con.set(newValue);
    }
    private __jsonFile: ObservedPropertySimple<string>;
    get jsonFile() {
        return this.__jsonFile.get();
    }
    set jsonFile(newValue: string) {
        this.__jsonFile.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Text.create("输入框为空时直接返回");
        Text.fontSize(16);
        Text.margin({ top: 10 });
        Text.pop();
        Button.createWithLabel("创建json文件并返回");
        Button.margin({ bottom: 10 });
        Button.onClick(() => {
            if (this.jsonFile.length <= 0) {
                router.replaceUrl({ url: "pages/Index", params: { path: (router.getParams() as PathType).path.toString() } });
                return;
            }
            let data: Record<string, string> = {};
            for (let i = 0; i < this.con.length; i++) {
                if (this.con[i][0].length <= 0) {
                    continue;
                }
                data[this.con[i][0]] = this.con[i][1];
            }
            fs.outputFileSync((router.getParams() as PathType).path + "/s" + this.jsonFile + ".json", JSON.stringify(data), {
                encoding: "utf-8"
            });
            router.replaceUrl({ url: "pages/Index", params: { path: (router.getParams() as PathType).path } });
        });
        Button.pop();
        Button.createWithLabel("新增object");
        Button.onClick(() => {
            this.con.push(["", ""]);
        });
        Button.pop();
        Row.create();
        Row.margin({ top: 10, bottom: 10 });
        TextInput.create({ placeholder: "请输入json文件名" });
        TextInput.onChange((e) => {
            this.jsonFile = e;
        });
        TextInput.width("55%");
        Text.create(".json");
        Text.fontSize(18);
        Text.pop();
        Row.pop();
        Text.create("请输入json文件内容");
        Text.fontSize(16);
        Text.pop();
        let earlierCreatedChild_2: Objects = (this && this.findChildById) ? this.findChildById("2") as Objects : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Objects("2", this, { con: this.__con }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        Column.pop();
    }
}
loadDocument(new CreateJsonFile("1", undefined, {}));
