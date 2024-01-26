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

#include <GLES3/gl31.h>

#include "log.h"
#include "i2cOpengl.h"

#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"

const char *vertexShaderSourceForScale =
    "attribute vec2 a_position;\n"
    "varying float yPos;\n"
    "void main() {\n"
    "gl_Position = vec4(a_position, 0.0, 1.0);\n"
    "yPos = a_position.y;\n"
    "}\n\0";

const char *fragmentShaderSourceForScale =
    "precision mediump float;\n"
    "varying float yPos;\n"
    "uniform float currentTemperature;\n"
    "void main() {\n"
    "vec3 red = vec3(1.0, 0.0, 0.0);\n"
    "vec3 blue = vec3(0.0, 0.0, 1.0);\n"
    "float factor = (yPos + 1.0) / 2.0; \n"
    "vec3 color = mix(blue, red, factor);\n"
    "if (yPos > currentTemperature) {\n"
    "gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n"
    "} else {\n"
    "gl_FragColor = vec4(color, 1.0);\n"
    "}\n"
    "}\n\0";

const char *vertexShaderSourceForTexture =
    "#version 300 es\n"
    "layout (location = 0) in vec3 position;\n"
    "layout (location = 1) in vec2 aTexCoord;\n"
    "out vec2 TexCoord;\n"
    "void main() {\n"
    "gl_Position = vec4(position, 1.0);\n"
    "TexCoord = aTexCoord;\n"
    "}\n\0";

const char *fragmentShaderSourceForTexture =
    "#version 300 es\n"
    "precision mediump float;\n"
    "in vec2 TexCoord;\n"
    "uniform sampler2D texture1;\n"
    "out vec4 fragColor;"
    "void main() {\n"
    "vec4 texColor = texture(texture1, TexCoord);\n"
    "if(texColor.r >= 0.9f &&texColor.g >= 0.9f && texColor.b >= 0.9f){\n"
    "discard;}\n"
    "fragColor = texColor;\n"
    "}\n\0";

// Define the vertices for the temperature bar
float barVertices[] = {
    -0.115f, -1.0f,
    0.08f, -1.0f,
    0.08f, 1.0f,
    -0.115f, 1.0f};

float scale[] = {
    -0.5f, -1.0f, 0.0f, 0.0f, 0.0f,
    0.5f, -1.0f, 0.0f, 1.0f, 0.0f,
    0.5f, 1.0f, 0.0f, 1.0f, 1.0f,
    -0.5f, 1.0f, 0.0f, 0.0f, 1.0f};

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
        EGL_OPENGL_ES3_BIT,
        EGL_NONE};
    EGLConfig configs = NULL;
    int configsNum;

    if (!eglChooseConfig(eglDisplay, attribList, &configs, 1, &configsNum)) {
        LOGE("eglChooseConfig ERROR");
        return NULL;
    }
    return configs;
}
} // namespace
// 设置温度范围
float i2cOpengl::generateNormalizedTemperature(float actualTemp)
{
    float minTemp = 20.0f;
    float maxTemp = 50.0f + 10.0f;
    float normalizedTemp = (actualTemp - minTemp) / (maxTemp - minTemp);
    LOGW("The actualTemp is %{public}f", actualTemp);
    return normalizedTemp * 2.0f - 1.0f;
}

void i2cOpengl::CreateProgram(void)
{
    GLuint vertexShader = glCreateShader(GL_VERTEX_SHADER);
    glShaderSource(vertexShader, 1, &vertexShaderSourceForScale, nullptr);
    glCompileShader(vertexShader);
    glGetShaderiv(vertexShader, GL_COMPILE_STATUS, &success);
    if (!success) {
        glGetShaderInfoLog(vertexShader, 1024L, NULL, infoLog);
        LOGE("%{public}s %{public}d", infoLog, __LINE__);
    }

    GLuint fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);
    glShaderSource(fragmentShader, 1, &fragmentShaderSourceForScale, nullptr);
    glCompileShader(fragmentShader);
    glGetShaderiv(fragmentShader, GL_COMPILE_STATUS, &success);
    if (!success) {
        glGetShaderInfoLog(vertexShader, 1024L, NULL, infoLog);
        LOGE("%{public}s %{public}d", infoLog, __LINE__);
    }

    shaderProgram = glCreateProgram();
    glAttachShader(shaderProgram, vertexShader);
    glAttachShader(shaderProgram, fragmentShader);
    glLinkProgram(shaderProgram);
    glGetProgramiv(shaderProgram, GL_LINK_STATUS, &success);

    GLuint vertexShader1 = glCreateShader(GL_VERTEX_SHADER);
    glShaderSource(vertexShader1, 1, &vertexShaderSourceForTexture, nullptr);
    glCompileShader(vertexShader1);

    glGetShaderiv(vertexShader1, GL_COMPILE_STATUS, &success);
    if (!success) {
        glGetShaderInfoLog(vertexShader1, 1024L, NULL, infoLog);
        LOGE("%{public}s %{public}d", infoLog, __LINE__);
    }

    GLuint fragmentShader1 = glCreateShader(GL_FRAGMENT_SHADER);
    glShaderSource(fragmentShader1, 1, &fragmentShaderSourceForTexture, nullptr);
    glCompileShader(fragmentShader1);
    glGetShaderiv(fragmentShader1, GL_COMPILE_STATUS, &success);
    if (!success) {
        glGetShaderInfoLog(fragmentShader1, 1024L, NULL, infoLog);
        LOGE("%{public}s %{public}d", infoLog, __LINE__);
    }

    shaderProgram1 = glCreateProgram();
    glAttachShader(shaderProgram1, vertexShader1);
    glAttachShader(shaderProgram1, fragmentShader1);
    glLinkProgram(shaderProgram1);
    glGetProgramiv(shaderProgram1, GL_LINK_STATUS, &success);
    if (!success) {
        glGetProgramInfoLog(shaderProgram1, 1024L, NULL, infoLog);
        LOGE("%{public}s %{public}d", infoLog, __LINE__);
    }
}

int32_t i2cOpengl::Init(void *window, int32_t width, int32_t height)
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
        EGL_CONTEXT_CLIENT_VERSION, 3,
        EGL_NONE};

    mEGLContext = eglCreateContext(mEGLDisplay, mEGLConfig, mSharedEGLContext, attrib3_list);
    if (!eglMakeCurrent(mEGLDisplay, mEGLSurface, mEGLSurface, mEGLContext)) {
        LOGE("eglMakeCurrent error = %{public}d", eglGetError());
    }
    CreateProgram();
    LOGI("Init success.");

    return 0;
}

void i2cOpengl::SetAndEnable(void)
{
    glGenVertexArrays(2L, vao);
    glGenBuffers(2L, vbo);

    glUseProgram(shaderProgram);
    glBindVertexArray(vao[0]);
    glBindBuffer(GL_ARRAY_BUFFER, vbo[0]);
    glBufferData(GL_ARRAY_BUFFER, sizeof(barVertices), barVertices, GL_STATIC_DRAW);

    glVertexAttribPointer(a_positionLocation, 2L, GL_FLOAT, GL_FALSE, 2L * sizeof(float), (void *)0);
    glEnableVertexAttribArray(a_positionLocation);

    glUseProgram(shaderProgram1);
    glBindVertexArray(vao[1]);

    glBindBuffer(GL_ARRAY_BUFFER, vbo[1]);
    glBufferData(GL_ARRAY_BUFFER, sizeof(scale), scale, GL_STATIC_DRAW);
    if ((err = glGetError()) != GL_NO_ERROR) {
        LOGE("%{public}u  %{public}d", err, __LINE__);
    } else {
        LOGI("success to load scale %{public}u", err);
    }

    glVertexAttribPointer(0, 3L, GL_FLOAT, GL_FALSE, 5L * sizeof(float), nullptr);
    if ((err = glGetError()) != GL_NO_ERROR) {
        LOGE("%{public}u  %{public}d", err, __LINE__);
    } else {
        LOGI("success to set position %{public}u", err);
    }
    glEnableVertexAttribArray(0);
    if ((err = glGetError()) != GL_NO_ERROR) {
        LOGE("%{public}u  %{public}d", err, __LINE__);
    } else {
        LOGI("success to enable position %{public}u", err);
    }

    glVertexAttribPointer(1, 2L, GL_FLOAT, GL_FALSE, 5L * sizeof(float), (void *)(3L * sizeof(float)));
    if ((err = glGetError()) != GL_NO_ERROR) {
        LOGE("%{public}u  %{public}d", err, __LINE__);
    } else {
        LOGI("success to set aTexCoord %{public}u", err);
    }
    glEnableVertexAttribArray(1);
    if ((err = glGetError()) != GL_NO_ERROR) {
        LOGE("%{public}u  %{public}d", err, __LINE__);
    } else {
        LOGI("success to enable aTexCoord %{public}u", err);
    }
}

void i2cOpengl::LoadTexture(void)
{
    glGenTextures(1, &texture);
    if ((err = glGetError()) != GL_NO_ERROR) {
        LOGE("%{public}u  %{public}d", err, __LINE__);
    } else {
        LOGI("success to gen texture  %{public}u", err);
    }
    glActiveTexture(GL_TEXTURE0);
    glBindTexture(GL_TEXTURE_2D, texture);
    if ((err = glGetError()) != GL_NO_ERROR) {
        LOGE("%{public}u  %{public}d", err, __LINE__);
    } else {
        LOGI("success to bind texture %{public}u", err);
    }

    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);

    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR_MIPMAP_LINEAR);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
    if ((err = glGetError()) != GL_NO_ERROR) {
        LOGE("%{public}u  %{public}d", err, __LINE__);
    } else {
        LOGI("success to load texture  %{public}u", err);
    }
    // load image, create texture and generate mipmaps
    int width, height, nrChannels;
    stbi_set_flip_vertically_on_load(true);
    unsigned char *data = stbi_load("/system/lib/module/temp.png", &width, &height, &nrChannels, 0);
    if (data) {
        glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA, width, height, 0, GL_RGBA, GL_UNSIGNED_BYTE, data);
        glGenerateMipmap(GL_TEXTURE_2D);
        while ((err = glGetError()) != GL_NO_ERROR) {
            LOGE("%{public}u  %{public}d", err, __LINE__);
        }
    } else {
        LOGE("Failed to load texture");
    }
    stbi_image_free(data);
}

void i2cOpengl::Update(void)
{
    glClearColor(1.0f, 1.0, 1.0f, 1.0f);
    glClear(GL_COLOR_BUFFER_BIT);
    temperatureLocation = glGetUniformLocation(shaderProgram, "currentTemperature");
    a_positionLocation = glGetAttribLocation(shaderProgram, "a_position");
    float currentTemperature = generateNormalizedTemperature(temp);
    SetAndEnable();
    LoadTexture();

    glEnable(GL_DEPTH_TEST);
    glUseProgram(shaderProgram);
    glUniform1f(temperatureLocation, currentTemperature);

    glBindVertexArray(vao[0]);
    glDrawArrays(GL_TRIANGLE_FAN, 0, 4L);
    if ((err = glGetError()) != GL_NO_ERROR) {
        LOGE("%{public}u  %{public}d", err, __LINE__);
    } else {
        LOGI("success to draw %{public}u", err);
    }

    glUseProgram(shaderProgram1);
    LOGI("Using shaderProgram1");
    glBindVertexArray(vao[1]);
    glActiveTexture(GL_TEXTURE0);
    glBindTexture(GL_TEXTURE_2D, texture);
    glUniform1i(glGetUniformLocation(shaderProgram1, "texture1"), 0);

    glDrawArrays(GL_TRIANGLE_FAN, 0, 4L);
    if ((err = glGetError()) != GL_NO_ERROR) {
        LOGE("%{public}u  %{public}d", err, __LINE__);
    }
    LOGE("Finish Drawing");
    eglSwapBuffers(mEGLDisplay, mEGLSurface);
}

void i2cOpengl::SetTemp(double tempe)
{
    temp = (float)tempe;
}

int32_t i2cOpengl::Quit(void)
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
