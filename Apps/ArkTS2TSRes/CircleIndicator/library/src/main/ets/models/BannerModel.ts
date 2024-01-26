let __generate__Id: number = 0;
function generateId(): string {
    return "BannerModel_" + ++__generate__Id;
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
import BaseModel from './BaseModel';
import { length2Vp } from '../utils/UiUtil';
const DEFAULT_HEIGHT: Length = '8vp';
const DEFAULT_AUTO_PLAY_TIME = 4000;
const DEFAULT_FADE_DELAY = 300;
const DEFAULT_FADE_LENGTH = 400;
export class BannerModel extends BaseModel<BannerModel> {
    constructor(swiperController: SwiperController | null) {
        super(swiperController);
    }
    protected height: number = length2Vp(getContext(), DEFAULT_HEIGHT);
    protected backgroundColor: ResourceColor = $r('app.color.banner_default_background_color');
    private color: ResourceColor = $r('app.color.banner_default_color');
    private autoPlay: boolean = false;
    private autoPlayTime: number = DEFAULT_AUTO_PLAY_TIME;
    private fades: boolean = true;
    private fadeDelay: number = DEFAULT_FADE_DELAY;
    private fadeLength: number = DEFAULT_FADE_LENGTH;
    private notifyPlay: (status: boolean) => void = (status: boolean) => { };
    private notifyFades: (fades: boolean) => void = (fades: boolean) => { };
    setColor(color: number): BannerModel {
        this.color = color;
        return this;
    }
    getColor(): ResourceColor {
        return this.color;
    }
    startAutoPlay() {
        this.autoPlay = true;
        if (this.notifyPlay) {
            this.notifyPlay(true);
        }
    }
    stopAutoPlay() {
        this.autoPlay = false;
        if (this.notifyPlay) {
            this.notifyPlay(false);
        }
    }
    isAutoPlay(): boolean {
        return this.autoPlay;
    }
    setAutoPlayTime(autoPlayTime: number): BannerModel {
        this.autoPlayTime = autoPlayTime;
        return this;
    }
    getAutoPlayTime(): number {
        return this.autoPlayTime;
    }
    setFades(fades: boolean): BannerModel {
        if (this.fades != fades && this.notifyFades) {
            this.notifyFades(fades);
        }
        this.fades = fades;
        return this;
    }
    isFades(): boolean {
        return this.fades;
    }
    setFadeDelay(fadeDelay: number): BannerModel {
        this.fadeDelay = fadeDelay;
        return this;
    }
    getFadeDelay(): number {
        return this.fadeDelay;
    }
    setFadeLength(fadeLength: number): BannerModel {
        this.fadeLength = fadeLength;
        return this;
    }
    getFadeLength(): number {
        return this.fadeLength;
    }
    /**
     * don't call from user
     * @param callback
     */
    setNotifyPlayListener(callback: (status: boolean) => void) {
        this.notifyPlay = callback;
    }
    /**
     * don't call from user
     * @param callback
     */
    setNotifyFadesListener(callback: (fades: boolean) => void) {
        this.notifyFades = callback;
    }
}
