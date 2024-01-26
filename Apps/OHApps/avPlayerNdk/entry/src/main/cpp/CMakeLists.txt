# the minimum version of CMake.
cmake_minimum_required(VERSION 3.4.1)
project(memory)

set(NATIVERENDER_ROOT_PATH ${CMAKE_CURRENT_SOURCE_DIR})

include_directories(${NATIVERENDER_ROOT_PATH}
                    ${NATIVERENDER_ROOT_PATH}/include)

add_library(avplayerndk SHARED avplayerndk.cpp)
target_link_libraries(avplayerndk PUBLIC libace_napi.z.so libhilog_ndk.z.so libnative_media_core.so libnative_media_codecbase.so libnative_media_venc.so libnative_window.so libavplayer.so libnative_image.so libGLESv3.so libEGL.so)
