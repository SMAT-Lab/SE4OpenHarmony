interface RecommendationList_Params {
    currentBreakpoint?: string;
    bannerList?: Resource[];
    gridList?: ItemType[];
    appIconList?: ItemType[];
    gameIconList?: ItemType[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "RecommendationList_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
import { BreakpointType } from '../common/BreakpointSystem';
import { StyleConfiguration } from '../common/Configuration';
class ItemType {
    name: Resource;
    src: Resource;
    constructor(name: Resource, src: Resource) {
        this.name = name;
        this.src = src;
    }
}
export class RecommendationList extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__bannerList = new ObservedPropertyObject([
            $r('app.media.ic_public_swiper1'),
            $r('app.media.ic_public_swiper2'),
            $r('app.media.ic_public_swiper3'),
        ], this, "bannerList");
        this.__gridList = new ObservedPropertyObject([
            new ItemType($r('app.string.category'), $r('app.media.entrances')),
            new ItemType($r('app.string.rank'), $r('app.media.entrances2')),
            new ItemType($r('app.string.quickApp'), $r('app.media.entrances4')),
            new ItemType($r('app.string.garden'), $r('app.media.entrances5')),
            new ItemType($r('app.string.education'), $r('app.media.entrances6')),
        ], this, "gridList");
        this.__appIconList = new ObservedPropertyObject([
            new ItemType($r('app.string.double'), $r('app.media.ic_public_app1')),
            new ItemType($r('app.string.photoEditing'), $r('app.media.ic_public_app2')),
            new ItemType($r('app.string.mathematicsSquare'), $r('app.media.ic_public_app3')),
            new ItemType($r('app.string.carefree'), $r('app.media.ic_public_app4')),
            new ItemType($r('app.string.explorer'), $r('app.media.ic_public_app5')),
            new ItemType($r('app.string.double'), $r('app.media.ic_public_app6')),
            new ItemType($r('app.string.photoEditing'), $r('app.media.ic_public_app7')),
            new ItemType($r('app.string.mathematicsSquare'), $r('app.media.ic_public_app8')),
            new ItemType($r('app.string.carefree'), $r('app.media.ic_public_app9')),
            new ItemType($r('app.string.double'), $r('app.media.ic_public_app10')),
        ], this, "appIconList");
        this.__gameIconList = new ObservedPropertyObject([
            new ItemType($r('app.string.romance'), $r('app.media.ic_public_game1')),
            new ItemType($r('app.string.dreaming'), $r('app.media.ic_public_game2')),
            new ItemType($r('app.string.ambush'), $r('app.media.ic_public_game3')),
            new ItemType($r('app.string.dreaming'), $r('app.media.ic_public_game4')),
            new ItemType($r('app.string.ambush'), $r('app.media.ic_public_game5')),
            new ItemType($r('app.string.romance'), $r('app.media.ic_public_game6')),
            new ItemType($r('app.string.ambush'), $r('app.media.ic_public_game7')),
            new ItemType($r('app.string.dreaming'), $r('app.media.ic_public_game8')),
            new ItemType($r('app.string.ambush'), $r('app.media.ic_public_game9')),
            new ItemType($r('app.string.romance'), $r('app.media.ic_public_game10')),
        ], this, "gameIconList");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: RecommendationList_Params) {
        if (params.bannerList !== undefined) {
            this.bannerList = params.bannerList;
        }
        if (params.gridList !== undefined) {
            this.gridList = params.gridList;
        }
        if (params.appIconList !== undefined) {
            this.appIconList = params.appIconList;
        }
        if (params.gameIconList !== undefined) {
            this.gameIconList = params.gameIconList;
        }
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__bannerList.aboutToBeDeleted();
        this.__gridList.aboutToBeDeleted();
        this.__appIconList.aboutToBeDeleted();
        this.__gameIconList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentBreakpoint: ObservedPropertyAbstract<string> = this.localStorage_.setAndProp<string>("currentBreakpoint", 'md', this, "currentBreakpoint");
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private __bannerList: ObservedPropertyObject<Resource[]>;
    get bannerList() {
        return this.__bannerList.get();
    }
    set bannerList(newValue: Resource[]) {
        this.__bannerList.set(newValue);
    }
    private __gridList: ObservedPropertyObject<ItemType[]>;
    get gridList() {
        return this.__gridList.get();
    }
    set gridList(newValue: ItemType[]) {
        this.__gridList.set(newValue);
    }
    private __appIconList: ObservedPropertyObject<ItemType[]>;
    get appIconList() {
        return this.__appIconList.get();
    }
    set appIconList(newValue: ItemType[]) {
        this.__appIconList.set(newValue);
    }
    private __gameIconList: ObservedPropertyObject<ItemType[]>;
    get gameIconList() {
        return this.__gameIconList.get();
    }
    set gameIconList(newValue: ItemType[]) {
        this.__gameIconList.set(newValue);
    }
    Banner(parent = null) {
        Swiper.create();
        Swiper.cachedCount(3);
        Swiper.itemSpace(8);
        Swiper.displayCount(new BreakpointType(1, 2, 3).GetValue(this.currentBreakpoint));
        Swiper.indicator(new BreakpointType(true, false, false).GetValue(this.currentBreakpoint));
        Swiper.indicatorStyle({ selectedColor: '#fff' });
        Swiper.loop(true);
        Swiper.height(StyleConfiguration.getBreakpointStyle(this.currentBreakpoint).recommendCompGridItemHeight);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.bannerList), (item: Resource) => {
            Image.create(item);
            Image.width('100%');
            Image.height('100%');
            Image.borderRadius(10);
            Image.backgroundColor('#7fD8D8D8');
        });
        ForEach.pop();
        Swiper.pop();
    }
    ApplicationList(data: ItemType[], parent = null) {
        List.create({ space: new BreakpointType(20, 32, 36).GetValue(this.currentBreakpoint) });
        List.listDirection(Axis.Horizontal);
        List.scrollBar(BarState.Off);
        ForEach.create("3", this, ObservedObject.GetRawObject(data), (item: ItemType) => {
            ListItem.create();
            Column.create();
            Image.create(item.src);
            Image.width(56);
            Image.height(56);
            Text.create(item.name);
            Text.fontSize(12);
            Text.margin({ top: 8 });
            Text.pop();
            Button.createWithLabel($r('app.string.install'));
            Button.fontSize(12);
            Button.fontColor('#0a59f7');
            Button.backgroundColor('#0c000000');
            Button.fontWeight(FontWeight.Medium);
            Button.width(56);
            Button.height(28);
            Button.margin({ top: 7 });
            Button.pop();
            Column.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
    }
    ApplicationType(desc: Resource, parent = null) {
        Row.create();
        Row.width('100%');
        Row.height(48);
        Row.margin({ top: 4 });
        Text.create(desc);
        Text.fontSize(16);
        Text.fontWeight(FontWeight.Medium);
        Text.pop();
        Blank.create();
        Blank.pop();
        Text.create($r('app.string.more'));
        Text.fontSize(14);
        Text.fontWeight(FontWeight.Regular);
        Text.pop();
        Image.create($r('app.media.ic_settings_arrow'));
        Image.width(12);
        Image.height(24);
        Row.pop();
    }
    render() {
        Scroll.create();
        Scroll.scrollBar(BarState.Off);
        Scroll.padding({ bottom: 12 });
        GridRow.create({ columns: { sm: 4, md: 8, lg: 12 } });
        GridCol.create({ span: { sm: 4, md: 8, lg: 12 } });
        this.Banner(this);
        GridCol.pop();
        GridCol.create({ span: { sm: 4, md: 8, lg: 12 } });
        Flex.create({ justifyContent: FlexAlign.SpaceAround, alignItems: ItemAlign.Center });
        Flex.height(72);
        Flex.margin({ top: 12.5 });
        ForEach.create("4", this, ObservedObject.GetRawObject(this.gridList), (item: ItemType) => {
            Column.create();
            Image.create(item.src);
            Image.width(40);
            Image.height(40);
            Text.create(item.name);
            Text.fontSize(12);
            Text.fontWeight(FontWeight.Regular);
            Text.margin({ top: 4 });
            Text.pop();
            Column.pop();
        });
        ForEach.pop();
        Flex.pop();
        GridCol.pop();
        GridCol.create({ span: { sm: 4, md: 8, lg: 12 } });
        this.ApplicationType($r('app.string.excellentGame'), this);
        GridCol.pop();
        GridCol.create({ span: { sm: 4, md: 8, lg: 12 } });
        this.ApplicationList(ObservedObject.GetRawObject(this.appIconList), this);
        GridCol.pop();
        GridCol.create({ span: { sm: 4, md: 8, lg: 12 } });
        GridCol.margin({ top: 4 });
        this.ApplicationType($r('app.string.excellentApp'), this);
        GridCol.pop();
        GridCol.create({ span: { sm: 4, md: 8, lg: 12 } });
        this.ApplicationList(ObservedObject.GetRawObject(this.gameIconList), this);
        GridCol.pop();
        GridCol.create({ span: { sm: 4, md: 8, lg: 12 } });
        GridCol.margin({ top: 4 });
        this.ApplicationType($r('app.string.excellentGame'), this);
        GridCol.pop();
        GridCol.create({ span: { sm: 4, md: 8, lg: 12 } });
        GridCol.margin({ top: 4 });
        GridCol.layoutWeight(1);
        this.Banner(this);
        GridCol.pop();
        GridRow.pop();
        Scroll.pop();
    }
}
