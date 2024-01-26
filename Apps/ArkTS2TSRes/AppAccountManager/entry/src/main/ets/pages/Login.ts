interface Login_Params {
    bundleName?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Login_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import router from '@ohos.router';
import { LoginInfo } from '../common/LoginInfo';
import { NavigationBar } from '../common/NavigationBar';
class Login extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__bundleName = new ObservedPropertySimple((router.getParams() as Record<string, string>)['bundleName'], this, "bundleName");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Login_Params) {
        if (params.bundleName !== undefined) {
            this.bundleName = params.bundleName;
        }
    }
    aboutToBeDeleted() {
        this.__bundleName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __bundleName: ObservedPropertySimple<string>;
    get bundleName() {
        return this.__bundleName.get();
    }
    set bundleName(newValue: string) {
        this.__bundleName.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        let earlierCreatedChild_2: NavigationBar = (this && this.findChildById) ? this.findChildById("2") as NavigationBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new NavigationBar("2", this, { title: $r('app.string.register_login'), flag: true, url: 'pages/Index' }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: $r('app.string.register_login'), flag: true, url: 'pages/Index'
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: LoginInfo = (this && this.findChildById) ? this.findChildById("3") as LoginInfo : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new LoginInfo("3", this, { bundleName: this.bundleName }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                bundleName: this.bundleName
            });
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
    }
}
loadDocument(new Login("1", undefined, {}));
