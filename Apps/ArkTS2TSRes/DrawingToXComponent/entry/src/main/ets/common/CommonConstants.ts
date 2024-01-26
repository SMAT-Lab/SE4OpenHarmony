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
export default class CommonConstants {
    /**
     * Height and width is 100%.
     * */
    static readonly FULL_PARENT: string = '100%';
    /**
     * XComponentId is XComponentId.
     * */
    static readonly X_COMPONENT_ID: string = 'XComponentId';
    /**
     * XComponentId is XComponentId.
     * */
    static readonly X_COMPONENT_TYPE: string = 'surface';
    /**
     * XComponentId is XComponentId.
     * */
    static readonly X_COMPONENT_LIBRARY_NAME: string = 'entry';
}
