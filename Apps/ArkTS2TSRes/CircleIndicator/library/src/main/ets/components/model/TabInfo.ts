let __generate__Id: number = 0;
function generateId(): string {
    return "TabInfo_" + ++__generate__Id;
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
import { TabIcon } from './TabIcon';
export class TabInfo {
    index?: number = 0;
    text?: string = '';
    tab?: TabIcon | null = null;
    fontSize: number = 0;
    fontColor: ResourceColor | string | undefined = '';
    iconSize?: number = 0;
    isCenterView?: boolean = false;
    src?: string | PixelMap | Resource | null = null;
}
