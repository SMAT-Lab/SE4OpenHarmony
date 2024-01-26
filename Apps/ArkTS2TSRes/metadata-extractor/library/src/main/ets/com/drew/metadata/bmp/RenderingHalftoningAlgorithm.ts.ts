/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
export enum RenderingHalftoningAlgorithm {
    /** No halftoning algorithm */
    NONE = 0,
    /** Error Diffusion Halftoning */
    ERROR_DIFFUSION = 1,
    /** Processing Algorithm for Noncoded Document Acquisition */
    PANDA = 2,
    /** Super-circle Halftoning */
    SUPER_CIRCLE = 3
}
export namespace RenderingHalftoningAlgorithm {
    export function typeOf(value: number) {
        switch (value) {
            case RenderingHalftoningAlgorithm.NONE:
                return RenderingHalftoningAlgorithm.NONE;
                break;
            case RenderingHalftoningAlgorithm.ERROR_DIFFUSION:
                return RenderingHalftoningAlgorithm.ERROR_DIFFUSION;
                break;
            case RenderingHalftoningAlgorithm.PANDA:
                return RenderingHalftoningAlgorithm.PANDA;
                break;
            case RenderingHalftoningAlgorithm.SUPER_CIRCLE:
                return RenderingHalftoningAlgorithm.SUPER_CIRCLE;
                break;
            default:
                return null;
                break;
        }
    }
    export function toString(renderingHalftoningAlgorithm: RenderingHalftoningAlgorithm): string {
        switch (renderingHalftoningAlgorithm) {
            case RenderingHalftoningAlgorithm.NONE:
                return "No Halftoning Algorithm";
            case RenderingHalftoningAlgorithm.ERROR_DIFFUSION:
                return "Error Diffusion Halftoning";
            case RenderingHalftoningAlgorithm.PANDA:
                return "Processing Algorithm for Noncoded Document Acquisition";
            case RenderingHalftoningAlgorithm.SUPER_CIRCLE:
                return "Super-circle Halftoning";
            default:
                throw new Error("Unimplemented rendering halftoning algorithm type " + renderingHalftoningAlgorithm);
        }
    }
}
