/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License")
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

export class FirstLevelCategory {
  childNodes: SecondLevelCategory[] | ThirdLevelCategory[] = [];
  iconSelected: Resource = $r('app.string.empty'); // The icon for the first-level category is selected
  icon: Resource = $r('app.string.empty'); // The icon for the first-level category is not selected
  tabBarName: Resource = $r('app.string.empty');// First-level category title
}

export class SecondLevelCategory {
  tag?: number;
  title: Resource = $r('app.string.empty'); // Second-level category titles
  childNodes: ThirdLevelCategory[] = [];
}

export class ThirdLevelCategory {
  tag: number = 0; //  Third-level category tag
  title: Resource  = $r('app.string.empty'); // Third-level category headings
  url?: string; // Third-level category detail page URL
  childNodes?: FourthLevelCategory[] = [];
}

export class FourthLevelCategory {
  title: Resource = $r('app.string.empty'); // Fourth-level category titles
  url: string = ''; // Fourth-level category detail page URL
}