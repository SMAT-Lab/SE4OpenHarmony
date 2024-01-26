/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

export enum BitmapType {

  /** "BM" - Windows or OS/2 bitmap */
  BITMAP = 0x4D42,

  /** "BA" - OS/2 Bitmap array (multiple bitmaps) */
  OS2_BITMAP_ARRAY = 0x4142,

  /** "IC" - OS/2 Icon */
  OS2_ICON = 0x4349,

  /** "CI" - OS/2 Color icon */
  OS2_COLOR_ICON = 0x4943,

  /** "CP" - OS/2 Color pointer */
  OS2_COLOR_POINTER = 0x5043,

  /** "PT" - OS/2 Pointer */
  OS2_POINTER = 0x5450

}

export namespace BitmapType {

  export function typeOf(value: number) {
    switch (value) {
      case BitmapType.BITMAP:
        return BitmapType.BITMAP
      case BitmapType.OS2_BITMAP_ARRAY:
        return BitmapType.OS2_BITMAP_ARRAY;
      case BitmapType.OS2_ICON:
        return BitmapType.OS2_ICON
      case BitmapType.OS2_COLOR_ICON:
        return BitmapType
      case BitmapType.OS2_COLOR_POINTER:
        return BitmapType.OS2_COLOR_POINTER
      case BitmapType.OS2_POINTER:
        return BitmapType.OS2_POINTER
      default:
      return null
    }

  }

  export function toString(bitmapType: BitmapType) {
    switch (bitmapType) {
      case BitmapType.BITMAP:
        return "Standard";
      case BitmapType.OS2_BITMAP_ARRAY:
        return "Bitmap Array";
      case BitmapType.OS2_COLOR_ICON:
        return "Color Icon";
      case BitmapType.OS2_COLOR_POINTER:
        return "Color Pointer";
      case BitmapType.OS2_ICON:
        return "Monochrome Icon";
      case BitmapType.OS2_POINTER:
        return "Monochrome Pointer";
      default:
        throw new Error("Unimplemented bitmap type ");
    }
  }
}
