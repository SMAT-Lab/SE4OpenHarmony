interface Uploader_Params {
    image?: string[];
    imgNumber?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Uploader_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Institute of Software, Chinese Academy of Sciences.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import picker from '@ohos.file.picker';
export class Uploader extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__image = new ObservedPropertyObject([""], this, "image");
        this.imgNumber = 1;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Uploader_Params) {
        if (params.image !== undefined) {
            this.image = params.image;
        }
        if (params.imgNumber !== undefined) {
            this.imgNumber = params.imgNumber;
        }
    }
    aboutToBeDeleted() {
        this.__image.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __image: ObservedPropertyObject<string[]>;
    get image() {
        return this.__image.get();
    }
    set image(newValue: string[]) {
        this.__image.set(newValue);
    }
    private imgNumber: number;
    async example() {
        try {
            let PhotoSelectOptions = new picker.PhotoSelectOptions(); //图片选择器设置，设置选择的媒体文件类型，如图片视频
            PhotoSelectOptions.MIMEType = picker.PhotoViewMIMETypes.IMAGE_TYPE;
            PhotoSelectOptions.maxSelectNumber = this.imgNumber;
            let photoPicker = new picker.PhotoViewPicker();
            photoPicker.select(PhotoSelectOptions).then((PhotoSelectResult) => {
                this.image = PhotoSelectResult.photoUris;
                console.info("image=", this.image);
            }).catch((err) => {
                console.error('PhotoViewPicker.select failed with err: ' + err);
            });
        }
        catch (err) {
            console.error('PhotoViewPicker failed with err: ' + err);
        }
    }
    render() {
        Column.create();
        Image.create({ "id": 0, "type": 30000, params: ["Uploader_photograph.png"] });
        Image.width(40);
        Image.height(40);
        Image.onClick(() => {
            console.log("test");
            this.example();
        });
        Image.alignSelf(ItemAlign.Start);
        Grid.create();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.image), item => {
            GridItem.create();
            Image.create(item);
            Image.width(80);
            Image.height(80);
            Image.margin({ right: 10 });
            GridItem.pop();
        });
        ForEach.pop();
        Grid.pop();
        Column.pop();
    }
}
