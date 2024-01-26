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

#ifndef APP_NAPI_H_
#define APP_NAPI_H_

#include <string>
#include <unordered_map>

#include <native_interface_xcomponent.h>
#include <napi/native_api.h>
#include <tetrahedron.h>

#define CIRCUMFERENCE_DEGREE   360

class AppNapi {
public:
    explicit AppNapi(std::string& id);
    static AppNapi* GetInstance(std::string& id);
    static OH_NativeXComponent_Callback* GetNXComponentCallback();
    static OH_NativeXComponent_MouseEvent_Callback* GetNXComponentMouseEventCallback();
    void SetNativeXComponent(OH_NativeXComponent* component);

public:
    // NAPI interface
    napi_value Export(napi_env env, napi_value exports);

    // Exposed to JS developers by NAPI
    static napi_value UpdateAngle(napi_env env, napi_callback_info info);
    static napi_value Quit(napi_env env, napi_callback_info info);

    // xts interfaces
    static napi_value GetXComponentId(napi_env env, napi_callback_info info);
    static napi_value GetXComponentSize_Height(napi_env env, napi_callback_info info);
    static napi_value GetXComponentSize_Width(napi_env env, napi_callback_info info);
    static napi_value GetXComponentOffset_x(napi_env env, napi_callback_info info);
    static napi_value GetXComponentOffset_y(napi_env env, napi_callback_info info);
    static napi_value GetXComponent_TouchEvent(napi_env env, napi_callback_info info);
    static napi_value GetXComponent_MouseEvent(napi_env env, napi_callback_info info);
    static napi_value GetXComponentpointtool_tiltx(napi_env env, napi_callback_info info);
    static napi_value GetXComponentpointtool_tilty(napi_env env, napi_callback_info info);
    static napi_value GetXComponentpointtool_type(napi_env env, napi_callback_info info);
    static napi_value GetXComponent_RegisterMouseEventCallback(napi_env env, napi_callback_info info);

    // Callback, called by ACE XComponent
    void OnSurfaceCreated(OH_NativeXComponent* component, void* window);
    void OnSurfaceChanged(OH_NativeXComponent* component, void* window);
    void OnSurfaceDestroyed(OH_NativeXComponent* component, void* window);
    void DispatchTouchEvent(OH_NativeXComponent* component, void* window);
    void DispatchMouseEvent(OH_NativeXComponent* component, void* window);
    Tetrahedron *getTetrahedron();

public:
    static std::unordered_map<std::string, AppNapi*> instance_;
    static OH_NativeXComponent_Callback callback_;
    static uint32_t isCreated_;
    static uint32_t xcHeight_;
    static uint32_t xcWidth_;
    static uint32_t toolType_;
    static float tiltX_;
    static float tiltY_;
    static uint32_t mousecallback_;
    static double off_x;
    static double off_y;
    static uint32_t touchType;
    static OH_NativeXComponent_TouchEvent testTouchEvent_;
    static OH_NativeXComponent_MouseEvent testMouseEvent_;
    static OH_NativeXComponent_MouseEvent_Callback mouseEventcallback_;

    OH_NativeXComponent* component_;
    std::string id_;
    uint64_t width_;
    uint64_t height_;

    float angleX_ = 30.0;
    float angleY_ = 45.0;
    double x_;
    double y_;
    OH_NativeXComponent_TouchEvent touchEvent_;
    OH_NativeXComponent_MouseEvent mouseEvent_;
};

#endif // APP_NAPI_H_
