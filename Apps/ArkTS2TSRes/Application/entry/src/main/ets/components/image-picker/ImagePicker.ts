interface ImagePicker_Params {
    imageDatas?: Array<mediaLibrary.FileAsset>;
    selected?: number;
    controller?: CustomDialogController;
    index?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ImagePicker_" + ++__generate__Id;
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
import mediaLibrary from '@ohos.multimedia.mediaLibrary';
import { Constants } from '../../common/Constants';
export default class ImagePicker extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__imageDatas = new SynchedPropertyObjectTwoWay(params.imageDatas, this, "imageDatas");
        this.selected = 0;
        this.controller = undefined;
        this.__index = new SynchedPropertySimpleTwoWay(params.index, this, "index");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ImagePicker_Params) {
        if (params.selected !== undefined) {
            this.selected = params.selected;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__imageDatas.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __imageDatas: SynchedPropertySimpleOneWay<Array<mediaLibrary.FileAsset>>;
    get imageDatas() {
        return this.__imageDatas.get();
    }
    set imageDatas(newValue: Array<mediaLibrary.FileAsset>) {
        this.__imageDatas.set(newValue);
    }
    private selected: number;
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
        Column.width(Constants.PERCENT_100);
        List.create({ space: Constants.LENGTH_5_PX });
        List.width(Constants.PERCENT_90);
        List.height(Constants.LENGTH_160_PX);
        List.listDirection(Axis.Horizontal);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.imageDatas), (item, index) => {
            ListItem.create();
            If.create();
            if (this.imageDatas.length === 0) {
                If.branchId(0);
                Text.create($r('app.string.no_photo'));
                Text.fontSize($r('app.float.navigation_font_size'));
                Text.margin({ bottom: Constants.LENGTH_20_PX });
                Text.pop();
            }
            else {
                If.branchId(1);
                Stack.create({ alignContent: Alignment.TopEnd });
                Image.create(item?.uri);
                Image.width(Constants.LENGTH_180_PX);
                Image.height(Constants.LENGTH_150_PX);
                Image.objectFit(ImageFit.Contain);
                Image.margin({
                    left: Constants.LENGTH_2_PX,
                    right: Constants.LENGTH_2_PX,
                    top: Constants.LENGTH_5_PX,
                    bottom: Constants.LENGTH_5_PX
                });
                Radio.create({ value: 'Radio3', group: 'radioGroup' });
                Radio.checked(index === this.index ? true : false);
                Radio.border({ width: 1, color: Color.Blue, radius: 10 });
                Radio.onChange(() => {
                    this.selected = index;
                });
                Stack.pop();
            }
            If.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Row.create();
        Row.margin({ bottom: Constants.LENGTH_10_PX });
        Button.createWithLabel($r('app.string.confirmButton_label'));
        Button.margin({ right: Constants.PERCENT_25 });
        Button.onClick(() => {
            this.index = this.selected;
        });
        Button.pop();
        Button.createWithLabel($r('app.string.cancelButton_label'));
        Button.backgroundColor('red');
        Button.onClick(() => {
            this.controller.close();
        });
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
