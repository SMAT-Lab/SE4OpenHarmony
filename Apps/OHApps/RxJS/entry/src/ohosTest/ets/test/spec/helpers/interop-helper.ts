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
import { Observable, Subject, Subscription } from 'rxjs';
import { Subscriber } from 'rxjs';

/**
 * Returns an observable that will be deemed by this package's implementation
 * to be an observable that requires interop. The returned observable will fail
 * the `instanceof Observable` test and will deem any `Subscriber` passed to
 * its `subscribe` method to be untrusted.
 */
export function asInteropObservable<T>(observable: Observable<T>): Observable<T> {
  return new Proxy(observable, {
    get(target: Observable<T>, key: string | number | symbol) {
      if (key === 'subscribe') {
        const { subscribe } = target;
        return interopSubscribe(subscribe);
      }
      return Reflect.get(target, key);
    },
    getPrototypeOf(target: Observable<T>) {
      const { lift, subscribe, ...rest } = Object.getPrototypeOf(target);
      return {
        ...rest,
        subscribe: interopSubscribe(subscribe)
      };
    }
  });
}

/**
 * Returns a subject that will be deemed by this package's implementation to
 * be untrusted. The returned subject will not include the symbol that
 * identifies trusted subjects.
 */
export function asInteropSubject<T>(subject: Subject<T>): Subject<T> {
  return asInteropSubscriber<ESObject>(subject as ESObject) as ESObject;
}

/**
 * Returns a subscriber that will be deemed by this package's implementation to
 * be untrusted. The returned subscriber will fail the `instanceof Subscriber`
 * test and will not include the symbol that identifies trusted subscribers.
 */
export function asInteropSubscriber<T>(subscriber: Subscriber<T>): Subscriber<T> {
  return new Proxy(subscriber, {
    get(target: Subscriber<T>, key: string | number | symbol) {
      return Reflect.get(target, key);
    },
    getPrototypeOf(target: Subscriber<T>) {
      const { ...rest } = Object.getPrototypeOf(target);
      return rest;
    }
  });
}

function interopSubscribe<T>(subscribe: (...args: any[]) => Subscription) {
  // @ts-ignore
  return (this: Observable<T>, ...args: any[]): Subscription => {
    const [arg] = args;
    if (arg instanceof Subscriber) {
      return subscribe.call(this, asInteropSubscriber(arg));
    }
    return subscribe.apply(this, args);
  };
}