# the minimum version of CMake.
cmake_minimum_required(VERSION 3.4.1)
project(memory)

set(NATIVERENDER_ROOT_PATH ${CMAKE_CURRENT_SOURCE_DIR})

include_directories(${NATIVERENDER_ROOT_PATH}
                    ${NATIVERENDER_ROOT_PATH}/include)

add_library(mediacodecbasexdlndk SHARED mediacodecbasexdlndk.cpp)
target_link_libraries(mediacodecbasexdlndk PUBLIC libace_napi.z.so libhilog_ndk.z.so libnative_media_avsource.so libnative_media_core.so libnative_media_aenc.so libnative_media_codecbase.so libnative_media_adec.so)

add_library(audiodecoderxdlndk SHARED audiodecoderxdlndk.cpp)
target_link_libraries(audiodecoderxdlndk PUBLIC libace_napi.z.so libhilog_ndk.z.so libnative_media_core.so libnative_media_adec.so libnative_media_codecbase.so)

add_library(audioencoderxdlndk SHARED audioencoderxdlndk.cpp)
target_link_libraries(audioencoderxdlndk PUBLIC libace_napi.z.so libhilog_ndk.z.so libnative_media_core.so libnative_media_aenc.so libnative_media_codecbase.so)

add_library(videodecoderndk SHARED videodecoderndk.cpp)
target_link_libraries(videodecoderndk PUBLIC libace_napi.z.so libhilog_ndk.z.so libnative_media_core.so libnative_media_codecbase.so libnative_window.so libnative_media_vdec.so)

add_library(videoencoderndk SHARED videoencoderndk.cpp)
target_link_libraries(videoencoderndk PUBLIC libace_napi.z.so libhilog_ndk.z.so libnative_media_core.so libnative_media_codecbase.so libnative_media_venc.so libnative_window.so)

add_library(nativendk SHARED nativendk.cpp)
target_link_libraries(nativendk PUBLIC libace_napi.z.so libhilog_ndk.z.so libnative_media_avsource.so libnative_media_core.so libnative_media_aenc.so libnative_media_codecbase.so libnative_media_adec.so)

add_library(nativeavdemuxerndk SHARED nativeavdemuxerndk.cpp)
target_link_libraries(nativeavdemuxerndk PUBLIC libace_napi.z.so libhilog_ndk.z.so libnative_media_core.so libnative_media_codecbase.so libnative_media_venc.so libnative_window.so libnative_media_avdemuxer.so libnative_media_avmuxer.so libnative_media_avsource.so)

add_library(multimediaCore SHARED multimediaCore.cpp)
target_link_libraries(multimediaCore PUBLIC libace_napi.z.so libace_napi.z.so libc++.a libhilog_ndk.z.so libnative_media_adec.so libnative_media_codecbase.so libnative_media_core.so libnative_media_core.so libnative_media_core.so)

add_library(mediaavsourcendk SHARED mediaavsourcendk.cpp)
target_link_libraries(mediaavsourcendk PUBLIC libace_napi.z.so libhilog_ndk.z.so libnative_media_core.so libnative_media_codecbase.so libnative_media_venc.so libnative_window.so libnative_media_avmuxer.so libnative_media_avsource.so)

add_library(nativeavmuxerndk SHARED nativeavmuxerndk.cpp)
target_link_libraries(nativeavmuxerndk PUBLIC libace_napi.z.so libhilog_ndk.z.so libnative_media_core.so libnative_media_codecbase.so libnative_media_venc.so libnative_window.so libnative_media_avmuxer.so)