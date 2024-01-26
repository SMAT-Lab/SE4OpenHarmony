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
#include "napi/native_api.h"
#include <js_native_api.h>
#include <native_drawing/drawing_bitmap.h>
#include <native_drawing/drawing_brush.h>
#include <native_drawing/drawing_canvas.h>
#include <native_drawing/drawing_color.h>
#include <native_drawing/drawing_font_collection.h>
#include <native_drawing/drawing_path.h>
#include <native_drawing/drawing_pen.h>
#include <native_drawing/drawing_text_typography.h>
#include <cstring>

#define SUCCESS 0
#define FAIL (-1)
#define ONEVAL 1
#define ZEROOVAL 0.0
#define FIVTENVAL 50
#define THRTENVAL 30
#define WIDTH 500
#define HEIGHT 500
#define ZEROVAL 0
#define TENVAL 10.0
#define MINUSTENVAL (-10.5)
#define MINUSFIVEVAL (-5.5)
#define FIVEVAL 5.0
#define EIGHUNVAL 800.0
#define MINUSEIGHUNVAL (-800.0)
#define SENHUNVAL 700.0
#define SENFIVEVAL 750.0
#define MINUSSENFIVEVAL (-750.0)
#define SIXFIVEVAL 650.0
#define POSX_1 1.0f
#define POSY_1 1.0f
#define POSX_2 10.0f
#define POSY_2 10.0f
#define POSX_3 20.0f
#define POSY_3 20.0f

#define ONEHUNVAL 100
#define EIGTENVAL 80

static napi_value OHDrawingBitmapCreate(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Bitmap *bitmap = OH_Drawing_BitmapCreate();
    if (bitmap == nullptr) {
        napi_create_int32(env, FAIL, &result);
    } else {
        napi_create_int32(env, SUCCESS, &result);
    }
    OH_Drawing_BitmapDestroy(bitmap);
    return result;
}

static napi_value OHDrawingBitmapBuild(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Bitmap *bitmap = OH_Drawing_BitmapCreate();
    const unsigned int width = WIDTH;
    const unsigned int height = HEIGHT;
    OH_Drawing_BitmapFormat bitmapFormat{COLOR_FORMAT_ARGB_4444, ALPHA_FORMAT_UNPREMUL};
    OH_Drawing_BitmapBuild(bitmap, width, height, &bitmapFormat);
    if (width == OH_Drawing_BitmapGetWidth(bitmap)) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_BitmapDestroy(bitmap);
    return result;
}

static napi_value OHDrawingBitmapGetWidth(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Bitmap *bitmap = OH_Drawing_BitmapCreate();
    const unsigned int width = WIDTH;
    const unsigned int height = HEIGHT;
    OH_Drawing_BitmapFormat bitmapFormat{COLOR_FORMAT_ARGB_4444, ALPHA_FORMAT_UNPREMUL};
    OH_Drawing_BitmapBuild(bitmap, width, height, &bitmapFormat);
    if (OH_Drawing_BitmapGetWidth(bitmap) == width) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_BitmapDestroy(bitmap);
    return result;
}

static napi_value OHDrawingBitmapGetHeight(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Bitmap *bitmap = OH_Drawing_BitmapCreate();
    const unsigned int width = WIDTH;
    const unsigned int height = HEIGHT;
    OH_Drawing_BitmapFormat bitmapFormat{COLOR_FORMAT_ARGB_4444, ALPHA_FORMAT_UNPREMUL};
    OH_Drawing_BitmapBuild(bitmap, width, height, &bitmapFormat);
    if (OH_Drawing_BitmapGetHeight(bitmap) == height) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_BitmapCreate();
    return result;
}

static napi_value OHDrawingBitmapGetPixels(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Bitmap *bitmap = OH_Drawing_BitmapCreate();
    const unsigned int width = WIDTH;
    const unsigned int height = HEIGHT;
    OH_Drawing_BitmapFormat bitmapFormat{COLOR_FORMAT_ARGB_4444, ALPHA_FORMAT_UNPREMUL};
    OH_Drawing_BitmapBuild(bitmap, width, height, &bitmapFormat);
    if (OH_Drawing_BitmapGetPixels(bitmap) == nullptr) {
        napi_create_int32(env, FAIL, &result);
    } else {
        napi_create_int32(env, SUCCESS, &result);
    }
    OH_Drawing_BitmapCreate();
    return result;
}

static napi_value OHDrawingBrushCreate(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Brush *brush = OH_Drawing_BrushCreate();
    if (brush == nullptr) {
        napi_create_int32(env, FAIL, &result);
    } else {
        napi_create_int32(env, SUCCESS, &result);
    }
    OH_Drawing_BrushDestroy(brush);
    return result;
}

static napi_value OHDrawingBrushIsAntiAlias(napi_env env, napi_callback_info info)
{
    OH_Drawing_Brush *brush = OH_Drawing_BrushCreate();
    OH_Drawing_BrushSetAntiAlias(brush, false);
    napi_value result = nullptr;
    if (OH_Drawing_BrushIsAntiAlias(brush) == false) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_BrushDestroy(brush);
    return result;
}

static napi_value OHDrawingBrushSetAntiAlias(napi_env env, napi_callback_info info)
{
    OH_Drawing_Brush *brush = OH_Drawing_BrushCreate();
    OH_Drawing_BrushSetAntiAlias(brush, true);
    napi_value result = nullptr;
    if (OH_Drawing_BrushIsAntiAlias(brush) == true) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_BrushDestroy(brush);
    return result;
}

static napi_value OHDrawingBrushGetColor(napi_env env, napi_callback_info info)
{
    OH_Drawing_Brush *brush = OH_Drawing_BrushCreate();
    OH_Drawing_BrushSetColor(brush, OH_Drawing_ColorSetArgb(0xFF, 0xFF, 0x00, 0x00));
    napi_value result = nullptr;
    if (OH_Drawing_BrushGetColor(brush) != 0xFFFF0000) {
        napi_create_int32(env, FAIL, &result);
    } else {
        napi_create_int32(env, SUCCESS, &result);
    }
    OH_Drawing_BrushDestroy(brush);
    return result;
}

static napi_value OHDrawingBrushSetColor(napi_env env, napi_callback_info info)
{
    OH_Drawing_Brush *brush = OH_Drawing_BrushCreate();
    OH_Drawing_BrushSetColor(brush, OH_Drawing_ColorSetArgb(0xFF, 0xFF, 0x00, 0x00));
    napi_value result = nullptr;
    if (OH_Drawing_BrushGetColor(brush) == 0xFFFF0000) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_BrushDestroy(brush);
    return result;
}

static napi_value OHDrawingCanvasCreate(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Canvas *canvas = OH_Drawing_CanvasCreate();
    if (canvas == nullptr) {
        napi_create_int32(env, FAIL, &result);
    } else {
        napi_create_int32(env, SUCCESS, &result);
    }
    OH_Drawing_CanvasDestroy(canvas);
    return result;
}

static napi_value OHDrawingPathCreate(napi_env env, napi_callback_info info)
{
    OH_Drawing_Path *path = OH_Drawing_PathCreate();
    napi_value result = nullptr;
    if (path == nullptr) {
        napi_create_int32(env, FAIL, &result);
    } else {
        napi_create_int32(env, SUCCESS, &result);
    }
    OH_Drawing_PathDestroy(path);
    return result;
}

static napi_value OHDrawingPenCreate(napi_env env, napi_callback_info info)
{
    OH_Drawing_Pen *pen = OH_Drawing_PenCreate();
    napi_value result = nullptr;
    if (pen == nullptr) {
        napi_create_int32(env, FAIL, &result);
    } else {
        napi_create_int32(env, SUCCESS, &result);
    }
    OH_Drawing_PenDestroy(pen);
    return result;
}

static napi_value OHDrawingPenIsAntiAlias(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Pen *pen = OH_Drawing_PenCreate();
    OH_Drawing_PenSetAntiAlias(pen, false);
    if (OH_Drawing_PenIsAntiAlias(pen)) {
        napi_create_int32(env, FAIL, &result);
    } else {
        napi_create_int32(env, SUCCESS, &result);
    }
    OH_Drawing_PenDestroy(pen);
    return result;
}

static napi_value OHDrawingPenSetAntiAlias(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Pen *pen = OH_Drawing_PenCreate();
    OH_Drawing_PenSetAntiAlias(pen, true);
    if (OH_Drawing_PenIsAntiAlias(pen)) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_PenDestroy(pen);
    return result;
}

static napi_value OHDrawingPenGetColor(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Pen *penn = OH_Drawing_PenCreate();
    OH_Drawing_PenSetColor(penn, OH_Drawing_ColorSetArgb(0xFF, 0xFF, 0x00, 0x00));
    if (OH_Drawing_PenGetColor(penn) == 0xFFFF0000) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_PenDestroy(penn);
    return result;
}

static napi_value OHDrawingPenSetColor(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Pen *pen = OH_Drawing_PenCreate();
    OH_Drawing_PenSetColor(pen, OH_Drawing_ColorSetArgb(0xFF, 0xFF, 0x00, 0x00));
    if (OH_Drawing_PenGetColor(pen) == 0xFFFF0000) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_PenDestroy(pen);
    return result;
}

static napi_value OHDrawingPenGetWidth(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Pen *pen = OH_Drawing_PenCreate();
    OH_Drawing_PenSetWidth(pen, TENVAL);
    if (OH_Drawing_PenGetWidth(pen) == TENVAL) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_PenDestroy(pen);
    return result;
}

static napi_value OHDrawingPenSetWidth(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Pen *pen = OH_Drawing_PenCreate();
    OH_Drawing_PenSetWidth(pen, FIVEVAL);
    if (OH_Drawing_PenGetWidth(pen) == FIVEVAL) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_PenDestroy(pen);
    return result;
}

static napi_value OHDrawingPenGetMiterLimit(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Pen *pen = OH_Drawing_PenCreate();
    OH_Drawing_PenSetMiterLimit(pen, TENVAL);
    if (OH_Drawing_PenGetMiterLimit(pen) == TENVAL) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_PenDestroy(pen);
    return result;
}

static napi_value OHDrawingPenSetMiterLimit(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Pen *penn = OH_Drawing_PenCreate();
    OH_Drawing_PenSetMiterLimit(penn, FIVEVAL);
    if (OH_Drawing_PenGetMiterLimit(penn) == FIVEVAL) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_PenDestroy(penn);
    return result;
}

static napi_value OHDrawingPenGetCap(napi_env env, napi_callback_info info)
{
    OH_Drawing_Pen *penen = OH_Drawing_PenCreate();
    OH_Drawing_PenSetCap(penen, OH_Drawing_PenLineCapStyle::LINE_SQUARE_CAP);
    napi_value result = nullptr;
    if (OH_Drawing_PenGetCap(penen) == OH_Drawing_PenLineCapStyle::LINE_SQUARE_CAP) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_PenDestroy(penen);
    return result;
}

static napi_value OHDrawingPenSetCap(napi_env env, napi_callback_info info)
{
    OH_Drawing_Pen *penen = OH_Drawing_PenCreate();
    OH_Drawing_PenSetCap(penen, OH_Drawing_PenLineCapStyle::LINE_SQUARE_CAP);
    napi_value result = nullptr;
    if (OH_Drawing_PenGetCap(penen) == OH_Drawing_PenLineCapStyle::LINE_SQUARE_CAP) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_PenDestroy(penen);
    return result;
}

static napi_value OHDrawingPenGetJoin(napi_env env, napi_callback_info info)
{
    OH_Drawing_Pen *penval = OH_Drawing_PenCreate();
    OH_Drawing_PenSetJoin(penval, OH_Drawing_PenLineJoinStyle::LINE_ROUND_JOIN);
    napi_value result = nullptr;
    if (OH_Drawing_PenGetJoin(penval) == OH_Drawing_PenLineJoinStyle::LINE_ROUND_JOIN) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_PenDestroy(penval);
    return result;
}

static napi_value OHDrawingPenSetJoin(napi_env env, napi_callback_info info)
{
    OH_Drawing_Pen *penval = OH_Drawing_PenCreate();
    OH_Drawing_PenSetJoin(penval, OH_Drawing_PenLineJoinStyle::LINE_MITER_JOIN);
    napi_value result = nullptr;
    if (OH_Drawing_PenGetJoin(penval) == OH_Drawing_PenLineJoinStyle::LINE_MITER_JOIN) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_PenDestroy(penval);
    return result;
}

static napi_value OHDrawingColorSetArgb(napi_env env, napi_callback_info info)
{
    OH_Drawing_Brush *brushsh = OH_Drawing_BrushCreate();
    napi_value result = nullptr;
    OH_Drawing_BrushSetColor(brushsh, OH_Drawing_ColorSetArgb(0xFF, 0xFF, 0x00, 0x00));
    if (OH_Drawing_BrushGetColor(brushsh) == 0xFFFF0000) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_BrushDestroy(brushsh);
    return result;
}

static napi_value OHDrawingCreateFontCollection(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_FontCollection *fontCollection = OH_Drawing_CreateFontCollection();
    if (fontCollection == nullptr) {
        napi_create_int32(env, FAIL, &result);
    } else {
        napi_create_int32(env, SUCCESS, &result);
    }
    OH_Drawing_DestroyFontCollection(fontCollection);
    return result;
}

static napi_value OHDrawingCreateTypographyStyle(napi_env env, napi_callback_info info)
{
    OH_Drawing_TypographyStyle *TypographyStyle = OH_Drawing_CreateTypographyStyle();
    napi_value result = nullptr;
    if (TypographyStyle == nullptr) {
        napi_create_int32(env, FAIL, &result);
    } else {
        napi_create_int32(env, SUCCESS, &result);
    }
    OH_Drawing_DestroyTypographyStyle(TypographyStyle);
    return result;
}

static napi_value OHDrawingCreateTextStyle(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    if (txtStyle == nullptr) {
        napi_create_int32(env, FAIL, &result);
    } else {
        napi_create_int32(env, SUCCESS, &result);
    }
    OH_Drawing_DestroyTextStyle(txtStyle);
    return result;
}

static napi_value OHDrawingCreateTypographyHandler(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_TypographyStyle *typoStyle = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_TypographyCreate *handler =
        OH_Drawing_CreateTypographyHandler(typoStyle, OH_Drawing_CreateFontCollection());
    if (handler != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTypographyHandler(handler);
    return result;
}

static napi_value OHDrawingCreateTypography(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_TypographyStyle *typoStyle = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_TypographyCreate *handler =
        OH_Drawing_CreateTypographyHandler(typoStyle, OH_Drawing_CreateFontCollection());
    OH_Drawing_Typography *typography = OH_Drawing_CreateTypography(handler);
    if (typography != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTypography(typography);
    OH_Drawing_DestroyTypographyHandler(handler);
    return result;
}

static napi_value OHDrawingTypographyLayout(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_TypographyStyle *typoStyle = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_TypographyCreate *handler =
        OH_Drawing_CreateTypographyHandler(typoStyle, OH_Drawing_CreateFontCollection());
    OH_Drawing_Typography *typography = OH_Drawing_CreateTypography(handler);
    double maxWidth = EIGHUNVAL;
    OH_Drawing_TypographyLayout(typography, maxWidth);
    if (maxWidth == OH_Drawing_TypographyGetMaxWidth(typography)) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTypography(typography);
    OH_Drawing_DestroyTypographyHandler(handler);
    return result;
}

static napi_value OHDrawingTypographyGetMaxWidth(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_TypographyStyle *typoStylee = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_TypographyCreate *handlerr =
        OH_Drawing_CreateTypographyHandler(typoStylee, OH_Drawing_CreateFontCollection());
    OH_Drawing_Typography *typographyy = OH_Drawing_CreateTypography(handlerr);
    double maxWidth = SENHUNVAL;
    OH_Drawing_TypographyLayout(typographyy, maxWidth);
    if (maxWidth == OH_Drawing_TypographyGetMaxWidth(typographyy)) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTypography(typographyy);
    OH_Drawing_DestroyTypographyHandler(handlerr);
    return result;
}

static napi_value OHDrawingTypographyGetMinIntrinsicWidth(napi_env env, napi_callback_info info)
{
    OH_Drawing_TypographyStyle *typoStyle = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    OH_Drawing_TypographyCreate *handler =
        OH_Drawing_CreateTypographyHandler(typoStyle, OH_Drawing_CreateFontCollection());

    double fontSize = THRTENVAL;
    OH_Drawing_SetTextStyleFontSize(txtStyle, fontSize);
    OH_Drawing_SetTextStyleFontWeight(txtStyle, FONT_WEIGHT_400);
    OH_Drawing_SetTextStyleBaseLine(txtStyle, TEXT_BASELINE_ALPHABETIC);

    const char *fontFamilies[] = {"Roboooto"};
    OH_Drawing_SetTextStyleFontFamilies(txtStyle, ONEVAL, fontFamilies);
    OH_Drawing_TypographyHandlerPushTextStyle(handler, txtStyle);

    const char *text = "OpennnnHarmony\n";
    OH_Drawing_TypographyHandlerAddText(handler, text);
    OH_Drawing_TypographyHandlerPopTextStyle(handler);

    OH_Drawing_Typography *typography = OH_Drawing_CreateTypography(handler);
    double maxWidth = EIGHUNVAL;
    OH_Drawing_TypographyLayout(typography, maxWidth);

    napi_value result = nullptr;
    double minIntrinsicWidth = OH_Drawing_TypographyGetMinIntrinsicWidth(typography);
    double maxIntrinsicWidth = OH_Drawing_TypographyGetMaxIntrinsicWidth(typography);
    if (minIntrinsicWidth <= maxIntrinsicWidth) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTypography(typography);
    OH_Drawing_DestroyTypographyHandler(handler);
    return result;
}

static napi_value OHDrawingTypographyGetMaxIntrinsicWidth(napi_env env, napi_callback_info info)
{
    OH_Drawing_TypographyStyle *typoStyle = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    OH_Drawing_TypographyCreate *handler =
        OH_Drawing_CreateTypographyHandler(typoStyle, OH_Drawing_CreateFontCollection());

    double fontSize = THRTENVAL;
    OH_Drawing_SetTextStyleFontSize(txtStyle, fontSize);
    OH_Drawing_SetTextStyleFontWeight(txtStyle, FONT_WEIGHT_400);
    OH_Drawing_SetTextStyleBaseLine(txtStyle, TEXT_BASELINE_ALPHABETIC);

    const char *fontFamilies[] = {"Roboooto"};
    OH_Drawing_SetTextStyleFontFamilies(txtStyle, ONEVAL, fontFamilies);
    OH_Drawing_TypographyHandlerPushTextStyle(handler, txtStyle);

    const char *text = "OpennnnHarmony\n";
    OH_Drawing_TypographyHandlerAddText(handler, text);
    OH_Drawing_TypographyHandlerPopTextStyle(handler);

    OH_Drawing_Typography *typography = OH_Drawing_CreateTypography(handler);
    double maxWidth = SENFIVEVAL;
    OH_Drawing_TypographyLayout(typography, maxWidth);

    napi_value result = nullptr;
    double minIntrinsicWidth = OH_Drawing_TypographyGetMinIntrinsicWidth(typography);
    double maxIntrinsicWidth = OH_Drawing_TypographyGetMaxIntrinsicWidth(typography);
    if (minIntrinsicWidth <= maxIntrinsicWidth) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTypography(typography);
    OH_Drawing_DestroyTypographyHandler(handler);
    return result;
}

static napi_value OHDrawingTypographyGetLongestLine(napi_env env, napi_callback_info info)
{
    OH_Drawing_TypographyStyle *typoStylee = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    OH_Drawing_TypographyCreate *handlerr =
        OH_Drawing_CreateTypographyHandler(typoStylee, OH_Drawing_CreateFontCollection());

    const char *fontFamilies[] = {"Robotoo"};
    OH_Drawing_SetTextStyleFontFamilies(txtStyle, ONEVAL, fontFamilies);
    const char *text = "OpenHarmonyy\n";
    OH_Drawing_TypographyHandlerAddText(handlerr, text);

    OH_Drawing_Typography *typography = OH_Drawing_CreateTypography(handlerr);
    double maxWidth = EIGHUNVAL;
    OH_Drawing_TypographyLayout(typography, maxWidth);
    napi_value result = nullptr;

    if (OH_Drawing_TypographyGetLongestLine(typography) != ZEROOVAL) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTypography(typography);
    OH_Drawing_DestroyTypographyHandler(handlerr);
    return result;
}

static napi_value OHDrawingTypographyGetLongestLineAbnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TypographyStyle *typoStylee = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    OH_Drawing_TypographyCreate *handlerr =
        OH_Drawing_CreateTypographyHandler(typoStylee, OH_Drawing_CreateFontCollection());

    const char *fontFamilies[] = {"Robotoo"};
    OH_Drawing_SetTextStyleFontFamilies(txtStyle, ONEVAL, fontFamilies);
    const char *text = "OpenHarmonnnyy\n";
    OH_Drawing_TypographyHandlerAddText(handlerr, text);

    OH_Drawing_Typography *typography = OH_Drawing_CreateTypography(handlerr);

    napi_value result = nullptr;
    if (OH_Drawing_TypographyGetLongestLine(typography) != ZEROOVAL) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTypography(typography);
    OH_Drawing_DestroyTypographyHandler(handlerr);
    return result;
}

static napi_value OHDrawingTypographyGetAlphabeticBaseline(napi_env env, napi_callback_info info)
{
    OH_Drawing_TypographyStyle *typoStyle = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    OH_Drawing_TypographyCreate *handler =
        OH_Drawing_CreateTypographyHandler(typoStyle, OH_Drawing_CreateFontCollection());

    double fontSize = THRTENVAL;
    OH_Drawing_SetTextStyleFontSize(txtStyle, fontSize);
    OH_Drawing_SetTextStyleFontWeight(txtStyle, FONT_WEIGHT_400);
    OH_Drawing_SetTextStyleBaseLine(txtStyle, TEXT_BASELINE_ALPHABETIC);

    const char *fontFamilies[] = {"Roboto"};
    OH_Drawing_SetTextStyleFontFamilies(txtStyle, ONEVAL, fontFamilies);
    const char *text = "OpenHarmony\n";
    OH_Drawing_TypographyHandlerAddText(handler, text);

    OH_Drawing_Typography *typography = OH_Drawing_CreateTypography(handler);
    double maxWidth = EIGHUNVAL;
    OH_Drawing_TypographyLayout(typography, maxWidth);

    napi_value result = nullptr;
    if (OH_Drawing_TypographyGetAlphabeticBaseline(typography) != ZEROOVAL) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTypography(typography);
    OH_Drawing_DestroyTypographyHandler(handler);
    return result;
}

static napi_value OHDrawingTypographyGetAlphabeticBaselineNormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TypographyStyle *typoStyle = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    OH_Drawing_TypographyCreate *handler =
        OH_Drawing_CreateTypographyHandler(typoStyle, OH_Drawing_CreateFontCollection());

    double fontSize = THRTENVAL;
    OH_Drawing_SetTextStyleFontSize(txtStyle, fontSize);
    OH_Drawing_SetTextStyleFontWeight(txtStyle, FONT_WEIGHT_500);
    OH_Drawing_SetTextStyleBaseLine(txtStyle, TEXT_BASELINE_ALPHABETIC);

    const char *fontFamilies[] = {"Roobooto"};
    OH_Drawing_SetTextStyleFontFamilies(txtStyle, ONEVAL, fontFamilies);
    const char *text = "OopenHarmoony\n";
    OH_Drawing_TypographyHandlerAddText(handler, text);

    OH_Drawing_Typography *typography = OH_Drawing_CreateTypography(handler);
    double maxWidth = EIGHUNVAL;
    OH_Drawing_TypographyLayout(typography, maxWidth);

    napi_value result = nullptr;
    if (OH_Drawing_TypographyGetAlphabeticBaseline(typography) != ZEROOVAL) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTypography(typography);
    OH_Drawing_DestroyTypographyHandler(handler);
    return result;
}

static napi_value OHDrawingTypographyGetIdeographicBaseline(napi_env env, napi_callback_info info)
{
    OH_Drawing_TypographyStyle *typoStyle = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    OH_Drawing_TypographyCreate *handler =
        OH_Drawing_CreateTypographyHandler(typoStyle, OH_Drawing_CreateFontCollection());

    double fontSize = FIVTENVAL;
    OH_Drawing_SetTextStyleFontSize(txtStyle, fontSize);
    OH_Drawing_SetTextStyleFontWeight(txtStyle, FONT_WEIGHT_500);
    OH_Drawing_SetTextStyleBaseLine(txtStyle, TEXT_BASELINE_IDEOGRAPHIC);

    const char *fontFamilies[] = {"Rooboto"};
    OH_Drawing_SetTextStyleFontFamilies(txtStyle, ONEVAL, fontFamilies);
    const char *text = "OopenHarmony";
    OH_Drawing_TypographyHandlerAddText(handler, text);

    OH_Drawing_Typography *typographyy = OH_Drawing_CreateTypography(handler);
    double maxWidth = EIGHUNVAL;
    OH_Drawing_TypographyLayout(typographyy, maxWidth);

    napi_value result = nullptr;
    if (OH_Drawing_TypographyGetIdeographicBaseline(typographyy) != ZEROOVAL) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTypography(typographyy);
    OH_Drawing_DestroyTypographyHandler(handler);
    return result;
}

static napi_value OHDrawingTypographyGetIdeographicBaselineNormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TypographyStyle *typoStyle = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    OH_Drawing_TypographyCreate *handler =
        OH_Drawing_CreateTypographyHandler(typoStyle, OH_Drawing_CreateFontCollection());

    double fontSize = FIVTENVAL;
    OH_Drawing_SetTextStyleFontSize(txtStyle, fontSize);
    OH_Drawing_SetTextStyleFontWeight(txtStyle, FONT_WEIGHT_400);
    OH_Drawing_SetTextStyleBaseLine(txtStyle, TEXT_BASELINE_IDEOGRAPHIC);

    const char *fontFamilies[] = {"Rooooboto"};
    OH_Drawing_SetTextStyleFontFamilies(txtStyle, ONEVAL, fontFamilies);
    const char *text = "OooopenHarmony";
    OH_Drawing_TypographyHandlerAddText(handler, text);

    OH_Drawing_Typography *typographyy = OH_Drawing_CreateTypography(handler);
    double maxWidth = EIGHUNVAL;
    OH_Drawing_TypographyLayout(typographyy, maxWidth);

    napi_value result = nullptr;
    if (OH_Drawing_TypographyGetIdeographicBaseline(typographyy) != ZEROOVAL) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTypography(typographyy);
    OH_Drawing_DestroyTypographyHandler(handler);
    return result;
}

static napi_value OHDrawingTypographyGetHeight(napi_env env, napi_callback_info info)
{
    OH_Drawing_TypographyStyle *typoStyle = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    OH_Drawing_TypographyCreate *handler =
        OH_Drawing_CreateTypographyHandler(typoStyle, OH_Drawing_CreateFontCollection());

    const char *fontFamilies[] = {"Robooto"};
    OH_Drawing_SetTextStyleFontFamilies(txtStyle, ONEVAL, fontFamilies);
    const char *text = "OpenHarmoony";
    OH_Drawing_TypographyHandlerAddText(handler, text);

    OH_Drawing_Typography *ttypography = OH_Drawing_CreateTypography(handler);
    double maxWidth = SIXFIVEVAL;
    OH_Drawing_TypographyLayout(ttypography, maxWidth);

    napi_value result = nullptr;
    if (OH_Drawing_TypographyGetHeight(ttypography) != ZEROOVAL) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTypography(ttypography);
    OH_Drawing_DestroyTypographyHandler(handler);
    return result;
}

static napi_value OHDrawingTypographyGetHeightAbnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TypographyStyle *typoStyle = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    OH_Drawing_TypographyCreate *handler =
        OH_Drawing_CreateTypographyHandler(typoStyle, OH_Drawing_CreateFontCollection());

    const char *fontFamilies[] = {"Robootooo"};
    OH_Drawing_SetTextStyleFontFamilies(txtStyle, ONEVAL, fontFamilies);
    const char *text = "OpenHarmoooony";
    OH_Drawing_TypographyHandlerAddText(handler, text);

    OH_Drawing_Typography *ttypography = OH_Drawing_CreateTypography(handler);

    napi_value result = nullptr;
    if (OH_Drawing_TypographyGetHeight(ttypography) != ZEROOVAL) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTypography(ttypography);
    OH_Drawing_DestroyTypographyHandler(handler);
    return result;
}

static napi_value OHDrawingPenGetCapNormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_Pen *penval = OH_Drawing_PenCreate();
    OH_Drawing_PenSetCap(penval, OH_Drawing_PenLineCapStyle::LINE_FLAT_CAP);
    napi_value result = nullptr;
    if (OH_Drawing_PenGetCap(penval) == OH_Drawing_PenLineCapStyle::LINE_FLAT_CAP) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_PenDestroy(penval);
    return result;
}

static napi_value OHDrawingPenSetCapNormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_Pen *penen = OH_Drawing_PenCreate();
    OH_Drawing_PenSetCap(penen, OH_Drawing_PenLineCapStyle::LINE_FLAT_CAP);
    napi_value result = nullptr;
    if (OH_Drawing_PenGetCap(penen) == OH_Drawing_PenLineCapStyle::LINE_FLAT_CAP) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_PenDestroy(penen);
    return result;
}

static napi_value OHDrawingPenSetJoinNormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_Pen *penval = OH_Drawing_PenCreate();
    OH_Drawing_PenSetJoin(penval, OH_Drawing_PenLineJoinStyle::LINE_ROUND_JOIN);
    napi_value result = nullptr;
    if (OH_Drawing_PenGetJoin(penval) == OH_Drawing_PenLineJoinStyle::LINE_ROUND_JOIN) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_PenDestroy(penval);
    return result;
}

static napi_value OHDrawingPenGetJoinNormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_Pen *penval = OH_Drawing_PenCreate();
    OH_Drawing_PenSetJoin(penval, OH_Drawing_PenLineJoinStyle::LINE_MITER_JOIN);
    napi_value result = nullptr;
    if (OH_Drawing_PenGetJoin(penval) == OH_Drawing_PenLineJoinStyle::LINE_MITER_JOIN) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_PenDestroy(penval);
    return result;
}

static napi_value OHDrawingPenIsAntiAliasNormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Pen *pen = OH_Drawing_PenCreate();
    OH_Drawing_PenSetAntiAlias(pen, true);
    if (OH_Drawing_PenIsAntiAlias(pen)) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_PenDestroy(pen);
    return result;
}

static napi_value OHDrawingPenSetAntiAliasNormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Pen *pen = OH_Drawing_PenCreate();
    OH_Drawing_PenSetAntiAlias(pen, false);
    if (OH_Drawing_PenIsAntiAlias(pen)) {
        napi_create_int32(env, FAIL, &result);
    } else {
        napi_create_int32(env, SUCCESS, &result);
    }
    OH_Drawing_PenDestroy(pen);
    return result;
}

static napi_value OHDrawingBitmapBuildNormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Bitmap *bitmap = OH_Drawing_BitmapCreate();
    const unsigned int width = WIDTH;
    const unsigned int height = HEIGHT;
    OH_Drawing_BitmapFormat bitmapFormat{COLOR_FORMAT_RGBA_8888, ALPHA_FORMAT_UNPREMUL};
    OH_Drawing_BitmapBuild(bitmap, width, height, &bitmapFormat);
    if (width == OH_Drawing_BitmapGetWidth(bitmap)) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_BitmapDestroy(bitmap);
    return result;
}

static napi_value OHDrawingBitmapGetWidthNormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Bitmap *bitmap = OH_Drawing_BitmapCreate();
    const unsigned int width = WIDTH;
    const unsigned int height = HEIGHT;
    OH_Drawing_BitmapFormat bitmapFormat{COLOR_FORMAT_BGRA_8888, ALPHA_FORMAT_UNPREMUL};
    OH_Drawing_BitmapBuild(bitmap, width, height, &bitmapFormat);
    if (OH_Drawing_BitmapGetWidth(bitmap) == width) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_BitmapDestroy(bitmap);
    return result;
}

static napi_value OHDrawingBitmapGetHeightNormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Bitmap *bitmap = OH_Drawing_BitmapCreate();
    const unsigned int width = WIDTH;
    const unsigned int height = HEIGHT;
    OH_Drawing_BitmapFormat bitmapFormat{COLOR_FORMAT_BGRA_8888, ALPHA_FORMAT_UNPREMUL};
    OH_Drawing_BitmapBuild(bitmap, width, height, &bitmapFormat);
    if (OH_Drawing_BitmapGetHeight(bitmap) == height) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_BitmapDestroy(bitmap);
    return result;
}

static napi_value OHDrawingBitmapGetPixelsNormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Bitmap *bitmapp = OH_Drawing_BitmapCreate();
    const unsigned int width = WIDTH;
    const unsigned int height = HEIGHT;
    OH_Drawing_BitmapFormat bitmapFormat{COLOR_FORMAT_BGRA_8888, ALPHA_FORMAT_UNPREMUL};
    OH_Drawing_BitmapBuild(bitmapp, width, height, &bitmapFormat);
    if (OH_Drawing_BitmapGetPixels(bitmapp) == nullptr) {
        napi_create_int32(env, FAIL, &result);
    } else {
        napi_create_int32(env, SUCCESS, &result);
    }
    OH_Drawing_BitmapDestroy(bitmapp);
    return result;
}

static napi_value OHDrawingBrushIsAntiAliasNormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_Brush *brush = OH_Drawing_BrushCreate();
    OH_Drawing_BrushSetAntiAlias(brush, true);
    napi_value result = nullptr;
    if (OH_Drawing_BrushIsAntiAlias(brush) == true) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_BrushDestroy(brush);
    return result;
}

static napi_value OHDrawingBrushSetAntiAliasNormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_Brush *brush = OH_Drawing_BrushCreate();
    OH_Drawing_BrushSetAntiAlias(brush, false);
    napi_value result = nullptr;
    if (OH_Drawing_BrushIsAntiAlias(brush) == false) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_BrushDestroy(brush);
    return result;
}

static napi_value OHDrawingBrushGetColorNormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_Brush *brush = OH_Drawing_BrushCreate();
    OH_Drawing_BrushSetColor(brush, OH_Drawing_ColorSetArgb(0xFF, 0xFF, 0xFF, 0xFF));
    napi_value result = nullptr;
    if (OH_Drawing_BrushGetColor(brush) != 0xFFFFFFFF) {
        napi_create_int32(env, FAIL, &result);
    } else {
        napi_create_int32(env, SUCCESS, &result);
    }
    OH_Drawing_BrushDestroy(brush);
    return result;
}

static napi_value OHDrawingBrushSetColorNormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_Brush *brushh = OH_Drawing_BrushCreate();
    OH_Drawing_BrushSetColor(brushh, OH_Drawing_ColorSetArgb(0xFF, 0xFF, 0xFF, 0xFF));
    napi_value result = nullptr;
    if (OH_Drawing_BrushGetColor(brushh) != 0xFFFFFFFF) {
        napi_create_int32(env, FAIL, &result);
    } else {
        napi_create_int32(env, SUCCESS, &result);
    }
    OH_Drawing_BrushDestroy(brushh);
    return result;
}

static napi_value OHDrawingPenGetColorNormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Pen *peen = OH_Drawing_PenCreate();
    OH_Drawing_PenSetColor(peen, OH_Drawing_ColorSetArgb(0xFF, 0xFF, 0xFF, 0xFF));
    if (OH_Drawing_PenGetColor(peen) == 0xFFFFFFFF) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_PenDestroy(peen);
    return result;
}

static napi_value OHDrawingPenSetColorNormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Pen *ppen = OH_Drawing_PenCreate();
    OH_Drawing_PenSetColor(ppen, OH_Drawing_ColorSetArgb(0xFF, 0xFF, 0xFF, 0xFF));
    if (OH_Drawing_PenGetColor(ppen) == 0xFFFFFFFF) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_PenDestroy(ppen);
    return result;
}

static napi_value OHDrawingPenGetWidthNormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Pen *pen = OH_Drawing_PenCreate();
    OH_Drawing_PenSetWidth(pen, MINUSTENVAL);
    if (OH_Drawing_PenGetWidth(pen) == MINUSTENVAL) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_PenDestroy(pen);
    return result;
}

static napi_value OHDrawingPenSetWidthNormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Pen *pen = OH_Drawing_PenCreate();
    OH_Drawing_PenSetWidth(pen, MINUSFIVEVAL);
    if (OH_Drawing_PenGetWidth(pen) == MINUSFIVEVAL) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_PenDestroy(pen);
    return result;
}

static napi_value OHDrawingPenGetMiterLimitNormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Pen *pen = OH_Drawing_PenCreate();
    OH_Drawing_PenSetMiterLimit(pen, MINUSTENVAL);
    if (OH_Drawing_PenGetMiterLimit(pen) == MINUSTENVAL) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_PenDestroy(pen);
    return result;
}

static napi_value OHDrawingPenSetMiterLimitNormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_Pen *penn = OH_Drawing_PenCreate();
    OH_Drawing_PenSetMiterLimit(penn, MINUSFIVEVAL);
    if (OH_Drawing_PenGetMiterLimit(penn) == MINUSFIVEVAL) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_PenDestroy(penn);
    return result;
}

static napi_value OHDrawingColorSetArgbNormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_Brush *brushs = OH_Drawing_BrushCreate();
    napi_value result = nullptr;
    OH_Drawing_BrushSetColor(brushs, OH_Drawing_ColorSetArgb(0xFF, 0xFF, 0xFF, 0xFF));
    if (OH_Drawing_BrushGetColor(brushs) == 0xFFFFFFFF) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_BrushDestroy(brushs);
    return result;
}

static napi_value OHDrawingTypographyLayoutNormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_TypographyStyle *typoStylee = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_TypographyCreate *handler =
        OH_Drawing_CreateTypographyHandler(typoStylee, OH_Drawing_CreateFontCollection());
    OH_Drawing_Typography *typographyy = OH_Drawing_CreateTypography(handler);
    double maxWidth = MINUSEIGHUNVAL;
    OH_Drawing_TypographyLayout(typographyy, maxWidth);
    if (maxWidth == OH_Drawing_TypographyGetMaxWidth(typographyy)) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTypography(typographyy);
    OH_Drawing_DestroyTypographyHandler(handler);
    return result;
}

static napi_value OHDrawingTypographyGetMaxWidthNormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_TypographyStyle *typoStylee = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_TypographyCreate *handler =
        OH_Drawing_CreateTypographyHandler(typoStylee, OH_Drawing_CreateFontCollection());
    OH_Drawing_Typography *typographyy = OH_Drawing_CreateTypography(handler);
    double maxWidth = -700.0;
    OH_Drawing_TypographyLayout(typographyy, maxWidth);
    if (maxWidth == OH_Drawing_TypographyGetMaxWidth(typographyy)) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTypography(typographyy);
    OH_Drawing_DestroyTypographyHandler(handler);
    return result;
}

static napi_value OHDrawingTypographyGetMinIntrinsicWidthNormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TypographyStyle *typoStyle = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    OH_Drawing_TypographyCreate *handler =
        OH_Drawing_CreateTypographyHandler(typoStyle, OH_Drawing_CreateFontCollection());

    double fontSize = THRTENVAL;
    OH_Drawing_SetTextStyleFontSize(txtStyle, fontSize);
    OH_Drawing_SetTextStyleFontWeight(txtStyle, FONT_WEIGHT_400);
    OH_Drawing_SetTextStyleBaseLine(txtStyle, TEXT_BASELINE_ALPHABETIC);

    const char *fontFamilies[] = {"Roboooto"};
    OH_Drawing_SetTextStyleFontFamilies(txtStyle, ONEVAL, fontFamilies);
    OH_Drawing_TypographyHandlerPushTextStyle(handler, txtStyle);

    const char *text = "OpennnnHarmony\n";
    OH_Drawing_TypographyHandlerAddText(handler, text);
    OH_Drawing_TypographyHandlerPopTextStyle(handler);

    OH_Drawing_Typography *typographyyy = OH_Drawing_CreateTypography(handler);
    double maxWidth = MINUSEIGHUNVAL;
    OH_Drawing_TypographyLayout(typographyyy, maxWidth);

    napi_value result = nullptr;
    double minIntrinsicWidth = OH_Drawing_TypographyGetMinIntrinsicWidth(typographyyy);
    double maxIntrinsicWidth = OH_Drawing_TypographyGetMaxIntrinsicWidth(typographyyy);
    if (minIntrinsicWidth <= maxIntrinsicWidth) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTypography(typographyyy);
    OH_Drawing_DestroyTypographyHandler(handler);
    return result;
}

static napi_value OHDrawingTypographyGetMaxIntrinsicWidthNormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TypographyStyle *typoStyle = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    OH_Drawing_TypographyCreate *handlerrr =
        OH_Drawing_CreateTypographyHandler(typoStyle, OH_Drawing_CreateFontCollection());

    double fontSize = THRTENVAL;
    OH_Drawing_SetTextStyleFontSize(txtStyle, fontSize);
    OH_Drawing_SetTextStyleFontWeight(txtStyle, FONT_WEIGHT_400);
    OH_Drawing_SetTextStyleBaseLine(txtStyle, TEXT_BASELINE_ALPHABETIC);

    const char *fontFamilies[] = {"Roboooooto"};
    OH_Drawing_SetTextStyleFontFamilies(txtStyle, ONEVAL, fontFamilies);
    OH_Drawing_TypographyHandlerPushTextStyle(handlerrr, txtStyle);

    const char *text = "OpennnnHarmoooony\n";
    OH_Drawing_TypographyHandlerAddText(handlerrr, text);
    OH_Drawing_TypographyHandlerPopTextStyle(handlerrr);

    OH_Drawing_Typography *typography = OH_Drawing_CreateTypography(handlerrr);
    double maxWidth = MINUSSENFIVEVAL;
    OH_Drawing_TypographyLayout(typography, maxWidth);

    napi_value result = nullptr;
    double minIntrinsicWidth = OH_Drawing_TypographyGetMinIntrinsicWidth(typography);
    double maxIntrinsicWidth = OH_Drawing_TypographyGetMaxIntrinsicWidth(typography);
    if (minIntrinsicWidth <= maxIntrinsicWidth) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTypography(typography);
    OH_Drawing_DestroyTypographyHandler(handlerrr);
    return result;
}

static napi_value OHDrawingCreateTypographyStyleAnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TypographyStyle *typoStyle = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_SetTypographyTextDirection(typoStyle, TEXT_DIRECTION_LTR);
    OH_Drawing_SetTypographyTextAlign(typoStyle, TEXT_ALIGN_LEFT);
    napi_value result = nullptr;
    if (typoStyle != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTypographyStyle(typoStyle);
    return result;
}

static napi_value OHDrawingCreateTypographyStyleBnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TypographyStyle *typoStyle = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_SetTypographyTextDirection(typoStyle, TEXT_DIRECTION_RTL);
    OH_Drawing_SetTypographyTextAlign(typoStyle, TEXT_ALIGN_LEFT);
    napi_value result = nullptr;
    if (typoStyle != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTypographyStyle(typoStyle);
    return result;
}

static napi_value OHDrawingCreateTypographyStyleCnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TypographyStyle *typoStyle = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_SetTypographyTextDirection(typoStyle, TEXT_DIRECTION_RTL);
    OH_Drawing_SetTypographyTextAlign(typoStyle, TEXT_ALIGN_RIGHT);
    napi_value result = nullptr;
    if (typoStyle != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTypographyStyle(typoStyle);
    return result;
}

static napi_value OHDrawingCreateTypographyStyleDnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TypographyStyle *typoStyle = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_SetTypographyTextDirection(typoStyle, TEXT_DIRECTION_RTL);
    OH_Drawing_SetTypographyTextAlign(typoStyle, TEXT_ALIGN_CENTER);
    napi_value result = nullptr;
    if (typoStyle != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTypographyStyle(typoStyle);
    return result;
}

static napi_value OHDrawingCreateTypographyStyleEnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TypographyStyle *typoStyle = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_SetTypographyTextDirection(typoStyle, TEXT_DIRECTION_LTR);
    OH_Drawing_SetTypographyTextAlign(typoStyle, TEXT_ALIGN_CENTER);
    napi_value result = nullptr;
    if (typoStyle != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTypographyStyle(typoStyle);
    return result;
}

static napi_value OHDrawingCreateTypographyStyleFnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TypographyStyle *typoStyle = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_SetTypographyTextMaxLines(typoStyle, ONEHUNVAL);
    napi_value result = nullptr;
    if (typoStyle != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTypographyStyle(typoStyle);
    return result;
}

static napi_value OHDrawingCreateTextStyleAnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    uint32_t color = OH_Drawing_ColorSetArgb(0xFF, 0xFF, 0xFF, 0xFF);
    OH_Drawing_SetTextStyleColor(txtStyle, color);
    napi_value result = nullptr;
    if (txtStyle != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTextStyle(txtStyle);
    return result;
}

static napi_value OHDrawingCreateTextStyleBnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    uint32_t color = OH_Drawing_ColorSetArgb(0xFF, 0x00, 0x00, 0x00);
    OH_Drawing_SetTextStyleColor(txtStyle, color);
    napi_value result = nullptr;
    if (txtStyle != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTextStyle(txtStyle);
    return result;
}

static napi_value OHDrawingCreateTextStyleCnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    double fontSize = EIGTENVAL;
    OH_Drawing_SetTextStyleFontSize(txtStyle, fontSize);
    OH_Drawing_SetTextStyleFontWeight(txtStyle, FONT_WEIGHT_100);
    OH_Drawing_SetTextStyleBaseLine(txtStyle, TEXT_BASELINE_ALPHABETIC);
    OH_Drawing_SetTextStyleFontHeight(txtStyle, ONEVAL);
    napi_value result = nullptr;
    if (txtStyle != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTextStyle(txtStyle);
    return result;
}

static napi_value OHDrawingCreateTextStyleDnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    double fontSize = EIGTENVAL;
    OH_Drawing_SetTextStyleFontSize(txtStyle, fontSize);
    OH_Drawing_SetTextStyleFontWeight(txtStyle, FONT_WEIGHT_200);
    OH_Drawing_SetTextStyleBaseLine(txtStyle, TEXT_BASELINE_ALPHABETIC);
    OH_Drawing_SetTextStyleFontHeight(txtStyle, ONEVAL);
    napi_value result = nullptr;
    if (txtStyle != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTextStyle(txtStyle);
    return result;
}

static napi_value OHDrawingCreateTextStyleEnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    double fontSize = EIGTENVAL;
    OH_Drawing_SetTextStyleFontSize(txtStyle, fontSize);
    OH_Drawing_SetTextStyleFontWeight(txtStyle, FONT_WEIGHT_300);
    OH_Drawing_SetTextStyleBaseLine(txtStyle, TEXT_BASELINE_ALPHABETIC);
    OH_Drawing_SetTextStyleFontHeight(txtStyle, ONEVAL);
    napi_value result = nullptr;
    if (txtStyle != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTextStyle(txtStyle);
    return result;
}

static napi_value OHDrawingCreateTextStyleFnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    double fontSize = EIGTENVAL;
    OH_Drawing_SetTextStyleFontSize(txtStyle, fontSize);
    OH_Drawing_SetTextStyleFontWeight(txtStyle, FONT_WEIGHT_400);
    OH_Drawing_SetTextStyleBaseLine(txtStyle, TEXT_BASELINE_ALPHABETIC);
    OH_Drawing_SetTextStyleFontHeight(txtStyle, ONEVAL);
    napi_value result = nullptr;
    if (txtStyle != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTextStyle(txtStyle);
    return result;
}

static napi_value OHDrawingCreateTextStyleGnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    double fontSize = EIGTENVAL;
    OH_Drawing_SetTextStyleFontSize(txtStyle, fontSize);
    OH_Drawing_SetTextStyleFontWeight(txtStyle, FONT_WEIGHT_100);
    OH_Drawing_SetTextStyleBaseLine(txtStyle, TEXT_BASELINE_IDEOGRAPHIC);
    OH_Drawing_SetTextStyleFontHeight(txtStyle, ONEVAL);
    napi_value result = nullptr;
    if (txtStyle != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTextStyle(txtStyle);
    return result;
}

static napi_value OHDrawingCreateTextStyleHnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    double fontSize = EIGTENVAL;
    OH_Drawing_SetTextStyleFontSize(txtStyle, fontSize);
    OH_Drawing_SetTextStyleFontWeight(txtStyle, FONT_WEIGHT_200);
    OH_Drawing_SetTextStyleBaseLine(txtStyle, TEXT_BASELINE_IDEOGRAPHIC);
    OH_Drawing_SetTextStyleFontHeight(txtStyle, ONEVAL);
    napi_value result = nullptr;
    if (txtStyle != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTextStyle(txtStyle);
    return result;
}

static napi_value OHDrawingCreateTextStyleInormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    double fontSize = EIGTENVAL;
    OH_Drawing_SetTextStyleFontSize(txtStyle, fontSize);
    OH_Drawing_SetTextStyleFontWeight(txtStyle, FONT_WEIGHT_300);
    OH_Drawing_SetTextStyleBaseLine(txtStyle, TEXT_BASELINE_IDEOGRAPHIC);
    OH_Drawing_SetTextStyleFontHeight(txtStyle, ONEVAL);
    napi_value result = nullptr;
    if (txtStyle != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTextStyle(txtStyle);
    return result;
}

static napi_value OHDrawingCreateTextStyleJnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    double fontSize = EIGTENVAL;
    OH_Drawing_SetTextStyleFontSize(txtStyle, fontSize);
    OH_Drawing_SetTextStyleFontWeight(txtStyle, FONT_WEIGHT_400);
    OH_Drawing_SetTextStyleBaseLine(txtStyle, TEXT_BASELINE_IDEOGRAPHIC);
    OH_Drawing_SetTextStyleFontHeight(txtStyle, ONEVAL);
    napi_value result = nullptr;
    if (txtStyle != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTextStyle(txtStyle);
    return result;
}

static napi_value OHDrawingCreateTextStyleKnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    OH_Drawing_SetTextStyleDecoration(txtStyle, TEXT_DECORATION_NONE);
    uint32_t color = OH_Drawing_ColorSetArgb(0xFF, 0x00, 0x00, 0x00);
    OH_Drawing_SetTextStyleDecorationColor(txtStyle, color);
    napi_value result = nullptr;
    if (txtStyle != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTextStyle(txtStyle);
    return result;
}

static napi_value OHDrawingCreateTextStyleLnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    OH_Drawing_SetTextStyleDecoration(txtStyle, TEXT_DECORATION_UNDERLINE);
    uint32_t color = OH_Drawing_ColorSetArgb(0xFF, 0x00, 0x00, 0x00);
    OH_Drawing_SetTextStyleDecorationColor(txtStyle, color);
    napi_value result = nullptr;
    if (txtStyle != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTextStyle(txtStyle);
    return result;
}

static napi_value OHDrawingCreateTextStyleMnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    OH_Drawing_SetTextStyleDecoration(txtStyle, TEXT_DECORATION_NONE);
    uint32_t color = OH_Drawing_ColorSetArgb(0xFF, 0xFF, 0xFF, 0xFF);
    OH_Drawing_SetTextStyleDecorationColor(txtStyle, color);
    napi_value result = nullptr;
    if (txtStyle != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTextStyle(txtStyle);
    return result;
}

static napi_value OHDrawingCreateTextStyleNnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    OH_Drawing_SetTextStyleDecoration(txtStyle, TEXT_DECORATION_UNDERLINE);
    uint32_t color = OH_Drawing_ColorSetArgb(0xFF, 0xFF, 0xFF, 0xFF);
    OH_Drawing_SetTextStyleDecorationColor(txtStyle, color);
    napi_value result = nullptr;
    if (txtStyle != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTextStyle(txtStyle);
    return result;
}

static napi_value OHDrawingCreateTextStyleOnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    const char *fontFamilies[] = {"Roboto"};
    OH_Drawing_SetTextStyleFontFamilies(txtStyle, ONEVAL, fontFamilies);
    OH_Drawing_SetTextStyleFontStyle(txtStyle, FONT_STYLE_NORMAL);
    OH_Drawing_SetTextStyleLocale(txtStyle, "en");
    napi_value result = nullptr;
    if (txtStyle != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTextStyle(txtStyle);
    return result;
}

static napi_value OHDrawingCreateTextStylePnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    const char *fontFamilies[] = {"Roboto"};
    OH_Drawing_SetTextStyleFontFamilies(txtStyle, ONEVAL, fontFamilies);
    OH_Drawing_SetTextStyleFontStyle(txtStyle, FONT_STYLE_ITALIC);
    OH_Drawing_SetTextStyleLocale(txtStyle, "en");
    napi_value result = nullptr;
    if (txtStyle != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTextStyle(txtStyle);
    return result;
}

static napi_value OHDrawingCreateTextStyleQnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    OH_Drawing_SetTextStyleDecoration(txtStyle, TEXT_DECORATION_OVERLINE);
    uint32_t color = OH_Drawing_ColorSetArgb(0xFF, 0xFF, 0x00, 0x00);
    OH_Drawing_SetTextStyleDecorationColor(txtStyle, color);
    napi_value result = nullptr;
    if (txtStyle != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTextStyle(txtStyle);
    return result;
}

static napi_value OHDrawingCreateTextStyleRnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    OH_Drawing_SetTextStyleDecoration(txtStyle, TEXT_DECORATION_OVERLINE);
    uint32_t color = OH_Drawing_ColorSetArgb(0xFF, 0xFF, 0xFF, 0xFF);
    OH_Drawing_SetTextStyleDecorationColor(txtStyle, color);
    napi_value result = nullptr;
    if (txtStyle != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTextStyle(txtStyle);
    return result;
}

static napi_value OHDrawingCreateTextStyleSnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    OH_Drawing_SetTextStyleDecoration(txtStyle, TEXT_DECORATION_LINE_THROUGH);
    uint32_t color = OH_Drawing_ColorSetArgb(0xFF, 0xFF, 0x00, 0x00);
    OH_Drawing_SetTextStyleDecorationColor(txtStyle, color);
    napi_value result = nullptr;
    if (txtStyle != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTextStyle(txtStyle);
    return result;
}

static napi_value OHDrawingCreateTextStyleTnormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    OH_Drawing_SetTextStyleDecoration(txtStyle, TEXT_DECORATION_LINE_THROUGH);
    uint32_t color = OH_Drawing_ColorSetArgb(0xFF, 0xFF, 0xFF, 0xFF);
    OH_Drawing_SetTextStyleDecorationColor(txtStyle, color);
    napi_value result = nullptr;
    if (txtStyle != nullptr) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTextStyle(txtStyle);
    return result;
}

static OH_Drawing_TypographyCreate *TypographyCreate()
{
    OH_Drawing_TypographyStyle *typoStyle = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_FontCollection *fontCollection = OH_Drawing_CreateFontCollection();
    OH_Drawing_TypographyCreate *handler = OH_Drawing_CreateTypographyHandler(typoStyle, fontCollection);
    return handler;
}

static double TypographyGetLongestLine(OH_Drawing_TypographyCreate *handler, int fontSize)
{
    OH_Drawing_TextStyle *txtStyle = OH_Drawing_CreateTextStyle();
    OH_Drawing_SetTextStyleFontSize(txtStyle, fontSize);
    OH_Drawing_TypographyHandlerPushTextStyle(handler, txtStyle);
    const char *text = "test/n";
    OH_Drawing_TypographyHandlerAddText(handler, text);
    OH_Drawing_Typography *typography = OH_Drawing_CreateTypography(handler);
    double maxWidth = 800;
    OH_Drawing_TypographyLayout(typography, maxWidth);
    double len = OH_Drawing_TypographyGetLongestLine(typography);
    OH_Drawing_DestroyTypography(typography);
    return len;
}

static napi_value OHDrawingTypographyHandlerAddText(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_TypographyCreate *handlerOne = TypographyCreate();
    OH_Drawing_TypographyCreate *handlerTwo = TypographyCreate();
    int fontSizeOne = 15;
    int fontSizeTwo = 30;
    double lenOne = TypographyGetLongestLine(handlerOne, fontSizeOne);
    double lenTwo = TypographyGetLongestLine(handlerTwo, fontSizeTwo);
    if (lenOne < lenTwo && lenOne != ZEROVAL && lenTwo != ZEROVAL) {
        OH_Drawing_TypographyHandlerPopTextStyle(handlerOne);
        OH_Drawing_TypographyHandlerPopTextStyle(handlerTwo);
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTypographyHandler(handlerOne);
    OH_Drawing_DestroyTypographyHandler(handlerTwo);
    return result;
}

static napi_value OHDrawingTypographyHandlerAddTextAanormal(napi_env env, napi_callback_info info)
{
    OH_Drawing_TypographyStyle *typoStyle = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_FontCollection *fontCollection = OH_Drawing_CreateFontCollection();
    OH_Drawing_TypographyCreate *handler = OH_Drawing_CreateTypographyHandler(typoStyle, fontCollection);
    const char *text = "";
    OH_Drawing_TypographyHandlerAddText(handler, text);
    OH_Drawing_Typography *typography = OH_Drawing_CreateTypography(handler);
    double maxWidth = 50;
    OH_Drawing_TypographyLayout(typography, maxWidth);
    napi_value result = nullptr;

    double len = OH_Drawing_TypographyGetLongestLine(typography);
    if (len == ZEROVAL) {
        napi_create_int32(env, SUCCESS, &result);
    } else {
        napi_create_int32(env, FAIL, &result);
    }
    OH_Drawing_DestroyTypography(typography);
    OH_Drawing_DestroyTypographyHandler(handler);
    return result;
}

static napi_value GetCanvasResult(napi_env env, OH_Drawing_Canvas *canvas)
{
    napi_value result = nullptr;
    if (canvas == nullptr) {
        napi_create_int32(env, FAIL, &result);
    } else {
        napi_create_int32(env, SUCCESS, &result);
    }
    OH_Drawing_CanvasDestroy(canvas);
    return result;
}

static napi_value OHDrawingCanvasCreateBitmap(napi_env env, napi_callback_info info)
{
    OH_Drawing_Canvas *canvas = OH_Drawing_CanvasCreate();
    OH_Drawing_Bitmap *bitmap = OH_Drawing_BitmapCreate();
    OH_Drawing_CanvasBind(canvas, bitmap);
    OH_Drawing_BitmapDestroy(bitmap);
    return GetCanvasResult(env, canvas);
}

static napi_value OHDrawingCanvasCreatePen(napi_env env, napi_callback_info info)
{
    OH_Drawing_Canvas *canvas = OH_Drawing_CanvasCreate();
    OH_Drawing_Pen *pen = OH_Drawing_PenCreate();
    OH_Drawing_CanvasAttachPen(canvas, pen);
    OH_Drawing_PenDestroy(pen);
    return GetCanvasResult(env, canvas);
}

static napi_value OHDrawingCanvasCreateBrush(napi_env env, napi_callback_info info)
{
    OH_Drawing_Canvas *canvas = OH_Drawing_CanvasCreate();
    OH_Drawing_Brush *brush = OH_Drawing_BrushCreate();
    OH_Drawing_CanvasAttachBrush(canvas, brush);
    OH_Drawing_BrushDestroy(brush);
    return GetCanvasResult(env, canvas);
}

static napi_value OHDrawingCanvasCreateSave(napi_env env, napi_callback_info info)
{
    OH_Drawing_Canvas *canvas = OH_Drawing_CanvasCreate();
    OH_Drawing_CanvasSave(canvas);
    OH_Drawing_CanvasRestore(canvas);
    return GetCanvasResult(env, canvas);
}

static napi_value OHDrawingCanvasCreateDrawLine(napi_env env, napi_callback_info info)
{
    OH_Drawing_Canvas *canvas = OH_Drawing_CanvasCreate();
    OH_Drawing_CanvasDrawLine(canvas, POSX_1, POSY_1, POSX_2, POSY_2);
    return GetCanvasResult(env, canvas);
}

static napi_value OHDrawingCanvasCreateDrawPath(napi_env env, napi_callback_info info)
{
    OH_Drawing_Canvas *canvas = OH_Drawing_CanvasCreate();
    OH_Drawing_Path *path = OH_Drawing_PathCreate();
    OH_Drawing_CanvasDrawPath(canvas, path);
    OH_Drawing_PathDestroy(path);
    return GetCanvasResult(env, canvas);
}

static napi_value OHDrawingCanvasCreateClear(napi_env env, napi_callback_info info)
{
    OH_Drawing_Canvas *canvas = OH_Drawing_CanvasCreate();
    OH_Drawing_CanvasClear(canvas, 0xffffffff);
    return GetCanvasResult(env, canvas);
}

static napi_value OHDrawingCanvasCreateDetachPen(napi_env env, napi_callback_info info)
{
    OH_Drawing_Canvas *canvas = OH_Drawing_CanvasCreate();
    OH_Drawing_Pen *pen = OH_Drawing_PenCreate();
    OH_Drawing_CanvasAttachPen(canvas, pen);
    OH_Drawing_CanvasDetachPen(canvas);
    OH_Drawing_PenDestroy(pen);
    return GetCanvasResult(env, canvas);
}

static napi_value OHDrawingCanvasCreateDetachBrush(napi_env env, napi_callback_info info)
{
    OH_Drawing_Canvas *canvas = OH_Drawing_CanvasCreate();
    OH_Drawing_Brush *brush = OH_Drawing_BrushCreate();
    OH_Drawing_CanvasAttachBrush(canvas, brush);
    OH_Drawing_CanvasDetachBrush(canvas);
    OH_Drawing_BrushDestroy(brush);
    return GetCanvasResult(env, canvas);
}

static napi_value GetPathResult(napi_env env, OH_Drawing_Path *path)
{
    napi_value result = nullptr;
    if (path == nullptr) {
        napi_create_int32(env, FAIL, &result);
    } else {
        napi_create_int32(env, SUCCESS, &result);
    }
    OH_Drawing_PathDestroy(path);
    return result;
}

static napi_value OHDrawingPathCreateMoveTo(napi_env env, napi_callback_info info)
{
    OH_Drawing_Path *path = OH_Drawing_PathCreate();
    OH_Drawing_PathMoveTo(path, POSX_1, POSY_1);
    return GetPathResult(env, path);
}

static napi_value OHDrawingPathCreateLineTo(napi_env env, napi_callback_info info)
{
    OH_Drawing_Path *path = OH_Drawing_PathCreate();
    OH_Drawing_PathLineTo(path, POSX_1, POSY_1);
    return GetPathResult(env, path);
}

static napi_value OHDrawingPathCreateArcTo(napi_env env, napi_callback_info info)
{
    OH_Drawing_Path *path = OH_Drawing_PathCreate();
    OH_Drawing_PathArcTo(path, POSX_1, POSY_1, POSX_2, POSY_2, POSX_3, POSY_3);
    return GetPathResult(env, path);
}
static napi_value OHDrawingPathCreateQuadTo(napi_env env, napi_callback_info info)
{
    OH_Drawing_Path *path = OH_Drawing_PathCreate();
    OH_Drawing_PathQuadTo(path, POSX_1, POSY_1, POSX_2, POSY_2);
    return GetPathResult(env, path);
}
static napi_value OHDrawingPathCreateCubicTo(napi_env env, napi_callback_info info)
{
    OH_Drawing_Path *path = OH_Drawing_PathCreate();
    OH_Drawing_PathCubicTo(path, POSX_1, POSY_1, POSX_2, POSY_2, POSX_3, POSY_3);
    return GetPathResult(env, path);
}
static napi_value OHDrawingPathCreateClose(napi_env env, napi_callback_info info)
{
    OH_Drawing_Path *path = OH_Drawing_PathCreate();
    OH_Drawing_PathClose(path);
    return GetPathResult(env, path);
}
static napi_value OHDrawingPathCreateReset(napi_env env, napi_callback_info info)
{
    OH_Drawing_Path *path = OH_Drawing_PathCreate();
    OH_Drawing_PathReset(path);
    return GetPathResult(env, path);
}

static napi_value OHDrawingCreateTypographyPaint(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_Drawing_TypographyStyle *typoStyle = OH_Drawing_CreateTypographyStyle();
    OH_Drawing_FontCollection *fontCollection = OH_Drawing_CreateFontCollection();
    OH_Drawing_TypographyCreate *handler = OH_Drawing_CreateTypographyHandler(typoStyle, fontCollection);
    OH_Drawing_Typography *typographyStyle = OH_Drawing_CreateTypography(handler);
    OH_Drawing_Canvas *canvas = OH_Drawing_CanvasCreate();
    OH_Drawing_TypographyPaint(typographyStyle, canvas, POSX_1, POSY_1);
    if (typoStyle == nullptr) {
        napi_create_int32(env, FAIL, &result);
    } else {
        napi_create_int32(env, SUCCESS, &result);
    }
    OH_Drawing_DestroyTypographyHandler(handler);
    OH_Drawing_DestroyTypographyStyle(typoStyle);
    OH_Drawing_DestroyFontCollection(fontCollection);
    OH_Drawing_CanvasDestroy(canvas);
    return result;
}

EXTERN_C_START
static napi_value Init(napi_env env, napi_value exports)
{
    napi_property_descriptor desc[] = {
        {"oHDrawingBitmapCreate", nullptr, OHDrawingBitmapCreate, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHDrawingBitmapBuild", nullptr, OHDrawingBitmapBuild, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHDrawingBitmapGetWidth", nullptr, OHDrawingBitmapGetWidth, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHDrawingBitmapGetHeight", nullptr, OHDrawingBitmapGetHeight, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingBitmapGetPixels", nullptr, OHDrawingBitmapGetPixels, nullptr, nullptr, nullptr, napi_default,
         nullptr},

        {"oHDrawingBrushCreate", nullptr, OHDrawingBrushCreate, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHDrawingBrushIsAntiAlias", nullptr, OHDrawingBrushIsAntiAlias, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingBrushSetAntiAlias", nullptr, OHDrawingBrushSetAntiAlias, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingBrushGetColor", nullptr, OHDrawingBrushGetColor, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHDrawingBrushSetColor", nullptr, OHDrawingBrushSetColor, nullptr, nullptr, nullptr, napi_default, nullptr},

        {"oHDrawingCanvasCreate", nullptr, OHDrawingCanvasCreate, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHDrawingPathCreate", nullptr, OHDrawingPathCreate, nullptr, nullptr, nullptr, napi_default, nullptr},

        {"oHDrawingPenCreate", nullptr, OHDrawingPenCreate, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHDrawingPenIsAntiAlias", nullptr, OHDrawingPenIsAntiAlias, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHDrawingPenSetAntiAlias", nullptr, OHDrawingPenSetAntiAlias, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingPenGetColor", nullptr, OHDrawingPenGetColor, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHDrawingPenSetColor", nullptr, OHDrawingPenSetColor, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHDrawingPenGetWidth", nullptr, OHDrawingPenGetWidth, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHDrawingPenSetWidth", nullptr, OHDrawingPenSetWidth, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHDrawingPenGetMiterLimit", nullptr, OHDrawingPenGetMiterLimit, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingPenSetMiterLimit", nullptr, OHDrawingPenSetMiterLimit, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingPenGetCap", nullptr, OHDrawingPenGetCap, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHDrawingPenSetCap", nullptr, OHDrawingPenSetCap, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHDrawingPenGetJoin", nullptr, OHDrawingPenGetJoin, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHDrawingPenSetJoin", nullptr, OHDrawingPenSetJoin, nullptr, nullptr, nullptr, napi_default, nullptr},

        {"oHDrawingColorSetArgb", nullptr, OHDrawingColorSetArgb, nullptr, nullptr, nullptr, napi_default, nullptr},

        {"oHDrawingCreateFontCollection", nullptr, OHDrawingCreateFontCollection, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingCreateTypographyStyle", nullptr, OHDrawingCreateTypographyStyle, nullptr, nullptr, nullptr,
         napi_default, nullptr},

        {"oHDrawingCreateTextStyle", nullptr, OHDrawingCreateTextStyle, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingCreateTypographyHandler", nullptr, OHDrawingCreateTypographyHandler, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingCreateTypography", nullptr, OHDrawingCreateTypography, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingTypographyLayout", nullptr, OHDrawingTypographyLayout, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingTypographyGetMaxWidth", nullptr, OHDrawingTypographyGetMaxWidth, nullptr, nullptr, nullptr,
         napi_default, nullptr},

        {"oHDrawingTypographyGetMinIntrinsicWidth", nullptr, OHDrawingTypographyGetMinIntrinsicWidth, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"oHDrawingTypographyGetMaxIntrinsicWidth", nullptr, OHDrawingTypographyGetMaxIntrinsicWidth, nullptr, nullptr,
         nullptr, napi_default, nullptr},

        {"oHDrawingTypographyGetLongestLine", nullptr, OHDrawingTypographyGetLongestLine, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingTypographyGetLongestLineAbnormal", nullptr, OHDrawingTypographyGetLongestLineAbnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},

        {"oHDrawingTypographyGetAlphabeticBaseline", nullptr, OHDrawingTypographyGetAlphabeticBaseline, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHDrawingTypographyGetAlphabeticBaselineNormal", nullptr, OHDrawingTypographyGetAlphabeticBaselineNormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},

        {"oHDrawingTypographyGetIdeographicBaseline", nullptr, OHDrawingTypographyGetIdeographicBaseline, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHDrawingTypographyGetIdeographicBaselineNormal", nullptr, OHDrawingTypographyGetIdeographicBaselineNormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},

        {"oHDrawingTypographyGetHeight", nullptr, OHDrawingTypographyGetHeight, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingTypographyGetHeightAbnormal", nullptr, OHDrawingTypographyGetHeightAbnormal, nullptr, nullptr,
         nullptr, napi_default, nullptr},

        {"oHDrawingPenGetCapNormal", nullptr, OHDrawingPenGetCapNormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingPenSetCapNormal", nullptr, OHDrawingPenSetCapNormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingPenGetJoinNormal", nullptr, OHDrawingPenGetJoinNormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingPenSetJoinNormal", nullptr, OHDrawingPenSetJoinNormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},

        {"oHDrawingPenIsAntiAliasNormal", nullptr, OHDrawingPenIsAntiAliasNormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingPenSetAntiAliasNormal", nullptr, OHDrawingPenSetAntiAliasNormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},

        {"oHDrawingBitmapBuildNormal", nullptr, OHDrawingBitmapBuildNormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingBitmapGetWidthNormal", nullptr, OHDrawingBitmapGetWidthNormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingBitmapGetHeightNormal", nullptr, OHDrawingBitmapGetHeightNormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingBitmapGetPixelsNormal", nullptr, OHDrawingBitmapGetPixelsNormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},

        {"oHDrawingBrushIsAntiAliasNormal", nullptr, OHDrawingBrushIsAntiAliasNormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingBrushSetAntiAliasNormal", nullptr, OHDrawingBrushSetAntiAliasNormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},

        {"oHDrawingBrushGetColorNormal", nullptr, OHDrawingBrushGetColorNormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingBrushSetColorNormal", nullptr, OHDrawingBrushSetColorNormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingPenGetColorNormal", nullptr, OHDrawingPenGetColorNormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingPenSetColorNormal", nullptr, OHDrawingPenSetColorNormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingPenGetWidthNormal", nullptr, OHDrawingPenGetWidthNormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingPenSetWidthNormal", nullptr, OHDrawingPenSetWidthNormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingPenGetMiterLimitNormal", nullptr, OHDrawingPenGetMiterLimitNormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingPenSetMiterLimitNormal", nullptr, OHDrawingPenSetMiterLimitNormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingColorSetArgbNormal", nullptr, OHDrawingColorSetArgbNormal, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingTypographyLayoutNormal", nullptr, OHDrawingTypographyLayoutNormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingTypographyGetMaxWidthNormal", nullptr, OHDrawingTypographyGetMaxWidthNormal, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"oHDrawingTypographyGetMinIntrinsicWidthNormal", nullptr, OHDrawingTypographyGetMinIntrinsicWidthNormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHDrawingTypographyGetMaxIntrinsicWidthNormal", nullptr, OHDrawingTypographyGetMaxIntrinsicWidthNormal,
         nullptr, nullptr, nullptr, napi_default, nullptr},

        {"oHDrawingCreateTypographyStyleAnormal", nullptr, OHDrawingCreateTypographyStyleAnormal, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"oHDrawingCreateTypographyStyleBnormal", nullptr, OHDrawingCreateTypographyStyleBnormal, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"oHDrawingCreateTypographyStyleCnormal", nullptr, OHDrawingCreateTypographyStyleCnormal, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"oHDrawingCreateTypographyStyleDnormal", nullptr, OHDrawingCreateTypographyStyleDnormal, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"oHDrawingCreateTypographyStyleEnormal", nullptr, OHDrawingCreateTypographyStyleEnormal, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"oHDrawingCreateTypographyStyleFnormal", nullptr, OHDrawingCreateTypographyStyleFnormal, nullptr, nullptr,
         nullptr, napi_default, nullptr},

        {"oHDrawingCreateTextStyleAnormal", nullptr, OHDrawingCreateTextStyleAnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingCreateTextStyleBnormal", nullptr, OHDrawingCreateTextStyleBnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingCreateTextStyleCnormal", nullptr, OHDrawingCreateTextStyleCnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingCreateTextStyleDnormal", nullptr, OHDrawingCreateTextStyleDnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingCreateTextStyleEnormal", nullptr, OHDrawingCreateTextStyleEnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingCreateTextStyleFnormal", nullptr, OHDrawingCreateTextStyleFnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingCreateTextStyleGnormal", nullptr, OHDrawingCreateTextStyleGnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingCreateTextStyleHnormal", nullptr, OHDrawingCreateTextStyleHnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingCreateTextStyleInormal", nullptr, OHDrawingCreateTextStyleInormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingCreateTextStyleJnormal", nullptr, OHDrawingCreateTextStyleJnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingCreateTextStyleKnormal", nullptr, OHDrawingCreateTextStyleKnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingCreateTextStyleLnormal", nullptr, OHDrawingCreateTextStyleLnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingCreateTextStyleMnormal", nullptr, OHDrawingCreateTextStyleMnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingCreateTextStyleNnormal", nullptr, OHDrawingCreateTextStyleNnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingCreateTextStyleOnormal", nullptr, OHDrawingCreateTextStyleOnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingCreateTextStylePnormal", nullptr, OHDrawingCreateTextStylePnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingCreateTextStyleQnormal", nullptr, OHDrawingCreateTextStyleQnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingCreateTextStyleRnormal", nullptr, OHDrawingCreateTextStyleRnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingCreateTextStyleSnormal", nullptr, OHDrawingCreateTextStyleSnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingCreateTextStyleTnormal", nullptr, OHDrawingCreateTextStyleTnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},

        {"oHDrawingTypographyHandlerAddText", nullptr, OHDrawingTypographyHandlerAddText, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingTypographyHandlerAddTextAanormal", nullptr, OHDrawingTypographyHandlerAddTextAanormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHDrawingCanvasCreateBitmap", nullptr, OHDrawingCanvasCreateBitmap, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingCanvasCreatePen", nullptr, OHDrawingCanvasCreatePen, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingCanvasCreateBrush", nullptr, OHDrawingCanvasCreateBrush, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingCanvasCreateSave", nullptr, OHDrawingCanvasCreateSave, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingCanvasCreateDrawLine", nullptr, OHDrawingCanvasCreateDrawLine, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingCanvasCreateDrawPath", nullptr, OHDrawingCanvasCreateDrawPath, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingCanvasCreateClear", nullptr, OHDrawingCanvasCreateClear, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingCanvasCreateDetachPen", nullptr, OHDrawingCanvasCreateDetachPen, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHDrawingCanvasCreateDetachBrush", nullptr, OHDrawingCanvasCreateDetachBrush, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"ohDrawingPathCreateMoveTo", nullptr, OHDrawingPathCreateMoveTo, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"ohDrawingPathCreateLineTo", nullptr, OHDrawingPathCreateLineTo, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"ohDrawingPathCreateArcTo", nullptr, OHDrawingPathCreateArcTo, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"ohDrawingPathCreateQuadTo", nullptr, OHDrawingPathCreateQuadTo, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"ohDrawingPathCreateCubicTo", nullptr, OHDrawingPathCreateCubicTo, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"ohDrawingPathCreateClose", nullptr, OHDrawingPathCreateClose, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"ohDrawingPathCreateReset", nullptr, OHDrawingPathCreateReset, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHDrawingCreateTypographyPaint", nullptr, OHDrawingCreateTypographyPaint, nullptr, nullptr, nullptr,
         napi_default, nullptr},
    };
    napi_define_properties(env, exports, sizeof(desc) / sizeof(desc[0]), desc);
    return exports;
}

EXTERN_C_END

static napi_module demoModule = {
    .nm_version = 1,
    .nm_flags = 0,
    .nm_filename = nullptr,
    .nm_register_func = Init,
    .nm_modname = "nativeDrawing",
    .nm_priv = ((void *)0),
    .reserved = {0},
};

extern "C" __attribute__((constructor)) void RegisterEntryModule(void) { napi_module_register(&demoModule); }
