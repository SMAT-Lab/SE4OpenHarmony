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

#include "vertex_manger.h"
#include <GLES3/gl31.h>
constexpr double precision = 0.000001f;
VertexManger::VertexManger(std::vector<float> vertices, std::vector<float> colors, std::vector<float> offsets)
    : vertices(vertices), colors(colors), offsets(offsets), translate(offsets.size()/3L, glm::mat4(1.0f))
{
    glGenVertexArrays(1, &vao);
    glBindVertexArray(vao);

    glGenBuffers(1, &vbo);
    glBindBuffer(GL_ARRAY_BUFFER, vbo);
    glBufferData(GL_ARRAY_BUFFER,
        vertices.size() * sizeof(decltype(vertices)::value_type), vertices.data(), GL_STATIC_DRAW);
    glVertexAttribPointer(0, 3L, GL_FLOAT, GL_FALSE, 3L * sizeof(float), nullptr);
    glEnableVertexAttribArray(0);

    glGenBuffers(1, &co);
    glBindBuffer(GL_ARRAY_BUFFER, co);
    glBufferData(GL_ARRAY_BUFFER,
        colors.size() * sizeof(decltype(colors)::value_type), colors.data(), GL_STATIC_DRAW);
    glVertexAttribPointer(1, 3L, GL_FLOAT, GL_FALSE, 3L * sizeof(float), nullptr);
    glEnableVertexAttribArray(1);

    glGenBuffers(1, &ofs);
    glBindBuffer(GL_ARRAY_BUFFER, ofs);
    glBufferData(GL_ARRAY_BUFFER,
        offsets.size() * sizeof(decltype(offsets)::value_type), offsets.data(), GL_STATIC_DRAW);
    glVertexAttribPointer(2L, 3L, GL_FLOAT, GL_FALSE, 3L * sizeof(float), nullptr);
    glEnableVertexAttribArray(2L);
    glVertexAttribDivisor(2L, 1);

    glGenBuffers(1, &tran);
    glBindBuffer(GL_ARRAY_BUFFER, tran);
    glBufferData(GL_ARRAY_BUFFER,
        translate.size() * sizeof(decltype(translate)::value_type), translate.data(), GL_DYNAMIC_DRAW);
    glVertexAttribPointer(3L, 4L, GL_FLOAT, GL_FALSE, sizeof(glm::mat4), nullptr);
    glEnableVertexAttribArray(3L);
    glVertexAttribPointer(4L, 4L, GL_FLOAT, GL_FALSE, sizeof(glm::mat4), reinterpret_cast<void *>(16L));
    glEnableVertexAttribArray(4L);
    glVertexAttribPointer(5L, 4L, GL_FLOAT, GL_FALSE, sizeof(glm::mat4), reinterpret_cast<void *>(16L * 2L));
    glEnableVertexAttribArray(5L);
    glVertexAttribPointer(6L, 4L, GL_FLOAT, GL_FALSE, sizeof(glm::mat4), reinterpret_cast<void *>(16L * 3L));
    glEnableVertexAttribArray(6L);

    glVertexAttribDivisor(3L, 1);
    glVertexAttribDivisor(4L, 1);
    glVertexAttribDivisor(5L, 1);
    glVertexAttribDivisor(6L, 1);

    glBindBuffer(GL_ARRAY_BUFFER, 0);

    glBindVertexArray(0);
}

VertexManger::~VertexManger()
{
    glDeleteVertexArrays(1, &vao);
    glDeleteBuffers(1, &vbo);
    glDeleteBuffers(1, &co);
    glDeleteBuffers(1, &ofs);
    glDeleteBuffers(1, &tran);
}

void VertexManger::draw()
{
    glBindVertexArray(vao);
    glDrawArraysInstanced(GL_TRIANGLES, 0, vertices.size() / 3L, offsets.size() / 3L);
    glBindVertexArray(0);
}

void VertexManger::twist(Axis axis, Face face, glm::mat4 view, RotateDir dir)
{
    unsigned int index = static_cast<unsigned int>(axis);
    glm::vec3 routeAxis(0, 0, 0);
    routeAxis[index] = 1.0f;
    routeAxis = glm::vec4(routeAxis, 0) * glm::inverse(view);
    for (unsigned int i = 0; i < offsets.size() / 3L; i++) {
        glm::vec4 block(offsets[i * 3L], offsets[i * 3L + 1], offsets[i * 3L + 2L], 1.0f);
        glm::mat4 blockTran = translate[i];
        block = block * blockTran * view;
        switch (face) {
            case Face::Left:
                if (block[index] < -precision) {
                    twistOneBlock(i, routeAxis, dir);
                }
                break;
            case Face::Middle:
                if (std::fabs(block[index]) < precision) {
                    twistOneBlock(i, routeAxis, dir);
                }
                break;
            case Face::Right:
                if (block[index] > precision) {
                    twistOneBlock(i, routeAxis, dir);
                }
                break;
            default:
                break;
        }
    }
    glBindBuffer(GL_ARRAY_BUFFER, tran);
    glBufferData(
        GL_ARRAY_BUFFER, translate.size() * sizeof(decltype(translate)::value_type), translate.data(), GL_DYNAMIC_DRAW);
}

void VertexManger::twist(Axis axis, Face face, RotateDir dir)
{
    unsigned int index = static_cast<unsigned int>(axis);
    for (unsigned int i = 0; i < offsets.size() / 3L; i++) {
        glm::vec4 block(offsets[i * 3L], offsets[i * 3L + 1L], offsets[i * 3L + 2L], 1.0f);
        glm::mat4 blockTran = translate[i];
        block = block * blockTran;
        switch (face) {
            case Face::Left:
                if (block[index] < -precision) {
                    twistOneBlock(i, axis, dir);
                }
                break;
            case Face::Middle:
                if (std::fabs(block[index]) < precision) {
                    twistOneBlock(i, axis, dir);
                }
                break;
            case Face::Right:
                if (block[index] > precision) {
                    twistOneBlock(i, axis, dir);
                }
                break;
            default:
                break;
        }
    }
    glBindBuffer(GL_ARRAY_BUFFER, tran);
    glBufferData(
        GL_ARRAY_BUFFER, translate.size() * sizeof(decltype(translate)::value_type), translate.data(), GL_DYNAMIC_DRAW);
}

void VertexManger::twistOneBlock(unsigned int blockIndex, Axis axis, RotateDir dir)
{
    unsigned int axisIndex = static_cast<unsigned int>(axis);
    int rotateDir = static_cast<int>(dir);
    glm::mat4& block = translate[blockIndex];
    glm::vec3 rotationAxis(0, 0, 0);
    rotationAxis[axisIndex] = 1.0f;
    block = glm::rotate(block, glm::radians(rotateDir * 90.0f), rotationAxis);
}
void VertexManger::twistOneBlock(unsigned int blockIndex, glm::vec3 axis, RotateDir dir)
{
    int rotateDir = static_cast<int>(dir);
    glm::mat4& block = translate[blockIndex];
    block = glm::rotate(block, glm::radians(rotateDir * 90.0f), axis);
}