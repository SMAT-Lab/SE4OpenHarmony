interface Index_adapter_animator_Params {
    listDatas?;
    animTypes?: AnimType[];
    controller?: RecyclerView.Controller;
    selectIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "index_adapter_animator_" + ++__generate__Id;
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
class Index_adapter_animator extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.listDatas = ["Apple", "Ball", "Camera", "Day", "Egg", "Foo", "Google", "Hello",
            "Iron", "Japan", "Coke", "Dog", "Cat", "Yahoo", "Sony", "Canon", "Fujitsu", "USA", "Nexus",
            "LINE", "Haskell", "C++", "Java", "Go", "Swift", "Objective-c", "Ruby", "PHP", "Bash", "ksh",
            "C", "Groovy", "Kotlin", "Chip", "Japan", "U.S.A", "San Francisco", "Paris", "Tokyo",
            "Silicon Valley", "London", "Spain", "China", "Taiwan", "Asia", "New York", "France", "Kyoto",
            "Android", "Google", "iPhone", "iPad", "iPod", "Wasabeef"];
        this.animTypes = [
            new AnimType('AlphaIn', RecyclerView.AdapterAnimationType.AlphaIn),
            new AnimType('ScaleIn', RecyclerView.AdapterAnimationType.ScaleIn),
            new AnimType('SlideInBottom', RecyclerView.AdapterAnimationType.SlideInBottom),
            new AnimType('SlideInLeft', RecyclerView.AdapterAnimationType.SlideInLeft),
            new AnimType('SlideInRight', RecyclerView.AdapterAnimationType.SlideInRight)
        ];
        this.__controller = new ObservedPropertyObject(new RecyclerView.Controller(), this, "controller");
        this.__selectIndex = new ObservedPropertySimple(0, this, "selectIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_adapter_animator_Params) {
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
    }
    aboutToBeDeleted() {
        this.__controller.aboutToBeDeleted();
        this.__selectIndex.aboutToBeDeleted();
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
    aboutToAppear() {
        this.controller.setAdapterAnimation(RecyclerView.AdapterAnimationType.AlphaIn);
        this.controller.setFirstOnly(false);
        this.controller.setDuration(500);
    }
    render() {
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.width('100%');
        Stack.height('100%');
        Column.create();
        Column.margin({ top: 50 });
        Column.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start });
        Flex.width('100%');
        Flex.height(50);
        Flex.backgroundColor('#3dc49d');
        Select.create(this.animTypes);
        Select.selected(this.selectIndex);
        Select.value(this.animTypes[this.selectIndex].value);
        Select.font({ size: 18, weight: 400, family: 'serif', style: FontStyle.Normal });
        Select.selectedOptionFont({ size: 18, weight: 500, family: 'serif', style: FontStyle.Normal });
        Select.optionFont({ size: 18, weight: 400, family: 'serif', style: FontStyle.Normal });
        Select.backgroundColor('#3dc49d');
        Select.onSelect((index: number) => {
            this.selectIndex = index;
            this.controller.setAdapterAnimation(this.animTypes[index].enumType);
        });
        Select.pop();
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
    enumType: RecyclerView.AdapterAnimationType;
    constructor(value: string, enumType: RecyclerView.AdapterAnimationType) {
        this.value = value;
        this.enumType = enumType;
    }
}
loadDocument(new Index_adapter_animator("1", undefined, {}));
