let __generate__Id: number = 0;
function generateId(): string {
    return "Shimmer_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
export enum Shapes {
    LINEAR = 0,
    RADIAL = 1
}
export enum Directions {
    LEFT_TO_RIGHT = 0,
    TOP_TO_BOTTOM = 1,
    RIGHT_TO_LEFT = 2,
    BOTTOM_TO_TOP = 3
}
export class Shimmer {
    COMPONENT_COUNT: number = 4;
    positions: number[] = new Array(this.COMPONENT_COUNT);
    colors: number[] = new Array(this.COMPONENT_COUNT);
    direction: Directions = Directions.LEFT_TO_RIGHT;
    highlightColor: Color = Color.White;
    baseColor: number = 0x4cffffff;
    shape: Shapes = Shapes.LINEAR;
    fixedWidth: number = 50;
    fixedHeight: number = 0;
    widthRatio: number = 1;
    heightRatio: number = 1;
    intensity: number = 0;
    dropoff: number = 0.5;
    tilt: number = 20;
    clipToChildren: boolean = true;
    autoStart: boolean = true;
    alphaShimmer: boolean = true;
    repeatCount: number = -1; //默认播放一次，设置为-1时表示无限次播放
    repeatMode: PlayMode = PlayMode.Normal; //设置动画播放模式，默认播放完成后重头开始播放
    animationDuration: number = 2000;
    repeatDelay: number = 0;
    startDelay: number = 0;
    mShowShimmer: boolean = true;
    setDirection(direction: number): Shimmer {
        this.direction = direction;
        return this;
    }
    /** Sets the shape of the shimmer. See {@link Shape}. */
    setShape(shape: number): Shimmer {
        this.shape = shape;
        return this;
    }
    /** Sets the fixed width of the shimmer, in pixels. */
    setFixedWidth(fixedWidth: number): Shimmer {
        if (fixedWidth < 0) {
            throw new Error("Given invalid width: " + fixedWidth);
        }
        this.fixedWidth = fixedWidth;
        return this;
    }
    /** Sets the fixed height of the shimmer, in pixels. */
    setFixedHeight(fixedHeight: number): Shimmer {
        if (fixedHeight < 0) {
            throw new Error("Given invalid height: " + fixedHeight);
        }
        this.fixedHeight = fixedHeight;
        return this;
    }
    /** Sets the width ratio of the shimmer, multiplied against the total width of the layout. */
    setWidthRatio(widthRatio: number): Shimmer {
        if (widthRatio < 0) {
            throw new Error("Given invalid width ratio: " + widthRatio);
        }
        this.widthRatio = widthRatio;
        return this;
    }
    /** Sets the height ratio of the shimmer, multiplied against the total height of the layout. */
    setHeightRatio(heightRatio: number): Shimmer {
        if (heightRatio < 0) {
            throw new Error("Given invalid height ratio: " + heightRatio);
        }
        this.heightRatio = heightRatio;
        return this;
    }
    /** Sets the intensity of the shimmer. A larger value causes the shimmer to be larger. */
    setIntensity(intensity: number): Shimmer {
        if (intensity < 0) {
            throw new Error("Given invalid intensity value: " + intensity);
        }
        this.intensity = intensity;
        return this;
    }
    /**
     * Sets how quickly the shimmer's gradient drops-off. A larger value causes a sharper drop-off.
     */
    setDropoff(dropoff: number): Shimmer {
        if (dropoff < 0) {
            throw new Error("Given invalid dropoff value: " + dropoff);
        }
        this.dropoff = dropoff;
        return this;
    }
    /** Sets the tilt angle of the shimmer in degrees. */
    setTilt(tilt: number): Shimmer {
        this.tilt = tilt;
        return this;
    }
    /**
     * Sets the base alpha, which is the alpha of the underlying children, amount in the range [0,
     * 1].
     */
    setBaseAlpha(alpha: number): Shimmer {
        let intAlpha = this.clamp(0, 1, alpha) * 255;
        this.baseColor = intAlpha << 24 | (this.baseColor & 0x00FFFFFF);
        return this;
    }
    /** Sets the shimmer alpha amount in the range [0, 1]. */
    setHighlightAlpha(alpha: number): Shimmer {
        let intAlpha = this.clamp(0, 1, alpha) * 255;
        this.highlightColor = intAlpha << 24 | (this.highlightColor & 0x00FFFFFF);
        return this;
    }
    /**
     * Sets whether the shimmer will clip to the childrens' contents, or if it will opaquely draw on
     * top of the children.
     */
    setClipToChildren(status: boolean): Shimmer {
        this.clipToChildren = status;
        return this;
    }
    /** Sets whether the shimmering animation will start automatically. */
    setAutoStart(status: boolean): Shimmer {
        this.autoStart = status;
        return this;
    }
    setRepeatCount(repeatCount: number): Shimmer {
        this.repeatCount = repeatCount;
        return this;
    }
    setRepeatMode(mode: PlayMode): Shimmer {
        this.repeatMode = mode;
        return this;
    }
    /** Sets how long to wait in between repeats of the shimmering animation. */
    setRepeatDelay(millis: number): Shimmer {
        if (millis < 0) {
            throw new Error("Given a negative repeat delay: " + millis);
        }
        this.repeatDelay = millis;
        return this;
    }
    /** Sets how long to wait for starting the shimmering animation. */
    setStartDelay(millis: number): Shimmer {
        if (millis < 0) {
            throw new Error("Given a negative start delay: " + millis);
        }
        this.startDelay = millis;
        return this;
    }
    /** Sets how long the shimmering animation takes to do one full sweep. */
    setDuration(millis: number): Shimmer {
        if (millis < 0) {
            throw new Error("Given a negative duration: " + millis);
        }
        this.animationDuration = millis;
        return this;
    }
    clamp(min: number, max: number, value: number) {
        return Math.min(max, Math.max(min, value));
    }
    showShimmer(startShimmer: boolean): Shimmer {
        this.mShowShimmer = startShimmer;
        return this;
    }
    hideShimmer() {
        this.mShowShimmer = false;
        return this.mShowShimmer;
    }
}
