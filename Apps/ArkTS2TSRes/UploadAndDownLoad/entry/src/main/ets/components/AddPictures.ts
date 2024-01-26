interface AddPictures_Params {
    imageList?: Array<string>;
    addImages?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AddPictures_" + ++__generate__Id;
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
import picker from '@ohos.file.picker';
import { logger } from '@ohos/uploaddownload';
const TAG: string = 'AddPictures';
function __Image__imageStyle(): void {
    Image.width('100%');
    Image.aspectRatio(1);
    Image.objectFit(ImageFit.Fill);
    Image.backgroundColor($r('app.color.light_gray'));
    Image.borderRadius(12);
}
export class AddPictures extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__imageList = this.initializeConsume("imageList", "imageList");
        this.addImages = (images: Array<string>) => {
            images.forEach((item: string) => {
                if (!this.imageList.includes(item)) {
                    this.imageList.push(item);
                }
            });
            logger.info(TAG, `addImages imageList=${JSON.stringify(this.imageList)}`);
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AddPictures_Params) {
        if (params.addImages !== undefined) {
            this.addImages = params.addImages;
        }
    }
    aboutToBeDeleted() {
        this.__imageList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __imageList: SynchedPropertySimpleOneWay<Array<string>>;
    get imageList() {
        return this.__imageList.get();
    }
    set imageList(newValue: Array<string>) {
        this.__imageList.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Text.create($r('app.string.tip'));
        Text.fontColor($r('app.color.text_normal'));
        Text.fontWeight(400);
        Text.fontFamily('HarmonyHeiTi');
        Text.fontSize(14);
        Text.opacity(0.4);
        Text.margin({ top: 16, bottom: 48 });
        Text.width('100%');
        Text.pop();
        GridRow.create({ columns: { sm: 3, md: 6, lg: 8 }, gutter: 12 });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.imageList), (item: string) => {
            GridCol.create({ span: 1 });
            Image.create(item);
            __Image__imageStyle();
            GridCol.pop();
        });
        ForEach.pop();
        GridCol.create({ span: 1 });
        GridCol.width('100%');
        GridCol.aspectRatio(1);
        GridCol.backgroundColor($r('app.color.white'));
        GridCol.borderRadius(12);
        GridCol.onClick(() => {
            this.showDialog();
        });
        Row.create();
        Row.width('100%');
        Row.height('100%');
        Row.justifyContent(FlexAlign.Center);
        Image.create($r('app.media.ic_public_add'));
        Image.size({ width: 24, height: 24 });
        Image.objectFit(ImageFit.Contain);
        Row.pop();
        GridCol.pop();
        GridRow.pop();
        Column.pop();
    }
    private addImages;
    showDialog() {
        AlertDialog.show({
            message: $r('app.string.pick_album'),
            alignment: DialogAlignment.Bottom,
            offset: { dx: 0, dy: -12 },
            primaryButton: {
                value: $r('app.string.cancel'),
                fontColor: $r('app.color.btn_text_blue'),
                action: () => {
                }
            },
            secondaryButton: {
                value: $r('app.string.ok'),
                fontColor: $r('app.color.btn_text_blue'),
                action: () => {
                    try {
                        let photoSelectOptions = new picker.PhotoSelectOptions();
                        photoSelectOptions.MIMEType = picker.PhotoViewMIMETypes.IMAGE_TYPE;
                        photoSelectOptions.maxSelectNumber = 5;
                        let photoPicker = new picker.PhotoViewPicker();
                        photoPicker.select(photoSelectOptions).then((photoSelectResult: picker.PhotoSelectResult) => {
                            this.addImages(photoSelectResult.photoUris);
                        }).catch((err: Error) => {
                            logger.info(TAG, `'PhotoViewPicker.select failed with err: ${JSON.stringify(err)}`);
                        });
                    }
                    catch (err) {
                        logger.info(TAG, `'PhotoViewPicker failed with err: ${JSON.stringify(err)}`);
                    }
                }
            }
        });
    }
}
