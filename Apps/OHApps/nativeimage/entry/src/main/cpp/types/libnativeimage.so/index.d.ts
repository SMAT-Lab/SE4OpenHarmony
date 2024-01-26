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
export const oHNativeImageCreate: () => number;
export const oHNativeImageAcquireNativeWindow: () => number;
export const oHNativeImageAcquireNativeWindowAbnormal: () => number;
export const oHNativeImageAttachContext: () => number;
export const oHNativeImageAttachContextAbnormal: () => number;
export const oHNativeImageDetachContext: () => number;
export const oHNativeImageDetachContextAbnormal: () => number;
export const oHNativeImageUpdateSurfaceImage: () => number;
export const oHNativeImageUpdateSurfaceImageAbnormal: () => number;
export const oHNativeImageGetTimestamp: () => number;
export const oHNativeImageGetTransformMatrix: () => number;
export const oHNativeImageGetTransformMatrixAbnormal: () => number;
export const oHNativeImageDestroy: () => number;
