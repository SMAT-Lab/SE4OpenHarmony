let __generate__Id: number = 0;
function generateId(): string {
    return "ImageSaver_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import buffer from '@ohos.buffer';
import promptAction from '@ohos.promptAction';
import fs from '@ohos.file.fs';
export default class ImageSaver {
    private imageString: string | null = null;
    private uri: string | null = null;
    public saveImage(filename: string, context: CanvasRenderingContext2D | null) {
        this.imageString = context?.toDataURL() ?? null;
        try {
            let PhotoSaveOptions = new picker.PhotoSaveOptions();
            const currentTime: number = new Date().getTime();
            let filenameString = filename.replace(' ', '');
            PhotoSaveOptions.newFileNames = [`${filenameString}_${currentTime}.png`];
            let photoPicker = new picker.PhotoViewPicker();
            photoPicker.save(PhotoSaveOptions).then((PhotoSaveResult) => {
                if (PhotoSaveResult && PhotoSaveResult.length > 0 && PhotoSaveResult[0]) {
                    this.uri = PhotoSaveResult[0];
                }
                AlertDialog.show({
                    title: '保存图像',
                    message: '路径：' + this.uri,
                    autoCancel: true,
                    alignment: DialogAlignment.Bottom,
                    gridCount: 4,
                    offset: {
                        dx: 0, dy: -20
                    },
                    primaryButton: {
                        value: '取消',
                        action: () => {
                        }
                    },
                    secondaryButton: {
                        value: '确认',
                        action: () => {
                            this.saveFile();
                        }
                    }
                });
                console.info('PhotoViewPicker.save successfully, PhotoSaveResult uri: ' + JSON.stringify(PhotoSaveResult));
            }).catch((err: Error) => {
                console.error('PhotoViewPicker.save failed with err: ' + err);
                throw err;
            });
        }
        catch (err) {
            console.error('PhotoViewPicker failed with err: ' + err);
        }
    }
    private saveFile() {
        let imageString = this.imageString;
        if (imageString && this.uri) {
            const parts = imageString.split(',');
            if (parts && parts.length > 1 && parts[1]) {
                const dataString = parts[1];
                let file = fs.openSync(this.uri, fs.OpenMode.READ_WRITE);
                const decodeBuffer = buffer.from(dataString, 'base64').buffer;
                fs.writeSync(file.fd, decodeBuffer);
                fs.closeSync(file);
                try {
                    promptAction.showToast({
                        message: '保存成功',
                        duration: 1200,
                    });
                }
                catch (error) {
                    console.error(`showToast args error code is ${error.code}, message is ${error.message}`);
                }
                ;
            }
            else {
                console.error('Invalid imageString format: parts[1] is undefined or null.');
            }
        }
        else {
            console.error('Invalid context.toDataURL(): imageString is undefined or null.');
        }
    }
}
