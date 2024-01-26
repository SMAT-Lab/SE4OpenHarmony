interface ImagePicker_Params {
    imageDatas?: Array<photoAccessHelper.PhotoAsset>;
    selected?: number;
    controller?: CustomDialogController;
    index?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ImagePicker_" + ++__generate__Id;
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
import photoAccessHelper from '@ohos.file.photoAccessHelper';
export default class ImagePicker extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.imageDatas = [];
        this.__selected = new ObservedPropertySimple(0, this, "selected");
        this.controller = undefined;
        this.__index = new SynchedPropertySimpleTwoWay(params.index, this, "index");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ImagePicker_Params) {
        if (params.imageDatas !== undefined) {
            this.imageDatas = params.imageDatas;
        }
        if (params.selected !== undefined) {
            this.selected = params.selected;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__selected.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private imageDatas: Array<photoAccessHelper.PhotoAsset>;
    private __selected: ObservedPropertySimple<number>;
    get selected() {
        return this.__selected.get();
    }
    set selected(newValue: number) {
        this.__selected.set(newValue);
    }
    public controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private __index: SynchedPropertySimpleTwoWay<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    aboutToAppear() {
        this.selected = this.index;
    }
    render() {
        Column.create();
        Column.width('100%');
        List.create({ space: 5 });
        List.width('95%');
        List.height(160);
        List.listDirection(Axis.Horizontal);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.imageDatas), (item: photoAccessHelper.PhotoAsset, index) => {
            ListItem.create();
            Stack.create({ alignContent: Alignment.TopEnd });
            Image.create(item.uri);
            Image.width(180);
            Image.height(150);
            Image.margin({ left: 2, right: 2, top: 5, bottom: 5 });
            Radio.create({ value: 'Radio3', group: 'radioGroup' });
            Radio.id(`radio${this.selected + 1}_${index + 1}`);
            Radio.checked(index === this.selected ? true : false);
            Radio.onChange(() => {
                this.selected = index;
            });
            Stack.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Row.create();
        Row.margin({ bottom: 10 });
        Button.createWithLabel($r('app.string.cancel'));
        Button.id('cancel');
        Button.margin({ right: '25%' });
        Button.onClick(() => {
            this.controller.close();
        });
        Button.pop();
        Button.createWithLabel($r('app.string.conform'));
        Button.id('confirm');
        Button.onClick(() => {
            this.index = this.selected;
        });
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
