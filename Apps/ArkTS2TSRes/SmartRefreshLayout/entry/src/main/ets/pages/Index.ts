interface Index_Params {
    scroller?: Scroller;
    refreshTypeMap?: Array<RefreshTypeMapParam>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import router from '@ohos.router';
class RefreshTypeMapParam {
    id: number = 0;
    name: string = "";
    url: string = "";
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.refreshTypeMap = [
            { id: 1, name: "Classics", url: "pages/ClassicsSample" },
            { id: 2, name: "WaterSwipe", url: "pages/WaterSwipeSample" },
            { id: 3, name: "BezierCircle", url: "pages/BezierCircleSample" },
            { id: 4, name: "Material", url: "pages/MaterialSample" },
            { id: 5, name: "WaveSwipe", url: "pages/WaveSwipeSample" },
            { id: 6, name: "BezierRadar", url: "pages/BezierRadarSample" },
            { id: 7, name: "StoreHouse", url: "pages/StoreHouseSample" },
            { id: 8, name: "Delivery", url: "pages/DeliverySample" },
            { id: 9, name: "DropBox", url: "pages/DropBoxSample" },
            { id: 10, name: "FlyRefreshHeader", url: "pages/FlyRefreshStylePage" },
            { id: 11, name: "BattleCity", url: "pages/BattleCitySample" },
            { id: 12, name: "HitBlock", url: "pages/HitBlockSample" },
            { id: 13, name: "Phoenix", url: "pages/PhoenixSample" },
            { id: 14, name: "Taurus", url: "pages/TaurusSample" },
        ];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.refreshTypeMap !== undefined) {
            this.refreshTypeMap = params.refreshTypeMap;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private refreshTypeMap: Array<RefreshTypeMapParam>;
    render() {
        Stack.create();
        Scroll.create(this.scroller);
        Column.create({ space: 20 });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.refreshTypeMap), (item: RefreshTypeMapParam) => {
            Text.create(item.name);
            Text.height(50);
            Text.fontSize(40);
            Text.fontColor(Color.Black);
            Text.backgroundColor(Color.Gray);
            Text.width("100%");
            Text.textAlign(TextAlign.Center);
            Text.onClick(() => {
                router.push({ url: item.url });
            });
            Text.pop();
        }, (item: RefreshTypeMapParam) => item.id.toString());
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Stack.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
