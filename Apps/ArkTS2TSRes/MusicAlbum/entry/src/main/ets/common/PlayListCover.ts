interface PlayListCover_Params {
    imgHeight?: number;
    coverMargin?: number;
    currentBreakpoint?: string;
    fontSize?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PlayListCover_" + ++__generate__Id;
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
import { optionList, OptionListType } from '../model/SongList';
export default class PlayListCover extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__imgHeight = new ObservedPropertySimple(0, this, "imgHeight");
        this.__coverMargin = AppStorage.SetAndProp('coverMargin', 0, this, "coverMargin");
        this.__currentBreakpoint = AppStorage.SetAndProp('currentBreakpoint', 'sm', this, "currentBreakpoint");
        this.__fontSize = AppStorage.SetAndProp('fontSize', 0, this, "fontSize");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PlayListCover_Params) {
        if (params.imgHeight !== undefined) {
            this.imgHeight = params.imgHeight;
        }
    }
    aboutToBeDeleted() {
        this.__imgHeight.aboutToBeDeleted();
        this.__coverMargin.aboutToBeDeleted();
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__fontSize.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __imgHeight: ObservedPropertySimple<number>;
    get imgHeight() {
        return this.__imgHeight.get();
    }
    set imgHeight(newValue: number) {
        this.__imgHeight.set(newValue);
    }
    private __coverMargin: ObservedPropertyAbstract<number>;
    get coverMargin() {
        return this.__coverMargin.get();
    }
    set coverMargin(newValue: number) {
        this.__coverMargin.set(newValue);
    }
    private __currentBreakpoint: ObservedPropertyAbstract<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private __fontSize: ObservedPropertyAbstract<number>;
    get fontSize() {
        return this.__fontSize.get();
    }
    set fontSize(newValue: number) {
        this.__fontSize.set(newValue);
    }
    CoverImage(parent = null) {
        Stack.create({ alignContent: Alignment.BottomStart });
        Image.create($r('app.media.pic_album'));
        Image.width(this.currentBreakpoint == 'sm' ? '120vp' : '170vp');
        Image.height(this.currentBreakpoint == 'sm' ? '120vp' : '170vp');
        Image.borderRadius(8);
        Image.onAreaChange((oldArea: Area, newArea: Area) => {
            this.imgHeight = newArea.height as number;
        });
        Text.create($r('app.string.collection_num'));
        Text.letterSpacing(1);
        Text.fontColor('#fff');
        Text.fontSize(this.fontSize - 4);
        Text.translate({ x: 10, y: '-100%' });
        Text.pop();
        Stack.pop();
    }
    CoverIntroduction(parent = null) {
        Column.create();
        Column.width('100%');
        Column.height(this.currentBreakpoint === 'sm' ? this.imgHeight : 70);
        Column.alignItems(HorizontalAlign.Start);
        Column.justifyContent(FlexAlign.Center);
        Column.padding({ left: this.currentBreakpoint === 'sm' ? 20 : 0 });
        Column.margin({
            top: this.currentBreakpoint === 'sm' ? 0 : 50,
            bottom: this.currentBreakpoint === 'sm' ? 0 : 20
        });
        Text.create($r('app.string.list_name'));
        Text.opacity(0.9);
        Text.fontWeight(500);
        Text.fontColor('#556B89');
        Text.fontSize(this.fontSize + 2);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create($r('app.string.playlist_Introduction'));
        Text.opacity(0.6);
        Text.width('170vp');
        Text.fontWeight(400);
        Text.fontColor('#556B89');
        Text.fontSize(this.fontSize - 2);
        Text.pop();
        Column.pop();
    }
    CoverOptions(parent = null) {
        Flex.create({ justifyContent: FlexAlign.SpaceBetween });
        Flex.height(70);
        Flex.padding({
            left: this.currentBreakpoint === 'sm' ? 20 : 0,
            right: this.currentBreakpoint === 'sm' ? 20 : 0
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(optionList), (item: OptionListType) => {
            Column.create({ space: 4 });
            Image.create(item.image);
            Image.height(30);
            Image.width(30);
            Text.create(item.text);
            Text.fontColor('#556B89');
            Text.fontSize(this.fontSize - 1);
            Text.pop();
            Column.pop();
        });
        ForEach.pop();
        Flex.pop();
    }
    render() {
        If.create();
        if (this.currentBreakpoint === 'sm') {
            If.branchId(0);
            Column.create();
            GridRow.create();
            GridRow.margin({ left: this.coverMargin, right: this.coverMargin });
            GridRow.padding({ top: this.currentBreakpoint === 'sm' ? 50 : 70 });
            GridCol.create({ span: { sm: 4, md: 10 }, offset: { sm: 0, md: 1, lg: 1 } });
            this.CoverImage(this);
            GridCol.pop();
            GridCol.create({ span: { sm: 8, md: 10 }, offset: { sm: 0, md: 2, lg: 2 } });
            this.CoverIntroduction(this);
            GridCol.pop();
            GridCol.create({ span: { sm: 12, md: 10 }, offset: { sm: 0, md: 2, lg: 2 } });
            GridCol.padding({
                top: this.currentBreakpoint === 'sm' ? 15 : 0,
                bottom: this.currentBreakpoint === 'sm' ? 15 : 0
            });
            this.CoverOptions(this);
            GridCol.pop();
            GridRow.pop();
            Column.pop();
        }
        else {
            If.branchId(1);
            Column.create();
            Column.height('100%');
            GridRow.create();
            GridRow.margin({ left: this.coverMargin, right: this.coverMargin });
            GridRow.padding({ top: this.currentBreakpoint === 'sm' ? 50 : 70 });
            GridCol.create({ span: { sm: 4, md: 10 }, offset: { sm: 0, md: 1, lg: 1 } });
            this.CoverImage(this);
            GridCol.pop();
            GridCol.create({ span: { sm: 8, md: 10 }, offset: { sm: 0, md: 2, lg: 2 } });
            this.CoverIntroduction(this);
            GridCol.pop();
            GridCol.create({ span: { sm: 12, md: 10 }, offset: { sm: 0, md: 2, lg: 2 } });
            GridCol.margin({
                top: this.currentBreakpoint === 'sm' ? 15 : 60,
                bottom: this.currentBreakpoint === 'sm' ? 15 : 0
            });
            this.CoverOptions(this);
            GridCol.pop();
            GridRow.pop();
            Column.pop();
        }
        If.pop();
    }
}
