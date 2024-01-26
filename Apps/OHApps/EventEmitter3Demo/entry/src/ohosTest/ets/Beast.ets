/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import EventEmitter from 'eventemitter3'
import Utils from './test/Utils'

/**
 * 原库的单元测试 require('util').inherits(Beast, EventEmitter);对象间原型继承的函数
 * OpenHarmony暂未有对应的API 采用class extends的形式实现
 *
 */
export default class Beast<T extends string, P extends Object> extends EventEmitter<string, Object> {
  constructor() {
    super()
    Utils.call(EventEmitter, this);
  }
}