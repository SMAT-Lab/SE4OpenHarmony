interface HitBlockSample_Params {
    arr?: Array<ThemeParam>;
    modelGame?: SmartRefreshForGame.Model;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "HitBlockSample_" + ++__generate__Id;
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
import { SmartRefreshForGame } from "@ohos/smartrefreshlayout";
import { HitBlock } from "@ohos/smartrefreshlayout";
class ThemeParam {
    index: number = 0;
    name: string = "";
    color: string = "";
}
class HitBlockSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.arr = [
            { index: 1, name: '默认主题', color: '#ffffff' },
            { index: 2, name: '橙色主题', color: '#ffbb33' },
            { index: 3, name: '红色主题', color: '#ff4444' },
            { index: 4, name: '绿色主题', color: '#99cc00' },
            { index: 5, name: '蓝色主题', color: '#2299ee' },
            { index: 6, name: '蓝色主题', color: '#2299ee' },
            { index: 7, name: '蓝色主题', color: '#2299ee' },
            { index: 8, name: '蓝色主题', color: '#2299ee' },
            { index: 9, name: '蓝色主题', color: '#2299ee' },
            { index: 10, name: '蓝色主题', color: '#2299ee' },
        ];
        this.__modelGame = new ObservedPropertyObject(new SmartRefreshForGame.Model(), this, "modelGame");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: HitBlockSample_Params) {
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.modelGame !== undefined) {
            this.modelGame = params.modelGame;
        }
    }
    aboutToBeDeleted() {
        this.__modelGame.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private arr: Array<ThemeParam>;
    private __modelGame: ObservedPropertyObject<SmartRefreshForGame.Model>;
    get modelGame() {
        return this.__modelGame.get();
    }
    set modelGame(newValue: SmartRefreshForGame.Model) {
        this.__modelGame.set(newValue);
    }
    public aboutToAppear() {
        this.modelGame.setBackgroundColor('#ffbb33');
        this.modelGame.autoRefresh();
    }
    testHeader(parent = null) {
    }
    testMain(parent = null) {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start });
        Flex.width("100%");
        Flex.backgroundColor("#ffffff");
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (itemOther: ThemeParam) => {
            Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start });
            Flex.onClick(e => {
                this.modelGame.setBackgroundColor(itemOther.color);
                this.modelGame.autoRefresh();
            });
            Text.create(itemOther.name);
            Text.fontSize(30);
            Text.fontColor('#282828');
            Text.padding({ left: 10, top: 10 });
            Text.pop();
            Text.create('更改为' + itemOther.name + '颜色');
            Text.fontSize(25);
            Text.fontColor('#8c8c8c');
            Text.padding({ left: 10, top: 5 });
            Text.pop();
            Text.create('');
            Text.backgroundColor('#ececec');
            Text.height(0.5);
            Text.width('100%');
            Text.margin({ top: 10, bottom: 5 });
            Text.pop();
            Flex.pop();
        }, (item: ThemeParam) => item.index.toString());
        ForEach.pop();
        Flex.pop();
    }
    render() {
        Column.create();
        Column.pop();
    }
}
loadDocument(new HitBlockSample("1", undefined, {}));
