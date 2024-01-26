let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
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
export { default as CircleIndicator } from './src/main/ets/components/CircleIndicator';
export { CircleModel, Orientation as CircleOrientation } from './src/main/ets/models/CircleModel';
export { default as BannerIndicator } from './src/main/ets/components/BannerIndicator';
export { BannerModel } from './src/main/ets/models/BannerModel';
export { default as LineIndicator } from './src/main/ets/components/LineIndicator';
export { LineModel } from './src/main/ets/models/LineModel';
export { default as TriangularIndicator } from './src/main/ets/components/TriangularIndicator';
export { TriangularModel } from './src/main/ets/models/TriangularModel';
export { default as IconIndicator } from './src/main/ets/components/IconIndicator';
export { IconModel, IconItem } from './src/main/ets/models/IconModel';
export { default as BottomTabsIndicator } from './src/main/ets/components/BottomTabsIndicator';
export { BottomTabsModel } from './src/main/ets/models/BottomTabsModel';
export { default as FixTabsIndicator } from './src/main/ets/components/FixTabsIndicator';
export { FixTabsModel, CursorType as FixCursorType } from './src/main/ets/models/FixTabsModel';
export { default as CapsuleFixTabsIndicator } from './src/main/ets/components/CapsuleFixTabsIndicator';
export { CapsuleFixTabsModel } from './src/main/ets/models/CapsuleFixTabsModel';
export { default as BadgeFixTabsIndicator } from './src/main/ets/components/BadgeFixTabsIndicator';
export { BadgeFixTabsModel, BadgeType, BadgeRule, BadgeAnchor } from './src/main/ets/models/BadgeFixTabsModel';
export { default as ScrollTabsIndicator } from './src/main/ets/components/ScrollTabsIndicator';
export { ScrollTabsModel } from './src/main/ets/models/ScrollTabsModel';
export { default as SpringScrollTabsIndicator } from './src/main/ets/components/SpringScrollTabsIndicator';
export { SpringScrollTabsModel } from './src/main/ets/models/SpringScrollTabsModel';
export { default as MagicScrollTabsIndicator } from './src/main/ets/components/MagicScrollTabsIndicator';
export { MagicScrollTabsModel, TitleMode as MagicTitleMode, CursorType as MagicCursorType, DividerWidthMode as MagicDividerWidthMode } from './src/main/ets/models/MagicScrollTabsModel';
export { default as TitleIndicator } from './src/main/ets/components/TitleIndicator';
export { TitleModel, Bounds as TitleBounds, IndicatorStyle as TitleIndicatorStyle, LinePosition as TitleLinePosition } from './src/main/ets/models/TitleModel';
export { TabIcon } from './src/main/ets/components/model/TabIcon';
