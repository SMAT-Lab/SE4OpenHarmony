interface Outer_Params {
    renderingSettings?: RenderingContextSettings;
    renderingContext?: CanvasRenderingContext2D;
    animateName?: string;
    animateItem?: any;
    canvasTitle?: Resource;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "OuterComponent_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
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
import lottie from '@ohos/lottieETS';
import { Logger } from '../common/utils/log/logger';
import { CommonConstants } from '../common/constants/CommonConst';
export class Outer extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.renderingSettings = new RenderingContextSettings(true);
        this.renderingContext = new CanvasRenderingContext2D(this.renderingSettings);
        this.animateName = CommonConstants.ANIMATE_NAME;
        this.animateItem = null;
        this.__canvasTitle = new ObservedPropertyObject(undefined, this, "canvasTitle");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Outer_Params) {
        if (params.renderingSettings !== undefined) {
            this.renderingSettings = params.renderingSettings;
        }
        if (params.renderingContext !== undefined) {
            this.renderingContext = params.renderingContext;
        }
        if (params.animateName !== undefined) {
            this.animateName = params.animateName;
        }
        if (params.animateItem !== undefined) {
            this.animateItem = params.animateItem;
        }
        if (params.canvasTitle !== undefined) {
            this.canvasTitle = params.canvasTitle;
        }
    }
    aboutToBeDeleted() {
        this.__canvasTitle.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private renderingSettings: RenderingContextSettings;
    private renderingContext: CanvasRenderingContext2D;
    private animateName: string;
    private animateItem: any;
    private __canvasTitle: ObservedPropertyObject<Resource>;
    get canvasTitle() {
        return this.__canvasTitle.get();
    }
    set canvasTitle(newValue: Resource) {
        this.__canvasTitle.set(newValue);
    }
    aboutToDisappear(): void {
        Logger.info(CommonConstants.OUTER_TAG, `aboutToDisappear`);
        lottie.destroy();
    }
    onPageShow(): void {
        Logger.info(CommonConstants.OUTER_TAG, `onPageShow`);
        lottie.play();
    }
    onPageHide(): void {
        Logger.info(CommonConstants.OUTER_TAG, `onPageShow`);
        lottie.pause();
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.SpaceBetween });
        Flex.height(CommonConstants.CONTAINER_HEIGHT);
        // Canvas area
        Column.create();
        // Canvas area
        Column.margin({
            top: $r('app.float.default_10'),
            left: $r('app.float.default_10'),
            right: $r('app.float.default_10')
        });
        Canvas.create(this.renderingContext);
        Canvas.width(CommonConstants.CONTAINER_WIDTH);
        Canvas.aspectRatio(CommonConstants.ASPECT_RATIO_176);
        Canvas.backgroundImage($r('app.media.canvasBg'));
        Canvas.backgroundImageSize(ImageSize.Cover);
        Canvas.onDisAppear(() => {
            lottie.destroy(this.animateName);
        });
        Canvas.pop();
        Text.create(this.canvasTitle);
        Text.width(CommonConstants.CONTAINER_WIDTH);
        Text.fontSize($r('app.float.fontSize_14'));
        Text.textAlign(TextAlign.Center);
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor($r('app.color.outer_canvas_title'));
        Text.margin({ top: $r('app.float.default_12') });
        Text.opacity(CommonConstants.OPACITY_4);
        Text.pop();
        // Canvas area
        Column.pop();
        // Buttons area
        Column.create({ space: CommonConstants.SPACE_12 });
        // Buttons area
        Column.padding({
            left: $r('app.float.default_23'),
            right: $r('app.float.default_23'),
            bottom: $r('app.float.default_41')
        });
        Button.createWithChild();
        Button.width(CommonConstants.CONTAINER_WIDTH);
        Button.height($r('app.float.default_40'));
        Button.backgroundColor($r('app.color.outer_button_bg'));
        Button.onClick(() => {
            this.canvasTitle = $r('app.string.outer_button_load');
            this.animateItem = lottie.loadAnimation({
                container: this.renderingContext,
                renderer: 'canvas',
                loop: 10,
                autoplay: true,
                name: this.animateName,
                path: 'common/lottie/data.json'
            });
        });
        Text.create($r('app.string.outer_button_load'));
        Text.fontSize($r('app.float.fontSize_16'));
        Text.fontColor($r('app.color.outer_button_font'));
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width(CommonConstants.CONTAINER_WIDTH);
        Button.height($r('app.float.default_40'));
        Button.backgroundColor($r('app.color.outer_button_bg'));
        Button.onClick(() => {
            this.canvasTitle = $r('app.string.outer_button_end');
            this.animateItem.goToAndPlay(CommonConstants.ZERO_FRAME, true);
        });
        Text.create($r('app.string.outer_button_end'));
        Text.fontSize($r('app.float.fontSize_16'));
        Text.fontColor($r('app.color.outer_button_font'));
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.pop();
        Flex.create({ justifyContent: FlexAlign.SpaceBetween });
        Button.createWithChild();
        Button.width(CommonConstants.CONTAINER_HALF_WIDTH);
        Button.height($r('app.float.default_40'));
        Button.backgroundColor($r('app.color.outer_button_bg'));
        Button.onClick(() => {
            this.canvasTitle = $r('app.string.outer_button_start');
            lottie.play();
        });
        Text.create($r('app.string.outer_button_start'));
        Text.fontSize($r('app.float.fontSize_16'));
        Text.fontColor($r('app.color.outer_button_font'));
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width(CommonConstants.CONTAINER_HALF_WIDTH);
        Button.height($r('app.float.default_40'));
        Button.backgroundColor($r('app.color.outer_button_bg'));
        Button.onClick(() => {
            this.canvasTitle = $r('app.string.outer_button_pause');
            lottie.pause();
        });
        Text.create($r('app.string.outer_button_pause'));
        Text.fontSize($r('app.float.fontSize_16'));
        Text.fontColor($r('app.color.outer_button_font'));
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.pop();
        Flex.pop();
        // Buttons area
        Column.pop();
        Flex.pop();
    }
}
