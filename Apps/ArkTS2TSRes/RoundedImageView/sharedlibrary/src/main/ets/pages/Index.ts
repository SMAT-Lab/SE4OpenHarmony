interface Index_Params {
    picIdxArr?: number[];
    colorIdxArr?: number[];
    uiWidth?: number;
    uiHeight?: number;
    uriFolder?: string;
    uriFile?: string;
    viewModels?: RoundedImageName.Model[];
    scroller?: Scroller;
    dialogController?: CustomDialogController;
    rectPictureItems?: PictureItem[];
    ovalPictureItems?: PictureItem[];
    colorItems?: PictureItem[];
    backgroundColorItems?: PictureItem[];
    svgItems?: PictureItem[];
    typeValue?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import { PictureItem } from './PictureItem';
import { TypeCustomDialog } from './TypeCustomDialog';
import { RoundedImageView, RoundedImageName, ScaleType, TileMode, SrcType, FileUtils, GlobalContext } from '@ohos/roundedimageview';
import common from '@ohos.app.ability.common';
import display from '@ohos.display';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.picIdxArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.colorIdxArr = [0, 1, 2, 3, 4, 5, 6];
        this.uiWidth = px2vp(display.getDefaultDisplaySync().width * 0.9);
        this.uiHeight = px2vp(500);
        this.uriFolder = getContext(this).filesDir + "/" + "uriFolder";
        this.uriFile = this.uriFolder + "/" + "photo1.jpg";
        this.viewModels = [];
        this.scroller = new Scroller();
        this.dialogController = new CustomDialogController({
            alignment: DialogAlignment.Top,
            builder: () => {
                let jsDialog = new TypeCustomDialog("7", this, { typeValue: this.__typeValue });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            autoCancel: true
        }, this);
        this.rectPictureItems = [
            {
                src: $r('app.media.photo1'),
                srcType: SrcType.MEDIA,
                isSvg: false,
                primaryTitle: 'Tufa at night',
                secondTitle: 'Mono Lake, CA',
                scaleTypeName: 'CENTER',
                scaleType: ScaleType.CENTER,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: $r('app.media.photo2'),
                srcType: SrcType.MEDIA,
                isSvg: false,
                primaryTitle: 'Starry night',
                secondTitle: 'Lake Powell, AZ',
                scaleTypeName: 'CENTER_CROP',
                scaleType: ScaleType.CENTER_CROP,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: $r('app.media.photo3'),
                srcType: SrcType.MEDIA,
                isSvg: false,
                primaryTitle: 'Racetrack playa',
                secondTitle: 'Death Valley, CA',
                scaleTypeName: 'CENTER_INSIDE',
                scaleType: ScaleType.CENTER_INSIDE,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: $r('app.media.photo4'),
                srcType: SrcType.MEDIA,
                isSvg: false,
                primaryTitle: 'Napali coast',
                secondTitle: 'Kauai, HI',
                scaleTypeName: 'FIT_CENTER',
                scaleType: ScaleType.FIT_CENTER,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: $r('app.media.photo5'),
                srcType: SrcType.MEDIA,
                isSvg: false,
                primaryTitle: 'Delicate Arch',
                secondTitle: 'Arches, UT',
                scaleTypeName: 'FIT_END',
                scaleType: ScaleType.FIT_END,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: $r('app.media.photo6'),
                srcType: SrcType.MEDIA,
                isSvg: false,
                primaryTitle: 'Sierra sunset',
                secondTitle: 'Lone Pine, CA',
                scaleTypeName: 'FIT_START',
                scaleType: ScaleType.FIT_START,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: $r('app.media.photo7'),
                srcType: SrcType.MEDIA,
                isSvg: false,
                primaryTitle: 'Majestic',
                secondTitle: 'Grand Teton, WY',
                scaleTypeName: 'FIT_XY',
                scaleType: ScaleType.FIT_XY,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: $r('app.media.black_white_tile'),
                srcType: SrcType.MEDIA,
                isSvg: false,
                primaryTitle: 'TileMode',
                secondTitle: 'REPEAT',
                scaleTypeName: 'FIT_XY',
                scaleType: ScaleType.FIT_XY,
                tileMode: TileMode.REPEAT,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: $r('app.media.black_white_tile'),
                srcType: SrcType.MEDIA,
                isSvg: false,
                primaryTitle: 'TileMode',
                secondTitle: 'CLAMP',
                scaleTypeName: 'FIT_XY',
                scaleType: ScaleType.FIT_XY,
                tileMode: TileMode.CLAMP,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: $r('app.media.black_white_tile'),
                srcType: SrcType.MEDIA,
                isSvg: false,
                primaryTitle: 'TileMode',
                secondTitle: 'MIRROR',
                scaleTypeName: 'FIT_XY',
                scaleType: ScaleType.FIT_XY,
                tileMode: TileMode.MIRROR,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            }
        ];
        this.ovalPictureItems = [
            {
                src: 'photo1.jpg',
                srcType: SrcType.RAWFILE,
                isSvg: false,
                primaryTitle: 'Tufa at night',
                secondTitle: 'Mono Lake, CA',
                scaleTypeName: 'CENTER',
                scaleType: ScaleType.CENTER,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 0,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: 'photo2.jpg',
                srcType: SrcType.RAWFILE,
                isSvg: false,
                primaryTitle: 'Starry night',
                secondTitle: 'Lake Powell, AZ',
                scaleTypeName: 'CENTER_CROP',
                scaleType: ScaleType.CENTER_CROP,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 0,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: 'photo3.jpg',
                srcType: SrcType.RAWFILE,
                isSvg: false,
                primaryTitle: 'Racetrack playa',
                secondTitle: 'Death Valley, CA',
                scaleTypeName: 'CENTER_INSIDE',
                scaleType: ScaleType.CENTER_INSIDE,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 0,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: 'photo4.jpg',
                srcType: SrcType.RAWFILE,
                isSvg: false,
                primaryTitle: 'Napali coast',
                secondTitle: 'Kauai, HI',
                scaleTypeName: 'FIT_CENTER',
                scaleType: ScaleType.FIT_CENTER,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 0,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: 'photo5.jpg',
                srcType: SrcType.RAWFILE,
                isSvg: false,
                primaryTitle: 'Delicate Arch',
                secondTitle: 'Arches, UT',
                scaleTypeName: 'FIT_END',
                scaleType: ScaleType.FIT_END,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 0,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: 'photo6.jpg',
                srcType: SrcType.RAWFILE,
                isSvg: false,
                primaryTitle: 'Sierra sunset',
                secondTitle: 'Lone Pine, CA',
                scaleTypeName: 'FIT_START',
                scaleType: ScaleType.FIT_START,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 0,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: 'photo7.jpg',
                srcType: SrcType.RAWFILE,
                isSvg: false,
                primaryTitle: 'Majestic',
                secondTitle: 'Grand Teton, WY',
                scaleTypeName: 'FIT_XY',
                scaleType: ScaleType.FIT_XY,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 0,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: 'black_white_tile.jpg',
                srcType: SrcType.RAWFILE,
                isSvg: false,
                primaryTitle: 'TileMode',
                secondTitle: 'REPEAT',
                scaleTypeName: 'FIT_XY',
                scaleType: ScaleType.FIT_XY,
                tileMode: TileMode.REPEAT,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 0,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: 'black_white_tile.jpg',
                srcType: SrcType.RAWFILE,
                isSvg: false,
                primaryTitle: 'TileMode',
                secondTitle: 'CLAMP',
                scaleTypeName: 'FIT_XY',
                scaleType: ScaleType.FIT_XY,
                tileMode: TileMode.CLAMP,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 0,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: 'black_white_tile.jpg',
                srcType: SrcType.RAWFILE,
                isSvg: false,
                primaryTitle: 'TileMode',
                secondTitle: 'MIRROR',
                scaleTypeName: 'FIT_XY',
                scaleType: ScaleType.FIT_XY,
                tileMode: TileMode.MIRROR,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 0,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            }
        ];
        this.colorItems = [
            {
                src: '',
                srcType: null,
                isSvg: false,
                primaryTitle: 'Color',
                secondTitle: '',
                scaleTypeName: 'CENTER',
                scaleType: ScaleType.CENTER,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '#AAAAAA',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: '',
                srcType: null,
                isSvg: false,
                primaryTitle: 'Color',
                secondTitle: '',
                scaleTypeName: 'CENTER_CROP',
                scaleType: ScaleType.CENTER_CROP,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '#FF8800',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: '',
                srcType: null,
                isSvg: false,
                primaryTitle: 'Color',
                secondTitle: '',
                scaleTypeName: 'CENTER_INSIDE',
                scaleType: ScaleType.CENTER_INSIDE,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '#FAFAFA',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: '',
                srcType: null,
                isSvg: false,
                primaryTitle: 'Color',
                secondTitle: '',
                scaleTypeName: 'FIT_CENTER',
                scaleType: ScaleType.FIT_CENTER,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '#669900',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: '',
                srcType: null,
                isSvg: false,
                primaryTitle: 'Color',
                secondTitle: '',
                scaleTypeName: 'FIT_END',
                scaleType: ScaleType.FIT_END,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '#CC0000',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: '',
                srcType: null,
                isSvg: false,
                primaryTitle: 'Color',
                secondTitle: '',
                scaleTypeName: 'FIT_START',
                scaleType: ScaleType.FIT_START,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '#AA66CC',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: '',
                srcType: null,
                isSvg: false,
                primaryTitle: 'Color',
                secondTitle: '',
                scaleTypeName: 'FIT_XY',
                scaleType: ScaleType.FIT_XY,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '#FFFFFF',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
        ];
        this.backgroundColorItems = [
            {
                src: 'https://hbimg.huabanimg.com/0ef60041445edcfd6b38d20e19024b2cd9281dcc3525a4-Vy8fYO_fw658/format/webp',
                srcType: SrcType.URL,
                isSvg: false,
                primaryTitle: 'Tufa at night',
                secondTitle: 'Mono Lake, CA',
                scaleTypeName: 'CENTER',
                scaleType: ScaleType.CENTER,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '#55AA66',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 30
            },
            {
                src: 'https://hbimg.huabanimg.com/0ef60041445edcfd6b38d20e19024b2cd9281dcc3525a4-Vy8fYO_fw658/format/webp',
                srcType: SrcType.URL,
                isSvg: false,
                primaryTitle: 'Starry night',
                secondTitle: 'Lake Powell, AZ',
                scaleTypeName: 'CENTER_CROP',
                scaleType: ScaleType.CENTER_CROP,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '#55AA66',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 30
            },
            {
                src: this.uriFile,
                srcType: SrcType.URI,
                isSvg: false,
                primaryTitle: 'Racetrack playa',
                secondTitle: 'Death Valley, CA',
                scaleTypeName: 'CENTER_INSIDE',
                scaleType: ScaleType.CENTER_INSIDE,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '#55AA66',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 30
            },
            {
                src: this.uriFile,
                srcType: SrcType.URI,
                isSvg: false,
                primaryTitle: 'Napali coast',
                secondTitle: 'Kauai, HI',
                scaleTypeName: 'FIT_CENTER',
                scaleType: ScaleType.FIT_CENTER,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '#55AA66',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 30
            },
            {
                src: $r('app.media.photo5'),
                srcType: SrcType.MEDIA,
                isSvg: false,
                primaryTitle: 'Delicate Arch',
                secondTitle: 'Arches, UT',
                scaleTypeName: 'FIT_END',
                scaleType: ScaleType.FIT_END,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '#55AA66',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 30
            },
            {
                src: $r('app.media.photo6'),
                srcType: SrcType.MEDIA,
                isSvg: false,
                primaryTitle: 'Sierra sunset',
                secondTitle: 'Lone Pine, CA',
                scaleTypeName: 'FIT_START',
                scaleType: ScaleType.FIT_START,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '#55AA66',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 30
            },
            {
                src: $r('app.media.photo7'),
                srcType: SrcType.MEDIA,
                isSvg: false,
                primaryTitle: 'Majestic',
                secondTitle: 'Grand Teton, WY',
                scaleTypeName: 'FIT_XY',
                scaleType: ScaleType.FIT_XY,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '#55AA66',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 30
            },
            {
                src: $r('app.media.black_white_tile'),
                srcType: SrcType.MEDIA,
                isSvg: false,
                primaryTitle: 'TileMode',
                secondTitle: 'REPEAT',
                scaleTypeName: 'FIT_XY',
                scaleType: ScaleType.FIT_XY,
                tileMode: TileMode.REPEAT,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '#55AA66',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 30
            },
            {
                src: $r('app.media.black_white_tile'),
                srcType: SrcType.MEDIA,
                isSvg: false,
                primaryTitle: 'TileMode',
                secondTitle: 'CLAMP',
                scaleTypeName: 'FIT_XY',
                scaleType: ScaleType.FIT_XY,
                tileMode: TileMode.CLAMP,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '#55AA66',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 30
            },
            {
                src: $r('app.media.black_white_tile'),
                srcType: SrcType.MEDIA,
                isSvg: false,
                primaryTitle: 'TileMode',
                secondTitle: 'MIRROR',
                scaleTypeName: 'FIT_XY',
                scaleType: ScaleType.FIT_XY,
                tileMode: TileMode.MIRROR,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '#55AA66',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 30
            }
        ];
        this.svgItems = [
            {
                src: $r('app.media.ic_svg'),
                srcType: SrcType.MEDIA,
                isSvg: true,
                primaryTitle: 'SVG',
                secondTitle: '',
                scaleTypeName: 'CENTER',
                scaleType: ScaleType.CENTER,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: $r('app.media.ic_svg'),
                srcType: SrcType.MEDIA,
                isSvg: true,
                primaryTitle: 'SVG',
                secondTitle: '',
                scaleTypeName: 'CENTER_CROP',
                scaleType: ScaleType.CENTER_CROP,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: $r('app.media.ic_svg'),
                srcType: SrcType.MEDIA,
                isSvg: true,
                primaryTitle: 'SVG',
                secondTitle: '',
                scaleTypeName: 'CENTER_INSIDE',
                scaleType: ScaleType.CENTER_INSIDE,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: 'ic_svg.svg',
                srcType: SrcType.RAWFILE,
                isSvg: true,
                primaryTitle: 'SVG',
                secondTitle: '',
                scaleTypeName: 'FIT_CENTER',
                scaleType: ScaleType.FIT_CENTER,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: 'ic_svg.svg',
                srcType: SrcType.RAWFILE,
                isSvg: true,
                primaryTitle: 'SVG',
                secondTitle: '',
                scaleTypeName: 'FIT_END',
                scaleType: ScaleType.FIT_END,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: 'ic_svg.svg',
                srcType: SrcType.RAWFILE,
                isSvg: true,
                primaryTitle: 'SVG',
                secondTitle: '',
                scaleTypeName: 'FIT_START',
                scaleType: ScaleType.FIT_START,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
            {
                src: 'ic_svg.svg',
                srcType: SrcType.RAWFILE,
                isSvg: true,
                primaryTitle: 'SVG',
                secondTitle: '',
                scaleTypeName: 'FIT_XY',
                scaleType: ScaleType.FIT_XY,
                tileMode: null,
                uiWidth: this.uiWidth,
                uiHeight: this.uiHeight,
                backgroundColor: '',
                cornerRadius: 25,
                borderWidth: 10,
                borderColor: '#317AF7',
                padding: 0
            },
        ];
        this.__typeValue = new ObservedPropertySimple('Bitmap', this, "typeValue");
        this.updateWithValueParams(params);
        this.declareWatch("typeValue", this.typeValueChanged);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.picIdxArr !== undefined) {
            this.picIdxArr = params.picIdxArr;
        }
        if (params.colorIdxArr !== undefined) {
            this.colorIdxArr = params.colorIdxArr;
        }
        if (params.uiWidth !== undefined) {
            this.uiWidth = params.uiWidth;
        }
        if (params.uiHeight !== undefined) {
            this.uiHeight = params.uiHeight;
        }
        if (params.uriFolder !== undefined) {
            this.uriFolder = params.uriFolder;
        }
        if (params.uriFile !== undefined) {
            this.uriFile = params.uriFile;
        }
        if (params.viewModels !== undefined) {
            this.viewModels = params.viewModels;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
        if (params.rectPictureItems !== undefined) {
            this.rectPictureItems = params.rectPictureItems;
        }
        if (params.ovalPictureItems !== undefined) {
            this.ovalPictureItems = params.ovalPictureItems;
        }
        if (params.colorItems !== undefined) {
            this.colorItems = params.colorItems;
        }
        if (params.backgroundColorItems !== undefined) {
            this.backgroundColorItems = params.backgroundColorItems;
        }
        if (params.svgItems !== undefined) {
            this.svgItems = params.svgItems;
        }
        if (params.typeValue !== undefined) {
            this.typeValue = params.typeValue;
        }
    }
    aboutToBeDeleted() {
        this.__typeValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private picIdxArr: number[];
    private colorIdxArr: number[];
    private uiWidth: number;
    private uiHeight: number;
    private uriFolder: string;
    private uriFile: string;
    private viewModels: RoundedImageName.Model[];
    private scroller: Scroller;
    private dialogController: CustomDialogController;
    private rectPictureItems: PictureItem[];
    private ovalPictureItems: PictureItem[];
    private colorItems: PictureItem[];
    private backgroundColorItems: PictureItem[];
    private svgItems: PictureItem[];
    private __typeValue: ObservedPropertySimple<string>;
    get typeValue() {
        return this.__typeValue.get();
    }
    set typeValue(newValue: string) {
        this.__typeValue.set(newValue);
    }
    aboutToAppear() {
        this.initViewModels();
        this.typeValueChanged();
        this.initUri();
    }
    private initViewModels(): void {
        let viewModelsLength = Math.max(this.picIdxArr.length, this.colorIdxArr.length);
        for (let index = 0; index < viewModelsLength; index++) {
            this.viewModels.push(new RoundedImageName.Model);
        }
    }
    private typeValueChanged(): void {
        if (this.typeValue == 'Bitmap') {
            this.updateViewModels(this.rectPictureItems);
        }
        else if (this.typeValue == 'Ovals') {
            this.updateViewModels(this.ovalPictureItems);
        }
        else if (this.typeValue == 'Color') {
            this.updateViewModels(this.colorItems);
        }
        else if (this.typeValue == 'Background') {
            this.updateViewModels(this.backgroundColorItems);
        }
        else if (this.typeValue == 'SVG') {
            this.updateViewModels(this.svgItems);
        }
        this.scroller.scrollTo({ xOffset: 0, yOffset: 0, animation: { duration: 2000, curve: Curve.Ease } });
    }
    private updateViewModels(pictureItem: PictureItem[]) {
        pictureItem.forEach((val, idx) => {
            this.viewModels[idx]
                .setImageSrc(pictureItem[idx].src)
                .setBackgroundColor(pictureItem[idx].backgroundColor)
                .setSrcType(pictureItem[idx].srcType)
                .setIsSvg(pictureItem[idx].isSvg)
                .setTypeValue(this.typeValue)
                .setUiWidth(pictureItem[idx].uiWidth)
                .setUiHeight(pictureItem[idx].uiHeight)
                .setScaleType(pictureItem[idx].scaleType)
                .setTileModeXY(pictureItem[idx].tileMode)
                .setCornerRadius(pictureItem[idx].cornerRadius)
                .setBorderWidth(pictureItem[idx].borderWidth)
                .setBorderColor(pictureItem[idx].borderColor)
                .setPadding(pictureItem[idx].padding)
                .setColorWidth(this.uiHeight)
                .setColorHeight(this.uiHeight)
                .setContext(getContext(this).createModuleContext('sharedlibrary') as common.UIAbilityContext);
        });
    }
    private initUri() {
        FileUtils.getInstance().createFolder(this.uriFolder);
        (getContext(this).createModuleContext('sharedlibrary') as common.UIAbilityContext).resourceManager.getMedia($r('app.media.photo1').id, (error: Error, value: Uint8Array) => {
            FileUtils.getInstance().writePic(this.uriFile, this.uint8ArrayToBuffer(value));
        });
    }
    uint8ArrayToBuffer(array: Uint8Array): ArrayBuffer {
        return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor(0xDCDCDC);
        Column.padding({ top: 20, bottom: 100 });
        Column.create();
        Column.margin(15);
        Image.create($r('app.media.down'));
        Image.width(30);
        Image.height(30);
        Image.position({ x: -30, y: 5 });
        Image.onClick(() => {
            this.dialogController.open();
        });
        Text.create(' select:' + this.typeValue);
        Text.fontSize(30);
        Text.pop();
        Column.pop();
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.Off);
        List.create({ space: 10, initialIndex: 0 });
        If.create();
        if (this.typeValue == 'Bitmap') {
            If.branchId(0);
            ForEach.create("2", this, ObservedObject.GetRawObject(this.picIdxArr), (item: number) => {
                ListItem.create();
                ListItem.editable(false);
                this.ViewItem(this.viewModels[item], this.rectPictureItems[item], this);
                ListItem.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        else if (this.typeValue == 'Ovals') {
            If.branchId(1);
            ForEach.create("3", this, ObservedObject.GetRawObject(this.picIdxArr), (item: number) => {
                ListItem.create();
                ListItem.editable(false);
                this.ViewItem(this.viewModels[item], this.ovalPictureItems[item], this);
                ListItem.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        else if (this.typeValue == 'Color') {
            If.branchId(2);
            ForEach.create("4", this, ObservedObject.GetRawObject(this.colorIdxArr), (item: number) => {
                ListItem.create();
                ListItem.editable(false);
                this.ViewItem(this.viewModels[item], this.colorItems[item], this);
                ListItem.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        else if (this.typeValue == 'Background') {
            If.branchId(3);
            ForEach.create("5", this, ObservedObject.GetRawObject(this.picIdxArr), (item: number) => {
                ListItem.create();
                ListItem.editable(false);
                this.ViewItem(this.viewModels[item], this.backgroundColorItems[item], this);
                ListItem.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        else if (this.typeValue == 'SVG') {
            If.branchId(4);
            ForEach.create("6", this, ObservedObject.GetRawObject(this.colorIdxArr), (item: number) => {
                ListItem.create();
                ListItem.editable(false);
                this.ViewItem(this.viewModels[item], this.svgItems[item], this);
                ListItem.pop();
            }, (item: string) => item);
            ForEach.pop();
        }
        If.pop();
        List.pop();
        Scroll.pop();
        Column.pop();
        Flex.pop();
    }
    ViewItem(roundedImageViewModel: RoundedImageName.Model, pictureItem: PictureItem, parent = null) {
        Column.create({ space: 5 });
        Column.width('100%');
        Column.create();
        Text.create(pictureItem.primaryTitle);
        Text.size({ height: 35 });
        Text.fontColor(0xFAFAFA);
        Text.backgroundColor(0x7f000000);
        Text.fontSize(18);
        Text.position({ x: 20, y: 40 });
        Text.pop();
        Text.create(pictureItem.secondTitle);
        Text.size({ height: 20 });
        Text.fontColor(0xFAFAFA);
        Text.backgroundColor(0x7f000000);
        Text.fontSize(16);
        Text.position({ x: 20, y: 90 });
        Text.pop();
        Text.create(pictureItem.scaleTypeName);
        Text.size({ height: 20 });
        Text.fontColor(0xFAFAFA);
        Text.backgroundColor(0x7f000000);
        Text.fontSize(14);
        Text.position({ x: 20, y: 120 });
        Text.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
