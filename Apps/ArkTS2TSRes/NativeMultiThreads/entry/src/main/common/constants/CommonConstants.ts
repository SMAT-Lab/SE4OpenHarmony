let __generate__Id: number = 0;
function generateId(): string {
    return "CommonConstants_" + ++__generate__Id;
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
export default class Constants {
    // Height and width is 100%.
    static readonly FULL_PARENT: string = '100%';
    // image root path
    static readonly IMAGE_ROOT_PATH: string = 'images/';
    // After the app is started, the component initializes the loaded image.
    static readonly INIT_IMAGE_PATH: string = 'images/initialize.png';
    // sync process button title
    static readonly SYNC_BUTTON_IMAGE: string = 'sync';
    // callback async process button title
    static readonly CALLBACK_BUTTON_IMAGE: string = 'callback';
    // promise async process button title
    static readonly PROMISE_BUTTON_IMAGE: string = 'promise';
    // thread safe function async process button title
    static readonly TSF_BUTTON_IMAGE: string = 'tsf';
    // error image button title
    static readonly ERROR_BUTTON_IMAGE: string = 'error';
    // button area layout weight
    static readonly BUTTON_AREA_LAYOUT_WEIGHT: number = 1;
}
