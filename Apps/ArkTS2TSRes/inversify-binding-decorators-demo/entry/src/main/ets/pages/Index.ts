interface Index_Params {
    message?: string;
    message2?: string;
    message3?: string;
    message4?: string;
    message5?: string;
    message6?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators/es/index';
import { Warrior, WarriorProvide, TYPE, Ninja, Katana, Shuriken, NinjaProvide, KatanaProvide, ShurikenProvide } from '../interface/Warrior';
let container = new Container();
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('', this, "message");
        this.__message2 = new ObservedPropertySimple('', this, "message2");
        this.__message3 = new ObservedPropertySimple('', this, "message3");
        this.__message4 = new ObservedPropertySimple('', this, "message4");
        this.__message5 = new ObservedPropertySimple('', this, "message5");
        this.__message6 = new ObservedPropertySimple('', this, "message6");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.message2 !== undefined) {
            this.message2 = params.message2;
        }
        if (params.message3 !== undefined) {
            this.message3 = params.message3;
        }
        if (params.message4 !== undefined) {
            this.message4 = params.message4;
        }
        if (params.message5 !== undefined) {
            this.message5 = params.message5;
        }
        if (params.message6 !== undefined) {
            this.message6 = params.message6;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__message2.aboutToBeDeleted();
        this.__message3.aboutToBeDeleted();
        this.__message4.aboutToBeDeleted();
        this.__message5.aboutToBeDeleted();
        this.__message6.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __message2: ObservedPropertySimple<string>;
    get message2() {
        return this.__message2.get();
    }
    set message2(newValue: string) {
        this.__message2.set(newValue);
    }
    private __message3: ObservedPropertySimple<string>;
    get message3() {
        return this.__message3.get();
    }
    set message3(newValue: string) {
        this.__message3.set(newValue);
    }
    private __message4: ObservedPropertySimple<string>;
    get message4() {
        return this.__message4.get();
    }
    set message4(newValue: string) {
        this.__message4.set(newValue);
    }
    private __message5: ObservedPropertySimple<string>;
    get message5() {
        return this.__message5.get();
    }
    set message5(newValue: string) {
        this.__message5.set(newValue);
    }
    private __message6: ObservedPropertySimple<string>;
    get message6() {
        return this.__message6.get();
    }
    set message6(newValue: string) {
        this.__message6.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Button.createWithLabel("@provide");
        Button.fontSize(30);
        Button.height(60);
        Button.width('100%');
        Button.fontColor(Color.White);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick((event: ClickEvent) => {
            this.provideSample();
        });
        Button.pop();
        Button.createWithLabel("@fluentprovide");
        Button.fontSize(30);
        Button.height(60);
        Button.width('100%');
        Button.margin(20);
        Button.fontColor(Color.White);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick((event: ClickEvent) => {
            this.fluentprovideSample();
        });
        Button.pop();
        Text.create(this.message6);
        Text.fontSize(40);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create(this.message);
        Text.fontSize(40);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create(this.message2);
        Text.fontSize(40);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create(this.message3);
        Text.fontSize(40);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create(this.message4);
        Text.fontSize(40);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create(this.message5);
        Text.fontSize(40);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Column.pop();
        Row.pop();
    }
    aboutToAppear() {
        container.load(buildProviderModule());
    }
    fluentprovideSample() {
        this.message6 = "fluentprovide result:";
        let ninja = container.get<Warrior>(TYPE.Warrior);
        this.message = (ninja instanceof Ninja) + "";
        this.message2 = (ninja.primary instanceof Katana) + "";
        this.message3 = (ninja.secondary instanceof Shuriken) + "";
        this.message4 = (ninja.fight().toString() == "Hit by Katana!") + "";
        this.message5 = (ninja.sneak().toString() == "Hit by Shuriken!") + "";
    }
    provideSample() {
        this.message6 = "provide result:";
        let ninja = container.get<WarriorProvide>(TYPE.WarriorProvide);
        this.message = (ninja instanceof NinjaProvide) + "";
        this.message2 = (ninja.katana instanceof KatanaProvide) + "";
        this.message3 = (ninja.shuriken instanceof ShurikenProvide) + "";
        this.message4 = (ninja.fight().toString() == "cut!") + "";
        this.message5 = (ninja.sneak().toString() == "hit!") + "";
    }
}
loadDocument(new Index("1", undefined, {}));
