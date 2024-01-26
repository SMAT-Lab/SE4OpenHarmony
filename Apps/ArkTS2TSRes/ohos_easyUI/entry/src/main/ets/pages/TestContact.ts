interface TestContact_Params {
    editable?: boolean;
    contactName?: string;
    contactTel?: string;
    contactListHeight?: number;
    contactListName?: string;
    contactListTel?: string;
    contactEditHeight?: number;
    contactEditName?: string;
    contactEditTel?: string;
    contactList?: {
        name: string;
        tel: string;
    }[];
    contactName_1?: string;
    contactTel_1?: string;
    contactListHeight_1?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestContact_" + ++__generate__Id;
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
import { ContactCard, ContactEdit, ContactList } from 'easyui';
class TestContact extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.editable = true;
        this.__contactName = new ObservedPropertySimple("" //基础用法组件属性
        , this, "contactName");
        this.__contactTel = new ObservedPropertySimple("" //基础用法组件属性
        , this, "contactTel");
        this.__contactListHeight = new ObservedPropertySimple(0 //基础用法组件属性
        , this, "contactListHeight");
        this.__contactListName = new ObservedPropertySimple("张三", this, "contactListName");
        this.__contactListTel = new ObservedPropertySimple("13000000000", this, "contactListTel");
        this.__contactEditHeight = new ObservedPropertySimple(0, this, "contactEditHeight");
        this.__contactEditName = new ObservedPropertySimple("", this, "contactEditName");
        this.__contactEditTel = new ObservedPropertySimple("", this, "contactEditTel");
        this.__contactList = new ObservedPropertyObject([{ name: "张三", tel: "13000000000" }, { name: "李四", tel: "13000000000" }], this, "contactList");
        this.__contactName_1 = new ObservedPropertySimple("张三" //不可编辑组件属性
        , this, "contactName_1");
        this.__contactTel_1 = new ObservedPropertySimple("13000000000" //不可编辑组件属性
        , this, "contactTel_1");
        this.__contactListHeight_1 = new ObservedPropertySimple(0 //不可编辑组件属性
        , this, "contactListHeight_1");
        this.updateWithValueParams(params);
        this.declareWatch("contactListTel", this.contactListValue);
        this.declareWatch("contactEditTel", this.contactEditValue);
    }
    updateWithValueParams(params: TestContact_Params) {
        if (params.editable !== undefined) {
            this.editable = params.editable;
        }
        if (params.contactName !== undefined) {
            this.contactName = params.contactName;
        }
        if (params.contactTel !== undefined) {
            this.contactTel = params.contactTel;
        }
        if (params.contactListHeight !== undefined) {
            this.contactListHeight = params.contactListHeight;
        }
        if (params.contactListName !== undefined) {
            this.contactListName = params.contactListName;
        }
        if (params.contactListTel !== undefined) {
            this.contactListTel = params.contactListTel;
        }
        if (params.contactEditHeight !== undefined) {
            this.contactEditHeight = params.contactEditHeight;
        }
        if (params.contactEditName !== undefined) {
            this.contactEditName = params.contactEditName;
        }
        if (params.contactEditTel !== undefined) {
            this.contactEditTel = params.contactEditTel;
        }
        if (params.contactList !== undefined) {
            this.contactList = params.contactList;
        }
        if (params.contactName_1 !== undefined) {
            this.contactName_1 = params.contactName_1;
        }
        if (params.contactTel_1 !== undefined) {
            this.contactTel_1 = params.contactTel_1;
        }
        if (params.contactListHeight_1 !== undefined) {
            this.contactListHeight_1 = params.contactListHeight_1;
        }
    }
    aboutToBeDeleted() {
        this.__contactName.aboutToBeDeleted();
        this.__contactTel.aboutToBeDeleted();
        this.__contactListHeight.aboutToBeDeleted();
        this.__contactListName.aboutToBeDeleted();
        this.__contactListTel.aboutToBeDeleted();
        this.__contactEditHeight.aboutToBeDeleted();
        this.__contactEditName.aboutToBeDeleted();
        this.__contactEditTel.aboutToBeDeleted();
        this.__contactList.aboutToBeDeleted();
        this.__contactName_1.aboutToBeDeleted();
        this.__contactTel_1.aboutToBeDeleted();
        this.__contactListHeight_1.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private editable: boolean;
    private __contactName: ObservedPropertySimple<string>; //基础用法组件属性
    get contactName() {
        return this.__contactName.get();
    }
    set contactName(newValue: string) {
        this.__contactName.set(newValue);
    }
    private __contactTel: ObservedPropertySimple<string>; //基础用法组件属性
    get contactTel() {
        return this.__contactTel.get();
    }
    set contactTel(newValue: string) {
        this.__contactTel.set(newValue);
    }
    private __contactListHeight: ObservedPropertySimple<number>; //基础用法组件属性
    get contactListHeight() {
        return this.__contactListHeight.get();
    }
    set contactListHeight(newValue: number) {
        this.__contactListHeight.set(newValue);
    }
    private __contactListName: ObservedPropertySimple<string>;
    get contactListName() {
        return this.__contactListName.get();
    }
    set contactListName(newValue: string) {
        this.__contactListName.set(newValue);
    }
    private __contactListTel: ObservedPropertySimple<string>;
    get contactListTel() {
        return this.__contactListTel.get();
    }
    set contactListTel(newValue: string) {
        this.__contactListTel.set(newValue);
    }
    private __contactEditHeight: ObservedPropertySimple<number>;
    get contactEditHeight() {
        return this.__contactEditHeight.get();
    }
    set contactEditHeight(newValue: number) {
        this.__contactEditHeight.set(newValue);
    }
    private __contactEditName: ObservedPropertySimple<string>;
    get contactEditName() {
        return this.__contactEditName.get();
    }
    set contactEditName(newValue: string) {
        this.__contactEditName.set(newValue);
    }
    private __contactEditTel: ObservedPropertySimple<string>;
    get contactEditTel() {
        return this.__contactEditTel.get();
    }
    set contactEditTel(newValue: string) {
        this.__contactEditTel.set(newValue);
    }
    private __contactList: ObservedPropertyObject<{
        name: string;
        tel: string;
    }[]>;
    get contactList() {
        return this.__contactList.get();
    }
    set contactList(newValue: {
        name: string;
        tel: string;
    }[]) {
        this.__contactList.set(newValue);
    }
    private __contactName_1: ObservedPropertySimple<string>; //不可编辑组件属性
    get contactName_1() {
        return this.__contactName_1.get();
    }
    set contactName_1(newValue: string) {
        this.__contactName_1.set(newValue);
    }
    private __contactTel_1: ObservedPropertySimple<string>; //不可编辑组件属性
    get contactTel_1() {
        return this.__contactTel_1.get();
    }
    set contactTel_1(newValue: string) {
        this.__contactTel_1.set(newValue);
    }
    private __contactListHeight_1: ObservedPropertySimple<number>; //不可编辑组件属性
    get contactListHeight_1() {
        return this.__contactListHeight_1.get();
    }
    set contactListHeight_1(newValue: number) {
        this.__contactListHeight_1.set(newValue);
    }
    contactListValue() {
        this.contactName = this.contactListName;
        this.contactTel = this.contactListTel;
    }
    contactEditValue() {
        this.contactName = this.contactEditName;
        this.contactTel = this.contactEditTel;
    }
    render() {
        Stack.create();
        Stack.width("100%");
        Stack.height("100%");
        Stack.backgroundColor("#ffececec");
        //基础用法
        Row.create();
        //基础用法
        Row.height("100%");
        //基础用法
        Row.pop();
        Row.create();
        Row.height("100%");
        Row.pop();
        If.create();
        if (this.contactListHeight === 0) {
            If.branchId(0);
            Row.create();
            Row.height("100%");
            Row.opacity(0);
            Row.pop();
        }
        If.pop();
        Row.create();
        Row.height("100%");
        Row.visibility((this.contactListHeight !== 0 && this.contactEditHeight !== 0) ? Visibility.Visible : Visibility.Hidden);
        Row.pop();
        Stack.pop();
    }
}
loadDocument(new TestContact("1", undefined, {}));
