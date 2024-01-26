# the minimum version of CMake.
cmake_minimum_required(VERSION 3.4.1)
project(XComponent)

# 判断操作系统类型
if(${CMAKE_HOST_SYSTEM_NAME} MATCHES "Windows" OR ${CMAKE_HOST_SYSTEM_NAME} MATCHES "Darwin")
    # 如果是 Windows 或者 MacOS,请手动打patch.
    message("The current operating system is: Windows OR MacOS.Please insert patch manually")
elseif(${CMAKE_HOST_SYSTEM_NAME} MATCHES "Linux")
    # 如果是 Linux
    message("The current operating system is: Linux")
    add_custom_command(
        OUTPUT out.c
        COMMAND touch out.c
        COMMAND cd ${CMAKE_CURRENT_SOURCE_DIR}/thirdModule/
        COMMAND bash modify.sh
        VERBATIM)
else()
    message(FATAL_ERROR "Unsupported operating system type")
endif()

set(NATIVERENDER_ROOT_PATH ${CMAKE_CURRENT_SOURCE_DIR})
aux_source_directory(gloox/src SOUCE_FILES)
include_directories(${NATIVERENDER_ROOT_PATH}
                    ${NATIVERENDER_ROOT_PATH}/include
                    gloox
                    )
if(${CMAKE_HOST_SYSTEM_NAME} MATCHES "Windows" OR ${CMAKE_HOST_SYSTEM_NAME} MATCHES "Darwin")
    # 如果是 Windows or MacOS,请手动打patch.
    message("add_library: Windows or MacOS")
    add_library(entry SHARED
            smack_napi_interface.cpp
            log_ohos.cpp
            Smack.cpp
            room.cpp
            registration.cpp
            MyMUCInvitationHandler.cpp
            ${SOUCE_FILES})
elseif(${CMAKE_HOST_SYSTEM_NAME} MATCHES "Linux")
    # 如果是 Linux
    message("add_library: Linux")
    add_library(entry SHARED
            out.c
            smack_napi_interface.cpp
            log_ohos.cpp
            Smack.cpp
            room.cpp
            registration.cpp
            MyMUCInvitationHandler.cpp
            ${SOUCE_FILES})
endif()

target_link_libraries(entry PUBLIC libace_napi.z.so libc++.a libhilog_ndk.z.so)