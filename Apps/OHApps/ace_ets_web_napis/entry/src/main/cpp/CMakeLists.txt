# the minimum version of CMake.
cmake_minimum_required(VERSION 3.4.1)
project(NDKjsb)
set(NATIVERENDER_ROOT_PATH ${CMAKE_CURRENT_SOURCE_DIR})
include_directories(${NATIVERENDER_ROOT_PATH}
                    ${NATIVERENDER_ROOT_PATH}/include)
add_library(entry SHARED hello.cpp)
#target_link_libraries(entry PUBLIC libace_napi.z.so)
find_library(
    # Sets the name of the path variable.
    hilog-lib
    # Specifies the name of the NDK library that
    # you want CMake to locate.
    hilog_ndk.z
)
find_library(
    # Sets the name of the path variable.
    web-lib
    # Specifies the name of the NDK library that
    # you want CMake to locate.
    web_ndk.z
)
target_link_libraries(entry PUBLIC libace_napi.z.so  libohweb.so)