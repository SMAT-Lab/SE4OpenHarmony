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

#ifndef TETRAHEDRON_H
#define TETRAHEDRON_H

#include <GLES3/gl3.h>
#include <EGL/egl.h>
#include <EGL/eglext.h>

#include <string>
#include <stdint.h>

#define TRIANGLES_POINT     3
#define TETRAHEDRON_POINT   12

class Tetrahedron {
public:
    explicit Tetrahedron(std::string& id) : id(id) {};
    int32_t Init(void* windowHandle, int windowWidth, int windowHeight);
    void Update(float angleXOffset, float angleYOffset);
    float GetAngleX(void);
    float GetAngleY(void);
    int32_t Quit(void);

public:
    std::string id;

private:
    GLuint LoadShader(GLenum type, const char *shaderSrc);
    GLuint CreateProgram(const char *vertexShader, const char *fragShader);

    EGLNativeWindowType mEglWindow;
    EGLDisplay mEGLDisplay = EGL_NO_DISPLAY;
    EGLConfig mEGLConfig = nullptr;
    EGLContext mEGLContext = EGL_NO_CONTEXT;
    EGLContext mSharedEGLContext = EGL_NO_CONTEXT;
    EGLSurface mEGLSurface = nullptr;
    GLuint mProgramHandle;
    float angleX = 30.0; /* default X angle */
    float angleY = 45.0; /* default Y angle */

    GLint mRotationLocation;
    GLint mTranslationLocation;
    GLint mMoveOriginLocation;
};

#endif /* TETRAHEDRON_H */
