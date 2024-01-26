let __generate__Id: number = 0;
function generateId(): string {
    return "CameraConstants_" + ++__generate__Id;
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
import { ConstantsType } from '../utils/CameraType';
export const CameraConstants: ConstantsType = {
    FOCUS_CHANGE_KEY: "isFocusChanging",
    CONFIGURE_KEY: 'isConfiguring',
    RATION_KEY: 'ration',
    RATION_ENABLE: 'rationEnable',
    RATION_CHANGE_KEY: 'isRationChanging',
    CAPTURE_MODE_KEY: 'cameraCaptureModeKey',
    CAPTURE_MODE_INDEX_KEY: 'cameraCaptureModeSelectKey',
    DEFAULT_STRING_SPACE: ' ',
    DEFAULT_STRING_COMMA: ', ',
    ONE_MINUTE_MS: 0,
    CAMERA_PREVIEW_ID: 'cameraPreview',
    CAMERA_PREVIEW_TYPE: 'surface',
    RATION_SLIDER_SMALL_SUM: 6,
    RATION_SLIDER_BIG_SUM: 24,
    MEDIA_LIB_BUNDLE_NAME: 'com.huawei.hmos.photos',
    MEDIA_LIB_ABILITY_NAME: 'com.huawei.hmos.photos.MainAbility',
    MEDIA_LIB_ACTION_NAME: 'detail',
    RATIO_DEFAULT_VALUE: 1,
    RATIO_SIZE_HALF: 2,
    RATIO_SIZE_DEPART: 3,
    PREPARE_MASK_HIDE_TIME: 800,
    CAPTURE_MASK_HIDE_TIME: 100,
    FOCUS_MARK_HIDE_TIME: 3000,
    RATIO_CHANGE_STEP: 0.1,
    RATIO_CHANGE_MIN_DIFFERENT: 0.01,
    DEFAULT_POINT: '.',
    CURRENT_RATIO_UNIT: 'x',
    RATION_MENU_HIDE_TIME: 3000,
    PHOTO_SELECTION_INDEX: 1,
    VIDEO_SELECTION_INDEX: 2,
    MODE_SELECTOR_DISPLAY_COUNT: 3,
    RATIO_SLIDER_BALL_BIG_SCALE: 1.1,
    RATIO_SLIDER_BALL_DEFAULT_SCALE: 1.0,
    DEFAULT_STRING_PERCENT: '%',
    ZOOM_RATIO_MIN_INDEX: 0,
    ZOOM_RATIO_MAX_INDEX: 1,
    MODE_SELECTED_OPACITY: 1,
    MODE_UNSELECTED_OPACITY: 0.5,
    RATIO_STEP_CHANGE_DELAY: 100,
};
export enum CaptureMode {
    PHOTO,
    PHOTO_MULTI,
    VIDEO,
    FACE_DETECT,
    CODEC,
    PREVIEW_FRAME
}
export enum CameraPosition {
    FRONT = 2,
    BACK = 1
}
export enum CameraPreviewAspectRatio {
    ASPECT_RATIO_1_1 = 1 / 1,
    ASPECT_RATIO_4_3 = 4 / 3,
    ASPECT_RATIO_16_9 = 16 / 9
}
export enum CameraImageFormat {
    CAMERA_PHOTO_FORMAT = 2000,
    CAMERA_VIDEO_FORMAT = 1003
}
export enum CameraResolutionType {
    PREVIEW,
    PHOTO,
    VIDEO
}
