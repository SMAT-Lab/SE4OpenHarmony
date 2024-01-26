let __generate__Id: number = 0;
function generateId(): string {
    return "CameraLifecycleProxy_" + ++__generate__Id;
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
import { ListenerManager } from './ListenerManger';
import { CaptureMode, CameraPosition } from '../constants/CameraConstants';
import CameraLifecycle from './CameraLifecycle';
import camera from '@ohos.multimedia.camera';
export default class CameraLifecycleProxy extends ListenerManager<CameraLifecycle> {
    public onRatioChanged(outputRation: number, outputRations: number[]): void {
        this.listeners.forEach((lifecycle) => {
            if (lifecycle.onRatioChanged) {
                lifecycle.onRatioChanged(outputRation, outputRations);
            }
        });
    }
    public onCameraConfigure(captureMode: CaptureMode, cameraPosition: CameraPosition, outputResolution: camera.Size, outputResolutions: camera.Profile[]): void {
        this.listeners.forEach((lifecycle) => {
            if (lifecycle.onCameraConfigure) {
                lifecycle.onCameraConfigure(captureMode, cameraPosition, outputResolution, outputResolutions);
            }
        });
    }
    onPreviewStart(mode: CaptureMode): void {
        this.listeners.forEach((lifecycle) => {
            if (lifecycle.onPreviewStart) {
                lifecycle.onPreviewStart(mode);
            }
        });
    }
    onPreviewStop(): void {
        this.listeners.forEach((lifecycle) => {
            if (lifecycle.onPreviewStop) {
                lifecycle.onPreviewStop();
            }
        });
    }
    onCaptureStart(mode: CaptureMode): void {
        this.listeners.forEach((lifecycle) => {
            if (lifecycle.onCaptureStart) {
                lifecycle.onCaptureStart(mode);
            }
        });
    }
    onCaptureSuccess(mode: CaptureMode, data: ArrayBuffer): void {
        this.listeners.forEach((lifecycle) => {
            if (lifecycle.onCaptureSuccess) {
                lifecycle.onCaptureSuccess(mode, data);
            }
        });
    }
    onCaptureStop(mode: CaptureMode): void {
        this.listeners.forEach((lifecycle) => {
            if (lifecycle.onCaptureStop) {
                lifecycle.onCaptureStop(mode);
            }
        });
    }
    onDestroy() {
        this.listeners.forEach(async (lifecycle) => {
            if (lifecycle.onDestroy) {
                await lifecycle.onDestroy();
            }
        });
    }
}
