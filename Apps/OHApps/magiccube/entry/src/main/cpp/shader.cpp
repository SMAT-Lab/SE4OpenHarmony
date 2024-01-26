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


#include <GLES3/gl31.h>
#include <log.h>
#include "shader.h"
Shader::Shader(const char* vertexSource, const char* fragmentSource)
{
    GLint linked;
    GLuint vertexShader, fragmentShader;

    vertexShader = loadShader(GL_VERTEX_SHADER, vertexSource);
    fragmentShader = loadShader(GL_FRAGMENT_SHADER, fragmentSource);

    shaderProgram = glCreateProgram();
    glAttachShader(shaderProgram, vertexShader);
    glAttachShader(shaderProgram, fragmentShader);
    glLinkProgram(shaderProgram);
    if (!linked) {
        LOGE("CreateProgram linked error");
        GLint infoLen = 0;
        glGetProgramiv(shaderProgram, GL_INFO_LOG_LENGTH, &infoLen);
        if (infoLen > 1) {
            char* infoLog = new char[infoLen];
            glGetProgramInfoLog(shaderProgram, infoLen, nullptr, infoLog);
            LOGE("Error linking program:%{public}s\n", infoLog);
            delete[] infoLog;
        }
        glDeleteShader(vertexShader);
        glDeleteShader(fragmentShader);
        glDeleteProgram(shaderProgram);
        throw new std::runtime_error("Error linking program");
    }
    glDeleteShader(vertexShader);
    glDeleteShader(fragmentShader);
}

Shader::~Shader()
{
    glDeleteProgram(shaderProgram);
}

void Shader::use() const
{
    glUseProgram(shaderProgram);
}

void Shader::setMat4fv(const std::string& name, const GLfloat* mat) const
{
    GLuint loc = glGetUniformLocation(shaderProgram, name.c_str());
    glUniformMatrix4fv(loc, 1, GL_FALSE, mat);
}

void Shader::setVec3(const std::string& name, float x, float y, float z) const
{
    GLuint loc = glGetUniformLocation(shaderProgram, name.c_str());
    glUniform3f(loc, x, y, z);
}

GLuint Shader::loadShader(GLuint shaderType, const char* source)
{
    GLint compiled;
    GLuint Shader = glCreateShader(shaderType);
    glShaderSource(Shader, 1, &source, nullptr);
    glCompileShader(Shader);
    glGetShaderiv(Shader, GL_COMPILE_STATUS, &compiled);

    if (!compiled) {
        GLint infoLen = 0;
        glGetShaderiv(Shader, GL_INFO_LOG_LENGTH, &infoLen);

        if (infoLen > 1) {
            char* infoLog = new char[infoLen];
            glGetShaderInfoLog(Shader, infoLen, nullptr, infoLog);
            LOGE("Error compiling shader:%{public}s\n", infoLog);
            delete[] infoLog;
        }
        glDeleteShader(Shader);
        throw new std::runtime_error("Error compiling vertex shader");
    }
    return Shader;
}
