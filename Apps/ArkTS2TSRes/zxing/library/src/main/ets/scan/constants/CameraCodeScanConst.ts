let __generate__Id: number = 0;
function generateId(): string {
    return "CameraCodeScanConst_" + ++__generate__Id;
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
import image from '@ohos.multimedia.image';
/**
 * 二维码扫描解析常量
 */
export class CameraCodeScanConst {
    // 扫描框距离头部高度
    static readonly SCAN_TO_TOP_HEIGHT: number = 120;
    // 二维码扫描解析结果
    static readonly QR_CODE_PARSE_RESULT: string = 'qrCodeParseResult';
}
/**
 * 图片属性
 */
export interface ImageAttribute {
    width: number;
    height: number;
    pixelMap: image.PixelMap;
}
/**
 * 解析结果属性
 */
export interface DecodeResultAttribute {
    isSucess: boolean;
    decodeResult: string;
}
