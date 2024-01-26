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
export const oHVideoDecoderCreateByMime: () => number;
export const oHVideoDecoderCreateByName: () => number;
export const oHVideoDecoderDestroy: () => number;
export const oHVideoDecoderSetCallback: () => number;
export const oHVideoDecoderSetSurface: () => number;
export const oHVideoDecoderConfigure: () => number;
export const oHVideoDecoderPrepare: () => number;
export const oHVideoDecoderStart: (a:number,b:number,c:number,d:number,e:number,f:number) => number;
export const oHVideoDecoderStop: (a:number,b:number,c:number,d:number,e:number,f:number,g:number) => number;
export const oHVideoDecoderFlush: (a:number,b:number,c:number,d:number,e:number,f:number,g:number) => number;
export const oHVideoDecoderReset: () => number;
export const oHVideoDecoderGetOutputDescription: () => number;
export const oHVideoDecoderSetParameter: () => number;
export const oHVideoDecoderPushInputData: () => number;
export const oHVideoDecoderRenderOutputData: () => number;
export const oHVideoDecoderFreeOutputData: () => number;
export const oHVideoDecoderIsValid: () => number;
