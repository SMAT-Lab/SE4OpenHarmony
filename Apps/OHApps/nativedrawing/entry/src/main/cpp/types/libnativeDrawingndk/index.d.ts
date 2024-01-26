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
export const oHDrawingBitmapCreate: () => number;
export const oHDrawingBitmapDestroy: () => number;
export const oHDrawingBitmapBuild: () => number;
export const oHDrawingBitmapGetWidth: () => number;
export const oHDrawingBitmapGetHeight: () => number;
export const oHDrawingBitmapGetPixels: () => number;

export const oHDrawingBrushCreate: () => number;
export const oHDrawingBrushDestroy: () => number;
export const oHDrawingBrushIsAntiAlias: () => number;
export const oHDrawingBrushSetAntiAlias: () => number;
export const oHDrawingBrushGetColor: () => number;
export const oHDrawingBrushSetColor: () => number;

export const oHDrawingCanvasCreate: () => number;
export const oHDrawingPathCreate: () => number;


export const oHDrawingPenCreate: () => number;
export const oHDrawingPenIsAntiAlias: () => number;
export const oHDrawingPenSetAntiAlias: () => number;
export const oHDrawingPenGetColor: () => number;
export const oHDrawingPenSetColor: () => number;
export const oHDrawingPenGetWidth: () => number;
export const oHDrawingPenSetWidth: () => number;
export const oHDrawingPenGetMiterLimit: () => number;
export const oHDrawingPenSetMiterLimit: () => number;
export const oHDrawingPenGetCap: () => number;
export const oHDrawingPenSetCap: () => number;
export const oHDrawingPenGetJoin: () => number;
export const oHDrawingPenSetJoin: () => number;

export const oHDrawingColorSetArgb: () => number;

export const oHDrawingCreateFontCollection: () => number;
export const oHDrawingDestroyFontCollection: () => number;
export const oHDrawingCreateTypographyStyle: () => number;
export const oHDrawingDestroyTypographyStyle: () => number;
export const oHDrawingCreateTextStyle: () => number;

export const oHDrawingCreateTypographyHandler: () => number;
export const oHDrawingCreateTypography: () => number;
export const oHDrawingTypographyLayout: () => number;
export const oHDrawingTypographyGetMaxWidth: () => number;

export const oHDrawingTypographyGetMinIntrinsicWidth: () => number;
export const oHDrawingTypographyGetMaxIntrinsicWidth: () => number;

export const oHDrawingTypographyGetLongestLine: () => number;
export const oHDrawingTypographyGetLongestLineAbnormal: () => number;

export const oHDrawingTypographyGetAlphabeticBaseline: () => number;
export const oHDrawingTypographyGetAlphabeticBaselineNormal: () => number;

export const oHDrawingTypographyGetIdeographicBaseline: () => number;
export const oHDrawingTypographyGetIdeographicBaselineNormal: () => number;

export const oHDrawingTypographyGetHeight: () => number;
export const oHDrawingTypographyGetHeightAbnormal: () => number;

export const oHDrawingPenGetCapNormal: () => number;
export const oHDrawingPenSetCapNormal: () => number;
export const oHDrawingPenGetJoinNormal: () => number;
export const oHDrawingPenSetJoinNormal: () => number;

export const oHDrawingPenIsAntiAliasNormal: () => number;
export const oHDrawingPenSetAntiAliasNormal: () => number;

export const oHDrawingBitmapBuildNormal: () => number;

export const oHDrawingBitmapGetWidthNormal: () => number;
export const oHDrawingBitmapGetHeightNormal: () => number;
export const oHDrawingBitmapGetPixelsNormal: () => number;

export const oHDrawingBrushIsAntiAliasNormal: () => number;
export const oHDrawingBrushSetAntiAliasNormal: () => number;
export const oHDrawingBrushGetColorNormal: () => number;
export const oHDrawingBrushSetColorNormal: () => number;
export const oHDrawingPenGetColorNormal: () => number;
export const oHDrawingPenSetColorNormal: () => number;
export const oHDrawingPenGetWidthNormal: () => number;
export const oHDrawingPenSetWidthNormal: () => number;
export const oHDrawingPenGetMiterLimitNormal: () => number;
export const oHDrawingPenSetMiterLimitNormal: () => number;
export const oHDrawingColorSetArgbNormal: () => number;
export const oHDrawingTypographyLayoutNormal: () => number;
export const oHDrawingTypographyGetMaxWidthNormal: () => number;
export const oHDrawingTypographyGetMinIntrinsicWidthNormal: () => number;
export const oHDrawingTypographyGetMaxIntrinsicWidthNormal: () => number;

export const oHDrawingCreateTypographyStyleAnormal: () => number;
export const oHDrawingCreateTypographyStyleBnormal: () => number;
export const oHDrawingCreateTypographyStyleCnormal: () => number;
export const oHDrawingCreateTypographyStyleDnormal: () => number;
export const oHDrawingCreateTypographyStyleEnormal: () => number;
export const oHDrawingCreateTypographyStyleFnormal: () => number;

export const oHDrawingCreateTextStyleAnormal: () => number;
export const oHDrawingCreateTextStyleBnormal: () => number;
export const oHDrawingCreateTextStyleCnormal: () => number;
export const oHDrawingCreateTextStyleDnormal: () => number;
export const oHDrawingCreateTextStyleEnormal: () => number;
export const oHDrawingCreateTextStyleFnormal: () => number;
export const oHDrawingCreateTextStyleGnormal: () => number;
export const oHDrawingCreateTextStyleHnormal: () => number;
export const oHDrawingCreateTextStyleInormal: () => number;
export const oHDrawingCreateTextStyleJnormal: () => number;
export const oHDrawingCreateTextStyleKnormal: () => number;
export const oHDrawingCreateTextStyleLnormal: () => number;
export const oHDrawingCreateTextStyleMnormal: () => number;
export const oHDrawingCreateTextStyleNnormal: () => number;
export const oHDrawingCreateTextStyleOnormal: () => number;
export const oHDrawingCreateTextStylePnormal: () => number;
export const oHDrawingCreateTextStyleQnormal: () => number;
export const oHDrawingCreateTextStyleRnormal: () => number;
export const oHDrawingCreateTextStyleSnormal: () => number;
export const oHDrawingCreateTextStyleTnormal: () => number;

export const oHDrawingTypographyHandlerAddText: () => number;
export const oHDrawingTypographyHandlerAddTextAanormal: () => number
export const oHDrawingCanvasCreateBitmap: () => number;
export const oHDrawingCanvasCreatePen: () => number;
export const oHDrawingCanvasCreateBrush: () => number;
export const oHDrawingCanvasCreateSave: () => number;
export const oHDrawingCanvasCreateDrawLine: () => number;
export const oHDrawingCanvasCreateDrawPath: () => number;
export const oHDrawingCanvasCreateClear: () => number;
export const oHDrawingCanvasCreateDetachPen: () => number;
export const oHDrawingCanvasCreateDetachBrush: () => number;
export const ohDrawingPathCreateMoveTo: () => number;
export const ohDrawingPathCreateLineTo: () => number;
export const ohDrawingPathCreateArcTo: () => number;
export const ohDrawingPathCreateQuadTo: () => number;
export const ohDrawingPathCreateCubicTo: () => number;
export const ohDrawingPathCreateClose: () => number;
export const ohDrawingPathCreateReset: () => number;
export const oHDrawingCreateTypographyPaint: () => number;