interface JsonWrite_Params {
    con?: Array<Array<string>>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "jsonWrite_" + ++__generate__Id;
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
import router from '@system.router';
import { Objects } from './objects';
class JsonWrite extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__con = new ObservedPropertyObject(router.getParams().data as Array<Array<string>>, this, "con");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: JsonWrite_Params) {
        if (params.con !== undefined) {
            this.con = params.con;
        }
    }
    aboutToBeDeleted() {
        this.__con.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __con: ObservedPropertyObject<Array<Array<string>>>;
    get con() {
        return this.__con.get();
    }
    set con(newValue: Array<Array<string>>) {
        this.__con.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Button.createWithLabel("确定写入");
        Button.margin({ top: 10 });
        Button.onClick(() => {
            let data: Record<string, string> = {};
            for (let i = 0; i < this.con.length; i++) {
                if (this.con[i][0].length <= 0) {
                    continue;
                }
                data[this.con[i][0]] = this.con[i][1];
            }
            fs.writeJSON(router.getParams().path, JSON.stringify(data), () => {
                router.replace({ uri: "pages/Index", params: { path: router.getParams().path } });
            });
        });
        Button.pop();
        Button.createWithLabel("新增object");
        Button.margin({ top: 10, bottom: 10 });
        Button.onClick(() => {
            this.con.push(["", ""]);
        });
        Button.pop();
        Text.create("请输入json文件内容");
        Text.fontSize(16);
        Text.margin({ top: 10 });
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
loadDocument(new JsonWrite("1", undefined, {}));
