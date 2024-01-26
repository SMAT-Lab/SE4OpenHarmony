/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
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

#ifndef SAMPLE_BITMAP_H
#define SAMPLE_BITMAP_H
#include <ace/xcomponent/native_interface_xcomponent.h>
#include <arpa/nameser.h>
#include <native_window/external_window.h>
#include <native_drawing/drawing_bitmap.h>
#include <native_drawing/drawing_color.h>
#include <native_drawing/drawing_canvas.h>
#include <native_drawing/drawing_pen.h>
#include <native_drawing/drawing_brush.h>
#include <native_drawing/drawing_path.h>
#include <cstdint>
#include <string>
#include "napi/native_api.h"

class SampleBitMap {
public:
    SampleBitMap() = default;
    ~SampleBitMap();
    explicit SampleBitMap(std::string id) : id_(id) {}
    static napi_value NapiDrawPattern(napi_env env, napi_callback_info info);
    static void Release(std::string &id);
    void SetWidth(uint64_t width);
    void SetHeight(uint64_t height);
    void SetNativeWindow(OHNativeWindow *nativeWindow);
    void Drawing();
    void Export(napi_env env, napi_value exports);
    void RegisterCallback(OH_NativeXComponent *nativeXComponent);
    void Destroy();
    static SampleBitMap *GetInstance(std::string &id);
    std::string id_;
private:
    OH_NativeXComponent_Callback renderCallback_;

    uint64_t width_ = 0;
    uint64_t height_ = 0;

    OH_Drawing_Bitmap *cBitmap_ = nullptr;
    OH_Drawing_Canvas *cCanvas_ = nullptr;

    OH_Drawing_Path *cPath_ = nullptr;
    OH_Drawing_Brush *cBrush_ = nullptr;
    OH_Drawing_Pen *cPen_ = nullptr;
    OHNativeWindow *nativeWindow_ = nullptr;
    uint32_t *mappedAddr_ = nullptr;
    BufferHandle *bufferHandle_ = nullptr;
    struct NativeWindowBuffer *buffer_ = nullptr;
    int fenceFd_ = 0;
};


#endif
