interface Account_Params {
    email?: string;
    username?: string;
    signature?: string;
    bundleName?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Account_" + ++__generate__Id;
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
import { AccountInfo } from '../common/AccountInfo';
import { NavigationBar } from '../common/NavigationBar';
class Account extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__email = new ObservedPropertySimple((router.getParams() as Record<string, string>)['email'], this, "email");
        this.__username = new ObservedPropertySimple((router.getParams() as Record<string, string>)['username'], this, "username");
        this.__signature = new ObservedPropertySimple((router.getParams() as Record<string, string>)['signature'], this, "signature");
        this.__bundleName = new ObservedPropertySimple((router.getParams() as Record<string, string>)['bundleName'], this, "bundleName");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Account_Params) {
        if (params.email !== undefined) {
            this.email = params.email;
        }
        if (params.username !== undefined) {
            this.username = params.username;
        }
        if (params.signature !== undefined) {
            this.signature = params.signature;
        }
        if (params.bundleName !== undefined) {
            this.bundleName = params.bundleName;
        }
    }
    aboutToBeDeleted() {
        this.__email.aboutToBeDeleted();
        this.__username.aboutToBeDeleted();
        this.__signature.aboutToBeDeleted();
        this.__bundleName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __email: ObservedPropertySimple<string>;
    get email() {
        return this.__email.get();
    }
    set email(newValue: string) {
        this.__email.set(newValue);
    }
    private __username: ObservedPropertySimple<string>;
    get username() {
        return this.__username.get();
    }
    set username(newValue: string) {
        this.__username.set(newValue);
    }
    private __signature: ObservedPropertySimple<string>;
    get signature() {
        return this.__signature.get();
    }
    set signature(newValue: string) {
        this.__signature.set(newValue);
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
            View.create(new NavigationBar("2", this, { title: $r('app.string.account'), flag: false }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: $r('app.string.account'), flag: false
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: AccountInfo = (this && this.findChildById) ? this.findChildById("3") as AccountInfo : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new AccountInfo("3", this, {
                email: this.email,
                username: this.username,
                signature: this.signature,
                bundleName: this.bundleName
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                email: this.email,
                username: this.username,
                signature: this.signature,
                bundleName: this.bundleName
            });
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
    }
}
loadDocument(new Account("1", undefined, {}));
