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

#include "napi/native_api.h"
#include <EGL/egl.h>
#include <EGL/eglext.h>
#include <GLES3/gl32.h>
#include <cstring>
#include <native_buffer/native_buffer.h>
#include <native_image/native_image.h>
#include <native_window/external_window.h>
#include <sys/mman.h>

#define SUCCESS 0
#define PARAM_0 0
#define PARAM_8 8
#define PARAM_1 1
#define PARAM_16 16
#define PARAM_800 800
#define PARAM_600 600
#define FAIL (-1)
#define ONEVAL 1
#define NUMMAX 16
#define TWOVAL 2
using GetPlatformDisplayExt = PFNEGLGETPLATFORMDISPLAYEXTPROC;
constexpr const char *EGL_EXT_PLATFORM_WAYLAND = "EGL_EXT_platform_wayland";
constexpr const char *EGL_KHR_PLATFORM_WAYLAND = "EGL_KHR_platform_wayland";
constexpr int32_t EGL_CONTEXT_CLIENT_VERSION_NUM = 2;
constexpr char CHARACTER_WHITESPACE = ' ';
constexpr const char *CHARACTER_STRING_WHITESPACE = " ";
constexpr const char *EGL_GET_PLATFORM_DISPLAY_EXT = "eglGetPlatformDisplayEXT";
EGLContext eglContext_ = EGL_NO_CONTEXT;
EGLDisplay eglDisplay_ = EGL_NO_DISPLAY;
static inline EGLConfig config_;

static bool CheckEglExtension(const char *extensions, const char *extension)
{
    size_t extlen = strlen(extension);
    const char *end = extensions + strlen(extensions);

    while (extensions < end) {
        size_t n = PARAM_0;
        if (*extensions == CHARACTER_WHITESPACE) {
            extensions++;
            continue;
        }
        n = strcspn(extensions, CHARACTER_STRING_WHITESPACE);
        if (n == extlen && strncmp(extension, extensions, n) == PARAM_0) {
            return true;
        }
        extensions += n;
    }
    return false;
}

static EGLDisplay GetPlatformEglDisplay(EGLenum platform, void *native_display, const EGLint *attrib_list)
{
    static GetPlatformDisplayExt eglGetPlatformDisplayExt = nullptr;

    if (!eglGetPlatformDisplayExt) {
        const char *extensions = eglQueryString(EGL_NO_DISPLAY, EGL_EXTENSIONS);
        if (extensions && (CheckEglExtension(extensions, EGL_EXT_PLATFORM_WAYLAND) ||
                           CheckEglExtension(extensions, EGL_KHR_PLATFORM_WAYLAND))) {
            eglGetPlatformDisplayExt = (GetPlatformDisplayExt)eglGetProcAddress(EGL_GET_PLATFORM_DISPLAY_EXT);
        }
    }

    if (eglGetPlatformDisplayExt) {
        return eglGetPlatformDisplayExt(platform, native_display, attrib_list);
    }

    return eglGetDisplay((EGLNativeDisplayType)native_display);
}

static void InitEGLEnv()
{
    eglDisplay_ = GetPlatformEglDisplay(EGL_PLATFORM_OHOS_KHR, EGL_DEFAULT_DISPLAY, nullptr);
    EGLint major, minor;
    eglInitialize(eglDisplay_, &major, &minor);
    eglBindAPI(EGL_OPENGL_ES_API);
    unsigned int ret;
    EGLint count;
    EGLint config_attribs[] = {EGL_SURFACE_TYPE, EGL_WINDOW_BIT, EGL_RED_SIZE,        PARAM_8,
                               EGL_GREEN_SIZE,   PARAM_8,        EGL_BLUE_SIZE,       PARAM_8,
                               EGL_ALPHA_SIZE,   PARAM_8,        EGL_RENDERABLE_TYPE, EGL_OPENGL_ES3_BIT,
                               EGL_NONE};

    ret = eglChooseConfig(eglDisplay_, config_attribs, &config_, PARAM_1, &count);
    static const EGLint context_attribs[] = {EGL_CONTEXT_CLIENT_VERSION, EGL_CONTEXT_CLIENT_VERSION_NUM, EGL_NONE};
    eglContext_ = eglCreateContext(eglDisplay_, config_, EGL_NO_CONTEXT, context_attribs);
    eglMakeCurrent(eglDisplay_, EGL_NO_SURFACE, EGL_NO_SURFACE, eglContext_);
}

static OH_NativeImage *getNativeImage()
{
    GLuint textureId = SUCCESS;
    glGenTextures(ONEVAL, &textureId);
    OH_NativeImage *image = OH_NativeImage_Create(textureId, GL_TEXTURE_2D);
    return image;
}
static napi_value OHNativeImageCreate(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    OH_NativeImage *image = getNativeImage();
    int backInfo = FAIL;
    if (image != nullptr) {
        backInfo = SUCCESS;
        OH_NativeImage_Destroy(&image);
    }

    napi_create_int32(env, backInfo, &result);
    return result;
}

static napi_value OHNativeImageAcquireNativeWindow(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backInfo = FAIL;
    OH_NativeImage *image = getNativeImage();

    if (image != nullptr) {
        OHNativeWindow *nativeWindow = OH_NativeImage_AcquireNativeWindow(image);
        if (nativeWindow != nullptr) {
            backInfo = SUCCESS;
        }
        OH_NativeImage_Destroy(&image);
    }
    napi_create_int32(env, backInfo, &result);
    return result;
}

static napi_value OHNativeImageAcquireNativeWindowAbnormal(napi_env env, napi_callback_info info)
{
    napi_value result = nullptr;
    int backInfo = FAIL;
    OHNativeWindow *nativeWindow = OH_NativeImage_AcquireNativeWindow(nullptr);
    if (nativeWindow != nullptr) {
        backInfo = SUCCESS;
    }
    napi_create_int32(env, backInfo, &result);
    return result;
}

static napi_value OHNativeImageAttachContext(napi_env env, napi_callback_info info)
{
    int backInfo = FAIL;
    OH_NativeImage *image = getNativeImage();
    if (image != nullptr) {
        GLuint textureId2;
        glGenTextures(ONEVAL, &textureId2);
        backInfo = OH_NativeImage_AttachContext(image, textureId2);
        OH_NativeImage_Destroy(&image);
    }
    napi_value result = nullptr;
    napi_create_int32(env, backInfo, &result);
    return result;
}

static napi_value OHNativeImageAttachContextAbnormal(napi_env env, napi_callback_info info)
{
    GLuint textureId2;
    glGenTextures(ONEVAL, &textureId2);
    int backInfo = OH_NativeImage_AttachContext(nullptr, textureId2);
    if (backInfo != SUCCESS) {
        backInfo = FAIL;
    }
    napi_value result = nullptr;
    napi_create_int32(env, backInfo, &result);
    return result;
}

static napi_value OHNativeImageDetachContext(napi_env env, napi_callback_info info)
{
    int backInfo = FAIL;
    InitEGLEnv();
    GLuint textureId;
    glGenTextures(PARAM_1, &textureId);
    OH_NativeImage *image = OH_NativeImage_Create(textureId, GL_TEXTURE_2D);
    OHNativeWindow *nativeWindow = OH_NativeImage_AcquireNativeWindow(image);
    int code = SET_BUFFER_GEOMETRY;
    int32_t width = PARAM_800;
    int32_t height = PARAM_600;
    OH_NativeWindow_NativeWindowHandleOpt(nativeWindow, code, width, height);
    OHNativeWindowBuffer *buffer = nullptr;
    int fenceFd;
    OH_NativeWindow_NativeWindowRequestBuffer(nativeWindow, &buffer, &fenceFd);
    BufferHandle *handle = OH_NativeWindow_GetBufferHandleFromNative(buffer);
    void *mappedAddr = mmap(handle->virAddr, handle->size, PROT_READ | PROT_WRITE, MAP_SHARED, handle->fd, PARAM_0);
    static uint32_t value = 0x00;
    value++;
    uint32_t *pixel = static_cast<uint32_t *>(mappedAddr);
    for (uint32_t x = PARAM_0; x < width; x++) {
        for (uint32_t y = PARAM_0; y < height; y++) {
            *pixel++ = value;
        }
    }
    munmap(mappedAddr, handle->size);

    Region region{nullptr, PARAM_0};
    OH_NativeWindow_NativeWindowFlushBuffer(nativeWindow, buffer, fenceFd, region);
    OH_NativeImage_UpdateSurfaceImage(image);
    OH_NativeImage_GetTimestamp(image);
    float matrix[16];
    OH_NativeImage_GetTransformMatrix(image, matrix);
    OH_NativeWindow_DestroyNativeWindow(nativeWindow);
    backInfo = OH_NativeImage_DetachContext(image);
    GLuint textureId2;
    glGenTextures(PARAM_1, &textureId2);
    OH_NativeImage_AttachContext(image, textureId2);
    OH_NativeImage_Destroy(&image);
    napi_value result = nullptr;
    napi_create_int32(env, backInfo, &result);
    return result;
}
static napi_value OHNativeImageDetachContextAbnormal(napi_env env, napi_callback_info info)
{
    int backInfo = OH_NativeImage_DetachContext(nullptr);
    if (backInfo != SUCCESS) {
        backInfo = FAIL;
    }
    napi_value result = nullptr;
    napi_create_int32(env, backInfo, &result);
    return result;
}
static napi_value OHNativeImageUpdateSurfaceImage(napi_env env, napi_callback_info info)
{
    InitEGLEnv();
    GLuint textureId;
    glGenTextures(PARAM_1, &textureId);
    OH_NativeImage *image = OH_NativeImage_Create(textureId, GL_TEXTURE_2D);
    OHNativeWindow *nativeWindow = OH_NativeImage_AcquireNativeWindow(image);
    int code = SET_BUFFER_GEOMETRY;
    int32_t width = PARAM_800;
    int32_t height = PARAM_600;
    OH_NativeWindow_NativeWindowHandleOpt(nativeWindow, code, width, height);
    OHNativeWindowBuffer *buffer = nullptr;
    int fenceFd;
    OH_NativeWindow_NativeWindowRequestBuffer(nativeWindow, &buffer, &fenceFd);
    BufferHandle *handle = OH_NativeWindow_GetBufferHandleFromNative(buffer);
    void *mappedAddr = mmap(handle->virAddr, handle->size, PROT_READ | PROT_WRITE, MAP_SHARED, handle->fd, PARAM_0);
    static uint32_t value = 0x00;
    value++;
    uint32_t *pixel = static_cast<uint32_t *>(mappedAddr);
    for (uint32_t x = PARAM_0; x < width; x++) {
        for (uint32_t y = PARAM_0; y < height; y++) {
            *pixel++ = value;
        }
    }
    munmap(mappedAddr, handle->size);
    Region region{nullptr, PARAM_0};
    OH_NativeWindow_NativeWindowFlushBuffer(nativeWindow, buffer, fenceFd, region);
    int backInfo = OH_NativeImage_UpdateSurfaceImage(image);
    OH_NativeImage_GetTimestamp(image);
    float matrix[16];
    OH_NativeImage_GetTransformMatrix(image, matrix);
    OH_NativeWindow_DestroyNativeWindow(nativeWindow);
    OH_NativeImage_DetachContext(image);
    GLuint textureId2;
    glGenTextures(PARAM_1, &textureId2);
    OH_NativeImage_AttachContext(image, textureId2);
    OH_NativeImage_Destroy(&image);
    napi_value result = nullptr;
    napi_create_int32(env, backInfo, &result);
    return result;
}

static napi_value OHNativeImageUpdateSurfaceImageAbnormal(napi_env env, napi_callback_info info)
{
    int backInfo = OH_NativeImage_UpdateSurfaceImage(nullptr);
    if (backInfo != SUCCESS) {
        backInfo = FAIL;
    }
    napi_value result = nullptr;
    napi_create_int32(env, backInfo, &result);
    return result;
}

static napi_value OHNativeImageGetTimestamp(napi_env env, napi_callback_info info)
{
    int backInfo = FAIL;
    OH_NativeImage *image = getNativeImage();
    if (image != nullptr) {
        backInfo = OH_NativeImage_GetTimestamp(image);
        OH_NativeImage_Destroy(&image);
    }
    napi_value result = nullptr;
    napi_create_int32(env, backInfo, &result);
    return result;
}

static napi_value OHNativeImageGetTransformMatrix(napi_env env, napi_callback_info info)
{
    int backInfo = FAIL;
    OH_NativeImage *image = getNativeImage();
    if (image != nullptr) {
        float matrix[NUMMAX];
        backInfo = OH_NativeImage_GetTransformMatrix(image, matrix);
        OH_NativeImage_Destroy(&image);
    }
    napi_value result = nullptr;
    napi_create_int32(env, backInfo, &result);
    return result;
}

static napi_value OHNativeImageGetTransformMatrixAbnormal(napi_env env, napi_callback_info info)
{
    int backInfo = FAIL;
    float matrix[NUMMAX];
    int ret = OH_NativeImage_GetTransformMatrix(nullptr, matrix);
    if (ret != SUCCESS) {
        backInfo = FAIL;
    }

    napi_value result = nullptr;
    napi_create_int32(env, backInfo, &result);
    return result;
}

static napi_value OHNativeImageDestroy(napi_env env, napi_callback_info info)
{
    int backInfo = FAIL;
    OH_NativeImage *image = getNativeImage();
    OH_NativeImage_Destroy(&image);
    if (image == nullptr) {
        backInfo = SUCCESS;
    }
    napi_value result = nullptr;
    napi_create_int32(env, backInfo, &result);
    return result;
}

EXTERN_C_START
static napi_value Init(napi_env env, napi_value exports)
{
    napi_property_descriptor desc[] = {
        {"oHNativeImageCreate", nullptr, OHNativeImageCreate, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"oHNativeImageAcquireNativeWindow", nullptr, OHNativeImageAcquireNativeWindow, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHNativeImageAcquireNativeWindowAbnormal", nullptr, OHNativeImageAcquireNativeWindowAbnormal, nullptr,
         nullptr, nullptr, napi_default, nullptr},
        {"oHNativeImageAttachContext", nullptr, OHNativeImageAttachContext, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHNativeImageAttachContextAbnormal", nullptr, OHNativeImageAttachContextAbnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHNativeImageDetachContext", nullptr, OHNativeImageDetachContext, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHNativeImageDetachContextAbnormal", nullptr, OHNativeImageDetachContextAbnormal, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHNativeImageUpdateSurfaceImage", nullptr, OHNativeImageUpdateSurfaceImage, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHNativeImageUpdateSurfaceImageAbnormal", nullptr, OHNativeImageUpdateSurfaceImageAbnormal, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"oHNativeImageGetTimestamp", nullptr, OHNativeImageGetTimestamp, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"oHNativeImageGetTransformMatrix", nullptr, OHNativeImageGetTransformMatrix, nullptr, nullptr, nullptr,
         napi_default, nullptr},
        {"oHNativeImageGetTransformMatrixAbnormal", nullptr, OHNativeImageGetTransformMatrixAbnormal, nullptr, nullptr,
         nullptr, napi_default, nullptr},
        {"oHNativeImageDestroy", nullptr, OHNativeImageDestroy, nullptr, nullptr, nullptr, napi_default, nullptr},
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
    .nm_modname = "nativeimage",
    .nm_priv = ((void *)0),
    .reserved = {0},
};

extern "C" __attribute__((constructor)) void RegisterModule(void) { napi_module_register(&demoModule); };
