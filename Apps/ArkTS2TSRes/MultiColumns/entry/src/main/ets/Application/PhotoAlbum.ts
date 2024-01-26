interface PhotoAlbum_Params {
    sideBarStatus?: boolean;
    currentBreakPoint?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PhotoAlbum_" + ++__generate__Id;
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
import { PhotoContent } from '../common/PhotoContent';
import { PhotoSideBar } from '../common/PhotoSideBar';
let storage = LocalStorage.GetShared();
class PhotoAlbum extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__sideBarStatus = new ObservedPropertySimple(true, this, "sideBarStatus");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PhotoAlbum_Params) {
        if (params.sideBarStatus !== undefined) {
            this.sideBarStatus = params.sideBarStatus;
        }
    }
    aboutToBeDeleted() {
        this.__sideBarStatus.aboutToBeDeleted();
        this.__currentBreakPoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __sideBarStatus: ObservedPropertySimple<boolean>;
    get sideBarStatus() {
        return this.__sideBarStatus.get();
    }
    set sideBarStatus(newValue: boolean) {
        this.__sideBarStatus.set(newValue);
    }
    private __currentBreakPoint: ObservedPropertyAbstract<string> = this.localStorage_.setAndLink<string>('currentBreakPoint', 'sm', this, "currentBreakPoint");
    get currentBreakPoint() {
        return this.__currentBreakPoint.get();
    }
    set currentBreakPoint(newValue: string) {
        this.__currentBreakPoint.set(newValue);
    }
    render() {
        GridRow.create();
        GridRow.onBreakpointChange((breakpoint: string) => {
            this.currentBreakPoint = breakpoint;
        });
        GridCol.create({ span: { sm: 12, md: 12, lg: 12 } });
        SideBarContainer.create(SideBarContainerType.AUTO);
        SideBarContainer.controlButton({ left: 24, top: 16, width: 24, height: 24 });
        SideBarContainer.onChange((value: boolean) => {
            this.sideBarStatus = value;
        });
        Column.create();
        Column.backgroundColor('#f1f3f5');
        __Common__.create();
        __Common__.margin({ top: 64 });
        let earlierCreatedChild_2: PhotoSideBar = (this && this.findChildById) ? this.findChildById("2") as PhotoSideBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new PhotoSideBar("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        __Common__.pop();
        Column.pop();
        Column.create();
        let earlierCreatedChild_3: PhotoContent = (this && this.findChildById) ? this.findChildById("3") as PhotoContent : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new PhotoContent("3", this, { sideBarStatus: this.__sideBarStatus }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
        SideBarContainer.pop();
        GridCol.pop();
        GridRow.pop();
    }
}
loadDocument(new PhotoAlbum("1", undefined, {}, storage));
