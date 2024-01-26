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

import { describe, expect, it } from '@ohos/hypium'
import nativeDrawing from 'libnativeDrawingndk.so'

export default function nativeDrawingNdkTest() {
  describe('NativeDrawingNdkTest', () => {

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_BITMAP_OH_DRAWING_BITMAPCREATE_0100
     * @tc.name       : testOHDrawingBitmapCreate001
     * @tc.desc       : test OH_Drawing_BitmapCreate
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingBitmapCreate001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingBitmapCreate();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_BITMAP_OH_DRAWING_BITMAPBUILD_0100
     * @tc.name       : testOHDrawingBitmapBuild001
     * @tc.desc       : test OH_Drawing_BitmapBuild
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingBitmapBuild001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingBitmapBuild();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_BITMAP_OH_DRAWING_BITMAPGETWIDTH_0100
     * @tc.name       : testOHDrawingBitmapGetWidth001
     * @tc.desc       : test OH_Drawing_BitmapGetWidth
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingBitmapGetWidth001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingBitmapGetWidth();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_BITMAP_OH_DRAWING_BITMAPGETHEIGHT_0100
     * @tc.name       : testOHDrawingBitmapGetHeight001
     * @tc.desc       : test OH_Drawing_BitmapGetHeight
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingBitmapGetHeight001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingBitmapGetHeight();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_BITMAP_OH_DRAWING_BITMAPGETPIXELS_0100
     * @tc.name       : testOHDrawingBitmapGetPixels001
     * @tc.desc       : test OH_Drawing_BitmapGetPixels
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingBitmapGetPixels001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingBitmapGetPixels();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_BRUSH_OH_DRAWING_BRUSHCREATE_0100
     * @tc.name       : testOHDrawingBrushCreate001
     * @tc.desc       : test OH_Drawing_BrushCreate
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingBrushCreate001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingBrushCreate();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_BRUSH_OH_DRAWING_BRUSHISANTIALIAS_0100
     * @tc.name       : testOHDrawingBrushIsAntiAlias001
     * @tc.desc       : test OH_Drawing_BrushIsAntiAlias
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingBrushIsAntiAlias001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingBrushIsAntiAlias();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_BRUSH_OH_DRAWING_BRUSHSETANTIALIAS_0100
     * @tc.name       : testOHDrawingBrushSetAntiAlias001
     * @tc.desc       : test OH_Drawing_BrushSetAntiAlias
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingBrushSetAntiAlias001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingBrushSetAntiAlias();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_BRUSH_OH_DRAWING_BRUSHGETCOLOR_0100
     * @tc.name       : testOHDrawingBrushGetColor001
     * @tc.desc       : test OH_Drawing_BrushGetColor
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingBrushGetColor001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingBrushGetColor();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_BRUSH_OH_DRAWING_BRUSHSETCOLOR_0100
     * @tc.name       : testOHDrawingBrushSetColor001
     * @tc.desc       : test OH_Drawing_BrushSetColor
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingBrushSetColor001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingBrushSetColor();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_CANVAS_OH_DRAWING_CANVASCREATE_0100
     * @tc.name       : testOHDrawingCanvasCreate001
     * @tc.desc       : test OH_Drawing_CanvasCreate
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCanvasCreate001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCanvasCreate();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PATH_OH_DRAWING_PATHCREATE_0100
     * @tc.name       : testOHDrawingPathCreate001
     * @tc.desc       : test OH_Drawing_PathCreate
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPathCreate001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingPathCreate();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PATH_OH_DRAWING_PENCREATE_0100
     * @tc.name       : testOHDrawingPenCreate001
     * @tc.desc       : test OH_Drawing_PenCreate
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPenCreate001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingPenCreate();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PEN_OH_DRAWING_PENISANTIALIAS_0100
     * @tc.name       : testOHDrawingPenIsAntiAlias001
     * @tc.desc       : test OH_Drawing_PenIsAntiAlias
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPenIsAntiAlias001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingPenIsAntiAlias();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PEN_OH_DRAWING_PENSETANTIALIAS_0100
     * @tc.name       : testOHDrawingPenSetAntiAlias001
     * @tc.desc       : test OH_Drawing_PenSetAntiAlias
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPenSetAntiAlias001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingPenSetAntiAlias();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PEN_OH_DRAWING_PENGETCOLOR_0100
     * @tc.name       : testOHDrawingPenGetColor001
     * @tc.desc       : test OH_Drawing_PenGetColor
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPenGetColor001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingPenGetColor();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PEN_OH_DRAWING_PENSETCOLOR_0100
     * @tc.name       : testOHDrawingPenSetColor001
     * @tc.desc       : test OH_Drawing_PenSetColor
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPenSetColor001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingPenSetColor();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PEN_OH_DRAWING_PENGETWIDTH_0100
     * @tc.name       : testOHDrawingPenGetWidth001
     * @tc.desc       : test OH_Drawing_PenGetWidth
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPenGetWidth001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingPenGetWidth();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PEN_OH_DRAWING_PENSETWIDTH_0100
     * @tc.name       : testOHDrawingPenSetWidth001
     * @tc.desc       : test OH_Drawing_PenSetWidth
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPenSetWidth001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingPenSetWidth();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PEN_OH_DRAWING_PENGETMITERLIMIT_0100
     * @tc.name       : testOHDrawingPenGetMiterLimit001
     * @tc.desc       : test OH_Drawing_PenGetMiterLimit
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPenGetMiterLimit001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingPenGetMiterLimit();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PEN_OH_DRAWING_PENSETMITERLIMIT_0100
     * @tc.name       : testOHDrawingPenSetMiterLimit001
     * @tc.desc       : test OH_Drawing_PenSetMiterLimit
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPenSetMiterLimit001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingPenSetMiterLimit();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PEN_OH_DRAWING_PENGETCAP_0100
     * @tc.name       : testOHDrawingPenGetCap001
     * @tc.desc       : test OH_Drawing_PenGetCap
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPenGetCap001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingPenGetCap();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PEN_OH_DRAWING_PENSETCAP_0100
     * @tc.name       : testOHDrawingPenSetCap001
     * @tc.desc       : test OH_Drawing_PenSetCap
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPenSetCap001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingPenSetCap();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PEN_OH_DRAWING_PENGETJOIN_0100
     * @tc.name       : testOHDrawingPenGetJoin001
     * @tc.desc       : test OH_Drawing_PenGetJoin
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPenGetJoin001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingPenGetJoin();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PEN_OH_DRAWING_PENSETJOIN_0100
     * @tc.name       : testOHDrawingPenSetJoin001
     * @tc.desc       : test OH_Drawing_PenSetJoin
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPenSetJoin001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingPenSetJoin();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_COLOR_OH_DRAWING_COLORSETARGB_0100
     * @tc.name       : testOHDrawingColorSetArgb001
     * @tc.desc       : test OH_Drawing_ColorSetArgb
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingColorSetArgb001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingColorSetArgb();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_FONTCOLLECTION_OH_DRAWING_CREATEFONTCOLLECTION_0100
     * @tc.name       : testOHDrawingCreateFontCollection001
     * @tc.desc       : test OH_Drawing_CreateFontCollection
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateFontCollection001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateFontCollection();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_FONTCOLLECTION_OH_DRAWING_CREATETYPOGRAPHYSTYLE_0100
     * @tc.name       : testOHDrawingCreateTypographyStyle001
     * @tc.desc       : test OH_Drawing_CreateTypographyStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTypographyStyle001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTypographyStyle();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETEXTSTYLE_0100
     * @tc.name       : testOHDrawingCreateTextStyle001
     * @tc.desc       : test OH_Drawing_CreateTextStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTextStyle001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTextStyle();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETYPOGRAPHYHANDLER_0100
     * @tc.name       : testOHDrawingCreateTypographyHandler001
     * @tc.desc       : test OH_Drawing_CreateTypographyHandler
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTypographyHandler001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTypographyHandler();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETYPOGRAPHY_0100
     * @tc.name       : testOHDrawingCreateTypography001
     * @tc.desc       : test OH_Drawing_CreateTypography
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTypography001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTypography();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_TYPOGRAPHYLAYOUT_0100
     * @tc.name       : testOHDrawingTypographyLayout001
     * @tc.desc       : test OH_Drawing_TypographyLayout
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingTypographyLayout001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingTypographyLayout();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_TYPOGRAPHYGETMAXWIDTH_0100
     * @tc.name       : testOHDrawingTypographyGetMaxWidth001
     * @tc.desc       : test OH_Drawing_TypographyGetMaxWidth
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingTypographyGetMaxWidth001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingTypographyGetMaxWidth();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_TYPOGRAPHYGETMININTRINSICWIDTH_0100
     * @tc.name       : testOHDrawingTypographyGetMinIntrinsicWidth001
     * @tc.desc       : test OH_Drawing_TypographyGetMinIntrinsicWidth
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingTypographyGetMinIntrinsicWidth001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingTypographyGetMinIntrinsicWidth();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_TYPOGRAPHYGETMAXINTRINSICWIDTH_0100
     * @tc.name       : testOHDrawingTypographyGetMaxIntrinsicWidth001
     * @tc.desc       : test OH_Drawing_TypographyGetMaxIntrinsicWidth
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingTypographyGetMaxIntrinsicWidth001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingTypographyGetMaxIntrinsicWidth();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_TYPOGRAPHYGETLONGESTLINE_0100
     * @tc.name       : testOHDrawingTypographyGetLongestLine001
     * @tc.desc       : test OH_Drawing_TypographyGetLongestLine
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingTypographyGetLongestLine001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingTypographyGetLongestLine();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_TYPOGRAPHYGETLONGESTLINE_0200
     * @tc.name       : testOHDrawingTypographyGetLongestLine002
     * @tc.desc       : test OH_Drawing_TypographyGetLongestLine
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingTypographyGetLongestLine002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingTypographyGetLongestLineAbnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_TYPOGRAPHYGETALPHABETICBASELINE_0100
     * @tc.name       : testOHDrawingTypographyGetAlphabeticBaseline001
     * @tc.desc       : test OH_Drawing_TypographyGetAlphabeticBaseline
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingTypographyGetAlphabeticBaseline001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingTypographyGetAlphabeticBaseline();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_TYPOGRAPHYGETIDEOGRAPHICBASELINE_0200
     * @tc.name       : testOHDrawingTypographyGetIdeographicBaseline002
     * @tc.desc       : test OH_Drawing_TypographyGetIdeographicBaseline
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingTypographyGetIdeographicBaseline002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingTypographyGetIdeographicBaselineNormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_TYPOGRAPHYGETIDEOGRAPHICBASELINE_0100
     * @tc.name       : testOHDrawingTypographyGetIdeographicBaseline001
     * @tc.desc       : test OH_Drawing_TypographyGetIdeographicBaseline
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingTypographyGetIdeographicBaseline001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingTypographyGetIdeographicBaseline();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_TYPOGRAPHYGETALPHABETICBASELINE_0200
     * @tc.name       : testOHDrawingTypographyGetAlphabeticBaseline002
     * @tc.desc       : test OH_Drawing_TypographyGetAlphabeticBaseline
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingTypographyGetAlphabeticBaseline002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingTypographyGetAlphabeticBaselineNormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_TYPOGRAPHYGETHEIGHT_0100
     * @tc.name       : testOHDrawingTypographyGetHeight001
     * @tc.desc       : test OH_Drawing_TypographyGetHeight
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingTypographyGetHeight001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingTypographyGetHeight();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_TYPOGRAPHYGETHEIGHT_0200
     * @tc.name       : testOHDrawingTypographyGetHeight002
     * @tc.desc       : test OH_Drawing_TypographyGetHeight
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingTypographyGetHeight002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingTypographyGetHeightAbnormal();
      expect(result).assertEqual(-1);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PEN_OH_DRAWING_PENGETCAP_0200
     * @tc.name       : testOHDrawingPenGetCap002
     * @tc.desc       : test OH_Drawing_PenGetCap
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPenGetCap002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingPenGetCapNormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PEN_OH_DRAWING_PENSETCAP_0200
     * @tc.name       : testOHDrawingPenSetCap002
     * @tc.desc       : test OH_Drawing_PenSetCap
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPenSetCap002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingPenSetCapNormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PEN_OH_DRAWING_PENGETJOIN_0200
     * @tc.name       : testOHDrawingPenGetJoin002
     * @tc.desc       : test OH_Drawing_PenGetJoin
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPenGetJoin002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingPenGetJoinNormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PEN_OH_DRAWING_PENSETJOIN_0200
     * @tc.name       : testOHDrawingPenSetJoin002
     * @tc.desc       : test OH_Drawing_PenSetJoin
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPenSetJoin002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingPenSetJoinNormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PEN_OH_DRAWING_PENISANTIALIAS_0200
     * @tc.name       : testOHDrawingPenIsAntiAlias002
     * @tc.desc       : test OH_Drawing_PenIsAntiAlias
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPenIsAntiAlias002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingPenIsAntiAliasNormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PEN_OH_DRAWING_PENSETANTIALIAS_0200
     * @tc.name       : testOHDrawingPenSetAntiAlias002
     * @tc.desc       : test OH_Drawing_PenSetAntiAlias
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPenSetAntiAlias002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingPenSetAntiAliasNormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_BITMAP_OH_DRAWING_BITMAPBUILD_0200
     * @tc.name       : testOHDrawingBitmapBuild002
     * @tc.desc       : test OH_Drawing_BitmapBuild
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingBitmapBuild002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingBitmapBuildNormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_BITMAP_OH_DRAWING_BITMAPGETWIDTH_0200
     * @tc.name       : testOHDrawingBitmapGetWidth002
     * @tc.desc       : test OH_Drawing_BitmapGetWidth
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingBitmapGetWidth002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingBitmapGetWidthNormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_BITMAP_OH_DRAWING_BITMAPGETHEIGHT_0200
     * @tc.name       : testOHDrawingBitmapGetHeight002
     * @tc.desc       : test OH_Drawing_BitmapGetHeight
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingBitmapGetHeight002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingBitmapGetHeightNormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_BITMAP_OH_DRAWING_BITMAPGETPIXELS_0200
     * @tc.name       : testOHDrawingBitmapGetPixels002
     * @tc.desc       : test OH_Drawing_BitmapGetPixels
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingBitmapGetPixels002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingBitmapGetPixelsNormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_BRUSH_OH_DRAWING_BRUSHANTIALIAS_0200
     * @tc.name       : testOHDrawingBrushIsAntiAlias002
     * @tc.desc       : test OH_Drawing_BrushIsAntiAlias
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingBrushIsAntiAlias002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingBrushIsAntiAliasNormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_BRUSH_OH_DRAWING_BRUSHSETANTIALIAS_0200
     * @tc.name       : testOHDrawingBrushSetAntiAlias002
     * @tc.desc       : test OH_Drawing_BrushSetAntiAlias
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingBrushSetAntiAlias002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingBrushSetAntiAliasNormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_BRUSH_OH_DRAWING_BRUSHGETCOLOR_0200
     * @tc.name       : testOHDrawingBrushGetColor002
     * @tc.desc       : test OH_Drawing_BrushGetColor
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingBrushGetColor002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingBrushGetColorNormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_BRUSH_OH_DRAWING_BRUSHSETCOLOR_0200
     * @tc.name       : testOHDrawingBrushSetColor002
     * @tc.desc       : test OH_Drawing_BrushSetColor
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingBrushSetColor002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingBrushSetColorNormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PEN_OH_DRAWING_PENGETCOLOR_0200
     * @tc.name       : testOHDrawingPenGetColor002
     * @tc.desc       : test OH_Drawing_PenGetColor
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPenGetColor002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingPenGetColorNormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PEN_OH_DRAWING_PENSETCOLOR_0200
     * @tc.name       : testOHDrawingPenSetColor002
     * @tc.desc       : test OH_Drawing_PenSetColor
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPenSetColor002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingPenSetColorNormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PEN_OH_DRAWING_PENGETWIDTH_0200
     * @tc.name       : testOHDrawingPenGetWidth002
     * @tc.desc       : test OH_Drawing_PenGetWidth
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPenGetWidth002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingPenGetWidthNormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PEN_OH_DRAWING_PENSETWIDTH_0200
     * @tc.name       : testOHDrawingPenSetWidth002
     * @tc.desc       : test OH_Drawing_PenSetWidth
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPenSetWidth002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingPenSetWidthNormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PEN_OH_DRAWING_PENGETMITERLIMIT_0200
     * @tc.name       : testOHDrawingPenGetMiterLimit002
     * @tc.desc       : test OH_Drawing_PenGetMiterLimit
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPenGetMiterLimit002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingPenGetMiterLimitNormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PEN_OH_DRAWING_PENSETMITERLIMIT_0200
     * @tc.name       : testOHDrawingPenSetMiterLimit002
     * @tc.desc       : test OH_Drawing_PenSetMiterLimit
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPenSetMiterLimit002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingPenSetMiterLimitNormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_COLOR_OH_DRAWING_COLORSETARGB_0200
     * @tc.name       : testOHDrawingColorSetArgb002
     * @tc.desc       : test OH_Drawing_ColorSetArgb
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingColorSetArgb002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingColorSetArgbNormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_TYPOGRAPHYLAYOUT_0200
     * @tc.name       : testOHDrawingTypographyLayout002
     * @tc.desc       : test OH_Drawing_TypographyLayout
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingTypographyLayout002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingTypographyLayoutNormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_TYPOGRAPHYGETMAXWIDTH_0200
     * @tc.name       : testOHDrawingTypographyGetMaxWidth002
     * @tc.desc       : test OH_Drawing_TypographyGetMaxWidth
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingTypographyGetMaxWidth002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingTypographyGetMaxWidthNormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_TYPOGRAPHYGETMININTRINSICWIDTH_0200
     * @tc.name       : testOHDrawingTypographyGetMinIntrinsicWidth002
     * @tc.desc       : test OH_Drawing_TypographyGetMinIntrinsicWidth
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingTypographyGetMinIntrinsicWidth002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingTypographyGetMinIntrinsicWidthNormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_TYPOGRAPHYGETMAXINTRINSICWIDTH_0200
     * @tc.name       : testOHDrawingTypographyGetMaxIntrinsicWidth002
     * @tc.desc       : test OH_Drawing_TypographyGetMaxIntrinsicWidth
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingTypographyGetMaxIntrinsicWidth002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingTypographyGetMaxIntrinsicWidthNormal();
      expect(result).assertEqual(0);
      done();
    });



    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETYPOGRAPHYSTYLE_0200
     * @tc.name       : testOHDrawingCreateTypographyStyle002
     * @tc.desc       : test OH_Drawing_CreateTypographyStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTypographyStyle002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTypographyStyleAnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETYPOGRAPHYSTYLE_0300
     * @tc.name       : testOHDrawingCreateTypographyStyle003
     * @tc.desc       : test OH_Drawing_CreateTypographyStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTypographyStyle003', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTypographyStyleBnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETYPOGRAPHYSTYLE_0400
     * @tc.name       : testOHDrawingCreateTypographyStyle004
     * @tc.desc       : test OH_Drawing_CreateTypographyStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTypographyStyle004', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTypographyStyleCnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETYPOGRAPHYSTYLE_0500
     * @tc.name       : testOHDrawingCreateTypographyStyle005
     * @tc.desc       : test OH_Drawing_CreateTypographyStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTypographyStyle005', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTypographyStyleDnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETYPOGRAPHYSTYLE_0600
     * @tc.name       : testOHDrawingCreateTypographyStyle006
     * @tc.desc       : test OH_Drawing_CreateTypographyStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTypographyStyle006', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTypographyStyleEnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETYPOGRAPHYSTYLE_0700
     * @tc.name       : testOHDrawingCreateTypographyStyle007
     * @tc.desc       : test OH_Drawing_CreateTypographyStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTypographyStyle007', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTypographyStyleFnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETEXTSTYLE_0200
     * @tc.name       : testOHDrawingCreateTextStyle002
     * @tc.desc       : test OH_Drawing_CreateTextStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTextStyle002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTextStyleAnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETEXTSTYLE_0300
     * @tc.name       : testOHDrawingCreateTextStyle003
     * @tc.desc       : test OH_Drawing_CreateTextStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTextStyle003', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTextStyleBnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETEXTSTYLE_0400
     * @tc.name       : testOHDrawingCreateTextStyle004
     * @tc.desc       : test OH_Drawing_CreateTextStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTextStyle004', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTextStyleCnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETEXTSTYLE_0500
     * @tc.name       : testOHDrawingCreateTextStyle005
     * @tc.desc       : test OH_Drawing_CreateTextStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTextStyle005', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTextStyleDnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETEXTSTYLE_0600
     * @tc.name       : testOHDrawingCreateTextStyle006
     * @tc.desc       : test OH_Drawing_CreateTextStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTextStyle006', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTextStyleEnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETEXTSTYLE_0700
     * @tc.name       : testOHDrawingCreateTextStyle007
     * @tc.desc       : test OH_Drawing_CreateTextStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTextStyle007', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTextStyleFnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETEXTSTYLE_0800
     * @tc.name       : testOHDrawingCreateTextStyle008
     * @tc.desc       : test OH_Drawing_CreateTextStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTextStyle008', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTextStyleGnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETEXTSTYLE_0900
     * @tc.name       : testOHDrawingCreateTextStyle009
     * @tc.desc       : test OH_Drawing_CreateTextStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTextStyle009', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTextStyleHnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETEXTSTYLE_1000
     * @tc.name       : testOHDrawingCreateTextStyle010
     * @tc.desc       : test OH_Drawing_CreateTextStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTextStyle010', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTextStyleInormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETEXTSTYLE_1100
     * @tc.name       : testOHDrawingCreateTextStyle011
     * @tc.desc       : test OH_Drawing_CreateTextStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTextStyle011', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTextStyleJnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETEXTSTYLE_1200
     * @tc.name       : testOHDrawingCreateTextStyle012
     * @tc.desc       : test OH_Drawing_CreateTextStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTextStyle012', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTextStyleKnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETEXTSTYLE_1300
     * @tc.name       : testOHDrawingCreateTextStyle013
     * @tc.desc       : test OH_Drawing_CreateTextStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTextStyle013', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTextStyleLnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETEXTSTYLE_1400
     * @tc.name       : testOHDrawingCreateTextStyle014
     * @tc.desc       : test OH_Drawing_CreateTextStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTextStyle014', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTextStyleMnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETEXTSTYLE_1500
     * @tc.name       : testOHDrawingCreateTextStyle015
     * @tc.desc       : test OH_Drawing_CreateTextStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTextStyle015', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTextStyleNnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETEXTSTYLE_1600
     * @tc.name       : testOHDrawingCreateTextStyle016
     * @tc.desc       : test OH_Drawing_CreateTextStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTextStyle016', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTextStyleOnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETEXTSTYLE_1700
     * @tc.name       : testOHDrawingCreateTextStyle017
     * @tc.desc       : test OH_Drawing_CreateTextStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTextStyle017', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTextStylePnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETEXTSTYLE_1800
     * @tc.name       : testOHDrawingCreateTextStyle018
     * @tc.desc       : test OH_Drawing_CreateTextStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTextStyle018', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTextStyleQnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETEXTSTYLE_1900
     * @tc.name       : testOHDrawingCreateTextStyle019
     * @tc.desc       : test OH_Drawing_CreateTextStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTextStyle019', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTextStyleRnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETEXTSTYLE_2000
     * @tc.name       : testOHDrawingCreateTextStyle020
     * @tc.desc       : test OH_Drawing_CreateTextStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTextStyle020', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTextStyleSnormal();
      expect(result).assertEqual(0);
      done();
    });
    
    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETEXTSTYLE_2100
     * @tc.name       : testOHDrawingCreateTextStyle021
     * @tc.desc       : test OH_Drawing_CreateTextStyle
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTextStyle021', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTextStyleTnormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_TYPOGRAPHYHANDLERADDTEXT_0100
     * @tc.name       : testOHDrawingTypographyHandlerAddText001
     * @tc.desc       : test OHDrawingTypographyGetIdeographicBaseline
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */

    it('testOHDrawingTypographyHandlerAddText001', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingTypographyHandlerAddText();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_TYPOGRAPHYHANDLERADDTEXT_0200
     * @tc.name       : testOHDrawingTypographyHandlerAddText002
     * @tc.desc       : test OHDrawingTypographyHandlerAddTextF
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */

    it('testOHDrawingTypographyHandlerAddText002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingTypographyHandlerAddTextAanormal();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_CANVAS_OH_DRAWING_CANVASCREATE_0200
     * @tc.name       : testOHDrawingCanvasCreate002
     * @tc.desc       : test OH_Drawing_CanvasCreate
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCanvasCreate002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCanvasCreateBitmap();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_CANVAS_OH_DRAWING_CANVASCREATE_0300
     * @tc.name       : testOHDrawingCanvasCreate003
     * @tc.desc       : test OH_Drawing_CanvasCreate
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCanvasCreate003', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCanvasCreatePen();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_CANVAS_OH_DRAWING_CANVASCREATE_0400
     * @tc.name       : testOHDrawingCanvasCreate004
     * @tc.desc       : test OH_Drawing_CanvasCreate
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCanvasCreate004', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCanvasCreateBrush();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : 5SUB_GRAPHIC_GRAPHIC_2D_DRAWING_CANVAS_OH_DRAWING_CANVASCREATE_0500
     * @tc.name       : testOHDrawingCanvasCreate005
     * @tc.desc       : test OH_Drawing_CanvasCreate
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCanvasCreate005', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCanvasCreateSave();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : 6SUB_GRAPHIC_GRAPHIC_2D_DRAWING_CANVAS_OH_DRAWING_CANVASCREATE_0600
     * @tc.name       : testOHDrawingCanvasCreate006
     * @tc.desc       : test OH_Drawing_CanvasCreate
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCanvasCreate006', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCanvasCreateDrawLine();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_CANVAS_OH_DRAWING_CANVASCREATE_0700
     * @tc.name       : testOHDrawingCanvasCreate007
     * @tc.desc       : test OH_Drawing_CanvasCreate
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCanvasCreate007', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCanvasCreateDrawPath();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_CANVAS_OH_DRAWING_CANVASCREATE_0800
     * @tc.name       : testOHDrawingCanvasCreate008
     * @tc.desc       : test OH_Drawing_CanvasCreate
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCanvasCreate008', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCanvasCreateClear();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_CANVAS_OH_DRAWING_CANVASCREATE_0900
     * @tc.name       : testOHDrawingCanvasCreate009
     * @tc.desc       : test OH_Drawing_CanvasCreate
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCanvasCreate009', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCanvasCreateDetachPen();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_CANVAS_OH_DRAWING_CANVASCREATE_1000
     * @tc.name       : testOHDrawingCanvasCreate010
     * @tc.desc       : test OH_Drawing_CanvasCreate
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCanvasCreate010', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCanvasCreateDetachBrush();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PATH_OH_DRAWING_PATHCREATE_0200
     * @tc.name       : testOHDrawingPathCreate002
     * @tc.desc       : test OH_Drawing_PathCreate
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPathCreate002', 0, async (done: Function) => {
      let result: number = nativeDrawing.ohDrawingPathCreateMoveTo();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PATH_OH_DRAWING_PATHCREATE_0300
     * @tc.name       : testOHDrawingPathCreate003
     * @tc.desc       : test OH_Drawing_PathCreate
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPathCreate003', 0, async (done: Function) => {
      let result: number = nativeDrawing.ohDrawingPathCreateLineTo();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PATH_OH_DRAWING_PATHCREATE_0400
     * @tc.name       : testOHDrawingPathCreate004
     * @tc.desc       : test OH_Drawing_PathCreate
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPathCreate004', 0, async (done: Function) => {
      let result: number = nativeDrawing.ohDrawingPathCreateArcTo();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PATH_OH_DRAWING_PATHCREATE_0500
     * @tc.name       : testOHDrawingPathCreate005
     * @tc.desc       : test OH_Drawing_PathCreate
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPathCreate005', 0, async (done: Function) => {
      let result: number = nativeDrawing.ohDrawingPathCreateQuadTo();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PATH_OH_DRAWING_PATHCREATE_0600
     * @tc.name       : testOHDrawingPathCreate006
     * @tc.desc       : test OH_Drawing_PathCreate
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPathCreate006', 0, async (done: Function) => {
      let result: number = nativeDrawing.ohDrawingPathCreateCubicTo();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PATH_OH_DRAWING_PATHCREATE_0700
     * @tc.name       : testOHDrawingPathCreate007
     * @tc.desc       : test OH_Drawing_PathCreate
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPathCreate007', 0, async (done: Function) => {
      let result: number = nativeDrawing.ohDrawingPathCreateClose();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_PATH_OH_DRAWING_PATHCREATE_0800
     * @tc.name       : testOHDrawingPathCreate008
     * @tc.desc       : test OH_Drawing_PathCreate
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingPathCreate008', 0, async (done: Function) => {
      let result: number = nativeDrawing.ohDrawingPathCreateReset();
      expect(result).assertEqual(0);
      done();
    });

    /**
     * @tc.number     : SUB_GRAPHIC_GRAPHIC_2D_DRAWING_TEXTTYPOGRAPHY_OH_DRAWING_CREATETYPOGRAPHY_0200
     * @tc.name       : testOHDrawingCreateTypography002
     * @tc.desc       : test OH_Drawing_CreateTypography
     * @tc.size       : MediumTest
     * @tc.type       : Function
     * @tc.level      : Level 1
     */
    it('testOHDrawingCreateTypography002', 0, async (done: Function) => {
      let result: number = nativeDrawing.oHDrawingCreateTypographyPaint();
      expect(result).assertEqual(0);
      done();
    });
    
  })
}