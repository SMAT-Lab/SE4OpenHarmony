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
import {
  concat,
  merge,
  take,
  of,
  delay,
  forkJoin as ForkJoin,
  interval,
  map,
  mergeAll as MergeAll,
  from,
  partition as Partition,
  OperatorFunction,
  Observable
} from 'rxjs';
import Log from '../log';

export function forkJoin() {
  const myPromise = val =>
  new Promise(resolve =>
  setTimeout(() => resolve(`Promise Resolved: ${val}`), 5000));
  const example = ForkJoin(
    of('Hello'),
    of('World')
      .pipe(delay(1000)),
    interval(1000)
      .pipe(take(1)),
    interval(1000)
      .pipe(take(2)),
    myPromise('RESULT')
  );
  const subscribe = example.subscribe(val => Log.showLog('forkJoin--' + val));
}

export function mergeAll() {
  const myPromise = val =>
  new Promise(resolve => setTimeout(() => resolve(`Result: ${val}`), 2000));
  const source = of(1, 2, 3);
  const example = source.pipe(
    map(val => myPromise(val)),
    MergeAll());
  const subscribe = example.subscribe(val => Log.showLog('mergeAll--' + val));
}

export function retryWhenLogic(val: number) {
  if (val > 5) {
    throw val;
  }
  return val;
}

export function partition() {
  const observableValues = from([1, 2, 3, 4, 5, 6]);
  const [evens, odds] = Partition(observableValues, (value, index) => value % 2 === 0);
  const subscribe = merge(
    evens.pipe(map((val: ESObject) => `Even: ${val}`)),
    odds.pipe(map((val: ESObject) => `Odd: ${val}`))
  ).subscribe((val: ESObject) => Log.showLog('partition--' + val));
}