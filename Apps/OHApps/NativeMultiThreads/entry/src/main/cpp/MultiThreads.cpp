/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
#include "ProducerConsumer.h"
#include <vector>
#include <thread>

using namespace std;

// define global thread safe function
static napi_threadsafe_function tsFun = nullptr;

static constexpr int MAX_MSG_QUEUE_SIZE = 0; // indicates that the queue length is not limited
static constexpr int INITIAL_THREAD_COUNT = 1;

// context data provided by users
// data is transferred between the native method (initialization data), ExecuteFunc, and CompleteFunc
struct ContextData {
    napi_async_work asyncWork = nullptr; // async work object
    napi_deferred deferred = nullptr;    // associated object of the delay object promise
    napi_ref callbackRef = nullptr;      // reference of callback
    string args = "";                    // parameters from ArkTS --- imageName
    string result = "";                  // C++ sub-thread calculation result --- imagePath
};

// define the buffer queue and set the capacity to 1
static ProducerConsumerQueue buffQueue(1);

// defines the image path set, which is used for later search
static vector<string> imagePathVec{"sync.png", "callback.png", "promise.png", "tsf.png"};

// check the image paths based on the image name
static bool CheckImagePath(const string &imageName, const string &imagePath) {
    // separate character strings by suffix
    size_t pos = imagePath.find_first_of('.');
    if (pos == string::npos) {
        return false;
    }

    string nameTemp = imagePath.substr(0, pos);
    if (nameTemp.empty()) {
        return false;
    }

    // determine whether the image path is the target path based on whether the image names are the same
    return (imageName == nameTemp);
}

// search for image paths by image name
static string SearchImagePath(const string &imageName) {
    for (const string &imagePath : imagePathVec) {
        if (CheckImagePath(imageName, imagePath)) {
            return imagePath;
        }
    }

    return string("");
}

static void ProductElement(void *data) {
    buffQueue.PutElement(SearchImagePath(static_cast<ContextData *>(data)->args));
}

static void ConsumeElement(void *data) { static_cast<ContextData *>(data)->result = buffQueue.TakeElement(); }

static void ConsumeElementTSF(void *data) {
    static_cast<ContextData *>(data)->result = buffQueue.TakeElement();
    // bind consumer thread to the thread safe function
    (void)napi_acquire_threadsafe_function(tsFun);
    // send async task to the JS main thread EventLoop
    (void)napi_call_threadsafe_function(tsFun, data, napi_tsfn_blocking);
    // release thread reference
    (void)napi_release_threadsafe_function(tsFun, napi_tsfn_release);
}

static void DeleteContext(napi_env env, ContextData *contextData) {
    // delete callback reference
    if (contextData->callbackRef != nullptr) {
        (void)napi_delete_reference(env, contextData->callbackRef);
    }

    // delete async work
    if (contextData->asyncWork != nullptr) {
        (void)napi_delete_async_work(env, contextData->asyncWork);
    }

    // release context data
    delete contextData;
}

static void ExecuteFunc([[maybe_unused]] napi_env env, void *data) {
    // create producer thread
    thread producer(ProductElement, data);
    // the producer and consumer threads must be synchronized
    // otherwise, the complete operation is triggered to communicate with the ArkTS after the executeFunc is complete
    // the result is unpredictable
    producer.join();

    // create consumer thread
    thread consumer(ConsumeElement, data);
    consumer.join();
}

static void CompleteFuncCallBack(napi_env env, [[maybe_unused]] napi_status status, void *data) {
    // parse context data
    ContextData *contextData = static_cast<ContextData *>(data);

    napi_value callBack = nullptr;
    napi_status operStatus = napi_get_reference_value(env, contextData->callbackRef, &callBack);
    if (operStatus != napi_ok) {
        DeleteContext(env, contextData);
        return;
    }

    // define the undefined variable, which is used in napi_call_function
    // because no other data is transferred, the variable is defined as undefined
    napi_value undefined = nullptr;
    operStatus = napi_get_undefined(env, &undefined);
    if (operStatus != napi_ok) {
        DeleteContext(env, contextData);
        return;
    }

    // convert the calculation result of C++ sub-thread to the napi_value type
    napi_value callBackArgs = nullptr;
    operStatus = napi_create_string_utf8(env, contextData->result.c_str(), contextData->result.length(), &callBackArgs);
    if (operStatus != napi_ok) {
        DeleteContext(env, contextData);
        return;
    }

    // call the JS callback and send the async calculation result on the Native to ArkTS application
    napi_value callBackResult = nullptr;
    (void)napi_call_function(env, undefined, callBack, 1, &callBackArgs, &callBackResult);

    // destroy data and release memory
    DeleteContext(env, contextData);
}

static void CompleteFuncPromise(napi_env env, [[maybe_unused]] napi_status status, void *data) {
    // parse context data
    ContextData *contextData = static_cast<ContextData *>(data);

    // convert the calculation result of C++ sub-thread to the napi_value type
    napi_value promiseArgs = nullptr;
    napi_status operStatus =
        napi_create_string_utf8(env, contextData->result.c_str(), contextData->result.length(), &promiseArgs);
    if (operStatus != napi_ok) {
        DeleteContext(env, contextData);
        return;
    }

    // the deferred and promise object are associated. the result is sent to ArkTS application through this interface
    operStatus = napi_resolve_deferred(env, contextData->deferred, promiseArgs);
    if (operStatus != napi_ok) {
        DeleteContext(env, contextData);
        return;
    }

    // destroy data and release memory
    DeleteContext(env, contextData);
}

static void CallJsFunction(napi_env env, napi_value callBack, [[maybe_unused]] void *context, void *data) {
    // parse context data
    ContextData *contextData = static_cast<ContextData *>(data);

    // define the undefined variable, which is used in napi_call_function
    // because no other data is transferred, the variable is defined as undefined
    napi_value undefined = nullptr;
    napi_status operStatus = napi_get_undefined(env, &undefined);
    if (operStatus != napi_ok) {
        DeleteContext(env, contextData);
        return;
    }

    // convert the calculation result of C++ sub-thread to the napi_value type
    napi_value callBackArgs = nullptr;
    operStatus = napi_create_string_utf8(env, contextData->result.c_str(), contextData->result.length(), &callBackArgs);
    if (operStatus != napi_ok) {
        DeleteContext(env, contextData);
        return;
    }

    // call the JS callback and send the async calculation result on the Native to ArkTS application
    napi_value callBackResult = nullptr;
    (void)napi_call_function(env, undefined, callBack, 1, &callBackArgs, &callBackResult);

    // destroy data and release memory
    DeleteContext(env, contextData);
}

// sync interface
static napi_value GetImagePathSync(napi_env env, napi_callback_info info) {
    size_t paraNum = 1;
    napi_value paraArray[1] = {nullptr};

    // parse parameters
    napi_status operStatus = napi_get_cb_info(env, info, &paraNum, paraArray, nullptr, nullptr);
    if (operStatus != napi_ok) {
        return nullptr;
    }

    napi_valuetype paraDataType = napi_undefined;
    operStatus = napi_typeof(env, paraArray[0], &paraDataType);
    if ((operStatus != napi_ok) || (paraDataType != napi_string)) {
        return nullptr;
    }

    // convert napi_value to char *
    constexpr size_t buffSize = 100;
    char strBuff[buffSize]{}; // char buffer for imageName string
    size_t strLength = 0;
    operStatus = napi_get_value_string_utf8(env, paraArray[0], strBuff, buffSize, &strLength);
    if ((operStatus != napi_ok) || (strLength == 0)) {
        return nullptr;
    }

    // defines context data. the memory will be released in CompleteFunc
    auto contextData = new ContextData;
    contextData->args = strBuff;

    // create producer thread
    thread producer(ProductElement, static_cast<void *>(contextData));
    producer.join();

    // create consumer thread
    thread consumer(ConsumeElement, static_cast<void *>(contextData));
    consumer.join();

    // convert the result to napi_value and send it to ArkTs application
    napi_value result = nullptr;
    (void)napi_create_string_utf8(env, contextData->result.c_str(), contextData->result.length(), &result);

    // delete context data
    DeleteContext(env, contextData);
    return result;
}

// callback async interface
static napi_value GetImagePathAsyncCallBack(napi_env env, napi_callback_info info) {
    size_t paraNum = 2;
    napi_value paraArray[2] = {nullptr};

    // parse parameters
    napi_status operStatus = napi_get_cb_info(env, info, &paraNum, paraArray, nullptr, nullptr);
    if (operStatus != napi_ok) {
        return nullptr;
    }

    napi_valuetype paraDataType = napi_undefined;
    operStatus = napi_typeof(env, paraArray[0], &paraDataType);
    if ((operStatus != napi_ok) || (paraDataType != napi_string)) {
        return nullptr;
    }

    operStatus = napi_typeof(env, paraArray[1], &paraDataType);
    if ((operStatus != napi_ok) || (paraDataType != napi_function)) {
        return nullptr;
    }

    // napi_value convert to char *
    constexpr size_t buffSize = 100;
    char strBuff[buffSize]{}; // char buffer for imageName string
    size_t strLength = 0;
    operStatus = napi_get_value_string_utf8(env, paraArray[0], strBuff, buffSize, &strLength);
    if ((operStatus != napi_ok) || (strLength == 0)) {
        return nullptr;
    }

    // defines context data. the memory will be released in CompleteFunc
    auto contextData = new ContextData;
    contextData->args = strBuff;
    operStatus = napi_create_reference(env, paraArray[1], 1, &contextData->callbackRef);
    if (operStatus != napi_ok) {
        DeleteContext(env, contextData);
        return nullptr;
    }

    // async resource
    napi_value asyncName = nullptr;
    string asyncStr = "async callback";
    operStatus = napi_create_string_utf8(env, asyncStr.c_str(), asyncStr.length(), &asyncName);
    if (operStatus != napi_ok) {
        DeleteContext(env, contextData);
        return nullptr;
    }

    // create async work
    operStatus = napi_create_async_work(env, nullptr, asyncName, ExecuteFunc, CompleteFuncCallBack,
                                        static_cast<void *>(contextData), &contextData->asyncWork);
    if (operStatus != napi_ok) {
        DeleteContext(env, contextData);
        return nullptr;
    }

    // add the async work to the queue and wait for scheduling
    operStatus = napi_queue_async_work(env, contextData->asyncWork);
    if (operStatus != napi_ok) {
        DeleteContext(env, contextData);
    }

    return nullptr;
}

// promise async interface
static napi_value GetImagePathAsyncPromise(napi_env env, napi_callback_info info) {
    size_t paraNum = 1;
    napi_value paraArray[1] = {nullptr};

    // parse parameters
    napi_status operStatus = napi_get_cb_info(env, info, &paraNum, paraArray, nullptr, nullptr);
    if (operStatus != napi_ok) {
        return nullptr;
    }

    napi_valuetype paraDataType = napi_undefined;
    operStatus = napi_typeof(env, paraArray[0], &paraDataType);
    if ((operStatus != napi_ok) || (paraDataType != napi_string)) {
        return nullptr;
    }

    // napi_value convert to char *
    constexpr size_t buffSize = 100;
    char strBuff[buffSize]{}; // char buffer for imageName string
    size_t strLength = 0;
    operStatus = napi_get_value_string_utf8(env, paraArray[0], strBuff, buffSize, &strLength);
    if ((operStatus != napi_ok) || (strLength == 0)) {
        return nullptr;
    }

    // defines context data. the memory will be released in CompleteFunc
    auto contextData = new ContextData;
    contextData->args = strBuff;

    // async resource
    napi_value asyncName = nullptr;
    string asyncStr = "async promise";
    operStatus = napi_create_string_utf8(env, asyncStr.c_str(), asyncStr.length(), &asyncName);
    if (operStatus != napi_ok) {
        DeleteContext(env, contextData);
        return nullptr;
    }

    // create async work
    operStatus = napi_create_async_work(env, nullptr, asyncName, ExecuteFunc, CompleteFuncPromise,
                                        static_cast<void *>(contextData), &contextData->asyncWork);
    if (operStatus != napi_ok) {
        DeleteContext(env, contextData);
        return nullptr;
    }

    // add the async work to the queue and wait for scheduling
    operStatus = napi_queue_async_work(env, contextData->asyncWork);
    if (operStatus != napi_ok) {
        DeleteContext(env, contextData);
        return nullptr;
    }

    // create promise object
    napi_value promiseObj = nullptr;
    operStatus = napi_create_promise(env, &contextData->deferred, &promiseObj);
    if (operStatus != napi_ok) {
        DeleteContext(env, contextData);
        return nullptr;
    }

    return promiseObj;
}

// thread safe function async interface
static napi_value GetImagePathAsyncTSF(napi_env env, napi_callback_info info) {
    size_t paraNum = 2;
    napi_value paraArray[2] = {nullptr};

    // parse parameters
    napi_status operStatus = napi_get_cb_info(env, info, &paraNum, paraArray, nullptr, nullptr);
    if (operStatus != napi_ok) {
        return nullptr;
    }

    napi_valuetype paraDataType = napi_undefined;
    operStatus = napi_typeof(env, paraArray[0], &paraDataType);
    if ((operStatus != napi_ok) || (paraDataType != napi_string)) {
        return nullptr;
    }

    operStatus = napi_typeof(env, paraArray[1], &paraDataType);
    if ((operStatus != napi_ok) || (paraDataType != napi_function)) {
        return nullptr;
    }

    // napi_value convert to char *
    constexpr size_t buffSize = 100;
    char strBuff[buffSize]{}; // char buffer for imageName string
    size_t strLength = 0;
    operStatus = napi_get_value_string_utf8(env, paraArray[0], strBuff, buffSize, &strLength);
    if ((operStatus != napi_ok) || (strLength == 0)) {
        return nullptr;
    }

    // async resource
    napi_value asyncName = nullptr;
    string asyncStr = "async napi_threadsafe_function";
    operStatus = napi_create_string_utf8(env, asyncStr.c_str(), asyncStr.length(), &asyncName);
    if (operStatus != napi_ok) {
        return nullptr;
    }

    // defines context data. the memory will be released in CompleteFunc
    auto contextData = new ContextData;
    contextData->args = strBuff;

    // create thread safe function
    if (tsFun == nullptr) {
        operStatus =
            napi_create_threadsafe_function(env, paraArray[1], nullptr, asyncName, MAX_MSG_QUEUE_SIZE,
                                            INITIAL_THREAD_COUNT, nullptr, nullptr, nullptr, CallJsFunction, &tsFun);
        if (operStatus != napi_ok) {
            DeleteContext(env, contextData);
            return nullptr;
        }
    }

    // create producer thread
    thread producer(ProductElement, static_cast<void *>(contextData));
    producer.detach(); // must be detached

    // create consumer thread
    thread consumer(ConsumeElementTSF, static_cast<void *>(contextData));
    consumer.detach();

    return nullptr;
}

EXTERN_C_START
static napi_value Init(napi_env env, napi_value exports) {
    napi_property_descriptor desc[] = {
        {"getImagePathSync", nullptr, GetImagePathSync, nullptr, nullptr, nullptr, napi_default, nullptr},
        {"getImagePathAsyncCallBack", nullptr, GetImagePathAsyncCallBack, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"getImagePathAsyncPromise", nullptr, GetImagePathAsyncPromise, nullptr, nullptr, nullptr, napi_default,
         nullptr},
        {"getImagePathAsyncTSF", nullptr, GetImagePathAsyncTSF, nullptr, nullptr, nullptr, napi_default, nullptr}};
    napi_define_properties(env, exports, sizeof(desc) / sizeof(desc[0]), desc);
    return exports;
}
EXTERN_C_END

static napi_module demoModule = {
    .nm_version = 1,
    .nm_flags = 0,
    .nm_filename = nullptr,
    .nm_register_func = Init,
    .nm_modname = "entry",
    .nm_priv = ((void *)0),
    .reserved = {0},
};

extern "C" __attribute__((constructor)) void RegisterEntryModule(void) { napi_module_register(&demoModule); }
