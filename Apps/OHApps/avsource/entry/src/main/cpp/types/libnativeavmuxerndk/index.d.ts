/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export const oHAVMuxerCreate: () => number;
export const oHAVMuxerSetRotation: () => number;
export const oHAVMuxerStart: () => number;
export const oHAVMuxerStop: () => number;
export const oHAVMuxerWriteSample: () => number;
export const oHAVMuxerAddTrack: () => number;
export const oHAVMuxerDestroy: () => number;

export const oHAVMuxerCreateAbnormal: () => number;
export const oHAVMuxerSetRotationAbnormal: () => number;
export const oHAVMuxerStartAbnormal: () => number;
export const oHAVMuxerStopAbnormal: () => number;
export const oHAVMuxerWriteSampleAbnormal: () => number;
export const oHAVMuxerAddTrackAbnormal: () => number;
export const oHAVMuxerDestroyAbnormal: () => number;
