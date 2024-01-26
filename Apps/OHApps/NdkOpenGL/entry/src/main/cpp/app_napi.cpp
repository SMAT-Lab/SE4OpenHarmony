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

#include <cstdio>
#include <js_native_api.h>
#include <js_native_api_types.h>
#include <cstdint>

#include "native_common.h"
#include "log.h"
#include "napi_manager.h"

#include "tetrahedron.h"
#include "app_napi.h"

std::unordered_map<std::string, AppNapi*> AppNapi::instance_;
OH_NativeXComponent_Callback AppNapi::callback_;
static Tetrahedron *tetrahedron_;

uint32_t AppNapi::isCreated_ = 0;
uint32_t AppNapi::xcHeight_ = 0;
uint32_t AppNapi::xcWidth_ = 0;
double AppNapi::off_x = 0;
double AppNapi::off_y = 0;
uint32_t AppNapi::toolType_ = 5;
uint32_t AppNapi::mousecallback_ = 0;
float AppNapi::tiltX_ = 0;
float AppNapi::tiltY_ = 0;
uint32_t AppNapi::touchType = 4;
OH_NativeXComponent_TouchEvent AppNapi::testTouchEvent_;
OH_NativeXComponent_MouseEvent AppNapi::testMouseEvent_;
OH_NativeXComponent_MouseEvent_Callback AppNapi::mouseEventcallback_;

Tetrahedron *AppNapi::getTetrahedron(void)
{
    return tetrahedron_;
}

static int Normalize(int angle)
{
    int ret = angle % CIRCUMFERENCE_DEGREE;
    if (ret < 0) {
        ret += CIRCUMFERENCE_DEGREE;
    }

    return ret;
}

static void OnSurfaceCreatedCB(OH_NativeXComponent* component, void* window)
{
    LOGE("OnSurfaceCreatedCB");
    int32_t ret;
    char idStr[OH_XCOMPONENT_ID_LEN_MAX + 1] = {};
    uint64_t idSize = OH_XCOMPONENT_ID_LEN_MAX + 1;
    ret = OH_NativeXComponent_GetXComponentId(component, idStr, &idSize);
    if (ret != OH_NATIVEXCOMPONENT_RESULT_SUCCESS) {
        return;
    }

    std::string id(idStr);
    auto instance = AppNapi::GetInstance(id);
    instance->OnSurfaceCreated(component, window);
}

static void OnSurfaceChangedCB(OH_NativeXComponent* component, void* window)
{
    int32_t ret;
    char idStr[OH_XCOMPONENT_ID_LEN_MAX + 1] = {};
    uint64_t idSize = OH_XCOMPONENT_ID_LEN_MAX + 1;
    ret = OH_NativeXComponent_GetXComponentId(component, idStr, &idSize);
    if (ret != OH_NATIVEXCOMPONENT_RESULT_SUCCESS) {
        return;
    }

    std::string id(idStr);
    auto instance = AppNapi::GetInstance(id);
    instance->OnSurfaceChanged(component, window);
}

static void OnSurfaceDestroyedCB(OH_NativeXComponent* component, void* window)
{
    int32_t ret;
    char idStr[OH_XCOMPONENT_ID_LEN_MAX + 1] = {};
    uint64_t idSize = OH_XCOMPONENT_ID_LEN_MAX + 1;
    ret = OH_NativeXComponent_GetXComponentId(component, idStr, &idSize);
    if (ret != OH_NATIVEXCOMPONENT_RESULT_SUCCESS) {
        return;
    }

    std::string id(idStr);
    auto instance = AppNapi::GetInstance(id);
    tetrahedron_->Quit();
    instance->OnSurfaceDestroyed(component, window);
}

static void DispatchTouchEventCB(OH_NativeXComponent* component, void* window)
{
    LOGE("DispatchTouchEventCB");
    int32_t ret;
    char idStr[OH_XCOMPONENT_ID_LEN_MAX + 1] = {};
    uint64_t idSize = OH_XCOMPONENT_ID_LEN_MAX + 1;
    ret = OH_NativeXComponent_GetXComponentId(component, idStr, &idSize);
    if (ret != OH_NATIVEXCOMPONENT_RESULT_SUCCESS) {
        return;
    }
    std::string id(idStr);
    auto instance = AppNapi::GetInstance(id);
    instance->DispatchTouchEvent(component, window);
}

static void DispatchMouseEventCB(OH_NativeXComponent* component, void* window)
{
    LOGD("DispatchMouseEventCB");
    int32_t ret;
    char idStr[OH_XCOMPONENT_ID_LEN_MAX + 1] = {};
    uint64_t idSize = OH_XCOMPONENT_ID_LEN_MAX + 1;
    ret = OH_NativeXComponent_GetXComponentId(component, idStr, &idSize);
    if (ret != OH_NATIVEXCOMPONENT_RESULT_SUCCESS) {
        return;
    }
    std::string id(idStr);
    auto instance = AppNapi::GetInstance(id);
    instance->DispatchMouseEvent(component, window);
}

AppNapi::AppNapi(std::string& id)
{
    id_ = id;
    component_ = nullptr;
    auto appCallback = AppNapi::GetNXComponentCallback();
    appCallback->OnSurfaceCreated = OnSurfaceCreatedCB;
    appCallback->OnSurfaceChanged = OnSurfaceChangedCB;
    appCallback->OnSurfaceDestroyed = OnSurfaceDestroyedCB;
    appCallback->DispatchTouchEvent = DispatchTouchEventCB;
    auto appMouseEventCallback = AppNapi::GetNXComponentMouseEventCallback();
    appMouseEventCallback->DispatchMouseEvent = DispatchMouseEventCB;
    
    tetrahedron_ = new Tetrahedron(id);
}

AppNapi* AppNapi::GetInstance(std::string& id)
{
    if (instance_.find(id) == instance_.end()) {
        AppNapi*  instance = new AppNapi(id);
        instance_[id] = instance;
        return instance;
    } else {
        return instance_[id];
    }
}

OH_NativeXComponent_Callback* AppNapi::GetNXComponentCallback()
{
    return &AppNapi::callback_;
}

OH_NativeXComponent_MouseEvent_Callback* AppNapi::GetNXComponentMouseEventCallback()
{
    return &AppNapi::mouseEventcallback_;
}

void AppNapi::SetNativeXComponent(OH_NativeXComponent* component)
{
    component_ = component;
    OH_NativeXComponent_RegisterCallback(component_, &AppNapi::callback_);
    uint32_t mousecallback = OH_NativeXComponent_RegisterMouseEventCallback(component_,
        &AppNapi::mouseEventcallback_);
    mousecallback_ = mousecallback;
}

void AppNapi::OnSurfaceCreated(OH_NativeXComponent* component, void* window)
{
    LOGE("AppNapi::OnSurfaceCreated");

    int32_t ret = OH_NativeXComponent_GetXComponentSize(component, window, &width_, &height_);

    LOGE("Offset : x = %{public}f, y = %{public}f ", x_, y_);
    if (ret == OH_NATIVEXCOMPONENT_RESULT_SUCCESS) {
        tetrahedron_->Init(window, width_, height_);
        tetrahedron_->Update(angleX_, angleY_);
        isCreated_++;
        xcHeight_ = height_;
        xcWidth_ = width_;

        LOGE("AppNapi::OnSurfaceCreated success ");
    } else {
        LOGE("AppNapi::OnSurfaceCreated failed");
    }
}

void AppNapi::OnSurfaceChanged(OH_NativeXComponent* component, void* window)
{
    LOGE("AppNapi::OnSurfaceChanged");
    int32_t ret = OH_NativeXComponent_GetXComponentSize(component, window, &width_, &height_);
    int32_t ret1;
    if (ret == OH_NATIVEXCOMPONENT_RESULT_SUCCESS) {
        xcHeight_ = height_;
        xcWidth_ = width_;
        LOGE("after width = %{public}d, height = %{public}d", xcWidth_, xcHeight_);
        ret1= OH_NativeXComponent_GetXComponentOffset(component, window, &x_, &y_);
        off_x = x_;
        off_y = y_;

        if (ret1 == OH_NATIVEXCOMPONENT_RESULT_SUCCESS) {
            LOGE("Offset : x = %{public}lf, y = %{public}lf ", off_x, off_y);
        } else {
            LOGE("Offset get failed");
        }

        LOGE("AppNapi::GetOffset ");
        LOGE("Offset : x = %{public}lf, y = %{public}lf ", off_x, off_y);
    }
}

void AppNapi::OnSurfaceDestroyed(OH_NativeXComponent* component, void* window)
{
    LOGE("AppNapi::OnSurfaceDestroyed");
    isCreated_--;
    LOGE("AppNapi::OnSurfaceDestroyed iscreated %{public}d", isCreated_);
}

void AppNapi::DispatchTouchEvent(OH_NativeXComponent* component, void* window)
{
    int32_t ret = OH_NativeXComponent_GetTouchEvent(component, window, &touchEvent_);
    if (ret == OH_NATIVEXCOMPONENT_RESULT_SUCCESS) {
        testTouchEvent_ = touchEvent_;
        LOGE("Touch Info : x = %{public}f, y = %{public}f screenx = %{public}f, screeny = %{public}f",
            touchEvent_.x, touchEvent_.y, touchEvent_.screenX, touchEvent_.screenY);
        for (uint32_t i = 0; i < touchEvent_.numPoints; i++) {
            LOGE("Touch Info : dots[%{public}d] id %{public}d x = %{public}f, y = %{public}f", i,
                touchEvent_.touchPoints[i].id, touchEvent_.touchPoints[i].x, touchEvent_.touchPoints[i].y);
            LOGE("Touch Info : screenx = %{public}f, screeny = %{public}f",
                touchEvent_.touchPoints[i].screenX, touchEvent_.touchPoints[i].screenY);
            OH_NativeXComponent_TouchPointToolType toolType;
            float tiltX = 123.0;
            float tiltY = 321.0;
            int32_t ret1;
            int32_t ret2;
            int32_t ret3;
            ret1 = OH_NativeXComponent_GetTouchPointToolType(component, i, &toolType);
            ret2 = OH_NativeXComponent_GetTouchPointTiltX(component, i, &tiltX);
            ret3 = OH_NativeXComponent_GetTouchPointTiltY(component, i, &tiltY);
            toolType_ = toolType;
            tiltX_ = tiltX;
            tiltY_ = tiltY;
            LOGE("Touch Info : [%{public}d] %{public}u, %{public}f, %{public}f",
                i, toolType, tiltX, tiltY);
        }
    } else {
        LOGE("Touch fail");
    }
}

void AppNapi::DispatchMouseEvent(OH_NativeXComponent* component, void* window)
{
    int32_t ret = OH_NativeXComponent_GetMouseEvent(component, window, &mouseEvent_);
    LOGE("Mouse Info DispatchMouseEvent");
    if (ret == OH_NATIVEXCOMPONENT_RESULT_SUCCESS) {
        testMouseEvent_ = mouseEvent_;
        LOGE("Mouse Info : x = %{public}f, y = %{public}f screenx = %{public}f, screeny = %{public}f",
            mouseEvent_.x, mouseEvent_.y, mouseEvent_.screenX, mouseEvent_.screenY);
        LOGE("Mouse Info : action = %{public}d, button = %{public}d", mouseEvent_.action, mouseEvent_.button);
    } else {
        LOGE("Mouse Info fail");
    }
}

napi_value AppNapi::UpdateAngle(napi_env env, napi_callback_info info)
{
    LOGE("Update");
    size_t requireArgc = 2;
    size_t argc = 2;
    int speed = 3;
    napi_value args[2] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    napi_valuetype valuetype0;
    napi_typeof(env, args[0], &valuetype0);

    napi_valuetype valuetype1;
    napi_typeof(env, args[1], &valuetype1);

    double offsetX;
    napi_get_value_double(env, args[0], &offsetX);

    double offsetY;
    napi_get_value_double(env, args[1], &offsetY);

    float tetrahedron_angleX = tetrahedron_->GetAngleX();
    float tetrahedron_angleY = tetrahedron_->GetAngleY();

    if (offsetY < 0) {
        tetrahedron_angleX = tetrahedron_angleX + speed;
    } else {
        tetrahedron_angleX = tetrahedron_angleX - speed;
    }

    if (offsetX < 0) {
        tetrahedron_angleY = tetrahedron_angleY + speed;
    } else {
        tetrahedron_angleY = tetrahedron_angleY - speed;
    }

    tetrahedron_angleY = Normalize(tetrahedron_angleY);
    tetrahedron_angleX = Normalize(tetrahedron_angleX);
    tetrahedron_->Update(tetrahedron_angleX, tetrahedron_angleY);

    napi_value ret;
    napi_create_array(env, &ret);

    napi_value num;
    napi_create_int32(env, tetrahedron_angleX, &num);
    napi_set_element(env, ret, 0, num);
    napi_create_int32(env, tetrahedron_angleY, &num);
    napi_set_element(env, ret, 1, num);

    return ret;
}

napi_value AppNapi::Quit(napi_env env, napi_callback_info info)
{
    LOGE("AppNapi -> Quit");
    napi_value exportInstance;
    napi_value thisArg;
    napi_status status;
    OH_NativeXComponent *nativeXComponent = nullptr;

    int32_t ret;
    char idStr[OH_XCOMPONENT_ID_LEN_MAX + 1] = {};
    uint64_t idSize = OH_XCOMPONENT_ID_LEN_MAX + 1;

    tetrahedron_->Quit();

    NAPI_CALL(env, napi_get_cb_info(env, info, NULL, NULL, &thisArg, NULL));

    status = napi_get_named_property(env, thisArg, OH_NATIVE_XCOMPONENT_OBJ, &exportInstance);
    if (status != napi_ok) {
        return nullptr;
    }

    status = napi_unwrap(env, exportInstance, reinterpret_cast<void**>(&nativeXComponent));
    if (status != napi_ok) {
        return nullptr;
    }

    ret = OH_NativeXComponent_GetXComponentId(nativeXComponent, idStr, &idSize);
    if (ret != OH_NATIVEXCOMPONENT_RESULT_SUCCESS) {
        return nullptr;
    }

    return 0;
}

napi_value AppNapi::GetXComponentId(napi_env env, napi_callback_info info)
{
    napi_value thisArg;
    napi_status status;
    napi_value exportInstance;
    OH_NativeXComponent *nativeXComponent = nullptr;

    int32_t ret;
    char idStr[OH_XCOMPONENT_ID_LEN_MAX + 1] = {};
    uint64_t idSize = OH_XCOMPONENT_ID_LEN_MAX + 1;

    NAPI_CALL(env, napi_get_cb_info(env, info, NULL, NULL, &thisArg, NULL));
    status = napi_get_named_property(env, thisArg, OH_NATIVE_XCOMPONENT_OBJ, &exportInstance);
    status = napi_unwrap(env, exportInstance, reinterpret_cast<void**>(&nativeXComponent));
    ret = OH_NativeXComponent_GetXComponentId(nativeXComponent, idStr, &idSize);
    if (ret != OH_NATIVEXCOMPONENT_RESULT_SUCCESS) {
        return nullptr;
    }

    std::string id(idStr);

    napi_value output;
    NAPI_CALL(env, napi_create_string_utf8(env, idStr, id.length(), &output));

    return output;
}

napi_value AppNapi::GetXComponentSize_Height(napi_env env, napi_callback_info info)
{
    LOGE("running AppNapi::GetXComponentSize_Height");
    napi_value output;
    NAPI_CALL(env, napi_create_uint32(env, xcHeight_, &output));
    LOGE(" GetXComponentSize_Height %{public}d ", xcHeight_);
    return output;
}

napi_value AppNapi::GetXComponentSize_Width(napi_env env, napi_callback_info info)
{
    LOGE("running AppNapi::GetXComponentSize_Width");
    napi_value output;
    NAPI_CALL(env, napi_create_uint32(env, xcWidth_, &output));
    LOGE(" GetXComponentSize_Width %{public}d ", xcWidth_);
    return output;
}

napi_value AppNapi::GetXComponentOffset_x(napi_env env, napi_callback_info info)
{
    LOGE("running AppNapi::GetXComponentOffset_x");

    napi_value output;
    NAPI_CALL(env, napi_create_double(env, off_x, &output));
    LOGE("GetXComponentOffset_x : %{public}f", off_x);

    return output;
}

napi_value AppNapi::GetXComponentOffset_y(napi_env env, napi_callback_info info)
{
    LOGE("running AppNapi::GetXComponentOffset_y");

    napi_value output;
    NAPI_CALL(env, napi_create_double(env, off_y, &output));
    LOGE("GetXComponentOffset_y : %{public}f", off_y);

    return output;
}

napi_value AppNapi::GetXComponentpointtool_tiltx(napi_env env, napi_callback_info info)
{
    LOGE("running AppNapi::GetXComponentpointtool_tiltx");

    napi_value output;
    NAPI_CALL(env, napi_create_double(env, tiltX_, &output));
    LOGE("GetXComponentpointtool_tiltx : %{public}f", tiltX_);

    return output;
}

napi_value AppNapi::GetXComponentpointtool_tilty(napi_env env, napi_callback_info info)
{
    LOGE("running AppNapi::GetXComponentpointtool_tilty");

    napi_value output;
    NAPI_CALL(env, napi_create_double(env, tiltY_, &output));
    LOGE("GetXComponentpointtool_tilty : %{public}f", tiltY_);

    return output;
}

napi_value AppNapi::GetXComponentpointtool_type(napi_env env, napi_callback_info info)
{
    LOGE("running AppNapi::GetXComponentpointtool_type");

    napi_value output;
    NAPI_CALL(env, napi_create_double(env, toolType_, &output));
    LOGE("GetXComponentpointtool_type : %{public}u", toolType_);

    return output;
}

napi_value AppNapi::GetXComponent_TouchEvent(napi_env env, napi_callback_info info)
{
    LOGE("running AppNapi::GetXComponent_TouchEvent");

    napi_value surf_x;
    napi_value surf_y;
    napi_value t_type;

    NAPI_CALL(env, napi_create_double(env, testTouchEvent_.x, &(surf_x)));
    NAPI_CALL(env, napi_create_double(env, testTouchEvent_.y, &(surf_y)));
    NAPI_CALL(env, napi_create_uint32(env, testTouchEvent_.type, &(t_type)));

    napi_value obj;
    NAPI_CALL(env, napi_create_object(env, &obj));
    NAPI_CALL(env, napi_set_named_property(env, obj, "surface_X", surf_x));
    NAPI_CALL(env, napi_set_named_property(env, obj, "surface_Y", surf_y));
    NAPI_CALL(env, napi_set_named_property(env, obj, "touchType", t_type));

    return obj;
}

napi_value AppNapi::GetXComponent_MouseEvent(napi_env env, napi_callback_info info)
{
    LOGE("running AppNapi::GetXComponent_MouseEvent");

    napi_value surf_x;
    napi_value surf_y;
    napi_value t_button;

    NAPI_CALL(env, napi_create_double(env, testMouseEvent_.x, &(surf_x)));
    NAPI_CALL(env, napi_create_double(env, testMouseEvent_.y, &(surf_y)));
    NAPI_CALL(env, napi_create_uint32(env, testMouseEvent_.button, &(t_button)));

    napi_value obj;
    NAPI_CALL(env, napi_create_object(env, &obj));
    NAPI_CALL(env, napi_set_named_property(env, obj, "surface_X1", surf_x));  // float x
    NAPI_CALL(env, napi_set_named_property(env, obj, "surface_Y1", surf_y));  // float y
    NAPI_CALL(env, napi_set_named_property(env, obj, "mousebutton", t_button));  // int32_t

    return obj;
}

napi_value AppNapi::GetXComponent_RegisterMouseEventCallback(napi_env env, napi_callback_info info)
{
    LOGE("running AppNapi::GetXComponent_RegisterMouseEventCallback");

    napi_value callback_;
    NAPI_CALL(env, napi_create_double(env, mousecallback_, &(callback_)));

    napi_value obj;
    NAPI_CALL(env, napi_create_object(env, &obj));
    NAPI_CALL(env, napi_set_named_property(env, obj, "MouseCallback_", callback_));  // float x

    return obj;
}

napi_value AppNapi::Export(napi_env env, napi_value exports)
{
    LOGE("AppNapi::Export");
    // Register NAPI
    napi_property_descriptor desc[] = {
        DECLARE_NAPI_FUNCTION("Quit", AppNapi::Quit),
        DECLARE_NAPI_FUNCTION("GetXComponentId", AppNapi::GetXComponentId),
        DECLARE_NAPI_FUNCTION("GetXComponentSize_Height", AppNapi::GetXComponentSize_Height),
        DECLARE_NAPI_FUNCTION("GetXComponentSize_Width", AppNapi::GetXComponentSize_Width),
        DECLARE_NAPI_FUNCTION("GetXComponentOffset_x", AppNapi::GetXComponentOffset_x),
        DECLARE_NAPI_FUNCTION("GetXComponentOffset_y", AppNapi::GetXComponentOffset_y),
        DECLARE_NAPI_FUNCTION("GetXComponent_TouchEvent", AppNapi::GetXComponent_TouchEvent),
        DECLARE_NAPI_FUNCTION("GetXComponent_MouseEvent", AppNapi::GetXComponent_MouseEvent),
        DECLARE_NAPI_FUNCTION("GetXComponentpointtool_tilty", AppNapi::GetXComponentpointtool_tilty),
        DECLARE_NAPI_FUNCTION("GetXComponentpointtool_type", AppNapi::GetXComponentpointtool_type),
        DECLARE_NAPI_FUNCTION("GetXComponentpointtool_tiltx", AppNapi::GetXComponentpointtool_tiltx),
        DECLARE_NAPI_FUNCTION("GetXComponent_RegisterMouseEventCallback",
            AppNapi::GetXComponent_RegisterMouseEventCallback),
    };
    NAPI_CALL(env, napi_define_properties(env, exports, sizeof(desc) / sizeof(desc[0]), desc));
    return exports;
}
