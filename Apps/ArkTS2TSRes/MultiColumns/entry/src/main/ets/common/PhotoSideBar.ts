interface PhotoSideBar_Params {
    photoList?: photoType[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PhotoSideBar_" + ++__generate__Id;
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
export class PhotoSideBar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__photoList = new ObservedPropertyObject([
            new photoType($r('app.string.picture'), 1234),
            new photoType($r('app.string.video'), 12),
            new photoType($r('app.string.collect'), 7),
            new photoType($r('app.string.newAlbum'), 11),
            new photoType($r('app.string.avatar'), 223),
            new photoType($r('app.string.address'), 125),
            new photoType($r('app.string.category'), 234),
            new photoType($r('app.string.pictureType'), 22),
            new photoType($r('app.string.hidden'), 1),
        ], this, "photoList");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PhotoSideBar_Params) {
        if (params.photoList !== undefined) {
            this.photoList = params.photoList;
        }
    }
    aboutToBeDeleted() {
        this.__photoList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __photoList: ObservedPropertyObject<photoType[]>;
    get photoList() {
        return this.__photoList.get();
    }
    set photoList(newValue: photoType[]) {
        this.__photoList.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.padding({ left: 12, right: 12 });
        Row.create();
        Row.height(56);
        Row.width('100%');
        Search.create({ placeholder: $r('app.string.placeholderText') });
        Search.backgroundColor('#fff');
        Search.focusable(false);
        Search.pop();
        Row.pop();
        List.create();
        List.margin({ top: 16 });
        List.width('100%');
        List.height('100%');
        ListItem.create();
        Row.create();
        Row.padding({ left: 8 });
        Row.width('100%');
        Image.create($r('app.media.ic_public_picture'));
        Image.width(24);
        Image.aspectRatio(1);
        Text.create($r('app.string.photo'));
        Text.fontSize(16);
        Text.fontWeight(FontWeight.Medium);
        Text.opacity(0.9);
        Text.height(48);
        Text.margin({ left: 8 });
        Text.pop();
        Row.pop();
        ListItem.pop();
        ListItem.create();
        Row.create();
        Row.padding({ left: 8 });
        Row.width('100%');
        Row.backgroundColor('#19254ff7');
        Row.borderRadius(10);
        Image.create($r('app.media.ic_public_folder'));
        Image.width(24);
        Image.aspectRatio(1);
        Text.create($r('app.string.album'));
        Text.fontSize(16);
        Text.fontWeight(FontWeight.Medium);
        Text.opacity(0.9);
        Text.height(48);
        Text.margin({ left: 8 });
        Text.fontColor('rgb(10,89,247)');
        Text.pop();
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.ic_public_arrow_down_0'));
        Image.width(24);
        Image.height(12);
        Image.rotate({ angle: 90 });
        Image.opacity(0.8);
        Row.pop();
        ListItem.pop();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.photoList), (item: photoType, index: number | undefined) => {
            ListItem.create();
            Row.create();
            Row.padding({ left: 16, right: 24 });
            Row.width('100%');
            Text.create(item.name);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.opacity(0.9);
            Text.height(48);
            Text.margin({ left: 8 });
            Text.pop();
            Blank.create();
            Blank.pop();
            If.create();
            if (index === this.photoList.length - 1) {
                If.branchId(0);
                Image.create($r('app.media.ic_public_lock_filled'));
                Image.width(24);
                Image.aspectRatio(1);
            }
            else {
                If.branchId(1);
                Text.create(item.count.toString());
                Text.fontSize(14);
                Text.fontWeight(FontWeight.Regular);
                Text.pop();
            }
            If.pop();
            Row.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
