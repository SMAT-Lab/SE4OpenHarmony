/* Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */

#include <iostream>
#include <mindspore/model.h>
#include <mindspore/context.h>
#include <mindspore/status.h>
#include <mindspore/tensor.h>
#include <rawfile/raw_file_manager.h>
#include <hilog/log.h>
#include "napi/native_api.h"
#include "./ai_log.h"

// 读取模型文件。
static void *ReadModelFile(NativeResourceManager *nativeResourceManager,\
                           const std::string &modelName, size_t *modelSize)
{
    auto rawFile = OH_ResourceManager_OpenRawFile(nativeResourceManager, modelName.c_str());
    if (rawFile == nullptr) {
        LOGE("Open model file failed");
        return nullptr;
    }
    long fileSize = OH_ResourceManager_GetRawFileSize(rawFile);
    if (fileSize <= 0) {
        LOGE("Get model filesize failed");
        return nullptr;
    }
    void *modelBuffer = malloc(fileSize);
    if (modelBuffer == nullptr) {
        LOGE("Get model file size failed");
    }
    int ret = OH_ResourceManager_ReadRawFile(rawFile, modelBuffer, fileSize);
    if (ret == 0) {
        LOGE("Read model file failed");
        OH_ResourceManager_CloseRawFile(rawFile);
        return nullptr;
    }
    OH_ResourceManager_CloseRawFile(rawFile);
    *modelSize = fileSize;
    return modelBuffer;
}
// 创建上下文，设置线程数、设备类型等参数，并加载模型。
static void DestroyModelBuffer(void **buffer)
{
    if (buffer == nullptr) {
        return;
    }
    free(*buffer);
    *buffer = nullptr;
}

static OH_AI_ModelHandle CreateMSLiteModel(void *modelBuffer, size_t modelSize)
{
    // 创建上下文
    auto context = OH_AI_ContextCreate();
        LOGI("Creat Context.\n");
    if (context == nullptr) {
        DestroyModelBuffer(&modelBuffer);
        LOGE("Create MSLite context failed.\n");
        return nullptr;
    }
    auto cpu_device_info = OH_AI_DeviceInfoCreate(OH_AI_DEVICETYPE_CPU);
    OH_AI_ContextAddDeviceInfo(context, cpu_device_info);

    // 加载.ms模型文件
    auto model = OH_AI_ModelCreate();
    if (model == nullptr) {
        DestroyModelBuffer(&modelBuffer);
        LOGE("Allocate MSLite Model failed.\n");
        return nullptr;
    }

    auto build_ret = OH_AI_ModelBuild(model, modelBuffer, modelSize, OH_AI_MODELTYPE_MINDIR, context);
    LOGI("Loader msfile.\n");
    DestroyModelBuffer(&modelBuffer);
    if (build_ret != OH_AI_STATUS_SUCCESS) {
        OH_AI_ModelDestroy(&model);
        LOGE("Build MSLite model failed.\n");
        return nullptr;
    }
    LOGI("Build MSLite model success.\n");
    return model;
}

constexpr int K_NUM_PRINT_OF_OUT_DATA = 10;

static void FillTensorWithRandom(OH_AI_TensorHandle msTensor)
{
    auto size = OH_AI_TensorGetDataSize(msTensor);
    float *data = (float *)OH_AI_TensorGetMutableData(msTensor);
    for (int width = 0; width < 28L; width++) {
        for (int lenth = 0; lenth < 28L; lenth++) {
            *(data + width * 28L + lenth) = 0.5F;
        }
    }
}

// fill data to inputs tensor
static int FillInputTensors(OH_AI_TensorHandleArray &inputs)
{
    for (size_t i = 0; i < inputs.handle_num; i++) {
        FillTensorWithRandom(inputs.handle_list[i]);
    }
    return OH_AI_STATUS_SUCCESS;
}

// 设置模型输入数据，执行模型推理并获取输出数据。
static void RunMSLiteModel(OH_AI_ModelHandle model)
{
    // 设置模型输入数据
    auto inputs = OH_AI_ModelGetInputs(model);
    FillInputTensors(inputs);

    auto outputs = OH_AI_ModelGetOutputs(model);
    
    // 执行推理并打印输出
    auto predict_ret = OH_AI_ModelPredict(model, inputs, &outputs, nullptr, nullptr);
    if (predict_ret != OH_AI_STATUS_SUCCESS) {
        OH_AI_ModelDestroy(&model);
        LOGE("Predict MSLite model error.\n");
        return;
    }
    LOGI("Run MSLite model success.\n");

    LOGI("Get model outputs:\n");
    for (size_t i = 0; i < outputs.handle_num; i++) {
        auto tensor = outputs.handle_list[i];
        LOGI("- Tensor %{public}d name is: %{public}s.\n", static_cast<int>(i), OH_AI_TensorGetName(tensor));
        LOGI("- Tensor %{public}d size is: %{public}d.\n", static_cast<int>(i), (int)OH_AI_TensorGetDataSize(tensor));
        auto out_data = reinterpret_cast<const float *>(OH_AI_TensorGetData(tensor));
        std::cout << "Output data is:";
        for (int i = 0; (i < (int)OH_AI_TensorGetElementNum(tensor) && i < K_NUM_PRINT_OF_OUT_DATA); i++) {
            std::cout << out_data[i] << " ----";
        }
        std::cout << std::endl;
    }
    OH_AI_ModelDestroy(&model);
}

static napi_value RunDemo(napi_env env, napi_callback_info info)
{
    LOGI("Enter runDemo()");
    size_t argc = 2;
    napi_value argv[2] = {nullptr};
    napi_value thisVar = nullptr;
    void *data = nullptr;
    napi_get_cb_info(env, info, &argc, argv, &thisVar, &data);
    napi_value error_ret;
    napi_create_int32(env, -1, &error_ret);
    const std::string modelName = "lenet.ms";
    size_t modelSize;
    auto resourcesManager = OH_ResourceManager_InitNativeResourceManager(env, argv[1]);
    auto modelBuffer = ReadModelFile(resourcesManager, modelName, &modelSize);
    if (modelBuffer == nullptr) {
        LOGE("Read model failed");
        return error_ret;
    }
    LOGI("Read model file success");

    auto model = CreateMSLiteModel(modelBuffer, modelSize);
    if (model == nullptr) {
        OH_AI_ModelDestroy(&model);
        LOGE("MSLiteFwk Build model failed.\n");
        return error_ret;
    }
    LOGI("Create model file success");

    RunMSLiteModel(model);

    napi_value success_ret;
    napi_create_int32(env, 0, &success_ret);

    LOGI("Exit runDemo()");
    return success_ret;
}

EXTERN_C_START
static napi_value Init(napi_env env, napi_value exports)
{
    napi_property_descriptor desc[] = {
        { "runDemo", nullptr, RunDemo, nullptr, nullptr, nullptr, napi_default, nullptr }
    };
    napi_define_properties(env, exports, sizeof(desc) / sizeof(desc[0]), desc);
    return exports;
}
EXTERN_C_END

static napi_module demoModule = {
    .nm_version =1,
    .nm_flags = 0,
    .nm_filename = nullptr,
    .nm_register_func = Init,
    .nm_modname = "entry",
    .nm_priv = ((void*)0),
    .reserved = { 0 },
};

extern "C" __attribute__((constructor)) void RegisterEntryModule(void)
{
    napi_module_register(&demoModule);
}

