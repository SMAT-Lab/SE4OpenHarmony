#
#  Copyright (c) 2023 Huawei Device Co., Ltd.
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.
#

# the minimum version of CMake.
cmake_minimum_required(VERSION 3.4.1)

# project
project(i2cOpengl)

set(NATIVE_ROOT_PATH ${CMAKE_CURRENT_SOURCE_DIR})

# include directory
include_directories(${NATIVE_ROOT_PATH}
                    ${NATIVE_ROOT_PATH}/include
                    ${NATIVE_ROOT_PATH}/include/util)

# build shared library
add_library(i2cOpengl SHARED
            module.cpp
            app_napi.cpp
            i2cOpengl.cpp
            napi_manager.cpp
            napi_util.cpp)

# link OpenHarmony native library （Use OpenGL）
target_link_libraries(i2cOpengl PUBLIC EGL)
target_link_libraries(i2cOpengl PUBLIC GLESv3)
target_link_libraries(i2cOpengl PUBLIC hilog_ndk.z)
target_link_libraries(i2cOpengl PUBLIC ace_ndk.z)
target_link_libraries(i2cOpengl PUBLIC ace_napi.z)
target_link_libraries(i2cOpengl PUBLIC libc++.a)
target_link_libraries(i2cOpengl PUBLIC z)
target_link_libraries(i2cOpengl PUBLIC uv)
target_link_libraries(i2cOpengl PUBLIC libace_napi.z.so)
