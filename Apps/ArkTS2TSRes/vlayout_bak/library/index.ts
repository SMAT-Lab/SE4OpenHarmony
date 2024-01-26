let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
}
/*
Copyright (c) 2021 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
export { BANNER_LAYOUT } from './src/main/ets/components/common/BannerLayoutHelper';
export { COLUMN_LAYOUT } from './src/main/ets/components/common/ColumnLayoutHelper';
export { DEFAULT_LAYOUT } from './src/main/ets/components/common/DefaultLayoutHelper';
export { FIX_LAYOUT } from './src/main/ets/components/common/FixLayoutHelper';
export { FLOAT_LAYOUT } from './src/main/ets/components/common/FloatLayoutHelper';
export { GRID_LAYOUT } from './src/main/ets/components/common/GridLayoutHelper';
export { JumpBar } from './src/main/ets/components/common/JumpBar';
export { LINEAR_LAYOUT } from './src/main/ets/components/common/LinearLayoutHelper';
export { ONEN_LAYOUT } from './src/main/ets/components/common/OnePlusNLayoutHelper';
export { ONEN_EX_LAYOUT } from './src/main/ets/components/common/OnePlusNLayoutHelperEx';
export { RANGEGRID_LAYOUT } from './src/main/ets/components/common/RangeGridLayoutHelper';
export { SCROLL_FIX_LAYOUT } from './src/main/ets/components/common/ScrollFixLayoutHelper';
export { SINGLE_LAYOUT } from './src/main/ets/components/common/SingleLayoutHelper';
export { STAGGEREDGRID_LAYOUT } from './src/main/ets/components/common/StaggeredGridLayoutHelper';
export { STICKY_LAYOUT } from './src/main/ets/components/common/StickyLayoutHelper';
export { GridAttributes, StaggeredGridAttributes, AbstractFullFillAttributes, BannerAttributes, LinearAttributes, FixAreaAttributes, dataType, layoutDataType } from './src/main/ets/components/core/VLayoutAttributes';
