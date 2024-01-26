let __generate__Id: number = 0;
function generateId(): string {
    return "BaseModel_" + ++__generate__Id;
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
import { length2Vp } from '../utils/UiUtil';
import display from '@ohos.display';
import common from '@ohos.app.ability.common';
const DEFAULT_HEIGHT: Length = '50vp';
const DEFAULT_WIDTH: Length = '480vp';
export default class BaseModel<T extends BaseModel<T>> {
    // 全局设置
    protected height: number = length2Vp(getContext(), DEFAULT_HEIGHT);
    protected width: number = length2Vp(getContext(), DEFAULT_WIDTH);
    protected backgroundColor: ResourceColor = $r('app.color.default_background_color');
    private controller: TabsController | SwiperController | null;
    private onPageTouch: (event: TouchEvent, currentIndicator: number) => void = (event: TouchEvent, currentIndicator: number) => { };
    constructor(controller: TabsController | SwiperController | null) {
        this.controller = controller;
        let displayClass: display.Display | null = null;
        try {
            displayClass = display.getDefaultDisplaySync();
            this.width = length2Vp(getContext(), displayClass.width / displayClass.densityPixels);
        }
        catch (exception) {
            console.error('Failed to obtain the default display object. Code: ' + JSON.stringify(exception));
        }
    }
    // 事件回调
    private changeListener: (index: number) => void = (index: number) => { };
    public setHeight(height: Length, context?: common.UIAbilityContext): T {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.height = length2Vp(context, height);
        return (this as BaseModel<T>) as T;
    }
    public getHeight(): number {
        return this.height;
    }
    public setWidth(width: Length, context?: common.UIAbilityContext): T {
        if (context != undefined) {
        }
        else {
            context = getContext() as common.UIAbilityContext;
        }
        this.width = length2Vp(context, width);
        return (this as BaseModel<T>) as T;
    }
    public getWidth(): number {
        return this.width;
    }
    public setBackgroundColor(backgroundColor: ResourceColor): T {
        this.backgroundColor = backgroundColor;
        return (this as BaseModel<T>) as T;
    }
    public getBackgroundColor(): ResourceColor {
        return this.backgroundColor;
    }
    public setChangeListener(callback: (index: number) => void): T {
        this.changeListener = callback;
        return (this as BaseModel<T>) as T;
    }
    public getChangeListener(): (index: number) => void {
        return this.changeListener;
    }
    public getTabsController(): TabsController | null {
        return this.controller ? (this.controller instanceof TabsController ? this.controller as TabsController : null) : null;
    }
    public getSwiperController(): SwiperController | null {
        return this.controller ? (this.controller instanceof SwiperController ? this.controller as SwiperController : null) : null;
    }
    public setOnPageTouchListener(onPageTouch: (event: TouchEvent, currentIndex: number) => void) {
        this.onPageTouch = onPageTouch;
    }
    public notifyTouch(event: TouchEvent, currentIndex: number) {
        this.onPageTouch(event, currentIndex);
    }
}
