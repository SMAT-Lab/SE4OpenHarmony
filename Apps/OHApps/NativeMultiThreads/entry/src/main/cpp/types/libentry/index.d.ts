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

// 使用Native多线程，进行同步操作
export const getImagePathSync: (imageName: string) => string;
// 使用callback形式异步调用
export const getImagePathAsyncCallBack: (imageName: string, callBack: (result: string) => void) => void;
// 使用promise形式异步调用
export const getImagePathAsyncPromise: (imageName: string) => Promise<string>;
// 使用napi_threadsafe_function形式异步调用
export const getImagePathAsyncTSF: (imageName: string, callBack: (result: string) => void) => void;