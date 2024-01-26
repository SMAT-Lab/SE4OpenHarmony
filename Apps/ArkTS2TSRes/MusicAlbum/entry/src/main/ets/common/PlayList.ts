interface PlayList_Params {
    coverHeight?: number;
    currentBreakpoint?: string;
    fontSize?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PlayList_" + ++__generate__Id;
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
import { songList, SongListType } from '../model/SongList';
import MyDataSource from '../model/SongModule';
export default class PlayList extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__coverHeight = this.initializeConsume("coverHeight", "coverHeight");
        this.__currentBreakpoint = AppStorage.SetAndProp('currentBreakpoint', 'sm', this, "currentBreakpoint");
        this.__fontSize = AppStorage.SetAndProp('fontSize', 0, this, "fontSize");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PlayList_Params) {
    }
    aboutToBeDeleted() {
        this.__coverHeight.aboutToBeDeleted();
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__fontSize.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __coverHeight: SynchedPropertySimpleTwoWay<number>;
    get coverHeight() {
        return this.__coverHeight.get();
    }
    set coverHeight(newValue: number) {
        this.__coverHeight.set(newValue);
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
    PlayAll(parent = null) {
        Row.create();
        Row.height(60);
        Row.width('100%');
        Row.backgroundColor('#fff');
        Row.padding({ left: 12, right: 12 });
        Row.borderRadius({ topRight: 20, topLeft: 20 });
        Row.position({ x: 0, y: 0 });
        Image.create($r("app.media.ic_play_all"));
        Image.height(23);
        Image.width(23);
        Text.create($r('app.string.play_all'));
        Text.maxLines(1);
        Text.padding({ left: 10 });
        Text.fontColor('#000000');
        Text.fontSize(this.fontSize);
        Text.pop();
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.ic_order_play'));
        Image.width(24);
        Image.height(24);
        Image.margin({ right: 16 });
        Image.create($r('app.media.ic_sort_list'));
        Image.height(24);
        Image.width(24);
        Row.pop();
    }
    SongItem(title: string, label: Resource, singer: string, parent = null) {
        Row.create();
        Row.height(60);
        Row.width('100%');
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Text.create(title);
        Text.fontColor('#000000');
        Text.fontSize(this.fontSize);
        Text.margin({ bottom: 4 });
        Text.pop();
        Row.create();
        Image.create(label);
        Image.width(16);
        Image.height(16);
        Image.margin({ right: 4 });
        Text.create(singer);
        Text.opacity(0.38);
        Text.fontColor('#000000');
        Text.fontSize(this.fontSize - 4);
        Text.pop();
        Row.pop();
        Column.pop();
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.ic_list_more'));
        Image.height(24);
        Image.width(24);
        Row.pop();
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.padding({
            top: this.currentBreakpoint === 'sm' ? 0 : 50,
            bottom: this.currentBreakpoint === 'sm' ? this.coverHeight + 48 : 48
        });
        this.PlayAll(this);
        Scroll.create();
        Scroll.backgroundColor('#fff');
        Scroll.margin({ top: 50 });
        List.create();
        List.width('100%');
        List.height('100%');
        List.lanes(this.currentBreakpoint === 'lg' ? 2 : 1);
        LazyForEach.create("2", this, ObservedObject.GetRawObject(new MyDataSource(songList)), (item: SongListType) => {
            this.isRenderingInProgress = true;
            ListItem.create();
            Column.create();
            Column.padding({ left: 14, right: 14 });
            this.SongItem(item.title, item.label, item.singer, this);
            Divider.create();
            Divider.strokeWidth(0.5);
            Divider.color('#000');
            Divider.opacity(0.1);
            Column.pop();
            ListItem.pop();
            this.isRenderingInProgress = false;
        }, (item: SongListType) => item.id.toString());
        LazyForEach.pop();
        List.pop();
        Scroll.pop();
        Column.pop();
    }
}
