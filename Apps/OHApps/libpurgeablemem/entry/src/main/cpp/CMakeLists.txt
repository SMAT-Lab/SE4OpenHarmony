# the minimum version of CMake.
cmake_minimum_required(VERSION 3.4.1)
project(memory)

set(NATIVERENDER_ROOT_PATH ${CMAKE_CURRENT_SOURCE_DIR})

include_directories(${NATIVERENDER_ROOT_PATH}
                    ${NATIVERENDER_ROOT_PATH}/include)

add_library(memory SHARED memory.cpp)
target_link_libraries(memory PUBLIC libace_napi.z.so libc++.a libpurgeable_memory_ndk.z.so)
