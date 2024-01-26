# the minimum version of CMake.
cmake_minimum_required(VERSION 3.4.1)
project(drawing)

set(NATIVERENDER_ROOT_PATH ${CMAKE_CURRENT_SOURCE_DIR})

include_directories(${NATIVERENDER_ROOT_PATH}
                    ${NATIVERENDER_ROOT_PATH}/include)

add_library(nativeDrawingndk SHARED nativeDrawingndk.cpp)
target_link_libraries(nativeDrawingndk PUBLIC libace_napi.z.so libnative_drawing.so libhilog_ndk.z.so)