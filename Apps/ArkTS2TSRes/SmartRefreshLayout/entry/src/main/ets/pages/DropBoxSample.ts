interface DropBoxSample_Params {
    model?: SmartRefreshForDropBoxSample.Model;
    theme?: ThemeParam[];
    boxColor?: Array<number>;
    arr?: arrParam[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DropBoxSample_" + ++__generate__Id;
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
import { SmartRefreshForDropBoxSample } from "@ohos/smartrefreshlayout";
import { DropBox } from "@ohos/smartrefreshlayout";
import { DropBoxBottomRefresh } from "@ohos/smartrefreshlayout";
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
class DropBoxSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new SmartRefreshForDropBoxSample.Model(), this, "model");
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
        this.boxColor = [0xff6ea9ff, 0xff6ea9ff];
        this.arr = [{ index: 0, content: '内容不偏移' }, { index: 1, content: '内容跟随偏移' }, { index: 2, content: '默认主题' }, { index: 3, content: '橙色主题' },
            { index: 4, content: '红色主题' }, { index: 5, content: '绿色主题' }, { index: 6, content: '蓝色主题' }, { index: 7, content: '蓝色主题' }, { index: 8, content: '蓝色主题' }, { index: 9, content: '蓝色主题' }];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DropBoxSample_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.theme !== undefined) {
            this.theme = params.theme;
        }
        if (params.boxColor !== undefined) {
            this.boxColor = params.boxColor;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<SmartRefreshForDropBoxSample.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SmartRefreshForDropBoxSample.Model) {
        this.__model.set(newValue);
    }
    private theme: ThemeParam[];
    private boxColor?: Array<number>;
    private arr: arrParam[];
    dropBoxHeader(parent = null) {
    }
    card(i: number, parent = null) {
        Row.create();
        Row.onClick(() => {
            this.boxColor = this.theme[i % this.theme.length].boxColor;
            this.model.setBackgroundColor(this.theme[i % this.theme.length].backgroundColor);
        });
        Row.width("100%");
        Row.height("280lpx");
        Row.margin("10lpx");
        Row.backgroundColor(Color.White);
        Row.padding("20lpx");
        Row.alignItems(VerticalAlign.Top);
        Row.border({ width: "2lpx", color: "#aaaaaa", style: BorderStyle.Solid });
        Flex.create();
        Flex.backgroundColor(this.theme[i % this.theme.length].backgroundColor);
        Flex.height("240lpx");
        Flex.width("240lpx");
        Flex.pop();
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.margin("10lpx");
        Text.create(this.theme[i % this.theme.length].text + "");
        Text.fontSize(30);
        Text.pop();
        Text.create(this.theme[i % this.theme.length].label + "");
        Text.fontSize(20);
        Text.fontColor(Color.Gray);
        Text.pop();
        Column.pop();
        Row.pop();
    }
    dropBoxMain(parent = null) {
        Column.create();
        Column.width("100%");
        Column.padding("20lpx");
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (item: arrParam) => {
            this.card(item.index, this);
        }, (item: arrParam) => item.index.toString());
        ForEach.pop();
        Column.pop();
    }
    dropBoxFooter(parent = null) {
        Column.create();
        Column.width("100%");
        Column.padding("20lpx");
        Column.pop();
    }
    aboutToAppear() {
        this.model.setBackgroundColor("#0xff283645").setRefreshDuration(7000);
    }
    render() {
        Column.create();
        Column.pop();
    }
}
loadDocument(new DropBoxSample("1", undefined, {}));
