# the minimum version of CMake.
cmake_minimum_required(VERSION 3.4.1)
project(myNpmLib)

set(NATIVERENDER_ROOT_PATH ${CMAKE_CURRENT_SOURCE_DIR})

include_directories(${NATIVERENDER_ROOT_PATH}
                    ${NATIVERENDER_ROOT_PATH}/include)

add_subdirectory(libunrar)
include_directories(libunrar)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -DLITTLE_ENDIAN")

set(CMAKE_CXX_FLAGS_RELEASE "${CMAKE_CXX_FLAGS_RELEASE} -fvisibility=hidden")

add_library(unrar SHARED unrar.cpp)
target_link_libraries(unrar PUBLIC libace_napi.z.so libhilog_ndk.z.so static_unrar)
