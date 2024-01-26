// @ts-nocheck
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
import image from '@ohos.multimedia.image';
import SrcType from './SrcType';
import DownloadUtils from './DownloadUtils';
import { GlobalContext } from './GlobalContext';
import common from '@ohos.app.ability.common';
class PixelMapUtils {
    public static createPixelMap(src: string | Resource | ArrayBuffer, srcType: SrcType | null, callback: (pixelMap: image.PixelMap, width: number, height: number, error?: Error) => void, context?: common.UIAbilityContext): void {
        if (context != undefined) {
        }
        else {
            context = GlobalContext.getContext().getObject("context") as common.UIAbilityContext;
        }
        switch (srcType) {
            case SrcType.MEDIA: // media相关数据
                context.createModuleContext(src.moduleName).resourceManager.getMediaContent(src.id, (error, value) => {
                    if (error != null) {
                        console.log("error is " + error);
                    }
                    else if (value) {
                        this.callbackPixelMap(value.buffer, callback);
                    }
                });
                break;
            case SrcType.RAWFILE: // 本地rawfile相关数据
                context.resourceManager.getRawFileContent(src, (error, value) => {
                    if (error != null) {
                        console.log("error is " + error);
                    }
                    else if (value) {
                        this.callbackPixelMap(value.buffer, callback);
                    }
                });
                break;
            case SrcType.URI: // 路径uri相关数据
                this.callbackPixelMap(src, callback);
                break;
            case SrcType.URL: // url相关数据
                new DownloadUtils().loadData(src, (arrayBuffer, error) => {
                    if (!error) {
                        this.callbackPixelMap(arrayBuffer, callback);
                    }
                });
                break;
            case SrcType.ARRAYBUFFER: // ArrayBuffer相关数据
                this.callbackPixelMap(src, callback);
                break;
        }
    }
    private static callbackPixelMap(src: string | ArrayBuffer, callback: (pixelMap: image.PixelMap, width: number, height: number, error?: Error) => void): void {
        let imageSource = image.createImageSource(src as any);
        imageSource.getImageInfo().then(imageInfo => {
            let width = imageInfo.size.width;
            let height = imageInfo.size.height;
            imageSource.createPixelMap().then(pixelMap => {
                callback(pixelMap, width, height);
            }).catch(error => {
                console.error("PixelMapUtils imageSource.createPixelMap error: " + error);
                callback(null, 0, 0, error);
            });
        }).catch(error => {
            console.error("PixelMapUtils imageSource.getImageInfo error: " + error);
            callback(null, 0, 0, error);
        });
    }
}
export default PixelMapUtils;
