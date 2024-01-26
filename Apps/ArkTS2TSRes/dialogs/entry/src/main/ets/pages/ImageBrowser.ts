interface Index_Params {
    imageList?: Resource[];
    index?: number;
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ImageBrowser_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { ImageBrowserDialog } from '@ohos/dialogs';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__imageList = new ObservedPropertyObject([$r('app.media.card'), $r('app.media.sanmartino'), $r('app.media.swissroad')], this, "imageList");
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new ImageBrowserDialog({
                    imageList: this.imageList,
                    index: this.index
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            autoCancel: true,
            alignment: DialogAlignment.Default,
            customStyle: true
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.imageList !== undefined) {
            this.imageList = params.imageList;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__imageList.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __imageList: ObservedPropertyObject<Resource[]>;
    get imageList() {
        return this.__imageList.get();
    }
    set imageList(newValue: Resource[]) {
        this.__imageList.set(newValue);
    }
    private __index: ObservedPropertySimple<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private dialogController: CustomDialogController;
    render() {
        Grid.create();
        Grid.rowsTemplate('1fr 1fr');
        Grid.columnsTemplate('1fr 1fr');
        Grid.width('100%');
        Grid.height(350);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.imageList), (image: Resource, index: number) => {
            GridItem.create();
            GridItem.width(150);
            GridItem.height(150);
            Image.create(image);
            Image.width(150);
            Image.height(150);
            Image.onClick(() => {
                this.index = index;
                this.dialogController.open();
            });
            GridItem.pop();
        });
        ForEach.pop();
        Grid.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
