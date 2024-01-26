/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
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
import { describe, expect, it } from '@ohos/hypium';
import { of, Subscriber } from 'rxjs';
import { observable as symbolObservable } from 'rxjs/internal/symbol/observable';
import { asInteropObservable, asInteropSubscriber } from './interop-helper';

describe('interopHelper', () => {
  it('should_simulate_interop_observables', 0, () => {
    const observable: ESObject = asInteropObservable(of(42));
    expect(observable).assertInstanceOf('Observable');
    expect(observable[symbolObservable]).assertInstanceOf('function');
  });

  it('should_simulate_interop_subscribers', 0, () => {
    const subscriber: ESObject = asInteropSubscriber(new Subscriber<ESObject>());
    expect(subscriber).assertInstanceOf('Subscriber');
  });
});