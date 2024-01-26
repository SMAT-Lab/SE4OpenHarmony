interface PhotoContent_Params {
    photoList?: photoType[];
    columnsTemplate?: string;
    sideBarStatus?: boolean;
    currentBreakPoint?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PhotoContent_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import { photoType } from '../model/dataType';
export class PhotoContent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__photoList = new ObservedPropertyObject([
            new photoType($r('app.string.picture'), 1234, $r('app.media.P1')),
            new photoType($r('app.string.video'), 12, $r('app.media.P2')),
            new photoType($r('app.string.collect'), 7, $r('app.media.P3')),
            new photoType($r('app.string.newAlbum'), 11, $r('app.media.P4')),
            new photoType($r('app.string.avatar'), 223, $r('app.media.P5')),
            new photoType($r('app.string.address'), 125, $r('app.media.P6')),
            new photoType($r('app.string.category'), 234, $r('app.media.P7')),
            new photoType($r('app.string.pictureType'), 22, $r('app.media.P8')),
        ], this, "photoList");
        this.__columnsTemplate = new ObservedPropertySimple('1fr 1fr 1fr', this, "columnsTemplate");
        this.__sideBarStatus = new SynchedPropertySimpleTwoWay(params.sideBarStatus, this, "sideBarStatus");
        this.updateWithValueParams(params);
        this.declareWatch("sideBarStatus", this.onStateChange);
    }
    updateWithValueParams(params: PhotoContent_Params) {
        if (params.photoList !== undefined) {
            this.photoList = params.photoList;
        }
        if (params.columnsTemplate !== undefined) {
            this.columnsTemplate = params.columnsTemplate;
        }
    }
    aboutToBeDeleted() {
        this.__photoList.aboutToBeDeleted();
        this.__columnsTemplate.aboutToBeDeleted();
        this.__sideBarStatus.aboutToBeDeleted();
        this.__currentBreakPoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __photoList: ObservedPropertyObject<photoType[]>;
    get photoList() {
        return this.__photoList.get();
    }
    set photoList(newValue: photoType[]) {
        this.__photoList.set(newValue);
    }
    private __columnsTemplate: ObservedPropertySimple<string>;
    get columnsTemplate() {
        return this.__columnsTemplate.get();
    }
    set columnsTemplate(newValue: string) {
        this.__columnsTemplate.set(newValue);
    }
    private __sideBarStatus: SynchedPropertySimpleTwoWay<boolean>;
    get sideBarStatus() {
        return this.__sideBarStatus.get();
    }
    set sideBarStatus(newValue: boolean) {
        this.__sideBarStatus.set(newValue);
    }
    private __currentBreakPoint: ObservedPropertyAbstract<string> = this.localStorage_.setAndProp<string>('currentBreakPoint', 'sm', this, "currentBreakPoint");
    get currentBreakPoint() {
        return this.__currentBreakPoint.get();
    }
    set currentBreakPoint(newValue: string) {
        this.__currentBreakPoint.set(newValue);
    }
    aboutToAppear() {
        this.columnsTemplate = this.currentBreakPoint === 'sm' ? '1fr 1fr 1fr 1fr' : '1fr 1fr 1fr';
    }
    onStateChange() {
        Context.animateTo({ duration: 300 }, () => {
            if (this.sideBarStatus === true && this.currentBreakPoint !== 'sm') {
                this.columnsTemplate = '1fr 1fr 1fr';
            }
            else {
                this.columnsTemplate = '1fr 1fr 1fr 1fr';
            }
        });
    }
    render() {
        Column.create();
        Column.padding({ left: 24, right: 18 });
        Row.create();
        Row.height(56);
        Row.width('100%');
        Text.create($r('app.string.album'));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Medium);
        Text.margin({ left: this.sideBarStatus ? 0 : 36 });
        Text.pop();
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.add'));
        Image.width(24);
        Image.aspectRatio(1);
        Image.create($r('app.media.more'));
        Image.width(24);
        Image.aspectRatio(1);
        Image.margin({ left: 24 });
        Row.pop();
        Grid.create();
        Grid.columnsTemplate(this.columnsTemplate);
        Grid.columnsGap(22);
        Grid.rowsGap(17);
        Grid.margin({ top: 7 });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.photoList), (item: photoType) => {
            GridItem.create();
            Column.create();
            Image.create(item.src);
            Image.width('100%');
            Image.aspectRatio(1);
            Image.borderRadius(12);
            Column.create();
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
            Column.padding({ left: 8, right: 8 });
            Text.create(item.name);
            Text.margin({ top: 8 });
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Regular);
            Text.pop();
            Text.create(item.count.toString());
            Text.fontSize(12);
            Text.fontWeight(FontWeight.Regular);
            Text.pop();
            Column.pop();
            Column.pop();
            GridItem.pop();
        });
        ForEach.pop();
        Grid.pop();
        Column.pop();
    }
}
