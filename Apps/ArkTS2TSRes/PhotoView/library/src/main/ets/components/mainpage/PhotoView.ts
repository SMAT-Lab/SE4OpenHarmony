interface PhotoView_Params {
    model?: PhotoView.Model;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PhotoView_" + ++__generate__Id;
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
import display from '@ohos.display';
import RectF from './RectF';
declare type ResourceStr = string | Resource | PixelMap;
export interface OnSwipeListener {
    onSwipeListener(ableSwipe: boolean): void;
}
export interface OnPhotoTapListener {
    /**
     * A callback to receive where the user taps on a photo. You will only receive a callback if
     * the user taps on the actual photo, tapping on 'whitespace' will be ignored.
     *
     * @param x    where the user tapped from the of the Drawable, as percentage of the
     *             Drawable width.
     * @param y    where the user tapped from the top of the Drawable, as percentage of the
     *             Drawable height.
     */
    onPhotoTap(x: number, y: number): void;
}
export interface OnDoubleTapListener {
    onSingleTapConfirmed(event: GestureEvent): void;
    onDoubleTap(event: GestureEvent): void;
}
export interface OnLongPressListener {
    onLongPress(event: GestureEvent): void;
}
export interface OnMatrixChangedListener {
    /**
     * Callback for when the Matrix displaying the Drawable has changed. This could be because
     * the View's bounds have changed, or the user has zoomed.
     *
     * @param rect - Rectangle displaying the Drawable's new bounds.
     */
    onMatrixChanged(rect: RectF): void;
}
export interface OnScaleChangedListener {
    /**
     * Callback for when the scale changes
     *
     * @param scaleFactor the scale factor (less than 1 for zoom out, greater than 1 for zoom in)
     * @param focusX      focal point X position
     * @param focusY      focal point Y position
     */
    onScaleChange(scaleFactor: number, focusX: number, focusY: number): void;
}
export interface OnOutsidePhotoTapListener {
    onOutsidePhotoTap(): void;
}
export interface OnViewDragListener {
    /**
     * Callback for when the photo is experiencing a drag event. This cannot be invoked when the
     * user is scaling.
     *
     * @param dx The change of the coordinates in the x-direction
     * @param dy The change of the coordinates in the y-direction
     */
    onDrag(dx: number, dy: number): void;
}
export interface OnViewTapListener {
    /**
     * A callback to receive where the user taps on a ImageView. You will receive a callback if
     * the user taps anywhere on the view, tapping on 'whitespace' will not be ignored.
     *
     * @param x    - where the user tapped from the left of the View.
     * @param y    - where the user tapped from the top of the View.
     */
    onViewTap(x: number, y: number): void;
}
export interface OnClickListener {
    onClick(event: GestureEvent): void;
}
class PhotoView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new PhotoView.Model(), this, "model");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PhotoView_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<PhotoView.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: PhotoView.Model) {
        this.__model.set(newValue);
    }
    public zoomTo(scale: number, durationMs: number): void {
        let currentScale = 0;
        if (scale > this.model.getMaximumScale()) {
            currentScale = this.model.getMaximumScale();
        }
        else if (scale < this.model.getMinimumScale()) {
            currentScale = this.model.getMinimumScale();
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
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Image.create(this.model.src);
        Image.alt(this.model.previewImage);
        Image.objectFit(this.model.imageFit);
        Image.transform(this.model.matrix);
        Image.interpolation(ImageInterpolation.Low);
        Image.onComplete((event: any) => {
            this.model.sWidth = event.width;
            this.model.sHeight = event.height;
            this.model.componentWidth = event.componentWidth;
            this.model.componentHeight = event.componentHeight;
            this.model.contentHeight = event.contentHeight;
            if (this.model.rect == null) {
                this.model.rect = new RectF(0, event.componentHeight / 2 - event.height / 2, this.model.componentWidth, this.model.componentHeight / 2 + event.height / 2);
            }
        });
        Gesture.create(GesturePriority.Low);
        GestureGroup.create(GestureMode.Exclusive);
        TapGesture.create({ count: 2, fingers: 1 });
        TapGesture.onAction((event: GestureEvent) => {
            console.debug("photo double tap:");
            if (this.model.isZoom) {
                if (this.model.scale == this.model.scaleMax) {
                    this.model.scale = this.model.scaleMin;
                    this.model.childSpan = false;
                    this.model.resetMatrix();
                }
                else {
                    if (this.model.scale < this.model.scaleMax) {
                        this.model.scale = this.model.scaleMax;
                        this.model.panDirection = PanDirection.All;
                        this.model.swipeDirection = SwipeDirection.None;
                        this.model.childSpan = true;
                    }
                    else {
                        this.model.scale = this.model.scaleMin;
                        this.model.panDirection = PanDirection.None;
                        this.model.swipeDirection = this.model.cacheSwipeDirection;
                        this.model.childSpan = false;
                    }
                    if (this.model.animate) {
                        this.zoomTo(this.model.scale, this.model.mZoomDuration);
                    }
                    else {
                        this.model.updateMatrix();
                    }
                }
            }
            if (this.model.matrixChangedListener != null) {
                this.model.matrixChangedListener.onMatrixChanged(this.model.rect);
            }
            if (this.model.scaleChangeListener != null) {
                this.model.scaleChangeListener.onScaleChange(this.model.scale, 0, 0);
            }
            if (this.model.doubleTapListener != null) {
                this.model.doubleTapListener.onDoubleTap(event);
            }
        });
        TapGesture.pop();
        TapGesture.create({ count: 1, fingers: 1 });
        TapGesture.onAction((event: GestureEvent) => {
            console.debug("photo single tap:");
            if (this.model.clickListener != null) {
                this.model.clickListener.onClick(event);
            }
            if (this.model.viewTapListener != null) {
                this.model.viewTapListener.onViewTap(vp2px(event.fingerList[0].globalX), vp2px(event.fingerList[0].globalY));
            }
            if (this.model.rect != null) {
                // Check to see if the user tapped on the photo
                if (this.model.rect.contains(vp2px(event.fingerList[0].globalX), vp2px(event.fingerList[0].globalY))) {
                    let xResult: number = (vp2px(event.fingerList[0].globalX) - this.model.rect.left)
                        / this.model.rect.width();
                    let yResult: number = (vp2px(event.fingerList[0].globalY) - this.model.rect.top)
                        / this.model.rect.height();
                    if (this.model.photoTapListener != null) {
                        this.model.photoTapListener.onPhotoTap(xResult, yResult);
                    }
                }
                else {
                    if (this.model.outsidePhotoTapListener != null) {
                        this.model.outsidePhotoTapListener.onOutsidePhotoTap();
                    }
                }
            }
        });
        TapGesture.pop();
        LongPressGesture.create({ repeat: true });
        LongPressGesture.onAction((event: GestureEvent) => {
            console.debug("PhotoView long press:");
        });
        LongPressGesture.onActionEnd((event: GestureEvent) => {
            if (this.model.longPressListener != null) {
                this.model.longPressListener.onLongPress(event);
            }
        });
        LongPressGesture.pop();
        PanGesture.create({ direction: this.model.panDirection });
        PanGesture.onActionUpdate((event: GestureEvent) => {
            if (this.model.isZoom && this.model.scale != this.model.scaleMin) {
                this.model.offsetX = this.model.offsetX + event.offsetX;
                this.model.offsetY = this.model.offsetY + event.offsetY;
                this.model.panDirection = PanDirection.All;
                this.model.swipeDirection = SwipeDirection.None;
                this.model.childSpan = true;
                let panWidth = (display.getDefaultDisplaySync().width / display.getDefaultDisplaySync()
                    .densityPixels) * display.getDefaultDisplaySync().scaledDensity / this.model.scale;
                if (this.model.offsetX > panWidth) {
                    this.model.offsetX = panWidth;
                    this.model.panDirection = PanDirection.None;
                    this.model.swipeDirection = this.model.cacheSwipeDirection;
                    this.model.childSpan = false;
                }
                if (this.model.offsetX < -panWidth) {
                    this.model.offsetX = -panWidth;
                    this.model.panDirection = PanDirection.None;
                    this.model.swipeDirection = this.model.cacheSwipeDirection;
                    this.model.childSpan = false;
                }
                let height = display.getDefaultDisplaySync().height / display.getDefaultDisplaySync().densityDPI;
                let panHeight = (this.model.scale / display.getDefaultDisplaySync().scaledDensity) * this.model.contentHeight;
                let canPanHeight = (panHeight <= height) ? 0 : (panHeight - height);
                if (this.model.offsetY > canPanHeight) {
                    this.model.offsetY = canPanHeight;
                    this.model.panDirection = PanDirection.None;
                    this.model.swipeDirection = this.model.cacheSwipeDirection;
                    this.model.childSpan = false;
                }
                if (this.model.offsetY < -canPanHeight) {
                    this.model.offsetY = -canPanHeight;
                    this.model.panDirection = PanDirection.None;
                    this.model.swipeDirection = this.model.cacheSwipeDirection;
                    this.model.childSpan = false;
                }
                this.model.updateMatrix();
            }
        });
        PanGesture.onActionEnd((event: GestureEvent) => {
            console.info("photo pan endY:" + this.model.offsetX);
            if (this.model.viewDragListener != null) {
                this.model.viewDragListener.onDrag(this.model.offsetX, this.model.offsetY);
            }
            if (this.model.matrixChangedListener != null) {
                this.model.matrixChangedListener.onMatrixChanged(this.model.rect);
            }
        });
        PanGesture.pop();
        SwipeGesture.create({ direction: this.model.swipeDirection });
        SwipeGesture.onAction((event: GestureEvent) => {
            console.info("photo swipe:");
        });
        SwipeGesture.pop();
        PinchGesture.create({ distance: 10 });
        PinchGesture.onActionUpdate((event: GestureEvent) => {
            if (this.model.parentIsSwiper)
                return;
            if (this.model.isZoom) {
                this.model.scale = this.model.scale + event.scale - 1;
                if (this.model.scale > this.model.scaleMax) {
                    this.model.scale = this.model.scaleMax;
                }
                else if (this.model.scale < this.model.scaleMin) {
                    this.model.scale = this.model.scaleMin;
                }
                if (this.model.scale == this.model.scaleMin) {
                    this.model.panDirection = PanDirection.None;
                    this.model.swipeDirection = this.model.cacheSwipeDirection;
                    this.model.childSpan = false;
                }
                else {
                    this.model.panDirection = PanDirection.All;
                    this.model.swipeDirection = SwipeDirection.None;
                    this.model.childSpan = true;
                }
                if (this.model.animate) {
                    this.zoomTo(this.model.scale, this.model.mZoomDuration);
                }
                else {
                    this.model.offsetX = 0;
                    this.model.offsetY = 0;
                    this.model.updateMatrix();
                }
            }
        });
        PinchGesture.onActionEnd((event: GestureEvent) => {
            if (this.model.parentIsSwiper)
                return;
            if (this.model.scale < this.model.scaleMin) {
                this.model.scale = this.model.scaleMin;
            }
            if (this.model.scale > this.model.scaleMax) {
                this.model.scale = this.model.scaleMax;
            }
            this.model.isZooming = (this.model.scale > 1);
            if (this.model.matrixChangedListener != null) {
                this.model.matrixChangedListener.onMatrixChanged(this.model.rect);
            }
            if (this.model.scaleChangeListener != null) {
                this.model.scaleChangeListener.onScaleChange(this.model.scale, 0, 0);
            }
        });
        PinchGesture.pop();
        GestureGroup.pop();
        Gesture.pop();
        Flex.pop();
    }
}
namespace PhotoView {
    export class Model {
        src: ResourceStr = '';
        sWidth: number = 0;
        sHeight: number = 0;
        componentWidth: number = 0;
        componentHeight: number = 0;
        baseAngle: number = 0;
        rotateAngle: number = 0;
        scale: number = 1;
        animate: boolean = false; //  是否可手势缩放
        imageFit: ImageFit = ImageFit.Contain;
        scaleMin: number = 1.0;
        scaleMed: number = 2;
        scaleMax: number = 3.0;
        isZoom: boolean = true;
        centerX: number = 0;
        centerY: number = 0;
        centerZ: number = 0;
        offsetX: number = 0;
        offsetY: number = 0;
        verticalEnd: boolean = false;
        //缩放后 平移到半屏边界的填充值
        startOffsetX: number = 10;
        startOffsetY: number = 23;
        photoTapListener: OnPhotoTapListener | null = null;
        doubleTapListener: OnDoubleTapListener | null = null;
        longPressListener: OnLongPressListener | null = null;
        clickListener: OnClickListener | null = null;
        matrixChangedListener: OnMatrixChangedListener | null = null;
        viewTapListener: OnViewTapListener | null = null;
        viewDragListener: OnViewDragListener | null = null;
        scaleChangeListener: OnScaleChangedListener | null = null;
        outsidePhotoTapListener: OnOutsidePhotoTapListener | null = null;
        onSwipeListener: OnSwipeListener | null = null;
        rect: RectF | null = null;
        iterations: number = 0;
        mZoomDuration: number = 200;
        scaledDensity: number = 0;
        isZooming: boolean = false;
        dragging: boolean = false;
        contentHeight: number = 0;
        previewImage: string | Resource = '';
        panDirection: PanDirection = PanDirection.None;
        swipeDirection: SwipeDirection = SwipeDirection.Horizontal;
        cacheSwipeDirection: SwipeDirection = SwipeDirection.Horizontal;
        childSpan: boolean = false;
        parentIsSwiper: boolean = false;
        matrix: Matrix4.Matrix4Transit = Matrix4.identity()
            .rotate({ x: 0, y: 0, z: 1, angle: this.rotateAngle })
            .translate({ x: this.offsetX, y: this.offsetY })
            .scale({ x: this.scale, y: this.scale });
        constructor() {
            console.debug("PhotoView create");
        }
        public setImageURI(src: string): Model {
            this.src = src;
            return this;
        }
        public setImageResource(src: Resource): Model {
            this.src = src;
            return this;
        }
        public setImageElement(src: PixelMap) {
            this.src = src;
            return this;
        }
        public setSwipeDirection(swipeDirection: SwipeDirection) {
            this.swipeDirection = swipeDirection;
            this.cacheSwipeDirection = swipeDirection;
            return this;
        }
        public isParentSwiper(parentIsSwiper: boolean) {
            this.parentIsSwiper = parentIsSwiper;
            return this;
        }
        public setImageFit(imageFit: ImageFit): Model {
            this.imageFit = imageFit;
            console.log("imageFit");
            return this;
        }
        public setPreviewImage(src: string | Resource) {
            this.previewImage = src;
            return this;
        }
        public setScale(scale: number, animate: boolean): Model {
            this.scale = scale;
            if (this.scale < this.scaleMin) {
                this.scale = this.scaleMin;
            }
            if (this.scale > this.scaleMax) {
                this.scale = this.scaleMax;
            }
            if (animate) {
                this.iterations = 1;
            }
            else {
                this.iterations = 0;
            }
            this.animate = animate;
            return this;
        }
        public setZoomTransitionDuration(milliseconds: number): Model {
            this.mZoomDuration = milliseconds;
            return this;
        }
        public getMinimumScale(): number {
            return this.scaleMin;
        }
        public getMediumScale(): number {
            return this.scaleMed;
        }
        public getMaximumScale(): number {
            return this.scaleMax;
        }
        public getScale(): number {
            return this.scale;
        }
        public setMinimumScale(minimumScale: number): Model {
            this.scaleMin = minimumScale;
            return this;
        }
        public setMediumScale(mediumScale: number): Model {
            this.scaleMed = mediumScale;
            return this;
        }
        public setMaximumScale(maximumScale: number): Model {
            this.scaleMax = maximumScale;
            return this;
        }
        public setScaleLevels(minimumScale: number, mediumScale: number, maximumScale: number): Model {
            this.scaleMin = minimumScale;
            this.scaleMed = mediumScale;
            this.scaleMax = maximumScale;
            return this;
        }
        public setBaseRotation(degrees: number): Model {
            this.rotateAngle = degrees % 360;
            this.setRotationBy(this.rotateAngle);
            return this;
        }
        public setRotationTo(rotationDegree: number): Model {
            this.rotateAngle = rotationDegree % 360;
            this.matrix = Matrix4.identity().rotate({ x: 0, y: 0, z: 1, angle: this.rotateAngle });
            return this;
        }
        public setRotationBy(rotationDegree: number): Model {
            this.rotateAngle = (this.rotateAngle + rotationDegree) % 360;
            this.matrix = Matrix4.identity().rotate({ x: 0, y: 0, z: 1, angle: this.rotateAngle });
            return this;
        }
        public setRotationCenter(x: number, y: number, z: number): Model {
            this.centerX = z;
            this.centerY = y;
            this.centerZ = z;
            return this;
        }
        public setZoomable(zoomable: boolean): Model {
            if (!zoomable) {
                this.scale = this.scaleMin;
                this.setImageFit(ImageFit.None);
                this.isZoom = false;
                return this;
            }
            this.isZoom = zoomable;
            return this;
        }
        public isZoomEnabled(): boolean {
            return this.isZoom;
        }
        public setImageOffset(pointX: number, pointY: number): Model {
            this.offsetX = pointX;
            this.offsetY = pointY;
            return this;
        }
        public setOnClickListener(listener: OnClickListener): Model {
            this.clickListener = listener;
            return this;
        }
        public setOnLongClickListener(listener: OnLongPressListener): Model {
            this.longPressListener = listener;
            return this;
        }
        public setOnMatrixChangeListener(listener: OnMatrixChangedListener): Model {
            this.matrixChangedListener = listener;
            return this;
        }
        public setOnPhotoTapListener(listener: OnPhotoTapListener): Model {
            this.photoTapListener = listener;
            return this;
        }
        public setOnViewTapListener(listener: OnViewTapListener): Model {
            this.viewTapListener = listener;
            return this;
        }
        public setOnViewDragListener(listener: OnViewDragListener): Model {
            this.viewDragListener = listener;
            return this;
        }
        public setOnScaleChangeListener(scaleChangeListener: OnScaleChangedListener): Model {
            this.scaleChangeListener = scaleChangeListener;
            return this;
        }
        public setOnOutsidePhotoTapListener(outsidePhotoTapListener: OnOutsidePhotoTapListener): Model {
            this.outsidePhotoTapListener = outsidePhotoTapListener;
            return this;
        }
        public setOnDoubleTapListener(onDoubleTapListener: OnDoubleTapListener): Model {
            this.doubleTapListener = onDoubleTapListener;
            return this;
        }
        public setOnSwipeListener(onSwipeListener: OnSwipeListener): Model {
            this.onSwipeListener = onSwipeListener;
            return this;
        }
        public updateMatrix(): void {
            if (!!this.rect) {
                this.rect.left = this.componentWidth / 2 - (this.componentWidth * this.scale) / 2 + this.offsetX;
                this.rect.right = this.componentWidth / 2 + (this.componentWidth * this.scale) / 2 + this.offsetX;
                this.rect.top = this.componentHeight / 2 - (this.sHeight / 2) * this.scale + this.offsetY;
                this.rect.bottom = this.componentHeight / 2 + (this.sHeight / 2) * this.scale + this.offsetY;
            }
            this.matrix = Matrix4.identity().rotate({ x: 0, y: 0, z: 1, angle: this.rotateAngle })
                .translate({ x: this.offsetX, y: this.offsetY, z: 1 })
                .scale({ x: this.scale, y: this.scale, centerX: this.centerX, centerY: this.centerY });
            if (this.onSwipeListener != null) {
                this.onSwipeListener.onSwipeListener(this.childSpan);
            }
        }
        public resetMatrix(): void {
            this.scale = 1;
            this.centerX = 0;
            this.centerY = 0;
            this.offsetX = 0;
            this.offsetY = 0;
            this.rotateAngle = 0;
            this.panDirection = PanDirection.None;
            this.swipeDirection = this.cacheSwipeDirection;
            this.updateMatrix();
        }
        public getSuppMatrix(matrix: object): void {
            this.matrix;
        }
        public setSuppMatrix(matrix: Matrix4.Matrix4Transit): Model {
            this.matrix = matrix;
            return this;
        }
        public isScaling(): boolean {
            return this.scale != 1;
        }
        public isDragging(): boolean {
            return this.offsetX != 0 || this.offsetY != 0;
        }
        public getRectF(): RectF | null {
            return this.rect;
        }
    }
}
export { PhotoView };
