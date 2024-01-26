interface SubsamplingScaleImageView_Params {
    model?: SubsamplingScaleImageView.Model;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SubsamplingScaleImageView_" + ++__generate__Id;
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
import Matrix4 from '@ohos.matrix4';
import ImageViewState from './ImageViewState';
import display from '@ohos.display';
export interface OnLongPressListener {
    onLongPress: (event: GestureEvent) => void;
}
export interface OnDoubleTapListener {
    onDoubleTap: (event: GestureEvent) => void;
}
export interface OnSingleTapListener {
    onSingleTapConfirmed: (event: ClickEvent) => void;
}
export interface OnStateChangedListener {
    onScaleChanged(newScale: number): void;
}
export interface OnImageEventListener {
    onImageLoaded(): void;
    onImageLoadError(): void;
}
export enum Config {
    ALPHA_8,
    RGB_565,
    ARGB_8888,
    RGBA_F16,
    HARDWARE
}
interface ImageOnComplete {
    width: number;
    height: number;
    componentWidth: number;
    componentHeight: number;
    loadingStatus: number;
    contentWidth: number;
    contentHeight: number;
    contentOffsetX: number;
    contentOffsetY: number;
}
class SubsamplingScaleImageView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new SubsamplingScaleImageView.Model(), this, "model");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SubsamplingScaleImageView_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<SubsamplingScaleImageView.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SubsamplingScaleImageView.Model) {
        this.__model.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Gesture.create(GesturePriority.High);
        TapGesture.create({ count: 2, fingers: 1 });
        TapGesture.onAction((event: GestureEvent) => {
            if (!event) {
                return;
            }
            if (this.model.zoomEnabled) {
                if (this.model.scale != this.model.getMinScale()) {
                    this.model.scale = this.model.getMinScale();
                    this.model.resetScaleAndCenter();
                    this.model.isZooming = false;
                }
                else {
                    this.model.isZooming = true;
                    if (this.model.quickScaleEnabled) {
                        this.zoomTo(this.model.maxScale, this.model.doubleTapZoomDuration);
                    }
                    else {
                        let fingerInfo: FingerInfo[] = event.fingerList;
                        if (!!fingerInfo && fingerInfo.length > 0) {
                            this.model.setDoubleScale(fingerInfo[0].localX, fingerInfo[0].localY);
                        }
                    }
                }
                if (this.model.onStateChangedListener != null) {
                    this.model.onStateChangedListener.onScaleChanged(this.model.scale);
                }
            }
            else {
                if (!!event) {
                    if (this.model.doubleTapListener != null) {
                        this.model.doubleTapListener.onDoubleTap(event);
                    }
                }
            }
        });
        TapGesture.pop();
        Gesture.pop();
        Gesture.create(GesturePriority.Low);
        GestureGroup.create(GestureMode.Parallel);
        GestureGroup.onCancel(() => {
            console.log('Parallel gesture canceled');
        });
        LongPressGesture.create({ repeat: true });
        LongPressGesture.onAction((event: GestureEvent) => {
            if (!!event && this.model.longPressListener != null) {
                this.model.longPressListener.onLongPress(event);
            }
        });
        LongPressGesture.onActionEnd(() => {
        });
        LongPressGesture.pop();
        PanGesture.create({});
        PanGesture.onActionStart((event: GestureEvent) => {
        });
        PanGesture.onActionUpdate((event: GestureEvent) => {
            if (!!event) {
                if (this.model.canScroll() && this.model.panEnabled) {
                    let distanceX: number = this.model.startOffsetX + event.offsetX;
                    let distanceY: number = this.model.startOffsetY + event.offsetY;
                    if (this.model.panLimit == this.model.PAN_LIMIT_INSIDE) {
                    }
                    else if (this.model.panLimit == this.model.PAN_LIMIT_OUTSIDE) {
                    }
                    else {
                    }
                    this.model.offsetX = distanceX;
                    this.model.offsetY = distanceY;
                    this.model.updateMatrix();
                }
            }
        });
        PanGesture.onActionEnd((event) => {
            if (!!event) {
                this.model.startOffsetX = this.model.startOffsetX + event.offsetX;
                this.model.startOffsetY = this.model.startOffsetY + event.offsetY;
            }
        });
        PanGesture.pop();
        PinchGesture.create({ fingers: 2 });
        PinchGesture.onActionStart((event) => {
            this.model.baseScale = this.model.scale;
        });
        PinchGesture.onActionUpdate((event) => {
            if (!!event) {
                if (!this.model.zoomEnabled)
                    return;
                if (this.model.quickScaleEnabled) {
                    this.zoomTo(event.scale, 0);
                }
                else {
                    let currentScale: number = this.model.baseScale * event.scale;
                    if (currentScale > this.model.getMaxScale()) {
                        this.model.scale = this.model.getMaxScale();
                    }
                    else if (currentScale < this.model.getMinScale()) {
                        this.model.scale = this.model.getMinScale();
                    }
                    else {
                        this.model.scale = currentScale;
                    }
                    console.info("Subsampling pin:" + this.model.scale);
                    this.model.updateMatrix();
                    //              this.zoomTo(event.scale, this.doubleTapZoomDuration);
                }
                this.model.isZooming = this.model.canScroll();
            }
        });
        PinchGesture.onActionEnd((event) => {
            this.model.baseScale = this.model.scale;
            if (this.model.onStateChangedListener != null) {
                this.model.onStateChangedListener.onScaleChanged(this.model.scale);
            }
        });
        PinchGesture.pop();
        GestureGroup.pop();
        Gesture.pop();
        Flex.onClick((event) => {
            if (this.model.singleTapListener != null && !!event) {
                this.model.singleTapListener.onSingleTapConfirmed(event);
            }
        });
        Flex.backgroundColor(this.model.tileBgColor);
        Image.create(this.model.src);
        Image.alt(this.model.previewSource);
        Image.objectFit(ImageFit.Contain);
        Image.transform(this.model.matrix);
        Image.onComplete((msg?: ImageOnComplete) => {
            if (!!msg) {
                this.model.sWidth = msg.width;
                this.model.sHeight = msg.height;
                this.model.componentWidth = msg.componentWidth;
                this.model.componentHeight = msg.componentHeight;
                this.model.readySent = true;
                this.model.imageLoadedSent = true;
                if (this.model.onImageEventListener != null) {
                    this.model.onImageEventListener.onImageLoaded();
                }
            }
        });
        Image.onError(() => {
            this.model.readySent = false;
            if (this.model.onImageEventListener != null) {
                this.model.onImageEventListener.onImageLoadError();
            }
        });
        Flex.pop();
    }
    public zoomTo(scale: number, durationMs: number): void {
        let currentScale = 0;
        if (scale > this.model.getMaxScale()) {
            currentScale = this.model.getMaxScale();
        }
        else if (scale < this.model.getMinScale()) {
            currentScale = this.model.getMinScale();
        }
        else {
            currentScale = scale;
        }
        Context.animateTo({
            duration: durationMs,
            tempo: 0.5,
            curve: Curve.EaseInOut,
            delay: 0,
            iterations: 1,
            playMode: PlayMode.Normal,
            onFinish: () => {
            }
        }, () => {
            this.model.scale = currentScale;
            this.model.updateMatrix();
        });
    }
}
namespace SubsamplingScaleImageView {
    export class Model {
        src: string | PixelMap | Resource = '';
        previewSource: string | Resource = '';
        sWidth: number = 0;
        sHeight: number = 0;
        componentWidth: number = 0;
        componentHeight: number = 0;
        scale: number = 1;
        baseScale: number = 1;
        touchCenterX: number = 0;
        touchCenterY: number = 0;
        offsetX: number = 0;
        offsetY: number = 0;
        startOffsetX: number = 0;
        startOffsetY: number = 0;
        maxScale: number = 4;
        doubleTapZoomScale: number = 1;
        minScale: number = 1;
        quickScaleEnabled: boolean = false;
        panEnabled: boolean = true;
        zoomEnabled: boolean = true;
        doubleEnabled: boolean = true;
        orientation: number = 0;
        tileBgColor: number = 0x000000;
        readySent: boolean = false;
        doubleTapZoomDuration: number = 0;
        imageLoadedSent: boolean = false;
        doubleTapListener: OnDoubleTapListener | null = null;
        singleTapListener: OnSingleTapListener | null = null;
        longPressListener: OnLongPressListener | null = null;
        onImageEventListener: OnImageEventListener | null = null;
        onStateChangedListener: OnStateChangedListener | null = null;
        preferredBitmapConfig: Config = Config.ALPHA_8;
        isZooming: boolean = false;
        /** Don't allow the image to be panned off screen. As much of the image as possible is always displayed, centered in the view when it is smaller. This is the best option for galleries. */
        PAN_LIMIT_INSIDE: number = 1;
        /** Allows the image to be panned until it is just off screen, but no further. The edge of the image will stop when it is flush with the screen edge. */
        PAN_LIMIT_OUTSIDE: number = 2;
        /** Allows the image to be panned until a corner reaches the center of the screen but no further. Useful when you want to pan any spot on the image to the exact center of the screen. */
        PAN_LIMIT_CENTER: number = 3;
        panLimit: number = 1;
        scaledDensity: number = 0;
        matrix: object = Matrix4.identity()
            .rotate({ x: 0, y: 0, z: 1, angle: this.orientation })
            .translate({ x: 0, y: 0 })
            .scale({ x: this.scale, y: this.scale, centerX: this.touchCenterX, centerY: this.touchCenterY });
        public setImage(src: string | PixelMap | Resource, previewSource?: string | Resource, state?: ImageViewState): Model {
            this.src = src;
            if (!!previewSource) {
                this.previewSource = previewSource;
            }
            if (state != null) {
                this.scale = state.getScale();
                this.orientation = state.getOrientation();
                this.touchCenterX = state.getCenterX();
                this.touchCenterY = state.getCenterY();
            }
            this.setScaleDensity();
            return this;
        }
        private setScaleDensity() {
            try {
                this.scaledDensity = display.getDefaultDisplaySync().scaledDensity;
            }
            catch (e) {
                console.error("SubsamplingScaleImageView setScaledDensity error");
            }
        }
        public setScale(scale: number): Model {
            this.scale = scale;
            return this;
        }
        public getScale(): number {
            return this.scale;
        }
        public setMaxScale(maxScale: number): Model {
            this.maxScale = maxScale;
            return this;
        }
        public setMinScale(minScale: number): Model {
            this.minScale = minScale;
            return this;
        }
        public setQuickScaleEnabled(quickScaleEnabled: boolean): Model {
            this.quickScaleEnabled = quickScaleEnabled;
            return this;
        }
        public isPanEnabled(): boolean {
            return this.panEnabled;
        }
        public setPanEnabled(panEnabled: boolean): Model {
            this.panEnabled = panEnabled;
            return this;
        }
        public isZoomEnabled(): boolean {
            return this.zoomEnabled;
        }
        public setDoubleZoom(doubleEnabled: boolean): Model {
            this.doubleEnabled = doubleEnabled;
            return this;
        }
        public setZoomEnabled(zoomEnabled: boolean): Model {
            this.zoomEnabled = zoomEnabled;
            return this;
        }
        public setTileBackgroundColor(tileBgColor: number): Model {
            this.tileBgColor = tileBgColor;
            return this;
        }
        public getSWidth(): number {
            return this.sWidth;
        }
        public getSHeight(): number {
            return this.sHeight;
        }
        public canScroll(): boolean {
            if (this.zoomEnabled && this.getScale() > 1) {
                return true;
            }
            else {
                return false;
            }
        }
        public setOrientation(degrees: number): Model {
            this.orientation = degrees;
            this.updateMatrix();
            return this;
        }
        public setDoubleTapListener(listener: OnDoubleTapListener): Model {
            this.doubleTapListener = listener;
            return this;
        }
        public setSingleTapListener(listener: OnSingleTapListener): Model {
            this.singleTapListener = listener;
            return this;
        }
        public setLongPressListener(listener: OnLongPressListener): Model {
            this.longPressListener = listener;
            return this;
        }
        /**
         * Add a listener for pan and zoom events. Extend {@link DefaultOnStateChangedListener} to simplify
         * implementation.
         * @param onStateChangedListener an {@link OnStateChangedListener} instance.
         */
        public setOnStateChangedListener(onStateChangedListener: OnStateChangedListener): Model {
            this.onStateChangedListener = onStateChangedListener;
            return this;
        }
        public setOnImageEventListener(onImageEventListener: OnImageEventListener): Model {
            this.onImageEventListener = onImageEventListener;
            return this;
        }
        public getMaxScale(): number {
            return this.maxScale;
        }
        public getMinScale(): number {
            return this.minScale;
        }
        public setDoubleScale(localX: number, localY: number): void {
            let distanceCenterX = -localX;
            let distanceCenterY = -localY;
            this.scale = this.getMaxScale();
            this.touchCenterX = 10;
            this.touchCenterY = 10;
            this.setOffset(distanceCenterX, distanceCenterY);
        }
        public setOffset(offsetX: number, offsetY: number): void {
            this.offsetX = offsetX;
            this.offsetY = offsetY;
            this.updateMatrix();
        }
        public updateMatrix(): void {
            this.matrix = Matrix4.identity()
                .rotate({ x: 0, y: 0, z: 1, angle: this.orientation })
                .translate({ x: this.offsetX, y: this.offsetY })
                .scale({ x: this.scale, y: this.scale, centerX: this.touchCenterX, centerY: this.touchCenterY });
        }
        public resetScaleAndCenter(): void {
            this.scale = 1;
            this.baseScale = 1;
            this.offsetX = 0;
            this.offsetY = 0;
            this.startOffsetX = 0;
            this.startOffsetY = 0;
            this.touchCenterX = 0;
            this.touchCenterY = 0;
            this.orientation = 0;
            this.updateMatrix();
        }
        public viewToSourceX(vx: number): number {
            return (vx - this.offsetX) * this.scaledDensity / this.scale;
        }
        /**
         * Convert screen to source y coordinate.
         */
        public viewToSourceY(vy: number): number {
            return (vy - this.offsetY) * this.scaledDensity / this.scale;
        }
        public setDoubleTapZoomScale(doubleTapZoomScale: number): Model {
            this.doubleTapZoomScale = doubleTapZoomScale;
            return this;
        }
        /**
         * Call to find whether the view is initialised, has dimensions, and will display an image on
         * the next draw. If a preview has been provided, it may be the preview that will be displayed
         * and the full size image may still be loading. If no preview was provided, this is called once
         * the base layer tiles of the full size image are loaded.
         * @return true if the view is ready to display an image and accept touch gestures.
         */
        public isReady(): boolean {
            return this.readySent;
        }
        public setPreferredBitmapConfig(preferredBitmapConfig: Config): Model {
            this.preferredBitmapConfig = preferredBitmapConfig;
            return this;
        }
        public getPreferredBitmapConfig(): Config {
            return this.preferredBitmapConfig;
        }
        /**
         * Set the duration of the double tap zoom animation.
         * @param durationMs Duration in milliseconds.
         */
        public setDoubleTapZoomDuration(durationMs: number): Model {
            this.doubleTapZoomDuration = Math.max(0, durationMs);
            return this;
        }
        /**
         * Call to find whether the main image (base layer tiles where relevant) have been loaded. Before
         * this event the view is blank unless a preview was provided.
         * @return true if the main image (not the preview) has been loaded and is ready to display.
         */
        public isImageLoaded(): boolean {
            return this.imageLoadedSent;
        }
        /**
         * This is a screen density aware alternative to {@link #setMaxScale(float)}; it allows you to express the maximum
         * allowed scale in terms of the minimum pixel density. This avoids the problem of 1:1 scale still being
         * too small on a high density screen. A sensible starting point is 160 - the default used by this view.
         * @param dpi Source image pixel density at maximum zoom.
         */
        public setMinimumDpi(dpi: number): Model {
            let screen = display.getDefaultDisplaySync();
            let averageDpi: number = (screen.xDPI + screen.yDPI) / 2;
            this.setMaxScale(averageDpi / dpi);
            return this;
        }
        /**
         * This is a screen density aware alternative to {@link #setMinScale(float)}; it allows you to express the minimum
         * allowed scale in terms of the maximum pixel density.
         * @param dpi Source image pixel density at minimum zoom.
         */
        public setMaximumDpi(dpi: number): Model {
            let screen = display.getDefaultDisplaySync();
            let averageDpi: number = (screen.xDPI + screen.yDPI) / 2;
            this.setMinScale(averageDpi / dpi);
            return this;
        }
        public getCenterX(): number {
            return this.viewToSourceX(this.componentWidth / 2);
        }
        public getCenterY(): number {
            return this.viewToSourceY(this.componentHeight / 2);
        }
        public getOrientation(): number {
            return this.orientation;
        }
        public getState(): ImageViewState | null {
            if (this.sWidth > 0 && this.sHeight > 0) {
                //noinspection ConstantConditions
                return new ImageViewState(this.getScale(), this.getCenterX(), this.getCenterY(), this.getOrientation());
            }
            return new ImageViewState(0, 0, 0, 0);
        }
        /**
         * Set the pan limiting style. See static fields. Normally {@link #PAN_LIMIT_INSIDE} is best, for image galleries.
         * @param panLimit a pan limit constant. See static fields.
         */
        public setPanLimit(panLimit: number): Model {
            if (panLimit != this.PAN_LIMIT_INSIDE || panLimit != this.PAN_LIMIT_OUTSIDE || panLimit != this.PAN_LIMIT_CENTER) {
                console.error("Invalid pan limit: " + panLimit);
            }
            this.panLimit = panLimit;
            return this;
        }
    }
}
export { SubsamplingScaleImageView };
