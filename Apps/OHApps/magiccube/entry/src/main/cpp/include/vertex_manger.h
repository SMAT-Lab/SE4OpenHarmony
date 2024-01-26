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

#ifndef VERTEXMANGER_H
#define VERTEXMANGER_H

#include <vector>
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/type_ptr.hpp>
enum class Axis { X, Y, Z };

enum class Face { Left, Middle, Right };

enum class RotateDir : int { clockwise = -1, Counterclockwise = 1 };

class VertexManger {
public:
    VertexManger(std::vector<float> vertices, std::vector<float> colors, std::vector<float> offsets);
    ~VertexManger();
    void draw();
    void twist(Axis axis, Face face, glm::mat4 view, RotateDir dir);
    void twist(Axis axis, Face face, RotateDir dir = RotateDir::Counterclockwise);

protected:
    unsigned int vao;
    unsigned int vbo;
    unsigned int co;
    unsigned int ofs;
    unsigned int tran;
    std::vector<float> vertices;
    std::vector<float> colors;
    std::vector<float> offsets;
    std::vector<glm::mat4> translate;
    void twistOneBlock(unsigned int blockIndex, Axis axis, RotateDir dir);
    void twistOneBlock(unsigned int blockIndex, glm::vec3 axis, RotateDir dir);
};
#endif