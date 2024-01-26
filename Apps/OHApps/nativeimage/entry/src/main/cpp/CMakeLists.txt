# the minimum version of CMake.
cmake_minimum_required(VERSION 3.4.1)
project(nativeimage)

set(NATIVERENDER_ROOT_PATH ${CMAKE_CURRENT_SOURCE_DIR})

include_directories(${NATIVERENDER_ROOT_PATH}
                    ${NATIVERENDER_ROOT_PATH}/include)

add_library(nativeimage SHARED nativeimage.cpp)
target_link_libraries(nativeimage PUBLIC libace_napi.z.so  libnative_image.so  libGLESv3.so libEGL.so  libnative_window.so libhilog_ndk.z.so)
