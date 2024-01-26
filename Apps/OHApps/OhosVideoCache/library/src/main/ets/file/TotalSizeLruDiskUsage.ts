/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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

import LruDiskUsage from './LruDiskUsage';

export default class TotalSizeLruDiskUsage extends LruDiskUsage {
  maxSize: number = 0;

  constructor(maxSize: number) {
    super()
    if (maxSize <= 0) {
      throw new Error("Max size must be positive number!");
    }
    this.maxSize = maxSize;
  }

  protected accept(file: string, totalSize: number, totalCount: number): boolean {
    return totalSize <= this.maxSize;
  }
}