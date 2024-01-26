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
/**
 * Constants for components.
 */
export class CommonConstants {
    /**
     * Text width percentage: 100%.
     */
    static readonly TEXT_WIDTH: string = '100%';
    /**
     * TextArea width percentage: 100%.
     */
    static readonly TEXTAREA_WIDTH: string = '100%';
    /**
     * Bottom width percentage: 85%.
     */
    static readonly BOTTOM_WIDTH: string = '85%';
    /**
     * Column height percentage: 100%.
     */
    static readonly COLUMN_HEIGHT: string = '100%';
    /**
     * DescStyle width percentage: 100%.
     */
    static readonly DESC_STYLE_WIDTH: string = '100%';
    /**
     * Windows bottom width percentage: 100%.
     */
    static readonly WINDOWS_BOTTOM_WIDTH: string = '100%';
    /**
     * Text opacity.
     */
    static readonly TEXT_OPACITY: number = 0.6;
    /**
     * Divider opacity.
     */
    static readonly DIVIDER_OPACITY: number = 0.4;
}
