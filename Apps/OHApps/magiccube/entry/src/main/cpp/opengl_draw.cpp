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

#include "opengl_draw.h"
#include <cmath>
#include "glm/gtx/rotate_vector.hpp"
#include "glm/gtx/vector_angle.inl"
#include "log.h"
namespace {
    EGLConfig getConfig(EGLDisplay eglDisplay)
    {
        int attribList[] = {
            EGL_SURFACE_TYPE, EGL_WINDOW_BIT,
            EGL_RED_SIZE, 8,
            EGL_GREEN_SIZE, 8,
            EGL_BLUE_SIZE, 8,
            EGL_ALPHA_SIZE, 8,
            EGL_DEPTH_SIZE, 24,
            EGL_RENDERABLE_TYPE, EGL_OPENGL_ES3_BIT,
            EGL_NONE
        };
        EGLConfig configs = nullptr;
        int configsNum;
    
        if (!eglChooseConfig(eglDisplay, attribList, &configs, 1, &configsNum)) {
            LOGE("eglChooseConfig ERROR");
            return nullptr;
        }
    
        return configs;
    }
    const char *vertexShader =
    "#version 300 es\n"
    "precision mediump float;\n"
    "layout (location = 0) in vec3 aPos;\n"
    "layout (location = 1) in vec3 aColor;\n"
    "layout (location = 2) in vec3 aOffset;\n"
    "layout (location = 3) in mat4 aTranslat;\n"
    "uniform mat4 rotate;\n"
    "out vec3 ourColor;\n"
    "void main()\n"
    "{\n"
    "   gl_Position = vec4(aPos + aOffset, 1.0) * aTranslat * rotate;\n"
    "   ourColor = aColor;\n"
    "}\n\0";

    const char *fragmentShader =
    "#version 300 es\n"
    "precision mediump float;\n"
    "in vec3 ourColor;\n"
    "out vec4 FragColor;\n"
    "void main()\n"
    "{\n"
    "   FragColor = vec4(ourColor, 1.0);\n"
    "}\n\0";
    
    constexpr float c[7][3] = {
        { 1.0f, 0, 0 }, // 红色
        { 0, 1.0f, 0 }, // 绿色
        { 0, 0, 1.0f }, // 蓝色
        { 1.0f, 1.0f, 0 }, // 黄色
        { 0, 1.0f, 1.0f }, // 藏青色
        { 1.0f, 0.5f, 0 }, // 橙色
        { 1.0f, 1.0f, 1.0f } // 白色
    };
    constexpr float p[8][3] = {
        { -0.2f, 0.2f, -0.2f },
        { 0.2f, 0.2f, -0.2f },
        { -0.2f, -0.2f, -0.2f },
        { 0.2f, -0.2f, -0.2f },
        { -0.2f, 0.2f, 0.2f },
        { 0.2f, 0.2f, 0.2f },
        { -0.2f, -0.2f, 0.2f },
        { 0.2f, -0.2f, 0.2f },
    };
    std::vector<float> vertices {
        p[0][0], p[0][1], p[0][2], p[1][0], p[1][1], p[1][2], p[2][0], p[2][1], p[2][2],
        p[1][0], p[1][1], p[1][2], p[2][0], p[2][1], p[2][2], p[3][0], p[3][1], p[3][2],
        p[4][0], p[4][1], p[4][2], p[5][0], p[5][1], p[5][2], p[6][0], p[6][1], p[6][2],
        p[5][0], p[5][1], p[5][2], p[6][0], p[6][1], p[6][2], p[7][0], p[7][1], p[7][2],
        p[0][0], p[0][1], p[0][2], p[2][0], p[2][1], p[2][2], p[4][0], p[4][1], p[4][2],
        p[2][0], p[2][1], p[2][2], p[4][0], p[4][1], p[4][2], p[6][0], p[6][1], p[6][2],
        p[1][0], p[1][1], p[1][2], p[3][0], p[3][1], p[3][2], p[5][0], p[5][1], p[5][2],
        p[3][0], p[3][1], p[3][2], p[5][0], p[5][1], p[5][2], p[7][0], p[7][1], p[7][2],
        p[0][0], p[0][1], p[0][2], p[1][0], p[1][1], p[1][2], p[4][0], p[4][1], p[4][2],
        p[1][0], p[1][1], p[1][2], p[4][0], p[4][1], p[4][2], p[5][0], p[5][1], p[5][2],
        p[2][0], p[2][1], p[2][2], p[3][0], p[3][1], p[3][2], p[6][0], p[6][1], p[6][2],
        p[3][0], p[3][1], p[3][2], p[6][0], p[6][1], p[6][2], p[7][0], p[7][1], p[7][2]
    };
    std::vector<float> offsets {
        -0.404f, 0.404f, -0.404f,
        0, 0.404f, -0.404f,
        0.404f, 0.404f, -0.404f,

        -0.404f, 0, -0.404f,
        0, 0, -0.404f,
        0.404f, 0, -0.404f,

        -0.404f, -0.404f, -0.404f,
        0, -0.404f, -0.404f,
        0.404f, -0.404f, -0.404f,


        -0.404f, 0.404f, 0,
        0, 0.404f, 0,
        0.404f, 0.404f, 0,

        -0.404f, 0, 0,
        0.404f, 0, 0,

        -0.404f, -0.404f, 0,
        0, -0.404f, 0,
        0.404f, -0.404f, 0,


        -0.404f, 0.404f, 0.404f,
        0, 0.404f, 0.404f,
        0.404f, 0.404f, 0.404f,

        -0.404f, 0, 0.404f,
        0, 0, 0.404f,
        0.404f, 0, 0.404f,

        -0.404f, -0.404f, 0.404f,
        0, -0.404f, 0.404f,
        0.404f, -0.404f, 0.404f,
    };
    std::vector<float> colors {
        c[6][0], c[6][1], c[6][2], c[6][0], c[6][1], c[6][2], c[6][0], c[6][1], c[6][2],
        c[6][0], c[6][1], c[6][2], c[6][0], c[6][1], c[6][2], c[6][0], c[6][1], c[6][2],
        c[3][0], c[3][1], c[3][2], c[3][0], c[3][1], c[3][2], c[3][0], c[3][1], c[3][2],
        c[3][0], c[3][1], c[3][2], c[3][0], c[3][1], c[3][2], c[3][0], c[3][1], c[3][2],
        c[5][0], c[5][1], c[5][2], c[5][0], c[5][1], c[5][2], c[5][0], c[5][1], c[5][2],
        c[5][0], c[5][1], c[5][2], c[5][0], c[5][1], c[5][2], c[5][0], c[5][1], c[5][2],
        c[0][0], c[0][1], c[0][2], c[0][0], c[0][1], c[0][2], c[0][0], c[0][1], c[0][2],
        c[0][0], c[0][1], c[0][2], c[0][0], c[0][1], c[0][2], c[0][0], c[0][1], c[0][2],
        c[2][0], c[2][1], c[2][2], c[2][0], c[2][1], c[2][2], c[2][0], c[2][1], c[2][2],
        c[2][0], c[2][1], c[2][2], c[2][0], c[2][1], c[2][2], c[2][0], c[2][1], c[2][2],
        c[1][0], c[1][1], c[1][2], c[1][0], c[1][1], c[1][2], c[1][0], c[1][1], c[1][2],
        c[1][0], c[1][1], c[1][2], c[1][0], c[1][1], c[1][2], c[1][0], c[1][1], c[1][2]
    };
} // namespace

int32_t OpenglDraw::Init(EGLNativeWindowType handle, int width, int height)
{
    LOGI("Init window = %{public}p, w = %{public}d, h = %{public}d.", handle, width, height);
    mEglWindow = handle;

    mEGLDisplay = eglGetDisplay(EGL_DEFAULT_DISPLAY);
    if (mEGLDisplay == EGL_NO_DISPLAY) {
        LOGE("unable to get EGL display.");
        return -1;
    }

    EGLint eglMajVers, eglMinVers;
    if (!eglInitialize(mEGLDisplay, &eglMajVers, &eglMinVers)) {
        mEGLDisplay = EGL_NO_DISPLAY;
        LOGE("unable to initialize display");
        return -1;
    }
    LOGI("majver:%{public}d minver:%{public}d", eglMajVers, eglMinVers);
    
    mEGLConfig = getConfig(mEGLDisplay);
    if (mEGLConfig == nullptr) {
        LOGE("GLContextInit config ERROR");
        return -1;
    }

    EGLint winAttribs[] = {EGL_GL_COLORSPACE_KHR, EGL_GL_COLORSPACE_SRGB_KHR, EGL_NONE};
    if (mEglWindow) {
        mEGLSurface = eglCreateWindowSurface(mEGLDisplay, mEGLConfig, mEglWindow, winAttribs);
        if (mEGLSurface == nullptr) {
            LOGE("eglCreateContext eglSurface is null");
            return -1;
        }
    }

    /* Create EGLContext from */
    int attrib3_list[] = {
        EGL_CONTEXT_CLIENT_VERSION, 3,
        EGL_NONE
    };

    mEGLContext = eglCreateContext(mEGLDisplay, mEGLConfig, mSharedEGLContext, attrib3_list);
    if (!eglMakeCurrent(mEGLDisplay, mEGLSurface, mEGLSurface, mEGLContext)) {
        LOGE("eglMakeCurrent error = %{public}d", eglGetError());
    }
    glViewport(0, 0, width, height);
    LOGI("window size is %{public}d %{public}d", width, height);
    glEnable(GL_DEPTH_TEST);
    routeMat = glm::mat4(1.0f);
    vertexManger = new VertexManger(vertices, colors, offsets);
    shader = new Shader(vertexShader, fragmentShader);
    LOGI("Init success.");

    return 0;
}
void OpenglDraw::Update()
{
    glClearColor(0, 0, 0, 1.0f);
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    shader->setMat4fv("rotate", glm::value_ptr(routeMat));
    shader->use();
    vertexManger->draw();
    eglSwapBuffers(mEGLDisplay, mEGLSurface);
}

int32_t OpenglDraw::Quit(void)
{
    delete vertexManger;
    vertexManger = nullptr;

    delete shader;
    shader = nullptr;

    EGLBoolean ret = eglDestroySurface(mEGLDisplay, mEGLSurface);
    if (!ret) {
        LOGW("eglDestroySurface failure.");
    }

    ret = eglDestroyContext(mEGLDisplay, mEGLContext);
    if (!ret) {
        LOGW("eglDestroyContext failure.");
    }

    ret = eglTerminate(mEGLDisplay);
    if (!ret) {
        LOGW("eglTerminate failure.");
    }

    mEGLSurface = nullptr;
    mEGLContext = nullptr;
    mEGLDisplay = nullptr;

    LOGE("Quit success.");
    return 0;
}

void OpenglDraw::twist(TwistMode mode, Axis axis, Face face, RotateDir dir)
{
    if (mode == TwistMode::regular) {
        vertexManger->twist(axis, face, routeMat, dir);
    } else if (mode == TwistMode::free) {
        vertexManger->twist(axis, face, dir);
    }
}

void OpenglDraw::route(float x, float y)
{
    routeMat = glm::rotate(routeMat, glm::radians(x), glm::vec3(0, 1.0f, 0));
    routeMat = glm::rotate(routeMat, glm::radians(y), glm::vec3(1.0f, 0, 0));
}

void OpenglDraw::resetAngle()
{
    routeMat = glm::mat4(1.0f);
}