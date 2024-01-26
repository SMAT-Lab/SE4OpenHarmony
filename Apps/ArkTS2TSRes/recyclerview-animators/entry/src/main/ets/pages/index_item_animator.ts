interface Index_item_animator_Params {
    listDatas?;
    animTypes?: AnimType[];
    controller?: RecyclerView.Controller;
    selectIndex?: number;
    listDataTailFlag?: number;
    addFlag?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "index_item_animator_" + ++__generate__Id;
}
/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { RecyclerView } from "@ohos/recyclerview-animators";
import router from '@ohos.router';
import promptAction from '@ohos.promptAction';
class Index_item_animator extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.listDatas = ["Apple", "Ball", "Camera", "Day", "Egg", "Foo", "Google", "Hello",
            "Iron", "Japan", "Coke", "Dog", "Cat", "Yahoo", "Sony", "Canon", "Fujitsu", "USA", "Nexus",
            "LINE", "Haskell", "C++", "Java", "Go", "Swift", "Objective-c", "Ruby", "PHP", "Bash", "ksh",
            "C", "Groovy", "Kotlin", "Chip", "Japan", "U.S.A", "San Francisco", "Paris", "Tokyo",
            "Silicon Valley", "London", "Spain", "China", "Taiwan", "Asia", "New York", "France", "Kyoto",
            "Android", "Google", "iPhone", "iPad", "iPod", "Wasabeef"];
        this.animTypes = [
            new AnimType('FadeIn', RecyclerView.ItemAnimationType.FadeIn),
            new AnimType('FadeInDown', RecyclerView.ItemAnimationType.FadeInDown),
            new AnimType('FadeInUp', RecyclerView.ItemAnimationType.FadeInUp),
            new AnimType('FadeInLeft', RecyclerView.ItemAnimationType.FadeInLeft),
            new AnimType('FadeInRight', RecyclerView.ItemAnimationType.FadeInRight),
            new AnimType('Landing', RecyclerView.ItemAnimationType.Landing),
            new AnimType('ScaleIn', RecyclerView.ItemAnimationType.ScaleIn),
            new AnimType('ScaleInTop', RecyclerView.ItemAnimationType.ScaleInTop),
            new AnimType('ScaleInBottom', RecyclerView.ItemAnimationType.ScaleInBottom),
            new AnimType('ScaleInLeft', RecyclerView.ItemAnimationType.ScaleInLeft),
            new AnimType('ScaleInRight', RecyclerView.ItemAnimationType.ScaleInRight),
            new AnimType('SlideInLeft', RecyclerView.ItemAnimationType.SlideInLeft),
            new AnimType('SlideInRight', RecyclerView.ItemAnimationType.SlideInRight),
            new AnimType('SlideInDown', RecyclerView.ItemAnimationType.SlideInDown),
            new AnimType('SlideInUp', RecyclerView.ItemAnimationType.SlideInUp),
            new AnimType('OvershootInRight', RecyclerView.ItemAnimationType.OvershootInRight),
            new AnimType('OvershootInLeft', RecyclerView.ItemAnimationType.OvershootInLeft)
        ];
        this.__controller = new ObservedPropertyObject(new RecyclerView.Controller(), this, "controller");
        this.__selectIndex = new ObservedPropertySimple(0, this, "selectIndex");
        this.__listDataTailFlag = new ObservedPropertySimple(this.listDatas.length - 1, this, "listDataTailFlag");
        this.__addFlag = new ObservedPropertySimple(0, this, "addFlag");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_item_animator_Params) {
        if (params.listDatas !== undefined) {
            this.listDatas = params.listDatas;
        }
        if (params.animTypes !== undefined) {
            this.animTypes = params.animTypes;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.selectIndex !== undefined) {
            this.selectIndex = params.selectIndex;
        }
        if (params.listDataTailFlag !== undefined) {
            this.listDataTailFlag = params.listDataTailFlag;
        }
        if (params.addFlag !== undefined) {
            this.addFlag = params.addFlag;
        }
    }
    aboutToBeDeleted() {
        this.__controller.aboutToBeDeleted();
        this.__selectIndex.aboutToBeDeleted();
        this.__listDataTailFlag.aboutToBeDeleted();
        this.__addFlag.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private listDatas;
    private animTypes: AnimType[];
    private __controller: ObservedPropertyObject<RecyclerView.Controller>;
    get controller() {
        return this.__controller.get();
    }
    set controller(newValue: RecyclerView.Controller) {
        this.__controller.set(newValue);
    }
    private __selectIndex: ObservedPropertySimple<number>;
    get selectIndex() {
        return this.__selectIndex.get();
    }
    set selectIndex(newValue: number) {
        this.__selectIndex.set(newValue);
    }
    private __listDataTailFlag: ObservedPropertySimple<number>;
    get listDataTailFlag() {
        return this.__listDataTailFlag.get();
    }
    set listDataTailFlag(newValue: number) {
        this.__listDataTailFlag.set(newValue);
    }
    private __addFlag: ObservedPropertySimple<number>;
    get addFlag() {
        return this.__addFlag.get();
    }
    set addFlag(newValue: number) {
        this.__addFlag.set(newValue);
    }
    aboutToAppear() {
        this.controller.setItemAnimation(RecyclerView.ItemAnimationType.FadeIn);
        this.controller.setDuration(500);
    }
    render() {
        Stack.create({ alignContent: Alignment.TopStart });
        Column.create();
        Column.margin({ top: 50 });
        Column.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start });
        Flex.width('100%');
        Flex.height(50);
        Flex.backgroundColor('#3dc49d');
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start });
        Flex.width('70%');
        Select.create(this.animTypes);
        Select.selected(this.selectIndex);
        Select.value(this.animTypes[this.selectIndex].value);
        Select.font({ size: 18, weight: 400, family: 'serif', style: FontStyle.Normal });
        Select.selectedOptionFont({ size: 18, weight: 500, family: 'serif', style: FontStyle.Normal });
        Select.optionFont({ size: 18, weight: 400, family: 'serif', style: FontStyle.Normal });
        Select.backgroundColor('#3dc49d');
        Select.onSelect((index: number) => {
            this.selectIndex = index;
            this.controller.setItemAnimation(this.animTypes[index].enumType);
        });
        Select.pop();
        Flex.pop();
        Row.create();
        Row.width('30%');
        Text.create('ADD');
        Text.fontSize(18);
        Text.padding(8);
        Text.onClick(event => {
            this.controller.addValue(0, 'add the [ ' + (this.addFlag += 1) + ' ] item');
            this.listDataTailFlag += 1;
        });
        Text.pop();
        Text.create('DEL');
        Text.fontSize(18);
        Text.padding(8);
        Text.onClick(event => {
            const deleteIndex: number = 0;
            if (this.listDataTailFlag >= deleteIndex) {
                this.controller.deleteValue(0);
                this.listDataTailFlag -= 1;
            }
            else {
                promptAction.showToast({
                    message: $r("app.string.message_toast"),
                    duration: 500
                });
            }
        });
        Text.pop();
        Row.pop();
        Flex.pop();
        Stack.pop();
    }
    SpecificChild(itemData: any, parent = null) {
        Column.create();
        Column.margin(10);
        Image.create($r("app.media.sample13"));
        Image.width('100%');
        Image.height(100);
        Text.create(itemData + '');
        Text.fontSize(20);
        Text.textAlign(TextAlign.Center);
        Text.width('100%');
        Text.pop();
        Column.pop();
    }
}
class AnimType {
    value: string;
    enumType: any;
    constructor(value: string, enumType: any) {
        this.value = value;
        this.enumType = enumType;
    }
}
loadDocument(new Index_item_animator("1", undefined, {}));
