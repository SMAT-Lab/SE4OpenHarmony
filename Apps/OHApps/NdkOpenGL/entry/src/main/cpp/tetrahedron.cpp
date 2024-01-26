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

#include <GLES3/gl31.h>
#include <bits/alltypes.h>
#include <cmath>
#include "log.h"
#include "tetrahedron.h"

static char g_vertexShader[] =
    "attribute vec4 a_pos;\n"
    "attribute vec4 a_color;\n"
    "attribute vec4 a_normal;\n"
    "uniform vec3 u_lightColor;\n"
    "uniform vec3 u_lightDirection;\n"
    "uniform mat4 a_mx;\n"
    "uniform mat4 a_my;\n"
    "varying vec4 v_color;\n"
    "void main() {\n"
    "    float radian = radians(30.0);\n"
    "    float cos = cos(radian);\n"
    "    float sin = sin(radian);\n"
    "    gl_Position = a_mx * a_my * vec4(a_pos.x, a_pos.y, a_pos.z, 1.0);\n"
    "    vec3 normal = normalize((a_mx * a_my * a_normal).xyz);\n"
    "    float dot = max(dot(u_lightDirection, normal), 0.0);\n"
    "    vec3 reflectedLight = u_lightColor * a_color.rgb * dot;\n"
    "    v_color = vec4(reflectedLight, a_color.a);\n"
    "}\n\0";

static char g_fragmentShader[] =
    "precision mediump float;\n"
    "varying vec4 v_color;\n"
    "void main() {\n"
    "    gl_FragColor = v_color;\n"
    "}\n\0";

/* 创建顶点位置数据数组vertexData */
static float g_vertexData[] = {
    -0.75, -0.50, -0.43, 0.75, -0.50, -0.43, 0.00,  -0.50, 0.87,  0.75, -0.50, -0.43,
    0.00,  -0.50, 0.87,  0.00, 1.00,  0.00,  0.00,  -0.50, 0.87,  0.00, 1.00,  0.00,
    -0.75, -0.50, -0.43, 0.00, 1.00,  0.00,  -0.75, -0.50, -0.43, 0.75, -0.50, -0.43,
};

/* 创建顶点颜色数组colorData */
static float g_colorData[] = {
    1, 0, 0, 1, 0, 0, 1, 0, 0, /* 红色——面1 */
    1, 0, 0, 1, 0, 0, 1, 0, 0, /* 红色——面2 */
    1, 0, 0, 1, 0, 0, 1, 0, 0, /* 红色——面3 */
    1, 0, 0, 1, 0, 0, 1, 0, 0  /* 红色——面4 */
};

/* 顶点法向量数组normalData */
static float g_normalData[] = {
    0.00,  -1.00, 0.00,  0.00,  -1.00, 0.00,  0.00,  -1.00, 0.00, -0.83, -0.28, -0.48,
    -0.83, -0.28, -0.48, -0.83, -0.28, -0.48, -0.83, 0.28,  0.48, -0.83, 0.28,  0.48,
    -0.83, 0.28,  0.48,  0.00,  -0.28, 0.96,  0.00,  -0.28, 0.96, 0.00,  -0.28, 0.96,
};

namespace {
    EGLConfig getConfig(int version, EGLDisplay eglDisplay)
    {
        int attribList[] = {
            EGL_SURFACE_TYPE,
            EGL_WINDOW_BIT,
            EGL_RED_SIZE, 8,
            EGL_GREEN_SIZE, 8,
            EGL_BLUE_SIZE, 8,
            EGL_ALPHA_SIZE, 8,
            EGL_RENDERABLE_TYPE,
            EGL_OPENGL_ES2_BIT,
            EGL_NONE
        };
        EGLConfig configs = NULL;
        int configsNum;

        if (!eglChooseConfig(eglDisplay, attribList, &configs, 1, &configsNum)) {
            LOGE("eglChooseConfig ERROR");
            return NULL;
        }

        return configs;
    }

    void enableVertexAttrib(GLuint index, float *data, int32_t len)
    {
        GLuint buffer;
        glGenBuffers(1, &buffer);
        glBindBuffer(GL_ARRAY_BUFFER, buffer);
        glBufferData(GL_ARRAY_BUFFER, len, data, GL_STATIC_DRAW);
        glVertexAttribPointer(index, TRIANGLES_POINT, GL_FLOAT, GL_FALSE, 0, 0);
        glEnableVertexAttribArray(index);
        return;
    }
}

GLuint Tetrahedron::LoadShader(GLenum type, const char *shaderSrc)
{
    GLuint shader;
    GLint compiled;

    shader = glCreateShader(type);
    if (shader == 0) {
        LOGE("LoadShader shader error");
        return 0;
    }

    glShaderSource(shader, 1, &shaderSrc, nullptr);
    glCompileShader(shader);

    glGetShaderiv(shader, GL_COMPILE_STATUS, &compiled);

    if (!compiled) {
        GLint infoLen = 0;
        glGetShaderiv(shader, GL_INFO_LOG_LENGTH, &infoLen);

        if (infoLen > 1) {
            std::string infoLog(infoLen, '\0');
            glGetShaderInfoLog(shader, infoLen, nullptr, (GLchar *)&infoLog);
            LOGE("Error compiling shader:%{public}s\n", infoLog.c_str());
        }

        glDeleteShader(shader);
        return 0;
    }

    return shader;
}

GLuint Tetrahedron::CreateProgram(const char *vertexShader, const char *fragShader)
{
    GLuint vertex;
    GLuint fragment;
    GLuint program;
    GLint linked;

    vertex = LoadShader(GL_VERTEX_SHADER, vertexShader);
    if (vertex == 0) {
        LOGE("LoadShader: vertexShader error");
        return 0;
    }

    fragment = LoadShader(GL_FRAGMENT_SHADER, fragShader);
    if (fragment == 0) {
        LOGE("LoadShader: fragShader error");
        glDeleteShader(vertex);
        return 0;
    }

    program = glCreateProgram();
    if (program == 0) {
        LOGE("CreateProgram program error");
        glDeleteShader(vertex);
        glDeleteShader(fragment);
        return 0;
    }

    glAttachShader(program, vertex);
    glAttachShader(program, fragment);
    glLinkProgram(program);
    glGetProgramiv(program, GL_LINK_STATUS, &linked);

    if (!linked) {
        LOGE("CreateProgram linked error");
        GLint infoLen = 0;
        glGetProgramiv(program, GL_INFO_LOG_LENGTH, &infoLen);
        if (infoLen > 1) {
            std::string infoLog(infoLen, '\0');
            glGetProgramInfoLog(program, infoLen, nullptr, (GLchar *)&infoLog);
            LOGE("Error linking program:%{public}s\n", infoLog.c_str());
        }
        glDeleteShader(vertex);
        glDeleteShader(fragment);
        glDeleteProgram(program);
        return 0;
    }
    glDeleteShader(vertex);
    glDeleteShader(fragment);

    return program;
}

int32_t Tetrahedron::Init(void *window, int32_t width,  int32_t height)
{
    LOGI("Init window = %{public}p, w = %{public}d, h = %{public}d.", window, width, height);
    mEglWindow = reinterpret_cast<EGLNativeWindowType>(window);

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

    int version = 3;
    mEGLConfig = getConfig(version, mEGLDisplay);
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
        EGL_CONTEXT_CLIENT_VERSION, 2,
        EGL_NONE
    };
    
    mEGLContext = eglCreateContext(mEGLDisplay, mEGLConfig, mSharedEGLContext, attrib3_list);
    if (!eglMakeCurrent(mEGLDisplay, mEGLSurface, mEGLSurface, mEGLContext)) {
        LOGE("eglMakeCurrent error = %{public}d", eglGetError());
    }
    
    mProgramHandle = CreateProgram(g_vertexShader, g_fragmentShader);
    if (!mProgramHandle) {
        LOGE("Could not create CreateProgram");
        return -1;
    }

    LOGI("Init success.");

    return 0;
}

void Tetrahedron::Update(float angleXOffset, float angleYOffset)
{
    const float pi = 3.141592;

    glClearColor(1.0f, 1.0f, 1.0f, 1.0f);
    glClear(GL_COLOR_BUFFER_BIT);
    glUseProgram(mProgramHandle);

    GLint aPos = glGetAttribLocation(mProgramHandle, "a_pos");
    GLint aColor = glGetAttribLocation(mProgramHandle, "a_color");
    GLint aNormal = glGetAttribLocation(mProgramHandle, "a_normal");
    GLint uLightColor = glGetUniformLocation(mProgramHandle, "u_lightColor");
    GLint uLightDirection = glGetUniformLocation(mProgramHandle, "u_lightDirection");
    GLint aMx = glGetUniformLocation(mProgramHandle, "a_mx");
    GLint aMy = glGetUniformLocation(mProgramHandle, "a_my");

    angleX = angleXOffset;
    angleY = angleYOffset;

    /* y轴旋转度 */
    float radianY = (angleY * pi) / 180.0;
    float cosY = cosf(radianY);
    float sinY = sinf(radianY);
    float myArr[] = {
        cosY, 0, -sinY, 0,
        0, 1, 0, 0,
        sinY, 0, cosY, 0,
        0, 0, 0, 1
    };

    glUniformMatrix4fv(aMy, 1, false, myArr);

    /* x轴旋转度 */
    float radianX = (angleX * pi) / 180.0;
    float cosX = cosf(radianX);
    float sinX = sinf(radianX);
    float mxArr[] = {
        1, 0, 0, 0, 0, cosX, -sinX, 0, 0, sinX, cosX, 0, 0, 0, 0, 1
    };

    glUniformMatrix4fv(aMx, 1, false, mxArr);

    /* 给平行光传入颜色和方向数据，RGB(1,1,1),单位向量(x,y,z) */
    glUniform3f(uLightColor, 1.0, 1.0, 1.0);

    /* 保证向量(x,y,z)的长度为1，即单位向量 */
    float x = 2.0 / sqrt(15);
    float y = 2.0 / sqrt(15);
    float z = 3.0 / sqrt(15);

    glUniform3f(uLightDirection, x, -y, z);

    /* 创建缓冲区buffer，传入顶点位置数据g_vertexData */
    enableVertexAttrib(aPos, g_vertexData, sizeof(g_vertexData));
    enableVertexAttrib(aNormal, g_normalData, sizeof(g_normalData));
    /* 创建缓冲区colorBuffer，传入顶点颜色数据g_colorData */
    enableVertexAttrib(aColor, g_colorData, sizeof(g_colorData));

    /* 执行绘制之前，一定要开启深度测试，以免颜色混乱 */
    glEnable(GL_DEPTH_TEST);

    /* 执行绘制并更新 */
    glDrawArrays(GL_TRIANGLES, 0, TETRAHEDRON_POINT);
    eglSwapBuffers(mEGLDisplay, mEGLSurface);
}

float Tetrahedron::GetAngleX()
{
    return angleX;
}

float Tetrahedron::GetAngleY()
{
    return angleY;
}

int32_t Tetrahedron::Quit(void)
{
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

    mEGLSurface = NULL;
    mEGLContext = NULL;
    mEGLDisplay = NULL;

    LOGE("Quit success.");
    return 0;
}
