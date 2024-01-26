/* Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */

#ifndef I2COPENGL_H
#define I2COPENGL_H

#include <GLES3/gl3.h>
#include <EGL/egl.h>
#include <EGL/eglext.h>

#include <string>
#include <stdint.h>

class i2cOpengl {
public:
    explicit i2cOpengl(std::string &id) : id(id) {};
    int32_t Init(void *windowHandle, int windowWidth, int windowHeight);
    void Update(void);
    void SetTemp(double tempe);
    int32_t Quit(void);
    float generateNormalizedTemperature(float actualTemp);
    void SetAndEnable(void);
    void LoadTexture(void);
    void CreateProgram(void);
    float temp = 0.0f;
    GLuint vao[2], vbo[2];
    GLuint texture;
    GLuint shaderProgram1, shaderProgram;
    GLenum err = 0;
    GLint success;
    GLchar infoLog[1024];
    GLint temperatureLocation, a_positionLocation;

public:
    std::string id;

private:
    EGLNativeWindowType mEglWindow;
    EGLDisplay mEGLDisplay = EGL_NO_DISPLAY;
    EGLConfig mEGLConfig = nullptr;
    EGLContext mEGLContext = EGL_NO_CONTEXT;
    EGLContext mSharedEGLContext = EGL_NO_CONTEXT;
    EGLSurface mEGLSurface = nullptr;
};

#endif /* TETRAHEDRON_H */
