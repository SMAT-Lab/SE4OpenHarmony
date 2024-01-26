# the minimum version of CMake.
cmake_minimum_required(VERSION 3.4.1)
project(BehaviorTree)

set(NATIVERENDER_ROOT_PATH ${CMAKE_CURRENT_SOURCE_DIR})

#####################################################################
set(OHOS_PLATFORM OHOS)
set(BUILD_SHARED_LIBS true)
set(OHOS_STL c++_shared)
# 不知道干嘛的
set(CMAKE_SKIP_BUILD_RPATH FALSE)
set(CMAKE_INSTALL_RPATH $ORIGIN)
set(CMAKE_BUILD_WITH_INSTALL_RPATH TRUE)

include_directories(${NATIVERENDER_ROOT_PATH}
                    ${NATIVERENDER_ROOT_PATH}/include)



# 在当前目录下的behaviortree_cpp下搜索cmakelists.txt文件
add_compile_options(-Wno-unused-command-line-argument)
add_subdirectory(behaviortree_cpp)

add_library(entry SHARED hello.cpp)
target_link_libraries(entry PUBLIC libace_napi.z.so
                      )
######################################################################
