/*
 * Copyright 2023 Unionman Technology Co., Ltd.
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

#ifndef OpenglDraw_H
#define OpenglDraw_H


#include <EGL/egl.h>
#include <EGL/eglext.h>
#include <GLES3/gl3.h>
#include <cstdint>
#include <string>
#include "shader.h"
#include "vertex_manger.h"
enum class TwistMode { regular, free };
class OpenglDraw {
public:
    int32_t Init(EGLNativeWindowType windowHandle, int windowWidth, int windowHeight);
    void Update(void);
    int32_t Quit(void);
    void twist(TwistMode mode, Axis axis, Face face, RotateDir dir = RotateDir::Counterclockwise);
    void resetAngle();
    void route(float x, float y);
protected:
    EGLNativeWindowType mEglWindow;
    EGLDisplay mEGLDisplay = EGL_NO_DISPLAY;
    EGLConfig mEGLConfig = nullptr;
    EGLContext mEGLContext = EGL_NO_CONTEXT;
    EGLContext mSharedEGLContext = EGL_NO_CONTEXT;
    EGLSurface mEGLSurface = nullptr;
    GLuint mProgramHandle;
    GLint mRotationLocation;
    GLint mTranslationLocation;
    GLint mMoveOriginLocation;

    VertexManger* vertexManger = nullptr;
    Shader* shader = nullptr;

    glm::mat4 routeMat;
};

#endif // OpenglDraw_H
