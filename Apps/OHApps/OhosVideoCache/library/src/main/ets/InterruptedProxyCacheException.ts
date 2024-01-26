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

import { ProxyCacheException } from './ProxyCacheException';

export default class InterruptedProxyCacheException extends ProxyCacheException {
  constructor(args: string | Array<string | Error>) {
    if (args && args.length === 1 && typeof args[0] === 'string') {
      super(args[0])
    } else if (args && args.length === 1 && args[0] instanceof Error) {
      super(args[0].message)
    } else if (args && args.length === 2 && typeof args[0] === 'string' && args[1] instanceof Error) {
      super(args[0], args[1])
    }
  }
}