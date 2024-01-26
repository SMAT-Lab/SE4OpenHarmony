interface FileBrowse_Params {
    folders?: Array<string>;
    files?: Array<string>;
    currentFolder?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "FileBrowse_" + ++__generate__Id;
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
import { fileUtils } from '../utils/FileUtils';
export class FileBrowse extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__folders = new ObservedPropertyObject(['folder'], this, "folders");
        this.__files = new ObservedPropertyObject([], this, "files");
        this.__currentFolder = new ObservedPropertySimple('', this, "currentFolder");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: FileBrowse_Params) {
        if (params.folders !== undefined) {
            this.folders = params.folders;
        }
        if (params.files !== undefined) {
            this.files = params.files;
        }
        if (params.currentFolder !== undefined) {
            this.currentFolder = params.currentFolder;
        }
    }
    aboutToBeDeleted() {
        this.__folders.aboutToBeDeleted();
        this.__files.aboutToBeDeleted();
        this.__currentFolder.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __folders: ObservedPropertyObject<Array<string>>;
    get folders() {
        return this.__folders.get();
    }
    set folders(newValue: Array<string>) {
        this.__folders.set(newValue);
    }
    private __files: ObservedPropertyObject<Array<string>>;
    get files() {
        return this.__files.get();
    }
    set files(newValue: Array<string>) {
        this.__files.set(newValue);
    }
    private __currentFolder: ObservedPropertySimple<string>;
    get currentFolder() {
        return this.__currentFolder.get();
    }
    set currentFolder(newValue: string) {
        this.__currentFolder.set(newValue);
    }
    aboutToAppear() {
        fileUtils.listFolders().then((folders: Array<string>) => {
            this.folders = folders;
        });
    }
    render() {
        Navigation.create();
        Navigation.hideBackButton(false);
        Navigation.titleMode(NavigationTitleMode.Mini);
        Navigation.title($r('app.string.download_files_title'));
        Navigation.mode(NavigationMode.Stack);
        Navigation.backgroundColor($r('app.color.light_gray'));
        List.create({ space: 12 });
        List.padding({ left: 12, right: 12 });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.folders), (item: string) => {
            ListItem.create();
            NavRouter.create();
            NavRouter.onStateChange(async (isActivated: boolean) => {
                if (isActivated) {
                    this.currentFolder = item;
                    this.files = await fileUtils.listFiles(item);
                }
            });
            Row.create();
            Row.height(56);
            Row.padding({ left: 16 });
            Row.backgroundColor(Color.White);
            Row.borderRadius(24);
            Image.create($r('app.media.ic_files_folder'));
            Image.size({ width: 32, height: 26 });
            Image.objectFit(ImageFit.Contain);
            Text.create(item);
            Text.fontSize(16);
            Text.width('100%');
            Text.margin({ left: 12 });
            Text.pop();
            Row.pop();
            NavDestination.create();
            NavDestination.title({ builder: () => {
                    this.CustomTitle.call(this, item);
                } });
            NavDestination.backgroundColor($r('app.color.light_gray'));
            this.FilesView(this);
            NavDestination.pop();
            NavRouter.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Navigation.pop();
    }
    CustomTitle(title: string, parent = null) {
        Row.create();
        Row.width('100%');
        Text.create(title);
        Text.fontSize(20);
        Text.fontColor($r('app.color.text_normal'));
        Text.fontWeight(700);
        Text.margin({ left: 8 });
        Text.pop();
        Row.pop();
    }
    FilesView(parent = null) {
        Column.create();
        Column.height('100%');
        Column.backgroundColor($r('app.color.light_gray'));
        List.create({ space: 12 });
        List.padding({ left: 12, right: 12 });
        List.layoutWeight(1);
        If.create();
        if (this.files.length === 0) {
            If.branchId(0);
            ListItem.create();
            Text.create($r('app.string.folder_empty'));
            Text.fontSize(16);
            Text.width('100%');
            Text.margin({ top: 50 });
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
        }
        If.pop();
        ForEach.create("3", this, ObservedObject.GetRawObject(this.files), (item: string) => {
            ListItem.create();
            ListItem.padding(12);
            ListItem.height(48);
            ListItem.backgroundColor(Color.White);
            ListItem.borderRadius(24);
            Text.create(decodeURIComponent(item));
            Text.fontSize(16);
            Text.width('100%');
            Text.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Column.create();
        Column.margin({ bottom: 24, top: 6 });
        Column.onClick(() => {
            fileUtils.clearFolder(this.currentFolder);
            this.files = [];
        });
        Button.createWithChild();
        Button.type(ButtonType.Circle);
        Button.width(40);
        Button.height(40);
        Button.backgroundColor('#FF0000');
        Button.margin({ left: 5 });
        Image.create($r('app.media.ic_public_delete'));
        Image.objectFit(ImageFit.Cover);
        Image.size({ width: 24, height: 24 });
        Button.pop();
        Text.create($r('app.string.clear_folder'));
        Text.fontSize(14);
        Text.fontColor($r('app.color.text_normal'));
        Text.opacity(0.6);
        Text.margin({ top: 8 });
        Text.pop();
        Column.pop();
        Column.pop();
    }
}
