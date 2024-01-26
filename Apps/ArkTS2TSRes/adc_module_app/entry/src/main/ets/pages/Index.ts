interface Index_Params {
    datainfolist?: Array<TempInfo>;
    TempInfoobj?: TempInfoTable;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
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
import { TempInfo, TempInfoTable } from '../common/database/TempInfoTable';
import { value_text, get_value_button, GridExample, time_text, getdata, onlywirte } from "./widgets";
import prompt from '@system.prompt';
import router from '@ohos.router';
import { GlobalContext } from '../global/Global';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__datainfolist = new ObservedPropertyObject([], this, "datainfolist");
        this.__TempInfoobj = new ObservedPropertyObject(new TempInfoTable(), this, "TempInfoobj");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.datainfolist !== undefined) {
            this.datainfolist = params.datainfolist;
        }
        if (params.TempInfoobj !== undefined) {
            this.TempInfoobj = params.TempInfoobj;
        }
    }
    aboutToBeDeleted() {
        this.__datainfolist.aboutToBeDeleted();
        this.__TempInfoobj.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __datainfolist: ObservedPropertyObject<Array<TempInfo>>; //存放查询结果的数组
    get datainfolist() {
        return this.__datainfolist.get();
    }
    set datainfolist(newValue: Array<TempInfo>) {
        this.__datainfolist.set(newValue);
    }
    private __TempInfoobj: ObservedPropertyObject<TempInfoTable>;
    get TempInfoobj() {
        return this.__TempInfoobj.get();
    }
    set TempInfoobj(newValue: TempInfoTable) {
        this.__TempInfoobj.set(newValue);
    }
    onPageShow() {
        let TempInfo = GlobalContext.getContext().getObject("obj") as TempInfoTable;
        this.TempInfoobj = TempInfo;
        console.log("xxxxx");
    }
    render() {
        Column.create();
        Row.create();
        Row.width('95%');
        Row.onClick(() => {
            router.back();
        });
        Image.create($r('app.media.icon_back'));
        Image.width(24);
        Image.height(24);
        Row.pop();
        let earlierCreatedChild_2: GridExample = (this && this.findChildById) ? this.findChildById("2") as GridExample : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new GridExample("2", this, { TempInfoobj: this.__TempInfoobj, datainfolist: this.__datainfolist }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
