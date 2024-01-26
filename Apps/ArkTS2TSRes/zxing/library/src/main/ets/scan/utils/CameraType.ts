let __generate__Id: number = 0;
function generateId(): string {
    return "CameraType_" + ++__generate__Id;
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
export interface ConstantsType {
    FOCUS_CHANGE_KEY: string;
    CONFIGURE_KEY: string;
    RATION_KEY: string;
    RATION_ENABLE: string;
    RATION_CHANGE_KEY: string;
    CAPTURE_MODE_KEY: string;
    CAPTURE_MODE_INDEX_KEY: string;
    DEFAULT_STRING_SPACE: string;
    DEFAULT_STRING_COMMA: string;
    ONE_MINUTE_MS: number;
    CAMERA_PREVIEW_ID: string;
    CAMERA_PREVIEW_TYPE: string;
    RATION_SLIDER_SMALL_SUM: number;
    RATION_SLIDER_BIG_SUM: number;
    MEDIA_LIB_BUNDLE_NAME: string;
    MEDIA_LIB_ABILITY_NAME: string;
    MEDIA_LIB_ACTION_NAME: string;
    RATIO_DEFAULT_VALUE: number;
    RATIO_SIZE_HALF: number;
    RATIO_SIZE_DEPART: number;
    PREPARE_MASK_HIDE_TIME: number;
    CAPTURE_MASK_HIDE_TIME: number;
    FOCUS_MARK_HIDE_TIME: number;
    RATIO_CHANGE_STEP: number;
    RATIO_CHANGE_MIN_DIFFERENT: number;
    DEFAULT_POINT: string;
    CURRENT_RATIO_UNIT: string;
    RATION_MENU_HIDE_TIME: number;
    PHOTO_SELECTION_INDEX: number;
    VIDEO_SELECTION_INDEX: number;
    MODE_SELECTOR_DISPLAY_COUNT: number;
    RATIO_SLIDER_BALL_BIG_SCALE: number;
    RATIO_SLIDER_BALL_DEFAULT_SCALE: number;
    DEFAULT_STRING_PERCENT: string;
    ZOOM_RATIO_MIN_INDEX: number;
    ZOOM_RATIO_MAX_INDEX: number;
    MODE_SELECTED_OPACITY: number;
    MODE_UNSELECTED_OPACITY: number;
    RATIO_STEP_CHANGE_DELAY: number;
}
export interface FocusPointType {
    x: number;
    y: number;
}
interface sizeType {
    width: number;
    height: number;
}
export interface profileType {
    format: number;
    size: sizeType;
}
