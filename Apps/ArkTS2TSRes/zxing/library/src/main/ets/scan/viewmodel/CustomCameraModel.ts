let __generate__Id: number = 0;
function generateId(): string {
    return "CustomCameraModel_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import CameraCaptureMode from '../constants/CameraCaptureMode';
import { CameraConstants } from '../constants/CameraConstants';
import DimensionUtil from '../utils/DimensionUtil';
export default class MainModel {
    private static instant: MainModel | null = null;
    private cameraModes: Array<CameraCaptureMode> = new Array();
    private bigScales: Array<number> = new Array(CameraConstants.RATION_SLIDER_BIG_SUM);
    private ratioStepSize: number = DimensionUtil.getVp($r('app.float.ratio_slider_step_size'));
    private ratioStepOffset: number = DimensionUtil.getVp($r('app.float.ration_slider_step_offset'));
    private ratioSliderMaxValue: number = 0;
    private ratioMenuShowTasker: number | null = null;
    private constructor() {
        this.setRatioSliderTrackWidth();
        this.setCameraModes();
        this.setBigScales();
    }
    private setCameraModes() {
        this.cameraModes.push(new CameraCaptureMode('', 0));
        this.cameraModes.push(new CameraCaptureMode('', 1));
        this.cameraModes.push(new CameraCaptureMode('XXX', 2));
        this.cameraModes.push(new CameraCaptureMode('XXX', 3));
        this.cameraModes.push(new CameraCaptureMode('XXXX', 4));
        this.cameraModes.push(new CameraCaptureMode('', 5));
        this.cameraModes.push(new CameraCaptureMode('', 6));
    }
    private setBigScales() {
        for (let i = 0; i < CameraConstants.RATION_SLIDER_BIG_SUM; i++) {
            this.bigScales.push(i);
        }
    }
    public static getInstant(): MainModel {
        if (MainModel.instant == null) {
            MainModel.instant = new MainModel();
        }
        return MainModel.instant;
    }
    private setRatioSliderTrackWidth() {
        let circleSum = CameraConstants.RATION_SLIDER_BIG_SUM;
        let circleLength = circleSum * this.ratioStepSize;
        let offsetLength = (circleSum - 1) * this.ratioStepOffset;
        this.ratioSliderMaxValue = (circleLength + offsetLength);
    }
    public hideRationMenu(delay: number, callback: Function) {
        clearTimeout(this.ratioMenuShowTasker as number);
        this.ratioMenuShowTasker = setTimeout(() => {
            callback();
        }, delay);
    }
}
