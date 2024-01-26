/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { AnimateEffect } from './AnimateEffect';
export function animateBeforeStartStatus(val) {
    if (AnimateEffect.ScaleLeftTop == val) {
        return {
            x: 0,
            y: 0,
            z: 1,
            centerX: 0,
            centerY: 0,
        };
    }
    else if (AnimateEffect.ScaleLeftBottom == val) {
        return {
            x: 0,
            y: 0,
            z: 1,
            centerX: 0,
            centerY: '100%',
        };
    }
    else if (AnimateEffect.ScaleRightTop == val) {
        return {
            x: 0,
            y: 0,
            z: 1,
            centerX: '100%',
            centerY: 0,
        };
    }
    else if (AnimateEffect.ScaleRightBottom == val) {
        return {
            x: 0,
            y: 0,
            z: 1,
            centerX: '100%',
            centerY: '100%',
        };
    }
    else if (AnimateEffect.ScaleCenterLeft == val) {
        return {
            x: 0,
            y: 1,
            z: 1,
            centerX: 0,
            centerY: '50%',
        };
    }
    else if (AnimateEffect.ScaleCenterRight == val) {
        return {
            x: 0,
            y: 1,
            z: 1,
            centerX: '100%',
            centerY: '50%',
        };
    }
    else if (AnimateEffect.ScaleCenterTop == val) {
        return {
            x: 1,
            y: 0,
            z: 1,
            centerX: '50%',
            centerY: 0,
        };
    }
    else if (AnimateEffect.ScaleCenterBottom == val) {
        return {
            x: 1,
            y: 0,
            z: 1,
            centerX: '50%',
            centerY: '100%',
        };
    }
    else if (AnimateEffect.Center == val) {
        return {
            x: 0,
            y: 0
        };
    }
    else if (AnimateEffect.TranslateFromTop == val) {
        return {
            x: 0,
            y: -350
        };
    }
    else if (AnimateEffect.TranslateFromBottom == val) {
        return {
            x: 0,
            y: 350
        };
    }
    else if (AnimateEffect.TranslateFromLeft == val) {
        return {
            x: -200,
            y: 0
        };
    }
    else if (AnimateEffect.TranslateFromRight == val) {
        return {
            x: 200,
            y: 0
        };
    }
    else if (AnimateEffect.TranslateFromLeftTop == val) {
        return { x: -200, y: -350 };
    }
    else if (AnimateEffect.TranslateFromLeftBottom == val) {
        return { x: -200, y: 350 };
    }
    else if (AnimateEffect.TranslateRightTop == val) {
        return { x: 200, y: -350 };
    }
    else if (AnimateEffect.TranslateFromRightBottom == val) {
        return { x: 200, y: 350 };
    }
}
export function animateAfterStartStatus(val) {
    if (AnimateEffect.ScaleLeftTop == val) {
        return {
            x: 1,
            y: 1,
            z: 1,
            centerX: 0,
            centerY: 0,
        };
    }
    else if (AnimateEffect.ScaleLeftBottom == val) {
        return {
            x: 1,
            y: 1,
            z: 1,
            centerX: 0,
            centerY: '100%',
        };
    }
    else if (AnimateEffect.ScaleRightTop == val) {
        return {
            x: 1,
            y: 1,
            z: 1,
            centerX: '100%',
            centerY: 0,
        };
    }
    else if (AnimateEffect.ScaleRightBottom == val) {
        return {
            x: 1,
            y: 1,
            z: 1,
            centerX: '100%',
            centerY: '100%',
        };
    }
    else if (AnimateEffect.ScaleCenterLeft == val) {
        return {
            x: 1,
            y: 1,
            z: 1,
            centerX: 0,
            centerY: '50%',
        };
    }
    else if (AnimateEffect.ScaleCenterRight == val) {
        return {
            x: 1,
            y: 1,
            z: 1,
            centerX: '100%',
            centerY: '50%',
        };
    }
    else if (AnimateEffect.ScaleCenterTop == val) {
        return {
            x: 1,
            y: 1,
            z: 1,
            centerX: '50%',
            centerY: 0,
        };
    }
    else if (AnimateEffect.ScaleCenterBottom == val) {
        return {
            x: 1,
            y: 1,
            z: 1,
            centerX: '50%',
            centerY: '100%',
        };
    }
    else {
        return { x: 0, y: 0 };
    }
}
