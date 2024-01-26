interface Welcome_Params {
    message?: string;
    mode?: boolean;
    TempInfoobj?: TempInfoTable;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "welcome_" + ++__generate__Id;
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
import router from '@ohos.router';
import { onlywirte } from "./widgets";
import { TempInfoTable } from '../common/database/TempInfoTable';
import { GlobalContext } from '../global/Global';
class Welcome extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('欢迎使用app', this, "message");
        this.__mode = new ObservedPropertySimple(true, this, "mode");
        this.__TempInfoobj = new ObservedPropertyObject(new TempInfoTable() //新建一个tempinfotable对象
        , this, "TempInfoobj");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Welcome_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.mode !== undefined) {
            this.mode = params.mode;
        }
        if (params.TempInfoobj !== undefined) {
            this.TempInfoobj = params.TempInfoobj;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__mode.aboutToBeDeleted();
        this.__TempInfoobj.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __mode: ObservedPropertySimple<boolean>; //初始为摄氏度模式
    get mode() {
        return this.__mode.get();
    }
    set mode(newValue: boolean) {
        this.__mode.set(newValue);
    }
    private __TempInfoobj: ObservedPropertyObject<TempInfoTable>; //新建一个tempinfotable对象
    get TempInfoobj() {
        return this.__TempInfoobj.get();
    }
    set TempInfoobj(newValue: TempInfoTable) {
        this.__TempInfoobj.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Row.width('100%');
        Row.backgroundImage($r('app.media.bg3'));
        Row.backgroundImageSize(ImageSize.Cover);
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.id("welcomePage");
        Text.onClick(() => {
            let globalContext = GlobalContext.getContext();
            globalContext.setObject("obj", ObservedObject.GetRawObject(this.TempInfoobj));
            router.pushUrl({ url: 'pages/myMenu',
                params: {
                    mode: this.mode,
                },
            });
        });
        Text.pop();
        let earlierCreatedChild_2: onlywirte = (this && this.findChildById) ? this.findChildById("2") as onlywirte : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new onlywirte("2", this, { TempInfoobj: this.__TempInfoobj }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Welcome("1", undefined, {}));
