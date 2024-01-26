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

import {
  FirstLevelCategory,
  FourthLevelCategory,
  SecondLevelCategory,
  ThirdLevelCategory
} from '../model/CategoricalDataType';


const DECORATED_OBJECT_TYPE: FourthLevelCategory[] = [
  {
    title: $r('app.string.base_type'),
    url: 'pages/pagelevelstagemanagement/singlecomponentstatevariables/decoratedobjecttype/basetype/BaseType'
  },
  {
    title: $r('app.string.array_type'),
    url: 'pages/pagelevelstagemanagement/singlecomponentstatevariables/decoratedobjecttype/arraytype/ArrayType'
  },
  {
    title: $r('app.string.class_type'),
    url: 'pages/pagelevelstagemanagement/singlecomponentstatevariables/decoratedobjecttype/classobjecttype/ClassObjectType'
  }
];

const UPDATE_PRINCIPLE: FourthLevelCategory[] = [
  {
    title: $r('app.string.only_update_bound_components'),
    url: 'pages/pagelevelstagemanagement/singlecomponentstatevariables/updatetactics/updateboundcomponent/UpdateBoundComponent'
  }
];

const SINGLE_COMPONENT_CATEGORY: ThirdLevelCategory[] = [
  {
    tag: 1,
    title: $r('app.string.decorated_object_type'),
    childNodes: DECORATED_OBJECT_TYPE
  },
  {
    tag: 1,
    title: $r('app.string.update_principle'),
    childNodes: UPDATE_PRINCIPLE
  }
];

const PARENT_CHILD_SYNC: FourthLevelCategory[] = [
  {
    title: $r('app.string.single_and_two_way_sync'),
    url: 'pages/pagelevelstagemanagement/multicompomentssync/parentchildcomponentsync/uniandbidirectionsync/UniAndBidirectionSync'
  },
  {
    title: $r('app.string.partial_sync'),
    url: 'pages/pagelevelstagemanagement/multicompomentssync/parentchildcomponentsync/parentchildpartialcontentsync/ParentChildPartialContentSync'
  }
];

const MULTI_COMPONENTS_CATEGORY: ThirdLevelCategory[] = [
  {
    tag: 1,
    title: $r('app.string.parent_child_sync'),
    childNodes: PARENT_CHILD_SYNC
  },
  {
    tag: 1,
    title: $r('app.string.parent_descendent_sync'),
    url: 'pages/pagelevelstagemanagement/multicompomentssync/deepnestcomponentssync/DeepNestComponentsSync'
  },
  {
    tag: 1,
    title: $r('app.string.brother_sync'),
    url: 'pages/pagelevelstagemanagement/multicompomentssync/brothercomponentssync/BrotherComponentSync'
  }
];

const PAGE_LEVEL_CATEGORY: SecondLevelCategory[] = [
  {
    title: $r('app.string.single_component_state'),
    childNodes: SINGLE_COMPONENT_CATEGORY
  },
  {
    title: $r('app.string.multi_component_sync'),
    childNodes: MULTI_COMPONENTS_CATEGORY
  }
];


const APP_LEVEL_CATEGORY: ThirdLevelCategory[] = [
  {
    tag: 1,
    title: $r('app.string.application_storage_ui'),
    url: 'pages/applylevelstagemanagement/applyglobaldatasync/ApplyGlobalDataSync',
  },
  {
    tag: 1,
    title: $r('app.string.ability_storage_ui'),
    url: 'pages/applylevelstagemanagement/abilityglobaldatasync/AbilityGlobalDataSync',
  }
];


export const HOME_TABS: FirstLevelCategory[] = [
  {
    tabBarName: $r('app.string.page_level'),
    icon: $r('app.media.page_level'),
    iconSelected: $r('app.media.page_level_selected'),
    childNodes: PAGE_LEVEL_CATEGORY
  },
  {
    tabBarName: $r('app.string.app_level'),
    icon: $r('app.media.app_level'),
    iconSelected: $r('app.media.app_level_selected'),
    childNodes: APP_LEVEL_CATEGORY
  }
];
