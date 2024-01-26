interface DeliverySample_Params {
    theme?: ThemeParam[];
    modelDelivery?: SmartRefreshForDeliverySample.Model;
    arr?: arrParam[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DeliverySample_" + ++__generate__Id;
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
import { Delivery } from "@ohos/smartrefreshlayout";
import { SmartRefreshForDeliverySample } from "@ohos/smartrefreshlayout";
class arrParam {
    index: number = 0;
    content: string = "";
}
class ThemeParam {
    text: string = "";
    label: string = "";
    boxColor: number[] = [];
    backgroundColor: number = 0;
}
class DeliverySample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.theme = [
            { text: "默认主题颜色", label: "更改为默认主题颜色", boxColor: [0xff4169E1, 0xff6ea9ff], backgroundColor: 0xff283645 },
            { text: "橙色主题颜色", label: "更改为橙色主题颜色", boxColor: [0xffffe4b5, 0xfffffafa], backgroundColor: 0xffffbb33 },
            { text: "红色主题颜色", label: "更改为红色主题颜色", boxColor: [0xfff08080, 0xfffffafa], backgroundColor: 0xffff4444 },
            { text: "绿色主题颜色", label: "更改为绿色主题颜色", boxColor: [0xff90ee90, 0xfffffafa], backgroundColor: 0xff99cc00 },
            { text: "蓝色主题颜色", label: "更改为蓝色主题颜色", boxColor: [0xffafeeee, 0xfffffafa], backgroundColor: 0xff33aaff },
            { text: "蓝色主题颜色", label: "更改为蓝色主题颜色", boxColor: [0xffafeeee, 0xfffffafa], backgroundColor: 0xff33aaff },
            { text: "蓝色主题颜色", label: "更改为蓝色主题颜色", boxColor: [0xffafeeee, 0xfffffafa], backgroundColor: 0xff33aaff },
            { text: "蓝色主题颜色", label: "更改为蓝色主题颜色", boxColor: [0xffafeeee, 0xfffffafa], backgroundColor: 0xff33aaff },
            { text: "蓝色主题颜色", label: "更改为蓝色主题颜色", boxColor: [0xffafeeee, 0xfffffafa], backgroundColor: 0xff33aaff },
            { text: "蓝色主题颜色", label: "更改为蓝色主题颜色", boxColor: [0xffafeeee, 0xfffffafa], backgroundColor: 0xff33aaff },
        ];
        this.__modelDelivery = new ObservedPropertyObject(new SmartRefreshForDeliverySample.Model().setZMainIndex(999), this, "modelDelivery");
        this.arr = [{ index: 2, content: '默认主题' }, { index: 3, content: '橙色主题' }, { index: 4, content: '红色主题' }, { index: 5, content: '绿色主题' },
            { index: 6, content: '蓝色主题' }, { index: 7, content: '蓝色主题' }, { index: 8, content: '蓝色主题' }, { index: 9, content: '蓝色主题' }];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DeliverySample_Params) {
        if (params.theme !== undefined) {
            this.theme = params.theme;
        }
        if (params.modelDelivery !== undefined) {
            this.modelDelivery = params.modelDelivery;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
    }
    aboutToBeDeleted() {
        this.__modelDelivery.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private theme: ThemeParam[];
    private __modelDelivery: ObservedPropertyObject<SmartRefreshForDeliverySample.Model>;
    get modelDelivery() {
        return this.__modelDelivery.get();
    }
    set modelDelivery(newValue: SmartRefreshForDeliverySample.Model) {
        this.__modelDelivery.set(newValue);
    }
    private arr: arrParam[];
    deliveryHeader(parent = null) {
    }
    card(index: number, parent = null) {
        Row.create();
        Row.width("100%");
        Row.height("280lpx");
        Row.margin("10lpx");
        Row.backgroundColor(Color.White);
        Row.padding("20lpx");
        Row.alignItems(VerticalAlign.Top);
        Row.border({ width: "2lpx", color: "#aaaaaa", style: BorderStyle.Solid });
        Row.onClick(() => {
            this.modelDelivery.setBackgroundShadowColor(this.theme[index % this.theme.length].backgroundColor);
        });
        Flex.create();
        Flex.backgroundColor(this.theme[index % this.theme.length].backgroundColor);
        Flex.height("240lpx");
        Flex.width("240lpx");
        Flex.pop();
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.margin("10lpx");
        Text.create(this.theme[index % this.theme.length].text + "");
        Text.fontSize(30);
        Text.pop();
        Text.create(this.theme[index % this.theme.length].label + "");
        Text.fontSize(20);
        Text.fontColor(Color.Gray);
        Text.pop();
        Column.pop();
        Row.pop();
    }
    deliveryMain(parent = null) {
        Column.create();
        Column.width("100%");
        Column.padding("20lpx");
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (item: arrParam) => {
            this.card(item.index, this);
        }, (item: arrParam) => item.index.toString());
        ForEach.pop();
        Column.pop();
    }
    deliveryFooter(parent = null) {
        Column.create();
        Column.width("100%");
        Column.padding("20lpx");
        Column.pop();
    }
    aboutToAppear() {
        this.modelDelivery.backgroundColor = "#dddddd";
    }
    render() {
        Column.create();
        Column.backgroundColor("#dddddd");
        Column.pop();
    }
}
loadDocument(new DeliverySample("1", undefined, {}));
