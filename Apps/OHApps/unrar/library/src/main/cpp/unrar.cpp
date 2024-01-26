/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
#include "napi/native_api.h"
#include "rar.hpp"
#include "dll.hpp"
#include <fstream>
#include <js_native_api.h>
#include <js_native_api_types.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>
#include <fcntl.h>
#include <hilog/log.h>
#include <iostream>

#include <cstdio>
#include <locale.h>
#include <string>

#define _UNIX

#define LOG(...) OH_LOG_Print(LOG_APP, LOG_ERROR, LOG_DOMAIN, "wtf_c", __VA_ARGS__);
using namespace std;

struct ExtractCallBack {
    napi_async_work work;
    napi_ref callbackRef = nullptr; // 用于callback模式
    napi_deferred deferred;         // 用于promise模式
    std::string path;
    std::string dest2;
    std::string password;
    bool flag = false; //是否有输入密码
    std::string result = "";
    std::string value = "";
    bool ret = false;
};

const wchar_t *CgetWC(wchar_t *dest, const char *src) {
    const size_t cSize = strlen(src) + 1;
    mbstowcs(dest, src, cSize);

    return dest;
}

char *wchar2char(char *dest, wchar_t *WStr) {
    const size_t len = wcslen(WStr) + 1;
    wcstombs(dest, WStr, len);
    return dest;
}

static void getExtractFileExecute(napi_env env, void *datas) {
    // napi_async_execute_callback方法，该方法会在新起的线程中运行，一般在此函数中调用C++接口进行异步处理操作。
    ExtractCallBack *callback = static_cast<ExtractCallBack *>(datas);

    wchar_t nameW[NM];
    struct RAROpenArchiveDataEx data {};
    memset(nameW, 0, sizeof(char) * NM);

    wchar_t destPath[NM];
    memset(destPath, 0, sizeof(wchar_t) * NM);

    char *paths = new char[strlen(callback->path.c_str()) + 1];
    ;
    strcpy(paths, callback->path.c_str());

    char *dest2 = new char[strlen(callback->dest2.c_str()) + 1];
    ;
    strcpy(dest2, callback->dest2.c_str());

    CgetWC(nameW, paths);
    CgetWC(destPath, dest2);

    double mode = RAR_OM_EXTRACT;
    data.ArcNameW = nameW;

    data.OpenMode = (unsigned int)mode;

    HANDLE handle = RAROpenArchiveEx(&data);

    if (handle == nullptr || data.OpenResult) {
        if (handle) {
            RARCloseArchive(handle);
        }
        LOG(" buf =  加密---2");
        char err_str[128];
        LOG(" buf =  加密---3");
        napi_throw_error(env, err_str, "RarException");
        return;
    }
    if (callback->flag) {
        char *passwords = new char[strlen(callback->password.c_str()) + 1];
        ;
        strcpy(passwords, callback->password.c_str());
        RARSetPassword(handle, passwords); //190512
    } else {
        RARSetCallback(handle, nullptr, (LPARAM) nullptr);
    }
    char *results = "";
    struct RARHeaderDataEx header {};
    bool tag;
    bool tag2 = true;
    tag = true;
    if (callback->flag) {
        if (RARReadHeaderEx(handle, &header)) {
            results = "密码错误 ";
            tag = false;
        } else {
            int code = RARProcessFileW(handle, RAR_EXTRACT, destPath, NULL);
            if (code != 0) {
                results = header.FileName;
                tag = false;
            }
            while (!RARReadHeaderEx(handle, &header)) {
                int code = RARProcessFileW(handle, RAR_EXTRACT, destPath, NULL);
                if (code != 0) {
                    results = header.FileName;
                    tag = false;
                }
            }
        }
    } else {
        while (!RARReadHeaderEx(handle, &header)) {
            if (header.Flags == RHDF_ENCRYPTED) {
                results = header.FileName;
                tag2 = false;
                break;
            }
            int code = RARProcessFileW(handle, RAR_EXTRACT, destPath, NULL);
            if (code != 0) {
                results = header.FileName;
                tag = false;
            }
        }
    }

    if (handle) {
        RARCloseArchive(handle);
    }

    if (tag2) {
        string success = "解压成功";
        //napi_value result;
        if (tag) {
            callback->value = success;
        } else {
            string ss = results;
            string fail = ss + "文件解压失败";
            callback->value = fail;
        }
    } else {
        string ss = results;
        string fail = ss + "文件有加密，请输入密码！";
        callback->value = fail;
    }
}

static napi_value RarFile_isEncrypted(napi_env env, napi_callback_info info) {

    wchar_t nameW[NM];
    struct RAROpenArchiveDataEx data {};
    memset(nameW, 0, sizeof(char) * NM);

    size_t requireArgc = 1;
    size_t argc = 1;
    napi_value args[1] = {nullptr};

    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    char buf[1024];
    size_t size = 1024;
    napi_get_value_string_utf8(env, args[0], buf, size, &size);
    std::string path = buf;
    char *paths = buf;
    CgetWC(nameW, paths);

    size_t len = wcslen(nameW) + 1;
    char *CStr = (char *)malloc(len * sizeof(char));
    wchar2char(CStr, nameW);

    double mode;
    mode = RAR_OM_EXTRACT;

    data.ArcNameW = nameW;
    data.OpenMode = (unsigned int)mode;
    HANDLE handle = RAROpenArchiveEx(&data);
    if (handle == nullptr || data.OpenResult) {
        if (handle) {
            RARCloseArchive(handle);
        }
        char err_str[128];
        napi_throw_error(env, err_str, "RarException");
        return 0;
    }

    napi_value sum;
    if (data.Flags == ROADF_ENCHEADERS) {
        LOG(" buf =  加密");
        napi_create_int32(env, 1, &sum);

    } else {
        struct RARHeaderDataEx header {};
        bool tag2 = true;
        while (!RARReadHeaderEx(handle, &header)) {
            if (header.Flags == RHDF_ENCRYPTED) {
                tag2 = false;
                break;
            }
        }
        if (tag2) {
            LOG(" buf =  没加密 ");
            napi_create_int32(env, 0, &sum);
        } else {
            LOG(" buf =  加密");
            napi_create_int32(env, 1, &sum);
        }
    }
    if (handle) {
        RARCloseArchive(handle);
    }
    return sum;
}

static napi_value RarFiles_Extract(napi_env env, napi_callback_info info) {
    size_t requireArgc = 3;
    size_t argc = 3;
    napi_value args[3] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    ExtractCallBack *callback = new ExtractCallBack();
    char buf[NM];
    size_t size = NM;
    napi_get_value_string_utf8(env, args[0], buf, size, &size);
    // 解析入参
    callback->path = std::string(buf);

    char dest[NM];
    size_t sized = NM;
    napi_get_value_string_utf8(env, args[1], dest, sized, &sized);
    callback->dest2 = std::string(dest);

    char passwordss[NM];
    size_t sizes = NM;
    if (napi_ok == napi_get_value_string_utf8(env, args[2], passwordss, sizes, &sizes)) {
        char *passwords = passwordss;
        callback->password = std::string(passwordss);
        std::string pw = passwords;
        callback->flag = true;
        LOG(" buf =  加密");
    } else {
        LOG(" buf =  没加密 ");
        callback->flag = false;
    }


    // 说明是promise模式，
    napi_value promise = nullptr;
    napi_create_promise(env, &callback->deferred, &promise);
    napi_value resource = nullptr;
    napi_create_string_utf8(env, "RarFiles_Extract", NAPI_AUTO_LENGTH, &resource);
    // 创建异步工作
    napi_create_async_work(
        env, nullptr, resource,
        getExtractFileExecute,
        [](napi_env env, napi_status status, void *data) {
            ExtractCallBack *callback = static_cast<ExtractCallBack *>(data);
            napi_value result[2] = {0};
            napi_create_string_utf8(env, callback->value.c_str(), NAPI_AUTO_LENGTH, &result[1]);
            napi_resolve_deferred(env, callback->deferred, result[1]);
            napi_delete_async_work(env, callback->work); // 异步任务完成之后删除任务
            delete callback;
        },
        (void *)callback, &callback->work);
    napi_queue_async_work(env, callback->work); //异步任务入队列，排队执行
    return promise;
}

static napi_value RarFile_Extract(napi_env env, napi_callback_info info) {
    wchar_t nameW[NM];
    struct RAROpenArchiveDataEx data {};
    memset(nameW, 0, sizeof(char) * NM);
    size_t requireArgc = 3;
    size_t argc = 3;
    napi_value args[3] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    char buf[NM];
    size_t size = NM;
    napi_get_value_string_utf8(env, args[0], buf, size, &size);
    char *paths = buf;
    CgetWC(nameW, paths);
    LOG(" buf = OpenResult1 paths: %{public}s ", paths);

    /* char *test;
    const size_t cSize = NM;
    wcstombs(test, nameW, cSize);*/

    char dest[1024];
    size_t sized = 1024;
    napi_get_value_string_utf8(env, args[1], dest, sized, &sized);
    char *dests = dest;
    LOG(" buf = OpenResult1 dests: %{public}s ", dests);
    wchar_t destPath[NM];
    memset(destPath, 0, sizeof(wchar_t) * NM);
    CgetWC(destPath, dests);

    double mode = RAR_OM_EXTRACT;
    data.ArcNameW = nameW;

    data.OpenMode = (unsigned int)mode;

    HANDLE handle = RAROpenArchiveEx(&data);
    if (handle == nullptr || data.OpenResult) {
        if (handle) {
            RARCloseArchive(handle);
        }
        char err_str[128];
        napi_throw_error(env, err_str, "RarException");
        return 0;
    }
    char passwordss[NM];
    size_t sizes = NM;

    if (napi_ok == napi_get_value_string_utf8(env, args[2], passwordss, sizes, &sizes)) {
        char *passwords = passwordss;
        RARSetPassword(handle, passwords); //190512
        LOG(" buf = OpenResult4 password: %{public}s ", passwordss);
    } else {
        RARSetCallback(handle, nullptr, (LPARAM) nullptr);
    }
    char *results = "";
    struct RARHeaderDataEx header {};
    bool tag;
    tag = true;

    if (napi_ok == napi_get_value_string_utf8(env, args[2], passwordss, sizes, &sizes)) {
        if (RARReadHeaderEx(handle, &header)) {
            results = "密码错误 ";
            tag = false;
        } else {
            int code = RARProcessFileW(handle, RAR_EXTRACT, destPath, NULL);
            if (code != 0) {
                results = header.FileName;
                tag = false;
            }
            while (!RARReadHeaderEx(handle, &header)) {
                int code = RARProcessFileW(handle, RAR_EXTRACT, destPath, NULL);
                if (code != 0) {
                    results = header.FileName;
                    tag = false;
                }
            }
        }

    } else {
        while (!RARReadHeaderEx(handle, &header)) {
            int code = RARProcessFileW(handle, RAR_EXTRACT, destPath, NULL);
            if (code != 0) {
                results = header.FileName;
                tag = false;
            }
        }
    }

    if (handle) {
        RARCloseArchive(handle);
    }
    string success = "解压成功";
    napi_value result;
    if (tag) {
        napi_create_string_utf8(env, success.c_str(), success.length(), &result);
    } else {
        string ss = results;
        string fail = ss + "文件解压失败";
        napi_create_string_utf8(env, fail.c_str(), fail.length(), &result);
    }

    return result;
}

EXTERN_C_START
static napi_value Init(napi_env env, napi_value exports) {
    napi_property_descriptor desc[] = {
        {"isEncrypted", nullptr, RarFile_isEncrypted, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"RarFiles_Extract", nullptr, RarFiles_Extract, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"extract", nullptr, RarFile_Extract, nullptr, nullptr, nullptr, napi_default, nullptr}};
    napi_define_properties(env, exports, sizeof(desc) / sizeof(desc[0]), desc);
    return exports;
}
EXTERN_C_END

static napi_module demoModule = {
    .nm_version = 1,
    .nm_flags = 0,
    .nm_filename = nullptr,
    .nm_register_func = Init,
    .nm_modname = "unrar",
    .nm_priv = ((void *)0),
    .reserved = {0},
};

extern "C" __attribute__((constructor)) void RegisterModule(void) {
    napi_module_register(&demoModule);
}
