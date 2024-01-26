interface Modify_Params {
    username?: string;
    bundleName?: string;
    email?: string;
    signature?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Modify_" + ++__generate__Id;
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
import { ModifyInfo } from '../common/ModifyInfo';
import { NavigationBar } from '../common/NavigationBar';
class Modify extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__username = new ObservedPropertySimple((router.getParams() as Record<string, string>)['username'], this, "username");
        this.__bundleName = new ObservedPropertySimple((router.getParams() as Record<string, string>)['bundleName'], this, "bundleName");
        this.__email = new ObservedPropertySimple((router.getParams() as Record<string, string>)['email'], this, "email");
        this.__signature = new ObservedPropertySimple((router.getParams() as Record<string, string>)['signature'], this, "signature");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Modify_Params) {
        if (params.username !== undefined) {
            this.username = params.username;
        }
        if (params.bundleName !== undefined) {
            this.bundleName = params.bundleName;
        }
        if (params.email !== undefined) {
            this.email = params.email;
        }
        if (params.signature !== undefined) {
            this.signature = params.signature;
        }
    }
    aboutToBeDeleted() {
        this.__username.aboutToBeDeleted();
        this.__bundleName.aboutToBeDeleted();
        this.__email.aboutToBeDeleted();
        this.__signature.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __username: ObservedPropertySimple<string>;
    get username() {
        return this.__username.get();
    }
    set username(newValue: string) {
        this.__username.set(newValue);
    }
    private __bundleName: ObservedPropertySimple<string>;
    get bundleName() {
        return this.__bundleName.get();
    }
    set bundleName(newValue: string) {
        this.__bundleName.set(newValue);
    }
    private __email: ObservedPropertySimple<string>;
    get email() {
        return this.__email.get();
    }
    set email(newValue: string) {
        this.__email.set(newValue);
    }
    private __signature: ObservedPropertySimple<string>;
    get signature() {
        return this.__signature.get();
    }
    set signature(newValue: string) {
        this.__signature.set(newValue);
    }
    render() {
        Scroll.create();
        Column.create();
        let earlierCreatedChild_2: NavigationBar = (this && this.findChildById) ? this.findChildById("2") as NavigationBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new NavigationBar("2", this, {
                title: $r('app.string.modify'),
                flag: true,
                url: 'pages/Account',
                username: this.username,
                bundleName: this.bundleName,
                email: this.email,
                signature: this.signature
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: $r('app.string.modify'),
                flag: true,
                url: 'pages/Account',
                username: this.username,
                bundleName: this.bundleName,
                email: this.email,
                signature: this.signature
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: ModifyInfo = (this && this.findChildById) ? this.findChildById("3") as ModifyInfo : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new ModifyInfo("3", this, { bundleName: this.bundleName, username: this.username }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                bundleName: this.bundleName, username: this.username
            });
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new Modify("1", undefined, {}));
