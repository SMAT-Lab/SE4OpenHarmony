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

import HttpProxyCacheServer from './src/main/ets/HttpProxyCacheServer'
import HttpProxyCacheServerBuilder from './src/main/ets/HttpProxyCacheServerBuilder'
import { CacheListener } from './src/main/ets/CacheListener'
import FileNameGenerator from './src/main/ets/file/FileNameGenerator'
import HeaderInjector from './src/main/ets/headers/HeaderInjector'
import DiskUsage from './src/main/ets/file/DiskUsage'
import StorageUtils from './src/main/ets/StorageUtils'
import TotalCountLruDiskUsage from './src/main/ets/file/TotalCountLruDiskUsage'
import TotalSizeLruDiskUsage from './src/main/ets/file/TotalSizeLruDiskUsage'
import Md5FileNameGenerator from './src/main/ets/file/Md5FileNameGenerator'

export { HttpProxyCacheServer,
  HttpProxyCacheServerBuilder,
  CacheListener,
  FileNameGenerator,
  HeaderInjector,
  DiskUsage,
  StorageUtils,
  TotalCountLruDiskUsage,
  TotalSizeLruDiskUsage,
  Md5FileNameGenerator
}
